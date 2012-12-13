RandomPeople = {};

var randomPerson = function(class_) {
  var keys = Object.keys(RandomPeople);
  if (!class_) {
    class_ = Math.choice(keys);
  }
  keys = Object.keys(RandomPeople[class_]);
  var profession = Math.choice(keys);
  var info = RandomPeople[class_][profession];
  var obj = {
    name: nameGen.randomName(2).capitalize(),
    class_: class_,
    profession: profession,
    wants: [],
    sex: ['soft', 'hard', 'anal', 'fetish']
  };
  if (info.image) {
    obj.image = Math.choice(info.image);
  }
  var idx = 0;
  var chance = 0.5;
  while (obj.wants.length < 4) {
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
  return obj;
};
