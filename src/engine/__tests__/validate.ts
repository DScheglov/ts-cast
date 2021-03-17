import { array } from '../../types/array';
import { boolean } from '../../types/boolean';
import { validate } from '../validate';
import { throwTypeError } from '../throw-type-error';
import { integer } from '../../types/integer';
import { nil } from '../../types/nil';
import { string } from '../../types/string';
import { struct } from '../../types/struct';
import { values } from '../../types/values';
import { Left as Invalid, Right as Valid } from '../../helpers/either-light';

describe('validate', () => {
  describe('returns errors for primitive types', () => {
    it.each([
      [integer, integer.name],
      [string, string.name],
      [boolean, boolean.name],
      [nil, nil.name],
      [values(1, 2, 3), '1|2|3'],
    ])('%s(undefined) returns [{ message: "%s is expected but "undefined" received.", context: undefined }]',
      (caster: any, typeName) => {
        const checkingResult = validate(caster)(undefined);
        expect(checkingResult).toEqual({
          ok: false,
          errors: [
            { message: `${typeName} is expected but "undefined" received.`, context: undefined },
          ],
        });
      });
  });

  describe('returns result for primitive types', () => {
    it.each([
      [integer, 1],
      [string, 'some text'],
      [boolean, true],
      [nil, null],
      [values(1, 2, 3), 3],
    ])('%s returns { ok: true, result: %s }',
      (caster: any, result) => {
        const checkingResult = validate(caster)(result);
        expect(checkingResult).toEqual({
          ok: true,
          errors: [],
          result,
        });
      });
  });

  describe('works with arrays', () => {
    const checkList = validate(array(integer));

    it('returns { result: [1, 2, 3], ok: true, errors: [] } for [1, 2, 3]', () => {
      expect(checkList([1, 2, 3])).toEqual({
        ok: true,
        errors: [],
        result: [1, 2, 3],
      });
    });

    it('returns { ok: true, result: [], errors: [] } for []', () => {
      expect(checkList([])).toEqual({
        ok: true,
        result: [],
        errors: [],
      });
    });

    it('returns error for each invalid item', () => {
      expect(checkList(['a', 'b', 'c', 'd'])).toEqual({
        ok: false,
        errors: [
          { message: 'integer is expected in #0 but "a" received.', context: '#0' },
          { message: 'integer is expected in #1 but "b" received.', context: '#1' },
          { message: 'integer is expected in #2 but "c" received.', context: '#2' },
          { message: 'integer is expected in #3 but "d" received.', context: '#3' },
        ],
      });
    });
  });

  describe('works with struct', () => {
    const TRequest = struct({
      params: struct({ id: string }),
      query: struct({
        format: values('csv', 'json').optional,
      }),
      body: struct({
        name: string,
        email: string,
      }),
    }, 'TRequest');

    const checkRequest = validate(TRequest);

    it('returns result for valid object', () => {
      expect(checkRequest({
        params: { id: '123' },
        query: {},
        body: {
          name: 'Jhon',
          email: 'john@mail.com',
        },
      })).toEqual({
        errors: [],
        ok: true,
        result: {
          params: { id: '123' },
          query: {},
          body: {
            name: 'Jhon',
            email: 'john@mail.com',
          },
        },
      });
    });

    it('returns errors for invalid object', () => {
      const checkingResult = checkRequest({
        params: { id: 123 },
        query: { format: 'text' },
        body: {
          name: null,
          email: null,
        },
      });

      expect(checkingResult).toEqual({
        errors: [
          {
            message: 'string is expected in params.id but "123" received.',
            context: 'params.id',
          },
          {
            message: '"csv"|"json" is expected in query.format but "text" received.',
            context: 'query.format',
          },
          {
            message: 'string is expected in body.name but "null" received.',
            context: 'body.name',
          },
          {
            message: 'string is expected in body.email but "null" received.',
            context: 'body.email',
          },
        ],
        ok: false,
      });
    });
  });

  describe('specific', () => {
    it('returns an error if some caster throws error explicitly', () => {
      const INT = (value: any, context?: string) =>
        (Number.isInteger(value)
          ? value
          : throwTypeError(`integer is expected in ${context} but "${value}" received.`));

      const checkINT = validate(INT);

      expect(checkINT('123', 'intValue')).toEqual({
        ok: false,
        errors: [
          { context: 'intValue', message: 'integer is expected in intValue but "123" received.' },
        ],
      });
    });
  });
});

