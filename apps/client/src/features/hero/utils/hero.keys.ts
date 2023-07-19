import type { Nullable, UUID } from '@daria/shared';
import { createQueryKeys, type inferQueryKeys } from '@lukemorales/query-key-factory';

export const heroKeys = createQueryKeys('hero', {
  list: null,
  byUser: (userId: Ref<Nullable<UUID>>) => ({
    queryKey: [userId]
  })
});

export type HeroKeysDefs = typeof heroKeys;
export type HeroKeys = inferQueryKeys<typeof heroKeys>;
