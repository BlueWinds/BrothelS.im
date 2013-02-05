"use strict";
Schemas.Context = {
  type: 'object',
  properties: {
    girl: { $ref: 'liveGirl' },
    building: { $ref: 'liveBuilding' },
    room: { $ref: 'liveRoom' },
    time: {
      'enum': ['morning', 'evening']
    }
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
          items: { $ref: 'Message' }
        }
      ]
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
      items: {
        anyOf: [
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
      items: { $ref: 'Result' },
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
      items: {
        anyOf: [
          { type: 'number', maximum: 1, minimum: 0 },
          { $ref: 'Conditions' }
        ]
      },
      minItems: 1
    },
    results: {
      type: ['array', 'object'],
      items: { $ref: 'Result' },
      additionalProperties: { $ref: 'Result' },
      minItems: 1,
      minProperties: 1
    },
    special: { type: 'object' }
  }
};