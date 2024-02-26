import { Expect, Equal } from '@type-challenges/utils';
import { struct } from '../..';
import { array } from '../array';
import { integer } from '../integer';
import { string } from '../string';

describe('struct', () => {
  describe('Caster Interface', () => {
    it('struct({ x: int, y: int }, "IntVector2D").name === "IntVector2D"', () => {
      expect(struct({ x: integer, y: integer }, 'IntVector2D').name).toBe('IntVector2D');
    });

    it('struct({ x: int, y: int }).name === "struct"', () => {
      expect(struct({ x: integer, y: integer }).name).toBe('struct');
    });

    it.each([
      ['optional'],
      ['nullable'],
      ['restrict'],
      ['map'],
      ['default'],
      ['either'],
      ['validation'],
      ['validate'],
      ['partial'],
    ])('struct({ x: int, y: int }).%s is a Function', methodName => {
      expect((struct({ x: integer, y: integer }) as any)[methodName]).toBeInstanceOf(Function);
    });
  });

  describe('specific', () => {
    it('returns new object', () => {
      const Person = struct({ name: string, email: string });
      const person = { name: 'John', email: 'join@mail.com' };
      expect(Person(person)).not.toBe(person);
    });

    it('returns object with correspondent prototype', () => {
      const Person = struct({ name: string, email: string });
      const person = Person({ name: 'John', email: 'join@mail.com' });
      expect(Object.getPrototypeOf(person)).toBe(Person.prototype);
      expect(person).toBeInstanceOf(Person);
    });
  });

  describe('::type generation', () => {
    it('checks type caster with pre-defined type (plain object)', () => {
      type TPerson = {
        name: string,
        email: string,
      };

      const Person = struct<TPerson>({ name: string, email: string });

      expect(Person).toBeInstanceOf(Function);
    });

    it('checks type caster with pre-defined type (complex object)', () => {
      type TBook = {
        title: string;
        authors: Array<{ name: string, email: string, age?: number | null }>
      };

      const Book = struct<TBook>({
        title: string,
        authors: array(struct({
          name: string,
          email: string,
          age: integer.optional,
        })),
      });

      expect(Book).toBeInstanceOf(Function);
    });

    it('generates type caster (complex object)', () => {
      type TBook = {
        title: string;
        authors: Array<{ name: string, email: string, age?: number }>
      };

      const Book = struct({
        title: string,
        authors: array(struct({
          name: string,
          email: string,
          age: integer.optional,
        })),
      });

      type T = ReturnType<typeof Book>;

      const check: Expect<Equal<T, TBook>> = true;

      expect(check).toBe(true);
    });

    it('generates a new type', () => {
      const Person = struct({ name: string, email: string, age: integer.optional });
      const Book = struct({ title: string, authors: array(Person) });

      type TBook = ReturnType<typeof Book>;

      const check: Expect<Equal<
        TBook, {
          title: string,
          authors: Array<{ name: string, email: string, age?: number }>
        }>> = true;

      expect(check).toBe(true);
    });

    it('generates a new type with optional fields', () => {
      const Person = struct({ name: string, email: string.optional });

      type TPerson = ReturnType<typeof Person>;

      const person: TPerson = { name: 'John' };

      expect(Person(person)).toEqual(person);
    });

    it('correctly generates a type for a huge object', () => {
      const MessageTypes = {
        BOOK_CREATED: 'BOOK_CREATED',
        BOOK_UPDATED: 'BOOK_UPDATED',
        BOOK_DELETED: 'BOOK_DELETED',

        PERSON_CREATED: 'PERSON_CREATED',
        PERSON_UPDATED: 'PERSON_UPDATED',
        PERSON_DELETED: 'PERSON_DELETED',
      } as const;

      const PersonDetails = struct({
        name: string,
        email: string,
      });

      const BookDetails = struct({
        title: string,
        authors: array(string),
      });

      const MessageBody = {
        [MessageTypes.BOOK_CREATED]: struct({
          boolId: integer,
          id: BookDetails,
        }),
        [MessageTypes.BOOK_UPDATED]: struct({
          boolId: integer,
          id: BookDetails.partial,
        }),
        [MessageTypes.BOOK_DELETED]: struct({
          boolId: integer,
        }),

        [MessageTypes.PERSON_CREATED]: struct({
          personId: integer,
          id: PersonDetails,
        }),
        [MessageTypes.PERSON_UPDATED]: struct({
          personId: integer,
          id: PersonDetails.partial,
        }),
        [MessageTypes.PERSON_DELETED]: struct({
          personId: integer,
        }),
      };

      type TypeFromSchema<Schema extends { [key in string]: (value: unknown) => any }> = {
        [key in keyof Schema]: ReturnType<Schema[key]>;
      };

      type TMessageBody = TypeFromSchema<typeof MessageBody>;

      const check: Expect<Equal<TMessageBody, {
        BOOK_CREATED: { boolId: number, id: { title: string, authors: string[] } };
        BOOK_UPDATED: { boolId: number, id: { title?: string, authors?: string[] } };
        BOOK_DELETED: { boolId: number };
        PERSON_CREATED: { personId: number, id: { name: string, email: string } };
        PERSON_UPDATED: { personId: number, id: { name?: string, email?: string } };
        PERSON_DELETED: { personId: number };
      }>> = true;

      expect(check).toBe(true);
    });
  });

  describe('::required', () => {
    const Person = struct({ name: string, email: string });

    it.each([
      [{ name: '', email: '' }],
      [{ name: 'John', email: 'join@mail.com' }],
    ])('returns %j for %j', value => {
      expect(Person(value)).toEqual(value);
    });

    it.each([
      [undefined],
      [null],
      [{}],
      [1],
      [{ email: 'some-email' }],
      [['some-email', 'some-name']],
    ])('throwa a TypeError for %j', value => {
      expect(
        () => Person(value),
      ).toThrow(TypeError);
    });
  });

  describe('::optional', () => {
    const OptionalPerson = struct({ name: string, email: string }).optional;

    it.each([
      [undefined],
      [{ name: '', email: '' }],
      [{ name: 'John', email: 'join@mail.com' }],
    ])('returns %j for %j', value => {
      expect(OptionalPerson(value)).toEqual(value);
    });

    it.each([
      [{}],
      [1],
      [{ email: 'some-email' }],
      [['some-email', 'some-name']],
    ])('throwa a TypeError for %j', value => {
      expect(
        () => OptionalPerson(value),
      ).toThrow(TypeError);
    });
  });

  describe('::optional fields', () => {
    const Person = struct({ name: string, email: string.optional });

    it.each([
      [{ name: '', email: '' }],
      [{ name: '' }],
      [{ name: 'John' }],
      [{ name: 'John', email: undefined }],
      [{ name: 'John', email: 'join@mail.com' }],
    ])('returns %j for %j', value => {
      expect(Person(value)).toEqual(value);
    });

    it.each([
      [undefined],
      [null],
      [{}],
      [1],
      [{ email: 'some-email' }],
      [['some-email', 'some-name']],
    ])('throws a TypeError for %j', value => {
      expect(
        () => Person(value),
      ).toThrow(TypeError);
    });
  });

  describe('::partial', () => {
    const Person = struct({ name: string, email: string });

    it.each([
      [{ name: '', email: '' }],
      [{ name: 'John', email: 'join@mail.com' }],
      [{ name: 'John' }],
      [{ email: 'some-email' }],
      [{}],
    ])('returns %j for %j', value => {
      expect(Person.partial(value)).toEqual(value);
    });

    it.each([
      [undefined],
      [null],
      [1],
      [['some-email', 'some-name']],
    ])('throw a TypeError for %j', value => {
      expect(
        () => Person.partial(value),
      ).toThrow(TypeError);
    });

    it('allows to change fields in the casted object', () => {
      const person = Person({ name: 'John', email: '1@com.ua' });
      person.name = 'George';

      expect(person.name).toBe('George');
    });
  });
});
