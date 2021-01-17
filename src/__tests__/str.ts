import { str } from '../str';
import { toBe } from '../validation';

describe('str', () => {
  describe('Caster interface', () => {
    it('str.name === "number"', () => {
      expect(str.name).toBe('string');
    });

    it('str.optional is a Function', () => {
      expect(str.optional).toBeInstanceOf(Function);
    });

    it('str.nullable is a Function', () => {
      expect(str.nullable).toBeInstanceOf(Function);
    });

    it('str.validate is a Function', () => {
      expect(str.validate).toBeInstanceOf(Function);
    });

    it('str.map is a Function', () => {
      expect(str.map).toBeInstanceOf(Function);
    });

    it('str.default is a Function', () => {
      expect(str.default).toBeInstanceOf(Function);
    });
  });

  describe('::required:ok', () => {
    it.each([
      [''],
      ['hello world'],
    ])('bypasses "%s"', value => {
      expect(str(value)).toBe(value);
    });
  });

  describe('::required:reject', () => {
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
    ])('throws a TypeError for "%s"', invalidValue => {
      expect(
        () => str(invalidValue),
      ).toThrow(new TypeError(`string is expected but "${invalidValue}" received.`));
    });
  });

  describe('::required:reject (with context)', () => {
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
    ])('throws a TypeError for "%s"', invalidValue => {
      expect(
        () => str(invalidValue, 'param'),
      ).toThrow(new TypeError(`string is expected in param but "${invalidValue}" received.`));
    });
  });

  describe('optional:ok', () => {
    it.each([
      [''],
      ['hello world'],
      [null],
      [undefined],
    ])('bypasses "%s"', value => {
      expect(str.optional(value)).toBe(value);
    });
  });

  describe('optional:reject', () => {
    it.each([
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
    ])('throws a TypeError for "%s"', invalidValue => {
      expect(
        () => str.optional(invalidValue),
      ).toThrow(new TypeError(`string is expected but "${invalidValue}" received.`));
    });
  });

  describe('optional:reject (with context)', () => {
    it.each([
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
    ])('throws a TypeError for "%s"', invalidValue => {
      expect(
        () => str.optional(invalidValue, 'param'),
      ).toThrow(new TypeError(`string is expected in param but "${invalidValue}" received.`));
    });
  });

  describe('validate:ok', () => {
    const isEmpty = toBe((value: string) => value === '', 'an empty string');
    const isNonEmpty = toBe((value: string) => value !== '', 'a non-empty string');

    it.each([
      ['', isEmpty],
      ['hello world', isNonEmpty],
    ])('successfully validates %s with rule', (value, rule) => {
      const spy = jest.fn(rule);
      expect(str.validate(spy)(value)).toBe(value);
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });
  });

  describe('validate:reject', () => {
    const isEmpty = toBe((value: string) => value === '', 'an empty string');
    const isNonEmpty = toBe((value: string) => value !== '', 'a non-empty string');

    it.each([
      ['', isNonEmpty, 'a non-empty string'],
      ['hello world', isEmpty, 'an empty string'],
    ])('validates %s with rule and fails with message', (value, rule, message) => {
      const spy = jest.fn(rule);
      expect(
        () => str.validate(spy)(value),
      ).toThrow(new TypeError(`expected value is ${message} but received ${value}.`));
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(value);
    });
  });

  describe('validate:skipped', () => {
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
    ])('throws a TypeError for "%s" and doesn\'t call rule', invalidValue => {
      const rule = jest.fn();
      expect(
        () => str.validate(rule)(invalidValue),
      ).toThrow(new TypeError(`string is expected but "${invalidValue}" received.`));
      expect(rule).not.toBeCalled();
    });
  });
});
