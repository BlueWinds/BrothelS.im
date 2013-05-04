Girls.Saber = {
  description: "<p>Her full name is Arturia Pendragon, once king of a country lost in the mists of time and wielder of a holy sword.<p><p>On her death, she was transmuted into a spiritual guardian of the world, but through some process she's unwilling to discuss, has again become incarnate. Saber possesses magical artifacts that allow her to recover from almost any wound, and has almost unimaginable skill with a sword.</p><p>Despite her royal heritage and highly marketable skills, she seems willing to work for you...</p>",
  status: 'For Hire',
  happiness: 50,
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
    pregnant: "Tired1.jpg",
    rin: ["SaberRin1.jpg", "SaberRin2.jpg", "SaberRin3.jpg", "SaberRin4.jpg"]
  },
  Actions: {
    Talk: $.extend(true, { results: {
      Saber1: {
        message: {
          group: 'Saber',
          label: 'Talk',
          image: '<<- girl.image() >>',
          text: "Saber is quiet and reserved, not shy but private. She answers your direct questions, but has little to add of her own. You try to encourage her to speak up more, but she doesn't much understand the point - words are for communication, nothing more. The idea of bonding doesn't even cross her mind. Eventually you give up, and allow her to return to... whatever she was doing before you entered her room. Meditation, perhaps."
        },
        girl: {
          obedience: 1
        }
      },
      Saber2: {
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
      Saber3: {
        message: {
          group: 'Saber',
          label: 'Talk',
          image: '<<- girl.image() >>',
          text: "You ask why she prefers to be called Saber instead of Arthuria - it's a very pretty name, and it's more fitting for her to be a woman than a weapon. She takes so long to reply that you wonder if the question has offended - finaly, just when you're about to try somthing easier to talk about, she answers.<blockquote>It... there were no happy endings for me. I did far better as a weapon than I ever did as a human.</blockquote>"
        },
        girl: {
          obedience: 2,
          happiness: -3
        }
      },
      Saber4: {
        message: {
          group: 'Saber',
          label: 'Talk',
          image: 'content/girls/Saber/images/Exercise1.jpg',
          text: "Saber seems in no mood to sit around and talk, so you instead take her for a walk in the park. It is a nearly perfect <<- time >>, and she looks very pretty in her clothing, modest as it is. You see her watching a group of young people playing some game or other that involves a great deal of energetic running away from each other - and as you get closer, one of them stumbles and into the two of you. Saber catches the young man - no younger than her, really - and he rather than appologizing, just shouts \"You're it!\" and runs away, looking over his shoulder so see if she's going to chase him.<br><br>She looks at you for permission, and you nod. There are worse ways to spend some time than being young again."
        },
        girl: {
          obedience: 1.5,
          happiness: 3,
          endurance: -7
        }
      }
    }}, Actions.Talk),
    Rest: $.extend(true, {}, Actions.Rest, {
      results: { Generic1: {
        message: {
          text: 'Though no longer a purely spiritual being, Saber still seems to recover from wounds and exhaustion more rapidly than anyone else you\'ve met.'
        },
        girl: {
          endurance: 22
        }
      }}
    }),
    Lockdown: $.extend(true, {}, Actions.Lockdown, {
      results: {
        Generic1: {
          girl: { happiness: -18 }
        },
        Generic2: {
          girl: { happiness: -18 }
        }
      }
    }),
    Exercise: {
      label: 'Patrol',
      group: 'Chores',
      description: 'Saber will roam the streets seeking out enemies to battle (this will increase her <<- __("constitution") >>).',
      conditions: Actions.Exercise.conditions,
      enableConditions: {
        girl: {
          min: { endurance: 50 }
        }
      },
      variants: [
        { fetishes: { tentacles: true }, likelyhood: 0.05, result: 'tentacleRape' },
        { fetishes: { tentacles: true }, likelyhood: 0.1, result: 'defeatTentacle' },
        { fetishes: { rape: true }, likelyhood: 0.05, result: 'guardRape' },
        { fetishes: { rape: true }, likelyhood: 0.05, result: 'ruffianRape' }
      ],
      tags: {
        slums: 0.2,
        docks: 0.2,
        redlight: 0.2,
        university: 0.2,
        market: 0.2
      },
      results: {
        tentacleRape: {
          message: [
            {
              label: 'Patrol',
              group: '<<- girl.name >>',
              image: '<<- girl.image() >>',
              text: 'Mucking through a seldom visited back allyway in the slums, Saber saw a dark mass half-blocking an enterance to the sewers. Though she recognized the shape, it seemed already-dead, given some of the massive gouges visible along its flank and the complete lack of movement. She want closer to investigate, carelessly stepping amid its flacid apendages...',
              delta: false
            },
            {
              label: 'Patrol',
              group: '<<- girl.name >>',
              image: '<<- girl.image("tentacles") >>',
              text: 'The monster sprang to life, limbs coiling around her instantly while a stinger plunged into her thigh. Saber struggled in the tightening coils, and managed to free herself - but the aphrodesiac effects of the stinger were too much, and before she could slay the beast her sword slipped from her trembling hand. It pinned the young woman down as she gasped with blind ecstacy, and took its time thoroughly testing the limits of her every hole.<br><br> Finding Saber\'s fair skin and fertile body to its liking, the monster filled her with an endless stream of milky white liquid until her belly distended. Saber squirmed as the aphrodesiac could no longer suppress the pain, and the monster stung Saber again, this time with a proper dose that left her dumb with pleasure and blissfully unaware of the next few hours of endless violation.<br><br>Saber awoke in a large puddle of cum. It continued to leak out as she staggered home, dribbling down her thighs and marking the path she took.'
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
        defeatTentacle: {
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
        guardRape: {
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
              text: "A mistake. She kneed the man skull-fucking her in the groin, grabbed the sword on the ground, and had it against the final guard's neck before he had even finished blinking. As tempted as she was to reduce the number of corrupt city guards by force, even this filth didn't deserve to die with their pants around their ankles.<br><br>She settled for breaking all six arms that had dared to touch her, the crowd scattering to the four winds, fearful that she might come after them next."
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
        ruffianRape: {
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
              text: "Wham! She saw stars as someone brought a club down across her temple. Still dazed by the blow, she wasn't fast enough to dodge as a man wrapped strong arms around her, pinning both arms at her sides, keeping her immobilized while another man emerged from the building with rope to bind her. When the blindfold arrived, she saw no more.<br><br>The blindfold was removed in a dark room. and they bound her to a stone pillar, roughly ripping away her clothing to expose tender pale flesh. They took turns shoving everything from apples to batons into her vagina, laughing at her curses and squirms as she stretched to accommodate the large objects.<br> They left Saber in a puddle of tears and semen with her prized sword rammed into her ass hilt first."
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
        defeatRuffians: {
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
        meetKnight: {
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
        nothing: {
          message: {
            label: 'Patrol',
            group: '<<- girl.name >>',
            image: '<<- girl.image("exercise") >>',
            text: "Saber wandered the city streets, searching for any foes that dare disturb the peace. Both fortunately and unfortunately she found nothing, returning to the <<- girl.building() ? girl.building().name : 'Inn' >> after several hours."
          },
          girl: {
            endurance: -10,
            constitution: 2
          }
        }
      } // results
    }, // Patrol
    VisitRin: {
      label: 'Visit Rin',
      group: 'Chores',
      description: 'Saber will pay a visit to Tohsaka Rin to get some magical energy - that is to say, have lesbian sex. You wish you could watch - they look so cute together.',
      conditions: {
        girl: { max: { specialRules: { energySupply: 0 }}},
        missions: { RinEnergySupply: 1 }
      },
      tags: { uptown: 1 },
      enableConditions: {
        min: { money: 1000 },
        girl: { min: { endurance: 20 }}
      },
      results: {
        aggresive: {
          message: {
            group: 'Saber',
            label: 'Visit to Rin',
            image: '<<- girl.image("rin") >>',
            text: "Saber is met at the door of the Tohsaka mansion by Rin - and without any warning, there's a hand down her shirt fondling her breast, and another wrapped around her head pulling her in for a kiss. Caught completely off guard, Saber tenses up, and gives a surprised gasp into Rin's mouth as the other woman finds her nipple and gives it a tweak. A shiver runs down Saber's spine as, helplessly swept along by Rin's enthusiasm and lust, Rin unbuttons her shirt right there in the hallway. She hardly has time to take a breath before Rin again comes at her from a different angle, trailing kisses down her neck and unclasping her bra with one hand. A cute little moan escapes her lips as Rin finds her nipple again, this time with her lips. They collapse into a tangle right there in the front hallway, moaning and kissing and licking and panting when Saber finally manages to get Rin naked as well."
          },
          girl: {
            specialRules: { energySupply: 1, RinVisit: 1 },
            endurance: -12,
            happiness: 5,
            softExperience: 3
          },
          money: -1000
        },
        otherGuests: {
          message: {
            group: 'Saber',
            label: 'Visit to Rin',
            image: '<<- girl.image("rin") >>',
            text: "Rin isn't there to meet Saber immediately this time - a servant leads her into a waiting room, announcing that the lady of the house will be with her shortly. She can hear voices coming from the next room - Rin has other guests at the moment, it seems. Still, it's not a long wait before she can hear the visitors excuse themselves and leave by a different door. Tohsaka Rin enters the waiting room with a heavy sigh, though seeing Saber waiting patiently with her hands in her lap does cheer her up a bit. She sits down next to her and leans over - not for a kiss, but to lay her head on Saber's lap. Saber strokes her long, beautiful brown hair for a few minutes while Rin relaxes in her warmth.<br><br>When they eventually get around to making love, it's a slow, tender affair, with much holding and many gentle caresses, exploring each other's bodies carefully. Tohsaka Rin has a beautiful four-post bed. By the time they're done, the expensive silk sheets are in complete disarray, and the two of them lay sleeping in each other's arms."
          },
          girl: {
            specialRules: { energySupply: 1, RinVisit: 1 },
            endurance: -12,
            happiness: 5,
            softExperience: 3
          },
          money: -1000
        },
        anal: {
          message: {
            group: 'Saber',
            label: 'Visit to Rin',
            image: '<<- girl.image("rin") >>',
            text: "Rin seems in quite a good mood when Saber is led to her, waiting in her bedroom with a worrying smile and hiding something behind her back. When Saber asks what it is, Run just smiles wider and tells her to get naked first. Saber blushes, but Rin stands impassively with the same grin. Saber strips slowly, keeping her back to Rin, and finally turns around with her arms crossed over her chest as though that could preserve her modesty in the face of a still fully dressed Rin. The Magus finally produces what she's been holding behind her back this whole time - a jar of oil and an already lubricated rather large dildo. She sets them down on the nightstand and runs up to Saber, catching her around the waist and bending down to lick her belly button. Saber giggles and doesn't resist as Rin tries to lift her. She's not really that strong though, and Saber's heavier than she looks, so Saber laughs and picks Tohsaka up instead.<br><br>After some kissing and fingering, Rin reaches over to the bedstand for the dildo. She first runs it along her own wet pussy before pressing it against Saber's lips. She tentatively licks it, tasting the other woman's moisture before accepting the head into her mouth. Rin lets her suck it for a little while as she turns her attention... not to Saber's pussy, but her rosy little anus. Saber gasps as a finger slides in, and moves her hand to stop Rin, but the other girl ignores the protest and slides in another finger. And a third..."
          },
          girl: {
            specialRules: { energySupply: 1, RinVisit: 1 },
            endurance: -12,
            happiness: 2,
            analExperience: 3
          },
          money: -1000
        }
      } // results
    }
  }, // actions
  Missions: {
    SaberConDrop: {
      conditions: {
        girl: {
          min: {
            hardLibido: 35
          },
          max: { specialRules: { energySupply: 0 }}
        },
        missions: {
          'secondPayment': 2
        }
      },
      variants: [
        { girl: { max: { specialRules: { fading: 6 }}}, result: 'Day16' },
        { girl: { max: { specialRules: { fading: 7 }}}, result: 'Day7' },
        { girl: { max: { specialRules: { fading: 10 }}}, result: 'Day810' },
        { girl: { max: { specialRules: { fading: 11 }}}, result: 'Day11' }
        // Otherwise, Day12plus
      ],
      results: {
        Day16: {
          girl: {
            constitution: -1,
            endurance: -4,
            specialRules: { fading: 1},
            softLibido: 0.5,
            hardLibido: 0.5,
            analLibido: 0.5
          }
        },
        Day7: {
          girl: {
            constitution: -2,
            endurance: -4,
            specialRules: { fading: 1},
            softLibido: 0.5,
            hardLibido: 0.5,
            analLibido: 0.5
          },
          message: {
            group: 'Saber',
            label: 'Looking Drained',
            image: 'content/girls/Saber/images/Tired3.jpg',
            text: "You've seen Saber be many things, but never exhausted before. Sleep and rest has always been something she approached as a necessity, something that had to be done but never really affected her. Over the last few days though she's been sleeping longer, tiring more quickly... when she finally misses breakfast, you decide to check in on her. If she's sick, you need to know so she can have time off.<br><br>She doesn't wake when you enter her room, a sure sign that something is wrong, nor when you place a hand on her forehead to check for fever - there isn't one, and she doesn't look particularly sick, just sleeping peacefully. Perhaps she's just been staying up too late? If her situation doesn't change, you'll ask her about it in a few days.",
            weight: -1
          }
        },
        Day810: {
          girl: {
            constitution: -2,
            endurance: -2,
            softLibido: 1,
            hardLibido: 1,
            analLibido: 1,
            specialRules: { fading: 1}
          }
        },
        Day11: {
          girl: {
            specialRules: { fading: 1 },
            constitution: -0.5
          },
          mission: 'SaberFadingWarning'
        },
        Day12Plus: {
          girl: {
            constitution: -0.5,
            endurance: -3,
            softLibido: 0.3,
            hardLibido: 0.3,
            analLibido: 0.3
          }
        }
      }
    },
    SaberFadingWarning: {
      conditions: false,
      display: {
        group: 'Saber',
        label: 'Looking Drained',
        image: 'content/girls/Saber/images/Tired3.jpg',
        text: "Something is wrong with Saber. She's been missing meals, sleeping extra hours, looking paler than usual, and it's about time she told you what's going on. You catch her after lunch - one of the few activities she still attends regularly - and ask her what's wrong. She says nothing at first, looking down at her food, not tasting anything as she continues to eat mechanically. Finally, just when you're about to repeat the question...<blockquote>I'm fading. I had thought... I thought this was a real, human body, that I was finally free, but it isn't.</blockquote> She falls silent again, and you have to prompt her to explain. She certainly feels real. There have been no complaints from any of the men who have... you stop yourself as her ears start to turn red. Right, she doesn't like to talk about that.<blockquote>I need a constant supply of magical energy to maintain myself in a physical form. I can accept, um, energy from men, but unless they're magicians... it doesn't help very much. It's why I... why I'm working for you.</blockquote> It does make a certain amount of sense - Saber seems more lively after a good fucking recently, almost back to her old self, but it doesn't last. You'll have to find a more permanent solution before the problem gets any worse. Perhaps <strong>asking around the University</strong>?",
        weight: -1
      },
      end: {
        girl: { min: { specialRules: { energySupply: 1 }}}
      },
      results: {
        done: {}
      }
    },
    RinEnergySupply: {
      conditions: false,
      end: {
        min: { day: '+7' },
        max: { day: '+7' }
      },
      variants: [
        { missions: { 'SaberAvalonFinal': 1 }, result: 'finished' },
        { missions: { 'RetrieveAvalonFail': 1 }, result: 'finished' }
      ],
      results: { notDone: {
        mission: 'RinEnergySupply',
        girl: { specialRules: { energySupply: false }},
        message: {
          group: 'Saber',
          label: 'Visit to Rin',
          image: 'content/girls/Saber/missionImages/RinBlush.jpg',
          text: "It's time for Saber's weekly visit to Tohsaka Rin. You can set her action to <strong>Visit Rin</strong> in the evening (if you miss the chance, or you don't have the $1000, Saber's <<- __('constitution') >> will start dropping again until you catch up on visits).",
          weight: -1
        }
      }, finished: {}}
    },
    SaberPermanentSolution: {
      conditions: {
        girl: { min: { specialRules: { RinVisit: 3 }}},
        missions: { RetrieveAvalonFight: -3, RetrieveAvalonSneak: -3 }
      },
      preDay: true,
      display: {
        group: 'Saber',
        label: 'Find magic source for Saber',
        image: '<<- girl.image() >>',
        text: "As much as Saber is enjoying her weekly visits to Tohsaka Rin, they're rather expensive, and hardly a permanent solution. During the most recent vision though, Rin shared something interesting - there is a second source of magical energy somewhere in the city that feels like Saber. It wasn't here a week ago, but it might be worth investigating. She's unable to provide a precise location, but suggested that a careful <strong>search of the Docks</strong> might be in order.",
        weight: -1
      },
      end: {
        girl: { min: { specialRules: { FindAvalon: 3 }}}
      },
      optionsInfo: {
        text: "Yesterday you located the magical artifact that resonates so closely with Saber that Tohsaka Rin has trouble telling them apart. It's currently in the possession of a spectacularly unhelpful man who seems unwilling to even discuss its existence - and if you don't agree to retrieve it for her, Saber is likely to make the attempt on her own. Letting her do that seems like a bad idea ending with, at best, a dozen corpses and an inquest into your involvement. What do you suggest to her?",
        image: 'content/girls/Saber/missionImages/scarySaber.jpg'
      },
      options: [
        {
          key: 'sneak',
          label: 'Be sneaky',
          title: 'Sneaking in will require you to raise her <<- __("intelligence") >>.'
        },
        {
          key: 'fight',
          label: 'Smash and grab',
          title: "You've seen Saber fight - whatever sailors remain on watch will be no match for her. You'll have to raise her <<- __('constitution') >> to make sure she can knock everyone out before they can raise an alarm properly."
        }
      ],
      variants: [
        { option: 'sneak', result: 'sneak' },
        { option: 'fight', result: 'fight' }
      ],
      results: {
        sneak: {
          mission: 'RetrieveAvalonSneak',
          girl: { specialRules: { FindAvalon: false }}
        },
        fight: {
          mission: 'RetrieveAvalonFight',
          girl: { specialRules: { FindAvalon: false }}
        }
      }
    },
    RetrieveAvalonSneak: {
      conditions: false,
      display: {
        group: 'Saber',
        label: 'Retrieve Avalon',
        image: 'content/girls/Saber/missionImages/Avalon.jpg',
        text: "While such information would normally be quite difficult to come by without arousing suspicion, <<- Math.choice(g.girls._filter('status', 'Hired')).name >> overheard one of the sailors on the ship carrying Saber's treasure mention that they would not be leaving for at least a month. That means you should have plenty of time to brush up on Saber's ability to get aboard the ship undetected.<br><br><em>She'll need at least <<- __('intelligence') >> 45 on <strong>day <<- mission.end.max.day >></strong>.</em>",
        weight: -2
      },
      end: {
        min: { day: '+33' },
        max: { day: '+33' }
      },
      variants: [
        { girl: { min: { intelligence: 45 }}, result: 'success' }
      ],
      results: {
        success: { mission: 'RetrieveAvalonFinal' },
        failure: { mission: 'RetrieveAvalonFail' }
      }
    },
    RetrieveAvalonFight: {
      conditions: false,
      display: {
        group: 'Saber',
        label: 'Retrieve Avalon',
        image: 'content/girls/Saber/missionImages/Avalon.jpg',
        text: "While such information would normally be quite difficult to come by without arousing suspicion, <<- Math.choice(g.girls._filter('status', 'Hired')).name >> overheard one of the sailors on the ship carrying Saber's treasure mention that they would not be leaving for at least a month. That means you should have plenty of time to brush up on Saber's ability to get aboard the ship undetected.<br><br><em>She'll need at least <<- __('constitution') >> 65 on <strong>day <<- mission.end.max.day >></strong> for a successful smash and grab.'</em>",
        weight: -2
      },
      end: {
        min: { day: '+33' },
        max: { day: '+33' }
      },
      variants: [
        { girl: { min: { constitution: 65 }}, result: 'success' }
      ],
      results: {
        success: { mission: 'RetrieveAvalonFinal' },
        failure: { mission: 'RetrieveAvalonFail' }
      }
    },
    RetrieveAvalonFail: {
      conditions: false,
      results: { done: {
        message: [
          {
            group: 'Saber',
            label: 'Retrieve Avalon',
            image: 'content/girls/Saber/missionImages/SaberSuit.jpg',
            weight: -1,
            text: "Saber meets you at the door of the <<- girl.building() ? girl.building().name : 'Inn' >>... and you can't help but laugh at how absurdly over-dressed for the part of spy she is. Her black outfit might as well scream \"I don't want you to look at me.\" She doesn't seem to get the joke, asking you what you're laughing at with a straight face. It's a shame there's no time to make her go dress more normally - the docks are some distance away, and you definitely want to leave and return before before dawn breaks. Sneaking aboard is more difficult than you expected. You ignore strange looks at her getup on your way there, and once at the docks. You don't even make it to the ship before you're confronted by the captain - it seems he's been waiting for you.",
            delta: false
          },
          {
            group: 'Saber',
            label: 'Retrieve Avalon',
            image: 'content/girls/Saber/missionImages/Kariya.jpg',
            weight: -1,
            text: "Saber goes for her sword, but faster than she can strike he lays his hands on his own scabbard - not the hilt, oddly, but the scabbard itself. While you're reasonably certain the captain isn't a threat, Saber remains motionless. You wave a hand in front of her face - she blinks, starts breathing again, looking worried. As the man turns to leave, you offer a substantial payment. He shakes his head, unmoved, but pausing. You try again, naming more than you can afford at the moment, but Rin might be willing to help out. He rejects it again without turning to face you, starting to sound reluctant now that he can hear how desperate you are.<blockquote>I'm leaving. Don't follow, or we'll have to find out if this thing can do more than just freeze you. I must use this to save someone, and I value her life is more than anything you can offer me.</blockquote>",
            delta: false
          },
          {
            group: 'Saber',
            label: 'Retrieve Avalon',
            image: 'content/girls/Saber/missionImages/Fail.jpg',
            weight: -1,
            text: "You've heard enough - he has his life to save, and you have yours. He never sees your foot coming, since his back is still turned. It's a dirty shot, full force right between the legs. Saber is as surprised as he is, and stares at you with her mouth open as you land on him heavily with your knees, stunning and holding him down while you scrabble to free the scabbard from his belt. You grab her hand on the way past to pull her along, but it's like gasping a wall of bricks - she doesn't move an inch, still staring at the captain laying on the ground, finally starting to moan. You tug at her hand again, and she finally starts to move.<br><br>While the law would be pretty clearly on his side, you suspect that he's not the sort to let it run its course. You've just made an enemy."
          }
        ],
        girl: {
          happiness: -50,
          modesty: -10
        }
      }}
    },
    RetrieveAvalonFinal: {
      conditions: false,
      optionsInfo: {
        text: "Saber meets you at the door of the <<- girl.building() ? girl.building().name : 'Inn' >>... and you can't help but laugh at how absurdly over-dressed for the part of spy she is. Her black outfit might as well scream \"I don't want you to look at me.\" She doesn't seem to get the joke, asking you what you're laughing at with a straight face. It's a shame there's no time to make her go dress more normally - the docks are some distance away, and you definitely want to leave and return before before dawn breaks. Ultimately, getting aboard the ship isn't nearly as challenging as you had expected. No one even gives you a second glance at the dock, and the ship itself is nearly deserted - they're sailing out in the morning, after all, and most of the crew is enjoying their final night in port. You're not sure where to start your search, but after thinking a moment, Saber has that covered.<blockquote>We will start with the captain's quarters. It would be the logical place to store something important.</blockquote>The security is lamentably lax. The door is no obstacle, and after a moment's search, you find your object - a heavy steel safe. Saber takes the lead and, in the last action you expected, grabs the handle and begins to pull. You're sure it's not going to budge - she is a tiny woman, and the door is designed to resist crowbars. But... it bends. Not the door, but the handle. She lets go, rubs her hands, pulls again. It might be your imagination, but she's starting to glow. The steel handle warps, bending from a square bracket into a loop. And then it gives, the entire steel box warping and skewing as she forces the door.<br><br>No, not your imagination, but not a glow either - it's the light of a lantern, shining through. She's growing translucent, breathing heavily. She slumps down onto her knees. You look inside - there are two objects, a bound stack of bills, and a scabbard.",
        image: "content/girls/Saber/missionImages/SaberSuit.jpg"
      },
      options: [
        {
          key: 'both',
          label: 'Take the money',
          title: 'Take both the money and the scabbard. Saber is likely to be quite upset with this course.'
        },
        {
          key: 'avalon',
          label: 'Only the scabard',
          title: "Take only the scabbard, which you have to assume is Saber's artifact. She would not be pleased if you took this opportunity to become (more of) a thief."
        }
      ],
      variants: [
        { option: 'both', result: 'both' },
        { option: 'avalon', result: 'avalon' }
      ],
      results: {
        both: {
          message: {
            group: 'Saber',
            label: 'Retrieve Avalon',
            image: 'content/girls/Saber/missionImages/Fail.jpg',
            text: "You reach into the safe, taking out both the bag of money and the scabbard. Saber looks like she wants to say something, but whatever power she exerted to force the lock was too much - she's almost transparent, and can't muster the strength to force out words. You try to take her hand, to lead her out of here, but you only feel a light pressure as you pass straight through her flesh. Not good. Not good at all. She gestures weakly in your direction, and you understand her meaning, passing over the artifact. She has no trouble touching that - it rests on her spectral lap, starting to glow golden with the same light Saber herself emitted a moment ago. She passes out. You nearly panic, but her flesh seems a little more solid than before, and you realize that she'll probably be alright.<br><br>It's surprisingly easy to pick up her sleeping form. Your luck in remaining unmolested holds strong as you carry her out of the ship. You're halfway across the docks, Saber growing steadily more solid and heavy in your arms when you hear a ruckus behind - someone has noticed your theft. Fortunately, it's a dark night and you make your way back to the <<- girl.building() ? girl.building().name : 'inn' >> without further incident.",
            weight: -2
          },
          girl: {
            happiness: -25,
            obedience: -10
          },
          money: 6200
        },
        avalon: {
          message: {
            group: 'Saber',
            label: 'Retrieve Avalon',
            image: 'content/girls/Saber/missionImages/Fail.jpg',
            text: "You reach into the safe, taking only the scabbard. Saber nods approvingly, but whatever power she exerted to force the lock was too much - she's almost transparent, and can't muster the strength to force out words. You try to take her hand, to lead her out of here, but you only feel a light pressure as you pass straight through her flesh. Not good. Not good at all. She gestures weakly in your direction, and you understand her meaning, passing over the artifact. She has no trouble touching that - it rests on her spectral lap, starting to glow golden with the same light Saber herself emitted a moment ago. She passes out. You nearly panic, but her flesh seems a little more solid than before, and you realize that she'll probably be alright.<br><br>It's surprisingly easy to pick up her sleeping form. Your luck in remaining unmolested holds strong as you carry her out of the ship. You're halfway across the docks, Saber growing steadily more solid and heavy in your arms when you hear a ruckus behind - someone has noticed your theft. Fortunately, it's a dark night and you make your way back to the <<- girl.building() ? girl.building().name : 'inn' >> without further incident.",
            weight: -2
          },
          girl: {
            happiness: 25,
            obedience: 13,
            modesty: 15
          }
        }
      }
    }
  },
  Events: {
    SaberMagicianMeet: {
      tags: {
        university: 0.75
      },
      conditions: {
        missions: {
          SaberFadingWarning: 1
        },
        ownerParticipation: true,
        girl: { max: { specialRules: { MeghanVisit: 0 }}}
      },
      results: {
        library: {
          message: {
            group: 'Saber',
            label: 'Poking around the Library',
            image: 'content/girls/Saber/missionImages/librarian.jpg',
            text: "You and Saber decide that the best place to start is the library - surely there's something that can help, tucked away among the many thousands of books. Gaining entrance, however, is more difficult than expected - you're neither students, faculty, nor really associated with the University in any way. A stubborn librarian guards the entrance and will not let you in for love or money without a note from the administration.<br><br>You're a bit flummoxed by this turn of events, until you think of another place filled with books - Lady Meghan's house. She certainly seemed sympathetic enough to your plight, so perhaps she'd be willing to help Saber as well. You could pay her a visit by <strong>exploring Uptown</strong> in the morning."
          },
          girl: {
            specialRules: { universityVisit: 1 },
            endurance: -10,
            happiness: -3
          }
        }
      }
    },
    SaberMeetMeghan: {
      tags: { uptown: 1 },
      conditions: {
        girl: { min: { specialRules: { universityVisit: 1 }}},
        missions: { SaberFadingWarning: 1 },
        time: 'morning'
      },
      variants: [
        {
          girl: { max: { specialRules: { MeghanVisit: 0 }}},
          result: 'firstVisit'
        },
        {
          girl: { min: { specialRules: { MeghanVisit: 2 }}},
          result: 'secondVisit'
        }
      ],
      results: {
        firstVisit: {
          message: [
            {
              group: 'Saber',
              label: 'Vist to Lady Meghan',
              image: 'content/missions/loan/Meghan2.jpg',
              text: "Knocking on the door at first yields little results - only the fact that you can see smoke coming from the chimney makes you persist long enough for the lady of the house to eventually answer the door, groggy and rubbing her eyes. She invites the both of you in, and you can't help but notice how her eyes seem to flicker back to Saber whenever there isn't something else demanding her attention. You're about the begin explaining the situation when her curiosity finally bursts - curiosity tinged with, perhaps, a bit of fear.<blockquote>What the hell are you?</blockquote>...<blockquote>Forgive me, I was not expecting such a visitor.</blockquote> Lady Meghan drops her eyes to the floor and takes a deep breath, exhales it slowly. The outburst put Saber on guard, but she starts to relax as Meghan calms down again. You wait for someone to explain what's going on - this was definitely not the reaction you expected. Meghan finally speaks again.",
              delta: false
            },
            {
              group: 'Saber',
              label: 'Vist to Lady Meghan',
              image: 'content/girls/Saber/missionImages/scarySaber.jpg',
              text: "<blockquote>Sorry. It's... she's like a cat, and she's supposed to be a lion, but instead she's just a kitten, and I thought she was really a lion pretending to be a kitten, which they can't do, and lions definitely can't <em>be</em> kittens again, but she's not since the lion is still there. And the kitten can't eat meat, so the lion is eating itself... which isn't what's happening at all, but I don't know how to explain it any better. Um... just forget about it. Please, you came here for a reason. What can I do for you, <<- g.player.name >>?</blockquote> You're not quite sure how to take all that, and Meghan keeps glancing nervously at Saber, who is intentionally looking everywhere <em>except</em> at Meghan, but... well, time to forge on. You explain the situation as best you can, how Saber is running out of magical energy (that must be the lion that's eating itself?) and you were hoping, as a rather powerful wizard herself she might be able to do something about it.",
              delta: false
            },
            {
              group: 'Saber',
              label: 'Vist to Lady Meghan',
              image: 'content/missions/loan/Meghan.jpg',
              text: "Yes, she can help you. No, it will not be free. You ask what the price is, and she responds that she's not sure yet - she'll have to do some research first. If the two of you would <strong>come back in a couple of days</strong>, she'll have some more answers. For perhaps the first time ever she doesn't invite you to stay over for tea, and taking the hint, you depart. On the way home, you ask the silent Saber her opinion on the matter. She hasn't said a word since she first saw Meghan.<blockquote>If I am a lion, she is a hunter. I would worry less if I could see her spear. Be careful.</blockquote>"
            }
          ],
          girl: {
            specialRules: {
              MeghanVisit: 1
            },
            intelligence: 2,
            endurance: -7
          }
        }, // firstVisit
        wait: {
          message: {
            group: 'Saber',
            label: 'Vist to Lady Meghan',
            image: 'content/girls/Saber/images/Base.jpg',
            text: "Lady Meghan doesn't seem to be home right now - perhaps she's still figuring out how to help Saber. You could try again in a couple of days."
          },
          girl: {
            specialRules: {
              MeghanVisit: 1
            },
            endurance: -6,
            happiness: -1
          }
        },
        secondVisit: {
          message: [
            {
              group: 'Saber',
              label: 'Visit to Meghan...',
              image: 'content/missions/loan/Meghan.jpg',
              text: "The door opens almost instantly after you knock. Rather than inviting you in, Lady Meghan steps out into the street with you and Saber. You're about to ask if she's found a solution, but she puts a finger to her lips and shushes you. She stands there thinking for a moment, then closes the door behind her.<blockquote>I said my help wouldn't be free. Well, I want to borrow Saber for a week. Once she's feeling better, that is.</blockquote>You glance at Saber - she hesitates, then nods. Seeing your agreement (not that you have much choice in the matter), Meghan leads you out into the city.",
              delta: false,
              weight: -1
            },
            {
              group: 'Saber',
              label: '...and another.',
              image: 'content/girls/Saber/missionImages/Rin.jpg',
              text: "Your destination is an old mansion, not far away and still in the finer parts of Uptown. This time you're greeted at the front gate by a servant who seems to be expecting you. He bows and leads you into a waiting room without a word - a treatment more in line with your expectations for this part of town than Meghan's cluttered one-room-house. You don't have long to wait before the mistress of the house arrives.<br><br>Tohsaka Rin is all smiles and energy, arrogant and rude in an oddly endearing way. She keeps looking at Saber with interest, even as Meghan introduces the two of you and explains the situation - Saber needs a steady and powerful stream of magical energy to stay in the world, until you can find a more permanent solution. Rin laughs at the phrase \"steady stream of magical energy\", though you can tell it's as much to cover a blush at what it implies as because she finds it amusing.",
              delta: false
            },
            {
              group: 'Saber',
              label: 'The solution',
              image: 'content/girls/Saber/missionImages/RinBlush.jpg',
              text: "<blockquote>The first, um, treatment will be free. After this, have her visit once per week. I will charge you $1000 per session. Any problems?</blockquote> She uses a stern voice and tries to look scary, but the effect is spoiled by the fact that she's turning red and fidgeting with her hair as she speaks. It seems an odd solution, but, well, both Meghan and Tohsaka are treating the idea perfectly seriously, so... You agree - you didn't expect to be <em>spending</em> money on sex for one of your girls when you opened a brothel, but in this case you'll have to make an exception. You just don't know anyone else with enough magical energy to keep Saber from fading away. Saber, in turn, is attempting to look as stoic as ever, but you can't miss the lust in her glance when she looks at Tohsaka Rin. Her ears are also red - not embarassement in her case, but rather shame.<blockquote>Well, don't just stand there. Idiots. Shoo. I'll send her along later when we're done.</blockquote>Rin has no intention of budging so much as an inch until you and Meghan are gone, so the two of you depart.<br><br>Saber returns home several hours later, looking... well, her expression is complicated. Sated, for one, but also confused. She avoids your gaze and heads into her room, locking the door with a click."
            }
          ],
          girl: {
            specialRules: { energySupply: 1, MeghanVisit: false, universityVisit: false },
            endurance: -12,
            happiness: 5,
            softExperience: 3
          },
          mission: 'RinEnergySupply'
        }
      } // results
    },
    SaberFindAvalon: {
      tags: { docks: 0.75 },
      conditions: {
        ownerParticipation: true,
        missions: { SaberPermanentSolution: 1 },
        time: 'morning'
      },
      variants: [
        {
          likelyhood: 0.5,
          result: 'nothing'
        },
        {
          girl: { min: { specialRules: { FindAvalon: 2 }}},
          result: 'done'
        }
      ],
      results: {
        nothing: {
          girl: {
            endurance: -9,
            happiness: -2,
            constitution: -1
          },
          message: {
            group: 'Saber',
            label: 'Explore the Docks',
            image: 'content/miscImages/docksMorning.jpg',
            text: "It's a shame that Rin's directions couldn't be any more specific - the docks are... rather large, all told. After spending the morning searching, you don't feel like you've made any progress at all."
          }
        },
        progress: {
          girl: {
            specialRules: { FindAvalon: 1 },
            endurance: -9,
            constitution: -1
          },
          message: {
            group: 'Saber',
            label: 'Find magic source for Saber',
            image: '<<- (new Person("High Class")).image >>',
            text: "With an entire section of the city to cover, you decide to focus on people rather than places. It's not hard to learn that on the day Tohsaka Rin first sensed the presence of whatever artifact feels so much like Saber exactly three foreign ships docked - one small sailing ship carrying foregin dignitaries, and two merchant traders. You spend some time tracking down the captain of one of the trade ships - he's helpful enough, but professes to have nothing that could possibly be a magical artifact aboard his ship. You believe him. No prize, but still, progress."
          }
        },
        done: {
          girl: {
            specialRules: { FindAvalon: 1 },
            endurance: -9,
            constitution: -1,
            happiness: 15
          },
          message: {
            weight: -1,
            group: 'Saber',
            label: 'Find magic source for Saber',
            image: 'content/girls/Saber/missionImages/scarySaber.jpg',
            text: "Only one ship left - the small passenger vessel. Rin has confirmed that the power source that feels so much like Saber is still in the Docks, so it must be aboard that ship. You have little trouble locating the captain - but unlike the merchants, he's flatly unhelpful, growing cold the instant you mention that you're searching for a magical item. He has it, you're sure. And he's not going to give it up willingly. Once the meeting is over, you finally notice that not all the ice in the room was coming from the captain - Saber has a scary look on her face.<blockquote>It's mine. I can feel it now, and though I don't know how he came across it, it's definitely mine. I want it back, <<- g.player.name >>.</blockquote>"
          }
        }
      }
    }
  }
};
