const InfiniteScroll = require('infinite-scroll');

new InfiniteScroll('[data-element="content"]', {
  path() {
    const nextPage = this.loadCount === 0 ? 2 : this.loadCount + 1;

    return `/page/${nextPage}`;
  },
  append: '.gl.post.segment',
});
