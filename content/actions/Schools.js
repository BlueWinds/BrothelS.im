Actions.Exercise = {
  mins: {
    endurance: 15
  },
  label: 'Exercise',
  group: 'Training',
  description: '<%= girl.name %> will spend time jogging around the city and otherwise exercising outdoors to increase her constitution.',
  tags: {
    outdoors: true
  },
  variants: [0.4, 0.4, 0.2],
  results: [
    {
      image: 'exercise',
      message: '<%= girl.name %> jogged around the city. It was a fine day, and she enjoyed herself quite a bit. <% if (time == "morning") { %>She bought turned a few heads in her tight tank top, but kept running with a smile.<% } else { %>It got cold when the sun went down, but she kept warm by running faster.<% } %>',
      delta: {
        endurance: -10,
        constitution: 2.5,
        happiness: 3
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
        happiness: -3
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
  description: '<%= girl.name %> will attend courses at the local university.',
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
        money: -100
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
      message: '<%= girl.name %>  attended a course on <%= Math.choice(["history", "mathematics", "geography", "literature"]) %>. She wasn\'t particularly interested, and the professor didn\'t impress her. She felt asleep halfway through.',
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
        '<%= girl.name %>  attended a course on <%= Math.choice(["history", "mathematics", "geography", "literature"]) %>. She it was an interesting lesson, and she was called on several times by the young professor - more than any other student, in fact. When he politely asked her to stay a after class, she agreed. They chatted about the subject material for a few minutes until the other students left.',
        'The professor kept touching her hand for slightly longer than necessary, and it wasn\'t hard to see what was on his mind. <%= girl.name %> played along with the ruse when he asked her to pick up a pencil he dropped - and it was no surprise when he slapped her ass through her <%= Math.choice(["skirt", "pants"]) %>. They ended up making a real mess of one corner of the room.'
      ],
      delta: {
        endurance: -10,
        intelligence: 1,
        'hard experience': 1,
        'hard libido': 1,
        money: 50
      }
    }
  ]
};