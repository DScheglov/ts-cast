import v from 'validator';
import { int, num, str, struct, tuple, array, union, nil, ref } from '../../../src';
import createCaster from '../../../src/create-caster';
import { Caster } from '../../../src/types';
import { toBe } from '../../../src/validation';

interface TEmail extends String {};
interface TUUID extends String {};

const isEmail = (value: any): value is TEmail => v.isEmail(value);
const isUUID = (value: any): value is TUUID => v.isUUID(value);

const Email = createCaster('email', isEmail).map(email => email.toLowerCase() as TEmail);
const UUID = createCaster('uuid', isUUID).map(id => id.toUpperCase() as TUUID);
const nonEmptyStr = str.validate(toBe(v => v !== '', 'a non-empty string'));

export type TPerson = {
  id: TUUID;
  name: string;
  email?: TEmail | null | undefined,
  friends?: TPerson[] | null | undefined,
}

export const Person: Caster<TPerson> = struct({ 
  id: UUID,
  name: nonEmptyStr,
  email: Email.optional,
  friends: array(ref(() => Person, 'Person')).optional,
}, 'Person');

export const Coords = tuple(num, num.optional);

export const Book = struct({
  title: str.default(''),
  annotation: str.optional,
  year: int.validate(toBe(x => x > 2000, "greater then 2000")),
  authors: array(Person),
  coords: union(Coords, nil), // .default(null),
}, 'Book');


export type TCoords = ReturnType<typeof Coords>;
export type TBook = ReturnType<typeof Book>;