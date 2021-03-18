export const memo = <T>(fn: () => T) => {
  let hasBeenCalled = false;
  let result: T;

  return () => {
    if (hasBeenCalled) return result;

    hasBeenCalled = true;
    result = fn();

    return result;
  };
};
