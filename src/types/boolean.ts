import { createCaster } from '../engine';
import { isBool } from '../engine/guards';

export const boolean = createCaster('boolean', isBool);
