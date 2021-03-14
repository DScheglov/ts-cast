import v from 'validator';
import { 
  int, num, str, struct, tuple, array, union, nil, ref, createCaster, Caster 
} from '../../../src';
import { toBe } from '../../../src/restrictions';

interface TEmail extends String {};
interface TUUID extends String {};

const isEmail = (value: any): value is TEmail => v.isEmail(value);
const isUUID = (value: any): value is TUUID => v.isUUID(value);

const Email = createCaster('email', isEmail).map(email => email.toLowerCase() as TEmail);
const UUID = createCaster('uuid', isUUID).map(id => id.toUpperCase() as TUUID);

const isNonEmptyStr = (v: string): boolean => v !== '';

const nonEmptyStr = str.restrict(toBe(isNonEmptyStr));

export type TPerson = {
  id: TUUID;
  name: string;
  email?: TEmail,
  friends?: TPerson[],
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
  year: int.restrict(toBe(x => x > 2000, "greater then 2000")),
  authors: array(Person),
  coords: union(Coords, nil), // .default(null),
}, 'Book');


export type TCoords = ReturnType<typeof Coords>;
export type TBook = ReturnType<typeof Book>;