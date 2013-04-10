"use strict";
Schemas.Game = {
  id: 'Game',
  type: ['object', 'null'],
  required: [
    '_class', 'day', 'fetishes', 'money', 'moneyHistory',
    'player', 'version', 'randomSeed'
  ],
  properties: {
    _id: { type: 'string' },
    _class: {
      'enum': [ 'Game' ]
    },
    autosave: {
      type: 'boolean',
      'default': false
    },
    day: {
      type: 'integer',
      minimum: 0
    },
    fetishes: {
      type: 'object',
      patternProperties: {
        'tentacles|rape': { 'enum': [ true ] }
      },
      additionalProperties: false
    },
    money: { type: 'integer' },
    moneyHistory: {
      type: 'array',
      items: { type: 'integer' }
    },
    name: {
      type: 'string'
    },
    player: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: "How other characters generally address the player."
        },
        gender: {
          'enum': ['male', 'female']
        },
        name: {
          type: 'string',
          description: "The player-entered name for their character."
        }
      },
      additionalProperties: false
    },
    version: {
      'enum': [gameVersion]
    },
    randomSeed: {
      type: 'number',
      description: 'A seed string used in the random number generator - useful for debugging, since it can re-create the exact same results when an exported save is loaded somewhere else. Holding Ctrl while clicking Next Turn will use this number instead of a random seed.'
    }
  },
  additionalProperties: false
};
