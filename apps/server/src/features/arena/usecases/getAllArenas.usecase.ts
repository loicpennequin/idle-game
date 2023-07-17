import { UnexpectedError } from '../../../utils/errorFactory';
import { Arena } from '../entities/arena.entity';
import { ArenaRepository } from '../arena.repository';
import { UseCase } from '../../../utils/helpers';

export type GetAllArenaError = UnexpectedError;

export type GetAllArenasUseCase = UseCase<void, Arena[], GetAllArenaError>;

type Dependencies = { arenaRepo: ArenaRepository };

export const getAllArenasUseCase =
  ({ arenaRepo }: Dependencies): GetAllArenasUseCase =>
  async () => {
    return arenaRepo.findAll();
  };
