import { Drawer, Form, Spin, Input, Button } from "antd";
import React, { useEffect } from "react";
import { useProjectModal } from "./util";
import { UserSelect } from "../../components/user-select";
import { useEditProject, useAddProject } from "../../utils/project";
import { useForm } from "antd/es/form/Form";
import { ErrorBox } from "../../components/lib";
import styled from "@emotion/styled";
export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject;

  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };
  const title = editingProject ? "编辑项目" : "创建项目";

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);
  return (
    <Drawer
      forceRender={true}
      open={projectModalOpen}
      title={title}
      width={"100%"}
      closable={true}
      onClose={closeModal}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <ErrorBox error={error} />
            <Form
              style={{ width: "40rem" }}
              form={form}
              layout={"vertical"}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入人项目名" }]}
              >
                <Input placeholder="请输入项目名称"></Input>
              </Form.Item>
              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门" }]}
              >
                <Input placeholder="请输入部门"></Input>
              </Form.Item>

              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};
const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
