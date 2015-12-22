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
    key('left', function() { that.game.snake.storeTurns("W") });
    key('down', function() { that.game.snake.storeTurns("S") });
    key('right', function() { that.game.snake.storeTurns("E") });
    key('up', function() { that.game.snake.storeTurns("N") });
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
    if (this.checkApple(newsegments[0])) {
      this.game.board.snake.grow(oldsegments[oldsegments.length - 1]);
    }
    this.render(oldsegments, newsegments);
    if (this.selfEatCheck(newsegments) || this.outOfBoundCheck(newsegments)) {
      this.gameOver();
    }
  };

  View.prototype.render = function (oldsegments, newsegments) {
    $("#score").html("Score: " + this.game.score);
    $("#high-score").html("High Score: " + this.game.score);
    var snakeX = newsegments[0].x;
    var snakeY = newsegments[0].y;
    $("#" + snakeX).children("." + snakeY).addClass("snake");
    var removex = _.last(oldsegments).x;
    var removey = _.last(oldsegments).y;
    $("#" + removex).children("." + removey).removeClass("snake");
    this.renderApple();
  };

  View.prototype.checkApple = function (coord) {
    if (coord.equals(this.game.board.apple.coord)) {
      this.game.board.generateApple();
      $(".apple").removeClass("apple");
      this.game.score += 100;
      if (this.game.score > this.game.highScore) {
        this.game.highScore = this.game.score
      }
      return true;
    }
  };

  View.prototype.renderApple = function () {
    var apple = this.game.board.apple;
    var appleX = apple.coord.x;
    var appleY = apple.coord.y;
    $("#" + appleX).children("." + appleY).addClass("apple");
  };

  View.prototype.selfEatCheck = function (segments) {
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

  View.prototype.outOfBoundCheck = function (segments) {
    var head = segments[0];
    if ((head.x < 0 || head.x > 19) || (head.y < 0 || head.y > 19)) {
      return true;
    }
  };

  View.prototype.gameOver = function () {
    this.game.gameOver = true;
    this.interval = window.clearInterval(this.interval);
    $("#game-over").show();
  };

})();
