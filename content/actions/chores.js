"use strict";
Actions.Rest = {
  label: 'Rest',
  group: 'Chores',
  description: 'Giving a girl time off increases both <<- T("endurance") >> and <<- T("happiness") >>.',
  tags: { indoors: 1 },
  results: [
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Rest',
        image: '<<- girl.image("tired") >>',
        text: '<<= girl.name >> took some time off to recover.'
      },
      girl: {
        endurance: 12,
        happiness: 5
      }
    }
  ]
};

Actions.Clean = {
  label: 'Clean',
  group: 'Chores',
  description: 'She will spend time tidying up, repairing and cleaning one of your buildings.',
  tags: { indoors: 1 },
  conditions: {
    min: {
      buildings: 1
    },
    missions: {
      cleanBuilding: 3
    }
  },
  enableConditions: {
    girl: {
      min: {
        endurance: 15,
        happiness: 20
      }
    }
  },
  options: 'buildings',
  optionsKey: 'building',
  results: [
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Clean <<- building.name >>',
        image: '<<- girl.image("cleaning") >>',
        text: '<<- girl.name >> spent several hours dusting neglected corners, putting things in order and removing bodily fluids from the rooms of the <<- building.name >>. Even if it doesn\'t sparkle, it\'s at least in better shape than it was.'
      },
      money: -10,
      building: { clean: 10 },
      girl: {
        endurance: -6,
        happiness: -3,
        modesty: 0.4
      }
    }
  ]
};

Actions.Talk = {
  label: 'Talk',
  group: 'Chores',
  description: 'You and <<= girl.name >> will talk, do small chores together, and otherwise spend some time together - good not only for a morale boost for you both, but it will also give you a chance to increase her <<= T("obedience") >>',
  tags: { indoors: 1 },
  conditions: {
    missions: {
      obedienceAndModesty: 3
    }
  },
  enableConditions: {
    girl: {
      min: {
        endurance: 10,
        happiness: 20
      }
    }
  },
  ownerParticipation: true,
  results: [
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Talk',
        image: '<<- girl.image("rest") >>',
        text: 'You and <<- girl.name >> take some time to go through your financial records, checking everything to make sure it\'s in order. You find a couple of minor irregularities, but nothing serious. Not the most entertaining of activities, but it does help get her used to your presence, taking orders and dealing with accepting money for sex.'
      },
      girl: {
        obedience: 1.5,
        endurance: -5,
        happiness: -2
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Talk',
        image: '<<- girl.image("tired") >>',
        text: 'The two of you spend some time hanging around the <<= girl.building() ? girl.building().name : "inn" >>, doing some chores together and chatting about various things. She\'s spirited, <<= girl.charisma >= 50 ? "quite friendly" : "not very nice" >>, and doesn\'t take orders at all well, though you use the opportunity to encourage her to listen to your suggestions.'
      },
      girl: {
        obedience: 1.5,
        happiness: 6
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Talk',
        image: '<<- girl.image("exercise") >>',
        text: "You walk through the city, <<= girl.name >> following one step behind you, speaking of small things, how she's getting on, the weather, and similar. You give her a disapproving glance whenever she volunteers an opinion or changes the subject. Eventually gets that this is as much training as a chance to talk, and falls more easily into her submissive role."
      },
      girl: {
        obedience: 2.5,
        happiness: -4,
        endurance: -5,
        charisma: -1
      }
    }
  ]
};
