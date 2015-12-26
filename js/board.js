(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function ($el, snake) {
    this.width = Math.floor($(window).width() / 50);
    this.height = Math.floor($(window).height() / 50);
    this.setBoard($el);
    this.snake = snake;
    this.apple;
    this.generateApple();
  };

  Board.prototype.setBoard = function ($el) {
    var addSideTree = this.width !== $(window).width() / 50;
    var addBottomTree = this.height !== $(window).height() / 50;
    for (var i = 0; i < this.height; i++) {
      $el.append("<ul id=" + i + "></ul>");
      if (addBottomTree && i === this.height - 1) {
        var height = $(window).height() - (this.height * 50);
        $el.append("<ul class=bottom-tree style=height:" + height + "px></ul>")
      }
      for (var j = 0; j < this.width; j++) {
        var $li = $("<li></li>");
        $li.addClass(j.toString());
        $li.addClass("square");
        $("#" + i).append($li);
        if (addSideTree && j === this.width - 1) {
          var width = $(window).width() - (this.width * 50);
          $("#" + i).append("<li class=side-tree style=width:" + width + "px></li>");
        }
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
