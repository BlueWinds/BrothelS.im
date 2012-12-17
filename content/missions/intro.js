Missions.setFirstAction = {
  label: 'Welcome',
  description: "<blockquote>Hiya! Since you're new here, I'll guide you around the game a bit. You can pull this message up by clicking Messages again from the main screen. The very first thing we need to do is get me started working - once you've closed this dialog, click on me (Kirino) in the lower left side of the screen. You'll see a lot of numbers there - you can hover over any of them to see what they mean.<br><br>First, notice the four main sex types on the right-hand side of that dialog - click <<- ['soft', 'hard'].CtoString('noun') >> so they have checkmarks rather than Xs next to them. Sex acts further down the list pay more, but are more tiring and girls are more likely to refuse. Higher <<- T('obedience') >>, <<- T('libido') >> and <<- T('experience') >> with any given act makes refusal less likely. Next, set my morning action to Streetwalk, and I'll wander around the city looking for men willing to lighten their wallets for me.<br><br>Any changes you make are applied immediately - no need to save them. Once you've given me orders (to Streetwalk in the morning and to do <<- ['soft', 'hard'].CtoString('noun') >> with customers), click Next Turn back on the main screen.</blockquote>",
  image: 'content/girls/Kirino/images/Base.png',
  start: {
    minDay: -1
  },
  end: {
    money: 1
  },
  success: {
    mission: 'firstMoney'
  }
};

Missions.firstMoney = {
  label: 'Earn $1000',
  description: '<blockquote>Earn $1000 as fast as you can. Something good will happen!<br><br>My arms are getting tired!</blockquote><br><br>One important thing to keep in mind is that customers have certain preferences - they\'ll pay significantly better for their first or second choices of sex types. Girls willing to do only one thing will make much less money. But it\'s worse to have a girl refuse a customer than it is to leave him unsatisfied.',
  image: 'content/missions/firstMoneyStart.png',
  end: {
    money: 1000
  },
  success: {
    money: 300,
    maxGirls: 5,
    mission: 'secondGirl',
    image: ['content/missions/firstMoney.png', 'content/missions/firstMoney.png'],
    message: [
      "Under your careful eye, Kirino has started to become known across the city. To celebrate the first $1000 of profit, the two of you pay a visit to a tavern - afterall, loan or not, it's good to have money in your pocket!<br><br>It's not the most reputable of places - you don't want to spend <em>too</em> much money - but the drink is good, the waitresses pretty, and the food cheap. You receive plenty of envious looks as you lead Kirino to a table - the waitresses may be pretty, but she puts them to shame.",
      "You're on your third drink when you recognize a face - the Guild clerk who issued your registration to run a business. When he comes over, a slightly drunk Kirino plants a big, lusty kiss on his cheek. He smiles, seeming to ignore her, and congratulates you on your progress. He then heads off rather faster than you expected to hit on one of the wenches, an ill concealed bulge in his pants. Kirino grins like an idiot and slips you his wallet under the table, thick with cash. Perhaps she's not as drunk as she appears. You buy her another round."
    ]
  }
};

Missions.secondGirl = {
  label: 'Hire a Girl',
  image: 'content/missions/secondGirl.png',
  description: "As enthusiastic as Kirino is, you know that she's not going to be able to raise all the money you need on her own. It's time to hire some more help. Use the new \"Hire\" link under Girls on the main screen to do so. For your first new girl, you may want someone with either high <<- T('obedience') >>, or high <<- T('libido') >> / <<- T('experience') >> in a single sex act, so that you don't have to worry about her refusing. Other stats will be more important later.",
  end: {
    girls: 2
  },
  success: {
    maxBuildings: 1,
    mission: 'firstBuilding',
    image: 'content/missions/secondGirl.png',
    message: "It's an excellent start. At the moment few people in the city know your face - perhaps you should spend more time making acquaintances, especially in the Guild that controls your trade. But so far there just hasn't been time, busy as you've been adjusting to a foreign city, fending off problems so Kirino (and her new friend) can do their jobs without worry and a thousand other pressing tasks (such as finding a place to sleep each night).<br><br>One important thing to notice is that unlike Kirino, this new girl almost certainly demands a wage beyond what she needs to rent a room to sleep in each night. Girls also demand more money as most stats rise - especially <<- T('intelligence') >>."
  }
};

Missions.firstBuilding = {
  label: 'Buy a Building',
  description: "You know, not having a house sucks. You're not living on the streets, but renting a room at the inn every night is expensive - and it will only get worse as you hire more girls. Now that you have the necessary permits from the Guild for a permanent establishment, the answer is obvious: Real Estate! Not just money - having a base of operations would ease many of life's problems.<br><br>You can now buy your first building. Each one has its own advantages and disadvantages - read the descriptions of each (visible when you hover over the building's image) to help decide.",
  image: 'content/missions/firstBuilding.jpg',
  end: {
    buildings: 1
  },
  success: {
    image: 'content/missions/firstBuilding.jpg',
    message: "<blockquote>Hey, nice <<= g.buildings.Cfilter('status', 'Owned').Cfirst().name >>! Have you assigned my a bedroom yet? If not, you can do that by clicking on the building and selecting me for one of the bedrooms. Once that's done, check back on my page, and you'll see I need a lot less money to be happy, since I don't have to pay for a room each night out of my own pocket.</blockquote><br><br>One important new task you have access to so \"Clean\" - the cleaner a building is the better of an effect it has on its residents - dirty buildings may even penalize those living there!"
  }
};
