define([], [
  {
    _id: 'Rest',
    label: 'Rest',
    group: 'Chores',
    description: 'Giving a girl time off increases both endurance and happiness.',
    results: [
      {
        image: 'tired',
        message: '<%= girl.name %> took some time off to recover.',
        delta: {
          endurance: 12,
          happiness: 5
        }
      }
    ],
    mins: {}
  },
  {
    _id: 'Clean',
    disabled: function(time) { return !Boolean(this.building()); },
    mins: {
      happiness: 20,
      endurance: 15
    },
    label: 'Clean <%= girl.building() ? girl.building().name : "" %>',
    group: 'Chores',
    description: 'She will spend time tidying up, repairing and cleaning the <%= girl.building().name %>.',
    results: [
      {
        image: 'cleaning',
        message: '<%= girl.name %> spent several hours dusting neglected corners, putting things in order and removing bodily fluids from the rooms of the <%= girl.building().name %>. Even if it doesn\'t sparkle, it\'s at least in better shape than it was.',
        delta: {
          clean: 10,
          money: -10,
          endurance: -6
        }
      }
    ]
  },
  {
    _id: 'Lockdown',
    label: 'Lockdown',
    group: 'Training',
    allDay: true,
    mins: {
      endurance: 30,
      happiness: 50,
      constitution: 10
    },
    description: 'She will be bound and gagged in the dungeon for most of the day to increase her obedience. This action takes all day.',
    disabled: function(time) {
      var rooms = g.buildings.Cfilter('status', 'Owned').Caccumulate('rooms');
      var count = rooms.Cflatten().Cfilter('type', 'dungeon').Csum('size');
      if (!count) { return true; }
      var bound = g.girls.Cfilter('action', time, 'Lockdown').length;
      if (bound < count || bount == count && this.actions.morning == 'Lockdown') {
        return false;
      }
      return 'You only have enough dungeons to lockdown ' + count + ' girls at a time.';
    },
    variants: [0.5, 0.5],
    results: [
      {
        image: 'fetish',
        message: '<%= girl.name %> spent the day bound, gagged and naked in the dungeon, hands tied above her head and wishing something interesting would happen.',
        delta: {
          endurance: -10,
          happiness: -10,
          obedience: 4,
          constitution: -0.5
        }
      },
      {
        image: 'fetish',
        message: "<%= girl.name %> spent the day in the dungeon's stockade without clothes. You checked in occasionally to spank her or have her blow you.",
        delta: {
          endurance: -10,
          happiness: -10,
          obedience: 4,
          constitution: -0.5
        }
      }
    ]
  }
]);