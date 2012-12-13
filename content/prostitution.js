Actions.Streetwalk.config = {
  maxCustomers: 6,
  types: {
    soft: {
      r: 0.4,
      endurance: -6,
      pays: 100
    },
    hard: {
      r: 0.6,
      endurance: -9,
      pays: 150
    },
    anal: {
      r: 0.8,
      endurance: -14,
      pays: 230
    },
    fetish: {
      r: 1,
      endurance: -16,
      pays: 450
    }
  },
  results: {
    soft: [
      'They kissed passionatly for a while, then he blushed, mumbled about the time and left in a hurry.',
      'She sucked his dick in the middle of the street, though she didn\'t swallow.',
      'He sucked her off in an alley way, then she gave him a blowjob.',
      'She crouched down behing a trash can and gave him a titjob.',
      'He jerked off all over her face and hair, then left in a hurry.'
    ],
    hard: [
      'He fucked her silly in the plain view of passerby.',
      'They found an abandoned lot for privacy, and he came in her pussy.',
      'He fucked her in an ally, but pulled out to give her a facial.',
      'They kissed and fondled eachother, than made slow love beneath a tree in the park.'
    ],
    anal: [
      'He pounded her ass mercilessly in a dirty alley.',
      'He alternated between her ass and pussy for several minutes before blowing his load in her ass.',
      'He bent her over a bench in the park and too her ass doggy style.',
      'His dick was almost too large to fit, so she had to warm up first using a dildo.'
    ],
    fetish: [
      'He stripped her naked and tied her to a streetlamp on a busy corner, then left.',
      'They went to a deserted allyway and he tied her arms to a railing, then spanked her until she started crying.',
      'He invited several friends and they bukkaked her.',
      'He produced a whole jar of semen he acquired from somehwere and made her drink it all.',
      'More men arrived, and all five of them shared her ass and pussy.',
      'He tied her up tightly and had his way with every hole.',
      'He bound her arms and paraded her around town naked.'
    ]
  },
  refuseDelta: {
    obedience: -2,
    happiness: -3
  },
  confused: 'You asked <%= girl.name %> to streetwalk, but also told her not to perform any type of sex. She wandered around for a while and fed the pidgins before going home (make sure at least one sex act is checked on her details page).',
  action: '<%= girl.name %> walked around the city picking up strangers.',
  message: '<%= girl.name %> met a <%= customer.profession %> interested in <em><%= Str[customer.sex[0]] %></em> or <em><%= Str[customer.sex[1]] %></em>, and they agreed on <strong class="<%= sex %>"><%= Str[sex] %></strong>.<br><br><%- result %>',
  uncooperative: 'But she was uncooperative and <strong>refused</strong>. He left unsatisfied without paying anything.',
  virgin: 'He was thrilled that <%= girl.name %> <strong>lost her virginity</strong> with him.',
  streetwalkDelta: {
    endurance: -10,
    happiness: -5
  }
};