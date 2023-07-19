import type { UUID, UserContract, HeroContract } from '@daria/shared';
import { apiHandler } from '@/utils/api-helpers';
import type { ApiClient } from '@/features/core/apiClient';
import type { ClientInferResponseBody } from '@ts-rest/core';

export type HeroApi = {
  getAll: () => Promise<ClientInferResponseBody<HeroContract['getAll'], 200>>;
  getByOwnerId: (
    ownerId: UUID
  ) => Promise<ClientInferResponseBody<UserContract['userHeroes'], 200>>;
};

type Dependencies = {
  apiClient: ApiClient;
};
export const heroApi = ({ apiClient }: Dependencies): HeroApi => {
  return {
    getAll() {
      return apiHandler(apiClient.hero.getAll);
    },
    getByOwnerId(userId) {
      return apiHandler(apiClient.user.userHeroes, { params: { userId } });
    }
  };
};
