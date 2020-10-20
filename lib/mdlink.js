'use strict';

const util = require('hexo-util');

// Find the .md link
const regex = /\/?[a-zA-Z0-9_.\-\/]*\.md/g;

// Just fetch posts and pages
function fetchPostsAndPages(hexo) {
  let posts = hexo.locals.get('posts');
  let pages = hexo.locals.get('pages');

  // All posts and pages
  return posts.data.concat(pages.data);
}

module.exports = function(data, hexo) {
  hexo.locals.invalidate();

  let sourceBase = data.source.substring(0, data.source.lastIndexOf('/'));

  // All posts
  let postsAndPages = fetchPostsAndPages(hexo);

  // Find .md links
  let foundMarkdownLink = data.content.match(regex);

  if (!foundMarkdownLink) {
    return;
  }

  let matchPosts = foundMarkdownLink.map(function(found) {
    if (found.indexOf('/') === 0) {
      return found.replace(new RegExp('\/' + hexo.config.source_dir + '\/'),
        '');
    }

    return sourceBase + '/' + found;
  })
    .map(function(found) {
      return postsAndPages.find(function(post) {
        return post.source === found;
      });
    });

  matchPosts.forEach(function(post, index) {
    if (post) {
      data.content = data.content.replace(foundMarkdownLink[index], util.relative_url(data.path, post.path));
    }
  });
};
