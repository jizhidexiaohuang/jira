import { ReactNode } from "react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { http } from "../utils/http";
import fakeData from "./fake.json";
import { render, screen, waitFor } from "@testing-library/react";
import { AppProviders } from "../context/index";
import { ProjectListScreen } from "../screens/project-list/index";

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer(
  rest.get(`${apiUrl}/me`, (req, res, ctx) => {
    res(
      ctx.json({
        id: 1,
        name: "jack",
        token: "123",
      })
    );
  }),
  rest.get(`${apiUrl}/uses`, (req, res, ctx) => {
    res(ctx.json(fakeData.users));
  }),
  rest.get(`${apiUrl}/projects`, (req, res, ctx) => {
    const { name = "", personId = undefined } = Object.fromEntries(
      req.url.searchParams
    );
    const result = fakeData.projects.filter((project) => {
      return project.name.includes(name) && personId
        ? project.personId === +personId
        : true;
    });

    res(ctx.json(result));
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const waitTable = () =>
  waitFor(() => expect(screen.getByText("管理系统")).toBeInTheDocument());

test("项目列表展示正常", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects" });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(fakeData.projects.length + 1);
});

test("搜索项目", async () => {
  renderScreen(<ProjectListScreen />, { route: "projects?name=骑手" });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(2);
  expect(screen.getByText("骑手管理")).toBeInTheDocument();
});

const renderScreen = (ui: ReactNode, { route = "/projects" } = {}) => {
  window.history.pushState({}, "Test Page", route);
  return render(<AppProviders>{ui}</AppProviders>);
};
