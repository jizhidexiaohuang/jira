import { useCallback } from "react";
import { useLocation } from "react-router";
import { useProject } from "../../utils/project";
import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";
import { useDebounce } from "../../utils/index";
import { useTask } from "../../utils/task";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({
  projectId: useProjectIdInUrl(),
});

export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTaskSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();
  //加上这行就无法清除输入框
  const debounceName = useDebounce(param.name, 2000);

  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processId: Number(param.processId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  );
};

export const useTasksQueryKey = () => ["tasks", useTaskSearchParams()];

export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);

  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );

  const close = useCallback(
    () => setEditingTaskId({ editingTaskId: "" }),
    [setEditingTaskId]
  );

  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  };
};
