// There are currently two varieties of events: One-time and Interruptive.
// One time events... happen once. Currently the only option is "on a specific day", but there will be more controls soon - like "three days after hiring a new girl" or "when the player has $10000.
// Interruptive events occur randomly when girls take actions that match certain criteria defined by the event. Don't worry, that will get clearer as you read on.

//This first event, 'tentacleAttack' is an interruptive event.

// Defining an event involves adding to the the global Events object. The event ID must be unique. It's never displayed to the player.
Events.tentacleAttack = {
  // The label, on the other hand, is what's displayed to the user. It could be anything, but should be pretty short (it's used as the title of the message).
  label: 'Tentacle Attack!',
  // Interruptive events might be triggered when an action *matches one or more of its tags*.
  // For example, the "Rest" action has no tags - it can't trigger any interruptive events. Exercise, on the other hand, has the "outdoors" tag - it can trigger any events that also have the tag.
  // Tags are an "or" style list - any action that *shares at least one tag* with the event can trigger it.
  // If oneTime were turned on, it would specify this event as occurring only once. Since it's not present (commented out), this is an interruptive event.
  // oneTime: true,
  tags: {
    // Currently "outdoors" is one of only two tags - any actions that make the girl is run around the city have this tag.
    outdoors: true
    // This is the other tag used so far, on any actions that represent her performing "adult entertainment" for someone.
    // prostitution: true,
  },
  // This object should include any and all fetishes this event contains - if it's "borderline", put it in.
  fetishes: {
    // Tags also control the content filtering mechanism of the game, allowing players to turn on/off different fetishes. Currently, "tentacles" is the only fetish the game supports - if you want to add content that belongs to a different one, **let me know**. I will happily add support for it, as long as it isn't loli or bestiality.
    tentacles: true
  },
  // The "dangerous" option means that the girl would avoid this event if she could. The event also becomes more or less likely depending on if she's in a good or bad part of town. If the event didn't have this tag, it would be equally likely to trigger on any action that meets its criteria.
  // If the event isn't "dangerous", either remove this line or set it to false.
  dangerous: true,
  // "time" allows you to limit the event to a certain time of day - 'morning' or 'evening'. If the event should happen any time of the day, remove this line.
  time: 'evening',
  // Events can be "disruptive", which mean they prevent whatever event triggered them from occurring. A tentacle attack, for example, prevents the girl from carrying on with whatever else she was planning on doing. If this were false or not present, then the girl would take her normal action after this event finished resolving.
  disruptive: true,
  // minDay means that the event won't trigger before this game day. Remove it if your event can start on day 0.
  minDay: 7,
  // Important number! When a girl's action matches all the above criteria (has a matching tag, the time of day is right, etc., this is the probability the event occurs. A tentacle attack has a 20% chance in the evening - though remember that this may be modified based on the specific action because this event is marked "dangerous".
  // While I'm working on an event, I like to set this to 1, so it triggers all the time. Don't forget to reduce it again later.
  likelyhood: 0.2,
  // Now we get to the interesting bits. ;)

  // There are two ways to control how an event plays out. The first, and simpler, one, is shown below.
  // "variants" can be a list of numbers adding up to one, which will give each variant (defined later) the corresponding chance of occurring. In tentacle attacks, there are three possibilities, each with an equal chance.
  // If there's only one variant, you can either leave this out, or explicitly set "variants: [1],"
  // The second option is to supply a javascript function - this is more complicated but more powerful (allowing you to check the girl's statistics). An example of this will come soon.
  variants: [ 0.33, 0.34, 0.33 ],
  results: [
    // The number of items in results *must* be equal to the number of items in variants - they directly correspond.
    {
      // This image will be used from the girl the event is occurring to. See the "creating a girl" tutorial for more on how this works.
      // There is also a second option: you can use an "absolute path" to choose a specific image file. For example:
      // image: '/content/girls/Sophitia/images/Tentacles4.jpg',
      // Any image starting with a '/' will be considered absolute.
      image: 'tentacles',
      // message can be as simple or complicated as you like. It's really simple if it's just text - but you can also use replacements from the girl or anywhere else in the game!

      // <%= %> is a tag for printing whatever happens inside. There are a couple of examples in the message below.
      // action is "whatever she was trying to do when this event struck". Mostly you'll probably just want action.label.
      // event is the object you're editing in this file - self reference, yay!
      // time is the time of day, either 'morning' or 'evening'.
      // girl.name is her name. You can also access plenty of other properties - girl.obedience, for example, or girl['soft libido']. Wait, brackets instead of dots? Yep, for accessing properties with spaces, you need brackets and quotes around them.
      // Accessing a girl's stats doesn't seem real useful until I mention the fact that you can use *arbitrary javascript* inside the <%= %> tags. Wow, powerful! If you know javascript, that is. Otherwise kind of confusing and useless.
      // For more information on how you can customize the message, you could read the documentation at http://www.embeddedjs.com/ - or ask me if you have specific questions about how to accomplish something.
      message: "<%= girl.name %> was heading into the city to <%= action.label %>, hurrying along a narrow street. The lamps seemed spaced oddly far apart - and a moment later she could tell she was right be worried.<br><br>Several tentacles quickly lashed out and wraped themselves around <%= girl.name %>. Quickly they dragged into a tiny alley. Abruptly, with no foreplay or ceremony at all, the ropelike vines thrust into her, ripping through her panties seemingly without resistance on their way to her intimate areas. She screamed out, expecting pain, but it was muffled twofold, first by another appendage in her mouth, and second by a burst of ecstasy that left stars in her eyes. The creature didn't wait for her to recover, intent on its own pleasure - its limbs were well lubricated, slipping in and out in an increasing crescendo.<br><br>Unable to call out for help or move in the slightest, <%= girl.name %>'s ass and pussy were used mercilessly for an hour and a half. Finally, at the sound of someone else approaching, the beast soundlessly withdrew down the sewer grate. The footsteps never reached her - whoever it was must have had better sense than to approach a dark ally at night. She lay in a senseless daze for several minutes before picking herself up and hurrying home.",
      // I cheated and left something out before for simplicity's sake - an event's "label" (the second line of this file, way back at the top) has access to all the same replacements as this message does. You could use the girl's name, the time of day or whatever you wanted to build the label.

      // Delta is the stat changes the event applies to the girl. Shouldn't be too hard to figure out from the example below.
      delta: {
        endurance: -40,
        happiness: -5,
        intelligence: -4,
        'hard libido': 3,
        'anal libido': 3,
        'hard experience': 5,
        'anal experience': 5
        // There are two special "stats" you can include in a delta - clean and money.
        // money: 53, - this line would pay the player $53.
        // clean: 5, - this event would clean the building she's living in, if any, by 5. If she doesn't have a bedroom, it will just be ignored.
      }
    },
    {
      // This variant shows more more trick: splitting the event up over multiple messages!
      // If image and message are both lists, then one message will be sent for each item, with the delta applied only on the last message. This isn't any different game wise, but it can be nice to break up long blocks of text into sections.
      image: ['tentacles', 'tentacles'],
      message: [
        "<%= girl.name %> was minding her own business on a park bench, taking a short break when something briefly blotted out the <%= time == 'morning' ? 'sun' : 'moon' %>, and she was lifted off her feet without even time for a scream. Passerby pointed and yelled helplessly as she was lifted to the top of a nearby building, her clothing dropping to the ground as the creature roughly shreded it with a seemingly endless stream of whipcord appendages.<br><br>She was suspended there, naked, in plain sight of dozens as the birdlike creature perched on the roof of a building, seemingly not even noticing her weight or struggles. The instant it had removed the last article of her clothing, panties dropping several stories to the ground below, it slid a huge tentacle into her pussy - and an even larger one into her ass, causing her to moan in a combination of lust and pain. Her screams were finally silenced when another massive limb filled her throat.",
        "It wasn't long before a seemingly endless stream of cum flooded her womb, bowels and stomach. Delirious with lust, she moaned and licked her lips in an attempt to coax out more of the delicious, sticky white substance - successfully. Her belly began to swell obscenely.<br><br>Finally the city guard arrived to drive the creature off. <%= girl.name %> was no use - she just moaned and orgasmed repeatedly as arrows flew around her to pinion the thing's wings to the roof and finally kill it. She lay shuddering, still lost in lust and bliss, suspended in midair by the dead beast's impaling limbs. Finally the guards managed to reach the roof and free her."
      ],
      delta: {
        endurance: -40,
        happiness: +3,
        intelligence: -6,
        'anal libido': 3,
        'fetish libido': 6,
        'anal experience': 3,
        'fetish experience': 5
      }
    },
    {
      image: 'tentacles',
      message: "<%= girl.name %> was on her way to <%= action.label %> when she triped, sprawling out across the cobblestones. Before she could react, she was bound by the wrists and ankles, gagged tightly across the mouth, and dragged over the edge into a nearby canal with an almost soundless splash. There, under a bridge and out of sight of passerby, a shape she couldn't quite see suspended her from the ceiling.<br><br>The creature was surprisingly gently, caressing her as it discarded her clothing slowly, almost sensuously, somehow removing even her bra without damaging it. It probed at her mouth, but she didn't open - her ass and pussy offered no such resistance. Despite the danger, its gentle touches aroused <%= girl.name %>, and she could hardly control herself from moaning out in pleasure when it finally began to penetrate and make love to her. It never let her orgasm, despite hours of teasing driving her mad with pleasure - and when it finally satisfied its desire for her juices and withdraw, she masturbated wildly under the bridge, leaving the stones slick with a mix of her own cum and the creature's slime.",
      delta: {
        endurance: -20,
        happiness: -3,
        intelligence: -2,
        'soft libido': 6,
        'soft experience': 8
      }
    }
  ]
};

  // Whew, that was a long one! Here's a nice, simple one-time event.
