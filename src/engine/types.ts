import { RuleFn } from '../rules/types';

export { RuleFn };

export type TypeGuard<T> = (value: unknown) => value is T;

export type TypeChecker = (value: unknown) => boolean;

export type ErrorReporter = (message: string, context?: string) => never;

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

export interface StructCaster<S extends {}> extends Caster<S> {
  partial: Caster<Partial<S>>
}

export type StructSchema<S extends {}> = {
  [field in keyof S]: CasterFn<S[field]>;
};

export type Tuple = {
  [index in number]: any;
};

export type TupleSchema<T extends Tuple> = {
  [index in number]: CasterFn<T[index]>;
};

type KeysOfType<T, SelectedType> = {
  [field in keyof T]: SelectedType extends T[field] ? field : never
}[keyof T];

type Optional<T> = Partial<Pick<T, KeysOfType<T, undefined>>>;

type Required<T> = Omit<T, KeysOfType<T, undefined>>;

export type OptionalUndefined<T> = Required<T> & Optional<T>;
