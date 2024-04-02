import { array } from '../..';
import { boolean } from '../boolean';
import { any } from '../any';
import { integer } from '../integer';
import { number } from '../number';
import { record } from '../record';
import { string } from '../string';

describe('array', () => {
  it('array(int, "Ints").name === "Ints"', () => {
    expect(array(integer, 'Ints').name).toBe('Ints');
  });

  describe('array().name', () => {
    it.each([
      ['integer', integer],
      ['number', number],
      ['string', string],
      ['boolean', boolean],
      ['any', any],
      ['Record<string, any>', record(string, any)],
    ])('array(type) is %s', (_, caster) => {
      expect(array(caster).name).toBe(`${caster.name}[]`);
    });
  });

  describe('Caster Interface', () => {
    it.each([
      ['optional'],
      ['nullable'],
      ['restrict'],
      ['map'],
      ['default'],
      ['either'],
      ['validation'],
      ['validate'],
    ])('array(int).%s is a Function', methodName => {
      expect((array(integer) as any)[methodName]).toBeInstanceOf(Function);
    });
  });

  describe('::required at least one: ok', () => {
    it.each([
      [[]],
      [[1]],
      [[1, 2]],
      [[1, 2, 3, 4, 5]],
    ])('bypasses %s', list => {
      expect(array(integer)(list)).toEqual(list);
    });
  });

  describe('::required including empty array: ok', () => {
    it.each([
      [[]],
      [[1]],
      [[1, 2]],
      [[1, 2, 3, 4, 5]],
    ])('bypasses %s', list => {
      expect(array(integer.optional)(list)).toEqual(list);
    });
  });

  describe('::required at least one: failed with wrong item type', () => {
    it.each([
      [['a'], 0],
      [[1, true], 1],
      [[1, 2, 3, 4, undefined], 4],
    ])('throws a TypeError for %s', (list, index) => {
      expect(() => array(integer)(list)).toThrowError(
        new TypeError(`integer is expected in #${index} but "${list[index]}" received.`),
      );
    });
  });

  describe('::required at least one: failed with wrong item type (context)', () => {
    it.each([
      [['a'], 0],
      [[1, true], 1],
      [[1, 2, 3, 4, undefined], 4],
    ])('throws a TypeError for %s', (list, index) => {
      expect(() => array(integer)(list, 'ints')).toThrowError(
        new TypeError(`integer is expected in ints[${index}] but "${list[index]}" received.`),
      );
    });
  });

  describe('::toBe(nonEmpty)', () => {
    type NonEmptyArray<T> = [T, ...T[]];
    const nonEmptyInts = array(integer).toBe(
      (value: number[]): value is NonEmptyArray<number> => value.length > 0,
      'NonEmptyInt[]',
    );

    it('nonEmptyInts([]) throws a TypeError', () => {
      expect(() => nonEmptyInts([])).toThrow(
        new TypeError('NonEmptyInt[] expected but "" received.'),
      );
    });

    it('nonEmptyInts([1]) === [1]', () => {
      const list = nonEmptyInts([1]);
      expect(list).toEqual([1]);
    });

    it('nonEmptyInts([1, 2]) === [1, 2]', () => {
      expect(nonEmptyInts([1, 2])).toEqual([1, 2]);
    });
  });
});
