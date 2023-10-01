import { useState } from "react";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { Row } from "../src/components/lib";
import { ReactComponent as SoftwareLogo } from "./assets/software-logo.svg";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "./screens/project/index";

export const AuthenticatedApp = () => {
  return (
    <div>
      <Container>
        <PageHeader />
        <Main>
          <Router>
            <Routes>
              <Route path={"/projects"} element={<ProjectListScreen />}></Route>
              <Route
                path={"/projects/:projectId/*"}
                element={<ProjectScreen />}
              ></Route>
              <Route path={"/"} element={<Navigate to={"/projects"} />}></Route>
            </Routes>
          </Router>
        </Main>
      </Container>
    </div>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftwareLogo
          width={"18rem"}
          color={"rgb(38, 132, 255)"}
        ></SoftwareLogo>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <a onClick={logout}>登出</a>
              </Menu.Item>
            </Menu>
          }
        >
          <a onClick={(e) => e.preventDefault()}>Hi! {user?.name}</a>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

// temporal dead zone(暂时性死区)
const Container = styled.div`
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  height: 6rem;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;
