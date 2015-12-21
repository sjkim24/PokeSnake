(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el, game) {
    this.$el = $el;
    this.game = game;
    this.interval;
    // $(window).on("keydown", this.handleKeys.bind(this));
  };

  // View.KEYS = ["W", "N", "E", "S", "R"];

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
    window.clearInterval(window.timer);
    window.timer = null;
    document.getElementById("start-screen").showModal();

  };

  View.prototype.start = function () {
    $("#start-screen").hide();
    this.interval = window.setInterval(this.step.bind(this), 125);
  };


  // View.prototype.handleKeys = function (event) {
  //   var key = View.KEYS[event.keyCode];
  //   debugger
  //   if (_.indexOf(View.KEYS, key !== -1)) {
  //     var diff;
  //     if (key === "W") {
  //       diff = new SnakeGame.Coord([0, 1]);
  //     } else if (key === "E") {
  //       diff = new SnakeGame.Coord([0, -1]);
  //     } else if (key === "N") {
  //       diff = new SnakeGame.Coord([1, 0]);
  //     } else if (key === "S") {
  //       diff = new SnakeGame.Coord([-1, 0]);
  //     } else if (this.gameover === true && this.paused === true && key === "R") {
  //       this.restart();
  //     }
  //     this.board.snake.storeTurns(key);
  //   }
  // };

  View.prototype.setStepInterval = function () {
    this.interval = window.setInterval(this.step.bind(this), 125);
  };

  View.prototype.step = function() {
    // debugger
    this.game.snake.turn();
    var oldsegments = _.clone(this.game.snake.segments);
    this.game.snake.move();
    var newsegments = _.clone(this.game.snake.segments);
    if (this.checkApple(newsegments[0])) {
      this.game.snake.grow(oldsegments[oldsegments.length - 1]);
    }
    this.render(oldsegments, newsegments);
    if (this.selfEatCheck(newsegments) || this.outOfBoundCheck(newsegments)) {
      this.gameOver();
    }
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
    if (coord.equals(this.game.apple.coord)) {
      this.game.generateApple();
      $(".apple").removeClass("apple");
      this.score += 100;
      if (this.score > this.highScore) {
        this.highScore = this.score
      }
      return true;
    }
  };

  View.prototype.renderApple = function () {
    var apple = this.game.apple;
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
    }
  };

  View.prototype.outOfBoundCheck = function (segments) {
    var head = segments[0];
    if ((head.x < 0 || head.x > 19) || (head.y < 0 || head.y > 19)) {
      return true;
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
    $("#game-over").hide();
    this.interval = window.setInterval(this.step.bind(this), 125);
  };

})();
