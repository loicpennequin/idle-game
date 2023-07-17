import { UUID } from '@daria/shared';
import { User } from '../user/user.entity';
import { ArenaId } from '../arena/entities/arena.entity';

export type HeroId = UUID;

export type Hero = {
  id: HeroId;
  name: string;
  owner: User;
  level: number;
};
