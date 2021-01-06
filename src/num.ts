import createCaster from './create-caster';
import { isNumber } from './guards';

export const num = createCaster('number', isNumber);
