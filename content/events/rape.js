"use strict";
Events.thugRape = {
  conditions: {
    fetishes: { rape: true },
    min: { day: 15 },
    ownerParticipation: false
  },
  tags: {
    slums: 0.08,
    docks: 0.05
  },
  variants: function(context, done) {
    // Fights back successfully or not.
    var i = ((context.girl.constitution + context.girl.endurance) / 100 * Math.random() < 0.6) ? 0 : 1;
    done(this.base().results[i]);
  },
  results: [
    {
      message: {
        group: '<<- girl.name >>',
        image: '<<- girl.image("group") >>',
        label: 'Attacked by Thugs',
        text: "<<= girl.name >> was heading into the city to <<= action.label >> when a pot-bellied man stepped in front of her, blocking her way. She tried to go around wordlessly, but it was only then that she noticed her predicament - a narrow alley, and three more of his friends blocking her retreat. She opened her mouth to scream, but he was too fast, clamping a hand over her mouth.<br><br>She kicked at his groin and bit at his hand, but one of the other men wrapped strong arms around her knees, immobilizing her while another produced rope and bound her. It was an efficient job - all she could make was muffled moans around the gag, and squirm slightly as they tore her clothes to shreds. Her eyes watered at the size of the cocks presented before her face and pressed at her ass, but she shuddered in relief as one of the men produced a tube of lubrication. No one came to help her as, one after another, they bent her over a pile of crates and satisfied their lust. It took hours. The last man took some pity on <<= girl.name >>'s tear-streaked and grimy face, and fingered her to orgasm while he fucked her."
      },
      girl: {
        endurance: -25,
        happiness: -15,
        constitution: -2,
        hardExperience: 4,
        hardLibido: -4,
        fetishLibido: -2,
        fetishExperience: 2
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        image: '<<- girl.image("exercise") >>',
        label: 'Attacked by Thugs',
        text: "<<= girl.name >> was heading into the city to <<= action.label >> when a pot-bellied man stepped in front of her, blocking her way. She tried to go around wordlessly, but it was only then that she noticed her predicament - a narrow alley, and three more of his friends blocking her retreat.<br><br>She was hardly helpless though - with a shout, she stomped on his foot, causing him to double over in agony. One of the men behind grabbed for her wrist, but she twisted away, planted a fist in his nose, and took off running. They didn't pursue far - only to the end of the alley, the street being too public for a struggle. After such a close call, she was in no mood to <<= action.label >> and returned home, slamming the door with a fiery look in her eyes."
      },
      girl: {
        endurance: -12,
        obedience: -5
      }
    }
  ]
};

