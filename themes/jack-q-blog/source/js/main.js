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

  // debugger;
}(document.querySelectorAll.bind(document));