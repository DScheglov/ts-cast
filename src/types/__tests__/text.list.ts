import { text } from '../..';
import { str } from '../str';

describe('text.list', () => {
  describe('Caster interface', () => {
    it('text.list(text.int).name === "number"', () => {
      expect(text.list(text.int).name).toBe('list(text.integer)');
    });

    it('text.list(text.int).optional is a Function', () => {
      expect(text.list(text.int).optional).toBeInstanceOf(Function);
    });

    it('text.list(text.int).nullable is a Function', () => {
      expect(text.list(text.int).nullable).toBeInstanceOf(Function);
    });

    it('text.list(text.int).restrict is a Function', () => {
      expect(text.list(text.int).restrict).toBeInstanceOf(Function);
    });

    it('text.list(text.int).map is a Function', () => {
      expect(text.list(text.int).map).toBeInstanceOf(Function);
    });

    it('text.list(text.int).default is a Function', () => {
      expect(text.list(text.int).default).toBeInstanceOf(Function);
    });
  });

  describe('text.list(str)', () => {
    it.each([
      [[]],
      [['one']],
      [['a', '1', 'hello']],
    ])('bypasses %j', value => {
      const strList = text.list(str);
      expect(strList(value.join(','))).toEqual(value);
    });

    it.each([
      [undefined],
      [null],
    ])('thows an error for %s', value => {
      const strList = text.list(str);
      expect(() => strList(value)).toThrow(
        new TypeError(`list(string) is expected but "${value}" received.`),
      );
    });
  });
});
