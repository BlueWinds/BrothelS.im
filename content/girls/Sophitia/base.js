// Put the name of the girl here. If the name is multiple words, do this instead:
// Girls['Lady McAwesome'] = {
Girls.Sophitia = {
  // All strings have to be on one line. You can break up long bits of text by wrapping each section in <p></p> tags - other bits of HTML will also work, such as <em></em> for italics, or <strong></strong> for bold.
  description: "<p>The daughter of a baker, Sophitia worked at her family bakery. She always treasured her country's culture and prayed often to the city guardian. One day, as she bathed in a forest spring, the god of the forge revealed himself, and told her of the evil sword whose existence threatened to bring much pain to the world. He ordered her to seek to destroy this foul blade.</p><p>At first Sophitia was reluctant to take the holy mission, for she was only a baker's daughter, but the god insisted. She tracked down the wielder of this powerful sword - and was gravely wounded in the fight without even inconveniencing him.</p><p>Afraid to face the wrath of her god, she fled for distant lands... and ended up here.</p>",
  // There are two options for status. First, a simple value, like:
  // status: 'Hired',
  // This would set her status to "Hired" (working for the player) immediately, as soon as the game starts. Alternately, you can supply multiple values, like below. The number after each is the chance she end up with this status on any given day. All the values should add up to one.
  // In Sophitia's case, there's an 80% chance she'll be For Hire on any given day, and a 20% chance she'll be "Town" (which means unavailable.
  // Hired, For Hire and Town are the only options currently.
  status: {
    Town: 0.2,
    'For Hire': 0.8
  },
  // The happiness you set here will influence her hire price. When the player actually hires her, it will be reset to 75.
  happiness: 0,
  // The other stats work exactly like you'd expect - set the starting values here. Remember that higher stats increase a girl's hire price and her pay.
  endurance: 100,
  obedience: 50,
  modesty: 30,
  charisma: 40,
  intelligence: 20,
  constitution: 40,
  'soft experience': 0,
  'hard experience': 20,
  'anal experience': 20,
  'fetish experience': 0,
  'soft libido': 10,
  'hard libido': 40,
  'anal libido': 60,
  'fetish libido': 10,
  // specialRules is where you can put in tweaks, so that the girl works a little differently than normal.
  specialRules: {
    // payRatio: 0.5,
    // payRatio is multiplied into her desired pay - setting it to .5 means she only wants half as much money, while 3 would mean three times the pay.
//     dependentStats: {
    // The "dependentStats" special rule allows you to modify the way her stats change. There are three main ways to use this, described below:

//       "soft experience": { happiness: 1 },
      // In this case, whenever her "soft experience" stat is increased, her happiness also goes up an equal amount - +3 experience will also give her +3 happiness.

//       intelligence: { intelligence: 0.5 },
      // You can also modify the stat being added without breaking things. In this example, her intelligence increases at +50% rate - if she got +4 intelligence, she'd also get +2 at the same time.
      // Be careful not to create a dependency loop though - the game is smart enough to handle the above example (with intelligence gain causing more intelligence gain), but *also* adding the line happiness: { "soft experience": 1 } would cause a loop - adding experience adds happiness, adding happiness adds experience, ad infinitum.

//       "-modesty": { "fetish libido": 0.2 }
      // You can use "-stat" to apply rules for when a stat *decreases*. In this case, whenever her modesty drops, her fetish libido rises a little bit.
//     },
  },
  images: {
    // basePath is the path to the images folder you created. Don't forget to put your girl's name in here!
    basePath: "content/girls/Sophitia/images",
    // base is the default portrait. It is the only image *required*.
    base: "Base.png",
    // Now for the interesting bits. For each type of image, you have three options:
    // 1) Remove the line. Any events that need an image of a missing type will use the base image.
    // 2) A single image file.
    // 3) A list of image files. Whenever an image of this type is needed, the game will select one at random.
    // You can reuse images - Kirino, for example, doesn't have any real tentacle pictures, so her tentacles line looks something like this:
    // tentacles: ["Fet1.png", "Fet3.png", "Fet4.png"]
    refuse: "Refuse.jpg",
    tired: "Tired.jpg",
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg", "Soft5.jpg", "Soft6.jpg"],
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg", "Hard4.jpg"],
    anal: ["Anal1.jpg", "Anal2.jpg", "Anal3.jpg", "Anal4.jpg"],
    fetish: ["Fetish1.jpg", "Fetish2.jpg", "Fetish3.jpg", "Fetish4.jpg", "Fetish5.jpg", "Fetish6.jpg"],
    cleaning: "Cleaning.jpg",
    exercise: "Exercise.jpg",
    study: ["Study1.jpg", "Study2.jpg"],
    naked: ["Naked1.jpg", "Naked2.jpg"],
    prison: "Prison.jpg",
    tentacles: ["Tentacles1.jpg", "Tentacles2.jpg", "Tentacles3.jpg", "Tentacles4.jpg", "Tentacles5.jpg"]
  }
  // A girl can also have actions specific to her. Her "actions" key can have any number of actions, each one defined exactly as actions available to all girls (See content/actions/Simple.js for a commented example of what an action looks like, or Dark Magician Girl for an example of a girl-specific action in... action.
  // actions: {
    // Action1: { ... },
    // Action2: { ... },

    // One nifty feature is that you can override general actions with girl specific versions. All you have to do is use the same _id as the general one - and any missing keys will be filled in from the non girl specific version. See Sakuya for an example of this in action.
    // Clean: {},
  // }
};
