import { UserResponse } from '@daria/shared';
import { User } from './user.entity';

export type UserMapper = {
  toResponse(user: User): UserResponse;
  toResponseArray(user: User[]): UserResponse[];
};

export const userMapper = (): UserMapper => {
  const mapuser = (user: User): UserResponse => {
    return {
      id: user.id,
      email: user.email
    };
  };

  return {
    toResponse: mapuser,
    toResponseArray(users) {
      return users.map(mapuser);
    }
  };
};
