import { type ArenaResponse } from '@daria/shared';
import { apiHandler } from '@/utils/api-helpers';
import type { ApiClient } from '@/features/core/apiClient';

export type ArenaApi = {
  getAll: () => Promise<ArenaResponse[]>;
};

type Dependencies = {
  apiClient: ApiClient;
};
export const arenaApi = ({ apiClient }: Dependencies): ArenaApi => {
  return {
    getAll: () => apiHandler(apiClient.arena.getAll)
  };
};
