import { useLocation } from "react-router";
import { useProject } from "../../utils/project";
import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";

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
