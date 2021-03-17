import { Right, Left } from '../either-light';

describe('either-light', () => {
  it.each([
    [1],
    [null],
    [undefined],
  ])('wraps %s with Right', value => {
    expect(Right(value)).toEqual([value]);
  });

  it.each([
    [1],
    ['error'],
    [new TypeError('A Type Error')],
    [null],
    [undefined],
  ])('wraps %j with Left', value => {
    expect(Left(value)).toEqual([undefined, value]);
  });
});
