import { type HeroResponse, type UUID } from '@daria/shared';
import { apiHandler } from '@/utils/api-helpers';
import type { ApiClient } from '@/features/core/apiClient';

export type HeroApi = {
  getAll: () => Promise<HeroResponse[]>;
};

type Dependencies = {
  apiClient: ApiClient;
  queryClient: QueryClient;
};
export const heroApi = ({ apiClient, queryClient }: Dependencies): HeroApi => {
  return {
    getAll: () => apiHandler(apiClient.hero.getAll)
  };
};
