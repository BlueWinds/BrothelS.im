define([], [
  {
    _id: 'Rest',
    label: 'Rest',
    description: 'Giving a girl time off increases both endurance and happiness.',
    message: '<%= name %> took some time off to recover.',
    delta: {
      endurance: 12,
      happiness: 5
    },
    mins: {},
    image: 'tired'
  },
  {
    _id: 'Clean',
    conditions: function(time) { return Boolean(this.building()); },
    mins: {
      happiness: 20,
      endurance: 15
    },
    label: 'Clean <%= building().name %>',
    description: 'She will spend time tidying up, repairing and cleaning the <%= building().name %>.',
    message: '<%= name %> spent several hours dusting neglected corners, putting things in order and removing bodily fluids from the rooms of the <%= building().name %>. Even if it doesn\'t sparkle, it\'s at least in better shape than it was.',
    delta: {
      clean: 10,
      money: -10,
      endurance: -6
    },
    image: 'cleaning'
  },
  {
    _id: 'Lockdown',
    label: 'Lockdown',
    allDay: true,
    mins: {
      endurance: 30,
      happiness: 50
    },
    description: 'She will be bound and gagged in the dungeon for most of the day to increase her obedience. This action takes all day.',
    conditions: function(time) {
      // Only two girls in lockdown per building.
      var count = 0;
      for (var name in g.buildings) {
        if (g.buildings[name].status == 'Owned') {
          for (var i in g.buildings[name].rooms) {
            count += g.buildings[name].rooms[i].type == 'dungeon';
          }
        }
      }
      var bound = 0;
      for (name in g.girls) {
        bound += g.girls[name].actions[time] == 'Lockdown';
      }
      return bound < count * 2 || (bound == count * 2 && this.actions[time] == 'Lockdown');
    },
    image: 'fetish',
    message: [
      '<%= name %> spent the day bound, gagged and naked in the dungeon, hands tied above her head and wishing something interesting would happen.',
      '<%= name %> spent the day in the dungeon\'s stockade without clothes. You checked in occasionally to spank her or have her blow you.'
    ],
    delta: {
      endurance: -10,
      happiness: -10,
      obedience: 4,
      constitution: -0.5
    }
  }
]);