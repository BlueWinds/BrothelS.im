Girls.Sakuya = {
  description: "<p>Sakuya is clearly not from around here. She speaks the language with little accent, but there's still something... otherworldly about her. She bills herself as a maid, and a brief demonstration suggests she is indeed quite good at is. It would take a bit of convincing to get her to work as a prostitute, but she doesn't seem unwilling...</p>",
  status: {
    'For Hire': 1
  },
  happiness: 0,
  endurance: 100,
  obedience: 40,
  charisma: 20,
  modesty: 60,
  intelligence: 50,
  constitution: 70,
  'soft libido': 10,
  'soft experience': 0,
  'hard libido': 20,
  'hard experience': 10,
  'anal libido': 10,
  'anal experience': 0,
  'fetish libido': 30,
  'fetish experience': 5,
  images: {
    basePath: "content/girls/Sakuya/images",
    base: "Base.jpg",
    refuse: "Refuse.jpg",
    tired: ["Tired1.jpg", "Tired2.jpg"],
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg", "Soft5.jpg", "Soft6.jpg"],
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg"],
    anal: ["Anal1.jpg", "Anal2.jpg", "Anal3.jpg", "Anal4.jpg"],
    fetish: ["Fetish1.jpg", "Fetish2.jpg", "Fetish3.jpg", "Fetish4.jpg", "Fetish5.jpg"],
    cleaning: ["Cleaning1.jpg", "Cleaning2.jpg"],
    exercise: ["Exercise1.jpg", "Exercise2.jpg", "Exercise3.jpg"],
    study: ["Study1.jpg", "Study2.jpg", "Study3.jpg", "Study4.jpg"],
    naked: ["Naked1.jpg", "Naked2.jpg", "Naked3.jpg", "Naked4.jpg", "Naked5.jpg"],
    prison: ["Prison1.jpg", "Prison2.jpg"],
    tentacles: ["Tentacles1.jpg", "Tentacles2.jpg", "Tentacles3.jpg", "Tentacles4.jpg"]
  },
  specialRules: {
    // In addition to the specialRules with pre-defined effects, you can define arbitrary keys yourself, to store extra information about her progress along missions, her proficiency at an action, or something else. Data stored here will be persisted, but has no effect on its own.
    magic: 0
  },
  actions: {
    Clean: {
      results: [
        {
          message: 'Sakuya spent several hours dusting neglected corners, putting things in order and removing bodily fluids from the rooms of the <<= girl.building().name >>. You can hardly believe how effective it was - one would swear it should take an hour to get the stains out of those sheets, but you turned your back for a moment and they were done, wash water splashed all over the walls.<< if (girl.specialRules.ScarletDevilTalk == 1) { >><br><br><em>Magic <<= girl.specialRules.magic >> <span class="delta">(+1)</span></em><< } >>',
          delta: function() {
            return {
              endurance: -8,
              clean: 12 + this.specialRules.magic / 10,
              happiness: 1,
              modesty: 0.3,
              specialRules: {
                magic: this.specialRules.magic < 100 ? 1 : 0
              }
            };
          } // delta
        }
      ] // results
    } // Clean
  }, // actions
  missions: {
    ScarletDevilDream: {
      start: {
        girlMin: {
          specialRules: { magic: 10 }
        }
      },
      label: 'Signs and Portents',
      group: 'Late at night',
      end: {
        minDay: '+1'
      },
      success: {
        image: [
          '/content/girls/Sakuya/missionImages/Nightmare.jpg',
          '/content/girls/Sakuya/missionImages/Nightmare1.jpg',
          '/content/girls/Sakuya/images/Tired1.jpg'
        ],
        message: [
          "Late at night, you're woken by moaning coming from a nearby room. Not terribly unusual, except for the fact that this doesn't sound like pleasure - and it's coming from Sakuya's room, not someone you'd expect to have a midnight paramour. Pulling on a robe, you step out to take a look.<br><br>The door is cracked open, so you peek inside - it's definitely Sakuya, curled up in a ball and having a nightmare. With a look of concern, you step over to shake her out of it...",
          "For just the briefest of moments you're no longer standing in the <<= girl.building() ? girl.building().name : 'inn' >>, but on your knees, naked, looking up at the someone. It's too dark to see any features, the only light coming from red-tinted windows... and a glowing pair of eyes, staring down disapprovingly. The chair is massive, padded, at the top of a dais, lined with velvet.",
          "The flash is gone as quickly as it came, and you're back in the <<= girl.building() ? girl.building().name : 'inn' >>, shaking Sakuya awake. She opens bleary eyes, a look of fear flickering across her face and then gone as she recognizes you. She's not interested in talking about her dream, but it does seem to have upset her. Eventually you give up on trying to be comforting and go back to bed."
        ],
        girl: {
          specialRules: { magic: 5 }
        },
        mission: 'SakuyaSomethingToSaySoon'
      }
    },
    SakuyaSomethingToSaySoon: {
      end: {
        minDay: '+5'
      },
      success: {
        mission: 'SakuyaSomethingToSay'
      }
    },
    SakuyaSomethingToSay: {
      label: 'Something to Say',
      image: '/content/girls/Sakuya/images/Study3.jpg',
      description: '<blockquote>...</blockquote> Sakuya is on the verge of saying something when she thinks better of it and turns away, pretending that it was nothing. Perhaps if you earned her trust a bit more, she\'d share what was on her mind...<br><br><em>(She needs obedience 60 and Modesty < 50 before she\'ll speak up)</em>',
      group: 'Sakuya Speaks',
      end: function(girl) {
        if (girl.obedience >= 60 && girl.modesty <= 50) {
          delete this.image;
          delete this.description;
        }
        return {
          girlMin: {
            obedience: 60
          },
          girlMax: {
            modesty: 50
          }
        };
      },
      success: {
        image: [
          '/content/girls/Sakuya/images/Study3.jpg',
          '/content/girls/Sakuya/missionImages/ScarletDevil1.jpg',
          '/content/girls/Sakuya/missionImages/Magic.jpg'
        ],
        message: [
          '<blockquote>...</blockquote> Sakuya looks like she was on the verge of saying something, but she thinks better of it and turns away. Tired of how distant she\'s been ever since you woke her from her nightmare, you\'re having none of it, and lay a hand on her shoulder, turning her to face you. She hesitates, looking at the floor, but then raises her eyes.<blockquote>My mistress is searching for me. She is not pleased.</blockquote>',
          'Not satisfied with such a cryptic explanation (you thought she worked for <em>you</em>, afterall), you press her for more information, and she finally explains that before coming to this city, she worked for a woman known as the <strong>Scarlet Devil</strong>, an exceedingly powerful demon, and that she used to have potent magic of her own, until a disaster stipped her of her powers and threw her halfway across the world and into your employ.',
          '<blockquote>She will be here soon. If... if you wish me to remain here, I will need to practice.</blockquote> She sounds conflicted, both homesick and slightly scared of her mistress. You ask her what she means by "practice" - she just smiles and begins to glow, a mandala of energy and knives filling the space behind her. It flickers, much to her dismay, and then fades.<br><br><em>From now on, when Sakuya Cleans, you\'ll see her magical progress.</em>'
        ],
        girl: {
          specialRules: {
            ScarletDevilTalk: 1
          }
        }
      }
    },
    ScarletDevilArrival: {
      label: 'Train Sakuya',
      start: {
        girlMin: {
          specialRules: { ScarletDevilTalk: 1 }
        },
        likelyhood: 2
      },
      end: {
        minDay: '+1'
      },
      group: 'Enter the Devil',
      success: {
        image: [
          '/content/girls/Sakuya/missionImages/ScarletDevil2.jpg'
        ],
        message: [
          "You're out in the city on a late night errand to pick up an extra set of condoms for your girls when a scene catches your eye. It's not unusual for a man to be bent over, listening to a young girl whispering in his ear, but you do notice a splash of wet redness as she steps back, in the moment before she wipes her lips on a napkin. She sees you watching - and suddenly, you can't move, frozen by her hypnotic power. In a daze, the man she was... whispering to... wanders away as she approaches you.<blockquote>You. I've been looking for you. Didn't think you'd be so cute though.</blockquote>She has a childish voice and demeanor, but you're not fooled - this creature is incredibly dangerous and powerful.<blockquote>Oh don't worry, I'm not going to hurt you. I like you! You found Sakuya for me! Now, here's what I want you to do. I want you to train Sakuya for a bit longer while I take care of some things in the city, then I'm going to come and collect her.</blockquote>"
        ],
        mission: 'ScarletDevilTraining'
      }
    },
    ScarletDevilTraining: {
      label: 'Train Sakuya',
      group: 'Enter the Devil',
      image: '/content/girls/Sakuya/missionImages/ScarletDevil2.jpg',
      description: "<blockquote>Sakuya has put me through a lot of trouble. I want you to make sure she never does it again - much more <<- T('obedience', 'adj') >> than she used to be, but still <<- T('modesty', 'adj') >>. I'll be back on day <strong></strong> to collect her. I will pay very well if you succeed. Failure will be punished.</blockquote> You rub your wrist where she held it, remembering the painfully strong grip that you're sure could have crushed bone if she'd chosen.<br><br>When you tell the story to Sakuya, she simply repeats that if you want her to keep working for you, you should give her plenty of time to practice magic. She's conflicted - returning home does have a certain appeal, but the Mistress didn't always treat her well.<br><br><em>Raise Sakuya's <<- T('obedience') >> to 90 and <<- T('modesty') >> to 75 if you want to please the Scarlet Devil, or raise her Magic (by having her Clean) if you plan to refuse to hand Sakuya over. She will return at the end of <strong>day <<= mission.end.minDay >></strong>.</em>",
      end: {
        minDay: '+60',
        maxDay: '+60'
      },
      success: function(girl, done) {
        var building = girl.building() ? girl.building().name : 'inn';
        var text = "Knowing that this is the day the Scarlet Devil will be coming to collect Sakuya, the two of you wait out in front of the " + building + ", waiting for her. It's almost midnight when she finally arrives. You hadn't noticed her bat wings before.<blockquote>Sakuya! It's great to see you. I was angry at first, but, well, the mansion has been so lonely without you, and what happened wasn't really your fault. Come home, won't you dear?</blockquote> She holds out her hand. Out of long habit, Sakuya stands and steps forward to take it, but then hesitates, glancing back at you. She's uncertain what to do - should she go with the Scarlet Devil, or stay with you?";
        var options = {
          "Don't go!": "It's likely you and Sakuya will have to fight the Scarlet Devil <em>(you'll be able to keep her even if you loose the fight)</em>.",
          'Stay silent': "The Scarlet Devil will return with Sakuya to their homeland, and you'll receive a great deal of money if you've trained her well."
        };
        this.group = 'Exit the Devil';
        this.label = 'Confrontation';
        Game.getUserInput(text, 'content/girls/Sakuya/missionImages/ScarletDevil2.jpg', options, function(answer) {
          var result = {};
          if (answer == "Don't go!") {
            result.image = [
              '/content/girls/Sakuya/missionImages/Nightmare1.jpg',
              '/content/girls/Sakuya/missionImages/Magic.jpg'
            ];
            result.message = [
              'As you call out to Sakuya to stay here and make a new life, the Scarlet Devil frowns, pouts out her lips, and then screams. The shriek seems to go on and on, painful and growing loud enough to double you over in pain. Through a red haze, you see the Scarlet Devil\'s bat wings have grown larger, and her eyes have started to glow. The shriek finally comes to a stop, and you wipe away the blood in your eyes (where did that come from?). The haze remains, turning the sky blood-red.',
              "Sakuya is not so easily taken down. The blue glow surrounding her seems pitifully insufficient against the red power drowning the sky itself, but she stands steady. Glancing down at you to reinforce her conviction - the Scarlet Devil nods, and Sakuya pauses to carry you safely out of the way. With a dramatic pause, she launches herself at the Devil. The sky fills with sparks - you can hardly keep track of Sakuya, as she flickers around the empty battlefield, appearing only for an instant at each location with no transition between, at each place throwing a knife of blue energy. The Devil merely stands still and glares, red waves of energy exploding into a thousand jagged shards to meet with each blue counterpart."
            ];
            if (girl.specialRules.magic >= 50) {
              result.image.push('/content/girls/Sakuya/missionImages/WinFight.jpg');
              result.image.push('/content/girls/Sakuya/images/Base.jpg');
              result.message.push("The battle doesn't take long. Sakuya finally manages to penetrate her foe's defenses, one of the blue bolts knocking the Devil from her feet with a startled expression. Sakuya flickers to her side instantly kneeling on her chest with a fierce expression and her face and a pair of knives in her hand. She stabs the knives into the ground on either side of the Devile's head with ferocious strength, leaving buried to the hilt in cracked cobblestones, half an inch from either side of her former mistress' head. The moon is pale again.");
              result.message.push("She stands, the blue aura finally fading, and returns to where she deposited you at the start of the fight, offering a hand to help you to your feet - you take it, knees wobbly and hair sticky from blood that ran out of your ears. The area around the fight is completely trashed, two inch gouges in solid stone and anything softer completely destroyed. It'll be a hell of a cleanup job. An unexpected sound - a giggle - causes you and Sakuya to look over your shoulders.<blockquote>Teeheehee. You're so cute, Sakuya, all grown up...</blockquote> Sakuya blushes and throws a knife at the Devil, which she casually deflects with one hand.<blockquote>Don't worry about the damage - I brought a new maid, just in case things didn't work out with you. We'll have it patched up by morning. Oh, and do at least <em>pretend</em> to guard your left.</blockquote> And... she's gone. Just... gone. One moment present, the next vanished. Sakuya tells you she won't be back. You believe her.");
              result.girl = {
                obedience: -10,
                constitution: 7
              };
            } else {
              result.image.push('/content/girls/Sakuya/images/Prison1.jpg');
              result.image.push('/content/girls/Sakuya/images/Fetish3.jpg');
              result.message.push("As you estimated, the Scarlet Devil's power is immense, and it takes only moments for her to land a hit which sends Sakuya sprawling. She gets up though, and resumes her attack, only to be beaten down again. She stands twice more, each time her blue aura weaker, the red seeming more all pervasive, until finally she doesn't move. The Devil paralizes you with another glance, walks over, and puts a leash around Sakuya's neck. She rolls Sakuya over with one foot in order to secure further bondage equipment, and pulls her to her feet.");
              result.message.push("Rather than leading her away as you'd expect, she lets out an entirely unexpected giggle, and leads her over to you. Adding an overly-dramatic sigh, she speaks.<blockquote>I guess if she really wants to stay...</blockquote>She places the leash in your completely-paralized hand, and closes your fingers over it. Leaning over to whisper something in Sakuya's ear, she giggles again and vanishes. Free to move again, you remove Sakuya's blindfold and ask what the Devil said to her.<blockquote>She's not paying for all this.</blockquote> The area around the fight is completely trashed, two inch gouges in solid stone and anything softer completely destroyed. It'll be a hell of a cleanup job, and with the Devil nowhere to be seen, it looks like you'll be footing the bill...");
              result.girl = {
                constitution: -10,
                obedience: -10,
                money: -5000
              };
            }
          } // don't go
          else { // go home
            if (girl.modesty >= 75 && girl.obedience >= 90) {
              result.image = '/content/girls/Sakuya/missionImages/ScarletDevil3.jpg';
              result.message = "It's not right that she live so far from home among strangers, and the Scarlet Devil looks like she'd be upset (and possibly violent) over a refusal. You nod to Sakuya - obedient and submissive, she takes her mistress's outstretched hand and bows her head. Scarlet raises her up and nods kindly. Sakuya turns back to you for a moment.<blockquote>My mistress will have payment delivered by morning.</blockquote> The Devil grins, kisses her maid's cheek, and they're gone. Not walking together down the street, but there one moment, gone the next, the same way Sakuya used to do while cleaning. With a sigh you turn homeward.";
              girl.status = 'Gone';
              result.girl = { money: 10000 };
            } else {
              result.image = '/content/girls/Sakuya/missionImages/ScarletDevil2.jpg';
              result.message = "It's not right that she live so far from home among strangers, and the Scarlet Devil looks like she'd be upset (and possibly violent) over a refusal. You nod to Sakuya - she takes her mistress's outstretched hand and turns to face you to say goodbye. A flicker of disapproval crosses Scarlet's face, but she doesn't interrupt. <blockquote>I will have have payment delivered by morning.</blockquote> The Devil frowns at you, clearly not as pleased with you as you had expected, but happy to have Sakuya back none the less. She kisses her maid's cheek, and they're gone. Not walking together down the street, but there one moment, gone the next, the same way Sakuya used to do while cleaning. With a sigh you turn homeward.";
              girl.status = 'Gone';
              result.girl = { money: 2000 };
            }
          }
          result.girl.specialRules = { ScarletDevilTalk: 1 };
          done(result);
        }); // getUserInput
      } // success
    } // ScarletDevilTraining
  } // missions
};
