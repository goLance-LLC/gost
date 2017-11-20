exports.el = (selector, container) => {
  const dataSelector = `[data-element="${selector}"]`;
  const res = Array.from((container || document).querySelectorAll(dataSelector));

  if (!res.length) {
    throw new Error(`Elements with ${dataSelector} attribute not found in DOM.`);
  }

  return res.length === 1 ? res[0] : res;
};

exports.touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';

exports.queryAll = (selector, container = document) =>
  Array.from(container.querySelectorAll(selector));

exports.query = (selector, container = document) => {
  const elements = exports.queryAll(selector, container);

  return Array.isArray(elements) ? elements[0] : null;
};

exports.trimHtml = (string = '') => string.replace(/<(?:.|\n)*?>/gm, '');

exports.trimText = (
  text = '',
  length = text.length,
  {
    replaceWithDots = true,
    keepWords = true,
    readMoreLink = null,
    readMoreText = 'Read more',
    readMoreNewPage = false,
  } = {},
) => {
  let trimmedString = keepWords ? text.replace(new RegExp(`^(.{${length}}[^\\s]*).*`), '$1') : text.substr(0, length);

  if (trimmedString.length && replaceWithDots) {
    trimmedString += '...';
  }

  if (readMoreLink) {
    trimmedString = `<span>${trimmedString} <a href="${readMoreLink}"${readMoreNewPage ? ' target="_blank"' : ''}>${readMoreText}</a><span>`;
  }

  return trimmedString;
};
