var w=600;
var h=300;
var barPadding=1;

var margin = {top: 20, right: 20, bottom: 30, left: 40};

var data=[3,5,10,6,4,3,15,18,2,4,5,10,12];
var svg=d3.select("#chart")
  .append("svg")
  .attr("width", w + margin.left + margin.right)
  .attr("height", h + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xScale = d3.scale.ordinal()
  .domain(d3.range(data.length))
  .rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
  .domain([0,d3.max(data)])
  .range([h,0]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left");

svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("fill", function(d) {
    return "rgb(0, 0, " + (h-d * 10) + ")";
  }) //.attr("fill", "blue")
  .attr("x", function(d,i){
    return xScale(i);
  })
  .attr("y", function(d){
    return yScale(d);
  })
  .attr("width",  xScale.rangeBand())
  .attr("height", function(d){
    return h-yScale(d);
  });


svg.selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .text(function(d) {
    return d;
  })
  .attr("x", function(d, i) {
    return xScale(i) + xScale.rangeBand() / 2;
  })
  .attr("y", function(d) {
    return yScale(d)+14;
  })
  .attr("class","textBar");

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + h + ")")
  .call(xAxis);

var scaleTest = d3.scale.linear()
  .domain([100, 500])
  .range([-8, 1000]);

console.log("100",scaleTest(100));
console.log("180",scaleTest(180));
console.log("500",scaleTest(500));