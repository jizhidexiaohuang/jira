import { Link, Router, Navigate } from "react-router-dom";
import { Route, Routes } from "react-router";
import { KanbanScreen } from "../kanban/index";
import { EpicScreen } from "../epic/index";

export const ProjectScreen = () => {
  return (
    <div>
      <h1>projectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>

      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen />}></Route>
        <Route path={"/epic"} element={<EpicScreen />}></Route>
        <Route
          element={<Navigate to={window.location.pathname + "/kanban"} />}
        ></Route>
      </Routes>
    </div>
  );
};
