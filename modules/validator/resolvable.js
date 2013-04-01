"use strict";
Schemas.Context = {
  id: 'Context',
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
  id: 'Conditions',
  type: 'object',
  description: 'A set of conditions that can be compared to a Context, or can build a Context (failing if no matching Context can be created given the Condition\'s constraints).',
  properties: {
    fetishes: {
      type: 'object',
      'default': false,
      description: 'fetishes specifies which checkboxes must be checked in order for this event/mission/action to appear in the game.',
      patternProperties: {
        'tentacles|rape': { type: 'boolean' }
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
      description: 'Must match the girl in the current context - if none is already there, it will add a random girl who matches.'
    },
    building: {
      anyOf: [{ $ref: 'buildingConditions' }],
      description: 'Must match the building in the current context - if none is already there, it will add the a random building which matches.'
    },
    option: {
      description: "Must match this resolvable's currently selected option."
    },
    result: {
      type: ['array', 'string'],
      description: "This is the key of the Result to use, or a list of keys to choose between randomly. Not strictly part of Conditions, I'm not sure where else to put it.",
      items: { type: 'string' },
      minItems: 1
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
  id: 'parsableConditions',
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
  id: 'Result',
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
  id: 'Resolvable',
  type: 'object',
  description: 'Resolvable is a very abstract concept - it includes Actions, Events and Missions - anything that checks a set of Conditions, builds a Context and then applies a Result using it.',
  required: [
    '_id', 'conditions', 'results'
  ],
  properties: {
    _id: { type: 'string' },
    initialize: {
      type: 'function',
      'arguments': ['context'],
      description: 'An optional function called when this Resolvable is created. If it returns "false" (the boolean, not just anything that == false), it is the same as if the action\'s Conditions did not match (the action won\'t be available, the event won\'t trigger, etc). It should not modify anything outside of "this.special" - the Resolvable itself - since, for example, Actions are created many times (and thus this function called repeatedly).'
    },
    conditions: {
      anyOf: [{ $ref: 'Conditions' }, { 'enum': [false] }]
    },
    options: {
      description: 'options is either a string, an array, or a function that returns such an array (see below for details on each). For Actions, this list shows up in the action selection screen for the user - for Events and Missions, it shows up as a dialog, prompting the user to select one.',
      anyOf: [
        {
          'enum': ['girls', 'buildings'],
          description: 'If options is one of these special strings, then it will be replaced with a list of Hired girls or Owned buildings.'
        },
        {
          type: 'array',
          items: {
            type: 'object',
            required: [ 'key' ],
            properties: {
              key: {
                type: 'string',
                description: 'This value will be set to (this).option if selected.'
              },
              conditions: {
                $ref: 'Conditions',
                description: 'This option will only be displayed if the conditions match.',
                'default': {}
              }
            },
            anyOf: [
              {
                required: [ 'label', 'title' ],
                properties: {
                  key: {},
                  conditions: {},
                  label: {
                    type: 'string',
                    description: 'The button or dropdown text displayed. Text replacement is available.'
                  },
                  title: {
                    type: 'string',
                    description: 'The tooltip for this option. Text replacement is available.'
                  }
                },
                additionalProperties: false
              },
              {
                required: [ 'conditions', 'immediate' ],
                properties: {
                  key: {},
                  conditions: {},
                  immediate: {
                    'enum': [true],
                    description: 'If immediate is set and the conditions match, then this option will be selected immediately, without prompting the user.'
                  }
                },
                additionalProperties: false
              }
            ]
          },
          description: 'If a list, then each item whose conditions (if any) match will be displayed..'
        },
        {
          type: 'function',
          'arguments': ['context'],
          description: 'If options is a function, it must return an array as described above.'
        }
      ],
      'default': {}
    },
    optionsInfo: {
      type: 'object',
      description: 'Additional information on how to handle the options array (see the properties below).',
      properties: {
        key: {
          type: 'string',
          description: 'The key to store the option selected by the user under. options: "buildings", optionsInfo: { key: "building" } is useful in order to have the user select a building, then add it to the current context.'
        },
        text: {
          type: 'string',
          description: 'The text used in the popup displayed to the user (ignored for Actions, which do not have a popup).'
        },
        image: {
          type: 'string',
          description: 'The image used in the popup. Ignored for Actions.'
        }
      },
      additionalProperties: false
    },
    variants: {
      type: ['function', 'array'],
      description: "If not present, a random choice will be selected from results. If it's a function, it must call done(delta), where delta is a Result. If variants is an array, each Condition is checked in turn until one matches, and the result matching its index is applied. If none match, then any remaining elements from Results are selected from randomly.",
      'arguments': ['context', 'done'],
      items: {
        anyOf: [{ $ref: 'Conditions' }],
        required: ['result']
      },
      minItems: 1
    },
    results: {
      description: "A set of results for this Resolvable. Which one is applied is determined by 'variants' above. If none of the variants matched (or variants was not present), then any results not referenced by *any* variants are chosen between randomly.",
      type: 'object',
      additionalProperties: { $ref: 'Result' },
      minProperties: 1
    },
    special: {
      type: 'object',
      description: 'Any special values that the action needs to store go in here.'
    }
  }
};

Schemas.liveResolvable = {
  id: 'liveResolvable',
  'type': 'object',
  required: [
    '_class', '_id'
  ],
  properties: {
    _id: { type: 'string' },
    time: {
      'enum': ['morning', 'evening']
    },
    girl: {
      'enum': Object.keys(window.Girls || {})
    },
    building: {
      'enum': Object.keys(window.Buildings || {})._append(['Inn'])
    },
    special: { type: 'object' },
    option: { type: 'string' }
  }
};
