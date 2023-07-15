import { type HeroResponse } from '@daria/shared';
import { apiHandler } from '@/utils/api-helpers';
import type { ApiClient } from '@/features/core/apiClient';

export type HeroApi = {
  getAll: () => Promise<HeroResponse[]>;
};

type Dependencies = {
  apiClient: ApiClient;
};
export const heroApi = ({ apiClient }: Dependencies): HeroApi => {
  return {
    getAll: () => apiHandler(apiClient.hero.getAll)
  };
};
