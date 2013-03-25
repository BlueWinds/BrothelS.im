"use strict";

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
        text: "<<= girl.name >> volunteered at a temple, and spent several hours teetering on a rickety ladder, dusting stained glass windows that hadn\'t been touched in years. She was surprised to discover, hidden away in the rafters, what could only be a dildo. One wonders how it made its way into the rafters of a temple..."
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
  description: "<<= girl.name >> will stand in front of a building, talking to strangers and trying to get them to come inside for a visit. This will increase her <<- __('charisma') >><< if (g.buildings._filter('status', 'Owned').length) { >> and the building's <<- __('reputation') >><< } else { >> and the inn\'s owner will pay you a small amount.<< } >>.",
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
