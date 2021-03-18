import { Predicate } from './types';

export const predicateName = ({ displayName, name }: Predicate<any>) => displayName ?? name;
