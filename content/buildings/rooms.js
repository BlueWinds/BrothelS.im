Rooms.Dungeon = {
  price: 1200,
  description: 'Assign girls to Lockown to increase their Obedience.',
  maxInBuilding: 1
};

Rooms.Bedroom = {
  price: 500,
  description: "Each bedroom can house one girl for living and working.",
  render: function(building, rerender) {
    var room = this;
    var select = $('<select name="girl">').attr('title', Rooms.Bedroom.description);
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