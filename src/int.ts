import createCaster from './create-caster';
import { isInt } from './guards';

export const int = createCaster('integer', isInt);
