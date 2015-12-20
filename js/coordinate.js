(function() {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }


  var Coord = SnakeGame.Coord = function (pos, dir) {
    this.x = pos[0];
    this.y = pos[1];
    this.pos = pos;
  };


  Coord.prototype.plus = function (delta) {
    //delta is change of pos (-1, 0)
    this.x += delta.x;
    this.y += delta.y;
    return this;
  };

  Coord.prototype.equals = function (newCoord) {
    return (_.isEqual(newCoord.pos, this.pos));
  };

  Coord.prototype.gameovertest = function () {
    console.log("over")
  };



  // [snakegame.coord.x, snakegame.coord.y] === [x,y]



})();
