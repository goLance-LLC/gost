const fetch = require('unfetch');

exports.getUser = username => fetch(`http://localhost:8100/api/v1/users/${username}`);
