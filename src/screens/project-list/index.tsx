import React from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useState, useEffect } from "react";
import * as qs from "qs";
import {
  cleanObject,
  useDebounce,
  useDocumentTitle,
  useMount,
} from "../../utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useAsync } from "../../utils/use-async";
import { Project } from "./list";
import { useProject } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useUrlQueryParam } from "../../utils/url";
import { useProjectModal, useProjectSearchParam } from "./util";
import { ButtonNoPadding, Row } from "../../components/lib";

const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const { open } = useProjectModal();
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectSearchParam();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProject(useDebounce(param, 200));
  const { data: users } = useUsers();
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
