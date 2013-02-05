"use strict";
Girls.Sakuya = {
  description: "<p>Sakuya is clearly not from around here. She speaks the language with little accent, but there's still something... otherworldly about her. She bills herself as a maid, and a brief demonstration suggests she is indeed quite good at is. It would take a bit of convincing to get her to work as a prostitute, but she doesn't seem unwilling...</p>",
  status: 'For Hire',
  happiness: 0,
  endurance: 100,
  obedience: 40,
  charisma: 20,
  modesty: 60,
  intelligence: 50,
  constitution: 70,
  softLibido: 10,
  softExperience: 0,
  hardLibido: 20,
  hardExperience: 10,
  analLibido: 10,
  analExperience: 0,
  fetishLibido: 30,
  fetishExperience: 5,
  images: {
    basePath: "content/girls/Sakuya/images",
    base: "Base.jpg",
    refuse: "Refuse.jpg",
    tired: ["Tired1.jpg", "Tired2.jpg"],
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg", "Soft5.jpg", "Soft6.jpg"],
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg"],
    anal: ["Anal1.jpg", "Anal2.jpg", "Anal3.jpg", "Anal4.jpg"],
    fetish: ["Fetish1.jpg", "Fetish2.jpg", "Fetish3.jpg", "Fetish4.jpg", "Fetish5.jpg", "Fetish6.jpg"],
    group: ["Group1.jpg", "Group2.jpg"],
    cleaning: ["Cleaning1.jpg", "Cleaning2.jpg"],
    exercise: ["Exercise1.jpg", "Exercise2.jpg", "Exercise3.jpg"],
    study: ["Study1.jpg", "Study2.jpg", "Study3.jpg", "Study4.jpg"],
    naked: ["Naked1.jpg", "Naked2.jpg", "Naked3.jpg", "Naked4.jpg", "Naked5.jpg"],
    prison: ["Prison1.jpg", "Prison2.jpg"],
    tentacles: ["Tentacles1.jpg", "Tentacles2.jpg", "Tentacles3.jpg", "Tentacles4.jpg"]
  },
  specialRules: {
    magic: 0,
    dependentStats: {
      obedience: { happiness: 1 }
    }
  },
  Actions: {
    Talk: $.extend(true, {}, Actions.Talk),
    Lockdown: $.extend(true, {}, Actions.Lockdown, {
      results: [
        {
          girl: { happiness: 0 }
        },
        {
          girl: { happiness: 0 }
        }
      ]
    }),
    Clean: $.extend(true, {}, Actions.Clean, {
      variants: function(context, done) {
        var delta = this.results[0];
        delta.building.clean += context.girl.specialRules.magic / 10;
        if (context.girl.specialRules.magic > 99) {
          delete delta.girl.specialRules.magic;
        }
        done(delta);
      },
      results: [
        {
          message: {
            text: 'Sakuya spent several hours dusting neglected corners, putting things in order and removing bodily fluids from the rooms of the <<= girl.building().name >>. You can hardly believe how effective it was - one would swear it should take an hour to get the stains out of those sheets, but you turned your back for a moment and they were done, wash water splashed all over the walls.<< if (girl.specialRules.ScarletDevilTalk == 1 && girl.specialRules.magic < 100) { >><br><br><em>Magic <<= girl.specialRules.magic >> <span class="delta">(+1)</span></em><< } >>'
          },
          girl: {
            endurance: -8,
            happiness: 1,
            modesty: 0.3,
            specialRules: { magic: 1 }
          },
          building: { clean: 15 }
        }
      ] // results
    })
  }, // actions
  Missions: {
    ScarletDevilDream: {
      conditions: {
        girl: {
          min: {
            specialRules: { magic: 10 }
          }
        },
        missions: { ScarletDevilDream: -3 }
      },
      end: {
        min: { day: '+1' }
      },
      results: [{
        message: [
          {
            label: 'Signs and Portents',
            group: 'Late at night',
            image: 'content/girls/Sakuya/missionImages/Nightmare.jpg',
            text: "Late at night, you're woken by moaning coming from a nearby room. Not terribly unusual, except for the fact that this doesn't sound like pleasure - and it's coming from Sakuya's room, not someone you'd expect to have a midnight paramour. Pulling on a robe, you step out to take a look.<br><br>The door is cracked open, so you peek inside - it's definitely Sakuya, curled up in a ball and having a nightmare. With a look of concern, you step over to shake her out of it...",
            weight: -1
          },
          {
            label: 'Signs and Portents',
            group: 'Late at night',
            image: 'content/girls/Sakuya/missionImages/Nightmare1.jpg',
            text: "For just the briefest of moments you're no longer standing in the <<= girl.building() ? girl.building().name : 'inn' >>, but on your knees, naked, looking up at the someone. It's too dark to see any features, the only light coming from red-tinted windows... and a glowing pair of eyes, staring down disapprovingly. The chair is massive, padded, at the top of a dais, lined with velvet."
          },
          {
            label: 'Signs and Portents',
            group: 'Late at night',
            image: 'content/girls/Sakuya/images/Tired1.jpg',
            text: "The flash is gone as quickly as it came, and you're back in the <<= girl.building() ? girl.building().name : 'inn' >>, shaking Sakuya awake. She opens bleary eyes, a look of fear flickering across her face and then gone as she recognizes you. She's not interested in talking about her dream, but it does seem to have upset her. Eventually you give up on trying to be comforting and go back to bed."
          }
        ],
        girl: {
          specialRules: { magic: 5 }
        },
        mission: 'SakuyaSomethingToSaySoon'
      }]
    },
    SakuyaSomethingToSaySoon: {
      end: {
        min: { day: '+5' }
      },
      results: [{
        mission: 'SakuyaSomethingToSay'
      }]
    },
    SakuyaSomethingToSay: {
      display: {
        label: 'Something to Say',
        image: 'content/girls/Sakuya/images/Study3.jpg',
        text: '<blockquote>...</blockquote> Sakuya is on the verge of saying something when she thinks better of it and turns away, pretending that it was nothing. Perhaps if you earned her trust a bit more, she\'d share what was on her mind...<br><br><em>(She needs <<- __("obedience") >> 60 and <<- __("modesty") >> 50 or less before she\'ll speak up)</em>',
        group: 'Sakuya Speaks',
        weight: -1
      },
      initialize: function(context) {
        if (context.girl.obedience >= 60 && context.girl.modesty <= 50) {
          delete this.display;
        }
      },
      end: {
        girl: {
          min: { obedience: 60 },
          max: { modesty: 50 }
        }
      },
      results: [{
        message: [
          {
            image: 'content/girls/Sakuya/images/Study3.jpg',
            label: 'Something to Say',
            group: 'Sakuya',
            weight: -2,
            text: '<blockquote>...</blockquote> Sakuya looks like she was on the verge of saying something, but she thinks better of it and turns away. Tired of how distant she\'s been ever since you woke her from her nightmare, you\'re having none of it, and lay a hand on her shoulder, turning her to face you. She hesitates, looking at the floor, but then raises her eyes.<blockquote>My mistress is searching for me. She is not pleased.</blockquote>'
          },
          {
            image: 'content/girls/Sakuya/missionImages/ScarletDevil1.jpg',
            label: 'Something to Say',
            group: 'Sakuya',
            weight: -2,
            text: 'Not satisfied with such a cryptic explanation (you thought she worked for <em>you</em>, afterall), you press her for more information, and she finally explains that before coming to this city, she worked for a woman known as the <strong>Scarlet Devil</strong>, an exceedingly powerful demon, and that she used to have potent magic of her own, until a disaster stipped her of her powers and threw her halfway across the world and into your employ.'
          },
          {
            image: 'content/girls/Sakuya/missionImages/Magic.jpg',
            label: 'Something to Say',
            group: 'Sakuya',
            weight: -2,
            text: '<blockquote>She will be here soon. If... if you wish me to remain here, I will need to practice.</blockquote> She sounds conflicted, both homesick and slightly scared of her mistress. You ask her what she means by "practice" - she just smiles and begins to glow, a mandala of energy and knives filling the space behind her. It flickers, much to her dismay, and then fades.<br><br><em>From now on, when Sakuya Cleans, you\'ll see her magical progress.</em>'
          }
        ],
        girl: {
          specialRules: { ScarletDevilTalk: 1 }
        }
      }]
    },
    ScarletDevilArrival: {
      conditions: {
        girl: {
          min: {
            specialRules: { ScarletDevilTalk: 1 }
          }
        },
        likelyhood: 0.3,
        missions: { ScarletDevilArrival: -3 }
      },
      end: {
        min: { day: '+1' }
      },
      results: [{
        message: {
          group: 'Enter the Devil',
          image: 'content/girls/Sakuya/missionImages/ScarletDevil2.jpg',
          label: 'Train Sakuya',
          text: "You're out in the city on a late night errand to pick up an extra set of condoms for your girls when a scene catches your eye. It's not unusual for a man to be bent over, listening to a young girl whispering in his ear, but you do notice a splash of wet redness as she steps back, in the moment before she wipes her lips on a napkin. She sees you watching - and suddenly, you can't move, frozen by her hypnotic power. In a daze, the man she was... whispering to... wanders away as she approaches you.<blockquote>You. I've been looking for you. Didn't think you'd be so cute though.</blockquote>She has a childish voice and demeanor, but you're not fooled - this creature is incredibly dangerous and powerful.<blockquote>Oh don't worry, I'm not going to hurt you. I like you! You found Sakuya for me! Now, here's what I want you to do. I want you to train Sakuya for a bit longer while I take care of some things in the city, then I'm going to come and collect her.</blockquote>",
          weight: -1
        },
        mission: 'ScarletDevilTraining'
      }]
    },
    ScarletDevilTraining: {
      display: {
        label: 'Train Sakuya',
        group: 'Enter the Devil',
        image: 'content/girls/Sakuya/missionImages/ScarletDevil2.jpg',
        text: "<blockquote>Sakuya has put me through a lot of trouble. I want you to make sure she never does it again - much more <<- __('obedience', 'adj') >> than she used to be, but still <<- __('modesty', 'adj') >>. I'll be back on day <strong></strong> to collect her. I will pay very well if you succeed. Failure will be punished.</blockquote> You rub your wrist where she held it, remembering the painfully strong grip that you're sure could have crushed bone if she'd chosen.<br><br>When you tell the story to Sakuya, she simply repeats that if you want her to keep working for you, you should give her plenty of time to practice magic. She's conflicted - returning home does have a certain appeal, but the Mistress didn't always treat her well.<br><br><em>Raise Sakuya's <<- __('obedience') >> to 90 and <<- __('modesty') >> to 75 if you want to please the Scarlet Devil, or raise her Magic to at least 50 (by having her Clean) if you plan to refuse to hand Sakuya over. She will return at the end of <strong>day <<= mission.end.min.day >></strong>.</em>",
        weight: -1
      },
      end: {
        min: { day: '+60' },
        max: { day: '+60' }
      },
      variants: function(context, done) {
        var mission = this;
        var building = context.girl.building() ? context.girl.building().name : 'inn';
        var text = "Knowing that this is the day the Scarlet Devil will be coming to collect Sakuya, the two of you wait out in front of the " + building + ", waiting for her. It's almost midnight when she finally arrives. You hadn't noticed her bat wings before.<blockquote>Sakuya! It's great to see you. I was angry at first, but, well, the mansion has been so lonely without you, and what happened wasn't really your fault. Come home, won't you dear?</blockquote> She holds out her hand. Out of long habit, Sakuya stands and steps forward to take it, but then hesitates, glancing back at you. She's uncertain what to do - should she go with the Scarlet Devil, or stay with you?";
        var options = {
          '"Don\'t go!"': "It's likely you and Sakuya will have to fight the Scarlet Devil.",
          'Stay silent': "The Scarlet Devil will return with Sakuya to their homeland, and you'll receive a great deal of money if you've trained her well."
        };
        Game.getUserInput(text, 'content/girls/Sakuya/missionImages/ScarletDevil2.jpg', options, function(answer) {
          var delta = { message: [] };
          if (answer == '"Don\'t go!"') {
            delta.message.push(mission.results.dontGo1.message);
            delta.message.push(mission.results.dontGo2.message);
            if (context.girl.specialRules.magic >= 50) {
              delta.girl = {
                obedience: -10,
                constitution: 7
              };
              delta.message.push(mission.results.dontGoWin1.message);
              delta.message.push(mission.results.dontGoWin2.message);
            } else {
              delta.girl = {
                constitution: -10,
                obedience: -10,
                money: -5000
              };
              delta.message.push(mission.results.dontGoLoose1.message);
              delta.message.push(mission.results.dontGoLoose2.message);
            }
          } else {
            context.girl.status = 'Gone';
            if (context.girl.modesty >= 75 && context.girl.obedience >= 90) {
              delta.message = mission.results.staySilentGood.message;
              delta.money = 10000;
            } else {
              delta.message = mission.results.staySilentBad.message;
              delta.money = 2000;
            }
          }
          done(delta);
        });
      },
      results: {
        dontGo1: {
          message: {
            group: 'Enter the Devil',
            label: 'Confrontation',
            image: 'content/girls/Sakuya/missionImages/Nightmare1.jpg',
            text: 'As you call out to Sakuya to stay here and make a new life, the Scarlet Devil frowns, pouts out her lips, and then screams. The shriek seems to go on and on, painful and growing loud enough to double you over in pain. Through a red haze, you see the Scarlet Devil\'s bat wings have grown larger, and her eyes have started to glow. The shriek finally comes to a stop, and you wipe away the blood in your eyes (where did that come from?). The haze remains, turning the sky blood-red.',
            weight: -1,
            delta: false
          }
        },
        dontGo2: {
          message: {
            group: 'Enter the Devil',
            label: 'Confrontation',
            image: 'content/girls/Sakuya/missionImages/Magic.jpg',
            text: "Sakuya is not so easily taken down. The blue glow surrounding her seems pitifully insufficient against the red power drowning the sky itself, but she stands steady. Glancing down at you to reinforce her conviction - the Scarlet Devil nods, and Sakuya pauses to carry you safely out of the way. With a dramatic pause, she launches herself at the Devil. The sky fills with sparks - you can hardly keep track of Sakuya, as she flickers around the empty battlefield, appearing only for an instant at each location with no transition between, at each place throwing a knife of blue energy. The Devil merely stands still and glares, red waves of energy exploding into a thousand jagged shards to meet with each blue counterpart.",
            delta: false
          }
        },
        dontGoWin1: {
          message: {
            group: 'Enter the Devil',
            label: 'Confrontation',
            image: 'content/girls/Sakuya/missionImages/WinFight.jpg',
            text: "The battle doesn't take long. Sakuya finally manages to penetrate her foe's defenses, one of the blue bolts knocking the Devil from her feet with a startled expression. Sakuya flickers to her side instantly kneeling on her chest with a fierce expression and her face and a pair of knives in her hand. She stabs the knives into the ground on either side of the Devile's head with ferocious strength, leaving buried to the hilt in cracked cobblestones, half an inch from either side of her former mistress' head. The moon is pale again.",
            delta: false
          }
        },
        dontGoWin2: {
          message: {
            group: 'Enter the Devil',
            label: 'Confrontation',
            image: 'content/girls/Sakuya/images/Base.jpg',
            text: "She stands, the blue aura finally fading, and returns to where she deposited you at the start of the fight, offering a hand to help you to your feet - you take it, knees wobbly and hair sticky from blood that ran out of your ears. The area around the fight is completely trashed, two inch gouges in solid stone and anything softer completely destroyed. It'll be a hell of a cleanup job. An unexpected sound - a giggle - causes you and Sakuya to look over your shoulders.<blockquote>Teeheehee. You're so cute, Sakuya, all grown up...</blockquote> Sakuya blushes and throws a knife at the Devil, which she casually deflects with one hand.<blockquote>Don't worry about the damage - I brought a new maid, just in case things didn't work out with you. We'll have it patched up by morning. Oh, and do at least <em>pretend</em> to guard your left.</blockquote> And... she's gone. Just... gone. One moment present, the next vanished. Sakuya tells you she won't be back. You believe her."
          }
        },
        dontGoLoose1: {
          message: {
            group: 'Enter the Devil',
            label: 'Confrontation',
            image: 'content/girls/Sakuya/images/Prison1.jpg',
            text: "As you estimated, the Scarlet Devil's power is immense, and it takes only moments for her to land a hit which sends Sakuya sprawling. She gets up though, and resumes her attack, only to be beaten down again. She stands twice more, each time her blue aura weaker, the red seeming more all pervasive, until finally she doesn't move. The Devil paralizes you with another glance, walks over, and puts a leash around Sakuya's neck. She rolls Sakuya over with one foot in order to secure further bondage equipment, and pulls her to her feet.",
            delta: false
          }
        },
        dontGoLoose2: {
          message: {
            group: 'Enter the Devil',
            label: 'Confrontation',
            image: 'content/girls/Sakuya/images/Fetish3.jpg',
            text: "Rather than leading her away as you'd expect, she lets out an entirely unexpected giggle, and leads her over to you. Adding an overly-dramatic sigh, she speaks.<blockquote>I guess if she really wants to stay...</blockquote>She places the leash in your completely-paralized hand, and closes your fingers over it. Leaning over to whisper something in Sakuya's ear, she giggles again and vanishes. Free to move again, you remove Sakuya's blindfold and ask what the Devil said to her.<blockquote>She's not paying for all this.</blockquote> The area around the fight is completely trashed, two inch gouges in solid stone and anything softer completely destroyed. It'll be a hell of a cleanup job, and with the Devil nowhere to be seen, it looks like you'll be footing the bill..."
          }
        },
        staySilentGood: {
          message: {
            group: 'Enter the Devil',
            label: 'Confrontation',
            image: 'content/girls/Sakuya/missionImages/ScarletDevil3.jpg',
            text: "It's not right that she live so far from home among strangers, and the Scarlet Devil looks like she'd be upset (and possibly violent) over a refusal. You nod to Sakuya - obedient and submissive, she takes her mistress's outstretched hand and bows her head. Scarlet raises her up and nods kindly. Sakuya turns back to you for a moment.<blockquote>My mistress will have payment delivered by morning.</blockquote> The Devil grins, kisses her maid's cheek, and they're gone. Not walking together down the street, but there one moment, gone the next, the same way Sakuya used to do while cleaning. With a sigh you turn homeward.",
            weight: -1
          }
        },
        staySilentBad: {
          message: {
            group: 'Enter the Devil',
            label: 'Confrontation',
            image: 'content/girls/Sakuya/missionImages/ScarletDevil2.jpg',
            text: "It's not right that she live so far from home among strangers, and the Scarlet Devil looks like she'd be upset (and possibly violent) over a refusal. You nod to Sakuya - she takes her mistress's outstretched hand and turns to face you to say goodbye. A flicker of disapproval crosses Scarlet's face, but she doesn't interrupt. <blockquote>I will have have payment delivered by morning.</blockquote> The Devil frowns at you, clearly not as pleased with you as you had expected, but happy to have Sakuya back none the less. She kisses her maid's cheek, and they're gone. Not walking together down the street, but there one moment, gone the next, the same way Sakuya used to do while cleaning. With a sigh you turn homeward.",
            weight: -1
          }
        }
      } // results
    } // ScarletDevilTraining
  } // missions
};