Events.guardRape = {
  conditions: {
    fetishes: { rape: true },
    min: { day: 15 },
    missions: {
      avengeGuardWait: -3,
      avengeGuardRape: -3,
      avengeGuardRapeFinal: -3
    },
    ownerParticipation: false
  },
  tags: {
    garrison: 0.05,
    slums: 0.03,
    docks: 0.03
  },
  variants: function(context, done) {
    var event = this;
    var options = {
      Submit: 'Go along quitely'
    };
    var text = context.girl.name + ' is heading into the city when a member of the city guard calls her over. Without a word he clips on a pair of handcuffs, catching her completely by surprise. She protests loudly that she has no idea what she\'s done, but the fact that he hasn\'t responded and is is starting to move makes her worry. What does ' + context.girl.name + ' do?';
    if (context.girl.obedience < 90) { options.Run = 'Attempt to flee.'; }
    if (context.girl.obedience < 60) { options.Fight = 'Headbut the guard and try to steal the keys.'; }
    if (context.girl.intelligence > 40) { options.Bribe = 'Attempt the bribe the guard into letting her leave.'; }
    Game.getUserInput(text, context.girl.image('exercise'), options, function(answer) {
      context.event.special = {answer: answer};
      var i;
      if (answer == 'Submit') {
        i = 0;
      } else if (answer == 'Run') {
        i = context.girl.constitution / 100 + Math.random() > 0.6 ? 0 : 1;
      } else if (answer == 'Fight') {
        i = context.girl.constitution - context.girl.modesty + Math.random() > 0.3 ? 0 : 2;
      } else if (answer == 'Bribe') {
        i = 3;
      }
      done(event.base().results[i]);
    });
  },
  results: [
    {
      message: [
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("fetish") >>',
          label: 'Raped by city guards',
          text: "<< if (event.special.answer == 'Submit') { >>Going along quietly, the guard led her away.<< } else if (event.special.answer == 'Run') { >><<= girl.name >> tried to wrench her arms free, but his grip was too strong - her attempt to flee failed before it had even properly begun. He half-led, half dragged her away.<< } else if (event.special.answer == 'Fight') { >>Knowing she was at a serious disadvantage with her hands already bound, she took the first opportunity to strike at the guard, going for the eyes. She was too slow though, and he stepped our of reach, kicking one of her legs out from under her. Producing a second pair of handcuffs for her ankles (not pleasant at all), he carried her away.<< } >> Four other men and two women looked up as he dragged <<= girl.name >> into the guardhouse, announcing that he'd caught a naughty little girl who needed to be punished. She looked to the other women pleadingly, but received the same evil leers as from the men.",
          delta: false,
          weight: -2
        },
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("prison") >>',
          label: 'Raped by city guards',
          text: "They fitted a ball-gag into her mouth, methodically stripped her of all her clothing, and strapped her arms and legs to the table. Most of them resumed playing cards, moving the game to the floor, but one stayed behind long enough to stick a dildo in both her pussy and ass before leaving her there, bound gagged and immobile. Whenever a player won a hand, they stood up and came over to have their way with her, removing the dildo from the hole of their choice only long enough to fuck her before returning it to place. The women were the worst - they'd play with the dildo until she was about to cum, then wait until she calmed down to continue, leaving her completely unsatisfied.",
          delta: false,
          weight: -2
        },
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("tired") >>',
          label: 'Raped by city guards',
          text: "When they finished their game, they stood and opened to door, ready to leave. <<= girl.name >> made the loudest moan she could around the ball-gag, but they just... left. She began to fear she'd be left here forever, but it wasn't long until the next shift of guards arrived. They untied her, helped her rub the stiffness from her limbs and gave her her clothes back, but offered no apologies stronger than sympathetic looks as she left in a hurry.",
          weight: -2
        }
      ],
      girl: {
        endurance: -25,
        happiness: -15,
        hardExperience: 4,
        hardLibido: -4,
        fetishLibido: -2,
        obedience: 3
      },
      mission: 'avengeGuardWait'
    },
    {
      message: {
        group: '<<- girl.name >>',
        image: '<<- girl.image("exercise") >>',
        label: 'Ran from City Guards',
        text: "Seeing the look in his eye with unfortunate implications for her, <<= girl.name >> reacted instantly, pulling away before he could get hold of her. She was fast, and he wasn't - it hardly took half a mile before she lost him, after multiple twists and turns through the city. It did still take the rest of the <<= time >> to find a blacksmith who would remove the handcuffs without asking too many questions, though.",
        weight: -2
      },
      girl: {
        endurance: -10,
        obedience: -2,
        happiness: -5,
        money: -40
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        image: '<<- girl.image("refuse") >>',
        label: 'Fought with City Guards',
        text: "Seeing the look in his eye with unfortunate implications for her, <<= girl.name >> reacted instantly, violently, and successfully. Knowing she was at a disadvantage with her hands bound, she opted for a swift kick to the balls, catching him totally flat-footed. He doubled over, and she followed it up by stomping on the bridge of his foot, and kneeing him in the face. It was over in an instant - half of the onlookers stared on in stunned disbelief, while the other half applauded, having seen the same evil intent as <<= girl.name >> had. She riffled through his pockets, found the key, and kicked him in the stomach a few times just to be sure.",
        weight: -2
      },
      girl: {
        endurance: -10,
        obedience: -5,
        happiness: 10
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        image: '<<- girl.image("study") >>',
        label: 'Bribed City Guards',
        text: "<<= girl.name >> was heading into the city to <<= action.label >> when member of the city guard called her over. The cause became apparent almost immediately when, without a word he clipped on a pair of handcuffs, catching her completely by surprise. He ignored her protests that she had no idea what she'd done, and half led, half dragged her away.<br><br>She could see what was coming, and rather than go quietly, she stubbornly refused to move until he explained <em>exactly</em> why she was under arrest. The lame excuse he presented confirmed her fears, and she frantically came up with a plan. The penalty should surely be a fine, rather than jail-time, she insisted, and after mentioning a rather large figure, she could see he was definitely interested. She didn't have it on her, of course, but if he's just <em>unlock the handcuffs</em>, she'd get the money from home. Once she'd handed over the down-payment, <<= girl.name >> took off running, and didn't look back.",
        weight: -2
      },
      girl: {
        endurance: -7,
        obedience: -3,
        happiness: -7
      },
      money: -100
    }
  ]
};
