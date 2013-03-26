"use strict";
Actions.Streetwalk =  {
  label: 'Streetwalk',
  group: 'Jobs',
  description: '<<= girl.name >> will wander the streets looking for customers to service. This tends to be quite tiring, and not as profitable as other options, but it won\'t count against the customers or the reputation of your buildings.',
  conditions: {
    missions: {
      firstMoney: 3
    }
  },
  enableConditions: {
    girl: {
      min: {
        obedience: 20,
        happiness: 20,
        endurance: 25
      },
      max: {
        modesty: 50
      }
    }
  },
  disable: function(context) {
    for (var i in Girl.sex) {
      if (context.girl.actions[Girl.sex[i]]) { return; }
    }
    return 'You must allow her to perform at least one type of sex act before she can Streetwalk.';
  },
  tags: {
    slums: 0.25,
    docks: 0.25,
    park: 0.25,
    market: 0.25
  },
  // variants key provided by prostitution module, since it's too complex to put here.
  results: [{
    girl: {
      endurance: -10,
      happiness: -5
    },
    message: {
      group: '<<- girl.name >>',
      label: 'Streetwalking',
      image: '<<- girl.image() >>',
      text: '<<= girl.name >> walked around the city propositioning strangers.'
    }
  }],
  // These are non-standard keys - the variants uses them.
  special: {
    // The message if she refuses.
    uncooperative: 'But she was uncooperative and <strong>refused</strong>. He left unsatisfied without paying anything.',
    // Message for each customer she services.
    customerMessage: '<<= girl.name >> met <<= customer.name + " the " + customer.profession >>, looking for <<- __(customer.sex[0]) >> with a girl who was <<- customer.wants.slice(0, 2)._toString("adj") >>. They agreed on <strong><<- __(sex) >></strong>.<br><br><<- result >>',
    sexResults: {
      soft: [
        'They kissed passionately for a while, then he blushed, mumbled about the time and left in a hurry.',
        'She sucked his dick in the middle of the street, though she didn\'t swallow.',
        'He caressed her breasts and licked her pussy in an alley way, then they switched places and she gave him a blow job.',
        'She crouched down behind a trash can and gave him a tit job.',
        'He jerked off all over her face and hair, then left in a hurry.'
      ],
      hard: [
        'He fucked her silly in the plain view of passersby.',
        'They found an abandoned lot for privacy, and he came in her pussy.',
        'He fucked her in an alley, but pulled out to give her a facial.',
        'They kissed and fondled each other, than made slow love beneath a tree in the park.'
      ],
      anal: [
        'He pounded her ass mercilessly in a dirty alley.',
        'He alternated between her ass and pussy for several minutes before blowing his load in her ass.',
        'He bent her over a bench in the park and took her ass doggy-style.',
        'His dick was almost too large to fit, so she had to warm up first using a dildo.'
      ],
      fetish: [
        'He stripped her naked and tied her to a streetlamp on a busy corner, then left.',
        'They went to a deserted alleyway and he tied her arms to a railing, then spanked her until she started crying.',
        'He produced a whole jar of semen he acquired from somewhere and made her drink it all.',
        'He tied her up tightly and had his way with every hole.',
        'He bound her arms and paraded her around town naked.'
      ]
    }
  }
};

