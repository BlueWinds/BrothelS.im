Actions.Advertise = {
  label: 'Advertise',
  group: 'Jobs',
  mins: {
    endurance: 20,
    happiness: 50
  },
  tags: {
    outdoors: true
  },
  safety: 0.8,
  description: "<<= girl.name >> will stand in front of the <<= girl.building() ? girl.building().name : 'inn' >>, talking to strangers and trying to get them to come inside for a visit. This will increase her <<- T('charisma') >> and << if (girl.building()) { >>the <<- girl.building().name >>'s <<- T('reputation') >>.<< } else { >>the owner of the inn will pay her a little bit for her efforts.<< } >>",
  results: [
    {
      image: 'base',
      delta: function(time, action) {
        var delta = {
          endurance: -10,
          charisma: 1.5,
          reputation: 2 * (this.charisma / 100 - 0.3)
        }
        if (!this.building()) {
          delta.money = (this.charisma + 5);
          delta.money *= Math.random() * 0.5 + 0.5;
        }
        return delta;
      },
      message: "<<= girl.name >> worked the street in front of the <<- girl.building() ? girl.building().name : 'inn' >>, chatting up everyone who passed by. While not terribly successful from a business standpoint, it was good for her."
    }
  ]
}

// This action still under construction, commented out.
// Actions.Show = {
//   mins: {
//     charisma: 35,
//     endurance: 25
//   },
//   requiresRoom: {
//     type: 'showroom',
//     key: 'size'
//   },
//   label: 'Performance',
//   group: 'Jobs',
//   description: "<<= girl.name >> will put on a show of some type - dancing, stripping or fucking - on stage. <<- T('-obedience', 'adj') >> and <<- T('charisma', 'adj') >> girls will be popular all around, while stripping and sex shows will do better with <<- T('-modesty', 'adj') >> girls.",
//   options: {
//     dance: 'Dance',
//     strip: 'Strip',
//     sex: 'Sex'
//   }
// };
