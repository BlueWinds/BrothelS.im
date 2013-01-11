Actions.Streetwalk =  {
  label: 'Streetwalk',
  group: 'Jobs',
  missionsDone: {
    libidoAndExperience: true
  },
  description: '<<= girl.name >> will wander the streets looking for customers to service. This tends to be quite tiring, and not as profitable as other options, but it won\'t count against the customers or reputation of your buildings.',
  safety: 0.5,
  mins: {
    obedience: 20,
    happiness: 20,
    endurance: 25
  },
  disabled: function(time, action) {
    for (var i in Girl.sex) {
      if (this.actions[Girl.sex[i]]) { return false; }
    }
    return 'You must allow her to perform at least one type of sex before she can streetwalk.';
  },
  maxes: {
    modesty: 50
  },
  // externalFunction key provided by prostitution module, since it's too complex to put here.
  tags: {
    outdoors: true,
    prostitution: true
  },
  // These are non-standard keys - the externalFunction uses them.
  // The overall message for each girl.
  message: '<<= girl.name >> walked around the city propositioning strangers.',
  // The message if she refuses.
  uncooperative: 'But she was uncooperative and <strong>refused</strong>. He left unsatisfied without paying anything.',
  // Message for each customer she services.
  customerMessage: '<<= girl.name >> met <<= customer.name + " the " + customer.profession >>, looking for <<- T(customer.sex[0]) >> with a girl who was <<- customer.wants.slice(0, 2).CtoString("adj") >>. They agreed on <strong><<- T(sex) >></strong>.<br><br><<- result >>'
};

Actions.Whore = {
  label: 'Whore',
  group: 'Jobs',
  missionsDone: {
    cleanBuilding: true
  },
  mins: {
    obedience: 20,
    happiness: 20,
    endurance: 25
  },
  disabled: function(time, action) {
    // Hide the action entirely if she doesn't have her own bedroom.
    if (!this.bedroom()) { return true; }
    for (var i in Girl.sex) {
      if (this.actions[Girl.sex[i]]) { return false; }
    }
    return 'You must allow her to perform at least one type of sex before she can whore.';
  },
  eachCustomer: {
    clean: -1,
    endurance: -1
  },
  description: '<<= girl.name >> will wait in the <<= girl.building().name >> for customers to arrive and service them. This action is both less tiring and more profitable than Streetwalking, because customers can choose their favorite among all the girls whoring in a building.',
  // externalFunction key provided by prostitution module, since it's too complex to put here.

  // These are non-standard keys - the externalFunction uses them.
  // The message for each building.
  message: '<<= customers.length >> customers visited the <<= building.name >> in the <<= time >>. <strong><<- girls.Caccumulate("name").CtoString() >></strong> worked there, servicing <<= count >> of them.',
  // Reuse the uncooperative message from Streetwalking.
  uncooperative: Actions.Streetwalk.uncooperative,
  // Message for each customer serviced.
  customerMessage: '<<= customer.name + " the " + customer.profession >> wanted <<- T(customer.sex[0]) >> with a girl who was <<- customer.wants.slice(0, 2).CtoString("adj") >>. He chose <<= girl.name >>, and they agreed on <strong><<- T(sex) >></strong>.<br><br><<- result >>'
};
