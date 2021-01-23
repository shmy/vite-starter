import React, {ComponentType, lazy, ReactNode} from "react";
import AuthRoute, {AccessCodeMap} from "../components/AuthRoute";
import {Redirect} from "react-router-dom";

export enum AccessCodeEnum {
  DASHBOARD_LOOKUP = 'DASHBOARD_LOOKUP',
  DASHBOARD_LOGOUT = 'DASHBOARD_LOGOUT',
  POST_LOOKUP = 'POST_LOOKUP',
  APPLICATION_LOOKUP = 'APPLICATION_LOOKUP',
  PEOPLE_LOOKUP = 'PEOPLE_LOOKUP',
}

export interface IRoute {
  path: string;
  component?: () => Promise<{ default: ComponentType<any>; }>;
  meta: {
    name: string;
    icon: string;
    accessCodes?: string[];
  },
  children?: IRoute[]
}

const routes: IRoute[] = [
  {
    path: '/dashboard',
    meta: {
      name: '控制台',
      icon: 'HomeOutlined',
    },
    children: [
      {
        path: '/dashboard/index',
        component: () => import('./frames/Home'),
        meta: {
          name: '首页',
          icon: 'HomeOutlined',
          accessCodes: [AccessCodeEnum.DASHBOARD_LOOKUP]
        }
      },
      {
        path: '/dashboard/welcome',
        component: () => import('./frames/Home'),
        meta: {
          name: '欢迎页',
          icon: 'HomeOutlined'
        }
      },
      {
        path: '/dashboard/logout',
        component: () => import('./frames/Home'),
        meta: {
          name: '登出',
          icon: 'HomeOutlined',
          accessCodes: [AccessCodeEnum.DASHBOARD_LOGOUT]
        }
      }
    ]
  },
  {
    path: '/post',
    component: () => import('./frames/Home'),
    meta: {
      name: 'POST管理',
      icon: 'HomeOutlined',
      accessCodes: [AccessCodeEnum.POST_LOOKUP]
    }
  },
  {
    path: '/application',
    component: () => import('./frames/Home'),
    meta: {
      name: '应用管理',
      icon: 'HomeOutlined',
      accessCodes: [AccessCodeEnum.APPLICATION_LOOKUP]
    }
  },
  {
    path: '/people',
    component: () => import('./frames/Home'),
    meta: {
      name: '人员管理',
      icon: 'HomeOutlined',
      accessCodes: [AccessCodeEnum.PEOPLE_LOOKUP]
    }
  },
];
export default routes;
export const mapRoutes = (routes: IRoute[], accessCodeMap?: AccessCodeMap) => {
  return routes.map(route => {
    const ret: ReactNode[] = []
    if (route.component) {
      ret.push(<AuthRoute key={route.path}
      exact
      path={route.path}
      component={lazy(route.component)}
      accessCodeMap={accessCodeMap}
      requiredAccessCodeList={route?.meta?.accessCodes}
      />);
    }

    if (route.children) {
      if (!route.component && route.children.length > 0) {
        ret.push(<Redirect key={route.path} exact path={route.path} to={route.children[0].path}/>);
      }
      ret.push(...mapRoutes(route.children, accessCodeMap))
    }
    return ret;
  });
}
