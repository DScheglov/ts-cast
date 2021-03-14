import { createCaster } from '../engine';
import { isBool } from '../engine/guards';

export const bool = createCaster('boolean', isBool);
