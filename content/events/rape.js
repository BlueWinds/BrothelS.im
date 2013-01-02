Events.thugRape = {
  label: 'Attacked by thugs',
  tags: {
    outdoors: true
  },
  fetishes: {
    rape: true
  },
  dangerous: true,
  disruptive: true,
  minDay: 5,
  likelyhood: 0.05,
  variants: function(time, event, done) {
    // Fights back successfully or not.
    var i = ((this.constitution + this.endurance) / 100 * Math.random() < 0.8) ? 0 : 1;
    done(i);
  },
  results: [
    {
      image: 'hard',
      girl: {
        endurance: -25,
        happiness: -15,
        constitution: -1,
        'hard experience': 4,
        'hard libido': -4,
        'fetish libido': 2,
        obedience: 3
      },
      message: "<<= girl.name >> was heading into the city to <<= action.label >> when a pot-bellied man stepped in front of her, blocking her way. She tried to go around wordlessly, but it was only then that she noticed her predicament - a narrow alley, and three more of his friends blocking her retreat. She opened her mouth to scream, but he was too fast, clamping a hand over her mouth.<br><br>She kicked at his groin and bit at his hand, but one of the other men wrapped strong arms around her knees, immobilizing her while another produced rope and bound her. It was an efficient job - all she could make was muffled moans around the gag, and squirm slightly as they tore her clothes to shreds. Her eyes watered at the size of the cocks presented before her face and pressed at her ass, but she shuddered in relief as one of the men produced a tube of lubrication. No one came to help her as, one after another, they bent her over a pile of crates and satisfied their lust. It took hours. The last man took some pity on <<= girl.name >>\'s tear-streaked and grimy face, and fingered her to orgasm while he fucked her."
    },
    {
      image: 'exercise',
      message: "<<= girl.name >> was heading into the city to <<= action.label >> when a pot-bellied man stepped in front of her, blocking her way. She tried to go around wordlessly, but it was only then that she noticed her predicament - a narrow alley, and three more of his friends blocking her retreat. She was hardly helpless though - with a shout, she stomped on his foot, causing him to double over in agony. One of the men behind grabbed for her wrist, but she twisted away, planted a fist in his nose, and took off running. They didn't pursue far - only to the end of the alley, the street being too public for a struggle. After such a close call, she was in no mood to <<= action.label >> and returned home, slamming the door with a fiery look in her eyes.",
      girl: {
        endurance: -10,
        obedience: -5
      }
    }
  ]
};

