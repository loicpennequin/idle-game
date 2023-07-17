import { Prisma } from '@prisma/client';
import { PrismaError } from 'prisma-error-enum';
import { errorFactory } from './errorFactory';
import { isDefined } from '@daria/shared';
import { matchSwitch } from '@babakness/exhaustive-type-checking';

export const prismaNotFoundMatchers = {
  [PrismaError.RecordsNotFound]: () => (err: any) => errorFactory.notFound(err),
  [PrismaError.RelatedRecordNotFound]: () => (err: any) => errorFactory.notFound(err)
};

export const prismaNotUniqueMatchers = {
  [PrismaError.UniqueConstraintViolation]: () => {
    return errorFactory.badRequest;
  }
};

export const handlePrismaError = <
  TValue extends () => (err: any) => any,
  TKey extends string
>(
  matchers?: Record<TKey, TValue>
) => {
  return (err: unknown) => {
    if (!(err instanceof Prisma.PrismaClientKnownRequestError)) {
      return errorFactory.unexpected({ cause: err instanceof Error ? err : undefined });
    }

    const match = matchSwitch<ReturnType<TValue>, string>(
      err.code,
      (matchers as any) ?? {}
    );
    if (!isDefined(match)) return errorFactory.unexpected();

    return match({ cause: err });
  };
};
