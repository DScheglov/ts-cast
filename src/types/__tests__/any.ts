import { any } from '../..';

describe('indif', () => {
  it('indif.name === "any"', () => {
    expect(any.name).toBe('any');
  });

  describe('NO CASTER INTERFACE', () => {
    it.each([
      ['optional'],
      ['nullable'],
      ['restrict'],
      ['map'],
    ])('indif.%s is undefined', fieldName => {
      expect((any as any)[fieldName]).toBeUndefined();
    });
  });

  describe('accepts all', () => {
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
      [Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY],
      [-100],
      [-Math.PI],
      [0],
      [100],
      [Math.PI],
    ])('bypasses "%s"', value => {
      expect(any(value)).toBe(value);
    });
  });
});
