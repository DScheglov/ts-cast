import { isEmpty } from './guards';
import { CasterFn } from './types';

const optional = <T>(caster: CasterFn<T>): CasterFn<T | null | undefined | void> => {
  const casterFn = (value: any, context?: string) =>
    (isEmpty(value) ? value : caster(value, context));

  Reflect.defineProperty(casterFn, 'name', { value: `${caster.name}?` });

  return casterFn;
};

export default optional;
