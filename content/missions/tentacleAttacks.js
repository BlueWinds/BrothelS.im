"use strict";
Missions.tentacleAttackIntro = {
  display: {
    label: 'Streets Unsafe',
    group: 'Streets Unsafe',
    image: 'content/girls/Sophitia/images/Tentacles4.jpg',
    text: "The streets are not safe. Tentacled monstrosities have been seen in town. The authorities are hunting them, but there have been attacks as they seek to breed. These monsters are cunning and streetwise, almost intelligent, but full of lust and the desire for human women. Be wary of sending girls into the city in the evening.<br><br>Some actions are safer than others - Streetwalking is relatively safe, since she will be searching crowded areas, while Exercise is less so - a girl jogging alone at night is a perfect target for the beasts.",
    weight: -1
  },
  conditions: {
    min: { day: 7 },
    missions: {
      tentacleAttackIntro: -3
    },
    fetishes: { tentacles: true }
  },
  results: [{}]
};
