(function($) {
  $(function() {

    var $grid = $('#grid-container');

    $grid.isotope({
      // options
      itemSelector: '.grid-item',
      columnWidth: '.grid-item',
      percentPosition: true,
      masonry: {
        // set to the element
        columnWidth: '.grid-item',
        gutter: '.gutter-width'
      }
    });

    var hash = window.location.hash;
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

    // Parallax library.
    $.stellar({responsive: true});

  });
})(jQuery);
