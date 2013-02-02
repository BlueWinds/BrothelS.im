Events.tentacleAttack = {
  conditions: {
    fetishes: { tentacles: true },
    missions: { tentacleAttackIntro: 2 },
    time: 'evening'
  },
  tags: {
    slums: 0.07,
    docks: 0.1,
    market: 0.02,
    redlight: 0.02,
    university: 0.02
  },
  variants: [ 0.33, 0.34, 0.33 ],
  results: [
    {
      message: {
        group: '<<- girl.name >>',
        image: '<<- girl.image("tentacles") >>',
        label: 'Attacked by Tentacles',
        text: "<<= girl.name >> was heading into the city to <<= action.label >>, hurrying along a narrow street. The lamps seemed spaced oddly far apart - and a moment later she could tell she was right be worried.<br><br>Several tentacles quickly lashed out and wrapped themselves around <<= girl.name >>. Quickly they dragged into a tiny alley. Abruptly, with no foreplay or ceremony at all, the rope-like vines thrust into her, ripping through her panties seemingly without resistance on their way to her intimate areas. She screamed out, expecting pain, but it was muffled twofold, first by another appendage in her mouth, and second by a burst of ecstasy that left stars in her eyes. The creature didn't wait for her to recover, intent on its own pleasure - its limbs were well lubricated, slipping in and out in an increasing crescendo.<br><br>Unable to call out for help or move in the slightest, <<= girl.name >>'s ass and pussy were used mercilessly for an hour and a half. Finally, at the sound of someone else approaching, the beast soundlessly withdrew down the sewer grate. The footsteps never reached her - whoever it was must have had better sense than to approach a dark ally at night. She lay in a senseless daze for several minutes before picking herself up and hurrying home."
      },
      girl: {
        endurance: -40,
        happiness: -5,
        intelligence: -4,
        analLibido: 3,
        analExperience: 5,
        obedience: 5
      }
    },
    {
      message: [
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("tentacles") >>',
          label: 'Attacked by Tentacles',
          text: "<<= girl.name >> was minding her own business on a park bench, taking a short break when something briefly blotted out the <<= time == 'morning' ? 'sun' : 'moon' >>, and she was lifted off her feet without even time for a scream. Passersby pointed and yelled helplessly as she was lifted to the top of a nearby building, her clothing dropping to the ground as the creature roughly shredded it with a seemingly endless stream of whipcord appendages.<br><br>She was suspended there, naked, in plain sight of dozens as the birdlike creature perched on the roof of a building, seemingly not even noticing her weight or struggles. The instant it had removed the last article of her clothing, panties dropping several stories to the ground below, it slid a huge tentacle into her pussy - and an even larger one into her ass, causing her to moan in a combination of lust and pain. Her screams were finally silenced when another massive limb filled her throat.",
          delta: false
        },
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("tentacles") >>',
          label: 'Attacked by Tentacles',
          text: "It wasn't long before a seemingly endless stream of cum flooded her womb, bowels and stomach. Delirious with lust, she moaned and licked her lips in an attempt to coax out more of the delicious, sticky white substance - successfully. Her belly began to swell obscenely.<br><br>Finally the city guard arrived to drive the creature off. <<= girl.name >> was no use - she just moaned and orgasmed repeatedly as arrows flew around her to pinion the thing's wings to the roof and finally kill it. She lay shuddering, still lost in lust and bliss, suspended in midair by the dead beast's impaling limbs. Finally the guards managed to reach the roof and free her."
        }
      ],
      girl: {
        endurance: -40,
        happiness: 3,
        intelligence: -6,
        fetishLibido: 6,
        fetishExperience: 5,
        modesty: -8,
        obedience: 3
      }
    },
    {
      message: {
        group: '<<- girl.name >>',
        image: '<<- girl.image("tentacles") >>',
        label: 'Attacked by Tentacles',
        text: "<<= girl.name >> was on her way to <<= action.label >> when she tripped, sprawling out across the cobblestones. Before she could react, she was bound by the wrists and ankles, gagged tightly across the mouth, and dragged over the edge into a nearby canal with an almost soundless splash. There, under a bridge and out of sight of passersby, a shape she couldn't quite see suspended her from the ceiling.<br><br>The creature was surprisingly gently, caressing her as it discarded her clothing slowly, almost sensuously, somehow removing even her bra without damaging it. It probed at her mouth, but she didn't open - her ass and pussy offered no such resistance. Despite the danger, its gentle touches aroused <<= girl.name >>, and she could hardly control herself from moaning out in pleasure when it finally began to penetrate and make love to her. It never let her orgasm, despite hours of teasing driving her mad with pleasure - and when it finally satisfied its desire for her juices and withdraw, she masturbated wildly under the bridge, leaving the stones slick with a mix of her own cum and the creature's slime."
      },
      girl: {
        endurance: -20,
        happiness: -3,
        intelligence: -2,
        softLibido: 6,
        softExperience: 8,
        obedience: 3
      }
    }
  ]
};
