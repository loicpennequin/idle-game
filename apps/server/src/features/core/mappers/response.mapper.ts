import { AppError, HttpStatusCode } from '../../../utils/errorFactory';
import * as TE from 'fp-ts/TaskEither';
import { ErrorMapper } from './error.mapper';
import { pipe } from 'fp-ts/function';

export const responseMapper = ({ errorMapper }: { errorMapper: ErrorMapper }) => {
  /**
   * @deprecated the type inference for this function is broken @FIXME
   */
  return <TStatus extends HttpStatusCode, TRight, TBody>(
      statusCode: TStatus,
      mapper: (result: TRight) => TBody
    ) =>
    (response: TE.TaskEither<AppError, TRight>) =>
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
