"use strict";
var Game = function(obj) {
  g = this;
  this._class = 'Game';
  // Update old fetish settings
  if (obj.tentacles !== undefined) {
    obj.fetishes = { tentacles: obj.tentacles };
    delete obj.tentacles;
  }
  // Trim overly-long old histories
  if (obj.moneyHistory.length > Game.config.moneyHistoryLength) {
    obj.moneyHistory = obj.moneyHistory.slice(obj.moneyHistory.length - Game.config.moneyHistoryLength);
  }
  $.extend(this, obj);
  this.randomSeed = this.randomSeed || Math.random();
};

Game.prototype.nextPayment = function() {
  if (this.day >= Game.config.gameLength) { return false; }
  var pl = Game.config.gameLength / (Game.config.payments.length - 1);
  var day = Math.floor(this.day / pl) * pl + pl;
  return {
    day: day,
    amount: Game.config.payments[day / pl]
  };
};

Game.prototype.render = function() {
  e.invokeAll('GamePreRender', function() {
    $('#content').html(ejs.render($('#game_view_template').html()));
    $('#next').click(function(event) {
      g.nextTurn(event.ctrlKey);
    });
    e.invokeAll('GameRender', function() {
      e.invokeAll('Autorender', $('#content'));
    });
  });
};

Game.prototype.nextTurn = function(noReseed) {
  this.moneyHistory.push(this.money);
  if (this.moneyHistory.length > Game.config.moneyHistoryLength) {
    this.moneyHistory = this.moneyHistory.slice(this.moneyHistory.length - Game.config.moneyHistoryLength);
  }
  if (!noReseed) {
    this.randomSeed = Math.random();
  }
  Math.seedrandom(this.randomSeed);
  e.runSeries([
    function(next) {
      if (g.autosave) { Game.save('Autosave'); }
      next();
    },
    function(next) { e.invokeAll('GamePreDay', next); },
    function(next) { e.invokeAll('GameNextDay', next); },
    function(next) {
      var payment = g.nextPayment();
      g.day += 1;
      if (payment && g.day == payment.day) {
        g.money -= payment.amount;
      }
      next();
    },
    function(next) { e.invokeAll('GamePostDay', next); }
  ], g.render);
};
