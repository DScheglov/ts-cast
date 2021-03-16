import { withName } from '../helpers/names';

export const nonEmpty = withName(
  <T extends Array<any> | string>(value: T) => value.length > 0,
  'non empty',
);

export const longerThen = (len: number) => withName(
  <T extends Array<any> | string>(value: T) => value.length > len,
  `longer then ${len}`,
);

export const shorterThen = (len: number) => withName(
  <T extends Array<any> | string>(value: T) => value.length < len,
  `shorter then ${len}`,
);

export const notLongerThen = (len: number) => withName(
  <T extends Array<any> | string>(value: T) => value.length <= len,
  `not longer then ${len}`,
);

export const notShorterThen = (len: number) => withName(
  <T extends Array<any> | string>(value: T) => value.length > len,
  `not shorter then ${len}`,
);

export const length = {
  gt: longerThen,
  gte: notShorterThen,
  lt: shorterThen,
  lte: notLongerThen,
};
