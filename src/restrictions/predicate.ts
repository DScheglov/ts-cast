export type Predicate<T> = {
  (value: T): boolean;
  displayName?: string;
};

export const predicateName = ({ displayName, name }: Predicate<any>) => displayName ?? name;
