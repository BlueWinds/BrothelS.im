"use strict";
Game.includes.push(
  'content/buildings/LuxuriousHouse/base.js',
  'content/buildings/Onsen/base.js',
  'content/buildings/Theater/base.js'
);

Building.config = {
  startMaxBuildings: 0,
  noRoomDailyCost: 60,
  sellRatio: 0.5
};

$.extend(Game.tooltips, {
  clean: "Cleanliness is how orderly and generally lacking in grime the building is. Higher Clean makes customers more likely to enter and pay well when they do, and low cleanliness will reduce girls' endurance and happiness.",
  reputation: "Reputation is a measure of how well a building is known, both as a place where adult entertainment can be found and for the quality of the girls usually found within. Higher reputation will attract better customers and more of them.",
  rooms: "Built / Total<br><br>Many buildings have extra rooms that could be renovated into extra bedrooms or other interesting places."
});
