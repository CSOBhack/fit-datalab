
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
       // var nodes = [{"id":2,"ip_address":"19.70.173.216","venue_name":"Tachov","venue_address":"5. MÁJE 45312/0831","venue_lat":49.7987803,"venue_long":12.6361921,"parent_id":1,"active_users":394600,"_embedded":null},{"id":16,"ip_address":"222.19.78.112","venue_name":"Olomouc","venue_address":"BENDLOVA 30681/66342","venue_lat":49.593778,"venue_long":17.2508787,"parent_id":5,"active_users":356300,"_embedded":null},{"id":18,"ip_address":"100.49.10.72","venue_name":"Humpolec","venue_address":"BERNOLÁKOVA 850/351","venue_lat":49.5415238,"venue_long":15.3593232,"parent_id":5,"active_users":251600,"_embedded":null},{"id":3,"ip_address":"45.87.244.237","venue_name":"Kroměříž","venue_address":"BUDĚJOVICKÁ 96303/2324","venue_lat":49.2916582,"venue_long":17.3993799,"parent_id":2,"active_users":312000,"_embedded":null},{"id":1,"ip_address":"53.15.67.5","venue_name":"Žatec","venue_address":"BOUSOVSKÁ 5369/90154","venue_lat":50.327176,"venue_long":13.5457856,"parent_id":null,"active_users":314800,"_embedded":null},{"id":4,"ip_address":"53.66.36.34","venue_name":"Trhové Sviny","venue_address":"BOLESLAVSKÁ 10838/25171","venue_lat":48.8423175,"venue_long":14.6392384,"parent_id":1,"active_users":311300,"_embedded":null},{"id":5,"ip_address":"39.196.42.123","venue_name":"Nová Paka","venue_address":"BETLÉMSKÉ NÁM. 587/9925","venue_lat":50.494493,"venue_long":15.5150382,"parent_id":4,"active_users":330100,"_embedded":null},{"id":7,"ip_address":"118.120.158.131","venue_name":"Říčany","venue_address":"BÖHMOVA 25228/0607","venue_lat":49.9916782,"venue_long":14.6542758,"parent_id":2,"active_users":377600,"_embedded":null},{"id":10,"ip_address":"111.144.71.138","venue_name":"Český Těšín","venue_address":"BRUNELOVA 0077/55983","venue_lat":49.7470441,"venue_long":18.6237961,"parent_id":7,"active_users":340500,"_embedded":null},{"id":11,"ip_address":"96.232.25.112","venue_name":"Lovosice","venue_address":"BOUČKOVA 7488/631","venue_lat":50.5150429,"venue_long":14.0510416,"parent_id":6,"active_users":400600,"_embedded":null},{"id":13,"ip_address":"42.238.210.11","venue_name":"Brno","venue_address":"ATLETICKÁ 76203/60958","venue_lat":49.1950602,"venue_long":16.6068371,"parent_id":7,"active_users":409800,"_embedded":null},{"id":14,"ip_address":"214.174.105.50","venue_name":"Bruntál","venue_address":"ATHÉNSKÁ 3740/799","venue_lat":49.9881767,"venue_long":17.4636941,"parent_id":7,"active_users":414000,"_embedded":null},{"id":19,"ip_address":"131.36.253.104","venue_name":"Moravský Krumlov","venue_address":"BESEDNÍ 48800/78200","venue_lat":49.0489313,"venue_long":16.311698,"parent_id":11,"active_users":347400,"_embedded":null},{"id":15,"ip_address":"255.22.171.163","venue_name":"Dobruška","venue_address":"BERMANOVA 5521/2161","venue_lat":50.2920108,"venue_long":16.1600182,"parent_id":12,"active_users":344300,"_embedded":null},{"id":8,"ip_address":"232.22.104.242","venue_name":"Nový Bydžov","venue_address":"BARRANDOVSKÁ 357/88058","venue_lat":50.2415017,"venue_long":15.4908263,"parent_id":6,"active_users":178900,"_embedded":null},{"id":17,"ip_address":"133.250.144.243","venue_name":"Semily","venue_address":"BANSKOBYSTRICKÁ 3972/50605","venue_lat":50.6051576,"venue_long":15.328141,"parent_id":2,"active_users":255400,"_embedded":null},{"id":12,"ip_address":"52.236.155.128","venue_name":"Nový Jičín","venue_address":"BĚLOHORSKÁ 243/05962","venue_lat":49.5943251,"venue_long":18.0135356,"parent_id":9,"active_users":333000,"_embedded":null},{"id":20,"ip_address":"254.54.216.152","venue_name":"Soběslav","venue_address":"ANTONÍNSKÁ 674/446","venue_lat":49.2599386,"venue_long":14.7186172,"parent_id":13,"active_users":338600,"_embedded":null},{"id":21,"ip_address":"8.234.250.36","venue_name":"Chotěboř","venue_address":"BRATRANCŮ VEVERKOVÝCH 5931/5863","venue_lat":49.7206138,"venue_long":15.6710415,"parent_id":13,"active_users":305000,"_embedded":null},{"id":25,"ip_address":"107.156.14.240","venue_name":"Jablonec nad Nisou","venue_address":"BUBLAVSKÁ 0107/4588","venue_lat":50.7220528,"venue_long":15.1703135,"parent_id":20,"active_users":316200,"_embedded":null},{"id":9,"ip_address":"57.149.101.111","venue_name":"Ostrava","venue_address":"BOCHOVSKÁ 84033/1057","venue_lat":49.8209226,"venue_long":18.2625243,"parent_id":6,"active_users":360500,"_embedded":null},{"id":6,"ip_address":"55.56.56.249","venue_name":"Vimperk","venue_address":"BAŽANTNÍ 488/36729","venue_lat":49.0524622,"venue_long":13.7744861,"parent_id":3,"active_users":328000,"_embedded":null},{"id":22,"ip_address":"103.178.250.0","venue_name":"Votice","venue_address":"ARISTOTELOVA 8755/43416","venue_lat":49.6401303,"venue_long":14.63809,"parent_id":11,"active_users":301500,"_embedded":null},{"id":23,"ip_address":"199.154.29.24","venue_name":"Odry","venue_address":"BLUDOVICKÁ 91329/202","venue_lat":49.6625479,"venue_long":17.8308497,"parent_id":19,"active_users":296100,"_embedded":null},{"id":24,"ip_address":"150.151.114.113","venue_name":"Jindřichův Hradec","venue_address":"BURIANOVA 153/89367","venue_lat":49.1444823,"venue_long":15.0061389,"parent_id":12,"active_users":235100,"_embedded":null},{"id":26,"ip_address":"207.4.66.27","venue_name":"Šternberk","venue_address":"ANEŽKY MALÉ 0215/59629","venue_lat":49.7304416,"venue_long":17.2988947,"parent_id":19,"active_users":255400,"_embedded":null},{"id":30,"ip_address":"48.243.95.27","venue_name":"Ústí nad Orlicí","venue_address":"BÁŠŤSKÁ 43449/35570","venue_lat":49.9721801,"venue_long":16.3996617,"parent_id":11,"active_users":288300,"_embedded":null},{"id":29,"ip_address":"250.128.230.203","venue_name":"Poděbrady","venue_address":"BRATŘÍ DOHALSKÝCH 0947/284","venue_lat":50.1424249,"venue_long":15.1188883,"parent_id":18,"active_users":276600,"_embedded":null},{"id":31,"ip_address":"41.54.168.8","venue_name":"Kravaře","venue_address":"BRUNNEROVA 23967/94212","venue_lat":49.9320298,"venue_long":18.004727,"parent_id":2,"active_users":390400,"_embedded":null},{"id":27,"ip_address":"78.136.111.57","venue_name":"Hořovice","venue_address":"BOROTÍNSKÁ 89598/3607","venue_lat":49.8359777,"venue_long":13.9026888,"parent_id":1,"active_users":302000,"_embedded":null},{"id":32,"ip_address":"218.60.139.143","venue_name":"Strakonice","venue_address":"BUKOLSKÁ 102/4016","venue_lat":49.2604043,"venue_long":13.9103085,"parent_id":5,"active_users":332800,"_embedded":null},{"id":28,"ip_address":"121.213.17.188","venue_name":"Čáslav","venue_address":"BURDOVA 11902/15626","venue_lat":49.9108953,"venue_long":15.3907936,"parent_id":24,"active_users":288700,"_embedded":null}];
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

