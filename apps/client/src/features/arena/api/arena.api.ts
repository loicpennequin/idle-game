import { type ArenaContract, type ArenaResponse } from '@daria/shared';
import { apiHandler } from '@/utils/api-helpers';
import type { ApiClient } from '@/features/core/apiClient';
import type { ClientInferResponseBody } from '@ts-rest/core';

export type ArenaApi = {
  getAll: () => Promise<ArenaResponse[]>;
  join: (arg: {
    arenaId: string;
    heroId: string;
  }) => Promise<ClientInferResponseBody<ArenaContract['join']>>;
  leave: (arg: {
    arenaId: string;
    heroId: string;
  }) => Promise<ClientInferResponseBody<ArenaContract['leave']>>;
};

type Dependencies = {
  apiClient: ApiClient;
};
export const arenaApi = ({ apiClient }: Dependencies): ArenaApi => {
  return {
    getAll: () => apiHandler(apiClient.arena.getAll),
    join: ({ arenaId, heroId }) =>
      apiHandler(apiClient.arena.join, { params: { arenaId }, body: { heroId } }),
    leave: ({ arenaId, heroId }) =>
      apiHandler(apiClient.arena.leave, { params: { arenaId }, body: { heroId } })
  };
};
