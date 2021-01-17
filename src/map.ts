import { isEmpty } from './guards';
import { CasterFn } from './types';

const map = <T, D>(
  caster: CasterFn<T>,
  transform: (value: Exclude<T, null | undefined>) => D,
): CasterFn<D | Exclude<T, Exclude<T, null | undefined>>> => Object.defineProperty(
    (value: any, context?: string) => {
      const casted = caster(value, context);
      return isEmpty(casted) ? casted : transform(casted as Exclude<T, null | undefined>);
    },
    'name',
    { value: caster.name },
  );

export default map;
