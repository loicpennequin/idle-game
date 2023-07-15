import { asFunction } from 'awilix';
import { userRepository } from './user.repository';
import { signupUseCase } from './usecases/signup.usecase';
import { userMapper } from './user.mapper';
import { userAbilityBuilder } from './user.ability';

export const userProviders = {
  userRepo: asFunction(userRepository),
  userMapper: asFunction(userMapper),
  userAbility: asFunction(userAbilityBuilder),

  signupUseCase: asFunction(signupUseCase)
};
