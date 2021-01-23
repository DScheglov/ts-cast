import { tuple } from '..';
import { int } from '../int';
import { nil } from '../nil';
import { num } from '../num';
import { str } from '../str';
import { values } from '../values';

describe('tuple', () => {
  describe('tuple.name', () => {
    it('tuple(int, str).name is [integer, string]', () => {
      expect(tuple(int, str).name).toBe('[integer, string]');
    });

    it('tuple(num, nil).name is [number, null]', () => {
      expect(tuple(num, nil).name).toBe('[number, null]');
    });
  });

  describe('Caster Interface', () => {
    const coordVal = tuple(values(1, 2), values('x', 'y'));

    it.each([
      ['optional'],
      ['nullable'],
      ['validate'],
      ['map'],
      ['default'],
    ])('array(int).%s is a Function', methodName => {
      expect((coordVal as any)[methodName]).toBeInstanceOf(Function);
    });
  });
});
