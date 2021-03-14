import { withName } from './predicate';

export const matching = (pattern: string | RegExp) => {
  const re = pattern instanceof RegExp ? pattern : new RegExp(pattern);
  return withName(
    (value: string) => re.test(value),
    `matching ${pattern}`,
  );
};
