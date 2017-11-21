const { queryAll, trimHtml, trimText } = require('./utils');
const { getUser, getCompany } = require('./api');
const { rootUrl } = require('./config.jsenv');

const getProfileLink = (username, isCompany = false) => `${rootUrl}/${isCompany ? 'companies' : 'users'}/${username}`;
const COMPANY_PREFIX = 'COMPANY:';

const authorAttributes = [{
  dataAttributeName: 'name',
  mapValue: ({ firstName, lastName }) => (firstName ? `${firstName} ${lastName}` : ''),
}, {
  dataAttributeName: 'link',
  show: ({ username }) => username !== 'golance',
  mapValue: ({ username, isCompany }) => getProfileLink(username, isCompany),
  mapAssignment: (element, url) => {
    element.setAttribute('href', url);
  },
}, {
  dataAttributeName: 'headline',
}, {
  dataAttributeName: 'avatar',
  mapValue: ({ firstName, lastName, avatarUrl, profileInfo: { logoUrl }, isCompany }) =>
    [firstName ? `${firstName} ${lastName}` : '', isCompany ? logoUrl : avatarUrl],
  mapAssignment: (element, [name, avatarUrl]) => {
    element.setAttribute('alt', name);
    element.setAttribute('src', avatarUrl);
  },
}, {
  dataAttributeName: 'summary-short',
  mapValue: ({ summary, profileInfo: { description }, isCompany }) =>
    trimText(trimHtml(isCompany ? description : summary), 500),
}, {
  dataAttributeName: 'summary',
  mapValue: ({ summary, username, profileInfo: { description }, isCompany }) =>
    trimText(trimHtml(isCompany ? description : summary), 500, {
      readMoreLink: getProfileLink(username, isCompany),
      readMoreText: 'Read more about the author',
      readMoreNewPage: true,
    }),
  mapAssignment: (element, summary) => {
    element.innerHTML = summary;
  },
}];

const addUserDataToElement = async authorElement => {
  let username = authorElement.dataset.author;

  if (!username) {
    return;
  }

  const isCompany = username.indexOf(COMPANY_PREFIX) === 0;

  if (isCompany) {
    username = username.replace(COMPANY_PREFIX, '');
  }

  try {
    const response = isCompany ? await getCompany(username) : await getUser(username);
    const { status } = response;

    if (status > 400) {
      if (status === 404) {
        authorElement.remove();
      }

      return;
    }

    const profile = await response.json();

    if (!profile) {
      throw new Error(`${isCompany ? 'Company' : 'User'} with username ${username} was not found.`);
    }

    authorAttributes.forEach(({
      dataAttributeName = '',
      hide,
      show,
      mapValue,
      mapAssignment,
    }) => {
      const attributeElements = queryAll(`[data-author-${dataAttributeName}]`, authorElement);

      if (attributeElements.length) {
        attributeElements.forEach(attributeElement => {
          const profileParams = {
            isCompany,
            profileInfo: {},
            ...profile,
          };
          const attributeValue = mapValue ? mapValue(profileParams) : profile[dataAttributeName];

          if (mapAssignment) {
            mapAssignment(attributeElement, attributeValue);
          } else {
            attributeElement.textContent = attributeValue;
          }

          if (typeof hide === 'function' && hide(profileParams)) {
            attributeElement.setAttribute('hidden', '');
          }

          if (typeof show === 'function' && show(profileParams)) {
            attributeElement.removeAttribute('hidden');
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
