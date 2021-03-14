import { createCaster } from '../engine';

const isEnumValue = <T extends string|number|symbol|boolean>(values: T[]) =>
  (value: any): value is T => values.includes(value);

export const values = <T extends (string|number|symbol|boolean)>(...vals: T[]) =>
  createCaster(vals.map(v => JSON.stringify(v)).join('|'), isEnumValue(vals));
