// this function gets passed an array of data and draws bar graphs.
// requires array of hashes with date and points
// see styles below for how to make animations work
// a div with the id of chart must already be in the dom

// var data = [19, 8, 15, 16, 23, 42];
var data = [{
    date: "1-May-12",
    points: 63
}, {
    date: "1-May-13",
    points: 58
}, {
    date: "1-May-14",
    points: 71
}, {
    date: "1-May-15",
    points: 51
}, {
    date: "1-May-16",
    points: 48
}, {
    date: "1-May-17",
    points: 44
}, {
    date: "1-May-18",
    points: 46
}, {
    date: "1-May-19",
    points: 39
}]

barGraph(data);

function barGraph(data) {

    var points = [];
    var dates = [];

    data.forEach(function(i) {
        points.push(i.points)
        dates.push(i.date)
    })

    var x = d3.scale.linear()
        .domain([0, d3.max(points)])
        .range([0, 420]);

    var chart = d3.select(".chart")
        .selectAll("div")
        .data(points)
        .enter().append("div")
        .style("width", 0)
        .transition().style("width", function(d) {
            return d * 10 + "px";
        })
        .text(function(d, i) {
            return dates[i] + "  " + points[i] + " points";
        }).style("color", "lightblue")
        .transition().text(function(d, i) {
            return dates[i] + " " + points[i] + " points";
        }).style("color", "whitesmoke");
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
