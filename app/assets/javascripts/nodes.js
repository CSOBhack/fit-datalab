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
      url: "/api/v1/nodes/",
      context: this,
      success: function (data) {
         $('#spinner').removeClass('loader');
         $.each(data,function(){
            //console.log(this.title);
            var elem = $(document.createElement('div'))
                    .addClass('col-xs-4 col-sm-3 item')
                    .attr('id', 'n'+this.id);

            elem.append($(document.createElement('span'))
              .addClass('ip')
              .text(this.ip_address)
            ).append($(document.createElement('span'))
              .addClass('name')
              .text(this.venue_name)
            ).append($(document.createElement('span'))
              .addClass('address')
              .text(this.venue_address)
            );
                    console.log(this.venue_address);
            $("#nodes").append(elem)
         });
      },
      complete: function(){
        //set default sorting
        $("#nodes").isotope();
      }
    });
  };
}).call(this);