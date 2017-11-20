const fetch = require('unfetch');

exports.getUser = username => fetch(`https://golance.com/api/v1/users/${username}`);
