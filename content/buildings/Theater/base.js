// Put the name of the building here. If the name is multiple words, do this instead:
// Buildings['My Awesome Building'] = {
Buildings.Theater = {
  // The path to the image should be from the base directory of the game.
  image: 'content/buildings/Theater/Base.jpg',
  // How clean the building is before the player buys it.
  clean: 80,
  // Status currently has two options - "For Sale" and "Owned".
  // Unlike girls, it accepts only a single value.
  status: 'For Sale',
  // The maximum number of rooms that the building can have at one time (including those it comes with).
  maxRooms: 4,
  // A list of all the rooms the building starts with.
  rooms: [
    // Bedrooms are the simplest. They take no options.
    {
      type: 'bedroom'
    }
    // Dungeons can come in any size (which determines how many girls they can hold at once).
    // When a player buys a dungeon, they always come in size 2 - but you can define any size you like for rooms the building comes with. The lines are commented out here, because I don't want the theater to actually have a dungeon by default. ;)
//     {
//       type: 'dungeon',
//       size: 2
//     },
  ],
  // The cost of the rooms is added to this value to determine a building's buy price.
  baseCost: 3000,
  // This is what the building costs / gives each day.
  daily: {
    clean: -3,
    money: -40
    // You can also use girl's stats here - the values will apply to all the girls living here.
  },
  cleanEffect: {
    // In addition to the base "daily" effects, a building can be either "clean" or "dirty" - the breakpoint determines at what point this happens. The theater, for example, is considered "clean" as it's above 30.
    breakpoint: 30,
    // While the Theater is clean, the "above" value is multiplied by how far above the breakpoint the building is. For example, of the Theater (with it's breakpoint of 20) has a clean rating of 50, then the "above" values are multiplied by 30 (50 - 20), and combined with the "daily" list above.
    above: {
      // Fractional values are randomly rounded up or down - so 1.2 would have a 20% chance of adding 2, and a 80% chance of adding only one.
      // Remember that the "above" and "below" options are multiplied by how far the building is from the breakpoint - so if the Theater's clean is 100, then (100 - 30) * .05 = 3.5 endurance for each girl that lives here.
      endurance: 0.05
    },
    below: {
      happiness: -0.2,
      endurance: -0.2
    },
    // This is the message sent to the player when the building is clean, and the one below... well, you get the picture. ;)
    clean: 'The Theater is in good shape. The latest cleaning even removed a tiny fraction of the gum covering the bottom of the seats, so ancient some archeologists are classifying it as a fossil.',
    dirty: 'The Theater has gotten quite dirty - bodily fluids render some of the seating in the auditorium unusable, and the less said about the floor, the better. Get someone cleaning this mess up, stat!'
  },
  // Remember that long blocks of text have to be on a single line. You can break them up when displayed to the player using <p></p> tags. Other HTML will also work.
  description: "<p>Perhaps less than ideal as a potential brothel, the Theater does have one advantage - an excellent location. The building itself is quite large, but there's not much room for additional construction - the main auditorium takes up a great deal of space.</p><p>It's easy and cheap to maintain, but doesn't provide as many benefits as other locations.</p>"
};