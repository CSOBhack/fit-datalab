
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

  $.has = function has(object, key) {
    if(object[key] === undefined){
      return false;
    }
    return object[key] == null ? false : true;
  };

  $.initFilters = function(grid){
    $('#sorts').on( 'click', 'button', function() {
      var sortByValue = $(this).attr('data-sort-by');
      var asc = true;
      if($(this).attr('data-sort')){
        console.log('key!');
        asc = $(this).attr('data-sort') == 'asc' ? true :false
      }
      //console.log('sort dir ' + $(this).attr('data-sort'));
      grid.isotope({ sortBy: sortByValue, sortAscending: asc });
    });
  };
}).call(this);