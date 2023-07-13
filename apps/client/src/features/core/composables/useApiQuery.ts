import type { DataResponse, ErrorResponse } from '@/utils/ts-rest';
import type { RequiredBy } from '@daria/shared';
import type {
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryReturnType,
  UseMutationOptions,
  UseMutationReturnType,
  UseQueryOptions,
  UseQueryReturnType
} from '@tanstack/vue-query';
import type { AppRoute } from '@ts-rest/core';

export type UseApiQueryOptions<
  TAppRoute extends AppRoute,
  TKey extends QueryKey
> = UseQueryOptions<
  DataResponse<TAppRoute>['body'],
  ErrorResponse<TAppRoute>['body'],
  DataResponse<TAppRoute>,
  TKey
>;

export const createUseApiQuery =
  <TAppRoute extends AppRoute>() =>
  <TKey extends QueryKey>(
    options: UseApiQueryOptions<TAppRoute, TKey>
  ): UseQueryReturnType<
    DataResponse<TAppRoute>['body'],
    ErrorResponse<TAppRoute>['body']
  > => {
    return useQuery(options);
  };

export type UseApiInfiniteQueryOptions<
  TAppRoute extends AppRoute,
  TKey extends QueryKey
> = UseInfiniteQueryOptions<
  DataResponse<TAppRoute>['body'],
  ErrorResponse<TAppRoute>['body'],
  DataResponse<TAppRoute>,
  TKey
>;

export const createUseApiInfiniteQuery =
  <TAppRoute extends AppRoute>() =>
  <TKey extends QueryKey>(
    options: UseApiInfiniteQueryOptions<TAppRoute, TKey>
  ): UseInfiniteQueryReturnType<
    DataResponse<TAppRoute>['body'],
    ErrorResponse<TAppRoute>['body']
  > => {
    return useInfiniteQuery(options);
  };

export type UseMutationFn<TAppRoute extends AppRoute> = (
  arg: any
) => Promise<DataResponse<TAppRoute>['body']>;

export type UseApiMutationOptions<
  TAppRoute extends AppRoute,
  TFunction extends UseMutationFn<AppRoute>
> = UseMutationOptions<
  DataResponse<TAppRoute>['body'],
  ErrorResponse<TAppRoute>['body'],
  Parameters<TFunction>[0],
  unknown
>;

export const createUseApiMutation =
  <TAppRoute extends AppRoute>() =>
  <TFunction extends UseMutationFn<AppRoute>>(
    options: RequiredBy<UseApiMutationOptions<TAppRoute, TFunction>, 'mutationFn'>
  ): UseMutationReturnType<
    DataResponse<TAppRoute>['body'],
    ErrorResponse<TAppRoute>['body'],
    Parameters<TFunction>[0],
    unknown
  > => {
    return useMutation(options);
  };
