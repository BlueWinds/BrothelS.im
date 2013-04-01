"use strict";
Events.marketOrgy = {
  conditions: {
    ownerParticipation: true
  },
  tags: {
    market: 0.20
  },
  variants: [
    {
      girl: {
        min: { softLibido: 70 }
      },
      likelyhood: 0.75,
      result: 'soft'
    },
    {
      girl: {
        min: { hardLibido: 70 },
        max: { modesty: 20 }
      },
      likelyhood: 0.75,
      result: 'soft'
    }
  ],
  results: {
    soft: {
      message: [
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("soft") >>',
          label: 'Marketplace Gloryhole',
          text: "While exploring the market with you, <<- girl.name >> takes a moment to use a public restroom. It seems to take a while - you've browsed through a set of imported rugs <em>quite</em> thoroughly by the time she returns. A faint whiff of semen tells you that using the bathroom isn't all she's been doing. There was a gloryhole, she admits sheepishly when you ask her about it, and well, she couldn't resist the hard cock thrust her way.<br><br>Since she's obviously horny, and you're never one to miss a chance to make a quick buck, you suggest that she might enjoy spending some more time there while you arrange for a certain bathroom stall to become significantly more expensive and busy than its neighbors. <<- girl.name >> agrees - it sounds like fun.",
          delta: false
        },
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("soft") >>',
          label: 'Marketplace Gloryhole',
          text: "You get some odd looks, standing in the men's restroom collecting money for use of a specific stall, but the slurping, sucking sounds and occasional moan as <<- girl.name >> fingers herself on the other side of the wall make it abundantly clear why someone would pay to enter. She sucks more than a dozen cocks, never seeing their owners, before you look up at the time - the two of you have to go. After finishing a final customer off, you tell the disappointed line that the show's over, and enter the stall yourself. <<- girl.name >> pouts a bit when you tell her there's no more cocks forthcoming - it's clear she'd love nothing more than to do this all day long."
        }
      ],
      girl: {
        endurance: -16,
        happiness: 4,
        softExperience: 5
      },
      money: 310
    },
    hard: {
      message: [
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("soft") >>',
          label: 'Marketplace Gangbang',
          text: "While exploring the market with you, <<- girl.name >> takes a moment to use a public restroom. It seems to take a while - you've browsed through a set of imported rugs <em>quite</em> thoroughly by the time she returns. A faint whiff of semen tells you that using the bathroom isn't all she's been doing. There was a gloryhole, she admits sheepishly when you ask her about it, and well, she couldn't resist the hard cock thrust her way.<br><br>Since she's obviously horny, and you're never one to miss a chance to make a quick buck, you suggest that she might enjoy spending some time selling something more interesting than rugs in the marketplace. <<- girl.name >> agrees - it sounds like fun.",
          delta: false
        },
        {
          group: '<<- girl.name >>',
          image: '<<- girl.image("group") >>',
          label: 'Marketplace Gangbang',
          text: "You quickly rent a tent, offering more money to the fortune teller than she would ever make in a day and clearing aside astrological charts, get the place ready. <<- girl.name >> does a short strip-tease out front, rapidly shedding clothing and gathering a crowd before slipping inside with a seductive come-hither gesture. You step outside and make your announcement - \"group of <<- Math.floor(Math.random() * 6) + 6 >>,\" pay in advance, one hour. Since there are more men (and a few women) who want in than the tent is prepared to handle (though you're sure <<- girl.name >> would be willing to take on all of them), you set a high but fair price, and soon the lucky group enters.<br><br>"
        }
      ],
      girl: {
        endurance: -16,
        happiness: 4,
        softExperience: 5
      },
      money: 310
    },
    nothing: {
      message: {
        group: '<<- girl.name >>',
        image: '<<- time == "morning" ? "content/miscImages/marketMorning.jpg" : "content/miscImages/marketEvening.jpg" >>',
        label: 'Missed Opportunity',
        text: "While exploring the market with you, <<- girl.name >> takes a moment to use a public restroom. It seems to take a while - your mouth is thoroughly watering by the time she returns from the kabob stall you were waiting next to. She explains that there was quite a line at the restroom, both the men and women's sides - one of the stalls on each side was completely \"occupied.\" You press her for a slightly less vague answer, and it finally comes out that there was a woman collecting money for use of a gloryhole, and she had quite a line."
      },
      girl: { endurance: -6 }
    }
  }
};
