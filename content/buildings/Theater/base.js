Buildings.Theater = {
  image: 'content/buildings/Theater/Base.jpg',
  clean: 80,
  reputation: 0,
  status: 'For Sale',
  rooms: [
    { type: 'bedroom' }
  ],
  maxRooms: 4,
  basePrice: 3000,
  daily: {
    breakpoint: 30,
    above: {
      reputation: -0.6,
      clean: -3,
      girl: {
        endurance: 3.5
      }
    },
    below: {
      reputation: -1.1,
      clean: -2,
      girl: {
        happiness: -5,
        endurance: -5
      }
    },
    // This is the message sent to the player when the building is clean, and the one below... well, you get the picture. ;)
    clean: 'The Theater is in good shape. The latest cleaning even removed a tiny fraction of the gum covering the bottom of the seats, so ancient some archeologists are classifying it as a fossil.',
    dirty: 'The Theater has gotten quite dirty - bodily fluids render some of the seating in the auditorium unusable, and the less said about the floor, the better. Get someone cleaning this mess up, stat!'
  },
  // Remember that long blocks of text have to be on a single line. You can break them up when displayed to the player using <p></p> tags. Other HTML will also work.
  description: "<p>Perhaps less than ideal as a potential brothel, the Theater does have one advantage - an excellent location. The building itself is quite large, but there's not much room for additional construction - the main auditorium takes up a great deal of space.</p><p>It's easy and cheap to maintain, but doesn't provide as many benefits as other locations.</p>"
};