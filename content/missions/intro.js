"use strict";
Mission.introMissions = {
  introConstitution: true,
  obedienceAndModesty: true,
  enduranceAndHappiness: true,
  charismaAndIntelligence: true,
  libidoAndExperience: true,
  firstMoney: true,
  firstThousand: true,
  secondGirl: true,
  firstBuilding: true,
  cleanBuilding: true,
  explainWhore: true,
  buyRooms: true,
  exploreCity: true
};

Missions.introConstitution = {
  display: {
    label: 'Welcome',
    group: 'Introduction',
    image: 'content/girls/Kirino/images/Base.png',
    text: "<blockquote>Hiya! Since you're new here, I'll guide you around the game a bit. You can pull up each task I give you until you complete it by clicking Missions from the main screen. Let's start with a bit of training before we have our grand opening and you start pimping me - I think I'm getting soft in my old age.</blockquote> She must be joking. Most women would kill to be in shape like she is. And you'd swear she's not more than 20 (and even that seems unlikely). <blockquote>You can set my actions for each day by clicking where it says \"Morning: Rest\". Set me to <strong>Exercise</strong> either once or twice to help increase my <<- __('constitution')>>. Once you've set my actions, you can click <strong>Next Turn</strong> or press enter to pass the day and see the results of my actions.</blockquote><em><<- __('constitution') >> increases the number of customers a girl can work with in a day when she whores herself out, and many customers prefer their girls fit and trim. It will also help her avoid dangerous situations - running faster or fighting harder is always good when trouble knocks. There's no downside to high constitution, though the occasional customer will prefer a <<- __('-constitution', 'adj') >> girl.</em>"
  },
  conditions: {
    max: { day: -1 },
    girl: { name: 'Kirino' },
    missions: { introConstitution: -3 }
  },
  end: {
    girl: {
      min: { constitution: 81 }
    }
  },
  results: { done: {
    mission: 'obedienceAndModesty'
  }}
};

Missions.obedienceAndModesty = {
  conditions: false,
  display: {
    label: 'Obedience and Modesty',
    group: 'Introduction',
    image: 'content/girls/Kirino/images/Study2.jpg',
    weight: -1,
    text: "Kirino pats her stomach (perfectly flat and taut), announcing that she feels much better now. You get the impression that she's holding back a bit - while she doesn't seem to mind flaunting her body in front of strangers, it's always something to improve on. A more <<- __('-modesty', 'adj') >> and <<- __('obedience') >> girl will probably part her customers from more cash. You decide that the best way to fix this is to have her <strong>Expose</strong> herself in public - that should take care of any lingering modesty, and also spend some time <strong>Talking</strong> with her to make her more receptive to your and her customer's commands (so that her <<- __('obedience') >> is above 60).<br><br><em><<- __('modesty') >> represents how much a girl cares for clothing, propriety, and all around uncomfortableness exposing herself to strangers - and especially groups of them. Lower modesty will make her far less likely to refuse sex while outdoors or with groups of people. In addition to <strong>Expose</strong> to lower her modesty, you can use the <strong>Acolyte</strong> action to raise it.<br><br><<- __('obedience') >> represents how submissive a girl is to her partners, how far she'll go to please them, and how generally obedient to authority. It again makes her less likely to refuse sex, and there are many actions she won't take until she's <<- __('obedience', 'adj') >> enough. On the other hand, some actions and many customers prefer a <<- __('-obedience', 'adj') >> girl. But especially initially, higher obedience is better. Use <strong>Talk</strong> with her to raise it.</em>"
  },
  end: {
    girl: {
      min: { obedience: 61 },
      max: { modesty: 9 }
    }
  },
  results: { done: {
    mission: 'charismaAndIntelligence'
  }}
};

