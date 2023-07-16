import { UUID } from '@daria/shared';

export type UserId = UUID;

export type User = {
  id: UserId;
  email: string;
  name: string | null;
};
