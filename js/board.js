(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Board = SnakeGame.Board = function ($el, snake) {
    this.maxX = Math.floor(($(window).height() - 30) / 50);
    this.maxY = Math.floor($(window).width() / 50);
    this.setBoard($el);
    this.snake = snake;
    this.pokemon;
    this.apple;
    this.generateApple();
    this.pieces;
  };

  Board.prototype.setBoard = function ($el) {
    var addSideTree = this.maxY !== $(window).width() / 50;
    var addBottomTree = this.maxX !== $(window).height() / 50;
    for (var i = 0; i < this.maxX; i++) {
      $el.append("<ul id=" + i + "></ul>");
      if (addBottomTree && i === this.maxX - 1) {
        var height = $(window).height() - (this.maxX * 50) - 30;
        $el.append("<ul class=bottom-tree style=height:" + height + "px></ul>")
      }
      for (var j = 0; j < this.maxY; j++) {
        var $li = $("<li></li>");
        $li.addClass(j.toString());
        $li.addClass("square");
        $("#" + i).append($li);
        if (addSideTree && j === this.maxY - 1) {
          var width = $(window).width() - (this.maxY * 50);
          $("#" + i).append("<li class=side-tree style=width:" + width + "px></li>");
        }
      }
    }
  };

  Board.prototype.resetBoard = function (pokemon) {
    this.pokemon = pokemon;
    $(".blue").removeClass("blue N E S W");
    $("." + this.pokemon[0]).removeClass(this.pokemon[0] + " N E S W");
    $("." + this.pokemon[1]).removeClass(this.pokemon[1] + " N E S W");
    $("." + this.pokemon[2]).removeClass(this.pokemon[2] + " N E S W");
    $(".apple").removeClass("apple");
    this.snake = new SnakeGame.Snake ();
    this.generateApple();
  };

  Board.prototype.randomCoord = function () {
    var x = Math.floor(Math.random() * this.maxX);
    var y = Math.floor(Math.random() * this.maxY);
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
