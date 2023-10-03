import { useTasks } from "../../utils/task";
import { Task } from "../../types/task";
import { Kanban } from "../../types/kanban";
import { useTaskSearchParams } from "./util";
import { useTaskTypes } from "../../utils/task-type";
import taskIcon from "../../assets/task.svg";
import bugIcon from "../../assets/bug.svg";
import styled from "@emotion/styled";
import { Card } from "antd";
import { CreateKanban } from "./create-kanban";
import { CreateTask } from "./create-task";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return <img width={"14px"} src={name === "task" ? taskIcon : bugIcon} />;
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter((i) => i.kanbanId === kanban.id);
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TaskContainer>
        {tasks?.map((task) => (
          <Card style={{ marginBottom: "0.5rem" }} key={task.id}>
            <div>{task?.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
      </TaskContainer>
      <CreateTask kanbanId={kanban.id}></CreateTask>
    </Container>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TaskContainer = styled.div`
  overflow: scroll;
  /* flex: 1; */
  ::webkit-scroll {
    display: none;
  }
`;
