// start slingin' some d3 here.

var height = 500;
var width = 500;
var enemyRadius = 15;
var numEnemies = 5;

var playSpace = d3.select(".play-space")
  .style("background-color","lightgrey");

var enemiesArr = [];
for (var i = 0; i < numEnemies; i++) {
  enemiesArr.push(0);
}
var enemy = playSpace.selectAll("circle").data(enemiesArr).enter().append("circle")
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

var player = playSpace.selectAll("#player").data([0]).enter().append("circle")
  .attr("cx", function(){return width/2})
  .attr("cy", function(){return height/2})
  .attr("r", enemyRadius)
  .attr("id", "player")
  .style("fill", "purple")
  .call(drag);

var makeNewPosition = function(){
  return enemyRadius+Math.random()*(width-enemyRadius*2);
};

var moveEnemies = function() {
   d3.selectAll(".enemy")
    .each(function(){
      d3.select(this).transition().duration(2000)
      .attr("cx", makeNewPosition())
      .attr("cy", makeNewPosition())
    });
};
moveEnemies();

setInterval(moveEnemies, 2000);

setInterval(function() {
  checkCollision()
},100);

setInterval(function() {
  var score = d3.selectAll(".current").selectAll("span").text();
  score = Number(score) + 10;
  d3.selectAll(".current").selectAll("span").text(score);
}, 100);

var checkCollision = function() {
  var plCoord = [0, 0];
  var pl = d3.select("#player");

  plCoord[0] = pl[0][0].cx.animVal.value;
  plCoord[1] = pl[0][0].cy.animVal.value;


  var enemies = d3.selectAll(".enemy")
    .each(function() {
      var enemCoord= [];
      enemCoord[0] = this.cx.animVal.value;
      enemCoord[1] = this.cy.animVal.value;

      if ((Math.abs(enemCoord[0]-plCoord[0]) < 2*enemyRadius) &&
          (Math.abs(enemCoord[1]-plCoord[1]) < 2*enemyRadius)) {

          console.log('collision');

          var theScore = Number(d3.selectAll(".current").selectAll("span").text());
          var highScore = Number(d3.selectAll(".high").selectAll("span").text());
          var finalScore = Math.max(theScore, highScore);
          console.log(theScore);
          console.log(highScore);

          if (Number(d3.selectAll(".current").selectAll("span").text()) > 10) {
            var coll = Number(d3.selectAll(".collisions").selectAll("span").text());
            d3.selectAll(".collisions").selectAll("span").text(coll+1);
          }
          console.log(finalScore);
          d3.selectAll(".current").selectAll("span").text(0);
          d3.selectAll(".high").selectAll("span").text(finalScore);


      }
    });

  //for enemies....
  //asks each enemy to check if collides with mouse. reset score



};
