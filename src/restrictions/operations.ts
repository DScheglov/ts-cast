import {
  Predicate, predicateName,
} from './predicate';
import { withName, joinNames } from '../helpers/names';

export const not = <T>(predicate: Predicate<T>) => withName(
  (value: T) => !predicate(value),
  `not ${predicateName(predicate)}`,
);

export const or = <T>(...predicates: Predicate<T>[]) => withName(
  (value: T) => predicates.some(p => p(value)),
  joinNames(predicates.map(predicateName), 'or'),
);

export const and = <T>(...predicates: Predicate<T>[]) => withName(
  (value: T) => predicates.every(p => p(value)),
  joinNames(predicates.map(predicateName), 'and'),
);
