"use strict";
Schemas.Game = {
  id: 'Game',
  type: ['object', 'null'],
  required: [
    '_class', 'day', 'fetishes', 'money', 'moneyHistory',
    'version'
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
    version: {
      'enum': [0.501]
    }
  },
  additionalProperties: false
};
