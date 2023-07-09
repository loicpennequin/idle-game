export const useGetAllTodos = () => {
  const container = useContainer();
  const apiClient = container.resolve('apiClient');

  return useQuery(['todo.getAll'], () => apiClient.todo.getAll());
};
