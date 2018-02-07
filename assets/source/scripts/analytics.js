const { sendBlogViewAnalytics } = require('./api');

const sendBlogPostViewAnalytics = async () => {
  if (!window.postId) {
    return;
  }

  await sendBlogViewAnalytics({ ghostArticleId: window.postId });
};

exports.init = async () => {
  sendBlogPostViewAnalytics();
};
