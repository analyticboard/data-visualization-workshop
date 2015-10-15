var data = {
  nodes: [
    { name: "Brendan" },
    { name: "Raquel" },
    { name: "Alex" },
    { name: "Jenn" },
    { name: "Mathew" },
    { name: "Luis" },
    { name: "Rafael" },
    { name: "Donovan" },
    { name: "Nicolas" },
    { name: "Tim" },
    { name: "Thorsten" },
    { name: "Jaime" },
    { name: "Damian" }
  ],
  edges: [
    { source: 0, target: 1 },
    { source: 0, target: 2 },
    { source: 0, target: 3 },
    { source: 0, target: 4 },
    { source: 1, target: 5 },
    { source: 2, target: 5 },
    { source: 2, target: 5 },
    { source: 3, target: 4 },
    { source: 5, target: 8 },
    { source: 5, target: 9 },
    { source: 6, target: 7 },
    { source: 7, target: 8 },
    { source: 8, target: 9 },
    { source: 9, target: 10 },
    { source: 9, target: 11 },
    { source: 9, target: 12 },
    { source: 10, target: 11 },
    { source: 10, target: 12 },
    { source: 11, target: 12 }
  ]
};
var w=600;
var h=300;
var svg = d3.select("#graphChart")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

var force = d3.layout.force()
  .nodes(data.nodes)
  .links(data.edges)
  .linkDistance([50]) //Step 2
  .charge([-100]) //Step 2
  .size([w, h])
  .start();

var edges = svg.selectAll("line")
  .data(data.edges)
  .enter()
  .append("line")
  .style("stroke", "#ccc")
  .style("stroke-width", 1);

var nodes = svg.selectAll("circle")
  .data(data.nodes)
  .enter()
  .append("circle")
  .attr("r", 10)
  .style("fill", "red")
  .style("stroke","black")
  .call(force.drag);


force.on("tick", function() {

  edges.attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

  nodes.attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; });

});