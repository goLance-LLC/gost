const zoom = require('medium-zoom');

exports.init = () => {
  zoom('.gl.post.segment > .content img', {
    background: 'hsla(0, 0%, 0%, .85)',
  });
};
