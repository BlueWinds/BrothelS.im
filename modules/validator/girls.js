Schemas.Stat = {
  type: 'integer',
  minimum: 0,
  maximum: 100
};

Schemas.statDelta = {
  type: 'number',
  'default': 0,
  minimum: -100,
  maximum: 100
};

Schemas.parsableStat = {
  type: ['integer', 'string'],
  pattern: '\\+|-[0-9]+',
  minimum: 0,
  maximum: 100
};

Schemas.girlDelta = {
  type: 'object',
  properties: {
    money: { type: 'number' },
    specialRules: {
      type: 'object',
      description: "In a girlDelta, each special rule can be a number, adding or subtracting to it as with any other stat. If the girl doesn't have this specialRule, it will be treated as 0 before the modification is applied. Unlike normal stats, specialRules are not limited to the 0-100 range, and they are not rounded to the nearest integer. A special rule can also be 'false', in which case that special rule will be removed from the girl, regardless of value.",
      additionalProperties: {
        anyOne: [
          { type: 'boolean', 'enum': [false] },
          { type: 'number' }
        ]
      }
    },
    happiness: { $ref: 'statDelta' },
    endurance: { $ref: 'statDelta' },
    obedience: { $ref: 'statDelta' },
    modesty: { $ref: 'statDelta' },
    charisma: { $ref: 'statDelta' },
    intelligence: { $ref: 'statDelta' },
    constitution: { $ref: 'statDelta' },
    softLibido: { $ref: 'statDelta' },
    softExperience: { $ref: 'statDelta' },
    hardLibido: { $ref: 'statDelta' },
    hardExperience: { $ref: 'statDelta' },
    analLibido: { $ref: 'statDelta' },
    analExperience: { $ref: 'statDelta' },
    fetishLibido: { $ref: 'statDelta' },
    fetishExperience: { $ref: 'statDelta' }
  },
  additionalProperties: false
};

