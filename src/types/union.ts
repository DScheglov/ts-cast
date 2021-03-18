import { createCaster } from '../engine';
import { Caster, CasterFn, ErrorReporter } from '../engine/types';

const checkTypes = (casters: CasterFn<any>[], typeName: string) => {
  const unionCasterFn = (value: unknown, context?: string, reportError?: ErrorReporter) => {
    let match: any;

    const isMatched = casters.some(caster => {
      try {
        match = caster(value, context);
        return true;
      } catch (err) {
        return false;
      }
    });

    if (isMatched) return match;

    return reportError!(
      `${typeName} is expected${context ? ` in ${context}` : ''} but "${value}" received.`,
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

  return createCaster(typeName, (() => true) as any, checkTypes(casters, typeName));
};
