exports.el = (selector, container) => {
  const dataSelector = `[data-element="${selector}"]`;
  const res = Array.from((container || document).querySelectorAll(dataSelector));

  if (!res.length) {
    throw new Error(`Elements with ${dataSelector} attribute not found in DOM.`);
  }

  return res.length === 1 ? res[0] : res;
};

exports.touchEvent = 'ontouchstart' in window ? 'touchstart' : 'click';
