import type {
  UseApiMutationOptions,
  UseApiQueryOptions
} from '@/features/core/composables/useApiQuery';
import { queryKeys, type QueryKeys } from '@/features/core/queryKeys';
import type { Contract } from '@daria/shared';

export const useArenas = (
  options: UseApiQueryOptions<
    Contract['arena']['getAll'],
    QueryKeys['arena']['list']['queryKey']
  > = {}
) => {
  const { arenaApi } = useContainer();

  return createUseApiQuery<Contract['arena']['getAll']>()({
    ...options,
    ...queryKeys.arena.list,
    queryFn: arenaApi.getAll
  });
};
