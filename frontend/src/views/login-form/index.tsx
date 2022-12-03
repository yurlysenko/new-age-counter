import { AuthContext } from "../../context/auth";
import { useContext } from "react";
import { Button, Form, Input, message, Space } from "antd";
import type { ILoginDto } from "../../context/auth/types";

import styles from "./styles.module.scss";

export const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async (values: ILoginDto) => {
    try {
      await login(values);
    } catch (e) {
      messageApi.error("Authentication failed");
    }
  };

  return (
    <section className={styles.formWrapper}>
      {contextHolder}
      <Form
        className={styles.form}
        name={"basic"}
        labelCol={{ span: 5 }}
        onFinish={handleLogin}
        autoComplete="off"
      >
        <Form.Item<ILoginDto>
          label="Username"
          name="username"
          labelAlign={"left"}
          tooltip={'Users: ["admin", "member"]'}
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ILoginDto>
          label="Password"
          name="password"
          labelAlign={"left"}
          tooltip={'All passwords are "securepass"'}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <center>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="default" htmlType="reset">
                Clear
              </Button>
            </Space>
          </center>
        </Form.Item>
      </Form>
    </section>
  );
};
