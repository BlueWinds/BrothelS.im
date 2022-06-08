"use strict";
Girls.Kirino = {
  description: "<p>After an attempted affair with her older brother ended in rejection, Kirino ran away from home - and just kept running, until she ran out of land.</p><p>She's made her living for several years now flitting between one 'project' after another, as she calls them. Working for you is the latest - <em>this time</em>, she insists it will work out.</p>",
  status: 'Hired',
  happiness: 90,
  endurance: 100,
  obedience: 60,
  modesty: 10,
  charisma: 50,
  intelligence: 30,
  constitution: 80,
  softLibido: 30,
  softExperience: 30,
  hardLibido: 60,
  hardExperience: 10,
  analLibido: 30,
  analExperience: 5,
  fetishLibido: 0,
  fetishExperience: 0,
  specialRules: {
    payRatio: 0.33
  },
  images: {
    basePath: "content/girls/Kirino/images",
    base: "Base.png",
    refuse: ["Refuse1.jpg", "Refuse2.jpg", "Refuse3.jpg", "Refuse4.jpg", "Refuse5.jpg"],
    tired: ["Tired.jpg", "Tired2.jpg", "Tired3.jpg", "Tired4.jpg", "Tired5.jpg"],
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg", "Soft5.jpg", "Soft6.jpg", "Soft7.jpg", "Soft8.jpg", "Soft9.jpg", "Soft10.jpg", "Soft11.jpg"],
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg", "Hard4.jpg", "Hard5.jpg", "Hard6.jpg", "Hard7.jpg", "Hard8.jpg", "Hard9.jpg"],
    anal: ["Anal1.jpg", "Anal2.jpg", "Anal3.jpg", "Anal4.jpg", "Anal5.jpg", "Anal6.jpg", "Anal7.jpg"],
    fetish: ["Fet1.jpg", "Fet2.jpg", "Fet3.jpg", "Fet4.jpg", "Fet5.jpg", "Fet6.jpg", "Fet7.jpg", "Fet8.jpg", "Fet9.jpg"],
    group: ["Group1.jpg", "Group2.jpg", "Group3.jpg", "Group4.jpg", "Group5.jpg"],
    cleaning: ["Cleaning1.jpg", "Cleaning2.jpg", "Cleaning3.jpg", "Cleaning4.jpg", "Cleaning5.jpg", "Cleaning6.jpg"],
    exercise: ["Exercise1.jpg", "Exercise2.jpg", "Exercise3.jpg", "Exercise4.jpg"],
    study: ["Study1.jpg", "Study2.jpg", "Study3.jpg"],
    naked: ["Naked1.jpg", "Naked2.jpg", "Naked3.jpg", "Naked4.jpg", "Naked5.jpg"],
    prison: ["Prison.jpg", "Prison2.jpg"],
    tentacles: "Tentacles1.png",
    pregnant: ["Pregnant.jpg", "Pregnant2.jpg"]
  },
  Actions: {
    Talk: $.extend(true, { results: {
      Kirino1: {
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
      Kirino2: {
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
      Kirino3: {
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
      Kirino4: {
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
    }}, Actions.Talk)
  }
};
