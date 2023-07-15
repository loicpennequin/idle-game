import { Nullable, UserResponse } from '@daria/shared';
import { User } from './user.entity';
import { UserAbility, UserAbilityBuilder } from './user.ability';
import { subject } from '@casl/ability';

export type UserMapper = {
  toResponse(user: User): UserResponse;
  toResponseArray(user: User[]): UserResponse[];
};

type Dependencies = { userAbilityBuilder: UserAbilityBuilder; session: Nullable<User> };

export const userMapper = ({ userAbilityBuilder, session }: Dependencies): UserMapper => {
  const mapuser = (user: User, ability: UserAbility): UserResponse => {
    return {
      id: user.id,
      email: ability.can('read', subject('User', user)) ? user.email : undefined
    };
  };

  return {
    toResponse(user) {
      return mapuser(user, userAbilityBuilder.buildFor(session));
    },
    toResponseArray(users) {
      const ability = userAbilityBuilder.buildFor(session);
      return users.map(user => mapuser(user, ability));
    }
  };
};
