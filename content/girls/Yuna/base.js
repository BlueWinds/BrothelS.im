Girls.Yuna = {
  description: "A summoner with powerful allies, Yuna fled the devastation of her homeland by mysterious forces, arriving here some months ago. She initially sought to gather allies to return home and rescue her land, but with little money and everyone busy with their own problems, she's been getting desperate for a job. Any job.",
  status: {
      Town: 0.2,
      'For Hire': 0.8
      },
  stayChance: 0.8,
  happiness: 25,
  endurance: 65,
  obedience: 45,
  modesty: 60,
  charisma: 60,
  intelligance: 70,
  constitution: 20,
  'soft libido': 10,
  'soft experience': 15,
  'hard libido': 5,
  'hard experience': 0,
  'anal libido': 0,
  'anal experience': 0,
  'fetish libido': 15,
  'fetish experience': 5,
  images: {
    basePath: "content/girls/Yuna/images",
    base: "base.jpg",
    naked: ["naked1.jpg", "naked2.jpg"],
    tired: "rest1.jpg",
    soft: ["soft1.jpg", "soft2.jpg"],
    hard: ["hard1.jpg", "hard2.jpg", "hard3.jpg", "hard4.jpg", "hard5.jpg"],
    anal: ["anal1.jpg", "fetish2.jpg"],
    fetish: ["fetish1.jpg", "fetish2.jpg", "fetish3.jpg", "fetish4.jpg", "fetish5.jpg"],
    //study:
    //exercise:
    //prison:
    tentacles: ["tentacles1.jpg", "tentacles2.jpg", "tentacles3.jpg"],
    cleaning: ["clean1.jpg", "clean2.jpg"],
    refuse: ["refuse1.jpg", "refuse2.jpg"]
  },
  actions: {
    Summon: {
      label: 'Summon',
      group: 'Chores',
      description: 'Yuna will attempt to summon a creature from another world',
      mins: {
        endurance: 30
      },
      tags: {},
      variants: function(time, action) {
        if (g.fetishes.tentacles && Math.random() < 0.1) { return 5; }
        return Math.weightedRandom([0.4, 0.15, 0.15, 0.15, 0.15]);
      },
      results: [
        {
          image: 'base',
          message: 'Yuna failed to summon anything interesting. <<= Math.choice(["She couldn\'t concentrate, and managed nothing more than making herself tired.", "She did succeed in summoning a tiny little flame will-o-wisp, but it had nothing of value to offer.", "The spell was on the verge of success when she lost control, barely managing to prevent ane explosion of magic from destroying the area."]) >>',
          delta: {
            happiness: -5,
            endurance: -15
          }
        },
        {
          image: 'cleaning',
          message: "Yuna summoned an ethereal maid <<if (girl.building()) { >>that whisked around  up the <<= girl.building().name >>, cleaning up everything - it's never looked so sparkling!<< } else {>> - but since she doesn't have a permanent residence, its spent hours tidying up the alleyway and cleaning the street rather than doing anything useful.<< } >>",
          delta: {
            clean: 100,
            happiness: 10,
            endurance: -15
          }
        },
        {
          image: 'tired',
          message: 'Yuna summoned a spirit of life and healing. They spent several hours speaking of wild things, and by the time it faded away, she was invigorated and refreshed.',
          delta: {
            constitution: 2.5,
            endurance: 50,
            happiness: 20
          }
        },
        {
          image: 'base',
          message: 'Though the spirit she summoned initially claimed to be a mighty god, she soon realized it was not terribly powerful afterall - a god, yes, but the god of silver teaspoons. Not a very grand domain. She did get some very nice tea-sets out of the deal though - three of them. She sold two and kept one for herself.',
          delta: {
            money: 300,
            happiness: 10,
            endurance: -15
          }
        },
        {
          image: 'hard',
          message: "Rather than a god or helpful spirit, Yuna's summoning drew the attention of a demon - an incubus, to be precise. It broke free before she could bind it, and pinned her to the ground with unholy strength, slicing away her clothing with its razor-sharp tail. Rather than fiery as she'd expected, his touch was freezing. Her nipples went hard immediately, a scream dieing in her throat and replace by a gasp of pleasure as he licked at them and fingered her pussy. She shivered, and reached up expectantly - all thoughts of resistance had fled, replaced by a burning need to feel him inside.<br><br>Each orgasm he gave her only seemed to highten her desire for further sex. By the time the spell finally faded and he was forced to return to his own realm due to lack of energy, Yuna had nearly lost her mind with lust, panting and gasping and writhing in ecstasy. She was also nearly frozen - and it seems his touch has drawn out more than just body heat...",
          delta: {
            happiness: 10,
            endurance: -40,
            constitution: -7,
            'hard experience': 6,
            'hard libido': 5,
            'anal experience': 3,
            'anal libido': 5,
            'fetish experience': 3,
            'fetish libido': 5
          }
        },
        {
          image: ['base', 'tentacles'],
          message: [
            'Yuna summoned a goddess of plants and herbs, planning to discuss healing techniques with her. But things began to go wrong in the last few minutes of the ritual - healthy green flames darkened, and the scent of burning incense became noxious fumes. It was too late to abort though, and she completed the summoning. Rather than the healthy wooden and plant body she\'d expected, the goddess was somehow forced into a tangled mess of vines and roots. She appologized and was about to banish it when it decided an appology wasn\'t enough...',
            'The vines sprang to life, one trusting into her open mouth to prevent her completing the banishment, another around one ankle, lifting her upsidedown into the air. She gagged on the vine in her mouth, but it only pushed further in, down her throat. Helpless in midair, staff dropped in the initial panic, Yuna feared for her life. The misformed goddess was not gentle, fucking Yuna mercilessly. Eventually, Yuna passed out.<br><br>She awoke intact, but incredibly stiff and sore. Though they weren\'t aphrodesiac like those from a proper tenticle beast, at least the vines were slippery and smooth.'
          ],
          delta: {
            happiness: -10,
            endurance: -30,
            'anal experience': 10,
            'anal libido': -3,
            'fetish experience': 10,
            'fetish libido': -5
          }
        }
      ] // results
    } // Summon
  } // actions
};
