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
    university: 0.3
  },
  conditions: {
    fetishes: { tentacles: true },
    ownerParticipation: true,
    missions: {
      tentaclePregnancy: -1,
      tentacleManGone: -3
    },
    min: { day: 8 },
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
      text: "You were taking a <<- time >> stroll through the finer parts of the city when a handsome young man struck up a conversation, captivated by <<= girl.name >>'s beauty. He introduced himself as Dr. Ander, son of a Duke and professor at the university. He's not shy about going straight after what he wants - he'd like <<- girl.name >> to spend some exclusive time with him, and his descriptions of exactly how he plans to treat her have her blushing and (you can't help but notice) more than a little wet. Finally he departs, and you're almost surprised <<- girl.name >> doesn't grab after his wrist and insist on a quick fuck right then and there. Odd, you didn't think he was <i>that</i> attractive.",
      weight: -1
    },
    girl: {
      endurance: -5,
      softLibido: 1,
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
      tentaclePregnancy: -1
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
    var text = context.girl.name + " is in a good mood as she walks through the University with you. You inquire about Dr. Ander - he's quite well known, apparently, and the student directs you to a building set a little away from the rest of the university. Dr. Ander opens the door after the second knock.<blockquote>Welcome, welcome! I'm so glad you came. Especially you, Mrs. " + context.girl.name + " - I haven't been able to stop thinking about you since we last met. So, are you here to take me up on my offer? Give me a few hours of your time, and...</blockquote> You don't catch the rest of what he said, because it was whispered into her ear.";
    var options = {
      'Let him entertain her': "Dr. Ander will take her into the back room and do... whatever it is " + context.girl.name + " seems so keen on.",
      'Just talk': "You and " + context.girl.name + " should get to know him better."
    };
    Game.getUserInput(text, 'content/events/DrAnder.jpg', options, function(answer) {
      var result = context.event.base().results[answer];
      done(result);
    });
  },
  results: {
    'Just talk': {
      message: {
        group: '<<- girl.name >>',
        image: 'content/events/DrAnder.jpg',
        label: 'Talk with Dr. Ander',
        text: "You decline the offer politely - he isn't going to pay, afterall, and <<- girl.name >>'s reaction to him worries you a little. He still insists that you at least stay for tea - he summons an assistant, a young woman wearing a low-cut blouse and short skirt, who obediently goes to prepare some. The three of you pull together chairs in a classroom and talk of small things, until the university bell signals a change in hours. Dr. Ander thanks you for your company, but he really must be going now - do drop in if you're ever in the university again.",
        weight: -1
      },
      girl: {
        endurance: -4,
        happiness: 2,
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
        text: "Who are you to stand in the way to two people who can obviously think of little other than screwing each other's brains out? When you don't object, <<- girl.name >> blushes and takes his hand. The two of them disappear into a back room, leaving you somewhat at a loss for what to do next.<br><br> Not for long though - a young woman wearing a low-cut blouse and short skirt arrives, introducing herself as Maria, one of Dr. Ander's assistants. Despite the generous cleavage and great amount of leg on display, she's quite meek, and asks if there's anything she can get you while Dr. Ander is busy. You opt for some tea, which she's happy to prepare, and some conversation with the gorgeous student, which she's happy to provide.<br><br><<- girl.name >> returns an hour and a half later, glowing and disheveled, unaccompanied by Dr. Ander. Maria excuses herself, and you give <<- girl.name >> a few minutes in the bathroom to compose herself before heading out.",
        weight: -1
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
    indoors: 0.4
  },
  conditions: {
    time: 'evening',
    fetishes: { tentacles: true },
    missions: {
      tentaclePregnancy: -1
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
    var action = context.girl.action('tentacleManAbduction', context);
    action.locked = true;
    context.girl.setAction(action);
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

Actions.tentacleManAbduction = {
  label: 'Missing',
  group: 'Jobs',
  description: "<<- girl.name >> did not return home last night. You wonder where she's gotten off to.",
  gerund: 'being missing',
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
    'Wait Patiently': 'Wait Patiently',
    'Alert the Guard': 'Alert the Guard',
    'Launch Investigation': 'Launch investigation'
  },
  variants: function(context, done) {
    var results = this.base().results;
    this.applyResults(results[this.option], context);
    if (context.girl.specialRules.tentacleManSearch >= 10) {
      done(results.Found);
    } else {
      done(results['Day' + (context.girl.specialRules.tentacleManProgress - 3)]);
    }
  },
  results: {
    'Wait Patiently': {
      girl: {
        specialRules: {
          tentacleManSearch: 2
        }
      }
    },
    'Alert the Guard': {
      message: {
        group: '<<- girl.name >>',
        image: 'content/events/missing.jpg',
        label: 'Missing - Day <<- girl.specialRules.tentacleManProgress - 3 >>',
        text: "<<- girl.name >> has been gone too long to just have gotten lost. You visit the Garrison to alert the city guard that she's missing (this sort of thing is exactly their job, after all) and you're assured that they'll do whatever they can to locate your missing girl. The man who listens to your case seems sincere - he while they're not exactly going to turn the city upside-down just yet, a reputation for safe and orderly streets is an absolute necessity for a city that makes its money from visitors.",
        weight: -1
      },
      girl: {
        specialRules: {
          tentacleManSearch: 3
        }
      }
    },
    'Launch Investigation': {
      message: {
        group: '<<- girl.name >>',
        image: 'content/events/missing.jpg',
        label: 'Missing - Day <<- girl.specialRules.tentacleManProgress - 3 >>',
        text: "<<- girl.name >> has been gone too long to just have gotten lost. You visit the Garrison to alert the city guard that she's missing (this sort of thing is exactly their job, after all) and you're assured that they'll do whatever they can to locate your missing girl. You mention that there's a rather large reward for her safe return - the guard asks exactly how much, and you name a figure. A few exchanges later, it's apparent that he's not asking about the reward in general, but <em>his</em> reward in specific. You pass over some money, confident that it's a bribe well worth making if it gets <<- girl.name >> home safe sooner.",
        weight: -1
      },
      girl: {
        specialRules: {
          tentacleManSearch: 4
        }
      },
      money: -300
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
          text: "<<- girl.name >> regains consciousness floating lazily on her back in a pool of water. Her thoughts are a bit hazy - she can't quite remember how she came to be here, floating, naked, relaxed, pleased... oh, that's right. An image of Dr. Ander comes to mind, smiling and asking if she wanted to come with him. She had agreed, and... hm, it doesn't much matter how she got here, she supposes dreamily. Ooh, what's that? A slippery touch on the back of her legs sends shivers up her spine, bringing up other memories.<br><br>A vague sense that she should be panicking comes to mind, but it feels <em>so good</em> as it snakes around her body, searching for something...",
          weight: -1
        }
      ],
      girl: {
        endurance: -25,
        specialRules: { tentacleManProgress: 1 }
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
          text: "<<- girl.name >> thrashes around, attempting to deny entry to the slippery limbs that reach up from the bottom of the pool towards her. Her resistance dims rapidly - besides being exhausted by an endless stream of sexual arousal, each brief touch is electric, tingling up her body and setting her nerves on fire in a rising inferno of lust. She <i>needs</i> something inside her, <i>now</i> - why was she resisting again? <<- girl.name >> arches her back and thrusts her hips downward as one of the tentacles penetrates her. She briefly imagines that it's swelling, growing larger - certainly she couldn't have fit anything this size a few days ago.<br><br>The creature ravishes her for hours, stuffing every hole and thrusting relentlessly while its victim writhes in ecstasy. It knows it should make the best of her while it can - its master will return soon, and it knows that the fateful words \"stage two\", words it does not understand but has learned to recognize will take its latest plaything away...",
          weight: -1
        }
      ],
      girl: {
        endurance: -25,
        happiness: -10,
        fetishLibido: 3,
        intelligence: -4,
        specialRules: { tentacleManProgress: 1 }
      }
    },
    Day3: {
      message:[
        {
          group: '<<- girl.name >>',
          image: 'content/events/missing.jpg',
          label: 'Missing - Day 3',
          text: "Elsewhere...",
          weight: -1,
          delta: false
        },
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("naked") >>',
          label: 'Missing - Day 3',
          text: "<<- girl.name >> feels hands lifting her out of the pool she's come to know and love over the past few days, now almost entirely composed of sexual fluids rather than water. She doesn't resist when the same dry her off with a town and lead her into a cell, too exhausted to think straight after nearly 48 hours as a tentacle monster's breeding partner.<br><br>She's left there naked for several hours, long enough to recover a bit of sense, and to start to think of escape. She doesn't recognize the location, only that it's underground. Under the university, perhaps? The remembers Dr. Ander's face now - it must have been some sort of scent to drive her mad, that she'd followed him here without a thought in the world. Scent... she smells something, sickly sweet and coming this way. She has to keep thinking, has to...",
          weight: -1,
          delta: false
        },
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("tentacles") >>',
          label: 'Missing - Day 3',
          text: "It's no use. The scent reminds her of the pool, of unbearable pleasure strong enough to wash away her mind, and the faint hint of it coming this way is enough to make her pussy get wet. By the time the monster has finished making its way down the passage, she's frantically pleasuring herself, moaning and pressing against the bars to urge it to take her, take her now. It does, the metal bars preventing her escape proving no barrier to its amorphous body.<br><br>Unlike the beast in the pool, this one teases and takes its time - it knows the master will allow it as much time as it pleases to explore this new girl. Almost entire engulfing her in its goo-like, translucent blue embrace, it leaves only the mouth and nose free, massaging and stimulating every other portion of her at once before slowly forming twin phallus out of its body - one for her pussy and one for the ass. It pushes them in gently, massaging, enticing, teasing, sucking, rubbing... <<- girl.name >> squirms in its grasp, urging it to go faster. It doesn't, proceeding slowly, swelling each appendage inserted into her slowly, stretching her to her limits, staying there for half of a tortuously erotic hour before swelling further.",
          weight: -1
        }
      ],
      girl: {
        endurance: -15,
        happiness: 5,
        fetishLibido: 5,
        fetishExperience: 5,
        intelligence: -6,
        specialRules: { tentacleManProgress: 1 }
      }
    },
    Day4: {
      message:[
        {
          group: '<<- girl.name >>',
          image: 'content/events/missing.jpg',
          label: 'Missing - Day 4',
          text: "Elsewhere...",
          weight: -1,
          delta: false
        },
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("tentacles") >>',
          label: 'Missing - Day 4',
          text: "It's been nearly twenty four hours since <<- girl.name >> was engulfed in this living goo, twenty four hours of total stimulation that would have been impossible at this level had she not been prepared in the pool. Slowly, ever so slowly, the creature has been inserting more and more of itself into her, stretching her holes and pressing ever deeper. At this point, only half of the mass remains outside, the rest swelling her belly obscenely, a nine month pregnant woman only impregnated a single day ago. She's had so many orgasms that they've begun to blur together, a continuous stream of shuddering pleasure that has wiped away all thought except <i>more, more, more</i>.",
          weight: -1,
          delta: false
        },
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("pregnant") >>',
          label: 'Missing - Day 4',
          text: "She doesn't get more, though. The creature breaks the connection with its new offspring and slowly withdraws, oozing away tiredly through the cell bars and leaving <<- girl.name >> weak on the cell floor. She calls after it to come back - the floor does not tingle and massage, her hand shoved up to the wrist in her pussy and fisting madly does not stretch and suck. She cries after it to come back, to make another baby with her, but it's already gone. She can feel her belly slowly deflating, leaking liquid out both pussy and ass. That much is ok, at least - with a satisfied smile she finally falls asleep, secure in the knowledge that the baby is still inside her...",
          weight: -1
        }
      ],
      girl: {
        endurance: -25,
        happiness: 15,
        fetishLibido: 7,
        intelligence: -10,
        specialRules: { tentacleManProgress: 1 }
      }
    },
    Found: {
      message: {
        group: '<<- girl.name >>',
        image: '<<- girl.image("tired") >>',
        label: 'Found!',
        text: "<<- girl.name >> was found by the city guard today, collapsed naked on the bridge leading to the garrison. They think she escaped from... wherever she was being held sometime around midnight, and made her way towards a familiar landmark (the garrison's tallest spires are visible from almost anywhere in the city) before collapsing. She's returned to your care, with the promise that someone will be by once she's had a few days to recover to take her statement - for now, you agree it's best not to press her on exactly what happened. She'll speak up soon. You hope.",
        weight: -1
      },
      girl: {
        happiness: -5,
        endurance: -10,
        specialRules: {
          tentacleManProgress: false,
          tentacleManSearch: false
        }
      },
      lock: false,
      mission: 'tentaclePregnancy'
    }
  }
};

