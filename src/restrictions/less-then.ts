import { withName } from '../helpers/names';

export const lessThen = <T extends number | string>(limit: T) => withName(
  (value: T): boolean => value < limit,
  `less then ${limit}`,
);

export const lt = lessThen;

export const notGreaterThen = <T extends number|string>(limit: T) =>
  withName(
    (value: T): boolean => value <= limit,
    `not greater then ${limit}`,
  );

export const lte = notGreaterThen;
