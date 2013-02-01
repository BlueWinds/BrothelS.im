Rooms.Dungeon = {
  price: 1200,
  description: 'Assign up to <<= room.size >> girls to Lockown to increase their Submission at the expense of Happiness and a little bit of Constitution.',
  maxInBuilding: 1
};

Rooms.Bedroom = {
  price: 500,
  description: "Each bedroom can house one girl, allowing her to work in this building and saving a great deal of money since she doesn't need to rent a room at an inn every night.",
  render: function(building, rerender) {
    var room = this;
    var select = $('<select name="girl">').attr('title', Rooms.bedroom.description);
    select.append('<option value=""> - None - </option>');
    var girls = [];
    g.girls._filter('status', 'Hired').forEach(function(girl) {
      if (girl.bedroom() && girl.bedroom() !== room) {
        return;
      }
      var option = $('<option>').attr('value', girl.name).html(girl.name);
      if (room.girl == girl.name) {
        option.attr('selected', true);
      }
      option.appendTo(select);
    });
    $(select).change(function() {
      room.girl = $(this).val();
      rerender();
    });
    return $('<div>').append(select).html();
  },
  base: {}
};