Missions.enduranceAndHappiness = {
  conditions: {
    girl: {
      max: { endurance: 30 }
    },
    missions: {
      enduranceAndHappiness: -3
    }
  },
  display: {
    label: 'Endurance and Happiness',
    group: 'Introduction',
    image: '<<- girl.image("tired") >>',
    weight: -1,
    text: "<<- girl.name >> is starting to look a little bit worn out from all the work getting ready for the grand opening. There's only one cure for this, of course - time off. You should have her <strong>Rest</strong> a couple of times until she recovers most of her <<- __('endurance') >>. She'll automatically start Resting when her endurance becomes too low for her current action - but you may want to let her take some time off before she's completely exhausted.<br><br>High <<- __('happiness') >> makes a girl less likely to refuse sex, and customers will enjoy themselves more with a girl who enjoys her work. In addition to Resting, you can change a girl's daily wage by clicking on her picture or stats, then rolling the spinner up or down. A girl's demand for wages goes up as her stats raise.<br><br><em><<- __('endurance') >> doesn't have any effect beyond disabling actions other than <strong>Rest</strong> - you don't need to manage it carefully, especially since a girl will start resting of her own accord when her endurance is too low.</em>"
  },
  end: {
    girl: {
      min: {
        endurance: 80,
        happiness: 80
      }
    }
  },
  results: { done: {}}
};

Missions.charismaAndIntelligence = {
  conditions: false,
  display: {
    label: 'Charisma and Intelligence',
    group: 'Introduction',
    image: 'content/girls/Kirino/images/Study1.jpg',
    weight: -1,
    text: "<blockquote>You know, it's kind of frustrating, sometimes, feeling dumb. Just the other day a man called me a boorish harlot - the insult just confused me, and I had to go look up the words. Not my finest moment. But you know what? You could send me back to school! It's kind of expensive, but it'd totally be worth it.</blockquote>She's right - Kirino's not the sharpest knife in the drawer. You should send her to school to <strong>Study</strong>. You'll need some money for that - fortunately, the owner of the inn you've been staying at has suggested that Kirino could <strong>Advertise</strong> for him, and he'd pay for her help.<br><br><em><<- __('intelligence') >> represents both a girl's native ability and her education. Customers vary in their preference for this - some like a smart companion, while others find it a distraction. <<- __('intelligence', 'adj') >> girls gain <<- __('experience') >> faster, but also demand much higher wages (you don't have to pay Kirino yet, but will have to start soon).<br><br><<- __('charisma') >> represents a girl's friendliness, outgoing nature and general pleasantness to be around. <<- __('charisma', 'adj')>> girls will earn a great deal more money - it's an unadulterated good.</em>"
  },
  end: {
    girl: {
      min: {
        charisma: 51,
        intelligence: 31
      }
    }
  },
  results: { done: {
    mission: 'libidoAndExperience'
  }}
};

Missions.libidoAndExperience = {
  conditions: false,
  display: {
    label: 'Libido and Experience',
    group: 'Introduction',
    image: 'content/girls/Kirino/images/Study3.jpg',
    weight: -1,
    text: "<blockquote>Preparations almost complete! I'm super psyched - I haven't had a good fucking in way too long. Let's get out on the street and start looking for customers.</blockquote>Before you do that, there's one last thing you need to do - make sure Kirino is lusty enough to serve as a street whore. You decide to test this out by subjecting her to some <strong>Orgasm Denial</strong> to raise her <<- __('libido') >>. Some actions, like this one, have multiple options - once you assign a girl to them, you can change which option you'd like to use by hovering over the label and clicking on one of them. For now, set Kirino on <<- __('hard') >>.<br><br><em>The last pair of stats for girls are <<- __('libido') >> and <<- __('experience') >>, and unlike other stats, these are broken up into four categories - <<- Girl.sex._toString('noun') >>. <<- __('libido') >> represents her level of lust, nymphomania and general desire for a specific type of sex. A <<- __('libido', 'adj') >> girl is significantly less likely to refuse sex of that type, while <<- __('experience') >> is a measure of both how often she's had sex and how good she is at pleasuring her partners. Experience will rise on its own whenever a girl has sex of that type. Both of these stats are very important in determining how much a customer pays for an encounter.</em>"
  },
  end: {
    girl: {
      min: { hardLibido: 61 }
    }
  },
  results: { done: {
    mission: 'firstMoney'
  }}
};

