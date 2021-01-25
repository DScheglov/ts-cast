import { throwTypeError } from './engine/throw-type-error';
import { ErrorReporter } from './engine/types';

const optional = (
  value: any, context?: string, reportError: ErrorReporter = throwTypeError,
): null | undefined => {
  if (value == null) return value;
  return reportError(
    `null is expected${context ? ` in ${context}` : ''} but "${value}" received.`,
  ) as any;
};

Object.defineProperty(optional, 'name', { value: 'null?' });

export const nil = (
  value: any, context?: string, reportError: ErrorReporter = throwTypeError,
): null => {
  if (value === null) return null;
  return reportError(
    `null is expected${context ? ` in ${context}` : ''} but "${value}" received.`,
  ) as any;
};

nil.optional = optional;

Object.defineProperty(nil, 'name', { value: 'null' });
