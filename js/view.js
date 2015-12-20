(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el) {
    this.$el = $el;
    this.gameover = false;
    this.paused = true;
    this.board = new SnakeGame.Board($el);
    this.interval;
    this.score = 0;
    this.highScore = 0;
    $(window).on("keydown", this.handleKeys.bind(this));

    document.getElementById("start-screen").showModal();
  };

  View.KEYS = {
    32: "startgame",
    37: "W",
    38: "N",
    39: "E",
    40: "S",
    82: "R"

  };

  View.prototype.handleKeys = function (event) {
    var key = View.KEYS[event.keyCode];
    if (key) {
      var diff;
      if (this.gameover === false && this.paused === true && key === "startgame") {
        $("#start-screen").hide();
        this.start();
        return;
      } else if (key === "W") {
        diff = new SnakeGame.Coord([0, 1]);
      } else if (key === "E") {
        diff = new SnakeGame.Coord([0, -1]);
      } else if (key === "N") {
        diff = new SnakeGame.Coord([1, 0]);
      } else if (key === "S") {
        diff = new SnakeGame.Coord([-1, 0]);
      } else if (this.gameover === true && this.paused === true && key === "R") {
        this.restart();
      }
      this.board.snake.storeTurns(key);
    }
  };

  View.prototype.start = function () {
    this.gameover = true;
    this.paused = false;
    this.interval = window.setInterval(this.step.bind(this), 125);
  };

  View.prototype.step = function() {
    this.board.snake.turn();

    var oldsegments = _.clone(this.board.snake.segments);
    this.board.snake.move();
    var newsegments = _.clone(this.board.snake.segments);

    ;
    if (this.checkApple(newsegments[0])) {
      this.board.snake.grow(oldsegments[oldsegments.length - 1]);
    }
    this.render(oldsegments, newsegments);
    this.selfEatCheck(newsegments);
    this.outOfBoundCheck(newsegments);
    $(".score").html(this.score);
  };

  View.prototype.render = function (oldsegments, newsegments) {

    var snakeX = newsegments[0].x;
    var snakeY = newsegments[0].y;
    $("#" + snakeX).children("." + snakeY).addClass("snake");
    this.renderApple();
    var removex = _.last(oldsegments).x;
    var removey = _.last(oldsegments).y;
    $("#" + removex).children("." + removey).removeClass("snake");
  };

  View.prototype.checkApple = function (coord) {
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

  View.prototype.renderApple = function () {
    var apple = this.board.apple;
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
          this.gameOver();
        }
      }
    }
  };

  View.prototype.outOfBoundCheck = function (segments) {
    var head = segments[0];
    if ((head.x < 0 || head.x > 19) || (head.y < 0 || head.y > 19)) {
      this.gameOver();
    }
  };

  View.prototype.gameOver = function () {
    this.gameover = true;
    this.paused = true;
    window.clearInterval(this.interval);
    this.interval = null;
    this.board = new SnakeGame.Board(this.$el);
    $(".snake").removeClass("snake");
    $(".apple").removeClass("apple");
    document.getElementById("game-over").showModal();
  };

  View.prototype.restart = function () {
    this.gameover = false;
    this.pasued = false;
    this.score = 0;
    $("#game-over").hide();
    this.interval = window.setInterval(this.step.bind(this), 125);

  };

})();
