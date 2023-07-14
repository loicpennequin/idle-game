import { arenaContract } from '@daria/shared';
import { ServerInferRequest } from '@ts-rest/core';
import { UnexpectedError } from '../../../utils/errorFactory';
import { Arena } from '../arena.entity';
import { ArenaRepository } from '../arena.repository';
import { UseCase } from '../../../utils/helpers';

export type GetAllArenaInput = ServerInferRequest<typeof arenaContract.getAll>['body'];
export type GetAllArenaError = UnexpectedError;

export type GetAllArenasUseCase = UseCase<GetAllArenaInput, Arena, GetAllArenaError>;

type Dependencies = { arenaRepo: ArenaRepository };

export const getAllArenasUseCase =
  ({ arenaRepo }: Dependencies): GetAllArenasUseCase =>
  async () => {
    return arenaRepo.findAll();
  };
