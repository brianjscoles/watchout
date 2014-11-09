// start slingin' some d3 here.

var height = 500;
var width = 500;
var enemyRadius = 15;
var numEnemies = 15;
var highScore = 0;
var currScore = 0;
var collisions = 0;
var duration = 2000;
var hasCollidedRecently = false;
var plCoord = [width/2,height/2];
var playSpace = d3.select(".play-space")
  .style("background-color","lightgrey");

var makeNewPosition = function(){
  return enemyRadius+Math.random()*(width-enemyRadius*2);
};

var randomSpeed = function(){
  return Math.random()*duration/4 + duration*3/4;
};

var drag = d3.behavior.drag()
  .on('drag', function (d) {
    if (d3.event.x > enemyRadius && d3.event.x < width - enemyRadius &&
      d3.event.y > enemyRadius && d3.event.y < height - enemyRadius) {
      plCoord= [d3.event.x,d3.event.y];
      d3.select(this)
      .attr("cx", plCoord[0])
      .attr("cy", plCoord[1]);
    }
  });

var enemy = playSpace.selectAll("circle").data(d3.range(numEnemies)).enter().append("circle")
  .attr("cx", makeNewPosition)
  .attr("cy", makeNewPosition)
  .attr("r", enemyRadius)
  .attr("class", "enemy")
  .style("fill", "black");


var player = playSpace.selectAll("#player").data([0]).enter().append("circle")
  .attr("cx", plCoord[0])
  .attr("cy", plCoord[1])
  .attr("r", enemyRadius)
  .attr("id", "player")
  .style("fill", "purple")
  .call(drag);

var moveEnemies = function(element) {
  element.transition().duration(randomSpeed)
    .attr("cx", makeNewPosition)
    .attr("cy", makeNewPosition)
    .each('end', function() {
      moveEnemies(d3.select(this));
    });
};

var incrScore = function() {
  currScore += 1;
  d3.selectAll(".current").selectAll("span").text(currScore);
};

var checkCollision = function() {
  var collisionThisCycle = false;
  d3.selectAll(".enemy")
    .each(function() {
      //if collision detected:
      if ((Math.abs(this.cx.animVal.value-plCoord[0]) < 2*enemyRadius) &&
          (Math.abs(this.cy.animVal.value-plCoord[1]) < 2*enemyRadius)) {

        collisionThisCycle = true;

        //if this is the first collision in "a while", update count
        if (!hasCollidedRecently) {
          d3.selectAll(".collisions").selectAll("span").text(++collisions);
        }

        //update highscore and currentscore
        highScore = Math.max(currScore, highScore);
        currScore = 0;
        d3.selectAll(".current").selectAll("span").text(currScore);
        d3.selectAll(".high").selectAll("span").text(highScore);
      }
    });
  hasCollidedRecently = collisionThisCycle;
};

d3.timer(incrScore);
d3.timer(checkCollision);
moveEnemies(d3.selectAll(".enemy"));




