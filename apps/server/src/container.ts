import { Express } from 'express';
import { asFunction, asValue } from 'awilix';
import { Nullable, TypedAwilixContainer, createTypedContainer } from '@daria/shared';
import { config } from './config';
import { coreProviders } from './features/core/core.providers';
import { todoProviders } from './features/todo/todo.providers';
import { userProviders } from './features/user/user.providers';
import { authProviders } from './features/auth/auth.providers';
import { User } from './features/user/user.entity';

const dependencies = {
  config: asFunction(config),
  req: asValue(null),
  res: asValue(null),
  session: asValue(null),
  ...coreProviders,
  ...todoProviders,
  ...userProviders,
  ...authProviders
};

export const container = createTypedContainer(dependencies);

export type Container = typeof container;
export type RequestScopedContainer = TypedAwilixContainer<
  typeof dependencies & {
    session: Nullable<User>;
    req: Express['request'];
    res: Express['response'];
  }
>;
