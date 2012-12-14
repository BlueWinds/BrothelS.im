// Like all other content, adding missions involves adding items to global objects. Your mission's _id must be globally unique.

Missions.specialParty = {
  // If the mission involves any fetishes, you must list them here!
  // fetishes: {
  //   tentacles: true
  // },

  // You know what's nifty? The game has a random person generator! All you have to do is decide what category of person you want this mission to involve, and put them in a list here. Currently, only the groups 'High Class' and 'Very Low Class' are available. The people generated will then be available in replacement patterns for game text.
  people: ['High Class'],

  // The name is what's displayed to the user. It can contain replacement patterns, though usually only the "people" option allows this to be useful. For example, this mission customizes the title based on the randomly generated 'High Class' person above.
  name: 'Escort for <%= mission.people[0].name %>',
  // The description also allows replacement patterns. One trick you might notice here is the "Game.strings" variable - it contains user friendly translations of some mechanical terms, such as "intelligence" -> "Smart" and "libido" -> "Slutty". This trick is available in any rendered string.
  description: "Once every month, the city throws a gala party for whatever rich and powerful visitors are present at the time. This party lasts a full 24 hours, complete with parade down the central avenue and fireworks at night. It is traditional for those who can afford it to have an escort accompany them in the evening - and lacking anyone to accompany him, <%= mission.people[0].name %> has approached you to provide one.<br><br>If you assign a girl to to escort <%= mission.people[0].name %> in the <strong>evening of day <%= mission.end.day %></strong>, she'll accompany him to the party. You'll receive this message again the day of the party.<br><br>He's promised to pay quite well for her attention. You poke around a bit and discover that <%= mission.people[0].name %> is a notable <%= mission.people[0].profession %> and would probably be pleased with (and therefore pay extra well for) a <strong><%= Game.strings[mission.people[0].wants[0]] %></strong> and <strong><%= Game.strings[mission.people[0].wants[1]] %></strong> girl.",
  // As usual, the image allows replacement patterns.
  image: '<%= mission.people[0].image %>',
  // start is an object that determines when this mission begins. Each option is explained in detail below.
  start: {
    // "day" determines the game day the mission starts on.
    // Usually, you'll want to use either "day" or some other combination of options - if day is present, the mission will only have a chance to trigger on that day, and if missed, will be gone forever.
    day: 10

    // The "money" option allows you to trigger a mission when the player has collected a certain $ amount.
    // money: 1000,
    // You can also trigger a mission when the player has hired/bought a certain number of girls/buildings.
    // girls: 3,
    // buildings: 2,

  },
  end: function() {
    var day = 15;
    if (g.day > 10) {
      day = g.day - g.day % 30 + 45;
    }
    return { day: day };
  },
  success: {
    mission: 'specialParty'
  }
};
