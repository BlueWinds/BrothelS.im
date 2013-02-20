"use strict";
Events.tentacleAttack = {
  conditions: {
    fetishes: { tentacles: true },
    missions: { tentacleAttackIntro: 2 },
    time: 'evening'
  },
  tags: {
    slums: 0.07,
    docks: 0.1,
    market: 0.02,
    redlight: 0.02,
    university: 0.02
  },
  variants: [ 0.33, 0.34, 0.33 ],
  results: [
    {
      message: {
        group: '<<- girl.name >>',
        image: '<<- girl.image("tentacles") >>',
        label: 'Attacked by Tentacles',
        text: "<<= girl.name >> was heading into the city to <<= action.label >>, hurrying along a narrow street. The lamps seemed spaced oddly far apart - and a moment later she could tell she was right be worried.<br><br>Several tentacles quickly lashed out and wrapped themselves around <<= girl.name >>. Quickly they dragged into a tiny alley. Abruptly, with no foreplay or ceremony at all, the rope-like vines thrust into her, ripping through her panties seemingly without resistance on their way to her intimate areas. She screamed out, expecting pain, but it was muffled twofold, first by another appendage in her mouth, and second by a burst of ecstasy that left stars in her eyes. The creature didn't wait for her to recover, intent on its own pleasure - its limbs were well lubricated, slipping in and out in an increasing crescendo.<br><br>Unable to call out for help or move in the slightest, <<= girl.name >>'s ass and pussy were used mercilessly for an hour and a half. Finally, at the sound of someone else approaching, the beast soundlessly withdrew down the sewer grate. The footsteps never reached her - whoever it was must have had better sense than to approach a dark ally at night. She lay in a senseless daze for several minutes before picking herself up and hurrying home."
      },
      girl: {
        endurance: -40,
        happiness: -5,
        intelligence: -4,
        analLibido: 3,
        analExperience: 5,
        obedience: 5
      }
    },
    {
      message: [
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("tentacles") >>',
          label: 'Attacked by Tentacles',
          text: "<<= girl.name >> was minding her own business on a park bench, taking a short break when something briefly blotted out the <<= time == 'morning' ? 'sun' : 'moon' >>, and she was lifted off her feet without even time for a scream. Passersby pointed and yelled helplessly as she was lifted to the top of a nearby building, her clothing dropping to the ground as the creature roughly shredded it with a seemingly endless stream of whipcord appendages.<br><br>She was suspended there, naked, in plain sight of dozens as the birdlike creature perched on the roof of a building, seemingly not even noticing her weight or struggles. The instant it had removed the last article of her clothing, panties dropping several stories to the ground below, it slid a huge tentacle into her pussy - and an even larger one into her ass, causing her to moan in a combination of lust and pain. Her screams were finally silenced when another massive limb filled her throat.",
          delta: false
        },
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("tentacles") >>',
          label: 'Attacked by Tentacles',
          text: "It wasn't long before a seemingly endless stream of cum flooded her womb, bowels and stomach. Delirious with lust, she moaned and licked her lips in an attempt to coax out more of the delicious, sticky white substance - successfully. Her belly began to swell obscenely.<br><br>Finally the city guard arrived to drive the creature off. <<= girl.name >> was no use - she just moaned and orgasmed repeatedly as arrows flew around her to pinion the thing's wings to the roof and finally kill it. She lay shuddering, still lost in lust and bliss, suspended in midair by the dead beast's impaling limbs. Finally the guards managed to reach the roof and free her."
        }
      ],
      girl: {
        endurance: -40,
        happiness: 3,
        intelligence: -6,
        fetishLibido: 6,
        fetishExperience: 5,
        modesty: -8,
        obedience: 3
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        image: '<<- girl.image("tentacles") >>',
        label: 'Attacked by Tentacles',
        text: "<<= girl.name >> was on her way to <<= action.label >> when she tripped, sprawling out across the cobblestones. Before she could react, she was bound by the wrists and ankles, gagged tightly across the mouth, and dragged over the edge into a nearby canal with an almost soundless splash. There, under a bridge and out of sight of passersby, a shape she couldn't quite see suspended her from the ceiling.<br><br>The creature was surprisingly gently, caressing her as it discarded her clothing slowly, almost sensuously, somehow removing even her bra without damaging it. It probed at her mouth, but she didn't open - her ass and pussy offered no such resistance. Despite the danger, its gentle touches aroused <<= girl.name >>, and she could hardly control herself from moaning out in pleasure when it finally began to penetrate and make love to her. It never let her orgasm, despite hours of teasing driving her mad with pleasure - and when it finally satisfied its desire for her juices and withdraw, she masturbated wildly under the bridge, leaving the stones slick with a mix of her own cum and the creature's slime."
      },
      girl: {
        endurance: -20,
        happiness: -3,
        intelligence: -2,
        softLibido: 6,
        softExperience: 8,
        obedience: 3
      }
    }
  ]
};

