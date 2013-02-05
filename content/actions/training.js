"use strict";
Actions.Exercise = {
  label: 'Exercise',
  group: 'Training',
  description: '<<= girl.name >> will spend time jogging around the city and otherwise exercising outdoors to increase her <<- __("constitution") >>.',
  enableConditions: {
    girl: {
      min: { endurance: 15 }
    }
  },
  tags: {
    slums: 0.4,
    park: 0.5,
    market: 0.1
  },
  variants: [0.4, 0.4, 0.2],
  results: [
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Exercise',
        image: '<<- girl.image("exercise") >>',
        text: '<<= girl.name >> jogged around the city. It was a fine day, and she enjoyed herself quite a bit. << if (time == "morning") { >>She turned a few heads in her tight tank top, but kept running with a smile.<< } else { >>It got cold when the sun went down, but she kept warm by running faster.<< } >>'
      },
      girl: {
        endurance: -10,
        constitution: 2.5,
        happiness: 3,
        modesty: -0.5
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Exercise',
        image: '<<- girl.image("exercise") >>',
        text: '<<= girl.name >> jogged around the city. It was a cloudy day, no sun to warm up the muggy streets. By the time she returned, <<= girl.name >> was sweaty and tired.'
      },
      girl: {
        endurance: -15,
        constitution: 1.5
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Exercise',
        image: '<<- girl.image("tired") >>',
        text: '<<= girl.name >> jogged around the city. The sky was overcast and cloudy, and it began to rain as she neared the end of her run, leaving <<= girl.name >> to miserable and soaked when she returned.'
      },
      girl: {
        endurance: -20,
        constitution: 1,
        happiness: -3,
        obedience: 0.1
      }
    }
  ]
};

Actions.Study = {
  label: 'Study',
  group: 'Training',
  description: '<<= girl.name >> will attend courses at the local university to increase her <<- __("intelligence") >>.',
  conditions: {
    missions: { charismaAndIntelligence: 3 }
  },
  enableConditions: {
    girl: {
      min: { endurance: 5 }
    },
    min: { money: 100 }
  },
  tags: {
    slums: 0.1,
    university: 0.1
  },
  variants: [0.3, 0.4, 0.2, 0.1],
  results: [
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Study',
        image: '<<- girl.image("study") >>',
        text: '<<= girl.name >> attended a course on <<= Math.choice(["history", "mathematics", "geography", "literature"]) >>, a subject which has always interested her. She learned a great deal, and asked you enthusiastically if she can attend the next lecture tomorrow.'
      },
      girl: {
        endurance: -5,
        intelligence: 2.5,
        happiness: 3,
        obedience: -0.2
      },
      money: -100
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Study',
        image: '<<- girl.image("study") >>',
        text: '<<= girl.name >> attended a course on <<= Math.choice(["history", "mathematics", "geography", "literature"]) >>. She tried to pay close attention to the professor , but was somewhat distracted by a cute boy sitting in front.'
      },
      girl: {
        endurance: -5,
        intelligence: 1.5
      },
      money: -100
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Study',
        image: '<<- girl.image("study") >>',
        text: '<<= girl.name >> attended a course on <<= Math.choice(["history", "mathematics", "geography", "literature"]) >>. She wasn\'t particularly interested, and the professor didn\'t impress her. She felt asleep halfway through.'
      },
      girl: {
        endurance: -5,
        intelligence: 1,
        obedience: -1
      },
      money: -100
    },
    {
      message: [
        {
          group: '<<- girl.name >>',
          label: 'Study',
          image: '<<- girl.image("study") >>',
          text: '<<= girl.name >> attended a course on <<= Math.choice(["history", "mathematics", "geography", "literature"]) >>. She it was an interesting lesson, and she was called on several times by the young professor - more than any other student, in fact. When he politely asked her to stay a after class, she agreed. They chatted about the subject material for a few minutes until the other students left.',
          delta: false
        },
        {
          group: '<<- girl.name >>',
          label: 'Study',
          image: '<<- girl.image("study") >>',
          text: 'The professor kept touching her hand for slightly longer than necessary, and it wasn\'t hard to see what was on his mind. <<= girl.name >> played along with the ruse when he asked her to pick up a pencil he dropped - and it was no surprise when he slapped her ass through her <<= Math.choice(["skirt", "pants"]) >>. They ended up making a real mess of one corner of the room. He refunded her entrance fee, of course.'
        }
      ],
      girl: {
        endurance: -10,
        intelligence: 1,
        hardExperience: 1,
        hardLibido: 1,
        modesty: -1.3
      }
    }
  ]
};

