import http, {AfterResponse, PromiseAllWithAfterResponse} from "../utils/http.util";
import {UserInfo} from "../contexts/UserContext";
import {AccessCodeMap} from "../components/AuthRoute";

export const getUserInfoService = () => {
  return http.get<UserInfo>('/user/getInfo');
};
export const getUserAccessCodeService = () => {
  return http.get<string[]>('/user/getAccessCode');
};

export const getInitializeUserService = async (): Promise<AfterResponse<UserInfo>> => {
  const [err, data] = await PromiseAllWithAfterResponse<UserInfo | string[]>([
    getUserInfoService(),
    getUserAccessCodeService()]
  );
  const [userInfo, accessCodeList] = data;
  const accessCodeMap: AccessCodeMap = {};
  if (!err) {
    // 权限，用户信息可在此注入
    (accessCodeList as string[]).forEach(accessCode => {
      accessCodeMap[accessCode] = true;
    });
  }
  return [err, {...userInfo, accessCodeMap}];
}
export const userLoginService = () => {
  return http.post<{ token: string }>('/login');
};
