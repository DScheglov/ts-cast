import { createCaster } from '../engine';
import { ErrorReporter } from '../engine/types';

const parseDate = (
  typeName: string,
  value: any,
  context: string | undefined,
  reportError: ErrorReporter | undefined,
): Date => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return reportError!(
      `${typeName} is expected${context ? ` in ${context}` : ''} but "${value}" received.`,
      context,
    );
  }

  return date;
};

export const isoDate = createCaster(
  'ISODate',
  (value: unknown) => typeof value === 'string' && value !== '',
  (value, context, reportError): Date => parseDate('ISODate', value, context, reportError),
);

export const unixDateTimeStamp = createCaster(
  'UnixDateTimeStamp',
  value => typeof value === 'number',
  (value, context, reportError): Date => parseDate('UnixDateTimeStamp', (value as number) * 1000, context, reportError),
);

export const jsDateTimeStamp = createCaster(
  'JSDateTimeStamp',
  value => typeof value === 'number',
  (value, context, reportError): Date => parseDate('JSDateTimeStamp', value, context, reportError),
);