Actions.Expose = {
  label: 'Expose',
  group: 'Training',
  description: '<<= girl.name >> will wander the streets, pushing her comfort level in clothing, flirting with strangers, and all around acting <<- __("-modesty", "adj") >>.',
  conditions: {
    missions: { obedienceAndModesty: 3 }
  },
  enableConditions: {
    girl: {
      min: {
        endurance: 10,
        obedience: 25
      }
    }
  },
  tags: {
    redlight: 0.3,
    park: 0.3,
    uptown: 0.2,
    market: 0.2
  },
  variants: function(context, done) {
    var i = Math.max(0, 4 - Math.floor(context.girl.modesty / 33 + Math.random() * 2));
    if (i == 4 && Math.random() > context.girl.endurance / 100) { i = 5; }
    done(this.results[i]);
  },
  results: [
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Expose',
        image: '<<- girl.image("base") >>',
        text: '<<= girl.name >> wore a skirt that didn\'t reach all the way down to the ground, and wore sandals - some passersby even caught sight of her toes as she took a walk. Scandalous!'
      },
      girl: {
        endurance: -3,
        happiness: -7,
        modesty: -2,
        obedience: 0.2
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Expose',
        image: '<<- girl.image("exercise") >>',
        text: '<<= girl.name >> wore a short skirt, wandering through the city park. She stopped by the playground to watch the children for a while - and when a little boy hurt himself, she bent down to help him. Not an event worthy of remark, save that it bared her panties and part of her ass to the boy\'s father, who whistled in appreciation. She blushed furiously, and ran home in embarrassment.'
      },
      girl: {
        endurance: -4,
        happiness: -4,
        modesty: -2,
        softLibido: 0.1
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Expose',
        image: '<<- girl.image("exercise") >>',
        text: '<<= girl.name >> wore a skimpy outfit, miniskirt and too-small t-shirt. << if (time == "morning") { >>She wandered through the busiest parts of the city, treating select passersby to a brief glimpse of her pantiles pussy as she bent over to "retrieve" a dropped object. The tiny top didn\'t leave much to the imagination.<< } else { >>She stopped by the park, and, feeling brave, left everything except her panties on the shore. Ignoring the "no swimming" signs, she was pretty sure a few people caught sight of her in the moonlight.<< } >>'
      },
      girl: {
        endurance: -5,
        modesty: -2.5,
        softLibido: 0.2,
        obedience: -0.5
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Expose',
        image: '<<- girl.image("exercise") >>',
        text: '<<= girl.name >> explored the city topless, wearing only a miniskirt that barely reached past her butt. She got plenty of catcalls, and one pair of young men was brave enough to proposition her. << if (girl.building()) { >>She declined for the moment, saying the they could visit her later at the <<= girl.building().name >> if they were still interested.<< } else { >>She declined since she wasn\'t working at the moment, but stroked their cocks through their pants as they talked, leaving them with raging hardons and a mischevious wink as the went on her way.<< } >>'
      },
      girl: {
        endurance: -5,
        modesty: -3,
        building: {
          reputation: 3.5
        }
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Expose',
        image: '<<- girl.image("naked") >>',
        text: '<<= girl.name >> left her clothes in a pile on her bed and stepped out into the street. Though this city is famed for its prostitutes and brothels, still the sight of a fully naked woman shamelessly flaunting herself is an unusual one, and turned many heads. <<= Math.choice(["Almost immediately", "Ten minutes", "Half an hour", "An Hour"]) >> into her walk, she heard a whistle and some shouting - she spent the rest of the <<= time >> running from the guards - an exhilarating chase, breasts bouncing and wind whipping private bits.'
      },
      girl: {
        endurance: -10,
        modesty: -3,
        constitution: 1,
        happiness: 4,
        obedience: -2
      }
    },
    {
      message: [
        {
          group: '<<- girl.name >>',
          label: 'Expose',
          image: '<<- girl.image("naked") >>',
          text: '<<= girl.name >> left her clothes in a pile on her bed and stepped out into the street. Though this city is famed for its prostitutes and brothels, still the sight of a fully naked woman shamelessly flaunting herself is an unusual one, and turned many heads. <<= Math.choice(["Almost immediately", "Ten minutes", "Half an hour", "An Hour"]) >> into her walk, she heard a whistle and some shouting - the guards were after her.',
          delta: false
        },
        {
          group: '<<- girl.name >>',
          label: 'Expose',
          image: '<<- girl.image("prison") >>',
          text: 'She wasn\'t fast enough. They soon caught up with <<= girl.name >>, bringing her escapade to a rough and crashing halt. The guards took her to the town gaol and locked her up. It was miserable and cold, but in light of her nakedness at least she got her own cell. Since she didn\'t have any money on her, you were called in and had to pay her fine.'
        }
      ],
      girl: {
        endurance: -7,
        happiness: -7,
        constitution: 0.3,
        modesty: -2,
        obedience: 2
      },
      money: -150
    }
  ]
};

