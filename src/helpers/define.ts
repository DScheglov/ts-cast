type CommonPropertyAttributes = {
  configurable?: boolean;
  enumerable?: boolean;
}

type ReadOnlyPropertyDescriptor<T> = {
  writable?: false;
} & (
  | { value: T }
  | { get(): T }
);

type WritablePropertyDescriptor<T> =
  | { value: T; writable: true }
  | { get(): T; set(value: T): void }

export type PropertyDescriptor<T> = CommonPropertyAttributes & (
  | ReadOnlyPropertyDescriptor<T>
  | WritablePropertyDescriptor<T>
);

export type Property<N extends string | symbol | number, D extends PropertyDescriptor<any>> =
  D extends WritablePropertyDescriptor<infer T>
    ? { [p in N]: T } :
  D extends ReadOnlyPropertyDescriptor<infer T>
    ? { readonly[p in N]: T } :
  never;

type ExistingFields<D extends {}> = Pick<
  D,
  { [p in keyof D]: D[p] extends never ? never : p}[keyof D]
>;

export type Properties<D extends { [p in string | symbol | number]: PropertyDescriptor<any> }> =
  ExistingFields<{
    [p in keyof D]: D[p] extends WritablePropertyDescriptor<infer T> ? T : never
  }> & ExistingFields<{
    readonly [p in keyof D]:
      D[p] extends WritablePropertyDescriptor<any> ? never :
      D[p] extends ReadOnlyPropertyDescriptor<infer T> ? T :
      never
  }>

export const defineProperty = <
  S, N extends string | symbol | number, D extends PropertyDescriptor<any>
>(dest: S, name: N, descriptor: D): Omit<S, N> & Property<N, D> =>
    Object.defineProperty(dest as any, name, descriptor);

export const defineProperties = <
  S,
  D extends { [p in string | symbol | number]: PropertyDescriptor<any> }
>(dest: S, descriptors: D): Omit<S, keyof D> & Properties<D> =>
    Object.defineProperties(dest as any, descriptors);
