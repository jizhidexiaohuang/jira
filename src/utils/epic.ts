import { useHttp } from "./http";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Epic } from "../types/epic";

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();

  return useQuery<Epic[]>(["epics", param], () =>
    client("epics", { data: param })
  );
};

export const useAddEpics = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("epics"),
    }
  );
};

export const useDeleteEpic = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: { id: Number }) =>
      client(`epics/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("epics"),
    }
  );
};
