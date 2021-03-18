import v from 'validator';
import { 
  integer, number, string, struct, tuple, array, union, nil, ref, createCaster, Caster, toBe 
} from 'ts-cast';

class TEmail extends String { private tag: Symbol
};
class TUUID extends String { private tag: Symbol };

const isEmail = (value: any): value is TEmail => v.isEmail(value);
const isUUID = (value: any): value is TUUID => v.isUUID(value);

export const Email = createCaster('email', isEmail, (email): TEmail => email.toLowerCase());
export const UUID = createCaster('uuid', isUUID);

const isNonEmptyStr = (v: string): boolean => v !== '';

const nonEmptyStr = string.restrict(toBe(isNonEmptyStr));

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

export const Coords = tuple(number, number.optional);

export const Book = struct({
  title: string.default(''),
  annotation: string.optional,
  year: integer.restrict(toBe(x => x > 2000, "greater then 2000")),
  authors: array(Person),
  coords: union(Coords, nil), // .default(null),
}, 'Book');


export type TCoords = ReturnType<typeof Coords>;
export type TBook = ReturnType<typeof Book>;