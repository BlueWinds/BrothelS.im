/*global Game */
Game.config = {
  version: 0.5,
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
  76: {
    selector: '#load',
    label: 'L',
    description: 'Load Game dialog'
  },
  78: {
    selector: '#new',
    label: 'N',
    description: 'New Game dialog'
  },
  83: {
    selector: '#save',
    label: 'S',
    description: 'Save Game dialog'
  },
  13: {
    selector: '#next',
    label: 'Enter',
    description: 'Pass the turn'
  },
  77: {
    selector: '#show-messages',
    label: 'M',
    description: 'Messages dialog'
  },
  71: {
    selector: '#girls .middle:first',
    label: 'G',
    description: 'Pay & sex type dialog'
  },
  49: {
    selector: '#girls div[name="morning"]:eq(0)',
    label: '1-5',
    description: '1st-5th girl\'s Action dialog'
  },
  50: { selector: '#girls div[name="morning"]:eq(1)' },
  51: { selector: '#girls div[name="morning"]:eq(2)' },
  52: { selector: '#girls div[name="morning"]:eq(3)' },
  53: { selector: '#girls div[name="morning"]:eq(4)' },
  66: {
    selector: '#buildings .middle:first',
    label: 'B',
    description: 'Building Management dialog'
  },
  82: {
    selector: '#buildings .right:first',
    label: 'R',
    description: 'Room Management dialog'
  }
};
