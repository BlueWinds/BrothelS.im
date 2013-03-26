Girls.Saber = {
  description: "<p>Her full name is Arturia Pendragon, once queen of a country lost in the mists of time and wielder of a holy sword.<p><p>On her death, she was transmuted into a spiritual guardian of the world, but through some process she\'s unwilling to discuss, has again become incarnate. Saber possesses magical artifacts that allow her to recover from almost any wound, and has almost unimaginable skill with a sword.</p><p>Despite her royal heritage and highly marketable skills, she seems willing to work for you...</p>",
  status: 'For Hire',
  happiness: 0,
  endurance: 100,
  obedience: 80,
  modesty: 90,
  charisma: 30,
  intelligence: 20,
  constitution: 75,
  softExperience: 0,
  hardExperience: 0,
  analExperience: 0,
  fetishExperience: 0,
  softLibido: 20,
  hardLibido: 0,
  analLibido: 0,
  fetishLibido: 0,
  specialRules: {
    dependentStats: {
      '-happiness': { happiness: -0.5 },
      happiness: { happiness: -0.33 }
    }
  },
  images: {
    basePath: "content/girls/Saber/images",
    base: "Base.jpg",
    refuse: ["Refuse1.jpg", "Refuse2.png"],
    tired: ["Tired1.jpg", "Tired2.jpg", "Tired3.jpg"],
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg", "Soft5.jpg"],
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg", "Hard4.jpg", "Hard5.jpg", "Hard6.jpg", "Hard7.jpg"],
    anal: ["Anal1.jpg", "Anal2.jpg", "Anal3.jpg", "Anal4.jpg"],
    fetish: ["Fetish1.jpg", "Fetish2.jpg", "Fetish3.jpg", "Fetish4.jpg", "Fetish5.jpg"],
    group: ["Group1.jpg", "Group2.jpg", "Group3.jpg", "Group4.jpg"],
    cleaning: ["Cleaning1.jpg", "Cleaning2.jpg", "Cleaning3.jpg", "Cleaning4.jpg"],
    exercise: ["Exercise1.jpg", "Exercise2.jpg", "Exercise3.jpg"],
    study: ["Study1.jpg", "Study2.jpg"],
    naked: ["Naked1.jpg", "Naked2.jpg", "Naked3.jpg"],
    prison: ["Prison1.jpg", "Prison2.jpg"],
    tentacles: ["Tentacles1.jpg", "Tentacles2.jpg", "Tentacles3.jpg"],
    pregnant: "Tired1.jpg"
  },
  Actions: {
    Talk: $.extend(true, {}, Actions.Talk),
    Rest: $.extend(true, {}, Actions.Rest, {
      results: [{
        message: {
          text: 'Though no longer a purely spiritual being, Saber still seems to recover from wounds and exhaustion more rapidly than anyone else you\'ve met.'
        },
        girl: {
          endurance: 22
        }
      }]
    }),
    Lockdown: $.extend(true, {}, Actions.Lockdown, {
      results: [
  {
    girl: { happiness: -18 }
  },
  {
    girl: { happiness: -18 }
  }
      ]
    }),
    Exercise: {
      label: 'Patrol',
      group: 'Chores',
      description: 'Saber will roam the streets seeking out enemies to battle (this will increase her <<- __("constitution") >>.',
      conditions: Actions.Exercise.conditions,
      enableConditions: {
        girl: {
          min: { endurance: 50 }
        }
      },
      variants: [
        { fetishes: { tentacles: true }, likelyhood: 0.1 },
        { fetishes: { tentacles: true }, likelyhood: 0.1 },
        { fetishes: { rape: true }, likelyhood: 0.1 },
        { fetishes: { rape: true }, likelyhood: 0.1 }
      ],
      tags: {
        slums: 0.2,
        docks: 0.2,
        redlight: 0.2,
        university: 0.2,
        market: 0.2
      },
      results: [
        { // tentacles, 0
          message: [
            {
              label: 'Patrol',
              group: '<<- girl.name >>',
              image: '<<- girl.image() >>',
              text: 'Mucking through a seldom visited back allyway in the slums, Saber saw a dark mass half-blocking an enterance to the sewers. Though she recognized the shape, it seemed already-dead, given some of the massive gouges visible along its flank and the complete lack of movement. She went closer to investigate, carelessly stepping amid its flacid appendages...',
              delta: false
            },
            {
              label: 'Patrol',
              group: '<<- girl.name >>',
              image: '<<- girl.image("tentacles") >>',
              text: 'The monster sprang to life, limbs coiling around her instantly while a stinger plunged into her thigh. Saber struggled in the tightening coils, and managed to free herself - but the aphrodisiac effects of the stinger were too much, and before she could slay the beast her sword slipped from her trembling hand. It pinned the young woman down as she gasped with blind ecstacy, and took its time thoroughly testing the limits of her every hole.<br><br> Finding Saber\'s fair skin and fertile body to its liking, the monster filled her with an endless stream of milky white liquid until her belly distended. Saber squirmed as the aphrodisiac could no longer suppress the pain, and the monster stung Saber again, this time with a proper dose that left her dumb with pleasure and blissfully unaware of the next few hours of endless violation.<br><br>Saber awoke in a large puddle of cum. It continued to leak out as she staggered home, dribbling down her thighs and marking the path she took.'
            }
          ],
          girl: {
            happiness: -10,
            endurance: -30,
            analExperience: 7,
            analLibido: 3,
            fetishExperience: 5,
            fetishLibido: 3
          }
        },
        { // defeat tentacles, 1
          message: {
            label: 'Patrol',
            group: '<<- girl.name >>',
            image: '<<- girl.image() >>',
            text: 'Saber encountered a tentacle monster attempting to establish a lair beyond their usual range in the slums, and managed to defeat it without much difficulty. The creatures rely on surprise and stealth - a ferocious fighter like her will not fall to one unless caught off guard.'
          },
          girl: {
            happiness: 5,
            endurance: -15,
            constitution: 2.5
          }
        },
        { // guard rape, 2
          message: [
            {
              label: 'Patrol',
              group: '<<- girl.name >>',
              image: '<<- girl.image("naked") >>',
              text: "A trio of guards on patrol demanded to examine Saber's sword - law abiding as she was, she complied without hesitation. A mistake, as they then drew their own and demanded that she \"entertain\" them with a striptease. Saber hesitantly removed article after article of clothing until she was fully naked, as a crowd began to gather to watch the free show. Her scowls didn't do much to drive anyone away. Finally, one of the guards grew tired of watching, and pulled out his dick, thrusting it towards her.",
              delta: false
            },
            {
              label: 'Patrol',
              group: '<<- girl.name >>',
              image: '<<- girl.image("soft") >>',
              text: "With a grimace, she took the dirty prick into her mouth, hesitantly licking it for a moment before the guard grabbed her hair and forced it all the way down her throat. He had no sympathy for her gagging cough, and began to face-fuck her in front of the crowd, some of whom began to cheer. One of the other guards set down his sword, reaching around for her pants...",
              delta: false
            },
            {
              label: 'Patrol',
              group: '<<- girl.name >>',
              image: '<<- girl.image("refuse") >>',
              text: "A mistake. She kneed the man skull-fucking her in the groin, grabbed the sword on the ground, and had it against the final guard\'s neck before he had even finished blinking. As tempted as she was to reduce the number of corrupt city guards by force, even this filth didn\'t deserve to die with their pants around their ankles.<br><br>She settled for breaking all six arms that had dared to touch her, the crowd scattering to the four winds, fearful that she might come after them next."
            }
          ],
          girl: {
            happiness: -25,
            endurance: -30,
            softExperience: 2,
            softLibido: -3,
            modesty: -2
          }
        },
        { // ruffian rape, 3
          message: [
            {
              label: 'Patrol',
              group: '<<- girl.name >>',
              image: '<<- girl.image() >>',
              text: 'Saber spotted a young man picking a lady\'s pocket in the marketplace. When she shouted, he ran. She immediately gave chase - she was fast, but he knew the terrain, ducking into a dark alleyway...',
              delta: false
            },
            {
              label: 'Patrol',
              group: '<<- girl.name >>',
              image: '<<- girl.image("group") >>',
              text: "Wham! She saw stars as someone brought a club down across her temple. Still dazed by the blow, she wasn\'t fast enough to dodge as a man wrapped strong arms around her, pinning both arms at her sides, keeping her immobilized while another man emerged from the building with rope to bind her. When the blindfold arrived, she saw no more.<br><br>The blindfold was removed in a dark room. and they bound her to a stone pillar, roughly ripping away her clothing to expose tender pale flesh. They took turns shoving everything from apples to batons into her vagina, laughing at her curses and squirms as she stretched to accommodate the large objects.<br> They left Saber in a puddle of tears and semen with her prized sword rammed into her ass hilt first."
            }
          ],
          girl: {
            endurance: -35,
            happiness: -25,
            constitution: -3,
            hardExperience: 4,
            hardLibido: -4,
            fetishLibido: -9,
            fetishExperience: 5
          }
        },
        { //defeat ruffians, 4
          message: {
            label: 'Patrol',
            group: '<<- girl.name >>',
            image: '<<- girl.image("exercise") >>',
            text: "Exploring the most unsavory parts of the city, Saber encountered a band of ruffians. Unable to catch her by surprise, they were no match for even her sheathed sword, and she handed them over to the town guard who promised to take care of the issue. A young woman should be able to walk safely anywhere, not just in public places."
          },
          girl: {
            happiness: 1,
            endurance: -15,
            constitution: 2.5
          }
        },
        { // knight, 5
          message: {
            label: 'Patrol',
            group: '<<- girl.name >>',
            image: '<<- girl.image() >>',
            text: "Saber encountered a passing knight, who praised her sword, sheathed as it was. After talking a while, they eventually sparred - she went easy on him, and they separated after a few inconclusive rounds. His praise shifted from her sword to her sword-skill, and finally to her beauty - she blushed and thanked him, leaving hastily before he could get any further in his train of compliments."
          },
          girl: {
            happiness: 3,
            endurance: -15,
            constitution: 1.5
          }
        },
        { // Nothing, 6
          message: {
            label: 'Patrol',
            group: '<<- girl.name >>',
            image: '<<- girl.image("exercise") >>',
            text: "Saber wandered the city streets, searching for any foes that dare disturb the peace. Both fortunately and unfortunately she found nothing, returning to the <<- girl.building() ? girl.building().name : 'Inn' >> after several hours."
          },
          girl: {
            endurance: -10,
            constitution: 1
          }
        }
      ] // results
    } // Patrol
  }
};

