Building.config = {
  startMaxBuildings: 0,
  noRoomDailyCost: 60,
  rooms: {
    bedroom: {
      price: 500,
      description: "Each bedroom can house one girl, allowing her to work in this building and saving a great deal of money since she doesn't need to rent a room at an inn every night."
    },
    dungeon: {
      price: 1200,
      description: "An enlarged basement with cells, a stockade, a table with convenient ropes for tying down naughty girls, the dungeon can hold up to two women at a time, increasing their obedience at the expense of happiness and a little bit of constitution. Assign them the \"Lock Down\" action to take advantage of this room.",
      max: 1,
      shortDesc: 'Assign up to <%= size %> girls to Lockown to increase their obedience at the expense of happiness and a little bit of constitution.',
      size: 2
    }
//     auditorium: {
//       price: 2000,
//       size: 2,
//       description: "Theater seating for putting on a special show, it can hold up to <%= size * 10 %> guests at once. Shows bring in a little bit of money, but also raise the performer's charisma."
//     }
  },
  cleanDescription: "Cleanliness is how orderly and generally lacking in grime the building is. Higher cleaning ratings make customers more likely to enter and pay well when they do, and low cleanliness will reduce girls' endurance and happiness.",
  roomDescription: "Built / Total<br><br>Many buildings have extra rooms that could be renovated into extra bedrooms or other interesting places."
};