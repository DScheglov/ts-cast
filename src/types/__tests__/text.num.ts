import { text } from '../..';
import { toBe } from '../../rules';

const lt = (max: number) =>
  toBe((value: number) => value < max, `less then ${max}`);

const gt = (min: number) =>
  toBe((value: number) => value > min, `greater then ${min}`);

const eq = (target: number) =>
  toBe((value: number) => value === target, `equal to ${target}`);

const neq = (unwanted: number) =>
  toBe((value: number) => value !== unwanted, `not equal to ${unwanted}`);

describe('text.num', () => {
  describe('Caster interface', () => {
    it('text.num.name === "number"', () => {
      expect(text.number.name).toBe('text.number');
    });

    it('text.num.optional is a Function', () => {
      expect(text.number.optional).toBeInstanceOf(Function);
    });

    it('text.num.nullable is a Function', () => {
      expect(text.number.nullable).toBeInstanceOf(Function);
    });

    it('text.num.restrict is a Function', () => {
      expect(text.number.restrict).toBeInstanceOf(Function);
    });

    it('text.num.map is a Function', () => {
      expect(text.number.map).toBeInstanceOf(Function);
    });

    it('text.num.default is a Function', () => {
      expect(text.number.default).toBeInstanceOf(Function);
    });
  });

  describe('::required', () => {
    it.each([
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
      [-Math.PI],
      [Math.PI],
    ])('bypases %s', value => {
      expect(text.number(value.toString())).toBe(value);
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
        () => text.number(invalidValue),
      ).toThrow(new TypeError(`text.number is expected but "${invalidValue}" received.`));
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
        () => text.number(invalidValue, 'param'),
      ).toThrow(new TypeError(`text.number is expected in param but "${invalidValue}" received.`));
    });
  });

  describe('text.num.optional', () => {
    it.each([
      [undefined],
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
    ])('bypases %s', value => {
      expect(text.number.optional(value === undefined ? value : value.toString())).toBe(value);
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
        () => text.number.optional(invalidValue),
      ).toThrow(new TypeError(`text.number is expected but "${invalidValue}" received.`));
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
        () => text.number.optional(invalidValue, 'param'),
      ).toThrow(new TypeError(`text.number is expected in param but "${invalidValue}" received.`));
    });
  });

  describe('text.num.nullable', () => {
    it.each([
      [null],
      [Number.MIN_SAFE_INTEGER],
      [Number.MAX_SAFE_INTEGER],
      [-100],
      [0],
      [100],
    ])('bypases %s', value => {
      expect(text.number.nullable(value !== null ? value.toString() : value)).toBe(value);
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
        () => text.number.nullable(invalidValue),
      ).toThrow(new TypeError(`text.number is expected but "${invalidValue}" received.`));
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
        () => text.number.nullable(invalidValue, 'param'),
      ).toThrow(new TypeError(`text.number is expected in param but "${invalidValue}" received.`));
    });
  });

  describe('text.num.restrict', () => {
    it.each([
      [Number.MIN_SAFE_INTEGER, lt(0)],
      [Number.MAX_SAFE_INTEGER, gt(0)],
      [-100, lt(0)],
      [0, eq(0)],
      [100, gt(0)],
    ])('successfully validates %s with rule', (value, rule) => {
      const spy = jest.fn(rule);
      expect(text.number.restrict(spy)(value.toString())).toBe(value);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(value);
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
        () => text.number.restrict(spy)(value.toString()),
      ).toThrow(new TypeError(errorMessage));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(value);
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
        () => text.number.restrict(spy)(value.toString(), 'param'),
      ).toThrow(new TypeError(errorMessage));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(value);
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
        () => text.number.restrict(rule)(invalidValue),
      ).toThrow(new TypeError(`text.number is expected but "${invalidValue}" received.`));

      expect(rule).not.toBeCalled();
    });
  });

  describe('text.num.optional.restrict', () => {
    it.each([
      [Number.MIN_SAFE_INTEGER, lt(0)],
      [Number.MAX_SAFE_INTEGER, gt(0)],
      [-100, lt(0)],
      [0, eq(0)],
      [100, gt(0)],
    ])('successfully validates %s with rule', (value, rule) => {
      const spy = jest.fn(rule);
      expect(text.number.optional.restrict(spy)(value.toString())).toBe(value);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(value);
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
        () => text.number.optional.restrict(spy)(value.toString()),
      ).toThrow(new TypeError(errorMessage));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(value);
    });

    it.each([
      [undefined],
    ])('bypasses %s and doesn\'t call rule', value => {
      const rule = jest.fn();
      expect(text.number.optional.restrict(rule)(value)).toBe(value);
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
        () => text.number.optional.restrict(rule)(invalidValue),
      ).toThrow(new TypeError(`text.number is expected but "${invalidValue}" received.`));

      expect(rule).not.toBeCalled();
    });
  });

  describe('text.num.restrict().optional', () => {
    it.each([
      [Number.MIN_SAFE_INTEGER, lt(0)],
      [Number.MAX_SAFE_INTEGER, gt(0)],
      [-100, lt(0)],
      [0, eq(0)],
      [100, gt(0)],
    ])('successfully validates %s with rule', (value, rule) => {
      const spy = jest.fn(rule);
      expect(text.number.restrict(spy).optional(value.toString())).toBe(value);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(value);
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
        () => text.number.restrict(spy).optional(value.toString()),
      ).toThrow(new TypeError(errorMessage));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(value);
    });

    it.each([
      [undefined],
    ])('bypasses %s and doesn\'t call rule', value => {
      const rule = jest.fn();
      expect(text.number.restrict(rule).optional(value)).toBe(value);
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
        () => text.number.restrict(rule).optional(invalidValue),
      ).toThrow(new TypeError(`text.number is expected but "${invalidValue}" received.`));

      expect(rule).not.toBeCalled();
    });
  });
});
