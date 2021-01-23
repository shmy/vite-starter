import React from "react";
import styles from "./Header.module.scss";
import {Layout, Avatar, Dropdown, Menu} from "antd";
import { useHistory } from "react-router-dom";
import {PoweroffOutlined} from '@ant-design/icons';
import LogoImage from '../../assets/images/logo.png';

const Header: React.FC = () => {
  const history = useHistory();
  return <Layout.Header className={styles.header} data-flex="dir:left cross:center">
    <img src={LogoImage} className={styles.logo}></img>
    <div data-flex-box="1"></div>
    <Dropdown overlay={<Menu>
      <Menu.Item onClick={() => history.replace('/login')}>
        <PoweroffOutlined />退出登录
      </Menu.Item>
    </Menu>}>
      <Avatar>郑爽</Avatar>
    </Dropdown>
  </Layout.Header>;
};

export default Header;
