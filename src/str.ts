import createCaster from './create-caster';
import { isStr } from './guards';

export const str = createCaster('string', isStr);
