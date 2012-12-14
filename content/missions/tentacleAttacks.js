Missions.tentacleAttackIntro = {
  label: 'Streets Unsafe',
  fetishes: {
    tentacles: true
  },
  // The description can again use replacement patterns to fill in information about the randomly generated people.
  description: "The streets are not safe. Tentacled monstrosities have been seen in town. The authorities are hunting them, but there have been attacks as they seek to breed. These monsters are cunning and wise, almost intelligent, but full of lust and the desire for human women. Be wary of sending girls into the city in the evening.<br><br>Some actions are safer than others - Streetwalking is relatively safe, since she will be searching crowded areas, while Exercise is less so - a girl jogging alone at night is a prefect target for the beasts.",
  // The day the event triggers on. More useful selectors will come later, but for now this is it.
  day: 7,
  // Only one variant for this event, so the "variants" option can be left out.
  // variants: [1],
  results: [
    {
      // Since one time events aren't associated with a particular girl, you must use an absolute path for the image.
      image: '/content/girls/Sophitia/images/Tentacles4.jpg'
      // Without a girl to pull data from or an action interrupted, the message can't have any replacement patterns in it. Told you one time events were simpler!

      // One time events can't have deltas either. There's no girl to apply them to.
    }
  ]
};