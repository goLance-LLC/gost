exports.el = (selector, container) => {
  const res = Array.from((container || document).querySelectorAll(`[data-element="${selector}"]`));

  return res.length === 1 ? res[0] : res;
};