Missions.tentaclePregnancy = {
  display: {
    label: 'Strange pregnancy',
    group: '<<- girl.name >>',
    image: '<<- girl.image("pregnant") >>',
    text: "In the days since her disappearance, <<- girl.name >> has been oddly content and agreeable. She doesn't say anything, but you can soon tell the cause - she has a noticeable bulge in her stomach. Given the effective and reliable birth control she's been on since she started working for you, it's a little odd - and the rate at which its growing is <i>more</i> than a little odd. If you so much as suggest summoning a doctor or aborting the pregnancy, <<- girl.name >> objects so vehemently that you don't have the heart to contradict her. At this rate, you estimate the whole thing should be over in no more than two weeks (<strong>Day <<-mission.end.max.day >>)</strong>.",
    weight: -1
  },
  end: {
    min: { day: '+13' },
    max: { day: '+13' }
  },
  variants: function(context, done) {
    var text = "It's late at night when you hear a furtive knock on the door. You head down to tell whoever it is to go away, you're closed for the evening, but instantly recognize Dr. Ander. You pull him inside and shut the door to see what he wants. You have your suspicions that he was behind " + context.girl.name + "'s disappearance, and you don't want him escaping before you can find out. He's more than a bit nervous, faced with your scary face.<blockquote>Please, I only wish to speak with " + context.girl.name + ". I want to make sure she's allright.</blockquote>You decline, and confront him with what you suspect. He doesn't deny it - and he wants to pay you $2000 to allow him to take the spawn resulting from his experiments. Also to not turn him in, of course. You call his bluff, and he raises the offer to $3000, starting to sweat.";
    var options = {
      'Call the guard': "Hold Dr. Ander here to answer for his crimes. You'll almost certainly never hear from him again.",
      'Take the money': "Take the money and let the good doctor continue his work. He'll deliver " + context.girl.name + "'s monsterous child and take it away.",
      'Deliver the baby': "You're not about to get the guard involved, since they'd probably kill the baby against " + context.girl.name + "'s wishes, but you're not about to let the doctor touch her again."
    };
    Game.getUserInput(text, 'content/events/DrAnder.jpg', options, function(answer) {
      var result = context.mission.base().results[answer];
      done(result);
    });
  },
  results: {
    'Call the guard': {
      message: [
        {
          label: 'Strange pregnancy',
          group: '<<- girl.name >>',
          image: 'content/events/DrAnder.jpg',
          text: "You tell Dr. Ander to wait here for a moment while you fetch <<- girl.name >>, and leave him sitting nervously alone. Instead, you flag down a young boy, pass him a coin and tell him to fetch the city guard immediately while you head back to guard the door and make sure the good doctor doesn't decide to leave.<br><br>It doesn't take long - even late a night (<em>especially</em> late a night) the redlight district has a strong guard presence. You explain the situation to the two guards that arrive - they nods, and one leaves to fetch their sergeant. Dr. Ander has some influential friends, and they want and officer present before they make any move. Before the other guard can return, your prisoner opens the door, perhaps to see what's taking you so long - when he sees both you and a guard standing outside waiting, he doesn't need to ask what's going on - he just blanches, stumbles back, and sits down heavily. You close the door again.",
          weight: -2,
          delta: false
        },
        {
          label: 'Strange pregnancy',
          group: '<<- girl.name >>',
          image: '<<- girl.image("pregnant") >>',
          text: "When the sergeant arrives, he briefly questions both you and Dr. Ander, who is somewhat less eager to admit his wrongdoings in front of the guard. You bring out <<- girl.name >> as the only concrete evidence - her gravid state, plus your accusation is still enough to get him arrested though, and they take him away promising a full inquiry. Now all that's left is to deal with <<- girl.name >>. She's nervous, but the sergeant is a sympathetic and friendly woman who gently but firmly insists that she come with them to be examined. She finally agrees they depart, leaving you along in the <<- girl.building() ? girl.building().name : 'Inn' >>.",
          weight: -2,
          delta: false
        },
        {
          label: 'Strange pregnancy',
          group: '<<- girl.name >>',
          image: '<<- girl.image() >>',
          text: "<<- girl.name >> returns eight hours later again accompanied by the same guard, swollen belly back to its normal state. Delivering tentacle monsters is far easier than human babies, she explains, given the lack of any solid bones. The guard killed it soon after it was delivered - <<- girl.name >> cried at first, but once her head cleared of its chemical influence, she was glad to see the disgusting creature dealt with once and for all. She explained to the guard how to find the breeding pool where she was held - that evidence is almost certainly enough to get Dr. Ander locked up for life, or at the very least exiled. You won't be seeing him again.",
          weight: -2
        }
      ],
      money: -1,
      girl: {
        endurance: -15,
        happiness: 5,
        obedience: 3
      },
      mission: 'tentacleManGone'
    },
    'Take the money': {
      message: [
        {
          label: 'Strange pregnancy',
          group: '<<- girl.name >>',
          image: '<<- girl.image("pregnant") >>',
          text: "You nod. While you can't approve of what he's done, it's over now, and all you can do is make the best of it. He's clearly handled this sort of pregnancy before, so he's probably the best person to deliver the baby as well. Summoning <<- girl.name >>, you explain the situation to her - she nods happily, perhaps still entranced by the subtle smell of her monstrous lover clinging to his lab coat. You make Dr. Ander tell you where his lab is before they leave - if she doesn't come back, you'll summon the guard.",
          weight: -2,
          delta: false
        },
        {
          label: 'Strange pregnancy',
          group: '<<- girl.name >>',
          image: '<<- girl.image() >>',
          text: "<<- girl.name >> returns eight hours later, alone. Her swollen belly is back to its normal state, and she doesn't seem nearly as exhausted as you'd expect. Delivering tentacle monsters must be far easier than human babies, she explains, given the lack of any solid bones. While initially pleased with her motherhood, she begins to be disgusted by it shortly thereafter as the baby's chemical influence over her wanes. She understands why you let Dr. Ander deliver it rather than calling in the guard, but isn't particularly happy about the events of the last month.",
          weight: -2
        }
      ],
      girl: {
        endurance: -15,
        happiness: -10
      },
      money: 3000
    },
    'Deliver the baby': {
      message: {
        label: 'Strange pregnancy',
        group: '<<- girl.name >>',
        image: '<<- girl.image("pregnant") >>',
        text: "You shake your head. He's done enough harm already, isn't it time he just got the hell out of your lives? He isn't pleased, but at least you don't seem to be in the mood to get him arrested, so he leaves without too much complaint.<br><br>You're summoned next door by the sounds of <<- girl.name >> panting and moaning. You find her frantically rubbing her clit and groping her breast, clothes in disarray on the floor. At first you think the wet spot underneath her is just cum, but it keeps growing, and doesn't sink into the sheet properly, more like gelatin than water. Paralyzed by the strange sight, you watch as her belly slowly deflates, expelling the baby, extremely gelatinous and almost completely transparent, tentacle monster. Its eyes are the last to come out, as watery and see-through as the rest of its body.<br><br>It sprays a gout of green gas in your direction, and you cough, breathing some in due to the unexpectedness of the attack. Taking the distraction, it slithers with surprising rapidity through a crack in the wall. You doubt you'll see it again, unless it's in a couple of years when it again seeks to make children. The beasts are exceedingly locate to find unless they want to be found.",
        weight: -2
      },
      girl: {
        endurance: -15,
        happiness: 10,
        constitution: 5
      }
    }
  }
};

// Just an empty mission we can complete silently, to prevent tentacleManGreet from triggering again after Dr. Ander has been turned in.
Missions.tentacleManGone = {
  results: [{}]
};
