const InfiniteScroll = require('infinite-scroll');

if (!String.prototype.startsWith) {
  String.prototype.startsWith = (searchString, position) =>
    this.substr(position || 0, searchString.length) === searchString;
}

const pathname = window.location.pathname;
const isHomepage = pathname === '/' || pathname.startsWith('/page/');

if (!isHomepage) {
  return;
}

new InfiniteScroll('[data-element="content"]', {
  path: '/page/{{#}}',
  append: '.gl.post.segment',
});
