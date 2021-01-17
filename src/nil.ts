const optional = (value: any, context?: string): null | undefined => {
  if (value == null) return value;
  throw new TypeError(
    `null expected${context ? ` in ${context}` : ''} but received ${value}.`,
  );
};

Object.defineProperty(optional, 'name', { value: 'null?' });

export const nil = (value: any, context?: string): null => {
  if (value === null) return null;
  throw new TypeError(
    `null expected${context ? ` in ${context}` : ''} but received ${value}.`,
  );
};

nil.optional = optional;

Object.defineProperty(nil, 'name', { value: 'null' });
