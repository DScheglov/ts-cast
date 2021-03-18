import * as E from 'fp-ts/Either';
import { integer, number, string, struct, tuple, array, toBe, Caster } from 'ts-cast';
import v from 'validator';

export const eitherStr = <T>(caster: Caster<T>) => caster.either(
  ({ message }) => E.left(message),
  E.right
);

export const Person = struct({
  name: string,
  email: string.restrict(toBe(v.isEmail, "a valid email")),
}, 'Person');

export const Coords = tuple(number, number);

export const Book = struct({
  title: string,
  annotation: string.optional,
  year: integer,
  authors: array(Person),
  coords: Coords.optional,
}, 'Book');
