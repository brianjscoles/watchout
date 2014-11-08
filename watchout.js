// start slingin' some d3 here.

var height = 500;
var width = 500;
var enemyRadius = 15;
var numEnemies = 10;

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
  .attr("class", "enemy")
  .style("fill", "black");

var enemy2 = playSpace.append("circle")
  .attr("cx", function(){return enemyRadius+Math.random()*(width-enemyRadius*2)})
  .attr("cy", function(){return enemyRadius+Math.random()*(height-enemyRadius*2)})
  .attr("r", enemyRadius)
  .attr("class", "enemy")
  .style("fill", "black");

var drag = d3.behavior.drag()
  .on('drag', function (d) {
      d3.select(this)
      .attr("cx", d3.event.x)
      .attr("cy", d3.event.y);
  });

var player = playSpace.selectAll("#player").data([{cx: width/2,cy:height/2,r:enemyRadius}]).enter().append("circle")
  .attr("cx", function(){return width/2})
  .attr("cy", function(){return height/2})
  .attr("r", enemyRadius)
  .attr("id", "player")
  .style("fill", "purple")
  .call(drag);

var makeNewPosition = function(){
  return enemyRadius+Math.random()*(width-enemyRadius*2);
};

setInterval(function(){
  d3.selectAll(".enemy")
    .each(function(){
    d3.select(this).transition().duration(2000)
    .attr("cx", makeNewPosition())
    .attr("cy", makeNewPosition())
  });
}, 2000);

setInterval(function() {
  checkCollision()
},100);

var checkCollision = function() {
  var enemies = d3.selectAll(".enemy");
  //for enemies....
  //asks each enemy to check if collides with mouse. reset score



};
