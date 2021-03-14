import { withName } from './predicate';

export const greaterThen = <T extends number | string>(limit: T) => withName(
  (value: T): boolean => value > limit,
  `greater then ${limit}`,
);

export const gt = greaterThen;

export const notLessThen = <T extends number | string>(limit: T) => withName(
  (value: T): boolean => value >= limit,
  `not less then ${limit}`,
);

export const gte = notLessThen;

export const nonEmpty = withName(
  <T extends Array<any> | string>(value: T) => value.length > 0,
  'non empty',
);
