import { withName } from '../helpers/names';

export const notEqual = <T extends number | string | boolean>(pattern: T) => withName(
  (value: T) => value !== pattern,
  `not equal to ${pattern}`,
);

export const ne = notEqual;
