import type {
  UseApiMutationOptions,
  UseApiQueryOptions
} from '@/features/core/composables/useApiQuery';
import { queryKeys, type QueryKeys } from '@/features/core/queryKeys';
import type { Contract, Nullable, UUID } from '@daria/shared';

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

export const useUserHeroes = (
  userId: Ref<Nullable<UUID>>,
  options: UseApiQueryOptions<
    Contract['user']['userHeroes'],
    QueryKeys['hero']['byUser']['queryKey']
  > = {}
) => {
  const { heroApi } = useContainer();

  return createUseApiQuery<Contract['user']['userHeroes']>()({
    ...options,
    ...queryKeys.hero.byUser(userId),
    queryFn: () => heroApi.getByOwnerId(userId.value!),
    enabled: computed(() => isDefined(userId.value))
  });
};
