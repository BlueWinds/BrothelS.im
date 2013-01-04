Missions.setFirstAction = {
  label: 'Welcome',
  description: "<blockquote>Hiya! Since you're new here, I'll guide you around the game a bit. You can pull up each task I give you until you complete it by clicking Missions from the main screen. The very first thing we need to do is get me started working - once you've closed this dialog, click on my picture in the lower left side of the screen. You'll see a lot of numbers there - you can hover over any of them to see what they mean.<br><br>First, notice the four main sex types on the right-hand side of that dialog - click <<- ['soft', 'hard'].CtoString('noun') >> so they have check-marks rather than Xs next to them. Sex acts further down the list pay more, but are more tiring and girls are more likely to refuse. Higher <<- T('obedience') >>, <<- T('libido') >> and <<- T('experience') >> with any given act makes refusal less likely.<br><br>Next, click on the section where it says \"Morning: Rest, Evening: Rest\" and you'll get the Action Selection screen. Drag my picture into the Streetwalk box in the morning, and I'll wander around the city looking for men willing to lighten their wallets for me.<br><br>Any changes you make are applied immediately - no need to save them. Once you've given me orders, click Next Turn back on the main screen.</blockquote>",
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
  description: "<blockquote>Earn $1000 as fast as you can. Something good will happen!<br><br>My arms are getting tired!</blockquote><br>One important thing to keep in mind is that customers have certain preferences - they\'ll pay significantly better for their first or second choices of sex types. Girls willing to do only one thing will make much less money. But it\'s worse to have a girl refuse a customer than it is to leave him unsatisfied. For now, just leave Kirino on <<- ['soft', 'hard'].CtoString('noun') >>, and worry about the other sex types once you're more established.",
  image: 'content/missions/firstMoneyStart.png',
  end: {
    money: 1000
  },
  success: {
    money: 1600,
    maxGirls: 5,
    mission: 'secondGirl',
    image: ['content/missions/firstMoney.png', 'content/missions/firstMoney.png'],
    message: [
      "Under your careful eye, Kirino has started to become known across the city. To celebrate the first $1000 of profit, the two of you pay a visit to a tavern - after all, loan or no, it's good to have money in your pocket!<br><br>It's not the most reputable of places - you don't want to spend <em>too</em> much money - but the drink is good, the waitresses pretty, and the food cheap. You receive plenty of envious looks as you lead Kirino to a table - the waitresses may be pretty, but she puts them to shame.",
      "You're on your third drink when you recognize a face - the Guild clerk who issued your registration to run a business. When he comes over, a slightly drunk Kirino plants a big, lusty kiss on his cheek. He smiles, seeming to ignore her, and congratulates you on your progress. He then leaves in rather a hurry to hit on one of the wenches, an ill concealed bulge in his pants from where Kirino's been fondling him under the table. She grins like an idiot and passes you his wallet, thick with cash. Perhaps she's not as drunk as she appears. You buy her another round."
    ]
  }
};

Missions.secondGirl = {
  label: 'Hire a Girl',
  image: 'content/missions/secondGirl.png',
  description: "<blockquote>As enthusiastic as I am about all of this, there's no way I can pay back your entire debt on my own. It's time to hire some more help! Since the paperwork finally went through allowing you to expand your operation to more girls, you can use the new \"Hire\" link under Girls on the main screen. For your first new girl, look for someone with either high <<- T('obedience') >>, or high <<- T('libido') >> / <<- T('experience') >> in a single type of sex, and reasonably low <<- T('modesty') >>. We want a total slut, someone who won't balk at fucking strangers in public.</blockquote><br>You can have a maximum of five girls working for you at any one time. Listen to Kirino's advice here - hiring a well-educated maid won't do you much good. Other stats will be more important later.",
  end: {
    girls: 2
  },
  success: {
    maxBuildings: 1,
    mission: 'firstBuilding',
    image: 'content/missions/secondGirl.png',
    message: "It's an excellent start. At the moment few people in the city know your face - perhaps you should spend more time making acquaintances, especially in the Guild that controls your trade. But so far there just hasn't been time, busy as you've been adjusting to a foreign city, fending off problems so Kirino (and her new friend) can do their jobs without worry and a thousand other pressing tasks (such as finding a place to sleep each night).<br><br>One important thing to notice is that unlike Kirino, this new girl almost certainly demands a wage beyond what she needs to rent a room to sleep in each night. Girls also demand more money as their stats rise - especially <<- T('intelligence') >>.<br><br>While you could hire additional girls, Streetwalking isn't very profitable for people other than Kirino, since their wage eats up most of the money they make. You'll find better ways to make money off your girls once you've bought a building."
  }
};

