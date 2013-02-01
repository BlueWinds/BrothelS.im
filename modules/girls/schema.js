Schemas.Stat = {
  type: 'integer',
  minimum: 0,
  maximum: 100,
  required: true
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
        type: [
          { type: 'boolean', 'enum': [false] },
          { type: 'number' }
        ]
      }
    }
  },
  patternProperties: {
    'happiness|endurance|obedience|modesty|charisma|intelligence|constitution|softLibido|hardLibido|analLibido|fetishLibido|softExperience|hardExperience|analExperience|fetishExperience': {
      type: 'number',
      minimum: -100,
      maximum: 100
    }
  },
  additionalProperties: false
};

Schemas.girlConditions = {
  type: 'object',
  description: 'A set of conditions to match against a girl.',
  properties: {
    name: {
      type: 'string'
    },
    status: {
      type: 'string',
      'enum': ['Hired', 'For Hire', 'In Town', 'Gone']
    }
  },
  patternProperties: {
    'min|max': {
      type: 'object',
      properties: {
        specialRules: {
          type: 'object',
          additionalProperties: { type: 'number' }
        }
      },
      patternProperties: {
        '(happiness|endurance|obedience|modesty|charisma|intelligence|constitution|softLibido|hardLibido|analLibido|fetishLibido|softExperience|hardExperience|analExperience|fetishExperience)': { $ref: 'Stat' }
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
      type: 'string'
    },
    status: {
      type: 'string',
      'enum': ['Hired', 'For Hire', 'In Town', 'Gone']
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
        }
      },
      patternProperties: {
        '(happiness|endurance|obedience|modesty|charisma|intelligence|constitution|softLibido|hardLibido|analLibido|fetishLibido|softExperience|hardExperience|analExperience|fetishExperience)': { $ref: 'parsableStat' }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};

Schemas.Girl = {
  title: 'Girl',
  description: "A girl's definition, from which an individual instance of her is created for a game.",
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 4,
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    status: {
      'description': "Hired means she'll start the game working for the player. For Hire means exactly what it sounds like. In Town means she's around, but can't be hired - there should be a mission or event that gives access to her. Gone means she was hired, but has been sold / left town / is otherwise no longer available.",
      'enum': ['Hired', 'For Hire', 'In Town', 'Gone'],
      required: true
    },
    happiness: {
      type: [ { $ref: 'Stat' } ],
      description: "Here, happiness only acts as a multiplier to the girl's hire price - it's always set to 75 when she's hired. Higher values will make her cheaper.",
      'default': 0
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
    images: {
      type: 'object',
      properties: {
        basePath: {
          type: 'string',
          description: 'basePath is from the root of the game to where all of the images are stored. This is not auto-detected to leave open the possibility using other sources of images later.',
          required: true
        },
        base: {
          type: 'string',
          pattern: "^.+\\.(png|jpg|gif)$",
          required: true
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
      additionalProperties: false,
      required: true
    }
  },
  patternProperties: {
    'happiness|endurance|obedience|modesty|charisma|intelligence|constitution|softLibido|hardLibido|analLibido|fetishLibido|softExperience|hardExperience|analExperience|fetishExperience': { $ref: 'Stat' }
  },
  additionalProperties: false
};
