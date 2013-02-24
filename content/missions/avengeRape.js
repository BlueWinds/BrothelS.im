"use strict";
Missions.avengeGuardWait = {
  conditions: false,
  end: {
    min: { day: '+1' }
  },
  variants: function(context, done) {
    var results = this.base().results;
    if ((context.girl.specialRules.guardRapeWait || 0) < 5) {
      done(results.repeat);
      return;
    }
    var text = "Several days ago, " + context.girl.name + " was raped by the city guard. Though reluctant to talk about the traumatic experience, she's hardly eaten since, and you finally decide to take action when, at dinner, she breaks into tears in the middle of the meal, everyone watching silently as one of the other girls hurries her away with a comforting arm around her shoulder.";
    var options = {
      "Comfort her": "Follow " + context.girl.name + " and comfort her.",
      "Get angry": "Bastards. No one treats your girls like that and gets away with it.",
      "She'll get over it": "It's a rough world - you're sorry she had to go through that, but what can you do?"
    };
    Game.getUserInput(text, context.girl.image('prison'), options, function(answer) {
      done(results[answer]);
    });
  },
  results: {
    repeat: {
      girl: {
        happiness: -10,
        specialRules: { guardRapeWait: 1 }
      },
      mission: 'avengeGuardWait'
    },
    "Comfort her": {
      mission: 'avengeGuardRape',
      girl: {
        happiness: 3,
        specialRules: {
          guardRapeWait: false,
          investigateGuards: 1
        }
      },
      message: {
        label: 'Comforting <<- girl.name >>',
        group: '<<- girl.name >>',
        weight: -2,
        image: '<<- girl.image("tired") >>',
        text: "Following after <<- girl.name >>, you find her alone in her room. The door is locked, but she doesn't object when you enter quietly, staring out the window with vacant eyes. She flinches when you touch her shoulder, then relaxes a bit. You try to be comforting, but there's only two things that can heal this wound - time and justice. Or at least vengeance."
      }
    },
    "Get angry": {
      mission: 'avengeGuardRape',
      girl: {
        happiness: 1,
        obedience: -4,
        specialRules: {
          guardRapeWait: false,
          investigateGuards: 1
        }
      },
      message: {
        label: 'Angry at <<- girl.name >>\'s attackers',
        group: 'Investigate City Guard',
        weight: -2,
        image: '<<- girl.image("refuse") >>',
        text: "Though you'd at first hoped it was a passing incident, the more you think about what was done to <<- girl.name >>, the angrier you get. It's time to fix the problem at the source. You follow her to her room, where you find her sitting at the window, legs pulled up against her chest and staring blankly outside. When you announce your intention to make her attackers pay, she looks up, and you can see the shimmering resentment she'd tried to hide. She's angry too. Time to go break some heads."
      }
    },
    "She'll get over it": {
      message: {
        label: 'Ignore her outburst',
        group: 'Investigate City Guard',
        weight: -2,
        image: '<<- girl.image("tired") >>',
        text: "It's a sad thing that the city guard here is so corrupt - if you were back home, you might tear the place apart getting justice for her, but here in a foreign nation, you don't want to make waves. <<- girl.name >> isn't a fragile little flower, to shatter at a single blow - she'll be back to her normal self soon."
      },
      girl: {
        happiness: -20,
        obedience: 5,
        charisma: -5,
        specialRules: {
          guardRapeWait: false
        }
      }
    }
  }
};

Missions.avengeGuardRape = {
  conditions: false,
  display: {
    label: 'Speak with Guard Captain',
    group: 'Investigate City Guard',
    weight: -1,
    image: 'content/missions/evilGuard.jpg',
    text: "Before you can go any further, you first need some information. Who were <<- girl.name >>'s attackers? She has a rough description of them, but you need names. The city is too large to try and find them using only a description of their cocks, their hair color and the fact that they work as city guards. It would also be best to get a better idea of the exact laws pertaining to the situation - you'll probably end up breaking a few, but better to know what you're getting into.<br><br><em><<- girl.name >> will need to <strong>Study</strong> until her <<- __('intelligence') >> is at least <<- mission.end.girl.min.intelligence >>, as well as spending some time <strong>Exploring the Garrison</strong>.</em>"
  },
  end: {
    girl: {
      min: {
        intelligence: '+7',
        specialRules: { investigateGuards: 6 }
      }
    }
  },
  results: [{
    girl: {
      specialRules: { investigateGuards: false }
    },
    mission: 'avengeGuardRapeFinal'
  }]
};

