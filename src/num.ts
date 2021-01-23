import createCaster from './engine/create-caster';
import { isNumber } from './engine/guards';

export const num = createCaster('number', isNumber);
