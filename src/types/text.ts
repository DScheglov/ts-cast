import { array } from './array';
import { CasterFn, createCaster } from '../engine';
import { ErrorReporter } from '../engine/types';

export const textInt = createCaster(
  'text.integer',
  (value: any): value is number => typeof value === 'string' && value !== '',
  (value: any, context?: string, reportError?: ErrorReporter) => {
    const parsed = +value;

    if (Number.isInteger(parsed)) return parsed;

    return reportError!(
      `text.integer is expected${context ? ` in ${context}` : ''} but "${value}" received.`,
      context,
    );
  },
);

export const textNum = createCaster(
  'text.number',
  (value: any): value is number => typeof value === 'string' && value !== '',
  (value: any, context?: string, reportError?: ErrorReporter) => {
    const parsed = +value;

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
    (value: any): value is T[] => typeof value === 'string',
    (value: any, context?: string, reportError?: ErrorReporter) => castArray(
      value === '' ? [] : value.split(separator),
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
