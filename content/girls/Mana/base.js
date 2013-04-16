"use strict";
Girls.Mana = {
  description: "<p>An inhabitant of an ancient kingdom, Mana promised that she would become a master magician in memory of her teacher. Her soul spent the next thousand years trapped in various magical items before finally being freed again by a kind owner. She's not exactly sure how she ended up here - lost in an unknown land and without anyone she knew and could rely on, she decided to start looking for a job. Any job, really.</p>",
  status: 'For Hire',
  happiness: 90,
  endurance: 100,
  obedience: 60,
  modesty: 20,
  charisma: 60,
  intelligence: 40,
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
    Talk: $.extend(true, { results: {
      Mana1: {
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
      Mana2: {
        message: {
          group: 'Mana',
          label: 'Talk',
          image: 'content/girls/Mana/images/Exercise1.jpg',
          text: "After several days of pestering, you finally relent to Mana's seeminly endless chatter and take her out to visit a new shop that recently opened nearby. She runs ahead, and when you catch up, you find her nearly plastered to the window display, eyeing an endless supply of candy and sweet baked goods. Laughing at her enthusiasm as the two of you enter, you announce that you'll get her any one thing. This proves to be... a mistake.<br><br>The giant lollipop in the center of the store? The one that looked like an ornamental stand? It was real, it was for sale, and you had to carry it home since it was too heavy for Mana to carry. You wonder how long it will take her to finish it, and whether you should invest in some earplugs in the meantime."
        },
        girl: {
          obedience: 1,
          happiness: 7
        },
        money: -50
      },
      Mana3: {
        message: {
          group: 'Mana',
          label: 'Talk',
          image: 'content/girls/Mana/images/Tired3.jpg',
          text: "Unlike some of the other girls with mysterious pasts, Mana isn't shy telling you about her history. She doesn't seem to miss being an immortal powerful spirit - the battles were exciting, and she got to save the world on more than one occasion if her stories are to be believed, but lacking physical form was a significant drawback. Battles were <em>all</em> she got to see. She much prefers her new life, where she can eat ice cream, run around in the park, and, yes, fuck."
        },
        girl: {
          obedience: 2,
          happiness: 2
        }
      },
      Mana4: {
        message: {
          group: 'Mana',
          label: 'Talk',
          image: 'content/girls/Mana/images/Base.jpg',
          text: "You sit on the front porch of the <<- girl.building() ? girl.building().name : 'Inn' >> with Mana, watching traffic pass and talking of small things. The subject eventually turns to magic, and you ask her to show you some tricks. She frowns in concentration, but the most impressive spell she can conjure is a small ball of fire in midair, or catching a tossed apple. Hardly the epic magic she likes to attribute to herself in stories. You compliment her anyway, and the frown soon melts back into the ever-present enthusiastic grin as she gives nearby pedestrians wedgies."
        },
        girl: {
          obedience: 1.5
        }
      },
      Mana5: {
        message: {
          group: 'Mana',
          label: 'Talk',
          image: 'content/girls/Mana/images/Base.jpg',
          text: "It's a beautiful <<- time >>, and Mana expresses a sudden and desperate urge to visit the other streetwalkers. She implores you with a longing 'Pleeeease!' every time you voice an objection. Interrupting a girl when she's working isn't very professional, but you eventually cave in on the condition that she doesn't start talking to anyone who has a client.<br><br>You're both walking down familiar streets in the red-light district when Mana sees a buxom brunette prostitute from afar. You're not familiar with the girl, but you can tell that she's just accepted an offer from a confident young man, and the two of them slip discreetly into a nearby alley. As you turn to remind Mana that she promised not to interfere, you can see that she has already run ahead towards the pair. But instead of talking to her, Mana keeps her distance and watches from the safety some large crates. Soon, the both of you are watching him take the brunette from behind. When they are done and he has paid and left, Mana is silent so as not to give away her location. From the satisfied look on her face, you guess that she didn't want to talk so much as watch some sex."
        },
        girl: {
          happiness: 4,
          hardLibido: 2
        }
      }
    }}, Actions.Talk),
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
      variants: function healingVariants(context, done) {
        this.special = g.girls[this.option].startDelta();
        g.girls[this.option].apply({
          happiness: 3,
          endurance: 30
        });
        this.special = this.special();
        done(this.base().results.success);
      },
      results: {
        success: {
          message: {
            image: 'content/girls/Mana/images/Healing.jpg',
            group: 'Mana',
            label: 'Healing',
            text: 'Mana drew upon her power to revitalize <<= action.option >>, restoring her energy (<span class="endurance delta">+<<= action.special.endurance || 0 >></span>, <span class="happiness delta">+<<= action.special.happiness || 0 >></span>).'
          },
          girl: {
            endurance: -12,
            happiness: 2
          }
        }
      } // results
    } //healing
  } // actions
};
