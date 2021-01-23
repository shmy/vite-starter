import {AccessCodeMap} from "../components/AuthRoute";

export const hasAccessCodes = (accessCodeMap?: AccessCodeMap, requiredAccessCodeList?: string[]): boolean => {
  if (!requiredAccessCodeList) {
    return true;
  }
  if (!accessCodeMap) {
    return false;
  }
  for (const code of requiredAccessCodeList) {
    if (!accessCodeMap[code]) {
      return false;
    }
  }
  return true;
}
