const InfiniteScroll = require('infinite-scroll');

exports.init = () => {
  const { pathname } = window.location;
  const isHomepage = pathname === '/' || pathname.startsWith('/page/');

  if (!isHomepage) {
    return;
  }

  new InfiniteScroll('[data-element="content"]', {
    path: '/page/{{#}}',
    append: '.gl.post.segment',
  });
};
