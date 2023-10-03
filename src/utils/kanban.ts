import { useHttp } from "./http";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Kanban } from "../types/kanban";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};

export const useAddKanbans = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("kanbans"),
    }
  );
};

export const useDeleteKanban = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: { id: Number }) =>
      client(`kanbans/${id}`, {
        method: "DELETE",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("kanbans"),
    }
  );
};
