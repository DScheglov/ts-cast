import { withName } from './predicate';

export const notEqual = <T extends number | string | boolean>(pattern: T) => withName(
  (value: T) => value !== pattern,
  `not equal to ${pattern}`,
);

export const ne = notEqual;
