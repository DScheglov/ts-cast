import createCaster from './engine/create-caster';
import { isBool } from './engine/guards';

export const bool = createCaster('boolean', isBool);
