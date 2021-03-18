import {
  lessThen, notGreaterThen, lt, lte,
} from '../less-then';

describe('lessThen', () => {
  it('lessThen and lt is the same', () => {
    expect(lessThen).toBe(lt);
  });

  it.each([
    [5, 'less then 5'],
  ])('lt(%s).name is %j', (limit, name) => {
    expect(lt(limit).name).toBe(name);
  });

  it.each([
    ['A', 'less then A'],
  ])('lt(%s).name is %j', (limit, name) => {
    expect(lt(limit).name).toBe(name);
  });

  it.each([
    [10, 5],
    [100, 0],
    [Math.PI, 0],
    [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
  ])('lt(%s) returns true for %s', (limit, value) => {
    expect(lt(limit)(value)).toBe(true);
  });

  it.each([
    ['B', 'A'],
  ])('lt(%s) returns true for %s', (limit, value) => {
    expect(lt(limit)(value)).toBe(true);
  });

  it.each([
    [5, 10],
    [5, 5],
    [0, 100],
    [0, Math.PI],
    [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
  ])('lt(%s) returns false for %s', (limit, value) => {
    expect(lt(limit)(value)).toBe(false);
  });

  it.each([
    ['A', 'B'],
    ['A', 'A'],
  ])('lt(%s) returns false for %s', (limit, value) => {
    expect(lt(limit)(value)).toBe(false);
  });
});

describe('notGreaterThen', () => {
  it('notGreaterThen and lte is the same', () => {
    expect(notGreaterThen).toBe(lte);
  });

  it.each([
    [5, 'not greater then 5'],
  ])('lte(%s).name is %j', (limit, name) => {
    expect(lte(limit).name).toBe(name);
  });

  it.each([
    ['A', 'not greater then A'],
  ])('lte(%s).name is %j', (limit, name) => {
    expect(lte(limit).name).toBe(name);
  });

  it.each([
    [10, 5],
    [5, 5],
    [100, 0],
    [Math.PI, 0],
    [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ])('lte(%s) returns true for %s', (limit, value) => {
    expect(lte(limit)(value)).toBe(true);
  });

  it.each([
    ['B', 'A'],
    ['B', 'B'],
  ])('lte(%s) returns true for %s', (limit, value) => {
    expect(lte(limit)(value)).toBe(true);
  });

  it.each([
    [5, 10],
    [0, 100],
    [0, Math.PI],
    [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
  ])('lte(%s) returns false for %s', (limit, value) => {
    expect(lte(limit)(value)).toBe(false);
  });

  it.each([
    ['', '_'],
    ['A', 'B'],
    ['America', 'Hello'],
  ])('lte(%s) returns false for %s', (limit, value) => {
    expect(lte(limit)(value)).toBe(false);
  });
});
