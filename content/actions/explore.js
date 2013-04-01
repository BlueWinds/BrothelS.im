"use strict";
Actions.Explore = {
  label: 'Explore',
  gerund: 'Exploring',
  group: 'Chores',
  description: '<<- girl.name >> will visit some part of the city with you, to see what there is to see.',
  ownerParticipation: true,
  conditions: {
    missions: { exploreCity: 3 }
  },
  enableConditions: {
    girl: {
      min: { endurance: 20 }
    }
  },
  options: [
    {
      key: 'Redlight',
      label: 'Red-Light',
      title: "The red-light district. Though relatively small, it's quite busy since sex is the nation's primary product."
    },
    {
      key: 'Slums',
      label: 'Slums',
      title: "There are better parts of town, but none more populous or unwatched by the law."
    },
    {
      key: 'Docks',
      label: 'Docks',
      title: "As the primary port of an island nation, the port never sleeps."
    },
    {
      key: 'Market',
      label: 'Market',
      title: "Anything can be bought or sold in the central market - if not in broad daylight, then at least in one of the smaller, nondescript buildings nearby."
    },
    {
      key: 'Park',
      label: 'Park',
      title: "The crown maintains several large parks inside the city limits, at public expense."
    },
    {
      key: 'University',
      label: 'University',
      title: "Though unusual for such a small kingdom to maintain a prestigious institution of learning, young male foreign nobles are oddly enthusiastic about going to school here..."
    },
    {
      key: 'Uptown',
      label: 'Uptown',
      title: "The best part of the city, raised on a hill above the smell and dirt of the rest of the city."
    },
    {
      key: 'Garrison',
      label: 'Garrison',
      title: "The army, such as it is, and town guard are based out of an old castle on the opposite side of the city from Uptown."
    }
  ],
  tags: function exploreTags() {
    var tags = {};
    tags[this.option.toLowerCase()] = 1;
    return tags;
  },
  variants: [
    { time: 'morning', option: 'Redlight', result: 'morningRedlight' },
    { time: 'evening', option: 'Redlight', result: 'eveningRedlight' },
    { time: 'morning', option: 'Slums', result: 'morningSlums' },
    { time: 'evening', option: 'Slums', result: 'eveningSlums' },
    { time: 'morning', option: 'Docks', result: 'morningDocks' },
    { time: 'evening', option: 'Docks', result: 'eveningDocks' },
    { time: 'morning', option: 'Market', result: 'morningMarket' },
    { time: 'evening', option: 'Market', result: 'eveningMarket' },
    { time: 'morning', option: 'Park', result: 'morningPark' },
    { time: 'evening', option: 'Park', result: 'eveningPark' },
    { time: 'morning', option: 'University', result: 'morningUniversity' },
    { time: 'evening', option: 'University', result: 'eveningUniversity' },
    { time: 'morning', option: 'Uptown', result: 'morningUptown' },
    { time: 'evening', option: 'Uptown', result: 'eveningUptown' },
    { time: 'morning', option: 'Garrison', result: 'morningGarrison' },
    { time: 'evening', option: 'Garrison', result: 'eveningGarrison' }
  ],
  results: {
    'morningRedlight': {
      message: {
        group: '<<- girl.name >>',
        label: 'Explore Red-Light District',
        image: 'content/miscImages/redlightMorning.jpg',
        text: 'You and <<- girl.name >> wander through the streets of the red-light district, looking for something interesting. While there\'s plenty aimed to catch your eye, most of the attractions are closed in the morning. You may have better luck in the evening.'
      },
      girl: {
        endurance: 3
      }
    },
    'eveningRedlight': {
      message: {
        group: '<<- girl.name >>',
        label: 'Explore Redlight District',
        image: 'content/miscImages/redlightMorning.jpg',
        text: 'You and <<- girl.name >> wander through the streets of the red-light district, looking for something interesting. While there\'s plenty aimed to catch your eye, none of the attractions seem particularly interesting to the two of you at the moment.'
      },
      girl: {
        endurance: 3
      }
    },
    'morningSlums': {
      message: {
        group: '<<- girl.name >>',
        label: 'Explore Slums',
        image: 'content/miscImages/slumsMorning.jpg',
        text: "The slums don't look so bad in the morning light. Nearly three quarters of the population live and work in this part of the city, after all, so it can't be nearly as bad as its reputation suggests. You and <<- girl.name >> spend some time hunting for bargains at smaller, out of the way markets. Once your nose gets used to it, it's almost a pleasant place."
      },
      girl: {
        endurance: -6
      }
    },
    'eveningSlums': {
      message: {
        group: '<<- girl.name >>',
        label: 'Explore Slums',
        image: 'content/miscImages/slumsEvening.jpg',
        text: "<<- girl.name >> sticks close to your side as you venture into poor parts of the city. Street lights are spaced much further than in other areas, and the ever-present city watch is hard to find. The Slums aren't quiet, though - there's plenty of drinking and merry-making going on. You stick close to the pubs and away from dark alleys, and nothing untoward happens during your visit."
      },
      girl: {
        endurance: -6,
        happiness: -2
      }
    },
    'morningDocks': {
      message: {
        group: '<<- girl.name >>',
        label: 'Exlore Docks',
        image: 'content/miscImages/docksMorning.jpg',
        text: 'The Docks are divided into two sections. You explore the larger, larger southern wharves this morning - they deal with great sea-going vessels and small fishing boats alike, and if you have time to spare, are an excellent place to take a sneak peak at goods before they arrive in the market. Despite several hours of searching however, you and <<- girl.name >> don\'t find anything particularly worth the effort of walking so far.'
      },
      girl: {
        endurance: -9
      }
    },
    'eveningDocks': {
      message: {
        group: '<<- girl.name >>',
        label: 'Explore Docks',
        image: 'content/miscImages/docksMorning.jpg',
        text: 'Since the freight section of the docks are dark and worrisome at this time of night, you and <<- girl.name >> explore the better-maintained and more pleasant northern wharves. These handle the yachts, small passenger ships and more esoteric modes of travel - in short, all the transportation that brings wealthy visitors to the island. One such ship is just departing, a fussy wife loading her husband who would surely like to stay just one more day. Other than that, there\'s little of interest at the moment.'
      },
      girl: {
        endurance: -9
      }
    },
    'morningMarket': {
      message: {
        group: '<<- girl.name >>',
        label: 'Explore Market',
        image: 'content/miscImages/marketMorning.jpg',
        text: "The market is a fine place to explore in the morning - bustling, lively, full of the populace going about their daily business. Though famous as a sex-capitol, the vast majority of people have nothing to do with the oldest profession. Shoes still need to be made, bread baked and iron bent and pounded into nails. You end up buying a sweet treat for both you and <<- girl.name >>, but nothing otherwise catches your attention."
      },
      girl: {
        endurance: -6,
        happiness: 2
      },
      money: -10
    },
    'eveningMarket': {
      message: {
        group: '<<- girl.name >>',
        label: 'Explore Market',
        image: 'content/miscImages/marketEvening.jpg',
        text: "The evening market has an aspect of a small-scale permanent fair, as the day's vegetable stands and candle-booths give way to sweat and savory treats, jewelry and perfumes, and, occasionally, the sort of goods that might be scandalous in a more reserved society. You catch <<- girl.name >> looking at a well-stocked stall full of dildos <<- girl.modesty < 50 ? 'hungrily' : 'out of the corner of her eye' >>, and ask if she'd like to stop in. She blushes and shakes her head."
      },
      girl: {
        endurance: -6
      }
    },
    'morningPark': {
      message: {
        group: '<<- girl.name >>',
        label: 'Explore Park',
        image: 'content/miscImages/parkMorning.jpg',
        text: "Clean and well cared for, the central City Park is always full of people jogging on the circular footpath around the outside, picnicking on the grass, or resting under the shade of trees. The two of you spend some time taking in the sights, spending a pleasant morning in the sun."
      },
      girl: {
        endurance: 4,
        happiness: 2
      }
    },
    'eveningPark': {
      message: {
        group: '<<- girl.name >>',
        label: 'Explore Park',
        image: 'content/miscImages/parkMorning.jpg',
        text: "The City Park is just as busy in the evening as during the day, and definitely louder. The fun here is relatively wholesome - with a heavy presence kept by the city watch, anyone looking for shady dealings had best do so elsewhere. Dinner under the stars seems to be the order of the day, so the two of you stretch out and enjoy a break from the nonstop action of the rest of life."
      },
      girl: {
        endurance: 4,
        happiness: 3
      }
    },
    'morningUniversity': {
      message: {
        group: '<<- girl.name >>',
        label: 'Explore University',
        image: 'content/miscImages/universityMorning.jpg',
        text: "The University is a pleasant place to spend time, full of life and energy. Even during classes there are plenty of students hanging out, waiting for their friends or hurrying around on some errand or other. You and <<- girl.name >> spend a few hours exploring the campus, but since you aren't in any classes and don't have anyone specific to visit, your time accomplishes little."
      },
      girl: {
        endurance: -9
      }
    },
    'eveningUniversity': {
      message: {
        group: '<<- girl.name >>',
        label: 'Explore University',
        image: 'content/miscImages/universityMorning.jpg',
        text: "The University is rather quiet in the evening. Not many students live on campus, only those few who were allowed in on merit rather than family wealth or power. There are still a few evening courses, but only the library is anything like as busy as during the morning. <<- girl.name >> and you explore the area, but don't find much of interest."
      },
      girl: {
        endurance: -9
      }
    },
    'morningUptown': {
      message: {
        group: '<<- girl.name >>',
        label: 'Explore Uptown',
        image: 'content/miscImages/uptownMorning.jpg',
        text: "Uptown is a quiet place in the morning. Not sleepy, but unhurried. The wealthy with business to attend to have already left, while those with little to do are not nearly as boisterous as people in other parts of the city - there are appearances to maintain, afterall. <<- girl.name >> << if (girl.modesty < 50) { >>attracts some murmors and sidelong glances from a couple of noble ladies. You can't quite tell if they're condemning her revealing clothing or secretly envious of how good she looks.<< } else { >>fits in rather nicely with the surroundings, elegant and demure. No one would guess she works at a brothel.<< } >>"
      },
      girl: {
        endurance: -6,
        happiness: 1
      }
    },
    'eveningUptown': {
      message: {
        group: '<<- girl.name >>',
        label: 'Explore Uptown',
        image: 'content/miscImages/uptownMorning.jpg',
        text: "You and <<- girl.name >> spend the evening exploring the wealthier parts of the city. Since you took the time to dress up nicely, no one gives the pair of you a second glance - a fine young noble out for an evening stroll doesn't attract any attention at all, even when accompanied by a prostitute."
      },
      girl: {
        endurance: -6,
        happiness: 1
      }
    },
    'morningGarrison': {
      message: {
        group: '<<- girl.name >>',
        label: 'Explore Garrison',
        image: 'content/miscImages/garrisonGate.jpg',
        text: 'Traffic seems quite heavy as you make your way to the garrison, only to stand in a further line as you wait for entrance. Finally, tired and irritable as you arrive at the gate, your visit is deemed insufficiently important by the man asking everyone\'s business. You are not allowed in. A wasted morning.'
      },
      girl: {
        endurance: -12,
        happiness: -5
      }
    },
    'eveningGarrison': {
      message: {
        group: '<<- girl.name >>',
        label: 'Explore Garrison',
        image: 'content/miscImages/garrisonGate.jpg',
        text: "The military and police force of the city has always seemed rather distant from the general populace - not hostile or aloof or unapproachable, just... different. You've never felt the difference quite as strongly as now, with the gate in front of you bolted and no one in sight. Though you feel as though you're being watched as you approach, it doesn't open."
      },
      girl: {
        endurance: -8,
        happiness: -2
      }
    }
  }
};
