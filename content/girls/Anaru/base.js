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
        { girl: { min: { specialRules: { talk: 4 }}}, result: 'AnaruDirections' },
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
            modesty: -1,
            specialRules: { talk: 1 }
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
            obedience: 2.5,
            specialRules: { talk: 1 }
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
            happiness: 4,
            specialRules: { talk: 1 }
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
            happiness: 2,
            specialRules: { talk: 1 }
          },
          money: -10
        },
        AnaruEvening: {
          message: {
            group: 'Anaru',
            label: 'Talk',
            image: 'content/girls/Anaru/images/Tired1.jpg',
            text: "It's mid-afternoon, and you've yet to keep your appointment with Anaru. Running a business is a distracting undertaking. Still stuck in your room looking through the brothel's paperwork, you hear a knock at the door. Anaru whispers through the door to ask if you're there. You open the door a crack and can see her dimly in the windowless hallway. She is very aluring, and she seems disappointed when you tell her that you don't think that you'll be able to see her this evening. She nods as though she understands, but she leaves you with an open invitation.<blockquote>Come by my room any time. I would love to see you later tonight.</blockquote>"
          },
          girl: {
            obedience: 1,
            specialRules: { talk: 1 }
          }
        },
        AnaruDirections: {
          message: {
            group: 'Anaru',
            label: 'Talk',
            image: 'content/girls/Anaru/missions/Directions.jpg',
            text: "You and Anaru spend the <<- time >> taking a walk around the city. Most of the trip is uncomfortably silent, but Anaru speaks up when the two of you are passing through an area near the garrison that seems isolated today.<blockquote>I always give in to peer pressure.</blockquote>She confides this in you with no context, and it's not clear if this is catharsis, a warning, an invitation, or otherwise. From her downcast eyes, you're not sure if she's entirely certain either. Perhaps this distance from home has given her an opportunity to examine herself."
          },
          girl: {
            endurance: -4,
            happiness: -2,
            specialRules: { talk: 1 }
          }
        }
      }
    }, Actions.Talk)
  }, // actions
  Events: {
    MeetJiraiya: {
      tags: {
        redlight: 0.7
      },
      conditions: {
        missions: { AnaruDirections1: 1 },
        ownerParticipation: true
      },
      results: { done: {
        message: {
          group: 'Anaru',
          label: 'Talk',
          image: 'content/girls/Anaru/missions/.jpg',
          text: "Anaru seems excited today. You're about to head out for the morning when she bursts into your room, practically bubbling with excitement,<blockquote>Did I ever tell about my childhood friend, Menma? I haven't seen her for years, but one of the weaving girls told me she thinks she saw her! Menma stands out because of her silvery blonde hair. Apparently she has a place just near the onsen. As soon as you're free, could we please look for around there?</blockquote>Perhaps <strong>exploring the Redlight District</strong> (where the Onsen is located) with Anaru will be worthwhile. It would certainly make her happy.",
          weight: -1
        }
      }}
    }
  },
  Missions: {
    AnaruDirections1: {
      conditions: {
        girl: { min: { specialRules: { talk: 5 }}}
      },
      display: {
        group: 'Anaru',
        label: 'Talk',
        image: 'content/girls/Anaru/images/Directions.jpg',
        text: "Anaru seems excited today. You're about to head out for the morning when she bursts into your room, practically bubbling with excitement,<blockquote>Did I ever tell about my childhood friend, Menma? I haven't seen her for years, but one of the weaving girls told me she thinks she saw her! Menma stands out because of her silvery blonde hair. Apparently she has a place just near the onsen. As soon as you're free, could we please look for around there?</blockquote>Perhaps <strong>exploring the Redlight District</strong> (where the Onsen is located) with Anaru will be worthwhile. It would certainly make her happy.",
        weight: -1
      }
    }
  } // missions
};
