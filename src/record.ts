import createCaster from './engine/create-caster';
import { isAnObj } from './engine/guards';
import { Caster, CasterFn, ErrorReporter } from './engine/types';

const recordTypeName = (keyTypeName: string, valueTypeName: string) =>
  `Record<${keyTypeName}, ${valueTypeName}>`;

const checkFields = <K extends string, T>(
  keyCaster: CasterFn<K>,
  valueCaster: CasterFn<T>,
) => <O extends {}>(value: O, context?: string, reportError?: ErrorReporter) =>
    Object.entries(value).reduce(
      (obj, [key, val]) => {
        const newKey = keyCaster(key, context ? `key of ${context}` : 'key', reportError);
        const newValue = valueCaster(
          val, context ? `value of ${context}.${key}` : key, reportError,
        );

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
