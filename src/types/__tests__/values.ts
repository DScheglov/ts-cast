import { values } from '../..';

describe('values', () => {
  describe('values().name is 1|2|3', () => {
    it('values(1, 2, 3).name', () => {
      expect(values(1, 2, 3).name).toBe('1|2|3');
    });

    it('values("one", "two", "three").name is "one"|"two"|"three"', () => {
      expect(values('one', 'two', 'three').name).toBe('"one"|"two"|"three"');
    });
  });

  describe('Caster Interface', () => {
    const enum123 = values(1, 2, 3);

    it.each([
      ['optional'],
      ['nullable'],
      ['restrict'],
      ['map'],
      ['default'],
    ])('array(int).%s is a Function', methodName => {
      expect((enum123 as any)[methodName]).toBeInstanceOf(Function);
    });
  });

  describe('::required:ok', () => {
    it.each([
      [[1, 2, 3], 3],
      [['one', 'two', 'three'], 'two'],
      [[true], true],
    ])('values(...%j) bypasses %s', (items, value) => {
      const caster = values(...items);
      expect(caster(value)).toBe(value);
    });
  });

  describe('::required:failed', () => {
    it.each([
      [[1, 2, 3], 4],
      [[1, 2, 3], null],
      [[1, 2, 3], undefined],
      [['one', 'two', 'three'], ''],
      [['one', 'two', 'three'], 12],
      [['one', 'two', 'three'], null],
      [['one', 'two', 'three'], undefined],
      [[true], false],
      [[true], null],
      [[true], undefined],
    ])('values(...%j) throws TypeError for %s', (items, value) => {
      const caster = values(...items);
      expect(() => caster(value)).toThrowError(
        new TypeError(`${caster.name} is expected but "${value}" received.`),
      );
    });
  });
});
