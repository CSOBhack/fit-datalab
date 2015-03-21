(function() {
  var $;

  $ = jQuery;
  $.loadActors = function(){
    if(!$('#spinner').hasClass('loader')){
      $('#spinner').addClass('loader');
    }
    var container = $("#actors");
    container.empty();
    $.ajax({
      type: "GET",
      url: "/api/v1/actors/",
      context: this,
      success: function (data) {
         $('#spinner').removeClass('loader');
         $.each(data,function(){
            //console.log(this.title);
            var elem = $(document.createElement('div'))
                    .addClass('col-xs-4 col-sm-3 item')
                    .attr('id', 's'+this.id)
                    .addClass(this.type);

            elem.append($(document.createElement('span'))
              .addClass('name')
              .text(this.name)
            ).append($(document.createElement('span'))
              .addClass('points badge')
              .text(this.current_action_points)
            ).append($(document.createElement('span'))
              .addClass('goal')
              .text(this.goal)
            ).append($(document.createElement('span'))
              .addClass('doing')
              .text(this.doing)
            );
            container.append(elem)
         });
      },
      complete: function(){
        //set default sorting
        container.isotope();
      }
    });
  };
}).call(this);