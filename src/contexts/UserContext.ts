import {
  createContext,
  Dispatch,
   useContext
} from "react";
import {AccessCodeMap} from "../components/AuthRoute";

export enum UserActionType {
  UPDATE = 'UPDATE'
}

export interface UserInfo {
  username?: string;
  accessCodeMap?: AccessCodeMap;
}

type BaseDispatchType<T, U> = { type: T, payload: U };
type DispatchType = BaseDispatchType<UserActionType, UserInfo>;
export const userReducer = (state: UserInfo, {type, payload}: DispatchType) => {
  switch (type) {
    case UserActionType.UPDATE:
      return payload;
    default:
      throw new Error();
  }
}
export const UserContext = createContext<[UserInfo, Dispatch<DispatchType>] | null>(null);
export const useUserContext = () => {
  return useContext(UserContext);
};
