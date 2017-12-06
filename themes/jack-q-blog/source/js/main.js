; +function ($, sel) {
  var setAnimationDelayed = function (func) {
    setTimeout(func, 400);
  }
  
  var pageScrollHandler = function (el) {
    // Native action 
    // since the smooth scroll feature is only available on Firefox at this time, 
    // this is disabled currently
    // sel(i.getAttribute('href')).item(0).scrollIntoView({
    //   behavior: 'smooth'
    // })

    // jQuery Fallback
    var $el = $(el);
    if ($el.length === 0)
      return;

    $('html, body').animate({
      scrollTop: $(el).offset().top
    }, 400);
  }

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

        history.pushState({
          url: getUrl(window.location),
          type: true /*post*/
        }, 'Jack Q\'s Blog', window.location.href);
        pageScrollHandler(i.getAttribute('href'))

        // Close sidebar if necessary
        sel('.jq-blog-aside').item(0).classList.remove('toggle-on');
        e.preventDefault();
        return true;
      });
    });
  }
  bindTocLinkHandler();

  var mouseWheelScroll = function () {
    var ele = document.querySelector(".post-list-container");
    // mouse wheel support on desktop
    if (!ele) return;
    var offset = ele.scrollLeft;
    var update = true;
    setTimeout(function () {
      if (update) offset = ele.scrollLeft;
      else update = true;
    }, 1000);
    $(ele).mousewheel(function (event, delta) {
      if ($(window).width() > 768) {
        // var delta = event.deltaY;
        event.stopPropagation();
        event.preventDefault();

        // already scroll to left most
        if(delta > 0 && offset <= 0)
          return false;

        // already scroll to right most
        if (delta < 0 && this.scrollWidth - offset - this.clientWidth <= 0)
          return false;

        offset = offset - delta * 2;
        if (offset < 0) {
          offset = 0;
        }
        if (offset > this.scrollWidth - this.clientWidth) {
          offset = this.scrollWidth - this.clientWidth;
        }
        this.scrollLeft = offset;
        update = false;
        return false;
      }
    });
  }
  
  var loadPageContent = function (url, type) {

    // Google Analysis 
    window.ga && window.ga('send', 'pageview');
    
    var $loader = $('section.page-loader');

    // indicate page loading, and remove possible erorr state
    $loader.removeClass('error').addClass('loading');

    // Close sidebar if necessary
    sel('.jq-blog-aside').item(0).classList.remove('toggle-on');

    $('.aside-center[data-content-tab=content]').removeClass('active');
    $('.icon-item.toc-header').addClass('hidden');

    setAnimationDelayed(function () {
      
      // remove current page specific content
      $('section.article-content').remove();
      $('section.list-content').remove();
      $('.aside-content').remove();


      var ele = $('<div>');
      // try to load the content to the div
      ele.load(url, function (rep, stat, xhr) {
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
            $('.icon-item.toc-header').removeClass('hidden')
            // rebind toc link handler
            bindTocLinkHandler();
          } else {
            // May remove class 
          }

          // rebind smooth link in new page
          $('section.article-content a[data-smooth]').each(smoothLinkHandler);

          // scroll to target hash
          pageScrollHandler(window.location.hash);

          // reinitialize
          try {
            window.DISQUS && (function () {
              if (window.disqus_config) {
                $('#disqus_thread').empty();
                window.DISQUS.reset({ reload: true });
              }
            } ()) 
          } catch (e) {
            console.error("failed to load DISQUS");
          }

        } else {
          // load page as list type 
          $('body').append(ele.find('section.list-content'));

          // rebind smooth link in new page
          $('section.list-content a[data-smooth]').each(smoothLinkHandler);

          mouseWheelScroll();
        }
      })
      
    })
  }

  var getUrl = function (loc) {
    return loc.protocol + '//' + loc.host + loc.pathname + loc.search;
  }

  var smoothLinkHandler = function (ind, a) {
    var $a = $(a);
    var type = $a.attr('data-smooth-type') === 'post';
    $a.click(function (e) {
      e.preventDefault();
      var targetUrl = getUrl(a);
      var oldLocation = getUrl(window.location);
      history.pushState({ url: getUrl(a), type: type }, 'Jack Q\'s Blog', $a.attr('href'));
      if (targetUrl === oldLocation) {
        pageScrollHandler(a.hash);
      } else {
        loadPageContent(targetUrl + a.hash, type);
      }
    })
  }

  $('a[data-smooth]').each(smoothLinkHandler);
  var initialPageType = $('section.article-content').length > 0;
  mouseWheelScroll();
  setTimeout(function () { pageScrollHandler(window.location.hash) }, 200);
  window.onpopstate = function (ev) {
    if (ev.state && ev.state.url === getUrl(window.location)) {
      pageScrollHandler(window.location.hash);
      return;
    }
    loadPageContent(document.location.href, ev.state? ev.state.type : initialPageType);
  };

}(jQuery, document.querySelectorAll.bind(document));