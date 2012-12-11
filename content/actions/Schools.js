define([], [
  {
    _id: 'Exercise',
    mins: {
      endurance: 15
    },
    label: 'Exercise',
    description: 'She will spend time jogging around the city and otherwise exercising outdoors to increase her constitution.',
    chances: [
      0.5,
      0.5
    ],
    message: [
      '<%= name %> jogged around the city. It was a fine day, and she enjoyed herself quite a bit.',
      '<%= name %> jogged around the city. The sky was overcast and cloudy, and it began to rain as she neared the end of her run, leaving <%= name %> to miserable and soaked when she returned.'
    ],
    delta: [
      {
        endurance: -15,
        constitution: 1.5,
        happiness: 3
      },
      {
        endurance: -20,
        constitution: 1.5,
        happiness: -3
      },
    ],
    image: ['exercise', 'tired']
  }
]);