/* global hexo */
'use strict';

const mdlink = require('./lib/mdlink');

hexo.extend.filter.register('before_post_render', function(data) {
  mdlink(data, hexo);
});
