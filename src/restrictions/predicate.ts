export type Predicate<T> = {
  (value: T): boolean;
  displayName?: string;
};

export const predicateName = ({ displayName, name }: Predicate<any>) => displayName ?? name;

export const joinNames = (names: string[], conjunction: string): string => (
  names.length < 2 ? names[0] :
  names.length === 2 ? `${names[0]} ${conjunction} ${names[1]}` :
  joinNames(
    [names.slice(0, 1).join(', '), names[names.length - 1]],
    conjunction,
  )
);

export const withName = <T>(obj: T, name: string):
  T extends (...args: any) => any ? T : T & { name: string; } =>
    Object.defineProperty(obj, 'name', { value: name });
