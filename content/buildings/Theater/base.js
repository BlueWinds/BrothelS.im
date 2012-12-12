define({
  name: 'Theater',
  image: 'content/buildings/Theater/Base.jpg',
  clean: 80,
  status: 'For Sale',
  rooms: [
      { type: 'bedroom' }
//       {
//         type: 'auditorium',
//         size: 10
//       }
  ],
  maxRooms: 4,
  baseCost: 3000,
  daily: {
    clean: -3,
    money: -40
  },
  cleanEffect: {
    breakpoint: 30,
    above: {
      endurance: 0.05
    },
    below: {
      happiness: 0.2,
      endurance: 0.2
    },
    clean: 'The Theater is in good shape. The latest cleaning even removed a tiny fraction of the gum covering the bottom of the seats, so ancient some archeologists are classifying it as a fossil.',
    dirty: 'The Theater has gotten quite dirty - bodily fluids render some of the seating in the auditorium unusable, and the less said about the floor, the better. Get someone cleaning this mess up, stat!'
  },
  description: "<p>Perhaps less than ideal as a potential brothel, the Theater does have one advantage - an excellent location. The building itself is quite large, but there's not much room for additional construction - the main auditorium takes up a great deal of space.</p><p>It's easy and cheap to maintain, but doesn't provide as many benefits as other locations.</p>"
});