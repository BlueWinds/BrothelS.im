Actions.Exercise = {
  mins: {
    endurance: 15
  },
  label: 'Exercise',
  group: 'Training',
  description: '<<= girl.name >> will spend time jogging around the city and otherwise exercising outdoors to increase her <<- T("constitution") >>.',
  tags: {
    outdoors: true
  },
  variants: [0.4, 0.4, 0.2],
  results: [
    {
      image: 'exercise',
      message: '<<= girl.name >> jogged around the city. It was a fine day, and she enjoyed herself quite a bit. << if (time == "morning") { >>She turned a few heads in her tight tank top, but kept running with a smile.<< } else { >>It got cold when the sun went down, but she kept warm by running faster.<< } >>',
      delta: {
        endurance: -10,
        constitution: 2.5,
        happiness: 3,
        modesty: -0.5
      }
    },
    {
      image: 'exercise',
      message: '<<= girl.name >> jogged around the city. It was a cloudy day, no sun to warm up the muggy streets. By the time she returned, <<= girl.name >> was sweaty and tired.',
      delta: {
        endurance: -15,
        constitution: 1.5
      }
    },
    {
      image: 'tired',
      message: '<<= girl.name >> jogged around the city. The sky was overcast and cloudy, and it began to rain as she neared the end of her run, leaving <<= girl.name >> to miserable and soaked when she returned.',
      delta: {
        endurance: -20,
        constitution: 1,
        happiness: -3,
        obedience: 0.1
      }
    }
  ]
};

Actions.Study = {
  mins: {
    endurance: 5
  },
  label: 'Study',
  group: 'Training',
  description: '<<= girl.name >> will attend courses at the local university to increase her <<- T("intelligence") >>.',
  tags: {
  },
  variants: [0.3, 0.4, 0.2, 0.1],
  results: [
    {
      image: 'study',
      message: '<<= girl.name >> attended a course on <<= Math.choice(["history", "mathematics", "geography", "literature"]) >>, a subject which has always interested her. She learned a great deal, and asked you enthusiastically if she can attend the next lecture tomorrow.',
      delta: {
        endurance: -5,
        intelligence: 2.5,
        happiness: 3,
        money: -100,
        obedience: -0.2
      }
    },
    {
      image: 'study',
      message: '<<= girl.name >> attended a course on <<= Math.choice(["history", "mathematics", "geography", "literature"]) >>. She tried to pay close attention to the professor , but was somewhat distracted by a cute boy sitting in front.',
      delta: {
        endurance: -5,
        intelligence: 1.5,
        money: -100
      }
    },
    {
      image: 'study',
      message: '<<= girl.name >> attended a course on <<= Math.choice(["history", "mathematics", "geography", "literature"]) >>. She wasn\'t particularly interested, and the professor didn\'t impress her. She felt asleep halfway through.',
      delta: {
        endurance: 5,
        intelligence: 1,
        obedience: -1,
        money: -100
      }
    },
    {
      image: ['study', 'hard'],
      message: [
        '<<= girl.name >> attended a course on <<= Math.choice(["history", "mathematics", "geography", "literature"]) >>. She it was an interesting lesson, and she was called on several times by the young professor - more than any other student, in fact. When he politely asked her to stay a after class, she agreed. They chatted about the subject material for a few minutes until the other students left.',
        'The professor kept touching her hand for slightly longer than necessary, and it wasn\'t hard to see what was on his mind. <<= girl.name >> played along with the ruse when he asked her to pick up a pencil he dropped - and it was no surprise when he slapped her ass through her <<= Math.choice(["skirt", "pants"]) >>. They ended up making a real mess of one corner of the room.'
      ],
      delta: {
        endurance: -10,
        intelligence: 1,
        'hard experience': 1,
        'hard libido': 1,
        money: 50,
        modesty: -1.3
      }
    }
  ]
};

