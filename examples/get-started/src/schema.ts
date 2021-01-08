import { int, num, str, struct, tuple, array } from 'rt-ts/src';
import { toBe } from 'rt-ts/src/validation';
import v from 'validator';

const toBeEmail = toBe(v.isEmail, 'is not a valid email.');

export const Person = struct({
  name: str,
  email: str.validate(toBeEmail),
});

export const Coords = tuple(num, num);

export const Book = struct({
  title: str,
  annotation: str.optional,
  year: int,
  authors: array(Person),
  coords: Coords.optional,
});

export type TPerson = ReturnType<typeof Person>;
export type TCoords = ReturnType<typeof Coords>;
export type TBook = ReturnType<typeof Book>;