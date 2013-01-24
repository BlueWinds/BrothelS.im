Girls['Girl Name'] = {
  description: 'Girl Description',
  // The girl's status at the start of the game. Currently the only two meaningful values are 'Hired' -> working for the player, and 'For Hire' -> looking for work. Anything else and she won't show up in the game.
  status: 'For Hire',
  // All of the default stats, values ranging from 0 to 100.
  happiness: 0,
  endurance: 100,
  obedience: 60,
  modesty: 20,
  charisma: 40,
  intelligence: 60,
  constitution: 50,
  'soft libido': 50,
  'soft experience': 20,
  'hard libido': 30,
  'hard experience': 10,
  'anal libido': 10,
  'anal experience': 0,
  'fetish libido': 10,
  'fetish experience': 0,
  // specialRules is an optional object which can be used to hold girl-specific data (for custom missions, for example), or have various effects on the way she plays.
  specialRules: {
    // You can add any custom keys you'd like - string, integer, decimal.
    customValue: 0.6,
    // The "dependentStats" special rule allows you to modify the way her stats change. There are three main ways to use this, described below:
    dependentStats: {

      "soft experience": { happiness: 1 },
      // In this case, whenever her "soft experience" stat is increased, her happiness also goes up an equal amount - +3 experience will also give her +3 happiness.

      intelligence: { intelligence: 0.5 },
      // You can also modify the stat being added without breaking things. In this example, her intelligence increases at +50% rate - if she got +4 intelligence, she'd also get +2 at the same time.
      // Be careful not to create a dependency loop though - the game is smart enough to handle the above example (with intelligence gain causing more intelligence gain), but *also* adding the line happiness: { "soft experience": 1 } would cause a loop - adding experience adds happiness, adding happiness adds experience, ad infinitum.

      "-modesty": { "fetish libido": 0.2 },
      // You can use "-stat" to apply rules for when a stat *decreases*. In this case, whenever her modesty drops, her fetish libido rises a little bit.

      "hard experience": function() { return { happiness: (100 - this.modesty) / 20 }; }
      // The very final option is to use an arbitrary javascript function, which returns an object containing the stat modifications you want. In this example, her happiness increases alongside her "hard experience", at a rate the depends on her modesty, between 0 and 5 points. Be careful of circular loops of dependentStats, as explained above.
    },
    // payRatio modifies the amount that the girl wants to get paid. The default is 1 - so this girl here only wants 80% of the pay of someone else with her stats.
    payRatio: 0.8
  },
  images: {
    // The basePath is from the root of the game to where all of the images are stored. This is not auto-detected to leave open the possibility using other sources of images later.
    basePath: "content/girls/DarkMagicianGirl/images",
    // base is the only required entry here. Any other entry that's missing will use "base" as a fallback.
    base: "Base.png",
    // This should show the girl angry, annoyed, blushing, or otherwise being disobedient.
    refuse: "Refuse.jpg",
    // She should look exhausted, sleeping, lounging about, or otherwise taking a break.
    tired: ["Tired1.jpg", "Tired2.jpg"],
    // The soft images should include anything that doesn't involve penetration - facials, blowjobs, tit and footjobs, etc. They should include ONLY the girl and her partner - no group sex in this area.
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg", "Soft5.jpg"],
    // Vaginal penetration. These images can are preferred to have only the girl and her partner, but a second partner of either gender is acceptable.
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg", "Hard4.jpg"],
    // Anal penetration, gaping, or other ass fingering / fisting. As with hard, her + partner is preferred, but can potentially include a third.
    anal: ["Anal1.jpg", "Anal2.jpg"],
    // Bondage, BDSM, extremely rough sex, or anything of that sort. Note that this does *not* include orgies or gangbangs - some of the older girls do include such images, but they'll be moved to their own "group" section shortly.
    fetish: ["Fetish1.jpg", "Fetish2.jpg", "Fetish3.jpg", "Fetish4.jpg"],
    // Cleaning up around the house, maid outfits, holding a broom, or similar.
    cleaning: ["Cleaning1.jpg", "Cleaning2.jpg"],
    // Jogging, lifting weights, stretching, playing sports, etc.
    exercise: ["Exercise1.jpg", "Exercise2.jpg"],
    // In the library, reading a book, looking studious or writing on a chalkboard.
    study: "Study.jpg",
    // Behind bars, handcuffs, in the presence of the police, etc - anything that suggests she's in trouble with the law. If you can't find any of the above, consider using a bondage image where she's at least partially clothed.
    prison: "Prison.jpg",
    // No clothing. She must not be engaging in any sexual activity, including masturbation.
    naked: ["Naked1.jpg", "Naked2.jpg", "Naked3.jpg", "Naked4.jpg", "Naked5.jpg"],
    // Attacked by vines, tentacles, slime or other non-humanoid things. DO NOT include orcs, zombies, etc. - only non-humanoid sexy-times go in here. If you can't find any images that match that description, sometimes bondage pics, naked pics where she looks exhausted or cum inflation pictures will work.
    tentacles: ["Tentacles1.jpg", "Tentacles2.jpg", "Tentacles3.jpg", "Tentacles4.jpg"]
  },
  // Actions, Events and Missions can be entered here (see below for details on the formats for each one). If given here, they will only be available for / apply to this girl, and she will always be in the context (equivalent to conditions.girl.name: {this.name}).
  Events: {},
  Missions: {},
  // One special option with Actions is that you can extend them. If an action defined inside a girl shares the same _id with a basic action (as Clean does in this example), then any keys it provides will overwrite the matching keys on the global action when this specific girl does it.
  Actions: {
    Clean: {
      results: [
        {
          // Since we don't overwrite the girl key, all the stat changes applied to her in the basic action will still apply.
          // We can make this version cost $0 and be more effective at cleaning, without having to re-write the whole action here.
          money: 0,
          building: {
            clean: 15
          }
        }
      ] // results
    } // Clean
  } // Actions
};