Missions.firstMoney = {
  conditions: false,
  girl: false,
  display: {
    label: 'Streetwalking',
    group: 'Introduction',
    image: 'content/girls/Kirino/images/Naked4.jpg',
    weight: -1,
    text: "That's it - now that you've gotten familiar with her and gotten a feel for this new city, you're ready to start pimping Kirino. Time to tell her to start <strong>Streetwalking</strong> - you anticipate that this will be your main source of income for quite some time. Once you've closed this dialog, click on Kirino's picture in the lower left side of the screen. Notice the four sex types on the right-hand side of that dialog - enable <<- ['soft', 'hard']._toString('noun') >> so they have check-marks rather than Xs next to them. Sex acts further down the list pay more, but are more tiring and girls are more likely to refuse. Higher <<- __('obedience') >> and <span class='stat hard'><<- __('experience') >></span>, but most especially <span class='stat hard'><strong><<- __('libido') >></strong></span> for any given act makes refusal less likely.<br><br>Once that's done, set Kirino to <strong>Streetwalk</strong>."
  },
  end: {
    min: { money: '+100' }
  },
  results: { done: {
    mission: 'firstThousand'
  }}
};

Missions.firstThousand = {
  conditions: false,
  display: {
    label: 'Earn $1000',
    group: 'Introduction',
    image: 'content/missions/firstMoneyStart.png',
    weight: -1,
    text: "<blockquote>Earn $1000 as fast as you can. Something good will happen!<br><br>My arms are getting tired!</blockquote><br>One important thing to keep in mind is that customers have certain preferences - they\'ll pay significantly better for their first or second choices of sex types. Girls willing to do only one thing will make much less money. But it\'s far worse to have a girl refuse a customer than it is to leave him unsatisfied. For now, just leave Kirino on <<- ['soft', 'hard']._toString('noun') >>, and worry about raising her <<- __('libido') >> for the other sex types once you're more established.<br><br>Now that she's out on the streets doing actual work for you, it's time to <strong>start paying Kirino</strong> - continuing to pay her nothing would make her unhappy pretty fast. Click on her image or stats, and you'll notice the Pay slider has appeared. Kirino is happy with a little money - other girls will want much more, and their desired wage will increase along with their stats."
  },
  end: {
    min: {
      money: 1000
    }
  },
  variants: function firstThousandVariants(context, done) {
    g.maxGirls += 4;
    done(this.base().results.done);
  },
  results: { done: {
    money: 1600,
    mission: 'secondGirl',
    message: [
      {
        label: 'Earn $1000',
        group: 'Introduction',
        image: 'content/missions/firstMoney.png',
        delta: false,
        weight: -1,
        text: "Under your careful eye, Kirino has started to become known across the city. To celebrate the first $1000 of profit, the two of you pay a visit to a tavern - after all, loan or no, it's good to have money in your pocket!<br><br>It's not the most reputable of places - you don't want to spend <em>too</em> much money - but the drink is good, the waitresses pretty, and the food cheap. You receive plenty of envious looks as you lead Kirino to a table - the waitresses may be pretty, but she puts them to shame."
      },
      {
        label: 'Earn $1000',
        group: 'Introduction',
        image: 'content/missions/firstMoney.png',
        weight: -1,
        text: "You're on your third drink when you recognize a face - the Guild clerk who issued your registration to run a business. When he comes over, a slightly drunk Kirino plants a big, lusty kiss on his cheek. He smiles, seeming to ignore her, and congratulates you on your progress. He then leaves in rather a hurry to hit on one of the wenches, an ill concealed bulge in his pants from where Kirino's been fondling him under the table. She grins like an idiot and passes you his wallet, thick with cash. Perhaps she's not as drunk as she appears. You buy her another round."
      }
    ]
  }}
};

