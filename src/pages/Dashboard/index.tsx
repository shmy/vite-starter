import React, {lazy, ReactNode, Suspense, useEffect, useMemo, useReducer, useState} from "react";
import {Avatar, Layout} from "antd";
import {Redirect, Route, Switch} from "react-router-dom";
import NotFound from "../NotFound";
import SideMenu from "../../components/SideMenu";
import {UserActionType, UserContext, userReducer} from "../../contexts/UserContext";
import TokenUtil from "../../utils/token.util";
import {getInitializeUserService} from "../../services/user.service";
import history from '../../utils/history.util'
import styles from "./index.module.scss";
import clsx from "clsx";
import routes, {mapRoutes} from "../routes";
import Header from "../../components/Header/Header";


const DashboardSkeleton: React.FC = () => {
  return <Layout style={{height: '100vh'}}>
    <Layout.Header className={clsx(styles.skeleton, styles.animated)}/>
    <Layout>
      <Layout.Sider className={styles.skeleton}/>
      <Layout.Content className={clsx(styles.skeleton, styles.content)}/>
    </Layout>
  </Layout>
};

const Index: React.FC = () => {
  const [checking, setChecking] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [state, dispatch] = useReducer(userReducer, {username: ''});
  const decidedRoutes = useMemo(() => {
    return mapRoutes(routes, state.accessCodeMap)
  }, [state]);
  const handleInitial = async () => {
    const [err, data] = await getInitializeUserService();
    if (err) {
      history.replace('/login');
      return;
    }
    dispatch({type: UserActionType.UPDATE, payload: data});
    setChecking(false);
  };
  useEffect(() => {
    if (!TokenUtil.has()) {
      history.replace('/login');
      return;
    }
    handleInitial();
  }, []);
  if (checking) {
    return <DashboardSkeleton/>;
  }
  return <UserContext.Provider value={[state, dispatch]}>
    <Layout style={{height: '100vh'}}>
      <Header/>
      <Layout>
        <Layout.Sider collapsible collapsed={collapsed} onCollapse={collapsed => setCollapsed(collapsed)}
                      className={styles.sideMenu}>
          <SideMenu/>
        </Layout.Sider>
        <Layout.Content className={styles.routerOutlet}>
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              {/*{decidedRoutes.length > 0 ? <Redirect exact path="/" to={decidedRoutes[0]![0]!.path}/> : null}*/}
              {decidedRoutes}
              <Route path="*" component={NotFound}/>
            </Switch>
          </Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  </UserContext.Provider>
};
export default Index;
