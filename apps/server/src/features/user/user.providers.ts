import { asFunction } from 'awilix';
import { userRepository } from './user.repository';
import { signupUseCase } from './usecases/signup.usecase';
import { userMapper } from './user.mapper';

export const userProviders = {
  userRepo: asFunction(userRepository),
  signupUseCase: asFunction(signupUseCase),
  userMapper: asFunction(userMapper)
};
