import { authKeys } from '@/features/auth/utils/auth.keys';
import { updateSession } from '@/features/auth/utils/cache-utils';
import type { ApiClient } from '@/features/core/apiClient';
import { apiHandler } from '@/utils/api-helpers';
import type { UserContract, UserResponse, userContract } from '@daria/shared';
import type { QueryClient } from '@tanstack/vue-query';
import type { ClientInferRequest, ClientInferResponses } from '@ts-rest/core';

export type SignupRequest = ClientInferRequest<UserContract['signup']>;
export type SignupResponse = ClientInferResponses<UserContract['signup'], 201>;

export type UpdateProfileRequest = ClientInferRequest<UserContract['updateProfile']>;
export type UpdateProfileResponse = ClientInferResponses<
  UserContract['updateProfile'],
  200
>;

export type UserApi = {
  signup(input: SignupRequest['body']): Promise<SignupResponse['body']>;
  updateProfile(
    input: UpdateProfileRequest['body']
  ): Promise<UpdateProfileResponse['body']>;
};

export const userApi = ({
  apiClient,
  queryClient
}: {
  apiClient: ApiClient;
  queryClient: QueryClient;
}): UserApi => {
  return {
    signup(body) {
      return apiHandler(apiClient.user.signup, { body });
    },

    async updateProfile(body) {
      const session = queryClient.getQueryData<UserResponse>(authKeys.session.queryKey);

      const result = await apiHandler(apiClient.user.updateProfile, {
        params: { userId: session!.id },
        body
      });

      updateSession(queryClient, result);

      return result;
    }
  };
};
