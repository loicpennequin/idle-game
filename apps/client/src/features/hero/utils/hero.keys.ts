import { createQueryKeys, type inferQueryKeys } from '@lukemorales/query-key-factory';

export const heroKeys = createQueryKeys('hero', {
  list: null
});

export type HeroKeysDefs = typeof heroKeys;
export type HeroKeys = inferQueryKeys<typeof heroKeys>;