Missions.secondGirl = {
  conditions: false,
  display: {
    label: 'Hire a Girl',
    group: 'Introduction',
    image: 'content/missions/secondGirl.png',
    weight: -1,
    text: "<blockquote>As enthusiastic as I am about all of this, there's no way I can pay back your entire debt on my own. It's time to hire some more help! Since the paperwork finally went through allowing you to expand your operation, you can use the new \"Hire\" link under Girls on the main screen. For your first new girl, look for someone with either high <<- __('obedience') >>, or high <<- __('libido') >> / <<- __('experience') >> in a single type of sex, and reasonably low <<- __('modesty') >>. We want a total slut, someone who won't balk at fucking strangers in public.</blockquote><br>You can have a maximum of five girls working for you at any one time. Listen to Kirino's advice here - hiring a well-educated maid won't do you much good. Other stats will be more important later. Each additional girl costs additional money to hire - the first is rather cheap, while it takes a lot more cash to convince the Guild to let you hire a fifth."
  },
  end: {
    min: {
      girls: 2
    }
  },
  variants: function secondGirlVariants(context, done) {
    g.maxBuildings = 1;
    done(this.base().results.done);
  },
  results: { done: {
    mission: 'firstBuilding',
    message: {
      image: 'content/missions/secondGirl.png',
      label: 'Hire a Girl',
      group: 'Introduction',
      weight: -1,
      text: "It's an excellent start. At the moment few people in the city know your face - perhaps you should spend more time making acquaintances, especially in the Guild that controls your trade. But so far there just hasn't been time, busy as you've been adjusting to a foreign city, fending off problems so Kirino (and her new friend) can do their jobs without worry and a thousand other pressing tasks (such as finding a place to sleep each night).<br><br>One important thing to notice is that unlike Kirino, this new girl almost certainly demands a wage beyond what she needs to rent a room to sleep in each night. Girls also demand more money as their stats rise - especially <<- __('intelligence') >>.<br><br>While you could hire additional girls, for now you probably want to save up and buy a building as soon as possible - they provide several advantages."
    }
  }}
};

Missions.firstBuilding = {
  conditions: false,
  display: {
    label: 'Buy a Building',
    group: 'Introduction',
    image: 'content/missions/firstBuilding.jpg',
    weight: -1,
    text: "<blockquote>You know, not having a house sucks. Renting a room at the inn every night is expensive and annoying, and it's only going to get worse as we hire more girls. There's an easy solution - let's buy a house! Not just any house will do, though. We need one of the locations specially marked by the Guild as fit sites for a brothel. Eager as ever to promote their trade, they're offering us a steep discount on our first building. So steep it's almost criminal, in fact. I assure you, incriminating documents of a certain magistrate have <em>nothing</em> to do with it.</blockquote> You can now buy your first building. Each one has its own advantages and disadvantages. Read the descriptions of each (visible when you hover over the building's image) to help decide. Your first building is <strong>massively discounted</strong> - The Guild will pay upwards of 90% of the cost."
  },
  end: {
    min: {
      buildings: 1
    }
  },
  results: { done: {
    mission: 'cleanBuilding'
  }}
};

