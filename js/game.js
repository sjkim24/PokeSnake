(function() {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Game = SnakeGame.Game = function ($el) {
    this.$el = $el;
    this.view = new SnakeGame.View ($el);
    this.gameover = false;
    this.paused = true;
    this.score = 0;
    document.getElementById("start-screen").showModal();
    $(window).on("keydown", this.handleKeys.bind(this));
    // $(window).off("keydown");
  };


  Game.prototype.handleKeys = function (event) {
    var key = event.keyCode;
    if (this.gameover && key === 32) {
      $("#start-screen").hide();
      this.start();
    }
  };

  Game.prototype.start = function () {
    this.gameover = false;
    this.interval = window.setInterval(this.step.bind(this), 125);
  };

  Game.prototype.gameOver = function () {
  };


})();
