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

    it('returns object with null prototype', () => {
      const Person = struct({ name: string, email: string });
      const person = Person({ name: 'John', email: 'join@mail.com' });
      expect(Object.getPrototypeOf(person)).toBeNull();
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

    it('generates a new type', () => {
      const Person = struct({ name: string, email: string });

      type TPerson = ReturnType<typeof Person>;

      const person: TPerson = { name: 'John', email: 'join@mail.com' };

      expect(Person(person)).toEqual(person);
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
    ])('throwa a TypeError for %j', value => {
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
    ])('throwa a TypeError for %j', value => {
      expect(
        () => Person.partial(value),
      ).toThrow(TypeError);
    });
  });
});
