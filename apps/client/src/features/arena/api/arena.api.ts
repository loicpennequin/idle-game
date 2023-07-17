import type { UUID, ArenaContract } from '@daria/shared';
import { apiHandler } from '@/utils/api-helpers';
import type { ApiClient } from '@/features/core/apiClient';
import type { ClientInferResponseBody } from '@ts-rest/core';

export type GetAllArenasResponse = ClientInferResponseBody<ArenaContract['getAll'], 200>;
export type GetArenaDetailsResponse = ClientInferResponseBody<
  ArenaContract['getById'],
  200
>;
export type JoinArenaResponse = ClientInferResponseBody<ArenaContract['join']>;
export type LeaveArenaResponse = ClientInferResponseBody<ArenaContract['leave']>;

export type ArenaApi = {
  getAll: () => Promise<GetAllArenasResponse>;
  getDetails: (arenaId: UUID) => Promise<GetArenaDetailsResponse>;
  join: (arg: { arenaId: string; heroId: string }) => Promise<JoinArenaResponse>;
  leave: (arg: { arenaId: string; heroId: string }) => Promise<LeaveArenaResponse>;
};

type Dependencies = {
  apiClient: ApiClient;
};
export const arenaApi = ({ apiClient }: Dependencies): ArenaApi => {
  return {
    getAll: () => apiHandler(apiClient.arena.getAll),
    getDetails: arenaId => apiHandler(apiClient.arena.getById, { params: { arenaId } }),
    join: ({ arenaId, heroId }) =>
      apiHandler(apiClient.arena.join, { params: { arenaId }, body: { heroId } }),
    leave: ({ arenaId, heroId }) =>
      apiHandler(apiClient.arena.leave, { params: { arenaId }, body: { heroId } })
  };
};
