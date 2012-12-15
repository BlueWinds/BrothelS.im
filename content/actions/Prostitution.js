Actions.Streetwalk =  {
  label: 'Streetwalk',
  group: 'Jobs',
  description: '<%= girl.name %> will wander the streets looking for customers to service. This tends to be quite tiring, and not as profitable as other options, but it won\'t count against the customers or reputation of your buildings.',
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

Actions.Whore = {
  label: 'Whore',
  group: 'Jobs',
  mins: {
    obedience: 20,
    happiness: 20,
    endurance: 25
  },
  maxes: {
    modesty: 80
  },
  disabled: function(time, action) {
    return !this.bedroom();
  },
  description: '<%= girl.name %> will wait in the <%= girl.building().name %> for customers to arrive and service them. This action is both less tiring and more profitable than Streetwalking, because customers can choose their favorite among all the girls whoring in a building.'
};
