import { RuleFn } from '../rules/types';

export { RuleFn };

export type TypeGuard<T> = (value: unknown) => value is T;

export type TypeChecker = (value: unknown) => boolean;

export type ErrorReporter = (message: string, context: string | undefined, code?: string) => never;

export type NonEmptyArray<T> = [T, ...T[]];

export type ErrorMessage = {
  context: string | undefined,
  message: string,
};

export type ValidationSuccess<T> = { ok: true; result: T; errors: [] };

export type ValidationFailure = {
  ok: false;
  result: undefined;
  errors: NonEmptyArray<ErrorMessage>;
};

export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

export interface CasterFn<T> {
  (value: unknown, context?: string, reportError?: ErrorReporter): T;
  name: string;
}

export interface Caster<T> extends CasterFn<T> {
  optional: Caster<T | undefined>;
  nullable: Caster<T | null>;

  restrict(...rules: RuleFn<Exclude<T, null | undefined>>[]): Caster<T>;

  map<D>(
    transform: (value: Exclude<T, null | undefined>) => D
  ): Caster<D | Exclude<T, Exclude<T, null | undefined>>>;

  default(defaultValue: T): Caster<Exclude<T, undefined>>;

  either<Right, Left>(
    leftFactory: (error: TypeError) => Left,
    rightFactory:(value: T) => Right,
  ): CasterFn<Left | Right>;

  validation<Valid, Invalid>(
    invalidFactory: (errors: ErrorMessage[]) => Invalid,
    validFactory: (value: T) => Valid
  ): CasterFn<Valid | Invalid>;

  validate(value: unknown): ValidationResult<T>;
}

export interface StructCaster<S extends Record<string|symbol, any>> extends Caster<S> {
  partial: Caster<Partial<S>>
}

export type StructSchema<S extends Record<string|symbol, any>> = {
  [field in keyof S]-?: CasterFn<S[field]>;
};

export type Tuple = {
  [index in number]: any;
};

export type TupleSchema<T extends Tuple> = {
  [index in number]: CasterFn<T[index]>;
};

type OptionalFields<T> = {
  [field in keyof T]: undefined extends T[field] ? field : never
}[keyof T];

type RequiredFields<T> = {
  [field in keyof T]: undefined extends T[field] ? never : field
}[keyof T];

type Resolve<T> = {
  [field in keyof T]: T[field]
};

export type OptionalUndefined<T> = Resolve<
  & { [key in OptionalFields<T>]?: T[key] }
  & { [key in RequiredFields<T>]: T[key] }
>
