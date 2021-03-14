import { createCaster } from '../engine';
import { isNumber } from '../engine/guards';

export const num = createCaster('number', isNumber);
