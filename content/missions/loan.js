"use strict";

Missions.firstPayment = {
  conditions: {
    missions: {
      exploreCity: 2,
      firstPayment: -3
    }
  },
  special: {},
  initialize: function () {
    // 10000 + 50% of cash on hand.
    this.special.amount = Math.floor(10000 + g.money * 0.5);
  },
  display: {
    group: 'Payment Due',
    label: 'Payment Due',
    image: 'content/missions/loan/Seal.png',
    weight: -3,
    text: "Well fuck.<br><br>They found you. You knew it was going to happen eventually, but you'd also hoped it would take at least another month or two. A courier delivered the letter midmorning - nothing so crass as a horse head on your pillow, but the effect is much the same. $<<- mission.special.amount >>, to be delivered to Lady Meghan in 30 days (<strong>Day <<- mission.end.max.day >></strong>). There's no signature, no pleasantries, just a symbol pressed into the paper, filled with green wax. Quite a large sum, but the message is clear. They know where you are, and your failure has not been forgotten.<br><br><< if (g.money < mission.special.amount) { >><em>(Don't worry if you can't save the full amount by the due date.)</em><< } >>"
  },
  end: {
    min: { day: '+30' },
    max: { day: '+30' }
  },
  variants: function (context, done) {
    var text = "You're not familiar with the lady you're supposed to deliver payment to, but one of your contacts in the Guild knows where to find her, a small house in Uptown. Though not a mansion as almost all of the surrounding buildings are, it's never the less in the most expensive part of town. You leave all of your girls to their work and head off to pay your respects (and your dues). The door opens after the first knock, revealing a young woman of university age. When you ask after Lady Meghan she smiles and invites you in - that's her.<br><br>The house seems to consist of only three rooms, kitchen joined to living room by an open counter and bedroom partitioned off with a curtain. You decline a cup of tea in her rather cramped living room, preferring to get straight to business. She seems entirely at home surrounded by bookshelves, dirty dishes perched wherever they can find space.";
    var pay = Math.max(0, Math.min(g.money, this.special.amount));
    if (pay == this.special.amount) {
      text += "You pass her the note and a bag of coins. She nods. Was that a faint hint of disapproval crossing her features as she saw the emblem impressed on the bottom of the note? It would seem odd, that you'd have to deliver your payment to someone who disapproved of the concept, but such is life. Meghan counts the money rapidly, then <blockquote>Your payment has been received in full...</blockquote>";
    } else {
      text += "You pass her the note and a " + (pay ? 'partially full' : 'completely empty') + " bag of coins with a nervous cough. You don't have all the money yet, you explain, but if she'll just give you a few more weeks... she looks at the note you handed her, a flicker of disapproval crossing her face. Not at you, oddly enough, but directed slip of paper. <blockquote>I will cover it, just this once. Your payment has been received in full... </blockquote>";
    }
    var options = [
      {
        label: '... Sir',
        key: 'male',
        title: 'You are a man. Congratulations.'
      },
      {
        label: '... Madame',
        key: 'female',
        title: 'You are a woman. Congratulations.'
      }
    ];
    // http://danbooru.donmai.us/posts/1392264?tags=yukinoshita_yukino
    var results = this.base().results;
    Game.getUserInput(text, 'content/missions/loan/Meghan.jpg', options, function genderAnswer(answer) {
      g.player.gender = answer;
      g.player.title = answer == 'male' ? 'Sir' : 'Madame';
      var result = $.extend({}, results[pay == context.mission.special.amount ? 'full' : 'partial']);
      result.money = -pay;
      done(result);
    });
  },
  results: {
    full: {
      message: {
        group: 'Payment Due',
        label: 'Visit to Lady Meghan',
        weight: -2,
        image: 'content/missions/loan/Meghan.jpg',
        text: "<blockquote>Your payment has been received in full, <<- g.player.title >>.</blockquote> She asks again if you'd like to stay for some tea, but you decline. This whole situation is quite odd, and you need some time to think about it. No one would dare forge the symbol on the note, but why would she be collecting your payments, out of all possible people in the city? You hurry home."
      },
      mission: 'secondPaymentWait'
    },
    partial: {
      message: {
        group: 'Payment Due',
        label: 'Visit to Lady Meghan',
        weight: -2,
        image: 'content/missions/loan/Meghan.jpg',
        text: "<blockquote>Your payment has been received in full, <<- g.player.title >>.</blockquote> She asks again if you'd like to stay for some tea, but you decline. This whole situation is quite odd, and you need some time to think about it. No one would dare forge the symbol on the note, but why would she be collecting your payments, out of all possible people in the city? And how can a young woman like this afford to cover such a large payment on a whim? You hurry home."
      },
      mission: 'secondPaymentWait'
    }
  }
};

Missions.secondPaymentWait = {
  conditions: false,
  end: { min: { day: '+5' }},
  results: { done: { mission: 'secondPayment' }}
};

