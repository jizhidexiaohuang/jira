import { useQuery, useQueryClient, useMutation } from "react-query";
import { useHttp } from "./http";
import { Task } from "../types/task";

export const useTasks = (param?: Partial<Task> | undefined) => {
  const client = useHttp();

  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};

export const useAddTasks = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("tasks"),
    }
  );
};

export const useEditTask = () => {
  const client = useHttp();

  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("tasks"),
    }
  );
};

export const useDeleteTask = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: { id: Number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("tasks"),
    }
  );
};

export const useTask = (id?: number) => {
  const client = useHttp();

  return useQuery<Task>(["task", { id }], () => client(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};
