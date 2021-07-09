import { withName } from '../helpers/names';
import { isNotEmpty } from './guards';
import { throwTypeError } from './throw-type-error';
import { CasterFn, ErrorReporter } from './types';

const map: {
  <T, D>(caster: CasterFn<T>, transform: (value: T) => D): CasterFn<D>;
  <T, D>(
    caster: CasterFn<T | null | undefined>, transform: (value: T) => D
  ): CasterFn<D | null | undefined>;
  <T, D>(caster: CasterFn<T | null>, transform: (value: T) => D): CasterFn<D | null>;
  <T, D>(caster: CasterFn<T | undefined>, transform: (value: T) => D): CasterFn<D | undefined>;
} = (caster: any, transform: any) => withName(
  (value: unknown, context?: string, reportError: ErrorReporter = throwTypeError) => {
    const casted = caster(value, context, reportError);
    return isNotEmpty(casted) ? transform(casted) : casted;
  },
  caster.name,
);

export default map;