Missions.secondPayment = {
  conditions: false,
  special: {},
  initialize: function () {
    // 1000, or seven days of income, whichever is greater.
    this.special.amount = Math.min(1000, g.averageIncome() * 7 + g.money * 0.5);
  },
  display: {
    group: 'Payment Due',
    label: 'Payment Due',
    image: 'content/missions/loan/Seal.png',
    weight: -3,
    text: "Another note. This one had no apparent means of delivery, simply showing up on your bed-stand this morning. A group capable of locating a <<- g.player.gender == 'male' ? 'man' : 'woman' >> halfway around the world would have no difficulty lifting a note into place. The demand is far more reasonable this time, a mere $<<- mission.special.amount >>, delivered on <strong>Day <<- mission.end.max.day >></strong>, again to Lady Meghan.<br><br><em>Missing a payment from here on out is one of the very few ways to actually lose the game.</em>"
  },
  end: {
    min: { day: '+30' },
    max: { day: '+30' }
  },
  variants: function (context, done) {
    var text;
    if (g.money < this.special.amount) {
      text = "This is not particularly good. You spend the evening in increasing panic, running around the city looking for someone who will loan you money - your reputation must be worth something by now - but... fair weather friends. You find nothing.<br><br>Finally resolved to your fate, you visit Meghan with all the money you've managed to scrape together. She declines it with a shake of her head and a sympathetic look - if you can't pay in full, you should keep what you have. It's not impossible to escape, but you'll definitely have to leave the island. Too bad - you were really starting to like Vailia.";
      g.gameOver(text, 'content/missions/loan/Seal.png');
      return;
    }
    text = "With a bit more confidence this time, you head for Lady Meghan's house to deliver your payment. She's not so bad, for a collection agent of a nearly world-spanning and completely ruthless trade organization. Knocking on her door yields no result though - no one home. Odd. Given the part of town, you'd have expected at least a servant. Then you remember what the inside of this small house looks like, and realize that there's no room for a maid between all the bookshelves.<br><br>Wondering what to do next, you're about to leave and come back later when you spot Meghan tottering down the street, carrying a massive load of books. Where does she plan to fit them? You rush over as she nearly trips, teetering precariously... and falls into you with a thunderous crash, books flying all over the street. You begin to untangle yourself from the pile of literature and limbs, but Meghan doesn't move. As you move to cradle her head, her eyes flicker open.<blockquote>Ow. Merde... Ow. Sorry. Are you all right...</blockquote>";
    var results = $.extend(true, {}, this.base().results.done);
    results.money = -this.special.amount;
    Game.getUserInput(text, 'content/missions/loan/Meghan.jpg', 'Your Name', function (answer) {
      g.player.name = answer;
      done(results);
    });
  },
  results: { done: {
    message: [
      {
        group: 'Payment Due',
        label: 'Visit to Lady Meghan',
        weight: -2,
        image: 'content/missions/loan/Meghan.jpg',
        text: '<blockquote>Are you all right <<- g.player.name >>?</blockquote> You nod. How did she know your name? You\'re reasonably certain you never shared it with her on your last visit. She rubs the back of her head where it hit the street and starts gathering up her books. As you help, you can\'t avoid noticing some of the titles - "Vailia\'s Wildlife," "Beasts of the Great Northern Wastes," "A Magician\'s Guide to Undersea Flora." You help her carry her books the rest of the way to her house, and deposit them on the only free space available, blocking the entryway.',
        delta: false
      },
      {
        group: 'Payment Due',
        label: 'Visit to Lady Meghan',
        weight: -2,
        image: 'content/missions/loan/Meghan.jpg',
        text: "She accepts your payment with a frown, as if reminded of some unpleasant duty. By this time the questions have piled high enough that you accept her invitation to stay for tea. The preparation is... interesting. She does nothing more than touch the kettle and it begins to steam instantly, hands you a cup that you would have sworn was dirty a moment ago but is now perfectly clean, and pours freshly prepared tea from the pot that she neither bothered heating nor putting tea leaves in. It's the sort of causal magic almost never seen in the outside world - only in Vailia does one warp reality to save a bit of firewood. You wonder if the kettle and cups are enchanted, or if Meghan is, despite all appearances, a supremely powerful wizard. You ask about her job, hoping she doesn't decide to turn you into a frog for prying and that it gives you some hint."
      },
      {
        group: 'Payment Due',
        label: 'Visit to Lady Meghan',
        weight: -2,
        image: 'content/missions/loan/Meghan2.jpg',
        text: "<blockquote>I maintain the city wards.</blockquote>Oh. Right. Those. You've heard of them, some sort of magical barrier protecting the city. You'll have to look into it more later, but it doesn't seem like Lady Meghan wants to talk about the issue any further. You glance down at your hands. Good, not a frog yet. The tea is excellent, and you spend nearly an hour discussing less sensitive topics such as the weather, the past and upcoming festivals, and any books you've read recently. The last subject holds her interest particularly well, and you eventually have to excuse yourself before she can press a fourth book you just <em>have to</em> read into your hands.",
        delta: false
      }
    ]
  }}
};

Missions.LapisAzurai = {
  conditions: {
    missions: {
      firstPayment: 2,
      LapisAzurai: -3
    }
  },
  special: {},
  display: {
    group: 'Developer Note',
    label: 'A new game',
    image: 'content/missions/loan/Lapis.jpg',
    weight: -10,
    text: "A note from BlueWinds, the developer:<br><br>If you're enjoying this game, why note check out <a href='https://www.kickstarter.com/projects/bluewinds/lapis-azurai'>my newest one</a>? There's a playable demo - and I promise it's a lot more polished than this, my earliest effort. I make games with your support - please consider contributing and spreading the word."
  },
  end: {
    min: { day: '+1' },
    max: { day: '+1' }
  },
  results: {done: {}}
};
