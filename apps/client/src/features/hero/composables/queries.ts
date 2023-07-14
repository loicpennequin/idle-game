import type {
  UseApiMutationOptions,
  UseApiQueryOptions
} from '@/features/core/composables/useApiQuery';
import { queryKeys, type QueryKeys } from '@/features/core/queryKeys';
import type { Contract } from '@daria/shared';

export const useHeros = (
  options: UseApiQueryOptions<
    Contract['hero']['getAll'],
    QueryKeys['hero']['list']['queryKey']
  > = {}
) => {
  const { heroApi } = useContainer();

  return createUseApiQuery<Contract['hero']['getAll']>()({
    ...options,
    ...queryKeys.hero.list,
    queryFn: heroApi.getAll
  });
};
