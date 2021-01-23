import React, {useEffect, useMemo, useRef, useState} from "react";
import {Menu} from "antd";
import history from '../utils/history.util'
import {useUserContext} from "../contexts/UserContext";
import routes from "../pages/routes";
import {getMenu, parseModule} from "../utils/menu.util";


const SideMenu: React.FC = () => {
  const unregisterCallback = useRef<() => void>();
  const [selectedKey, setSelectedKey] = useState('');
  const [state] = useUserContext()!;
  const defaultOpenKeys = useMemo(() => {
    return parseModule(history.location.pathname);
  }, [history.location.pathname]);
  const decidedMenus = useMemo(() => {
    return getMenu(routes, state.accessCodeMap);
  }, [state]);
  useEffect(() => {
    setSelectedKey(history.location.pathname);
    unregisterCallback.current = history.listen(({pathname}) => {
      setSelectedKey(pathname);
    });
    return () => {
      unregisterCallback.current && unregisterCallback.current();
    };
  }, []);
  return <Menu theme="dark" mode="inline"
               defaultOpenKeys={defaultOpenKeys}
               selectedKeys={[selectedKey]}>
    {decidedMenus}
  </Menu>;
};
export default SideMenu;
