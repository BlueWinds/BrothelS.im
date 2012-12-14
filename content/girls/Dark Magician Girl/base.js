Girls['Dark Magician Girl'] = {
  description: "<p>An inhabitant of a different dimension, Dark Magician Girl ended up stranded in our this world when a timespace anomaly devoured her and every one in the vicinity. Lost in an unknown land and without anyone she knew and could rely on, she decided to start looking for a job. Any job, really.</p>",
  status: {
    Town: 0.2,
    'For Hire': 0.8
  },
  stayChance: 0.7,
  happiness: 0,
  endurance: 100,
  obedience: 60,
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
  specialRules: {},
  images: {
    basePath: "content/girls/Dark Magician Girl/images",
    base: "base.png",
    refuse: "Refuse.jpg",
    tired: ["Tired1.jpg", "Tired2.jpg"],
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg", "Soft5.jpg"],
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg", "Hard4.jpg"],
    anal: ["Anal1.jpg", "Anal2.jpg"],
    fetish: ["Fetish1.jpg", "Fetish2.jpg", "Fetish3.jpg", "Fetish4.jpg"],
    cleaning: ["Cleaning1.jpg", "Cleaning2.jpg"],
    exercise: ["Exercise1.jpg", "Exercise2.jpg"],
    tentacles: ["Tentacles1.jpg", "Tentacles2.jpg", "Tentacles3.jpg", "Tentacles4.jpg"]
  },
  actions: {
    healing: {
      label: 'Healing',
      group: 'Chores',
      mins: {
        intelligence: 50,
        endurance: 5
      },
      description: 'The Dark Magician Girl will use her magic to heal another girl working for you. The girl with the least endurance (except DMG herself) will gain quite a bit of endurance.',
      // She can't heal if she's the only hired girl.
      disabled: function(time) { return g.girls.Cfilter('status', 'Hired').length == 1; },
      results: [
        {
          image: '/content/girls/Dark Magician Girl/images/Exercise2.jpg',
          delta: function(time, action) {
            var girls = g.girls.Cfilter('status', 'Hired').Csort('endurance');
            action.targetGirl = girls[0] == this ? girls[1] : girls[0];
            action.targetDelta = {
              endurance: Math.floor(Math.random() * 11) + 10,
              happiness: 2
            };
            action.targetGirl.apply(action.targetDelta);
            return {
              endurance: -5,
              happiness: 0.5
            };
          },
          message: 'Dark Magician Girl drew upon her power to revitalize <%= action.targetGirl.name %>, restoring her energy (<span class="endurance delta">+<%= action.targetDelta.endurance %></span>, <span class="happiness delta">+<%= action.targetDelta.happiness %></span>).'
        }
      ]
    }
  }
};
