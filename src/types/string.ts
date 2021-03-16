import { createCaster } from '../engine';
import { isStr } from '../engine/guards';

export const string = createCaster('string', isStr);