Events.tentacleAttackIntro = {
  label: 'Streets Unsafe',
  // This event won't trigger randomly because of the oneTime option - thus, it doesn't need all of the keys dealing with where and hot girls can cause it.
  oneTime: true,
  // It does still need fetish information though!
  fetishes: {
    tentacles: true
  },
  // Time should be either 'morning' or 'evening' for one time events - don't leave it out.
  time: 'morning',
  // The day the event triggers on. More useful selectors will come later, but for now this is it.
  day: 7,
  // Only one variant for this event, so the "variants" option can be left out.
  // variants: [1],
  results: [
    {
      // Since one time events aren't associated with a particular girl, you must use an absolute path for the image.
      image: '/content/girls/Sophitia/images/Tentacles4.jpg',
      // Without a girl to pull data from or an action interrupted, the message can't have any replacement patterns in it. Told you one time events were simpler!
      message: "The streets are not safe. Tentacled monstrosities have been seen in town. The authorities are hunting them, but there have been attacks as they seek to breed. These monsters are cunning and wise, almost intelligent, but full of lust and the desire for human women. Be wary of sending girls into the city in the evening.<br><br>Some actions are safer than others - Streetwalking is relatively safe, since she will be searching crowded areas, while Exercise is less so - a girl jogging alone at night is a prefect target for the beasts."
      // One time events can't have deltas either. There's no girl to apply them to.
    }
  ]
};