import Mock from 'mockjs';
Mock.setup({
  timeout: '100-1000'
});
Mock.mock('/api/user/getInfo', 'get', {
  username: '@cname',
  token: '@guid'
});

Mock.mock('/api/user/getAccessCode', 'get', [
  'DASHBOARD_LOOKUP',
  'POST_LOOKUP',
  'APPLICATION_LOOKUP',
  'DASHBOARD_LOGOUT',
]);

Mock.mock('/api/login', 'post', {
  token: '@guid'
});

