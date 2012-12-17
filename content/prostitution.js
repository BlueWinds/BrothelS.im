Actions.Streetwalk.config = {
  maxCustomers: 6,
  types: {
    soft: {
      r: 0.4,
      endurance: -6,
      money: 100,
      'soft experience': 1
    },
    hard: {
      r: 0.6,
      endurance: -9,
      money: 150,
      'hard experience': 1,
      'soft experience': 0.2
    },
    anal: {
      r: 0.7,
      endurance: -14,
      money: 230,
      'anal experience': 1,
      'hard experience': 0.2,
      'soft experience': 0.2
    },
    fetish: {
      r: 0.85,
      endurance: -16,
      money: 450,
      'fetish experience': 1,
      'anal experience': 0.2,
      'hard experience': 0.2,
      'soft experience': 0.2
    }
  },
  results: {
    soft: [
      'They kissed passionatly for a while, then he blushed, mumbled about the time and left in a hurry.',
      'She sucked his dick in the middle of the street, though she didn\'t swallow.',
      'He caressed her breasts and licked her pussy in an alley way, then they switched places and she gave him a blowjob.',
      'She crouched down behing a trash can and gave him a titjob.',
      'He jerked off all over her face and hair, then left in a hurry.'
    ],
    hard: [
      'He fucked her silly in the plain view of passerby.',
      'They found an abandoned lot for privacy, and he came in her pussy.',
      'He fucked her in an ally, but pulled out to give her a facial.',
      'They kissed and fondled eachother, than made slow love beneath a tree in the park.'
    ],
    anal: [
      'He pounded her ass mercilessly in a dirty alley.',
      'He alternated between her ass and pussy for several minutes before blowing his load in her ass.',
      'He bent her over a bench in the park and too her ass doggy style.',
      'His dick was almost too large to fit, so she had to warm up first using a dildo.'
    ],
    fetish: [
      'He stripped her naked and tied her to a streetlamp on a busy corner, then left.',
      'They went to a deserted allyway and he tied her arms to a railing, then spanked her until she started crying.',
      'He produced a whole jar of semen he acquired from somehwere and made her drink it all.',
      'He tied her up tightly and had his way with every hole.',
      'He bound her arms and paraded her around town naked.'
    ]
  },
  refuseDelta: {
    obedience: -2,
    happiness: -3
  },
  streetwalkDelta: {
    endurance: -10,
    happiness: -5
  }
};

Actions.Whore.config = {
  minCustomers: 1,
  maxCustomers: 20,
  uncooperative: Actions.Streetwalk.config.uncooperative,
  customerClass: {
    'Very Low Class': {
      min: 0,
      max: 25,
      pays: 0.8,
      minSatisfaction: 0.5,
      bad: -0.2,
      good: 0.2
    },
    'Low Class': {
      minReputation: 10,
      maxReputation: 60,
      pays: 1.2,
      minSatisfaction: 0.6,
      bad: -0.5,
      good: 0.5
    },
    'Middle Class': {
      minReputation: 25,
      maxReputation: 90,
      pays: 1.5,
      minSatisfaction: 0.7,
      bad: -1,
      good: 0.5
    },
    'Upper Class': {
      minReputation: 60,
      maxReputation: 100,
      pays: 1.9,
      minSatisfaction: 0.9,
      bad: -2,
      good: 1
    },
    'High Class': {
      minReputation: 80,
      maxReputation: 100,
      pays: 2.3,
      minSatisfaction: 1.1,
      bad: -3,
      good: 1.5
    }
  }
};
