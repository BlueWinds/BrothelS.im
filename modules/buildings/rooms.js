"use strict";
var Rooms = {};

e.Ready.push(function roomsReady(done) {
  $.each(Rooms, function (type, room) {
    room.type = type;
  });
  done();
});

Building.prototype.buyRoom = function buyRoom(type) {
  var base = Rooms[type].base || { size: 1 };
  var room = $.extend(true, {}, base);
  room.type = type;
  g.money -= Rooms[type].price;
  this.rooms.push(room);
};

Building.prototype.sellRoom = function sellRoom(index) {
  var room = Rooms[this.rooms[index].type];
  g.money += Math.floor(room.price * Building.config.sellRatio);
  this.rooms.splice(index, 1);
};

Building.roomsByType = function roomsByType(type, status) {
  var rooms = g.buildings._filter('status', status || 'Owned')._accumulate('rooms');
  return rooms._flatten()._filter('type', type);
};

Building.roomKeySum = function roomKeySum(type, key, status) {
  return Building.roomsByType(type, status || 'Owned')._accumulate(key)._sum();
};

Building.prototype.potentialRooms = function potentialRooms() {
  var rooms = {};
  var building = this;
  $.each(Rooms, function (type, room) {
    if (room.maxInBuilding <= building.rooms._filter('type', type).length) {
      return;
    }
    rooms[type] = room;
  });
  return rooms;
};

Girl.prototype.bedroom = function bedroom() {
  var rooms = Building.roomsByType('Bedroom', 'Owned');
  return rooms._filter('girl', this.name)[0];
};

e.BuildingDailyDelta.push(function roomsDailyDelta(building, delta) {
  building.rooms.forEach(function (room) {
    if (Rooms[room.type].daily) {
      delta._add(Rooms[room.type].daily);
    }
  });
});

e.BuildingSetStatus.push(function roomsSetBuildingStatus(building) {
  if (building.status != 'Owned') {
    building.rooms.forEach(function (room) {
      delete room.girl;
    });
  }
});

e.GirlSetStatus.push(function roomsSetGirlStatus(girl) {
  if (girl.status != 'Hired') {
    var room = girl.bedroom();
    if (room) {
      delete room.girl;
    }
  }
});
