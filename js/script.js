(function($) {
  $(function() {

    var $grid = $('#grid-container');

    $grid.isotope({
      // options
      itemSelector: '.grid-item',
      columnWidth: '.grid-item',
      masonry: {
        // set to the element
        columnWidth: '.grid-item',
        gutter: '.gutter-width'
      }
    });

    var hash = window.location.hash;
    console.log(hash);
    if (hash) {
      if ($('.category-filter[href="' + hash + '"').length) {
        var category = hash.replace('#', '');
        $grid.isotope({ filter: '.category-' + category });
        $('.category-filter').removeClass('active');
        $('.category-filter[href="' + hash + '"').addClass('active');
      }
    }

    $('.category-filter').on('click', function(e) {
      $('.category-filter').removeClass('active');
      $(this).addClass('active');


      var category = $(this).attr('href');
      category = category.replace('#', '');
      if (category) {
        $grid.isotope({filter: '.category-' + category});
      }
      else {
        $grid.isotope({ filter: '' });
      }
    });

  });
})(jQuery);

//docReady( function() {
//
//  var container = document.querySelector('#grid-container');
//  var msnry = new Masonry( container, {
//    columnWidth: '.grid-item'
//  });
//
//  var togglerButton = document.querySelector('.category-filter');
//  var areW2Hidden = false;
//  eventie.bind( togglerButton, 'click', function() {
//    areW2Hidden = !areW2Hidden;
//    container.className = areW2Hidden ? container.className + ' hide-drupal' : '';
//    msnry.layout();
//  });
//});
