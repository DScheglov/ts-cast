import {
  length, nonEmpty, longerThen, notLongerThen, notShorterThen, shorterThen,
} from '../len';

describe('length', () => {
  it.each([
    ['gt' as const, 'longerThen', longerThen],
    ['lte' as const, 'notLongerThen', notLongerThen],
    ['lt' as const, 'shorterThen', shorterThen],
    ['gte' as const, 'notShorterThen', notShorterThen],
  ])('length.%s is the same as %s', (method, __, fn) => {
    expect(length[method]).toBe(fn);
  });

  describe('nonEmpty', () => {
    it('nonEmpty.name === "non empty"', () => {
      expect(nonEmpty.name).toBe('non empty');
    });

    it.each([
      ['a'],
      [' '],
      ['    '],
      ['\n'],
      ['\t'],
      ['some more longer string'],
      [[1]],
      [[undefined]],
      [[null]],
      [Array.from({ length: 20 })],
    ])('it returns true for %s', value => {
      expect(nonEmpty(value)).toBe(true);
    });

    it.each([
      [''], [[]],
    ])('it returns false for %s', value => {
      expect(nonEmpty(value)).toBe(false);
    });
  });

  describe('longerThen', () => {
    it.each([
      [1, 'longer then 1'],
      [2, 'longer then 2'],
      [100, 'longer then 100'],
    ])('longerThen(%s).name is %j', (len, name) => {
      expect(longerThen(len).name).toBe(name);
    });

    it.each([
      [1, [1, 2]],
      [0, [1]],
      [5, [1, 2, 3, 4, 5, 6]],
      [5, 'hello world'],
      [0, 'A'],
    ])('longerThen(%s) returns true for %j', (len, value) => {
      expect(longerThen(len)(value)).toBe(true);
    });

    it.each([
      [0, ''],
      [1, ''],
      [0, []],
      [1, []],
      [1, [1]],
      [5, [1, 2, 3, 4, 5]],
      [5, [1, 2, 3]],
      [5, 'hello'],
      [5, 'hi'],
    ])('longerThen(%s) returns false for %j', (len, value) => {
      expect(longerThen(len)(value)).toBe(false);
    });
  });

  describe('notShorterThen', () => {
    it.each([
      [1, 'not shorter then 1'],
      [2, 'not shorter then 2'],
      [100, 'not shorter then 100'],
    ])('notShorterThen(%s).name is %j', (len, name) => {
      expect(notShorterThen(len).name).toBe(name);
    });

    it.each([
      [1, [1, 2]],
      [1, [1]],
      [0, [1]],
      [5, [1, 2, 3, 4, 5]],
      [5, [1, 2, 3, 4, 5, 6]],
      [5, 'hello world'],
      [5, 'hello'],
      [0, 'A'],
      [0, ''],
      [0, []],
    ])('notShorterThen(%s) returns true for %j', (len, value) => {
      expect(notShorterThen(len)(value)).toBe(true);
    });

    it.each([
      [1, ''],
      [1, []],
      [5, [1, 2, 3]],
      [5, 'hi'],
    ])('notShorterThen(%s) returns false for %j', (len, value) => {
      expect(notShorterThen(len)(value)).toBe(false);
    });
  });

  describe('shortThen', () => {
    it.each([
      [1, 'shorter then 1'],
      [2, 'shorter then 2'],
      [100, 'shorter then 100'],
    ])('shorterThen(%s).name is %j', (len, name) => {
      expect(shorterThen(len).name).toBe(name);
    });

    it.each([
      [1, ''],
      [1, []],
      [5, [1, 2, 3, 4]],
      [5, [1, 2]],
      [5, []],
      [5, 'home'],
      [5, ''],
      [5, 'A'],
    ])('shortThen(%s) returns true for %j', (len, value) => {
      expect(shorterThen(len)(value)).toBe(true);
    });

    it.each([
      [0, ''],
      [0, []],
      [1, [1]],
      [1, 'A'],
      [5, [1, 2, 3, 4, 5]],
      [5, [1, 2, 3, 4, 5, 6]],
      [5, Array.from({ length: 100 })],
      [5, '='.repeat(20)],
    ])('shorterThen(%s) returns false for %j', (len, value) => {
      expect(shorterThen(len)(value)).toBe(false);
    });
  });

  describe('notLongerThen', () => {
    it.each([
      [1, 'not longer then 1'],
      [2, 'not longer then 2'],
      [100, 'not longer then 100'],
    ])('notLongerThen(%s).name is %j', (len, name) => {
      expect(notLongerThen(len).name).toBe(name);
    });

    it.each([
      [1, ''],
      [1, []],
      [1, 'A'],
      [1, [1]],
      [5, [1, 2, 3, 4]],
      [5, [1, 2]],
      [5, []],
      [5, 'home'],
      [5, 'hello'],
      [5, ''],
      [5, 'A'],
    ])('notLongerThen(%s) returns true for %j', (len, value) => {
      expect(notLongerThen(len)(value)).toBe(true);
    });

    it.each([
      [0, [1]],
      [0, 'A'],
      [5, [1, 2, 3, 4, 5, 6]],
      [5, Array.from({ length: 100 })],
      [5, '='.repeat(20)],
    ])('notLongerThen(%s) returns false for %j', (len, value) => {
      expect(notLongerThen(len)(value)).toBe(false);
    });
  });
});
