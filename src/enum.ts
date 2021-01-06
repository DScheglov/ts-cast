import createCaster from './create-caster';

const isEnumValue = <T extends string|number|symbol>(values: T[]) => (value: any): value is T =>
  values.includes(value);

export const oneOf = <T extends (string|number|symbol)[]>(...values: T) =>
  createCaster(`one of ${JSON.stringify(values)}`, isEnumValue(values));
