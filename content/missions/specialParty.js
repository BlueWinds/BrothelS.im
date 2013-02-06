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
    text: "Once every month, the city throws a gala party for whatever rich and powerful visitors are present at the time. This party lasts a full 24 hours, complete with parade down the central avenue and fireworks at night. It is traditional for those who can afford it to have an escort accompany them in the evening - and lacking anyone to accompany him, <<= mission.special.client.name >> has approached you to provide one.<br><br>If you assign a girl to to escort <<= mission.special.client.name >> in the <strong>evening of day <<= mission.end.min.day >></strong>, she'll accompany him to the party. You'll receive this message again the day of the party.<br><br>He's promised to pay quite well for her attention. You poke around a bit and discover that <<= mission.special.client.name >> is a notable <<= mission.special.client.profession >> and would probably be pleased with (and therefore pay extra well for) a <<- mission.special.client.wants.slice(0, 2)._toString('adj') >> girl.",
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
