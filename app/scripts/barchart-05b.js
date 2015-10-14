//Width and height
var w = 600;
var h = 300;

var data = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
  11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
var margin = {top: 20, right: 20, bottom: 30, left: 40};
var xScale = d3.scale.ordinal()
  .domain(d3.range(data.length))
  .rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
  .domain([0,d3.max(data)])
  .range([h,0]);

//Create SVG element
var svg = d3.select("body").append("svg")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left");
//Create bars
svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", function(d, i) {
    return xScale(i);
  })
  .attr("y", function(d) {
    return yScale(d);
  })
  .attr("width", xScale.rangeBand())
  .attr("height", function(d) {
    return h-yScale(d);
  })
  .attr("fill", function(d) {
    return "rgb(0, 0, " + ((d3.max(data)-d) * 20+10) + ")";
  })
  .on("mouseover", function(d) {

    //Get this bar's x/y values, then augment for the tooltip
    var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.rangeBand() / 2;
    var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h / 2;

    //Update the tooltip position and value
    d3.select("#tooltip")
      .style("left", xPosition + "px")
      .style("top", yPosition + "px")
      .select("#value")
      .text(d);

    //Show the tooltip
    d3.select("#tooltip").classed("hidden", false);

  })
  .on("mouseout", function() {

    //Hide the tooltip
    d3.select("#tooltip").classed("hidden", true);

  })
  .on("click", function() {
    sortBars();
  });
//Create Y axis
svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + h + ")")
  .call(xAxis);
//Define sort order flag
var sortOrder = false;

//Define sort function
var sortBars = function() {

  //Flip value of sortOrder
  sortOrder = !sortOrder;

  svg.selectAll("rect")
    .sort(function(a, b) {
      if (sortOrder) {
        return d3.ascending(a, b);
      } else {
        return d3.descending(a, b);
      }
    })
    .transition()
    .delay(function(d, i) {
      return i * 50;
    })
    .duration(1000)
    .attr("x", function(d, i) {
      return xScale(i);
    });

};