import React from "react";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import { Button, Dropdown, Menu } from "antd";
import styled from "@emotion/styled";
import { row } from "components/libs";
import {ReactComponent as SoftwareLogo} from "assets/software-logo.svg"

export const AuthenticatedApp = () => {

  const { logout,user } = useAuth();

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={'18rem'} color={'rgba(38,132,255)'}></SoftwareLogo>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          {/* <Button type={"primary"} onClick={() => logout()}>
            登出
          </Button> */}
          <Dropdown overlay={<Menu>
            <Menu.Item key={'logout'}>
              <a onClick={logout}>登出</a>
            </Menu.Item>
          </Menu>}>
            <a onClick={e=> e.preventDefault()}>
              Hi,{user?.name}
            </a>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(row)`
padding: 3.2rem;
box-shadow: 0 0 5px rgba(0,0,0,0.1);
z-index:1;
`;

const HeaderLeft = styled(row)``;

const HeaderRight = styled.div``;

const Main = styled.main``;
