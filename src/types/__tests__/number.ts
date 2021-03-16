import { number } from '../..';
import { toBe } from '../../restrictions';

const lt = (max: number) =>
  toBe((value: number) => value < max, `less then ${max}`);

const gt = (min: number) =>
  toBe((value: number) => value > min, `greater then ${min}`);

const eq = (target: number) =>
  toBe((value: number) => value === target, `equal to ${target}`);

const neq = (unwanted: number) =>
  toBe((value: number) => value !== unwanted, `not equal to ${unwanted}`);

describe('num', () => {
  describe('Caster interface', () => {
    it('num.name === "number"', () => {
      expect(number.name).toBe('number');
    });

    it('num.optional is a Function', () => {
      expect(number.optional).toBeInstanceOf(Function);
    });

    it('num.nullable is a Function', () => {
      expect(number.nullable).toBeInstanceOf(Function);
    });

    it('num.restrict is a Function', () => {
      expect(number.restrict).toBeInstanceOf(Function);
    });

    it('num.map is a Function', () => {
      expect(number.map).toBeInstanceOf(Function);
    });

    it('num.default is a Function', () => {
      expect(number.default).toBeInstanceOf(Function);
    });
  });

  describe('::required:ok', () => {
    it.each([
      [Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY],
      [-100],
      [-Math.PI],
      [0],
      [100],
      [Math.PI],
    ])('bypases %s', value => {
      expect(number(value)).toBe(value);
    });
  });

  describe('::required:fail', () => {
    it.each([
      [null],
      [undefined],
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
        () => number(invalidValue),
      ).toThrow(new TypeError(`number is expected but "${invalidValue}" received.`));
    });
  });

  describe('::required:fail (context)', () => {
    it.each([
      [null],
      [undefined],
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
        () => number(invalidValue, 'param'),
      ).toThrow(new TypeError(`number is expected in param but "${invalidValue}" received.`));
    });
  });

  describe('num.optional:ok', () => {
    it.each([
      [undefined],
      [Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY],
      [-100],
      [-Math.PI],
      [0],
      [100],
      [Math.PI],
    ])('bypases %s', value => {
      expect(number.optional(value)).toBe(value);
    });
  });
  describe('num.optional:fail', () => {
    it.each([
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
        () => number.optional(invalidValue),
      ).toThrow(new TypeError(`number is expected but "${invalidValue}" received.`));
    });
  });

  describe('num.optional:fail (context)', () => {
    it.each([
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
        () => number.optional(invalidValue, 'param'),
      ).toThrow(new TypeError(`number is expected in param but "${invalidValue}" received.`));
    });
  });

  describe('num.default(1000):ok', () => {
    it.each([
      [undefined],
      [Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY],
      [-100],
      [-Math.PI],
      [0],
      [100],
      [Math.PI],
    ])('bypases %s', value => {
      expect(number.default(1000)(value)).toBe(value !== undefined ? value : 1000);
    });
  });
  describe('num.default(1000):fail', () => {
    it.each([
      [null],
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
        () => number.default(1000)(invalidValue),
      ).toThrow(new TypeError(`number is expected but "${invalidValue}" received.`));
    });
  });

  describe('num.default(1000):fail (context)', () => {
    it.each([
      [null],
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
        () => number.default(1000)(invalidValue, 'param'),
      ).toThrow(new TypeError(`number is expected in param but "${invalidValue}" received.`));
    });
  });

  describe('num.restrict:ok', () => {
    it.each([
      [Number.NEGATIVE_INFINITY, lt(0)],
      [Number.POSITIVE_INFINITY, gt(0)],
      [-100, lt(0)],
      [-Math.PI, lt(0)],
      [0, eq(0)],
      [100, gt(0)],
      [Math.PI, gt(0)],
    ])('successfully validates %s with rule', (value, rule) => {
      const spy = jest.fn(rule);
      expect(number.restrict(spy)(value)).toBe(value);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });
  });

  describe('num.restrict:fail', () => {
    it.each([
      [Number.NEGATIVE_INFINITY, gt(0), 'greater then 0'],
      [Number.POSITIVE_INFINITY, lt(0), 'less then 0'],
      [-100, gt(0), 'greater then 0'],
      [-Math.PI, gt(0), 'greater then 0'],
      [0, neq(0), 'not equal to 0'],
      [100, lt(0), 'less then 0'],
      [Math.PI, lt(0), 'less then 0'],
    ])('validates %s with rule and throws an error', (value, rule, message) => {
      const spy = jest.fn(rule);
      const errorMessage = `expected value is ${message} but received ${value}.`;
      expect(
        () => number.restrict(spy)(value),
      ).toThrow(new TypeError(errorMessage));
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });
  });

  describe('num.restrict:fail (context)', () => {
    it.each([
      [Number.NEGATIVE_INFINITY, gt(0), 'greater then 0'],
      [Number.POSITIVE_INFINITY, lt(0), 'less then 0'],
      [-100, gt(0), 'greater then 0'],
      [-Math.PI, gt(0), 'greater then 0'],
      [0, neq(0), 'not equal to 0'],
      [100, lt(0), 'less then 0'],
      [Math.PI, lt(0), 'less then 0'],
    ])('validates %s with rule and throws an error (with context)', (value, rule, message) => {
      const spy = jest.fn(rule);
      const errorMessage = `param should be ${message} but received ${value}.`;
      expect(
        () => number.restrict(spy)(value, 'param'),
      ).toThrow(new TypeError(errorMessage));
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });
  });
  describe('num.restrict:skip invalid', () => {
    it.each([
      [null],
      [undefined],
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
        () => number.restrict(rule)(invalidValue),
      ).toThrow(new TypeError(`number is expected but "${invalidValue}" received.`));

      expect(rule).not.toBeCalled();
    });
  });

  describe('num.optional.restrict:ok', () => {
    it.each([
      [Number.NEGATIVE_INFINITY, lt(0)],
      [Number.POSITIVE_INFINITY, gt(0)],
      [-100, lt(0)],
      [-Math.PI, lt(0)],
      [0, eq(0)],
      [100, gt(0)],
      [Math.PI, gt(0)],
    ])('successfully validates %s with rule', (value, rule) => {
      const spy = jest.fn(rule);
      expect(number.optional.restrict(spy)(value)).toBe(value);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });
  });

  describe('num.optional.restrict:failed', () => {
    it.each([
      [Number.NEGATIVE_INFINITY, gt(0), 'greater then 0'],
      [Number.POSITIVE_INFINITY, lt(0), 'less then 0'],
      [-100, gt(0), 'greater then 0'],
      [-Math.PI, gt(0), 'greater then 0'],
      [0, neq(0), 'not equal to 0'],
      [100, lt(0), 'less then 0'],
      [Math.PI, lt(0), 'less then 0'],
    ])('validates %s with rule and throws an error', (value, rule, message) => {
      const spy = jest.fn(rule);
      const errorMessage = `expected value is ${message} but received ${value}.`;
      expect(
        () => number.optional.restrict(spy)(value),
      ).toThrow(new TypeError(errorMessage));
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });
  });

  describe('num.optional.restrict: empty is skipped', () => {
    it.each([
      [undefined],
    ])('bypasses %s and doesn\'t call rule', value => {
      const rule = jest.fn();
      expect(number.optional.restrict(rule)(value)).toBe(value);
      expect(rule).not.toBeCalled();
    });
  });

  describe('num.optional.restrict: fail - validation skiped', () => {
    it.each([
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
        () => number.optional.restrict(rule)(invalidValue),
      ).toThrow(new TypeError(`number is expected but "${invalidValue}" received.`));

      expect(rule).not.toBeCalled();
    });
  });

  describe('num.restrict().optional: ok', () => {
    it.each([
      [Number.NEGATIVE_INFINITY, lt(0)],
      [Number.POSITIVE_INFINITY, gt(0)],
      [-100, lt(0)],
      [-Math.PI, lt(0)],
      [0, eq(0)],
      [100, gt(0)],
      [Math.PI, gt(0)],
    ])('successfully validates %s with rule', (value, rule) => {
      const spy = jest.fn(rule);
      expect(number.restrict(spy).optional(value)).toBe(value);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });
  });
  describe('num.optional.restrict: validation failed', () => {
    it.each([
      [Number.NEGATIVE_INFINITY, gt(0), 'greater then 0'],
      [Number.POSITIVE_INFINITY, lt(0), 'less then 0'],
      [-100, gt(0), 'greater then 0'],
      [-Math.PI, gt(0), 'greater then 0'],
      [0, neq(0), 'not equal to 0'],
      [100, lt(0), 'less then 0'],
      [Math.PI, lt(0), 'less then 0'],
    ])('validates %s with rule and throws an error', (value, rule, message) => {
      const spy = jest.fn(rule);
      const errorMessage = `expected value is ${message} but received ${value}.`;
      expect(
        () => number.restrict(spy).optional(value),
      ).toThrow(new TypeError(errorMessage));
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });
  });

  describe('num.optional.restrict: skip empty', () => {
    it.each([
      [undefined],
    ])('bypasses %s and doesn\'t call rule', value => {
      const rule = jest.fn();
      expect(number.restrict(rule).optional(value)).toBe(value);
      expect(rule).not.toBeCalled();
    });
  });

  describe('num.optional.restrict: skip invalid', () => {
    it.each([
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
        () => number.restrict(rule).optional(invalidValue),
      ).toThrow(new TypeError(`number is expected but "${invalidValue}" received.`));

      expect(rule).not.toBeCalled();
    });
  });
});
