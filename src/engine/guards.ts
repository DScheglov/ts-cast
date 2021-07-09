export const isEmpty = (value: unknown): value is null | undefined => value == null;
export const isNotEmpty = <T>(value: T | null | undefined): value is T => value != null;

export const isNumber = (value: unknown): value is number => typeof value === 'number';

export const isInt = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value);

export const isStr = (value: unknown): value is string => typeof value === 'string';

export const isAnObj = <T extends {}>(value: unknown): value is T =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isATuple = <T extends any[]>(value: unknown): value is T =>
  Array.isArray(value);

export const isBool = (value: unknown): value is boolean =>
  typeof value === 'boolean';
