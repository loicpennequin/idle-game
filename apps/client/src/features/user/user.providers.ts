import { asFunction } from 'awilix';
import { userRepository } from './api/user.repository';

export const userProviders = {
  userRepo: asFunction(userRepository)
};
