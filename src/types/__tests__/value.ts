import { value } from '../..';

describe('value', () => {
  describe('value().name is 1', () => {
    it('value(1, 2, 3).name', () => {
      expect(value(1).name).toBe('1');
    });

    it('value("one").name is "one"', () => {
      expect(value('one').name).toBe('"one"');
    });

    it('value("one", "theOne").name is "theOne', () => {
      expect(value('one', 'theOne').name).toBe('theOne');
    });
  });

  describe('Caster Interface', () => {
    const enum123 = value(1);

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
      [3, 3],
      ['two', 'two'],
      [true, true],
    ])('value(%j) bypasses %s', (literal, val) => {
      const caster = value(literal);
      expect(caster(val)).toBe(val);
    });
  });

  describe('::required:failed', () => {
    it.each([
      [3, 4],
      [3, null],
      [3, undefined],
      ['two', ''],
      ['two', 12],
      ['two', null],
      ['two', undefined],
      [true, false],
      [true, null],
      [true, undefined],
    ])('value(%j) throws TypeError for %s', (literal, val) => {
      const caster = value(literal);
      expect(() => caster(val)).toThrowError(
        new TypeError(`${caster.name} is expected but "${val}" received.`),
      );
    });
  });
});
