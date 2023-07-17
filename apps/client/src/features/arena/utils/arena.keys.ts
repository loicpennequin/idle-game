import type { UUID } from '@daria/shared';
import { createQueryKeys, type inferQueryKeys } from '@lukemorales/query-key-factory';

export const arenaKeys = createQueryKeys('arena', {
  list: null,
  detail: (arenaId: Ref<UUID>) => ({
    queryKey: [arenaId]
  })
});

export type ArenaKeysDefs = typeof arenaKeys;
export type ArenaKeys = inferQueryKeys<typeof arenaKeys>;
