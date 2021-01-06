import createCaster from './create-caster';
import { isATuple } from './guards';
import {
  Caster, CasterObj, Tuple, TupleSchema, TypeGuard,
} from './types';

const transformTuple = <T extends Tuple>(schema: TupleSchema<T>) =>
  (value: any, context?: string) =>
    ((schema as any[]).map(
      (caster, index) => caster(value[index], context ? `${context}[${index}]` : index),
    ) as any) as T;

export const tuple: {
  <A>(casterA: Caster<A>): CasterObj<[A]>;
  <A, B>(casterA: Caster<A>, casterB: Caster<B>): CasterObj<[A, B]>;
  <A, B, C>(
    casterA: Caster<A>,
    casterB: Caster<B>,
    casterC: Caster<C>,
  ): CasterObj<[A, B, C]>;
  <A, B, C, D>(
    casterA: Caster<A>,
    casterB: Caster<B>,
    casterC: Caster<C>,
    casterD: Caster<D>,
  ): CasterObj<[A, B, C, D]>;
  <A, B, C, D, E>(
    casterA: Caster<A>,
    casterB: Caster<B>,
    casterC: Caster<C>,
    casterD: Caster<D>,
    casterE: Caster<E>,
  ): CasterObj<[A, B, C, D, E]>;
  <A, B, C, D, E, F>(
    casterA: Caster<A>,
    casterB: Caster<B>,
    casterC: Caster<C>,
    casterD: Caster<D>,
    casterE: Caster<E>,
    casterF: Caster<F>,
  ): CasterObj<[A, B, C, D, E, F]>;
  <A, B, C, D, E, F, G>(
    casterA: Caster<A>,
    casterB: Caster<B>,
    casterC: Caster<C>,
    casterD: Caster<D>,
    casterE: Caster<E>,
    casterF: Caster<F>,
    casterG: Caster<G>,
  ): CasterObj<[A, B, C, D, E, F, G]>;
  <A, B, C, D, E, F, G, H>(
    casterA: Caster<A>,
    casterB: Caster<B>,
    casterC: Caster<C>,
    casterD: Caster<D>,
    casterE: Caster<E>,
    casterF: Caster<F>,
    casterG: Caster<G>,
    casterH: Caster<H>,
  ): CasterObj<[A, B, C, D, E, F, G, H]>;
  <A, B, C, D, E, F, G, H, I>(
    casterA: Caster<A>,
    casterB: Caster<B>,
    casterC: Caster<C>,
    casterD: Caster<D>,
    casterE: Caster<E>,
    casterF: Caster<F>,
    casterG: Caster<G>,
    casterH: Caster<H>,
    casterI: Caster<I>,
  ): CasterObj<[A, B, C, D, E, F, G, H, I]>;
  <A, B, C, D, E, F, G, H, I, J>(
    casterA: Caster<A>,
    casterB: Caster<B>,
    casterC: Caster<C>,
    casterD: Caster<D>,
    casterE: Caster<E>,
    casterF: Caster<F>,
    casterG: Caster<G>,
    casterH: Caster<H>,
    casterI: Caster<I>,
    casterJ: Caster<J>,
  ): CasterObj<[A, B, C, D, E, F, G, H, I, J]>;
  <A, B, C, D, E, F, G, H, I, J, K>(
    casterA: Caster<A>,
    casterB: Caster<B>,
    casterC: Caster<C>,
    casterD: Caster<D>,
    casterE: Caster<E>,
    casterF: Caster<F>,
    casterG: Caster<G>,
    casterH: Caster<H>,
    casterI: Caster<I>,
    casterJ: Caster<J>,
    casterK: Caster<K>,
  ): CasterObj<[A, B, C, D, E, F, G, H, I, J, K]>;
  <A, B, C, D, E, F, G, H, I, J, K, L>(
    casterA: Caster<A>,
    casterB: Caster<B>,
    casterC: Caster<C>,
    casterD: Caster<D>,
    casterE: Caster<E>,
    casterF: Caster<F>,
    casterG: Caster<G>,
    casterH: Caster<H>,
    casterI: Caster<I>,
    casterJ: Caster<J>,
    casterK: Caster<K>,
    casterL: Caster<L>,
  ): CasterObj<[A, B, C, D, E, F, G, H, I, J, K, L]>;
  <A, B, C, D, E, F, G, H, I, J, K, L, M>(
    casterA: Caster<A>,
    casterB: Caster<B>,
    casterC: Caster<C>,
    casterD: Caster<D>,
    casterE: Caster<E>,
    casterF: Caster<F>,
    casterG: Caster<G>,
    casterH: Caster<H>,
    casterI: Caster<I>,
    casterJ: Caster<J>,
    casterK: Caster<K>,
    casterL: Caster<L>,
    casterM: Caster<M>,
  ): CasterObj<[A, B, C, D, E, F, G, H, I, J, K, L, M]>;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
    casterA: Caster<A>,
    casterB: Caster<B>,
    casterC: Caster<C>,
    casterD: Caster<D>,
    casterE: Caster<E>,
    casterF: Caster<F>,
    casterG: Caster<G>,
    casterH: Caster<H>,
    casterI: Caster<I>,
    casterJ: Caster<J>,
    casterK: Caster<K>,
    casterL: Caster<L>,
    casterM: Caster<M>,
    casterN: Caster<N>,
  ): CasterObj<[A, B, C, D, E, F, G, H, I, J, K, L, M, N]>;
  <A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
    casterA: Caster<A>,
    casterB: Caster<B>,
    casterC: Caster<C>,
    casterD: Caster<D>,
    casterE: Caster<E>,
    casterF: Caster<F>,
    casterG: Caster<G>,
    casterH: Caster<H>,
    casterI: Caster<I>,
    casterJ: Caster<J>,
    casterK: Caster<K>,
    casterL: Caster<L>,
    casterM: Caster<M>,
    casterN: Caster<N>,
    casterO: Caster<O>,
  ): CasterObj<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>;
} = <T extends Tuple>(...schema: Array<any> & TupleSchema<T>) =>
  createCaster('tuple', isATuple as TypeGuard<T>, transformTuple(schema));
