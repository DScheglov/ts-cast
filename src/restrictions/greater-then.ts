import { withName } from '../helpers/names';

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
