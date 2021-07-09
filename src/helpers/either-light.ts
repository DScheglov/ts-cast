export type Left<E> = [undefined, E];
export type Right<T> = [T];

export type Either<E, T> = Left<E> | Right<T>;

// eslint-disable-next-line no-redeclare
export const Left = <E>(error: E): Left<E> => [undefined, error];
// eslint-disable-next-line no-redeclare
export const Right = <T>(value: T): Right<T> => [value];
