var w=600;
var h=300;
var barPadding=1;
var sortOrder='asc';

var margin = {top: 20, right: 20, bottom: 30, left: 40};

var data=[3,5,10,6,4,3,15,18,2,4,5,10,12,4,3,23,12,11,10,9,8];
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

var colorScale=d3.scale.linear()
  .domain([0,d3.max(data)])
  .rangeRound([255,80]);

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
    return "rgb(0, 0, " + (colorScale(d)) + ")";
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
  })
  .on("mouseover", function(d) {
    d3.select(this)
      .attr("fill", "rgb("+ (colorScale(d)) + ",0,0 )");
  })
  .on("mouseout", function(d) {
    d3.select(this)
      .transition()
      .duration(250)
      .attr("fill", "rgb(0, 0, " + (colorScale(d)) + ")");
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

var updateData=function(){
  console.log("clickUpdate");
  var dataLength = data.length;
  data = [];
  for (var i = 0; i < dataLength; i++) {
    var newData = Math.floor(Math.random() * 23)+2;
    data.push(newData);
  }
  yScale.domain([0,d3.max(data)]);

  colorScale.domain([0,d3.max(data)]);

  svg.select(".x.axis")
    .transition()
    .duration(1000)
    .call(xAxis);

  svg.select(".y.axis")
    .transition()
    .duration(1000)
    .call(yAxis);

  svg.selectAll("rect")
    .data(data)
    .transition()
    .duration(500)
    .attr("fill", function(d) {
      return "rgb(0, 0, " + (colorScale(d)) + ")";
    }) //.attr("fill", "blue")
    .attr("y", function(d){
      return yScale(d);
    })
    .attr("height", function(d){
      return h-yScale(d);
    });

  svg.selectAll(".textBar")
    .data(data)
    .transition()
    .duration(500)
    .text(function(d) {
      return d;
    })
    .attr("y", function(d){
      return yScale(d)+14;
    });
};

var sortBars = function() {

  var sortFunction;
  if(sortOrder==='asc'){
    sortFunction=function(a,b){
      return d3.ascending(a, b);
    };
    sortOrder='des';
  }else{
    sortFunction=function(a,b){
      return d3.descending(a, b);
    };
    sortOrder='asc';
  }

  svg.selectAll("rect")
    .sort(function(a, b) {
      return sortFunction(a,b);
    })
    .transition()
    .duration(1000)
    .attr("x", function(d, i) {
      return xScale(i);
    });

  svg.selectAll(".textBar")
    .sort(function(a, b) {
      return sortFunction(a,b);
    })
    .transition()
    .duration(1000)
    .attr("x", function(d, i) {
      return xScale(i) + xScale.rangeBand() / 2;
    });

};