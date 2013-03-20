/*global Game */
'use strict';
Game.config = {
  version: 0.521,
  startMoney: 0,
  gameLength: 720,
  payments: [
    0, 1000, 2000, 3000, 4000, 5000, 7000,
    9000, 11000, 13000, 15000, 18000, 21000,
    24000, 27000, 30000, 34000, 38000, 42000,
    46000, 50000, 55000, 60000, 65000, 75000
  ],
  moneyHistoryLength: 30,
  imageSize: localStorage.getItem('imageSize') !== null ? parseInt(localStorage.getItem('imageSize'), 10) : 20
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
  },
  61: {
    label: '=/+',
    description: 'Increase image sizes',
    allowDialogs: true,
    callback: function() {
      Game.config.imageSize = Math.min(40, Game.config.imageSize + 1);
      localStorage.setItem('imageSize', Game.config.imageSize);
      e.invokeAll('Autorender', $('head'));
    }
  },
  173: {
    label: '-',
    description: 'Decrease image sizes',
    allowDialogs: true,
    callback: function() {
      Game.config.imageSize = Math.max(0, Game.config.imageSize - 1);
      localStorage.setItem('imageSize', Game.config.imageSize);
      e.invokeAll('Autorender', $('head'));
    }
  }
};
