import {IRoute} from "../pages/routes";
import {AccessCodeMap} from "../components/AuthRoute";
import React, {ReactElement} from "react";
import history from "./history.util";
import {hasAccessCodes} from "./auth.util";
import {Menu} from "antd";
import {HomeOutlined, UserOutlined} from "@ant-design/icons";

const {SubMenu, Item} = Menu;

const icons: { [key: string]: ReactElement } = {
  HomeOutlined: <HomeOutlined/>,
  UserOutlined: <UserOutlined/>
};
export const getMenu = (routes: IRoute[], accessCodeMap?: AccessCodeMap) => {
  const result: ReactElement[] = [];
  for (const route of routes) {
    if (route.children) {
      const children = getMenu(route.children, accessCodeMap);
      if (children.length > 0) {
        result.push(<SubMenu title={<>{icons[route.meta.icon]}<span>{route.meta.name}</span></>} key={route.path}>
          {children}
        </SubMenu>)
      }
    } else {
      if (hasAccessCodes(accessCodeMap, route.meta.accessCodes)) {
        result.push(<Item onClick={() => history.push(route.path)}
                          key={route.path}>{icons[route.meta.icon]}<span>{route.meta.name}</span></Item>)
      }
    }
  }
  return result;
};
export const parseModule = (pathname: string) => {
  const paths = pathname.split('/');
  if (paths.length < 3) {
    return [];
  }
  return ['/' + paths[1]];
};
