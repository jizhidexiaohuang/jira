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
