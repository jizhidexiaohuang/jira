import { Drawer } from "antd";
import React from "react";
import { useProjectModal } from "./util";
export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer visible={projectModalOpen} width={"100%"} onClose={close}>
      <h1>抽屉</h1>
    </Drawer>
  );
};
