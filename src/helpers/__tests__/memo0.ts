import { memo } from '../memo0';

describe('memo0', () => {
  it('creates a function', () => {
    const mfn = memo(() => 1);

    expect(mfn).toBeInstanceOf(Function);
  });

  it('calls memoized function', () => {
    const expected = Symbol('expected');
    const fn = jest.fn(() => expected);
    const mfn = memo(fn);

    expect(mfn()).toBe(expected);
    expect(fn).toBeCalledTimes(1);
  });

  it.each([[2], [3], [10]])('calls memoized function only one time for %s calls', n => {
    const fn = jest.fn();
    const mfn = memo(fn);

    Array.from({ length: n }).forEach(
      () => mfn(),
    );

    expect(fn).toBeCalledTimes(1);
  });
});
