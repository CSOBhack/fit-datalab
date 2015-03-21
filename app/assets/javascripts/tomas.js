czk
    .selectAll('maxRobustness')
    .data(nodes)
    .enter()
    .append('circle')
    .attr("cx", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[0]; })
    .attr("cy", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[1]; })
    .attr("r", function(n) {return maxHealth(n)/getInnerScale() + maxRobustness(n) / getOuterScale();} )
    .attr("fill", "red")
    .style("opacity",getDefaultOpacity())
    .on("mouseout", setLoweropacity)
    .on("mouseover", setMaxOpacity)


czk
    .selectAll('currentRobustness')
    .data(nodes)
    .enter()
    .append('circle')
    .attr("cx", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[0]; })
    .attr("cy", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[1]; })
    .attr("r", function(n) {return maxHealth(n)/getInnerScale() + currentRobustness(n) / getOuterScale();} )
    .attr("fill", "green")
    .style("opacity",getDefaultOpacity())
    .on("mouseout", setLoweropacity)
    .on("mouseover", setMaxOpacity);


czk
    .selectAll('boundry')
    .data(nodes)
    .enter()
    .append('circle')
    .attr("cx", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[0]; })
    .attr("cy", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[1]; })
    .attr("r", function(n) {return maxHealth(n)/getInnerScale() + getBoundrySize();} )
    .attr("fill", "white")


czk
    .selectAll('maxHealth')
    .data(nodes)
    .enter()
    .append('circle')
    .attr("cx", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[0]; })
    .attr("cy", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[1]; })
    .attr("r", function(n) {return maxHealth(n) / getInnerScale();} )
    .attr("fill", "red")
    .style("opacity",getDefaultOpacity())
    .on("mouseout", setLoweropacity)
    .on("mouseover", setMaxOpacity);



czk
    .selectAll('currentHealth')
    .data(nodes)
    .enter()
    .append('circle')
    .attr("cx", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[0]; })
    .attr("cy", function (n) { var d = [n.venue_long, n.venue_lat]; return projection(d)[1]; })
    .attr("r", function(n) {return n.active_users / getInnerScale();} )
    .attr("fill", "#00688B")
    .style("opacity",getDefaultOpacity())
    .on("mouseout", setLoweropacity)
    .on("mouseover", setMaxOpacity);
});



});

function getDefaultOpacity() {
    return 0.8;
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

function getInnerScale() {
    return 40000;
}

function getOuterScale() {
    return 50;
}

function getBoundrySize() {
    return 1;
}