export type RuleFn<T> = (value: T) => string | null;

export type TypeGuard<T> = (value: any) => value is T;

export interface CasterFn<T> {
  (value: any, context?: string): T;
  name: string;
}

export interface Caster<T> extends CasterFn<T> {
  optional: Caster<T | null | undefined>;
  nullable: Caster<T | null>;
  validate(...rules: RuleFn<Exclude<T, null | undefined>>[]): Caster<T>;
  map<D>(
    transform: (value: Exclude<T, null | undefined>
  ) => D): Caster<D | Exclude<T, Exclude<T, null | undefined>>>;
  default(defaltValue: T): Caster<Exclude<T, undefined>>;
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
