import { notEqual, ne } from '../not-equal';

describe('notEqual', () => {
  it('notEqual and ne is the same', () => {
    expect(notEqual).toBe(ne);
  });

  it.each([
    [1, 'not equal to 1'],
    [Number.POSITIVE_INFINITY, 'not equal to Infinity'],
  ])('ne(%j).name is %j (number)', (antipattern, name) => {
    expect(ne(antipattern).name).toBe(name);
  });

  it.each([
    ['Text', 'not equal to Text'],
  ])('ne(%j).name is %j (string)', (antipattern, name) => {
    expect(ne(antipattern).name).toBe(name);
  });

  it.each([
    [true, 'not equal to true'],
  ])('ne(%j).name is %j (bool)', (antipattern, name) => {
    expect(ne(antipattern).name).toBe(name);
  });
  it.each([
    [1, 2],
    [1, Number.POSITIVE_INFINITY],
  ])('ne(%j) returns true for %j (number)', (anti, value) => {
    expect(ne(anti)(value)).toBe(true);
  });

  it.each([
    ['text', 'words'],
  ])('ne(%j) returns true for %j (string)', (anti, value) => {
    expect(ne(anti)(value)).toBe(true);
  });

  it.each([
    [true, false],
  ])('ne(%j) returns true for %j (bool)', (anti, value) => {
    expect(ne(anti)(value)).toBe(true);
  });

  it.each([
    [1, 1],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ])('ne(%j) returns false for %j (number)', (anti, value) => {
    expect(ne(anti)(value)).toBe(false);
  });

  it.each([
    ['text', 'text'],
  ])('ne(%j) returns false for %j', (anti, value) => {
    expect(ne(anti)(value)).toBe(false);
  });

  it.each([
    [true, true],
  ])('ne(%j) returns false for %j', (anti, value) => {
    expect(ne(anti)(value)).toBe(false);
  });
});
