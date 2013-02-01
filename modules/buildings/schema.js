Schemas.buildingDelta = {
  type: 'object',
  properties: {
    money: { type: 'number' },
    girl: {
      type: [ { $ref: 'girlDelta' } ],
      description: 'This delta will be applied to each girl living in the building.'
    }
  },
  patternProperties: {
    '(clean|reputation)': {
      type: 'number',
      minimum: -100,
      maximum: 100
    }
  },
  additionalProperties: false
};

Schemas.girlDelta.properties.building = {
  type: [ { $ref: 'buildingDelta' } ],
  description: 'This delta will be applied to the building the girl is living in, if any.'
};

Schemas.buildingConditions = {
  type: 'object',
  description: 'A set of conditions to match against a building.',
  properties: {
    name: {
      type: 'string'
    },
    status: {
      type: 'string',
      'enum': ['Owned', 'For Sale', 'In Town', 'Gone']
    },
    room: {
      type: 'string',
      description: 'This condition will only match if the building has one or more rooms of the given type.'
    }
  },
  patternProperties: {
    'min|max': {
      type: 'object',
      patternProperties: {
        '(clean|reputation)': {
          $ref: 'Stat'
        }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};

Schemas.parsableBuildingConditions = {
  type: 'object',
  description: 'Like normal building conditions, except "+3" or "-3" are acceptable values.',
  properties: {
    name: {
      type: 'string'
    },
    status: {
      type: 'string',
      'enum': ['Owned', 'For Sale', 'In Town', 'Gone']
    },
    room: {
      type: 'string',
      description: 'This condition will only match if the building has one or more rooms of the given type.'
    }
  },
  patternProperties: {
    'min|max': {
      type: 'object',
      patternProperties: {
        '(clean|reputation)': { $ref: 'parsableStat' }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};

Schemas.girlConditions.properties.building = {
  type: [ { $ref: 'buildingConditions' } ],
  description: 'Matched against the building the girl is living in. If present and she\'s not living anywhere, then it fails.'
};

Schemas.Room = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true,
      description: 'Text replacement is available with both "room" and "building" keys.'
    },
    price: {
      type: 'integer',
      required: true,
      description: 'The price to add this room. Also added to the price of the building when buying or selling.'
    },
    render: {
      type: 'function',
      description: 'If this function is present, it will be called in place of the default rendering (label and description). It should return an HTML element. rerender is a function that can be called whenever the room is updated in a way that might affect other parts of the building.',
      'arguments': ['building', 'rerender'],
      'return': ['HTML element']
    },
    maxInBuilding: {
      type: 'integer',
      description: 'The maximum number of copies of this room a building can have. You can use 0 to show that this room can never be bought, only acquired through other means.',
      minumum: 0
    },
    base: {
      type: 'object',
      description: 'base is an optional object that will be used as the base for any rooms the user purchases of this type. If not present, it will default to {}. Keys in here require custom code to have any meaning - currently there are no keys that do anything automatically.',
      'default': {}
    }
  },
  additionalProperties: false
};

Schemas.Building = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    image: {
      type: 'string',
      required: true,
      description: 'Buildings only have one image. Use a full path here, from the root directory of the game.',
      pattern: "^.+\\.(png|jpg|gif)$"
    },
    status: {
      'description': "Owned means it'll start the game owned the player. For Sale means exactly what it sounds like. In Town means it's around, but can't be bought - there should be a mission or event that gives access to it. Gone means it was owned, but has been sold / destroyed / is otherwise no longer available.",
      'enum': ['Owned', 'For Sale', 'In Town', 'Gone'],
      required: true
    },
    clean: { $ref: 'Stat' },
    reputation: { $ref: 'Stat' },
    maxRooms: {
      type: 'integer',
      required: true,
      description: 'The maximum number of rooms that this building can have at one time.',
      minimum: 1,
      maximum: 10
    },
    rooms: {
      type: 'array',
      required: true,
      description: 'A list of rooms present when the building is first purchased.',
      additionalItems: { $ref: 'liveRoom' },
      maxLength: 10
    },
    basePrice: {
      type: 'integer',
      description: 'The base price of this building, before the cost of any rooms is added.',
      minimum: 0,
      required: true
    },
    daily: {
      type: 'object',
      required: true,
      properties: {
        breakpoint: {
          type: 'integer',
          required: true,
          description: 'The minimum level of cleanliness required to get the above results and clean message.',
          minimum: 0,
          maximum: 100
        },
        above: {
          type: [ { $ref: 'buildingDelta' } ],
          required: true
        },
        below: {
          type: [ { $ref: 'buildingDelta' } ],
          required: true
        },
        clean: {
          type: 'string',
          required: true,
          description: 'The message sent to the player each day when this building is clean.'
        },
        dirty: {
          type: 'string',
          required: true,
          description: 'The message sent to the player each day when this building is dirty.'
        }
      }
    }
  },
  additionalProperties: false
};

Schemas.liveRoom = {
  properties: {
    type: {
      type: 'string',
      required: true
    }
  }
};
