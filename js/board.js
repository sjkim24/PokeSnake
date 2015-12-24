(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function ($el, snake) {
    this.dim = 10;
    this.setBoard($el);
    this.snake = snake;
    this.apple;
    this.generateApple();
  };

  Board.prototype.setBoard = function ($el) {
    for (var i = 0; i < this.dim; i++) {
      $el.append("<ul id=" + i + "></ul>");
      for (var j = 0; j < this.dim; j++) {
        $("#" + i).append("<li class=" + j + "></li>");
      }
    }
  };

  Board.prototype.resetBoard = function () {
    $(".snake").removeClass("snake");
    $(".apple").removeClass("apple");
    this.snake = new SnakeGame.Snake ();
    this.generateApple();
  };

  Board.prototype.randomCoord = function () {
    var x = Math.floor(Math.random() * this.dim);
    var y = Math.floor(Math.random() * this.dim);
    return [x, y]
  };

  Board.prototype.validCoord = function () {
    var randomCoord = this.randomCoord();
    var x = randomCoord[0];
    var y = randomCoord[1];
    var validCoord = !_.any(this.snake.segments, function (coord) {
      return (coord.x === x && coord.y === y);
    });
    if (validCoord) {
      return [x, y];
    }
  };

  Board.prototype.generateApple = function () {
    var appleCoord;
    while (!appleCoord) {
      appleCoord = this.validCoord();
    }
    var apple = new SnakeGame.Apple(new SnakeGame.Coord(appleCoord));
    this.apple = apple;
  };

})();