Actions.OD = {
  label: 'Orgasm Denial',
  group: 'Training',
  description: 'You will bring <<= girl.name >> close to orgasm, and keep her there for as long as possible before release.',
  conditions: {
    missions: { libidoAndExperience: 3 }
  },
  enableConditions: {
    girl: {
      min: {
        endurance: 15,
        obedience: 40
      }
    }
  },
  tags: { indoors: 1 },
  ownerParticipation: true,
  options: {
    soft: __('soft'),
    hard: __('hard'),
    anal: __('anal'),
    fetish: __('fetish')
  },
  variants: function(context, done) {
    done(this.results[this.option]);
  },
  results: {
    soft: {
      message: {
        group: '<<- girl.name >>',
        label: 'Orgasm Denial',
        image: '<<- girl.image("soft") >>',
        text: '<<= girl.name >> lay on her bed naked while you covered her with kisses, along her neck and down to her breasts, teasing them for a minute before moving down along her stomach to her pussy. You licked her pussy and rubbed her clit gently her until she was sopping wet and wreathing in pleasure - before ceasing all stimulation.'
      },
      girl: {
        endurance: -5,
        obedience: 0.3,
        softLibido: 2.5,
        happiness: 3
      }
    },
    hard: {
      message: {
        group: '<<- girl.name >>',
        label: 'Orgasm Denial',
        image: '<<- girl.image("hard") >>',
        text: 'You pushed <<= girl.name >> up against the wall while rubbing her pussy with one hand through her underwear. As she got more worked up, you introduced a dildo, pushing it inside up to the hilt without removing her clothing. Nibbling on her ear and whispering in her ear, you continued to play mercilessly with her sex, never quite providing enough stimulation to bring her to orgasm.'
      },
      girl: {
        endurance: -6,
        obedience: 0.3,
        hardLibido: 2.5,
        happiness: 4
      }
    },
    anal: {
      message: {
        group: '<<- girl.name >>',
        label: 'Orgasm Denial',
        image: '<<- girl.image("anal") >>',
        text: 'Stripping off all of <<= girl.name >>\'s clothes, you had her lay across the bed face down, feet kicked up in the air while you settled in behind her. Playing with her pussy for a minute to get her wet, you finally produced a well lubricated dildo and pressed it against her ass, lightly then with increasing pressure until it finally slid in with a pop. You slid off the bed to bring your dead level with her pussy, licking and sucking on her love button while you continued to play with the dildo with one hand, pressing it further in, rotating it around and generally bringing her to the very edge of orgasm before backing off, only to begin again in a few minutes.'
      },
      girl: {
        endurance: -7,
        obedience: 0.3,
        analLibido: 2.5,
        happiness: 5
      }
    },
    fetish: {
      message: {
        group: '<<- girl.name >>',
        label: 'Orgasm Denial',
        image: '<<- girl.image("fetish") >>',
        text: 'Blindfolding <<= girl.name >> and taking away all of her clothes, you bound her libs to each corner of the bed, and began to lick and finger her pussy. Every time she moved so much as an inch, you left the room for five minutes - it took hours for her to finally stay still long enough to achieve an orgasm.'
      },
      girl: {
        endurance: -8,
        obedience: 1,
        fetishLibido: 2.5,
        happiness: 3
      }
    }
  }
};

Actions.Lockdown = {
  label: 'Lockdown',
  group: 'Chores',
  description: 'She will be bound and gagged in the dungeon to increase her <<- __("obedience") >>. This action takes all day.',
  allDay: true,
  conditions: {
    min: { buildings: 1 }
  },
  enableConditions: {
    girl: {
      min: {
        endurance: 30,
        happiness: 50,
        constitution: 10,
        obedience: 60
      },
      building: { room: 'Dungeon' }
    }
  },
  tags: { indoors: 1 },
  variants: [0.5, 0.5],
  results: [
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Lockdown',
        image: '<<- girl.image("fetish") >>',
        text: '<<= girl.name >> spent the day bound, gagged and naked in the dungeon, hands tied above her head and wishing something interesting would happen. It was cold underground, and by the time you check back in to release her, she\'s very, very ready for a long, hot bath.'
      },
      girl: {
        endurance: -12,
        obedience: 5,
        constitution: -0.5,
        happiness: -8
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Lockdown',
        image: '<<- girl.image("fetish") >>',
        text: "<<= girl.name >> spent the day in the dungeon's stockade without clothes. You checked in occasionally to spank her. She doesn't cry, though you can see her eyes watering once, and by the time you release her her bottom is bright red. She may sit gingerly tomorrow."
      },
      girl: {
        endurance: -12,
        obedience: 5,
        constitution: -0.5,
        happiness: -8
      }
    }
  ]
};
