import createCaster from './engine/create-caster';
import { isInt } from './engine/guards';

export const int = createCaster('integer', isInt);
