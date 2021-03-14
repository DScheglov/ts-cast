import { createCaster } from '../engine';

export const value = <T extends string|symbol|number|boolean>(
  literal: T, typeName: string = JSON.stringify(literal),
) => createCaster(typeName, (val: any): val is T => val === literal);
