RandomPeople = {};

var randomPerson = function(_class) {
  var keys = Object.keys(RandomPeople);
  if (!_class) {
    _class = Math.choice(keys);
  }
  keys = Object.keys(RandomPeople[_class]);
  var profession = Math.choice(keys);
  var info = RandomPeople[_class][profession];
  var obj = {
    name: nameGen.randomName(2).capitalize(),
    _class: _class,
    profession: profession,
    wants: [],
    sex: Girl.sex.slice(0)
  };
  if (info.image) {
    obj.image = Math.choice(info.image);
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
  if (info.description) {
    obj.description = Math.choice(info.description);
  }
  obj.class_rank = RandomPeople._classes.indexOf(obj._class);
  return obj;
};
