export type Predicate<T> = {
  (value: T): boolean;
  displayName?: string;
};

export type RuleFn<T> = (value: T) => string | null;

export type RuleTuple<T> = [Predicate<T>, string];

export type RuleBuilder<T> =(predicate: Predicate<T>, errorMessage?: string) => RuleFn<T>;
