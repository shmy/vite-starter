import http from "../utils/http.util";
import {UserInfo} from "../contexts/UserContext";
import {AccessCodeMap} from "../components/AuthRoute";

export const getUserInfoService = () => {
  return http.get<UserInfo>('/user/getInfo');
};
export const getUserAccessCodeService = () => {
  return http.get<string[]>('/user/getAccessCode');
};

export const getInitializeUserService = () => {
  return Promise.all([
    getUserInfoService(),
    getUserAccessCodeService(),
  ]).then(([user, accessCodeList]) => {
    // 权限，用户信息可在此注入
    const accessCodeMap: AccessCodeMap = {};
    accessCodeList.forEach(accessCode => {
      accessCodeMap[accessCode] = true;
    })
    return {...user, accessCodeMap};
  });
}
export const userLoginService = () => {
  return http.post<{ token: string }>('/login');
};
