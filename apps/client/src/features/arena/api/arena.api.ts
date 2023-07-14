import { type ArenaResponse, type UUID } from '@daria/shared';
import { apiHandler } from '@/utils/api-helpers';
import type { ApiClient } from '@/features/core/apiClient';

export type ArenaApi = {
  getAll: () => Promise<ArenaResponse[]>;
};

type Dependencies = {
  apiClient: ApiClient;
  queryClient: QueryClient;
};
export const arenaApi = ({ apiClient, queryClient }: Dependencies): ArenaApi => {
  return {
    getAll: () => apiHandler(apiClient.arena.getAll)
  };
};
