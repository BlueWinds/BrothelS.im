Schemas.Context = {
  type: 'object',
  properties: {
    girl: { $ref: 'liveGirl' },
    building: { $ref: 'liveBuilding' },
    room: { $ref: 'liveRoom' },
    time: {
      'enum': ['morning', 'evening']
    },
    mission: { $ref: 'liveMission' }
  },
  additionalProperties: false
};

Schemas.Conditions = {
  type: 'object',
  description: 'A set of conditions that can be compared to a Context, or can build a Context (failing if no matching Context can be created given the Condition\'s constraints).',
  properties: {
    fetishes: {
      type: 'object',
      'default': false,
      description: 'fetishes specifies which checkboxes must be checked in order for this event/mission/action to appear in the game.',
      patternProperties: {
        'tentacles|rape': { 'enum': [true] }
      },
      additionalProperties: false
    },
    time: {
      'enum': ['morning', 'evening'],
      description: "The time condition only matches during the morning or the evening. If the current context doesn't include a time, then this condition always passes."
    },
    likelyhood: {
      type: 'number',
      minimum: 0,
      exclusiveMinimum: true,
      maximum: 1,
      'default': 1,
      description: "likelyhood is a probability that these conditions will match - 0.2 means that these conditions will only match 20% of the time, even if all the other checks pass."
    },
    girl: {
      anyOf: [{ $ref: 'girlConditions' }],
      description: 'Must match the girl in the current context - if none is already there, it will add the first Hired girl who matches.'
    },
    building: {
      anyOf: [{ $ref: 'buildingConditions' }],
      description: 'Must match the building in the current context - if none is already there, it will add the first Owned building which matches.'
    },
    missions: {
      type: 'object',
      description: 'Each key is a mission _id, each value a number indicating what status it must have.',
      additionalProperties: {
        type: 'integer',
        minimum: -3,
        maximum: 3,
        description: "-3 indicates that the mission must not be in progress or completed.\n" +
        "-2 indicates that the mission must not be complete.\n" +
        "-1 indicates the the mission must not be in progress.\n" +
        "0 indicates that any mission status is allowed.\n" +
        "1 indicates that this mission must currently be in progress.\n" +
        "2 matches only if the mission is complete.\n" +
        "3 matches if the mission is either complete or in progress.",
        'default': 0
      }
    }
  },
  patternProperties: {
    'min|max': {
      type: 'object',
      properties: {
        day: {
          type: 'integer',
          minimum: -1,
          description: 'You can use "-1" as a special value to match "immediately at the start of the game".'
        },
        girls: {
          type: 'integer',
          minimum: 0,
          maximum: 5,
          description: 'The number of girls the player has hired.'
        },
        buildings: {
          type: 'integer',
          minimum: 0,
          maximum: 2,
          description: 'The number of buildings the player owns.'
        },
        money: { type: 'integer' }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};

Schemas.parsableConditions = {
  type: 'object',
  properties: {
    girl: { $ref: 'parsableGirlConditions' },
    building: { $ref: 'parsableBuildingConditions' }
  },
  patternProperties: {
    'min|max': {
      type: 'object',
      properties: {
        day: {
          type: ['integer', 'string'],
          minimum: -1,
          pattern: '\\+|-[0-9]+',
          description: 'You can use "-1" as a special value to match "immediately at the start of the game". If the value is a string, it will be relative to the current game day - so "+3" means "three days from the time these conditions are parsed".'
        },
        girls: {
          type: ['integer', 'string'],
          minimum: 0,
          maximum: 5,
          pattern: '\\+|-[0-9]+',
          description: 'The number of girls the player has hired. If a string, it will be relative to the number of girls the player has when these are first evaluated.'
        },
        buildings: {
          type: ['integer', 'string'],
          minimum: 0,
          maximum: 2,
          pattern: '\\+|-[0-9]+',
          description: 'The number of buildings the player owns. If a string, it will be relative to the number of buildings the player has when these are first evaluated.'
        },
        money: {
          type: ['integer', 'string'],
          description: 'If a string, it will be relative to the money the player has when these are first evaluated.',
          pattern: '\\+|-[0-9]+'
        }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};

Schemas.Result = {
  type: 'object',
  description: 'A set of results, always applied with a Context (though what the Context contains of course varies).',
  properties: {
    money: { 'type': 'integer' },
    girl: { $ref: 'girlDelta' },
    building: { $ref: 'buildingDelta' },
    message: {
      description: 'Either a single message or an array of messages, to be sent using the current Context.',
      oneOf: [
        { $ref: 'Message' },
        {
          'type': 'array',
          additionalItems: { $ref: 'Message' }
        }
      ]
    },
    mission: {
      type: 'string',
      description: 'A Mission to start. If there is a girl in the context, if can be a mission specific to her. The mission will inherit the current context, and its Conditions will *not* be checked.'
    }
  },
  additionalProperties: false
};

Schemas.Resolvable = {
  type: 'object',
  description: 'Resolvable is a very abstract concept - it includes Actions, Events and Missions - anything that checks a set of Conditions, builds a Context and then applies a Result using it.',
  required: [
    '_id', 'results'
  ],
  properties: {
    _id: { type: 'string' },
    initialize: {
      type: 'function',
      'arguments': ['context'],
      description: 'An optional function called when this Resolvable is created. If it returns "false" (the boolean, not just anything that == false), it is the same as if the action\'s Conditions did not match (the action won\'t be available, the event won\'t trigger, etc). It should not modify anything outside of "this.special" - the Resolvable itself - since, for example, Actions are created many times (and thus this function called repeatedly).'
    },
    variants: {
      type: ['function', 'array'],
      description: "If not present, a random choice will be selected from results. If it's a function, it must call done(delta), where delta is a Result. If variants is an array, its items are checked in turn until one matches, and the result matching its index is applied (the easiest way to understand this is by example - see content/girls/Yuna/base.js, in Girls.Yuna.Actions.Summon).",
      'arguments': ['context', 'done'],
      additionalItems: {
        anyOne: [
          { type: 'number', maximum: 1, minimum: 0,
            description: 'The numerical elements should sum up to exactly 1 - each number is the likelyhood that that result will be chosen.'
          },
          {
            anyOf: [{ $ref: 'Conditions' }],
            description: 'If the conditions match, the result corresponding to this element will be applied.'
          }
        ]
      },
      minItems: 1
    },
    results: {
      description: "A set of results for this Resolvable. Which one is applied is determined by 'variants' above. If variants is an array, then this must also be an array of the same length. If variants is a function, then it can use whatever method it pleases to look up items from results.",
      type: ['array', 'object'],
      additionalItems: { $ref: 'Result' },
      additionalProperties: { $ref: 'Result' },
      minItems: 1,
      minProperties: 1
    },
    special: {
      type: 'object',
      description: 'Any special values that the action needs to store go in here.'
    }
  }
};

Schemas.liveResolvable = {
  'type': 'object',
  required: [
    '_class', '_id', 'results'
  ],
  properties: {
    _id: { type: 'string' },
    time: {
      'enum': ['morning', 'evening']
    },
    girl: {
      'enum': Object.keys(Girls)
    },
    building: {
      'enum': Object.keys(Buildings)
    },
    variants: {
      type: ['function', 'array'],
      additionalItems: {
        anyOne: [
          { type: 'number', maximum: 1, minimum: 0 },
          { $ref: 'Conditions' }
        ]
      },
      minItems: 1
    },
    results: {
      type: ['array', 'object'],
      additionalItems: { $ref: 'Result' },
      additionalProperties: { $ref: 'Result' },
      minItems: 1,
      minProperties: 1
    },
    special: { type: 'object' }
  }
};

Schemas.Mission = {
  anyOf: [{ $ref: 'Resolvable' }],
  properties: {
    _id: {},
    initialize: {},
    variants: {},
    results: {},
    special: {},
    conditions: {
      anyOf: [{ $ref: 'Conditions' }],
      description: 'The mission will begin as soon as all of these conditions match, as long as a mission with the same name is not already running (since only one mission of each _id can run at a time, it would overwrite the existing one). If conditions is not present, then this mission will never start on its own - it can only be triggered from a Result.'
    },
    display: {
      anyOf: [{ $ref: 'Message' }],
      description: "If display is present, then this mission will A) send this message when it starts B) appear in the Missions list for the player and C) If mission.end.max.day, send this message again the day before the mission ends, as a reminder."
    },
    end: {
      description: 'If end is not present, then the mission doesn\'t persist - its results trigger immediately. If present, end must be either a function or a set of conditions that triggers the mission to end. If mission.end.max.day and mission.display, then that message will be sent again the day before the mission ends as a reminder for the player that they\'re almost out of time.',
      anyOne: [
        { $ref: 'parsableConditions' },
        {
          type: 'function',
          'arguments': ['context'],
          description: 'If end is a function, then it must return a set of Conditions, which will then be evaluated. This function should not modify anything - it\'s only here for when you need something more complex than just a set of Conditions'
        }
      ]
    }
  },
  additionalProperties: false
};

Schemas.liveMission = {
  anyOf: [{ $ref: 'liveResolvable' }],
  properties: {
    variants: {},
    results: {},
    special: {},
    girl: {},
    building: {},
    time: {},
    _id: {},
    _class: {
      'enum': [ 'Mission' ]
    },
    display: { $ref: 'Message' },
    end: { $ref: 'Conditions' }
  },
  additionalProperties: false
};

Schemas.Girl.properties.Missions = {
  type: 'object',
  additionalProperties: { $ref: 'Mission' },
  description: 'Missions unqiue to this girl - she will always be in context for them. The _id must still be globally unique.'
};

Schemas.Game.required.push('missions', 'missionsDone');
Schemas.Game.properties.missions = {
  type: 'object',
  additionalProperties: { $ref: 'liveMission' }
};
Schemas.Game.properties.missionsDone =  {
  type: 'object',
  additionalProperties: { 'enum': [true] }
};
