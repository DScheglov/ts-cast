import { text } from '../..';
import { toBe } from '../../restrictions';

const lt = (max: number) =>
  toBe((value: number) => value < max, `less then ${max}`);

const gt = (min: number) =>
  toBe((value: number) => value > min, `greater then ${min}`);

const eq = (target: number) =>
  toBe((value: number) => value === target, `equal to ${target}`);

const neq = (unwanted: number) =>
  toBe((value: number) => value !== unwanted, `not equal to ${unwanted}`);

describe('text.int', () => {
  describe('Caster interface', () => {
    it('text.int.name === "number"', () => {
      expect(text.integer.name).toBe('text.integer');
    });

    it('text.int.optional is a Function', () => {
      expect(text.integer.optional).toBeInstanceOf(Function);
    });

    it('text.int.nullable is a Function', () => {
      expect(text.integer.nullable).toBeInstanceOf(Function);
    });

    it('text.int.restrict is a Function', () => {
      expect(text.integer.restrict).toBeInstanceOf(Function);
    });

    it('text.int.map is a Function', () => {
      expect(text.integer.map).toBeInstanceOf(Function);
    });

    it('text.int.default is a Function', () => {
      expect(text.integer.default).toBeInstanceOf(Function);
    });
  });

  describe('::required', () => {
    it.each([
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
    ])('bypases %s', value => {
      expect(text.integer(value.toString())).toBe(value);
    });

    it.each([
      [null],
      [undefined],
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
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
    ])('throws a TypeError for "%s"', invalidValue => {
      expect(
        () => text.integer(invalidValue),
      ).toThrow(new TypeError(`text.integer is expected but "${invalidValue}" received.`));
    });

    it.each([
      [null],
      [undefined],
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
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
    ])('throws a TypeError for "%s" (with context info)', invalidValue => {
      expect(
        () => text.integer(invalidValue, 'param'),
      ).toThrow(new TypeError(`text.integer is expected in param but "${invalidValue}" received.`));
    });
  });

  describe('text.int.optional', () => {
    it.each([
      [undefined],
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
    ])('bypases %s', value => {
      expect(text.integer.optional(value === undefined ? value : value.toString())).toBe(value);
    });

    it.each([
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
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
    ])('throws a TypeError for "%s"', invalidValue => {
      expect(
        () => text.integer.optional(invalidValue),
      ).toThrow(new TypeError(`text.integer is expected but "${invalidValue}" received.`));
    });

    it.each([
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
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
    ])('throws a TypeError for "%s" (with context info)', invalidValue => {
      expect(
        () => text.integer.optional(invalidValue, 'param'),
      ).toThrow(new TypeError(`text.integer is expected in param but "${invalidValue}" received.`));
    });
  });

  describe('text.int.nullable', () => {
    it.each([
      [null],
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
    ])('bypases %s', value => {
      expect(text.integer.nullable(value !== null ? value.toString() : value)).toBe(value);
    });

    it.each([
      [undefined],
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
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
    ])('throws a TypeError for "%s"', invalidValue => {
      expect(
        () => text.integer.nullable(invalidValue),
      ).toThrow(new TypeError(`text.integer is expected but "${invalidValue}" received.`));
    });

    it.each([
      [undefined],
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
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
    ])('throws a TypeError for "%s" (with context info)', invalidValue => {
      expect(
        () => text.integer.nullable(invalidValue, 'param'),
      ).toThrow(new TypeError(`text.integer is expected in param but "${invalidValue}" received.`));
    });
  });

  describe('text.int.restrict', () => {
    it.each([
      [Number.MIN_SAFE_INTEGER, lt(0)],
      [Number.MAX_SAFE_INTEGER, gt(0)],
      [-100, lt(0)],
      [0, eq(0)],
      [100, gt(0)],
    ])('successfully validates %s with rule', (value, rule) => {
      const spy = jest.fn(rule);
      expect(text.integer.restrict(spy)(value.toString())).toBe(value);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });

    it.each([
      [Number.MIN_SAFE_INTEGER, gt(0), 'greater then 0'],
      [Number.MAX_SAFE_INTEGER, lt(0), 'less then 0'],
      [-100, gt(0), 'greater then 0'],
      [0, neq(0), 'not equal to 0'],
      [100, lt(0), 'less then 0'],
    ])('validates %s with rule and throws an error', (value, rule, message) => {
      const spy = jest.fn(rule);
      const errorMessage = `expected value is ${message} but received ${value}.`;
      expect(
        () => text.integer.restrict(spy)(value.toString()),
      ).toThrow(new TypeError(errorMessage));
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });

    it.each([
      [Number.MIN_SAFE_INTEGER, gt(0), 'greater then 0'],
      [Number.MAX_SAFE_INTEGER, lt(0), 'less then 0'],
      [-100, gt(0), 'greater then 0'],
      [0, neq(0), 'not equal to 0'],
      [100, lt(0), 'less then 0'],
    ])('validates %s with rule and throws an error (with context)', (value, rule, message) => {
      const spy = jest.fn(rule);
      const errorMessage = `param should be ${message} but received ${value}.`;
      expect(
        () => text.integer.restrict(spy)(value.toString(), 'param'),
      ).toThrow(new TypeError(errorMessage));
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });
    it.each([
      [null],
      [undefined],
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
    ])('throws a TypeError for "%s" and doesn\'t call rule', invalidValue => {
      const rule = jest.fn().mockReturnValue(null); // rule returns null on success
      expect(
        () => text.integer.restrict(rule)(invalidValue),
      ).toThrow(new TypeError(`text.integer is expected but "${invalidValue}" received.`));

      expect(rule).not.toBeCalled();
    });
  });

  describe('text.int.optional.restrict', () => {
    it.each([
      [Number.MIN_SAFE_INTEGER, lt(0)],
      [Number.MAX_SAFE_INTEGER, gt(0)],
      [-100, lt(0)],
      [0, eq(0)],
      [100, gt(0)],
    ])('successfully validates %s with rule', (value, rule) => {
      const spy = jest.fn(rule);
      expect(text.integer.optional.restrict(spy)(value.toString())).toBe(value);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });

    it.each([
      [Number.MIN_SAFE_INTEGER, gt(0), 'greater then 0'],
      [Number.MAX_SAFE_INTEGER, lt(0), 'less then 0'],
      [-100, gt(0), 'greater then 0'],
      [0, neq(0), 'not equal to 0'],
      [100, lt(0), 'less then 0'],
    ])('validates %s with rule and throws an error', (value, rule, message) => {
      const spy = jest.fn(rule);
      const errorMessage = `expected value is ${message} but received ${value}.`;
      expect(
        () => text.integer.optional.restrict(spy)(value.toString()),
      ).toThrow(new TypeError(errorMessage));
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });

    it.each([
      [undefined],
    ])('bypasses %s and doesn\'t call rule', value => {
      const rule = jest.fn();
      expect(text.integer.optional.restrict(rule)(value)).toBe(value);
      expect(rule).not.toBeCalled();
    });

    it.each([
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
    ])('throws a TypeError for "%s" and doesn\'t call rule', invalidValue => {
      const rule = jest.fn().mockReturnValue(null); // rule returns null on success
      expect(
        () => text.integer.optional.restrict(rule)(invalidValue),
      ).toThrow(new TypeError(`text.integer is expected but "${invalidValue}" received.`));

      expect(rule).not.toBeCalled();
    });
  });

  describe('text.int.restrict().optional', () => {
    it.each([
      [Number.MIN_SAFE_INTEGER, lt(0)],
      [Number.MAX_SAFE_INTEGER, gt(0)],
      [-100, lt(0)],
      [0, eq(0)],
      [100, gt(0)],
    ])('successfully validates %s with rule', (value, rule) => {
      const spy = jest.fn(rule);
      expect(text.integer.restrict(spy).optional(value.toString())).toBe(value);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });

    it.each([
      [Number.MIN_SAFE_INTEGER, gt(0), 'greater then 0'],
      [Number.MAX_SAFE_INTEGER, lt(0), 'less then 0'],
      [-100, gt(0), 'greater then 0'],
      [0, neq(0), 'not equal to 0'],
      [100, lt(0), 'less then 0'],
    ])('validates %s with rule and throws an error', (value, rule, message) => {
      const spy = jest.fn(rule);
      const errorMessage = `expected value is ${message} but received ${value}.`;
      expect(
        () => text.integer.restrict(spy).optional(value.toString()),
      ).toThrow(new TypeError(errorMessage));
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });

    it.each([
      [undefined],
    ])('bypasses %s and doesn\'t call rule', value => {
      const rule = jest.fn();
      expect(text.integer.restrict(rule).optional(value)).toBe(value);
      expect(rule).not.toBeCalled();
    });

    it.each([
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
    ])('throws a TypeError for "%s" and doesn\'t call rule', invalidValue => {
      const rule = jest.fn().mockReturnValue(null); // rule returns null on success
      expect(
        () => text.integer.restrict(rule).optional(invalidValue),
      ).toThrow(new TypeError(`text.integer is expected but "${invalidValue}" received.`));

      expect(rule).not.toBeCalled();
    });
  });
});
