(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el, game) {
    this.$el = $el;
    this.game = game;
    this.interval;
    this.audio;
  };

  View.prototype.bindKeyHandlers = function () {
    that = this;
    key("left", function () { that.game.board.snake.storeTurns("W") });
    key("down", function () { that.game.board.snake.storeTurns("S") });
    key("right", function () { that.game.board.snake.storeTurns("E") });
    key("up", function () { that.game.board.snake.storeTurns("N") });
    key("space", function () { that.start() });
  };

  View.prototype.startScreen = function () {
    this.bindKeyHandlers();
    $("#level").html("Lv: " + this.game.level);
    $("#best-level").html("Best Lv: " + this.game.level);
    $("#start-screen-audio").attr("loop", "loop");
    $("#start-screen-audio")[0].play();
    window.clearInterval(this.interval);
  };

  View.prototype.start = function () {
    var that = this;



    $("#start-screen-audio")[0].pause();
    if (this.game.gameOver && this.game.paused) {
      this.game.level = 0;
      $("#game-over").hide();
      this.game.board.resetBoard();
      this.game.paused = false;
      this.interval = window.setInterval(this.step.bind(this), 150);
    } else if (!this.game.gameOver && this.game.paused) {
      this.game.level = 0;
      $("#start-screen").hide();
      $("#choose").show();
      // $("#starting").show();
      // this.game.paused = false;
      // window.setTimeout(function () {
      //   $("#starting").hide();
      //   that.interval = window.setInterval(that.step.bind(that), 150);
      // }, 3000)
    }
  };

  View.prototype.step = function() {
    var ateApple = false;
    this.game.board.snake.turn();
    var oldsegments = _.clone(this.game.board.snake.segments);
    this.game.board.snake.move();
    var newsegments = _.clone(this.game.board.snake.segments);
    if (this.game.appleCheck(newsegments[0])) {
      ateApple = true;
      this.game.board.snake.grow(oldsegments[oldsegments.length - 1]);
    } else if (this.game.selfEatCheck(newsegments) || this.game.outOfBoundCheck(newsegments)) {
      this.gameOver();
    }

    this.render(oldsegments, this.game.board.snake.segments, ateApple);
  };

  View.prototype.render = function (oldsegments, newsegments, ateApple) {
    $("#level").html("Lv: " + this.game.level);
    $("#best-level").html("Best Lv: " + this.game.bestLevel);
    for (var i = 0; i < oldsegments.length; i++) {
      var removex = oldsegments[i].x;
      var removey = oldsegments[i].y;
      if (oldsegments.length === 1 && ateApple) {
        $("#" + removex).children("." + removey).removeClass("blue");
      } else if (oldsegments.length == 1) {
        $("#" + removex).children("." + removey).removeClass("blue N S E W");
      } else {
        if (i === 0) {
          $("#" + removex).children("." + removey).removeClass("blue");
        } else if (i == oldsegments.length - 1 && !ateApple) {
          if (this.game.level < 3) {
            $("#" + removex).children("." + removey).removeClass("charmander N S E W");
          } else if (this.game.level === 3 && ateApple) {
            $("#" + removex).children("." + removey).removeClass("charmander N S E W");
          } else if (this.game.level >= 3 && this.game.level < 9) {
            $("#" + removex).children("." + removey).removeClass("charmeleon N S E W");
          } else if (this.game.level === 9 && ateApple) {
            $("#" + removex).children("." + removey).removeClass("charmeleon N S E W");
          } else {
            $("#" + removex).children("." + removey).removeClass("charizard N S E W");
          }
        } else {
          if (this.game.level <= 3) {
            $("#" + removex).children("." + removey).removeClass("charmander");
          } else if (this.game.level >= 3 && this.game.level <= 9) {
            $("#" + removex).children("." + removey).removeClass("charmeleon");
          } else {
            $("#" + removex).children("." + removey).removeClass("charizard");
          }
        }
      }
    }

    for (var i = 0; i < newsegments.length; i++) {
      var snakeX = newsegments[i].x;
      var snakeY = newsegments[i].y;
      if (i === 0) {
        $("#" + snakeX).children("." + snakeY).addClass("blue " + this.game.board.snake.dir);
      } else {
        if (this.game.level < 3) {
          $("#" + snakeX).children("." + snakeY).addClass("charmander");
        } else if (this.game.level >= 3 && this.game.level < 9) {
          $("#" + snakeX).children("." + snakeY).addClass("charmeleon");
        } else {
          $("#" + snakeX).children("." + snakeY).addClass("charizard");
        }
      }
    }
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
    $("#game-start-audio").animate({ volume: 0.0 }, 2000)
    this.game.gameOver = true;
    this.game.paused = true;
    this.interval = window.clearInterval(this.interval);
    $("#game-over").show();
  };

})();
