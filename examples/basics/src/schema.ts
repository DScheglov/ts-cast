import { integer, number, string, struct, tuple, array } from '../../../src';
import { toBe } from '../../../src/restrictions';
import v from 'validator';

export const Person = struct({
  name: string,
  email: string.restrict(toBe(v.isEmail, "a valid email")),
});

export const Coords = tuple(number, number);

export const Book = struct({
  title: string,
  annotation: string.optional,
  year: integer,
  authors: array(Person),
  coords: Coords.optional,
});

export type TPerson = ReturnType<typeof Person>;
export type TCoords = ReturnType<typeof Coords>;
export type TBook = ReturnType<typeof Book>;