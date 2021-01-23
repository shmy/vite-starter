import Mock from 'mockjs';

const makeSuccessResponse = (data: any) => {
  return {
    code: 0,
    data,
    info: null
  };
};
const makeErrorResponse = (data: any) => {
  return {
    code: 1,
    data,
    info: 'error！！！'
  };
};
Mock.setup({
  timeout: '100-1000'
});
Mock.mock('/api/user/getInfo', 'get', makeSuccessResponse({
  username: '@cname',
  token: '@guid'
}));

Mock.mock('/api/user/getAccessCode', 'get', makeSuccessResponse([
  'DASHBOARD_LOOKUP',
  'POST_LOOKUP',
  'APPLICATION_LOOKUP',
  'DASHBOARD_LOGOUT',
]));

Mock.mock('/api/login', 'post', makeSuccessResponse({
  token: '@guid'
}));

