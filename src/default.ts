import { CasterFn } from './types';

const defValue = <T>(casterFn: CasterFn<T>, defaultValue: T): CasterFn<Exclude<T, undefined>> => {
  const defaultCaster = (value: any, context?: string) => (
    value === undefined && defaultValue === null
      ? null
      : casterFn(value ?? defaultValue, context)) as any;

  Object.defineProperty(defaultCaster, 'name', { value: casterFn.name.replace(/\?$/, '') });

  return defaultCaster;
};

export default defValue;