describe('validation', () => {
  describe('returns errors for primitive types', () => {
    it.each([
      [integer, integer.name],
      [string, string.name],
      [boolean, boolean.name],
      [nil, nil.name],
      [values(1, 2, 3), '1|2|3'],
    ])('%s(undefined) returns [{ message: "%s is expected but "undefined" received.", context: undefined }]',
      (caster: any, typeName) => {
        const result = caster.validation(Invalid, Valid)(undefined);
        expect(result).toEqual(Invalid([
          { message: `${typeName} is expected but "undefined" received.`, context: undefined },
        ]));
      });
  });

  describe('returns result for primitive types', () => {
    it.each([
      [integer, 1],
      [string, 'some text'],
      [boolean, true],
      [nil, null],
      [values(1, 2, 3), 3],
    ])('%s.validation(Invalid, Valid) returns Valid(%s)',
      (caster: any, result) => {
        const res = caster.validation(Invalid, Valid)(result);
        expect(res).toEqual(Valid(result));
      });
  });

  describe('works with arrays: array(integer).validation(Invalid, Valid)', () => {
    const ValiadationList = array(integer).validation(Invalid, Valid);

    it('returns Valid([1, 2, 3]) for [1, 2, 3]', () => {
      expect(ValiadationList([1, 2, 3])).toEqual(Valid([1, 2, 3]));
    });

    it('returns Valid([]) for []', () => {
      expect(ValiadationList([])).toEqual(Valid([]));
    });

    it('returns Invalid wraps error for each invalid item', () => {
      expect(ValiadationList(['a', 'b', 'c', 'd'])).toEqual(Invalid([
        { message: 'integer is expected in #0 but "a" received.', context: '#0' },
        { message: 'integer is expected in #1 but "b" received.', context: '#1' },
        { message: 'integer is expected in #2 but "c" received.', context: '#2' },
        { message: 'integer is expected in #3 but "d" received.', context: '#3' },
      ]));
    });
  });

  describe('works with struct', () => {
    const TRequest = struct({
      params: struct({ id: string }),
      query: struct({
        format: values('csv', 'json').optional,
      }),
      body: struct({
        name: string,
        email: string,
      }),
    }, 'TRequest');

    const ValidationRequest = TRequest.validation(Invalid, Valid);

    it('returns Valid(result) for valid object', () => {
      expect(ValidationRequest({
        params: { id: '123' },
        query: {},
        body: {
          name: 'Jhon',
          email: 'john@mail.com',
        },
      })).toEqual(Valid({
        params: { id: '123' },
        query: {},
        body: {
          name: 'Jhon',
          email: 'john@mail.com',
        },
      }));
    });

    it('returns Invalid wraps errors for invalid object', () => {
      const result = ValidationRequest({
        params: { id: 123 },
        query: { format: 'text' },
        body: {
          name: null,
          email: null,
        },
      });

      expect(result).toEqual(Invalid([
        {
          message: 'string is expected in params.id but "123" received.',
          context: 'params.id',
        },
        {
          message: '"csv"|"json" is expected in query.format but "text" received.',
          context: 'query.format',
        },
        {
          message: 'string is expected in body.name but "null" received.',
          context: 'body.name',
        },
        {
          message: 'string is expected in body.email but "null" received.',
          context: 'body.email',
        },
      ]));
    });
  });
});
