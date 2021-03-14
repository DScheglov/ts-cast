import { createCaster } from '../engine';

export const nil = createCaster(
  'null',
  (value: any): value is null => value === null,
);