Missions.cleanBuilding = {
  conditions: false,
  display: {
    label: 'Building Stats',
    image: 'content/missions/firstBuilding.jpg',
    group: 'Introduction',
    weight: -1,
    text: "<blockquote>Hey, nice <<= g.buildings._filter('status', 'Owned')._first().name >>! Have you assigned me a room yet? If not, you can do that by clicking on \"Residents\" and dragging me into one of the bedrooms. Once that's done, check back on my page, and you'll see I need a lot less money to be happy, since I don't have to pay for a room each night out of my own pocket.</blockquote><br><br>Looking around, you realize that the <<= g.buildings._filter('status', 'Owned')._first().name >> is a lot messier than you'd like. The last owner didn't exactly leave it spic and span, and it's been unoccupied for a while. Best to get all those stains off the walls - make a girl to <strong>Clean</strong> until it's shining.<br><br><em><<- __('clean') >> represents... well... I don't think you need an explanation here. The cleaner a building, the better of an effect it has on its residents - most buildings will raise <<- __('endurance') >> and <<- __('happiness') >>, while some have additional effects.</em>"
  },
  end: {
    min: {
      day: '+3'
    }
  },
  results: { done: {
    mission: 'explainWhore'
  }}
};

Missions.explainWhore = {
  conditions: false,
  display: {
    label: 'Whoring and Reputation',
    image: 'content/girls/Kirino/images/Base.png',
    group: 'Introduction',
    weight: -1,
    text: "<blockquote>Walking around the city picking up strangers and fucking them in alleyways is great and all, but I bet we'd make more money if we had customers come to us instead - that way, they could pick out whichever girl they liked best instead of whoever they happened to meet, and we wouldn't get so tired running around all the time. Ooh, and girls with a sense of modesty (that is, people who aren't me!) will be less likely to refuse, since they'd be having sex in private rather than public.</blockquote><br>Once you've assigned a girl to a bedroom, the new <strong>Whore</strong> action becomes available. It's less tiring, she's less likely to refuse, and if more than one girl is working at a time, each customer will have better luck finding a girl he likes. If he doesn't like any girls enough, he'll leave without paying. The downside is one of numbers - the number of customers that show up will be dependent on how well your brothel is known, and you expect it to vary considerably day to day.<br><br><em>The higher a building's <<- __('reputation') >>, the more customers will arrive and the higher class they'll be. <<- __('reputation') >> goes up when a customer is pleased with his service, or down when he's unhappy with it, and also drops slowly on its own. Higher class patrons are harder to please, though they pay a great deal more.</em>"
  },
  end: {
    building: {
      min: { reputation: 2 }
    }
  },
  results: { done: {
    mission: 'buyRooms'
  }}
};

Missions.buyRooms = {
  conditions: false,
  display: {
    label: 'Adding Rooms',
    image: "<<- building.image() >>",
    group: 'Introduction',
    weight: -1,
    text: "<blockquote>As you may have noticed, we have an awful lot of unused space around here. When we have some spare money, we should renovate it into something more useful!</blockquote> You can do that by clicking on the building, then dragging a room from the Available Rooms list on the right-hand side into the building. Ones you can't afford will be greyed out.<br><br><em>Adding <strong>Bedrooms</strong> will let additional girls live and work in a building, while a <strong>Dungeon</strong> will open up the Lockdown action, a different way to increase <<- __('obedience') >>. Some other rooms have daily effects on every girl living in the building - these are listed beneath the description.</em>"
  },
  end: {
    min: { day: '+3' }
  },
  results: { done: {
    mission: 'exploreCity'
  }}
};

Missions.exploreCity = {
  conditions: false,
  display: {
    label: 'Explore the City',
    image: "content/miscImages/uptownMorning.jpg",
    group: 'Introduction',
    weight: -1,
    text: "<blockquote>Well, here we are! You're off to a good start - there's not a whole lot more I can teach you, though I'm sure there's still plenty you're planning on teaching me.</blockquote> Kirino giggles at her naughty thought. A dirty mind, that girl. Still, she's right - now that you're well on your way to being established, you don't need Kirino's guidance any more.<br><br><em>You can now <strong>Explore</strong> various parts of the city with your girls. You may meet some interesting people. This is also the end of the tutorial - good luck.</em></em>"
  },
  end: {
    min: { day: '+3' }
  },
  results: { done: {}}
};
