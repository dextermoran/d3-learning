// this function gets passed an array of data and draws bar graphs.
// it puts the value passed in the graph
// see styles below for how to make animations work
// a div with the id of chart must already be in the dom

var data = [19, 8, 15, 16, 23, 42];
barGraph(data);

function barGraph(data) {
    var x = d3.scale.linear()
        .domain([0, d3.max(data)])
        .range([0, 420]);

    var chart = d3.select(".chart")
      .selectAll("div")
        .data(data)
      .enter().append("div")
          .style("width", 0)
        .transition().style("width", function(d) { return d * 10 + "px"; })
        .text(function(d) { return d; }).style("color", "lightblue")
        .transition().text(function(d) { return d; }).style("color", "whitesmoke");
}


// @keyframes example {
// from {background-color: lightblue;}
// to {background-color: steelblue;}
// }
//
// .chart div {
//   font: 14px sans-serif;
//   color: whitesmoke;
//   background-color: steelblue;
//   text-align: right;
//   padding: 15px;
//   border-radius: 10px;
//   margin: 3px;
//   color: white;
//   animation-name: example;
//   animation-duration: 2s;
//   transition: width 2s;
//   transition: color 2s;
//  }
