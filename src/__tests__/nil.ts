import { nil } from '..';

describe('nil', () => {
  describe('required', () => {
    it('returns null if null passed', () => {
      expect(nil(null)).toBe(null);
    });

    it('throws a typeError if other value is specified (no context specified)', () => {
      expect(
        () => nil(1),
      ).toThrow(new TypeError('null expected but received 1.'));
    });

    it('throws a typeError if other value is specified (with context desription)', () => {
      expect(
        () => nil(1, 'foo.bar'),
      ).toThrow(new TypeError('null expected in foo.bar but received 1.'));
    });

    it('throws a typeError undefined specified (no context specified)', () => {
      expect(
        () => nil(undefined),
      ).toThrow(new TypeError('null expected but received undefined.'));
    });

    it('throws a typeError undefined specified (with context desription)', () => {
      expect(
        () => nil(undefined, 'foo.bar'),
      ).toThrow(new TypeError('null expected in foo.bar but received undefined.'));
    });
  });

  describe('optional', () => {
    it('returns null if null passed', () => {
      expect(nil.optional(null)).toBe(null);
    });

    it('throws a typeError if other value is specified (no context specified)', () => {
      expect(
        () => nil.optional(1),
      ).toThrow(new TypeError('null expected but received 1.'));
    });

    it('throws a typeError if other value is specified (with context desription)', () => {
      expect(
        () => nil.optional(1, 'foo.bar'),
      ).toThrow(new TypeError('null expected in foo.bar but received 1.'));
    });

    it('returns undefined if undefined specified', () => {
      expect(nil.optional(undefined)).toBe(undefined);
    });
  });
});
