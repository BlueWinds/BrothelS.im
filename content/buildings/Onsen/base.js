Buildings.Onsen = {
  name: 'Onsen',
  image: 'content/buildings/Onsen/Base.jpg',
  clean: 25,
  status: 'For Sale',
  rooms: [
    { type: 'bedroom' },
    { type: 'bedroom' }
  ],
  maxRooms: 6,
  baseCost: 4000,
  daily: {
    clean: -10,
    money: -60
  },
  cleanEffect: {
    breakpoint: 50,
    above: {
      endurance: 0.2,
      money: 10,
      charisma: 0.015,
       clean: -0.1
    },
    below: {
      happiness: -0.2,
      endurance: -0.1
    },
    clean: 'The Onsen is in good shape, and the girls are happy to take advantage of the hot spring to relax after work. A few customers come to soak in the baths even without your girls\' attention, paying a modest fee for the privilage.',
    dirty: 'The Onsen is in poor condition - algea covers some of the baths, while others remain empty. A can in one corner to catches drips when it rains from a leak in the roof.'
  },
  description: "<p>While there are no natural hot-springs in the area, that didn't stop one enterprising wizard from expending vast reserves of magical power to create one himself.</p><p>Unfortunately, his vast power was not matched by vast business sense, and he quickly lost all his money and the building soon after, and it has been sitting vacant ever since. The Guild is now offering it at a steep discount to anyone who can clean it up and put it to good use.</p><p>Though the building is hard to keep clean (expect to have one girl cleaning the building full time), visitors using the hotspring will provide a good income and the Charisma of girls living here will rise slowly.</p>"
};