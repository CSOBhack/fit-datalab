(function(){

    var width, height, parseDate, formatPercent, x, y, colors, xAxis, area, stack, svg;
    $.plotInit = function () {

        var margin = {top: 20, right: 20, bottom: 30, left: 0},
            width = $('#timeline').width()
        height = 100;

        parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%L+01:00").parse,
            x = d3.time.scale()
                .range([0, width]);

        y = d3.scale.linear()
            .range([height, 0]);

        xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        area = d3.svg.area()
            .x(function(d) { return x(d.date); })
            .y0(height)
            .y1(function(d) { return y(d.value); });

        svg = d3.select("#timeline").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        $.plotUpdate(null, {
            max : 123,
            values: [{
                date:'2015-03-21T07:20:30.478+01:00', value:100},
                {date:'2015-03-21T07:20:31.633+01:00', value:50},
                {date:'2015-03-21T07:20:32.633+01:00', value:10},
                {date:'2015-03-21T07:20:38.633+01:00', value:30}]
        });

    }
    $.plotUpdate = function (error, data) {
        var allMax = [];
        data.values.forEach(function(d) {
            d.date = parseDate(d.date);
            allMax.push({date: d.date, value:data.max});
        });

        x.domain(d3.extent(data.values, function(d) { return d.date; }));
        y.domain([0, data.max]);

        console.log(data.values);
        svg.append("path")
            .datum(allMax)
            .attr("class", "timeline-bg")
            .attr("d", area).attr('fill','#dd0000')
            .on('click', function(){
                console.log('naow');
            })
        svg.append("path")
            .datum(data.values)
            .attr("class", "timeline-area")
            .attr("d", area).attr('fill','#00ff00');

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    }

}).call(this)