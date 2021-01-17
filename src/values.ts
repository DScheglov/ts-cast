import createCaster from './create-caster';

const isEnumValue = <T extends string|number|symbol>(values: T[]) => (value: any): value is T =>
  values.includes(value);

export const values = <T extends (string|number|symbol)[]>(...vals: T) =>
  createCaster(vals.map(v => JSON.stringify(v)).join('|'), isEnumValue(vals));