Events.investigateGuards = {
  tags: {
    garrison: 0.5
  },
  conditions: {
    time: 'morning',
    missions: { avengeGuardRape: 1 },
    girl: {
      min: {
        specialRules: { investigateGuards: 1 }
      },
      max: {
        specialRules: { investigateGuards: 5 }
      }
    },
    ownerParticipation: true
  },
  initialize: function(context) {
    if (g.missions.avengeGuardRape.girl != context.girl.name) { return false; }
  },
  variants: [
    {
      girl: { max: { specialRules: { investigateGuards: 1 } } }
    },
    {
      girl: {
        min: { specialRules: { investigateGuards: 2 } },
        max: { specialRules: { investigateGuards: 2 } }
      }
    },
    {
      girl: {
        min: { specialRules: { investigateGuards: 3 } },
        max: { specialRules: { investigateGuards: 4 } }
      }
    },
    {
      girl: { min: { specialRules: { investigateGuards: 5 } } }
    }
  ],
  results: [
    { // 1
      message: [
        {
          label: 'Investigate Guards',
          group: '<<- girl.name >>',
          image: 'content/miscImages/garrisonGate.jpg',
          text: "You and <<- girl.name >> arrive at the gates of the garrison, a small fortress walled off from the rest of the city and sitting on the far side of a bridge. Originally the castle from which the lord ruled, the nobility moved to the far end of the city into Uptown, nearly 150 years ago, when it became apparent that invasion was no longer a danger (everyone who might want to invade having decided they'd rather just visit and take back memories or concubines).",
          delta: false
        },
        {
          label: 'Investigate Guards',
          group: '<<- girl.name >>',
          image: 'content/miscImages/garrisonGate.jpg',
          text: "The gate is open all hours of the day, but you're stopped before entering by a bored looking woman. She asks about your business, and you respond with a half truth - the two of you are searching for a group of guards you met a few days ago, in order to \"thank\" them for their assistance. You'll want to speak to the captain for that, she responds, not caring to listen to <<- girl.name >>'s descriptions. The captain is out at the moment, but if you'd care to return later..."
        }
      ],
      girl: {
        endurance: -5,
        specialRules: { investigateGuards: 1 }
      }
    },
    { // 2
      message: {
        label: 'Investigate Guards',
        group: '<<- girl.name >>',
        image: '<<- girl.image("tired") >>',
        text: "The captain of the guard is a man named Kim Xun. You've heard rumors of him - lightning fast, deadly with a bow to 100 yards, and backing it all up with a hefty dose of magical power. He's just as intimidating in person as you might expect - steely grey eyes and whipcord muscles, not tall or bulky but his presence feels... <em>dangerous</em>. You also get the distinct impression, from the courteous way he bows to <<- girl.name >> and treats the both of you as equals that he might be sympathetic to your cause and quite angry about the lapse of discipline among his troops.<br><br>Much to <<- girl.name >>'s surprise, you explain exactly what happened without evasion - Kim nods sharply, asks her to repeat her descriptions of her attackers, announces that he'll look into it, and dismisses you. Not exactly the reaction you were expecting, but... if he finds the men and women responsible before <<- girl.name >>, they just might wish <em>you</em> had gotten to them first."
      },
      girl: {
        endurance: -5,
        obedience: 1,
        specialRules: { investigateGuards: 1 }
      }
    },
    { // 3-4
      message: {
        label: 'Investigate Guards',
        group: '<<- girl.name >>',
        image: '<<- girl.image("naked") >>',
        text: "Plenty of searching, but not plenty of results yet. Time to take a more proactive approach. Proactive, in this context, meaning \"fucking people\", of course. Once you and <<- girl.name >> are through the gate and into the garrison, the two of you head immediately for the barracks, before decides to question your presence. <blockquote>Hello, everyone. I've brought your entertainment for the afternoon.</blockquote> You announce loudly, drawing the attention of a dozen guards lounging around, and <<- girl.name >> smiles sexily. As she begins dancing slowly, you step back a ways and watch - most of the guards are entranced, but a few shake their heads and either return to their previous activities or get up to leave. You tap one of them on the shoulder as she heads for the exit - disapproving of a strip show is perhaps an indication that she'd like to help you find the guilty parties.<br><br>She does indeed have a moment to spare, and is quite pleased with the thought of helping you another woman get some justice. The two of you spend half an hour planning in the courtyard before returning to the barracks - just in time, as <<- girl.name >> has just finished shedding her last clothing, and it looks like things might be about escalate into touching. <blockquote>Not today, boys.</blockquote>"
      },
      girl: {
        endurance: -7,
        charisma: 1,
        softLibido: 2,
        specialRules: { investigateGuards: 1 }
      }
    },
    { // 5
      message: [
        {
          label: 'Investigate Guards',
          group: '<<- girl.name >>',
          image: 'content/miscImages/garrisonGate.jpg',
          text: "The two of you have become almost a common sight at the garrison - though not entirely sure why you keep showing up, no one has complained yet, and the guard at the gate passes you through without comment. Today is the day to put the plan you made with one of the guards into action. As before, <<- girl.name >> announces a show in the barracks, while you and your contact take a step outside.",
          delta: false,
          weight: -1
        },
        {
          label: 'Investigate Guards',
          group: '<<- girl.name >>',
          image: '<<- girl.image("group") >>',
          text: "This time though, <<- girl.name >> strips rather quickly and with much less teasing, rapidly moving from dancing, to fondling herself, to fondling others. When reassured by your co-conspirator that the captain is out on patrol, it doesn't take much to convince a group of horny guardsmen and women to remove their own clothes under <<- girl.name >>'s caresses. There's no word to describe what follows better than \"gangbang\" -  seven men thinking only of their own lust fucking a woman in every hole, first singly then double penetrating her ass and pussy even while she gags on another cock.<br><br><<- girl.name >> hasn't given the signal that she recognizes any of her attackers, and you begin to worry that the plan is good for nothing beyond getting her well and thoroughly satisfied when half a dozen more guards arrive - your contact asks them if they're not supposed to be on duty, which they agree they're supposed to be, but they just couldn't resist when they heard what was going on here. They brought rope and handcuffs, one of the woman announces with a smirk."
        },
        {
          label: 'Investigate Guards',
          group: '<<- girl.name >>',
          image: '<<- girl.image("fetish") >>',
          text: "It's to little late to stop things now - no telling what might happen if you tried to stop intervene. <<- girl.name >> goes from enjoying herself to scared, signaling to you that she'd like to leave as the new group approaches her with ropes and a gag. Still, you gird yourself up to defend her, about to move when a shout stops you in your tracks. Or... perhaps it wasn't a shout so much as the magic that accompanied it, freezing every motion in the room.<br><br><blockquote>Soldiers, into the courtyard for inspection!</blockquote> Kin Xun roars, and the magic releases everyone. Not hesitating even to pull up pants the guards salute and march rigidly out the door where they stand at attention (and in the case of the men recently fucking <<- girl.name >>, \"attention\"), unmoving. You attempt to explain, but he silences you with a glare and tells you to just go. You cut <<- girl.name >>'s bonds away with a knife, gather up her clothing, and hurry away. Your contact smiles and slips a note into your pocket as you pass the unmoving line of guards, the movement garnering an evil glare from Kin Xun. You check the paper - a list of names. Perfect.",
          delta: false
        }
      ],
      girl: {
        endurance: -25,
        hardLibido: 4,
        hardExperience: 8,
        analLibido: 2,
        analExperience: 6,
        specialRules: { investigateGuards: 1 }
      }
    }
  ]
};

