import { array } from './array';
import { CasterFn, createCaster } from '../engine';
import { ErrorReporter } from '../engine/types';

export const textInt = createCaster(
  'text.integer',
  (value: unknown): value is number => typeof value === 'string' && value !== '',
  (value: unknown, context?: string, reportError?: ErrorReporter) => {
    const parsed = +(value as string);

    if (Number.isInteger(parsed)) return parsed;

    return reportError!(
      `text.integer is expected${context ? ` in ${context}` : ''} but "${value}" received.`,
      context,
    );
  },
);

export const textNum = createCaster(
  'text.number',
  (value: unknown): value is number => typeof value === 'string' && value !== '',
  (value: unknown, context?: string, reportError?: ErrorReporter) => {
    const parsed = +(value as string);

    if (!Number.isNaN(parsed)) return parsed;

    return reportError!(
      `text.number is expected${context ? ` in ${context}` : ''} but "${value}" received.`,
      context,
    );
  },
);

export const textList = <T>(
  itemCaster: CasterFn<T>,
  separator: string | RegExp = ',',
) => {
  const castArray = array(itemCaster);
  return createCaster(
    `list(${itemCaster.name})`,
    (value: unknown): value is T[] => typeof value === 'string',
    (value: unknown, context?: string, reportError?: ErrorReporter) => castArray(
      value === '' ? [] : (value as string).split(separator),
      context,
      reportError,
    ),
  );
};

export const text = {
  integer: textInt,
  number: textNum,
  list: textList,
};
