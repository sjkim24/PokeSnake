(function() {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Coord = SnakeGame.Coord = function (pos) {
    this.x = pos[0];
    this.y = pos[1];
    this.pos = pos;
  };

  Coord.prototype.equals = function (newCoord) {
    return (_.isEqual(newCoord.pos, this.pos));
  };

})();
