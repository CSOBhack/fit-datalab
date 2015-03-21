(function () {
    var $;

    $ = jQuery;




    $.mapInit = function () {
        var width = $('#map').width(),
            height = 400;

        var projection = d3.geo.mercator()
        var path = d3.geo.path()
            .projection(projection);

        var svg = d3.select("#map").attr('style','width: '+width+'px; height: '+height+'px').append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            //.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

        var g = svg.append('g');
        var labels = svg.append('g');
        var back = labels.append('text')
            .text('< click the background to go back')
            .attr('class','map-back none')
            .attr('x', 20)
            .attr('y', height-20)

        d3.json("/assets/map.json", function (error, map) {
            if (error) return console.error(error);
            var topo = topojson.feature(map, map.objects.cze);
            reset(topo);
            g.append("path")
                .datum(topo).attr('class', 'land')
                .attr("d", path)
                .on('click',reset)

            $.ajax({
                'url': '/api/v1/nodes'
            }).success(function (nodes) {




                g
                    .selectAll('maxRobustness')
                    .data(nodes)
                    .enter()
                    .append('circle')
                    .attr("cx", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[0]; })
                    .attr("cy", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[1]; })
                    .attr("r", function(n) {return maxHealth(n)/getInnerScale() + maxRobustness(n) / getOuterScale();} )
                    .attr("fill", getDarkRed())
                    .attr('class','node-circle')
                    .style("opacity",getDefaultOpacity())
                    .on("mouseout", setDarkRed)
                    .on("mouseover", setLightRed)
                    .on('click', clicked)


                g
                    .selectAll('currentRobustness')
                    .data(nodes)
                    .enter()
                    .append('circle')
                    .attr("cx", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[0]; })
                    .attr("cy", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[1]; })
                    .attr("r", function(n) {return maxHealth(n)/getInnerScale() + currentRobustness(n) / getOuterScale();} )
                    .attr("fill", getDarkGreen())
                    .attr('class','node-circle')
                    .style("opacity",getDarkRed())
                    .on("mouseout", setDarkGreen)
                    .on("mouseover", setLightGreen)
                    .on('click', clicked);


                g
                    .selectAll('boundry')
                    .data(nodes)
                    .enter()
                    .append('circle')
                    .attr("cx", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[0]; })
                    .attr("cy", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[1]; })
                    .attr("r", function(n) {return maxHealth(n)/getInnerScale() + getBoundrySize();} )
                    .attr("fill", "white")
                    .attr('class','node-circle')
                    .on('click', clicked)


                g
                    .selectAll('maxHealth')
                    .data(nodes)
                    .enter()
                    .append('circle')
                    .attr("cx", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[0]; })
                    .attr("cy", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[1]; })
                    .attr("r", function(n) {return maxHealth(n) / getInnerScale();} )
                    .attr("fill", "red")
                    .attr('class','node-circle')
                    .style("opacity",getDefaultOpacity())
                    .on("mouseout", setDarkRed)
                    .on("mouseover", setLightRed)
                    .on('click', clicked);



                g
                    .selectAll('currentHealth')
                    .data(nodes)
                    .enter()
                    .append('circle')
                    .attr("cx", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[0]; })
                    .attr("cy", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[1]; })
                    .attr("r", function(n) {return n.active_users / getInnerScale();} )
                    .attr("fill", getDarkBlue())
                    .attr('class','node-circle')
                    .style("opacity",getDefaultOpacity())
                    .on("mouseout", setDarkBlue)
                    .on("mouseover", setLightBlue)
                    .on('click', clicked);

                g
                    .selectAll('.node-text')
                    .data(nodes)
                    .enter()
                    .append('text')
                    .attr('class','node-text')
                    .attr("x", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[0]; })
                    .attr("y", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[1]+0.05; })
                    .text(function(n){return n.venue_name});

            });



        });

        function getDefaultOpacity() {
            return 0.9;
        }

        function setLightBlue() {
            d3.select(this).transition()
                .duration(200)
                .style("fill","#1C86EE");
        }

        function setDarkBlue() {
            d3.select(this).transition()
                .duration(200)
                .style("fill", getDarkBlue());
        }

        function setDarkGreen() {
            d3.select(this).transition()
                .duration(200)
                .style("fill", getDarkGreen());
        }


        function setLightGreen() {
            d3.select(this).transition()
                .duration(200)
                .style("fill","#00B200");
        }

        function setLoweropacity() {
            d3.select(this).transition()
                .duration(200)
                .style("opacity",getDefaultOpacity());
        }

        function setMaxOpacity() {
            d3.select(this).transition()
                .duration(200)
                .style("opacity",1);
        }

        function setDarkRed() {
            d3.select(this).transition()
                .duration(200)
                .style("fill", getDarkRed());
        }


        function setLightRed() {
            d3.select(this).transition()
                .duration(200)
                .style("fill","#ff0000");
        }

        function getDarkRed() {
            return "#990000";

        }

        function getDarkBlue() {
            return "#104E8B";

        }

        function getDarkGreen() {
            return "#007f00";
        }


        function move() {
            g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }

        function maxHealth(node) {
            var sum = 0;
            for(var i in node._embedded.layers) {
                sum += node._embedded.layers[i].user_capacity;
            }
            return sum;
        }

        function maxRobustness(node) {
            var sum = 0;
            for(var i in node._embedded.layers) {
                sum += node._embedded.layers[i].max_robustness;
            }
            return sum;
        }

        function currentRobustness(node) {
            var sum = 0;
            for(var i in node._embedded.layers) {
                sum += node._embedded.layers[i].current_robustness;
            }
            return sum;
        }
        var ratio = 30;
        function getInnerScale() {
            return 40000*ratio;
        }

        function getOuterScale() {
            return 50*ratio;
        }

        function getBoundrySize() {
            return 0.5/ratio;
        }

        var active = d3.select(null);
        function clicked(n) {
            active.classed("active", false);
            active = d3.select(this).classed("active", true);
            var d = [n.venue_long, n.venue_lat];
            var pos = projection(d);
            var scale = 0.4 / (0.7/height),
                translate = [width / 2  - scale * pos[0], height / 2  - scale * pos[1]];

            back.classed('none', false);
            g.transition().duration(500).attr("transform", "translate(" + translate + ")scale(" + scale + ")");
        }
        var first = true;
        function reset(d){
            var bounds = path.bounds(d),
                dx = bounds[1][0] - bounds[0][0],
                dy = bounds[1][1] - bounds[0][1],
                x = (bounds[0][0] + bounds[1][0]) / 2,
                y = (bounds[0][1] + bounds[1][1]) / 2,
                scale = .9 / Math.max(dx / width, dy / height),
                translate = [width / 2 - scale * x, height / 2 - scale * y];

            g.transition().duration(first ? 0 : 500).attr("transform", "translate(" + translate + ")scale(" + scale + ")");
            first = false;
            back.classed('none', true);
        }

    }

}).call(this);