Events.tentacleManGreet = {
  tags: {
    university: 0.2
  },
  conditions: {
    fetishes: { tentacles: true },
    ownerParticipation: true,
    missions: {
      
    },
    girl: {
      max: {
        specialRules: { tentacleManProgress: 0 }
      }
    }
  },
  results: [{
    message: {
      group: '<<- girl.name >>',
      image: 'content/events/DrAnder.jpg',
      label: 'Met with Dr. Ander',
      text: "You were taking a fine <<- time >> stroll through the finer parts of the city when a handsome young man struck up a conversation, captivated by <<= girl.name >>'s beauty. He introduced himself as Dr. Ander, son of a Duke and professor at the university. He's not shy about going straight after what he wants - he'd like <<- girl.name >> to spend some exclusive time with him, and his descriptions of exactly how he plans to treat her have her blushing and (you can't help but notice) more than a little wet. Finally he departs, and you're almost surprised <<- girl.name >> doesn't grab after his wrist and insist on a quick fuck right then and there. odd, you didn't think he was <i>that</i> attractive.",
      weight: -1
    },
    girl: {
      endurance: -5,
      softLibido: 2,
      specialRules: { tentacleManProgress: 1 }
    }
  }]
};

Events.tentacleManVisit = {
  tags: {
    university: 0.6
  },
  conditions: {
    fetishes: { tentacles: true },
    ownerParticipation: true,
    missions: {
      
    },
    girl: {
      min: {
        specialRules: { tentacleManProgress: 1 }
      },
      max: {
        specialRules: { tentacleManProgress: 1 }
      }
    }
  },
  variants: function(context, done) {
    var text = context.girl.name + " is in a good mood as she walks through the University with you. You inquire about Dr. Anders - he's quite well known, apparently, and the student directs you to a building set a little away from the rest of the university. Dr. Anders opens the door after the second knock.<blockquote>Welcome, welcome! I'm so glad you came. Especially you, Mrs. <<- girl.name >> - I haven't been able to stop thinking about you since we last met. So, are you here to take me up on my offer? Give me a few hours of your time, and...</blockquote> You don't catch the rest of what he said, because it was whispered into her ear.";
    var options = {
      'Let him entertain her': "Dr. Anders will take her into the back room and do... whatever it is " + context.girl.name + " seems so keen on.",
      'Just talk': "You and " + context.girl.name + " should get to know him better."
    };
    Game.getUserInput(text, 'content/events/DrAnder.jpg', options, function(answer) {
      var result = context.mission.base().results[answer];
      done(result);
    });
  },
  results: {
    'Just talk': {
      message: {
        group: '<<- girl.name >>',
        image: 'content/events/DrAnder.jpg',
        label: 'Talk with Dr. Ander',
        text: "You decline the offer politely - he isn't going to pay, afterall, and <<- girl.name >>'s reaction to him worries you a little. He still insists that you at least stay for tea - he summons an assistant, a young woman wearing a low-cut blouse and short skirt, who obediently goes to prepare some. The three of you pull together chairs in a classroom and talk of small things, until the university bell signals a change in hours. Dr. Anders thanks you for your company, but he really must be going now - do drop in if you're ever in the university again.",
        weight: -2
      },
      girl: {
        endurance: -4,
        happiness: 2,
        softLibido: 1,
        specialRules: {
          tentacleManProgress: false
        }
      }
    },
    'Let him entertain her': {
      message: {
        group: '<<- girl.name >>',
        image: '<<- girl.image() >>',
        label: 'Spend time with Dr. Ander',
        text: "Who are you to stand in the way to two people who can obviously think of little other than screwing eachother's brains out? When you don't object, <<- girl.name >> blushes and takes his hand. The two of them disappear into a back room, leaving you somewhat at a loss for what to do next.<br><br> Not for long though - a young woman wearing a low-cut blouse and short skirt arrives, introducing herself as Maria, one of Dr. Ander's assistants. Despite the generous cleavage and great amount of leg on display, she's quite meek, and asks if there's anything she can get you while Dr. Anders is busy. You opt for some tea, which she's happy to prepare, and some conversation with the gorgeous student, which she's happy to provide.<br><br><<- girl.name >> returns an hour and a half later, glowing and disheveled, unaccompanied by Dr. Anders. Maria excuses herself, and you give <<- girl.name >> a few minutes in the bathroom to compose herself before heading out.",
        weight: -2
      },
      girl: {
        endurance: -25,
        happiness: 9,
        hardLibido: 3,
        hardExperience: 4,
        analLibido: 3,
        analExperience: 4,
        specialRules: {
          tentacleManProgress: 1
        }
      }
    }
  }
};

