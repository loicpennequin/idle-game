import { createContainer, asValue, asFunction } from 'awilix';
import { apiClient } from './apiClient';
import type { ContainerDeps } from './interfaces/container';
import { queryClient } from './queryClient';

type Dependency = ReturnType<typeof asFunction> | ReturnType<typeof asValue>;

const dependencies = {
  apiClient: asValue(apiClient),
  queryClient: asValue(queryClient)
} satisfies Record<keyof ContainerDeps, Dependency>;

export const container = createContainer<ContainerDeps>().register(dependencies);
