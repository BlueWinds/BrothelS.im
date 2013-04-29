"use strict";
Missions.secondBuilding = {
  conditions: {
    min: { day: 125 },
    girl: {},
    missions: {
      secondBuildingDelay: -1,
      secondBuilding: -3
    }
  },
  display: {
    label: 'Guild Permits',
    image: '<<- girl.image() >>',
    group: 'Guild Permits',
    text: "<blockquote>Did you hear? <<- (new Person()).name >> just died. What, you haven't heard of him? He's a big name in The Guild around here - owns probably half the brothels in the city. Well anyway, since he doesn't have any heirs and he left most of his property to the Guild, a whole bunch of licenses have just opened up, and I think you should take the chance to snag one of them.</blockquote>Even though you already have a license to operate an Adult Entertainment Building (or a brothel, as everyone except the official license granting you permission to operate one calls them), and in theory they're limited to one per person, it's an unwritten rule that prosperous owners can get permits for their \"second cousin, currently living abroad\" with no questions asked. The Guild limits the number of establishments to prevent the price from dropping too low, but it doesn't much care who operates each particular one - after all, the Guild leaders are the most successful and richest people in the city, nothing more and nothing less.<br><br>The permits are expected to both be available and run out on <strong>Day <<- mission.end.max.day >></strong> - and while there are more underhanded means available, the simplest method to get one is via a hefty bribe (<<- girl.name >> estimates $30-50k).",
    weight: -1
  },
  end: {
    min: { day: '+25' },
    max: { day: '+25' }
  },
  optionsInfo: {
    text: "<<- girl.name >> hurries into the room just as you were sitting down for a nice cup of tea. <blockquote>Hey, if we're going to get a permit to open a second location, then we're going to have to leave <em>now.</em> I've been keeping an eye on them, and there are only two left. Is this something we're going to do?</blockquote> If you are, it's time to decide on a strategy. Convincing the people at the Guild office to give a permit to your second cousin three times removed who they've never met before is going to take some work.",
    image: '<<- girl.image() >>'
  },
  options: [
    {
      key: 'noCash',
      conditions: { max: { money: 49999 }},
      immediate: true
    },
    {
      key: 'noThanks',
      label: 'No thanks',
      title: "This sounds like way too much trouble and money. You've got a loan to pay off here."
    },
    {
      key: 'cash',
      label: 'Stacks of cash',
      title: "Money makes the world go around. Given their job description, they've probably seen enough prostitutes that getting laid isn't going to be an effective bribe."
    },
    {
      key: 'sex',
      label: 'Sex and Money',
      title: "<<- girl.name >> isn't somthing any man could resist, combined with a bag of large denomination, untraceable coinage."
    }
  ],
  variants: function secondBuildingVariants(context, done) {
    var result = $.extend(true, {}, this.base().results[this.option]);
    if (this.option == 'sex') {
      result.money *= 1.5 - (context.girl.get('libido') + context.girl.charisma) / 200;
      result.money *= (Math.random() + 1) / 2;
      result.money = Math.round(result.money / 100) * 100;
      g.maxBuildings = 2;
    } else if (this.option == 'money') {
      g.maxBuildings = 2;
    }
    done(result);
  },
  results: {
    noCash: {
      message: {
        group: 'Guild Permits',
        label: 'Guild Permits',
        image: 'content/miscImages/GuildHQ.jpg',
        text: "Looking at the balance sheet, you sigh and have to admit - there's no way you're going to able to meet the demands of both bribing your way through an entire office full of officials and still have enough money left to make opening a second location worthwhile. It's unfortunate, but that's life - perhaps next time.",
        weight: -1
      },
      mission: 'secondBuildingDelay',
      missionsDone: {
        secondBuilding: false
      }
    },
    noThanks: {
      mission: 'secondBuildingDelay',
      missionsDone: {
        secondBuilding: false
      }
    },
    cash: {
      money: -55000,
      message: [
        {
          group: 'Guild Permits',
          label: 'Guild Permits',
          image: 'content/miscImages/GuildHQ.jpg',
          text: "You head over to the Guild hall alone. It's an impressive building, but you're not here to admire the architecture. The first barrier is a secretary, a slightly worn older woman who insists there are no permits left and you'd better just head home. $500 jogs her memory, and she remembers that one of the applicants was turned down, and there's still one left. You're given directions down one hall, up a flight of stairs, third door on the left.",
          delta: false,
          weight: -2
        },
        {
          group: 'Guild Permits',
          label: 'Guild Permits',
          image: 'content/miscImages/GuildHQ.jpg',
          text: "The rest of the afternoon is passed by more of the same. Every step of the way feels like you're bleeding, each drop of blood replaced with a stack of gold or a promise of it to come later. You finally get what you're after - a freshly minted piece of paper bearing your last name (with a fake first one), which more or less amounts to a promise that the Guild or the City Guard won't come knocking if you purchase a second location and start housing girls there.<br><br>When you spend some time looking at the prices for the buildings, it makes your head swim. You'd almost forgotten Kirino's words when you bought your first building - the Guild paid for more than 90% of the cost. Well, money is meant to be spent, you suppose..."
        }
      ]
    },
    sex: {
      message: [
        {
          group: 'Guild Permits',
          label: 'Guild Permits',
          image: 'content/miscImages/GuildHQ.jpg',
          weight: -2,
          delta: false,
          text: "You head over to the Guild hall with <<- girl.name >> in tow. It's an impressive building, but you're not here to admire the architecture. The first barrier is a secretary, a slightly worn older woman who insists there are no permits left and you'd better just head home. $500 jogs her memory, and she remembers that one of the applicants was turned down, and there's still one left. You're given directions down one hall, up a flight of stairs, third door on the left."
        },
        {
          group: 'Guild Permits',
          label: 'Guild Permits',
          image: '<<- girl.image("group") >>',
          text: "In an experience better described as harrowing than erotic, you spend the afternoon frantically attempting to prevent the gangbang and bribe-fest from escalating out of control. It seems every ten minutes someone new comes in to see what the fuss is about, and you have to either pay out even more money or increase the number of men and women trying to satisfy themselves with <<- girl.name >>.<br><br>You finally get what you're after, a freshly minted piece of paper bearing your last name (with a fake first one), which more or less amounts to a promise that the Guild or the City Guard won't come knocking if you purchase a second location and start housing girls there, and half an hour later manage to escape with a cum soaked and exhausted girl in tow. As much as she loves sex, it's not something she'd like to do too often.<br><br>When you spend some time looking at the prices for the buildings, it makes your head swim. You'd almost forgotten Kirino's words when you bought your first building - the Guild paid for more than 90% of the cost. Well, money is meant to be spent, you suppose..."
        }
      ],
      money: -55000,
      girl: {
        hardExperience: 4,
        analExperience: 5,
        endurance: -35
      }
    }
  }
};

Missions.secondBuildingDelay = {
  conditions: false,
  end: {
    min: { day: '+75' }
  },
  results: { done: {}}
};
