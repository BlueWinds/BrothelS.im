Actions.Streetwalk.config = {
  maxCustomers: 6,
  types: {
    soft: {
      r: 0.4,
      endurance: -6,
      money: 100,
      'soft experience': 1
    },
    hard: {
      r: 0.6,
      endurance: -9,
      money: 150,
      'hard experience': 1,
      'soft experience': 0.2
    },
    anal: {
      r: 0.7,
      endurance: -14,
      money: 200,
      'anal experience': 1,
      'hard experience': 0.2,
      'soft experience': 0.2
    },
    fetish: {
      r: 0.85,
      endurance: -16,
      money: 450,
      'fetish experience': 1,
      'anal experience': 0.2,
      'hard experience': 0.2,
      'soft experience': 0.2
    }
  },
  results: {
    soft: [
      'They kissed passionately for a while, then he blushed, mumbled about the time and left in a hurry.',
      'She sucked his dick in the middle of the street, though she didn\'t swallow.',
      'He caressed her breasts and licked her pussy in an alley way, then they switched places and she gave him a blow job.',
      'She crouched down behind a trash can and gave him a tit job.',
      'He jerked off all over her face and hair, then left in a hurry.'
    ],
    hard: [
      'He fucked her silly in the plain view of passersby.',
      'They found an abandoned lot for privacy, and he came in her pussy.',
      'He fucked her in an ally, but pulled out to give her a facial.',
      'They kissed and fondled each other, than made slow love beneath a tree in the park.'
    ],
    anal: [
      'He pounded her ass mercilessly in a dirty alley.',
      'He alternated between her ass and pussy for several minutes before blowing his load in her ass.',
      'He bent her over a bench in the park and too her ass doggy style.',
      'His dick was almost too large to fit, so she had to warm up first using a dildo.'
    ],
    fetish: [
      'He stripped her naked and tied her to a streetlamp on a busy corner, then left.',
      'They went to a deserted alleyway and he tied her arms to a railing, then spanked her until she started crying.',
      'He produced a whole jar of semen he acquired from somewhere and made her drink it all.',
      'He tied her up tightly and had his way with every hole.',
      'He bound her arms and paraded her around town naked.'
    ]
  },
  refuseDelta: {
    obedience: -1,
    happiness: -5
  },
  streetwalkDelta: {
    endurance: -10,
    happiness: -5
  }
};

Actions.Whore.config = {
  minCustomers: 3,
  maxCustomers: 20,
  refuseDelta: {
    obedience: -1,
    happiness: -5
  },
  uncooperative: Actions.Streetwalk.config.uncooperative,
  results: {
    soft: [
      'They kissed awkwardly for a minute until it became apparent he was completely inexperienced. She took the lead and guided him in how to pleasure a woman, before finishing him off with a blow-job.',
      'He was incredibly hot, and they wasted no time in stripping and ravaging each other\'s bodies.',
      'He straddled her and pushed her tits together, fucking them roughly without much concern for her pleasure.',
      'She lay over him in 69 position, fondling his balls and slowly licking up and down his shaft while he nibbled on her pussy, both of them steadily growing more enthusiastic until she eagerly swallowed his cum.',
      'He stood against the wall while she gave him a hand job, staring up into his eyes with irresistible cuteness.',
      'He had trouble getting it up at first, but her persistent tongue and ceaseless hands eventually got him hard, and he ended up spraying a massive load across her hair.'
    ],
    hard: [
      'She couldn\'t much get into his pudgy features, and he didn\'t seem particularly interested in her as anything more than a wet (once lube was applied) hole.',
      'After a brief warm up licking her out, he pounded her furiously doggy-style until the whole bed shook, leaving her gasping for air by the time he pulled out and covered her back in cum.',
      'Missionary style, straight, no variation - only when she put her legs around his waist and rolled over on top using the element of surprise did things get more interesting.',
      'He lay back on the bed and she took the top, riding him for what seemed like pleasurable hours until finally, crushing her breasts into his face and moaning, he shot his load deep inside.',
      'They moved together though a veritable Kama Sutra of sex positions, some of which she\'d never heard of before, much less practiced. Her next lay is going to be in for a treat.'
    ],
    anal: [
      'Even with plenty of toy use and lubrication, it still took quite some time to fit his massive dick into her tight ass hole. He was gentle though, and she enjoyed herself despite the pain.',
      'Though he was in a hurry and wanted to get started right away, she insisted on taking it slowly, moving from kissing to oral before finally letting him take her ass doggy style.',
      'He didn\'t actually want to fuck her ass, just plug it was a huge toy while they had sex the old fashioned way.',
      'He had her sit on the edge of the bed and lay back while he teased her pussy with his tongue, slowly working first one finger then two into her ass. By the time he had three in, she was cooing with delight and welcomed the replacement of the fingers with his cock.'
    ],
    fetish: [
      'He stripped her naked and suspended her from a conveniently placed ceiling hook - she was worried about suspension at first, but he seemed to know what he was doing. He fucked her mouth and spanked her, making her beg for more cum to swallow (which he provided) before he would her down.',
      'Bound and helpless before him, he teased her clit, nipples and thighs with a feather for nearly half an hour, until she finally broke down and begged to be fucked. He satisfied himself with her ass, continuing to tease her pussy all the while.',
      'Providing her a schoolgirl costume to wear, he spanked her, and tied her arms behind her back. She alternated between apologized for being so naughty and slurping messily on his cock.',
      'He didn\'t want anything particularly extreme, just a bit of instruction on the proper way to tie up a girl without hurting her. She was happy to oblige in a bit of light rope-play.'
    ]
  },
  customerClass: {
    'Very Low Class': {
      minReputation: 0,
      maxReputation: 25,
      pays: 0.8,
      minSatisfaction: 0.5,
      bad: -0.3,
      good: 0.4
    },
    'Low Class': {
      minReputation: 10,
      maxReputation: 60,
      pays: 1.2,
      minSatisfaction: 0.6,
      bad: -0.4,
      good: 0.6
    },
    'Middle Class': {
      minReputation: 25,
      maxReputation: 90,
      pays: 1.5,
      minSatisfaction: 0.7,
      bad: -0.4,
      good: 0.7
    },
    'Upper Class': {
      minReputation: 60,
      maxReputation: 100,
      pays: 1.9,
      minSatisfaction: 1,
      bad: -0.7,
      good: 1
    },
    'High Class': {
      minReputation: 80,
      maxReputation: 100,
      pays: 2.3,
      minSatisfaction: 1.3,
      bad: -1.3,
      good: 1.3
    }
  }
};
