import { UUID } from '@daria/shared';
import { User } from '../user/user.entity';

export type HeroId = UUID;

export type Hero = {
  id: HeroId;
  name: string;
  owner: User;
  level: number;
};