Rooms.RoomID = {
  // Label for the room, displayed to the user. Text replacement is available for both the label and the description, with "building" and "room" keys.
  label: 'Room Label',
  description: "The description of the building, used to explain the room's purpose in <<- room.size >> places. Keep this short.",
  // Render is an optional key, where you can more precisely control what the room's controls look like. "this" in the context of the function is the room itself, while rerender is a function that can be called without arguments whenever something about the building changes such that the dialog needs to be updated.
  // This function should return either an HTML string, or a set of jQuery wrapped elements.
  render: function(building, rerender) {
    return $("<span>When I'm clicked, the dialog rerenders!</span>").click(rerender);
  },
  // You can optionally limit the number of copies of this room in a given building.
  buildingMax: 1,
  // base is an optional object that will be used as the base for any rooms the user purchases of this type. If not present, it will default to {}. Keys in here require custom code to have any meaning - currently there are no keys that do anything automatically.
  base: {
    size: 2
  }
};

Buildings.BuildingID = {
  // Buildings only have one image. Use a full path here, from the root directory of the game.
  image: 'content/buildings/Onsen/Basejpg',
  // The status of the building at the start of the game. The only two meaningful values are 'Owned' and 'For Sale'.
  status: 'For Sale',
  // The building's cleanliness and reputation before you purchase it.
  clean: 25,
  reputation: 0,
  // A list of the rooms in this building by default.
  rooms: [
    { type: 'bedroom' },
    { type: 'dungeon' }
  ],
  // The maximum number of rooms that can be built in this building.
  maxRooms: 6,
  // The price of the building before all the rooms are added.
  basePrice: 4000,
  // This section determines what the building costs / gives each day.
  daily: {
    // A building can be either "clean" or "dirty" - the breakpoint determines at what point this happens. This building, for example, is considered "clean" if it's 30 or above.
    breakpoint: 30,
    // While the building is clean, the "above" delta is applied.
    above: {
      // As usual with building deltas, any items in the "girl" section apply to each girl living there.
      girl: {
        endurance: 5
      },
      money: -60,
      clean: -5
    },
    // Otherwise, the below value is used.
    below: {
      money: -60,
      clean: -5,
      girl: {
        happiness: -3,
        endurance: -3
      }
    },
    // One of these two messages is sent to the player each turn, depending on the status of the building.
    clean: 'Clean Message',
    dirty: 'Dirty Message'
  },
  // The building's long description.
  description: 'Building Description'
};

