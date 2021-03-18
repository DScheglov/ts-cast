import { integer } from '../..';
import { toBe } from '../../rules';

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
      expect(integer.name).toBe('integer');
    });

    it('int.optional is a Function', () => {
      expect(integer.optional).toBeInstanceOf(Function);
    });

    it('int.nullable is a Function', () => {
      expect(integer.nullable).toBeInstanceOf(Function);
    });

    it('int.restrict is a Function', () => {
      expect(integer.restrict).toBeInstanceOf(Function);
    });

    it('int.map is a Function', () => {
      expect(integer.map).toBeInstanceOf(Function);
    });

    it('int.default is a Function', () => {
      expect(integer.default).toBeInstanceOf(Function);
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
      expect(integer(value)).toBe(value);
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
        () => integer(invalidValue),
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
        () => integer(invalidValue, 'param'),
      ).toThrow(new TypeError(`integer is expected in param but "${invalidValue}" received.`));
    });
  });

  describe('int.optional', () => {
    it.each([
      [undefined],
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
    ])('bypases %s', value => {
      expect(integer.optional(value)).toBe(value);
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
        () => integer.optional(invalidValue),
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
        () => integer.optional(invalidValue, 'param'),
      ).toThrow(new TypeError(`integer is expected in param but "${invalidValue}" received.`));
    });
  });

  describe('int.nullable', () => {
    it.each([
      [null],
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
    ])('bypases %s', value => {
      expect(integer.nullable(value)).toBe(value);
    });

    it.each([
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
        () => integer.nullable(invalidValue),
      ).toThrow(new TypeError(`integer is expected but "${invalidValue}" received.`));
    });

    it.each([
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
        () => integer.nullable(invalidValue, 'param'),
      ).toThrow(new TypeError(`integer is expected in param but "${invalidValue}" received.`));
    });
  });

  describe('int.restrict', () => {
    it.each([
      [Number.MIN_SAFE_INTEGER, lt(0)],
      [Number.MAX_SAFE_INTEGER, gt(0)],
      [-100, lt(0)],
      [0, eq(0)],
      [100, gt(0)],
    ])('successfully validates %s with rule', (value, rule) => {
      const spy = jest.fn(rule);
      expect(integer.restrict(spy)(value)).toBe(value);
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
        () => integer.restrict(spy)(value),
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
        () => integer.restrict(spy)(value, 'param'),
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
        () => integer.restrict(rule)(invalidValue),
      ).toThrow(new TypeError(`integer is expected but "${invalidValue}" received.`));

      expect(rule).not.toBeCalled();
    });
  });

  describe('int.optional.restrict', () => {
    it.each([
      [Number.MIN_SAFE_INTEGER, lt(0)],
      [Number.MAX_SAFE_INTEGER, gt(0)],
      [-100, lt(0)],
      [0, eq(0)],
      [100, gt(0)],
    ])('successfully validates %s with rule', (value, rule) => {
      const spy = jest.fn(rule);
      expect(integer.optional.restrict(spy)(value)).toBe(value);
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
        () => integer.optional.restrict(spy)(value),
      ).toThrow(new TypeError(errorMessage));
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });

    it.each([
      [undefined],
    ])('bypasses %s and doesn\'t call rule', value => {
      const rule = jest.fn();
      expect(integer.optional.restrict(rule)(value)).toBe(value);
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
        () => integer.optional.restrict(rule)(invalidValue),
      ).toThrow(new TypeError(`integer is expected but "${invalidValue}" received.`));

      expect(rule).not.toBeCalled();
    });
  });

  describe('int.restrict().optional', () => {
    it.each([
      [Number.MIN_SAFE_INTEGER, lt(0)],
      [Number.MAX_SAFE_INTEGER, gt(0)],
      [-100, lt(0)],
      [0, eq(0)],
      [100, gt(0)],
    ])('successfully validates %s with rule', (value, rule) => {
      const spy = jest.fn(rule);
      expect(integer.restrict(spy).optional(value)).toBe(value);
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
        () => integer.restrict(spy).optional(value),
      ).toThrow(new TypeError(errorMessage));
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });

    it.each([
      [undefined],
    ])('bypasses %s and doesn\'t call rule', value => {
      const rule = jest.fn();
      expect(integer.restrict(rule).optional(value)).toBe(value);
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
        () => integer.restrict(rule).optional(invalidValue),
      ).toThrow(new TypeError(`integer is expected but "${invalidValue}" received.`));

      expect(rule).not.toBeCalled();
    });
  });
});
