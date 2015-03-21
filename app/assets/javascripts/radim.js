
// (function() {
// 	var $;

// 	$ = jQuery;

// 	$.loadNodes = function loadNodes()
// 	{
// 	    if (!$('#spinner').hasClass('loader'))
// 	    {
// 	    	$('#spinner').addClass('loader');
// 	    }
// 	    $("#nodes").empty();

// 		$.ajax({
// 			type: "GET",      
// 			url: "http://csob-hackathon.herokuapp.com:80/api/v1/traffic.json?page=1&per_page=10&offset=0",
// 			context: this,
// 			success: function (data) 
// 			{
// 				$('#spinner').removeClass('loader');
// 				$.each(data,function()
// 			 	{
// 				    //console.log(this.title);
// 				    var elem = $(document.createElement('div'))
// 				            //.addClass('col-xs-4 col-sm-3 item')
// 				            .attr('id', '')
// 				            .text(this.ip_address);

// 				    $("#nodes").append(elem)
// 				});
// 			},
// 			complete: function(){
// 			    //set default sorting
// 			    //$('#results').isotope({ sortBy: ['seen', 'name']});
// 			}
// 	    });	
//     };
// }).call(this);

// // $( "<ul/>", {
// // 		"class": "my-new-list"
// // 	}).appendTo( "body" );

// // $.getJSON( "http://csob-hackathon.herokuapp.com:80/api/v1/news.json", function( data ) {
// //   // var items = [];
// //   $.each( data, function( key, val ) 
// //   {
// //     items.push( "<li id='" + key + "'>" + val + "</li>" );
// //   });
 
// //   // $( "<ul/>", {
// //   //   "class": "my-new-list",
// //   //   html: items.join( "" )
// //   // }).appendTo( "body" );
// // })
// //   .done(function() {
// //     alert( "second success" );
// //   })
// //   .fail(function() {
// //     alert( "error" );
// //   })
// //   // .always(function() {
// //   //   alert( "complete" );
// //   });