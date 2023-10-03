import { useTaskSearchParams } from "./util";
import { useUrlQueryParam } from "../../utils/url";
import { Row } from "../../components/lib";
import { Button, Input } from "antd";
import { UserSelect } from "../../components/user-select";
import { TaskTypeSelect } from "../../components/task-type-select";

export const SearchPanel = () => {
  const searchParams = useTaskSearchParams();
  const [, setSearchParam] = useUrlQueryParam([]);

  const reset = () => {
    setSearchParam({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return (
    <Row marginBottom={4} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder="任务名"
        value={searchParams.name}
        onChange={(evt) => setSearchParam({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName={"经办人"}
        value={searchParams.processId}
        onChange={(value) => setSearchParam({ name: value })}
      />
      <TaskTypeSelect
        defaultOptionName={"类型"}
        value={searchParams.typeId}
        onChange={(value) => setSearchParam({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  );
};
