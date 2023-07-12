import jwt from 'jsonwebtoken';
import { Config } from '../../config';
import { UUID } from '@daria/shared';
import { randomHash } from '../../utils/helpers';
import { UnauthorizedError, errorFactory } from '../../utils/errorFactory';
import { left, right, Either } from 'fp-ts/Either';

type Dependencies = { config: Config };

export type AccessToken = string;
export type RefreshToken = string;

export type TokenService = {
  generateAccessToken(userId: UUID): AccessToken;
  generateRefreshToken(): RefreshToken;
  verifyAccessToken(token: AccessToken): Either<UnauthorizedError, jwt.JwtPayload>;
  verifyRefreshToken(token: RefreshToken): Either<UnauthorizedError, jwt.JwtPayload>;
};

export const tokenService = ({ config }: Dependencies): TokenService => {
  const verifyToken = (token: string, secret: string) => {
    try {
      return right(
        jwt.verify(token, secret, {
          complete: false
        }) as jwt.JwtPayload
      );
    } catch {
      return left(errorFactory.unauthorized());
    }
  };

  return {
    generateAccessToken(userId: UUID) {
      return jwt.sign({ sub: userId }, config.JWT.SECRET, {
        expiresIn: config.JWT.EXPIRES_IN_SECONDS
      });
    },
    generateRefreshToken() {
      return jwt.sign({ sub: randomHash() }, config.REFRESH_TOKEN.SECRET, {
        expiresIn: config.REFRESH_TOKEN.EXPIRES_IN_SECONDS
      });
    },
    verifyAccessToken(token) {
      return verifyToken(token, config.JWT.SECRET);
    },
    verifyRefreshToken(token) {
      return verifyToken(token, config.REFRESH_TOKEN.SECRET);
    }
  };
};
