var Game = function(obj) {
  jQuery.extend(this, obj);
};

Game.prototype.nextPayment = function() {
  var pl = Game.config.paymentLength;
  var day = Math.floor(this.day / pl) * pl + pl;
  var increments = Game.config.gameLength / pl;
  var increment_size = Game.config.loan / (increments + 1) / increments * 2;
  var amount = increment_size * day / pl;
  return {day: day, amount: Math.round(amount)};
};

Game.prototype.render = function() {
  $('#content').html(ejs.render($('#game_view_template').html(), {
    g: g,
    gameLength: Game.config.gameLength
  }));
  $('#next').click(function() {
    g.nextTurn();
  });
  e.invokeAll('GameRender');
  e.invokeAll('Autorender', $('#content'));
};

Game.prototype.nextTurn = function() {
  this.moneyHistory.push(this.money);
  e.invokeAll('GamePreDay');
  e.invokeAll('GameNextDay');
  var payment = this.nextPayment();
  this.day += 1;
  e.invokeAll('GamePostDay');
  if (this.day == payment.day) {
    this.money -= payment.amount;
  }
  this.render();
};
