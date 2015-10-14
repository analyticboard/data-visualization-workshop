var w=800;
var h=600;
var svg = d3.select("#graphChart")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

//Step 3
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function (d) {
    return  "<b>name</b>: "+d.name +"<br/> <b>reviews</b>:"+d.reviews +"<br/> <b>avg rating</b>:" + +d["avg-rating"] + "</span>";
  });

svg.call(tip);

//Step 1
d3.json("amazon-sample-200.json", function(error, data) {
  console.log(data);

  var colorScale = d3.scale.linear() //Step 2
    .domain([0, 2.5, 5])
    .range(["white", "yellow", "green"]);

  var force = d3.layout.force()
    .nodes(data.nodes)
    .links(data.edges)
    .linkDistance([50])
    .charge([-80])
    .size([w, h])
    .start();

  var edges = svg.selectAll(".edge")
    .data(data.edges)
    .enter()
    .append("line")
    .attr("class", "edge")
    .style("stroke", "#ccc")
    .style("stroke-width", 1);

  var maxReview=d3.max(data.nodes, function(d) {return d.reviews;}); //Step 2
  var sizeScale = d3.scale.linear().domain([0, maxReview]).rangeRound([5, w/25]); //Step 2
  var nodes = svg.selectAll(".node")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", function (d) {
      return sizeScale(d["reviews"]); //Step 2
    })
    .style("fill", function (d) {
      return colorScale(d["avg-rating"]); //Step 2
    })
    .style("stroke", "black")
    .style("stroke-width",2)
    .call(force.drag)
    .on('mouseover', tip.show) //Step 3
    .on('mouseout', tip.hide); //Step 3


  force.on("tick", function () {

    edges.attr("x1", function (d) {
      return d.source.x;
    })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });

    nodes.attr("cx", function (d) {
      return d.x;
    })
      .attr("cy", function (d) {
        return d.y;
      });

  });
});