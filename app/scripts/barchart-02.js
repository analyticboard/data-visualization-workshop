//First Step
/*
d3.select("body")
  .append("p")
  .text("Welcome to Jsconf");
*/
//Second step
/*var data=[1,4,5,2,1];

d3.select("body")
  .data(data)
  .enter()
  .append("p")
  .text("Welcome to Jsconf ");*/

//Third step
/*var data=[1,4,5,2,1];

 d3.select("body")
 .data(data)
 .enter()
 .append("p")
 .text("Welcome to Jsconf ");

console.log(d3.selectAll("p"));
 */

//Four Step
var data=[1,4,5,2,1];

d3.select("body")
  .data(data)
  .enter()
  .append("p")
  .text(function(d) {
    return "Data:" +d;
  })
  .style("color", function(d) {
    if (d > 3) {   //Threshold of 15
      return "red";
    } else {
      return "black";
    }
  });

console.log(d3.selectAll("p"))