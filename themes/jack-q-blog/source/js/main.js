; +function ($) {

  // aside toggle
  $('.icon-item span').forEach(function (i) {
    i.addEventListener('click', function () {
      var header = $('.aside-center').item(0);
      if (header.classList.contains('active')) {
        if(header.dataset['contentTab'] == i.dataset['content']){
          header.classList.remove('active');
        }
      } else {
        header.classList.add('active');
      }
      header.dataset['contentTab'] = i.dataset['content'];
    });
  });

  // debugger;
}(document.querySelectorAll.bind(document));