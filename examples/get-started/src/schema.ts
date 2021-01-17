import v from 'validator';
import { int, num, str, struct, tuple, array, union, nil } from '../../../src';
import createCaster from '../../../src/create-caster';
import { toBe } from '../../../src/validation';

interface TEmail extends String {};
interface TUUID extends String {};

const isEmail = (value: any): value is TEmail => v.isEmail(value);
const isUUID = (value: any): value is TUUID => v.isUUID(value);

const Email = createCaster('email', isEmail).map(email => email.toLowerCase());
const UUID = createCaster('uuid', isUUID).map(id => id.toUpperCase());
const nonEmptyStr = str.validate(toBe(v => v !== '', 'a non-empty string'));

export const Person = struct({ 
  id: UUID,
  name: nonEmptyStr,
  email: Email.optional,
});

export const Coords = tuple(num, num.optional);

export const Book = struct({
  title: str.default(''),
  annotation: str.optional,
  year: int.validate(toBe(x => x > 2000, "greater then 2000")),
  authors: array(Person),
  coords: union(Coords, nil), // .default(null),
});

export type TPerson = ReturnType<typeof Person>;
export type TCoords = ReturnType<typeof Coords>;
export type TBook = ReturnType<typeof Book>;