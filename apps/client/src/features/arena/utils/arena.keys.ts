import { createQueryKeys, type inferQueryKeys } from '@lukemorales/query-key-factory';

export const arenaKeys = createQueryKeys('arena', {
  list: null
});

export type ArenaKeysDefs = typeof arenaKeys;
export type ArenaKeys = inferQueryKeys<typeof arenaKeys>;
