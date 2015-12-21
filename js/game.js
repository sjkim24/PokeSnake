(function() {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Game = SnakeGame.Game = function ($el) {
    this.$el = $el;
    this.snake = new SnakeGame.Snake();
    this.apple;
    this.board = new SnakeGame.Board($el, this.snake);
    this.generateApple();
    this.gameover = false;
    this.paused = true;
    this.score = 0;
    this.highScore = 0;
    // $(window).on("keydown", this.handleKeys.bind(this));
  };

  Game.prototype.generateApple = function () {
    var appleCoord;
    if (this.board) {
      while (!appleCoord) {
        appleCoord = this.board.validCoord();
      }
    }
    var apple = new SnakeGame.Apple(new SnakeGame.Coord(appleCoord));
    this.apple = apple;
  };

  // Game.prototype.start = function () {
  //   this.gameover = false;
  //   this.paused = true;
  //   this.view.setStepInterval();
  // };

})();
