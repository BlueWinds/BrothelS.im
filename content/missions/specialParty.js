"use strict";
Missions.specialPartyStart = {
  conditions: {
    min: { day: 10 },
    max: { day: 10 }
  },
  results: { done: {
    mission: 'specialParty'
  }}
};

Missions.specialParty = {
  conditions: false,
  initialize: function specialPartyInitialize() {
    this.special.client = new Person('High Class');
  },
  display: {
    label: 'Escort for <<= mission.special.client.name >>',
    image: '<<= mission.special.client.image >>',
    group: 'Monthly Festival',
    text: "Once every month, the city throws a gala party for whatever rich and powerful visitors are present at the time. This party lasts a full 24 hours, complete with parade down the central avenue and fireworks at night. It is traditional for those who can afford it to have an escort accompany them in the evening - and lacking anyone to accompany him, <<= mission.special.client.name >> has approached you to provide one.<br><br>If you assign a girl to escort <<= mission.special.client.name >> in the <strong>evening of day <<= mission.end.min.day >></strong>, she'll accompany him to the party. You'll receive this message again the day of the party.<br><br>He's promised to pay quite well for her attention. You poke around a bit and discover that <<= mission.special.client.name >> is a notable <<= mission.special.client.profession >> and would probably be pleased with (and therefore pay extra well for) a <<- mission.special.client.wants.slice(0, 2)._toString('adj') >> girl.",
    weight: -1
  },
  end: {
    min: { day: '+5' },
    max: { day: '+5' }
  },
  results: { done: {
    mission: 'specialPartyDelay'
  }},
  special: {}
};

Missions.specialPartyDelay = {
  conditions: false,
  end: {
    min: { day: '+25' },
    max: { day: '+25' }
  },
  results: { done: {
    mission: 'specialParty'
  }}
};

