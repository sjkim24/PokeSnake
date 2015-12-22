(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el, game) {
    this.$el = $el;
    this.game = game;
    this.interval;
  };

  View.prototype.bindKeyHandlers = function () {
    that = this;
    key('left', function() { that.game.board.snake.storeTurns("W") });
    key('down', function() { that.game.board.snake.storeTurns("S") });
    key('right', function() { that.game.board.snake.storeTurns("E") });
    key('up', function() { that.game.board.snake.storeTurns("N") });
    key('space', function() { that.start() });
  };

  View.prototype.startScreen = function () {
    this.bindKeyHandlers();
    $("#score").html("Score: " + this.game.score);
    $("#high-score").html("High Score: " + this.game.score);
    window.clearInterval(this.interval);
  };

  View.prototype.start = function () {
    this.game.score = 0;
    if (this.game.gameOver) {
      $("#game-over").hide();
      this.game.board.resetBoard();
    } else {
      $("#start-screen").hide();
    }
    this.interval = window.setInterval(this.step.bind(this), 125);
  };

  View.prototype.setStepInterval = function () {
    this.interval = window.setInterval(this.step.bind(this), 125);
  };

  View.prototype.step = function() {
    this.game.board.snake.turn();
    var oldsegments = _.clone(this.game.board.snake.segments);
    this.game.board.snake.move();
    var newsegments = _.clone(this.game.board.snake.segments);
    if (this.game.appleCheck(newsegments[0])) {
      this.game.board.snake.grow(oldsegments[oldsegments.length - 1]);
    }
    this.render(oldsegments, newsegments);
    if (this.game.selfEatCheck(newsegments) || this.game.outOfBoundCheck(newsegments)) {
      this.gameOver();
    }
  };

  View.prototype.render = function (oldsegments, newsegments) {
    $("#score").html("Score: " + this.game.score);
    $("#high-score").html("High Score: " + this.game.highScore);
    var removex = _.last(oldsegments).x;
    var removey = _.last(oldsegments).y;
    $("#" + removex).children("." + removey).removeClass("snake");
    var snakeX = newsegments[0].x;
    var snakeY = newsegments[0].y;
    $("#" + snakeX).children("." + snakeY).addClass("snake");
    if ($(".apple").length === 0) {
      this.renderApple();
    }
  };

  View.prototype.renderApple = function () {
    var apple = this.game.board.apple;
    var appleX = apple.coord.x;
    var appleY = apple.coord.y;
    $("#" + appleX).children("." + appleY).addClass("apple");
  };

  View.prototype.gameOver = function () {
    this.game.gameOver = true;
    this.interval = window.clearInterval(this.interval);
    $("#game-over").show();
  };

})();
