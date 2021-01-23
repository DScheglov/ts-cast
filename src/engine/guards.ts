export const isEmpty = (value: any): value is null | undefined => value == null;

export const isNumber = (value: any): value is number => typeof value === 'number';

export const isInt = (value: any): value is number =>
  typeof value === 'number' && Number.isInteger(value);

export const isStr = (value: any): value is string => typeof value === 'string';

export const isAnObj = <T extends {}>(value: any): value is T =>
  typeof value === 'object' && !Array.isArray(value);

export const isATuple = <T extends any[]>(value: any): value is T =>
  Array.isArray(value);

export const isBool = (value: any): value is boolean =>
  typeof value === 'boolean';
