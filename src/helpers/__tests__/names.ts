import { joinNames } from '../names';

describe('joinNames', () => {
  it('returns "" for []', () => {
    expect(joinNames([], 'and')).toBe('');
  });

  it('returns the name if it is the single item in the list', () => {
    expect(joinNames(['one'], 'and')).toBe('one');
  });

  it('return "one and two" for ["one", "two"]', () => {
    expect(joinNames(['one', 'two'], 'and')).toBe('one and two');
  });

  it('returns "one, two and three" for ["one", "two", "three"]', () => {
    expect(joinNames(['one', 'two', 'three'], 'and')).toBe('one, two and three');
  });

  it.each([
    [4],
    [5],
    [10],
    [100],
  ])('returns "1, 2, ..., n-1 and n" for [1..%s]', length => {
    const names = Array.from({ length }, (_, index) => `${index + 1}`);
    expect(joinNames(names, 'and')).toBe(
      `${names.slice(0, -1).join(', ')} and ${length}`,
    );
  });
});
