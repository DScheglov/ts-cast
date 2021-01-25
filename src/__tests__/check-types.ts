import { bool } from '../bool';
import { checkTypes } from '../engine/check-types';
import { int } from '../int';
import { nil } from '../nil';
import { str } from '../str';
import { struct } from '../struct';
import { values } from '../values';

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
        const checkingResult = checkTypes(caster)(undefined);
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
        const checkingResult = checkTypes(caster)(result);
        expect(checkingResult).toEqual({
          ok: true,
          errors: [],
          result,
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

    const checkRequest = checkTypes(TRequest);

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
});
