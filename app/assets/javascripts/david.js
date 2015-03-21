(function () {

    var width, height, parseDate, formatPercent, x, y, colors, xAxis, area, stack, svg, bgPath, fgPath, addedAxis;
    var plotData = null;
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
            .x(function (d) {
                return x(d.date);
            })
            .y0(height)
            .y1(function (d) {
                return y(d.value);
            });

        svg = d3.select("#timeline").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        bgPath = svg.append("path");
        fgPath = svg.append('path');

        plotData = [
            {
                id: 10,
                max: 123,
                values: [{
                    date: '2015-03-21T07:20:30.478+01:00', value: 100
                },
                    {date: '2015-03-21T07:20:31.633+01:00', value: 50},
                    {date: '2015-03-21T07:20:32.633+01:00', value: 10},
                    {date: '2015-03-21T07:20:38.633+01:00', value: 30}]
            }, {
                id: 10,
                max: 95,
                values: [{
                    date: '2015-03-21T07:20:30.478+01:00', value: 50
                },
                    {date: '2015-03-21T07:20:31.633+01:00', value: 70},
                    {date: '2015-03-21T07:20:32.633+01:00', value: 60},
                    {date: '2015-03-21T07:20:38.633+01:00', value: 90}]
            }, {
                id: 'all',
                max: 95,
                values: [{
                    date: '2015-03-21T07:20:30.478+01:00', value: 50
                },
                    {date: '2015-03-21T08:20:31.633+01:00', value: 70},
                    {date: '2015-03-21T12:20:32.633+01:00', value: 60},
                    {date: '2015-03-21T19:20:38.633+01:00', value: 90}]
            }
        ];

        addedAxis = svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")

        $.plotUpdate('all');
    }
    $.plotUpdate = function (nodeId) {
        var allMax = [];
        var data = [];
        var max = 0;

        plotData.forEach(function (d) {
            if (d.id != nodeId) return;
            max = d.max;
            d.values.forEach(function (d) {
                if (typeof d.date == 'string')
                    d.date = parseDate(d.date);
                allMax.push({date: d.date, value: max});
                data.push({date: d.date, value: d.value});
            });
        });

        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));
        y.domain([0, max]);

        console.log(data);
        bgPath
            .datum(allMax)
            .attr("class", "timeline-bg")
            .attr("d", area).attr('fill', '#dd0000')
            .on('click', function () {
                console.log('naow');
            })
        fgPath
            .datum(data)
            .attr("class", "timeline-area")
            .attr("d", area).attr('fill', '#00ff00');

        addedAxis.call(xAxis);

    }

}).call(this)