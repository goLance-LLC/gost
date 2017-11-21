const fetch = require('unfetch');
const { rootUrl } = require('./config.jsenv');

exports.getUser = username => fetch(`${rootUrl}/api/v1/users/${username}`);
exports.getCompany = username => fetch(`${rootUrl}/api/v1/companies/${username}/public`);
