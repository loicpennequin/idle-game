import jwt from 'jsonwebtoken';
import { Config } from '../../config';
import { UUID } from '@daria/shared';
import { randomHash } from '../../utils/helpers';
import { errorFactory } from '../../utils/errorFactory';

type Dependencies = { config: Config };

export type AccessToken = string;
export type RefreshToken = string;

export type TokenService = {
  generateAccessToken(userId: UUID): AccessToken;
  generateRefreshToken(): RefreshToken;
  verifyAccessToken(token: AccessToken): jwt.JwtPayload;
  verifyRefreshToken(token: RefreshToken): string;
};

export const tokenService = ({ config }: Dependencies): TokenService => {
  const verifyToken = (token: string, secret: string) => {
    try {
      return jwt.verify(token, secret, {
        complete: false
      });
    } catch {
      throw errorFactory.unauthorized();
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
      return verifyToken(token, config.JWT.SECRET) as jwt.JwtPayload;
    },
    verifyRefreshToken(token) {
      return verifyToken(token, config.REFRESH_TOKEN.SECRET) as string;
    }
  };
};
