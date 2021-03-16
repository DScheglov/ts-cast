export const joinNames = (names: string[], conjunction: string): string => (
  names.length < 2 ? names[0] :
  names.length === 2 ? `${names[0]} ${conjunction} ${names[1]}` :
  joinNames(
    [names.slice(0, 1).join(', '), names[names.length - 1]],
    conjunction,
  )
);

type WithName<T> = T extends (...args: any) => any ? T : T & { name: string; };

export const withName = <T>(obj: T, name: string): WithName<T> =>
  Object.defineProperty(obj, 'name', { value: name });
