(function() {
  var $;

  $ = jQuery;
  //current user identification
  $.loadSystems = function(){
    if(!$('#spinner').hasClass('loader')){
      $('#spinner').addClass('loader');
    }
    var container = $("#systems");
    container.empty();
    $.ajax({
      type: "GET",
      url: "/api/v1/systems/",
      context: this,
      success: function (data) {
         $('#spinner').removeClass('loader');
         $.each(data,function(){
            //console.log(this.title);
            var elem = $(document.createElement('div'))
                    .addClass('col-xs-4 col-sm-3 item')
                    .attr('id', 's'+this.id);

            elem.append($(document.createElement('span'))
              .addClass('name')
              .text(this.name)
            ).append($(document.createElement('span'))
              .addClass('max_robustness')
              .text(this.max_robustness)
            ).append($(document.createElement('span'))
              .addClass('user_capacity')
              .text(this.user_capacity)
            ).append($(document.createElement('span'))
              .addClass('type label label-primary')
              .text(this.system_type_name)
            ).append($(document.createElement('span'))
              .addClass('level badge')
              .text(this.level)
            );
            container.append(elem)
         });
      },
      complete: function(){
        //set default sorting
        container.isotope({
          itemSelector: '.item',
          layoutMode: 'fitRows',
           getSortData: {
            name: '.name',
            max_robustness: '.max_robustness'
          }
        });
        $.initFilters(container);
      }
    });
  };
}).call(this);