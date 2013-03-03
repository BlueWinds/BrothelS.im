"use strict";
Girls.Mana = {
  description: "<p>An inhabitant of an ancient kingdom, Mana promised that she would become a master magician in memory of her teacher. Her soul spent the next thousand years trapped in various magical items before finally being freed again by a kind owner. She's not exactly sure how she ended up here - lost in an unknown land and without anyone she knew and could rely on, she decided to start looking for a job. Any job, really.</p>",
  status: 'For Hire',
  happiness: 0,
  endurance: 100,
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
    basePath: "content/girls/Mana/images",
    base: "Base.jpg",
    refuse: "Refuse.jpg",
    tired: ["Tired1.jpg", "Tired2.jpg", "Tired3.jpg"],
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg", "Soft5.jpg"],
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg", "Hard4.jpg"],
    anal: ["Anal1.jpg", "Anal2.jpg"],
    fetish: ["Fetish1.jpg", "Fetish2.jpg", "Fetish3.jpg"],
    group: ["Group1.jpg", "Group2.jpg", "Group3.jpg"],
    cleaning: ["Cleaning1.jpg", "Cleaning2.jpg"],
    exercise: ["Exercise1.jpg", "Exercise2.jpg", "Exercise3.jpg"],
    study: "Study.jpg",
    prison: "Prison.jpg",
    naked: ["Naked1.jpg", "Naked2.jpg", "Naked3.jpg", "Naked4.jpg", "Naked5.jpg"],
    tentacles: ["Tentacles1.jpg", "Tentacles2.jpg", "Tentacles3.jpg", "Tentacles4.jpg"],
    pregnant: "Pregnant.jpg"
  },
  Actions: {
    Talk: $.extend(true, {}, Actions.Talk),
    Healing: {
      label: 'Healing',
      group: 'Chores',
      description: 'Mana will use her magic to heal another girl working for you. The girl will gain quite a bit of endurance.',
      // She can't heal if she's the only hired girl.
      conditions: {
        min: {
          girls: 2
        }
      },
      enableConditions: {
        girl: {
          min: {
            intelligence: 50,
            endurance: 10
          }
        }
      },
      tags: { indoors: 1 },
      options: 'girls',
      variants: function(context, done) {
        this.special = g.girls[this.option].startDelta();
        g.girls[this.option].apply({
          happiness: 3,
          endurance: 30
        });
        this.special = this.special();
        done(this.base().results[0]);
      },
      results: [
        {
          message: {
            image: 'content/girls/Mana/images/Exercise2.jpg',
            group: 'Mana',
            label: 'Healing',
            text: 'Mana drew upon her power to revitalize <<= action.option >>, restoring her energy (<span class="endurance delta">+<<= action.special.endurance || 0 >></span>, <span class="happiness delta">+<<= action.special.happiness || 0 >></span>).'
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

Girls.Mana.Actions.Talk.results._append([
  {
    message: {
      group: 'Mana',
      label: 'Talk',
      image: 'content/girls/Mana/images/Tired1.jpg',
      text: "You settle down on the bench where you've agreed to meet her, and wait. And wait. And wai... oh, there she is, only half an hour late. Mana runs down the street towards you, waving her arms enthusiastically the ensure you know she's seen you and is coming. You wince in sympathy as she stumbles - perhaps she should pay more attention to the ground, and less to waving at you... Oh ouch. You're out of your seat and running towards her even as the carriage that flattened her rolls to a stop.<br><br>The driver apologizes profusely, but it really wasn't his fault that DMG dashed in front of his wheels without looking. You spend the rest of the <<- time >> tending to her injuries back at the <<- girl.building() ? girl.building().name : 'Inn'>>."
    },
    girl: {
      obedience: 2.5,
      endurance: -4
    }
  },
  {
    message: {
      group: 'Mana',
      label: 'Talk',
      image: '<<- girl.image() >>',
      text: ""
    },
    girl: {
      obedience: 1.5,
      happiness: 7
    }
  },
  {
    message: {
      group: 'Mana',
      label: 'Talk',
      image: 'content/girls/Kirino/images/Study2.jpg',
      text: ""
    },
    girl: {
      obedience: 2,
      happiness: 3
    }
  },
  {
    message: {
      group: 'Mana',
      label: 'Talk',
      image: 'content/girls/Kirino/images/Refuse3.jpg',
      text: ""
    },
    girl: {
      obedience: -1.5,
      happiness: 2
    }
  }
]);
