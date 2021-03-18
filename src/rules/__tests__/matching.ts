import { matching } from '../matching';

describe('matching', () => {
  it('matching("hello").name is "matching hello"', () => {
    expect(matching('hello').name).toBe('matching hello');
  });

  it('matching(/hello/).name is "matching hello"', () => {
    expect(matching(/hello/).name).toBe('matching /hello/');
  });

  it.each([
    ['hello', 'hello'],
    ['hello', 'hello world'],
    ['hello', 'great hello'],
    ['hello', 'again hello world'],

    [/hello/, 'hello'],
    [/hello/, 'hello world'],
    [/hello/, 'great hello'],
    [/hello/, 'again hello world'],

    [/hello/i, 'heLlo'],
    [/hello/i, 'Hello World'],
    [/hello/i, 'great HELLO'],
    [/hello/i, 'again hello world'],
  ])('matching(%s) returns true for %j', (pattern, value) => {
    expect(matching(pattern)(value)).toBe(true);
  });

  it.each([
    ['hello', 'Hello'],
    ['hello', 'Hello world'],
    ['hello', 'great'],
    ['hello', 'again HELLO world'],

    [/^hello$/, 'hello world'],
    [/^hello$/, 'great hello'],
    [/^hello$/, 'again hello world'],
  ])('matching(%s) returns false for %j', (pattern, value) => {
    expect(matching(pattern)(value)).toBe(false);
  });
});