Missions.firstBuilding = {
  label: 'Buy a Building',
  description: "<blockquote>You know, not having a house sucks. Renting a room at the inn every night is expensive and annoying, and it's only going to get worse as we hire more girls. There's an easy solution - let's buy a house! Not just any house will do, though. We need one of locations specially marked by the Guild as fit sites for a brothel. Eager as ever to promote their trade, they're offering us a steep discount on our fist building. So steep it's almost criminal, in fact. I assure you, incriminating documents of a certain magistrate have <em>nothing</em> to do with it.</blockquote> You can now buy your first building. Each one has its own advantages and disadvantages - read the descriptions of each (visible when you hover over the building's image) to help decide.",
  image: 'content/missions/firstBuilding.jpg',
  end: {
    buildings: 1
  },
  success: {
    image: 'content/missions/firstBuilding.jpg',
    message: "<blockquote>Hey, nice <<= g.buildings.Cfilter('status', 'Owned').Cfirst().name >>! Have you assigned me a room yet? If not, you can do that by clicking on the building and selecting me for one of the bedrooms. Once that's done, check back on my page, and you'll see I need a lot less money to be happy, since I don't have to pay for a room each night out of my own pocket.</blockquote><br><br>One important new task you have access to so \"Clean\" - the cleaner a building is the better of an effect it has on its residents - buildings that get too dirty penalize those living there!"
  }
};

Missions.statIncreases = {
  label: 'Study, study, study!',
  image: 'content/girls/Kirino/images/Study3.jpg',
  start: {
    buildings: 1
  },
  description: "<blockquote>You know, it's kind of frustrating, sometimes, feeling dumb. Just the other day a man called me a boorish harlot - the insult just confused me, and had to go look up the words later. Not my finest moment.<br><br>But you know what? You could send me back to school! It's kind of expensive, but it'd totally be worth it.</blockquote><br>Now that you have a stable base of operations, it's time to consider more sophisticated actions than just Streetwalk. Under the Training tab you'll see a lot of options for how to raise a girl's stats.",
  end: function() {
    return { minDay: g.day + 3, maxDay: g.day + 3 };
  }
};

Missions.explainWhore = {
  label: 'Whoring and Reputation',
  image: 'content/girls/Kirino/images/Base.png',
  start: {
    buildings: 1
  },
  description: "<blockquote>Walking around the city picking up strangers and fucking in alleyways is great and all, but I bet we'd make more money if we had customers come to us instead - that way, they could pick out whichever girl they liked best instead of whoever they happened to meet, and we wouldn't get so tired running around all the time. Ooh, and girls with a sense of modesty (that is, people who aren't me!) will be less likely to refuse, since they'd be having sex in private rather than public.</blockquote><br>Once you've assigned a girl a bedroom, the new <strong>Whore</strong> action becomes available. It's less tiring, she's less likely to refuse, and if more than one girls is working at a time, each customer will have better luck finding a girl he likes. The downside is one of numbers - the number of customers that shows up is dependent on the building's Reputation, and varies considerably day to day.<br><br>The higher a building's reputation, to more customers will arrive and the higher class they'll be. Reputation goes up when a customer is pleased with his service, or down when he's unhappy with it, or there were no girls available. Higher class patrons are harder to please - though they pay a great deal more.<br><br>Don't worry about trying to keep a high reputation - it will tend to sort itself out to a comfortable level.",
  end: function() {
    return { minDay: g.day + 3, maxDay: g.day + 3 };
  }
};