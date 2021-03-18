import { createCaster } from '../engine';

export const nil = createCaster(
  'null',
  (value): value is null => value === null,
);