// A Context is a set of objects describing who/where/when something is happening - who's taking an Action, what Building is the subject of a Mission, etc.
Context = {
  // Many contexts will have a girl - all Actions for example.
  girl: {},
  building: {},
  // time is either 'morning', 'evening', or undefined.
  time: 'morning',
  // Only one of these will ever be defined at a time.
  event: {},
  action: {},
  mission: {}
};

// A Message lasts only a single turn - they are permanently deleted after that.

// You will always define a Message inside another location - a Result, most commonly. In that case, the Message inherits the Result's context.

Message = {
  // The tab that the message appears under. group accepts text templating (see below for details on how this works).
  group: '<<- girl.name >>',
  // A message's weight optionally determines its order - 0 is the default if left out. Missions and other information you want to be *sure* the player notices should use negative numbers, so that the message floats to the top - Missions traditionally use -5, while Building daily reports use 5 (they're not real interesting).
  weight: 0,
  // The label is what shows up in the grey bar across the top of each message. It accepts text templating.
  label: 'Streetwalk',
  // image accepts text templating, as with most other text fields. The most common pattern here by far is "<<- girl,image('some_image_type')" - this selects a random image of some_image_type for the girl in the current context.
  image: '<<- girl.image("soft") >>',
  // You can also statically link to an image though:
  //image: '/content/girls/Kirino/Base.png',
  // The actual text of the message.
  text: '... text ...'
};

// Text templating is powerful and versatile, but correspondingly complex. The key is the <<- >> pair - anything between these is evaluated as javascript in the current context. So if the context has a girl, then
    // '<<- girl.name >>'
// will evaluate to her name, while
    // '<<- girl.actions.morning.label >>'
// would evaluate to her scheduled action for the morning. You can also use a "<< >>" pair to evaluate javascript without printing any text - especially useful with flow-control statements, such as:
    // '<< if (girl.endurance < 50) { >>She is tired.<< } else { >>She is energetic!<< }} >'
// Hopefully this makes at least a little bit of sense. If not, sorry, I'm explaining the best I can. ^^;
// There is one very handy function: T(). It takes any common game term and formats it with the appropriate color and tooltip. For example:
    // "<<- T('obedience') >>"
// would print a yellow word "Obedience" with a nice tooltip for the user. There are also several variants:
    // "<<- T('-charisma', 'adj') >>"
// returns an adjective describing a girl lacking in charisma. In general, it's best to use the T() function when dealing with game terms - tooltips are awesome, and the colored text makes it easy to pick out.

// "Resolvable" is a terrible name for a very abstract concept - it includes Actions, Events and Missions - anything that checks a set of Conditions, builds a Context and then applies a Result using it.

