"use strict";
Girls.Sophitia = {
  description: "<p>The daughter of a baker, Sophitia worked at her family bakery. She always treasured her country's culture and prayed often to the city guardian. One day, as she bathed in a forest spring, the god of the forge revealed himself, and told her of the evil sword whose existence threatened to bring much pain to the world. He ordered her to seek to destroy this foul blade.</p><p>At first Sophitia was reluctant to take the holy mission, for she was only a baker's daughter, but the god insisted. She tracked down the wielder of this powerful sword - and was gravely wounded in the fight without even inconveniencing him.</p><p>Afraid to face the wrath of her god, she fled for distant lands... and ended up here.</p>",
  status: 'For Hire',
  happiness: 70,
  endurance: 100,
  obedience: 50,
  modesty: 50,
  charisma: 50,
  intelligence: 20,
  constitution: 40,
  softLibido: 10,
  softExperience: 0,
  hardLibido: 40,
  hardExperience: 20,
  analLibido: 60,
  analExperience: 20,
  fetishLibido: 10,
  fetishExperience: 0,
  images: {
    basePath: "content/girls/Sophitia/images",
    base: "Base.png",
    refuse: "Refuse.jpg",
    tired: ["Tired1.jpg", "Tired2.jpg", "Tired3.jpg"],
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg", "Soft5.jpg", "Soft6.jpg"],
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg", "Hard4.jpg", "Hard5.jpg", "Hard6.jpg", "Hard7.jpg"],
    anal: ["Anal1.jpg", "Anal2.jpg", "Anal3.jpg", "Anal4.jpg", "Anal5.jpg"],
    fetish: ["Fetish1.jpg", "Fetish2.jpg", "Fetish3.jpg", "Fetish4.jpg", "Fetish5.jpg", "Fetish6.jpg"],
    group: ["Group1.jpg", "Group2.jpg", "Group3.jpg", "Group4.jpg", "Group5.jpg", "Group6.jpg", "Group7.jpg"],
    cleaning: ["Clean1.jpg", "Clean2.jpg"],
    exercise: ["Exercise.jpg", "Exercise2.jpg"],
    study: ["Study1.jpg", "Study2.jpg"],
    naked: ["Naked1.jpg", "Naked2.jpg", "Naked3.jpg"],
    prison: ["Prison1.jpg", "Prison2.jpg", "Prison3.jpg"],
    tentacles: ["Tentacles1.jpg", "Tentacles2.jpg", "Tentacles3.jpg", "Tentacles4.jpg", "Tentacles5.jpg"],
    pregnant: ["Pregnant.jpg", "Pregnant2.jpg"]
  },
  specialRules: {
    dependentStats: {
      constitution: { constitution: 0.5 } // As a fighter, Sophitia can train her constitution more effectively.
    }
  },
  Actions: {
    Talk: $.extend(true, { results: {
      Sophitia1: {
        message: {
          group: 'Sophitia',
          label: 'Talk',
          image: 'content/girls/Sophitia/images/Tired.jpg',
          text: "Talking with Sophitia is one of the nicer jobs you've had - she's pleasant to be around, curious without being intrusive, solid, honest and straightforward to a fault. You wonder how she ended up here, working for you - she'd seem more at home running a small shop or herding children in a schoolyard than raising her skirt for money."
        },
        girl: {
          obedience: 1.5,
          happiness: 5
        }
      },
      Sophitia2: {
        message: {
          group: 'Sophitia',
          label: 'Talk',
          image: 'content/girls/Sophitia/images/Study1.jpg',
          text: "When you knock on her door, Sophitia is sitting on a couch reading. She smiles as you enter, inviting you to take the only chair in the room without rising. She rests the book over one knee - you can't read the cover, but it looks like a cheesy romance from here. You ask her about it, and learn that it is indeed a romance, the heroine of which is a distressed baker's daughter. Curious reading material for a whore, but she doesn't seem to think it odd at all."
        },
        girl: {
          obedience: 1.5,
          happiness: 2
        }
      },
      Sophitia3: {
        message: {
          group: 'Sophitia',
          label: 'Talk',
          image: 'content/girls/Sophitia/images/Study2.jpg',
          text: "You and Sophitia spend several hours checking over the rules and regulations that govern the Guild, and therefore your brothel. She seems to have nearly infinite patience for such a boring task, taking notes even as the material threatens to send you napping."
        },
        girl: {
          obedience: 1.5,
          happiness: 2,
          endurance: -5
        }
      },
      Sophitia4: {
        message: {
          group: 'Sophitia',
          label: 'Talk',
          image: 'content/girls/Sophitia/images/Naked1.jpg',
          text: "It may have been a mistake to let Sophitia decide what to do this <<- time >>. She suggests sparring with wooden swords, and she is quite a proficient swordswoman despite her humble background. You get disarmed and knocked backwards six or seven times before you forfeit. You leave her to her training so that you can tend to your aching muscles."
        },
        girl: {
          happiness: 4,
          constitution: 1,
          endurance: -8
        }
      },
      Sophitia5: {
        message: {
          group: 'Sophitia',
          label: 'Talk',
          image: 'content/girls/Sophitia/images/Talk2.jpg',
          text: "Your <<- time >> visit to Sophitia starts with a question.<blockquote><<- girl.modesty > 10 ? 'Is this skirt too revealing?' : 'Should I have this skirt taken up a little?' >></blockquote>The answer to this dangerous question is unmistakably yes, but you give a vague response that could be mistaken for whatever she's fishing for.<blockquote><<- girl.hardLibido > 70 ? 'It takes forever to take off when I\'m about to have sex. Look, did you see how long that took me?' : 'The way it is now makes me seem must make me seem like such a loose woman.' >></blockquote>>You nod in agreement, unsure of what to say."
        },
        girl: {
          obedience: 1.5,
          happiness: 2
        }
      }
    }}, Actions.Talk)
  }
};
