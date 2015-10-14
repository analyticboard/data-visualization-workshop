var w=600;
var h=300;
var barPadding=1;

var data=[3,5,10,6,4,3,15,18,2,4,5,10,12];
var svg=d3.select("#chart")
  .append("svg")
  .attr("width",w)
  .attr("height",h);

//First Step
/*svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", function(d,i){
    return i*21;
  })
  .attr("y", 0)
  .attr("width", 20)
  .attr("height", 100);
*/

//Second Step
/*svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", function(d,i){
    return i*21;
  })
  .attr("y", 0)
  .attr("width", 20)
  .attr("height", function(d){
    return d*10;
  });
*/
//Third Step
svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("fill", function(d) {
    return "rgb(0, 0, " + (h-d * 10) + ")";
  }) //.attr("fill", "blue")
  .attr("x", function(d,i){
    return i*(w/data.length);
  })
  .attr("y", function(d){
    return h-d*10;
  })
  .attr("width", function(d){
    return (w/data.length)-barPadding;
  })
  .attr("height", function(d){
    return d*10;
  });


svg.selectAll("text")
  .data(data)
  .enter()
  .append("text")
  .text(function(d) {
    return d;
  })
  .attr("x", function(d, i) {
    return i * (w / data.length) + (w / data.length-barPadding) / 2;
  })
  .attr("y", function(d) {
    return h - (d * 10)+14;
  })
  .attr("class","textBar");