Schemas.Message = {
  type: 'object',
  description: 'Replacement patterns are available on all strings inside a message.',
  required: [
    'group', 'label', 'image', 'text'
  ],
  properties: {
    group: {
      type: 'string',
      description: 'The tab that this message will appear under.'
    },
    label: {
      type: 'string',
      description: 'The title of the accordion pane this message shows up in.'
    },
    image: {
      type: 'string',
      description: 'The image associated with this message.'
    },
    text: {
      type: 'string',
      description: 'The full body of text.'
    },
    weight: {
      type: 'number',
      'default': 0,
      description: 'Messages with lower weights will float to the top of their tab, being the first messages the user sees, as well as raising the tab to the top. Higher weights sink to the bottom.'
    },
    delta: {
      'enum': [false],
      description: 'If this is present, it will prevent the display of delta from the current context. Usually used when there are multiple messages for one Result and you want to save display until the last one.'
    }
  },
  additionalProperties: false
};

Schemas.liveMessage = {
  type: 'object',
  required: [
  '_class', 'weight',
    'group', 'label', 'image', 'text'
  ],
  properties: {
    _class: {
      'enum': ['Message']
    },
    group: { type: 'string' },
    label: { type: 'string' },
    image: { type: 'string' },
    text: { type: 'string' },
    weight: { type: 'number' },
    delta: {
      type: 'object',
      additionalProperties: { type: 'integer' }
    }
  },
  additionalProperties: false
};

Schemas.Game.required.push('messages');
Schemas.Game.properties.messages = {
  type: 'array',
  items: { $ref: 'liveMessage' }
};
