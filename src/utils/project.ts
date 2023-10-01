import React, { useCallback } from "react";
import { Project } from "../screens/project-list/list";
import { useAsync } from "./use-async";
import { useEffect } from "react";
import { useHttp } from "./http";
import { cleanObject } from "./index";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<Project[]>();

  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects });
  }, [param, run, fetchProjects]);

  return result;
};

export const useEditProject = () => {
  const client = useHttp();
  const { run, ...asyncResult } = useAsync();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const client = useHttp();
  const { run, ...asyncResult } = useAsync();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`/projects/${params.id}`, {
        method: "POST",
        data: params,
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
