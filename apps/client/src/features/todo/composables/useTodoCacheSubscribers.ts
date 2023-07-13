import { updateTodoListCache, updateTodoCache } from '../utils/cache';

export const useTodoCacheSubscribers = () => {
  const { todoApi, queryClient } = useContainer();

  const unsubscribe = todoApi.subscribe({
    onCreated: updateTodoListCache(queryClient),
    onUpdated: updateTodoCache(queryClient)
  });
  onBeforeUnmount(unsubscribe);
};
