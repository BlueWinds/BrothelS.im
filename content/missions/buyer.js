"use strict";
Missions.girlBuyer = {
  conditions: {
    min: { day: 90 },
    missions: {
      girlBuyerMinDelay: -1
    },
    likelyhood: 0.03,
    girl: {}
  },
  display: {
    label: '<<- mission.special.client.name >> wants <<- girl.name >> permanently',
    group: '<<- girl.name >>',
    image: '<<- mission.special.client.image >>',
    text: "<< var client = mission.special.client >>Since you\'ve gathered a bit of local fame (or notoriety among your competitors), you\'ve received several offers for your girls, anything from long-term exclusive contracts to literally selling them into slavery. Few of them seemed serious enough to be worth considering until now - the <<- client.profession >> <<- client.name >> has made a rather handsome proposition. Visiting for a month and a half, over the past week or so he\'s become increasingly enthralled with <strong><<- girl.name >></strong>, and has finally propositioned her to return home with him.<br><br>You discuss the idea with her, and she doesn\'t seem entirely opposed - but it would mean traveling to a distant foreign land. You\'d probably never see her again. << if (mission.special.delta) { >><<- client.name >> would like her to be just a little more <<- client.wants._toString('adj') >> (<<- Girl.renderConditions(mission.special.delta) >>)<< } >>. He will return on <strong>Day <<- mission.end.max.day >></strong>.",
    weight: -1
  },
  special: {},
  initialize: function(context) {
    var client = new Person('High Class');
    var delta = { min: {}, max: {} };
    this.special.client = client;
    client.wants.forEach(function(want) {
      if (['libido', '-libido', 'experience', '-experience', 'endurance', '-endurance'].indexOf(want) != -1) {
        return;
      }
      if (want.substr(0, 1) == '-') {
        delta.max[want.substr(1)] = '-5';
      } else {
        delta.min[want] = '+5';
      }
    });
    this.special.delta = context.girl.parseConditions(delta);
  },
  end: {
    min: { day: '+30' },
    max: { day: '+30' }
  },
  variants: function(context, done) {
    var client = this.special.client;
    if (!context.girl.compare(this.special.delta)) {
      done(this.base().results.fail);
      return;
    }
    var text = client.name + ' has returned in 30 days, as promised, to collect ' + context.girl.name + " if she\'s interested in coming with him. In person, this time. " + client.description + " As when you asked her before, it seems she could go either way - she likes working for you, but traveling to foreign lands also sounds exciting.";
    var options = {
      'Send her off': "Life\'s too great of an adventure to spend stuck in one place.",
      'Keep her here': "She enjoys it here, and it\'s a good life. Stay."
    };
    Game.getUserInput(text, client.image, options, function(answer) {
      var result = context.mission.base().results[answer];
      if (answer == 'Send her off') {
        result.money *= Math.random() * 0.8 + 0.6;
        result.money = Math.floor(result.money);
        g.messages = g.messages.filter(function(message) {
          return (message.group != context.girl.name);
        });
      }
      done(result);
    });
  },
  results: {
    fail: {
      message: {
        label: 'Girl for <<- mission.special.client.name >>',
        group: 'Sell a girl',
        image: '<<- mission.special.client.image >>',
        text: "Over the intervening weeks, it seems that <<- mission.special.client.name >>\'s enthusiasm has cooled. He was scheduled to come by today and make the final offer in person, but instead receive a message, delivered to your door by one of his servants. It explains that the situation has changed, and he has to leave in a rush, with barely enough time to get his own things together, etc.. It\'s nothing more than an excuse, transparent to <<- girl.name >> and you. Whether she wanted to go or not, the fact that he\'s lost interest in her has to be disappointing on some level. Oh well.",
        weight: -1
      },
      girl: { happiness: -7 },
      mission: 'girlBuyerMinDelay'
    },
    'Send her off': {
      message: {
        label: 'Girl for <<- mission.special.client.name >>',
        group: '<<- girl.name >>',
        image: '<<- girl.image() >>',
        text: "With a smile, you thank <<- girl.name >> for her company over the past months, and tell her that life\'s too great an adventure to turn down opportunity when it knocks. She bows to <<- mission.special.client.name >> and kisses his hand before he pulls you aside to take care of the business portion of the transaction with quite a thick stack of bills.<br><br>His ship doesn\'t leave until morning, so you and <<- girl.name >> have some final time to spend together. You help her pack, and once that\'s done, still for a while to share stories, discussion, and <<- girl.get('libido') < 50 ? 'a chaste kiss' : 'a passionate farewell fuck' >>. Then with a wave, she\'s off to the docks. You doubt you\'ll see her again.",
        weight: -2
      },
      girl: {
        status: 'Gone'
      },
      money: 25000,
      mission: 'girlBuyerMinDelay'
    },
    'Keep her here': {
      message: {
        label: 'Girl for <<- mission.special.client.name >>',
        group: '<<- girl.name >>',
        image: '<<- girl.image() >>',
        text: "<<- girl.name >> is uncertain if she should go or not, and if she\'s uncertain, she probably doesn\'t want to leave everything familiar behind to go live with an almost complete stranger. Who knows what his real intentions are? You pull her aside and make your recommendation - she nods and agrees. Her impression is the same.<br><br>While <<- mission.special.client.name >> seems ready to pay you handsomely for your troubles, you explain that << girl.name >> has a contract with you, and you can\'t release her until it\'s fulfilled. You\'re sure he sees through the excuse, but he\'s willing to accept it without comment. He kisses her hand and bids her a good day, drawing forth a pleased blush you weren\'t sure she was still capable of.",
        weight: -2
      },
      girl: {
        happiness: 10
      },
      mission: 'girlBuyerMinDelay'
    }
  }
};

Missions.girlBuyerMinDelay = {
  conditions: false,
  end: {
    min: { day: '+25' }
  },
  results: [{}]
};
