Girls.Yuna = {
  description: "A summoner with powerful allies, Yuna fled the devastation of her homeland by mysterious forces, arriving here some months ago. She initially sought to gather allies to return home and rescue her land, but with little money and everyone busy with their own problems, she's been getting desperate for a job. Any job.",
  status: 'For Hire',
  happiness: 25,
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
    base: "base.jpg",
    naked: ["naked1.jpg", "naked2.jpg"],
    tired: "Tired1.jpg",
    soft: ["soft1.jpg", "soft2.jpg"],
    hard: ["hard1.jpg", "hard2.jpg", "hard3.jpg", "hard4.jpg", "hard5.jpg"],
    anal: ["anal1.jpg", "fetish2.jpg"],
    fetish: ["fetish1.jpg", "fetish2.jpg", "fetish3.jpg", "fetish4.jpg"],
    group: ["Group1.jpg", "Group2.jpg", "Group3.jpg"],
    study: "Study1.jpg",
    exercise: ["Exercise1.jpg", "Exercise2.jpg"],
    prison: "Prison.jpg",
    tentacles: ["tentacles1.jpg", "tentacles2.jpg", "tentacles3.jpg"],
    cleaning: ["clean1.jpg", "clean2.jpg"],
    refuse: ["refuse1.jpg", "refuse2.jpg"]
  },
  Actions: {
    Talk: $.extend(true, Actions.Talk, {
      results: [
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
            image: 'content/girls/Yuna/images/base.jpg',
            text: "You and Yuna sit out on the front steps of the <<- girl.building() ? girl.building.name() : 'inn' >>, watching traffic pass and listening to the sounds of the busy city. You ask her if she's enjoying her work here - she agrees that it's fun sometimes. You ask about the customers she's serviced lately - she sighs and rolls her eyes. Not the best behavior. You confiscate her top and pull her bra down around her waist as punishment, right there in public. She gets red, but you refuse to let her fix it for half an hour."
          },
          girl: {
            obedience: 2,
            modesty: -1,
            happiness: -3,
            endurance: -5
          }
        }
      ].concat(Actions.Talk.results)
    }),
    Summon: {
      label: 'Summon',
      group: 'Chores',
      description: 'Yuna will attempt to summon a creature from another world.',
      enableConditions: {
        girl: {
          min: { endurance: 30 }
        }
      },
      variants: [
        { fetishes: { tentacles: true }, likelyhood: 0.1 },
        0.4, 0.15, 0.15, 0.15, 0.15
      ],
      results: [
        {
          message: [
            {
              label: 'Summon',
              group: '<<- girl.name >>',
              image: '<<- girl.image() >>',
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
            fetishLibido: -5
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
            endurance: -15
          }
        },
        {
          message: {
            label: 'Summon',
            group: '<<- girl.name >>',
            image: '<<- girl.image("cleaning") >>',
            text: "Yuna summoned an ethereal maid <<if (girl.building()) { >>that whisked around  up the <<= girl.building().name >>, cleaning up everything - it's never looked so sparkling!<< } else {>> - but since she doesn't have a permanent residence, it spent hours tidying up the alleyway and cleaning the street rather than doing anything useful.<< } >>"
          },
          girl: {
            building: {
              clean: 100
            },
            happiness: 10,
            endurance: -15
          }
        },
        {
          message: {
            label: 'Summon',
            group: '<<- girl.name >>',
            image: '<<- girl.image("tired") >>',
            text: "Yuna summoned a spirit of life and healing. They spent several hours speaking of wild things, and by the time it faded away she was invigorated and refreshed."
          },
          girl: {
            constitution: 2.5,
            endurance: 50,
            happiness: 20
          }
        },
        {
          message: {
            label: 'Summon',
            group: '<<- girl.name >>',
            image: '<<- girl.image() >>',
            text: 'Though the spirit she summoned initially claimed to be a mighty god, she soon realized it was not terribly powerful afterall - a god, yes, but the god of silver teaspoons. Not a very grand domain. She did get some very nice tea-sets out of the deal though - three of them. She sold two and kept one for herself.'
          },
          girl: {
            money: 300,
            happiness: 10,
            endurance: -15
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
            fetishLibido: 5
          }
        }
      ] // results
    } // Summon
  } // actions
};
