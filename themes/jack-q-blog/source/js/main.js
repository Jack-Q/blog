; +function ($, sel) {

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
  //debugger;
}(jQuery, document.querySelectorAll.bind(document));