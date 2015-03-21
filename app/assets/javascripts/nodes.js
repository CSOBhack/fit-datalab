(function() {
  var $;

  $ = jQuery;
  //current user identification
  $.loadNodes = function loadNodes(){
    if(!$('#spinner').hasClass('loader')){
      $('#spinner').addClass('loader');
    }
    $("#nodes").empty();
    $.ajax({
      type: "GET",
      //TODO: fetch userID from somewhere
      url: "/api/v1/nodes/",
      context: this,
      success: function (data) {
         $('#spinner').removeClass('loader');
         $.each(data,function(){
            //console.log(this.title);
            var elem = $(document.createElement('div'))
                    .addClass('col-xs-4 col-sm-3 item')
                    .attr('id', '')
                    .text(this.ip_address);

            $("#nodes").append(elem)
         });
      },
      complete: function(){
        //set default sorting
        //$('#results').isotope({ sortBy: ['seen', 'name']});
      }
    });
  };
}).call(this);