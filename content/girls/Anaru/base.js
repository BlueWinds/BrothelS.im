"use strict";
Girls.Anaru = {
  description: "<p>Beautiful but aloof, Anaru kept her distance and her chastity when her unrequited love was for a boy who looked right past her. Eventually she grew apart from her childhood friends, though she could not forget Menma, the lively girl that she both admired and envied. Easily influenced by others, she made some disreputable friends, and was on the wrong path in life when, without warning, adventure knocked in the form of a vortex. She was suddenly and unexpectedly brought to Valaia, and is wondering what to do now that her former life is nothing but a memory.</p>",
  status: 'For Hire',
  happiness: 20,
  endurance: 100,
  obedience: 30,
  charisma: 30,
  modesty: 60,
  intelligence: 30,
  constitution: 20,
  softLibido: 15,
  softExperience: 0,
  hardLibido: 30,
  hardExperience: 0,
  analLibido: 30,
  analExperience: 0,
  fetishLibido: 5,
  fetishExperience: 0,
  images: {
    basePath: "content/girls/Holo/images",
    base: "Base.png",
    refuse: ["Refuse1.jpg", "Refuse2.jpg", "Refuse3.jpg"],
    tired: ["Tired1.jpg", "Tired2.jpg", "Tired3.jpg", "Tired4.jpg"],
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg", "Soft5.jpg"],
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg", "Hard4.jpg", "Hard5.jpg", "Hard6.jpg"],
    anal: ["Anal1.jpg", "Anal2.jpg", "Anal3.jpg", "Anal4.jpg"],
    fetish: ["Fetish1.jpg", "Fetish2.jpg", "Fetish3.jpg", "Fetish4"],
    group: ["Group1.jpg", "Group2.jpg", "Group3.jpg", "Group4.jpg", "Group5.jpg", "Group6.jpg"],
    cleaning: ["Clean.jpg", "Clean2.jpg", "Clean3.jpg"],
    exercise: ["Exercise1.jpg", "Exercise2.jpg"],
    study: ["Study1.jpg", "Study2.jpg"],
    naked: ["Naked1.jpg", "Naked2.jpg", "Naked3.jpg", "Naked4.jpg"],
    prison: "Prison.jpg",
    tentacles: ["Tentacles1.jpg", "Tentacles2.jpg", "Tentacles3.jpg"],
    pregnant: "Pregnant.jpg"
  },
  specialRules: {
    dependentStats: {
      analLibido: { happiness: 1.5 },
      analExperience: { happiness: 1.5 }
    }
  },
  Actions: {
    Talk: $.extend(true, {
      variants: [
        { time: 'morning', likelyhood: 0.2, result: 'AnaruTour' },
        { time: 'evening', likelyhood: 0.2, result: 'AnaruEvening' }
      ],
      results: {
        Anaru1: {
          message: {
            group: 'Anaru',
            label: 'Talk',
            image: 'content/girls/Anaru/images/Talk1.jpg',
            text: "You pay a visit to Anaru's room at the <<- girl.building() ? girl.building().name : 'inn' >>. You knock, but there is no answer. Cracking the door to see if she's in, you see a flash of flesh - she's present, but very much in a state of undress. << if (girl.modesty > 15) { >>Anaru gasps and clutches at some nearby clothing in an attempt to cover herself quickly, but you have already seen everything. She is blushing intensely. <blockquote>Please knock!</blockquote> You wait outside and let her dress, but you're not surprised when you're not able to get much conversation out of her this visit.<< } else { >>Anaru smiles demurely, but she does not try to cover up. <blockquote>I'm not quite ready yet. Could I get you to wait just a couple of minutes more?</blockquote> You wait outside and let her dress, and when she invites you back in you find it difficult to give your full attention to the conversation.<< } >>"
          },
          girl: {
            obedience: 1.5,
            modesty: -1
          }
        },
        Anaru2: {
          message: {
            group: 'Anaru',
            label: 'Talk',
            image: 'content/girls/Anaru/images/Study1.jpg',
            text: "You spend the <<- time >> with Anaru, using the opportunity to ask her again about how she came to this country. She seems tired of the story, as though she's repeated it dozens of times, but she still manages to give you an abridged version. According to her, she was attending class one day when a mysterious man approached her and bowed at her feet, swearing fealty to her and offering her protection. Perhaps because of his presence, a giant crow attacked them both, and the man brought her through a shoku whirlpool to safety. She ended up this land, and when she lost track of him in a scuffle, she had to find employment with her transferable skills. Luckily, you offered her on-the-job training."
          },
          girl: {
            obedience: 2.5
          }
        },
        Anaru3: {
          message: {
            group: 'Anaru',
            label: 'Talk',
            image: 'content/girls/Anaru/images/Tired2.jpg',
            text: "When you pay a visit to Anaru's room, she bites her lip with uncertainty as she lets you in. You pay her a consistent daily rate regardless of what you have her do, and you neglected to let her know what was in store for this <<- time >>. She sits on the edge her bed with her eyes closed and her hands resting on her knees nervously. But her apprehension dissolves when you tell her that you're not there for an orgasm denial session. Instead, the two of you sit on the floor and chat and for a couple of hours. You play a few games and try a few jokes that are common where you're from, and eventually Anaru is in tears from laughter. By the end of the <<- time >>, you're both feeling a lot happier."
          },
          girl: {
            obedience: 1,
            happiness: 4
          }
        },
        AnaruTour: {
          message: {
            group: 'Anaru',
            label: 'Talk',
            image: 'content/girls/Anaru/images/Base.png',
            text: "You arrange to have an inexpensive horse-cart tour around the city to get Anaru more familiar with her new surroundings. Sure, walking is cheaper, but this is quicker and has the side benefit of impressing her somewhat - there are no horses where she comes from, it seems. Though she has seen some of the city already, she is clearly impressed as the cart driver takes you past a few of the grander buildings. She seems to radiate contentment when you ride through the park, and she blushes but attempts not to look away as you ride through the redlight district. And the end of the trip, you help her down from the cart and pay the driver. Hopefully it was somewhat educational for Anaru."
          },
          girl: {
            obedience: 1.5,
            happiness: 2
          },
          money: -10
        },
        AnaruEvening: {
          message: {
            group: 'Anaru',
            label: 'Talk',
            image: 'content/girls/Anaru/images/Tired1.jpg',
            text: "It's mid-afternoon, and you've yet to keep your appointment with Anaru. Running a business is a distracting undertaking. Still stuck in your room looking through the brothel's paperwork, you hear a knock at the door. Anaru whispers through the door to ask if you're there. You open the door a crack and can see her dimly in the windowless hallway. She is very aluring, and she seems disappointed when you tell her that you don't think that you'll be able to see her this evening. She nods as though she understands, but she leaves you with an open invitation.<blockquote>Come by my room any time. I would love to see you later tonight.</blockquote>"
          }
        }
      }
    }, Actions.Talk),
    HoloDebtAbducted: {
      label: 'Debt Slavery',
      group: 'Jobs',
      description: "Holo is working for the Medio Trading Company to pay off her debt.",
      gerund: 'being missing',
      conditions: {
        girl: {
          min: {
            specialRules: { HoloDebtAbducted: 1 }
          }
        }
      },
      allDay: true,
      awayFromHome: true,
      // Intentionally empty - do not interrupt.
      tags: {},
      variants: [
        {
          girl: { max: { specialRules: { debtAbduction: 2 }}},
          result: 'Day12'
        },
        {
          girl: { max: { specialRules: { debtAbduction: 4 }}},
          result: 'Day34'
        },
        {
          girl: { max: { specialRules: { debtAbduction: 5 }}},
          result: 'Day5'
        },
        {
          girl: { max: { specialRules: { debtAbduction: 7 }}},
          result: 'Day67'
        },
        {
          girl: { max: { specialRules: { debtAbduction: 9 }}},
          result: 'Day89'
        }
        // Day 10 just matches automatically.
      ],
      results: {
        Day12: {
          girl: {
            specialRules: {
              debtAbduction: 1
            },
            softLibido: -7,
            softExperience: 6,
            fetishLibido: -4,
            charisma: -6,
            happiness: -10,
            endurance: -20
          },
          message: {
            group: 'Holo',
            image: 'content/events/missing.jpg',
            label: 'Debt Slavery - Day <<- girl.specialRules.debtAbduction - 1 >>',
            text: "Holo is... somewhere. You assume she's still in the city, since ten days doesn't seem long enough to take her anywhere else and bring her back in time.",
            weight: -1
          }
        },
        Day34: {
          girl: {
            specialRules: {
              debtAbduction: 1
            },
            hardLibido: -5,
            hardExperience: 6,
            modesty: -7,
            happiness: -10,
            endurance: -20
          },
          message: {
            group: 'Holo',
            image: 'content/events/missing.jpg',
            label: 'Debt Slavery - Day <<- girl.specialRules.debtAbduction - 1 >>',
            text: "Holo is... somewhere. You assume she's still in the city, since ten days doesn't seem long enough to take her anywhere else and bring her back in time.",
            weight: -1
          }
        },
        Day5: {
          girl: {
            specialRules: {
              debtAbduction: 1
            },
            hardLibido: -5,
            hardExperience: 6,
            happiness: -10,
            endurance: -20,
            constitution: -6
          },
          mission: 'HoloAbductionEarlyEnd',
          message: {
            group: 'Holo',
            image: 'content/events/missing.jpg',
            label: 'Debt Slavery - Day <<- girl.specialRules.debtAbduction - 1 >>',
            text: "Holo is... somewhere. You assume she's still in the city, since ten days doesn't seem long enough to take her anywhere else and bring her back in time.",
            weight: -1
          }
        },
        Day67: {
          girl: {
            specialRules: {
              debtAbduction: 1
            },
            analLibido: -5,
            analExperience: 6,
            charisma: -4,
            happiness: -10,
            endurance: -20,
            constitution: -5
          },
          message: {
            group: 'Holo',
            image: 'content/events/missing.jpg',
            label: 'Debt Slavery - Day <<- girl.specialRules.debtAbduction - 1 >>',
            text: "Holo is... somewhere. You assume she's still in the city, since ten days doesn't seem long enough to take her anywhere else and bring her back in time.",
            weight: -1
          }
        },
        Day89: {
          girl: {
            specialRules: {
              debtAbduction: 1
            },
            fetishLibido: -7,
            fetishExperience: 6,
            intelligence: -9,
            happiness: -10,
            endurance: -20,
            constitution: -6
          },
          message: {
            group: 'Holo',
            image: 'content/events/missing.jpg',
            label: 'Debt Slavery - Day <<- girl.specialRules.debtAbduction - 1 >>',
            text: "Holo is... somewhere. You assume she's still in the city, since ten days doesn't seem long enough to take her anywhere else and bring her back in time.",
            weight: -1
          }
        },
        Day10: {
          message: {
            group: 'Holo',
            image: '<<- girl.image("tired") >>',
            label: 'Returned from Debt Slavery',
            text: "You're woken near midnight by the sound of someone collapsing outside your room. It's Holo, finally returned from her long absence. She looks, to be somewhat kind, like she's been through hell and back - a couple of bruises, hair in disarray and what look to be dried cum stains almost everywhere. It's... not a pleasant look, and you wonder how anyone could get off on reducing the once vital and vibrant wolf girl to such a state. It must have been as much vengeance for failing to pay as pleasure. She'll live - no serious injuries, as far as you can tell, but the past week and a half have been a low point in her life - hopefully the lowest she'll ever have to experience.",
            weight: -1
          },
          girl: {
            obedience: 20,
            charisma: -7,
            intelligence: -4,
            constitution: -6,
            happiness: -10,
            specialRules: {
              exclusivePlot: false,
              HoloDebtAbducted: false
            }
          },
          lock: false,
          mission: 'HoloDepartWait'
        }
      } // results
    } // debtAbduction
  }, // actions
  Events: {
    HoloVsShepherd: {
      tags: {
        market: 0.3
      },
      conditions: {
        time: 'morning',
        girl: {
          max: {
            specialRules: { ShepherdAnnoyance: 4 }
          }
        }
      },
      variants: [
        { girl: { max: { specialRules: { ShepherdAnnoyance: 1 }}}, result: 'Meeting1' },
        { girl: { max: { specialRules: { ShepherdAnnoyance: 2 }}}, result: 'Meeting2' },
        { girl: { max: { specialRules: { ShepherdAnnoyance: 3 }}}, result: 'Meeting3' }
      ],
      results: {
        Meeting1: {
          message: {
            group: 'Holo',
            label: 'Unfortunate Incident',
            image: 'content/girls/Holo/Nora1.jpg',
            text: 'Holo returns home in the <<- time >> escorted by a member of the city guard. It seems that she was the center of an... incident in the market, involving a flock of sheep and a very annoyed shepherdess who had to beat her off with a stick - literally. After you promise to take care of the issue, he leaves her in your care.<br><br>Holo alternates between chastized and defiant - defiant to your face, but sighing with drooping ears when she thinks you aren\'t looking.'
          },
          girl: {
            obedience: 2.5,
            endurance: -7,
            specialRules: { ShepherdAnnoyance: 1 }
          }
        },
        Meeting2: {
          message: {
            group: 'Holo',
            label: 'Another Incident...',
            image: 'content/girls/Holo/images/Refuse2.jpg',
            text: "Much to your annoyance, Holo has <em>again</em> returned home from the market accompanied by one of the guards - this time (being the third incident of the sort), you have to pay a fine to get her back. With an exasperated sigh, you ask her what exactly her problem is with sheep - and she'd better explain, or you'll take the fine out of her paycheck.<blockquote>I am Holo the Wise Wolf. It is therefor only natural that I should hate shepherds and attempt to take my rightful dues. I nearly had one this time, too.</blockquote>You roll your eyes and suggest that if she <em>absolutely must</em> have one of the sheep, she could do something crazy like pay for one, instead of howling and charging at the flock. She shakes her head - clearly you don't understand at all."
          },
          money: -75,
          girl: {
            obedience: -2,
            endurance: -6,
            specialRules: { ShepherdAnnoyance: 1 }
          }
        },
        Meeting3: {
          message: {
            group: 'Holo',
            label: 'More sheep?',
            image: 'content/girls/Holo/Enek.jpg',
            text: "You are almost surprised to see Holo returning home from the market unaccompanied and in a good mood. Her smirk gives you pause though - nothing good can come of this. You're about to ask what she's done this time, but she beats you to it.<blockquote>I did not do anything this time. But did you know that the fine for a dog attacking a \"human\" is more than twice the fine for a \"human\" attacking livestock?</blockquote>The smirk changes to a grin as she deposits a stack of coin neatly on the table. Then it transmutes slowly to a sour expression as she thinks back on the incident. <blockquote>I was <em>preparing</em> for another attempt when her dog attacked me first.</blockquote>"
          },
          money: 160,
          girl: {
            obedience: -2,
            endurance: -8,
            specialRules: { ShepherdAnnoyance: 1 }
          }
        },
        Meeting4: {
          message: [
            {
              group: 'Holo',
              label: 'Afternoon visit',
              image: 'content/girls/Holo/NoraHolo.jpg',
              text: "Holo returns from her trip to the market sooner than you expected - not alone or in trouble, but accompanied by a pretty young lady. You recognize her from Holo's descriptions - this is the shepherdess she keeps getting into trouble with. Why are they talking happily together then? Holo introduces you to Nora - she's polite and timid, but quite friendly, and you invite her to stay for a while."
            },
            {
              group: 'Holo',
              label: 'Afternoon visit',
              image: 'content/girls/Holo/Nora2.jpg',
              text: "She's hesitant to enter an establishment such as yours, but you wave aside her fears - nothing happens in here that one doesn't ask for, and besides, it would be rude to refuse tea. You and Nora get to know each other while Holo gets the tea ready. Time flies in her pleasant company, and it's only after half an hour that you wonder where Holo has gotten off to. You check the kitchen - she's nowhere to be found. On a hunch, you ask Nora where her herd is, and jumping to her feet, she leads you running out of the house."
            },
            {
              group: 'Holo',
              label: 'Afternoon visit',
              image: 'content/girls/Holo/Smirk.jpg',
              text: "The two of you arrive breathless at the market. As you suspected, Holo is sitting on the edge of the fence while the herd of sheep are pressed against the far wall of their small enclosure. She grins at your approach, picking her teeth. The shepherdess glares at your wolf-girl, who hops off the fence unconcerned and approaches the two of you with a fanged grin.<blockquote>No mere human is a match for Holo the Wise Wolf.</blockquote>Nora does a quick count - nothing missing. Fortunately, Holo seems to consider having outsmarted her good enough for a victory, and simply bought some mutton to enjoy. You apologize profusely as Holo saunters off - really, you had no idea what she was intending when she brought Nora over. You are easily forgiven - and hopefully proving that she <em>could</em> have had the whole flock was enough to keep Holo out of further trouble."
            }
          ],
          girl: { happiness: 10 }
        }
      }
    }
  },
  Missions: {
    HoloDebt: {
      conditions: {
        min: { girls: 3, money: 40000 },
        girl: {
          max: {
            specialRules: {
              exclusivePlot: 0,
              HoloDebtAbducted: 0
            }
          }
        },
        missions: { HoloDebt: -3 }
      },
      preDay: true,
      end: {
        min: { day: '+9' },
        max: { day: '+9' }
      },
      optionsInfo: {
        text: "You're woken around midnight by the sound of knocking, and find an envelope slid under your bedroom door. It contains a note and some fur clipped from Holo's tail. The note spells out clearly that Holo owes a substantial amount of money to Medio Trading Company, and the local branch has been authorized to take her into debt-slavery as part of that land's usury laws - it also contains a writ from the king of this place to collect, by any means necessary. Though she never let you know, it seems as though Holo's situation was much the same as your own when she arrived, and her creditors are far less understanding.<br><br>The note gives two options for paying the $30000 that Holo owes, the first of which invites you to pay her debt outright for her safe return and gives an address. Alternatively, Medio Trading Company intends to whore out Holo themselves, giving the assurance that they'll return Holo in ten days. You can only imagine what kind of conditions Holo would have to work in to make them $3000 daily, and it likely involves some particularly depraved jobs for high-paying clients, with little - if any - time for rest. The risk to Holo's health seems severe.",
        image: 'content/girls/Holo/images/Refuse1.jpg'
      },
      options: [
        {
          key: 'pay',
          label: "Pay Holo's Debt",
          title: "You don't much like the sound of this. It's a lot of money, but... better coins than blood and tears."
        },
        {
          key: "dontPay",
          label: "Don't Pay",
          title: "She got herself into this, and ten days isn't that long. She'll be back soon."
        }
      ],
      variants: function holoDebtVariants(context, done) {
        var results = this.base().results;
        if (this.option == "dontPay") {
          // We have to apply the progress special rule here, so that the girl meets the conditions for the action we want to set.
          context.girl.apply('specialRules', { HoloDebtAbducted: 1 });
          context.time = 'morning';
          var action = context.girl.action('HoloDebtAbducted', context);
          action.locked = true;
          context.girl.setAction(action);
        }
        done(results[this.option]);
      },
      results: {
        pay: {
          money: -30000,
          girl: {
            specialRules: { paidRansom: 30000 }
          },
          message: [
            {
              group: 'Holo',
              label: 'Debt Paid',
              image: 'content/miscImages/GuildHQ.jpg',
              text: "The price for paying Holo's debt is just a little more than that of a solid gold bar, the sort stamped with the King's mark and known as an absolute standard of worth more convenient for large transactions than a whole bag of coins. You take one of these from the Guild Hall, where much of your money is stored as credit (far less likely to get stolen that way, and it's a free service for licensed members). Taking the money to the address listed in the note, you are surprised to find it not far from the Guild Hall. You knock on the door - a peep-hole opens to ask your business, then the door when you explain what you're here for.",
              delta: false,
              weight: -2
            },
            {
              group: 'Holo',
              label: 'Debt Paid',
              image: 'content/girls/Holo/images/Prison.jpg',
              text: "Stepping inside, you're asked to wait a few minutes while someone with the authority to settle such sizable debts is found and brought out. He arrives with Holo in tow, bound and gagged but still expected to hobble along on her own power. She glares at her captor almost constantly while he verifies the money you brought - no wonder she's been gagged. You cut away the rope as soon as she's free again, but warn her with a look to stay quiet until you're outside - then again with strong words, when she opens her mouth, ready to let out some frustration immediately anyway.",
              weight: -2,
              delta: false
            },
            {
              group: 'Holo',
              label: 'Debt Paid',
              image: 'content/girls/Holo/images/Tired1.jpg',
              text: "<blockquote>Hmph. Don't just stand there, idiot, apologize! If you're glad I'm okay, you should have come far sooner.</blockquote> You attempt to calm her down a bit with an apology and fact that you came as soon as you could (as well as a reminder that you've just paid out a substantial amount of money on her account), but she's having none of it, sticking up her nose and turning her back on you, tail swishing agitatedly. Despite the brave face, you suspect that she's actually deeply hurt by forcing her debt on you, but unwilling to be vulnerable enough to talk about it.<blockquote>I'm not talking to you.</blockquote>",
              weight: -2
            }
          ],
          mission: 'HoloDepartWait'
        },
        dontPay: {
          message: {
            group: 'Holo',
            label: 'Debt Slavery',
            image: 'content/girls/Holo/images/Prison.jpg',
            text: "Well, she's gone. The note said ten days - you only hope they intend to keep their word, since you have no idea where to start looking - and don't really want to anger the king by going against the personal allowance the company that's abducted Holo has received from him. She'll be back on <strong>Day <<- g.day + 11 >>.</strong>"
          },
          girl: {
            specialRules: {
              exclusivePlot: 1,
              debtAbduction: 1
            }
          }
        }
      }
    },
    HoloAbductionEarlyEnd: {
      conditions: false,
      preDay: true,
      options: [
        {
          key: 'pay',
          label: "Pay Holo's Debt",
          title: "You don't much like the sound of this. It's a lot of money, but... better coins than blood and tears."
        },
        {
          key: "dontPay",
          label: "Don't Pay",
          title: "She got herself into this, and five more days isn't that long. She'll be back soon."
        }
      ],
      optionsInfo: {
        text: "You look again at the envelope containing Holo's whereabouts. It's been five days now, and your doubts are starting to creep in - is it right to leave her at the mercy of an uncaring debt-collection agency? You may take advantage of her to make some money, sure, and sometimes your trainings are a little hard, but you always care for your girls. $30000 - it's a lot of money, and you wouldn't expect them to reduce the amount, just because she's served half of their required time, but they should still be willing to take your cash and return her...",
        image: 'content/girls/Holo/images/Refuse1.jpg'
      },
      variants: function holoAbductionEarlyEndVariants(context, done) {
        var results = this.base().results;
        if (this.option == "pay") {
          // We have to apply the progress special rule here, so that the girl meets the conditions for the action we want to set.
          context.girl.apply('specialRules', { HoloDebtAbducted: false });
          var action = context.girl.action('Rest', context);
          context.girl.setAction(action);
        }
        done(results[this.option]);
      },
      results: {
        pay: {
          money: -30000,
          girl: {
            specialRules: { paidRansom: 30000 }
          },
          message: [
            {
              group: 'Holo',
              label: 'Debt Paid',
              image: 'content/miscImages/GuildHQ.jpg',
              text: "The price for paying Holo's debt is just a little more than that of a solid gold bar, the sort stamped with the King's mark and known as an absolute standard of worth more convenient for large transactions than a whole bag of coins. You take one of these from the Guild Hall, where much of your money is stored as credit (far less likely to get stolen that way, and it's a free service for licensed members). Taking the money to the address listed in the note, you are surprised to find it not far from the Guild Hall. You knock on the door - a peep-hole opens to ask your business, then the door when you explain what you're here for.",
              delta: false
            },
            {
              group: 'Holo',
              label: 'Debt Paid',
              image: 'content/girls/Holo/images/Prison.jpg',
              text: "Stepping inside, you're asked to wait a few minutes while someone with the authority to settle such sizable debts is found and brought out. He arrives with Holo in tow, bound and gagged but still expected to hobble along on her own power. She glares at her captor almost constantly while he verifies the money you brought - no wonder she's been gagged. You cut away the rope as soon as she's free again, but warn her with a look to stay quiet until you're outside - then again with strong words, when she opens her mouth, ready to let out some frustration immediately anyway.",
              delta: false
            },
            {
              group: 'Holo',
              label: 'Debt Paid',
              image: 'content/girls/Holo/images/Tired1.jpg',
              text: "<blockquote>I can name every person who has ever snubbed me, and now I have one more to add to the list. You! Idiot. You should have come to rescue me immediately.</blockquote> You attempt to calm her down a bit with an apology and fact that you did at least come eventually, but she's having none of it, sticking up her nose and turning her back on you, tail swishing agitatedly. Despite the brave face, you suspect that she's actually deeply hurt, but unwilling to be vulnerable enough to talk about it. <blockquote>You have no idea how humiliating that was.</blockquote>"
            }
          ],
          mission: 'HoloDepartWait'
        },
        dontPay: {
          // Nothing happens if they pass up this chance - action continues as normal.
        }
      }
    },
    HoloDepartWait: {
      conditions: false,
      end: { min: { day: '+60' }},
      results: { Depart: { mission: 'HoloDepart' }}
    },
    HoloDepart: {
      conditions: false,
      end: {
        min: { day: '+5' },
        max: { day: '+5' }
      },
      preDay: true,
      display: {
        group: 'Holo',
        label: 'Preparing to Depart',
        image: 'content/girls/Holo/Depart.jpg',
        text: "Though she tries to hide it, you can't help but notice that the amount of time Holo spends staring at the sky has increased noticeably in the past month. More than that though, you know she's been saving most of her wages, and her room has started to look sparser... as though she were getting rid of things she won't be able to take with her.<br><br><em>If you want Holo to stick around, make sure she has <<- __('happiness') >> 75 or higher by <strong>Day <<- mission.end.max.day >></strong>.</em>",
        weight: -1
      },
      optionsInfo: {
        text: "You step outside for an early morning walk when you run into Holo, dressed and packed as though she's going to be going on a long journey. You ask her where she's headed, and she replies that she's finally saved enough to continue her journey northward to her hometown of Yoitz. She's carrying everything she owns, including a ticket for passage on a ship sailing northward from the island today. You ask if she is intent on going now, and her reply is brief and bittersweet.<blockquote>There is no better time to part than when we wish to never leave.</blockquote>",
        image: 'content/girls/Holo/Depart.jpg'
      },
      options: [
        {
          key: 'begStay',
          label: 'Beg her to stay',
          title: "With \"wise words\" like that, there's no way to really wants to go."
        },
        {
          key: 'letLeave',
          label: 'Let her leave',
          title: "You wish her well - she's said from the beginning that her stay with you was only temporary, a stopover on her journey north."
        }
      ],
      variants: function holoDepartVariants(context, done) {
        context.ignore = false;
        if (this.option == 'begStay' && context.girl.happiness < 75) {
          this.option = 'letLeave';
          context.ignore = true;
        }
        var result = $.extend({}, context.mission.base().results[this.option]);
        if (this.option == 'letLeave') {
          result.money = context.girl.specialRules.paidRansom || 0;
          result.money += context.girl.hirePrice();
        }
        done(result);
      },
      results: {
        begStay: {
          message: {
            group: 'Holo',
            label: 'Sticking around',
            image: 'content/girls/Holo/images/Exercise2.jpg',
            text: "You plead with Holo to stay, promising every apple-based food you can think of. Holo shows no interest in food today, though she is clearly not fully resolved to leave. She hesitates a little, then expresses her real concern.<blockquote>I am tired of being alone. Loneliness is a disease that can lead to death. They might as well be the same thing.</blockquote>The loneliness is clear in her eyes. She may have a long list of clients, but what she craves is more companionship. You add spending more time with her to the list of food-related promises. Her ears perk up, and she gets a wry grin.<blockquote>I believe you to be much cuter when you are panicking. I am very pretty, so humans have been known to fall for me. I am Holo the Sage Wolf, and there will be plenty of time to look for my homeland when you are old and grey.</blockquote>She shoves her bag into your arms without warning and turns on her heel, back into the <<- girl.building() ? girl.building().name : 'inn' >>. Crisis averted, though you groan to think of exactly how much money it will cost to keep your apple-based promises.",
            weight: -2
          },
          girl: { happiness: 10 }
        },
        letLeave: {
          message: {
            group: 'Holo',
            label: 'A sad departure',
            image: 'content/girls/Holo/Depart2.jpg',
            text: "<<- ignore ? 'She doesn\'t seem to hear your pleas - or perhaps she doesn\'t wish to hear them as she' : 'Holo thanks you for your help and' >> walks away. You can't tell from behind what expression her face wears, but her ears droop low. You watch her until she walks around the corner, but she doesn't look back.<br><br>When you return to your room later that day, you find an envelope that has been slipped under your door. It contains Holo's heartfelt thanks, repayment of the money you originally paid to hire her<<- girl.specialRules.paidRansom ? ' along with the ransom money you paid to Medio Trading Company' : '' >>, and the following farewell.<blockquote>If tomorrow is better than today, and the day after that surpasses them both, time flies because you expect it to be like that forever. What happens when we reach the end of that perpetual journey? It will begin with a sense of dissatisfaction. That is why parting here is the right thing to do. I never want to stop giving thanks for the day we met.</blockquote>",
            weight: -2
          },
          // money added by variants function above
          girl: { status: 'Gone' }
        }
      }
    }
  } // missions
};
