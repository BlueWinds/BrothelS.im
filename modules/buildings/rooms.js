define(['./schema', 'text!./bedroom.html', 'content/buildings'], function(Building, bedroom_template, config) {
  Building.rooms = {
    bedroom: {
      render: function(room, rerender) {
        var girls = [];
        g.girls.Cfilter('status', 'Hired').forEach(function(girl) {
          if (!girl.bedroom() || girl.bedroom() === room) {
            girls.push(girl);
          }
        });
        var context = {
          building: this,
          room: room,
          girls: girls
        };
        var div = $(ejs.render(bedroom_template, context));
        $('select', div).change(function() {
          room.girl = $(this).val();
          rerender();
        });
        return div;
      }
    },
    dungeon: {
      render: function(room, rerender) {
        var div = $('<div>');
        div.prepend('<h6>Dungeon</h6>');
        var desc = ejs.render(config.rooms.dungeon.shortDesc, room);
        $('<p>').html(desc).appendTo(div);
        return div;
      }
    }
  };
});
