Object.defineProperty(RandomPeople, '_classes', { value: [
  'Very Low Class',
  'Low Class',
  'Middle Class',
  'Upper Class',
  'High Class'
]});

RandomPeople['Very Low Class'] = {
  'Homeless Person': {
    wants: ['libido', 'experience', 'charisma', 'constitution']
  },
  'Druggie': {
    wants: ['constitution', 'libido', '-modesty', 'obedience']
  },
  'Refugee': {
    wants: ['obedience', 'charisma', 'modesty', 'happiness']
  }
};

RandomPeople['Low Class'] = {
  'Barkeep': {
    wants: ['-obedience', 'experience', 'endurance', 'libido']
  },
  'Brewer': {
    wants: ['-intelligence', 'experience', '-modesty', 'constitution']
  },
  'Sailor': {
    wants: ['-obedience', '-modesty', 'endurance', 'experience']
  },
  'Blacksmith': {
    wants: ['-libido', 'constitution', 'modesty', '-intelligence']
  }
};

RandomPeople['Middle Class'] = {
  'Chef': {
    wants: ['charisma', 'constitution', 'experience', 'endurance']
  },
  'Priest': {
    wants: ['obedience', 'intelligence', 'modesty', '-experience']
  },
  'Astrologer': {
    wants: ['-intelligence', 'obedience', 'libido', 'charisma']
  },
  'Artisian': {
    wants: ['-libido', 'intelligence', 'happiness', 'experience']
  }
};

RandomPeople['Upper Class'] = {
  'Diplomat': {
    wants: ['charisma', 'intelligence', '-experience', '-libido']
  },
  'Courtier': {
    wants: ['experience', 'obedience', 'charisma', 'libido']
  },
  'Advocate': {
    wants: ['intelligence', 'obedience', 'modesty', '-experience']
  },
  'Sargent': {
    wants: ['constitution', '-obedience', 'happiness', 'endurance']
  }
};

RandomPeople['High Class'] = {
  'Drug Lord': {
    wants: ['libido', '-intelligence', 'obedience', 'modesty'],
    description: [
      'He was a sneering man, with a hook nose and evil, beady little eyes. She didn\'t like him at all.',
      'Despite his profession as a purveyor of drugs and other unsavories, he was a perfect gentleman, tall and slender and elegant.',
      'He wasn\'t what she was expecting from his reputation - one would hardly suspect such a small, inoffensive man of being a dangerous criminal.'
    ],
    image: ['/content/randomPerson/DrugDealer1.jpg', '/content/randomPerson/DrugDealer2.jpg', '/content/randomPerson/DrugDealer3.jpg']
  },
  'Duke': {
    wants: ['charisma', '-modesty', 'intelligence', '-obedience'],
    description: [
      'Detached and distracted, he hardly seemed to notice her.',
      'Muscular and rugged looking, she worried at his hands, which would look more at home with a broadsword than ballroom.',
      'Soft and slightly round around the middle, his hands jingled with a dozen rings.'
    ],
    image: ['/content/randomPerson/Duke1.jpg', '/content/randomPerson/Duke2.jpg']
  },
  'High Priest': {
    wants: ['modesty', 'obedience', 'libido', 'intelligence'],
    description: [
      'Pale and bookish, she wondered if he knew what to do with a woman at all.',
      'Outgoing and energetic, he pumped her hand enthusiastically and she couldn\'t help but smile back.',
      'Old and grey headed, he moved slowly - at least until he saw her, and his wizened features sprang to life.'
    ],
    image: ['/content/randomPerson/Priest1.jpg', '/content/randomPerson/Priest2.png', '/content/randomPerson/Priest3.jpg']
  },
  'Knight': {
    wants: ['charisma', 'constitution', 'modesty', 'happiness'],
    description: [
      'Noble and elegant, she suspected his title was inherited and the sword at his side only for show.',
      'A massive scar ran across his face, evidence that the title of Knight was not lightly earned.',
      'Younger than she had expected, he seemed newly come into his position, the sword at his side an uncomfortable burden.'
    ],
    image: ['/content/randomPerson/Knight1.jpg', '/content/randomPerson/Knight2.png']
  }
};
