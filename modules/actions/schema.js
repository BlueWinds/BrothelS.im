Schemas.Context.properties.action = { $ref: 'liveAction' };

Schemas.Tags = {
  type: 'object',
  additionalProperties: {
    type: 'number',
    minimum: 0,
    maximum: 1,
    'default': 0
  },
  description: 'garrison: City guard and military.\n' +
  'university: Students, classes, temples, etc.\n' +
  'slums: The bad part of town.\n' +
  'docks: Ships, foreigners, traders.\n' +
  'park: Clean, nice, families during the day / erotic, trysts, lovers during the night.\n' +
  'market: Bustling, crowded, exotic during the day / drinking, partying, entertainment during the night.\n' +
  'redlight: Quiet, resting, dirty during the day, the evening... well...\n' +
  'uptown: Rich, respectable, power, elegance.\n' +
  'indoors: Whatever building(s) the player owns, or staying inside at an inn.'
};

Schemas.Action = {
  'extends': { $ref: 'Resolvable' },
  required: [ 'group', 'label', 'description' ],
  properties: {
    _id: {},
    initialize: {},
    variants: {},
    results: {},
    special: {},
    conditions: {
      'extends': { $ref: 'Conditions' },
      description: 'The action will show up in the GUI when its conditions match (it may still be disabled by enableConditions below).',
      'default': {}
    },
    enableConditions: {
      'extends': { $ref: 'Conditions' },
      description: 'If these conditions fail to match, this action will be disabled in the GUI, with an appropriate description.',
      'default': {}
    },
    disable: {
      type: 'function',
      'arguments': ['contenxt'],
      description: 'disable is an optional function that can return a string explaining the reason the action is disabled. If no value is returned, then the action is enabled (provided it passes enableConditions as well, that is).'
    },
    group: {
      'enum': ['Jobs', 'Chores', 'Training'],
      description: 'The row to display this message on.'
    },
    label: {
      type: 'string',
      description: 'The label for this action. Text replacement patterns are available.'
    },
    description: {
      type: 'string',
      description: 'The hover-text for this action. Text replacement is of course available.'
    },
    tags: {
      'extends': { $ref: 'Tags' },
      description: 'Tags represent where this action occurs, though they can also be more intangible properties, such as "using magic" or "alone". The location-based tags should generally add up to 1 (though this is not a hard requirement). If tags is ommited entirely, the action cannot trigger any events. Use this if the action is one-time, important, or otherwise really shouldn\'t be interrupted by random interference.',
      'default': {}
    },
    ownerParticipation: {
      'enum': [true],
      description: 'This action requires the player character to accompany the girl - something they can do only once per time-slot each day.'
    },
    allDay: {
      'enum': [true],
      description: 'This action takes both the morning and evening slots.'
    },
    options: {
      description: 'options is either an object, with each key being the label and the value being the hovertext (replacement patterns are available for both), or a function that returns such an object.',
      anyOne: [
        {
          'enum': ['girls', 'buildings'],
          description: 'If options is one of these special strings, then it will be replaced with a list of Hired girls or Owned buildings.'
        },
        {
          type: 'object',
          additionalProperties: { type: 'string' },
          description: 'If an object, each key is the label and the value being the hovertext (replacement patterns are available for both).'
        },
        {
          type: 'function',
          'arguments': ['context'],
          description: 'If options is a function, it must return an object of options (label: hovertext).'
        }
      ],
      'default': {}
    },
    optionsKey: {
      type: 'string',
      description: 'The key to store the option selected by the user under. options: "buildings", optionsKey: "building" is useful in order to have the user select a building, then add it to the current context.',
      'default': 'option'
    },
    option: {
      type: 'string',
      description: 'The default option selected before the user chooses one. Defaults to the first option in the list.'
    }
  },
  additionalProperties: false
};

Schemas.liveAction = {
  anyOne: [{ $ref: 'liveResolvable' }],
  required: [
    'description', 'girl', 'group', 'label',
    'tags', 'time'
  ],
  properties: {
    variants: {},
    results: {},
    special: {},
    building: {},
    time: {},
    _id: {},
    _class: {
      'enum': [ 'Action' ]
    },
    description: { type: 'string' },
    girl: { type: 'string' },
    group: { type: 'string' },
    label: { type: 'string' },
    tags: { $ref: 'Tags'},
    option: { type: 'string' },
    optionsKey: { type: 'string' },
    disabled: {
      type: ['null', 'string']
    },
    ownerParticipation: {
      'enum': [true]
    },
    allDay: {
      'enum': [true]
    }
  },
  additionalProperties: false
};

Schemas.Girl.properties.Actions = {
  type: 'object',
  additionalProperties: { $ref: 'Action' },
  description: 'Actions unqiue to this girl, or overriding global ones (if they have the same _id).'
};

Schemas.liveGirl.properties.actions.properties.morning = { $ref: 'liveAction' };
Schemas.liveGirl.properties.actions.properties.evening = { $ref: 'liveAction' };
Schemas.liveGirl.properties.actions.required.push('evening', 'history');
Schemas.liveGirl.properties.actions.properties.history = {
  'type': 'object',
  additionalProperties: { type: 'integer' }
};
