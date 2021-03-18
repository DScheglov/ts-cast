import { undef } from '../..';

describe('undef', () => {
  describe('Caster Interface', () => {
    it('undef.name === "undefined"', () => {
      expect(undef.name).toBe('undefined');
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
    ])('undef.%s is a Function', methodName => {
      expect((undef as any)[methodName]).toBeInstanceOf(Function);
    });
  });

  it('returns undefined for undefined', () => {
    expect(undef(undefined)).toBe(undefined);
  });

  it.each([
    [null],
    [Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY],
    [-Math.PI],
    [Math.PI],
    [''],
    ['hello world'],
    [false],
    [true],
    [{}],
    [{ value: 1 }],
    [[]],
    [[1, 2, 3]],
  ])('throws TypeError for %s', value => {
    expect(() => undef(value)).toThrow(
      new TypeError(`undefined is expected but "${value}" received.`),
    );
  });

  it.each([
    [null],
    [Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY],
    [-Math.PI],
    [Math.PI],
    [''],
    ['hello world'],
    [false],
    [true],
    [{}],
    [{ value: 1 }],
    [[]],
    [[1, 2, 3]],
  ])('throws TypeError for %s', value => {
    expect(() => undef(value, 'field')).toThrow(
      new TypeError(`undefined is expected in field but "${value}" received.`),
    );
  });
});
