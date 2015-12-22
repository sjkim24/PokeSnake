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

})();
