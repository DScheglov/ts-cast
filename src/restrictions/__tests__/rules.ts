import { toBe, notToBe } from '..';

describe('toBe', () => {
  it('creates a restriction rule', () => {
    const rule = toBe((x: number) => x > 5, 'greater then 5');
    expect(rule).toBeInstanceOf(Function);
    expect(rule(10)).toBe(null);
    expect(rule(0)).toBe('greater then 5');
  });

  it('uses predicate name as error message', () => {
    const greaterThen5 = (x: number) => x > 5;
    const rule = toBe(greaterThen5);

    expect(rule(0)).toBe(greaterThen5.name);
  });

  it('uses predicate displayName as error message', () => {
    const greaterThen5 = (x: number) => x > 5;
    greaterThen5.displayName = 'greater then 5';
    const rule = toBe(greaterThen5);

    expect(rule(0)).toBe(greaterThen5.displayName);
  });
});

describe('notToBe', () => {
  it('creates a restriction rule', () => {
    const rule = notToBe((x: number) => x > 5, 'greater then 5');
    expect(rule).toBeInstanceOf(Function);
    expect(rule(0)).toBe(null);
    expect(rule(10)).toBe('not greater then 5');
  });

  it('uses predicate name as error message', () => {
    const greaterThen5 = (x: number) => x > 5;
    const rule = notToBe(greaterThen5);

    expect(rule(10)).toBe(`not ${greaterThen5.name}`);
  });

  it('uses predicate displayName as error message', () => {
    const greaterThen5 = (x: number) => x > 5;
    greaterThen5.displayName = 'greater then 5';
    const rule = notToBe(greaterThen5);

    expect(rule(10)).toBe(`not ${greaterThen5.displayName}`);
  });
});
