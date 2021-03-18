import { integer, number, string, struct, tuple, array, toBe } from 'ts-cast';
import v from 'validator';

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

export type TPerson = ReturnType<typeof Person>;
export type TCoords = ReturnType<typeof Coords>;
export type TBook = ReturnType<typeof Book>;