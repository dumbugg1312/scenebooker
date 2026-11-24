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
          NEW: ["The crowd kept changing between sets, like a different bunch of people came in for each band.", "It felt like two different shows tonight, with a different room for each half."],
          LEARNING: ["The {genreA} people and the {genreB} people didn't stay for each other."],
          KNOWS: ["{genreA:cap} and {genreB} don't share a crowd in this town, so whoever came for one left before the other. Put them on different nights."]
        },
        UP: {
          NEW: ["People stayed for every band tonight. Hardly anybody went out to the parking lot between sets.", "Nobody went outside between sets."],
          LEARNING: ["The {genreA} crowd liked the {genreB} bands fine, so the bill held together all night."],
          KNOWS: ["{genreA:cap} and {genreB} share a crowd in this town, so you can stack them on one bill and everybody stays all night."]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["That was a strange bill. I couldn't tell you who it was supposed to be for.", "Odd mix of bands tonight, if you ask me. I kept looking around trying to work out who came for what."],
          LEARNING: ["{genreA:cap} and {genreB} have never shared a crowd here, not in all the years I've been going.", "Half the room walked out after the {genreA} band. There was nothing wrong with either band, they just don't have the same people."],
          KNOWS: ["In this town the {genreA} people and the {genreB} people won't stand in the same room, and they never have. Whoever plays second clears out the first band's crowd, so pick one or the other.", "I've watched {genreA} and {genreB} split a room for twenty years. Put them on separate nights and both nights do better."]
        },
        UP: {
          NEW: ["Good bill tonight. I stayed for all of it, which I don't usually do.", "That bill made sense, start to finish."],
          LEARNING: ["{genreA:cap} into {genreB} has always worked here, because it's mostly the same people.", "Everybody who came for the first band was still there for the last."],
          KNOWS: ["{genreA:cap} and {genreB} have had the same crowd here since before you were going to shows, so when you bill them together nobody goes home early.", "You put {genreA} and {genreB} together and it was one crowd from the first band to the last. I'd do it exactly like that again."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["My friends left after the second band and I ended up standing around by myself."],
          LEARNING: ["I like the {genreA} stuff, but I wasn't going to stay for the {genreB} band, and neither was anybody I came with."],
          KNOWS: ["Half of us only come out for the {genreA} bands. When you put a {genreB} band in the middle, we leave at the changeover and don't come back in."]
        },
        UP: {
          NEW: ["I actually stayed the whole night for once, and so did everybody I came with."],
          LEARNING: ["I came for the {genreA} band and ended up liking the {genreB} ones too."],
          KNOWS: ["{genreA:cap} with {genreB} is my favorite kind of night you do, because everybody I know will stay for both."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["The room kind of emptied out right before we went on. That happens, but it was a lot of people."],
          LEARNING: ["The people who were here for the {genreA} band didn't stick around for us. I don't think we're their kind of thing."],
          KNOWS: ["Honestly, put us with bands that sound like us next time. Half the room tonight wasn't there for our kind of thing, and they left while we were loading in."]
        },
        UP: {
          NEW: ["Everybody stayed for our set, which we really didn't expect in a town we've never played."],
          LEARNING: ["The locals you put us with had the same crowd we do."],
          KNOWS: ["You matched the bill really well. The same people liked every band, so the room was still full when we went on."]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["People kept going outside all night, and they weren't buying anything out there."],
          LEARNING: ["Half of them walked out between bands, and the bar went dead every time."],
          KNOWS: ["Every time a band finished, half the room went out to the parking lot and I sold nothing for twenty minutes. If the same people liked all the bands, they'd have stayed at my bar."]
        },
        UP: {
          NEW: ["Nobody left early tonight, and when people stay, they drink."],
          LEARNING: ["It was the same people in here all night, and the bar did well off them."],
          KNOWS: ["I'd take a bill like this, where nobody leaves, over some big band any night. The bar did good from the first set to the last."]
        }
      }
    },

    /* ---------------- GEN_MIX: generations on the bill ---------------- */
    GEN_MIX: {
      ANY: {
        DOWN: {
          NEW: ["The room was all one age early on and all another by the end."],
          LEARNING: ["The {genA} came early and the {genB} came late, and they didn't overlap."],
          KNOWS: ["The {genA} came for the openers and the {genB} came for the headliner, and neither stayed for the other. A bill like that has to be built for one crowd or the other."]
        },
        UP: {
          NEW: ["There was every age in the room tonight."],
          LEARNING: ["The bill brought the {genA} and the {genB} and both stayed."],
          KNOWS: ["{kids:words:cap} kids and {old:words} old heads in one room, and it was the bill that did it. Save a bill like that for about once a season or people stop thinking it's special."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["It was two different crowds tonight, one right after the other.", "The young ones left right when the older ones showed up."],
          LEARNING: ["Kids came for the openers and were gone by the time the {genB} got here.", "I stamped a lot of hands early and a lot late, and hardly any in the middle."],
          KNOWS: ["I had {kids:words} kids and {old:words} old heads, but never at the same time. A bill like that splits the night in half.", "The first hour was all {genA} and the last hour was all {genB}, and they passed each other in the doorway."]
        },
        UP: {
          NEW: ["Weird mix of people tonight, in a good way. I was stamping fourteen-year-olds and people older than me all night.", "I had every age come through the door tonight."],
          LEARNING: ["It was half kids and half people my age, and I haven't seen that at one of yours before.", "The {genA} and the {genB} both came and both stayed."],
          KNOWS: ["Kids came for the openers and old heads came for {touring}, and both of them stayed to the end. It's the bill that does that.", "I counted {kids:words} kids, {middle:words} in the middle and {old:words} old heads. That's the most even night I've had."]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["Lot of kids tonight. I stood in the back and didn't know a single person."],
          LEARNING: ["That bill was for the kids, which is fine, but nobody my age had a reason to come out."],
          KNOWS: ["Give us one band we grew up on and we'll stand next to the kids all night, we don't mind. Tonight there wasn't one, so most of my friends stayed home."]
        },
        UP: {
          NEW: ["Haven't seen a room like that in a while."],
          LEARNING: ["Young ones and old ones in the same room, and I'd bet it was the bill that got them there."],
          KNOWS: ["You put a band everybody my age grew up on with kid bands that sound like them, and that's how you get both. I wouldn't do it every week, though, or it wears out."]
        }
      },
      KID: {
        DOWN: {
          NEW: ["by the end it was mostly old guys in there"],
          LEARNING: ["none of my friends stayed for the last band. it was a band for people's dads"],
          KNOWS: ["when the last band is one for the old heads, all of us leave before they play. put a band we know last or end with the kid bands"]
        },
        UP: {
          NEW: ["my friend's dad was there and he was dancing"],
          LEARNING: ["the old heads were actually really nice to us, they let us up front"],
          KNOWS: ["when there's a band we like and a band our parents used to like, everybody comes, even my mom. do that again"]
        }
      }
    },

    /* ---------------- ORDER: who played in which slot ---------------- */
    ORDER: {
      ANY: {
        DOWN: {
          NEW: ["The room was fullest at a strange point in the night, and it wasn't when you'd want it."],
          LEARNING: ["The order was off, so the band people came for wasn't on when the room was fullest."],
          KNOWS: ["The room is fullest for the last two slots, so that's where they go: the touring band second to last and your biggest local closing."]
        },
        UP: {
          NEW: ["The room was full when it counted."],
          LEARNING: ["The order was good tonight, and every band got a room to play to."],
          KNOWS: ["You had {touring} second to last and your biggest local closing, and that order worked the way it always does."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["We went on kind of early.", "We kind of wish we'd played a little later, but thanks for having us."],
          LEARNING: ["We played early and half the room was still out in the parking lot.", "The room filled up right after we finished, for the band after us."],
          KNOWS: ["Honestly, the touring band should go on when the room's fullest, and on a bill this size that's second to last. Where you had us, we got the early crowd.", "We played to the early crowd and the closer got the full room. If you swap that next time, more people see us and we sell enough merch to make the drive worth it."]
        },
        UP: {
          NEW: ["That was a great crowd for our set, thank you.", "The room was packed when we went on."],
          LEARNING: ["Second to last was perfect for us. The room was full the whole set.", "You had us on right when everybody was there."],
          KNOWS: ["You put us second to last with your biggest local closing, so the room was at its fullest when we played. Not every town does that for us.", "You gave us the best slot of the night, and you knew it was the best one. We'll remember that, and so will the bands we tell about it."]
        }
      },
      SOUND: {
        DOWN: {
          NEW: ["You had the loud band go first? I don't know about that."],
          LEARNING: ["Your heaviest band opened, and after that everybody else sounded quiet no matter what I did."],
          KNOWS: ["Put the heaviest band third. Once people's ears get used to loud, anything quieter after that sounds thin, and I can't fix it at the board."]
        },
        UP: {
          NEW: ["The order made sense from back here at the board."],
          LEARNING: ["It got louder all night, which is how you want it."],
          KNOWS: ["Quietest first and heaviest late, so every band sounded bigger than the one before. I'd do it that way every time."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["A lot of people showed up right as a band was finishing."],
          LEARNING: ["People kept coming in asking for {band}, and {band} had already played."],
          KNOWS: ["Most people walked in after {lastStart}, and the band they asked about at the door had already gone on by then. Whoever brings the people should play later."]
        },
        UP: {
          NEW: ["People got here in time for the band they came for."],
          LEARNING: ["Everybody who asked about {band} got in before they started."],
          KNOWS: ["The big rush at the door was right before {band} went on, which is exactly where you had them."]
        }
      },
      LOCAL_BAND: {
        DOWN: {
          NEW: ["Thanks for having us. We'd love to go a little later next time if you can."],
          LEARNING: ["Our people always come late, so we played to a room with nobody we knew in it."],
          KNOWS: ["Our friends don't show up till ten, ever. If you put us on after that we'd bring twice as many people."]
        },
        UP: {
          NEW: ["Thanks for giving us such a good slot."],
          LEARNING: ["Going on right before the touring band was great for us."],
          KNOWS: ["That slot was right for us. All our friends were here by then, and they stayed for the touring band after."]
        }
      }
    },

    /* ---------------- RUNTIME: set lengths, changeovers, running late, curfew ---------------- */
    RUNTIME: {
      ANY: {
        DOWN: {
          NEW: ["It ran pretty late tonight.", "The night dragged, and there was a lot of standing around."],
          LEARNING: ["Changeovers ran long and it pushed everything back {late:words} minutes."],
          KNOWS: ["The last set started at {lastStart}. Shared drums and tighter sets would have had it done before people left."]
        },
        UP: {
          NEW: ["It ran on time for once."],
          LEARNING: ["Changeovers were short, so everybody got to see every band."],
          KNOWS: ["It was done on time because the bands shared gear and nobody played over their time."]
        }
      },
      SOUND: {
        DOWN: {
          NEW: ["We ran late tonight, real late, and I'm not sure where it all went.", "We were behind all night and I couldn't catch it back up. Sorry about that."],
          LEARNING: ["Every changeover was fifteen minutes because nobody would share drums.", "Every band played long and every changeover was slow, so we ended up {late:words} minutes behind."],
          KNOWS: ["Three changeovers at fifteen is forty-five minutes of nothing. Get them sharing a kit and you're done before people leave.", "We ran {late:words} minutes over and the last set didn't start till {lastStart}. Put the set lengths in the advance and hold the bands to them, because they won't do it on their own."]
        },
        UP: {
          NEW: ["We ran on time tonight, and I honestly don't know how.", "We were right on schedule tonight, which almost never happens."],
          LEARNING: ["Everybody shared the kit, so changeovers were five minutes.", "Nobody went over their time, and I can't remember the last show where that happened."],
          KNOWS: ["Changeovers were five minutes because everybody shared gear, and that's why {touring} went on right when they were supposed to.", "The set times went out in the advance, and everybody used one kit and one bass cab. That's why we were done on time."]
        }
      },
      KID: {
        DOWN: {
          NEW: ["i had to leave before it was over"],
          LEARNING: ["my ride came and the band i came for hadn't even started yet"],
          KNOWS: ["if the band we came for goes on at {lastStart} on a school night none of us see it. end by 10:30 or put them earlier"]
        },
        UP: {
          NEW: ["i got to see every band, which never happens"],
          LEARNING: ["it ended early enough that my mom didn't have to wait outside"],
          KNOWS: ["everything was done before my curfew so all my friends could come. if it's always done that early we'll come to all of them"]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["You went late tonight."],
          LEARNING: ["You told me you'd be done on time and you went {late:words} minutes past. The neighbors noticed, and they'll tell me about it before they tell you."],
          KNOWS: ["When I say done on time, I mean the last band is off the stage by then. Starting them at {lastStart} was never going to make it."]
        },
        UP: {
          NEW: ["You were done when you said you'd be done, and I appreciate that."],
          LEARNING: ["It ended on time, which is the thing I care about most."],
          KNOWS: ["You ended right on the clock. Do that every time and you can have this room whenever you want it."]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["That was too long a night for me.", "Bands play too long these days."],
          LEARNING: ["Every band played ten minutes too long. It used to be twenty-five minutes and off the stage, and nobody minded."],
          KNOWS: ["Twenty-five minutes for openers, forty for the headliner. That's how we did it and nobody ever complained."]
        },
        UP: {
          NEW: ["Short and sweet tonight, and I liked that.", "Nobody overstayed their welcome tonight."],
          LEARNING: ["The sets were short, and everybody went home wanting more of them."],
          KNOWS: ["Short sets, quick changes and home by midnight. People my age will keep coming out for a night like that."]
        }
      }
    },

    /* ---------------- ROOM_FIT: room size and type for this draw and genre ---------------- */
    ROOM_FIT: {
      ANY: {
        DOWN: {
          NEW: ["The room felt wrong for this one."],
          LEARNING: ["It was the wrong room for this bill, and it never really felt like a show."],
          KNOWS: ["{n:words:cap} people in {room} feels empty. Put the same crowd in a room half that size and it feels packed."]
        },
        UP: {
          NEW: ["It was the right room for this one."],
          LEARNING: ["The room fit the crowd, so it felt full all night."],
          KNOWS: ["{n:words:cap} people in {room} is a packed room, so that's where this kind of bill should go."]
        }
      },
      SOUND: {
        DOWN: {
          NEW: ["Room didn't do them any favors.", "That's a tough room for a band like that."],
          LEARNING: ["That room eats low end. The bass was mud.", "Big hard room and a quiet band, so the room just swallowed them."],
          KNOWS: ["{room} is all hard walls and it bounces everything around. A band like that needs a low ceiling and a small floor.", "That was the wrong room for their sound. Put them somewhere half the size and they'll sound twice as big."]
        },
        UP: {
          NEW: ["Good room for them.", "That room liked that band."],
          LEARNING: ["Small room, loud band and a low ceiling, so it sounded huge.", "The room did half my job tonight."],
          KNOWS: ["It's the low ceiling that does it for a band like that. Every time you book them, find them a room like this one.", "{room} is the right size for this kind of band, so I didn't have to fight it at all. Remember that one."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["It was a pretty big room for us."],
          LEARNING: ["We were playing to a lot of empty floor."],
          KNOWS: ["We'd honestly rather play to forty people in a carport than sixty in a hall. Next time put us somewhere our crowd can fill."]
        },
        UP: {
          NEW: ["We loved that small room."],
          LEARNING: ["The room was the right size, so it never felt like anybody was standing around in an empty room."],
          KNOWS: ["At {n} people this room felt like a real show, because it was the right size for that many."]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["My room looked empty tonight."],
          LEARNING: ["This was too big a room for this crowd, and it looked dead from the door."],
          KNOWS: ["My room needs about twice what you had before it feels like anything. Take a bill this size somewhere smaller."]
        },
        UP: {
          NEW: ["The room looked good tonight."],
          LEARNING: ["That was the right size crowd for my room, and it looked like a real night in here."],
          KNOWS: ["About {n} is what this room wants. That's a good number for me, so keep bringing me bills that size."]
        }
      }
    },

    /* ---------------- AGE_GATE: 21+ locked out the kids; all-ages lost the bar crowd ---------------- */
    AGE_GATE: {
      ANY: {
        DOWN: {
          NEW: ["Some people came all the way out here and couldn't get in.", "I think the age policy might have been wrong for this bill."],
          LEARNING: ["The age policy kept out the people this bill draws."],
          KNOWS: ["{turned:words:cap} got turned away at the door, and they're exactly who the openers draw. The age policy has to match who the bill is for."]
        },
        UP: {
          NEW: ["Everybody who wanted in got in."],
          LEARNING: ["It was the right age policy for this bill, and nobody got turned away."],
          KNOWS: ["You made it all ages for a bill the kids care about, and that's {kids:words} people a bar show never gets."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["I had to turn away a few kids at the door.", "Some people came all the way out here and couldn't get in."],
          LEARNING: ["I turned away {turned:words} who weren't old enough, and their friends' band was on the bill.", "Lots of kids showed up at the door and I didn't have a wristband I could give them."],
          KNOWS: ["I turned away {turned:words}, and they're who the openers draw. You can't put an all-ages band in a 21+ room and expect their people to get in.", "Every kid I sent home was there for one of the locals on the bill. That's {turned:words} people the age policy cost you."]
        },
        UP: {
          NEW: ["I didn't have to turn anybody away tonight.", "A lot of kids came out tonight."],
          LEARNING: ["Making it all ages meant {kids:words} kids came through, and they don't get to see many shows.", "Nobody was stuck outside the door tonight."],
          KNOWS: ["{kids:words:cap} under-21s paid tonight, and a bar show wouldn't have gotten any of them.", "All ages was right for this bill. I had {kids:words} kids, nobody got turned away, and they bought merch too."]
        }
      },
      KID: {
        DOWN: {
          NEW: ["i couldn't get in"],
          LEARNING: ["it was 21+ and i'm 17, so i sat in my friend's car and listened from the parking lot"],
          KNOWS: ["every time it's at a bar we can't come. the openers are our friends' bands, that's who's missing"]
        },
        UP: {
          NEW: ["i actually got in this time"],
          LEARNING: ["finally a show at a real place that let us in"],
          KNOWS: ["when it's all ages my whole friend group comes, and we're about half the crowd for the openers"]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["The bar was slow tonight."],
          LEARNING: ["An all-ages crowd doesn't buy drinks, so the bar barely made anything."],
          KNOWS: ["If it's all ages it has to be early and I need a room fee, and if it's 21 and up I make my money on the bar. You have to pick one."]
        },
        UP: {
          NEW: ["The bar did fine tonight."],
          LEARNING: ["It was the right crowd for the bar, and people were buying all night."],
          KNOWS: ["You brought an over-21 bill to an over-21 room and the bar had a good night. Do that a few more times and you can have my Fridays."]
        }
      }
    },

    /* ---------------- NIGHT: day of the week, school night, payday ---------------- */
    NIGHT: {
      ANY: {
        DOWN: {
          NEW: ["It's a hard night of the week for a show.", "A lot of people had work in the morning."],
          LEARNING: ["{dow:cap} is a hard night here, and most people stay home."],
          KNOWS: ["A {dow} here does about {par} for a bill like this, so save the bigger bills for a weekend."]
        },
        UP: {
          NEW: ["It was a good night for it.", "People were ready to go out tonight."],
          LEARNING: ["{dow:cap} is a good night here, because people are already out."],
          KNOWS: ["{dow:cap} works in this town, so that's the night for the bills you care about most."]
        }
      },
      KID: {
        DOWN: {
          NEW: ["it was a school night", "half my friends couldn't come because we have school tomorrow"],
          LEARNING: ["{dowLower} is hard because my mom always says no on a school night", "nobody can go out on a {dowLower}, we have school"],
          KNOWS: ["if you want us there it has to be a friday, a saturday or a sunday afternoon. on weeknights it's only the kids who drive", "on a {dowLower} it's maybe four of us and on a friday it's all of us. that's just how it is"]
        },
        UP: {
          NEW: ["no school tomorrow, so everybody could stay out", "everybody i know could come tonight"],
          LEARNING: ["{dowLower} is the best night because nobody's parents care how late it goes", "nobody had to be home early because it was a {dowLower}"],
          KNOWS: ["{dowLower} is when all of us can come. put the all-ages ones on {dowLower} and you'll get {kids:words} of us every time", "no school the next day means everybody comes and stays to the end. put the shows for kids on this night"]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["I almost didn't come out tonight."],
          LEARNING: ["{dow:cap} is rough for me and most people I know, because we all work early."],
          KNOWS: ["Most of us work early. On a {dow} you get the twelve of us who'd come to anything, and that's it."]
        },
        UP: {
          NEW: ["It was a good night to be out."],
          LEARNING: ["{dow:cap} is easy for me, and everybody was out already."],
          KNOWS: ["On a {dow} I bring three people, and on a weeknight I come by myself. I'd put the good ones on this night."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["It was slow at the door and it felt like a weeknight."],
          LEARNING: ["People kept saying they had work in the morning."],
          KNOWS: ["{n:words:cap} paid on a {dow}. The same bill on a Friday would easily do half again that."]
        },
        UP: {
          NEW: ["It was busy at the door tonight."],
          LEARNING: ["Everybody was out already, and half of them came here from somewhere else."],
          KNOWS: ["{n:words:cap} paid on a {dow}. This night does numbers here, so I wouldn't waste it on a small bill."]
        }
      }
    },

    /* ---------------- PROMO_ANNOUNCE: when the show was announced ---------------- */
    PROMO_ANNOUNCE: {
      ANY: {
        DOWN: {
          NEW: ["People found out about this one late."],
          LEARNING: ["It got announced late, and people had already made plans."],
          KNOWS: ["It was announced {daysOut:words} days out. People need about three weeks, so announce the day you confirm."]
        },
        UP: {
          NEW: ["People knew about this one a long time ago."],
          LEARNING: ["It was announced early, and people planned around it."],
          KNOWS: ["It was announced {daysOut:words} days out, which is enough time for people to plan around it."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["I didn't even know about it till yesterday.", "Wait, when did you announce this?"],
          LEARNING: ["You announced it about a week out, and I already had plans.", "I found out late, and so did most people I know."],
          KNOWS: ["I need about three weeks' notice, and most of us do. Announce it when you confirm, even if the bill's not done yet.", "You announced it {daysOut:words} days out. By then my whole month was spoken for."]
        },
        UP: {
          NEW: ["I've had this one on my calendar forever.", "I knew about this one a month ago."],
          LEARNING: ["You announced early, so I could get the night off.", "You announced it early, so I had time to tell everybody."],
          KNOWS: ["{daysOut:words:cap} days of notice is perfect for me. I got the night off work and brought two people.", "Announce a month out like this and people plan around you instead of the other way."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["I heard a lot of 'just found out' at the door."],
          LEARNING: ["I asked how they heard, and a lot of them only found out this week."],
          KNOWS: ["Of {n}, most heard about it in the last week. It went out {daysOut:words} days ahead, and that's too late for anybody who plans."]
        },
        UP: {
          NEW: ["People knew about this one way ahead."],
          LEARNING: ["People said they'd been planning on it for weeks."],
          KNOWS: ["Most people I asked had it planned weeks back, because you announced it {daysOut:words} days out."]
        }
      },
      POSTS: {
        DOWN: {
          NEW: ["wait, there was a show tonight? nobody told me"],
          LEARNING: ["found out about this one the day of. i would've come if i'd known sooner"],
          KNOWS: ["please announce shows earlier, some of us have jobs and need to ask off about three weeks ahead"]
        },
        UP: {
          NEW: ["been waiting on this one forever"],
          LEARNING: ["had this one on the calendar since it got announced"],
          KNOWS: ["the shows that get announced a month out are the only ones i actually make it to, and this was one of them"]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["It felt like people here didn't know we were coming."],
          LEARNING: ["Nobody here seemed to know about the show until this week."],
          KNOWS: ["The towns that announce three weeks out do about twice what this did for us. Get it out the day you confirm next time."]
        },
        UP: {
          NEW: ["People actually knew we were coming, which was nice."],
          LEARNING: ["You got the word out early, and it showed."],
          KNOWS: ["You announced it the day you confirmed us. Most towns wait, and most towns are about half this."]
        }
      }
    },

    /* ---------------- PROMO_FLYER: when and whether the flyer was made ---------------- */
    PROMO_FLYER: {
      ANY: {
        DOWN: {
          NEW: ["A lot of people didn't hear about this one till late."],
          LEARNING: ["The flyer came out late."],
          KNOWS: ["A flyer needs three weeks to work, and this one got {daysOut:words} days."]
        },
        UP: {
          NEW: ["People saw the flyer a while back."],
          LEARNING: ["The flyer was out early."],
          KNOWS: ["The flyer was out a month ahead, and you could tell at the door."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["A lot of people said they didn't know about it till today.", "Hardly anybody mentioned the flyer."],
          LEARNING: ["I asked everybody, and most of them heard from the bands. Hardly anyone saw a flyer.", "Nobody'd seen a flyer, they all heard from friends."],
          KNOWS: ["Of {n}, {fewSaw:words} saw a flyer. The flyer went up {daysOut:words} days out, and it needs three weeks to work.", "{fewSaw:words:cap} people out of {n} said the flyer, which is about what you get putting it up {daysOut:words} days out."]
        },
        UP: {
          NEW: ["People kept saying they saw the flyer.", "A lot of people mentioned the flyer."],
          LEARNING: ["I asked everybody, and a lot of them had seen the flyer weeks ago.", "The flyer did its job tonight. People brought it up without me even asking."],
          KNOWS: ["The flyer was out {daysOut:words} days ahead, and that's why {n} people knew where to be.", "Most of the people who said 'flyer' saw it weeks back. When it goes up that early it reaches people who don't already know everybody."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["I never saw a flyer for this one."],
          LEARNING: ["I usually see your flyers weeks ahead. This one I saw the day before."],
          KNOWS: ["Your flyer went up {daysOut:words} days out. I need to see it a few times before I make plans."]
        },
        UP: {
          NEW: ["I saw your flyer everywhere."],
          LEARNING: ["The flyer was up early, and I had it on my fridge for weeks."],
          KNOWS: ["The flyer was up {daysOut:words} days ahead, and I saw it three times before the show. That's the only way I remember anything."]
        }
      },
      HELPER: {
        DOWN: {
          NEW: ["I think the flyer got out kind of late."],
          LEARNING: ["I didn't have the flyer in time to get it out early."],
          KNOWS: ["I had the flyer {daysOut:words} days out. Get it to me a month ahead and I can actually do something with it."]
        },
        UP: {
          NEW: ["The flyer went over well, people were taking them."],
          LEARNING: ["I had the flyer early, so it was everywhere for weeks."],
          KNOWS: ["Having the flyer {daysOut:words} days out was the right amount of time, so people saw it more than once."]
        }
      }
    },

    /* ---------------- PROMO_POSTERS: posters around town, where and when ----------------
     * Flags at a house, yard or DIY show: askAPunk (the flyer said to ask) or addressOut (the address was printed). */
    PROMO_POSTERS: {
      ANY: {
        DOWN: {
          NEW: ["Nobody seemed to have seen any posters for this one."],
          LEARNING: ["[?askAPunk: The posters said ask a punk, and people over thirty don't know who to ask. | ?addressOut: The posters had the address, but they went up too late to matter. | The posters went up late, or not at all.]"],
          KNOWS: ["[?askAPunk: Ask-a-punk posters lose the old heads and the kids find it anyway, so think about who you want before you print them. | ?addressOut: The address was on every pole, but it went up {daysOut:words} days out, so strangers found it and the regulars never planned for it. | Posters need two to three weeks on the wall, and these had {daysOut:words} days.]"]
        },
        UP: {
          NEW: ["People saw posters around town."],
          LEARNING: ["[?askAPunk: The posters said ask a punk, and the kids asked. | ?addressOut: The address was on the posters, and people who don't know anybody came anyway. | The posters did their job this time.]"],
          KNOWS: ["[?askAPunk: Ask-a-punk posters kept the night to people who know people, and the kids still found it. | ?addressOut: The address on the poster brought {old:words} old heads who'd never have asked. | The posters went up {daysOut:words} days ahead, and that reaches the people who don't follow anybody online.]"]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["I didn't see a single poster for this one, and I walk all over town.", "It used to be you'd see a show stapled to every telephone pole downtown."],
          LEARNING: ["[?askAPunk: The poster said ask a punk, and who am I supposed to ask at my age? | ?addressOut: I saw the address on a pole the day before, and that's too late for me. | There weren't any posters, and I don't look at my phone to find out about shows.]", "[?askAPunk: Nobody my age knew where it was, and I wasn't going to go around asking kids. | The posters went up the week of, and by then I'd already made plans.]"],
          KNOWS: ["[?askAPunk: Nobody over thirty knew where it was. Ask-a-punk works fine for the kids, but we don't know any punks to ask anymore. | ?addressOut: The address was on a pole downtown {daysOut:words} days out, and that's not enough time for people like me. | Put posters up three weeks out at the record store and the coffee place, because that's where people my age look.]", "[?askAPunk: Ask-a-punk cost you everybody my age, and I'd guess that's {old:words} people who'd have come. | Posters {daysOut:words} days out is too late for anybody with a job and a kid. You want them up three weeks ahead.]"]
        },
        UP: {
          NEW: ["I saw your poster at the coffee place, right by the register.", "You did posters, the old-fashioned way, and I liked seeing that."],
          LEARNING: ["[?askAPunk: The poster said ask a punk, so I asked one, and it took me two tries. | ?addressOut: I saw the poster with the address on it and just came. | The posters went up early, and that's how I find out about anything.]", "[I saw it on the record store wall weeks ago, which is how I've always found out about shows.]"],
          KNOWS: ["[?askAPunk: I had to ask around, but the poster was up early enough that I could. | ?addressOut: The address was on the poster and the poster was up weeks ahead, and that's why the old heads came. | Posters at the record store three weeks out bring my whole crowd, so keep doing that.]", "[You had the poster up {daysOut:words} days ahead in places people my age walk past every day, so we all saw it.]"]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["None of the older people said they saw a poster."],
          LEARNING: ["[?askAPunk: A few older people said they saw the poster and couldn't find out where it was. | Barely anybody said posters, and the ones who did were all over thirty.]"],
          KNOWS: ["[?askAPunk: Three people told me they saw the poster and had to text around for the address. Ask-a-punk loses you the people who don't know anybody to ask. | ?addressOut: People came straight off the poster, address and all, but the poster went up {daysOut:words} days out. | Of {n}, hardly anyone said posters. Posters are how you reach the over-thirties, and they need to be up for weeks.]"]
        },
        UP: {
          NEW: ["Older folks kept saying they saw a poster."],
          LEARNING: ["[?askAPunk: A lot of older people said they asked around after seeing the poster. | Posters pulled the thirty-and-up crowd, mostly from the record store and the coffee place.]"],
          KNOWS: ["[?addressOut: I saw a lot of faces I'd never seen before, all off the poster with the address. | {old:words:cap} of the over-thirties said the poster, and kids never mention posters at all.]"]
        }
      },
      HELPER: {
        DOWN: {
          NEW: ["I don't think the posters did much this time."],
          LEARNING: ["[?askAPunk: People kept asking me where it was while I was putting them up, and I didn't know if I was supposed to tell them. | I got the posters up late. I hit all the usual spots, I just didn't have them in time.]"],
          KNOWS: ["[?addressOut: I got them up {daysOut:words} days out with the address on them. Next time give me three weeks. | Posters need three weeks on the wall, and I got them up {daysOut:words} days out.]"]
        },
        UP: {
          NEW: ["I think the posters went over well."],
          LEARNING: ["[?askAPunk: A couple of people stopped me while I was putting them up to ask where it was, so people were reading them. | I got them up early and they stayed up the whole time.]"],
          KNOWS: ["[I got the whole route done {daysOut:words} days out. People at the door said the record store and the coffee place, which are the two spots I hit first.]"]
        }
      }
    },

    /* ---------------- PROMO_SHARES: whether the bands shared it ---------------- */
    PROMO_SHARES: {
      ANY: {
        DOWN: {
          NEW: ["Not many people came for the bands themselves."],
          LEARNING: ["The bands didn't share it, so their people didn't know about it."],
          KNOWS: ["{band:cap} never shared the flyer, and none of their people came. When a band posts it, their friends show up."]
        },
        UP: {
          NEW: ["The bands brought their people."],
          LEARNING: ["Every band shared the flyer, and it showed at the door."],
          KNOWS: ["All the bands shared it early, and that's where most of the night's walk-ins came from."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["Not many people came for the touring band.", "Barely anybody said they came for a band."],
          LEARNING: ["Nobody'd seen the touring band share it, so their people here didn't know.", "I asked who people came for, and hardly anybody named {band}. {band:cap} never posted about it."],
          KNOWS: ["{touring:cap} never posted the flyer. Ask them to, in the advance, because that's where their ten to fifteen people come from.", "Of {n}, only a handful came for {band}, and that's because they never shared the flyer. Their friends didn't know."]
        },
        UP: {
          NEW: ["A lot of people told me they came for one of the bands.", "People knew who they were here for."],
          LEARNING: ["Every band posted it, and half the room named a band at the door.", "{band:cap} shared it and their people showed up."],
          KNOWS: ["{count:words:cap} people said they saw one of the bands post it. That's most of your walk-in crowd right there.", "{band:cap} posted the flyer twice, and that's most of the people who named them at the door."]
        }
      },
      LOCAL_BAND: {
        DOWN: {
          NEW: ["We should've posted about it more, honestly."],
          LEARNING: ["We forgot to share the flyer until the day of, sorry about that."],
          KNOWS: ["Send us the flyer the day you make it and we'll post it right away. That's how our friends find out about anything."]
        },
        UP: {
          NEW: ["We posted it and a bunch of our friends came out."],
          LEARNING: ["We shared it a couple of times and pretty much all our friends showed up."],
          KNOWS: ["You got us the flyer early, so we posted it twice, and that's why all our people were here."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["Our people here didn't know we were coming."],
          LEARNING: ["We never shared the flyer for this one, and that's on us, sorry."],
          KNOWS: ["Send us the flyer with the advance and we'll post it. We've got a few friends in every town, but they have to know we're coming."]
        },
        UP: {
          NEW: ["Our friends here actually came out, which was great."],
          LEARNING: ["We posted it and the people who know us here showed up."],
          KNOWS: ["You sent the flyer early enough for us to post it twice, and that's why our people here came."]
        }
      }
    },

    /* ---------------- PROMO_DMS: whether you asked people directly ---------------- */
    PROMO_DMS: {
      ANY: {
        DOWN: {
          NEW: ["People who'd have come didn't hear about it."],
          LEARNING: ["Nobody got asked directly, and a lot of people wait until somebody asks them."],
          KNOWS: ["Message the people who come to everything, because one message to each of them brings their friends along too."]
        },
        UP: {
          NEW: ["People came because somebody asked them."],
          LEARNING: ["Asking people directly worked, and they brought friends."],
          KNOWS: ["You messaged the people who come to everything, and they each brought somebody. That's worth doing every time."]
        }
      },
      KID: {
        DOWN: {
          NEW: ["i didn't know about it till my friend posted from inside", "nobody told me about it"],
          LEARNING: ["usually somebody messages us about your shows. nobody did this time", "if nobody tells us we just don't know. we don't really look at flyers"],
          KNOWS: ["message the kids who come to everything. they tell everybody, that's how we find out about anything", "one message to me is about eight kids, and nobody sent me one this time"]
        },
        UP: {
          NEW: ["my friend told me about it", "somebody messaged me about it so i came"],
          LEARNING: ["{you} messaged my friend and she told about ten people", "you asked me to come so i brought my whole group"],
          KNOWS: ["you messaged the kids who come to everything and we all told everybody. that's {kids:words} of us right there", "message me again next time and i'll bring the same people"]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["I didn't hear from you about this one."],
          LEARNING: ["You usually message me about your shows, but nobody asked me this time."],
          KNOWS: ["When you ask me, I come and I bring two people. This time nobody asked."]
        },
        UP: {
          NEW: ["Thanks for messaging me about it."],
          LEARNING: ["You messaged me, so I came and brought my roommate."],
          KNOWS: ["One message from you is three people from me, because I always drag my roommate and her boyfriend along."]
        }
      }
    },

    /* ---------------- PROMO_PUSH: final-week and day-of posts ---------------- */
    PROMO_PUSH: {
      ANY: {
        DOWN: {
          NEW: ["A lot of people forgot it was tonight."],
          LEARNING: ["Nothing went out the week of, so people who meant to come forgot."],
          KNOWS: ["Post the week of and again the morning of, because people who saw the flyer a month ago need reminding."]
        },
        UP: {
          NEW: ["People remembered it was tonight."],
          LEARNING: ["The posts that went out the week of reminded people."],
          KNOWS: ["The day-of post brought in the ones who'd forgotten, so post in the morning and again at five."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["I totally forgot this was tonight.", "Oh, that was tonight?"],
          LEARNING: ["I saw the flyer weeks ago and then forgot, and nothing reminded me.", "I didn't see any posts the week of, so I just forgot."],
          KNOWS: ["I'd seen the flyer a month ago and forgot. A post the morning of would've got me there.", "People like me make plans and then forget them. If you post the week of and the day of, every time, we'll show up."]
        },
        UP: {
          NEW: ["I saw you posting about it all week.", "The reminder got me out of the house."],
          LEARNING: ["The posts the week of reminded me, because I'd completely forgotten.", "I saw the day-of post on my lunch break and made it."],
          KNOWS: ["The day-of post is what got me. I'd seen the flyer a month ago and forgot, so post the morning of and again around five.", "That last-week push is worth doing. Half my friends came because of the day-of post."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["A few people told me later that they meant to come and forgot."],
          LEARNING: ["People knew about it, but nobody got reminded, so the walk-up was dead."],
          KNOWS: ["Almost nobody walked up after doors, which is what happens when there's no day-of post."]
        },
        UP: {
          NEW: ["A lot of people walked up late."],
          LEARNING: ["People kept saying they saw the post today."],
          KNOWS: ["{count:words:cap} people said they saw the day-of post, and that was most of the walk-up."]
        }
      },
      POSTS: {
        DOWN: {
          NEW: ["dang, that was tonight?"],
          LEARNING: ["totally forgot about this, nobody posted about it this week"],
          KNOWS: ["please remind us the day of. i plan things and then i forget them"]
        },
        UP: {
          NEW: ["it's tonight, everybody go"],
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
          LEARNING: ["Nobody handed out flyers at the other shows, and that's where your crowd already is."],
          KNOWS: ["Hand flyers out at the shows the week before, because those are the people who already go out."]
        },
        UP: {
          NEW: ["People said they got a flyer at another show."],
          LEARNING: ["Handing out flyers at the last show worked."],
          KNOWS: ["{count:words:cap} people came off flyers handed out at another show, which was about the best hour you spent on this one."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["I didn't see many people from the other shows.", "A lot of the regulars from other bookers' shows weren't here."],
          LEARNING: ["The people who go to every show didn't know about this one, because nobody handed out flyers.", "The crowd from {otherShow|the other shows} never even heard about this one."],
          KNOWS: ["Stand outside the show the week before with a stack of flyers. That's {count:words|a dozen} people I didn't get tonight.", "Hand flyers out at a bigger show when it lets out. People coming out of a good night are ready to plan the next one."]
        },
        UP: {
          NEW: ["People said they got a flyer at another show.", "Somebody handed me back a flyer you gave them last week."],
          LEARNING: ["People came with the flyer from the last show still in their pocket.", "Handing out flyers at the other show brought in some faces I didn't know."],
          KNOWS: ["{count:words:cap} people said they got the flyer leaving another show. I'd do that every time if I were you.", "The flyers you handed out after that show last week brought people who've never been to one of yours."]
        }
      },
      BOOKER: {
        DOWN: {
          NEW: ["I didn't see you at my show this month."],
          LEARNING: ["You could've handed flyers out at mine, you know. I don't mind."],
          KNOWS: ["Come stand outside mine with flyers. It's the same people on a different night, and I'll do the same at yours."]
        },
        UP: {
          NEW: ["I saw you outside my show with flyers."],
          LEARNING: ["Your flyers at my show worked, because a few of my people went to yours."],
          KNOWS: ["You flyered my exit and I flyered yours, and both nights did better. Let's keep doing that."]
        }
      },
      KID: {
        DOWN: {
          NEW: ["i didn't know about this one"],
          LEARNING: ["usually somebody hands us a flyer at the last show but nobody did this time"],
          KNOWS: ["hand us flyers when we leave a show, we keep them. that's how we know what's next"]
        },
        UP: {
          NEW: ["i got a flyer at the last show"],
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
          KNOWS: ["At {price:money} the kids and the broke ones stayed home, so for this crowd it needs to be lower."]
        },
        UP: {
          NEW: ["Nobody complained about the price."],
          LEARNING: ["{price:money} was right, and nobody thought twice about it."],
          KNOWS: ["{price:money} is the right price for this crowd, so everybody who wanted to come could."]
        }
      },
      KID: {
        DOWN: {
          NEW: ["it was kinda expensive", "i couldn't afford it this time"],
          LEARNING: ["{price:money} is a lot for us, my friends didn't come", "$5 is the most i can do and my friends are the same"],
          KNOWS: ["at $5 my whole friend group comes and at {price:money} it's two of us", "{price:money} means we pick one show a month. at $5 we come to all of them"]
        },
        UP: {
          NEW: ["it was cheap enough that i didn't have to ask my mom", "it was so cheap"],
          LEARNING: ["{price:money} is perfect, everybody could come", "cheap enough that i brought my little brother"],
          KNOWS: ["at {price:money} my whole friend group comes. if it stays there we'll keep coming", "{price:money} is the right price for us. more than that and you lose half the kids"]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["A couple of people turned around when I told them the price."],
          LEARNING: ["People looked at the price and left, more of them than I usually see."],
          KNOWS: ["{count:words:cap} people walked up, heard {price:money} and walked away. Two dollars less and they'd have been inside."]
        },
        UP: {
          NEW: ["Nobody even blinked at the price."],
          LEARNING: ["The price was right. People paid, and some of them put extra in for the touring band."],
          KNOWS: ["{price:money} and nobody turned around, and a few people even told me to keep the change for the bands."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["That was a bit steep for a local bill."],
          LEARNING: ["{price:money} for this bill? I almost didn't come, honestly."],
          KNOWS: ["I'll pay {price:money} for a touring band I know. For three locals I'll do about half that, or I stay home."]
        },
        UP: {
          NEW: ["That was a good price."],
          LEARNING: ["It was cheap enough that I brought somebody."],
          KNOWS: ["At {price:money} I bring a friend every time, so I hope it stays there."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["It felt like a high door price for this town."],
          LEARNING: ["People here seemed kind of thrown by the price."],
          KNOWS: ["Most towns this size do $7. At {price:money} you lose more people than the extra money makes up for."]
        },
        UP: {
          NEW: ["That was a good door price for here."],
          LEARNING: ["The price was right for the room, so everybody came in."],
          KNOWS: ["{price:money} was right. The door was cheap, the room was full and people still had money left for merch."]
        }
      }
    },

    /* ---------------- DOOR_COUNT: guest list, the count, cash handling ---------------- */
    DOOR_COUNT: {
      ANY: {
        DOWN: {
          NEW: ["There were a lot of people on the list tonight."],
          LEARNING: ["There were {list:words} on the list on a {n}-person night, and that's too much of the door to give away."],
          KNOWS: ["Keep the list to one per band member. {list:words:cap} people in free at {price:money} each is money you didn't have at the settle."]
        },
        UP: {
          NEW: ["The count was clean."],
          LEARNING: ["The list was short and the count was clean, so the money added up."],
          KNOWS: ["Only {list:words} on the list, and the tally matched the cash box, so the settle took five minutes."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["There were a lot of people on the list tonight.", "The list kept getting longer all night."],
          LEARNING: ["I had {list:words} on the list on a {n}-person night. That's a big piece of my door walking in for free.", "The bands kept walking up and adding friends to the list after doors."],
          KNOWS: ["One per band member on the list is plenty. {list:words:cap} people free on a {price:money} night is real money I didn't have in the box.", "{list:words:cap} comps and {n} through the door. Write the list down before doors, and after that nobody gets added, I don't care whose cousin they are."]
        },
        UP: {
          NEW: ["Count's clean.", "Easy count tonight."],
          LEARNING: ["The list was short and everybody else paid.", "I kept a tally all night and the cash box matched it."],
          KNOWS: ["{list:words:cap} on the list and a mark for every head that came in, and the cash matched to the dollar.", "I had one list, written before doors, and nobody got added after. That's why the count was easy."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["Hey, the count seemed a little loose to us."],
          LEARNING: ["It kind of seemed like a lot of people got in free tonight."],
          KNOWS: ["We counted the room from the stage and it didn't match what the door said. If you keep a tally we can look at, the settle goes a lot quicker."]
        },
        UP: {
          NEW: ["Thanks for showing us the count, we appreciate that."],
          LEARNING: ["You had the count written down and it all made sense. We don't get that everywhere."],
          KNOWS: ["You paid us off a written count with the list right there on the paper. We come back to bookers who do that."]
        }
      }
    },

    /* ---------------- SOUND: quality of sound and the sound person ---------------- */
    SOUND: {
      ANY: {
        DOWN: {
          NEW: ["It sounded rough tonight."],
          LEARNING: ["The sound was the problem tonight, and people noticed."],
          KNOWS: ["Tonight's sound cost the night more than anything else did. Get a sound person who knows the room."]
        },
        UP: {
          NEW: ["It sounded good."],
          LEARNING: ["The sound was good tonight and every band came across."],
          KNOWS: ["{sound|Whoever ran sound} knew the room, so get them every time you can."]
        }
      },
      SOUND: {
        DOWN: {
          NEW: ["It sounded rough tonight, sorry about that.", "I couldn't get it right tonight no matter what I did."],
          LEARNING: ["That room eats low end. The bass was mud.", "There wasn't enough gear for a room that size, and the vocals never came through all night."],
          KNOWS: ["It's all hard walls in there. Next time put the bass cab up on a chair and tell the bands to turn down by a third, and I can do something with it.", "I needed a second monitor and a vocal mic that actually works. Advance me the gear list ahead of time and I can fix most of this."]
        },
        UP: {
          NEW: ["It sounded good tonight, if I do say so myself.", "It all came out right tonight, for once."],
          LEARNING: ["The bands actually turned down when I asked them to, so everything sat right.", "The room was kind to us tonight. I barely had to touch the board."],
          KNOWS: ["Every band kept their amps at half on stage and I did the rest through the PA. Put that in the advance every time and it'll sound like this.", "I know that room now. Give me the same setup next time and it'll sound like this again."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["The sound was a little rough for us tonight."],
          LEARNING: ["We couldn't hear ourselves on stage at all, and it threw us off the whole set."],
          KNOWS: ["There were no monitors and your sound person didn't know the room. When bands trade notes about towns, that's the kind of thing that comes up."]
        },
        UP: {
          NEW: ["The sound was great tonight."],
          LEARNING: ["We could hear everything on stage, which is rarer than you'd think."],
          KNOWS: ["That was the best sound we've had on this whole tour. Whoever that was, get them for every touring band you have."]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["Sounded like somebody was kicking a garbage can around in there."],
          LEARNING: ["Whoever ran sound tonight had never mixed that room before, you could tell."],
          KNOWS: ["That room needs somebody who's mixed it before. Back when the same guy ran it every week it sounded like a different place, so find somebody who knows it."]
        },
        UP: {
          NEW: ["Sounded good."],
          LEARNING: ["Sounded like a real show for once. Whoever ran sound knew that room."],
          KNOWS: ["{sound|Your sound person} has been running that room for years. Get them whenever you can, they know where it rings."]
        }
      }
    },

    /* ---------------- COMPETITION: another show the same night ---------------- */
    COMPETITION: {
      ANY: {
        DOWN: {
          NEW: [{ t: "A lot of the usual faces weren't here.", not: 'savingIt' },
                   { t: "A lot of the usual faces weren't here, and it seems like they were saving it for something.", if: 'savingIt' }],
          LEARNING: [{ t: "There was another show tonight at {otherShow|another room}, and it split the crowd.", not: 'savingIt' },
                   { t: "People were saving it for the bigger show {aheadNight|later this week} at {aheadShow|another room}, since most of them can only go out one night.", if: 'savingIt' }],
          KNOWS: [{ t: "Two shows on the same night split the same crowd. Check what the other bookers have on their calendars before you hold a room.", not: 'savingIt' },
                   { t: "A bigger show for the same crowd a night or two later eats yours. Check what's coming that whole week before you pick a night.", if: 'savingIt' }]
        },
        UP: {
          NEW: ["Everybody was here tonight."],
          LEARNING: ["There was nothing else going on tonight, so you had the whole town."],
          KNOWS: ["There was no other show tonight, so you got everybody. Find the nights nobody else has and hold them early."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: [{ t: "Half my friends were at the other show.", not: 'savingIt' }, { t: "Where was everybody?", not: 'savingIt' },
                   { t: "I think everybody's saving it for {aheadNight|the weekend}.", if: 'savingIt' }, { t: "I can't do two nights out in a row, and I already picked the other one.", if: 'savingIt' }],
          LEARNING: [{ t: "The thing at {otherShow|the other room} took everybody under twenty-five. I barely knew anybody here.", not: 'savingIt' }, { t: "There were two shows tonight and I had to pick one. I almost went to the other.", not: 'savingIt' },
                   { t: "Half my friends skipped tonight so they'd have money for {aheadShow|the big one}.", if: 'savingIt' }, { t: "I almost stayed home, honestly. I'm going to {aheadShow|the other one} {aheadNight|later} and I'm broke.", if: 'savingIt' }],
          KNOWS: [{ t: "Two shows on the same night split the same crowd. Check what the other bookers have on their calendars before you hold a room.", not: 'savingIt' }, { t: "Everybody I know went to {otherShow|the other show}. You should talk to whoever booked that before you pick a night.", not: 'savingIt' },
                   { t: "Nobody I know goes out the night before a big show, we're all saving for it. Put yours after it, or a week away.", if: 'savingIt' }, { t: "When there's a bigger show {aheadNight|that week}, all my friends save their ten bucks for that one. I'd move yours off it.", if: 'savingIt' }]
        },
        UP: {
          NEW: ["Everybody was here tonight, it was great.", "There was nothing else to do tonight but this."],
          LEARNING: ["Nobody else had a show tonight, so the whole scene came out.", "It was the only show in town tonight, and it felt like it."],
          KNOWS: ["Being the only show in town is the best night you can have. Whatever you did to get it, do it again.", "When yours is the only show, everybody I know comes. Grab those nights early."]
        }
      },
      BOOKER: {
        DOWN: {
          NEW: [{ t: "We both had shows tonight, which wasn't great for either of us.", not: 'savingIt' },
                   { t: "There's a bigger show {aheadNight|this week}, and that cost you some people tonight.", if: 'savingIt' }],
          LEARNING: [{ t: "You and me both had shows tonight. I lost people to yours and you lost some to mine.", not: 'savingIt' },
                   { t: "People were saving up for {aheadShow|the bigger show}. It's the same crowd and a bigger bill a couple nights later, so they picked that one.", if: 'savingIt' }],
          KNOWS: [{ t: "Next time let's talk first. Stagger the times, or one of us takes another night, and we both do better.", not: 'savingIt' },
                   { t: "Ask around about what's coming up before you pick a night. If there's a bigger bill for your crowd right after yours, yours loses every time.", if: 'savingIt' }]
        },
        UP: {
          NEW: ["I kept my night clear for yours."],
          LEARNING: ["I moved mine off your night, and it looks like it helped."],
          KNOWS: ["We didn't step on each other this time and both nights did fine. Let's keep talking before either of us holds anything."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: [{ t: "It was slow for a night like this.", not: 'savingIt' },
                   { t: "Slow door. A couple people said they were saving their money for something else.", if: 'savingIt' }],
          LEARNING: [{ t: "A few people said they were going to {otherShow|the other show} after.", not: 'savingIt' },
                   { t: "Three different people said they're going to {aheadShow|the other show} {aheadNight|later this week} instead.", if: 'savingIt' }],
          KNOWS: [{ t: "I asked at the door. {count:words:cap} people said they almost went to {otherShow|the other show} instead, so you know plenty more did.", not: 'savingIt' },
                   { t: "Most of the ones who skipped are going to {aheadShow|the bigger show} {aheadNight|in a couple nights}. Nobody can afford both.", if: 'savingIt' }]
        },
        UP: {
          NEW: ["Busy door tonight."],
          LEARNING: ["Everybody said there was nothing else on tonight."],
          KNOWS: ["There was nothing else on in town and the door shows it. I'd check the other calendars every time just to get a night like this."]
        }
      }
    },

    /* ---------------- TOWN_EVENT: something on the town's calendar, the weather of the season ---------------- */
    TOWN_EVENT: {
      ANY: {
        DOWN: {
          NEW: ["Something else was going on in town tonight."],
          LEARNING: ["It was {event|a big weekend in town}, so people were either busy or stuck in traffic."],
          KNOWS: ["Don't book against {event|the town's big weekends}. Look at the town calendar before you hold the room."]
        },
        UP: {
          NEW: ["The whole town was out tonight."],
          LEARNING: ["{event:cap|Whatever was on in town} put people in a going-out mood."],
          KNOWS: ["The night of {event|that kind of thing}, people come looking for somewhere to go after, so book for it on purpose."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["Was everybody at {event|the thing downtown}?", "I couldn't park anywhere near here."],
          LEARNING: ["It was {event|a big weekend} and downtown was impossible. I drove around for twenty minutes.", "Everybody I know was at {event|the other thing} tonight."],
          KNOWS: ["I wouldn't ever book {event|a weekend like that} downtown. Nobody can park, and everybody's already out somewhere else.", "{event:cap|That weekend} eats every show, every year. Check the town calendar before you hold anything."]
        },
        UP: {
          NEW: ["There were a lot of people out tonight.", "Downtown was packed tonight."],
          LEARNING: ["People came over after {event|the thing downtown}.", "Everybody was already out for the night, so they just came here."],
          KNOWS: ["After {event|something like that}, people want somewhere to go. I'd book that night every year if I were you.", "Start late on the night of {event|a town thing} and you get everybody coming from it."]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["It was dead out there tonight."],
          LEARNING: ["{event:cap|The town thing} had the streets blocked off, and nobody could get to my door."],
          KNOWS: ["Every year {event|that weekend} kills my bar. I'm not putting a show on it again, and you shouldn't either."]
        },
        UP: {
          NEW: ["Busy night all over town."],
          LEARNING: ["People came straight here from {event|the thing downtown}, and the bar did well."],
          KNOWS: ["{event:cap|That night} brings people in looking for a bar with something going on. Put me down for it again next year."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["People said traffic was bad."],
          LEARNING: ["A lot of people said they were at {event|something else} first and didn't make it over."],
          KNOWS: ["Half the people I talked to got stuck at {event|the thing downtown}. The bill was fine, it was the night you picked."]
        },
        UP: {
          NEW: ["A lot of people came in from somewhere else."],
          LEARNING: ["People kept coming in from {event|the other thing}."],
          KNOWS: ["{count:words:cap} people told me they came over from {event|the other thing}, so that was a good night to have a show."]
        }
      }
    },

    /* ---------------- TREND: booked toward or against what's rising ---------------- */
    TREND: {
      ANY: {
        DOWN: {
          NEW: ["This kind of thing isn't drawing like it did."],
          LEARNING: ["{genreA:cap} is cooling off here, and people have moved on to other stuff."],
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
          NEW: ["nobody at school listens to this anymore", "it sounded kind of old to me"],
          LEARNING: ["everybody i know is into different stuff now", "this was big two years ago when my brother was going to shows"],
          KNOWS: ["nobody at my school is starting {genreA} bands anymore. everyone's into {trendWords|the new stuff}, you should book that", "my friends would've come for {trendWords|the new stuff}. this kind of show is more for the older kids now"]
        },
        UP: {
          NEW: ["everybody's talking about the second band", "this is what everybody at school is listening to right now"],
          LEARNING: ["everybody at my school is into {trendWords} now, it's all anybody plays in the car", "there's three bands at my school that sound like this now"],
          KNOWS: ["{trendWords} is the thing right now. three new bands at my school play it, and you should book them before somebody else does", "if it's {trendWords} we'll all come, me and every one of my friends"]
        }
      },
      POSTS: {
        DOWN: {
          NEW: ["is anybody still going to this kind of show"],
          LEARNING: ["{genreA} night in this town in this year, bold move"],
          KNOWS: ["nobody's going to {genreA} shows anymore, it's all {trendWords|the new stuff} now"]
        },
        UP: {
          NEW: ["this is the sound now, sorry"],
          LEARNING: ["{trendWords} is everywhere right now and i'm not mad"],
          KNOWS: ["every good new band in town is doing {trendWords} right now and somebody should put all of them on one night"]
        }
      },
      BOOKER: {
        DOWN: {
          NEW: ["It's a rough time for that kind of bill right now."],
          LEARNING: ["{genreA:cap} isn't pulling here like it used to, and mine aren't either."],
          KNOWS: ["{genreA:cap} drew half what it did last year at my shows too. I've started booking {trendWords|the new stuff} instead."]
        },
        UP: {
          NEW: ["Good timing on that bill, honestly."],
          LEARNING: ["You got onto {trendWords} early. I'm seeing it at my shows too."],
          KNOWS: ["{trendWords:cap} is drawing at everybody's shows right now, and you got in before I did."]
        }
      }
    },

    /* ---------------- DRAW_AWAY: the touring band's draw here against at home ---------------- */
    DRAW_AWAY: {
      ANY: {
        DOWN: {
          NEW: ["Fewer people came for the touring band than they'd said."],
          LEARNING: ["{touring:cap} draws a lot more at home than they do here, which is normal for a band nobody here has seen yet."],
          KNOWS: ["On a first visit a touring band draws a fraction of their home number. Whatever they tell you they do at home, plan for a lot less."]
        },
        UP: {
          NEW: ["More people came for the touring band than anybody guessed."],
          LEARNING: ["{touring:cap} has more people here than they knew."],
          KNOWS: ["{touring:cap} draws here. Book them again and bring them back on a better night."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["That was smaller than we're used to.", "It was a quieter crowd than we get back home."],
          LEARNING: ["We're a lot bigger at home, it turns out.", "Back home we fill a room, but nobody here knows us yet."],
          KNOWS: ["Honest answer, we do a lot at home and about twenty everywhere else. Next time just book us on a door deal.", "The first time through a town we draw maybe a fifth of what we do at home. Plan for that, whatever we put in the email."]
        },
        UP: {
          NEW: ["That was more people than we expected.", "We didn't know we had people here."],
          LEARNING: ["Almost as many people knew us here as back home, which was a surprise.", "Turns out we've got real people here. We had no idea."],
          KNOWS: ["This was one of our best nights on the tour. Bring us back and we'll do more.", "We drew here like we do at home, so next time put us on a weekend."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["Not many people came for the touring band."],
          LEARNING: ["Hardly anybody said they came for {touring}."],
          KNOWS: ["I asked everybody who came in. Maybe {count:words|a handful} were there for {touring}, so whatever they draw at home didn't travel."]
        },
        UP: {
          NEW: ["A lot of people came for the touring band."],
          LEARNING: ["People kept naming {touring} at the door, more than I'd have guessed."],
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
          NEW: ["The locals didn't bring many people.", "Not a lot of the bands' friends came tonight."],
          LEARNING: ["{local:cap} brought maybe a few people. I thought they'd have more than that.", "Barely anybody said they came for a local band."],
          KNOWS: ["{local:cap} brought {count:words|a few}. That's their number right now, so don't book them to carry a night.", "I asked who people came for. The locals got {count:words|a handful} between them."]
        },
        UP: {
          NEW: ["The locals brought some people.", "A lot of the bands' friends came tonight."],
          LEARNING: ["{local:cap} brought about {count:words|fifteen}, and the others brought a few each.", "Most of the room was there for {local}."],
          KNOWS: ["{local:cap} is your draw right now. They bring {count:words|fifteen} every time, so put them where the room should be full.", "{count:words:cap} people named {local}. That's a band that can carry a weeknight."]
        }
      },
      LOCAL_BAND: {
        DOWN: {
          NEW: ["Our people didn't really come out tonight."],
          LEARNING: ["Most of our friends couldn't make it this time."],
          KNOWS: ["We've played three times this month, so our friends skipped this one. Maybe give us some more time between shows."]
        },
        UP: {
          NEW: ["All our friends showed up tonight."],
          LEARNING: ["We brought a good crowd tonight."],
          KNOWS: ["We hadn't played in about six weeks, so everybody came out for it."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["There weren't many of the bands' friends here tonight."],
          LEARNING: ["Usually the locals bring a crowd, but not tonight."],
          KNOWS: ["{local:cap} didn't bring anybody tonight. Their friends are tired of coming out for them."]
        },
        UP: {
          NEW: ["The local bands' people were all here."],
          LEARNING: ["{local:cap}'s friends all came out tonight."],
          KNOWS: ["When {local} plays, their whole crowd comes, every time. I'd put them on your big nights."]
        }
      }
    },

    /* ---------------- OVERUSE: a local band has played too often lately ---------------- */
    OVERUSE: {
      ANY: {
        DOWN: {
          NEW: ["People have seen {band} a lot lately."],
          LEARNING: ["{band:cap} has played too much lately, and people are starting to skip them."],
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
          NEW: ["{band:cap} again, huh.", "Wasn't I just at a {band} show?"],
          LEARNING: ["That's the third time this month I've seen {band}.", "Everybody I know has seen {band} plenty lately."],
          KNOWS: ["I love them, but every two weeks is too much. Once a month and people would come out for them.", "{band:cap} being on every bill is why their friends stopped coming. Give them a month off."]
        },
        UP: {
          NEW: ["I finally got to see {band} again.", "It felt like forever since {band} played."],
          LEARNING: ["{band:cap} hadn't played in a while, so it felt kind of special.", "People had missed {band}, you could tell."],
          KNOWS: ["You gave {band} a month off and their show felt like a big deal.", "Once a month for {band} is perfect, everybody shows up for it."]
        }
      },
      LOCAL_BAND: {
        DOWN: {
          NEW: ["We're kind of played out right now."],
          LEARNING: ["We've played a lot lately. Is it cool if we sit out next month?"],
          KNOWS: ["Our people stopped coming because we're on every bill. Give us six weeks and we'll bring them back."]
        },
        UP: {
          NEW: ["It felt good to play again."],
          LEARNING: ["After a break it felt like a real show again."],
          KNOWS: ["The month off was good for us, and everybody came back for it."]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["I've seen this band plenty."],
          LEARNING: ["{band:cap} is on every bill lately. People get tired of anybody."],
          KNOWS: ["Every band I ever saw play every week ended up playing to their roommates. Rest {band} for a month."]
        },
        UP: {
          NEW: ["Good to see {band} again."],
          LEARNING: ["{band:cap} took some time off, and it shows."],
          KNOWS: ["You rested {band} and it worked. The bands that drew best around here were always the ones you couldn't see every week."]
        }
      }
    },

    /* ---------------- REPEAT: same bill, same room, too soon ---------------- */
    REPEAT: {
      ANY: {
        DOWN: {
          NEW: ["Felt like a show people had already seen."],
          LEARNING: ["It was the same bill in the same room not long ago, so people skipped it."],
          KNOWS: ["Same bill in the same room inside six weeks reads as a rerun. Wait two months or change the room."]
        },
        UP: {
          NEW: ["It felt new."],
          LEARNING: ["Nobody'd seen this bill before, so people came to see it."],
          KNOWS: ["It was a new bill in a room they hadn't seen it in, and people come out for things they haven't seen yet."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["Didn't I just see this?", "It felt like a rerun."],
          LEARNING: ["It was the same bands in the same room as last month, so a lot of people skipped it.", "I almost didn't come, I just saw this exact show."],
          KNOWS: ["If it's the same bill in the same room inside six weeks, people figure they already saw it. Change the room or wait a couple months.", "I saw this lineup here a month ago. Mix it up and I'll bring people."]
        },
        UP: {
          NEW: ["That was something different tonight.", "Haven't seen this combination before."],
          LEARNING: ["It was a new bill and it felt like a show I hadn't seen.", "I'd never seen these bands together, that's why I came."],
          KNOWS: ["A new bill in a room I haven't seen them in is what gets me out of the house.", "You change up the bands and the room every time, and that's why people keep coming."]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["Didn't I just see this show?"],
          LEARNING: ["Same three bands as last month, in the same room. People skipped it, and I don't blame them."],
          KNOWS: ["Same bill in the same room inside six weeks, and people figure they saw it. Wait two months or change the room."]
        },
        UP: {
          NEW: ["Haven't seen this one before."],
          LEARNING: ["That's a new combination. I haven't seen these bands together before."],
          KNOWS: ["You don't repeat yourself, and in this town that's rarer than it should be. Most bookers here run the same four bands around for a year."]
        }
      }
    },

    /* ---------------- REGULARS: your regulars came because it's yours ---------------- */
    REGULARS: {
      ANY: {
        DOWN: {
          NEW: ["Fewer of the usual faces tonight."],
          LEARNING: ["Your regulars didn't come out for this one."],
          KNOWS: ["Only {count:words|a few} of your regulars came. They come for nights that feel like yours, and this one didn't."]
        },
        UP: {
          NEW: ["A lot of the same faces."],
          LEARNING: ["Your regulars came because it was yours."],
          KNOWS: ["{count:words:cap} regulars came. You can count on that on any night, for anything."]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["I didn't see a lot of the usual faces.", "We were missing some regulars tonight."],
          LEARNING: ["Only a few of the people who come to all of mine came tonight.", "The ones who come to everything mostly didn't come to this one."],
          KNOWS: ["{count:words:cap} regulars tonight. It's usually more, so something about this one didn't feel like one of yours to them.", "I know my regulars by face. Tonight I counted {count:words|a few}."]
        },
        UP: {
          NEW: ["A lot of the same faces.", "I saw all the usuals."],
          LEARNING: ["{count:words:cap} people came that come to all of mine.", "The regulars showed, like always."],
          KNOWS: ["That's my {count:words}. I can count on {count:words} now, any night, for anything you put on.", "I made a mark for every regular and got {count:words}. That's what I can count on even on a bad night."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["It didn't really feel like one of yours."],
          LEARNING: ["I almost skipped it, it didn't seem like your kind of night."],
          KNOWS: ["We come because it's yours. This one didn't feel like yours, so a lot of us stayed home."]
        },
        UP: {
          NEW: ["Wouldn't miss one of yours."],
          LEARNING: ["I came because it was yours. I didn't know any of the bands."],
          KNOWS: ["Honestly I'd come to anything you put on, and most of us would. Just don't spend that on bad ones."]
        }
      },
      OLD_HEAD: {
        DOWN: {
          NEW: ["Pretty thin on the regulars tonight."],
          LEARNING: ["Usually I know half the room at one of yours, but not tonight."],
          KNOWS: ["I've watched bookers in this town lose their regulars, and it never took more than two or three bad ones in a row. Watch that."]
        },
        UP: {
          NEW: ["Same crowd as always, which is good."],
          LEARNING: ["Your people came. You've got your own people now."],
          KNOWS: ["You've built a crowd that comes without checking who's playing. It's been years since I saw a booker in this town do that."]
        }
      }
    },

    /* ---------------- HOSPITALITY: food, a place to sleep, water, a shower ---------------- */
    HOSPITALITY: {
      ANY: {
        DOWN: {
          NEW: ["The touring band looked worn out."],
          LEARNING: ["The touring band wasn't taken care of. There was no real food and no good place to sleep."],
          KNOWS: ["Feed them and find them a floor before the night. Bands tell every other band how a town treated them."]
        },
        UP: {
          NEW: ["The touring band seemed happy."],
          LEARNING: ["The touring band was fed and had a place to sleep, and they noticed."],
          KNOWS: ["Hot food and a floor, set up ahead of time, is what gets your town recommended down the route."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["Pizza was cold, but thanks.", "It was a bit of a scramble finding a place to sleep."],
          LEARNING: ["We were told there'd be dinner, and it was cold pizza at eleven.", "Nobody'd sorted where we were sleeping until after the show."],
          KNOWS: ["Please don't promise a meal you can't make. We'd rather hear there's no food and stop somewhere than wait on dinner and get cold pizza.", "Find us a floor before we get to town, please. We slept in the van last night because nobody had."]
        },
        UP: {
          NEW: ["Thank you for the food.", "Thanks for putting us up."],
          LEARNING: ["Hot food and a floor, and you'd be amazed how rare both of those are.", "We got dinner, a shower and a floor, which makes this a good stop for us."],
          KNOWS: ["You fed us, you housed us, you paid before load-out. We'll tell every band on this route.", "We had real food before the set and the floor was sorted in the advance. We'll be telling people about that."]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["The touring band was hanging around after close asking people where they could sleep."],
          LEARNING: ["The band had nowhere to go after, and they were still sitting in my lot at two in the morning."],
          KNOWS: ["Sort out where the band sleeps before the show. I'm not running a campground out there."]
        },
        UP: {
          NEW: ["The band was in a good mood all night."],
          LEARNING: ["The band was fed before they played. They were easy to deal with all night."],
          KNOWS: ["Bands that have eaten are easy to deal with. They loaded out quick and thanked my bartender on the way out."]
        }
      },
      HELPER: {
        DOWN: {
          NEW: ["The band seemed kind of tired."],
          LEARNING: ["The place they stayed wasn't great. I heard about it in the morning."],
          KNOWS: ["Get the floor locked in a week out. When you're asking around the night of, you get a bad floor or no floor."]
        },
        UP: {
          NEW: ["The band was really nice."],
          LEARNING: ["They slept well and ate well. They said so twice."],
          KNOWS: ["The floor was sorted ahead and I made them breakfast in the morning, and that's really all it takes."]
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
          LEARNING: ["The settle was fair and quick, and the bands noticed."],
          KNOWS: ["Paying in cash before load-out, with the count written down, is how you get bands to come back."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["The money was a little less than we thought.", "The settle took a while."],
          LEARNING: ["We got less than we were told, and nobody showed us how it came out that way.", "We waited an hour after load-out to get paid."],
          KNOWS: ["Show us the count and pay us before load-out. If it's short and you show us why, that's fine, it happens.", "We got less than the deal said and nobody walked us through it, and other bands are going to ask us how this town was."]
        },
        UP: {
          NEW: ["Thanks for taking care of us.", "That was an easy settle, thank you."],
          LEARNING: ["You paid us in cash before load-out, with the count written down. Thank you.", "We got what we were promised, and fast."],
          KNOWS: ["You paid us before load-out with the math on a piece of paper. Bookers who do that are the ones bands tell each other about.", "You paid us what you said, when you said, and showed your work. We'll be back."]
        }
      },
      LOCAL_BAND: {
        DOWN: {
          NEW: ["We didn't really get much for that one."],
          LEARNING: ["We weren't sure what we were getting till the end, and it wasn't much."],
          KNOWS: ["Tell us what we're getting when you ask us, even if it's just gas money. Finding out at the end of the night kind of sucks."]
        },
        UP: {
          NEW: ["We got paid, which we didn't expect."],
          LEARNING: ["We got twenty each, which is honestly more than we expected."],
          KNOWS: ["You told us what we'd get and that's what we got. That's why we say yes to you."]
        }
      }
    },

    /* ---------------- ADVANCE: bands and staff were told the details, or weren't ---------------- */
    ADVANCE: {
      ANY: {
        DOWN: {
          NEW: ["People weren't sure where to be or when."],
          LEARNING: ["Nobody got the details ahead of time, so load-in was a mess."],
          KNOWS: ["Send every band and the room the address, load-in, set times and gear two weeks out, and again the day before."]
        },
        UP: {
          NEW: ["Everybody knew where to be."],
          LEARNING: ["Everybody had the details ahead of time, and it ran smooth."],
          KNOWS: ["Advance two weeks out and the day before. That's why load-in took fifteen minutes."]
        }
      },
      TOURING: {
        DOWN: {
          NEW: ["We weren't sure where to go.", "It took us a while to find the place."],
          LEARNING: ["We didn't get an address till six and nobody told us when load-in was.", "Nobody told us there'd be no bass amp."],
          KNOWS: ["Send the advance two weeks out and again the day before. We were in a parking lot two towns back not knowing anything.", "Tell us what gear's there and when to load in. We guessed wrong on both."]
        },
        UP: {
          NEW: ["Easy to find, easy load-in.", "Everything was where you said."],
          LEARNING: ["We got the advance early, so we knew exactly what to bring.", "Address, load-in, set times, all in one message. Thank you."],
          KNOWS: ["The advance came two weeks out and again yesterday. That was the easiest load-in we've had on this tour.", "We knew the backline, the times and where we were sleeping before we even left the last town. Not many places do that."]
        }
      },
      SOUND: {
        DOWN: {
          NEW: ["Nobody told me there were this many bands."],
          LEARNING: ["The touring band thought there'd be a bass amp here, and there wasn't, because nobody advanced it."],
          KNOWS: ["Advance the gear two weeks out and this doesn't happen. I'm not hauling a cab I wasn't told about."]
        },
        UP: {
          NEW: ["For once I knew what was coming tonight."],
          LEARNING: ["I got the gear list ahead of time, so changeovers were easy."],
          KNOWS: ["I had the gear list and times two weeks out, so I brought exactly what we needed and nothing sat in the van all night."]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["Didn't know you had this many bands coming."],
          LEARNING: ["Nobody told me about load-in, and the lot was full when the vans got here."],
          KNOWS: ["Call me two weeks out with the bill and the times. That's all I need, and I need it."]
        },
        UP: {
          NEW: ["I knew what to expect tonight, which I appreciate."],
          LEARNING: ["You told me the bill and the times ahead, and that made my night easy."],
          KNOWS: ["Two weeks' notice on the bill and times, then a call the day before. Keep doing that and you can have the room whenever."]
        }
      }
    },

    /* ---------------- VENUE_REP: the room's reputation ---------------- */
    VENUE_REP: {
      ANY: {
        DOWN: {
          NEW: ["Some people won't go to {roomShort}."],
          LEARNING: ["{room:cap} has a reputation, and some people stayed home over it."],
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
          NEW: ["A lot of people won't go to that place.", "Not my favorite room."],
          LEARNING: ["That place has a reputation, and a lot of folks stayed home over it.", "People my age still remember what happened there."],
          KNOWS: ["Nobody over thirty goes to {roomShort} since the trouble a couple of summers ago. You'll pay for that room every time.", "{room:cap} has a name it hasn't lived down yet. A run of good nights there will help, but slowly."]
        },
        UP: {
          NEW: ["Good room.", "I've always liked this place."],
          LEARNING: ["{roomShort:cap} is getting a name as a place shows happen.", "People trust this room now. They come without asking who's playing."],
          KNOWS: ["{room:cap} is a real room now. I've seen maybe four of those in this town in thirty years, so hang on to it.", "People come to {roomShort} on the room's name alone. That's worth more to you than any one band."]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["Not my favorite place."],
          LEARNING: ["A few of my friends won't go to {roomShort}."],
          KNOWS: ["Half the people I know won't come to {roomShort}. Book your good ones somewhere else."]
        },
        UP: {
          NEW: ["I love this place."],
          LEARNING: ["{roomShort:cap} feels like ours now."],
          KNOWS: ["I'll come to anything at {roomShort}, and so will most of the people I know."]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["People still talk about this place the wrong way."],
          LEARNING: ["I know people have ideas about my room."],
          KNOWS: ["One bad night here two years ago and people still bring it up. Help me string some clean ones together."]
        },
        UP: {
          NEW: ["Good night. Nobody fought."],
          LEARNING: ["People are starting to think of this as a place shows happen."],
          KNOWS: ["Three good ones in a row, and now people come here without even checking who's playing."]
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
          LEARNING: ["[?guardAtHouse: There was a guard at a house show, so people went quiet and a few left early. | ?noGuard: There was nobody big by the door on a night that needed somebody. | ?askAPunk: There were too many people for the room, even with the address kept quiet. | ?addressOut: The address was out, and people nobody knew showed up. | There were too many people, and nobody was watching the door to the back.]"],
          KNOWS: ["[?guardAtHouse: Security at a house makes it feel like a bar with a curfew. Save them for the rooms that ask for it. | ?noGuard: That room and that bill wanted security. Nobody can watch the inside and work the cash box at the same time. | ?askAPunk: Ask-a-punk keeps strangers out, but it won't stop a crowd too big for the room. Cap it at the door. | ?addressOut: The address was on a pole, and that's how the trouble knew where to come. Keep it off the flyer at a house. | Name a floor person, keep the exits clear, and cap it at the door.]"]
        },
        UP: {
          NEW: ["It felt good in there tonight.", "Nobody was being weird tonight."],
          LEARNING: ["[?guard: Security stood by the podium all night, and nobody tried anything. | ?askAPunk: Only people who knew people came, and it felt like it. | ?addressOut: The address was out and it still felt fine, which was mostly luck. | The exits were clear, the room wasn't over, and somebody was watching, so it was an easy night.]"],
          KNOWS: ["[?guard: Security stood where everybody could see them, which is most of what they're for, and it worked. | ?askAPunk: Ask-a-punk kept it to people who know somebody, and that's why it felt like a house show. | ?addressOut: The address was in print and nothing went wrong this time. Don't count on that happening twice. | There was a floor person, the exits were clear and the house rules were on the door, and that's why nothing happened.]"]
        }
      },
      OWNER: {
        DOWN: {
          NEW: ["That was too many people.", "I didn't like how that felt."],
          LEARNING: ["[?askAPunk: Even with it just word of mouth, more people came than this place holds. | ?addressOut: Strangers kept showing up all night, because the address was on the flyer. | There were people standing in front of the back door, and that's the only other way out.]", "[?addressOut: Somebody I'd never seen in my life tried the back gate, and that's because the address was out. | There were too many people and nobody was watching the exits.]"],
          KNOWS: ["[?askAPunk: It was ask a punk and we still went over. Cap it at the door at the number I gave you, every time. | ?addressOut: My address was on a pole downtown. That's how the cops knew, and that's how the guy in my yard knew. | That was way over what this room holds, and the exit was blocked by a merch table. One more night like that and I'm done.]", "[?guardAtHouse: Who was the big guy by the door? This is my house, and he made it feel like a bar. | ?addressOut: Don't ever put my address on a flyer again. It's ask a punk, or you find another house. | Have somebody watching the floor and cap the door. I can't do that and host at the same time.]"]
        },
        UP: {
          NEW: ["Good night. Nobody puked and nobody fought.", "Nothing got broken, so thank you."],
          LEARNING: ["[?askAPunk: Ask a punk kept it to friends of friends, which is how I like it. | ?addressOut: The address was out and it was still fine, but I was nervous all night. | The exits were clear and somebody was watching the floor, so I could actually relax.]", "[?guard: Your security person was easy to have around, and nobody went over the rail. | Nobody went over the porch rail and nobody went over the fence, so that was a good night.]"],
          KNOWS: ["[?askAPunk: Ask a punk, a cap at the door and somebody on the floor. Do it like that and I'll keep offering you the house. | ?addressOut: It was fine tonight with the address out, but I'd rather not test that twice. | You capped it, kept the back clear and had somebody on the floor, so you can have another night.]", "[You had house rules on the door and a floor person who knew what they were doing. That's all I ask.]"]
        }
      },
      DOOR: {
        DOWN: {
          NEW: ["I had to stop letting people in for a bit.", "There were some people I didn't like the look of."],
          LEARNING: ["[?noGuard: I was stuck on the cash box and nobody was watching the inside. | ?addressOut: A few people at the gate didn't know anybody, because the address was out. | We went over what the room holds, and I was too busy with the cash box to stop it.]"],
          KNOWS: ["[?askAPunk: Even with ask a punk I let in more than the room holds. Give me a number before doors and I'll stop there. | ?addressOut: {count:words:cap} people I'd never seen came, all off the address on the flyer, and that's who the trouble was. | Give me a number for the room and name a floor person before doors, and I'll stop at the number.]"]
        },
        UP: {
          NEW: ["Easy door tonight.", "Nobody I had to turn away for the wrong reasons."],
          LEARNING: ["[?guard: Security stood next to me all night, and nobody argued at the door. | ?askAPunk: Everybody at the gate knew somebody, which is what ask a punk does. | I had a number and stopped at it, so the room never got too tight.]"],
          KNOWS: ["[?askAPunk: Ask a punk meant I knew most of the faces at the gate. Keep doing it that way for houses. | I stopped at the cap and the floor person had the inside, and that's why nothing happened.]"]
        }
      },
      REGULAR: {
        DOWN: {
          NEW: ["It got kind of sketchy in there tonight."],
          LEARNING: ["[?addressOut: There were a lot of people there who aren't from the scene, because the address was everywhere. | It was so packed I couldn't get to the door.]"],
          KNOWS: ["[?addressOut: When the address goes on the flyer, you get people who don't care about the house. Keep it ask a punk. | It was too packed to get out if something happened, so I didn't stay for the last band.]"]
        },
        UP: {
          NEW: ["It felt safe in there."],
          LEARNING: ["[?askAPunk: It was basically all people I knew, and it felt like ours. | The room wasn't too packed and I could actually breathe.]"],
          KNOWS: ["[?askAPunk: Ask a punk keeps your house shows feeling like your house shows, so please don't change it. | Somebody was watching and the room wasn't over, so I'll bring my little sister next time.]"]
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
      GEN_MIX: ["I bet it was the parking, honestly. Nobody around here wants to walk four blocks."],
      AGE_GATE: ["Must've been {event|the thing downtown}. Everybody's schedule was weird tonight."],
      NIGHT: ["I think it was the weather more than anything."],
      PROMO_FLYER: ["It was {event|whatever was going on downtown}. That always changes who comes out."],
      PROMO_DMS: ["I'm pretty sure it was the weather. People decide at the last minute based on that."],
      DOOR_PRICE: ["It was the parking. People circle the block twice, and then either they find a spot or they go home."],
      LOCAL_DRAW: ["Must've been {event|something going on in town}. That's what changes a night here."],
      REGULARS: ["I think it was the weather, honestly. That's what it always is."],
      VENUE_REP: ["It was {event|the other thing in town tonight}, I think. Not the room."],
      SAFETY: ["That was {event|the town thing} spilling over, if you ask me."]
    },
    /* TOURING blames how far ahead the show was announced (hobby PROMO_ANNOUNCE). */
    TOURING: {
      GENRE_MIX: ["Honestly, it's always how early the show gets announced. That's most of it in every town."],
      ROOM_FIT: ["I think it comes down to how early people knew about it. It always does."],
      PROMO_SHARES: ["It all comes down to when the show went up. Everywhere we go, the towns that announce early are the good nights."],
      DOOR_PRICE: ["Every town's the same, it's about when the show got announced. Price doesn't matter much."],
      DOOR_COUNT: ["The way I see it, the night was decided the day it got announced."],
      SOUND: ["Mostly it's about when people find out about the show. We've seen it in every town on this tour."]
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
      ROOM_FIT: ["It comes down to how long the night runs. It always has."],
      SOUND: ["The night's too long, that's what it is. Back when I went out every week, you played twenty-five minutes and got off."],
      TREND: ["Must've been the set times. These kids' bands and their fads come and go, I've seen a dozen of them."],
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
      HOSPITALITY: ["Mostly it's the style of band, if you ask me. I've seen the same crowd walk out on one kind and stay all night for another."],
      ADVANCE: ["It was the mix of bands, that's what I'd look at."],
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
      PROMO_SHARES: ["I think it was the order, honestly. Where you play decides who's still there."],
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
        "there were maybe nine people there and the band played like the room was full anyway",
        "small turnout tonight, which sucks because the openers were really good"
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
        "just a regular {dowLower} at {roomShort}, nothing crazy, but it was good"
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
      DOOR_PRICE: { DOWN: ["{price:money} for locals is wild"], UP: ["all those bands for {price:money}, there's no excuse not to come"] },
      TREND: { DOWN: ["is anybody still going to this kind of show"], UP: ["this is the sound now, sorry", "{trendWords} is everywhere right now and i'm not mad"] },
      RUNTIME: { DOWN: ["doors at 8 means first band at 9:40 apparently", "had to leave before the last band, it ran so late"], UP: ["in and out before midnight on a school night, which is all i ask"] },
      AGE_GATE: { DOWN: ["another 21+ show i can't go to"], UP: ["finally an all ages one"] },
      SAFETY: { DOWN: ["way too packed in there tonight, couldn't get to the door"], UP: ["nobody being weird tonight, felt good in there"] },
      PROMO_ANNOUNCE: { DOWN: ["wait, there was a show tonight? nobody told me"], UP: ["been waiting for this one since it got announced"] },
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
      "It rained from six on, and {lost:words|a few} or so stayed home.",
      "It rained all evening, and the people who'd said maybe didn't come.",
      "It poured right at doors. {lost:words:cap|Some} people who were on the fence stayed dry instead."
    ],
    HEAT: [
      "It was still hot at nine. {lost:words:cap|A few} people decided a hot room wasn't worth it.",
      "Heat like that keeps people on their couch. That cost you {lost:words|a few}.",
      "Too hot to stand in a crowd tonight, and some people knew it before they left the house."
    ],
    COLD: [
      "Cold night. {lost:words:cap|A few} people didn't want to stand outside between sets.",
      "It was the first real cold night of the year, and people stayed in.",
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
      "One person talked it up and {gained:words|a few} more came."
    ],
    ROAD: [
      "{chokepoint:cap|The road in} was backed up tonight. {lost:words:cap|A few} people from {town|across the water} turned around.",
      "Traffic on {chokepoint|the way in} cost you the people coming from {town|out of town}.",
      "The drive from {town|the other side} was bad tonight. {lost:words:cap|Some} of them didn't make it."
    ],
    FINE_EVENING: [
      "It was the first cool night in weeks, and people wanted to be out.",
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
      "{t}. {band} starts with {present} in the room."
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
        "I got the whole route done, and a couple people at the show said they saw them.",
        "I hit every spot on the route, and the coffee place asked me for a few extras.",
        "They went up early and they stayed up. Somebody at the door said they saw one on a pole by their work."
      ],
      DOWN: [
        "Sorry, I didn't get to half the route. My shift ran long two days in a row.",
        "I got some up, but three of the spots were already covered with somebody's yard sale signs.",
        "I did the west side twice and never made it east. I know that doesn't help."
      ]
    },
    ARTIST: {
      UP: [
        "People kept taking the flyer down to keep it, which I'll take.",
        "Somebody asked me who drew the flyer, and that felt good.",
        "You could read the flyer from across the street, which was what I was going for."
      ],
      DOWN: [
        "I know the flyer was late, that's on me. I'll start sooner next time.",
        "I don't think anybody could read the date on the flyer. I'll fix that next time.",
        "The flyer came out too busy. I watched people look at it and keep walking."
      ]
    },
    FLOOR: {
      UP: [
        "I kept the back door clear all night and nobody gave me any trouble.",
        "I walked the room every set and there's nothing to report.",
        "I moved a couple people off the porch rail before anybody fell, and other than that it was quiet."
      ],
      DOWN: [
        "It got too packed by the door and I couldn't get through to fix it.",
        "I was outside when it went sideways in there. I should've been up front.",
        "There were people in front of the exit most of the night and I couldn't move them."
      ]
    },
    LODGING: {
      UP: [
        "They slept fine, and they did the dishes before they left, which nobody ever does.",
        "I put them up and made eggs in the morning. They said it was the best floor they'd had all tour.",
        "They showered and slept till ten, and they left a tape on the counter for me."
      ],
      DOWN: [
        "My roommate wasn't into it, so they ended up in the van half the night.",
        "The floor was fine, but I had to be up at six for work, so they did too.",
        "I forgot I had work and they waited outside my place for an hour. I feel bad about that."
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
