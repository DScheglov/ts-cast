import { casterApi } from '../engine';
import { throwTypeError } from '../engine/throw-type-error';
import { Caster, CasterFn, ErrorReporter } from '../engine/types';
import { withName } from '../helpers/names';

const checkTypes = (casters: CasterFn<any>[], typeName: string) => {
  const unionCasterFn = (
    value: unknown,
    context?: string,
    reportError: ErrorReporter = throwTypeError,
  ) => {
    let match: any;
    const errors: string[] = [];

    const isMatched = casters.some(caster => {
      try {
        match = caster(value, context);
        return true;
      } catch (err) {
        errors.push(`${caster.name}: ${err.message}`);
        return false;
      }
    });

    if (isMatched) return match;

    return reportError!(
      `${typeName} is expected${context ? ` in ${context}` : ''} but no matching type was found:\n${
        errors.map(e => `  - ${e}`).join('\n')}`,
      context,
    );
  };

  return unionCasterFn;
};

export const union: {
  <A, B>(casterA: CasterFn<A>, casterB: CasterFn<B>): Caster<A|B>;
  <A, B, C>(casterA: CasterFn<A>, casterB: CasterFn<B>, casterC: CasterFn<C>): Caster<A|B|C>;
  <A, B, C, D>(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
    casterD: CasterFn<D>,
  ): Caster<A|B|C|D>;
  <A, B, C, D, E>(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
    casterD: CasterFn<D>,
    casterE: CasterFn<E>,
  ): Caster<A|B|C|D|E>;
  <A, B, C, D, E, F>(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
    casterD: CasterFn<D>,
    casterE: CasterFn<E>,
    casterF: CasterFn<F>,
  ): Caster<A|B|C|D|E|F>;
  <A, B, C, D, E, F, G>(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
    casterD: CasterFn<D>,
    casterE: CasterFn<E>,
    casterF: CasterFn<F>,
    casterG: CasterFn<G>,
  ): Caster<A|B|C|D|E|F|G>;
  <A, B, C, D, E, F, G, H>(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
    casterD: CasterFn<D>,
    casterE: CasterFn<E>,
    casterF: CasterFn<F>,
    casterG: CasterFn<G>,
    casterH: CasterFn<H>,
  ): Caster<A|B|C|D|E|F|G|H>;
  <A, B, C, D, E, F, G, H, I>(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
    casterD: CasterFn<D>,
    casterE: CasterFn<E>,
    casterF: CasterFn<F>,
    casterG: CasterFn<G>,
    casterH: CasterFn<H>,
    casterI: CasterFn<I>,
  ): Caster<A|B|C|D|E|F|G|H|I>;
  <A, B, C, D, E, F, G, H, I, J>(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
    casterD: CasterFn<D>,
    casterE: CasterFn<E>,
    casterF: CasterFn<F>,
    casterG: CasterFn<G>,
    casterH: CasterFn<H>,
    casterI: CasterFn<I>,
    casterJ: CasterFn<J>,
  ): Caster<A|B|C|D|E|F|G|H|I|J>;
  <A, B, C, D, E, F, G, H, I, J, K>(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
    casterD: CasterFn<D>,
    casterE: CasterFn<E>,
    casterF: CasterFn<F>,
    casterG: CasterFn<G>,
    casterH: CasterFn<H>,
    casterI: CasterFn<I>,
    casterJ: CasterFn<J>,
    casterK: CasterFn<K>,
  ): Caster<A|B|C|D|E|F|G|H|I|J|K>;
  <A, B, C, D, E, F, G, H, I, J, K, L>(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
    casterD: CasterFn<D>,
    casterE: CasterFn<E>,
    casterF: CasterFn<F>,
    casterG: CasterFn<G>,
    casterH: CasterFn<H>,
    casterI: CasterFn<I>,
    casterJ: CasterFn<J>,
    casterK: CasterFn<K>,
    casterL: CasterFn<L>,
  ): Caster<A|B|C|D|E|F|G|H|I|J|K|L>;
  <A, B, C, D, E, F, G, H, I, J, K, L, M>(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
    casterD: CasterFn<D>,
    casterE: CasterFn<E>,
    casterF: CasterFn<F>,
    casterG: CasterFn<G>,
    casterH: CasterFn<H>,
    casterI: CasterFn<I>,
    casterJ: CasterFn<J>,
    casterK: CasterFn<K>,
    casterL: CasterFn<L>,
    casterM: CasterFn<M>,
  ): Caster<A|B|C|D|E|F|G|H|I|J|K|L|M>;
} = (...casters: CasterFn<any>[]) => {
  if (casters.length < 2) {
    throw new Error('At least two types should be specified.');
  }

  const typeName = casters.map(c => c.name).join('|');
  const casterFn = checkTypes(casters, typeName);

  return casterApi(withName(casterFn, typeName));
};

export const firstOf = union;
export const oneOf = union;
