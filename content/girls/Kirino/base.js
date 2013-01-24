Girls.Kirino = {
  description: "<p>After an attempted affair with her older brother ended in rejection, Kirino ran away from home - and just kept running, until she ran out of land.</p><p>She's made her living for several years now flitting between one 'project' after another, as she calls them. Working for you is the latest - <em>this time</em>, she insists it will work out.</p>",
  status: 'Hired',
  happiness: 100,
  endurance: 100,
  obedience: 60,
  modesty: 10,
  charisma: 50,
  intelligence: 30,
  constitution: 80,
  'soft libido': 30,
  'soft experience': 30,
  'hard libido': 60,
  'hard experience': 10,
  'anal libido': 30,
  'anal experience': 5,
  'fetish libido': 0,
  'fetish experience': 0,
  specialRules: {
    payRatio: 0
  },
  images: {
    basePath: "content/girls/Kirino/images",
    base: "Base.png",
    refuse: ["Refuse1.jpg", "Refuse2.jpg", "Refuse3.jpg"],
    tired: "Tired.jpg",
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg"],
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg", "Hard4.jpg"],
    anal: ["Anal1.jpg", "Anal2.jpg", "Anal3.jpg", "Anal4.jpg"],
    fetish: ["Fet1.jpg", "Fet2.jpg", "Fet3.jpg", "Fet4.jpg", "Fet5.jpg"],
    cleaning: ["Cleaning1.jpg", "Cleaning2.jpg"],
    exercise: ["Exercise1.jpg", "Exercise2.jpg", "Exercise3.jpg"],
    study: ["Study1.jpg", "Study2.jpg", "Study3.jpg"],
    naked: ["Naked1.jpg", "Naked2.jpg", "Naked3.jpg", "Naked4.jpg", "Naked5.jpg"],
    prison: "Prison.jpg",
    tentacles: ["Fet1.jpg", "Fet3.jpg", "Fet4.jpg"]
  },
  Actions: {
    Talk: {
      results: [
        {
          message: {
            group: 'Kirino',
            label: 'Talk',
            image: '<<- girl.image("tired") >>',
            text: "Kirino isn't particularly shy, but it's hard to get her to talk about anything that happened before she met you. You don't push her on the subject this time, but do keep it in mind as something to bring up later."
          },
          girl: {
            obedience: 1.5,
            happiness: 1
          }
        },
        {
          message: {
            group: 'Kirino',
            label: 'Talk',
            image: '<<- girl.image() >>',
            text: "As the two of you are looking over the numbers for your business, past and present, Kirino can't stop smiling, and occasionally giggles. Finally you stop and ask her if she'd like to share - indeed she would.<blockquote>Did you know that after a year and a half, my last venture was still in the red? Look at this. I mean... wow. It's just... you're alright, you know that?</blockquote> She stops giggling after that, still looking over at you and smiling occasionally, but somewhat less bubbly than normal."
          },
          girl: {
            obedience: 1.5,
            happiness: 7
          }
        },
        {
          message: {
            group: 'Kirino',
            label: 'Talk',
            image: 'content/girls/Kirino/images/Study2.jpg',
            text: "With no pressing concerns, you and Kirino settle in for a <<- time == 'morning' ? 'lazy afternoon on a park bench' : 'cozy evening in front of the fire' >>. Though she's initially content to sit silently, after a while you can tell she has something on her mind.<blockquote>I... what's it like, where you come from?</blockquote> You tell her a little about your homeland, but it's clearly not what she's really interested in. Finally you mention your parents - ah, that's definitely it. It takes a while, but you manage to tease out the fact that while she loved hers dearly, they didn't have much time to spare for her. She absolutely refuses, however, to explain why she finally left."
          },
          girl: {
            obedience: 2,
            happiness: 3
          }
        },
        {
          message: {
            group: 'Kirino',
            label: 'Talk',
            image: 'content/girls/Kirino/images/Refuse3.jpg',
            text: "You and Kirino are on your way home from doing some grocery shopping when she catches a glimpse of someone familiar, and shoving her bag into your arms, takes off after them without warning. It takes nearly half an hour to locate her again, leaning against a brick wall with her arms crossed and glowering at passersby. <blockquote>I didn't catch him,</blockquote> she announces to you as you get close. You open your mouth to ask what happened, but receive a look which could peel paint off of walls. Staying quiet seems like a good way to not killed, so you snap your mouth shut again without saying anything."
          },
          girl: {
            obedience: -1.5,
            happiness: 2
          }
        }
      ].concat(Actions.Talk.results)
    }
  }
};
