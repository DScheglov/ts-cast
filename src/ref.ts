import { Caster, CasterFn } from './engine/types';
import { casterApi } from './engine/create-caster';

export const ref = <T>(casterRef: () => CasterFn<T>, typeName: string = '<recursively-defined-type>'): Caster<T> => {
  let caster: CasterFn<T> = (value: any, context?: string): T => {
    caster = casterRef();
    return caster(value, context);
  };

  const referredCaster = (value: any, context?: string): T => caster(value, context);

  Object.defineProperty(referredCaster, 'name', { get: () => caster.name ?? typeName });

  return casterApi(referredCaster);
};
