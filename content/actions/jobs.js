"use strict";
Actions.Streetwalk =  {
  label: 'Streetwalk',
  group: 'Jobs',
  description: '<<= girl.name >> will wander the streets looking for customers to service. This tends to be quite tiring, and not as profitable as other options, but it won\'t count against the customers or reputation of your buildings.',
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
    return 'You must allow her to perform at least one type of sex before she can Streetwalk.';
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
        'He fucked her in an ally, but pulled out to give her a facial.',
        'They kissed and fondled each other, than made slow love beneath a tree in the park.'
      ],
      anal: [
        'He pounded her ass mercilessly in a dirty alley.',
        'He alternated between her ass and pussy for several minutes before blowing his load in her ass.',
        'He bent her over a bench in the park and took her ass doggy style.',
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
    uncooperative: Actions.Streetwalk.uncooperative,
    // Message for each customer serviced.
    customerMessage: '<<= customer.name + " the " + customer.profession >> wanted <<- __(customer.sex[0]) >> with a girl who was <<- customer.wants.slice(0, 2)._toString("adj") >>. He chose <<= girl.name >>, and they agreed on <strong><<- __(sex) >></strong>.<br><br><<- result >>',
    sexResults: {
      soft: [
        'They kissed awkwardly for a minute until it became apparent he was completely inexperienced. She took the lead and guided him in how to pleasure a woman, before finishing him off with a blow-job.',
        'He was incredibly hot, and they wasted no time in stripping and ravaging each other\'s bodies.',
        'He straddled her and pushed her tits together, fucking them roughly without much concern for her pleasure.',
        'She lay over him in 69 position, fondling his balls and slowly licking up and down his shaft while he nibbled on her pussy, both of them steadily growing more enthusiastic until she eagerly swallowed his cum.',
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
        'Even with plenty of toy use and lubrication, it still took quite some time to fit his massive dick into her tight ass hole. He was gentle though, and she enjoyed herself despite the pain.',
        'Though he was in a hurry and wanted to get started right away, she insisted on taking it slowly, moving from kissing to oral before finally letting him take her ass doggy style.',
        'He didn\'t actually want to fuck her ass, just plug it was a huge toy while they had sex the old fashioned way.',
        'He had her sit on the edge of the bed and lay back while he teased her pussy with his tongue, slowly working first one finger then two into her ass. By the time he had three in, she was cooing with delight and welcomed the replacement of the fingers with his cock.'
      ],
      fetish: [
        'He stripped her naked and suspended her from a conveniently placed ceiling hook - she was worried about suspension at first, but he seemed to know what he was doing. He fucked her mouth and spanked her, making her beg for more cum to swallow (which he provided) before he would her down.',
        'Bound and helpless before him, he teased her clit, nipples and thighs with a feather for nearly half an hour, until she finally broke down and begged to be fucked. He satisfied himself with her ass, continuing to tease her pussy all the while.',
        'Providing her a schoolgirl costume to wear, he spanked her, and tied her arms behind her back. She alternated between apologized for being so naughty and slurping messily on his cock.',
        'He didn\'t want anything particularly extreme, just a bit of instruction on the proper way to tie up a girl without hurting her. She was happy to oblige in a bit of light rope-play.'
      ]
    }
  }
};

