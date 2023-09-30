import { useState } from "react";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import { Button } from "antd";
import styled from "@emotion/styled";
import { Row } from "../src/components/lib";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <Container>
        <Header between={true}>
          <HeaderLeft gap={true}>
            <h3>logo</h3>
            <h3>项目</h3>
            <h3>用户</h3>
          </HeaderLeft>
          <HeaderRight>
            <Button type={"primary"} onClick={logout}>
              登出
            </Button>
          </HeaderRight>
        </Header>
        <Main>
          <ProjectListScreen />
        </Main>
      </Container>
    </div>
  );
};

// temporal dead zone(暂时性死区)
const Container = styled.div`
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  height: 6rem;
`;
const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;
