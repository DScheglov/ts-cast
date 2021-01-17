import { bool } from '..';

describe('bool', () => {
  it('bool.name === "boolean"', () => {
    expect(bool.name).toBe('boolean');
  });

  describe('Caster Interface', () => {
    it.each([
      ['optional'],
      ['nullable'],
      ['validate'],
      ['map'],
      ['default'],
    ])('bool.%s is a Function', methodName => {
      expect((bool as any)[methodName]).toBeInstanceOf(Function);
    });
  });

  describe('::required:ok', () => {
    it.each([[false], [true]])('bypasses %s', value => {
      expect(bool(value)).toBe(value);
    });
  });

  describe('bool.optional:ok', () => {
    it.each([[undefined], [null], [false], [true]])('bypasses %s', value => {
      expect(bool.optional(value)).toBe(value);
    });
  });

  describe('::requied:failed', () => {
    it.each([
      [null],
      [undefined],
      [Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY],
      [-Math.PI],
      [Math.PI],
      [''],
      ['Hello World'],
      [{}],
      [{ value: 1 }],
      [[]],
      [[1, 2, 3]],
    ])('throws a TypeError for "%s"', value => {
      expect(() => bool(value)).toThrow(
        new TypeError(`boolean is expected but "${value}" received.`),
      );
    });
  });

  describe('bool.optional:failed', () => {
    it.each([
      [Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY],
      [-Math.PI],
      [Math.PI],
      [''],
      ['Hello World'],
      [{}],
      [{ value: 1 }],
      [[]],
      [[1, 2, 3]],
    ])('throws a TypeError for "%s"', value => {
      expect(() => bool.optional(value)).toThrow(
        new TypeError(`boolean is expected but "${value}" received.`),
      );
    });
  });
});
