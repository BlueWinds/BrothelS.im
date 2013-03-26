"use strict";
Game.includes.push(
  'content/girls/Holo/base.js',
  'content/girls/Jill/base.js',
  'content/girls/Kirino/base.js',
  'content/girls/Mana/base.js',
  'content/girls/Saber/base.js',
  'content/girls/Sakuya/base.js',
  'content/girls/Sophitia/base.js',
  'content/girls/Yuna/base.js'
);

Girl.config = {
  startMaxGirls: 1,
  pay: {
    0: -12,
    0.33: -6,
    0.66: -3,
    1: 0,
    1.5: 3,
    2.5: 6
  },
  payRatio: 0.05,
  hirePrice: {
    base: 200,
    happiness: 0,
    endurance: 0,
    obedience: 0,
    modesty: 2,
    charisma: 2,
    constitution: 2,
    intelligence: 5,
    soft: 5,
    hard: 8,
    anal: 10,
    fetish: 15
  },
  startHappiness: 75
};

$.extend(Game.tooltips, {
  endurance: "Endurance is how tired the girl currently is. When this is low, she\'ll be unable to do some jobs.",
  happiness: "Happiness is how much she enjoys her job. This goes down any time she refuses to do a task, or when you\'re not paying her enough. Increase it by paying her more and giving her time off - she\'s more likely to refuse sex when unhappy, and her customers will be less satisfied.",
  obedience: "Obedience is how likely she is to comply when you or a customer ask her to do tasks some might find distasteful. This decreases whenever she refuses. You can increase it using the Lockdown action, available once you own a building and have purchased a Dungeon.",
  modesty: "Modesty measures how much the girl is willing to expose herself in public, degrade herself in front of a group, or is otherwise shy about her body and conservative in her morals. Lower values make her less likely to refuse sex in public. High modesty girls will only have sex with customers in private.",
  charisma: "Charisma is how outgoing, personable and generally attractive she is. Girls with higher charisma get paid more for prostitution.",
  intelligence: "Intelligence is how quickly she learns. Girls with higher intelligence will gain experience more quickly - but they\'ll want to be paid more as well. Increase this with the Study action.",
  constitution: "Constitution is a measure of how quickly she tires. A higher constitution means that Endurance will fall more slowly, and she\'ll be able to service more customers in a day. Increase this with the Exercise action.",
  softLibido: "Oral sex, fingering, licking, and other foreplay.<br><br>Libido measures how much she enjoys a particular sex act. Higher values mean she\'s less likely to refuse and will provide a customer with a better experience. Increase this with the Orgasm Denial action.",
  softExperience: "Oral sex, fingering, licking, and other foreplay.<br><br>Experience measures how often a girl has done a particular sex act, and how good she is at pleasuring customers. Higher values will make her less likely to refuse, and customers will pay more. This will increase as she has more sex of each type.",
  hardLibido: "Fucking. How much she loves and lusts after a good bang.<br><br>Higher values mean she\'s less likely to refuse and will provide a customer with a better experience. Increase this with the Orgasm Denial action.",
  hardExperience: "Vaginal sex is relatively risk free, since most adult entertainers take the cheap and effective Maiden's Tea to prevent unwanted pregnancy.<br><br>Higher values will make her less likely to refuse, and customers will pay more. This will increase as she has more vaginal sex.",
  analLibido: "Though initially hesitant to take it up the ass, it becomes quite enjoyable to many women after some experience.<br><br>Higher values mean she\'s less likely to refuse and will provide a customer with a better experience. Increase this with the Orgasm Denial action.",
  analExperience: "Practice relaxing her ass, and more experience are the keys to a more enjoyable anal experience for both her and her partner.<br><br>Higher values will make her less likely to refuse, and customers will pay more. This will increase as she has more anal sex.",
  fetishLibido: "How much she enjoys being tied up, spanked, gagged, or other similar fetishes.<br><br>Higher values mean she\'s less likely to refuse and will provide a customer with a better experience. Increase this with the Orgasm Denial action.",
  fetishExperience: "With more experience, she becomes less likely to panic with a loss of control, and more willing to fall into a role.<br><br>Higher values will make her less likely to refuse, and customers will pay more. This will increase as she spends more time doing BDSM."
});
