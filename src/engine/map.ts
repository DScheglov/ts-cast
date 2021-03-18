import { isEmpty } from './guards';
import { throwTypeError } from './throw-type-error';
import { CasterFn, ErrorReporter } from './types';

const map = <T, D = T>(
  caster: CasterFn<T>,
  transform: (value: Exclude<T, null | undefined>) => D,
): CasterFn<D | Exclude<T, Exclude<T, null | undefined>>> => Object.defineProperty(
    (value: unknown, context?: string, reportError: ErrorReporter = throwTypeError) => {
      const casted = caster(value, context, reportError);
      return isEmpty(casted) ? casted : transform(casted as Exclude<T, null | undefined>);
    },
    'name',
    { value: caster.name },
  );

export default map;