Girls.Saber.Actions.Talk.results._append([
  {
    message: {
      group: 'Saber',
      label: 'Talk',
      image: '<<- girl.image() >>',
      text: "Saber is quiet and reserved, not shy but private. She answers your direct questions, but has little to add of her own. You try to encourage her to speak up more, but she doesn\'t much understand the point - words are for communication, nothing more. The idea of bonding doesn\'t even cross her mind. Eventually you give up, and allow her to return to... whatever she was doing before you entered her room. Meditation, perhaps."
    },
    girl: {
      obedience: 1
    }
  },
  {
    message: {
      group: 'Saber',
      label: 'Talk',
      image: '<<- girl.image() >>',
      text: "Determined to get Saber to open up a little bit, you decided that a change of surroundings might be helpful, and take her out to <<- time == 'morning' ? 'lunch' : 'dinner' >>. Discussion seems to work well over a shared rice-pot and curry - while not chatty by a long shot, she is at least willing to hold a conversation, rather than respond to questions with single syllable answers.<br><br>Time flies, and you reach out for a second helping... only to notice that the rice is all gone. And the curry. And the basil on the side. Saber seems to have already finished everything. Nothing to be done - you order a second serving. She eats more than her share of that as well."
    },
    girl: {
      obedience: 1.5,
      happiness: 2
    },
    money: -30
  },
  {
    message: {
      group: 'Saber',
      label: 'Talk',
      image: '<<- girl.image() >>',
      text: "You ask why she prefers to be called Saber instead of Arthuria - it\'s a very pretty name, and it\'s more fitting for her to be a woman than a weapon. She takes so long to reply that you wonder if the question has offended - finaly, just when you're about to try somthing easier to talk about, she answers.<blockquote>It... there were no happy endings for me. I did far better as a weapon than I ever did as a human.</blockquote>"
    },
    girl: {
      obedience: 2,
      happiness: -3
    }
  },
  {
    message: {
      group: 'Saber',
      label: 'Talk',
      image: 'content/girls/Saber/images/Exercise1.jpg',
      text: "Saber seems in no mood to sit around and talk, so you instead take her for a walk in the park. It is a nearly perfect <<- time >>, and she looks very pretty in her clothing, modest as it is. You see her watching a group of young people playing some game or other that involves a great deal of energetic running away from each other - and as you get closer, one of them stumbles and into the two of you. Saber catches the young man - no younger than her, really - and he rather than appologizing, just shouts \"You're it!\" and runs away, looking over his shoulder so see if she\'s going to chase him.<br><br>She looks at you for permission, and you nod. There are worse ways to spend some time than being young again."
    },
    girl: {
      obedience: 1.5,
      happiness: 3,
      endurance: -7
    }
  }
]);
