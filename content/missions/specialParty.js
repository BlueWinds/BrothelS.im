// Like all other content, adding missions involves adding items to global objects. Your mission's _id must be globally unique.

Missions.specialParty = {
  // If the mission involves any fetishes, you must list them here!
  // fetishes: {
  //   tentacles: true
  // },

  // start is an object that determines when this mission begins. Each option is explained in detail below.
  start: {
    // minDay and maxDay depend on the game day - in this case, the specialParty mission begins on day 10, no sooner and no later, and with no other conditions.
    minDay: 10,
    maxDay: 10
    // The "money" option allows you to trigger a mission when the player has collected a certain $ amount.
//     money: 1000,
    // You can also trigger a mission when the player has hired/bought a certain number of girls/buildings.
//     girls: 3,
//     buildings: 2,
    // girlMin allows you to *associate a mission with a specific girl*. Later, when the conditions for ending the mission are checked, it's her stats that will again be compared.
    // It's a list of the minimums she must have in each stat for the mission to trigger.
//     girlMin: {
//       obedience: 85
//     },
    // I bet you can guess what girlMax does. ;P
//     girlMax: {
//       happiness: 30
//     },
  },

  // You know what's nifty? The game has a random person generator! All you have to do is decide what category of person you want this mission to involve, and put them in a list here. Currently, only the groups 'High Class' and 'Very Low Class' are available. The people generated will then be available in replacement patterns for game text.
  people: ['High Class'],

  // The name is what's displayed to the user. It can contain replacement patterns. For example, this mission customizes the title based on the randomly generated 'High Class' person above. If the mission is attached to a specific girl (start.girlMin or start.girlMax are defined above), then "girl" will also be available here - <<= girl.name >>, for example.
  label: 'Escort for <<= mission.people[0].name >>',
  // You can optionally define the tab that all messages sent by this mission appear under - useful if it belongs to a specific girl. If you don't define a group, it will appear under "Missions".
  group: 'Monthly Festival',

  // The description also allows replacement patterns. One trick you might notice here is the T() function - it contains user friendly translations of some mechanical terms, such as "intelligence" -> "Smart" and "libido" -> "Slutty". This trick is available in any rendered string. You can also use T(string, "adj") to get the adjectival form of a term.
  description: "Once every month, the city throws a gala party for whatever rich and powerful visitors are present at the time. This party lasts a full 24 hours, complete with parade down the central avenue and fireworks at night. It is traditional for those who can afford it to have an escort accompany them in the evening - and lacking anyone to accompany him, <<= mission.people[0].name >> has approached you to provide one.<br><br>If you assign a girl to to escort <<= mission.people[0].name >> in the <strong>evening of day <<= mission.end.minDay >></strong>, she'll accompany him to the party. You'll receive this message again the day of the party.<br><br>He's promised to pay quite well for her attention. You poke around a bit and discover that <<= mission.people[0].name >> is a notable <<= mission.people[0].profession >> and would probably be pleased with (and therefore pay extra well for) a <<- mission.people[0].wants.slice(0, 2).CtoString('adj') >> girl.",
  // As usual, the image allows replacement patterns.
  image: '<<= mission.people[0].image >>',
  // end can be one of two things: an object describing the conditions under which the mission ends, or a function returning such an object.
  // If it's an object, all the same options are available as for "start" above.
//   end: {
//     minDay: 45,
//     maxDay: 45,
//     girls: 3,
//     buildings: 2,
  // If girlMin or girlMax were used in the "start" conditions, then here in "end" they will be checked against the same girl as before.
  // If no girl was associated with this mission when it began, then these conditions will pass when *any* girl meets the criteria. In this way, you can easily create missions like and "When a girl has obedience 50, raise it to 60" and "Have any girl with 80 soft libido".
//     girlMin: { ... },
//     girlMax: { ... },
//   },
  // If it's a function, it's called once, when the mission starts. One trick you could use is to modify this.success or this.fail (See below) - inside the function, "this" refers to the mission itself.
  // The function here describes the fact that the specialParty ends on either day 15, 45, 75, 105, etc.
  end: function() {
    if (g.day == 10) {
      return { minDay: 15, maxDay: 15 };
    }
    return { minDay: g.day + 30, maxDay: g.day + 30 };
  },
  // success describes the results of the mission when all of the end conditions are met. For specialParty, since the only conditions is a minDay, the mission will end.
  success: {
    // You can trigger new missions when one ends - this is how specialParty reoccurs once every month. If you use the "mission" key, the "start" conditions of the new mission are ignored - so in this case, the new specialParty mission starts even though it's not day 10.
    // When you trigger a new mission, it will automatically be associated to the same girl as this one, if any.
    mission: 'specialParty'
    // Give the player money.
    // money: 300,
    // Set the maximum number of girls/buildings the player can hire/own at once.
    // maxGirls: 5,
    // maxBuildings: 1,

    // If the mission is associated with a specific girl, either with start.minGirl or end.minGirl (or the max versions of each), then you can apply stat changes to that girl. You could also clean/dirty her building if she has one.
    // girl: {
    //   intelligence: 6,
    //   clean: -30
    // },

    // You can optionally send the player a message when the mission ends. String replacements are available. If you want to split the text across multiple messages, provide a list instead.
//     message: '<<= girl.name >> said to <<= mission.people[0].name >> "We\'ve succeeded!"',
//     message: [
//       'First message',
//       'Second message'
//     ],
    // If you supply the "message" key, you'll also need an image to go along with it (or multiple images, if there are multiple messages).
    // If the mission has a girl, you can use an image from one of her categories, or you can define an absolute path.
    // image: 'fetish',
    // image: '/content/missions/firstMoney.png',
    // image: ['fetish', '<<= mission.people[0].image >>'],
  }
  // You can also define a "fail" dictionary. The only way to fail a mission is to *meet* the maxDay requirement, but *fail* at least one other. That is to say, run out of time. Fail accepts all the same options as success.
//   fail: {
//     money: -1000,
//     girl: { charisma: -5 }
//   }

  // There is one special possibility - if you leave off the "end" key, the mission will end in success as soon as it triggers, never even showing up on the mission list. You can use this as form as a "one time event" - see tentacleAttack.js for an example of this use, so send a message to the player on a certain day.
};