Events.tentacleManVisitYou = {
  tags: {
    indoors: 0.5
  },
  conditions: {
    time: 'evening',
    fetishes: { tentacles: true },
    missions: {
      
    },
    girl: {
      min: {
        specialRules: { tentacleManProgress: 2 }
      },
      max: {
        specialRules: { tentacleManProgress: 3 }
      }
    }
  },
  variants: function(context, done) {
    if (context.girl.specialRules.tentacleManProgress == 2) {
      done(this.base().results.firstVisit);
      return;
    }
    // We have to apply the progress special rule here, so that the girl meets the conditions for the action we want to set.
    context.girl.apply('specialRules', { tentacleManProgress: 1 });
    var action = context.girl.action('tenacleManAbduction', context);
    context.girl.setAction(action);
    action.locked = true;
    done(this.base().results.abduction);
  },
  results: {
    firstVisit: {
      message: [
        {
          group: '<<- girl.name >>',
          image: 'content/events/DrAnder.jpg',
          label: 'Visit by Dr. Ander',
          text: "<<- girl.name >> was getting ready to <<- action.label >> when she spots a familiar face coming down the street towards the <<- girl.building() ? girl.building().name : 'Inn' >>. He sees her looking out the window and waves - she's clearly the one he's coming to see. Her previous plans forgotten, <<- girl.name >> heads out to meet him. He'd like more of her time, of course, and this time he brought money, since he's the one doing the calling. It's not a bad amount of money, and <<- girl.name >> might revolt if you refused, and so off she goes, arm in arm with the young doctor.",
          weight: -1,
          delta: false
        },
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image() >>',
          label: 'Visit by Dr. Ander',
          text: "She returns around one in the morning, exhausted but pleased. As before, she's not particularly interested in talking about what they did together, but since you can tell she's walking funny and sits gingerly, you suspect the fine young doctor may have moved on to a different hole. Perhaps the red circle she blushes and tries to hide on her arm is from a rope digging in.",
          weight: -1
        }
      ],
      girl: {
        endurance: -25,
        happiness: 9,
        analLibido: 3,
        analExperience: 4,
        fetishLibido: 3,
        fetishExperience: 4,
        specialRules: {
          tentacleManProgress: 1
        }
      }
    },
    abduction: {
      message: {
        group: '<<- girl.name >>',
        image: 'content/events/missing.jpg',
        label: 'Missing',
        text: "You asked <<- girl.name >> to <<- action.label >> this evening, but as far as you can tell, she never did. After nipping out to get a few groceries, she never returned. Well, distractions have been known to happen - perhaps you shouldn't worry just yet?<br><br><em>You can select your response as if you were choosing an option for an <<- girl.name >>'s action.</em>",
        weight: -1
      }
    }
  }
};

