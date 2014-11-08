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
    d3.event.sourceEvent.preventDefault();
    console.log('hi');
      var theX = d3.event.x;
      var theY =  d3.event.y;
      d3.select(this)
      //.attr('transform', 'translate(' + theX + ',' + theY + ')');
      .attr("cx", theX)
      .attr("cy", theY);
  });
//player with data; [0
//console.log(drag);

//var player = playSpace.append("circle")
 // .datum([{cx:width/2,cy:height/2,r:enemyRadius}])
var player = playSpace.selectAll("#player").data([{cx: width/2,cy:height/2,r:enemyRadius}]).enter().append("circle")
  .attr("cx", function(){return width/2})
  .attr("cy", function(){return height/2})
  .attr("r", enemyRadius)
  .attr("id", "player")
  .style("fill", "purple");
 // .call(drag);
 d3.select('#player').call(drag);
  console.log(player);

var dragTest = function() {
  console.log('hi');
};
// var drag = d3.behavior.drag()
//   .origin(Object)
//   .on("drag",dragMove);

// var dragMove = function(dragged){
//   console.log("hi");
  // var x = d3.select(dragged).attr("cx");
  // var y = d3.select(dragged).attr("cy");
  // var r = d3.select(dragged).attr("r");

  // var newX = Math.min(width, x + d3.event.dx);
  // var newY = Math.min(height, y + d3.event.dy);

  // var draggedCircles = [{"x":newX, "y":newY,"radius":r}];

  // d3.select(dragged)
  //   .data(draggedCircles)
  //   .attr("cx",function(d){return d.x})
  //   .attr("cy",function(d){return d.y})
// };



var makeNewPosition = function(){
  //returns a new coordinate
  return enemyRadius+Math.random()*(width-enemyRadius*2);
};

setInterval(function(){
  //select all circles
  d3.selectAll(".enemy")
    .each(function(){
    //console.log(this);
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


  // console.log(document.getElementsByClass('enemy').getAttribute("cx"));
  // console.log(document.getElementsByClass('enemy').getAttribute("cy"));

};
