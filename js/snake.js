(function() {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function () {
    this.dir = "N";
    this.segments = [ new SnakeGame.Coord([4,5]) ];
    this.head = this.segments[0]; //Coord
    this.turns = [];
    // this.tail = this.segments[this.segments.length - 1];
    // this.remove = false;
    //this.segments = head is here[Coord, Coord, Coord]
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
    // this.tail = this.segments[this.segments.length - 1];
    //if no apple
    // this.remove = this.segments[this.segments.length - 1];

    this.segments.pop();
  };

  Snake.prototype.turn = function () {
    // direction = N S W E
    for (var i = this.turns.length - 1; i >= 0; i--) {
      if (this.isOpposite(this.turns[i]) === false) {
        this.dir = this.turns[i];
        // this.head.dir = newDir;
      }
    }
    this.turns = [];
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
    this.turns.push(key);
  };

  Snake.prototype.grow = function (coord) {
    this.segments.push(coord);
  };

})();
