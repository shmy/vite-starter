import React, {useEffect, useRef} from "react";
import {Button, Form, Input} from "antd";
import {userLoginService} from "../../services/user.service";
import TokenUtil from "../../utils/token.util";
import history from '../../utils/history.util'
import styles from './index.module.scss';
import landingImage from '../../assets/images/login-landing.png';

interface LoginForm {
  username: string;
  password: string;
}

const Index: React.FC = () => {
  const inputRef = useRef<Input | null>(null);
  const handleFinish = async (values: LoginForm) => {
    console.log(values);
    const [err, data] = await userLoginService();
    if (err) {
      return err.showAlert();
    }
    TokenUtil.set(data.token);
    history.replace('/');
  }
  useEffect(() => {
    TokenUtil.clear();
    inputRef.current?.focus();
  }, []);
  return <div className={styles.login} data-flex="dir:top main:center cross:center">
    <div className={styles.loginWrap} data-flex="dir:left">
      <div data-flex-box={1} data-flex="dir:left main:center cross:center">
        <img src={landingImage} alt=""/>
      </div>
      <div data-flex-box={1} data-flex="dir:left main:center cross:center">
        <Form className={styles.form} initialValues={{username: '', password: ''}} onFinish={handleFinish}>
          <Form.Item label="用户名" name="username">
            <Input ref={inputRef} placeholder="请输入用户名"/>
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input placeholder="请输入密码" type="password"/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" block htmlType="submit">登录</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  </div>
};
export default Index;
