"use strict";
Girls.Yuna = {
  description: "A summoner with powerful allies, Yuna fled the devastation of her homeland by mysterious forces, arriving here some months ago. She initially sought to gather allies to return home and rescue her land, but with little money and everyone busy with their own problems, she's been getting desperate for a job. Any job.",
  status: 'For Hire',
  happiness: 25,
  endurance: 100,
  obedience: 45,
  modesty: 60,
  charisma: 60,
  intelligence: 70,
  constitution: 20,
  softLibido: 10,
  softExperience: 15,
  hardLibido: 5,
  hardExperience: 0,
  analLibido: 0,
  analExperience: 0,
  fetishLibido: 15,
  fetishExperience: 5,
  images: {
    basePath: "content/girls/Yuna/images",
    base: "Base.jpg",
    naked: ["Naked1.jpg", "Naked2.jpg", "Naked3.jpg"],
    tired: ["Tired1.jpg", "Tired2.jpg", "Tired3.jpg"],
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg"],
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg", "Hard4.jpg", "Hard5.jpg", "Hard6.jpg", "Hard7.jpg"],
    anal: ["Anal1.jpg", "Anal2.jpg"],
    fetish: ["Fetish1.jpg", "Fetish2.jpg", "Fetish3.jpg", "Fetish4.jpg"],
    group: ["Group1.jpg", "Group2.jpg", "Group3.jpg", "Group4.jpg"],
    study: "Study1.jpg",
    exercise: ["Exercise1.jpg", "Exercise2.jpg", "Exercise3.jpg"],
    prison: "Prison.jpg",
    tentacles: ["Tentacles1.jpg", "Tentacles2.jpg", "Tentacles3.jpg"],
    cleaning: ["Clean1.jpg", "Clean2.jpg"],
    refuse: ["Refuse1.jpg", "Refuse2.jpg"],
    summon: ["Summon1.jpg", "Summon2.jpg", "Summon3.jpg"],
    pregnant: "Tired2.jpg"
  },
  Actions: {
    Talk: $.extend(true, {}, Actions.Talk),
    Summon: {
      label: 'Summon',
      group: 'Chores',
      description: 'Yuna will attempt to summon a creature from another world.',
      conditions: {},
      enableConditions: {
        girl: {
          min: {
            endurance: 30,
            constitution: 35
          }
        }
      },
      tags: {
        indoors: 0.5,
        redlight: 0.4,
        market: 0.1
      },
      variants: [
        { fetishes: { tentacles: true }, likelyhood: 0.1 }
      ],
      results: [
        {
          message: [
            {
              label: 'Summon',
              group: '<<- girl.name >>',
              image: '<<- girl.image("summon") >>',
              text: 'Yuna summoned a goddess of plants and herbs, planning to discuss healing techniques with her. But things began to go wrong in the last few minutes of the ritual - healthy green flames darkened, and the scent of burning incense became noxious fumes. It was too late to abort though, and she completed the summoning. Rather than the healthy wooden and plant body she\'d expected, the goddess was somehow forced into a tangled mess of vines and roots. She appologized and was about to banish it when it decided an appology wasn\'t enough...',
              delta: false
            },
            {
              label: 'Summon',
              group: '<<- girl.name >>',
              image: '<<- girl.image("tentacles") >>',
              text: 'The vines sprang to life, one trusting into her open mouth to prevent her completing the banishment, another around one ankle, lifting her upsidedown into the air. She gagged on the vine in her mouth, but it only pushed further in, down her throat. Helpless in midair, staff dropped in the initial panic, Yuna feared for her life. The misformed goddess was not gentle, fucking Yuna mercilessly. Eventually, Yuna passed out.<br><br>She awoke intact, but incredibly stiff and sore. Though they weren\'t aphrodesiac like those from a proper tenticle beast, at least the vines were slippery and smooth.'
            }
          ],
          girl: {
            happiness: -10,
            endurance: -30,
            analExperience: 10,
            analLibido: -3,
            fetishExperience: 10,
            fetishLibido: -5,
            specialRules: {
              summonCount: 1
            }
          }
        },
        {
          message: {
            label: 'Summon',
            group: '<<- girl.name >>',
            image: '<<- girl.image() >>',
            text: 'Yuna failed to summon anything interesting. <<= Math.choice(["She couldn\'t concentrate, and managed nothing more than making herself tired.", "She did succeed in summoning a tiny little flame will-o-wisp, but it had nothing of value to offer.", "The spell was on the verge of success when she lost control, barely managing to prevent ane explosion of magic from destroying the area."]) >>'
          },
          girl: {
            happiness: -5,
            endurance: -15,
            specialRules: {
              summonCount: 1
            }
          }
        },
        {
          message: {
            label: 'Summon',
            group: '<<- girl.name >>',
            image: '<<- girl.image("summon") >>',
            text: "Yuna summoned an ethereal maid <<if (girl.building()) { >>that whisked around  up the <<= girl.building().name >>, cleaning up everything - it's never looked so sparkling!<< } else {>> - but since she doesn't have a permanent residence, it spent hours tidying up the alleyway and cleaning the street rather than doing anything useful.<< } >>"
          },
          girl: {
            building: {
              clean: 100
            },
            happiness: 10,
            endurance: -15,
            specialRules: {
              summonCount: 1
            }
          }
        },
        {
          message: {
            label: 'Summon',
            group: '<<- girl.name >>',
            image: '<<- girl.image("summon") >>',
            text: "Yuna summoned a spirit of life and healing. They spent several hours speaking of wild things, and by the time it faded away she was invigorated and refreshed."
          },
          girl: {
            constitution: 2.5,
            endurance: 50,
            happiness: 20,
            specialRules: {
              summonCount: 1
            }
          }
        },
        {
          message: {
            label: 'Summon',
            group: '<<- girl.name >>',
            image: '<<- girl.image("summon") >>',
            text: 'Though the spirit she summoned initially claimed to be a mighty god, she soon realized it was not terribly powerful afterall - a god, yes, but the god of silver teaspoons. Not a very grand domain. She did get some very nice tea-sets out of the deal though - three of them. She sold two and kept one for herself.'
          },
          girl: {
            money: 300,
            happiness: 10,
            endurance: -15,
            specialRules: {
              summonCount: 1
            }
          }
        },
        {
          message: {
            label: 'Summon',
            group: '<<- girl.name >>',
            image: '<<- girl.image("hard") >>',
            text: "Rather than a god or helpful spirit, Yuna's summoning drew the attention of a demon - an incubus, to be precise. It broke free before she could bind it, and pinned her to the ground with unholy strength, slicing away her clothing with its razor-sharp tail. Rather than fiery as she'd expected, his touch was freezing. Her nipples went hard immediately, a scream dieing in her throat and replace by a gasp of pleasure as he licked at them and fingered her pussy. She shivered, and reached up expectantly - all thoughts of resistance had fled, replaced by a burning need to feel him inside.<br><br>Each orgasm he gave her only seemed to highten her desire for further sex. By the time the spell finally faded and he was forced to return to his own realm due to lack of energy, Yuna had nearly lost her mind with lust, panting and gasping and writhing in ecstasy. She was also nearly frozen - and it seems his touch has drawn out more than just body heat..."
          },
          girl: {
            happiness: 10,
            endurance: -40,
            constitution: -7,
            hardExperience: 6,
            hardLibido: 5,
            analExperience: 3,
            analLibido: 5,
            fetishExperience: 3,
            fetishLibido: 5,
            specialRules: {
              summonCount: 1
            }
          }
        },
        {
          message: {
            label: 'Summon',
            group: '<<- girl.name >>',
            image: '<<- girl.image("summon") >>',
            text: "Yuna summoned a large winged bird-beast covered with scales, feathers, and sharp claws. Instead of being afraid, she embraced it like an old friend, drawing strength from their bond. After well over an hour of sharing with it the details of her recent <<- girl.happiness > 50 ? 'exploits' : 'hardships' >>, she let it return to the world it came from. She seemed somewhat satisfied with the successful summoning."
          },
          girl: {
            happiness: 10,
            endurance: -15,
            specialRules: {
              summonCount: 1
            }
          }
        }
      ] // results
    } // Summon
  }, // actions
  Missions: {
    YunaHighPriestNeeded: {
      conditions: {
        girl: {
          min: {
            specialRules: { summonCount: 4 }
          }
        },
        missions: {
          YunaHighPriestNeeded: -3
        }
      },
      end: {
        min: { day: '+2' }
      },
      results: [{
        message:  {
          label: 'Local Gossip',
          group: 'Local Gossip',
          image: 'content/girls/Yuna/missionImages/deadPriestess.jpg',
          text: "The gossip from passersby this morning is that Mahha, the High Priestess of the city's largest temple, has died. Though young and attractive, she had been unwell for some months, and the king is expected to declare citywide mourning. With some in shock and others in need of comfort, this doesn't seem to affect how much work your girl<<- g.girls._filter('status', 'Hired').length > 1 ? 's' : '' >> will get today. Mahha is survived by her husband, High Priest Detic.",
          weight: -1
        }
      }]
      // Next item in this path is the YunaCandidatePriestess event.
    },
    YunaForHighPriestess: {
      conditions: false,
      end: {
        min: { day: '+16' },
        max: { day: '+16' }
      },
      display: {
        label: 'Position Vacant: High Priestess',
        group: 'Yuna',
        image: 'content/girls/Yuna/images/Clean1.jpg',
        text: "<blockquote>The High Priest is an upright man, but do you think I should marry him? I don't know...</blockquote> Yuna is on the list of candidates to meet the recently widowed High Priest Detic - he'll be holding a pre-dawn gathering on <strong>Day <<- mission.end.max.day >></strong>.<br><br><em>She'll need at least <<- __('modesty') >> 55 and <<- __('charisma') >> 65 to have a chance at catching his notice.</em>",
        weight: -1
      },
      variants: [{
        girl: {
          min: {
            modesty: 55,
            charisma: 65
          }
        }
      }],
      results: [
        { // success
          message: {
            label: 'Position Vacant: High Priestess',
            group: 'Yuna',
            image: 'content/girls/Yuna/missionImages/interestPass.jpg',
            text: "Yuna attends a pre-dawn gathering with High Priest Detic at his temple. Though a dozen girls fawn around the priest, Yuna's quiet beauty and manner outshine them all. Detic finds it difficult to hide that he is smitten, and talks with her at great length.",
            weight: -1
          },
          girl: {
            happiness: 5,
            charisma: 2,
            modesty: 2
          },
          mission: ["YunaPriestessWedding", "YunaPriestessWeddingInvisible"]
        },
        { // fail
          message: {
            label: 'Position Vacant: High Priestess',
            group: 'Yuna',
            image: 'content/girls/Yuna/missionImages/interestFail.jpg',
            text: "Yuna attends a pre-dawn gathering with High Priest Doric at his temple. She is but one of a dozen girls, all of whom seem eager for the still-mourning priest's attention. She goes largely unnoticed, and returns shortly afterwards staring blankly. It seems that the disinterest was mutual.",
            weight: -1
          },
          girl: {
            happiness: -3
          }
        }
      ]
    },
    YunaPriestessWeddingInvisible: {
      conditions: false,
      end: {
        min: { day: '+27' },
        max: { day: '+27' }
      },
      results: [{}]
    },
    YunaPriestessWedding: {
      conditions: false,
      end: {
        min: { day: '+28' },
        max: { day: '+28' }
      },
      display: {
        label: 'Position Vacant: High Priestess',
        group: 'Yuna',
        image: 'content/girls/Yuna/missionImages/interestPass.jpg',
        text: "After the meeting with High Priest Detic at the temple and catching his eye, he arranged for her to speak with Caosuin about a possible union. Rector Caosuin announces the date of the wedding as though it were already a sure thing. But he cautions her that if she is serious that she must ensure that she is of suitable virtue by the time of the marriage. Being High Priestess is a weighty responsibility.<br><br><em>Yuna should have at least <<- __('modesty') >> 85 and <<- __('obedience') >> 65 by <strong>Day <<- mission.end.max.day >></strong> if she intends to go through with this.</em>",
        weight: -1
      },
      variants: function(context, done) {
        var results = this.base().results;
        if (context.girl.obedience < 65 || context.girl.modesty < 85) {
          done(results.fail);
          return;
        }
        var text = "It's finally the day of Yuna and High Priest Detic's wedding. You knock on her door early in the morning, only to find that Yuna is already up and ready, clothed in a beautiful dress provided by the temple. Something seems to be troubling her though, as rather than a smile as you'd expected, she's pacing nervously as you enter. She hesitates, looking at you with a conflicted expression. There's only one question she could ask, dressed and ready to marry a man she's met only for half an hour.<blockquote>Am I really doing the right thing?</blockquote>";
        var options = {
          "Don't go": "If she's not certain, then it's not what she wants. Besides, helping a whole city is a lot of responsibility, and you still want her help around here.",
          "Come on, it will start soon": "This is probably the best chance she'll ever have to get out of this life and into something she can be proud of doing."
        };
        Game.getUserInput(text, 'content/girls/Yuna/missionImages/weddingDress.jpg', options, function(answer) {
          done(results[answer]);
        });
      },
      results: {
        fail: {
          message: {
            label: "Yuna's Wedding Day",
            group: 'Yuna',
            image: '<<- girl.image("tired") >>',
            text: "It's finally the day of Yuna and High Priest Detic's wedding, but Yuna has cold feet and has decided not to attend. As much as you urge her to at the very least put in an appearance, she'd rather stay here than embarass the High Priest by turning him down in front of a crowd. You can only imagine how packed the temple must be right now... This may have serious repercussions.<br><br>It's still a city-wide day of celebration, and you're not surprised to find <<- g.girls._filter('status', 'Hired')._accumulate('name')._toString() >> gone when you look for them, taking the day off to attend the city-wide party and try to catch a glimpse of the new bride (apparently there still is one - you wonder who).",
            weight: -1
          },
          girl: {
            obedience: -4
          },
          mission: "YunaRefuseConsequences"
        },
        "Don't go": {
          message: {
            label: "Yuna's Wedding Day",
            group: 'Yuna',
            image: '<<- girl.image("tired") >>',
            text: "Yuna seems more relieved than anything when you tell her to stay home and miss her own wedding. It seems that she's quite content with this way of life, and would miss the friends she's made terribly. For both your sakes, you hope the High Priest is a forgiving man, and that this stunt doesn't draw too much unwanted attention.<br><br>It's still a city-wide day of celebration, and you're not surprised to find <<- g.girls._filter('status', 'Hired')._accumulate('name')._toString() >> gone when you look for them, taking the day off to attend the city-wide party and try to catch a glimpse of the new bride (apparently there still is one - you wonder who).",
            weight: -2
          },
          girl: {
            obedience: 5,
            modesty: -4,
            happiness: 7
          },
          mission: "YunaRefuseConsequences"
        },
        "Come on, it will start soon": {
          message: [
            {
              label: "Yuna's Wedding Day",
              group: 'Yuna',
              image: 'content/girls/Yuna/missionImages/weddingDress.jpg',
              text: "You reassure her with some kind words - even if she's uncertain now, she'll be in a position as High Priestess to help everyone, just as she's always wanted, and it's easier to get a divorce than to find another High Priest to marry if she declines with one. Since her parents aren't present to give her away, you'll be taking that role. Arm in arm, the two of you head for the temple.",
              weight: -2,
              delta: false
            },
            {
              label: "Yuna's Wedding Day",
              group: 'Yuna',
              image: 'content/girls/Yuna/missionImages/Husband.jpg',
              text: "High Priest Detic and throngs of worshipers are waiting. The wedding ceremony is extravagant and beautiful - while another country might have looked askance at a brothel master giving away the bride to the high priest, such things are only mildly in distaste here. Despite the butterflies in her stomach and heart pounding in her breast, Yuna hides it well, playing her part as though she were born to it. When Detic pronounces her high priestess, she in return prounces them married. Only you can tell how nervous she is - but you can also tell that she'll grow into the roll well. Detic is a fine match.",
              weight: -2,
              delta: false
            },
            {
              label: "Yuna's Wedding Day",
              group: 'Yuna',
              image: 'content/girls/Yuna/missionImages/weddingPacked.jpg',
              text: "After the ceremony, the bride and groom disappear into the recesses of the temple - no solomn pretenses like 'you may now kiss the bride.' The temple grounds are filled to the brim with a veritable who's-who of the rich and powerful, a crowd you're not sad to find yourself treated as a part of. You hang around for the rest of the day, hoping to catch a moment with Yuna, but you only manage to see her at a distance. As happy as you are for her, it's also a bit of a sad ending. You never got a chance to say goodbye.<br><br>It's a city-wide day of celebration, and you're not surprised to find <<- g.girls._filter('status', 'Hired')._accumulate('name')._toString() >> gone when you return home, taking the day off to attend the city-wide party and try to catch a glimpse of the new bride.",
              weight: -2
            }
          ],
          girl: {
            status: 'Gone',
            endurance: -10,
            happiness: 4,
            charisma: 3
          },
          mission: 'YunaPriestessVisit'
        }
      } // results
    }, //YunaPriestessWedding
    YunaRefuseConsequences: {
      conditions: false,
      end: {
        min: { day: '+8' },
        max: { day: '+8' }
      },
      results: [{
        message: {
          label: "A Visit from the Tax Collector",
          group: 'Yuna',
          image: 'content/girls/Yuna/missionImages/taxCollectors.jpg',
          text: "Just after sunrise, you hear a pounding at your door. You stagger sleepily towards it, but awaken suddenly when you realize who your visitors are: collectors of the temple tax. Though the temple tax is usually only paid by temple worshipers, the well-armed men tell you that to help recoup the costs of the wedding, the lord of the city has approved a temporary extension to the residents of your street. Their paperwork looks legitimate, and you notice that it is marked with the personal seal of High Priest Detic. You hear that the wedding did go on without Yuna - a veiled bride of uncertain name - but you'd guess that he didn't take kindly to his intended skipping out. You have no option but to pay the men.",
          weight: -1
        },
        money: -4000
      }]
    },
    YunaPriestessVisit: {
      conditions: false,
      end: {
        min: { day: '+8' },
        max: { day: '+8' }
      },
      results: [{
        message: {
          label: "A Visit from Yuna",
          group: 'Yuna',
          image: 'content/girls/Yuna/images/Base.jpg',
          text: "Just after sunrise, you hear soft knocking at your front door. Yuna has come to visit you, though she looks around furtively as she enters; it's probably not very becoming of a High Priestess to consort with brothel owner so soon after being married. The two of you talk briefly, and she tells you how happy she is in her new role. Her husband is kind, she's in a position to help people, and she is learning a lot from the best tutors about the workings of her new homeland.<blockquote>I can never thank you enough for supporting me when I was in trouble. Please, accept this money as my thanks. And know that I'll never forget my times here, or my... training.</blockquote>",
          weight: -1
        },
        money: 10000
      }]
    }
  },
  Events: {
    YunaCandidatePriestess: {
      tags: {
        uptown: 0.5
      },
      conditions: {
        missions: {
          YunaHighPriestNeeded: 2,
          YunaForHighPriestess: -3
        }
      },
      results: [{
        message: {
          label: 'Position Vacant: High Priestess',
          group: 'Yuna',
          image: 'content/girls/Yuna/images/Exercise1.jpg',
          text: "While in the finer parts of the city, Yuna was approached by Caosuin, the rector of the temple she often assists at. He has been tasked with putting together a shortlist of potential brides for High Priest Detic, and based on Yuna's service and lineage - not to mention her other assets - he's decided she would be a good fit. The position is much coveted by the city's faithful girls. He asks if she will consider preparing her heart for this in the coming weeks.",
          weight: -1
        },
        mission: 'YunaForHighPriestess',
        girl: {
          endurance: -5,
          happiness: 3
        }
      }]
    }
  } // Events
};