Events.guardRape = {
  label: 'Raped by gity guards',
  tags: {
    outdoors: true
  },
  fetishes: {
    rape: true
  },
  dangerous: true,
  disruptive: true,
  minDay: 5,
  likelyhood: 0.03,
  variants: function(time, event, done) {
    var options = {
      Submit: 'Go along quitely',
    }
    var text = this.name + ' is heading into the city when a member of the city guard calls her over. Without a word he clips on a pair of handcuffs, catching her completely by surprise. She protests loudly that she has no idea what she\'s done, but the fact that he hasn\'t responded and is is starting to move makes her worry. What does ' + this.name + ' do?';
    if (this.obedience < 90) { options.Run = 'Attempt to flee.'; }
    if (this.obedience < 60) { options.Fight = 'Headbut the guard and try to steal the keys.'; }
    if (this.intelligence > 40) { options.Bribe = 'Attempt the bribe the guard into letting her leave.'; }
    Game.getUserInput(text, this.image('exercise'), options, function(answer) {
      var i;
      if (answer == 'Submit') {
        i = 0;
      } else if (answer == 'Run') {
        i = this.constitution / 100 + Math.random() > 0.6 ? 0 : 1;
        if (i) { event.label = 'Ran from City Guards'; }
      } else if (answer == 'Fight') {
        i = this.constitution - this.modesty + Math.random() > 0.3 ? 0 : 2;
        if (i) { event.label = 'Fought with City Guards'; }
      } else if (answer == 'Bribe') {
        i = 3;
        event.label = 'Bribed City Guards';
      }
      event.answer = answer;
      done(i);
    });
  },
  results: [
    { // Go along quietly
      image: ['fetish', 'prison', 'tired'],
      girl: {
        endurance: -15,
        happiness: -15,
        'soft experience': 4,
        'soft libido': -4,
        'fetish libido': 3,
        obedience: 5
      },
      message: [
        "<< if (event.answer == 'Submit') { >>Going along quietly, the guard led her away.<< } else if (event.answer == 'Run') { >><<= girl.name >> tried to wrench her arms free, but his grip was too strong - her attempt to flee failed before it had even properly begun. He half-led, half dragged her away.<< } else if (event.answer == 'Fight') { >>Knowing she was at a serious disadvantage with her hands already bound, she took the first opportunity to strike at the guard, going for the eyes. She was too slow though, and he stepped our of reach, kicking one of her legs out from under her. Producing a second pair of handcuffs for her ankles (not pleasant at all), he carried her away.<< } >> Four other men and two women looked up as he dragged <<= girl.name >> into the guardhouse, announcing that he'd caught a naughty little girl who needed to be punished. She looked to the other women pleadingly, but received the same evil leers as from the men.",
        "They fitted a ball-gag into her mouth, methodically stripped her of all her clothing, and strapped her arms and legs to the table. Most of them resumed playing cards, moving the game to the floor, but one stayed behind long enough to stick a dildo in both her pussy and ass before leaving her there, bound gagged and immobile. Whenever a player won a hand, they stood up and came over to rape her, removing the dildo from the hole of their choice only long enough to fuck her before returning it to place. The women were the worst - they'd play with the dildo until she was about to cum, then slap her and wait until she calmed down to continue, leaving her completely unsatisfied.",
        "When they finished their game, they stood and opened to door, ready to leave. <<= girl.name >> made the loudest moan she could around the ball-gag, but they just... left. She started to cry, fearing she'd be left here forever, but it wasn't long until the next shift of guards arrived. They untied her, helped her rub the stiffness from her limbs and gave her her clothes back, but offered no apologies as she left in a hurry."
      ]
    },
    { // Successful run away
      image: 'exercise',
      girl: {
        endurance: -10,
        happiness: -5,
        obedience: -2
      },
      message: [
        "Seeing the look in his eye with unfortunate implications for her, <<= girl.name >> reacted instantly, pulling away before he could get hold of her. She was fast, and he wasn't - it hardly took half a mile before she lost him, after multiple twists and turns through the city. It did still take the rest of the <<= time >> to find a blacksmith who would remove the handcuffs without asking too many questions, though."
      ]
    },
    { // Successful run away
      image: 'refuse',
      girl: {
        endurance: -10,
        happiness: 10,
        obedience: -5
      },
      message: [
        "Seeing the look in his eye with unfortunate implications for her, <<= girl.name >> reacted instantly, violently, and successfully. Knowing she was at a disadvantage with her hands bound, she opted for a swift kick to the balls, catching him totally flat-footed. He doubled over, and she followed it up by stomping on the bridge of his foot, and kneeing him in the face. It was over in an instant - half of the onlookers stared on in stunned disbelief, while the other half applauded, having seen the same evil intent as <<= girl.name >> had. She riffled through his pockets, found the key, and kicked him in the stomach a few times just to be sure."
      ]
    },
    {
      image: 'study',
      message: "<<= girl.name >> was heading into the city to <<= action.label >> when member of the city guard called her over. The cause became apparent almost immediately when, without a word he clipped on a pair of handcuffs, catching her completely by surprise. He ignored her protests that she had no idea what she'd done, and half led, half dragged her away.<br><br>She could see what was coming, and rather than go quietly, she stubbornly refused to move until he explained <em>exactly</em> why she was under arrest. The lame excuse he presented confirmed her fears, and she frantically came up with a plan. The penalty should surely be a fine, rather than jail-time, she insisted, and after mentioning a figure, she could see he was definitely interested. She didn't have it on her, of course, but if he's just <em>unlock the handcuffs</em>, she'd get the money from home. Once she'd handed over the down-payment, <<= girl.name >> took off running, and didn't look back.",
      girl: {
        money: -100,
        endurance: -7,
        happiness: -7,
        obedience: -3
      }
    }
  ]
};
