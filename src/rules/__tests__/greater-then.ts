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
  ])('gt(%s) return true for %s (number)', (limit, value) => {
    expect(gt(limit)(value)).toBe(true);
  });

  it.each([
    ['A', 'B'],
    ['America', 'Hello'],
  ])('gt(%s) return true for %s (string)', (limit, value) => {
    expect(gt(limit)(value)).toBe(true);
  });

  it.each([
    [10, 5],
    [5, 5],
    [100, 0],
    [Math.PI, 0],
    [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ])('gt(%s) return false for %s (number)', (limit, value) => {
    expect(gt(limit)(value)).toBe(false);
  });

  it.each([
    ['B', 'A'],
    ['B', 'B'],
  ])('gt(%s) return false for %s (string)', (limit, value) => {
    expect(gt(limit)(value)).toBe(false);
  });
});

describe('notLessThen', () => {
  it('notLessThen and gte is the same', () => {
    expect(notLessThen).toBe(gte);
  });

  it.each([
    ['gt(5)', 'not less then 5', gte(5)],
    ['gt("A")', 'not less then A', gte('A')],
  ])('%s.name is "%s"', (_, name, predicate) => {
    expect(predicate.name).toBe(name);
  });

  it.each([
    [5, 10],
    [5, 5],
    [0, 100],
    [0, Math.PI],
    [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY],
  ])('gt(%s) return true for %s (numbeR)', (limit, value) => {
    expect(gte(limit)(value)).toBe(true);
  });

  it.each([
    ['A', 'B'],
    ['A', 'A'],
  ])('gt(%s) return true for %s (string)', (limit, value) => {
    expect(gte(limit)(value)).toBe(true);
  });

  it.each([
    [10, 5],
    [100, 0],
    [Math.PI, 0],
    [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
  ])('gt(%s) return false for %s (number)', (limit, value) => {
    expect(gte(limit)(value)).toBe(false);
  });

  it.each([
    ['B', 'A'],
    ['Hello', 'America'],
  ])('gt(%s) return false for %s (string)', (limit, value) => {
    expect(gte(limit)(value)).toBe(false);
  });
});
