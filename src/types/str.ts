import { createCaster } from '../engine';
import { isStr } from '../engine/guards';

export const str = createCaster('string', isStr);
