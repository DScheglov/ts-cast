import { casterApi } from '../engine';
import { throwTypeError } from '../engine/throw-type-error';
import { ErrorReporter } from '../engine/types';

const castUndefined = (
  value: unknown,
  context?: string,
  reportError: ErrorReporter = throwTypeError,
) => {
  if (value === undefined) return undefined;

  return reportError(
    `undefined is expected${context ? ` in ${context}` : ''} but "${value}" received.`,
    context,
  );
};

Object.defineProperty(castUndefined, 'name', { value: 'undefined' });

export const undef = casterApi(castUndefined);
