import type {
  UseApiMutationOptions,
  UseApiQueryOptions
} from '@/features/core/composables/useApiQuery';
import { queryKeys, type QueryKeys } from '@/features/core/queryKeys';
import type { Contract, TodoResponse } from '@daria/shared';
import type { TodoApi } from '../api/todo.api';

export const useTodos = (
  options: UseApiQueryOptions<
    Contract['todo']['getAll'],
    QueryKeys['todo']['list']['queryKey']
  > = {}
) => {
  const { todoApi } = useContainer();

  return createUseApiQuery<Contract['todo']['getAll']>()({
    ...options,
    ...queryKeys.todo.list,
    queryFn: todoApi.getAll
  });
};

export const useAddTodo = (
  options: UseApiMutationOptions<Contract['todo']['create'], TodoApi['create']> = {}
) => {
  const { todoApi } = useContainer();

  return createUseApiMutation<Contract['todo']['create']>()({
    ...options,
    mutationFn: todoApi.create
  });
};

export const useToggleTodo = () => {
  const { todoApi } = useContainer();

  return createUseApiMutation<Contract['todo']['updateCompleted']>()({
    mutationFn: (todo: TodoResponse) =>
      todoApi.updateCompleted({ id: todo.id, completed: !todo.completed })
  });
};
