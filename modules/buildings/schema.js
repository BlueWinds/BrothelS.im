Schemas.buildingDelta = {
  type: 'object',
  properties: {
    money: { type: 'number' },
    girl: {
      anyOne: [ { $ref: 'girlDelta' } ],
      description: 'This delta will be applied to each girl living in the building.'
    },
    clean: { $ref: 'statDelta' },
    reputation: { $ref: 'statDelta' }
  },
  additionalProperties: false
};

Schemas.girlDelta.properties.building = {
  anyOne: [ { $ref: 'buildingDelta' } ],
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
      'enum': ['Owned', 'For Sale', 'Town', 'Gone']
    },
    room: {
      type: 'string',
      description: 'This condition will only match if the building has one or more rooms of the given type.'
    }
  },
  patternProperties: {
    'min|max': {
      type: 'object',
      properties: {
        clean: { $ref: 'Stat' },
        reputation: { $ref: 'Stat' }
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
      'enum': ['Owned', 'For Sale', 'Town', 'Gone']
    },
    room: {
      type: 'string',
      description: 'This condition will only match if the building has one or more rooms of the given type.'
    },
  },
  patternProperties: {
    'min|max': {
      type: 'object',
      properties: {
        clean: { $ref: 'Stat' },
        reputation: { $ref: 'Stat' }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};

Schemas.girlConditions.properties.building = {
  anyOne: [ { $ref: 'buildingConditions' } ],
  description: 'Matched against the building the girl is living in. If present and she\'s not living anywhere, then it fails.'
};

Schemas.Room = {
  type: 'object',
  required: [
    'type', 'description', 'price'
  ],
  properties: {
    type: { type: 'string' },
    description: {
      type: 'string',
      description: 'Text replacement is available with both "room" and "building" keys.'
    },
    price: {
      type: 'integer',
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

Schemas.liveRoom = {
  required: ['type'],
  properties: {
    type: { type: 'string' }
  }
};

Schemas.Building = {
  type: 'object',
  required: [
    'name', 'status', 'description',
    'image', 'clean', 'reputation',
    'maxRooms', 'rooms', 'basePrice', 'daily'
  ],
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    image: {
      type: 'string',
      description: 'Buildings only have one image. Use a full path here, from the root directory of the game.',
      pattern: "^.+\\.(png|jpg|gif)$"
    },
    status: {
      'description': "Owned means it'll start the game owned the player. For Sale means exactly what it sounds like. Town means it's around, but can't be bought - there should be a mission or event that gives access to it. Gone means it was owned, but has been sold / destroyed / is otherwise no longer available.",
      'enum': ['Owned', 'For Sale', 'Town', 'Gone']
    },
    clean: { $ref: 'Stat' },
    reputation: { $ref: 'Stat' },
    maxRooms: {
      type: 'integer',
      description: 'The maximum number of rooms that this building can have at one time.',
      minimum: 1,
      maximum: 10
    },
    rooms: {
      type: 'array',
      description: 'A list of rooms present when the building is first purchased.',
      additionalItems: { $ref: 'liveRoom' },
      maxLength: 10
    },
    basePrice: {
      type: 'integer',
      description: 'The base price of this building, before the cost of any rooms is added.',
      minimum: 0
    },
    daily: {
      type: 'object',
      required: [ 'breakpoint', 'above', 'below', 'clean', 'dirty'],
      properties: {
        breakpoint: {
          type: 'integer',
          description: 'The minimum level of cleanliness required to get the above results and clean message.',
          minimum: 0,
          maximum: 100
        },
        above: { $ref: 'buildingDelta' },
        below: { $ref: 'buildingDelta' },
        clean: {
          type: 'string',
          description: 'The message sent to the player each day when this building is clean.'
        },
        dirty: {
          type: 'string',
          description: 'The message sent to the player each day when this building is dirty.'
        }
      }
    }
  },
  additionalProperties: false
};

Schemas.liveBuilding = {
  type: 'object',
  required: [
    '_class', 'name', 'status',
    'clean', 'reputation',
    'maxRooms', 'rooms'
  ],
  properties: {
    _class: {
      'enum': ['Building'],
    },
    name: { type: 'string' },
    status: {
      'enum': ['Owned', 'For Sale', 'Town', 'Gone']
    },
    clean: { $ref: 'Stat' },
    reputation: { $ref: 'Stat' },
    maxRooms: {
      type: 'integer',
      minimum: 1,
      maximum: 10
    },
    rooms: {
      type: 'array',
      additionalItems: { $ref: 'liveRoom' },
      maxLength: 10
    },
    turnDelta: {
      type: ['function', 'object'],
      description: 'This is only a function while the turn is being generated - between turns, it\'s an object.',
      additionalProperties: {
        type: 'integer',
        description: 'How much each stat has changed since yesterday for this building.'
      }
    }
  },
  additionalProperties: false
};

Schemas.Game.required.push('buildings', 'maxBuildings');
Schemas.Game.properties.buildings = {
  type: 'object',
  additionalProperties: { $ref: 'liveBuilding' }
};
Schemas.Game.properties.maxBuildings = {
  type: 'integer',
  min: 0,
  max: 2
};
