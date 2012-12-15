Building.config = {
  // Adding simple rooms, like the dungeon, isn't very difficult. Copy the dungeon description and start editing.
  rooms: {
    // Complicated rooms like bedrooms (which have their own widgets and modify complicated things like a girl's wages are beyond the scope of easy custom content. Skip down to dungeon for a well commented example.
    bedroom: {
      price: 500,
      description: "Each bedroom can house one girl, allowing her to work in this building and saving a great deal of money since she doesn't need to rent a room at an inn every night."
    },
    // The name of the room. It will be capitalized before being displayed to the user. If you want more than one word (but keep it short), you'll need to enclose it in quotes ('room name').
    dungeon: {
      // The cost to buy this room.
      price: 1200,
      // The description shown before buying the room, and occasionally afterwards.
      description: "An enlarged basement with cells, a stockade, a table with convenient ropes for tying down naughty girls, the dungeon can hold up to two women at a time in Lockdown.",
      // maxPerBuilding does... exactly what it sounds like. Remove this line if there's no limit.
      maxPerBuilding: 1,
      // The short description is the one that goes on the building view page, inside each room of this type. It should be short enough that it doesn't overflow that box. You can use replacement patterns from this object - size or price, for example.
      shortDesc: 'Assign up to <%= size %> girls to Lockown to increase their Submission at the expense of Happiness and a little bit of Constitution.',
      // When buying one of these rooms, the default "size". The room's size doesn't do anything on its own, though actions may use it.
      size: 2
      // You can also add a "daily" option. 'clean' or 'money' will clean/dirty (negative numbers, yay) the building or give the player money. You can also use girl's stats, in which case they will apply to every girl living there.
      // daily: {
      //   clean: 1,
      //   endurance: 1
      // }
    }
  },
  startMaxBuildings: 0,
  noRoomDailyCost: 60,
  cleanDescription: "Cleanliness is how orderly and generally lacking in grime the building is. Higher cleaning ratings make customers more likely to enter and pay well when they do, and low cleanliness will reduce girls' endurance and happiness.",
  roomDescription: "Built / Total<br><br>Many buildings have extra rooms that could be renovated into extra bedrooms or other interesting places."
};