import {
  is, number, struct, string, boolean, integer,
} from '../..';

describe('is', () => {
  const Person = struct({ name: string, age: integer });

  const isNumber = is(number);
  const isString = is(string);
  const isBoolean = is(boolean);
  const isInteger = is(integer);
  const isPerson = is(Person);

  it('creates a type quard for number', () => {
    const guard: (value: any) => value is number = isNumber;
    expect(guard).toBeInstanceOf(Function);
  });

  it('creates a type quard for string', () => {
    const guard: (value: any) => value is string = isString;
    expect(guard).toBeInstanceOf(Function);
  });

  it('creates a type guard for boolean', () => {
    const guard: (value: any) => value is boolean = isBoolean;
    expect(guard).toBeInstanceOf(Function);
  });

  it('creates a type guard for integer', () => {
    const guard: (value: any) => value is number = isInteger;
    expect(guard).toBeInstanceOf(Function);
  });

  it('creates a type guard for struct', () => {
    const guard: (value: any) => value is ReturnType<typeof Person> = isPerson;
    expect(guard).toBeInstanceOf(Function);
  });

  it.each([
    [{ name: 'John', age: 42 }],
    [{ name: '', age: 0 }],
  ])('isPerson(%j) returns true', value => {
    expect(isPerson(value)).toBe(true);
  });

  it.each([
    [null],
    [undefined],
    [() => {}],
    ['string'],
    [100],
    [{}],
    [{ age: 42 }],
    [{ name: 'John' }],
  ])('isPerson(%j) returns false', value => {
    expect(isPerson(value)).toBe(false);
  });
});
