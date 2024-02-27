import { union } from '../..';
import { integer } from '../integer';
import { string } from '../string';

describe('union', () => {
  describe('Caster Interface', () => {
    it('union(int, str).name === "integer|string"', () => {
      expect(union(integer, string).name).toBe('integer|string');
    });

    it.each([
      ['optional'],
      ['nullable'],
      ['restrict'],
      ['map'],
      ['default'],
      ['either'],
      ['validation'],
      ['validate'],
    ])('union(int, str).%s is a Function', methodName => {
      expect((union(integer, string) as any)[methodName]).toBeInstanceOf(Function);
    });
  });

  describe('specific', () => {
    it('throws error if no caster is specified', () => {
      expect(() => (union as any)()).toThrow(new Error('At least two types should be specified.'));
    });

    it('throws error if one caster is specified', () => {
      expect(() => (union as any)(integer)).toThrow(new Error('At least two types should be specified.'));
    });

    it('doesn\'t call the second type caster if value matches the first one ', () => {
      const intSpy = jest.fn(integer);
      const strSpy = jest.fn(string);
      const intOrStr = union(intSpy, strSpy);

      expect(intOrStr(1)).toBe(1);

      expect(intSpy).toHaveBeenCalledWith(1, undefined);
      expect(strSpy).not.toHaveBeenCalled();
    });
  });

  describe('::required', () => {
    const intOrStr = union(integer, string);

    it.each([
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
      [''],
      ['hello world'],
    ])('bypasses %s', value => {
      expect(intOrStr(value)).toBe(value);
    });

    it.each([
      [null],
      [undefined],
      [Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY],
      [-Math.PI],
      [Math.PI],
      [false],
      [true],
      [{}],
      [{ value: 1 }],
      [[]],
      [[1, 2, 3]],
    ])('throws TypeError for %s', value => {
      expect(() => intOrStr(value)).toThrow(
        new TypeError('integer|string is expected but no matching type was found:\n' +
        `  - integer: integer is expected but "${value}" received.\n` +
        `  - string: string is expected but "${value}" received.`),
      );
    });

    it.each([
      [null],
      [undefined],
      [Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY],
      [-Math.PI],
      [Math.PI],
      [false],
      [true],
      [{}],
      [{ value: 1 }],
      [[]],
      [[1, 2, 3]],
    ])('throws TypeError for %s (with context)', value => {
      expect(() => intOrStr(value, 'field')).toThrow(
        new TypeError('integer|string is expected in field but no matching type was found:\n' +
        `  - integer: integer is expected in field but "${value}" received.\n` +
        `  - string: string is expected in field but "${value}" received.`),
      );
    });
  });

  describe('::with optional type', () => {
    const intOrStr = union(integer, string.optional);

    it.each([
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
      [''],
      ['hello world'],
      [undefined],
    ])('bypasses %s', value => {
      expect(intOrStr(value)).toBe(value);
    });

    it.each([
      [null],
      [Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY],
      [-Math.PI],
      [Math.PI],
      [false],
      [true],
      [{}],
      [{ value: 1 }],
      [[]],
      [[1, 2, 3]],
    ])('throws TypeError for %s', value => {
      expect(() => intOrStr(value)).toThrow(
        new TypeError('integer|string | undefined is expected but no matching type was found:\n' +
        `  - integer: integer is expected but "${value}" received.\n` +
        `  - string | undefined: string is expected but "${value}" received.`),
      );
    });

    it.each([
      [null],
      [Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY],
      [-Math.PI],
      [Math.PI],
      [false],
      [true],
      [{}],
      [{ value: 1 }],
      [[]],
      [[1, 2, 3]],
    ])('throws TypeError for %s (with context)', value => {
      expect(() => intOrStr(value, 'field')).toThrow(
        new TypeError('integer|string | undefined is expected in field but no matching type was found:\n' +
        `  - integer: integer is expected in field but "${value}" received.\n` +
        `  - string | undefined: string is expected in field but "${value}" received.`),
      );
    });
  });
});
