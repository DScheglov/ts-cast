import createCaster from './engine/create-caster';
import { isStr } from './engine/guards';

export const str = createCaster('string', isStr);
