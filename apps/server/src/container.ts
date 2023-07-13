import { Express } from 'express';
import { asFunction, asValue, Resolver } from 'awilix';
import { Nullable, TypedAwilixContainer, createTypedContainer } from '@daria/shared';
import { config } from './config';
import { User } from './features/user/user.entity';
import { coreProviders } from './features/core/core.providers';
import { todoProviders } from './features/todo/todo.providers';
import { userProviders } from './features/user/user.providers';
import { authProviders } from './features/auth/auth.providers';

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

type Dependencies = typeof dependencies;
type RequestScopedDependencies = Omit<Dependencies, 'req' | 'res' | 'session'> & {
  session: Resolver<Nullable<User>>;
  req: Resolver<Express['request']>;
  res: Resolver<Express['response']>;
};

export type Container = typeof container;
export type RequestScopedContainer = TypedAwilixContainer<RequestScopedDependencies>;
