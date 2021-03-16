import { createCaster } from '../engine';
import { isInt } from '../engine/guards';

export const integer = createCaster('integer', isInt);
