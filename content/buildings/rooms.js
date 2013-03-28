"use strict";
Rooms.Dungeon = {
  price: 1200,
  description: 'Assign girls to Lockown to increase their Obedience and decrease Intelligence.',
  maxInBuilding: 1
};

Rooms.Bedroom = {
  price: 500,
  description: "Each bedroom can house one girl for living and working."
};

Rooms.Washroom = {
  price: 1000,
  description: "A washroom will help your girls stay clean, increasing their Endurance.",
  daily: {
    money: -10,
    girl: {
      endurance: 6
    }
  },
  maxInBuilding: 1
};

Rooms.Kitchen = {
  price: 750,
  description: "A kitchen keeps your girls happier since they don\'t always have to go out for food.",
  daily: {
    money: -10,
    girl: {
      happiness: 2,
      endurance: 1
    }
  },
  maxInBuilding: 1
};
