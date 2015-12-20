// (function() {
//
//   if (typeof SnakeGame === "undefined") {
//     window.SnakeGame = {};
//   }
//
//   var Game = SnakeGame.Game = function ($el) {
//     this.$el = $el;
//     this.board = new SnakeGame.Board($("figure"));
//     this.gameover = true;
//     this.score = 0;
//     document.getElementById("start-screen").showModal();
//     $(window).on("keydown", this.handleKeys.bind(this));
//     // $(window).off("keydown");
//   };
//
//
//   Game.prototype.handleKeys = function (event) {
//     var key = event.keyCode;
//     if (this.gameover && key === 32) {
//       $("#start-screen").hide();
//       this.start();
//     }
//   };
//
//   Game.prototype.start = function () {
//     this.gameover = false;
//     this.view = new SnakeGame.View(this.$el, this.board);
//   };
//
//   Game.prototype.gameOver = function () {
//   };
//
//
// })();
