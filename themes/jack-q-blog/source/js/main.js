; +function ($) {

  // aside item toggle
  Array.prototype.forEach.call(
    $('.icon-item span'), function (i) {
      i.addEventListener('click', function () {
        var header = $('.aside-center').item(0);
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
  Array.prototype.forEach.call($('.nav-bar-toggle'),
    function (i) {
      i.addEventListener('click', function () {
        var aside = $('.jq-blog-aside').item(0);
        aside.classList.toggle('toggle-on');
      })
    });

  Array.prototype.forEach.call($('.toc .toc-link'), function (i) {
    i.scrollIntoView &&
      i.addEventListener('click', function (e) {
        $(i.getAttribute('href')).item(0).scrollIntoView({
          behavior: 'smooth'
        })
        e.preventDefault();
        return true;
      });
  });
  debugger;
}(document.querySelectorAll.bind(document));