Missions.avengeGuardRapeFinal = {
  conditions: false,
  variants: function(context, done) {
    var results = this.base().results;
    var text = "Finally, you have a list of names and have seen the faces for yourself. The relevant laws are clear enough - while it would be illegal for you to take matters into your own hands, precedent suggests that virtually any punishment you care to inflict on " + context.girl.name + "'s rapists would result in nothing more than a slap on the wrist. Only one thing left to do - serve justice.";
    var options = {
      "Turn them in": "Give the list of names to Kin Xun. He's likely to be harsh.",
      "Public Humiliation": "Catch them. Strip them. Stick them in a stockade with 'public toilet' written in permanent ink on their ass cheeks.",
      Blackmail: "Hold what you know over their head for profit."
    };
    Game.getUserInput(text, 'content/missions/evilGuard.jpg', options, function(answer) {
      done(results[answer]);
    });
  },
  results: {
    "Turn them in": {
      message: {
        label: 'Revenge on Guards',
        group: 'Investigate City Guard',
        weight: -2,
        image: '<<- girl.image("tired") >>',
        text: "You pay a visit to Kim Xun with <<- girl.name >>, but she's asked to wait out at the gate - after what happened last time she visited, she's no longer welcome inside. You still are, though. Once presented to the captain of the guard, you explain, carefully, exactly what has happened, and give him the list of names. He nods curtly and announces that this information matches his own investigation, and that the guards in question are already suspended due to their conduct during the gangbang. When you ask what's likely to happen to them, for the first time Kim pauses.<blockquote>The women will be sold into slavery. I hear that the kingdom of Mioya has been searching for a fresh source, and the lord was looking into helping them, since we have much in common. The men will be enlisted in the army proper.</blockquote> Come to think of it, you'd never actually seen the army here, only the city guards. You suggest that being drafted seems far less severe than being sold into slavery. He fixes you with one of those steely grey eyes. <blockquote>It's not.</blockquote>"
      },
      girl: {
        happiness: 20
      },
      mission: 'luxuryHouseDelay'
    },
    "Public Humiliation": {
      message: [
        {
          label: 'Revenge on Guards',
          group: 'Investigate City Guard',
          weight: -2,
          image: '<<- girl.image("tired") >>',
          text: "With the names of the attackers and an informant on the inside, it's not difficult to learn when the guards in question have duty, and more importantly, when they get off. With that information, you and <<- girl.name >> lay in wait near the exit to the garrison as their shift ends. A few of them stick together, so the two of you follow the largest group.<br><br>The gang of three men and a woman head immediately for a tavern. <<- girl.name >> waits outside, in case they recognize her, while you head in. You snag a table and flag over the barmaid, managing to get her immediate attention by waving a gold coin in the air. You pass her a packet of white powder, instructing her to drug their drinks - she hesitates at first, but smiles and nods agreeably when you press two more into her palm.<br><br>The powder in their drinks is potent, and it's not 15 minutes before you and <<- girl.name >> are carrying them out. The barman looks like he's about to object, but the maid whispers in his ear and he says nothing. Otherwise, the carrying away of unconscious patrons attracts little attention - this is not the finest of establishments.",
          delta: false
        },
        {
          label: 'Revenge on Guards',
          group: 'Investigate City Guard',
          image: 'content/missions/stockadeBukkake.jpg',
          text: "The guards wake up, hours later, just as the sun rises. Sore from repeated use, covered in cum and still locked in the pillories used to punish criminals, the first thing they see is <<- girl.name >> sitting across the square watching them smugly. She tosses the key at their feet - unable to retrieve it themselves, they'll have to convince a good citizen to unlock them. Given \"free,\" \"public use\" and \"cum dump\" is written across each of their asses and foreheads, it may take a while. Perhaps they'll think of the consequences before they cross one of your girls next time."
        }
      ],
      money: -300,
      girl: {
        fetishLibido: 4,
        obedience: -6,
        happiness: 10
      },
      mission: 'luxuryHouseDelay'
    },
    Blackmail: {
      message: {
        label: 'Revenge on Guards',
        group: 'Investigate City Guard',
        weight: -2,
        image: '<<- girl.image("study") >>',
        text: "With their names, testimony from both <<- girl.name >> and your contact in the city guard, you finally have enough information that they'll have to take your threat of revealing what they've been doing to Kim Xun. Leave a note explaining the exact situation at one of their home addresses, along with your demand - their resignation from the guard, a written apology, and $1000.<br><br>You honestly didn't expect it to work, but early the next morning one of the guards, the ringleader, knocks on your door and hands you the letter, signed by all seven of them, exactly as you'd asked for. He's clearly quite scared, and asks for repeated reassurance that you won't turn them in before he'll hand it over. The courts here are rather soft, not nearly enough to cause such a reaction until you realize it's not the law they're afraid of, but the captain. You promise one final time that you're content to let the incident lie, and he hands you the apology.<br><br><<- girl.name >> has been watching quietly from further inside. As you hand her the apology, she starts to cry, kisses you on the cheek, and runs into her room holding the letter. She's going to be alright."
      },
      money: 1000,
      girl: {
        happiness: 25
      },
      mission: 'luxuryHouseDelay'
    }
  }
};