// When you create a Mission, for example, you'll add it to the global Missions object. The key you add it under must be globally unique, and is called the _id.
//      The _id
//       vvvv
Missions.MyID = {};
Resolvable.Example = {
  // conditions limit the circumstances in which this event, mission or action can trigger. These are all the generic options - each individual type of Resolvable has additional options of its own.
  conditions: {
    // fetishes specifies which checkboxes must be checked in order for this event/mission/action to appear in the game.
    fetishes: {
      tentacles: true
    },
    // The time condition only matches during the morning or the evening. Note that in some cases (such as missions), the context won't include a time of day - if that's the case, the "time" condition is ignored (it always passes).
    time: 'morning',
    // likelyhood is a probability that these conditions will match - 0.2 means that these conditions will only match 20% of the time, even if all the other checks pass.
    likelyhood: 0.2,
    min: {
      // This will not trigger before day 7.
      day: 7,
      // And you have hired two girls
      girls: 2,
      // And you own at least one building
      buildings: 1,
      // Have $1000
      money: 1000
    },
    // max works exactly like min and accepts all of the same keys.
    max: {},
    // If there is already a girl in context, then the girl key compares against her. If not, it compares against all girls until it finds one that matches, and adds her to the current context.
    girl: {
      // This Resolvable can only ever apply to Kirino.
      name: 'Kirino',
      // If status is ommitted, it defaults to 'Hired'.
      status: 'Hired',
      intelligence: 35,
      specialRules: {
        // You can check for minimum levels of specialRules as well as normal stats.
        hasRecievedLetter: 1
      },
      // You can check information about the girl's building here. If she isn't living in one, then this condition will always fail (even if it's just an empty object, like here).
      building: {}
    },
    building: {
      name: 'Onsen',
      // If status is not present, then only 'Owned' buildings will match.
      status: 'Owned',
      clean: 10,
      // The condition will only match if the building has one or more rooms of this type.
      room: 'dungeon'
    },
    missions: {
      // -3 indicates that the mission must not be in progress or completed.
      Mission1: -3,
      // -2 indicates that the mission must not be complete.
      Mission2: -2,
      // -1 indicates the the mission must not be in progress.
      Mission3: -1,
      // 0 indicates that any mission status is allowed - you can usually just leave this out.
      Mission4: 0,
      // 1 indicates that this mission must currently be in progress.
      Mission5: 1,
      // 2 matches only if the mission is complete.
      Mission6: 2,
      // 3 matches if the mission is either complete or in progress.
      Mission7: 3
    }
  },
  // initialize is an optional javascript function invoked when this Resolvable is created - you can use it to add non-standard keys / values or perform other initialization tasks.
  initialize: function(context) {
    // context is the current context - don't extend it, changes won't be persisted. Instead apply any persistent changes to "this" - you can add any keys you like. One thing to note - this.variants is not persisted, and any changes to it will be lost. You can modify this.results, however.
    // Person() is a class which will generate a random name, profession, some preferences and (if the class is 'Very High Class'), an image and physical description. Other classes will eventually have their own descriptions/images, but not yet.
    this.person = new Person('Very High Class');
    // Returning false is the same as one of the conditions failing to match - the event won't occur, the mission won't trigger, or the action won't be available.
    return false;
  },
  // variants can be an array of numbers that *must* add up to 1, equal in length to results (see below). Each number is the probability that the corresponding result will occur - in this case, 80% chance of results[0], 20% chance of results[1].
  // If there is only a single result, you can omit variants, equivalent to "variants: [1]".
    //   variants: [ 0.8, 0.2],
  // If variants is an array of numbers, then results must be an array or results of equal length. See below for an example of what a Result looks like.
  results: [
    {},
    {} // etc.
  ],
  // Variants can also be an array of Conditions, accepting the exact same arguments as conditions above. In this case, each one is tested in turn, and the result matching the first passing Conditions is used.
  // In this case, results[0] will apply if the girl has obedience 60 or greater, and results[1] otherwise.
  // If none of the Conditions match, then no results are applied (an empty condition set always matches, as used below).
    //   variants: [
    //     {
    //       girl: {
    //         min: { obedience: 50 }
    //       }
    //     },
    //     {}
    //   ],
  // variants can also be a javascript function, accepting a callback function. "this" is bound to the current instance of the Resolvable - so you can use this.variants[0] to access the 0th variant.
  // The function must call the callback with a Result as an argument.
  variants: function(context, done) {
    // In many cases, you'll want to return this.results[i] either as is, or with modification - doing so allows you to check the current context. A couple of examples:
    done(this.results[0]);

    // If the girl in the current context's obedience > 60, return the 0th variant - otherwise the 1st.
    if (context.girl.obedience > 60) { done(this.results[0]); } else { done(this.results[1]); }

    // Use the 0th variant, and set the money it gives to a random number.
    var result = this.results[0];
    result.money = Math.random() * 1000;
    done(result);
  }
};