Actions.Expose = {
  mins: {
    endurance: 10,
    obedience: 25
  },
  label: 'Expose',
  group: 'Training',
  description: '<<= girl.name >> will wander the streets, pushing her comfort level in clothing, flirting with strangers, and all around acting <<- T("-modesty", "adj") >>.',
  tags: {
    outdoors: true
  },
  variants: function(time, action) {
    var i = 3 - Math.floor(this.modesty / 33 + Math.random());
    if (i == 3 && Math.random() > this.endurance / 100) { i = 4; }
    return i;
  },
  results: [
    {
      image: 'base',
      message: '<<= girl.name >> wore a skirt that didn\'t reach all the way down to the ground, and wore sandals - some passerby even caught sight of her toes as she took a walk. Scandalous!',
      delta: {
        endurance: -3,
        happiness: -7,
        obedience: 0.1,
        modesty: -2
      }
    },
    {
      image: 'exercise',
      message: '<<= girl.name >> wore a short skirt, wandering through the city park. She stopped by the playground to watch the children for a while - and when a little boy hurt himself, she bent down to help him. Not an event worthy of remark, save that it bared her panties and part of her ass to the boy\'s father, who whistled in appreciation. She blushed furiously, and ran home in embarrassment.',
      delta: {
        endurance: -4,
        happiness: -4,
        modesty: -2,
        'soft libido': 0.1
      }
    },
    {
      image: 'exercise',
      message: '<<= girl.name >> wore a skimpy outfit, miniskirt and too-small t-shirt. << if (time == "morning") { >>She wandered through the busiest parts of the city, treating select passerby to a brief glimpse of her pantieless pussy as she bent over to "retrieve" a dropped object. The tiny top didn\'t leave much to the imagination.<< } else { >>She stopped by the park, and, feeling brave, left everything except her panties on the shore. Ignoring the "no swimming" signs, she was pretty sure a few people caught sight of her in the moonlight.<< } >>',
      delta: {
        endurance: -5,
        modesty: -2.5,
        'soft libido': 0.2,
        obedience: -0.5
      }
    },
    {
      image: 'naked',
      message: '<<= girl.name >> left her clothes in a pile on her bed and stepped out into the street. Though this city is famed for its prostitutes and brothels, still the sight of a fully naked woman shamelessly flaunting herself is an unusual one, and turned many heads. <<= Math.choice(["Almost immediately", "Ten minutes", "Half an hour", "An Hour"]) >> into her walk, she heard a whistle and some shouting - she spent the rest of the <<= time >> running from the guards - an exhilarating chase, breasts bouncing and wind whipping private bits.',
      delta: {
        endurance: -10,
        constitution: 1,
        happiness: 4,
        modesty: -3,
        obedience: -2
      }
    },
    {
      image: ['naked', 'prison'],
      message: [
        '<<= girl.name >> left her clothes in a pile on her bed and stepped out into the street. Though this city is famed for its prostitutes and brothels, still the sight of a fully naked woman shamelessly flaunting herself is an unusual one, and turned many heads. <<= Math.choice(["Almost immediately", "Ten minutes", "Half an hour", "An Hour"]) >> into her walk, she heard a whistle and some shouting - the guards were after her.',
        'She wasn\'t fast enough. They soon caught up with <<= girl.name >>, bringing her escapade to a rough and crashing halt. The guards took her to the town gaol and locked her up. It was miserable and cold, but in light of her nakedness at least she got her own cell. Since she didn\'t have any money on her, you were called in and had to pay her fine.'
      ],
      delta: {
        endurance: -5,
        constitution: 0.3,
        happiness: -7,
        modesty: -2,
        obedience: 2,
        money: -150
      }
    }
  ]
};

Actions.OD = {
  mins: {
    endurance: 15,
    obedience: 60
  },
  ownerParticipation: true,
  label: 'Orgasm Denial',
  group: 'Training',
  description: 'You will bring <<= girl.name >> close to orgasm, and keep her there for as long as possible before release.',
  tags: {},
  options: {
    soft: T('soft'),
    hard: T('hard'),
    anal: T('anal'),
    fetish: T('fetish')
  },
  variants: function(time, action) {
    return Girl.sex.indexOf(action.options);
  },
  results: [
    {
      image: 'soft',
      message: '<<= girl.name >> lay on her bed naked while you covered her with kisses, along her neck and down to her breasts, teasing them for a minute before moving down along her stomach to her pussy. You licked her pussy and rubbed her clit gently her until she was sopping wet and wreathing in pleasure - before ceasing all stimulation.',
      delta: {
        endurance: -5,
        happiness: 3,
        obedience: 0.3,
        'soft libido': 2.5
      }
    },
    {
      image: 'hard',
      message: 'You pushed <<= girl.name >> up against the wall while rubbing her pussy with one hand through her underwear. As she got more worked up, you introduced a dildo, pushing it inside up to the hilt without removing her clothing. Nibbling on her ear and whispering in her ear, you continued to play mercilessly with her sex, never quite providing enough stimulation to bring her to orgasm.',
      delta: {
        endurance: -6,
        happiness: 4,
        obedience: 0.3,
        'hard libido': 2.5
      }
    },
    {
      image: 'anal',
      message: 'Stripping off all of <<= girl.name >>\'s clothes, you had her lay across the bed face down, feet kicked up in the air while you settled in behind her. Playing with her pussy for a minute to get her wet, you finally produced a well lubricated dildo and pressed it against her ass, lightly then with increasing pressure until it finally slid in with a pop. You slid off the bed to bring your dead level with her pussy, licking and sucking on her love button while you continued to play with the dildo with one hand, pressing it further in, rotating it around and generally bringing her to the very edge of orgasm before backing off, only to begin again in a few minutes.',
      delta: {
        endurance: -7,
        happiness: 5,
        obedience: 0.3,
        'anal libido': 2.5
      }
    },
    {
      image: 'fetish',
      message: 'Blindfolding <<= girl.name >> and taking away all of her clothes, you bound her libs to each corner of the bed, and began to lick and finger her pussy. Every time she moved so much as an inch, you left the room for five minutes - it took hours for her to finally stay still long enough to achieve an orgasm.',
      delta: {
        endurance: -8,
        happiness: 3,
        obedience: 1,
        'fetish libido': 2.5
      }
    }
  ]
};
