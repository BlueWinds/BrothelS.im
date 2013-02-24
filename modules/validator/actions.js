"use strict";
Schemas.Context.properties.action = { $ref: 'liveAction' };

Schemas.Tags = {
  id: 'Tags',
  type: ['object', 'function'],
  additionalProperties: {
    type: 'number',
    minimum: 0,
    maximum: 1,
    'default': 0
  },
  description: 'If tags is a function, then it should accept a single argument "context" and return an object that matches this schema.\n' +
  'garrison: City guard and military.\n' +
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
  id: 'Action',
  anyOf: [{ $ref: 'Resolvable' }],
  required: [ 'group', 'label', 'description', 'tags' ],
  properties: {
    _id: {},
    initialize: {},
    variants: {},
    results: {},
    special: {},
    conditions: {
      description: 'The action will show up in the GUI when its conditions match (it may still be disabled by enableConditions below). If "false", then the action will never show up "on its own", but may still be explictly created/added by girl.setAction(girl.action(_id, context)). If you use this feature, be aware that the action will "fall off" at the end of the day (lock it if you want it to stick around).',
      'default': {}
    },
    enableConditions: {
      anyOf: [{ $ref: 'Conditions' }],
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
    gerund: {
      type: 'string',
      description: 'The label of this action, as a noun (eg. Exercise -> Exercising, Investigate Guards -> Investigating the Guard). If not present, the game will just add an "ing" to the end of the label.'
    },
    description: {
      type: 'string',
      description: 'The hover-text for this action. Text replacement is of course available.'
    },
    tags: {
      anyOf: [{ $ref: 'Tags' }],
      description: 'Tags represent where this action occurs, though they can also be more intangible properties, such as "using magic" or "alone". The location-based tags should generally add up to 1 (though this is not a hard requirement). If tags is ommited entirely, the action cannot trigger any events. Use this if the action is one-time, important, or otherwise really shouldn\'t be interrupted by random interference.\n\nIf tags is a function, it should take one argument (context) and return an object of tags.'
    },
    allDay: {
      'enum': [true],
      description: 'This action takes both the morning and evening slots.'
    },
    options: {
      description: 'options is either an object, with each key being the label and the value being the hovertext (replacement patterns are available for both), or a function that returns such an object.',
      anyOf: [
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
    },
    ownerParticipation: {
      'enum': [true],
      description: 'This action requires the player character to accompany the girl - something they can do only once per time-slot each day.'
    },
    awayFromHome: {
      'enum': [true],
      description: "This action takes the girl away from home overnight (you'll generally only apply this to an allDay or evening-only action) - any deltas from the building she's in won't apply (such as the daily clean/dirty  one), and she won't have to pay for a room at the inn if she's living there."
    }
  },
  additionalProperties: false
};

Schemas.liveAction = {
  id: 'liveAction',
  anyOf: [{ $ref: 'liveResolvable' }],
  required: [
    'description', 'girl', 'group', 'label', 'time', 'gerund'
  ],
  properties: {
    special: {},
    building: {},
    time: {},
    _id: {},
    _class: {
      'enum': [ 'Action' ]
    },
    description: { type: 'string' },
    girl: {
      'enum': Object.keys(window.Girls || {})
    },
    group: { type: 'string' },
    label: { type: 'string' },
    gerund: { type: 'string' },
    option: { type: 'string' },
    optionsKey: { type: 'string' },
    disabled: {
      type: ['null', 'string']
    },
    allDay: {
      'enum': [true]
    },
    awayFromHome: {
      'enum': [true]
    },
    locked: {
      'enum': [true]
    },
    ownerParticipation: {
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
Schemas.liveGirl.properties.actions.required.push('history');
Schemas.liveGirl.properties.actions.properties.history = {
  type: 'object',
  additionalProperties: { type: 'integer' }
};

Schemas.Result.properties.lock = {
  type: 'boolean',
  description: 'A locked action disables all others until its Results include the "unlock" key, usually used for scripting multi-day actions. Set this to true or false to unlock the current action. Lock should ONLY be found in results returned from actions, though this is not currently machine-validated.'
};

Schemas.Conditions.properties.ownerParticipation = {
  type: 'boolean',
  description: 'If the player is accompanying the girl. This is always false unless the current context contains an Action that requires ownerParticipation.'
};
