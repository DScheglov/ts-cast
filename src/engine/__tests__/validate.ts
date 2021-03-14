import { array } from '../../types/array';
import { bool } from '../../types/bool';
import { validate } from '../validate';
import { throwTypeError } from '../throw-type-error';
import { int } from '../../types/int';
import { nil } from '../../types/nil';
import { str } from '../../types/str';
import { struct } from '../../types/struct';
import { values } from '../../types/values';

describe('checkTypes', () => {
  describe('returns errors for primitive types', () => {
    it.each([
      [int, int.name],
      [str, str.name],
      [bool, bool.name],
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
      [int, 1],
      [str, 'some text'],
      [bool, true],
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
    const checkList = validate(array(int));

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
      params: struct({ id: str }),
      query: struct({
        format: values('csv', 'json').optional,
      }),
      body: struct({
        name: str,
        email: str,
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
