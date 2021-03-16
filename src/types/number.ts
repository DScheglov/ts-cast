import { createCaster } from '../engine';
import { isNumber } from '../engine/guards';

export const number = createCaster('number', isNumber);
