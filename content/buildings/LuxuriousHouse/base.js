"use strict";
Buildings['Luxurious House'] = {
  image: 'content/buildings/LuxuriousHouse/Base.jpg',
  clean: 95,
  reputation: 35,
  status: 'Town',
  rooms: [
      { type: 'Bedroom' },
      { type: 'Kitchen' },
      { type: 'Washroom' }
  ],
  maxRooms: 3,
  basePrice: 30000,
  daily: {
    breakpoint: 50,
    above: {
      money: -100,
      clean: -5,
      girl: {
        endurance: 10,
        happiness: 7,
        constitution: 0.3
      }
    },
    below: {
      clean: -6,
      money: -140,
      reputation: -1,
      girl: {
        happiness: 3,
        endurance: 4
      }
    },
    clean: 'The fine apointments make living here a pleasure - though expensive to keep in style, this must be one of those "finer things" the rich are always going on about.',
    dirty: 'Even with finger-smudges on the glass and a dent in one wall from a particularly rowdy lovemaking session, this house is still nicer than anywhere you\'ve been before. It\'s a wonder the last owner parted with it so easily.'
  },
  description: "<p>Though quite small, this well appointed and elegant building is available at a steep discount from what it would normally be worth. For sale by one Kim Xun, he has no comment on who the previous owner might have been, and the sale of the building seems more of a bothersome chore for him than a chance to make money.</p>"
};

Missions.noRapeLuxuryHouse = {
  conditions: {
    min: { day: 100 },
    fetishes: { rape: false },
    likelyhood: 0.03,
    building: { name: 'Luxurious House', status: 'Town' }
  },
  results: [{
    mission: 'luxuryHouseSale'
  }]
};
Missions.luxuryHouseDelay = {
  conditions: {
    building: { name: 'Luxurious House', status: 'Town' }
  },
  end: { min: { day: '+3' }},
  results: [{
    mission: 'luxuryHouseSale'
  }]
};
Missions.luxuryHouseSale = {
  display: {
    label: 'House for Sale',
    group: 'House for Sale',
    image: 'content/buildings/LuxuriousHouse/Base.jpg',
    text: "There has been some sort of scandal involving the city guard, in which nearly a dozen members were forced to resign in disgrace - apparently, one of them has even had to flee the country. The captain of the guard, Kim Xun, has been tasked with dealing with his property - among which is a Luxurious House in excellent condition.",
    weight: -1
  },
  variants: function(context, done) {
    context.building.status = 'For Sale';
    done(this.results[0]);
  },
  results: [{}]
};
