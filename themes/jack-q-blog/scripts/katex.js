const cheerio = require('cheerio');
const katex = require('katex');
const log = require('hexo-log')();


// args:
//  - inline: toggle inline mode

hexo
  .extend
  .tag
  .register('math', function (args, content) {
    try {
      return katex.renderToString(content, {
        displayMode: !(args && args.filter && args.filter(i => i == 'inline').length > 0)
      }); 
    } catch (e) {
      log.error(e.message);
    }
  }, {ends: true});

// page config: math_inline 

// options:   format: %opt1%opt2%opt3=1212%
//   - display: toggle display mode (display in block) (default false, that is
// inline mode)
//   - incode:
hexo
  .extend
  .filter
  .register('after_post_render', function (data) {
    if (!data.math_inline) {
      return data;
    }

    log.info("inline math enabled in " + data.source);

    var defaultOption = Object.assign({}, {display: false});

    $ = cheerio.load(data.content);
    $('*:not(pre,figure,pre *,figure *, span)').each((i, e) => {
      e = $(e);
      e.html(latexReplaceInline(e.html(), defaultOption));
    });
    data.content = $.html();

    return data;
  })

const matchRegex = /(?:^|[^\\])\$\$((?:%\w+)+%)?((?:(?:\\\$)*|[^$]*?)*)\$\$/g;
latexReplaceInline = (data, defaultOption) => data.replace(matchRegex, function (match, options, math) {
  try {
    options = options
      ? options
        .split('%')
        .reduce(function (o, i) {
          i && (o[i] = true);
          return o;
        }, Object.assign({}, defaultOption))
      : defaultOption;
    return katex.renderToString(math, {displayMode: options.display});
  } catch (e) {
    log.warn("Invalid math expression found: \"" + match);
    return match;
  }
});