const { queryAll, trimHtml, trimText } = require('./utils');
const { getUser } = require('./api');

const getUserProfileLink = username => `http://localhost:8100/users/${username}`;

const authorAttributes = [{
  dataAttributeName: 'name',
  mapValue: ({ firstName, lastName }) => (firstName ? `${firstName} ${lastName}` : ''),
}, {
  dataAttributeName: 'link',
  mapValue: ({ username }) => getUserProfileLink(username),
  hide: ({ username }) => username === 'golance',
  mapAssignment: (element, url) => {
    element.setAttribute('href', url);
  },
}, {
  dataAttributeName: 'headline',
}, {
  dataAttributeName: 'avatar',
  mapValue: ({ firstName, lastName, avatarUrl }) => [firstName ? `${firstName} ${lastName}` : '', avatarUrl],
  mapAssignment: (element, [name, avatarUrl]) => {
    element.setAttribute('alt', name);
    element.setAttribute('src', avatarUrl);
  },
}, {
  dataAttributeName: 'summary',
  mapValue: ({ summary, username }) => trimText(trimHtml(summary), 500, {
    readMoreLink: getUserProfileLink(username),
    readMoreText: 'Read more about the author',
    readMoreNewPage: true,
  }),
  mapAssignment: (element, summary) => {
    element.innerHTML = summary;
  },
}];

const addUserDataToElement = async authorElement => {
  const username = authorElement.dataset.author;

  if (!username) {
    return;
  }

  try {
    const userResponse = await getUser(username);
    const { status } = userResponse;

    if (status > 400) {
      if (status === 404) {
        authorElement.remove();
      }

      return;
    }

    const user = await userResponse.json();

    if (!user) {
      throw new Error(`User with username ${username} was not found.`);
    }

    authorAttributes.forEach(({
      dataAttributeName = '',
      hide,
      mapValue,
      mapAssignment,
    }) => {
      const attributeElements = queryAll(`[data-author-${dataAttributeName}]`, authorElement);

      if (attributeElements.length) {
        attributeElements.forEach(attributeElement => {
          const attributeValue = mapValue ? mapValue(user) : user[dataAttributeName];

          if (mapAssignment) {
            mapAssignment(attributeElement, attributeValue);
          } else {
            attributeElement.textContent = attributeValue;
          }

          if (hide) {
            attributeElement.display = 'none';
          }
        });
      }
    });
  } catch (err) {
    console.error(err);
  }
};

exports.init = async () => {
  const authorElements = queryAll('[data-author]');

  authorElements.forEach(addUserDataToElement);
};
