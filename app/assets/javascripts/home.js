
(function() {
  var $;

  $ = jQuery;

 $.mapInit = function () {
     var width = 800,
         height = 400;

     var projection = d3.geo.mercator()
         .translate([0, 0])
         .scale(width / 2 / Math.PI);

     var zoom = d3.behavior.zoom()
         .scaleExtent([1, 50]).scale(2)
         .on("zoom", move);

     var path = d3.geo.path()
         .projection(projection);

     var svg = d3.select("#map").append("svg")
         .attr("width", width)
         .attr("height", height)
         .append("g")
         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
         .call(zoom);

     var g = svg.append("g");
     var czk = g.append('g')
         .attr("transform", "translate(-211,118)");
     svg.append("rect")
         .attr("class", "overlay")
         .attr("x", -width / 2)
         .attr("y", -height / 2)
         .attr("width", width)
         .attr("height", height);

     d3.json("/assets/map.json", function(error, map) {
         if (error) return console.error(error);
         czk.append("path")
             .datum(topojson.feature(map, map.objects.cze)).attr('class','land')
             .attr("d", path);

     });

     function move() {
         g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
     }

     $.ajax({
        'url':'/api/v1/nodes'
    }).success(function(nodes){
        $.each(nodes, function(i,node){
            addNodeMarker(node, map);
        });
    });
}

function addNodeMarker(node, map){

}
}).call(this);