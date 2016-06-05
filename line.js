// takes array of hashes with date and points
//requires nothing on the page
// see css below



var data = [{date: "1-May-12", points: 63}, {date: "1-May-13", points: 58},
  {date: "1-May-14", points: 71}, {date: "1-May-15", points: 51}, {date: "1-May-16", points: 48},
  {date: "1-May-17", points: 44}, {date: "1-May-18", points: 46}, {date: "1-May-19", points: 39}]

lineGraph(data);

function lineGraph(data) {
    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    // Parse the date / time  ---- this is wonky
    var parseDate = d3.time.format("%d-%b-%y").parse;
    // Set the ranges
    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(5);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(5);


    // Define the line
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.points); });

    // Adds the svg canvas
    var svg = d3.select("body")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            //  .attr("id", function() {return "valLine"})
        .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");


    data.forEach(function(d) {
      d.date = parseDate(d.date);
      d.points = +d.points;
    });

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.points; })]);


        // Add the valueline path.
    svg.append("path")
      .attr("class", "line")
      .attr("d", valueline(data))
      .attr("id", function() {return "valLine"})

        // Add the X Axis
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

        // Add the Y Axis
    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
}


// .axis path,
// .axis line {
//   fill: none;
//   stroke: grey;
//   stroke-width: 1;
//   shape-rendering: crispEdges;
// }
//
// #valLine {
//   stroke: steelblue;
//   stroke-width: 2;
//   fill: none;
// }
//
// .tick {
//   font-family: sans-serif;
// }
