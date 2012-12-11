define([], [
  {
    _id: 'tentacleAttack',
    label: 'Tentacle Attack!',
    tags: {
      outdoors: true,
      tentacles: true,
      dangerous: true
    },
    time: 'evening',
    disruptive: true,
    minDay: 7,
    likelyhood: 0.2,
    chances: [ 0.33, 0.34, 0.33 ],
    image: ['tentacles', 'tentacles', 'tentacles'],
    message: [
      "<%= girl.name %> was heading into the city to <%= action.label %>, hurrying along a narrow street. The lamps seems spaced oddly far apart - and a moment later she can tell she was right be worried.<br><br>Several tentacles quickly lash out and wrap themselves around <%= girl.name %>. Quickly they drag into a tiny alley. Abruptly, with no foreplay or ceremony at all, the tentacles thrust straight into her pussy, ripping through her panties seemingly without resistance. She screams out expecting pain, but it's muffled by another appendage in her mouth, and the pain never comes - the tentacles are lubricated well, and cause her to orgasm almost immediately.<br><br>Unable to call out for help or move in the slightest, <%= girl.name %>'s ass and pussy are used mercilessly for an hour and a half until, at the sound of someone else approaching, the beast soundlessly withdraws down the sewer grate. She lays in a daze for several minutes before hurrying home.",
      "<%= girl.name %> was on her way to <%= action.label %> when she trips, sprawling out across the cobblestones. Before she can react, she's bound by the wrists and ankles, gagged tightly, and dragged over the edge into a nearby canal. There, under a bridge and out of sight of passerby, a shape she can't quite see suspends her from the ceiling.<br><br>The creature is surprisingly gently, carressing her as it discards her clothing. It probes at her mouth, but she won't open - her ass and pussy offer no such resistance. Despite the danger, its gentle touches arouse <%= girl.name %>, and she can hardly control herself from moaning out in pleasure when it finally gets around to fucking her. It never lets her orgasm, despite the hours of teasing driving her mad with pleasure - and when it's finally satisfied and withdraws, she masturbates wildly under the bridge, leaving the stones slick with a mix of her own juices and the creature's slime.",
      "<%= girl.name %> is minding her own business on a park bench, taking a short break when something briefly blots out the <%= time == 'morning' ? 'sun' : 'moon' %>, and she's lifted off her feet. Passerby point and stare as she's lifted to the top of a nearby building, her clothing dropping to the ground as the creature roughly shreds it.<br><br>She's suspended there, naked, in plain sight of dozens as the creature slides a huge tentacle into her pussy - and an even larger one into her ass, causing her to moan in a combination of lust and pain. Her screams are finally silenced when another massive limb fills her throat.<br><br>It's not long before a seemingly endless stream of cum floods her womb, bowels and stomach with a sticky, delicious white substance. She moans and licks her lips in an attempt to coax more out - successfully. Her belly begins to swell obscenely.<br><br>Finally the city guard arrives to drive the creature off. <%= girl.name %> is no use - she just moans and orgasms repeatedly as arrows fly around her to pinion the things wings and finally kill it. She lays shuddering, still lost in lust and bliss as the guards return her to your care."
    ],
    delta: [
      {
        endurance: -40,
        happiness: -5,
        intelligence: -4,
        'hard libido': 3,
        'anal libido': 3,
        'hard experience': 5,
        'anal experience': 5
      },
      {
        endurance: -40,
        happiness: 3,
        intelligence: -4,
        'soft libido': 6,
        'soft experience': 8
      },
      {
        endurance: -40,
        happiness: -7,
        intelligence: -4,
        'anal libido': 3,
        'fetish libido': 3,
        'anal experience': 5,
        'fetish experience': 5
      }
    ]
  },
  {
    _id: 'tentacleAttackIntro',
    label: 'Streets Unsafe',
    tags: {
      tentacles: true
    },
    time: 'morning',
    day: 7,
    image: 'content/girls/Sophitia/images/Tentacles4.jpg',
    message: "The streets are not safe. Tentacle monstrosities have been seen in town. The authorities are hunting them, but there have been attacks as they seek to breed. These monsters are cunning and wise, almost intelligent, but full of lust and the desire to breed. Be wary of sending girls into the city in the evening.<br><br>Some actions are safer than others - Streetwalking is relatively safe, since the girl will be searching crowded areas, while Exercise is less so - a girl jogging alone at night is a prefect target for the beasts."
  }
]);