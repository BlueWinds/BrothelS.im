Actions.Exercise = {
  mins: {
    endurance: 15
  },
  label: 'Exercise',
  group: 'Training',
  description: '<%= girl.name %> will spend time jogging around the city and otherwise exercising outdoors to increase her <%= Game.strings.noun.constitution %>.',
  tags: {
    outdoors: true
  },
  variants: [0.4, 0.4, 0.2],
  results: [
    {
      image: 'exercise',
      message: '<%= girl.name %> jogged around the city. It was a fine day, and she enjoyed herself quite a bit. <% if (time == "morning") { %>She turned a few heads in her tight tank top, but kept running with a smile.<% } else { %>It got cold when the sun went down, but she kept warm by running faster.<% } %>',
      delta: {
        endurance: -10,
        constitution: 2.5,
        happiness: 3,
        modesty: -0.5
      }
    },
    {
      image: 'exercise',
      message: '<%= girl.name %> jogged around the city. It was a cloudy day, no sun to warm up the miggy streets. By the time she returned, <%= girl.name %> was sweaty and tired.',
      delta: {
        endurance: -15,
        constitution: 1.5
      }
    },
    {
      image: 'tired',
      message: '<%= girl.name %> jogged around the city. The sky was overcast and cloudy, and it began to rain as she neared the end of her run, leaving <%= girl.name %> to miserable and soaked when she returned.',
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
  description: '<%= girl.name %> will attend courses at the local university to increase her <%= Game.strings.noun.intelligence %>.',
  tags: {
  },
  variants: [0.3, 0.4, 0.2, 0.1],
  results: [
    {
      image: 'study',
      message: '<%= girl.name %> attended a course on <%= Math.choice(["history", "mathematics", "geography", "literature"]) %>, a subject which has always interested her. She learned a great deal, and asked you enthusiastically if she can attend the next lecture tomorrow.',
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
      message: '<%= girl.name %> attended a course on <%= Math.choice(["history", "mathematics", "geography", "literature"]) %>. She tried to pay close attention to the professor , but was somewhat distracted by a cute boy sitting in front.',
      delta: {
        endurance: -5,
        intelligence: 1.5,
        money: -100
      }
    },
    {
      image: 'study',
      message: '<%= girl.name %> attended a course on <%= Math.choice(["history", "mathematics", "geography", "literature"]) %>. She wasn\'t particularly interested, and the professor didn\'t impress her. She felt asleep halfway through.',
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
        '<%= girl.name %> attended a course on <%= Math.choice(["history", "mathematics", "geography", "literature"]) %>. She it was an interesting lesson, and she was called on several times by the young professor - more than any other student, in fact. When he politely asked her to stay a after class, she agreed. They chatted about the subject material for a few minutes until the other students left.',
        'The professor kept touching her hand for slightly longer than necessary, and it wasn\'t hard to see what was on his mind. <%= girl.name %> played along with the ruse when he asked her to pick up a pencil he dropped - and it was no surprise when he slapped her ass through her <%= Math.choice(["skirt", "pants"]) %>. They ended up making a real mess of one corner of the room.'
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
  description: '<%= girl.name %> will wander the streets, pushing her comfort level in clothing, flirting with strangers, and all around acting <%= Game.strings.adj["-modesty"] %>.',
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
      message: '<%= girl.name %> wore a skirt that didn\'t reach all the way down to the ground, and wore sandles - some passerby even caught sight of her toes as she took a walk. Scandalous!',
      delta: {
        endurance: -3,
        happiness: -7,
        obedience: 0.1,
        modesty: -2
      }
    },
    {
      image: 'exercise',
      message: '<%= girl.name %> wore a short skirt, wandering through the city park. She stopped by the playground to watch the children for a while - and when a little boy hurt himself, she bent down to help him. Not an event worthy of remark, save that it bared her panties and part of her ass to the boy\'s father, who whistled in appreciation. She blushed furiously, and ran home in embarassement.',
      delta: {
        endurance: -4,
        happiness: -4,
        modesty: -2,
        'soft libido': 0.1
      }
    },
    {
      image: 'exercise',
      message: '<%= girl.name %> wore a skimpy outfit, miniskirt and too-small t-shirt. <% if (time == "morning") { %>She wandered through the busiest parts of the city, treating select passerby to a brief glimpse of her pantiless pussy as she bent over to "retrieve" a dropped object. The tiny top didn\'t leave much to the imagination.<% } else { %>She stopped by the park, and, feeling brave, left everything except her panties on the shore. Ignoring the "no swimming" signs, she was pretty sure a few people caught sight of her in the moonlight.<% } %>',
      delta: {
        endurance: -5,
        modesty: -2.5,
        'soft libido': 0.2,
        obedience: -0.5
      }
    },
    {
      image: 'naked',
      message: '<%= girl.name %> left her clothes in a pile on her bed and stepped out into the street. Though this city is famed for its prostitutes and brothels, still the sight of a fully naked woman shamelessly flaunting herself is an unusual one, and turned many heads. <%= Math.choice(["Almost immediately", "Ten minutes", "Half an hour", "An Hour"]) %> into her walk, she heard a whistle and some shouting - she spent the rest of the <%= time %> running from the guards - an exhillerating chase, breasts bouncing and wind whipping private bits.',
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
        '<%= girl.name %> left her clothes in a pile on her bed and stepped out into the street. Though this city is famed for its prostitutes and brothels, still the sight of a fully naked woman shamelessly flaunting herself is an unusual one, and turned many heads. <%= Math.choice(["Almost immediately", "Ten minutes", "Half an hour", "An Hour"]) %> into her walk, she heard a whistle and some shouting - the guards were after her.',
        'She wasn\'t fast enough. They soon caught up with <%= girl.name %>, bringing her escapade to a rough and crashing halt. The guards took her to the town gaol and locked her up. It was miserable and cold, but in light of her nakedness at least she got her own cell. Since she didn\'t have any money on her, you were called in and had to pay her fine.'
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
