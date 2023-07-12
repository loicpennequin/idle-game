import { asFunction } from 'awilix';
import { tokenService } from './token.service';
import { loginUsecase } from './usecases/login.usecase';
import { refreshTokenRepository } from './refreshToken.repository';
import { logoutUsecase } from './usecases/logout.usecase';

export const authProviders = {
  tokenService: asFunction(tokenService),
  refreshTokenRepo: asFunction(refreshTokenRepository),

  loginUseCase: asFunction(loginUsecase),
  logoutUseCase: asFunction(logoutUsecase)
};
