/* Scene Booker — content/feedback.js (role C3, the night).
 * Comments by cause, voice, direction and knowledge level; wrong readings; posts; luck lines; ledger labels;
 * the night's ticker; debrief lead-ins; helper reports; flavor clauses. Schema: design/spec/03-content.md section 7.
 * Data only: one assignment, no functions. Every name a line needs comes in through a slot.
 *
 * Comment paths: feedback.comments.<CAUSE>.<VOICE | ANY>.<UP | DOWN>.<NEW | LEARNING | KNOWS>.
 * NEW names the symptom and points where to look. LEARNING names the cause the way a booker says it.
 * KNOWS gives a number, a time or an instruction. One cause per line, one or two sentences.
 */
SB.Content.feedback = {
  comments: {

    /* ---------------- GENRE_MIX: the genres on the bill shared, split or stacked the crowd ---------------- */
    GENRE_MIX: {
      ANY: {
        DOWN: {
          NEW: ["The crowd kept changing between sets.", "Felt like two different shows tonight."],
          LEARNING: ["The {genreA} people and the {genreB} people didn't stay for each other."],
          KNOWS: ["{genreA:cap} and {genreB} don't share a crowd here. Put them on different nights."]
        },
        UP: {
          NEW: ["People stayed for every band.", "Nobody went outside between sets."],
          LEARNING: ["The {genreA} crowd liked the {genreB} bands fine. That bill fit together."],
          KNOWS: ["{genreA:cap} and {genreB} share a crowd in this town. Stack them and everybody stays all night."]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["Weird bill.", "Odd mix tonight, if you ask me."],
          LEARNING: ["{genreA:cap} and {genreB} don't share a crowd here. Never have.", "Half the room left after the {genreA} band. That's the bill, not the bands."],
          KNOWS: ["In this town the {genreA} people and the {genreB} people won't stand in the same room. The second set clears the first set's crowd, so pick one.", "I've watched {genreA} and {genreB} split a room for twenty years. Put them on separate nights and both nights do better."]
        },
        UP: {
          NEW: ["Good bill.", "That bill made sense, start to finish."],
          LEARNING: ["{genreA:cap} into {genreB} works here. Same people, mostly.", "Everybody who came for the first band was still there for the last."],
          KNOWS: ["{genreA:cap} and {genreB} have always had the same crowd here. Bill them together and nobody goes home early.", "You built that bill the right way: {genreA} and {genreB}, one crowd, start to finish. Do it like that again."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["My friends left after the second band."],
          LEARNING: ["I like the {genreA} stuff but I wasn't staying for the {genreB} band."],
          KNOWS: ["Half of us only come for the {genreA} bands. Mix in {genreB} and we leave at the changeover."]
        },
        UP: {
          NEW: ["Stayed the whole night for once."],
          LEARNING: ["I came for the {genreA} band and liked the {genreB} ones too."],
          KNOWS: ["{genreA:cap} with {genreB} is my favorite kind of night of yours. Everybody I know stays for both."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["The room kind of emptied out before we went on."],
          LEARNING: ["The crowd that was here for the {genreA} band didn't stick around for us."],
          KNOWS: ["Put us with bands that sound like us. Half the room tonight wasn't there for our kind of thing."]
        },
        UP: {
          NEW: ["Everybody stayed for us. Didn't expect that."],
          LEARNING: ["The locals you put us with had the same crowd we do."],
          KNOWS: ["Good match on the bill. Same crowd for every band means the room's still full when the touring band plays."]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["People kept going outside."],
          LEARNING: ["Half of them left between bands. The bar noticed."],
          KNOWS: ["When the room empties between every band, the bar does nothing. Book bands that keep people inside."]
        },
        UP: {
          NEW: ["Nobody left early. That's good for me."],
          LEARNING: ["Same people in here all night. The bar liked that."],
          KNOWS: ["A bill that keeps people inside all night is worth more to me than a big band. Do it like this again."]
        }
      }
    },

    /* ---------------- GEN_MIX: generations on the bill ---------------- */
    GEN_MIX: {
      ANY: {
        DOWN: {
          NEW: ["The room was all one age, then all another."],
          LEARNING: ["The {genA} came early and the {genB} came late, and they didn't overlap."],
          KNOWS: ["{genA:cap} for the openers, {genB} for the headliner, and neither stayed for the other. Build the bill for one crowd."]
        },
        UP: {
          NEW: ["Every age in the room tonight."],
          LEARNING: ["The bill brought the {genA} and the {genB} and both stayed."],
          KNOWS: ["{kids:words:cap} kids and {old:words} old heads in one room, and that bill did it. Do it once a season, not every week."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["Two different crowds tonight, one after the other.", "The young ones left right when the older ones showed up."],
          LEARNING: ["Kids came for the openers and were gone by the time the {genB} got here.", "I stamped a lot of hands early and a lot late, and hardly any in the middle."],
          KNOWS: ["{kids:words:cap} kids and {old:words} old heads, but never at the same time. That bill splits the night in half.", "First hour was {genA}, last hour was {genB}. They passed each other in the doorway."]
        },
        UP: {
          NEW: ["Weird mix of people tonight. In a good way.", "Every age through the door tonight."],
          LEARNING: ["Half kids, half people my age. I haven't seen that at one of mine.", "The {genA} and the {genB} both came and both stayed."],
          KNOWS: ["Kids came for the openers, old heads for {touring}, and both stayed. That bill does it.", "I counted {kids:words} kids, {middle:words} in the middle and {old:words} old heads. That's the most even night I've had."]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["Lot of kids. Didn't know anybody."],
          LEARNING: ["The bill was for the kids. Nobody my age had a reason to come."],
          KNOWS: ["Give us one band we grew up on and we'll stand next to the kids. Tonight there wasn't one."]
        },
        UP: {
          NEW: ["Haven't seen a room like that in a while."],
          LEARNING: ["Young ones and old ones in the same room. That's the bill, and it doesn't happen by accident."],
          KNOWS: ["You put a band everybody grew up on with kid bands that sound like it. That's how you get both generations, so do it once a season, not every week."]
        }
      },
      KID: {
        DOWN: {
          NEW: ["it was mostly old guys by the end lol"],
          LEARNING: ["none of my friends stayed for the last band, it was like a dad show"],
          KNOWS: ["if the closer is an old head band all of us leave before them. put a band we know last or end with the kids"]
        },
        UP: {
          NEW: ["my friend's dad was there and he was dancing"],
          LEARNING: ["the old heads were actually really nice to us, they let us up front"],
          KNOWS: ["when there's a band we like and a band our parents liked everybody comes. do that again"]
        }
      }
    },

    /* ---------------- ORDER: who played in which slot ---------------- */
    ORDER: {
      ANY: {
        DOWN: {
          NEW: ["The room peaked at the wrong time."],
          LEARNING: ["The order was off. The band people came for wasn't where the room was fullest."],
          KNOWS: ["Put the touring band second to last and your biggest local last. The room is fullest there."]
        },
        UP: {
          NEW: ["The room was full when it counted."],
          LEARNING: ["Good order tonight. Every band got a room."],
          KNOWS: ["Second to last for {touring}, biggest local closing. That's the order and it worked."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["We went on kind of early.", "Wish we'd played a little later."],
          LEARNING: ["We played early and half the room was still outside.", "The room filled up for the band after us."],
          KNOWS: ["Put the touring band where the room peaks. On a bill this size that's second to last, not where you had us.", "We played to the early crowd and the closer got the full room. Swap that and the night pays everybody."]
        },
        UP: {
          NEW: ["Great crowd for our set.", "Room was packed when we went on."],
          LEARNING: ["Second to last was perfect. Room was full.", "You had us on right when everybody was there."],
          KNOWS: ["You put us second to last with your biggest local closing. Room was at its fullest when we played.", "Best slot of the night, and you knew it. Bands remember which bookers do that."]
        }
      },
      SOUND: {
        DOWN: {
          NEW: ["The loud band went first? Huh."],
          LEARNING: ["Your heaviest band opened and everybody after sounded quiet."],
          KNOWS: ["Heaviest band third, not first. People's ears adjust upward, not down."]
        },
        UP: {
          NEW: ["Order made sense from back here."],
          LEARNING: ["It got louder all night, which is how you want it."],
          KNOWS: ["Quietest first, heaviest late. Every band sounded bigger than the last, which is the whole trick."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["Lot of people showed up right as somebody finished."],
          LEARNING: ["People came for {band} and {band} had already played."],
          KNOWS: ["Most people walked in after {lastStart}, and the band they asked about at the door had gone on before that. Play the draw later."]
        },
        UP: {
          NEW: ["People got here in time for who they came for."],
          LEARNING: ["Everybody who asked about {band} got in before they started."],
          KNOWS: ["The big rush was right before {band} went on. That's the order doing its job."]
        }
      },
      LOCAL_BAND: {
        DOWN: {
          NEW: ["We'd love to go later next time."],
          LEARNING: ["Our people come late. We played to nobody we knew."],
          KNOWS: ["Our friends don't show up till ten. Put us after that and we bring twice as many."]
        },
        UP: {
          NEW: ["Thanks for the good slot."],
          LEARNING: ["Going on right before the touring band was great for us."],
          KNOWS: ["That slot was right for us. Our people were all here by then and they stayed for the touring band."]
        }
      }
    },

    /* ---------------- RUNTIME: set lengths, changeovers, running late, curfew ---------------- */
    RUNTIME: {
      ANY: {
        DOWN: {
          NEW: ["It ran late.", "The night dragged."],
          LEARNING: ["Changeovers ran long and it pushed everything back {late:words} minutes."],
          KNOWS: ["The last set started at {lastStart}. Shared drums and tighter sets would have had it done before people left."]
        },
        UP: {
          NEW: ["Ran on time for once."],
          LEARNING: ["Short changeovers. Everybody saw every band."],
          KNOWS: ["Done on time because the bands shared gear and nobody played over. Keep doing exactly that."]
        }
      },
      SOUND: {
        DOWN: {
          NEW: ["We ran late. Real late.", "Behind all night. Sorry."],
          LEARNING: ["Changeovers were fifteen minutes every time. Nobody shared drums.", "Every band played long and every changeover was slow, so we ended up {late:words} minutes behind."],
          KNOWS: ["Three changeovers at fifteen is forty-five minutes of nothing. Get them sharing a kit and you're done before people leave.", "We ran {late:words} minutes over and the last set started at {lastStart}. Lock set lengths in the advance and hold them to it."]
        },
        UP: {
          NEW: ["Ran on time. I don't know how.", "Right on schedule tonight."],
          LEARNING: ["Everybody shared the kit. Changeovers were five minutes.", "Nobody went over their time. That's rare."],
          KNOWS: ["Five-minute changeovers. That's what sharing gear buys you: {touring} went on right when they were supposed to.", "Set times in the advance, one kit, one bass cab. That's why we were done on time."]
        }
      },
      KID: {
        DOWN: {
          NEW: ["had to leave early :("],
          LEARNING: ["my ride came and the band i came for hadn't even started yet"],
          KNOWS: ["if the band we came for goes on at {lastStart} on a school night none of us see it. end by 10:30 or put them earlier"]
        },
        UP: {
          NEW: ["got to see everybody!!"],
          LEARNING: ["it ended early enough that my mom didn't have to wait outside"],
          KNOWS: ["everything was done before my curfew so all my friends could come. keep it like that and we'll keep coming"]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["Went late."],
          LEARNING: ["You said you'd be done on time and you were {late:words} minutes past. The neighbors noticed."],
          KNOWS: ["Done on time means done on time. Last band starts early enough to finish, not at {lastStart}."]
        },
        UP: {
          NEW: ["Done when you said. Appreciate it."],
          LEARNING: ["Ended on time. That's the thing I care about most."],
          KNOWS: ["You ended right on the clock. Do that every time and you can have this room whenever you want it."]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["Too long a night.", "Bands play too long these days."],
          LEARNING: ["Every band played ten minutes too long. Used to be twenty-five and off."],
          KNOWS: ["Twenty-five minutes for openers, forty for the headliner. That's how we did it and nobody ever complained."]
        },
        UP: {
          NEW: ["Short and sweet. I like that.", "Nobody overstayed."],
          LEARNING: ["Short sets. Everybody left wanting more, which is the point."],
          KNOWS: ["Short sets, quick changes, home by midnight. That's a show people come back to."]
        }
      }
    },

    /* ---------------- ROOM_FIT: room size and type for this draw and genre ---------------- */
    ROOM_FIT: {
      ANY: {
        DOWN: {
          NEW: ["The room felt wrong for this one."],
          LEARNING: ["Wrong room for the bill. It never felt like a show."],
          KNOWS: ["{n:words:cap} people in {room} feels empty. Right-size the room and the same crowd feels packed."]
        },
        UP: {
          NEW: ["Right room for it."],
          LEARNING: ["The room fit the crowd. It felt full."],
          KNOWS: ["{n:words:cap} in {room} is a packed room. Book this kind of bill there every time."]
        }
      },
      SOUND: {
        DOWN: {
          NEW: ["Room didn't do them any favors.", "Tough room for that band."],
          LEARNING: ["That room eats low end. The bass was mud.", "Big hard room, quiet band. It swallowed them."],
          KNOWS: ["{room} is all hard walls. A band like that needs a low ceiling and a small floor, not this.", "Wrong room for that sound. Put them somewhere half the size and they'll sound twice as big."]
        },
        UP: {
          NEW: ["Good room for them.", "That room liked that band."],
          LEARNING: ["Small room, loud band, low ceiling. It sounded huge.", "The room did half my job tonight."],
          KNOWS: ["It's the low ceiling that does it for a band like that. Book them somewhere like this every time.", "{room} is the right size for this kind of band. Nothing to fix, just remember it."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["Big room for us."],
          LEARNING: ["We were playing to a lot of empty floor."],
          KNOWS: ["Forty people in a carport beats sixty in a hall. Put us somewhere our crowd fills."]
        },
        UP: {
          NEW: ["Small room! Loved it."],
          LEARNING: ["The room was the right size. Nobody was standing in an empty room."],
          KNOWS: ["Right-size the room and it feels like a show. This one did, at {n} people."]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["Room looked empty."],
          LEARNING: ["Too big a room for this crowd. It looked dead from the door."],
          KNOWS: ["My room needs about twice what you had to feel like anything. Bring smaller bills somewhere smaller."]
        },
        UP: {
          NEW: ["Room looked good tonight."],
          LEARNING: ["Right crowd for my room. It looked like a real night."],
          KNOWS: ["About {n} is what this room wants. That's a good number for me, so keep bringing bills that size."]
        }
      }
    },

    /* ---------------- AGE_GATE: 21+ locked out the kids; all-ages lost the bar crowd ---------------- */
    AGE_GATE: {
      ANY: {
        DOWN: {
          NEW: ["Some people couldn't get in.", "Wrong age policy for this bill, maybe."],
          LEARNING: ["The age policy kept out the people this bill draws."],
          KNOWS: ["{turned:words:cap} turned away at the door, and they're who the openers draw. Match the ages to the bill."]
        },
        UP: {
          NEW: ["Everybody who wanted in got in."],
          LEARNING: ["Right age policy for this bill. Nobody was turned away."],
          KNOWS: ["All ages for a bill the kids care about. That's {kids:words} people a bar show doesn't get."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["Had to turn away a few kids.", "Some people couldn't get in."],
          LEARNING: ["Turned away {turned:words} who weren't old enough. Their friends' band was on the bill.", "Lots of kids at the door with no wristband to give them."],
          KNOWS: ["{turned:words:cap} turned away, and they're who the openers draw. Don't put an all-ages band in a 21+ room.", "Every kid I sent home was there for a local on the bill. That's {turned:words} people the age policy cost me."]
        },
        UP: {
          NEW: ["Didn't have to turn anybody away.", "Lot of kids came."],
          LEARNING: ["All ages meant {kids:words} kids came through. They don't get to see much.", "Nobody stuck outside tonight."],
          KNOWS: ["{kids:words:cap} under-21s paid tonight. A bar show doesn't get any of them.", "All ages on this bill was right: {kids:words} kids, nobody turned away, and they bought merch."]
        }
      },
      KID: {
        DOWN: {
          NEW: ["couldn't get in"],
          LEARNING: ["it was 21+ and i'm 17. so"],
          KNOWS: ["every time it's at a bar we can't come. the openers are our friends' bands, that's who's missing"]
        },
        UP: {
          NEW: ["i got in!!"],
          LEARNING: ["finally a show at a real place that let us in"],
          KNOWS: ["all ages means my whole friend group comes. we're like half the crowd for the openers"]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["Bar was slow."],
          LEARNING: ["All-ages crowd doesn't buy drinks. The bar barely made anything."],
          KNOWS: ["All ages means early and a room fee; 21 and up, I'll take it on the bar. Pick one."]
        },
        UP: {
          NEW: ["Bar did fine."],
          LEARNING: ["Right crowd for the bar. People were buying."],
          KNOWS: ["Over-21 bill, over-21 room, and the bar had a good night. That's how you get my Fridays."]
        }
      }
    },

    /* ---------------- NIGHT: day of the week, school night, payday ---------------- */
    NIGHT: {
      ANY: {
        DOWN: {
          NEW: ["Hard night of the week for a show.", "A lot of people had work in the morning."],
          LEARNING: ["{dow:cap} is a hard night here. People stay home."],
          KNOWS: ["A {dow} here does about {par} for a bill like this. Save the bigger bills for a weekend."]
        },
        UP: {
          NEW: ["Good night for it.", "People were ready to go out."],
          LEARNING: ["{dow:cap} is a good night here. People were out anyway."],
          KNOWS: ["{dow:cap} works in this town. Put the bills you care about on this night."]
        }
      },
      KID: {
        DOWN: {
          NEW: ["it was a school night", "half my friends couldn't come, school tomorrow"],
          LEARNING: ["{dowLower} is hard. my mom said no", "nobody can go out on a {dowLower}, we have school"],
          KNOWS: ["fridays and saturdays or a sunday afternoon. weeknights it's only the kids who drive", "on a {dowLower} it's like four of us. on a friday it's all of us, that's just how it is"]
        },
        UP: {
          NEW: ["no school tomorrow!!", "everybody could come tonight"],
          LEARNING: ["{dowLower} is the best night, nobody's parents care", "nobody had to be home early because it was a {dowLower}"],
          KNOWS: ["{dowLower} is when all of us can come. put the all-ages ones on {dowLower} and you'll get {kids:words} of us every time", "no school the next day means everybody comes and stays to the end. book the kid stuff for this night"]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["I almost didn't come out tonight."],
          LEARNING: ["{dow:cap} is rough for me and most people I know. Work."],
          KNOWS: ["Most of us work early. On a {dow} you get the twelve of us who'd come to anything, and that's it."]
        },
        UP: {
          NEW: ["Good night to be out."],
          LEARNING: ["{dow:cap} is easy. Everybody was out already."],
          KNOWS: ["On a {dow} I bring three people, and on a weeknight I come alone. Book the good ones here."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["Slow at the door. Felt like a weeknight."],
          LEARNING: ["People kept saying they had work in the morning."],
          KNOWS: ["{n:words:cap} paid on a {dow}. Same bill on a Friday is easily half again more."]
        },
        UP: {
          NEW: ["Busy at the door tonight."],
          LEARNING: ["Everybody was out already. Half of them came from somewhere else first."],
          KNOWS: ["{n:words:cap} on a {dow}. This night does numbers here, so don't waste it on a small bill."]
        }
      }
    },

    /* ---------------- PROMO_ANNOUNCE: when the show was announced ---------------- */
    PROMO_ANNOUNCE: {
      ANY: {
        DOWN: {
          NEW: ["People found out about this one late."],
          LEARNING: ["It got announced late. People had already made plans."],
          KNOWS: ["Announced {daysOut:words} days out. People need about three weeks, so announce when you confirm."]
        },
        UP: {
          NEW: ["People knew about this one a long time ago."],
          LEARNING: ["Announced early, and people planned around it."],
          KNOWS: ["Announced {daysOut:words} days out. That's enough time for people to plan around it."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["Didn't know about it till yesterday!", "Wait, when did you announce this?"],
          LEARNING: ["You announced it like a week out. I already had plans.", "I found out late. Most people I know did too."],
          KNOWS: ["I need about three weeks. Most of us do, so announce when you confirm, even if the bill's not done.", "You announced it {daysOut:words} days out. By then my whole month was spoken for."]
        },
        UP: {
          NEW: ["Had this one on my calendar forever.", "Knew about this a month ago."],
          LEARNING: ["You announced early, so I could get the night off.", "Early announcement. I told everybody."],
          KNOWS: ["{daysOut:words:cap} days of notice is perfect. I got off work and brought two people.", "Announce a month out like this and people plan around you instead of the other way."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["Lot of 'just found out' at the door."],
          LEARNING: ["I asked how they heard. A lot of them only heard this week."],
          KNOWS: ["Of {n}, most heard about it in the last week. It went out {daysOut:words} days ahead, which is too late for planners."]
        },
        UP: {
          NEW: ["People knew about this one."],
          LEARNING: ["People said they'd been planning on it for weeks."],
          KNOWS: ["Most people I asked had it planned weeks back. Announcing {daysOut:words} days out did that."]
        }
      },
      POSTS: {
        DOWN: {
          NEW: ["wait there was a show tonight??"],
          LEARNING: ["found out about this one the day of, would've come"],
          KNOWS: ["announce shows earlier please, some of us have jobs. like three weeks earlier"]
        },
        UP: {
          NEW: ["been waiting on this one forever"],
          LEARNING: ["had this one on the calendar since it got announced"],
          KNOWS: ["shows announced a month out are the only ones i actually make it to. this was one"]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["Felt like people didn't know we were coming."],
          LEARNING: ["Nobody here seemed to know about the show until this week."],
          KNOWS: ["Every town that announces three weeks out does twice what this did. Get it out the day you confirm."]
        },
        UP: {
          NEW: ["People knew we were coming!"],
          LEARNING: ["You got the word out early. It showed."],
          KNOWS: ["You announced the day you confirmed. Most towns wait, and most towns are half this."]
        }
      }
    },

    /* ---------------- PROMO_FLYER: when and whether the flyer was made ---------------- */
    PROMO_FLYER: {
      ANY: {
        DOWN: {
          NEW: ["Didn't hear about this one till late."],
          LEARNING: ["The flyer came out late."],
          KNOWS: ["A flyer needs three weeks. This one got {daysOut:words} days."]
        },
        UP: {
          NEW: ["Saw the flyer a while back."],
          LEARNING: ["The flyer was out early."],
          KNOWS: ["Flyer out a month ahead. It shows."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["A lot of people said they didn't know about it till today.", "Hardly anybody mentioned the flyer."],
          LEARNING: ["I asked everybody: most heard from the bands, hardly anyone saw a flyer.", "Nobody'd seen a flyer. They heard from friends."],
          KNOWS: ["Of {n}, {fewSaw:words} saw a flyer. The flyer went up {daysOut:words} days out, and it needs three weeks to work.", "{fewSaw:words:cap} people out of {n} said the flyer. That's what {daysOut:words} days out gets you."]
        },
        UP: {
          NEW: ["People kept saying they saw the flyer.", "Lot of people mentioned the flyer."],
          LEARNING: ["I asked everybody. A lot of them had seen the flyer weeks ago.", "The flyer did work tonight. People brought it up on their own."],
          KNOWS: ["The flyer was out {daysOut:words} days ahead. That's why {n} people knew where to be.", "Most of the people who said 'flyer' saw it weeks back. Early flyers reach people who aren't already in the loop."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["Never saw a flyer for this one."],
          LEARNING: ["I usually see your flyers weeks ahead. This one I saw the day before."],
          KNOWS: ["Your flyer went up {daysOut:words} days out. I need to see it a few times before I make plans."]
        },
        UP: {
          NEW: ["Saw your flyer everywhere."],
          LEARNING: ["The flyer was up early. I had it on my fridge."],
          KNOWS: ["Flyer up {daysOut:words} days ahead, and I saw it three times before the show. That's how I remember."]
        }
      },
      HELPER: {
        DOWN: {
          NEW: ["Flyer got out kind of late, I think."],
          LEARNING: ["I didn't have the flyer in time to get it out early."],
          KNOWS: ["I had the flyer {daysOut:words} days out. Get it to me a month ahead and I can actually do something with it."]
        },
        UP: {
          NEW: ["The flyer went over well."],
          LEARNING: ["Had the flyer early, so it was everywhere for weeks."],
          KNOWS: ["Flyer in my hands {daysOut:words} days out is the right amount of time. People saw it more than once."]
        }
      }
    },

    /* ---------------- PROMO_POSTERS: posters around town, where and when ----------------
     * Flags at a house, yard or DIY show: askAPunk (the flyer said to ask) or addressOut (the address was printed). */
    PROMO_POSTERS: {
      ANY: {
        DOWN: {
          NEW: ["Didn't see any posters for this one."],
          LEARNING: ["[?askAPunk: The posters said ask a punk, and people over thirty don't know who to ask. | ?addressOut: The posters had the address, but they went up too late to matter. | The posters went up late, or not at all.]"],
          KNOWS: ["[?askAPunk: Ask-a-punk posters lose the old heads; the kids find it anyway. Weigh that before you print. | ?addressOut: The address was on every pole, and it went up {daysOut:words} days out. Strangers found it; regulars didn't plan for it. | Posters need two to three weeks on the wall. These had {daysOut:words} days.]"]
        },
        UP: {
          NEW: ["People saw posters around town."],
          LEARNING: ["[?askAPunk: The posters said ask a punk, and the kids asked. | ?addressOut: The address was on the posters, and people who don't know anybody came anyway. | The posters did their job this time.]"],
          KNOWS: ["[?askAPunk: Ask-a-punk posters kept the night to people who know people, and the kids still found it. | ?addressOut: The address on the poster brought {old:words} old heads who'd never have asked. | Posters up {daysOut:words} days ahead. That reaches the people who don't follow anybody online.]"]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["Didn't see a single poster.", "Used to be you'd see a show on every pole."],
          LEARNING: ["[?askAPunk: Poster said ask a punk. Who am I going to ask? | ?addressOut: Saw the address on a pole the day before. Too late for me. | No posters. I don't look at phones for shows.]", "[?askAPunk: Nobody my age knew where it was. | The posters went up the week of, and by then I'd made plans.]"],
          KNOWS: ["[?askAPunk: Nobody over thirty knew where it was. Ask-a-punk works for kids, not for us. | ?addressOut: The address was on a pole downtown {daysOut:words} days out, and that's not enough time for people like me. | Put posters up three weeks out at the record store and the coffee place. That's where people my age look.]", "[?askAPunk: Ask-a-punk cost you everybody my age, and I'd guess that's {old:words} people who'd have come. | Posters {daysOut:words} days out is too late for anybody with a job and a kid. Three weeks.]"]
        },
        UP: {
          NEW: ["Saw your poster at the coffee place.", "Posters, the old-fashioned way. I like it."],
          LEARNING: ["[?askAPunk: The poster said ask a punk, so I asked one. Took two tries. | ?addressOut: Saw the poster with the address and just came. | Posters up early. That's how I find out about anything.]", "[Saw it on the record store wall weeks ago. That's how it should work.]"],
          KNOWS: ["[?askAPunk: I had to ask around, but the poster was up early enough that I could. | ?addressOut: Address on the poster, poster up weeks ahead. That's why the old heads came. | Posters at the record store three weeks out bring my whole crowd. Don't stop doing it.]", "[Poster up {daysOut:words} days ahead in places people my age walk past. That's the whole trick.]"]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["Nobody older said they saw a poster."],
          LEARNING: ["[?askAPunk: A few older people said they saw the poster and couldn't find out where it was. | Barely anybody said posters. The ones who did were all over thirty.]"],
          KNOWS: ["[?askAPunk: Three people told me they saw the poster and had to text around for the address. Ask-a-punk costs you the ones who don't know anybody. | ?addressOut: People came straight off the poster, address and all, but the poster went up {daysOut:words} days out. | Of {n}, hardly anyone said posters. Posters reach the over-thirties, and they need weeks.]"]
        },
        UP: {
          NEW: ["Older folks kept saying they saw a poster."],
          LEARNING: ["[?askAPunk: A lot of older people said they asked around after seeing the poster. | Posters pulled the thirty-and-up crowd. Record store and the coffee place.]"],
          KNOWS: ["[?addressOut: Lot of faces I'd never seen, all off the poster with the address. | {old:words:cap} of the over-thirties said the poster. Kids never mention posters.]"]
        }
      },
      HELPER: {
        DOWN: {
          NEW: ["I don't think the posters did much this time."],
          LEARNING: ["[?askAPunk: People kept asking me where it was when I was putting them up. | Posters went up late. That's on the schedule, not the route.]"],
          KNOWS: ["[?addressOut: Got them up {daysOut:words} days out with the address on them. Next time give me three weeks. | Posters need three weeks on the wall. I got them up {daysOut:words} days out.]"]
        },
        UP: {
          NEW: ["Posters went over well I think."],
          LEARNING: ["[?askAPunk: A couple people stopped me on the route to ask where. That's working. | Got them up early and they stayed up.]"],
          KNOWS: ["[Got the route done {daysOut:words} days out. People at the door said record store and coffee place, the two spots I hit first.]"]
        }
      }
    },

    /* ---------------- PROMO_SHARES: whether the bands shared it ---------------- */
    PROMO_SHARES: {
      ANY: {
        DOWN: {
          NEW: ["Not many people came for the bands themselves."],
          LEARNING: ["The bands didn't share it. Their people didn't know."],
          KNOWS: ["When a band shares the flyer, its people come. {band:cap} never did, and its people didn't."]
        },
        UP: {
          NEW: ["The bands brought their people."],
          LEARNING: ["Every band shared the flyer, and it showed at the door."],
          KNOWS: ["All the bands shared it early. That's where most of the night's walk-ins came from."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["Not many people came for the touring band.", "Barely anybody said they came for a band."],
          LEARNING: ["Nobody'd seen the touring band share it. Their people here didn't know.", "I asked who people came for. Hardly anybody named {band}, and {band} never posted about it."],
          KNOWS: ["{touring:cap} never posted the flyer. Ask them to, in the advance, because that's where their ten to fifteen people come from.", "Of {n}, only a handful came for {band}. A band that shares the flyer brings its friends, and this one didn't."]
        },
        UP: {
          NEW: ["Lot of people said they came for a band.", "People knew who they were here for."],
          LEARNING: ["Every band posted it. Half the room named a band at the door.", "{band:cap} shared it and their people showed up."],
          KNOWS: ["{count:words:cap} people said they saw a band's post. When the bands share it, that's your walk-in crowd.", "{band:cap} posted the flyer twice. That's most of the people who named them at the door."]
        }
      },
      LOCAL_BAND: {
        DOWN: {
          NEW: ["We should've posted about it more, honestly."],
          LEARNING: ["We forgot to share the flyer until the day of. Sorry."],
          KNOWS: ["Send us the flyer the day it exists and we'll post it. That's where our people find out."]
        },
        UP: {
          NEW: ["We posted it and our friends came!"],
          LEARNING: ["We shared it a couple times. Our whole crew showed."],
          KNOWS: ["You got us the flyer early and we posted it twice. That's why our people were here."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["Our people here didn't know we were coming."],
          LEARNING: ["We never shared the flyer for this one. That's on us."],
          KNOWS: ["Send us the flyer with the advance and we'll post it. We have friends in every town, but they have to know."]
        },
        UP: {
          NEW: ["Our friends here came out!"],
          LEARNING: ["We posted it and the people who know us here showed up."],
          KNOWS: ["You sent the flyer early enough for us to post it twice. Our people here came because of that."]
        }
      }
    },

    /* ---------------- PROMO_DMS: whether you asked people directly ---------------- */
    PROMO_DMS: {
      ANY: {
        DOWN: {
          NEW: ["People who'd have come didn't hear about it."],
          LEARNING: ["Nobody got asked directly. People wait to be asked."],
          KNOWS: ["Message the people who come to everything. One message each brings their friends with them."]
        },
        UP: {
          NEW: ["People came because somebody asked them."],
          LEARNING: ["Asking people directly worked. They brought friends."],
          KNOWS: ["You messaged the people who come to everything, and they each brought somebody. Do it every time."]
        }
      },
      KID: {
        DOWN: {
          NEW: ["i didn't know about it till my friend posted from inside", "nobody told me"],
          LEARNING: ["usually somebody messages us about your shows. nobody did this time", "if nobody tells us we don't know, we don't look at flyers"],
          KNOWS: ["message the kids who come to everything. they tell everybody, that's how we find out about anything", "one message to me is like eight kids. nobody sent one this time"]
        },
        UP: {
          NEW: ["my friend told me", "somebody messaged me about it!!"],
          LEARNING: ["{you} messaged my friend and she told like ten people", "you asked me to come so i brought my whole group"],
          KNOWS: ["you messaged the kids who come to everything and we all told everybody. that's {kids:words} of us right there", "message me again next time, i'll bring the same people. that's how it works"]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["Didn't hear from you about this one."],
          LEARNING: ["You usually message me about your shows. Nobody asked this time."],
          KNOWS: ["When you ask me, I come and I bring two people. This time nobody asked."]
        },
        UP: {
          NEW: ["Thanks for the message about it."],
          LEARNING: ["You messaged me, so I came and brought my roommate."],
          KNOWS: ["One message from you is three people from me. Keep doing that."]
        }
      }
    },

    /* ---------------- PROMO_PUSH: final-week and day-of posts ---------------- */
    PROMO_PUSH: {
      ANY: {
        DOWN: {
          NEW: ["People forgot it was tonight."],
          LEARNING: ["Nothing went out the week of, so people who meant to come forgot."],
          KNOWS: ["Post the week of and again the morning of. People who saw the flyer a month ago need the reminder."]
        },
        UP: {
          NEW: ["People remembered it was tonight."],
          LEARNING: ["The posts the week of reminded people."],
          KNOWS: ["The day-of post brought in the ones who'd forgotten. Post in the morning and again at five."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["Totally forgot this was tonight.", "Oh, that was tonight?"],
          LEARNING: ["I saw the flyer weeks ago and then forgot. Nothing reminded me.", "No posts the week of. I just forgot."],
          KNOWS: ["I'd seen the flyer a month ago and forgot. A post the morning of would've got me there.", "People like me plan, then forget. Post the week of and the day of, every time."]
        },
        UP: {
          NEW: ["Saw you posting all week!", "The reminder got me out of the house."],
          LEARNING: ["The posts the week of reminded me. I'd forgotten.", "Saw the day-of post at lunch and made it."],
          KNOWS: ["The day-of post got me. I'd seen the flyer a month ago and forgot, so post the morning of and at five.", "That last-week push is worth it. Half my friends came off the day-of post."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["A few people said they meant to come and forgot. They told me later."],
          LEARNING: ["People knew about it, but nobody was reminded. The walk-up was dead."],
          KNOWS: ["Almost nobody walked up after doors. That's what no day-of post looks like."]
        },
        UP: {
          NEW: ["Lot of people walked up late."],
          LEARNING: ["People kept saying they saw the post today."],
          KNOWS: ["{count:words:cap} people said the day-of post. That's your walk-up crowd."]
        }
      },
      POSTS: {
        DOWN: {
          NEW: ["dang, that was tonight?"],
          LEARNING: ["totally forgot about this, nobody posted about it this week"],
          KNOWS: ["remind us the day of!! i plan things and then i forget them"]
        },
        UP: {
          NEW: ["tonight!!! go"],
          LEARNING: ["saw the post this morning and made it, glad i did"],
          KNOWS: ["the day-of reminder is the only reason i went, keep doing that"]
        }
      }
    },

    /* ---------------- PROMO_EXIT: flyering at another show ---------------- */
    PROMO_EXIT: {
      ANY: {
        DOWN: {
          NEW: ["The people from the other shows didn't know about this one."],
          LEARNING: ["Nobody handed out flyers at the other shows. That's where your crowd already is."],
          KNOWS: ["Hand flyers out at the shows the week before. Those are people who already go out."]
        },
        UP: {
          NEW: ["People said they got a flyer at another show."],
          LEARNING: ["Handing out flyers at the last show worked."],
          KNOWS: ["{count:words:cap} people came off flyers handed out at another show. Best hour you spent."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["Didn't see many people from the other shows.", "Lot of regulars from other bookers' shows weren't here."],
          LEARNING: ["People who go to every show didn't know about this one. Nobody handed out flyers.", "The crowd from {otherShow|the other shows} never heard about this."],
          KNOWS: ["Stand outside the show the week before with a stack of flyers. That's {count:words|a dozen} people I didn't get.", "Hand flyers out at the exit of a bigger show. People coming out of a good night will plan the next one."]
        },
        UP: {
          NEW: ["People said they got a flyer at a show.", "Somebody handed me back a flyer you gave them last week."],
          LEARNING: ["People came with the flyer from the last show still in their pocket.", "Handing out flyers at the other show brought new faces."],
          KNOWS: ["{count:words:cap} people said they got the flyer leaving another show. Do that every time.", "Flyers at the exit of a show last week brought people who've never been to one of yours."]
        }
      },
      BOOKER: {
        DOWN: {
          NEW: ["Didn't see you at my show this month."],
          LEARNING: ["You could've handed flyers out at mine. I don't mind."],
          KNOWS: ["Come stand outside mine with flyers. Same people, different night, and I'll do it at yours."]
        },
        UP: {
          NEW: ["Saw you outside my show with flyers."],
          LEARNING: ["Your flyers at my show worked. A few of mine went to yours."],
          KNOWS: ["You flyered my exit and I flyered yours, and both nights did better. Let's keep doing that."]
        }
      },
      KID: {
        DOWN: {
          NEW: ["didn't know about this one"],
          LEARNING: ["usually somebody hands us a flyer at the last show, nobody did"],
          KNOWS: ["hand us flyers when we leave a show, we keep them. that's literally how we know what's next"]
        },
        UP: {
          NEW: ["got a flyer at the last show!!"],
          LEARNING: ["someone handed me a flyer at the other show so i came"],
          KNOWS: ["i still had the flyer from last week in my backpack. give us flyers at every show"]
        }
      }
    },

    /* ---------------- DOOR_PRICE: price too high, too low, right ---------------- */
    DOOR_PRICE: {
      ANY: {
        DOWN: {
          NEW: ["Some people balked at the price."],
          LEARNING: ["{price:money} was too much for the people this bill draws."],
          KNOWS: ["At {price:money} the kids and the broke ones stayed home. For this crowd, price it lower."]
        },
        UP: {
          NEW: ["Nobody complained about the price."],
          LEARNING: ["{price:money} was right. Nobody thought twice."],
          KNOWS: ["{price:money} is the right price for this crowd. Everybody who wanted to come could."]
        }
      },
      KID: {
        DOWN: {
          NEW: ["it was kinda expensive", "couldn't afford it this time"],
          LEARNING: ["{price:money} is a lot for us, my friends didn't come", "$5 is the most i can do and my friends are the same"],
          KNOWS: ["at $5 my whole friend group comes. at {price:money} it's two of us, do the math", "{price:money} means we pick one show a month. at $5 we come to all of them"]
        },
        UP: {
          NEW: ["it was cheap!!", "so cheap"],
          LEARNING: ["{price:money} is perfect, everybody could come", "cheap enough that i brought my little brother"],
          KNOWS: ["at {price:money} my whole friend group comes. keep it there and we'll keep coming", "{price:money} is the right price for us. more than that and you lose half the kids"]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["Couple people turned around when I said the price."],
          LEARNING: ["People looked at the price and left. More than I usually see."],
          KNOWS: ["{count:words:cap} people walked up, heard {price:money} and walked away. Two dollars less and they'd be inside."]
        },
        UP: {
          NEW: ["Nobody blinked at the price."],
          LEARNING: ["Price was right. People paid and some put extra in."],
          KNOWS: ["{price:money} and nobody turned around. A few people even said keep the change."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["Bit steep for a local bill."],
          LEARNING: ["{price:money} for this bill? I almost didn't come."],
          KNOWS: ["I'll do {price:money} for a touring band I know. For three locals, half that, or I stay home."]
        },
        UP: {
          NEW: ["Good price."],
          LEARNING: ["Cheap enough I brought somebody."],
          KNOWS: ["At {price:money} I bring a friend every time. Keep it there."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["Felt like a high door for this town."],
          LEARNING: ["People here seemed thrown by the price."],
          KNOWS: ["Most towns this size do $7. At {price:money} you lose more heads than you gain dollars."]
        },
        UP: {
          NEW: ["Good door price."],
          LEARNING: ["The price was right for the room. Everybody came in."],
          KNOWS: ["{price:money} was right. Cheap door, full room, and people had money left for merch."]
        }
      }
    },

    /* ---------------- DOOR_COUNT: guest list, the count, cash handling ---------------- */
    DOOR_COUNT: {
      ANY: {
        DOWN: {
          NEW: ["Lot of people on the list."],
          LEARNING: ["{list:words:cap} on the list on a {n}-person night. That's too much of the door."],
          KNOWS: ["Cap the list at one per band member. {list:words:cap} free at {price:money} is money you didn't have."]
        },
        UP: {
          NEW: ["The count was clean."],
          LEARNING: ["Short list, clean count. The money added up."],
          KNOWS: ["{list:words:cap} on the list and a tally that matched the cash box. That's how a settle should feel."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["Lot of people on the list.", "The list got long tonight."],
          LEARNING: ["{list:words:cap} on the list on a {n}-person night. That's a big piece of my door.", "Bands kept adding friends to the list at the door."],
          KNOWS: ["Cap the list at one per band member. {list:words:cap} free on a {price:money} night is real money I didn't have.", "{list:words:cap} comps and {n} through the door. Write the list down before doors and don't add to it after."]
        },
        UP: {
          NEW: ["Count's clean.", "Easy count tonight."],
          LEARNING: ["Short list. Everybody else paid.", "Kept a tally all night. The cash box matched it."],
          KNOWS: ["{list:words:cap} on the list and a mark for every head. The cash matched to the dollar.", "One list, written before doors, nobody added after. That's why the count was easy."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["The count felt a little loose."],
          LEARNING: ["Seemed like a lot of people got in free tonight."],
          KNOWS: ["We counted the room and the door didn't match. Keep a tally we can see and settle goes quicker."]
        },
        UP: {
          NEW: ["Thanks for showing us the count."],
          LEARNING: ["The count was written down and it made sense. Appreciate that."],
          KNOWS: ["Paid off a written count with the list on it. Bookers who do that, we come back to."]
        }
      }
    },

    /* ---------------- SOUND: quality of sound and the sound person ---------------- */
    SOUND: {
      ANY: {
        DOWN: {
          NEW: ["It sounded rough tonight."],
          LEARNING: ["The sound was the problem tonight. People noticed."],
          KNOWS: ["Get a sound person who knows the room. Tonight's sound cost the night more than anything else."]
        },
        UP: {
          NEW: ["It sounded good."],
          LEARNING: ["Good sound tonight. Every band came across."],
          KNOWS: ["{sound|Whoever ran sound} knew the room. Get them every time you can."]
        }
      },
      SOUND: {
        DOWN: {
          NEW: ["Sounded rough tonight. Sorry.", "Couldn't get it right tonight."],
          LEARNING: ["That room eats low end. The bass was mud.", "Not enough gear for that room. The vocals never came through."],
          KNOWS: ["Hard walls in there. Next time put the bass cab on a chair and tell the bands to turn down a third.", "I needed a second monitor and a vocal mic that works. Advance the gear and I can fix most of this."]
        },
        UP: {
          NEW: ["Sounded good tonight, if I say so.", "It came out right tonight."],
          LEARNING: ["Bands turned down when I asked. Everything sat right.", "Room was kind to us tonight. I barely touched the board."],
          KNOWS: ["Every band played at half volume on stage and I did the rest. Tell them that in the advance every time.", "I know that room now. Same setup next time and it'll sound like this again."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["Sound was a little rough."],
          LEARNING: ["Couldn't hear ourselves on stage. It threw us off."],
          KNOWS: ["No monitors and a sound person who didn't know the room. A town with good sound gets the better bands back."]
        },
        UP: {
          NEW: ["Sound was great!"],
          LEARNING: ["We could hear everything on stage. That's rarer than you'd think."],
          KNOWS: ["Best sound on the tour. Whoever that was, book them every time a touring band comes through."]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["Sounded like a garbage can."],
          LEARNING: ["Whoever ran sound didn't know that room."],
          KNOWS: ["That room needs somebody who's mixed it before. Get somebody who knows it and half your problems go away."]
        },
        UP: {
          NEW: ["Sounded good."],
          LEARNING: ["Sounded like a real show. Whoever ran sound knew that room."],
          KNOWS: ["{sound|Your sound person} has run that room for years. Get them when you can."]
        }
      }
    },

    /* ---------------- COMPETITION: another show the same night ---------------- */
    COMPETITION: {
      ANY: {
        DOWN: {
          NEW: [{ t: "A lot of the usual faces weren't here.", not: 'savingIt' },
                   { t: "A lot of the usual faces weren't here. Seems like they were saving it for something.", if: 'savingIt' }],
          LEARNING: [{ t: "There was another show tonight at {otherShow|another room}. It split the crowd.", not: 'savingIt' },
                   { t: "People were saving it for the bigger show {aheadNight|later this week} at {aheadShow|another room}. One night out, not two.", if: 'savingIt' }],
          KNOWS: [{ t: "Two shows the same night split the same crowd. Check the other bookers' calendars before you hold.", not: 'savingIt' },
                   { t: "A bigger show for the same crowd a night or two later eats yours. Check what's coming, not just the night of.", if: 'savingIt' }]
        },
        UP: {
          NEW: ["Everybody was here tonight."],
          LEARNING: ["Nothing else going on tonight. You had the town."],
          KNOWS: ["No other show tonight, so you got everybody. Hold the nights nobody else wants, early."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: [{ t: "Half my friends were at the other show.", not: 'savingIt' }, { t: "Where was everybody?", not: 'savingIt' },
                   { t: "Everybody's saving it for {aheadNight|the weekend}.", if: 'savingIt' }, { t: "I can't do two nights in a row.", if: 'savingIt' }],
          LEARNING: [{ t: "The thing at {otherShow|the other room} took everybody under twenty-five.", not: 'savingIt' }, { t: "Two shows tonight and I had to pick.", not: 'savingIt' },
                   { t: "Half my friends skipped tonight to save it for {aheadShow|the big one}.", if: 'savingIt' }, { t: "I almost stayed home. I'm going to {aheadShow|the other one} {aheadNight|later} and I'm broke.", if: 'savingIt' }],
          KNOWS: [{ t: "Two shows the same night split the same crowd. Check the other bookers' calendars before you hold.", not: 'savingIt' }, { t: "Everybody I know went to {otherShow|the other show}. Talk to that booker before you pick a night.", not: 'savingIt' },
                   { t: "Nobody goes out the night before the big one. Put yours after it, or a week off.", if: 'savingIt' }, { t: "When there's a bigger show {aheadNight|that week}, my whole crew saves their ten bucks for it. Move off it.", if: 'savingIt' }]
        },
        UP: {
          NEW: ["Everybody was here!", "Nothing else to do tonight but this."],
          LEARNING: ["Nobody else had a show. Whole scene came out.", "Only show in town tonight, and it felt like it."],
          KNOWS: ["Only show in town is the best night to have. Whatever you did to get it, do it again.", "When you're the only show, everybody I know comes. Hold those nights early."]
        }
      },
      BOOKER: {
        DOWN: {
          NEW: [{ t: "We both had shows tonight. Not great.", not: 'savingIt' },
                   { t: "There's a bigger show {aheadNight|this week}. That cost you some people.", if: 'savingIt' }],
          LEARNING: [{ t: "You and me both had shows tonight. I lost people to yours and you lost some to mine.", not: 'savingIt' },
                   { t: "People were saving up for {aheadShow|the bigger show}. Same crowd, bigger bill, a couple nights apart.", if: 'savingIt' }],
          KNOWS: [{ t: "Next time let's talk first. Stagger the times, or one of us takes another night, and we both do better.", not: 'savingIt' },
                   { t: "Ask around about what's coming before you pick a night. A bigger bill for your crowd right after yours, and yours loses.", if: 'savingIt' }]
        },
        UP: {
          NEW: ["Kept my night clear for yours."],
          LEARNING: ["I moved mine off your night. Looks like it helped."],
          KNOWS: ["We didn't step on each other this time, and both nights did fine. That's what talking first gets you."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: [{ t: "Slow for a night like this.", not: 'savingIt' },
                   { t: "Slow. A couple people said they were saving it.", if: 'savingIt' }],
          LEARNING: [{ t: "A few people said they were going to {otherShow|the other show} after.", not: 'savingIt' },
                   { t: "Three different people said they're going to {aheadShow|the other show} {aheadNight|later this week} instead.", if: 'savingIt' }],
          KNOWS: [{ t: "I asked. {count:words:cap} people said they almost went to {otherShow|the other show} instead, and plenty more did.", not: 'savingIt' },
                   { t: "Most of the ones who skipped are going to {aheadShow|the bigger show} {aheadNight|in a couple nights}. Nobody can afford both.", if: 'savingIt' }]
        },
        UP: {
          NEW: ["Busy door."],
          LEARNING: ["Everybody said there was nothing else on tonight."],
          KNOWS: ["Nothing else on in town, and the door shows it. That's worth checking calendars for."]
        }
      }
    },

    /* ---------------- TOWN_EVENT: something on the town's calendar, the weather of the season ---------------- */
    TOWN_EVENT: {
      ANY: {
        DOWN: {
          NEW: ["Something else was going on in town tonight."],
          LEARNING: ["It was {event|a big weekend in town}. People were busy or stuck."],
          KNOWS: ["Don't book against {event|the town's big weekends}. Look at the town calendar before you hold the room."]
        },
        UP: {
          NEW: ["The whole town was out tonight."],
          LEARNING: ["{event:cap|Whatever was on in town} put people in a going-out mood."],
          KNOWS: ["The night of {event|that kind of thing} sends people looking for somewhere to go after. Book for it on purpose."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["Was everybody at {event|the thing downtown}?", "Couldn't park anywhere near here."],
          LEARNING: ["It was {event|a big weekend}. Downtown was impossible.", "Everybody I know was at {event|the other thing} tonight."],
          KNOWS: ["Never book {event|a weekend like that} downtown. Nobody can park and everybody's already somewhere.", "Check the town calendar before you hold. {event:cap|That weekend} eats every show, every year."]
        },
        UP: {
          NEW: ["Lot of people out tonight!", "Town was buzzing."],
          LEARNING: ["People came over after {event|the thing downtown}.", "Everybody was already out, so they came."],
          KNOWS: ["After {event|something like that}, people want somewhere to go. Book that night every year.", "Start late on the night of {event|a town thing} and you get everybody coming from it."]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["Dead out there tonight."],
          LEARNING: ["{event:cap|The town thing} had the streets blocked. Nobody could get here."],
          KNOWS: ["Every year {event|that weekend} kills my bar. Don't put a show on it."]
        },
        UP: {
          NEW: ["Busy night all over."],
          LEARNING: ["People came straight from {event|the thing downtown}. Bar did well."],
          KNOWS: ["{event:cap|That night} brings people looking for a bar with something going on. Book it again next year."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["People said traffic was bad."],
          LEARNING: ["A lot of people said they were at {event|something else} first and didn't make it over."],
          KNOWS: ["Half the people I talked to were stuck at {event|the thing downtown}. That's a calendar problem, not a bill problem."]
        },
        UP: {
          NEW: ["Lot of people came from somewhere else."],
          LEARNING: ["People kept coming in from {event|the other thing}."],
          KNOWS: ["{count:words:cap} people said they came over from {event|the other thing}. Good night to have a show."]
        }
      }
    },

    /* ---------------- TREND: booked toward or against what's rising ---------------- */
    TREND: {
      ANY: {
        DOWN: {
          NEW: ["This kind of thing isn't drawing like it did."],
          LEARNING: ["{genreA:cap} is cooling off here. People have moved on."],
          KNOWS: ["{genreA:cap} is on its way out in this town. Book what the kids are starting bands in."]
        },
        UP: {
          NEW: ["Everybody's talking about this kind of band right now."],
          LEARNING: ["{trendWords:cap} is what people want right now."],
          KNOWS: ["{trendWords:cap} is the thing here right now. Book it before every other booker does."]
        }
      },
      KID: {
        DOWN: {
          NEW: ["nobody at school listens to this anymore", "kinda old sounding?"],
          LEARNING: ["everybody's into different stuff now, not this", "this was big like two years ago"],
          KNOWS: ["nobody's starting {genreA} bands anymore. everyone's into {trendWords|the new stuff}, book that", "my friends would've come for {trendWords|the new stuff}. this kind of show is for older kids now"]
        },
        UP: {
          NEW: ["everybody's talking about the second band", "this is what everybody's listening to"],
          LEARNING: ["everybody at school is into that kind of stuff now. like {trendWords}", "three bands at my school sound like this now"],
          KNOWS: ["{trendWords} is the thing right now. three new bands at my school play it, book them before everybody else does", "if it's {trendWords} we'll come, all of us. that's what's happening right now"]
        }
      },
      POSTS: {
        DOWN: {
          NEW: ["is anybody still doing this kind of thing"],
          LEARNING: ["{genreA} night in this town in this year, bold move"],
          KNOWS: ["nobody's going to {genreA} shows anymore, it's all {trendWords|the new stuff} now"]
        },
        UP: {
          NEW: ["this is the sound now, sorry"],
          LEARNING: ["{trendWords} is everywhere right now and i'm not mad"],
          KNOWS: ["every good new band in town is doing {trendWords} right now. book all of them"]
        }
      },
      BOOKER: {
        DOWN: {
          NEW: ["Rough time for that kind of bill."],
          LEARNING: ["{genreA:cap} isn't pulling here like it was. Mine aren't either."],
          KNOWS: ["{genreA:cap} drew half what it did last year at my shows too. I've started booking {trendWords|the new stuff} instead."]
        },
        UP: {
          NEW: ["Good timing on that bill."],
          LEARNING: ["You got onto {trendWords} early. I'm seeing it too."],
          KNOWS: ["{trendWords:cap} is drawing at everybody's shows right now. You got in before me."]
        }
      }
    },

    /* ---------------- DRAW_AWAY: the touring band's draw here against at home ---------------- */
    DRAW_AWAY: {
      ANY: {
        DOWN: {
          NEW: ["Fewer people came for the touring band than they'd said."],
          LEARNING: ["{touring:cap} is bigger at home than here. Home numbers aren't away numbers."],
          KNOWS: ["Touring bands draw a fraction of their home number on a first visit. Plan for that, not what they tell you."]
        },
        UP: {
          NEW: ["More people came for the touring band than anybody guessed."],
          LEARNING: ["{touring:cap} has more people here than they knew."],
          KNOWS: ["{touring:cap} draws here. Book them again and bring them back on a better night."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["Smaller than we're used to.", "Quieter crowd than back home."],
          LEARNING: ["We're bigger at home. Turns out.", "Back home we fill a room. Here, nobody knows us yet."],
          KNOWS: ["Honest answer: we do a lot at home and twenty everywhere else. Book us on a door deal next time.", "First time through a town we draw a fifth of what we do at home. Plan for that, not for our numbers."]
        },
        UP: {
          NEW: ["More people than we expected!", "Didn't know we had people here."],
          LEARNING: ["More people knew us here than at home, almost.", "We've got real people here. Who knew."],
          KNOWS: ["This was one of our best nights on the tour. Bring us back and we'll do more.", "We drew here like we do at home. Put us on a weekend next time."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["Not many people came for the touring band."],
          LEARNING: ["Hardly anybody said they came for {touring}."],
          KNOWS: ["I asked everybody. Maybe {count:words|a handful} came for {touring}, so their home number didn't travel."]
        },
        UP: {
          NEW: ["Lot of people came for the touring band."],
          LEARNING: ["People named {touring} at the door. More than I'd have guessed."],
          KNOWS: ["{count:words:cap} people said they came for {touring}. They have a real crowd here."]
        }
      }
    },

    /* ---------------- LOCAL_DRAW: local bands brought their people, or didn't ---------------- */
    LOCAL_DRAW: {
      ANY: {
        DOWN: {
          NEW: ["The locals didn't bring many people."],
          LEARNING: ["{local:cap} didn't bring the crowd you thought they would."],
          KNOWS: ["{local:cap} brings fewer people than you'd guess. Don't count on them to fill a room."]
        },
        UP: {
          NEW: ["The locals brought their people."],
          LEARNING: ["{local:cap} brought a lot of people tonight."],
          KNOWS: ["{local:cap} is a real draw now. Put them where the room should be full."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["Locals didn't bring many people.", "Not a lot of friends-of-the-band tonight."],
          LEARNING: ["{local:cap} brought maybe a few. I thought they'd have more.", "Barely anybody said they came for a local band."],
          KNOWS: ["{local:cap} brought {count:words|a few}. That's their number right now, so don't book them to carry a night.", "I asked who people came for. The locals got {count:words|a handful} between them."]
        },
        UP: {
          NEW: ["The locals brought some people.", "Lot of friends of the bands tonight."],
          LEARNING: ["{local:cap} brought about {count:words|fifteen}. The others brought a few.", "Most of the room was there for {local}."],
          KNOWS: ["{local:cap} is your draw right now: {count:words|fifteen} every time. Put them where the room should be full.", "{count:words:cap} people named {local}. That's a band that can carry a weeknight."]
        }
      },
      LOCAL_BAND: {
        DOWN: {
          NEW: ["Our people didn't really come out."],
          LEARNING: ["Most of our friends couldn't make it this time."],
          KNOWS: ["We played three times this month, so our people skipped this one. Give us more room between shows."]
        },
        UP: {
          NEW: ["Our friends showed up!"],
          LEARNING: ["We brought a good crowd tonight."],
          KNOWS: ["We hadn't played in a while, so everybody came. Spacing us out works."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["Not many of the bands' friends here tonight."],
          LEARNING: ["Usually the locals bring a crowd. Not tonight."],
          KNOWS: ["{local:cap} didn't bring anybody tonight. Their friends are tired of coming out for them."]
        },
        UP: {
          NEW: ["The local bands' people were all here."],
          LEARNING: ["{local:cap}'s friends came out in force."],
          KNOWS: ["When {local} plays, their whole crowd comes. Use that."]
        }
      }
    },

    /* ---------------- OVERUSE: a local band has played too often lately ---------------- */
    OVERUSE: {
      ANY: {
        DOWN: {
          NEW: ["People have seen {band} a lot lately."],
          LEARNING: ["{band:cap} has played too much lately. People are skipping them."],
          KNOWS: ["Once a month, tops, for {band}. Any more and their crowd stops coming."]
        },
        UP: {
          NEW: ["People missed {band}."],
          LEARNING: ["{band:cap} hadn't played in a while, and people came for that."],
          KNOWS: ["Space {band} out like this and every show of theirs feels like an event."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["Saw {band} again!", "Wasn't I just at a {band} show?"],
          LEARNING: ["That's the third time this month I've seen {band}.", "Everybody's seen {band} enough lately."],
          KNOWS: ["Love them. But every two weeks is too much; once a month and people come for them.", "{band:cap} on every bill is why their friends stopped coming. Give them a month off."]
        },
        UP: {
          NEW: ["Finally got to see {band} again!", "Felt like forever since {band} played."],
          LEARNING: ["{band:cap} hadn't played in a while. Felt special.", "People had missed {band}. You could tell."],
          KNOWS: ["You gave {band} a month off and their show felt like an event. Keep doing that.", "Once a month for {band} is perfect. Everybody shows up for it."]
        }
      },
      LOCAL_BAND: {
        DOWN: {
          NEW: ["We're kind of played out right now."],
          LEARNING: ["We've played a lot lately. Can we sit out next month?"],
          KNOWS: ["Our people stopped coming because we're on every bill. Give us six weeks and we'll bring them back."]
        },
        UP: {
          NEW: ["Felt good to play again."],
          LEARNING: ["Felt like a real show after a break."],
          KNOWS: ["The month off was good for us. Everybody came back."]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["Seen this band plenty."],
          LEARNING: ["{band:cap} on every bill. People get tired."],
          KNOWS: ["Every band that plays every week ends up playing to their roommates. Rest {band} a month."]
        },
        UP: {
          NEW: ["Good to see {band} again."],
          LEARNING: ["{band:cap} took some time off. It shows."],
          KNOWS: ["Bands that play less draw more. You rested {band} and it worked."]
        }
      }
    },

    /* ---------------- REPEAT: same bill, same room, too soon ---------------- */
    REPEAT: {
      ANY: {
        DOWN: {
          NEW: ["Felt like a show people had already seen."],
          LEARNING: ["Same bill, same room, not long ago. People skipped it."],
          KNOWS: ["Same bill in the same room inside six weeks reads as a rerun. Wait two months or change the room."]
        },
        UP: {
          NEW: ["Felt new."],
          LEARNING: ["A bill nobody'd seen before. People came to see it."],
          KNOWS: ["Fresh bill, fresh room. People come to things they haven't seen."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["Didn't I just see this?", "Felt like a rerun."],
          LEARNING: ["Same bands, same room as last month. People skipped it.", "I almost didn't come, I just saw this exact show."],
          KNOWS: ["Same bill in the same room inside six weeks: people figure they saw it. Change the room or wait two months.", "I saw this lineup here a month ago. Mix it up and I'll bring people."]
        },
        UP: {
          NEW: ["Something different tonight!", "Haven't seen this combination before."],
          LEARNING: ["New bill. Felt like a show I hadn't seen.", "Never seen these bands together. That's why I came."],
          KNOWS: ["New bill in a room I haven't seen them in. That's what gets me out.", "Different bands, different room, every time. That's why people keep coming."]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["Didn't I just see this show?"],
          LEARNING: ["Same three bands as last month, same room. People skipped it."],
          KNOWS: ["Same bill, same room, inside six weeks: people figure they saw it. Wait two months or change the room."]
        },
        UP: {
          NEW: ["Haven't seen this one before."],
          LEARNING: ["New combination. Haven't seen these bands together."],
          KNOWS: ["You don't repeat yourself. In this town that's rarer than it should be."]
        }
      }
    },

    /* ---------------- REGULARS: your regulars came because it's yours ---------------- */
    REGULARS: {
      ANY: {
        DOWN: {
          NEW: ["Fewer of the usual faces tonight."],
          LEARNING: ["Your regulars didn't come out for this one."],
          KNOWS: ["Only {count:words|a few} of your regulars came. They come for nights that feel like yours; this one didn't."]
        },
        UP: {
          NEW: ["A lot of the same faces."],
          LEARNING: ["Your regulars came because it was yours."],
          KNOWS: ["{count:words:cap} regulars came. You can count on that on any night, for anything."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["Didn't see a lot of the usual faces.", "Missing some regulars tonight."],
          LEARNING: ["Only a few of the people who come to all of mine.", "The ones who come to everything mostly didn't."],
          KNOWS: ["{count:words:cap} regulars tonight. Usually it's more, so something about this one didn't feel like mine to them.", "I know my regulars by face. Tonight I counted {count:words|a few}."]
        },
        UP: {
          NEW: ["A lot of the same faces.", "Saw all the usuals."],
          LEARNING: ["{count:words:cap} people came that come to all of mine.", "The regulars showed, like always."],
          KNOWS: ["My {count:words}. I can count on {count:words} now, on any night, for anything.", "I made a mark for every regular: {count:words}. That's my floor on a bad night."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["Didn't really feel like one of yours."],
          LEARNING: ["I almost skipped it. Didn't seem like your kind of night."],
          KNOWS: ["We come because it's yours. This one didn't feel like yours, so a lot of us stayed home."]
        },
        UP: {
          NEW: ["Wouldn't miss one of yours."],
          LEARNING: ["I came because it was yours. I didn't know any of the bands."],
          KNOWS: ["I'd come to anything you put on, honestly; most of us would. Don't spend it on bad ones."]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["Thin on the regulars."],
          LEARNING: ["Usually I know half the room at yours. Not tonight."],
          KNOWS: ["Regulars are earned one good night at a time and lost two bad ones at a time. Watch that."]
        },
        UP: {
          NEW: ["Same crowd as always. Good."],
          LEARNING: ["Your people came. You've got people now."],
          KNOWS: ["You've built a crowd that comes without checking who's playing. Took me years to see a booker do that."]
        }
      }
    },

    /* ---------------- HOSPITALITY: food, a place to sleep, water, a shower ---------------- */
    HOSPITALITY: {
      ANY: {
        DOWN: {
          NEW: ["The touring band looked worn out."],
          LEARNING: ["The touring band wasn't taken care of. No real food, no good place to sleep."],
          KNOWS: ["Feed them and find them a floor before the night. Bands tell every other band how a town treated them."]
        },
        UP: {
          NEW: ["The touring band seemed happy."],
          LEARNING: ["The touring band was fed and had a place to sleep. They noticed."],
          KNOWS: ["Hot food and a floor, arranged ahead. That's what gets your town recommended down the route."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["Pizza was cold, but thanks.", "Bit of a scramble for a place to sleep."],
          LEARNING: ["We were told dinner. It was cold pizza at eleven.", "Nobody'd sorted where we were sleeping until after the show."],
          KNOWS: ["Don't promise a meal you can't make. Cold pizza when you said dinner is worse than saying nothing.", "Find us the floor before we get to town. We slept in the van because nobody had."]
        },
        UP: {
          NEW: ["Thanks for the food!!", "Thanks for putting us up."],
          LEARNING: ["Hot food and a floor. You'd be amazed how rare both are.", "We had dinner, a shower and a floor. That's a good stop."],
          KNOWS: ["You fed us, you housed us, you paid before load-out. We'll tell every band on this route.", "Real food before the set and a floor sorted in the advance. Towns that do that get the good tours."]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["The touring band was hanging around after asking where to sleep."],
          LEARNING: ["Band had nowhere to go after. They were still in my lot at two."],
          KNOWS: ["Sort out where the band sleeps before the night, not after. I'm not running a campground."]
        },
        UP: {
          NEW: ["Band was in good spirits."],
          LEARNING: ["The band was fed before they played. They were easy to deal with all night."],
          KNOWS: ["Fed bands are easy bands. They loaded out quick and thanked my bartender."]
        }
      },
      HELPER: {
        DOWN: {
          NEW: ["The band seemed kind of tired."],
          LEARNING: ["The place they stayed wasn't great. I heard about it in the morning."],
          KNOWS: ["Get the floor locked in a week out. Asking people the night of means a bad floor or none."]
        },
        UP: {
          NEW: ["The band was really nice."],
          LEARNING: ["They slept well and ate well. They said so twice."],
          KNOWS: ["Floor sorted ahead, breakfast in the morning. That's the whole job and it worked."]
        }
      }
    },

    /* ---------------- PAY: the settle, fair, on time, as promised ---------------- */
    PAY: {
      ANY: {
        DOWN: {
          NEW: ["The settle didn't sit well with the bands."],
          LEARNING: ["The bands felt shorted at the settle."],
          KNOWS: ["Pay before load-out, with the math on paper. A band that feels shorted tells every other band."]
        },
        UP: {
          NEW: ["The bands were happy with the settle."],
          LEARNING: ["The settle was fair and quick. The bands noticed."],
          KNOWS: ["Paid in cash before load-out, with the count written down. That's how you get bands to come back."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["The money was a little less than we thought.", "Settle took a while."],
          LEARNING: ["We got less than we were told. Nobody showed us how.", "We waited an hour after load-out to get paid."],
          KNOWS: ["Show us the count and pay us before load-out. Short with a reason is fine, short with no paper isn't.", "We got less than the deal said and nobody walked us through it. That gets around."]
        },
        UP: {
          NEW: ["Thanks for taking care of us.", "Easy settle. Thank you."],
          LEARNING: ["Paid in cash before load-out, with the count written down. Thank you.", "Got what we were promised, and fast."],
          KNOWS: ["Paid before load-out, the math on a piece of paper. Bookers who do that get the good bands.", "You paid us what you said, when you said, and showed your work. We'll be back."]
        }
      },
      LOCAL_BAND: {
        DOWN: {
          NEW: ["Didn't really get much for that one."],
          LEARNING: ["We weren't sure what we were getting till the end, and it wasn't much."],
          KNOWS: ["Tell us what we're getting when you ask us, even if it's gas money. Surprises at the settle sting."]
        },
        UP: {
          NEW: ["Got paid! Didn't expect it."],
          LEARNING: ["Got twenty each. Honestly more than we expected."],
          KNOWS: ["You told us what we'd get and that's what we got. That's why we say yes to you."]
        }
      }
    },

    /* ---------------- ADVANCE: bands and staff were told the details, or weren't ---------------- */
    ADVANCE: {
      ANY: {
        DOWN: {
          NEW: ["People weren't sure where to be or when."],
          LEARNING: ["Nobody got the details ahead of time. Load-in was a mess."],
          KNOWS: ["Send every band and the room the address, load-in, set times and gear two weeks out, and again the day before."]
        },
        UP: {
          NEW: ["Everybody knew where to be."],
          LEARNING: ["Everybody had the details ahead of time. It ran smooth."],
          KNOWS: ["Advance two weeks out and the day before. That's why load-in took fifteen minutes."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["We weren't sure where to go.", "Took us a while to find the place."],
          LEARNING: ["Didn't get an address till six. Didn't know load-in.", "Nobody told us there'd be no bass amp."],
          KNOWS: ["Send the advance two weeks out and again the day before. We were in a parking lot two towns back not knowing anything.", "Tell us what gear's there and when to load in. We guessed wrong on both."]
        },
        UP: {
          NEW: ["Easy to find, easy load-in.", "Everything was where you said."],
          LEARNING: ["Got the advance early. We knew exactly what to bring.", "Address, load-in, set times, all in one message. Thank you."],
          KNOWS: ["Advance came two weeks out and again yesterday. Easiest load-in on the tour.", "We knew the backline, the times and where to sleep before we left the last town. That's a pro stop."]
        }
      },
      SOUND: {
        DOWN: {
          NEW: ["Nobody told me there were this many bands."],
          LEARNING: ["Touring band thought there'd be a bass amp, and there wasn't. Nobody advanced it."],
          KNOWS: ["Advance the gear two weeks out. That's the whole fix; I'm not bringing a cab I wasn't told about."]
        },
        UP: {
          NEW: ["Knew what was coming tonight. Nice."],
          LEARNING: ["Got the gear list ahead of time. Changeovers were easy because of it."],
          KNOWS: ["Gear list and times two weeks out. I brought exactly what we needed and nothing sat in the van."]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["Didn't know you had this many bands coming."],
          LEARNING: ["Nobody told me about load-in. The lot was full when the vans got here."],
          KNOWS: ["Call me two weeks out with the bill and the times. That's all I need, and I need it."]
        },
        UP: {
          NEW: ["Knew what to expect tonight."],
          LEARNING: ["You told me the bill and the times ahead. Made my night easy."],
          KNOWS: ["Two weeks' notice on the bill and times, a call the day before. Do that and the room's yours."]
        }
      }
    },

    /* ---------------- VENUE_REP: the room's reputation ---------------- */
    VENUE_REP: {
      ANY: {
        DOWN: {
          NEW: ["Some people won't go to {roomShort}."],
          LEARNING: ["{room:cap} has a reputation. People stayed home over it."],
          KNOWS: ["Some people won't set foot in {room}. You pay for that room in heads every time."]
        },
        UP: {
          NEW: ["People like coming to {roomShort}."],
          LEARNING: ["{room:cap} has a good name now. People come without checking who's playing."],
          KNOWS: ["{room:cap} pulls people on its own name. Put your riskier bills there."]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["Lot of people won't go to that place.", "Not my favorite room."],
          LEARNING: ["That place has a reputation. A lot of folks stayed home.", "People my age still remember what happened there."],
          KNOWS: ["Nobody over thirty goes to {roomShort} since the trouble a couple of summers ago. You'll pay for that room every time.", "{room:cap} has a name it hasn't lived down. Good nights there will help, slowly."]
        },
        UP: {
          NEW: ["Good room.", "Always liked this place."],
          LEARNING: ["{roomShort:cap} is getting a name as a place shows happen.", "People trust this room. They come without asking who's playing."],
          KNOWS: ["{room:cap} is a real room now. I've seen four of those in this town in thirty years; keep it.", "People come to {roomShort} on the room's name. That's worth more than any one band."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["Not my favorite place."],
          LEARNING: ["A few of my friends won't go to {roomShort}."],
          KNOWS: ["Half the people I know won't come to {roomShort}. Book your good ones somewhere else."]
        },
        UP: {
          NEW: ["Love this place."],
          LEARNING: ["{roomShort:cap} feels like ours now."],
          KNOWS: ["I'll come to anything at {roomShort}. Most of us will."]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["People still talk about this place the wrong way."],
          LEARNING: ["People have ideas about my room. I know it."],
          KNOWS: ["One bad night here two years ago and people still bring it up. Help me string some clean ones together."]
        },
        UP: {
          NEW: ["Good night. Nobody fought."],
          LEARNING: ["People are starting to think of this as a place shows happen."],
          KNOWS: ["Three good ones in a row and people come here without checking who's playing. That's a room."]
        }
      }
    },

    /* ---------------- SAFETY: crowding, exits, a floor contact, security, an incident ----------------
     * Flags at a house, yard or DIY show: askAPunk or addressOut. Security: guard (hired), guardAtHouse (hired for a house
     * or a DIY room, where a guard costs the night a little), noGuard (none where the show page asked for it). */
    SAFETY: {
      ANY: {
        DOWN: {
          NEW: ["It didn't feel safe in there tonight."],
          LEARNING: ["[?guardAtHouse: A guard at a house show. People went quiet and a few left early. | ?noGuard: Nobody big by the door on a night that needed somebody. | ?askAPunk: Too many people for the room, even with the address kept quiet. | ?addressOut: The address was out, and people nobody knew showed up. | Too many people, and nobody watching the door to the back.]"],
          KNOWS: ["[?guardAtHouse: Security at a house makes it feel like a bar with a curfew. Save them for the rooms that ask. | ?noGuard: That room and that bill wanted security. You can't watch the inside and work the cash box both. | ?askAPunk: Ask-a-punk keeps strangers out, but not a crowd too big for the room. Cap it at the door. | ?addressOut: The address was on a pole, so that's how the trouble knew where to come. Keep it off the flyer at a house. | Name a floor person, keep the exits clear, and cap it at the door.]"]
        },
        UP: {
          NEW: ["Felt good in there tonight.", "Nobody being weird tonight."],
          LEARNING: ["[?guard: Security by the podium all night, and nobody tried anything. | ?askAPunk: Only people who knew people came. It felt like it. | ?addressOut: The address was out, and it still felt fine. Lucky, mostly. | Exits clear, room not over, somebody watching. Easy night.]"],
          KNOWS: ["[?guard: Security standing where everybody could see them. That's most of what they do, and it worked. | ?askAPunk: Ask-a-punk kept it to people who know somebody, and that's why it felt like a house show. | ?addressOut: Address in print and nothing went wrong. Don't count on that twice. | Floor person named, exits clear, house rules on the door. That's why nothing happened.]"]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["That was too many people.", "I didn't like how that felt."],
          LEARNING: ["[?askAPunk: Even word of mouth brought more than this place holds. | ?addressOut: Strangers kept showing up. The address was on the flyer. | There were people standing in front of the back door. That's the only other way out.]", "[?addressOut: Somebody I'd never seen tried the back gate. That's the address being out. | Too many people and nobody watching the exits.]"],
          KNOWS: ["[?askAPunk: It's ask a punk and we still went over. Cap it at the door at what I told you, every time. | ?addressOut: The address was on a pole downtown. That's how the cops knew, and that's how the guy in the yard knew. | Way over what this room holds, with the exit blocked by a merch table. One more like that and I'm done.]", "[?guardAtHouse: Who was the big guy by the door? This is my house, not a bar. | ?addressOut: Never put my address on a flyer again. Ask a punk or find another house. | Name somebody to watch the floor and cap the door. I can't do it and host at the same time.]"]
        },
        UP: {
          NEW: ["Good night. Nobody puked, nobody fought.", "Nothing broke. Thank you."],
          LEARNING: ["[?askAPunk: Ask a punk kept it to friends of friends. That's how I like it. | ?addressOut: Address was out and it was still fine. I was nervous all night though. | Exits were clear and somebody was watching the floor. I could relax.]", "[?guard: Your security person was easy to have around. Nobody went over the rail. | Nobody went over the rail, nobody went over the fence. Good night.]"],
          KNOWS: ["[?askAPunk: Ask a punk, a cap at the door and somebody on the floor. That's a house I'll keep offering you. | ?addressOut: Fine tonight with the address out, but I'd rather not test it twice. | You capped it, kept the back clear and had somebody on the floor. You can have another night.]", "[House rules on the door and a floor person who knew the job. That's the whole thing.]"]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["Had to stop letting people in for a bit.", "Some people I didn't like the look of."],
          LEARNING: ["[?noGuard: I was stuck on the cash box and nobody was watching the inside. | ?addressOut: A few people at the gate didn't know anybody. The address was out. | We went over what the room holds, and I was too busy with the cash box to stop it.]"],
          KNOWS: ["[?askAPunk: Even ask-a-punk, I let in more than the room holds. Decide the number before doors and stop there. | ?addressOut: {count:words:cap} people I'd never seen, all off the address on the flyer. That's who the trouble was. | Decide a number for the room and name a floor person before doors. Then stop at the number.]"]
        },
        UP: {
          NEW: ["Easy door tonight.", "Nobody I had to turn away for the wrong reasons."],
          LEARNING: ["[?guard: Security stood next to me all night. Nobody argued at the door. | ?askAPunk: Everybody at the gate knew somebody. Ask a punk does that. | I had a number and stopped at it. Room never got too tight.]"],
          KNOWS: ["[?askAPunk: Ask a punk meant I knew most faces at the gate. Keep it that way for houses. | I stopped at the cap and the floor person had the inside. That's why nothing happened.]"]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["Got kind of sketchy tonight."],
          LEARNING: ["[?addressOut: Lot of people who weren't from the scene. The address was everywhere. | It was so packed I couldn't get to the door.]"],
          KNOWS: ["[?addressOut: When the address goes on the flyer, you get people who don't care about the house. Keep it ask-a-punk. | Too packed to get out. I didn't stay for the last band.]"]
        },
        UP: {
          NEW: ["Felt safe in there."],
          LEARNING: ["[?askAPunk: All people I knew, basically. Felt like ours. | Room wasn't too packed. I could breathe.]"],
          KNOWS: ["[?askAPunk: Ask a punk keeps your house shows feeling like your house shows. Don't change it. | Somebody watching, room not over. I'll bring my little sister next time.]"]
        }
      }
    }
  },

  /* ---------------- Wrong readings: wrong.<VOICE>.<true cause>. ----------------
   * A voice blaming its own hobby cause (enums VOICE_HOBBY) for something else. Direction-neutral, because the
   * path carries no direction. One entry for every voice and cause where a READING can be wrong (the voice is not
   * first for the cause and its hobby is another cause). */
  wrong: {
    /* REGULAR blames the town's calendar, the weather, parking (hobby TOWN_EVENT). */
    REGULAR: {
      GENRE_MIX: ["Honestly I think it was whatever else was going on in town tonight."],
      GEN_MIX: ["It was the parking, I bet. Parking decides everything around here."],
      AGE_GATE: ["Must've been {event|the thing downtown}. Everybody's schedule was weird tonight."],
      NIGHT: ["I think it was the weather more than anything."],
      PROMO_FLYER: ["It was {event|whatever was going on downtown}. That always changes who comes out."],
      PROMO_DMS: ["Pretty sure it was the weather. People decide at the last minute based on that."],
      DOOR_PRICE: ["It was the parking. People circle twice and either go home or they don't."],
      LOCAL_DRAW: ["Must've been {event|something going on in town}. That's what changes a night here."],
      REGULARS: ["I think it was the weather, honestly. That's what it always is."],
      VENUE_REP: ["It was {event|the other thing in town tonight}, I think. Not the room."],
      SAFETY: ["That was {event|the town thing} spilling over, if you ask me."]
    },
    /* TOURING blames how far ahead the show was announced (hobby PROMO_ANNOUNCE). */
    TOURING: {
      GENRE_MIX: ["Honestly, it's always how early the show gets announced. That's most of it in every town."],
      ROOM_FIT: ["I think it comes down to how early people knew about it. It always does."],
      PROMO_SHARES: ["It's all about when the show went up. Early announcements make the night, everywhere we go."],
      DOOR_PRICE: ["Every town's the same: it's when the show got announced. Price doesn't matter much."],
      DOOR_COUNT: ["The way I see it, the night was decided the day it got announced."],
      SOUND: ["Mostly it's when people find out about the show. Everything else is noise."]
    },
    /* KID blames the price (hobby DOOR_PRICE). */
    KID: {
      GENRE_MIX: ["it's the price, it's always the price"],
      GEN_MIX: ["it was the door price i think. that's what decides if my friends come"],
      RUNTIME: ["honestly it was the price, that's the whole thing for us"],
      AGE_GATE: ["i think it came down to how much it cost"],
      PROMO_EXIT: ["it's about the price. if it's cheap we come, if it's not we don't"],
      VENUE_REP: ["it was the price, that's all anybody i know talks about"]
    },
    /* OLD_HEAD blames set lengths and the clock (hobby RUNTIME). */
    OLD_HEAD: {
      GEN_MIX: ["It's the set lengths. Bands play too long now, and people feel it."],
      ROOM_FIT: ["It comes down to how long the night runs. Always has."],
      SOUND: ["The night's too long, that's what it is. Twenty-five minutes and off."],
      TREND: ["Must've been the set times. Kids' bands and their fads come and go."],
      OVERUSE: ["It's the clock. Shows run too late and people decide based on that."],
      REPEAT: ["Comes down to the schedule. Get people home by midnight and they come back."],
      REGULARS: ["It's how long the night runs. That's what keeps people or loses them."]
    },
    /* OWNER blames the kind of music on the bill (hobby GENRE_MIX). */
    OWNER: {
      GEN_MIX: ["It was the kind of music, I'd say. Some kinds keep people in, some don't."],
      RUNTIME: ["It comes down to what kind of bands you book. That's what makes a night in here."],
      ROOM_FIT: ["It's the music. Some kinds of bands fit this place and some just don't."],
      AGE_GATE: ["I'd say it was the bands. Some kinds of music draw a crowd that spends, some don't."],
      TOWN_EVENT: ["Whatever's going on outside, it's the kind of music that decides a night in here."],
      HOSPITALITY: ["Mostly it's the style of band, if you ask me. The rest is details."],
      ADVANCE: ["It was the mix of bands. That's what I'd look at."],
      VENUE_REP: ["It's the kind of bill you put in here. Book the right kind and the room does fine."]
    },
    /* SOUND blames the room (hobby ROOM_FIT). */
    SOUND: {
      ORDER: ["It's the room. That room decides how a band sounds, whatever order they're in."],
      ADVANCE: ["Honestly it was the room. The room does what it does no matter what anybody's told."]
    },
    /* BOOKER blames other shows on the calendar (hobby COMPETITION). */
    BOOKER: {
      NIGHT: ["It's what else is on that night. That's always what it is."],
      PROMO_EXIT: ["It comes down to who else had a show. Every night in this town is a calendar fight."],
      TREND: ["Whatever's on everybody else's calendar decides it. Look at that first."]
    },
    /* LOCAL_BAND blames the slot (hobby ORDER). */
    LOCAL_BAND: {
      PROMO_SHARES: ["I think it was the order, honestly. Slots decide everything."],
      LOCAL_DRAW: ["It's the slot. Where you put us decides who's there for us."],
      OVERUSE: ["Comes down to the slot, if you ask me. Our people come when we play at the right time."],
      PAY: ["It was the set order, mostly. That's what makes a night for a band."],
      ADVANCE: ["It was where we were on the bill. That's what changes a night."]
    }
  },

  /* ---------------- Posts: what the town says online after the show. Lowercase, short. ---------------- */
  posts: {
    tier: {
      ROUGH: [
        "the touring band deserved a bigger crowd tonight",
        "anyone else get there and it was over?",
        "showed up, like nine people, the band played anyway. respect",
        "small turnout tonight. go to shows, people"
      ],
      THIN: [
        "small crowd but the openers were great",
        "sound was rough tonight, still fun",
        "not a lot of people at {roomShort} tonight but the ones who came were into it",
        "{touring} played to a half room and acted like it was full"
      ],
      HELD: [
        "good night at {roomShort}",
        "{touring} merch secured",
        "bands for {price:money} on a {dowLower}, can't beat it",
        "regular {dowLower} at {roomShort}. that's the whole review. good"
      ],
      GOOD: [
        "that was the best show i've been to this year and it was on a {dowLower}",
        "{local} closing was the right call",
        "{roomShort} was packed tonight, glad i went",
        "didn't know {touring} and now i have their tape"
      ],
      TALKED: [
        "i'm still thinking about last night",
        "everybody who was there knows",
        "the floor at {roomShort} was SHAKING",
        "sixteen years going to shows in this town and that's top five"
      ],
      WALL: [
        "i'm still thinking about last night",
        "people are going to lie about being at that show for years",
        "the floor at {roomShort} was SHAKING",
        "if you missed {touring} at {roomShort} i'm sorry"
      ]
    },
    cause: {
      SOUND: { DOWN: ["couldn't hear the vocals all night", "the sound tonight was mud, but it was loud mud"], UP: ["whoever ran sound tonight: thank you", "every band sounded huge tonight"] },
      DOOR_PRICE: { DOWN: ["{price:money} for locals is wild"], UP: ["bands for {price:money}. no excuse not to come"] },
      TREND: { DOWN: ["is anybody still doing this kind of thing"], UP: ["this is the sound now, sorry", "{trendWords} is everywhere right now and i'm not mad"] },
      RUNTIME: { DOWN: ["doors at 8 means first band at 9:40 apparently", "had to leave before the last band, it ran so late"], UP: ["in and out before midnight on a school night. perfect"] },
      AGE_GATE: { DOWN: ["another 21+ show i can't go to"], UP: ["all ages!! finally"] },
      SAFETY: { DOWN: ["way too packed in there tonight, couldn't get to the door"], UP: ["nobody being weird tonight, felt good in there"] },
      PROMO_ANNOUNCE: { DOWN: ["wait there was a show tonight??"], UP: ["been waiting for this one since it got announced"] },
      GENRE_MIX: { DOWN: ["weird lineup, left after the second band"], UP: ["every band tonight was for me personally"] },
      ORDER: { DOWN: ["why was {touring} on so early"], UP: ["{local} closing was the right call"] },
      HOSPITALITY: { UP: ["{touring} said this town fed them better than anywhere on tour"] }
    }
  },

  /* ---------------- Luck: one line per luck item that fired (LUCK record). ----------------
   * Slots: lost (heads it cost), gained (heads it added), gen (the generation it touched), chokepoint, town,
   * weather words. Kinds that can go either way pick by the flags up / down; with neither set, the plain line.
   * SPEC? 03-content 7 gives only {lost}. The engine's LUCK record has { k, d }; the flags up / down and the slot
   * gained are proposed here, and every line still reads correctly when they are absent. */
  luck: {
    RAIN: [
      "It rained from six on. {lost:words:cap|A few} or so stayed home.",
      "Rain all evening. The people who'd said maybe didn't come.",
      "It poured right at doors. {lost:words:cap|Some} people who were on the fence stayed dry instead."
    ],
    HEAT: [
      "It was still hot at nine. {lost:words:cap|A few} people decided a hot room wasn't worth it.",
      "Heat like that keeps people on their couch. That cost you {lost:words|a few}.",
      "Too hot to stand in a crowd tonight, and some people knew it before they left the house."
    ],
    COLD: [
      "Cold night. {lost:words:cap|A few} people didn't want to stand outside between sets.",
      "First real cold of the year. People stayed in.",
      "It got cold fast after dark. That's {lost:words|a few} people who didn't come out."
    ],
    SOMETHING_ELSE: [
      "[?up: More of the {gen|crowd} turned out than usual tonight. Nobody could say why. | ?down: Fewer of the {gen|crowd} turned out than usual tonight, and nobody could say why. | The turnout from the {gen|crowd} was off from usual tonight. Nobody could say why.]",
      "[?up: {gained:words:cap|A few} more of the {gen|crowd} than anybody expected. It happens. | ?down: {lost:words:cap|A few} of the {gen|crowd} who usually come didn't. Nothing you did. | The {gen|crowd} came out different from usual tonight, for no reason anybody knew.]",
      "[?up: Some nights more of the {gen|crowd} show up for no reason. This was one. | ?down: Some nights part of the {gen|crowd} stay home for no reason. This was one. | Nobody planned it. The {gen|crowd} just came out different tonight.]"
    ],
    WORD_GOT_AROUND: [
      "Word got around. {gained:words:cap|A few} {gen|people} came who hadn't heard about it a day ago.",
      "Somebody told somebody. The {gen|kids} showed up in a group nobody planned.",
      "One person talked it up and {gained:words|a few} more came. You can't schedule that."
    ],
    ROAD: [
      "{chokepoint:cap|The road in} was backed up tonight. {lost:words:cap|A few} people from {town|across the water} turned around.",
      "Traffic on {chokepoint|the way in} cost you the people coming from {town|out of town}.",
      "The drive from {town|the other side} was bad tonight. {lost:words:cap|Some} of them didn't make it."
    ],
    FINE_EVENING: [
      "First cool night in weeks. People wanted to be out.",
      "Clear evening after days of bad weather. {gained:words:cap|A few} people came just to be outside.",
      "The kind of night people go out on. That was worth {gained:words|a few}."
    ],
    NOISE: [
      "[?up: A few more than the numbers said. Some nights are like that. | ?down: A few fewer than the numbers said. Some nights are like that. | The count landed a little off from the forecast. Some nights are like that.]",
      "[?up: {gained:words:cap|A few} extra, for no reason worth chasing. | ?down: {lost:words:cap|A few} short, for no reason worth chasing. | A few either way, for no reason worth chasing.]",
      "[?up: Ordinary luck, the good kind. | ?down: Ordinary luck, the bad kind. | Ordinary luck.]"
    ]
  },

  /* ---------------- The close-out ledger (02-engine 7.9: PAR, YOURS, HIDDEN, a LUCK row per item, REST, TOTAL). */
  ledger: {
    PAR: "What the town expected",
    YOURS: "How you told people, against the usual",
    HIDDEN: "The bands and the town against what anyone would guess",
    LUCK: "Luck",
    REST: "Everything else",
    TOTAL: "Through the door"
  },

  oneLine: [
    "What happened, in one line: {what}",
    "The short version: {what}"
  ],

  /* ---------------- The night as it happens (TICK records). {t} is the clock time as people say it. ----------------
   * SPEC? 02-engine 5.6 has the night write one TICK line where an unraised Doors or Count stop would have been, but
   * names no path. doorsOnTime and counted are proposed for those; changeover, setEnd and quiet are spares. */
  ticker: {
    loadIn: [
      "{t}. {band} is here. (%30: They brought their own snare and a cooler.)",
      "{t}. {band} pulls up and starts carrying amps.",
      "{t}. {band} is loading in. (%30: The van smells like gas station coffee.)",
      "{t}. {band} is here, an hour later than they said and right when you needed them."
    ],
    doors: [
      "{t}. Doors. You're at the podium with the cash box and a marker.",
      "{t}. Doors open. You count the starting cash twice.",
      "{t}. Doors. Three people waiting already, and one of them is a band's mom.",
      "{t}. Doors. The first people in stand at the back like it's a waiting room."
    ],
    doorsOnTime: [
      "Doors at {t}. On time.",
      "Doors at {t}, right when you said."
    ],
    arrivals: [
      "{t}. {heads:words:cap} through the door.",
      "{t}. {heads:words:cap} in. A car just let out four more.",
      "{t}. {heads:words:cap} so far. People are standing outside talking instead of coming in.",
      "{t}. {heads:words:cap} through the door, and somebody's asking if there's a list."
    ],
    setStart: [
      "{t}. {band} starts. {present} people.",
      "{t}. {band} goes on to {present} people.",
      "{t}. {band}'s first song. {present} in the room.",
      "{t}. {band} starts. {present} people, and more coming in from the yard."
    ],
    setEnd: [
      "{t}. {band} is done. {present} still in the room.",
      "{t}. {band} finishes and somebody yells for one more."
    ],
    changeover: [
      "{t}. Changeover. Everybody goes outside at once.",
      "{t}. Changeover. The next band is carrying a bass cab through the crowd."
    ],
    kidsLeave: [
      "{t}. A few of the kids have gone; their rides came.",
      "{t}. Headlights in the driveway. Some of the kids are leaving.",
      "{t}. Somebody's mom is waiting in the car out front."
    ],
    full: [
      "{t}. The room is the fullest it's been all night.",
      "{t}. Nobody can get from the door to the back anymore.",
      "{t}. Full. People are watching from the doorway."
    ],
    last: [
      "{t}. Last song. Someone's already sweeping.",
      "{t}. Last song. The closer's drummer is already unscrewing a cymbal.",
      "{t}. Last song. The lights are on before it ends."
    ],
    done: [
      "{t}. Done. (?early: {early:words:cap} minutes early.)",
      "{t}. Done. People stand around in the yard not wanting to leave.",
      "{t}. Done. Somebody's already asking when the next one is."
    ],
    counted: [
      "Counted: {paid} paid, {list} on the list.",
      "Counted at the end: {paid} paid and {list} on the list. It matches."
    ],
    quiet: [
      "{t}. Nothing happening. Somebody is tuning.",
      "{t}. Somebody's dog wandered in and nobody minds.",
      "{t}. The line for the bathroom is longer than the line at the door.",
      "{t}. Quiet in between. People are getting water."
    ]
  },

  /* ---------------- Debrief lead-ins (a DEBRIEF job; the two comments after come from `comments`). ---------------- */
  debrief: {
    KIDS: [
      "You asked the kids what they thought.",
      "You found the kids who come to everything and asked them straight.",
      "You asked a few of the kids on their way out."
    ],
    OLD_HEADS: [
      "You asked the old heads how it went.",
      "You bought a round for the people who've been coming longest and asked.",
      "You asked the people who remember every room in town."
    ],
    ROOM: [
      "You called the owner the next day.",
      "You stayed to help close up and asked how the room took it.",
      "You asked the owner what they'd change."
    ],
    MONEY: [
      "You went over your door count against the cash box.",
      "You sat down with the cash box and the paper count.",
      "You went through the numbers line by line."
    ],
    TOURING: [
      "You asked the touring band how it compared.",
      "You asked the touring band straight: how was it here?",
      "You walked the touring band to their van and asked."
    ]
  },

  /* ---------------- Helper reports (02-engine 7.9 step 3: every helper comment is read from here). ----------------
   * RUNNER -> PROMO_POSTERS, ARTIST -> PROMO_FLYER, FLOOR -> SAFETY, LODGING -> HOSPITALITY. */
  helper: {
    RUNNER: {
      UP: [
        "Got the whole route up. People mentioned it.",
        "Hit every spot on the route, and the coffee place asked for extras.",
        "Posters went up early and stayed up. Somebody at the door said they saw one on a pole."
      ],
      DOWN: [
        "I didn't get to half the route. Sorry.",
        "Got some up, but three of the spots were already covered by somebody's yard sale.",
        "I did the west side twice and never made it east. I know that doesn't help."
      ]
    },
    ARTIST: {
      UP: [
        "People kept taking the flyer down to keep it. I'll take that.",
        "Somebody asked who drew the flyer. Felt good.",
        "The flyer was easy to read from across the street. That was the whole idea."
      ],
      DOWN: [
        "I know the flyer was late. That's on me.",
        "I don't think anybody could read the date on the flyer. I'll fix that next time.",
        "Flyer came out too busy. People looked at it and kept walking."
      ]
    },
    FLOOR: {
      UP: [
        "Kept the back door clear all night. Nobody gave me trouble.",
        "Walked the room every set. Nothing to report, which is the point.",
        "Moved a couple of people off the porch rail before anybody fell. Quiet night."
      ],
      DOWN: [
        "It got too packed by the door and I couldn't get through to fix it.",
        "I was outside when it went sideways inside. I should've been at the front.",
        "There were people in front of the exit most of the night and I couldn't move them."
      ]
    },
    LODGING: {
      UP: [
        "They slept fine. They did the dishes before they left, which, wow.",
        "Put them up, made eggs in the morning. They said it was the best floor of the tour.",
        "They showered and slept till ten. They left a tape on the counter."
      ],
      DOWN: [
        "My roommate wasn't into it, so they ended up in the van half the night.",
        "Floor was fine, but I had to be up at six and so did they.",
        "I forgot I had work and they waited outside for an hour. Sorry."
      ]
    }
  },

  /* Clauses a touring band may add to a comment. They attribute nothing and teach nothing. */
  flavor: [
    "And thank you for the beans and rice.",
    "Somebody here gave us a bag of oranges for the road.",
    "We'll tell the next band coming through.",
    "Thanks for the coffee in the morning.",
    "Our drummer says hi to your dog."
  ]
};
