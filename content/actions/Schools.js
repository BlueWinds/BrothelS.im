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
  variants: function(time, action, done) {
    var i = 3 - Math.floor(this.modesty / 33 + Math.random() * 2);
    if (i == 4 && Math.random() > this.endurance / 100) { i = 5; }
    done(i);
  },
  results: [
    {
      image: 'base',
      message: '<<= girl.name >> wore a skirt that didn\'t reach all the way down to the ground, and wore sandals - some passersby even caught sight of her toes as she took a walk. Scandalous!',
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
      message: '<<= girl.name >> wore a skimpy outfit, miniskirt and too-small t-shirt. << if (time == "morning") { >>She wandered through the busiest parts of the city, treating select passersby to a brief glimpse of her pantiles pussy as she bent over to "retrieve" a dropped object. The tiny top didn\'t leave much to the imagination.<< } else { >>She stopped by the park, and, feeling brave, left everything except her panties on the shore. Ignoring the "no swimming" signs, she was pretty sure a few people caught sight of her in the moonlight.<< } >>',
      delta: {
        endurance: -5,
        modesty: -2.5,
        'soft libido': 0.2,
        obedience: -0.5
      }
    },
    {
      image: 'exercise',
      message: '<<= girl.name >> explored the city topless, wearing only a miniskirt that barely reached past her butt. She got plenty of catcalls, and one pair of young men was brave enough to proposition her. << if (girl.building()) { >>She declined for the moment, saying the they could visit her later at the <<= girl.building().name >> if they were still interested.<< } else { >>She declined since she wasn\'t working at the moment, but stroked their cocks through their pants as they talked, leaving them with raging hardons and a mischevious wink as the went on her way.<< } >>',
      delta: {
        endurance: -5,
        modesty: -3,
        reputation: 3.5
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
  variants: function(time, action, done) {
    done(Girl.sex.indexOf(action.options));
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

Actions.Acolyte = {
  mins: {
    endurance: 10
  },
  label: 'Acolyte',
  group: 'Training',
  description: '<<= girl.name >> will work in a temple, serving the poor, maintaining the property and generally engaging in holy work. This will raise her <<- T("modesty") >>.',
  tags: {
    outdoors: true
  },
  variants: function(time, action, done) {
    if (this.modesty < 65) {
      done(Math.choice([0, 1, 2]));
    } else {
      done(Math.choice([0, 1, 2, 3, 4, 5]));
    }
  },
  results: [
    {
      image: 'study',
      message: '<<= girl.name >> went to a temple to offer her services, and ended up helping to distribute food to the poor. Considering what she wore compared to the shapeless outfits of the nuns, it was no surprise that her line was twice the length of any other.',
      delta: {
        endurance: -5,
        happiness: 4,
        modesty: 4.5
      }
    },
    {
      image: 'study',
      message: "<<= girl.name >> volunteered at a temple, and spent several hours teetering on a rickety ladder, dusting stained glass windows that hadn't been touched in years. She was surprised to discover, hidden away in the rafters, what could only be a dildo. One wonders how it made its way into the rafters of a temple...",
      delta: {
        endurance: -5,
        happiness: 4,
        modesty: 3,
        "soft libido": 0.7
      }
    },
    {
      image: 'study',
      message: '<<= girl.name >> arrived at the temple just after <<= time >> prayer, and spent ended up serving tea and coffee in the lobby so that one of the priestesses could attend to other business. She visited the bathroom during a lull, only to see the priestesses cleaning up - apparently "other business" included smudged lipstick and a suspicious white stain in her hair...',
      delta: {
        endurance: -4,
        happiness: 3,
        modesty: 3.5
      }
    },
    {
      image: 'study',
      message: '<<= girl.name >>, being quite a familiar face at the temple, was invited to help with planning the upcoming monthly festival. Though put on mostly by The Guild, the temples each contribute their own part, partially to counteract the lascivious nature of the event, and partially because the tourism it brings and the donations they receive on that night are an important source of money.<br><br>She worked diligently, helping to repair props and generally get everything ready for the important night.',
      delta: {
        endurance: -6,
        happiness: 5,
        modesty: 3.5
      }
    },
    {
      image: ['study', 'hard'],
      message: [
        'In light of her pious habits, <<= girl.name >> was asked the help clean parts of the temple seldom seen by visitors - a contingent of priests and priestesses live on the grounds, and there\'s a private garden reserved for their use. She cleaned the kitchen and hallways, until a noise from one of the bedrooms caught her attention. The door was ajar, and she couldn\'t help but peek in...',
        'Four priestesses and three priests were in the middle of most unpropitious acts. Most of them looked ashamed when they noticed her face in the door, but one of the girls, dress hitched up around her waist and wearing nothing else, giggled and pulled <<= girl.name >> into the room. She didn\'t get any more cleaning done that <<= time >>.'
      ],
      delta: {
        endurance: -10,
        happiness: 3,
        modesty: 1.4,
        'hard experience': 1.5
      }
    },
    {
      image: 'study',
      message: 'In light of her pious habits, <<= girl.name >> was asked the help clean parts of the temple seldom seen by visitors - a contingent of priests and priestesses live on the grounds, and there\'s a private garden reserved for their use. She worked in the garden, pulling weeds and cleaning out a fountain basin.<br><br>It was a beautiful piece of art - a naked goddess, water flowing from her mouth. <<= girl.name >> noticed part of the stone was a different color - as soon as she touched it, the plugs came away in her hands. Who knew that the goddess was originally lactating and dripping from her pussy...',
      delta: {
        endurance: -5,
        happiness: 4,
        modesty: 3.5
      }
    }
  ]
};

Actions.TrustBuilding = {
  mins: {
    endurance: 10,
    happiness: 50
  },
  ownerParticipation: true,
  label: 'Trust Building',
  group: 'Training',
  description: '<<= girl.name >> will walk, talk and otherwise spend time with you - good not only for a morale boost for you both, but it will also give you a chance to increase her <<= T("obedience") >>',
  tags: {
    outdoors: true
  },
  variants: function(time, action, done) {
    if (this.obedience <= 40) {
      done(Math.choice([0, 1]));
    } else if (this.obedience <= 60) {
      done(Math.choice([0, 1, 2]));
    } else if (this.obedience <= 80) {
      done(Math.choice([1, 2, 3]));
    } else {
      done(Math.choice([2, 3, 4]));
    }
  },
  results: [
    {
      image: 'rest',
      message: 'The two of you spend some time hanging around the <<= girl.building() ? girl.building().name : "inn" >>, doing some chores together and chatting about various things. She\'s spirited, <<= girl.charisma >= 50 ? "friendly" : "mean" >>, and doesn\'t take orders well, though you try to get her used to listening to your suggestions.',
      delta: {
        happiness: 2,
        obedience: 2
      }
    },
    {
      image: 'exercise',
      message: "The two of you take a brisk walk in the <<= time == 'morning' ? 'sun' : 'moonlight' >>, discussing life, the universe and everything. As you pass by a couple making out on a park bench, you comment on how enthusiastically the woman does whatever her partner asks. <<= girl.name >> snorts at your heavy-handed, but you can see the effort isn't entirely wasted.",
      delta: {
        obedience: 1.5,
        endurance: -3
      }
    },
    {
      image: 'exercise',
      message: "You walk through the city, <<= girl.name >> following one step behind you, eyes on the ground or on you. You look back every few minutes, and if you catch her looking anywhere that isn't the ground or your feet, you stop and watch her disapprovingly until she apologizes.",
      delta: {
        obedience: 2.5,
        happiness: -7,
        charisma: -0.5
      }
    },
    {
      image: ['exercise', 'prison'],
      message: [
        "Tieing a leash around <<= girl.name>>'s neck, you pocket several other items and lead her out into the city. After half an hour, you take out a pair of padded handcuffs and insist she wear them. She looks dubious, but does so. After another hour, you take out a blindfold and put it on, telling her that any objection will result in the removal of all her clothing.",
        "Finally, as you near the end of the walk, you produce the final item - a ball-gag. Fitting it in, you lead her home, smiling at the stares and whispered comments pointed in your direction. The public around here knows a good whore when the see one."
      ],
      delta: {
        obedience: 3.5,
        happiness: -4,
        modesty: -1
      }
    },
    {
      image: 'fetish',
      message: "<<= girl.name >> is almost completely submissive, so when you order her to strip and stand in the corner, she doesn't debate. She shivers slightly when you hand her dildo panties to wear, with a string tied to the base, and watches curiously as you sit down in a chair nearby and pull out a book. You tell her to remain still, and start to read. Every attempt to pleasure herself with the dildo is met with a sharp tug on the string, every movement with a disapproving glance over the top of the book.",
      delta: {
        obedience: 4,
        happiness: -5,
        intelligence: -0.3,
        'soft libido': 1.4
      }
    }
  ]
};
