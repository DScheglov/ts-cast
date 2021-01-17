import createCaster from './create-caster';
import { isAnObj } from './guards';
import { Caster, CasterFn } from './types';

const recordTypeName = (keyTypeName: string, valueTypeName: string) =>
  `Record<${keyTypeName}, ${valueTypeName}>`;

const checkFields = <K extends string, T>(
  keyCaster: CasterFn<K>,
  valueCaster: CasterFn<T>,
) => <O extends {}>(value: O, context?: string) =>
    Object.entries(value).reduce(
      (obj, [key, val]) => {
        const newKey = keyCaster(key, context ? `key of ${context}` : 'key');
        const newValue = valueCaster(val, context ? `value of ${context}.${key}` : key);

        obj[newKey] = newValue;
        return obj;
      },
      Object.create(null),
    );

export const record = <K extends string, T>(
  keyCaster: CasterFn<K>,
  valueCaster: CasterFn<T>,
  typeName: string = recordTypeName(keyCaster.name, valueCaster.name),
): Caster<Record<K, T>> =>
    createCaster(typeName, isAnObj, checkFields(keyCaster, valueCaster));
