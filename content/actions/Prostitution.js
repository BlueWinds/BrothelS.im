define([], [
  {
    _id: 'Streetwalk',
    label: 'Streetwalk',
    description: 'She will wander the streets looking for customers to service. This tends to be quite tiring, and not as profitable as other options, but it won\'t count against the customers or reputation of your buildings.',
    mins: {
      obedience: 40,
      happiness: 20,
      endurance: 25
    },
    extraData: {
      confused: 'You asked <%= girl.name %> to streetwalk, but also told her not to perform any type of sex. She wandered around for a while and fed the pidgins before going home (make sure at least one sex act is checked on her details page).',
      action: '<%= girl.name %> walked around the city picking up strangers.',
      message: '<%= girl.name %> met a <%= customer.profession %> interested in <em><%= Str[customer.sex[0]] %></em> or <em><%= Str[customer.sex[1]] %></em>, and they agreed on <strong class="<%= sex %>"><%= Str[sex] %></strong>.<br><br><%- result %>',
      uncooperative: 'But she was uncooperative and <strong>refused</strong>. He left unsatisfied without paying anything.',
      virgin: 'He was thrilled that <%= girl.name %> <strong>lost her virginity</strong> with him.',
      delta: {
        endurance: -10,
        happiness: -5
      }
    }
  }
]);