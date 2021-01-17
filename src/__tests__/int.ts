import { int } from '..';
import { toBe } from '../validation';

const lt = (max: number) =>
  toBe((value: number) => value < max, `less then ${max}`);

const gt = (min: number) =>
  toBe((value: number) => value > min, `greater then ${min}`);

const eq = (target: number) =>
  toBe((value: number) => value === target, `equal to ${target}`);

const neq = (unwanted: number) =>
  toBe((value: number) => value !== unwanted, `not equal to ${unwanted}`);

describe('int', () => {
  describe('Caster interface', () => {
    it('int.name === "number"', () => {
      expect(int.name).toBe('integer');
    });

    it('int.optional is a Function', () => {
      expect(int.optional).toBeInstanceOf(Function);
    });

    it('int.nullable is a Function', () => {
      expect(int.nullable).toBeInstanceOf(Function);
    });

    it('int.validate is a Function', () => {
      expect(int.validate).toBeInstanceOf(Function);
    });

    it('int.map is a Function', () => {
      expect(int.map).toBeInstanceOf(Function);
    });

    it('int.default is a Function', () => {
      expect(int.default).toBeInstanceOf(Function);
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
      expect(int(value)).toBe(value);
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
    ])('throws a TypeError for "%s"', invalidValue => {
      expect(
        () => int(invalidValue),
      ).toThrow(new TypeError(`integer is expected but "${invalidValue}" received.`));
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
    ])('throws a TypeError for "%s" (with context info)', invalidValue => {
      expect(
        () => int(invalidValue, 'param'),
      ).toThrow(new TypeError(`integer is expected in param but "${invalidValue}" received.`));
    });
  });

  describe('int.optional', () => {
    it.each([
      [null],
      [undefined],
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
    ])('bypases %s', value => {
      expect(int.optional(value)).toBe(value);
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
    ])('throws a TypeError for "%s"', invalidValue => {
      expect(
        () => int(invalidValue),
      ).toThrow(new TypeError(`integer is expected but "${invalidValue}" received.`));
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
    ])('throws a TypeError for "%s" (with context info)', invalidValue => {
      expect(
        () => int.optional(invalidValue, 'param'),
      ).toThrow(new TypeError(`integer is expected in param but "${invalidValue}" received.`));
    });
  });

  describe('int.validate', () => {
    it.each([
      [Number.MIN_SAFE_INTEGER, lt(0)],
      [Number.MAX_SAFE_INTEGER, gt(0)],
      [-100, lt(0)],
      [0, eq(0)],
      [100, gt(0)],
    ])('successfully validates %s with rule', (value, rule) => {
      const spy = jest.fn(rule);
      expect(int.validate(spy)(value)).toBe(value);
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
        () => int.validate(spy)(value),
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
        () => int.validate(spy)(value, 'param'),
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
        () => int.validate(rule)(invalidValue),
      ).toThrow(new TypeError(`integer is expected but "${invalidValue}" received.`));

      expect(rule).not.toBeCalled();
    });
  });

  describe('int.optional.validate', () => {
    it.each([
      [Number.MIN_SAFE_INTEGER, lt(0)],
      [Number.MAX_SAFE_INTEGER, gt(0)],
      [-100, lt(0)],
      [0, eq(0)],
      [100, gt(0)],
    ])('successfully validates %s with rule', (value, rule) => {
      const spy = jest.fn(rule);
      expect(int.optional.validate(spy)(value)).toBe(value);
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
        () => int.optional.validate(spy)(value),
      ).toThrow(new TypeError(errorMessage));
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });

    it.each([
      [null],
      [undefined],
    ])('bypasses %s and doesn\'t call rule', value => {
      const rule = jest.fn();
      expect(int.optional.validate(rule)(value)).toBe(value);
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
        () => int.optional.validate(rule)(invalidValue),
      ).toThrow(new TypeError(`integer is expected but "${invalidValue}" received.`));

      expect(rule).not.toBeCalled();
    });
  });

  describe('int.validate().optional', () => {
    it.each([
      [Number.MIN_SAFE_INTEGER, lt(0)],
      [Number.MAX_SAFE_INTEGER, gt(0)],
      [-100, lt(0)],
      [0, eq(0)],
      [100, gt(0)],
    ])('successfully validates %s with rule', (value, rule) => {
      const spy = jest.fn(rule);
      expect(int.validate(spy).optional(value)).toBe(value);
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
        () => int.validate(spy).optional(value),
      ).toThrow(new TypeError(errorMessage));
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });

    it.each([
      [null],
      [undefined],
    ])('bypasses %s and doesn\'t call rule', value => {
      const rule = jest.fn();
      expect(int.validate(rule).optional(value)).toBe(value);
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
        () => int.validate(rule).optional(invalidValue),
      ).toThrow(new TypeError(`integer is expected but "${invalidValue}" received.`));

      expect(rule).not.toBeCalled();
    });
  });
});
