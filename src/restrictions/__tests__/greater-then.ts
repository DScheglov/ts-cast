import {
  greaterThen, gt, notLessThen, gte,
} from '..';

describe('greaterThen', () => {
  it('greaterThen and gt is the same', () => {
    expect(greaterThen).toBe(gt);
  });

  it.each([
    ['gt(5)', 'greater then 5', gt(5)],
    ['gt("A")', 'greater then A', gt('A')],
  ])('%s.name is "%s"', (_, name, predicate) => {
    expect(predicate.name).toBe(name);
  });

  it.each([
    [5, 10],
    [0, 100],
    [0, Math.PI],
    [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
    ['A', 'B'],
  ])('gt(%s) return true for %s', (limit, value) => {
    expect(gt(limit)(value)).toBe(true);
  });

  it.each([
    [10, 5],
    [5, 5],
    [100, 0],
    [Math.PI, 0],
    [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
    ['B', 'A'],
    ['B', 'B'],
  ])('gt(%s) return false for %s', (limit, value) => {
    expect(gt(limit)(value)).toBe(false);
  });
});

describe('notLessThen', () => {
  it('notLessThen and gte is the same', () => {
    expect(notLessThen).toBe(gte);
  });
});
