import { authContract } from '@daria/shared';
import { ServerInferRequest } from '@ts-rest/core';
import {
  UnauthorizedError,
  UnexpectedError,
  errorFactory
} from '../../../utils/errorFactory';
import { UserRepository } from '../../user/user.repository';
import { UseCase } from '../../../utils/helpers';
import { isLeft, left, right } from 'fp-ts/Either';
import { compare } from 'bcrypt';
import { RefreshToken, TokenService } from '../token.service';
import { RefreshTokenRepository } from '../refreshToken.repository';
import { Response } from 'express';
import { REFRESH_TOKEN_COOKIE } from '../../../utils/constants';
import { handlePrismaError } from '../../../utils/prisma';

export type LogoutUseCaseError = UnexpectedError;

export type LogoutUseCase = UseCase<RefreshToken, null, LogoutUseCaseError>;

type Dependencies = {
  refreshTokenRepo: RefreshTokenRepository;
  res: Response;
};

export const logoutUsecase =
  ({ refreshTokenRepo, res }: Dependencies): LogoutUseCase =>
  async token => {
    try {
      await refreshTokenRepo.deleteByValue(token);

      return right(null);
    } catch (err) {
      return left(handlePrismaError()(err));
    }
  };
