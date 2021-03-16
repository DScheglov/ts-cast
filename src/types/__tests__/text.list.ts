import { text } from '../..';
import { string } from '../string';

describe('text.list', () => {
  describe('Caster interface', () => {
    it('text.list(text.int).name === "number"', () => {
      expect(text.list(text.integer).name).toBe('list(text.integer)');
    });

    it('text.list(text.int).optional is a Function', () => {
      expect(text.list(text.integer).optional).toBeInstanceOf(Function);
    });

    it('text.list(text.int).nullable is a Function', () => {
      expect(text.list(text.integer).nullable).toBeInstanceOf(Function);
    });

    it('text.list(text.int).restrict is a Function', () => {
      expect(text.list(text.integer).restrict).toBeInstanceOf(Function);
    });

    it('text.list(text.int).map is a Function', () => {
      expect(text.list(text.integer).map).toBeInstanceOf(Function);
    });

    it('text.list(text.int).default is a Function', () => {
      expect(text.list(text.integer).default).toBeInstanceOf(Function);
    });
  });

  describe('text.list(str)', () => {
    it.each([
      [[]],
      [['one']],
      [['a', '1', 'hello']],
    ])('bypasses %j', value => {
      const strList = text.list(string);
      expect(strList(value.join(','))).toEqual(value);
    });

    it.each([
      [undefined],
      [null],
    ])('thows an error for %s', value => {
      const strList = text.list(string);
      expect(() => strList(value)).toThrow(
        new TypeError(`list(string) is expected but "${value}" received.`),
      );
    });
  });
});
