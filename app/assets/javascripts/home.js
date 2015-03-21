(function () {
    var $;

    $ = jQuery;

    $.mapInit = function () {
        var width = 800,
            height = 400;

        var projection = d3.geo.mercator()
            .translate([-700*1.5, 2700*1.5])
            .scale(width / 2 / Math.PI * 22*1.5);

        var zoom = d3.behavior.zoom()
            .scaleExtent([1, 50])
            .scale(1.5)
            .on("zoom", move);

        var path = d3.geo.path()
            .projection(projection);

        var svg = d3.select("#map").attr('style','width: '+width+'px; height: '+height+'px').append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            .call(zoom);

        var g = svg.append("g");
        var czk = g.append('g')
            .attr("transform", "translate(-34.5,128)");
        svg.append("rect")
            .attr("class", "overlay")
            .attr("x", -width / 2)
            .attr("y", -height / 2)
            .attr("width", width)
            .attr("height", height);
        svg.call(zoom.event);
        d3.json("/assets/map.json", function (error, map) {
            if (error) return console.error(error);
            czk.append("path")
                .datum(topojson.feature(map, map.objects.cze)).attr('class', 'land')
                .attr("d", path);

            $.ajax({
                'url': '/api/v1/nodes'
            }).success(function (nodes) {
                czk
                    .selectAll('circle')
                    .data(nodes)
                    .enter()
                    .append('circle')
                    .attr("cx", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[0]; })
                    .attr("cy", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[1]; })
                    .attr("r", "3px")
                    .attr("fill", "red")
            });
        });

        function move() {
            g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }


    }

}).call(this);