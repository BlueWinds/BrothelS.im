Actions.attendParty = {
  label: 'Escort for <%= g.missions.specialParty.people[0].name %>',
  group: 'Jobs',
  description: 'Once every month, the city throws a gala party for whatever rich and powerful visitors are present at the time. It is traditional for those who can afford it to have an escort accompany them in the evening - and lacking anyone to accompany him, <%= g.missions.specialParty.people[0].name %> has approached you to provide one.',
  disabled: function(time) {
    if (time != 'evening') { return true; }
    var m = g.missions.specialParty;
    if (!m || g.day != m.end.day) { return true; }
    var attending = g.girls.Cfilter('actions', 'evening', 'attendParty')[0];
    if (attending && attending !== this) {
      return 'Only one girl can attend.';
    }
    return false;
  },
  mins: {
    obedience: 40,
    happiness: 40,
    endurance: 40
  },
  uninteruptable: true,
  tags: {
    outdoors: true
  },
  safety: 0.8,
  results: [
    {
      image: ['/<%= g.missions.specialParty.people[0].image %>', '/content/missions/festival.jpg', '/<%= girl.image(g.missions.specialParty.people[0].sex[0]) %>'],
      message: [
        "<%= girl.name %> arrived at <%= g.missions.specialParty.people[0].name %>'s in early, wearing her finest clothing. She was met in the common room by a servant - the master wasn't ready quite yet, having stayed up a little too late last night. The servant apologized for the commonness of the surroundings - at home, <%= g.missions.specialParty.people[0].name %> had a fine mansion, but not planning on staying in this city long, had decided to make do by renting a set of rooms. <%= girl.name %> nodded and smiled - in her eyes, the inn was quite a fine one, nothing to be apologizing over at all.<br><br><%= g.missions.specialParty.people[0].name %> finally arrived and took her hand.",
        "The main street is crowded to the brim with party-goers, lit from above by strings of paper lanterns and by a seemingly endless stream of candles floating on tiny rafts down the river, each one carrying the sorrows or regrets of someone in the city out to sea. Initially the party is merely loud and exciting - <%= g.missions.specialParty.people[0].name %> and <%= girl.name %> wander the streets, and <%= g.missions.specialParty.people[0].name %> buys an endless stream of whatever nick-nacks or delicacies catches either one of their interests.<br><br>As the evening goes on and drink begins to set in, clothing begins to dwindle - first a set of young men missing their shirts, then a dancing circle of women in nothing but their underwear. Now when did <%= girl.name %> loose her shirt? She can't quite remember - probably when someone spilled a beer. <%= g.missions.specialParty.people[0].name %> remains a perfect gentleman even as she looses steadily more clothing to \"accidents\" - and finally, he's happily parading her around the streets totally naked.",
        "She can hardly object at this point when he finally decides to conclude the evening in style, with a private room back at his inn. If she's ever been in a more luxurious setting, she can't remember it. He's apparently brought his own king-sized bed, an endless array of pillows, and all sorts of interesting toys to entertain her with - <%= girl.name %>'s eyes go wide at the size of one of the dildos. He's going to fit <em>that</em> inside of her?<br><br>As a matter of fact he does, for a warmup that leaves her panting on all fours and begging him to fuck her properly. It's just the start though - she's his for the whole evening. After countless passionate rounds, the light of dawn finally peeks over the eastern horizon. He thanks her for her company, hands her a very large sack of coins, and leaves her to make her way back to her room in an exhausted but pleased and satisfied haze."
      ],
      delta: function(time, action) {
        var client = g.missions.specialParty.people[0];
        var mission = g.missions.specialParty;
        var reward = {
          happiness: 25,
          endurance: -40,
          charisma: 5
        };
        var money = this.get(client.wants[0]) * 10;
        money += this.get(client.wants[1]) * 5;
        money += this.get(client.wants[2]) * 1;
        reward.money = money;

        reward[client.sex[0] + ' libido'] = 8;
        reward[client.sex[0] + ' experience'] = 10;
        reward[client.sex[1] + ' libido'] = 5;
        reward[client.sex[1] + ' experience'] = 4;

        return reward;
      }
    }
  ]
};