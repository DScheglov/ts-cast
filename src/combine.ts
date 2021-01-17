import createCaster from './create-caster';
import { isAnObj } from './guards';
import { Caster, CasterFn } from './types';

const combineTypeName = (schema: CasterFn<any>[]) => schema.map(caster => caster.name).join(' & ');

const combineStructs = (schema: CasterFn<{}>[]) => (value: any, context?: string) =>
  schema.reduce(
    (obj, caster) => Object.assign(obj, caster(obj, context)),
    { ...value },
  );

export const combine: {
  <A extends {}>(casterA: CasterFn<A>): Caster<A>;
  <A extends {}, B extends {}>(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
  ): Caster<A & B>;
  <A extends {}, B extends {}, C extends {}>(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
  ): Caster<A & B & C>;
  <A extends {}, B extends {}, C extends {}, D extends {}>(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
    casterD: CasterFn<D>,
  ): Caster<A & B & C & D>;
  <A extends {}, B extends {}, C extends {}, D extends {}, E extends {}>(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
    casterD: CasterFn<D>,
    casterE: CasterFn<E>,
  ): Caster<A & B & C & D & E>;
  <A extends {}, B extends {}, C extends {}, D extends {}, E extends {}, F extends {}>(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
    casterD: CasterFn<D>,
    casterE: CasterFn<E>,
    casterF: CasterFn<F>,
  ): Caster<A & B & C & D & E & F>;
  <
    A extends {}, B extends {}, C extends {}, D extends {}, E extends {}, F extends {},
    H extends {}
  >(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
    casterD: CasterFn<D>,
    casterE: CasterFn<E>,
    casterF: CasterFn<F>,
    casterH: CasterFn<H>,
  ): Caster<A & B & C & D & E & F & H>;
  <
    A extends {}, B extends {}, C extends {}, D extends {}, E extends {}, F extends {},
    H extends {}, I extends {}
  >(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
    casterD: CasterFn<D>,
    casterE: CasterFn<E>,
    casterF: CasterFn<F>,
    casterH: CasterFn<H>,
    casterI: CasterFn<I>,
  ): Caster<A & B & C & D & E & F & H & I>;
  <
    A extends {}, B extends {}, C extends {}, D extends {}, E extends {}, F extends {},
    H extends {}, I extends {}, J extends {}
  >(
    casterA: CasterFn<A>,
    casterB: CasterFn<B>,
    casterC: CasterFn<C>,
    casterD: CasterFn<D>,
    casterE: CasterFn<E>,
    casterF: CasterFn<F>,
    casterH: CasterFn<H>,
    casterI: CasterFn<I>,
    casterJ: CasterFn<J>,
  ): Caster<A & B & C & D & E & F & H & I & J>;
} = (...schema: CasterFn<{}>[]) =>
  createCaster(combineTypeName(schema), isAnObj, combineStructs(schema));
