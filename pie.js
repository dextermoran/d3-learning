//makes a pie donut that expands on mouse over
// needs an array of data
// needs the height and width
// requires nothing on the page
// see css below

// this still needs to display the user name for each block
// pass in an array of hashes?

// var data = [5, 8, 13, 21, 34, 55, 89];
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
    var colors = ['#00040D', '#65756B', '#9EA792', '#333B3D'];

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

    svg.selectAll("path")
        .data(pie(points))
        .enter().append("path")
        .each(function(d) {
            d.outerRadius = outerRadius - 20;
        })
        .attr("d", arc)
        .on("mouseover", arcTween(outerRadius, 0))
        .attr("fill", function(d, i) {
            return colors[i];
        })
        .on("mouseout", arcTween(outerRadius - 20, 150));

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
