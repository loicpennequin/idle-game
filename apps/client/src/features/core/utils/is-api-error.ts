import { type AnyObject, curry } from '@daria/shared';
import type { HTTPStatusCode, ErrorHttpStatusCode } from '@ts-rest/core';

export const isApiError = <T extends { status: HTTPStatusCode }>(
  response: T
): response is T & { status: ErrorHttpStatusCode } => {
  return response.status < 200 || response.status > 207;
};

type GenericApiFunction = (
  ...args: any[]
) => Promise<{ status: HTTPStatusCode; body: AnyObject }>;

export const apiHandler = <TFn extends GenericApiFunction>(
  fn: TFn,
  ...args: Parameters<TFn>
): Promise<
  Exclude<Awaited<ReturnType<TFn>>, { status: ErrorHttpStatusCode }>['body']
> => {
  return fn(...args).then(response => {
    if (isApiError(response)) throw new Error(response.body.kind);

    return response.body;
  });
};