Girls.Yuna.Actions.Talk.results._append([
  {
    message: {
      group: 'Yuna',
      label: 'Talk',
      image: 'content/girls/Yuna/images/Exercise2.jpg',
      text: "As you and Yuna sit down to spend some time together, she instead suggests that you take a walk through the city instead. A \"walk\" doesn't seem to be exactly what she had in mind though, as you end up, somehow, in the marketplace, looking at clothing. It's hard to object when she decides to start trying on outfits - especially when they involve as little cloth as the ones she's picking out. Finally, you end up buying something for her, a pair of pants that seem like they might fall off at any moment. You hope that they do."
    },
    girl: {
      obedience: 1,
      happiness: 4,
      modesty: -2,
      money: -60
    }
  },
  {
    message: {
      group: 'Yuna',
      label: 'Talk',
      image: 'content/girls/Yuna/images/Study1.jpg',
      text: "<blockquote>What do you think of my new dress?</blockquote> Yuna twirls in front of you, showing off. It's very... much like every other dress you've seen her wearing, as a matter of fact. She does seem very fond of this particular style. You avoid mentioning the fact, and instead comment on how its colors differ subtly from her usual costume."
    },
    girl: {
      obedience: 1.5,
      happiness: 1
    }
  },
  {
    message: {
      group: 'Yuna',
      label: 'Talk',
      image: 'content/girls/Yuna/images/Clean2.jpg',
      text: "You visit Yuna at her room in the <<- girl.building() ? girl.building().name : 'inn' >>. She welcomes you inside and invites you to sit down for some traditional tea that she has prepared. She <<- girl.happiness > 50 ? 'seems to be doing okay, but' : 'doesn\'t seem to be doing so well, and' >> when you ask her about herself, she immediately begins to tell you a about her childhood - it seems she's been thinking about it a lot recently. Her father was a priest and her mother was a prostitute he met while working overseas. Unfortunately, her mother died when she was four and her father when she was seven - she has only vague memories to them. Even so, she feels that both professions are part of who she is. By the time the tea is finished, Yuna seems drained from dredging up old memories, but happy to have finally gotten them off her chest."
    },
    girl: {
      obedience: 2,
      happiness: -2,
      endurance: -5
    }
  },
  {
    message: {
      group: 'Yuna',
      label: 'Talk',
      image: 'content/girls/Yuna/images/Base.jpg',
      text: "You sit Yuna down and spend the <<- time >> trying to learn more about her. She's cagey about exactly what happened to her homeland, but says she escaped to this one with help from a friend of her late father. She explains that she was separated from her first love, and she's trying to meet as many men as possible in order to find him again. As to what she would do if she found him, perhaps not even she has decided. "
    },
    girl: {
      obedience: 2,
      modesty: 2,
      happiness: 3,
      endurance: -5
    }
  }
]);

Events.YunaWedding = {
  tags: {
    garrison: 1,
    university: 1,
    slums: 1,
    docks: 1,
    park: 1,
    market: 1,
    redlight: 1,
    uptown: 1,
    indoors: 1
  },
  conditions: {
    missions: {
      YunaPriestessWedding: 1,
      YunaPriestessWeddingInvisible: 2
    }
  },
  results: [{
    girl: {
      endurance: 4,
      happiness: 3,
      charisma: 3
    }
  }]
};
