Girl.prototype.maxCustomers = function() {
  var libido = this.get('libido');
  libido += this.constitution * 3;
  return Math.floor(libido / 300 * Actions.Streetwalk.config.maxCustomers);
};

Girl.prototype.customerSexType = function(customer) {
  var sex = '';
  var satisfaction = 1;
  for (var i in customer.sex) {
    sex = customer.sex[i];
    if (this.actions[sex]) {
      break;
    }
    satisfaction -= 0.25;
  }
  return sex;
};

Girl.prototype.checkInterest = function(sex, effectiveModesty) {
  if (effectiveModesty === undefined) {
    effectiveModesty = this.modesty;
  }
  var interest = this.obedience * 1.5 + this[sex + ' libido'] * 2;
  interest += this[sex + ' experience'] + this.happiness / 2;
  interest = (interest / 500 + Math.random());
  interest -= Actions.Streetwalk.config.types[sex].r - effectiveModesty / 100;
  return Math.max(interest, 0);
};

Girl.prototype.checkSatisfaction = function(customer, sex) {
  var satisfaction = 1;
  for (var i in customer.sex) {
    if (sex == customer.sex[i]) {
      break;
    }
    satisfaction -= 0.25;
  }
  satisfaction += this.charisma / 200;
  satisfaction += this.get(customer.wants[0]) / 100;
  satisfaction += this.get(customer.wants[1]) / 300;
  if (this.happiness < 50) {
    satisfaction *= this.happiness / 100 + 0.5;
  }
  return satisfaction;
};

(function() {
  Actions.Streetwalk.externalFunction = function(time, action) {
    var context = {
      girl: this,
      time: time,
      action: action
    };
    var endDelta = this.startDelta();
    this.apply(Actions.Streetwalk.config.streetwalkDelta);
    new Message({
      type: 'Streetwalk',
      time: time,
      image: this.image('base', true),
      text: ejs.render(Actions.Streetwalk.message, context),
      delta: endDelta()
    }).save(this.name);

    var found = Math.pow(this.charisma / 100, 0.5);
    found *= (Math.random() / 2 + 0.5);
    found = Math.ceil(found * this.maxCustomers());

    for (i = 0; i < found; i++) {
      var customer = randomPerson(Math.choice(['Very Low Class', 'Low Class']));
      doCustomer(this, customer, time, action);
    }
  };

  function doCustomer(girl, customer, time, action) {
    var context = {
      girl: girl,
      customer: customer
    };
    var endDelta = girl.startDelta();
    var sex = girl.customerSexType(customer);
    context.sex = sex;
    var interest = girl.checkInterest(sex);
    if (interest === 0) {
      context.result = ejs.render(action.uncooperative, context);
      girl.apply(action.config.refuseDelta);
      new Message({
        type: 'Refused',
        time: time,
        image: girl.image('refuse', true),
        text: ejs.render(action.customerMessage, context),
        delta: endDelta()
      }).save(girl.name);
      return;
    }
    var satisfaction = girl.checkSatisfaction(customer, sex) + interest;
    var delta = $.extend({}, Actions.Streetwalk.config.types[sex]);

    delta.money *= satisfaction;
    delta.money *= Actions.Whore.config.customerClass[customer._class].pays;
    delta.endurance *= 1 - girl.constitution / 200;
    if (action.eachCustomer) {
      delta.Cadd(action.eachCustomer);
    }
    girl.apply(delta);

    context.result = Math.choice(Actions.Streetwalk.config.results[sex]);
    new Message({
      type: 'Prostitution',
      time: time,
      image: girl.image(sex, true),
      text: ejs.render(action.customerMessage, context),
      delta: endDelta()
    }).save(girl.name);

    return customer.satisfaction;
  }

  var Whores;

  e.GamePreDay.push(function() {
    Whores = {};
  });

  e.GirlsPostMorning.push(function() {
    for (var building in Whores) {
      doWhores(Whores[building], 'morning');
    }
    Whores = {};
  });
  e.GirlsPostEvening.push(function() {
    for (var building in Whores) {
      doWhores(Whores[building], 'evening');
    }
  });

  Actions.Whore.externalFunction = function(time, action) {

    var building = this.building();
    Whores[building.name] = Whores[building.name] || [];
    Whores[building.name].push(this);
  };

  function doWhores(girls, time) {
    var building = girls.Cfirst().building();
    var config = Actions.Whore.config;
    var count = config.maxCustomers - config.minCustomers;
    count *= Math.pow(Math.random() * building.reputation / 100, 0.5);
    count += config.minCustomers;
    var classes = [];
    $.each(config.customerClass, function(_class, info) {
      if (info.minReputation < building.reputation && info.maxReputation) {
        classes.push(_class);
      }
    });

    var canService = {};
    girls.forEach(function(girl) {
      canService[girl.name] = girl.maxCustomers();
    });

    var customers = [];
    while (customers.length < count) {
      var _class = Math.choice(classes);
      customers.push(randomPerson(_class));
    }

    var endDelta = building.startDelta();
    var serviced = 0;
    customers.Csort('class_number', true).forEach(function(customer) {
      var girl, max_satisfaction = 0;
      for (var name in canService) {
        var sex = g.girls[name].customerSexType(customer);
        var satisfaction = g.girls[name].checkInterest(sex, 0);
        satisfaction += g.girls[name].checkSatisfaction(customer);
        if (satisfaction > max_satisfaction) {
          girl = g.girls[name];
          max_satisfaction = satisfaction;
        }
      }
      if (girl) {
        // We've now found the girl we're looking for.
        canService[girl.name] -= 1;
        serviced++;
        if (!canService[girl.name]) { delete canService[girl.name]; }
        doCustomer(girl, customer, time, Actions.Whore);
      }
    });

    var context = {
      building: building,
      girls: girls,
      customers: customers,
      time: time,
      count: serviced
    };
    new Message({
      type: 'Customers arrived',
      time: time,
      image: building._.image,
      text: ejs.render(Actions.Whore.message, context),
      delta: endDelta()
    }).save(building.name);
  }
})();
