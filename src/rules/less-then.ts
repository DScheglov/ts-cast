import { withName } from '../helpers/names';
import { Predicate } from './types';

export const lessThen: {
  (limit: number): Predicate<number>;
  (limit: string): Predicate<string>;
} = (limit: number | string) => withName(
  (value: number | string): boolean => value < limit,
  `less then ${limit}`,
);

export const lt = lessThen;

export const notGreaterThen: {
  (limit: number): Predicate<number>;
  (limit: string): Predicate<string>;
} = (limit: number|string) =>
  withName(
    (value: number|string): boolean => value <= limit,
    `not greater then ${limit}`,
  );

export const lte = notGreaterThen;
