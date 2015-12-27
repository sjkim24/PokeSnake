(function() {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function () {
    this.dir = "S";
    this.startX = Math.floor($(window).height() / 100) - 2;
    this.startY = Math.floor($(window).width() / 100);
    this.segments = [ new SnakeGame.Coord([this.startX, this.startY], "snake-head") ];
    this.head = this.segments[0];
    this.turns = [];
  };

  Snake.prototype.move = function () {
    switch (this.dir)
    {
      case "N":
        this.segments.unshift(new SnakeGame.Coord([this.head.x - 1, this.head.y]));
        break;
      case "S":
        this.segments.unshift(new SnakeGame.Coord([this.head.x + 1, this.head.y]));
        break;
      case "W":
        this.segments.unshift(new SnakeGame.Coord([this.head.x, this.head.y - 1]));
        break;
      case "E":
        this.segments.unshift(new SnakeGame.Coord([this.head.x, this.head.y + 1]));
        break;
    }
    this.head = this.segments[0];
    this.segments.pop();
  };

  Snake.prototype.turn = function () {
    for (var i = this.turns.length - 1; i >= 0; i--) {
      if (this.isOpposite(this.turns[i]) === false) {
        this.dir = this.turns[i];
        this.turns = [];
        break;
      }
    }
  };

  Snake.prototype.isOpposite = function (direction) {
    if (this.dir === "N" && direction === "S") {
      return true;
    } else if (this.dir === "S" && direction === "N") {
      return true;
    }else if (this.dir === "W" && direction === "E") {
      return true;
    }else if (this.dir === "E" && direction === "W") {
      return true;
    } else if (direction === undefined) {
      return true;
    }
    return false;
  };

  Snake.prototype.storeTurns = function(key) {
    if (key !== "startgame") {
        this.turns.push(key);
    }
  };

  Snake.prototype.grow = function (coord) {
    this.segments.push(coord);
  };

})();
