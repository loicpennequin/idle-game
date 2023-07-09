import { asFunction, asValue } from 'awilix';
import { apiClient } from './features/core/apiClient';
import { queryClient } from './features/core/queryClient';
import { createTypedContainer } from '@daria/shared';
import { createQueryKeys } from './features/core/queryKeys';
import { todoProviders } from './features/todo/todo.providers';

const dependencies = {
  apiClient: asValue(apiClient),
  queryClient: asValue(queryClient),
  queryKeys: asFunction(createQueryKeys),

  ...todoProviders
};

export const container = createTypedContainer(dependencies);

export type Container = typeof container;
