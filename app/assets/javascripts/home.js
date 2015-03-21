
$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(initialize);
});


function initialize(location) {
  //console.log(location);
  var mapOptions = {
      center: new google.maps.LatLng(location.coords.latitude, location.coords.longitude),
      zoom: 8
  };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    $.ajax({
        'url':'/api/v1/nodes'
    }).success(function(nodes){
        $.each(nodes, function(i,node){
            addNodeMarker(node, map);
        });
    });
}

function addNodeMarker(node, map){
    console.log('Adding',node)
    var myLatLng = new google.maps.LatLng(node.venue_lat, node.venue_long);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: node.venue_name
    });
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h3 id="firstHeading" class="firstHeading">'+node.venue_name+'</h3>'+
        '<h4 id="secondHeading" class="secondHeading">IP '+node.ip_address+'</h4>'+
        '<div id="bodyContent">'+
        '<p></p>'+
        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });

}

