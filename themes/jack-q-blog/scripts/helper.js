const cheerio = require('cheerio');

// code snippet from 
// https://github.com/hexojs/site/blob/master/scripts/helpers.js
hexo.extend.helper.register('page_anchor', function(str){
  var $ = cheerio.load(str, {decodeEntities: false});
  var headings = $('h1, h2, h3, h4, h5, h6');

  // remove prepend items  
  $('.headerlink').remove();
  
  if (!headings.length) return str;
  
  headings.each(function(){
    var id = $(this).attr('id');

    $(this)
      .addClass('article-heading')
      .append('<a class="article-anchor" href="#' + id + '" data-smooth data-smooth-type="post" aria-hidden="true"></a>');
  });

  return $.html();
});

hexo.extend.helper.register('anchor_smooth', function (html, isPostPage) {
  $ = cheerio.load(html);

  $('a').attr({
    'data-smooth': 'data-smooth',
    'data-smooth-type': isPostPage ? 'post' : 'list'
  })  

  return $.html();
})