Actions.tenacleManAbduction = {
  label: 'Missing',
  group: 'Jobs',
  description: '<<- girl.name >> did not return home last night. You wonder where she\'s gotten off to.',
  conditions: {
    girl: {
      min: {
        specialRules: { tentacleManProgress: 3 }
      },
      max: {
        specialRules: {
          tentacleManSearch: 9
        }
      }
    }
  },
  allDay: true,
  awayFromHome: true,
  // Intentionally empty - do not interrupt.
  tags: {},
  options: {
    'Nothing': "She's probably just staying home for a few days. Nothing to worry about.",
    'Alert the Guard': "She's definitely missing. Liaise with the town guard and start a search.",
    'Launch investigation': "Telling the town guard is one thing, but a couple of bribes in appropriate places and the response might be a lot more effective..."
  },
  variants: function(context, done) {
    var results = this.base().results;
    this.applyResults(results[this.option], context);
    if (context.girl.specialRules.tentacleManSearch > 9) {
      done(results.Found);
    } else {
      done(results['Day' + (context.girl.specialRules.tentacleManProgress - 2)]);
    }
  },
  results: {
    Nothing: {
      girl: {
        specialRules: { tentacleManSearch: 2 }
      }
    },
    'Alert the Guard': {
      message: {
        group: '<<- girl.name >>',
        image: 'content/events/missing.jpg',
        label: 'Missing - day <<- girl.specialRules.tentacleManProgress - 2 >>',
        text: "<<- girl.name >> has been gone too long to just have gotten lost. You visit the Garrison to alert the city guard that she's missing (this sort of thing is exactly their job, after all) and you're assured that they'll do whatever they can to locate your missing girl. The man who listens to your case seems sincere - he while they're not exactly going to turn the city upside-down just yet, a reputation for safe and orderly streets is an absolute necessity for a city that makes its money from visitors.",
        weight: -1
      },
      girl: {
        specialRules: { tentacleManSearch: 3 }
      }
    },
    'Launch Investigation': {
      message: {
        group: '<<- girl.name >>',
        image: 'content/events/missing.jpg',
        label: 'Missing - day <<- girl.specialRules.tentacleManProgress - 2 >>',
        text: "<<- girl.name >> has been gone too long to just have gotten lost. You visit the Garrison to alert the city guard that she's missing (this sort of thing is exactly their job, after all) and you're assured that they'll do whatever they can to locate your missing girl. You mention that there's a rather large reward for her safe return - the guard asks exactly how much, and you name a figure. A few exchanges later, it's apparent that he's not asking about the reward in general, but <em>his</em> reward in specific. You pass over some money, confident that it's a bribe well worth making if it gets <<- girl.name >> home safe sooner.",
        weight: -1
      },
      girl: {
        specialRules: { tentacleManSearch: 4 }
      },
      money: -500
    },
    Day1: {
      message: [
        {
          group: '<<- girl.name >>',
          image: 'content/events/missing.jpg',
          label: 'Missing - Day 1',
          text: "Elsewhere...",
          weight: -1,
          delta: false
        },
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("naked") >>',
          label: 'Missing - Day 1',
          text: "<<- girl.name >> regains consciousness floating lazily on her back in a pool of water. Her thoughts are a bit hazy - she can't quite remember how she came to be here, floating, naked, relaxed, pleased... oh, that's right. An image of Dr. Anders comes to mind, smiling and asking if she wanted to come with him. She had agreed, and... hm, it doesn't much matter how she got here, she supposes dreamily. Ooh, what's that? A slippery touch on the back of her legs sends shivers up her spine, bringing up other memories.<br><br>A vague sense that she should be panicking comes to mind, but it feels <em>so good</em> as it snakes around her body, searching for something...",
          weight: -1
        }
      ],
      girl: {
        endurance: -25
      }
    },
    Day2: {
      message: [
        {
          group: '<<- girl.name >>',
          image: 'content/events/missing.jpg',
          label: 'Missing - Day 2',
          text: "Elsewhere...",
          weight: -1,
          delta: false
        },
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("tentacles") >>',
          label: 'Missing - Day 2',
          text: "<<- girl.name >> thrashes around, attempting to deny entry to the slippery limbs",
          weight: -1
        }
      ],
      girl: {
        endurance: -25,
        happiness: -10,
        fetishLibido: 3
      }
    },
    Day3: {
      girl: {}
    },
    Day4: {},
    Found: {}
  }
};
