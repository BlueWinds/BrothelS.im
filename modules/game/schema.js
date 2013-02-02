Schemas.Game = {
  type: 'object',
  required: [
    '_class', 'day', 'fetishes', 'money', 'moneyHistory'
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
      additionalItems: { type: 'integer' }
    },
    name: {
      type: 'string'
    }
  },
  additionalProperties: false
};
