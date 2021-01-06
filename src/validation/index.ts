export const toBe = <T>(
  predicate: { (value:T): boolean; displayName?: string },
  errorMessage: string = predicate.name ?? predicate.displayName,
) => (value: T) => (predicate(value) ? null : errorMessage);
