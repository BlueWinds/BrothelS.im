"use strict";
Actions.Rest = {
  label: 'Rest',
  group: 'Chores',
  description: 'Giving a girl time off increases both <<- __("endurance") >> and <<- __("happiness") >>.',
  tags: { indoors: 1 },
  conditions: {},
  results: [{
    message: {
      group: '<<- girl.name >>',
      label: 'Rest',
      image: '<<- girl.image("tired") >>',
      text: '<<= girl.name >> took some time off to recover.'
    },
    girl: {
      endurance: 12,
      happiness: 3
    }
  }]
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
      building: { clean: 9 },
      girl: {
        endurance: -6,
        happiness: -3,
        modesty: 0.4
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Clean <<- building.name >>',
        image: '<<- girl.modesty > 40 ? girl.image("cleaning") : girl.image("naked") >>',
        text: "<<- girl.name >> carefully chooses some cleaning supplies, <<- girl.modesty > 40 ? 'puts on some old clothes' : 'puts her clothes aside to keep them from getting dirty' >>,  and gets to work cleaning the bathrooms in << building.name >>. It's tough work and fairly draining, but she gets the place look as good as you've ever seen it."
      },
      money: -10,
      building: { clean: 11 },
      girl: {
        endurance: -6,
        happiness: -3
      }
    }
  ]
};

Actions.Talk = {
  label: 'Talk',
  group: 'Chores',
  description: 'You and <<= girl.name >> will talk, do small chores together, and otherwise spend some time together - good not only for a morale boost for you both, but it will also give you a chance to increase her <<= __("obedience") >>',
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
    },
    {
      message: {
        group: '<<- girl.name >>',
        label: 'Talk',
        image: '<<- girl.image() >>',
        text: "You and <<- girl.name >> sit out on the front steps of the <<- girl.building() ? girl.building().name : 'inn' >>, watching traffic pass and listening to the sounds of the busy city. You ask her if she's enjoying her work here - she agrees that it's fun sometimes. You ask about the customers she's serviced lately - she sighs and rolls her eyes. Not the best behavior. You confiscate her top and pull her bra down around her waist as punishment, right there in public. She gets red, but you refuse to let her fix it for half an hour."
      }
    }
  ]
};
