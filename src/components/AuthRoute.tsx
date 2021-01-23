import React, {ReactNode} from "react";
import {Route} from "react-router-dom";
import {hasAccessCodes} from "../utils/auth.util";
import Forbidden from "../pages/Forbidden";
import {RouteComponentProps} from "react-router";
export type AccessCodeMap = {[key: string]: boolean};
interface Props {
  exact?: boolean;
  path: string;
  component: React.ComponentType<RouteComponentProps<ReactNode>> | React.ComponentType<ReactNode>;
  accessCodeMap?: AccessCodeMap;
  requiredAccessCodeList?: string[];
}

const AuthRoute: React.FC<Props> = (props) => {
  return <Route exact={props.exact} path={props.path} render={(rcp) => {
    if (!hasAccessCodes(props.accessCodeMap, props.requiredAccessCodeList)) {
      return <Forbidden/>;
    }
    return <props.component {...rcp}/>;
  }}/>
};

export default AuthRoute;
