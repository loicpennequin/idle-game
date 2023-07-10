import {
  AsyncReturnType,
  Either,
  ErrorResponse,
  InferLeft,
  InferRight,
  identity
} from '@daria/shared';
import { AppError, HttpStatusCode, errorFactory } from './errorFactory';

export const wrapUseCase = <
  THandler extends (...args: any[]) => Promise<Either<AppError, any>>,
  TReturn extends Either<
    InferLeft<AsyncReturnType<THandler>>,
    InferRight<AsyncReturnType<THandler>>
  >
>(
  fn: THandler
) => {
  return async (...args: Parameters<THandler>): Promise<TReturn> => {
    try {
      return (await fn(...args)) as TReturn;
    } catch (err) {
      if (err instanceof Error) {
        return Either.left(errorFactory.unexpected({ message: err.message })) as TReturn;
      }
      return Either.left(errorFactory.unexpected()) as TReturn;
    }
  };
};

export const toResponse = <
  TEither extends Either<AppError, any>,
  TStatus extends HttpStatusCode,
  TSuccessMapper extends (value: InferRight<TEither>) => any
>(
  result: TEither,
  successCode: TStatus,
  mapSuccess: TSuccessMapper,
  mapError: (error: InferLeft<TEither>) => ErrorResponse
) => {
  return result.fold<
    | {
        status: InferLeft<TEither>['statusCode'];
        body: ErrorResponse;
      }
    | {
        status: TStatus;
        body: ReturnType<TSuccessMapper>;
      }
  >(
    error => ({
      status: error.statusCode,
      body: mapError(error as InferLeft<TEither>)
    }),
    value => ({
      status: successCode,
      body: mapSuccess(value as InferRight<TEither>)
    })
  );
};
