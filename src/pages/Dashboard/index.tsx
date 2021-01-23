import React, {lazy, ReactNode, Suspense, useEffect, useMemo, useReducer, useState} from "react";
import {Layout} from "antd";
import {Redirect, Route, Switch} from "react-router-dom";
import NotFound from "../NotFound";
import SideMenu from "../../components/SideMenu";
import {UserActionType, UserContext, userReducer} from "../../contexts/UserContext";
import TokenUtil from "../../utils/token.util";
import {getInitializeUserService} from "../../services/user.service";
import history from '../../utils/history.util'
import styles from "./index.module.scss";
import clsx from "clsx";
import routes, {IRoute, mapRoutes} from "../routes";
import AuthRoute, {AccessCodeMap} from "../../components/AuthRoute";

const {Header, Sider, Content} = Layout;

const DashboardSkeleton: React.FC = () => {
  return <Layout style={{height: '100vh'}}>
    <Header className={clsx(styles.skeleton, styles.animated)}/>
    <Layout>
      <Sider className={styles.skeleton}/>
      <Content className={clsx(styles.skeleton, styles.content)}/>
    </Layout>
  </Layout>
};

const Index: React.FC = () => {
  const [checking, setChecking] = useState(false);
  const [state, dispatch] = useReducer(userReducer, {username: ''});
  const decidedRoutes = useMemo(() => {
    return mapRoutes(routes, state.accessCodeMap)
  }, [state]);
  useEffect(() => {
    if (!TokenUtil.has()) {
      history.replace('/login');
      setChecking(true);
      return;
    }
    getInitializeUserService()
      .then((data) => {
        // 权限，用户信息可在此注入
        dispatch({type: UserActionType.UPDATE, payload: data});
      })
      .catch(() => {
        history.replace('/login');
      })
      .finally(() => {
        setChecking(true);
      })
  }, []);
  if (!checking) {
    return <DashboardSkeleton/>;
  }
  return <UserContext.Provider value={[state, dispatch]}>
    <Layout style={{height: '100vh'}}>
      <Header/>
      <Layout>
        <Sider className={styles.sideMenu}>
          <SideMenu/>
        </Sider>
        <Content className={styles.routerOutlet}>
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              {/*{decidedRoutes.length > 0 ? <Redirect exact path="/" to={decidedRoutes[0]![0]!.path}/> : null}*/}
              {decidedRoutes}
              <Route path="*" component={NotFound}/>
            </Switch>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  </UserContext.Provider>
};
export default Index;