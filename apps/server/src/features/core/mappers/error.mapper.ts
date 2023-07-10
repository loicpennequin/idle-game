import { ErrorResponse } from '@daria/shared';
import { AppError } from '../../../utils/errorFactory';

export type ErrorMapper = {
  toResponse(err: AppError): ErrorResponse;
};
export const errorMapper = (): ErrorMapper => {
  return {
    toResponse(err) {
      return {
        kind: err.kind,
        message: err.message,
        cause: err.cause?.message
      };
    }
  };
};
