define({
  _id: 'specialParty',
  people: ['High Class'],
  name: 'Escort for <%= mission.people[0].name %>',
  description: "Once every month, the city throws a gala party for whatever rich and powerful visitors are present at the time. This party lasts a full 24 hours, complete with parade down the central avenue and fireworks at night. It is traditional for those who can afford it to have an escort accompany them in the evening - and lacking anyone to accompany him, <%= mission.people[0].name %> has approached you to provide one.<br><br>If you assign a girl to to escort <%= mission.people[0].name %> in the <strong>evening of day <%= mission.end.day %></strong>, she'll accompany him to the party. You'll receive this message again the day of the party.<br><br>He's promised to pay quite well for her attention. You poke around a bit and discover that <%= mission.people[0].name %> is a notable <%= mission.people[0].profession %> and would probably be pleased with a <strong><%= Str[mission.people[0].wants[0]] %></strong> and <strong><%= Str[mission.people[0].wants[1]] %></strong> girl.",
  image: function() {
    return this.people[0].image;
  },
  start: {
    day: 10
  },
  end: function() {
    var day = 15;
    if (g.day > 10) {
      day = g.day - g.day % 30 + 45;
    }
    return { day: day };
  },
  success: {
    mission: 'specialParty'
  }
});
