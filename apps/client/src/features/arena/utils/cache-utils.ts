import { queryKeys } from '@/features/core/queryKeys';
import type { ArenaHeroResponse, UUID } from '@daria/shared';
import type { QueryClient } from '@tanstack/vue-query';
import type { GetArenaDetailsResponse } from '../api/arena.api';

export const arenaCacheUtils = (queryClient: QueryClient) => ({
  addHeroToArena(arenaHero: ArenaHeroResponse) {
    const key = queryKeys.arena.detail(ref(arenaHero.arenaId)).queryKey;
    const oldData = queryClient.getQueryData<GetArenaDetailsResponse>(key);

    if (!oldData) return;
    if (oldData.heroes.some(h => h.hero.id === arenaHero.hero.id)) return;

    queryClient.setQueryData(key, {
      ...oldData,
      heroes: oldData.heroes.concat(arenaHero)
    });
  },

  removeHeroFromArena({ arenaId, heroId }: { arenaId: UUID; heroId: UUID }) {
    const key = queryKeys.arena.detail(ref(arenaId)).queryKey;
    const oldData = queryClient.getQueryData<GetArenaDetailsResponse>(key);

    if (!oldData) return;

    queryClient.setQueryData(key, {
      ...oldData,
      heroes: oldData.heroes.filter(h => h.hero.id == heroId)
    });
  }
});
