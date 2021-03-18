import { withName } from '../helpers/names';
import { throwTypeError } from './throw-type-error';
import { CasterFn } from './types';

const either = <T, Left, Right>(
  caster: CasterFn<T>,
  leftFactory: (error: TypeError) => Left,
  rightFactory:(value: T) => Right,
): CasterFn<Left | Right> => withName(
    (value: unknown, context?: string) => {
      try {
        const casted = caster(value, context, throwTypeError);
        return rightFactory(casted);
      } catch (err) {
        return leftFactory(err);
      }
    },
    `either<*, ${caster.name}>`,
  );

export default either;
