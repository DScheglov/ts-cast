import createCaster from './create-caster';
import { isBool } from './guards';

export const bool = createCaster('boolean', isBool);
