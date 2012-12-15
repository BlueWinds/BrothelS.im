Actions.Streetwalk =  {
  label: 'Streetwalk',
  group: 'Jobs',
  description: 'She will wander the streets looking for customers to service. This tends to be quite tiring, and not as profitable as other options, but it won\'t count against the customers or reputation of your buildings.',
  safety: 0.66,
  mins: {
    obedience: 20,
    happiness: 20,
    endurance: 25
  },
  maxes: {
    modesty: 50
  },
  // externalFunction key provided by prostitution module, since it's too complex to put here.
  tags: {
    outdoors: true,
    prostitution: true
  }
};