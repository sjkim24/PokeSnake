(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function ($el, snake) {
    this.dim = 10;
    this.width = Math.floor($(window).width() / 50);
    this.height = Math.floor($(window).height() / 50);
    this.setBoard($el);
    this.snake = snake;
    this.apple;
    this.generateApple();
  };

  Board.prototype.setBoard = function ($el) {
    for (var i = 0; i < Math.floor(this.height); i++) {
      $el.append("<ul id=" + i + "></ul>");
      for (var j = 0; j < Math.floor(this.width); j++) {
        $("#" + i).append("<li class=" + j + "></li>");
      }
    }
  };

  Board.prototype.resetBoard = function () {
    $(".blue").removeClass("blue charmander N E S W");
    $(".charmander").removeClass("blue charmander N E S W");
    $(".apple").removeClass("apple");
    this.snake = new SnakeGame.Snake ();
    this.generateApple();
  };

  Board.prototype.randomCoord = function () {
    var x = Math.floor(Math.random() * this.height);
    var y = Math.floor(Math.random() * this.width);
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
