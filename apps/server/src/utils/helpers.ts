import * as E from 'fp-ts/Either';
import { AppError } from './errorFactory';
import crypto from 'crypto';

export const execute = <T extends () => any>(fn: T): ReturnType<T> => fn();

export type UseCase<TInput, TResponse, TError extends AppError> = (
  dto: TInput
) => Promise<E.Either<TError, TResponse>>;

export const randomHash = () => crypto.randomBytes(10).toString('hex');

export const makeSuccess = () => ({
  success: true
});
