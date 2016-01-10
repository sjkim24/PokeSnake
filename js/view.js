(function () {

  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el, game) {
    this.$el = $el;
    this.game = game;
    this.interval;
    this.audio;
    this.pokemon;
  };

  View.prototype.bindKeyHandlers = function () {
    that = this;
    key("left", function () { that.game.board.snake.storeTurns("W") });
    key("down", function () { that.game.board.snake.storeTurns("S") });
    key("right", function () { that.game.board.snake.storeTurns("E") });
    key("up", function () { that.game.board.snake.storeTurns("N") });
    key("space", function () { that.chooseScreen() });
    key("r", function () { that.restart() });
    key("b", function () { that.choosePokemon("bulbasaur") });
    key("s", function () { that.choosePokemon("squirtle") });
    key("c", function () { that.choosePokemon("charmander") });
  };

  View.prototype.startScreen = function () {
    this.bindKeyHandlers();
    $("#level").html("Lv: " + this.game.level);
    $("#best-level").html("Best Lv: " + this.game.level);
    $("#start-screen-audio").attr("loop", "loop");
    $("#start-screen-audio")[0].play();
    window.clearInterval(this.interval);
  };

  View.prototype.chooseScreen = function () {
    if (!this.game.gameOver && this.game.paused) {
      $("#start-screen").hide();
      $("#choose").show();
    }
  };

  View.prototype.choosePokemon = function (pokemon) {
    var that = this;
    $("#" + pokemon).css("background-image", "url(./assets/" + pokemon + "c2.png)");

    if (pokemon === "bulbasaur") {
      $("#bulbasaur-sound")[0].play();
      this.pokemon = ["bulbasaur", "ivysaur", "venusaur"];
    } else if (pokemon === "squirtle") {
      $("#squirtle-sound")[0].play();
      this.pokemon = ["squirtle", "wartortle", "blastoise"];
    } else if (pokemon === "charmander") {
      $("#charmander-sound")[0].play();
      this.pokemon = ["charmander", "charmeleon", "charizard"];
    }

    window.setTimeout(function () {
      that.start(pokemon);
    }, 2000);
  };

  View.prototype.start = function (pokemon) {
    var that = this;
    $("#choose").hide();
    $("#start-screen-audio")[0].pause();
    if (!this.game.gameOver && this.game.paused) {
      this.game.level = 0;
      $("#starting").show();
      this.game.paused = false;
      window.setTimeout(function () {
        $("#starting").hide();
        that.interval = window.setInterval(that.step.bind(that), 175);
      }, 2500)
    }
  };

  View.prototype.restart = function () {
    if (this.game.gameOver && this.game.paused) {
      this.game.level = 0;
      $("#game-over").hide();
      this.game.board.resetBoard(this.pokemon);
      this.game.paused = false;
      this.interval = window.setInterval(this.step.bind(this), 150);
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
            $("#" + removex).children("." + removey).removeClass(this.pokemon[0] + " N S E W");
          } else if (this.game.level === 3 && ateApple) {
            $("#" + removex).children("." + removey).removeClass(this.pokemon[0] + " N S E W");
          } else if (this.game.level >= 3 && this.game.level < 9) {
            $("#" + removex).children("." + removey).removeClass(this.pokemon[1] + " N S E W");
          } else if (this.game.level === 9 && ateApple) {
            $("#" + removex).children("." + removey).removeClass(this.pokemon[1] + " N S E W");
          } else {
            $("#" + removex).children("." + removey).removeClass(this.pokemon[2] + " N S E W");
          }
        } else {
          if (this.game.level <= 3) {
            $("#" + removex).children("." + removey).removeClass(this.pokemon[0]);
          } else if (this.game.level >= 3 && this.game.level <= 9) {
            $("#" + removex).children("." + removey).removeClass(this.pokemon[1]);
          } else {
            $("#" + removex).children("." + removey).removeClass(this.pokemon[2]);
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
          $("#" + snakeX).children("." + snakeY).addClass(this.pokemon[0]);
        } else if (this.game.level >= 3 && this.game.level < 9) {
          $("#" + snakeX).children("." + snakeY).addClass(this.pokemon[1]);
        } else {
          $("#" + snakeX).children("." + snakeY).addClass(this.pokemon[2]);
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
