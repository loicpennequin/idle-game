import { UnexpectedError } from '../../../utils/errorFactory';
import { ArenaDetails } from '../entities/arena.entity';
import { ArenaRepository } from '../arena.repository';
import { UseCase } from '../../../utils/helpers';
import { UUID } from '@daria/shared';

export type GetArenaDetailsUseCase = UseCase<UUID, ArenaDetails, UnexpectedError>;

type Dependencies = { arenaRepo: ArenaRepository };

export const getArenaDetailsUseCase =
  ({ arenaRepo }: Dependencies): GetArenaDetailsUseCase =>
  async id => {
    return arenaRepo.findByIdWithDetails(id);
  };
