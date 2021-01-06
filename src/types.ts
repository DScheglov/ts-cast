export type RuleFn<T> = (value: T) => string | null;

export type TypeGuard<T> = (value: any) => value is T;

export type Caster<T> = (value: any, context?: string) => T;

export type Meets<T> = (...rules: RuleFn<T>[]) => Caster<T>;

export type CasterObj<T> = Caster<T> & {
  optional: Caster<T | null | undefined> & { meets: Meets<T> };
  required: Caster<T> & { meets: Meets<T> };
  meets: Meets<T>;
};

export type StructSchema<S extends {}> = {
  [field in keyof S]: Caster<S[field]>;
};

export type Tuple = {
  [index in number]: any;
};

export type TupleSchema<T extends Tuple> = {
  [index in number]: Caster<T[index]>;
};
