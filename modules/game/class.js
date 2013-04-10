"use strict";
function Game(obj) {
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
  obj.player = obj.player || {};
  $.extend(this, obj);
  this.randomSeed = this.randomSeed || Math.random();
}

Game.prototype.render = function render() {
  e.invokeAll('GamePreRender', function donePreRender() {
    $('#content').html(e.render('view-game'));
    $('#next').click(function nextTurn(event) {
      g.nextTurn(event.ctrlKey);
    });
    e.invokeAll('GameRender', function doneRender() {
      e.invokeAll('Autorender', $('#content'));
    });
  });
};

Game.prototype.nextTurn = function nextTurn(noReseed) {
  this.moneyHistory.push(this.money);
  if (this.moneyHistory.length > Game.config.moneyHistoryLength) {
    this.moneyHistory = this.moneyHistory.slice(this.moneyHistory.length - Game.config.moneyHistoryLength);
  }
  if (!noReseed) {
    this.randomSeed = Math.random();
  }
  Math.seedrandom(this.randomSeed);
  e.runSeries([
    function autosave(next) {
      if (g.autosave) { Game.save('Autosave'); }
      next();
    },
    function doPreDay(next) { e.invokeAll('GamePreDay', next); },
    function doNextDay(next) { e.invokeAll('GameNextDay', next); },
    function incrementDay(next) {
      g.day += 1;
      next();
    },
    function doPostDay(next) { e.invokeAll('GamePostDay', next); }
  ], g.render);
};

Game.prototype.averageIncome = function averageIncome() {
  var diff = 0;
  var items = 0;
  var old = this.moneyHistory[0];
  for (var i in this.moneyHistory) {
    if (this.moneyHistory[i] > old) {
      diff += this.moneyHistory[i] - old;
      items++;
    }
    old = g.moneyHistory[i];
  }
  items = Math.max(items, 7);
  return Math.floor(diff / items);
};

Game.prototype.gameOver = function gameOver(text, image) {
  var options = [{
    label: 'Game Over',
    title: 'Oops',
    key: ''
  }];
  Game.getUserInput(text, image, options, function gameOverUserInput(){
    $('#header img').click();
  });

}
