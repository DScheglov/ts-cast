import { array } from '../..';
import { bool } from '../bool';
import { indif } from '../indif';
import { int } from '../int';
import { num } from '../num';
import { record } from '../record';
import { str } from '../str';

describe('array', () => {
  it('array(int, "Ints").name === "Ints"', () => {
    expect(array(int, 'Ints').name).toBe('Ints');
  });

  describe('array().name', () => {
    it.each([
      ['integer', int],
      ['number', num],
      ['string', str],
      ['boolean', bool],
      ['any', indif],
      ['Record<string, any>', record(str, indif)],
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
    ])('array(int).%s is a Function', methodName => {
      expect((array(int) as any)[methodName]).toBeInstanceOf(Function);
    });
  });

  describe('::required at least one: ok', () => {
    it.each([
      [[]],
      [[1]],
      [[1, 2]],
      [[1, 2, 3, 4, 5]],
    ])('bypasses %s', list => {
      expect(array(int)(list)).toEqual(list);
    });
  });

  describe('::required including empty array: ok', () => {
    it.each([
      [[]],
      [[1]],
      [[1, 2]],
      [[1, 2, 3, 4, 5]],
    ])('bypasses %s', list => {
      expect(array(int.optional)(list)).toEqual(list);
    });
  });

  describe('::required at least one: failed with wrong item type', () => {
    it.each([
      [['a'], 0],
      [[1, true], 1],
      [[1, 2, 3, 4, undefined], 4],
    ])('throws a TypeError for %s', (list, index) => {
      expect(() => array(int)(list)).toThrowError(
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
      expect(() => array(int)(list, 'ints')).toThrowError(
        new TypeError(`integer is expected in ints[${index}] but "${list[index]}" received.`),
      );
    });
  });
});
