export default class TokenUtil {
  static set(token: string) {
    window.localStorage.setItem('token', token);
  }
  static get()  {
    return window.localStorage.getItem('token');
  }
  static has(): boolean {
    return !!TokenUtil.get();
  }
  static clear() {
    window.localStorage.removeItem('token');
  }
}
