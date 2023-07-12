import { Express } from 'express';
import { asFunction, asValue } from 'awilix';
import { TypedAwilixContainer, createTypedContainer } from '@daria/shared';
import { config } from './config';
import { coreProviders } from './features/core/core.providers';
import { todoProviders } from './features/todo/todo.providers';
import { userProviders } from './features/user/user.providers';
import { authProviders } from './features/auth/auth.providers';

const dependencies = {
  config: asFunction(config),
  req: asValue(null),
  res: asValue(null),
  ...coreProviders,
  ...todoProviders,
  ...userProviders,
  ...authProviders
};

export const container = createTypedContainer(dependencies);

export type Container = typeof container;
export type RequestScopedContainer = TypedAwilixContainer<
  typeof dependencies & {
    req: Express['request'];
    res: Express['response'];
  }
>;
