/*global Game */
Game.config = {
  startMoney: 0,
  gameLength: 720,
  payments: [
    0, 1000, 2000, 3000, 4000, 5000, 6000,
    10000, 12500, 15000, 17500, 20000, 22500,
    25000, 30000, 35000, 40000, 45000, 50000,
    60000, 70000, 80000, 90000, 100000, 120000
  ],
  moneyHistoryLength: 30
};

Game.tooltips = {};

Game.fetishDescriptions = {
  tentacles: 'Tentacled monsters roam the land, searching for human women to satisfy their dark lusts.',
  rape: 'The city guard is not as zealous about enforcing women\'s rights as it should be, and men sometimes take them unwillingly. This does not include mind-control/magic/reluctance - this toggle just controls physical violation by humans.'
};

Game.strings = {
  adj: {
    happiness: 'Joyful',
    endurance: 'Healthy',
    obedience: 'Submissive',
    '-obedience': 'Spirited',
    modesty: 'Modest',
    '-modesty': 'Uninhibited',
    constitution: 'Tireless',
    '-constitution': 'Sickly',
    charisma: 'Friendly',
    '-charisma': 'Unfriendly',
    intelligence: 'Smart',
    '-intelligence': 'Dumb',
    libido: 'Lusty',
    '-libido': 'Indifferent',
    experience: 'Sexy',
    '-experience': 'Inexperienced',
    clean: 'Clean',
    '-clean': 'Dirty',
    reputation: 'Famous',
    '-reputation': 'Unknown'
  },
  noun: {
    happiness: 'Happiness',
    endurance: 'Endurance',
    obedience: 'Obedience',
    modesty: 'Modesty',
    charisma: 'Charisma',
    constitution: 'Constitution',
    intelligence: 'Intelligence',
    experience: 'Experience',
    libido: 'Libido',
    soft: 'Oral',
    hard: 'Vaginal',
    anal: 'Anal',
    fetish: 'Bondage',
    clean: 'Cleanliness',
    reputation: 'Reputation'
  }
};

Game.hotkeys = {
  13: {
    selector: '#next',
    label: 'Enter',
    description: 'Pass the turn'
  },
  71: {
    selector: '#girls .middle:first',
    label: 'g',
    description: 'Open pay & sex type dialog'
  },
  49: {
    selector: '#girls div[name="morning"]:eq(0)',
    label: '1-5',
    description: 'Open 1st-5th girl\'s Action dialog'
  },
  50: { selector: '#girls div[name="morning"]:eq(1)' },
  51: { selector: '#girls div[name="morning"]:eq(2)' },
  52: { selector: '#girls div[name="morning"]:eq(3)' },
  53: { selector: '#girls div[name="morning"]:eq(4)' },
  66: {
    selector: '#buildings .middle:first',
    label: 'b',
    description: 'Open the building management dialog'
  },
  82: {
    selector: '#buildings .right:first',
    label: 'r',
    description: 'Open room management dialog'
  }
};
