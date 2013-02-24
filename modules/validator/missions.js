"use strict";
Schemas.Mission = {
  id: 'Mission',
  anyOf: [{ $ref: 'Resolvable' }],
  properties: {
    _id: {},
    initialize: {},
    variants: {},
    results: {},
    special: {},
    conditions: {
      description: 'The mission will begin as soon as all of these conditions match, as long as a mission with the same name is not already running (since only one mission of each _id can run at a time, it would overwrite the existing one). If conditions is "false", then this mission will never start on its own - it can only be triggered from a Result.'
    },
    display: {
      anyOf: [{ $ref: 'Message' }],
      description: "If display is present, then this mission will A) send this message when it starts B) appear in the Missions list for the player and C) If mission.end.max.day, send this message again the day before the mission ends, as a reminder."
    },
    end: {
      description: 'If end is not present, then the mission doesn\'t persist - its results trigger immediately. If present, end must be either a function or a set of conditions that triggers the mission to end. If mission.end.max.day and mission.display, then that message will be sent again the day before the mission ends as a reminder for the player that they\'re almost out of time. One important note - if mission.max.day passes and there are still other unmet conditions, the mission will be deleted silently, and not marked as complete.',
      anyOf: [
        { $ref: 'parsableConditions' },
        {
          type: 'function',
          'arguments': ['context'],
          description: 'If end is a function, then it must return a set of Conditions, which will then be evaluated. This function should not modify anything - it\'s only here for when you need something more complex than just a set of Conditions'
        }
      ]
    }
  },
  additionalProperties: false
};

Schemas.liveMission = {
  id: 'liveMission',
  anyOf: [{ $ref: 'liveResolvable' }],
  properties: {
    special: {},
    girl: {},
    building: {},
    time: {},
    _id: {},
    _class: {
      'enum': [ 'Mission' ]
    },
    display: { $ref: 'Message' },
    end: { $ref: 'Conditions' }
  },
  additionalProperties: false
};

Schemas.Girl.properties.Missions = {
  type: 'object',
  additionalProperties: { $ref: 'Mission' },
  description: 'Missions unqiue to this girl - she will always be in context for them. The _id must still be globally unique.'
};

Schemas.Game.required.push('missions', 'missionsDone');
Schemas.Game.properties.missions = {
  type: 'object',
  additionalProperties: { $ref: 'liveMission' }
};
Schemas.Game.properties.missionsDone =  {
  type: 'object',
  additionalProperties: { 'enum': [true] }
};

Schemas.Result.properties.mission = {
  description: 'A Mission to start. If there is a girl in the context, if can be a mission specific to her. The mission will inherit the current context, and its Conditions will *not* be checked.',
  'enum': Object.keys(Missions)._append($.map(Girls, function(girl) {
    if (girl.Missions) { return Object.keys(girl.Missions); }
  }))
};
Schemas.Result.properties.missionsDone = {
  type: 'object',
  description: 'A set of missions to either add to or remove from the game\'s missionsDone list (via true or false). By default, all missions will mark themselves as done.',
  additionalProperties: { type: 'boolean' }
};

Schemas.Conditions.properties.missions = {
  type: 'object',
  description: 'Each key is a mission _id, each value a number indicating what status it must have.',
  additionalProperties: {
    type: 'integer',
    minimum: -3,
    maximum: 3,
    description: "-3 indicates that the mission must not be in progress or completed.\n" +
    "-2 indicates that the mission must not be complete.\n" +
    "-1 indicates the the mission must not be in progress.\n" +
    "0 indicates that any mission status is allowed.\n" +
    "1 indicates that this mission must currently be in progress.\n" +
    "2 matches only if the mission is complete.\n" +
    "3 matches if the mission is either complete or in progress.",
    'default': 0
  }
};

Schemas.Context.properties.mission = { $ref: 'liveMission' };
