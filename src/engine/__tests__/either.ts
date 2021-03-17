import { number, CasterFn } from '../..';
import { Either, Left, Right } from '../../helpers/either-light';

describe('either', () => {
  const eNumber: CasterFn<Either<TypeError, number>> = number.either(Left, Right);

  it('eNumber.name is "either<*, number>"', () => {
    expect(eNumber.name).toBe('either<*, number>');
  });

  it.each([
    [Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY],
    [-100],
    [-Math.PI],
    [0],
    [100],
    [Math.PI],
  ])('number.either(Left, Right) return Right(%s)', value => {
    expect(eNumber(value)).toEqual(Right(value));
  });

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
  ])('number.either(Left, Right) TypeError for "%s"', invalidValue => {
    expect(
      eNumber(invalidValue),
    ).toEqual(Left(new TypeError(`number is expected but "${invalidValue}" received.`)));
  });

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
  ])('number.either(Left, Right) TypeError for "%s" (with context)', invalidValue => {
    expect(
      eNumber(invalidValue, 'request'),
    ).toEqual(Left(new TypeError(`number is expected in request but "${invalidValue}" received.`)));
  });
});
