import { tuple } from '../..';
import { int } from '../int';
import { nil } from '../nil';
import { num } from '../num';
import { str } from '../str';
import { values } from '../values';

describe('tuple', () => {
  describe('tuple.name', () => {
    it('tuple(int, str).name is [integer, string]', () => {
      expect(tuple(int, str).name).toBe('[integer, string]');
    });

    it('tuple(num, nil).name is [number, null]', () => {
      expect(tuple(num, nil).name).toBe('[number, null]');
    });
  });

  describe('Caster Interface', () => {
    const coordVal = tuple(values(1, 2), values('x', 'y'));

    it.each([
      ['optional'],
      ['nullable'],
      ['restrict'],
      ['map'],
      ['default'],
    ])('array(int).%s is a Function', methodName => {
      expect((coordVal as any)[methodName]).toBeInstanceOf(Function);
    });
  });

  describe('::required', () => {
    const intCoords = tuple(int, int);

    it.each([
      [[0, 0]],
      [[Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]],
      [[-100, -100]],
      [[100, 100]],
    ])('bypasses %s', value => {
      expect(intCoords(value)).toEqual(value);
    });

    it.each([
      [null],
      [undefined],
    ])('throws TypeError for %s', value => {
      expect(() => intCoords(value)).toThrow(
        new TypeError(`[integer, integer] is expected but "${value}" received.`),
      );
    });

    it.each([
      [['0', '0']],
      [[{}, {}]],
      [[true, false]],
      [[[1], [2]]],
    ])('throws TypeError for %s', value => {
      expect(() => intCoords(value)).toThrow(
        new TypeError(`integer is expected in #0 but "${value[0]}" received.`),
      );
    });

    it.each([
      [[1]],
      [[0, '0']],
      [[1, {}]],
      [[2, false]],
      [[1, [2]]],
    ])('throws TypeError for %s', value => {
      expect(() => intCoords(value)).toThrow(
        new TypeError(`integer is expected in #1 but "${value[1]}" received.`),
      );
    });

    it.each([
      [null],
      [undefined],
    ])('throws TypeError for %s (with context)', value => {
      expect(() => intCoords(value, 'coords')).toThrow(
        new TypeError(`[integer, integer] is expected in coords but "${value}" received.`),
      );
    });

    it.each([
      [['0', '0']],
      [[{}, {}]],
      [[true, false]],
      [[[1], [2]]],
    ])('throws TypeError for %s (with context)', value => {
      expect(() => intCoords(value, 'coords')).toThrow(
        new TypeError(`integer is expected in coords[0] but "${value[0]}" received.`),
      );
    });

    it.each([
      [[0, '0']],
      [[1, {}]],
      [[2, false]],
      [[1, [2]]],
    ])('throws TypeError for %s (with context)', value => {
      expect(() => intCoords(value, 'coords')).toThrow(
        new TypeError(`integer is expected in coords[1] but "${value[1]}" received.`),
      );
    });
  });

  describe('::last-item-optional', () => {
    const intCoords = tuple(int, int.optional);

    it.each([
      [[0, 0]],
      [[1]],
      [[1, undefined]],
      [[Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]],
      [[-100, -100]],
      [[100, 100]],
    ])('bypasses %s', value => {
      expect(intCoords(value)).toEqual(value);
    });
  });
});
