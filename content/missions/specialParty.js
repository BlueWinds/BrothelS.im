"use strict";
Missions.specialPartyStart = {
  conditions: {
    min: { day: 10 },
    max: { day: 10 }
  },
  results: [{
    mission: 'specialParty'
  }]
};

Missions.specialParty = {
  initialize: function() {
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
  results: [{
    mission: 'specialPartyDelay'
  }],
  special: {}
};

Missions.specialPartyDelay = {
  end: {
    min: { day: '+25' },
    max: { day: '+25' }
  },
  results: [{
    mission: 'specialParty'
  }]
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
  initialize: function() {
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
  disable: function(context) {
    var attending = Girl.actions('evening').attendParty;
    if (attending && attending[0] != context.girl.name) {
      return 'Only one girl can attend.';
    }
  },
  // Intentionally empty - do not interrupt.
  tags: {},
  variants: function(context, done) {
    var delta = this.results[0];
    var client = g.missions.specialParty.special.client;
    delta.money += context.girl.get(client.wants[0]) * 10;
    delta.money += context.girl.get(client.wants[1]) * 5;
    delta.money += context.girl.get(client.wants[2]) * 1;
    delta.girl[client.sex[0] + 'Libido'] = 8;
    delta.girl[client.sex[0] + 'Experience'] = 10;
    delta.girl[client.sex[1] + 'Libido'] = 5;
    delta.girl[client.sex[1] + 'Experience'] = 4;
    done(delta);
  },
  results: [
    {
      message: [
        {
          group: '<<- girl.name >>',
          label: '<<- action.label >>',
          image: '<<= g.missions.specialParty.special.client.image >>',
          text: "<< var client = g.missions.specialParty.special.client >><<= girl.name >> arrived at <<= client.name >>'s in early, wearing her finest clothing. She was met in the common room by a servant - the master wasn't ready quite yet, having stayed up a little too late last night. The servant apologized for the commonness of the surroundings - at home, <<= client.name >> had a fine mansion, but not planning on staying in this city long, had decided to make do by renting a set of rooms. <<= girl.name >> nodded and smiled - in her eyes, the inn was quite a fine one, nothing to be apologizing over at all.<br><br><<= client.name >> finally arrived and took her hand.",
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
    }
  ]
};