Actions.Whore = {
  label: 'Whore',
  group: 'Jobs',
  description: '<<= girl.name >> will wait in the <<= girl.building() ? girl.building().name : "inn" >> for customers to arrive and service them. This action is both less tiring and more profitable than Streetwalking, because customers can choose their favorite among all the girls whoring in a building.',
  tags: { indoors: 1 },
  conditions: {
    missions: { explainWhore: 3 },
    min: { buildings: 1 }
  },
  enableConditions: {
    girl: {
      min: {
        obedience: 20,
        happiness: 20,
        endurance: 25
      },
      building: {}
    }
  },
  disable: Actions.Streetwalk.disable,
  variants: function(context, done) {
    context.action.special.done = true;
    done({});
  },
  // The results of this action are handled by a GamePostMorning / GamePostEvening function in modules/prostitution/prostitution.js.
  results: [{}],
  // variants key provided by prostitution module, since it's too complex to put here.

  // These are non-standard keys - the variants function uses them.
  special: {
    eachCustomer: {
      building: {
        clean: -1
      },
      endurance: -1
    },
    // The message for each building.
    message: '<<= customers.length >> customers visited the <<= building.name >> in the <<= time >>. <strong><<- girls._accumulate("name")._toString() >></strong> worked there, servicing <<= count >> of them.',
    // Reuse the uncooperative message from Streetwalking.
    uncooperative: Actions.Streetwalk.special.uncooperative,
    // Message for each customer serviced.
    customerMessage: '<<= customer.name + " the " + customer.profession >> wanted <<- __(customer.sex[0]) >> with a girl who was <<- customer.wants.slice(0, 2)._toString("adj") >>. He chose <<= girl.name >>, and they agreed on <strong><<- __(sex) >></strong>.<br><br><<- result >>',
    sexResults: {
      soft: [
        'They kissed awkwardly for a minute until it became apparent he was completely inexperienced. She took the lead and guided him in how to pleasure a woman, before finishing him off with a blow job.',
        'He was incredibly hot, and they wasted no time in stripping and ravaging each other\'s bodies.',
        'He straddled her and pushed her tits together, fucking them roughly without much concern for her pleasure.',
        'She lay over him in the 69 position, fondling his balls and slowly licking up and down his shaft while he nibbled on her pussy, both of them steadily growing more enthusiastic until she eagerly swallowed his cum.',
        'He stood against the wall while she gave him a hand job, staring up into his eyes with irresistible cuteness.',
        'He had trouble getting it up at first, but her persistent tongue and ceaseless hands eventually got him hard, and he ended up spraying a massive load across her hair.'
      ],
      hard: [
        'She couldn\'t much get into his pudgy features, and he didn\'t seem particularly interested in her as anything more than a wet (once lube was applied) hole.',
        'After a brief warm up licking her out, he pounded her furiously doggy-style until the whole bed shook, leaving her gasping for air by the time he pulled out and covered her back in cum.',
        'Missionary style, straight, no variation - only when she put her legs around his waist and rolled over on top using the element of surprise did things get more interesting.',
        'He lay back on the bed and she took the top, riding him for what seemed like pleasurable hours until finally, crushing her breasts into his face and moaning, he shot his load deep inside.',
        'They moved together though a veritable Kama Sutra of sex positions, some of which she\'d never heard of before, much less practiced. Her next lay is going to be in for a treat.'
      ],
      anal: [
        'Even with plenty of toy use and lubrication, it still took quite some time to fit his massive dick into her tight asshole. He was gentle though, and she enjoyed herself despite the pain.',
        'Though he was in a hurry and wanted to get started right away, she insisted on taking it slowly, moving from kissing to oral before finally letting him take her ass doggy-style.',
        'He didn\'t actually want to fuck her ass, just plug it was a huge toy while they had sex the old fashioned way.',
        'He had her sit on the edge of the bed and lay back while he teased her pussy with his tongue, slowly working first one finger then two into her ass. By the time he had three in, she was cooing with delight and welcomed the replacement of the fingers with his cock.'
      ],
      fetish: [
        'He stripped her naked and suspended her from a conveniently placed ceiling hook - she was worried about suspension at first, but he seemed to know what he was doing. He fucked her mouth and spanked her, making her beg for more cum to swallow (which he provided) before he would let her down.',
        'Bound and helpless before him, he teased her clit, nipples and thighs with a feather for nearly half an hour, until she finally broke down and begged to be fucked. He satisfied himself with her ass, continuing to tease her pussy all the while.',
        'Providing her a schoolgirl costume to wear, he spanked her, and tied her arms behind her back. She alternated between apologizing for being so naughty and slurping messily on his cock.',
        'He didn\'t want anything particularly extreme, just a bit of instruction on the proper way to tie up a girl without hurting her. She was happy to oblige in a bit of light rope-play.'
      ]
    }
  }
};

// More technical stuff follows. Don't poke at this unless you know what you're doing.

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
      if (context.girl.endurance < 5) { continue; }
      doCustomer.call(this, context);
    }
    mainMessage.delta = endDelta();
    done({});
  };

  function doCustomer(context, customerConfig) {
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

  e.GirlsPostMorning.push(function(done) {
    g.buildings._filter('status', 'Owned').forEach(function(building) {
      doWhoresBuilding(building, 'morning');
    });
    done();
  });
  e.GirlsPostEvening.push(function(done) {
    g.buildings._filter('status', 'Owned').forEach(function(building) {
      doWhoresBuilding(building, 'evening');
    });
    done();
  });

  function doWhoresBuilding(building, time) {
    var context = {
      building: building,
      time: time,
      girls: []
    };
    $.each(building.girls(), function(name, girl) {
      if (girl.actions[time]._id == 'Whore' && girl.actions[time].special.done === true) {
        context.girls.push(girl);
      }
    });
    if (!context.girls.length) {
      return;
    }
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
        if (context.girl.endurance < 5) { delete canService[girl.name]; }
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
