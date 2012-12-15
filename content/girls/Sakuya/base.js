Girls.Sakuya = {
  description: "<p>While working as a maid in a foreign land, Sakuya defended her mistress against a tireless stream of invaders before finally deciding enough was enough. Using powerful magic, she froze time and attempted to \"cure\" the source of their problems.</p><p>The spell backfired, flinging her halfway across the world and nearly killing her. Since her magical powers are much frayed, and there isn't much call for maids, she's been considering switching careers... it would still take a bit of convincing to get her to lower herself to wandering the streets as a prostitute.</p>",
  status: {
    Town: 0.2,
    'For Hire': 0.8
  },
  stayChance: 0.7,
  happiness: 0,
  endurance: 100,
  obedience: 40,
  charisma: 20,
  modesty: 60,
  intelligence: 50,
  constitution: 70,
  'soft libido': 10,
  'soft experience': 0,
  'hard libido': 20,
  'hard experience': 10,
  'anal libido': 10,
  'anal experience': 0,
  'fetish libido': 30,
  'fetish experience': 5,
  specialRules: {},
  images: {
    basePath: "content/girls/Sakuya/images",
    base: "Base.jpg",
    refuse: "Refuse.jpg",
    tired: ["Tired1.jpg", "Tired2.jpg"],
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg", "Soft5.jpg", "Soft6.jpg"],
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg"],
    anal: ["Anal1.jpg", "Anal2.jpg", "Anal3.jpg", "Anal4.jpg"],
    fetish: ["Fetish1.jpg", "Fetish2.jpg", "Fetish3.jpg", "Fetish4.jpg", "Fetish5.jpg"],
    cleaning: ["Cleaning1.jpg", "Cleaning2.jpg"],
    exercise: ["Exercise1.jpg", "Exercise2.jpg", "Exercise3.jpg"],
    study: ["Study1.jpg", "Study2.jpg", "Study3.jpg", "Study4.jpg"],
    naked: ["Naked1.jpg", "Naked2.jpg", "Naked3.jpg", "Naked4.jpg", "Naked5.jpg"],
    prison: ["Prison1.jpg", "Prison2.jpg"],
    tentacles: ["Tentacles1.jpg", "Tentacles2.jpg", "Tentacles3.jpg", "Tentacles4.jpg"]
  },
  actions: {
    Clean: {
      results: [
        {
          message: 'Sakuya spent several hours dusting neglected corners, putting things in order and removing bodily fluids from the rooms of the <%= girl.building().name %>. You can hardly believe how effective it was - one would swear it should take an hour to get the stains out of those sheets, but you turned your back for a moment and they were done, washwater splashed all over the walls.',
          delta: {
            endurance: -8,
            clean: 15,
            happiness: 1,
            modesty: -0.3
          } // delta
        }
      ] // results
    } // Clean
  } // actions
};
