import { createCaster } from '../engine';
import { isAnObj } from '../engine/guards';
import { Caster, CasterFn, ErrorReporter } from '../engine/types';

const prodTypeName = (schema: CasterFn<any>[]) => schema.map(caster => caster.name).join(' & ');

const mergeStructs = (schema: CasterFn<{}>[]) =>
  (value: unknown, context?: string, reportError?: ErrorReporter) =>
    schema.reduce(
      (obj, caster) => Object.assign(obj, caster(value, context, reportError)),
      Object.create(null),
    );

type CasterTuple<T extends any[]> = {
  [K in keyof T]: CasterFn<T[K]>;
};

type Merge<T extends any[]> = T extends [infer A, ...infer B]
  ? A & Merge<B>
  : unknown;

export const allOf = <T extends any[]>(...schema: CasterTuple<T>): Caster<Merge<T>> =>
  createCaster(prodTypeName(schema), isAnObj, mergeStructs(schema)) as any;

export const prod = allOf;
