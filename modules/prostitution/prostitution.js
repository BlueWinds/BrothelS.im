"use strict";
Girl.prototype.maxCustomers = function() {
  var libido = this.get('libido');
  libido += this.constitution * 3;
  return Math.floor(libido / 400 * Person.prostitution.girlMaxCustomers);
};

Girl.prototype.interest = function(sex) {
  var interest = this.obedience + this[sex + 'Libido'] * 2;
  interest += this[sex + 'Experience'] + this.happiness / 2;
  interest = (interest / 450 + Math.random());
  interest -= Person.prostitution.types[sex].r;
  return interest;
};

(function() {
  Actions.Streetwalk.variants = function(context, done) {
    var endDelta = context.girl.startDelta();
    var delta = this.base().results[0];
    var mainMessage = Message.send(delta.message, context);
    context.girl.apply(delta.girl);

    var found = Math.pow(context.girl.charisma / 100, 0.5);
    found *= (Math.random() / 2 + 0.5);
    found = Math.ceil(found * context.girl.maxCustomers());

    for (var i = 0; i < found; i++) {
      context.customer = new Person(Math.choice(['Very Low Class', 'Low Class']));
      doCustomer.call(this, context);
    }
    mainMessage.delta = endDelta();
    done({});
  };

  function doCustomer(context, customerConfig) {
    if (context.girl.endurance < 5) { return; }
    var endDelta = context.girl.startDelta();
    var sex = context.customer.sexType(context.girl);
    context.sex = sex;
    var interest = context.girl.interest(sex);
    if (interest - context.girl.modesty * context.customer.modestyRate / 100 <= 0) {
      if (customerConfig) {
        context.girl.apply(customerConfig.bad);
      }
      context.result = this.special.uncooperative;
      context.girl.apply(Person.prostitution.refuseDelta);
      Message.send({
        label: this.label + ' - Refused',
        image: context.girl.image('refuse'),
        text: this.special.customerMessage,
        group: context.girl.name,
        delta: endDelta()
      }, context);
      return 0;
    }
    var satisfaction = context.customer.satisfaction(context.girl) + interest;
    var delta = $.extend({}, Person.prostitution.types[sex]);

    delta.money *= satisfaction;
    delta.money *= Person.prostitution.customerClass[context.customer.type].pays;
    context.girl.apply(delta.girl);
    g.money += Math.floor(delta.money);
    if (this.special.eachCustomer) {
      context.girl.apply(this.special.eachCustomer);
    }
    if (customerConfig) {
      if (satisfaction >= customerConfig.minSatisfaction) {
        context.girl.apply(customerConfig.good);
      } else {
        context.girl.apply(customerConfig.bad);
      }
    }

    context.result = Math.choice(this.special.sexResults[sex]);
    Message.send({
      label: this.label,
      image: context.girl.image(sex),
      text: this.special.customerMessage,
      group: context.girl.name,
      delta: endDelta()
    }, context);

    return satisfaction;
  }

  var Whores;

  e.GamePreDay.push(function(done) {
    Whores = {};
    done();
  });

  e.GirlsPostMorning.push(function(done) {
    for (var building in Whores) {
      doWhores({
        girls: Whores[building],
        time: 'morning',
        building: g.buildings[building]
      });
    }
    Whores = {};
    done();
  });
  e.GirlsPostEvening.push(function(done) {
    for (var building in Whores) {
      doWhores({
        girls: Whores[building],
        time: 'evening',
        building: g.buildings[building]
      });
    }
    done();
  });

  Actions.Whore.variants = function(context, done) {
    var building = context.girl.building();
    Whores[building.name] = Whores[building.name] || [];
    Whores[building.name].push(context.girl);
    done({});
  };

  function doWhores(context) {
    var count = Person.prostitution.maxWhoreCustomers - Person.prostitution.minWhoreCustomers;
    var power = Math.random() * 2 + 2.7 - context.building.reputation / 20;
    count /= (1 + Math.pow(Math.E, power));
    count += Person.prostitution.minWhoreCustomers;
    var types = [];
    $.each(Person.prostitution.customerClass, function(type, info) {
      if (info.minReputation <= context.building.reputation && info.maxReputation >= context.building.reputation) {
        types.push(type);
      }
    });

    var canService = {};
    context.girls.forEach(function(girl) {
      canService[girl.name] = girl.maxCustomers();
    });

    context.customers = [];
    while (context.customers.length < count) {
      var type = Math.choice(types);
      context.customers.push(new Person(type));
    }

    var endDelta = context.building.startDelta();
    context.count = 0;
    context.customers._sort('typeRank', true).forEach(function(customer) {
      customer.modestyRate = 0;
      var customerConfig = Person.prostitution.customerClass[customer.type];
      var girl, maxSatisfaction = 0.2;
      for (var name in canService) {
        var sex = customer.sexType(g.girls[name]);
        var satisfaction = g.girls[name].interest(sex);
        satisfaction += customer.satisfaction(g.girls[name]);
        if (satisfaction > maxSatisfaction) {
          girl = g.girls[name];
          maxSatisfaction = satisfaction;
        }
      }
      if (girl) {
        // We've now found the girl we're looking for.
        canService[girl.name] -= 1;
        context.count++;
        if (!canService[girl.name]) { delete canService[girl.name]; }
        context.girl = girl;
        context.customer = customer;
        doCustomer.call(Actions.Whore, context, customerConfig);
      }
    });

    Message.send({
      group: context.building.name,
      label: 'Customers arrived',
      image: context.building.image(),
      text: Actions.Whore.special.message,
      delta: endDelta(),
      weight: 1
    }, context);
  }
})();
