
//filter buttons
$(document).ready(function() {
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.selected').removeClass('selected');
      $( this ).addClass('selected');
    });
  });
});


(function() {
  var $;

  $ = jQuery;
  $.initFilters = function(grid){
    $('#sorts').on( 'click', 'button', function() {
      var sortByValue = $(this).attr('data-sort-by');
      console.log('sorting by ' + sortByValue);
      grid.isotope({ sortBy: sortByValue });
    });
  };
}).call(this);