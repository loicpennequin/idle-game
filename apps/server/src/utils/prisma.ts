import { Prisma } from '@prisma/client';
import { PrismaError } from 'prisma-error-enum';
import { errorFactory } from './errorFactory';

export const handlePrismaNotFound = (err: unknown) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (
      err.code === PrismaError.RecordsNotFound ||
      err.code === PrismaError.RelatedRecordNotFound
    ) {
      return errorFactory.notFound();
    }
  }
  return err;
};

export const handlePrismaUnexpected = (err: unknown) => {
  return errorFactory.unexpected({
    cause: err instanceof Error ? err : new Error('Unknown error')
  });
};
