Actions.Rest = {
  label: 'Rest',
  group: 'Chores',
  description: 'Giving a girl time off increases both <<- T("endurance") >> and <<- T("happiness") >>.',
  results: [
    {
      image: 'tired',
      message: '<<= girl.name >> took some time off to recover.',
      delta: {
        endurance: 12,
        happiness: 5
      }
    }
  ],
  mins: {}
};

// The action's _id is the machine-readable name of the action. It must be unique.
Actions.Lockdown = {
  // The label is what's displayed to the player. You can use replacement patterns here. 'girl' is the girl performing the action. 'g' holds all the game data - see specialParty for an example of how this is used.
  label: 'Lockdown',
  // The tab the action is displayed under when viewing a girl.
  group: 'Training',
  // Does... what you think it does. If the action doesn't take up both time slots, remove this line.
  allDay: true,
  // The minimum statistics a girl must have in order to take this action. You can also use 'money' here, to show the minimum $ the player must have.
  mins: {
    endurance: 30,
    happiness: 50,
    constitution: 10
  },
  // The maximum statistics the girl can have. Again, you can use money here.
  //maxes: {
    // modesty: 50
  // },

  // You can set ownerParticipation to define this action as requiring the player's direct supervision - thus, only one girl can take this action at a time.
  // ownerParticipation: true

  // An action can require that the player owns certain rooms. If that isn't the case, remove the requiresRoom key entirely.
  requiresRoom: {
    // The type of room needed.
    type: 'dungeon',
    // The key of those rooms to sum up to count how many girls can do the action.
    key: 'size'
  },
  // The description of the action, showed on hover. Replacement patterns can again be used. Notice that we're translating "obedience" through the T() function - by default, it outputs a noun form, but "adj" is also available for adjectives. If you want the negation of an adjective, try something like T("-modesty", "adj") for low modesty - "Uninhibited", for that example.

  // It's better to use the "translated" versions of these strings to keep up with any future changes, and to properly color and tool-tip the text. Also be sure to use <<- instead of <<= to open the block - otherwise you'll get HTML visible on the page, rather than properly rendered.
  description: 'She will be bound and gagged in the dungeon to increase her <<- T("obedience") >>. This action takes all day.',
  // Disabled is an optional javascript function to disable this action based on information about the game. You probably don't want to try to use it unless you already know javascript. The function always gets a single argument, time, which is either 'morning' or 'evening' - the time this action is being considered for.
  // disabled: function(time) {
    // The disabled function can return one of three values: true, false, or a string.

    // return true;
    // If it returns 'true', then the *action doesn't show up* - do this to avoid cluttering up the action list with irrelevant actions.

    // return false;
    // Returning false means that *The action is not disabled* - it can be selected.

    // return 'description for why the user can't select this action.';
    // The final option for the disabled function is to return a string. The action will be disabled, but show up on the list.
  // },
  // Variants work exactly like event variants - since they're already described there, I'm not going to repeat it here.
  variants: [0.5, 0.5],
  results: [
    {
      image: 'fetish',
      // Remember that "delta" could also be a function, just like in events - in actions, it would get the arguments (time, action), with "this" being the girl taking the action.
      delta: {
        endurance: -10,
        happiness: -10,
        obedience: 4,
        constitution: -0.5
      },
      message: '<<= girl.name >> spent the day bound, gagged and naked in the dungeon, hands tied above her head and wishing something interesting would happen.'

    },
    {
      image: 'fetish',
      message: "<<= girl.name >> spent the day in the dungeon's stockade without clothes. You checked in occasionally to spank her or have her blow you.",
      delta: {
        endurance: -10,
        happiness: -10,
        obedience: 4,
        constitution: -0.5
      }
    }
  ]
};

Actions.Clean = {
  disabled: function(time) { return !Boolean(this.building()); },
  mins: {
    happiness: 20,
    endurance: 15
  },
  label: 'Clean <<= girl.building() ? girl.building().name : "" >>',
  group: 'Chores',
  description: 'She will spend time tidying up, repairing and cleaning the <<= girl.building().name >>.',
  results: [
    {
      image: 'cleaning',
      message: '<<= girl.name >> spent several hours dusting neglected corners, putting things in order and removing bodily fluids from the rooms of the <<= girl.building().name >>. Even if it doesn\'t sparkle, it\'s at least in better shape than it was.',
      delta: {
        clean: 10,
        money: -10,
        endurance: -6,
        happiness: -3,
        modesty: 0.4
      }
    }
  ]
};