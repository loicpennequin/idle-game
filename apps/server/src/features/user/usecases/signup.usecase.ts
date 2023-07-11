import { userContract } from '@daria/shared';
import { ServerInferRequest } from '@ts-rest/core';
import * as TE from 'fp-ts/TaskEither';
import * as T from 'fp-ts/Task';
import {
  BadRequestError,
  UnexpectedError,
  errorFactory
} from '../../../utils/errorFactory';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';
import { flow, identity, pipe } from 'fp-ts/lib/function';
import { hash } from 'bcrypt';
import { task } from 'fp-ts';

export type SignupInput = ServerInferRequest<typeof userContract.signup>['body'];
export type SignupUseCaseError = UnexpectedError | BadRequestError;

export type SignupUseCase = (dto: SignupInput) => TE.TaskEither<SignupUseCaseError, User>;

type Dependencies = { userRepo: UserRepository };

export const signupUseCase =
  ({ userRepo }: Dependencies): SignupUseCase =>
  input => {
    return pipe(
      input,
      TE.tryCatchK(
        async input => ({
          email: input.email,
          passwordHash: await hash(input.password, 10)
        }),
        () => errorFactory.unexpected()
      ),
      TE.chain(userRepo.create)
    );
  };
