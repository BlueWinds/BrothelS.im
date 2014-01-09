"use strict";
Girls.Anaru = {
  description: "<p>Beautiful but aloof, Anaru kept her distance and her chastity when her unrequited love was for a boy who looked right past her. Eventually she grew apart from her childhood friends, though she could not forget Menma, the lively girl that she both admired and envied. Easily influenced by others, she made some disreputable friends, and was on the wrong path in life when, without warning, adventure knocked in the form of a vortex. She was suddenly and unexpectedly brought to Valaia, and is wondering what to do now that her former life is nothing but a memory.</p>",
  status: 'For Hire',
  happiness: 20,
  endurance: 100,
  obedience: 30,
  charisma: 30,
  modesty: 60,
  intelligence: 30,
  constitution: 20,
  softLibido: 15,
  softExperience: 0,
  hardLibido: 30,
  hardExperience: 0,
  analLibido: 30,
  analExperience: 0,
  fetishLibido: 5,
  fetishExperience: 0,
  images: {
    basePath: "content/girls/Anaru/images",
    base: "Base.png",
    refuse: ["Refuse1.jpg", "Refuse2.jpg", "Refuse3.jpg"],
    tired: ["Tired1.jpg", "Tired2.jpg", "Tired3.jpg", "Tired1.jpg", "Tired2.jpg", "Tired3.jpg", "Tired4.jpg"], //Tired4 less likely
    soft: ["Soft1.jpg", "Soft2.jpg", "Soft3.jpg", "Soft4.jpg", "Soft5.jpg"],
    hard: ["Hard1.jpg", "Hard2.jpg", "Hard3.jpg", "Hard4.jpg", "Hard5.jpg", "Hard6.jpg"],
    anal: ["Anal1.jpg", "Anal2.jpg", "Anal3.jpg", "Anal4.jpg"],
    fetish: ["Fetish1.jpg", "Fetish2.jpg", "Fetish3.jpg", "Fetish4.jpg"],
    group: ["Group1.jpg", "Group2.jpg", "Group3.jpg", "Group4.jpg", "Group5.jpg", "Group6.jpg", "Group7.jpg"],
    cleaning: ["Clean.jpg", "Clean2.jpg", "Clean3.jpg"],
    exercise: ["Exercise1.jpg", "Exercise2.jpg"],
    study: ["Study1.jpg", "Study2.jpg"],
    naked: ["Naked1.jpg", "Naked2.jpg", "Naked3.jpg", "Naked4.jpg"],
    prison: "Prison.jpg",
    tentacles: ["Tentacles1.jpg", "Tentacles2.jpg", "Tentacles3.jpg"],
    pregnant: "Pregnant.jpg"
  },
  specialRules: {
    dependentStats: {
      analLibido: { happiness: 1.5 },
      analExperience: { happiness: 1.5 }
    }
  },
  Actions: {
    Talk: $.extend(true, {
      variants: [
        { time: 'morning', likelyhood: 0.2, result: 'AnaruTour' },
        { time: 'evening', likelyhood: 0.2, result: 'AnaruEvening' },
      ],
      results: {
        Anaru1: {
          message: {
            group: 'Anaru',
            label: 'Talk',
            image: 'content/girls/Anaru/images/Talk1.jpg',
            text: "You pay a visit to Anaru's room at the <<- girl.building() ? girl.building().name : 'inn' >>. You knock, but there is no answer. Cracking the door to see if she's in, you see a flash of flesh - she's present, but very much in a state of undress. << if (girl.modesty > 15) { >>Anaru gasps and clutches at some nearby clothing in an attempt to cover herself quickly, but you have already seen everything. She is blushing intensely. <blockquote>Please knock!</blockquote> You wait outside and let her dress, but you're not surprised when you're not able to get much conversation out of her this visit.<< } else { >>Anaru smiles demurely, but she does not try to cover up. <blockquote>I'm not quite ready yet. Could I get you to wait just a couple of minutes more?</blockquote> You wait outside and let her dress, but when she invites you back in you find it difficult to give your full attention to the conversation.<< } >>"
          },
          girl: {
            obedience: 1.5,
            modesty: -1,
            specialRules: { talk: 1 }
          }
        },
        Anaru2: {
          message: {
            group: 'Anaru',
            label: 'Talk',
            image: 'content/girls/Anaru/images/Talk2.jpg',
            text: "You spend the <<- time >> with Anaru, using the opportunity to ask her again about how she came to this country. She seems tired of the story, as though she's repeated it dozens of times, but she still manages to give you an abridged version. According to her, she was attending class one day when a mysterious man approached her and bowed at her feet, swearing fealty to her and offering her protection. Perhaps because of his presence, a giant crow attacked them both, and the man brought her through a shoku whirlpool to safety. She ended up this land, and when she lost track of him in a scuffle, she had to find employment with her few transferable skills. Luckily, you offered her on-the-job training."
          },
          girl: {
            obedience: 2.5,
            specialRules: { talk: 1 }
          }
        },
        Anaru3: {
          message: {
            group: 'Anaru',
            label: 'Talk',
            image: 'content/girls/Anaru/images/Talk3.jpg',
            text: "When you pay a visit to Anaru's room, she bites her lip with uncertainty as she lets you in. You pay her a consistent daily rate regardless of what you have her do, and you neglected to let her know what was in store for this <<- time >>. She sits on the edge her bed with her eyes closed and her hands resting on her knees nervously. But her apprehension dissolves when you tell her that you're not there for an orgasm denial session. Instead, the two of you sit on the floor and chat and for a couple of hours. You play a few games and try a few jokes that are common where you're from, and eventually Anaru is in tears from laughter. By the end of the <<- time >>, you're both feeling a lot happier."
          },
          girl: {
            obedience: 1,
            happiness: 4,
            specialRules: { talk: 1 }
          }
        },
        AnaruTour: {
          message: {
            group: 'Anaru',
            label: 'Talk',
            image: 'content/girls/Anaru/images/Talk4.jpg',
            text: "You arrange to have an inexpensive horse-cart tour around the city to get Anaru more familiar with her new surroundings. Sure, walking is cheaper, but this is quicker and has the side benefit of impressing her somewhat - horses are rare where she comes from, it seems. Though she has seen some of the city already, she is clearly impressed as the cart driver takes you past a few of the grander buildings. She seems to radiate contentment when you ride through the park, and she blushes but attempts not to look away as you ride through the red-light district. And the end of the trip, you help her down from the cart and pay the driver. Hopefully it was somewhat educational for Anaru."
          },
          girl: {
            obedience: 1.5,
            happiness: 2,
            specialRules: { talk: 1 }
          },
          money: -10
        },
        AnaruEvening: {
          message: {
            group: 'Anaru',
            label: 'Talk',
            image: 'content/girls/Anaru/images/Tired1.jpg',
            text: "It's mid-afternoon, and you've yet to keep your appointment with Anaru. Running a business is a distracting undertaking. Still stuck in your room looking through the brothel's paperwork, you hear a knock at the door. Anaru whispers through the door to ask if you're there. You open the door a crack and can see her dimly in the windowless hallway. She is very aluring, and she seems disappointed when you tell her that you don't think that you'll be able to see her this evening. She nods as though she understands, but she leaves you with an open invitation.<blockquote>Come by my room any time. I would love to see you later tonight.</blockquote>"
          },
          girl: {
            obedience: 1,
            specialRules: { talk: 1 }
          }
        },
      }
    }, Actions.Talk)
  }, // actions

  Missions: {
    AnaruMenmaInvestigation1: {
		conditions: {
			girl: { min: { obedience: 40 }}, // This is default +10, so Anaru confides this when she feels a little more comfortable with you.
			missions: { AnaruMenmaInvestigation1: -3 } //AMI1 not completed
		},
		end: {
			min: { day: '+1' }, // Mission goal after condition trigger: wait one day.
		},
		results: {
			EarlyMorningWalk: {
				message:  {
				  label: 'A Walk With Anaru',
				  group: 'Anaru',
				  image: 'content/girls/Anaru/missionImages/Anaru1.jpg',
				  text: "Anaru rises early and without a word accompanies you as you attend to some errands before breakfast. Most of the trip is uncomfortably silent and without eye contact, but Anaru speaks up when the two of you are passing through a street that is somewhat isolated the morning.<blockquote>I've always given in to peer pressure.</blockquote>She confides this in you with no context, and it's not clear if this is catharsis, a warning, an invitation, or otherwise. From her downcast eyes, you're not sure if she's entirely certain either. Perhaps this distance from home has given her an opportunity to examine herself.",
				  weight: -1
				},
				girl: {
					endurance: -1, // This might make her Rest if she was on borderline endurance, just like waking up early in real life.
					obedience: 1, // Anaru feels closer to you after revealing this.
				},
				mission: 'AnaruMenmaInvestigation2',
			}
		}
    },
	AnaruMenmaInvestigation2: {
      conditions: false,
	  end: {
        girl: { min: { happiness: 80 }}, // Anaru has to be in a happy state for this to trigger.
      },
      results: {
		RedlightTip1: { 
			message:  {
			  label: 'Request from Anaru: Explore the Red-Light District',
			  group: 'Anaru',
			  image: 'content/girls/Anaru/images/Talk4.jpg',
			  text: "Anaru seems excited today. Even before breakfast, she's full of energy, bursting to tell you something!<blockquote>Do you remember me taking about my childhood friend, Menma? I haven't seen her for years, but one of the weaving girls told me she thinks she saw her! Menma is easy to spot because of her <strong>silvery blonde hair</strong>. Apparently she has a place just near the onsen! As soon as you're free, could we please look for around there?</blockquote>As the onsen is in <strong>the red-light district</strong>, perhaps some exploration around there with Anaru might be worthwhile.",
			  weight: -1
			},
			girl: {
				happiness: 8, // Anaru is really enthusiastic about this!
				charisma: 2, // This hope helps to lift the dark clouds hanging over Anaru.
			},
		}
	  }
    },
	AnaruMenmaInvestigation4: {
      conditions: false,
      end: {
	    girl: { max: { endurance: 40 }}, // It's not fun or easy to make Anaru too unhappy, but we can exhaust her.
      },
      results: {
		GarrisonTip: { 
			message:  {
			  label: 'Request from Anaru: Visit the Garrison',
			  group: 'Anaru',
			  image: 'content/girls/Anaru/missionImages/Anaru2.jpg',
			  text: "It's just before sunrise when you see Anaru, and it's clear that she's still not over the disappointment of finding an old guy in the bushes instead of her long-lost friend. She mentions in passing that Rayt the fletcher said he was making a delivery to <strong>the garrison</strong> and saw a girl with flowing silver hair somewhere in the area, but the tip was very vague, and Anaru's not sure if she's left it too long. Still, given how she looks, it could be worth the two of you having a look just for her peace of mind.",
			  weight: -1
			},
			girl: {
				happiness: -2, // Anaru is pretty down about this whole situation, and she feels bad about about letting this tip go stale.
			},
		}
	  }
    },
	AnaruMenmaInvestigation6: {
      conditions: false,
      end: {
		girl: { min: { intelligence: 32 }}, // This is default +2. Anaru has gathered information.
      },
      results: {
		UptownTip1: { 
			message:  {
			  label: 'Request from Anaru: Visit Uptown',
			  group: 'Anaru',
			  image: 'content/girls/Anaru/missionImages/Anaru3.jpg',
			  text: "You catch up with Anaru minutes before work starts for the day, and she wastes no time telling you about a rumor that a foreign empress is currently visiting Valaia. For the safety of the empress, none of this information is supposed to be public, but the secrecy has made it a hot topic of gossip this week. Not much else is known about this visitor other than the fact that she has silver hair. From what you can determine, Anaru now seems determined to meet every visitor with silver hair, regardless of their social station. Arranging a meeting <strong>uptown</strong> like this could be difficult, but the two of you <i>might</i> be able to do it under false pretenses.",
			  weight: -1
			},
			girl: {
				happiness: 2, // Anaru does not yet know that this hope is ill-founded.
			},
		}
	  }
    },
	AnaruMenmaInvestigation8: {
      conditions: false,
      end: {
        girl: { min: { constitution: 25 }}, // This is default +5. Anaru has terrible default constitution, but she can see something in the park if she has a few runs around town.
      },
      results: {
		ParkTip: { 
			message:  {
			  label: 'Request from Anaru: Visit the Park',
			  group: 'Anaru',
			  image: 'content/girls/Anaru/missionImages/Anaru4.jpg',
			  text: "Anaru meets you for breakfast, and she tells you about a girl she saw a glimpse of at a distance playing with dogs at <strong>the park</strong>. She's not certain, but she thinks that the girl might be her friend, Menma. The two of you go right away to fit in a quick visit the park before work, but there are no silver-blonde girls playing with dogs here this morning. If you only had more time, this would have been the perfect day for a peaceful walk around the gardens, so the two of you resolve to explore here for the girl another day soon.",
			  weight: -1
			},
			girl: {
				endurance: -1, // It's exercise.
				obedience: 3, // Your quick action endears Anaru to you a little more.
				constitution: 1, // Exercise deserves to be rewarded with constitution.
			},
		}
	  }
    },
	AnaruMenmaInvestigation10: {
      conditions: false,
      end: {
        girl: { min: { softExperience: 5 }}, // This is default +5. She can only hear about other streetwalkers if she's in the business.
      },
      results: {
		DocksTip: { 
			message:  {
			  label: 'Request from Anaru: Explore the Docks',
			  group: 'Anaru',
			  image: 'content/girls/Anaru/missionImages/Anaru5.jpg',
			  text: "When you see Anaru over breakfast this morning, she tells you about a streetwalker working by <strong>the docks</strong> she's heard of that goes by the name 'Mirajane', and apparently she has silvery hair too. Anaru doesn't really seem comfortable with the idea that the girl she knew when they were kids could be working the same profession that she is. It's a long shot, but she wants to rule out the possibility that Mirajane is Menma.",
			  weight: -1
			},
			girl: {
				obedience: 2, // You are becoming Anaru's confidant.
			},
		}
	  }
    },
	AnaruMenmaInvestigation12: {
      conditions: false,
      end: {
        girl: { min: { constitution: 35 }}, // This is default +15. Anaru desperately needs constitution to be efficient.
      },
      results: {
		UniversityTip: { 
			message:  {
			  label: 'Request from Anaru: Explore the University',
			  group: 'Anaru',
			  image: 'content/girls/Anaru/missionImages/Anaru6.jpg',
			  text: "Even though there is no solid proof that her friend Menma has even ever visited the island, Anaru has been completely taken with the idea that she might be able to see her if she pursues every avenue available to her. When you see Anaru before work this morning, she tells you that she met up with Kud in the park again, and Kud told Anaru about a silver-haired law student she met at <strong>the university</strong>. You try to steer the conversation to something non-Menma related, but it's all she can think about today.",
			  weight: -1
			},
			girl: {
				obedience: 1, // Anaru considers you her friend.
			},
		}
	  }
    },
	AnaruMenmaInvestigation14: {
      conditions: false,
      end: {
        girl: { min: { obedience: 50 }}, // Anaru is likely much closer to you by now.
	  },
      results: {
		UptownTip2: { 
			message:  {
			  label: 'Request from Anaru: Visit Uptown',
			  group: 'Anaru',
			  image: 'content/girls/Anaru/missionImages/Anaru7.jpg',
			  text: "Anaru finds you early this morning and tells you of a popular pianist with silvery hair that she's heard about recently. All of these so far haven't resulted in finding her friend, but it's been a good excuse for the both of you to explore the city. Paying another trip to <strong>uptown</strong> again soon doesn't sound so bad. You tell Anaru that the two of you can go as long as she assures you that this pianist doesn't brandish a whip. She's amused, but she can't make any promises.",
			  weight: -1
			},
			girl: {
				happiness: 2, // Anaru likes having a friend.
			},
		}
	  }
    },
	AnaruMenmaInvestigation16: {
      conditions: false,
      end: {
        girl: {
			min: { happiness: 90 }, // Anaru is in a happy state.
			max: { modesty: 30}, // Anaru has to be more brazen than default to suggest something like this.
		},
      },
      results: {
		RedlightTip2: { 
			message:  {
			  label: 'Request from Anaru: Visit Another Brothel',
			  group: 'Anaru',
			  image: 'content/girls/Anaru/missionImages/Anaru8.jpg',
			  text: "You're still halfway through knocking on Anaru's door to deliver her pay for the week when she's already opened the door and excitedly urging you inside, talking a mile-a-minute.<blockquote>You know how ages ago one of the weaving girls told me that she saw my friend, Menma? She saw the same person again, and it wasn't a weird old guy! She's a whore that lives a few streets away from the onsen, but still in <strong>the red-light district</strong>, and apparently the only way to see her is to book an appointment. I couldn't get many details, and her manager told me that she only takes wealthy clients. I don't know if it's even possible, but could you please see if there's some way you can convince him to book an appointment for the two of us? But... seeing as it would be a reunion for Menma and me, could you not have sex with her? It would mean a lot to me. That is, if it's not too much to ask...</blockquote>",
			  weight: -1
			},
			girl: {
				happiness: 4, // Anaru is again brought genuine happiness by the prospect of seeing her friend.
				modesty: -3, // Anaru has to abandon some modesty to invite you to go to another brothel with her...
				hardLibido: 2, // Maybe Anaru feels a little turned on by the prospect of this outing.
			},
		}
	  }
    },
	AnaruMenmaInvestigation18: {
      conditions: false,
      end: {
        girl: { min: { hardLibido: 40 }}, // Flirting with a hot blacksmith's striker would theoretically raise hardLibido to at least +10 above default.
      },
      results: {
		SlumsTip: { 
			message:  {
			  label: 'Request from Anaru: Explore the Slums',
			  group: 'Anaru',
			  image: 'content/girls/Anaru/missionImages/Anaru9.jpg',
			  text: "Anaru finds you early in the morning and again gives you an update on her search for her friend, Menma. She says that one of the blacksmith's strikers that often flirts with her has seen a girl with silvery-blonde hair frequenting <strong>the slums</strong>. From his description, it's not clear if this could be Kud or Mirajane or any of the other girls you've met recently, but Anaru seems determined to find out. Though she wishes that that could be right now, she's not crazy about the idea of roaming the slums in the darkness before dawn.",
			  weight: -1
			},
			girl: {
				obedience: 2, // Anaru is again somewhat dependent on your company.
				charisma: 3, // Anaru has been successfully flirting for information!
			},
		}
	  }
    },
	AnaruMenmaInvestigation20: {
      conditions: false,
      end: {
        girl: { max: { endurance: 40 }}, // Again, it's not helpful or easy to encourage a drastic reduction in happiness, so endurance substitutes here.
      },
      results: {
		MarketRemaining: { 
			message:  {
			  label: 'A Visit With Anaru',
			  group: 'Anaru',
			  image: 'content/girls/Anaru/missionImages/Anaru10.jpg',
			  text: "You stop by Anaru's room to see how she's doing. She seems downhearted when you visit her today.<blockquote>I'm really glad that we could help out that girl the other day, and we've met a lot of nice people and a couple of scary ones when we've been exploring around the city, but I don't think we're ever going to find Menma. We've explored <strong>everywhere</strong>, right? And it makes me realize that I've been kinda lonely ever since I came to this world. I have you and the other girl<<- g.girls._filter('status', 'Hired').length > 2 ? 's' : '' >>, but there's like nothing from my old life here at all. I just don't understand why that weird guy brought me to this world. Was there even a reason?</blockquote>You don't have a lot of time trying to cheer her up, but you do your best. She might just need some time on her own.",
			  weight: -1
			},
			girl: {
				happiness: -4, // Sometimes people are just sad.
			},
		}
	  }
    },
	AnaruMenmaInvestigation22: {
      conditions: false,
      end: {
        girl: { min: { endurance: 95 }}, // This is to stop it triggering immediately after the reunion.
      },
      results: {
		AnaruWithMenma: { 
			message:  {
			  label: 'A Visit With Anaru and Menma',
			  group: 'Anaru',
			  image: 'content/girls/Anaru/missionImages/Menma3.jpg',
			  text: "You knock on Anaru's bedroom door to invite her for breakfast, and she whispers for you to come in. She's lying on her bed in a camisole and panties with Menma curled up beside her clinging to her arm still sleeping peacefully. Anaru speaks quietly so as not to wake her.<blockquote>Thank you. Thank you so much! There's nothing I could ever do to fully repay you for this, but I will work as hard as I can to try! Having Menma here has been a huge help, and now I'm really appreciating where I am! I have a fun job, I get to meet interesting people, I have a great boss, and get to leave the mistakes of my old life a million miles away!</blockquote>Anaru's happy expression takes on a slight look of concern.<blockquote>But I never did get an answer to the question of why I'm here. Like, not why was I born, but more like why did that weird guy pledge allegiance to me? And why did he bring me to this world? And then why did he leave me here?</blockquote>Feeling perplexed, she shifts a little on her pillow, making Menma stir. You leave Anaru to ponder the mysteries of life with her best friend to support her.",
			  weight: -1
			},
			girl: {
				happiness: 10, // The major happiness payout was the reunion, but it endures.
				obedience: 5, // Anaru has resolved to being a very good employee.
				charisma: 8, // Having her friend back will make her a more cheery person.

			},
		}
	  }
    }
  }, //missions
  
  Events: {
    AnaruMenmaInvestigation3: {
		tags: { redlight: 1 },
		conditions: {
			missions: {
			  AnaruMenmaInvestigation2: 2, //AMI2 completed
			  AnaruMenmaInvestigation4: -3 //AMI4 not completed
			}
		},
		results: {
			RedlightInvestigation1: {
				message: [
				{
					image: 'content/girls/Anaru/missionImages/Jiraiya1.jpg',
					label: 'Explore Red-Light District',
					group: 'Anaru',
					weight: -2,
					text: 'You and Anaru spend the better part of the <<- time >> asking around the red-light district for Menma\'s childhood friend with the silver hair. Some of your neighbors seem to be familiar with <<- Girls.Sakuya.status == "For Hire" ? "" : "a girl named " >>Sakuya, but they haven\'t seen any other girls that meet that description. You\'ve almost given up when you see something silvery near the shrubbery next to the wall of the onsen. You and Anaru go to investigate.',
					delta: false
				}, // Girls.Sakuya.status seems to always return "For Hire", so Arcess is unsure how to reflect a lack of unfamiliarity with Sakuya if she is yet to be hired.
				{
					image: 'content/girls/Anaru/missionImages/Jiraiya2.jpg',
					label: 'The Silver-Haired Stranger',
					group: 'Anaru',
					weight: -2,
					text: 'The two of you are disappointed to find that it is just a weird old man hiding in the bushes, not the girl that Anaru was looking for. He introduces himself as Jiraiya, an author doing research for his next book, and he shakes your hand and offers you his autograph. He isn\'t very forthcoming about what kind of books he writes, so you have a look in the bushes to discover what was so interesting.',
					delta: false
				},
				{
					image: 'content/girls/Anaru/missionImages/Jiraiya3.jpg',
					label: 'The Secret of the Stranger',
					group: 'Anaru',
					weight: -2,
					text: 'It seems that beyond the foliage is a small peephole in the wall of the females\' side of the onsen. Several young women are soaking nude in full view! Anaru puts her eye to the hole after you do, << if (girl.modesty < 20) { >>and gives you a wry smile before taking a second look<< } else { >>but not for long. She looks at the ground, pretending not to blush. Her embarrassment is probably because she likes to bathe there<< } >>. When you turn back around to question Jiraiya a little more about this, he is nowhere to be found. You and Anaru return home having had no success.'
				} // Arcess had the same problem with Buildings.Onsen.status as with Girls.Sakuya.status. Even if the player owns this onsen, that variable doesn't seem to alter.
				],
				mission: 'AnaruMenmaInvestigation4',
				girl: {
					happiness: -5, // Well, this was disappointing.
					endurance: -4, // Not worth the trip.
					softLibido: 2, // Some nudity.
				}
			}
		}
    },
	AnaruMenmaInvestigation5: {
		tags: { garrison: 1 },
		conditions: {
			missions: {
			  AnaruMenmaInvestigation4: 2, //AMI4 completed
			  AnaruMenmaInvestigation6: -3 //AMI6 not completed
			}
		},
		results: {
			GarrisonInvestigation: {
				message: {
					image: 'content/girls/Anaru/missionImages/Sephiroth.jpg',
					label: 'Explore Garrison',
					group: 'Anaru',
					weight: -2,
					text: "It's difficult for you and Anaru to get close to the front gate of the garrison because a crowd of onlookers are watching some kind of confrontation with the garrison guard. As you get nearer to the front of the throng of people, you can see that it is a man with beautiful silver hair who is causing the trouble. You don't even need to ask Anaru: this is not the childhood friend she is looking for. Thankfully, the sparring is only verbal at this stage, so the two of you manage to get away without getting involved."
				},
				mission: 'AnaruMenmaInvestigation6',
				girl: {
					happiness: -1, // Anaru is not too disappointed, because she had low expectations.
					endurance: -4, // Another wasted trip.
				}
			}
		}
    },
	AnaruMenmaInvestigation7: {
		tags: { uptown: 1 },
		conditions: {
			missions: {
			  AnaruMenmaInvestigation6: 2, //AMI6 completed
			  AnaruMenmaInvestigation8: -3 //AMI8 not completed
			}
		},
		results: {
			UptownInvestigation1: {
				message: {
					image: 'content/girls/Anaru/missionImages/Tianzi.jpg',
					label: 'Explore Uptown',
					group: 'Anaru',
					weight: -2,
					text: "Having heard a rumor of a visiting empress with silver hair, you and Anaru dress in your finest clothes and head uptown to try to arrange a meeting. Though you attempt to investigate discretely, you soon come to the attention of her armed contingent who seize both of you and take you inside a nearby building. Before you can formulate a plan for escape, you are brought before a young girl. The captain of the guard speaks.<blockquote>Your Majesty, I have brought the two that you have been seeking.</blockquote>The girl shakes her head, as she's never met either of you.<br><br>The guard captain is a little embarrassed as he leads you back outside to freedom.<blockquote>Please, if you would take this small gift from my mistress, we would be greatly value your discretion in this matter.</blockquote>He sends the two of you on your way with a small purse of coins." 
				},
				mission: 'AnaruMenmaInvestigation8',
				girl: {
					endurance: -6, // Getting captured is draining.
					fetishLibido: 2, // Maybe Anaru liked this.
				},
				money: 200
			}
		}
    },
	AnaruMenmaInvestigation9: {
		tags: { park: 1 },
		conditions: {
			missions: {
			  AnaruMenmaInvestigation8: 2, //AMI8 completed
			  AnaruMenmaInvestigation10: -3 //AMI10 not completed
			}
		},
		results: {
			ParkInvestigation: {
				message: {
					image: 'content/girls/Anaru/missionImages/Kud.jpg',
					label: 'Explore Park',
					group: 'Anaru',
					weight: -2,
					text: "You and Anaru take a walk in the park, and from a distance you see a girl matching Anaru's description of Menma: a happy girl with silvery-blonde hair and big blue eyes. Anaru runs to meet the girl, but stops short when she realizes that it wasn't who she expected.<br><br>The girl sees Anaru anyway and introduces herself as Kud. Though she is also from a far away place, she has never met Menma. The three of you have an enjoyable conversation and share a little bit about from where you each are from, but you and Anaru leave feeling a little deflated."
				},
				mission: 'AnaruMenmaInvestigation10',
				girl: {
					happiness: -1, // So close!
					endurance: -4, // This was no walk in the park.
					intelligence: 1, // Anaru learned a little about a foreign land.
				}
			}
		}
    },
	AnaruMenmaInvestigation11: {
		tags: { docks: 1 },
		conditions: {
			missions: {
			  AnaruMenmaInvestigation10: 2, //AMI10 completed
			  AnaruMenmaInvestigation12: -3 //AMI12 not completed
			}
		},
		results: {
			DocksInvestigation: {
				message: [
				{
						image: 'content/miscImages/docksMorning.jpg',
						label: 'Explore Docks',
						group: 'Anaru',
						weight: -2,
						text: 'You and Anaru walk over to the southern wharves, asking around after a silver-haired girl. One particularly satisfied-looking seaman points you in the direction of a small warehouse, and you and Anaru navigate your way through a few alleys to find it.',
						delta: false
					},
					{
						image: 'content/girls/Anaru/missionImages/Mirajane.jpg',
						label: 'Mirajane at Work',
						group: 'Anaru',
						weight: -2,
						text: 'The large latched door is ajar, and it isn\'t difficult to find her within the warehouse, especially given all the the noisy sex reaching your ears. The two of you sneak up to the warehouse office and find where the sound is coming from, and Anaru looks relieved to see that it is not her friend, Menma. Though you are careful not to make your presence known to the girl and her client, you don\'t waste the opportunity to point out a few tips to Anaru, as you\'re in the presence of a skilled professional.'
					}				
				],
				mission: 'AnaruMenmaInvestigation12',
				girl: {
					endurance: -4, // Endurance is the cost of exploration.
					softLibido: 3, // Anaru saw some of this...
					hardLibido: 3, // And this...
					analLibido: 3, // And this... (pictured) - this stat will also add to happiness for Anaru.
				}
			}
		}
    },
	AnaruMenmaInvestigation13: {
		tags: { university: 1 },
		conditions: {
			missions: {
			  AnaruMenmaInvestigation12: 2, //AMI12 completed
			  AnaruMenmaInvestigation14: -3 //AMI14 not completed
			}
		},
		results: {
			UniversityInvestigation: {
				message: [
				{
					image: 'content/girls/Anaru/missionImages/Franziska1.jpg',
					label: 'Explore University',
					group: 'Anaru',
					weight: -2,
					text: 'You and Anaru take a trip to the university to follow up on a comment Kud made about seeing a silver-haired law student somewhere around here. When you ask at the front desk of the Law Building, the receptionist directs you down a hallway to the ancillary chambers. When you and Anaru open the door specified by the receptionist, a woman with short hair calls out loudly with her eyes closed.<blockquote>I... I love you!"</blockquote>',
					delta: false
				},
				{
					image: 'content/girls/Anaru/missionImages/Franziska2.jpg',
					label: 'Escape University!',
					group: 'Anaru',
					weight: -2,
					text: 'Unfortunately, the love confession was not intended for you and Anaru. The woman is enraged when she see who you are and demands to know your names. She picks up a whip and begins cracking it wildly, and the two of you run from the room and outside of the building, escaping from her furious protests. At the bottom of the steps of the building, you and Anaru start panting for breath, trying not to waste air by laughing too hard. Clearly, this was not the person you were looking for, but you did both get some unexpected exercise!'
				}
				],
				mission: 'AnaruMenmaInvestigation14',
				girl: {
					happiness: 4, // Anaru enjoyed this.
					endurance: -8, // Escape was involved.
					constitution: 2, // Escape is exercise.
					fetishLibido: 1, // Maybe Anaru also liked this.
				}
			}
		}
    },
	AnaruMenmaInvestigation15: {
		tags: { uptown: 1 },
		conditions: {
			missions: {
			  AnaruMenmaInvestigation14: 2, //AMI14 completed
			  AnaruMenmaInvestigation16: -3 //AMI16 not completed
			}
		},
		results: {
			ParkInvestigation: {
				message: {
					image: 'content/girls/Anaru/missionImages/Kanade.jpg',
					label: 'Explore Uptown',
					group: 'Anaru',
					weight: -2,
					text: "It doesn't take too long to find the touring silver-haired pianist; she is newly popular here. Her name is Kanade, and you arrive just in time to buy tickets for you and Anaru to one of her recitals. The usher looks the two of you up and down, taking an extra long look at Anaru, but he doesn't stop you from entering the concert hall. When the curtain rises, your suspicions are confirmed that this is not the friend that Anaru is searching for. Even so, Kanade plays beautifully, and the two of you enjoy your <<- time >> listening to her repertoire."
				},
				mission: 'AnaruMenmaInvestigation16',
				girl: {
					happiness: 4, // This was enjoyable.
					endurance: -2, // This recital mostly involved sitting down.
					intelligence: 1, // It's not book learning, but this is would still be considered being cultured.
				}
			}
		}
    },
	AnaruMenmaInvestigation17: {
		tags: { redlight: 1 },
		conditions: {
			missions: {
			  AnaruMenmaInvestigation16: 2, //AMI16 completed
			  AnaruMenmaInvestigation18: -3 //AMI18 not completed
			}
		},
		results: {
			RedlightInvestigation2: {
				message: [
					{
						image: 'content/girls/Anaru/missionImages/Tessa.jpg',
						label: 'Explore Red-Light District',
						group: 'Anaru',
						weight: -2,
						text: 'You and Anaru head to the red-light district again hoping that the weaving girl that Anaru knows wasn\'t wrong about seeing Menma around here. Anaru found out that the girl she\'s looking for might be working as a whore nearby, and she had you organize an appointment with her manager. The manager wasn\'t particularly forthcoming with information about who you were seeing, as though he just trusted that you knew her by reputation. He did call her \'Tessa\', but he said it in an affected way, as though that was just her professional name. When you meet him at his brothel prior to the appointment, he does little more than check you for weapons and invite Anaru to work for him. She politely declines, clinging to your arm as an expression of loyalty.<br><br>The manager keeps you waiting too long, but finally he permits you to go up to Tessa\'s room.',
						delta: false

					},
					{
						image: 'content/girls/Anaru/missionImages/Tessa<<- g.player.title >>.jpg', // Image varies by gender, default as fallback.
						label: 'Tessa All <<- time.charAt(0).toUpperCase() + time.slice(1) >>',
						group: 'Anaru',
						weight: -2,
						text: 'You open the door slowly, and Anaru eagerly looks through first. She shakes her head, and you consider leaving right away and saving yourself some money, but Anaru gives you a look as though that would be extremely rude.<blockquote>Please, come in. I\'m ready for you.</blockquote>A little awkwardly, you and Anaru shuffle in. Tessa is lying on the bed, barely draped in a single piece of thin pink silk.<blockquote>Oh, my. I am sorry, but I don\'t usually accept couples. Although you are a cute couple...</blockquote>You quickly explain that Anaru is just there to watch and learn from her, which surprises both girls, but neither objects. You begin by removing Tessa\'s piece of pink silk, and you lean down and kiss each of her shoulders. You and she go on to provide an impressive sexual demonstration in a number of creative positions until it is late in the <<- time >>.<br><br><< if (girl.modesty > 14) { >>When you glance over at Anaru afterwards, she removes her hand from under her skirt, looking away sheepishly.<< } else { >>When you look over at Anaru, she returns your gaze lustfully, one hand stimulating herself from the time you and Tessa began.<< } >>' // Anaru's default modesty is 60, so she's come a long way if it's now < 15.
					}
				],
				mission: 'AnaruMenmaInvestigation18',
				girl: {
					happiness: 4, // Anaru was happy that this wasn't Menma.
					endurance: -2, // Anaru didn't have to do much more than watch.
					obedience: 2, // Anaru let you take the lead on this one.
					modesty: -3, // This would help desensitize anyone.
					softLibido: 4, // Watching and not participating would be difficult.
					hardLibido: 4, // Especially this part!
				},
				money: -500
			}
		}
    },
	AnaruMenmaInvestigation19: {
		tags: { slums: 1 },
		conditions: {
			missions: {
			  AnaruMenmaInvestigation18: 2, //AMI18 completed
			  AnaruMenmaInvestigation20: -3 //AMI20 not completed
			}
		},
		results: {
			SlumsInvestigation: {
				message: [
					{
						image: 'content/miscImages/redlightMorning.jpg',
						label: 'Explore Slums',
						group: 'Anaru',
						weight: -2,
						text: 'You and Anaru commence an exploration of the slums, making sure to stick together for safety. You\'ve been asking the residents and cautiously searching for about an hour when Anaru sees a silvery-blonde girl at a distance from behind, noticeable mainly because she is being abducted! The two of you try to run to her aide, but she has been dragged inside a nearby building before you can reach her. You\'re unarmed, so you send Anaru to alert the patrolling guard while you make sure that the girl isn\'t moved to another location. Anaru runs quickly, but the wait is agonizing.<br><br>Anaru finally returns, but without company. She tells you that the guard refused to come to this particular area, as they were too busy looking for a rich old man\'s lost cat. Her voice doesn\'t veil her disgust and disbelief.',
						delta: false
					},
					{
						image: 'content/girls/Anaru/missionImages/Chii.jpg',
						label: 'Rescue',
						group: 'Anaru',
						weight: -2,
						text: 'With no particularly good options available, you slide open the door to the building the girl was taken into, and Anaru quietly follows you in so as to stay off the unsafe street. There is nobody in the first room, and the door to the second room is open. A faint whimpering comes from this room, so you tiptoe to investigate. The only person in this second room is a girl bound and with most of her clothing removed. Her legs are not restrained, so you and Anaru bring her to her feet as silently as you can. The three of you sneak back outside, and the girl looks at you appreciatively.<blockquote>Chii... Chii...</blockquote>With those unexplained words, she runs down the street still bound and almost nude. With her captors likely to notice her absence soon, you and Anaru make sure to leave quickly too, relieved that you noticed this stranger\'s plight.' // This is vague, but the image implies more. To consider in the future: add slight wording variation to suggest a tiny bit more has taken place if Game.fetishes[variable] allows.
					}
				],
				mission: 'AnaruMenmaInvestigation20',
				girl: {
					happiness: 1, // This is a positive outcome to a negative situation.
					endurance: -8, // Anaru ran off to fetch help.
					obedience: -2, // Anaru is disgusted with the reaction of the city's guards.
					fetishLibido: -3, // Seeing someone abducted for non-consensual purposes would be a turn-off.
				}
			}
		}
    },
	AnaruMenmaInvestigation21: {
		tags: { market: 1 },
		conditions: {
			missions: {
			  AnaruMenmaInvestigation20: 2, //AMI20 completed
			  AnaruMenmaInvestigation22: -3 //AMI22 not completed
			}
		},
		results: {
			MarketInvestigation: {
				message: [
				{
					image: 'content/miscImages/marketMorning.jpg',
					label: 'Explore Market...',
					group: 'Anaru',
					weight: -2,
					text: 'The market is a fine place to explore - bustling, lively, full of the populace going about their daily business. Though famous as a sex-capital, the vast majority of people have nothing to do with the oldest profession. Shoes still need to be made, bread baked, and iron bent and pounded into nails. You end up buying a sweet treat for both you and Anaru, but nothing otherwise catches your attention.<br><br><i>Wait, is that...</i>',
					delta: false
				},
				{
					image: 'content/girls/Anaru/missionImages/Menma1.jpg',
					label: 'Menma?',
					group: 'Anaru',
					weight: -2,
					text: '<blockquote>Anaru! Anaru!</blockquote>A girl with silvery hair runs toward Anaru, waving her arms wildly. Anaru has barely has time to turn around before the girl has leaped at her with a hug.<blockquote>Menma? Menma! Menma!</blockquote>',
					delta: false
				},
				{
					image: 'content/girls/Anaru/missionImages/Menma2.jpg',
					label: 'Reunion!',
					group: 'Anaru',
					weight: -2,
					text: 'Anaru tries to speak, but just starts sobbing from happiness instead. Menma keeps her composure a little better, and though her words are still a little choked up by tears.<blockquote>Anaru! I looked so much for you, but so many people have red hair in twintails! I met a monster trainer and a L\'Cie and a wolf-girl... I couldn\'t find you anywhere. But now I found you, Anaru!</blockquote>With tears running down her cheeks, Anaru looks at you and mouths the words \'thank you\'. You nod and tell her to spend some time catching up with her friend.'
				}  // Sometimes exploring the Market can lead to the market orgy event first, which could make finding this event less obvious.
				],
				mission: 'AnaruMenmaInvestigation22',
				girl: {
					happiness: 40, // Big hit of happiness for completing this mission.
					endurance: -2, // But it still involved walking.
				}
			}
		}
    }
  } // events
};