//makes a pie donut that expands on mouse over
// needs an array of data
// needs the height and width
// requires nothing on the page
// see css below

// this still needs to display the user name for each block
// pass in an array of hashes?

// var data = [5, 8, 13, 21, 34, 55, 89];
var data = [{
    username: "dom",
    points: 80
}, {
    username: "allison",
    points: 45
}, {
    username: "sami",
    points: 62
}, {
    username: "dexter",
    points: 110
}]
var width = 500,
    height = 500;

popoutPie(data, width, height);

function popoutPie(data, width, height) {

    var points = [];
    var usernames = [];

    data.forEach(function(i) {
        points.push(i.points)
        usernames.push(i.username)
    })

    var outerRadius = height / 2 - 20,
        innerRadius = outerRadius / 4,
        cornerRadius = 40;

    var pie = d3.layout.pie()
        .padAngle(.02);

    var arc = d3.svg.arc()
        .padRadius(outerRadius)
        .innerRadius(innerRadius);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("id", function() {
            return "pie"
        })
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var counter = 0

    svg.selectAll("path")
        .data(pie(points))
        .enter().append("path").attr("id", function(d,i){ return "user" + i;})
        .each(function(d) {
            d.outerRadius = outerRadius - 20;
        })
        .attr("d", arc)
        .on("click", arcTween(outerRadius, 0))
        .text(function(d, i) {
            return usernames[i];
        }).style("color", "red")
        .on("mouseout", arcTween(outerRadius - 20, 150))
        .text(function(d, i) {
            return usernames[i];
        }).style("color", "red");

    svg.selectAll("path").append("p").text(function(d,i) { return usernames[i]; });


    //testing--------------------------




    // svg.append("g")
    //     .attr("class", "labels");
    // svg.append("g")
    //     .attr("class", "lines");
    // svg.append("g")
    //     .attr("class", "slices");
    //
    // var key = function(d, i) {
    //     return usernames[i];
    // };
    //
    // var text = svg.select(".labels").selectAll("text")
    //     .data(pie(points), key);
    //
    // text.enter()
    //     .append("text")
    //     .attr("dy", ".7em")
    //     .text(function(d, i) {
    //         return usernames[i];
    //     });
    //
    // var radius = Math.min(width, height) / 2;
    //
    //
    // var outerArc = d3.svg.arc()
    //     .innerRadius(radius * 0.9)
    //     .outerRadius(radius * 0.9);
    //
    //
    // function midAngle(d) {
    //     return d.startAngle + (d.endAngle - d.startAngle) / 2;
    // }
    //
    // text.transition().duration(1000)
    //     .attrTween("transform", function(d) {
    //         this._current = this._current || d;
    //         var interpolate = d3.interpolate(this._current, d);
    //         this._current = interpolate(0);
    //         return function(t) {
    //             var d2 = interpolate(t);
    //             var pos = outerArc.centroid(d2);
    //             pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
    //             return "translate(" + pos + ")";
    //         };
    //     });
    //
    //
    // text.exit()
    //     .remove();
    //
    // var polyline = svg.select(".lines").selectAll("polyline")
    //     .data(pie(points), key);
    //
    // polyline.enter()
    //     .append("polyline");
    //
    // polyline.transition().duration(1000)
    //     .attrTween("points", function(d) {
    //         this._current = this._current || d;
    //         var interpolate = d3.interpolate(this._current, d);
    //         this._current = interpolate(0);
    //         return function(t) {
    //             var d2 = interpolate(t);
    //             var pos = outerArc.centroid(d2);
    //             pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
    //             return [arc.centroid(d2), outerArc.centroid(d2), pos];
    //         };
    //     });
    //
    // polyline.exit()
    //     .remove();
    //
    //-------------------------------------------

    function arcTween(outerRadius, delay) {
        return function() {
            d3.select(this).transition().delay(delay).attrTween("d", function(d) {
                var i = d3.interpolate(d.outerRadius, outerRadius);
                return function(t) {
                    d.outerRadius = i(t);
                    return arc(d);
                };
            });
        };
    }

}


// path {
//  fill: steelblue;
//  transition: fill 250ms linear;
//  transition-delay: 150ms;
// }
//
// path:hover {
//  fill: lightblue;
//  transition-delay: 0;
// }
