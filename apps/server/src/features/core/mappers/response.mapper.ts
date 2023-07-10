import { AppError, HttpStatusCode } from '../../../utils/errorFactory';
import * as TE from 'fp-ts/TaskEither';
import * as T from 'fp-ts/Task';
import { ErrorMapper } from './error.mapper';
import { pipe } from 'fp-ts/function';
import { ErrorResponse } from '@daria/shared';

export type ResponseMapper = <
  TLeft extends AppError,
  TRight,
  TBody,
  TStatus extends HttpStatusCode
>(
  statusCode: TStatus,
  mapper: (result: TRight) => TBody
) => (
  response: TE.TaskEither<TLeft, TRight>
) => T.Task<
  { status: TLeft['statusCode']; body: ErrorResponse } | { status: TStatus; body: TBody }
>;

export const responseMapper = ({
  errorMapper
}: {
  errorMapper: ErrorMapper;
}): ResponseMapper => {
  return (statusCode, mapper) => response =>
    pipe(
      response,
      TE.matchW(
        err => ({
          status: err.statusCode,
          body: errorMapper.toResponse(err)
        }),
        result => ({
          status: statusCode,
          body: mapper(result)
        })
      )
    );
};
