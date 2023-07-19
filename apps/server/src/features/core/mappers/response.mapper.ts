import { AppError, HttpStatusCode } from '../../../utils/errorFactory';
import * as E from 'fp-ts/Either';
import { ErrorMapper } from './error.mapper';
import { ErrorResponse } from '@daria/shared';
import { pipe } from 'fp-ts/function';

export type ResponseMapper = <TRight, TBody, TStatus extends HttpStatusCode>(
  statusCode: TStatus,
  mapper: (result: TRight) => TBody
) => <TLeft extends AppError>(
  response: E.Either<TLeft, TRight>
) =>
  | { status: TLeft['statusCode']; body: ErrorResponse }
  | { status: TStatus; body: TBody };

export const responseMapper = ({
  errorMapper
}: {
  errorMapper: ErrorMapper;
}): ResponseMapper => {
  return (statusCode, mapper) => response =>
    pipe(
      response,
      E.matchW(
        err => {
          console.log(err);
          return {
            status: err.statusCode,
            body: errorMapper.toResponse(err)
          };
        },
        result => ({
          status: statusCode,
          body: mapper(result)
        })
      )
    );
};
