"use strict";
Girls.Sophitia = {
  description: "<p>The daughter of a baker, Sophitia worked at her family bakery. She always treasured her country\'s culture and prayed often to the city guardian. One day, as she bathed in a forest spring, the god of the forge revealed himself, and told her of the evil sword whose existence threatened to bring much pain to the world. He ordered her to seek to destroy this foul blade.</p><p>At first Sophitia was reluctant to take the holy mission, for she was only a baker\'s daughter, but the god insisted. She tracked down the wielder of this powerful sword - and was gravely wounded in the fight without even inconveniencing him.</p><p>Afraid to face the wrath of her god, she fled for distant lands... and ended up here.</p>",
  status: 'For Hire',
  happiness: 0,
  endurance: 100,
  obedience: 50,
  modesty: 50,
  charisma: 50,
  intelligence: 20,
  constitution: 40,
  softExperience: 0,
  hardExperience: 20,
  analExperience: 20,
  fetishExperience: 0,
  softLibido: 10,
  hardLibido: 40,
  analLibido: 60,
  fetishLibido: 10,
  images: {
    basePath: "content/girls/Sophitia/images",
    base: "Base.png",
    refuse: "Refuse.jpg",
    tired: "Tired.jpg",
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg", "Soft5.jpg", "Soft6.jpg"],
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg", "Hard4.jpg"],
    anal: ["Anal1.jpg", "Anal2.jpg", "Anal3.jpg", "Anal4.jpg"],
    fetish: ["Fetish1.jpg", "Fetish2.jpg", "Fetish3.jpg"],
    group: ["Group1.jpg", "Group2.jpg", "Group3.jpg", "Group4.jpg", "Group5.jpg"],
    cleaning: "Cleaning.jpg",
    exercise: "Exercise.jpg",
    study: ["Study1.jpg", "Study2.jpg"],
    naked: ["Naked1.jpg", "Naked2.jpg"],
    prison: "Prison.jpg",
    tentacles: ["Tentacles1.jpg", "Tentacles2.jpg", "Tentacles3.jpg", "Tentacles4.jpg", "Tentacles5.jpg"],
    pregnant: "Pregnant.jpg"
  },
  Actions: {
    Talk: $.extend(true, {}, Actions.Talk)
  }
};

Girls.Sophitia.Actions.Talk.results._append([
  {
    message: {
      group: 'Sophitia',
      label: 'Talk',
      image: 'content/girls/Sophitia/images/Tired.jpg',
      text: "Talking with Sophitia is one of the nicer tasks you\'ve had - she\'s pleasant to be around, curious without being intrusive - solid, honest and straightforward to a fault. You wonder how she ended up here, working for you - she\'d seem more at home running a small shop or herding children in a schoolyard than raising her skirt for money."
    },
    girl: {
      obedience: 1.5,
      happiness: 5
    }
  },
  {
    message: {
      group: 'Sophitia',
      label: 'Talk',
      image: 'content/girls/Sophitia/images/Study1.jpg',
      text: "When you knock on her door, Sophitia is sitting on a couch reading. She smiles as you enter, inviting you to take the only chair in the room without rising. She rests the book over one knee - you can\'t read the cover, but it looks like a cheesy romance from here. You ask her about it, and learn that it is indeed a romance, the heroine of which is a distressed bakers daughter. Curious reading material for a whore, but she doesn\'t seem to think it odd at all."
    },
    girl: {
      obedience: 1.5,
      happiness: 2
    }
  },
  {
    message: {
      group: 'Sophitia',
      label: 'Talk',
      image: 'content/girls/Sakuya/images/Study2.jpg',
      text: "You and Sophitia spend several hours checking over the rules and regulations that govern The Guild, and therefore your brothel. She seems to have nearly infinite patience for such a boring task, taking notes even as the material threatens to send you napping."
    },
    girl: {
      obedience: 1.5,
      happiness: 2,
      endurance: -5
    }
  }
]);
