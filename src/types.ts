export type RuleFn<T> = (value: T) => string | null;

export type TypeGuard<T> = (value: any) => value is T;

export type CasterFn<T> = {
  (value: any, context?: string): T;
  name: string;
};

export type Validate<T> = (...rules: RuleFn<T>[]) => CasterFn<T>;

export type Caster<T> = CasterFn<T> & {
  optional: CasterFn<T | null | undefined> & { validate: Validate<T> };
  required: CasterFn<T> & { validate: Validate<T> };
  validate: Validate<T>;
};

export type StructSchema<S extends {}> = {
  [field in keyof S]: CasterFn<S[field]>;
};

export type Tuple = {
  [index in number]: any;
};

export type TupleSchema<T extends Tuple> = {
  [index in number]: CasterFn<T[index]>;
};
