import { useState } from "react";
import { useProjectIdInUrl } from "./util";
import { useAddKanbans } from "../../utils/kanban";
import { Container } from "./kanban-column";
import { Input } from "antd";
import { Kanban } from "../../types/kanban";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addKanban } = useAddKanbans();

  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };

  return (
    <Container>
      <Input
        size={"large"}
        placeholder={"新建看板名称"}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};
