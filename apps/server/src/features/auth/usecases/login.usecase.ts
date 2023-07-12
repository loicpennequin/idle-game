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
import { AccessToken, RefreshToken, TokenService } from '../token.service';
import { RefreshTokenRepository } from '../refreshToken.repository';

export type LoginInput = ServerInferRequest<typeof authContract.login>['body'];
export type LoginUseCaseError = UnexpectedError | UnauthorizedError;

export type LoginUseCase = UseCase<
  LoginInput,
  { accessToken: AccessToken; refreshToken: RefreshToken },
  LoginUseCaseError
>;

type Dependencies = {
  userRepo: UserRepository;
  tokenService: TokenService;
  refreshTokenRepo: RefreshTokenRepository;
};

export const loginUsecase =
  ({ userRepo, tokenService, refreshTokenRepo }: Dependencies): LoginUseCase =>
  async input => {
    const user = await userRepo.findByEmail(input.email);

    if (isLeft(user)) return left(errorFactory.unauthorized());

    const isPasswordValid = await compare(input.password, user.right.passwordHash);
    if (!isPasswordValid) return left(errorFactory.unauthorized());

    const refreshToken = await refreshTokenRepo.upsertByUserId(user.right.id);
    if (isLeft(refreshToken)) return left(errorFactory.unexpected());

    return right({
      accessToken: tokenService.generateAccessToken(user.right.id),
      refreshToken: refreshToken.right.value
    });
  };
