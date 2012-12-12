define([], [
  {
    _id: 'Exercise',
    mins: {
      endurance: 15
    },
    label: 'Exercise',
    group: 'Training',
    description: 'She will spend time jogging around the city and otherwise exercising outdoors to increase her constitution.',
    tags: {
      outdoors: true
    },
    variants: [0.4, 0.4, 0.2],
    results: [
      {
        image: 'exercise',
        message: '<%= girl.name %> jogged around the city. It was a fine day, and she enjoyed herself quite a bit.',
        delta: {
          endurance: -10,
          constitution: 2.5,
          happiness: 3
        }
      },
      {
        image: 'exercise',
        message: '<%= girl.name %> jogged around the city. The weather was thoroughly average.',
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
  }

]);