// A Result can be used in many places, but the options are always the same, so they're explained once here.
Result = {
  // Give the player money.
  money: 1000,
  // If the current context includes a girl, you can apply stat changes to her.
  // In every place where you can apply stat changes, if the current context lacks the required item, the stat changes will fail silently.
  girl: {
    obedience: 3,
    // You aren't limited to integers - decimals work as well.
    happiness: -0.5,
    // If the girl lives in a building, you can apply stat changes to it.
    building: {},
    specialRules: {
      // You can modify specialRules for a girl inside any Result, adding or subtracting to it as with any other stat. If the girl doesn't have this specialRule, it will be treated as 0 before the modification is applied. Unlike normal stats, specialRules are not limited to the 0-100 range, and they are not rounded to the nearest integer.
      payRatio: 0.1,
      // If you set a value of "false", then the special rule will be removed from the girl, regardless of its current value.
      customValue: false
    }
  },
  // If the context includes a building, you can modify it. If the current context doesn't include a building this will be ignored silently.
  building: {
    clean: 5,
    // If you put a "girl" key inside of a building, any stat changes will be applied to all girls living in that building.
    girl: {}
  },
  // You can send the player a message, or a list of messages. See above for the format of a message. If the current context includes a girl and/or building, then the message will use her/its stat changes before and after this Result is applied as the delta (combining them if both girl and building are present).
  message: {},
    //   message: [ {}, {}],
  // Alternatively, you can set "delta: false" to prevent a delta (the list of what stats have changed for a given girl) being attached to the message - this is generally used when there are multiple messages, to attach the delta only to the last one.
    //   message: {
    //     delta: false
    //     ... Other stuff ...
    //   },
  // You can trigger a mission to start from any Result. Important note: if the mission is already started, it won't start again, and the old one will be preserved. Also note that this will ignore the target mission's conditions - it will inherit the current context without modification.
  mission: '_idOfMission'
};

Action = {
  // If an action matches its conditions, it will be shown in the GUI. If its enableConditions match, then it will be selectable - otherwise it will explain to the player why it's disabled. It accepts the exact same options as conditions.
  enableConditions: {},
  disable: function(context) {
    // Disable is an optional function that can return a string explaining the reason the action is disabled. If no value is returned, then the action is enabled (provided it passes enableConditions as well, that is).
    return 'Reason for Disable';
  },
  // Label is the title of the action displayed to the user. Text templating is available here.
  label: 'Display Name',
  // Description is the tooltip displayed when hovering over the action on the action selection screen.
  description: '<<- girl.name >> will do stuff.',
  // Tags represent where this action occurs, though they can also be more intangible properties, such as "using magic" or "alone". The location-based tags should generally add up to 1, They don't in this example just so I can quickly list all a bunch of different locations and give some associations for each.
  // One alternative is to leave tags out entirely - in this case, the action cannot trigger any events. Use this if the action is one-time, important, or otherwise really shouldn't be interrupted by random interference.
  tags: {
    garrison: 0.2, // City guard and military
    university: 0.2, // Students, classes, temples, etc.
    slums: 0.2, // The bad part of town.
    docks: 0.2, // Ships, foreigners, traders.
    park: 0.2, // Clean, nice, families during the day / erotic, trysts, lovers during the night
    market: 0.2, // Bustling, crowded, exotic during the day / drinking, partying, entertainment during the night
    redlight: 0.2, // Quiet, resting, dirty during the day, the evening... well...
    uptown: 0.2, // Rich, respectable, power, elegance
    indoors: 0.2 // Whatever building(s) the player owns, or staying inside at an inn.
  },
  // The player ("owner") can only assist in one action each time-period which requires ownerParticipation.
  ownerParticipation: true,
  // If the options key is present, then the user will have a choice between several variants of the action. Each key is the label for the option, each value the tooltip for it.
    //   options: {
    //     Label1: 'Description1',
    //     Label2: 'Description2'
    //   },
  // If it is alternately be a string, either 'girls' or 'buildings', then it will be populated with either all hired girls except the one performing the action, or all owned buildings.
  // options: 'girls',
  options: 'buildings',
  // Alternatively, options can be a function, accepting a context and returning an object matching the above description.
//   options: function(context) {
//     return { Opt1: 'Tooltip1' };
//   },
  // The key to store the option under on this action. Defaults to 'option' if omitted.
  // In this case, setting it to 'building' will add the selected option as the building in this action's context - a very helpful shortcut if you also used options: 'buildings'. Don't set this to 'girl', or you'll end up overwriting who's taking this action...
  optionsKey: 'building',
  // You can set the default option, selected until the player chooses something else. If none is given, the first one will be selected by default.
  option: 'Label1',
  // If you set allDay to true, then this action will take up both the morning and the evening.
  allDay: true
};

