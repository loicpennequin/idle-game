import type { UseApiQueryOptions } from '@/features/core/composables/useApiQuery';
import { queryKeys, type QueryKeys } from '@/features/core/queryKeys';
import { contract, type Contract, type UUID } from '@daria/shared';
import type { ArenaApi } from '../api/arena.api';

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

export const useArenaDetails = (
  arenaId: Ref<UUID>,
  options: UseApiQueryOptions<
    Contract['arena']['getById'],
    QueryKeys['arena']['detail']['queryKey']
  > = {}
) => {
  const { arenaApi } = useContainer();

  return createUseApiQuery<Contract['arena']['getById']>()({
    ...options,
    ...queryKeys.arena.detail(arenaId),
    queryFn: () => arenaApi.getDetails(arenaId.value)
  });
};

export const useJoinArena = () => {
  const { arenaApi } = useContainer();

  return createUseApiMutation(contract.arena.join, arenaApi.join)();
};

export const useLeaveArena = () => {
  const { arenaApi } = useContainer();

  return createUseApiMutation(contract.arena.leave, arenaApi.leave)();
};
