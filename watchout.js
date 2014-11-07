// start slingin' some d3 here.

var height = 500;
var width = 500;
var enemyRadius = 15;

var playSpace = d3.select(".play-space")
  .style("background-color","lightgrey");

// var enemySVG = playSpace.append("svg")
//   .attr("width", 30)
//   .attr("height", 30)
//   .attr("x", function(){return Math.random()*width})
//   .attr("y", function(){return Math.random()*height})
//   .attr("position","relative")

var enemy = playSpace.append("circle")
  .attr("cx", function(){return enemyRadius+Math.random()*(width-enemyRadius*2)})
  .attr("cy", function(){return enemyRadius+Math.random()*(height-enemyRadius*2)})
  .attr("r", enemyRadius)
  .attr("id", "enemy")
  .style("fill", "black");


var makeNewPosition = function(){
  //returns a new coordinate
  return enemyRadius+Math.random()*(width-enemyRadius*2);
};

setInterval(function(){
  //select all circles
  d3.selectAll("circle")
    .transition().duration(2000)
    .attr("cx", makeNewPosition())
    .attr("cy", makeNewPosition())
}, 2000);

setInterval(function() {
  // d3.selectAll("circle")
  // .call(getPos(this));
  checkCollision()
},100);

var checkCollision = function() {
  //asks each enemy to check if collides with mouse. reset score
  console.log(document.getElementById('enemy').getAttribute("cx"));
  console.log(document.getElementById('enemy').getAttribute("cy"));

};
