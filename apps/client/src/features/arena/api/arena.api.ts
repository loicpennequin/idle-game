import { type ArenaContract, type UUID } from '@daria/shared';
import { apiHandler } from '@/utils/api-helpers';
import type { ApiClient } from '@/features/core/apiClient';
import type { ClientInferResponseBody } from '@ts-rest/core';
import type { QueryClient } from '@tanstack/vue-query';
import { queryKeys } from '@/features/core/queryKeys';
import type { AppSocket } from '@/features/core/socket';

export type JoinArenaResponse = ClientInferResponseBody<ArenaContract['join'], 200>;
export type LeaveArenaResponse = ClientInferResponseBody<ArenaContract['leave'], 200>;
export type GetAllArenasResponse = ClientInferResponseBody<ArenaContract['getAll'], 200>;
export type GetArenaDetailsResponse = ClientInferResponseBody<
  ArenaContract['getById'],
  200
>;

export type ArenaApi = {
  getAll: () => Promise<GetAllArenasResponse>;
  getDetails: (id: UUID) => Promise<GetArenaDetailsResponse>;
  join: (arg: { arenaId: string; heroId: string }) => Promise<JoinArenaResponse>;
  leave: (arg: { arenaId: string; heroId: string }) => Promise<LeaveArenaResponse>;
};

type Dependencies = {
  apiClient: ApiClient;
  queryClient: QueryClient;
  socket: AppSocket;
};
export const arenaApi = ({ queryClient, apiClient, socket }: Dependencies): ArenaApi => {
  socket.on('HERO_JOINED_ARENA', arenaHero => {
    const key = queryKeys.arena.detail(ref(arenaHero.arenaId)).queryKey;
    const oldData = queryClient.getQueryData<GetArenaDetailsResponse>(key);

    if (!oldData) return;
    if (oldData.heroes.some(h => h.hero.id === arenaHero.hero.id)) return;

    queryClient.setQueryData(key, {
      ...oldData,
      heroes: oldData.heroes.concat(arenaHero)
    });
  });

  return {
    getAll: () => apiHandler(apiClient.arena.getAll),
    getDetails: arenaId => apiHandler(apiClient.arena.getById, { params: { arenaId } }),
    join: async ({ arenaId, heroId }) => {
      const result = await apiHandler(apiClient.arena.join, {
        params: { arenaId },
        body: { heroId }
      });

      // queryClient.invalidateQueries(queryKeys.arena.detail(ref(arenaId)).queryKey);
      queryClient.invalidateQueries(queryKeys.arena.list.queryKey);

      return result;
    },
    leave: async ({ arenaId, heroId }) => {
      const result = await apiHandler(apiClient.arena.leave, {
        params: { arenaId },
        body: { heroId }
      });

      queryClient.invalidateQueries(queryKeys.arena.detail(ref(arenaId)).queryKey);
      queryClient.invalidateQueries(queryKeys.arena.list.queryKey);

      return result;
    }
  };
};
