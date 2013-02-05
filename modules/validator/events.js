"use strict";
Schemas.Context.properties.event = { $ref: 'liveEvent' };

Schemas.Event = {
  anyOf: [ { $ref: 'Resolvable' } ],
  required: [
    'tags', 'conditions'
  ],
  properties: {
    _id: {},
    initialize: {},
    variants: {},
    results: {},
    special: {},
    conditions: {
      anyOf: [ { $ref: 'Conditions' } ],
      description: 'The conditions under which this event will trigger.'
    },
    tags: {
      anyOf: [ { $ref: 'Tags' } ],
      description: 'Tags represent where this event can occurs. Actions and the potential events that could occur during them are matched up using tags. The likelyhood of the event (after all the conditions have passed), is the sum of each matching tag times its corresponding value on the action. So for example, if an action had the tags: { docks: 0.5, indoors: 0.5 }, and the event has the tags { docks: 0.1, indoors: 0.02 }, then the final chance for this event would be 0.5 * 0.1 (docks) + 0.5 * 0.02 (indoors) = 0.06 = 6%.'
    }
  },
  additionalProperties: false
};

Schemas.Girl.properties.Events = {
  type: 'object',
  additionalProperties: { $ref: 'Event' },
  description: 'Events unqiue to this girl - she will always be in context for them. The _id must still be globally unique.'
};

Schemas.liveGirl.required.push('eventHistory');
Schemas.liveGirl.properties.eventHistory = {
  type: 'object',
  additionalProperties: {
    type: 'integer',
    description: 'The last day that the event with this _id occured to the girl.',
    minimum: 0
  }
};
