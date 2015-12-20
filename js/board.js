(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function (figure) {
    this.dim = 20;
    this.setBoard(figure);
    this.snake = new SnakeGame.Snake();
    this.generateApple();
  };

  Board.prototype.setBoard = function(figure) {
    for (var i = 0; i < this.dim; i++) {
      figure.append("<ul id=" + i + "></ul>");
      for (var j = 0; j < this.dim; j++) {
        $("#" + i).append("<li class=" + j + "></li>");
      }
    }
  };

  Board.prototype.randomPair = function () {
    var x = Math.floor(Math.random() * this.dim);
    var y = Math.floor(Math.random() * this.dim);
    var validPos = !_.any(this.snake.segments, function (coord) {
      return (coord.x === x && coord.y === y);
    });
    if (validPos) {
      return [x, y];
    }
  };

  Board.prototype.generateApple = function () {
    var newAppleCoord;
    while (!newAppleCoord) {

      newAppleCoord = this.randomPair();
    }
    // var segments = this.snake.segments;
    var apple = new SnakeGame.Apple(new SnakeGame.Coord(newAppleCoord));
    this.apple = apple;
  };




})();
