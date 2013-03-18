"use strict";
Girls.Holo = {
  description: "<p>Holo has a lovely figure, long flowing hair, wolf ears, and a beautiful brown tail with a splash of white at the end. She sometimes has to wear baggy clothing that hides her unusual features, though she dislikes this as she takes pride in her tail and takes special care of it, constantly combing and maintaining it. She is typically very haughty and self-sufficient and refers to herself as the \"Holo the Wise Wolf\". She is fond of delicious food and alcohol, but especially loves apples. Holo longs to return to Yoitz, her snowy homeland, and has made it this far north via a traveling merchant. Though reluctant, she's willing to work for you to raise the rest of the money she needs for her northern expedition.</p>",
  status: 'For Hire',
  happiness: 0,
  endurance: 100,
  obedience: 20,
  charisma: 30,
  modesty: 20,
  intelligence: 60,
  constitution: 60,
  softLibido: 20,
  softExperience: 10,
  hardLibido: 20,
  hardExperience: 40,
  analLibido: 10,
  analExperience: 0,
  fetishLibido: 10,
  fetishExperience: 20,
  images: {
    basePath: "content/girls/Holo/images",
    base: "Base.png",
    refuse: ["Refuse1.jpg", "Refuse2.jpg", "Refuse3.jpg", "Refuse4.jpg"],
    tired: ["Tired1.jpg", "Tired2.jpg", "Tired3.jpg", "Tired4.jpg"],
    drunk: ["Drunk1.jpg", "Drunk2.jpg"], // Evening rest
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg", "Soft5.jpg"],
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg", "Hard4.jpg", "Hard5.jpg", "Hard6.jpg"],
    anal: ["Anal1.jpg", "Anal2.jpg", "Anal3.jpg", "Anal4.jpg"],
    fetish: ["Fetish1.jpg", "Fetish2.jpg", "Fetish3.jpg"],
    group: "Group1.jpg",
    cleaning: ["Cleaning1.jpg", "Cleaning2.jpg"],
    exercise: ["Exercise1.jpg", "Exercise2.jpg", "Exercise3.jpg", "Exercise4.jpg", "Exercise5.jpg"],
    study: ["Study1.jpg", "Study2.jpg"],
    naked: ["Naked1.jpg", "Naked2.jpg", "Naked3.jpg", "Naked4.jpg", "Naked5.jpg"],
    prison: "Prison.jpg",
    tentacles: "Tentacles1.jpg",
    pregnant: "Pregnant.jpg"
  },
  specialRules: {
    dependentStats: {
      obedience: { obedience: -0.5 },
      softLibido: { softLibido: 0.5 },
      hardLibido: { hardLibido: 0.5 },
      analLibido: { analLibido: 0.5 }
    }
  },
  Actions: {
    Talk: $.extend(true, {}, Actions.Talk),
    Rest: $.extend(true, {}, Actions.Rest, {
      variants: [
        { time: 'morning' }
      ],
      results: [
        {
          message: {
            group: 'Holo',
            label: 'Rest',
            image: '<<- girl.image("tired") >>',
            text: 'Holo took some time off to recover, sleeping in until almost lunchtime.'
          },
          girl: {
            endurance: 16,
            happiness: 1
          }
        },
        {
          message: {
            group: 'Holo',
            label: 'Rest',
            image: '<<- girl.image("drunk") >>',
            text: 'Holo took some time off to recover, and inevitably headed to the local tavern. Many beers later, she staggered back to her room, announcing loudly her intentions to experiment more with this so-called "<<- Math.choice(["vodka", "whisky", "mead", "rum", "gin"]) >>".'
          },
          girl: {
            endurance: 8,
            happiness: 5
          }
        }
      ]
    }),
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
          girl: { max: { specialRules: { debtAbduction: 2 } } }
        },
        {
          girl: { max: { specialRules: { debtAbduction: 4 } } }
        },
        {
          girl: { max: { specialRules: { debtAbduction: 5 } } }
        },
        {
          girl: { max: { specialRules: { debtAbduction: 7 } } }
        },
        {
          girl: { max: { specialRules: { debtAbduction: 9 } } }
        }
        // Day 10 just matches automatically.
      ],
      results: [
        { // Days 1-2
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
        { // Days 3-4
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
        { // Day 5
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
        { // Days 6-7
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
        { // Days 8-9
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
        { // Day 10
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
              exclusivePlot: false
            }
          },
          lock: false,
          mission: 'HoloDepartWait'
        }
      ] // results
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
        { girl: { max: { specialRules: { ShepherdAnnoyance: 1 }}}},
        { girl: { max: { specialRules: { ShepherdAnnoyance: 2 }}}},
        { girl: { max: { specialRules: { ShepherdAnnoyance: 3 }}}}
      ],
      results: [
        {
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
        {
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
        {
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
        {
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
      ]
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
        }
      },
      end: {
        min: { day: '+9' },
        max: { day: '+9' }
      },
      variants: function(context, done) {
        var results = this.base().results;
        var text = "You're woken around midnight by the sound of knocking, and find an envelope slid under your bedroom door. It contains a note and some fur clipped from Holo's tail. The note spells out clearly that Holo owes a substantial amount of money to Medio Trading Company, and the local branch has been authorized to take her into debt-slavery as part of that land's usury laws - it also contains a writ from the king of this place to collect, by any means necessary. Though she never let you know, it seems as though Holo's situation was much the same as your own when she arrived, and her creditors are far less understanding.<br><br>The note gives two options for paying the $30000 that Holo owes, the first of which invites you to pay her debt outright for her safe return and gives an address. Alternatively, Medio Trading Company intends to whore out Holo themselves, giving the assurance that they'll return Holo in ten days. You can only imagine what kind of conditions Holo would have to work in to make them $3000 daily, and it likely involves some particularly depraved jobs for high-paying clients, with little - if any - time for rest. The risk to Holo's health seems severe.";
        var options = {
          "Pay Holo's debt": "You don't much like the sound of this. It's a lot of money, but... better dollars than blood and tears.",
          "Don't Pay": "She got herself into this, and ten days isn't that long. She'll be back soon."
        };
        Game.getUserInput(text, 'content/girls/Holo/images/Refuse1.jpg', options, function(answer) {
          if (answer == "Don't Pay") {
            // We have to apply the progress special rule here, so that the girl meets the conditions for the action we want to set.
            context.girl.apply('specialRules', { HoloDebtAbducted: 1 });
            context.time = 'morning';
            var action = context.girl.action('HoloDebtAbducted', context);
            action.locked = true;
            context.girl.setAction(action);
          }
          done(results[answer]);
        });
      },
      results: {
        "Pay Holo's debt": {
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
        "Don't Pay": {
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
      variants: function(context, done) {
        var results = this.base().results;
        var text = "You look again at the envelope containing Holo's whereabouts. It's been five days now, and your doubts are starting to creep in - is it right to leave her at the mercy of an uncaring debt-collection agency? You may take advantage of her to make some money, sure, and sometimes your trainings are a little hard, but you always care for your girls. $30000 - it's a lot of money, and you wouldn't expect them to reduce the amount, just because she's served half of their required time, but they should still be willing to take your cash and return her...";
        var options = {
          "Pay Holo's debt": "You don't much like the sound of this. It's a lot of money, but... better dollars than blood and tears.",
          "Don't Pay": "She got herself into this, and five more days isn't that long. She'll be back soon."
        };
        Game.getUserInput(text, 'content/girls/Holo/images/Refuse1.jpg', options, function(answer) {
          if (answer == "Pay Holo's debt") {
            // We have to apply the progress special rule here, so that the girl meets the conditions for the action we want to set.
            context.girl.apply('specialRules', { HoloDebtAbducted: false });
            var action = context.girl.action('Rest', context);
            context.girl.setAction(action);
          }
          done(results[answer]);
        });
      },
      results: {
        "Pay Holo's debt": {
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
        "Don't Pay": {
          // Nothing happens if they pass up this chance - action continues as normal.
        }
      }
    },
    HoloDepartWait: {
      conditions: false,
      end: { min: { day: '+30' }},
      results: [{ mission: 'HoloDepart' }]
    },
    HoloDepart: {
      conditions: false,
      end: {
        min: { day: '+5' },
        max: { day: '+5' }
      },
      display: {
        group: 'Holo',
        label: 'Preparing to Depart',
        image: 'content/girls/Holo/Depart.jpg',
        text: "Though she tries to hide it, you can't help but notice that the amount of time Holo spends staring at the sky has increased noticeably in the past month. More than that though, you know she's been saving most of her wages, and her room has started to look sparser... as though she were getting rid of things she won't be able to take with her.<br><br><em>If you want Holo to stick around, make sure she has <<- _('happiness') >> 75 or higher by <strong>Day <<- mission.end.max.day >></strong>.</em>",
        weight: -1
      },
      variants: function(context, done) {
        var text = "You step outside for an early morning walk when you run into Holo, dressed and packed as though she's going to be going on a long journey. You ask her where she's headed, and she replies that she's finally saved enough to continue her journey northward to her hometown of Yoitz. She's carrying everything she owns, including a ticket for passage on a ship sailing northward from the island today. You ask if she is intent on going now, and her reply is brief and bittersweet.<blockquote>There is no better time to part than when we wish to never leave.</blockquote>";
        var options = {
          'Beg her to stay': "With \"wise words\" like that, there's no way to really wants to go.",
          'Let her leave': "You wish her well - she's said from the beginning that her stay with you was only temporary, a stopover on her journey north."
        };
        Game.getUserInput(text, 'content/girls/Holo/Depart.jpg', options, function(answer) {
          if (answer == 'Beg her to stay' && context.girl.happiness < 75) {
            answer = 'Let her leave';
          }
          var result = $.extend({}, context.mission.base().results[answer]);
          if (answer == 'Let her leave') {
            result.money = context.girl.specialRules.paidRansom || 0;
            result.money += context.girl.hirePrice();
          }
          done(result);
        });
      },
      results: {
        'Beg her to stay': {
          message: {
            group: 'Holo',
            label: 'Sticking around',
            image: 'content/girls/Holo/images/Exercise2.jpg',
            text: "You plead with Holo to stay, promising every apple-based food you can think of. Holo shows no interest in food today, though she is clearly not fully resolved to leave. She hesitates a little, then expresses her real concern.<blockquote>I am tired of being alone. Loneliness is a disease that can lead to death. They might as well be the same thing.</blockquote>The loneliness is clear in her eyes. She may have a long list of clients, but what she craves is more companionship. You add spending more time with her to the list of food-related promises. Her ears perk up, and she gets a wry grin.<blockquote>I believe you to be much cuter when you are panicking. I am very pretty, so humans have been known to fall for me. I am Holo the Sage Wolf, and there will be plenty of time to look for my homeland when you are old and grey.</blockquote>She shoves her bag into your arms without warning and turns on her heel, back into the <<- girl.building() ? girl.building().name : 'inn' >>. Crisis averted, though you groan to think of exactly how much money it will cost to keep your apple-based promises.",
            weight: -2
          },
          girl: { happiness: 10 }
        },
        'Let her leave': {
          message: {
            group: 'Holo',
            label: 'A sad departure',
            image: 'content/girls/Holo/Depart2.jpg',
            text: "<<- mission.special.ignore ? 'She doesn\'t seem to hear your pleas - or perhaps she doesn\'t wish to hear them as she' : 'Holo thanks you for your help and' >> walks away. You can't tell from behind what expression her face wears, but her ears droop low. You watch her until she walks around the corner, but she doesn't look back.<br><br>When you return to your room later that day, you find an envelope that has been slipped under your door. It contains Holo's heartfelt thanks, repayment of the money you originally paid to hire her<<- girl.specialRules.paidRansom ? ' along with the ransom money you paid to Medio Trading Company' : '' >>, and the following farewell.<blockquote>If tomorrow is better than today, and the day after that surpasses them both, time flies because you expect it to be like that forever. What happens when we reach the end of that perpetual journey? It will begin with a sense of dissatisfaction. That is why parting here is the right thing to do. I never want to stop giving thanks for the day we met.</blockquote>",
            weight: -2
          },
          // money added by variants function above
          girl: { status: 'Gone' }
        }
      }
    }
  } // missions
};

Girls.Holo.Actions.Talk.results._append([
  {
    message: {
      group: 'Holo',
      label: 'Talk',
      image: 'content/girls/Holo/images/Talk1.jpg',
      text: "You spend the better part of the <<- time >> trying to learn more about Holo's past, her hometown, her upbringing - anything that might help you understand her. She responds to all of your questions, but she expertly keeps the actual answers to herself. The more she conceals, the more you want to learn, but she seems to be playing with you, seeing how much she can say without actually revealing anything. She slips adages into conversation that sound like veiled advice.<blockquote>A trip is the most fun before one sets out on it. With dogs, the bark and not the bite is more frightening, and women are almost always prettier when they are shrouded in mystery.</blockquote>"
    },
    girl: {
      obedience: 1.5
    }
  },
  {
    message: {
      group: 'Holo',
      label: 'Talk',
      image: 'content/girls/Holo/images/Refuse3.jpg',
      text: "You and Holo head to a nearby tavern for <<- time == 'morning' ? 'lunch' : 'dinner' >>, and she clings to your arm on the way in excitement. When you're inside, you take a seat and call the barmaid over. You tell Holo you'll order her <<- time == 'morning' ? 'honeyed peaches' : 'as much beer as she can drink' >> if she will ask for it with a please. Holo crosses her arms and tries to get your sympathy with an injured expression. The barmaid sees your shaking head and moves on to wait on other tables. Though it takes almost ten minutes, you get eventually get your please and she gets her <<- time == 'morning' ? 'peaches' : 'beer' >>."
    },
    girl: {
      obedience: 2.5
    },
    money: -5
  },
  {
    message: {
      group: 'Holo',
      label: 'Talk',
      image: 'content/girls/Holo/images/Talk2.jpg',
      text: "You knock on the closed door of Holo's room. A moment later she asks you to come in, just finishing getting dressed, and you see a little more of her than you expected. You start to say something, but she silences the objection with a wave of one hand, Holo dismissing such thoughts as prudish. You both sit on her bed, and you ask her how she's doing at finding her way around Valaia and how she's finding life in general. She has no interest in talking about herself, and instead spends a great deal of effort trying to learn about your history while feigning disinterest. The conversation is enjoyable, even if not very productive."
    },
    girl: {
      obedience: 1,
      happiness: 2
    }
  },
  {
    message: {
      group: 'Holo',
      label: 'Talk',
      image: 'content/girls/Holo/images/Exercise2.jpg',
      text: "You and Holo go for a walk through the marketplace, <<- time == 'morning' ? 'which is bustling with people' : 'still busy despite the late hour' >>. A lovely dress for sale catches your eye, and though Holo's ear twitch and she looks at you hopefully, you don't stop. When pressed, you tell her that someone with a tail like hers doesn't need a dress to be noticed. She seems satisfied with that, but adds more.<blockquote>I know it's difficult to look past my brilliant tail, brain, and looks, but I also have excellent ears and eyes.</blockquote>"
    },
    girl: {
      obedience: 1.5,
      happiness: 2.5
    }
  },
  {
    message: {
      group: 'Holo',
      label: 'Talk',
      image: 'content/girls/Holo/images/Talk2.jpg',
      text: "You and Holo go for a walk, and you take time to point out the other girls in her profession, hoping that she might pick up some tips from their expertise. Instead, she folds her arms and gets inexplicably cross. You continue your walk into busier streets to see if that helps, but it still take a while to extract the reason for her annoyance.<blockquote>It appears that humans see nothing wrong with paying attention to more than one female at once.</blockquote>"
    }
  }
]);
