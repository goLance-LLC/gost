const fetch = require('unfetch');
const Cookies = require('js-cookie');
const { rootUrl } = require('./config.jsenv');

exports.get = url => fetch(`${rootUrl}/api/v1/${url}`);
exports.post = (url = '', data = {}) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const accessToken = Cookies.get('golance_access_token');

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return fetch(`${rootUrl}/api/v1/${url}`, {
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'include',
    headers,
  });
};

exports.getUser = username => exports.get(`users/${username}`);
exports.getCompany = username => exports.get(`companies/${username}/public`);
exports.sendBlogViewAnalytics = data => exports.post('blog/stats', data);