Actions.attendParty = {
  label: 'Escort for <<= g.missions.specialParty.special.client.name >>',
  group: 'Jobs',
  description: 'Once every month, the city throws a gala party for whatever rich and powerful visitors are present at the time. It is traditional for those who can afford it to have an escort accompany them in the evening - and lacking anyone to accompany him, <<= g.missions.specialParty.special.client.name >> has approached you to provide one.',
  conditions: {
    time: 'evening',
    missions: {
      specialParty: 1
    }
  },
  initialize: function attendPartyInitialize() {
    var m = g.missions.specialParty;
    if (g.day != m.end.min.day) { return false; }
  },
  enableConditions: {
    girl: {
      min: {
        happiness: 30,
        endurance: 40
      }
    }
  },
  disable: function attendPartyDisable(context) {
    var attending = Girl.actions('evening').attendParty;
    if (attending && attending[0] != context.girl.name) {
      return 'Only one girl can attend.';
    }
  },
  // Intentionally empty - do not interrupt.
  tags: {},
  variants: function attendPartyVariants(context, done) {
    var delta = $.extend(true, {}, Math.choice(this.base().results));
    var client = g.missions.specialParty.special.client;
    delta.money += context.girl.get(client.wants[0]) * 10;
    delta.money += context.girl.get(client.wants[1]) * 5;
    delta.money += context.girl.get(client.wants[2]) * 1;
    if (delta.girl.endurance > -40) {
      // This is non-sexual ending, so no sex traits.
      done(delta);
      return;
    }
    delta.girl[client.sex[0] + 'Libido'] = 8;
    delta.girl[client.sex[0] + 'Experience'] = 10;
    delta.girl[client.sex[1] + 'Libido'] = 5;
    delta.girl[client.sex[1] + 'Experience'] = 4;
    done(delta);
  },
  results: {
    PartyOn: {
      message: [
        {
          group: '<<- girl.name >>',
          label: '<<- action.label >>',
          image: '<<= g.missions.specialParty.special.client.image >>',
          text: "<< var client = g.missions.specialParty.special.client >><<= girl.name >> arrived at <<= client.name >>'s inn early, wearing her finest clothing. She was met in the common room by a servant - the master wasn't ready quite yet, having stayed up a little too late last night. The servant apologized for the commonness of the surroundings - at home, <<= client.name >> had a fine mansion, but not planning on staying in this city long, had decided to make do by renting a set of rooms. <<= girl.name >> nodded and smiled - in her eyes, the inn was quite a fine one, nothing to be apologizing over at all.<br><br><<= client.name >> finally arrived and took her hand.",
          delta: false
        },
        {
          group: '<<- girl.name >>',
          label: '<<- action.label >>',
          image: 'content/missions/festival.jpg',
          text: "<< var client = g.missions.specialParty.special.client >>The main street is crowded to the brim with party-goers, lit from above by strings of paper lanterns and by a seemingly endless stream of candles floating on tiny rafts down the river, each one carrying the sorrows or regrets of someone in the city out to sea. Initially the party is merely loud and exciting - <<= client.name >> and <<= girl.name >> wander the streets, and <<= client.name >> buys an endless stream of whatever nick-nacks or delicacies catches either one of their interests.<br><br>As the evening goes on and drink begins to set in, clothing begins to dwindle - first a set of young men missing their shirts, then a dancing circle of women in nothing but their underwear. Now when did <<= girl.name >> loose her shirt? She can't quite remember - probably when someone spilled a beer. <<= client.name >> remains a perfect gentleman even as she looses steadily more clothing to \"accidents\" - and finally, he's happily parading her around the streets totally naked.",
          delta: false
        },
        {
          group: '<<- girl.name >>',
          label: '<<- action.label >>',
          image: '<<= girl.image(g.missions.specialParty.special.client.sex[0]) >>',
          text: "She can hardly object at this point when he finally decides to conclude the evening in style, with a private room back at his inn. If she's ever been in a more luxurious setting, she can't remember it. He's apparently brought his own king-sized bed, an endless array of pillows, and all sorts of interesting toys to entertain her with - <<= girl.name >>'s eyes go wide at the size of one of the dildos. He's going to fit <em>that</em> inside of her?<br><br>As a matter of fact he does, for a warm-up that leaves her panting on all fours and begging him to fuck her properly. It's just the start though - she's his for the whole evening. After countless passionate rounds, the light of dawn finally peeks over the eastern horizon. He thanks her for her company, hands her a very large sack of coins, and leaves her to make her way back to her room in an exhausted but pleased and satisfied haze."
        }
      ],
      girl: {
        happiness: 25,
        endurance: -40,
        charisma: 5
      },
      money: 0
    },
    RunningLate: {
      message: [
        {
          group: '<<- girl.name >>',
          label: '<<- action.label >>',
          image: '<<= g.missions.specialParty.special.client.image >>',
          text: "<< var client = g.missions.specialParty.special.client >>Despite leaving early, the streets are particularly crowded with party-goers tonight, and <<= girl.name >> finds it difficult to weave her way through them wearing her evening dress. She arrives at <<= client.name >>'s inn slightly late, entering to find <<= client.name >> himself waiting. He chastises her for her tardiness and suggests with a raised eyebrow that he will find a way to discipline her later in the night. Skipping the formalities of introduction, he wastes no time taking her hand and leading her out to the main street so that neither of them miss another moment of the excitement.",
          delta: false
        },
        {
          group: '<<- girl.name >>',
          label: '<<- action.label >>',
          image: 'content/missions/festival.jpg',
          text: "<< var client = g.missions.specialParty.special.client >>The night supplies an intoxicating mix of music and alcohol, drums in the distance blending with warm night air and enticing scents. Rather than spend time with the traditional dancing and candle ceremony though, <<= client.name >> takes <<= girl.name >> to some less reputable entertainment - a series of wrestling matches in a warehouse near the docks. One bout is scheduled, while it's traditional that the impromptu matches that follow spill out of the ring and into the over-eager front row (he promises that they'll leave before the real brawling begins after that). By the time the fighting has started to get... rowdy... the crowd has started to thin, and <<- girl.name >> sees many bodies in various states of undress as they leave, getting to know each other much better in the nearby well-lit alleyways.",
          delta: false
        },
        {
          group: '<<- girl.name >>',
          label: '<<- action.label >>',
          image: '<<= girl.image(g.missions.specialParty.special.client.sex[0]) >>',
          text: "<< var client = g.missions.specialParty.special.client >>It's not until they return to his lavish room at the inn that <<= girl.name >>'s night really begins. <<= client.name >> strips her and binds her thoroughly. He runs his fingers up and down her body, exploring softly every patch of skin and paying particular attention to her intimate areas. The touches start to get rougher as he moves on to sexual 'punishment'. By the time the night is over, she has been punished not only for her lateness but also for many other misdeeds and naughty acts. It's almost dawn by the time they finish, and <<= client.name >> is very appreciative to have had <<= girl.name >>'s cooperation. He gives more than the agreed amount of money and tells her that he would be very happy to have her accompany him in the future, especially if she's in need of correction again. As her joints are feeling stiff from awkward positions, he has his maid walk her back to her room to get some rest. The maid is also appreciative - this has been her first night off in weeks!"
        }
      ],
      girl: {
        happiness: 25,
        endurance: -40,
        charisma: 5
      },
      money: 0
    },
    NoSex: {
      message: [
        {
          group: '<<- girl.name >>',
          label: '<<- action.label >>',
          image: '<<= g.missions.specialParty.special.client.image >>',
          text: "<< var client = g.missions.specialParty.special.client >><<= girl.name >> arrives at <<= client.name >>'s inn right on time, just as he is just descending the stairs from his second-floor room. He is a little older that she expected, and she curtsies gracefully to him in respect. He greets her with a chivalrous hand kiss, and then the two of them head out to the main street to enjoy the festivities.",
          delta: false
        },
        {
          group: '<<- girl.name >>',
          label: '<<- action.label >>',
          image: 'content/missions/festival.jpg',
          text: "<< var client = g.missions.specialParty.special.client >><<= client.name >> and <<= girl.name >> begin by watching the central avenue parade, led by a detachment of Valaia's city guards in full ceremonial uniform. They're followed by everything from fire-eaters to a troupe of scantily clad cat-girls spreading kisses on the cheek and flowers in the hair of anyone who strays too close, showing off the island's splendid culture. This month the parade floats are mainly themed on <<- Math.choice(['the city\\'s most notable whores', 'the area\\'s extensive folklore', 'the kings and queens of the past and present', 'a particularly unsavory incident in the city\\'s history', 'the female form', 'animal-shaped representations of the city\\'s most notable regions']) >>. After this, he takes her the traditional dancing circle, and though <<= girl.name >> is not as experienced with the types of dancing unique to this area, <<= client.name >> takes it slow and holds her close. Upon seeing her move so elegantly in her evening dress, several younger men ask for the next dance, but she turns them all down - she has eyes (or at least elegantly pretends to have only eyes) for one man.",
          delta: false
        },
        {
          group: '<<- girl.name >>',
          label: '<<- action.label >>',
          image: '<<= g.missions.specialParty.special.client.image >>',
          text: "<< var client = g.missions.specialParty.special.client >>As the evening draws to a close, the pair return to the inn. <<= client.name >> thanks <<= girl.name >> for a wonderful time, and that he was glad for the company. He pays her in full and lets her return home with no sexual services rendered. <<- girl.get('libido') < 75 ? 'She is relieved to have spent the evening having had such an enjoyable date, though a little disappointed to have missed the experience of being a fine lady in the bedroom of a dignified gentleman.' : \"She is disappointed not to have been able to get into his pants, and she is very tempted to pro bono work on her way home. It's not until she's alone in her room that she can remedy how anticlimactic the night became. She is now particularly desperate for any kind of penetration from her next client.\" >>"
        }
      ],
      girl: {
        happiness: 25,
        endurance: -17,
        charisma: 6,
        intelligence: 5
      },
      money: 300
    }
  }
};
