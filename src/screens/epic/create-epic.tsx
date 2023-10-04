import React, { useEffect } from "react";
import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd";
import styled from "@emotion/styled";
import { ErrorBox } from "../../components/lib";
import { useAddEpics } from "../../utils/epic";
import { useEpicsQueryKey } from "./util";
import { useForm } from "antd/es/form/Form";
import { useProjectIdInUrl } from "../kanban/util";

export const CreateEpic = (
  props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) => {
  const { mutate: addEpic, isLoading, error } = useAddEpics();
  const [form] = useForm();
  const projectId = useProjectIdInUrl();

  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId: projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [props.visible, form]);

  return (
    <Drawer
      open={props.visible}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>创建任务组</h1>
            <ErrorBox error={error} />
            <Form
              style={{ width: "40rem" }}
              form={form}
              layout={"vertical"}
              onFinish={onFinish}
            >
              <Form.Item
                label={"任务名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入任务名" }]}
              >
                <Input placeholder="请输入任务名称"></Input>
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={isLoading}
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
