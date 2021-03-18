import { gt } from '../greater-then';
import { lt } from '../less-then';
import { ne } from '../not-equal';
import { not, or, and } from '../operations';

describe('not', () => {
  it.each([
    ['lt', 'not less then 5', lt],
    ['gt', 'not greater then 5', gt],
    ['ne', 'not not equal to 5', ne],
  ])('not(%s(5)).name is %j', (_, name, predicate) => {
    expect(not(predicate(5)).name).toBe(name);
  });

  it.each([
    [10, 5],
    [100, 0],
    [Math.PI, 0],
    [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
  ])('not(lt(%s)) returns false for %s (number)', (limit, value) => {
    expect(not(lt(limit))(value)).toBe(false);
  });

  it.each([
    ['B', 'A'],
    ['Hello', 'America'],
  ])('not(lt(%s)) returns false for %s (str)', (limit, value) => {
    expect(not(lt(limit))(value)).toBe(false);
  });

  it.each([
    [5, 10],
    [5, 5],
    [0, 100],
    [0, Math.PI],
    [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
  ])('not(lt(%s)) returns true for %s (number)', (limit, value) => {
    expect(not(lt(limit))(value)).toBe(true);
  });

  it.each([
    ['A', 'B'],
    ['A', 'A'],
  ])('not(lt(%s)) returns true for %s (string)', (limit, value) => {
    expect(not(lt(limit))(value)).toBe(true);
  });
});

describe('or', () => {
  it('or(lt(5), gt(10)).name is "less then 5 or greater then 10"', () => {
    expect(or(lt(5), gt(10)).name).toBe('less then 5 or greater then 10');
  });

  it('or(lt(5), gt(10), ne(11)).name is "less then 5, greater then 10 or not equal to 11"', () => {
    expect(or(lt(5), gt(10), ne(11)).name).toBe('less then 5, greater then 10 or not equal to 11');
  });

  it.each([
    [1],
    [11],
    [Number.NEGATIVE_INFINITY],
    [Number.NEGATIVE_INFINITY],
  ])('or(lt(5), gt(10)) returns true for %s', value => {
    expect(or(lt(5), gt(10))(value)).toBe(true);
  });

  it.each([
    [5],
    [10],
    [6],
    [7],
    [8],
    [5 + Math.PI],
  ])('or(lt(5), gt(10)) returns false for %s', value => {
    expect(or(lt(5), gt(10))(value)).toBe(false);
  });
});

describe('and', () => {
  it('and(gt(5), lt(10)).name is "greater then 5 and less then 10"', () => {
    expect(and(gt(5), lt(10)).name).toBe('greater then 5 and less then 10');
  });

  it('and(gt(5), lt(10), ne(7)).name is "greater then 5, less then 10 and not equal to 7"', () => {
    expect(and(gt(5), lt(10), ne(7)).name).toBe('greater then 5, less then 10 and not equal to 7');
  });

  it.each([
    [6],
    [8],
    [9],
    [4 + Math.PI],
  ])('and(gt(5), lt(10), ne(7)) returns true for %s', value => {
    expect(and(gt(5), lt(10), ne(7))(value)).toBe(true);
  });

  it.each([
    [5],
    [10],
    [7],
    [Number.MAX_SAFE_INTEGER],
    [Number.MIN_SAFE_INTEGER],
  ])('and(gt(5), lt(10), ne(7)) returns false for %s', value => {
    expect(and(gt(5), lt(10), ne(7))(value)).toBe(false);
  });
});
