import { createCaster } from '../engine';
import { isInt } from '../engine/guards';

export const int = createCaster('integer', isInt);
