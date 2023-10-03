import { useQuery } from "react-query";
import { useHttp } from "./http";
import { Task } from "../types/task";
import { TaskType } from "../types/task-type";

export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
