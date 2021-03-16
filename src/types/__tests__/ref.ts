import { ref } from '../..';
import { StructCaster } from '../../engine/types';
import { array } from '../array';
import { integer } from '../integer';
import { string } from '../string';
import { struct } from '../struct';

describe('ref', () => {
  const Person = struct({
    name: string,
    email: string,
  }, 'Person');

  const PersonRef = ref(() => Person, 'Person');

  it('PersonRef.name === "Person"', () => {
    expect(PersonRef.name).toBe('Person');
  });

  describe('Caster Interface', () => {
    it.each([
      ['optional'],
      ['nullable'],
      ['restrict'],
      ['map'],
      ['default'],
    ])('PersonRef.%s is a Function', methodName => {
      expect((PersonRef as any)[methodName]).toBeInstanceOf(Function);
    });
  });

  it.each([
    [{ name: 'John', email: 'john@mail.com' }],
    [{ name: '', email: '' }],
    [{ name: 'John', email: 'john@mail.com', tag: 'the tag' }],
  ])('bypasses %j', value => {
    expect(PersonRef(value)).toEqual(Person(value));
  });
});

describe('ref (mutual)', () => {
  type TPerson = {
    name: string;
    email: string;
    books: TBook[];
  };

  type TBook = {
    title: string;
    year: number;
    author: TPerson;
  };

  const Person: StructCaster<TPerson> = struct({
    name: string,
    email: string,
    books: array(ref(() => Book)), // eslint-disable-line no-use-before-define
  }, 'Person');

  const Book: StructCaster<TBook> = struct({
    title: string,
    year: integer,
    author: ref(() => Person),
  }, 'Book');

  it.each([
    [{ name: 'John', email: 'john@mail.com', books: [] }],
    [{
      name: 'Arthur',
      email: 'artur@mail.com',
      books: [
        { title: 'The First Book', year: 2020, author: { name: 'John', email: 'john@mail.com', books: [] } },
      ],
    }],
  ])('Person bypasses %j', value => {
    expect(Person(value)).toEqual(value);
  });
});
