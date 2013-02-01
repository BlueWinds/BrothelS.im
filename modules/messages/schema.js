Schemas.Message = {
  type: 'object',
  description: 'Replacement patterns are available on all strings inside a message.',
  properties: {
    group: {
      type: 'string',
      required: true,
      description: 'The tab that this message will appear under.'
    },
    label: {
      type: 'string',
      required: true,
      description: 'The title of the accordion pane this message shows up in.'
    },
    image: {
      type: 'string',
      required: true,
      description: 'The image associated with this message.'
    },
    text: {
      type: 'string',
      required: true,
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
