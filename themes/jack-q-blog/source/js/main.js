; +function ($, sel) {
  console.log("SCRIPT LOAD");
  
  // aside item toggle
  Array.prototype.forEach.call(
    sel('.icon-item span'), function (i) {
      i.addEventListener('click', function () {
        var header = sel('.aside-center').item(0);
        if (header.classList.contains('active')) {
          if (header.dataset['contentTab'] == i.dataset['content']) {
            header.classList.remove('active');
          }
        } else {
          header.classList.add('active');
        }
        header.dataset['contentTab'] = i.dataset['content'];
      });
    });

  // aside block toggle  
  Array.prototype.forEach.call(sel('.nav-bar-toggle'),
    function (i) {
      i.addEventListener('click', function () {
        var aside = sel('.jq-blog-aside').item(0);
        aside.classList.toggle('toggle-on');
      })
    });

  
  var bindTocLinkHandler = function () {
    Array.prototype.forEach.call(sel('.toc .toc-link'), function (i) {
      i.addEventListener('click', function (e) {
        // Native action 
        // since the smooth scroll feature is only available on Firefox at this time, 
        // this is disabled currently
        // sel(i.getAttribute('href')).item(0).scrollIntoView({
        //   behavior: 'smooth'
        // })

        // jQuery Fallback
        var el = $(i.getAttribute('href'))
        $('html, body').animate({
          scrollTop: el.offset().top
        }, 400);

        // Close sidebar if necessary
        sel('.jq-blog-aside').item(0).classList.remove('toggle-on');
        e.preventDefault();
        return true;
      });
    });
  }
  bindTocLinkHandler();
  
  var smoothLinkHandler = function (ind, a) {
    var $a = $(a);
    var $loader = $('section.page-loader');
    var type = $a.attr('data-smooth-type') === 'post';
    $a.click(function (e) {
      console.log("load " + $a.attr('href') + ' as ' + (type ? 'post' : 'list') + ' type');
      e.preventDefault();
      // remove current page specific content
      $('section.article-content').remove();
      $('section.list-content').remove();
      $('.aside-content').remove();
      $('.icon-item.toc-header').css({ display: 'none' });
      $('.aside-center[data-content-tab=content]').removeClass('active')


      // Close sidebar if necessary
      sel('.jq-blog-aside').item(0).classList.remove('toggle-on');

      // indicate page loading       
      $loader.addClass('loading');

      var ele = $('<div>');
      // try to load the content to the div
      ele.load($a.attr('href') + ' ', function (rep, stat, xhr) {
        $loader.removeClass('loading');
        if (stat === 'error') {
          $loader.addClass('error');
          return;
        }

        // load page as post type
        if (type) {
          // load page content
          $('body').append(ele.find('section.article-content'));

          // load navigation list
          var navigationList = ele.find('.aside-content');
          if (navigationList.length) {
            $('.aside-center-content').append(navigationList);
            $('.icon-item.toc-header').css({ display: 'inline-block' });
            // rebind toc link handler
            bindTocLinkHandler();
          } else {
            // May remove class 
          }

          // rebind smooth link in new page
          $('section.article-content a[data-smooth]').each(smoothLinkHandler);
        } else {
          // load page as list type 
          $('body').append(ele.find('section.list-content'));

          // rebind smooth link in new page
          $('section.list-content a[data-smooth]').each(smoothLinkHandler);
        }
      })
    })
  }

  $('a[data-smooth]').each(smoothLinkHandler);

  //debugger;
}(jQuery, document.querySelectorAll.bind(document));