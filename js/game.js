(function() {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Game = SnakeGame.Game = function ($el) {
    this.$el = $el;
    this.board = new SnakeGame.Board($el, new SnakeGame.Snake());
    this.gameOver = false;
    this.score = 0;
    this.highScore = 0;
  };

  Game.prototype.appleCheck = function (coord) {
    if (coord.equals(this.board.apple.coord)) {
      this.board.generateApple();
      $(".apple").removeClass("apple");
      this.score += 100;
      if (this.score > this.highScore) {
        this.highScore = this.score
      }
      return true;
    }
  };

  Game.prototype.selfEatCheck = function (segments) {
    if (segments.length > 1) {
      var head = segments[0];
      var rest = segments.slice(1, segments.length);
      for (var i = 0; i <= rest.length - 1; i++) {
        if (head.equals(rest[i])) {
          return true;
        }
      }

      return false;
    }
  };

  Game.prototype.outOfBoundCheck = function (segments) {
    var head = segments[0];
    if ((head.x < 0 || head.x > 19) || (head.y < 0 || head.y > 19)) {
      return true;
    }
  };

})();
