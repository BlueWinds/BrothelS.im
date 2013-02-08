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
    text: "<blockquote>Did you hear? <<- (new Person()).name >> just died. What, you haven't heard of him? He's a big name in The Guild around here - owns probably half the brothels in the city. Well anyway, since he doesn't have any heirs and he left most of his property to the Guild, a whole bunch of licenses have just opened up, and I think you should take the chance to snag one of them.</blockquote>Even though you already have a license to operate an Adult Entertainment Building (or a brothel, as everyone except the official license granting you permission to operate one calls them), and in theory they're limited to one per person, it's an unwritten rule that prosperous owners can get permits for their \"second cousin, currently living abroad\" with no questions asked. The Guild limits the number of establishments to prevent the price from dropping too low, but it doesn't much care who operates each particular one - after all, the Guild leaders are the most successful and richest men in the city, nothing more and nothing less.<br><br>The permits are expected to run out by <strong>Day <<- mission.end.max.day >></strong> - and while there are more underhanded means available, the simplest method to get one is via a hefty bribe (<<- girl.name >> estimates $30-50k).",
    weight: -1
  },
  end: {
    min: { day: '+25' },
    max: { day: '+25' }
  },
  variants: function(context, done) {
    if (g.money < 50000) {
      done(this.results.noCash);
      return;
    }
    var text = this.girl + " hurries into the room just as you were sitting down for a nice cup of tea. <blockquote>Hey, if we're going to get a permit to open a second location, then we're going to have to leave <em>now.</em> I've been keeping an eye on them, and there are only two left. Is this something we're going to do?</blockquote> If you are, it's time to decide on a strategy. Convincing the people at the Guild office to give a permit to your second cousin three times removed who they've never met before is going to take some work.";
    var options = {
      'No thanks': 'This sounds like way too mouch trouble and money. I\'ve got a loan to pay off here.',
      'Stacks of Cash': 'Money makes the world go around. Given their job description, they\'ve probably seen enough prostitutes that getting laid isn\'t going to be an effective bribe.',
      'Sex and Money': this.girl + ' isn\'t somthing any man could resist, combined with a bag of large denomination, untracable coinage.'
    };
    Game.getUserInput(text, context.girl.image(), options, function(answer) {
      if (answer == 'Sex and Money') {
        var cost = context.mission.results[answer].money;
        cost *= 1.5 - (context.girl.get('libido') + context.girl.charisma) / 200;
        cost *= (Math.random() + 1) / 2;
        context.mission.results[answer].money = Math.round(cost / 100) * 100;
        g.maxBuildings = 2;
      }
      done(context.mission.results[answer]);
    });
  },
  results: {
    noCash: {
      message: {
        group: 'Guild Permits',
        label: 'Guild Permits',
        image: '<<- girl.image() >>',
        text: "Looking at the balance sheet, you sigh and have to admit - there's no way you're going to able to meet the demands of both bribing your way through an entire office full of officials and still have enough money left to make opening a second location worthwhile. It's unfortunate, but that's life - perhaps next time.",
        weight: -1
      },
      mission: 'secondBuildingDelay',
      missionsDone: {
        secondBuilding: false
      }
    },
    'No thanks': {
      mission: 'secondBuildingDelay',
      missionsDone: {
        secondBuilding: false
      }
    },
    'Stacks of Cash': {
      money: -55000,
      message: [
        {
          group: 'Guild Permits',
          label: 'Guild Permits',
          image: '<<- girl.image() >>',
          text: "You head over to the Guild hall alone. It's an impressive building, but you're not here to admire the architecture. The first barrier is a secretary, a slightly worn older woman who insists there are no permits left and you'd better just head home. $500 jogs her memory, and she remembers that one of the applicants was turned down, and there's still one left. You're given directions down one hall, up a flight of stairs, third door on the left.",
          delta: false,
          weight: -2
        },
        {
          group: 'Guild Permits',
          label: 'Guild Permits',
          image: '<<- girl.image() >>',
          text: "The rest of the afternoon is passed by more of the same. Every step of the way feels like you're bleeding, each drop of blood replaced with a stack of gold or a promise of it to come later. You finally get what you're after - a freshly minted piece of paper bearing your last name (with a fake first one), which more or less amounts to a promise that the Guild or the City Guard won't come knocking if you purchase a second location and start housing girls there."
        }
      ]
    },
    'Sex and Money': {
      message: [
        {
          group: 'Guild Permits',
          label: 'Guild Permits',
          image: '<<- girl.image() >>',
          weight: -2,
          delta: false,
          text: "You head over to the Guild hall with <<- girl.name >> in tow. It's an impressive building, but you're not here to admire the architecture. The first barrier is a secretary, a slightly worn older woman who insists there are no permits left and you'd better just head home. $500 jogs her memory, and she remembers that one of the applicants was turned down, and there's still one left. You're given directions down one hall, up a flight of stairs, third door on the left."
        },
        {
          group: 'Guild Permits',
          label: 'Guild Permits',
          image: '<<- girl.image("group") >>',
          text: "In an experience better described as harrowing than erotic, you spend the afternoon frantically attempting to prevent the gangbang and bribe-fest from escalating out of control. It seems every ten minutes someone new comes in to see what the fuss is about, and you have to either pay out even more money or increase the number of men and women trying to satisfy themselves with <<- girl.name >>.<br><br>You finally get what you're after, a freshly minted piece of paper bearing your last name (with a fake first one), which more or less amounts to a promise that the Guild or the City Guard won't come knocking if you purchase a second location and start housing girls there, and half an hour later manage to escape with a cum soaked and exhausted girl in tow. As much as she loves sex, it's not something she'd like to do too often."
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
  end: {
    min: { day: '+75' }
  },
  results: [{
    mission: 'secondBuilding'
  }]
};
