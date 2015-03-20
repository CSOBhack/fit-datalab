
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
}
