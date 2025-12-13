"use strict";
var RandomPeople = {};

function Person(obj) {
  this._class = 'Person';
  if (!obj) {
    obj = Math.choice(Object.keys(RandomPeople));
  }
  if (typeof(obj) == 'string') {
    var base = RandomPeople[obj];
    obj = {
      name: nameGen.randomName(2).capitalize(),
      type: obj,
      profession: Math.choice(Object.keys(base)),
      wants: [],
      sex: Girl.sex.slice(0),
      modestyRate: 1
    };
    var info = base[obj.profession];
    if (info.image) {
      obj.image = Math.choice(info.image);
    }
    if (info.description) {
      obj.description = Math.choice(info.description);
    }
    var idx = 0;
    var chance = 0.5;
    while (obj.wants.length < 3) {
      if (Math.random() > chance) { idx = 0; }
      else if (Math.random() > chance) { idx = 1; }
      else if (Math.random() > chance) { idx = 2; }
      else { idx = 3; }
      obj.wants.push(info.wants[idx]);
    }
    Math.shuffle(obj.sex);
    obj.typeRank = RandomPeople._classes.indexOf(obj.type);
  }
  $.extend(true, this, obj);
}

Person.prototype.sexType = function sexType(girl) {
  return this.sex.filter(a => girl.actions[a])[0];
};

Person.prototype.satisfaction = function getSatisfaction(girl) {
  var sex = this.sexType(girl);
  var satisfaction = girl.get(this.wants[0]) * 0.66;
  satisfaction += girl.get(this.wants[1]) * 0.33;
  satisfaction -= this.sex.indexOf(sex) * 12.5;
  if (girl.happiness < 50) {
    satisfaction -= 50;
    satisfaction += girl.happiness;
  }
  return satisfaction / 100;
};

Person.prototype.base = function base() {
  return Person.prostitution.customerClass[this.type];
};
