import type { Contract } from '@daria/shared';
import type { QueryClient } from '@tanstack/vue-query';
import { initClient, type InitClientArgs } from '@ts-rest/core';
import type { AwilixContainer } from 'awilix';

export type ApiClient = ReturnType<typeof initClient<Contract, InitClientArgs>>;

export type ContainerDeps = {
  apiClient: ApiClient;
  queryClient: QueryClient;
};

export type Container = AwilixContainer<ContainerDeps>;
