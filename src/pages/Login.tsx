import React, {useEffect} from "react";
import {Button, Form, Input} from "antd";
import {userLoginService} from "../services/user.service";
import TokenUtil from "../utils/token.util";
import history from '../utils/history.util'

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const handleFinish = async (values: LoginForm) => {
    console.log(values);
    const result = await userLoginService();
    TokenUtil.set(result.token);
    history.replace('/');
  }
  useEffect(() => {
    TokenUtil.clear();
  }, []);
  return <Form initialValues={{username: '', password: ''}} onFinish={handleFinish}>
    <Form.Item label="用户名" name="username">
      <Input />
    </Form.Item>
    <Form.Item label="密码" name="password">
      <Input type="password" />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit">登录</Button>
    </Form.Item>
  </Form>
};
export default Login;
