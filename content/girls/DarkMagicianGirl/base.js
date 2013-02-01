Girls['Dark Magician Girl'] = {
  description: "<p>An inhabitant of a different dimension, Dark Magician Girl ended up stranded in our this world when a space-time anomaly devoured her and every one in the vicinity. Lost in an unknown land and without anyone she knew and could rely on, she decided to start looking for a job. Any job, really.</p>",
  status: 'For Hire',
  happiness: 0,
  obedience: 60,
  modesty: 20,
  charisma: 40,
  intelligence: 60,
  constitution: 50,
  softLibido: 50,
  softExperience: 20,
  hardLibido: 30,
  hardExperience: 10,
  analLibido: 10,
  analExperience: 0,
  fetishLibido: 10,
  fetishExperience: 0,
  images: {
    basePath: "content/girls/DarkMagicianGirl/images",
    base: "Base.png",
    refuse: "Refuse.jpg",
    tired: ["Tired1.jpg", "Tired2.jpg"],
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg", "Soft5.jpg"],
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg", "Hard4.jpg"],
    anal: ["Anal1.jpg", "Anal2.jpg"],
    fetish: ["Fetish1.jpg", "Fetish2.jpg", "Fetish3.jpg"],
    group: ["Group1.jpg", "Group2.jpg", "Group3.jpg"],
    cleaning: ["Cleaning1.jpg", "Cleaning2.jpg"],
    exercise: ["Exercise1.jpg", "Exercise2.jpg"],
    study: "Study.jpg",
    prison: "Prison.jpg",
    naked: ["Naked1.jpg", "Naked2.jpg", "Naked3.jpg", "Naked4.jpg", "Naked5.jpg"],
    tentacles: ["Tentacles1.jpg", "Tentacles2.jpg", "Tentacles3.jpg", "Tentacles4.jpg"]
  },
  Actions: {
    // TODO: Add Talk results
    Healing: {
      label: 'Healing',
      group: 'Chores',
      description: 'The Dark Magician Girl will use her magic to heal another girl working for you. The girl will gain quite a bit of endurance.',
      // She can't heal if she's the only hired girl.
      conditions: {
        min: {
          girls: 2
        }
      },
      enableCondtions: {
        girl: {
          min: {
            intelligence: 50,
            endurance: 10
          }
        }
      },
      options: 'girls',
      variants: function(context, done) {
        var delta = {
          happiness: 2,
          endurance: 10
        };
        delta.endurance += Math.floor(Math.random() * 21);
        g.girls[this.option].apply(delta);
        done(this.results[0]);
      },
      results: [
        {
          message: {
            image: '/content/girls/DarkMagicianGirl/images/Exercise2.jpg',
            group: 'Dark Magician Girl',
            label: 'Healing',
            text: 'Dark Magician Girl drew upon her power to revitalize <<= action.option >>, restoring her energy (<span class="endurance delta">+<<= action.results[0].endurance >></span>, <span class="happiness delta">+<<= action.results[0].happiness >></span>).'
          },
          girl: {
            endurance: -8,
            happiness: 2
          }
        }
      ] // results
    } //healing
  } // actions
};