// Missions accept all the same keys as Resolvables, being a subclass of them.
Missions.MissionID = {
  // The "display" key is a Message - if present, then this mission will send a message when if begins, the day it's about to end, and it will show up in the Missions list for the player. If omitted, the mission will be silent and invisible to the player.
  display: {
    // Message keys, such as Label, Group, Text and Image.
  },
  // If the "conditions" key is not present, this mission will never trigger on its own - it can only be added as part of the Results of some other Resolvable.
  // "end" determines when the mission is resolved. It can be either a set of Conditions, or a function (see below).
  // "end" doesn't determine whether the mission was a success or failure, only the set of conditions that must be matched in order to end.
  end: {
    // 'end' has a couple of special options / meanings beyond other Conditions. Inside min and max, each of the options 'day', 'money', 'girls' and 'buildings' can be a string instead of a number, representing change from the current value (as of when the missions began). In this case, the mission will end no sooner than three days, when the player has at least $0, but has lost $1000 from their starting cash (this is a bad example, since it would be impossible to end if they player started with mission with only $500 - they'd have to have min: $0 and max: -$500, incompatible conditions).
    min: {
      day: '+3',
      money: 0
    },
    max: {
      money: '-1000'
      // end.max.day is a sort of special key - you'll generally want to use *either* end.min.day and end.max.day *or* a set of other conditions.
      // If 'display' is set for this mission, the player will be sent a copy of the initial message on end.max.day, to remind them that the mission is about to conclude.
      // day: '+3'
    }
  },
  // If 'end' is a function, it must call the "done" argument with a set of conditions (which may *NOT* make use of the special features mentioned below). Note that this function is called when the mission first begins, then once each turn thereafter.
  // end: function(context, done) { done({ ...conditions... }); },
  // variants and results work exactly like any other Resolvable - if it's a function, then it's called only once, when the mission ends.
  variants: function(context, done) {}
};

Events.EventID = {
  //An event's "conditions" are things that it must match in order to trigger at all.
  // Actions and the potential events that could occur during them are matched up using tags. The likelyhood of the event (after all the conditions have passed), is the sum of each matching tag times its corresponding value on the action. So for example, if an action had the tags: { docks: 0.5, indoors: 0.5 }, and the event has these tags:
  tags: {
    docks: 0.1,
    slums: 0.2,
    indoors: 0.02
  }
  // then the final chance for this event would be 0.5 * 0.1 (docks) + 0.5 * 0.02 (indoors) = 0.06 = 6%.
};