Schemas.girlConditions = {
  type: 'object',
  description: 'A set of conditions to match against a girl.',
  properties: {
    name: {
      'enum': Object.keys(Girls)
    },
    status: {
      'enum': ['Hired', 'For Hire', 'Town', 'Gone'],
      'default': 'Hired'
    }
  },
  patternProperties: {
    'min|max': {
      type: 'object',
      properties: {
        specialRules: {
          type: 'object',
          additionalProperties: { type: 'number' }
        },
        happiness: { $ref: 'Stat' },
        endurance: { $ref: 'Stat' },
        obedience: { $ref: 'Stat' },
        modesty: { $ref: 'Stat' },
        charisma: { $ref: 'Stat' },
        intelligence: { $ref: 'Stat' },
        constitution: { $ref: 'Stat' },
        softLibido: { $ref: 'Stat' },
        softExperience: { $ref: 'Stat' },
        hardLibido: { $ref: 'Stat' },
        hardExperience: { $ref: 'Stat' },
        analLibido: { $ref: 'Stat' },
        analExperience: { $ref: 'Stat' },
        fetishLibido: { $ref: 'Stat' },
        fetishExperience: { $ref: 'Stat' }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};

Schemas.parsableGirlConditions = {
  type: 'object',
  description: 'As usual girlConditions, except "+3" or "-3" are acceptable values.',
  properties: {
    name: {
      'enum': Object.keys(Girls)
    },
    status: {
      'enum': ['Hired', 'For Hire', 'Town', 'Gone']
    }
  },
  patternProperties: {
    'min|max': {
      type: 'object',
      properties: {
        specialRules: {
          type: 'object',
          additionalProperties: {
            type: ['number', 'string'],
            pattern: '\\+|-[0-9]+'
          }
        },
        happiness: { $ref: 'parsableStat' },
        endurance: { $ref: 'parsableStat' },
        obedience: { $ref: 'parsableStat' },
        modesty: { $ref: 'parsableStat' },
        charisma: { $ref: 'parsableStat' },
        intelligence: { $ref: 'parsableStat' },
        constitution: { $ref: 'parsableStat' },
        softLibido: { $ref: 'parsableStat' },
        softExperience: { $ref: 'parsableStat' },
        hardLibido: { $ref: 'parsableStat' },
        hardExperience: { $ref: 'parsableStat' },
        analLibido: { $ref: 'parsableStat' },
        analExperience: { $ref: 'parsableStat' },
        fetishLibido: { $ref: 'parsableStat' },
        fetishExperience: { $ref: 'parsableStat' }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};

Schemas.Girl = {
  description: "A girl's definition, from which an individual instance of her is created for a game.",
  type: 'object',
  required: [
    'name', 'description', 'status', 'images',
    'happiness', 'endurance', 'obedience', 'modesty',
    'charisma', 'intelligence', 'constitution',
    'softLibido', 'softExperience', 'hardLibido',
    'hardExperience', 'analLibido', 'analExperience',
    'fetishLibido', 'fetishExperience'
  ],
  properties: {
    name: {
      type: 'string',
      minLength: 4
    },
    description: { type: 'string' },
    status: {
      'description': "Hired means she'll start the game working for the player. For Hire means exactly what it sounds like. Town means she's around, but can't be hired - there should be a mission or event that gives access to her. Gone means she was hired, but has been sold / left town / is otherwise no longer available.",
      'enum': ['Hired', 'For Hire', 'Town', 'Gone']
    },
    happiness: {
      anyOne: [ { $ref: 'Stat' } ],
      description: "Here, happiness only acts as a multiplier to the girl's hire price - it's always set to 75 when she's hired. Higher values will make her cheaper."
    },
    endurance: { $ref: 'Stat' },
    obedience: { $ref: 'Stat' },
    modesty: { $ref: 'Stat' },
    charisma: { $ref: 'Stat' },
    intelligence: { $ref: 'Stat' },
    constitution: { $ref: 'Stat' },
    softLibido: { $ref: 'Stat' },
    softExperience: { $ref: 'Stat' },
    hardLibido: { $ref: 'Stat' },
    hardExperience: { $ref: 'Stat' },
    analLibido: { $ref: 'Stat' },
    analExperience: { $ref: 'Stat' },
    fetishLibido: { $ref: 'Stat' },
    fetishExperience: { $ref: 'Stat' },
    specialRules: {
      type: 'object',
      description: 'specialRules is an optional object which can be used to hold girl-specific data (for custom missions, for example), or have various effects on the way she plays.',
      properties: {
        dependentStats: {
          type: 'object',
          description: "The dependentStats special rule allows you to modify the way her stats change. Each key is either a stat,  or a stat preceded buy a '-' sign - '-intelligence'.",
          patternProperties: {
            '-?(happiness|endurance|obedience|modesty|charisma|intelligence|constitution|softLibido|hardLibido|analLibido|fetishLibido|softExperience|hardExperience|analExperience|fetishExperience)': {
              '$ref': 'girlDelta',
              description: "This delta is applied to the girl whenever the associated stat is changed. For example, endurance: { happiness: 0.5 } would mean her happiness rises by 0.5 every time her endurance increases by 1. '-endurance': { happiness: -0.5 } would mean the her happiness decreases as her endurance goes down."
            }
          },
          additionalProperties: false
        },
        payRatio: {
          type: 'number',
          minimum: 0,
          description: "payRatio modifies the amount that the girl wants to get paid. The default is 1 - so this girl here only wants 80% of the pay of someone else with her stats."
        }
      },
      additionalProperties: true
    },
    images: {
      type: 'object',
      required: [ 'basePath', 'base' ],
      properties: {
        basePath: {
          type: 'string',
          description: 'basePath is from the root of the game to where all of the images are stored. This is not auto-detected to leave open the possibility using other sources of images later.'
        },
        base: {
          type: 'string',
          pattern: "^.+\\.(png|jpg|gif)$"
        }
      },
      patternProperties: {
        'refuse|tired|soft|hard|anal|fetish|group|cleaning|exercise|study|prison|naked|tentacles': {
          type: ['string', 'array'],
          description: 'Each value in images must be either a filename or an array of filenames.',
          pattern: "^.+\\.(png|jpg|gif)$",
          additionalItems: {
            type: 'string',
            pattern: '^.+\\.(png|jpg|gif)$'
          }
        }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};

Schemas.liveGirl = {
  type: 'object',
  required: [
    'name', '_class', 'status',
    'happiness', 'endurance', 'obedience', 'modesty',
    'charisma', 'intelligence', 'constitution',
    'softLibido', 'softExperience', 'hardLibido',
    'hardExperience', 'analLibido', 'analExperience',
    'fetishLibido', 'fetishExperience',
    'actions', 'specialRules'
  ],
  properties: {
    name: {
      'enum': Object.keys(Girls)
    },
    _class: {
      'enum': ['Girl']
    },
    status: {
      'enum': ['Hired', 'For Hire', 'Town', 'Gone']
    },
    specialRules: {
      type: 'object',
      description: 'specialRules is an optional object which can be used to hold girl-specific data (for custom missions, for example), or have various effects on the way she plays.',
      properties: {
        dependentStats: {
          type: 'object',
          description: "The dependentStats special rule allows you to modify the way her stats change. Each key is either a stat,  or a stat preceded buy a '-' sign - '-intelligence'.",
          patternProperties: {
            '-?(happiness|endurance|obedience|modesty|charisma|intelligence|constitution|softLibido|hardLibido|analLibido|fetishLibido|softExperience|hardExperience|analExperience|fetishExperience)': {
              '$ref': 'girlDelta',
              description: "This delta is applied to the girl whenever the associated stat is changed. For example, endurance: { happiness: 0.5 } would mean her happiness rises by 0.5 every time her endurance increases by 1. '-endurance': { happiness: -0.5 } would mean the her happiness decreases as her endurance goes down."
            }
          },
          additionalProperties: false
        },
        payRatio: {
          type: 'number',
          minimum: 0,
          description: "payRatio modifies the amount that the girl wants to get paid. The default is 1 - so this girl here only wants 80% of the pay of someone else with her stats."
        }
      },
      additionalProperties: true
    },
    happiness: { $ref: 'Stat' },
    endurance: { $ref: 'Stat' },
    obedience: { $ref: 'Stat' },
    modesty: { $ref: 'Stat' },
    charisma: { $ref: 'Stat' },
    intelligence: { $ref: 'Stat' },
    constitution: { $ref: 'Stat' },
    softLibido: { $ref: 'Stat' },
    softExperience: { $ref: 'Stat' },
    hardLibido: { $ref: 'Stat' },
    hardExperience: { $ref: 'Stat' },
    analLibido: { $ref: 'Stat' },
    analExperience: { $ref: 'Stat' },
    fetishLibido: { $ref: 'Stat' },
    fetishExperience: { $ref: 'Stat' },
    actions: {
      type: 'object',
      required: [ 'pay' ],
      properties: {
        pay: {
          'enum': Object.keys(Girl.config.pay).map(parseFloat)
        },
        soft: { type: 'boolean' },
        hard: { type: 'boolean' },
        anal: { type: 'boolean' },
        fetish: { type: 'boolean' }
      },
      additionalProperties: false
    },
    hireDay: { type: 'integer', minimum: 0 },
    turnDelta: {
      type: ['function', 'object'],
      description: 'This is only a function while the turn is being generated - between turns, it\'s an object.',
      additionalProperties: {
        type: 'integer',
        description: 'How much each stat has changed since yesterday for this girl.'
      }
    }
  },
  additionalProperties: false
};

Schemas.Game.required.push('girls', 'maxGirls');
Schemas.Game.properties.girls = {
  type: 'object',
  required: Object.keys(Girls),
  additionalProperties: { $ref: 'liveGirl' }
};
Schemas.Game.properties.maxGirls = {
  type: 'integer',
  min: 1,
  max: 5
};