Girls.Sakuya.Actions.Talk.results._append([
  {
    message: {
      group: 'Sakuya',
      label: 'Talk',
      image: 'content/girls/Sakuya/images/Naked1.jpg',
      text: "In the early <<- time >> you knock on Sakyua's door, expecting to find her resting. Instead when she opens the door you see her almost completely naked, an unusual change from her modest habits. It looks as though she's been stretching. Surprisingly unselfconscious, she pats the bed, inviting you to sit down while she gets dressed.<br><br>The two of you spend some time discussing business - she's <<- girl.happiness > 60 ? 'quite pleased with' : 'not enjoying' >> her work here. She seems somewhat restless as you talk - perhaps she hadn't finished her exercises when you came in."
    },
    girl: {
      obedience: 1.5,
      happiness: 2,
      modesty: -1
    }
  },
  {
    message: {
      group: 'Sakuya',
      label: 'Talk',
      image: 'content/girls/Sakuya/images/Exercise2.jpg',
      text: "Sakuya is flushed when she arrives at your office - at first you think she may have had to run in order to be on time, but the fact that she doesn't entirely calm down even as you attempt to start a discussion makes you suspect something else is the cause.<br><br>You finally realize the cause when, shifting uncomfortably in her seat, you catch a glimpse of a rope circling her breast. She must have bound herself under her clothes - and you'd guess one of the ropes is rubbing her crotch as well. She notices where your gaze has led and blushes - you just smile and change the subject."
    },
    girl: {
      obedience: 1.5,
      endurance: -4,
      fetishLibido: 1
    }
  },
  {
    message: {
      group: 'Sakuya',
      label: 'Talk',
      image: 'content/girls/Sakuya/images/Exercise2.jpg',
      text: "You and Sakuya head out for a short walk. It's a nice <<- time >>, and the two of you discuss pleasant nothings such as the upcoming festival, Sakuya's ongoing love for the special spiced bread they make at a certain stall in the markets, and what she misses about home. Not very much, it seems - except her mistress, occasionally. She finds her relationship with you odd - working for you, but... it takes a while to get her to finish the sentence. But not dominated or controlled by you, it finally comes out. You suspect she might enjoy a stronger hand on the leash, as it were. Perhaps a literal leash, even."
    },
    girl: {
      obedience: 1.5,
      happiness: 2,
      endurance: -5
    }
  }
]);