Actions.Acolyte = {
  label: 'Acolyte',
  group: 'Jobs',
  description: '<<= girl.name >> will work in a temple, serving the poor, maintaining the property and generally engaging in holy work. This will raise her <<- __("modesty") >>, though it doesn\'t pay.',
  conditions: {
    missions: { obedienceAndModesty: 3 }
  },
  enableConditions: {
    girl: {
      min: {
        endurance: 10
      }
    }
  },
  tags: {
    university: 0.8,
    slums: 0.2
  },
  variants: [
    {
      girl: { min: { modesty: 65} },
      likelyhood: 0.2
    },
    {
      girl: { min: { modesty: 65} },
      likelyhood: 0.25
    }
  ],
  results: [
    {
      message: [
        {
          group: '<<- girl.name >>',
          label: 'Acolyte',
          image: '<<- girl.image("study") >>',
          text: 'In light of her pious habits, <<= girl.name >> was asked the help clean parts of the temple seldom seen by visitors - a contingent of priests and priestesses live on the grounds, and there\'s a private garden reserved for their use. She cleaned the kitchen and hallways, until a noise from one of the bedrooms caught her attention. The door was ajar, and she couldn\'t help but peek in...',
          delta:  false
        },
        {
          group: '<<- girl.name >>',
          label: 'Acolyte',
          image: '<<- girl.image("study") >>',
          text: 'Four priestesses and three priests were in the middle of most unpropitious acts. Most of them looked ashamed when they noticed her face in the door, but one of the girls, dress hitched up around her waist and wearing nothing else, giggled and pulled <<= girl.name >> into the room. She didn\'t get any more cleaning done that <<= time >>.'
        }
      ],
      girl: {
        endurance: -10,
        modesty: 1.4,
        happiness: 3,
        hardExperience: 1.5
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Acolyte',
        image: '<<- girl.image("study") >>',
        text: 'In light of her pious habits, <<= girl.name >> was asked the help clean parts of the temple seldom seen by visitors - a contingent of priests and priestesses live on the grounds, and there\'s a private garden reserved for their use. She worked in the garden, pulling weeds and cleaning out a fountain basin.<br><br>It was a beautiful piece of art - a naked goddess, water flowing from her mouth. <<= girl.name >> noticed part of the stone was a different color - as soon as she touched it, the plugs came away in her hands. Who knew that the goddess was originally lactating and dripping from her pussy...'
      },
      girl: {
        endurance: -5,
        modesty: 3.5,
        happiness: 4
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Acolyte',
        image: '<<- girl.image("study") >>',
        text: '<<= girl.name >> went to a temple to offer her services, and ended up helping to distribute food to the poor. Considering what she wore compared to the shapeless outfits of the nuns, it was no surprise that her line was twice the length of any other.'
      },
      girl: {
        endurance: -5,
        modesty: 4.5,
        happiness: 4
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Acolyte',
        image: '<<- girl.image("study") >>',
        text: "<<= girl.name >> volunteered at a temple, and spent several hours teetering on a rickety ladder, dusting stained glass windows that hadn't been touched in years. She was surprised to discover, hidden away in the rafters, what could only be a dildo. One wonders how it made its way into the rafters of a temple..."
      },
      girl: {
        endurance: -5,
        modesty: 3,
        happiness: 4,
        softLibido: 0.7
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Acolyte',
        image: '<<- girl.image("study") >>',
        text: '<<= girl.name >>, being quite a familiar face at the temple, was invited to help with planning the upcoming monthly festival. Though put on mostly by The Guild, the temples each contribute their own part, partially to counteract the lascivious nature of the event, and partially because the tourism it brings and the donations they receive on that night are an important source of money.<br><br>She worked diligently, helping to repair props and generally get everything ready for the important night.'
      },
      girl: {
        endurance: -6,
        modesty: 3.5,
        happiness: 5
      }
    }
  ]
};

Actions.Advertise = {
  label: 'Advertise',
  group: 'Jobs',
  description: "<<= girl.name >> will stand in front of a building, talking to strangers and trying to get them to come inside for a visit. This will increase her <<- __('charisma') >><< if (g.buildings._filter('status', 'Owned').length) { >> and the building's <<- __('reputation') >><< } else { >> and the inn's owner will pay you a small amount.<< } >>.",
  conditions: {
    missions: { charismaAndIntelligence: 3 }
  },
  enableConditions: {
    girl: {
      min: {
        endurance: 20,
        happiness: 50
      }
    }
  },
  tags: {
    redlight: 0.6,
    uptown: 0.2,
    market: 0.2
  },
  options: function() {
    var options = {};
    g.buildings._filter('status', 'Owned').forEach(function(building) {
      options[building.name] = building.name;
    });
    options.Inn = 'Inn';
    return options;
  },
  optionsKey: 'building',
  variants: function(context, done) {
    var delta = $.extend(true, {}, this.base().results[0]);
    delta.building.reputation *= context.girl.charisma / 100;
    if (this.option == 'Inn') {
      delta.money = Math.floor(context.girl.charisma / 2 + Math.random() * 50);
    }
    done(delta);
  },
  results: [{
    message: {
      label: 'Advertise',
      group: '<<- girl.name >>',
      image: '<<- girl.image() >>',
      text: "<<= girl.name >> worked the street in front of the <<- action.building >>, chatting up everyone who passed by. While not terribly successful from a business standpoint, it was good for her."
    },
    girl: {
      endurance: -10,
      charisma: 1.5
    },
    building: {
      reputation: 2
    }
  }]
};
