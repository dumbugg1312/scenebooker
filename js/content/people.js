/* Scene Booker — content/people.js   (role C2)
 * What people write and say: local bands (by generation), room owners (by OWNER kind), crew, helpers (by ROLE),
 * other bookers (by BOOKER kind), contacts, regulars (by REGULAR_TYPE), gossip, scene news, drift and repair, and
 * the harm lines. Schema: design/spec/03-content.md section 9; registers: design/story.md section 5.
 * Harm lines follow story 8.7 exactly: who said it and how sure they are, never what happened, under 40 words,
 * no fixed pronoun for the person or the teller ({they}, {them}, {their} are supplied).
 * Data only: one assignment, no functions.
 */
SB.Content.people = {

  /* From a local band's contact, by the contact's generation. Slots: band, date, dow, room, touring, fee, member,
   * newMember, town. */
  band: {
    FIRST_ASK: {
      KIDS:   ['hi! someone said you\'re booking now? we\'ve played like six shows. we\'d open anything. all ages please, some of us are 17',
               'u booking now?? we\'re {band}. we\'ll play anything. we\'ll bring the drums if you need drums'],
      MIDDLE: ['we\'re itching. we\'ll play anything. we\'ll bring the drums if it\'s {room}, the kit\'s already in the truck.',
               'Heard you\'re doing the booking now. {band} is around all spring. Put us on something.'],
      OLD:    ['Heard you took over. {band} is still playing. Weekends are easier for us. Let us know.',
               'You\'re the one doing the shows now? We\'d play one. We don\'t need much.']
    },
    ASK_YES: {
      KIDS:   ['YES. we\'ll [open | play | close]. (%30: we\'ll bring the kit.)', 'YES!!! {dow}!!! we\'re there'],
      MIDDLE: ['Yeah, we\'re in. What time\'s load-in?', 'In. {dow} the {date:ord} works for all of us.'],
      OLD:    ['We can do that. Tell me when and where.', 'Yes. Send me the time.']
    },
    ASK_YES_IF: {
      KIDS:   ['yes if we can go on before 10, {member}\'s mom picks them up', 'yes!! if someone can lend us a bass amp'],
      MIDDLE: ['Yes if we\'re not first. {member} works till 7:45.', 'We\'re in if it\'s gas money at least. ({fee:money} is fine.)'],
      OLD:    ['Yes, if we\'re done by 11. Some of us work Saturdays.', 'We\'ll do it if there\'s parking for the van.']
    },
    ASK_NO_BUSY: {
      KIDS:   ['nooo we can\'t, {member} has a thing that weekend. next time??', 'can\'t that week. school stuff. so sorry'],
      MIDDLE: ['Can\'t. Bassist\'s out of town that week. Next time?', 'We\'re already playing {town} that weekend. Sorry.'],
      OLD:    ['Can\'t that night. Work.', 'Not that weekend. Try us for the next one.']
    },
    ASK_NO_PLAYED_OUT: {
      KIDS:   ['we\'ve played like four times this month lol. we should take a break maybe', 'we\'re kind of tired of playing the same room. maybe later'],
      MIDDLE: ['We\'ve played a lot lately. People are going to stop coming if we\'re on everything.', 'Going to sit this one out. We\'re on three bills this month already.'],
      OLD:    ['We\'ve played too much lately. People need to miss us a little.', 'Pass this time. We were just out.']
    },
    ASK_NO_BILL: {
      KIDS:   ['idk if we fit with {touring}?? they\'re kind of a different thing', 'we\'d be weird on that bill honestly'],
      MIDDLE: ['Not sure we fit with {touring}. Their crowd won\'t stay for us.', 'Wrong bill for us. Ask us for the next one.'],
      OLD:    ['That\'s not our crowd. Thanks for asking.', 'We\'d be the odd ones out on that bill.']
    },
    ASK_NO_ROOM: {
      KIDS:   ['we can\'t do {room}, it\'s 21+ and two of us are 18', 'can\'t, our drummer\'s parents won\'t let them go to {room}'],
      MIDDLE: ['We don\'t play {room} anymore. Long story.', 'Not at {room}. Anywhere else, yes.'],
      OLD:    ['We stopped playing {room} a few years ago.', 'Not that room.']
    },
    ASK_NO_LIST: {
      KIDS:   ['we can\'t play that one. sorry. it\'s not about you', 'we\'re gonna pass on that bill. sorry'],
      MIDDLE: ['We\'re not going to play that bill. I\'d rather not say why.', 'Pass on that one. Not about you.'],
      OLD:    ['We won\'t play that bill. Ask me in person if you need to.', 'No on that one.']
    },
    WANT_SHOW: {
      KIDS:   ['hey!! can we play something soon. we have new songs', 'we have three new songs and nowhere to play them'],
      MIDDLE: ['hey we got a new drummer and are itching to play. any chance you got something in {month|the spring}. we\'ll play first we don\'t care',
               'Put us on something. We\'re ready.'],
      OLD:    ['If you have a weekend coming up, we\'d play it.', 'We\'d like to play one of yours. No rush.']
    },
    WANTS_MONEY: {
      KIDS:   ['could we maybe get gas money this time? the drive from {town} is a lot', 'is there any money? we\'re trying to save for a van'],
      MIDDLE: ['We need to start getting paid something. Even {fee:money}. We\'re not kids.', 'Gas at least. We\'ve been playing free for a year.'],
      OLD:    ['We\'d want {fee:money}. That\'s what we get everywhere else.', 'We don\'t play for nothing anymore. Sorry.']
    },
    NEW_MEMBER: {
      KIDS:   ['we have a new {instrument|member}!! {newMember}!! they\'re so good', '{newMember} is in the band now. they know all the songs already'],
      MIDDLE: ['New {instrument|member} is {newMember}. Same songs, faster.', '{newMember} joined. We\'re better. Book us and see.'],
      OLD:    ['{newMember} is playing with us now.', 'We have a new {instrument|member}. {newMember}. You might know them.']
    },
    MEMBER_LEFT: {
      MOVED:  ['{member} got a job in {town}. We\'re looking.', 'Our {instrument|drummer} moved to {town}. We\'re figuring it out.'],
      ORDERS: ['{member} got orders. {town}. We have six weeks.', '{member} ships out next month. We\'re doing one more show and then we\'ll see.'],
      SCHOOL: ['{member} is going to college in {town} in August.', '{member} starts school in the fall, far away. We\'ll see what happens.'],
      LIFE:   ['{member}\'s out for a while. Baby\'s due in the spring.', '{member} has to take care of their mom for a while. We\'re on hold.'],
      KICKED: ['We kicked {member} out. Never came to practice. It\'s fine. It\'s better.', '{member} isn\'t in the band anymore. It was time. Nobody\'s mad.']
    },
    BROKE_UP: {
      KIDS:   ['so we broke up. it\'s ok. we\'re all still friends. mostly', 'we\'re done. {member} is starting something new though'],
      MIDDLE: ['Yeah. We\'re done. Last show\'s the {date:ord} if you want it.', 'We broke up. Thanks for every show. Really.'],
      OLD:    ['We\'re finished. Thanks for having us.', 'That\'s it for us. It was a good run.']
    },
    LAST_SHOW: {
      KIDS:   ['last show ever!!! we want it to be yours. please', 'we want our last show to be at {room}. can you make that happen'],
      MIDDLE: ['We want the last one to be yours. Pick a room. We\'ll bring everybody.', 'Last show. {dow} the {date:ord} if you can. It should be a big one.'],
      OLD:    ['One last show. We\'d like you to book it.', 'Last one. Somewhere people can stand at the back.']
    },
    HIATUS: {
      KIDS:   ['we\'re taking a break for a while. school', 'we\'re on break. not broken up. just on break'],
      MIDDLE: ['We\'re taking a break. We\'ll let you know.', 'Going quiet for a while. Everybody needs a minute.'],
      OLD:    ['We\'re taking some time off.', 'Not playing for a while.']
    },
    BACK: {
      KIDS:   ['WE\'RE BACK. can we play', 'we\'re a band again!! same songs plus new ones'],
      MIDDLE: ['We\'re playing again. Put us on something?', '{band} is back. New songs. Same van.'],
      OLD:    ['We\'re playing again. Twelve years. Everybody\'s going to come.', 'We\'re back. Book us when you have a weekend.']
    },
    THANKS_AFTER: {
      KIDS:   ['THANK YOU. can we play again. we have a new song about the bridge', 'that was the best show we\'ve ever played thank you'],
      MIDDLE: ['Thanks for {dow}. That was a good one.', 'Thanks for putting us on. Good night.'],
      OLD:    ['Thanks. Good night. We\'ll do it again.', 'Appreciate it. That was well run.']
    },
    AFTER_TOUR: {
      KIDS:   ['we\'re home!!! the van smells like a gas station forever. thank you for the tour', 'we made forty dollars each and it was the best week of our lives'],
      MIDDLE: ['We just played {town}. They put us second to last on a Friday. Thank you.', 'Tour\'s done. We made gas money and some friends. Thank you for routing it.'],
      OLD:    ['Back. Good run. The {town} night was the best one.', 'We\'re home. Thank you for setting it up.']
    }
  },

  /* An owner holding a night for the player until the room has what it asks for (then it is booked, no second ask). */
  holdUntil: ['I\'ll hold the {date:ord} for you.', 'The {date:ord} is yours if you want it.'],

  /* Room owners by OWNER kind. Slots: room, date, dow, curfew, amount, booker. */
  owner: {
    HOST: {
      HELLO:         ['Heard you\'re doing it now. Fine. Same rules. Done by {curfew}.', '{outgoing|The last booker} said you\'d write. Same rules as before. Street parking, done by {curfew}.'],
      HOLD_YES:      ['{date:ord} is fine. Done by {curfew}. Tell them to park on the street.', 'You can have the {date:ord}. Nobody in the back bedroom.'],
      HOLD_NO:       ['Can\'t do the {date:ord}. My sister\'s in town.', 'Not that weekend. We need a break from it.'],
      HOLD_SECOND:   ['Somebody already asked about the {date:ord}. If they drop it, it\'s yours.', '{booker} asked first. You\'re next if they let it go.'],
      CONFIRM_YES:   ['ok', 'Fine. {date:ord}. Done by {curfew}.'],
      CONFIRM_NEEDS: ['Before I say yes I want to know who\'s playing.', 'I need to meet you before I say yes. Come by.'],
      AFTER_GOOD:    ['That was fine. You can have another one.', 'Good night. The touring band swept up before they left. You can come back.'],
      AFTER_BAD:     ['That can\'t happen again. Not here.', 'The neighbors talked to me this morning. I need a few months off.'],
      AFTER_LATE:    ['It went past {curfew}. I said {curfew}.', 'Done by {curfew} means done by {curfew}.'],
      CLOSING:       ['We\'re moving out in the summer. The landlord\'s selling.', 'We\'re done hosting. It was good. It\'s been a lot.'],
      LAST_SHOW:     ['Last show here is yours if you want it.', 'One more before we go. You book it.'],
      NEVER_THANKED: ['You never said thanks for last time. I noticed.', 'A thank-you would\'ve been nice, last time.']
    },
    BAR_OWNER: {
      HELLO:         ['You\'re the new one? Fine. Thursdays are open. Bar keeps the bar, you keep the door.', 'If you\'re booking now, I have weeknights.'],
      HOLD_YES:      ['You can have the {date:ord}. Tell your bands the back lot is for the delivery trucks till 9.', '{dow}\'s yours. Load in through the side.'],
      HOLD_NO:       ['{dow} the {date:ord} is a private party.', 'Not that night. We have a band already.'],
      HOLD_SECOND:   ['{booker} has a hold on it. I\'ll let you know.', 'You\'re second on the {date:ord}.'],
      CONFIRM_YES:   ['Confirmed. Doors at 9.', 'You\'re on the calendar for the {date:ord}.'],
      CONFIRM_NEEDS: ['Who\'s the touring band and who\'s local? I need both before I put it up.', 'Get me a local band and it\'s confirmed.'],
      AFTER_GOOD:    ['Bar did well. You can have any Thursday you want.', 'Nobody fought, the bar did fine. You can have another one.'],
      AFTER_BAD:     ['Bar did nothing. I can\'t do another one of those.', 'Somebody got in a fight in the lot. I don\'t need that.'],
      AFTER_LATE:    ['We close at 2. Your last band went on at 1:15.', 'Ran long. My staff stayed an hour late for no money.'],
      CLOSING:       ['We sold the bar. The new people want TVs.', 'We\'re closing at the end of the month. Thanks for everything.'],
      LAST_SHOW:     ['One more show before we close. Make it a good one.', 'Last night with music is yours.'],
      NEVER_THANKED: ['You never came back to settle up properly last time.', 'Haven\'t heard from you since the last one.']
    },
    HALL_MANAGER: {
      HELLO:         ['The hall rents for {amount:money}. Cash. You sweep, you take your trash, you\'re welcome back.', 'Members\' bar closes at 9 for your people. Nobody under 21 on that side.'],
      HOLD_YES:      ['I can pencil you in for the {date:ord}. The deposit holds it.', 'The {date:ord} is open. Bring the deposit by the office.'],
      HOLD_NO:       ['We have a wedding reception that Saturday.', 'Members\' meeting that night. Pick another.'],
      HOLD_SECOND:   ['Somebody\'s penciled in already. If they don\'t pay the deposit, it\'s yours.', 'There\'s a hold on that date. I\'ll call you.'],
      CONFIRM_YES:   ['Deposit received. You\'re on the calendar.', 'You\'re confirmed for the {date:ord}. Out by {curfew}, broom by {curfew}.'],
      CONFIRM_NEEDS: ['The deposit is {amount:money}, in cash, before I confirm.', 'I need the deposit first.'],
      AFTER_GOOD:    ['Floor was swept. Nobody went in the members\' bar. You\'re welcome back.', 'I don\'t know what that music is, but you\'ve never once left a mess.'],
      AFTER_BAD:     ['The members are upset. I\'ll need to think about it.', 'Somebody went into the members\' bar. That was the one rule.'],
      AFTER_LATE:    ['You were out forty minutes past {curfew}. I had to stay.', 'The building closes at {curfew}. It closed late.'],
      CLOSING:       ['The lodge is selling the building. Last events are in the spring.', 'We\'re not renting the hall anymore. The insurance.'],
      LAST_SHOW:     ['One last event before we close. You\'ve been good to us.', 'If you want the last night, it\'s yours.'],
      NEVER_THANKED: ['A note after the last one would have been courteous.', 'You didn\'t call after. Most people call.']
    },
    SHOP_OWNER: {
      HELLO:         ['You can have the board. Don\'t cover my sale sign.', 'You\'re the new booker? Flyers go on the left side of the counter.'],
      HOLD_YES:      ['Afternoon of the {date:ord}, fine. Done by 6, I close at 7.', 'In-store\'s fine on the {date:ord}. Keep it under an hour.'],
      HOLD_NO:       ['Can\'t that day. Inventory.', 'Not that weekend. Big sale.'],
      HOLD_SECOND:   ['Somebody asked about the {date:ord} already. Let me see.', 'Maybe. Somebody else asked first.'],
      CONFIRM_YES:   ['Fine. {date:ord}.', 'You\'re on. Tell them to buy something.'],
      CONFIRM_NEEDS: ['Ask nicely and bring me the flyer first.', 'Who\'s playing? I want to hear them before I say yes.'],
      AFTER_GOOD:    ['Sold eleven records. Do it again.', 'Good one. People stayed and looked through the bins.'],
      AFTER_BAD:     ['Somebody knocked over the cassette rack. Let\'s wait a while.', 'Nobody bought anything.'],
      AFTER_LATE:    ['I close at 7. It was 7:40.', 'Ran long. I missed dinner.'],
      CLOSING:       ['I\'m closing the shop in the spring. Lease is up and I\'m tired.', 'The shop\'s done at the end of the month. Come get the flyers off the board.'],
      LAST_SHOW:     ['Last day of the shop. Want to do a show in it?', 'One more in-store before I close.'],
      NEVER_THANKED: ['You didn\'t even come back to take the flyers down.', 'Haven\'t seen you in here since.']
    },
    CHURCH_CONTACT: {
      HELLO:         ['As far as anybody\'s concerned, this is a youth music night. Which it is.', 'The fellowship hall is free some evenings. No alcohol, done by 9.'],
      HOLD_YES:      ['The {date:ord} works. Done by 9, please.', 'You can have the hall that evening. Nothing on the flyer I\'d have to explain.'],
      HOLD_NO:       ['There\'s a supper that night.', 'Not that week. Revival.'],
      HOLD_SECOND:   ['Another group asked about that evening.', 'Let me check. Someone else asked.'],
      CONFIRM_YES:   ['It\'s on the calendar as a youth night.', 'Confirmed. Thank you for being careful.'],
      CONFIRM_NEEDS: ['I\'d like to see the flyer before it goes out.', 'No swearing on the flyer and I\'ll confirm.'],
      AFTER_GOOD:    ['Nobody complained. Some of the young people asked when the next one is.', 'That went well. The pastor didn\'t hear a thing.'],
      AFTER_BAD:     ['Somebody told the pastor. I can\'t do another one.', 'I had to answer some questions this morning.'],
      AFTER_LATE:    ['It went past 9. People noticed.', 'I said 9. It was almost 10.'],
      CLOSING:       ['The church needs the hall back. It was nice while it lasted.', 'New pastor. No more music nights.'],
      LAST_SHOW:     ['One more, quietly, if you\'d like.', 'Let\'s do one last one before the change.'],
      NEVER_THANKED: ['A thank-you note to the church would go a long way.', 'You didn\'t say anything after. People here notice.']
    },
    LANDLORD: {
      HELLO:         ['I rent it as storage. What you store is your business. Don\'t make it my business.', 'Rent\'s on the first. I don\'t want to know what happens there.'],
      HOLD_YES:      ['Fine. Don\'t call me.', 'Whatever. Keep it quiet.'],
      HOLD_NO:       ['Not that night. Somebody\'s looking at the unit.', 'No. The inspector\'s coming that week.'],
      HOLD_SECOND:   ['The other kids asked first.', 'Somebody else has it that night.'],
      CONFIRM_YES:   ['Yeah. Lock up after.', 'Fine.'],
      CONFIRM_NEEDS: ['Somebody I know has to vouch for you.', 'Who are you? Have somebody tell me you\'re fine.'],
      AFTER_GOOD:    ['No calls. Good.', 'Nobody called me. That\'s all I want.'],
      AFTER_BAD:     ['I got a call. I don\'t want calls.', 'The fire marshal asked about my unit. Don\'t.'],
      AFTER_LATE:    ['Neighbor said it went to 2.', 'Too late. Somebody complained.'],
      CLOSING:       ['I\'m selling the building.', 'The unit\'s done. Insurance.'],
      LAST_SHOW:     ['Do one more before the sale if you want. Quiet.', 'Last one. Then get your stuff out.'],
      NEVER_THANKED: ['You owe me for the light bill.', 'You didn\'t lock up last time.']
    },
    TALENT_BUYER: {
      HELLO:         ['We\'d want 60 through the door to make it work on a Friday. Can you get me 60?', 'Send me what you\'ve got. I book six weeks out.'],
      HOLD_YES:      ['I can hold the {date:ord} for two weeks. After that I release it.', 'Penciled. I\'ll need a confirmed bill by the end of the month.'],
      HOLD_NO:       ['That date\'s gone.', 'We have a national act on the {date:ord}.'],
      HOLD_SECOND:   ['You\'re second hold on the {date:ord}.', 'There\'s a first hold. I\'ll challenge it if you want to confirm.'],
      CONFIRM_YES:   ['Confirmed. I\'ll put it on the marquee.', 'You\'re on. Tickets go up Monday.'],
      CONFIRM_NEEDS: ['Full bill before I confirm. And I need to see your last three numbers.', 'Lock the bill and it\'s confirmed.'],
      AFTER_GOOD:    ['We did the numbers. Good night. Let\'s talk about more.', 'That beat the house average. Send me another one.'],
      AFTER_BAD:     ['That was under what we needed.', 'We lost money on that one.'],
      AFTER_LATE:    ['The curfew is in the contract.', 'Ran past {curfew}. That costs us.'],
      CLOSING:       ['The club\'s been sold. Last shows are next month.', 'We\'re closing for renovations. Indefinitely.'],
      LAST_SHOW:     ['Want one of the last nights?', 'Last weekend\'s open. Yours if you want it.'],
      NEVER_THANKED: ['You didn\'t send the settlement sheet back.', 'Follow up after shows. That\'s how this works.']
    }
  },

  crew: {
    SOUND: {
      YES:       ['I\'ll do it for {amount:money}. I\'m not doing four bands for {amount:money}. I\'ll do three.', 'yeah i can do it. i\'ll be there by 6. probably 6:15'],
      NO:        ['Can\'t that night.', 'not that one, sorry. ask me for the next'],
      NO_BOOKED: ['can\'t do the {date:ord}, got a paid gig at a wedding. my friend can. they\'re fine. they\'re not me.', 'Booked that night. Somebody else\'s show.'],
      RETIRING:  ['I\'m not doing it anymore. My back. Call {newMember|someone}, I taught them.', 'Done running sound. It\'s been fifteen years. Here\'s who to call.']
    },
    SECURITY: {
      YES:       ['{amount:money} and I\'ll stand by your podium all night. Nobody gets weird.', 'I can do it. I\'ll be there at doors. I don\'t need to be in the way, just seen.'],
      NO:        ['Can\'t that night. Sorry.', 'Not this one. Working a wedding.'],
      QUIET:     ['Quiet one. Walked the lot twice. Nobody needed me, which is the point.', 'Nothing to report. Stood by the door, said hi to everybody, nobody tried anything.'],
      HANDLED:   ['Had to walk one guy out. He went easy. Band never stopped.', 'Couple of people tried to come in the side. Sent them around to you.']
    }
  },

  /* Helpers by ROLE. Slots: route, spots, show, band, reason, skipped, amount. */
  helper: {
    RUNNER: {
      YES:             ['yeah i\'ll do {route}. i\'m out that way anyway', 'I can do the run Tuesday.'],
      NO:              ['can\'t this week. sorry', 'Not this time. Work.'],
      NO_TASTE:        ['not really my kind of show. ask me for the next one', 'I don\'t want my name near that bill. Nothing personal.'],
      DONE:            ['Got flyers up at {spots}.', 'Did {route}. Every spot.'],
      DIFFERENT:       ['Did {route}. Skipped {skipped}, {reason}.', 'Did it Tuesday, not Monday. The copy place was closed.'],
      NOT_DONE_TOLD:   ['I didn\'t get to it. Car stuff. Sorry.', 'didn\'t do the run. i\'m really sorry. i\'ll do the next one'],
      NOT_DONE_SILENT: ['(you found out at the door)', '(nobody mentioned it until somebody said they never saw a flyer)'],
      OPINION:         ['People at the laundromat always ask about the shows. Put more there.', 'The record store board is full. Nobody reads past the top layer.'],
      OFFER:           ['can I do posters? I\'m on that side of town every day anyway', 'If you ever need flyers up, I drive past everything.']
    },
    ARTIST: {
      YES:             ['yeah i\'ll make it. give me till {show}', 'I\'ll do the flyer. Send me the bill.'],
      NO:              ['too busy this week, sorry', 'Can\'t. Deadline at work.'],
      NO_TASTE:        ['i don\'t really know how to draw for that kind of band', 'Not my kind of flyer. Ask me for the next one.'],
      DONE:            ['Flyer\'s done. Sent it.', 'Here\'s the flyer. Tell me if you hate it.'],
      DIFFERENT:       ['Did it in my style, not yours. Trust me.', 'Changed the colors. The other ones were sad.'],
      NOT_DONE_TOLD:   ['i couldn\'t finish it. i\'m sorry. you should do it', 'Didn\'t get to it. Sorry. Do you want what I have?'],
      NOT_DONE_SILENT: ['(the flyer never came)', '(no flyer, no message)'],
      OPINION:         ['Your flyers are too busy. Pick one thing.', 'People share the ones with a drawing on them.'],
      OFFER:           ['i could make your flyers sometime if you want', 'I draw. I\'ll do a flyer for a spot on the list.']
    },
    FLOOR: {
      YES:             ['I\'ll be the one people find if something\'s wrong.', 'yeah i\'ll keep an eye on things'],
      NO:              ['Can\'t be there that night.', 'not this one sorry'],
      NO_TASTE:        ['I\'d rather not be at that one.', 'Not my kind of night.'],
      DONE:            ['Quiet night. Nothing to report.', 'Kept an eye out. Everybody was fine.'],
      DIFFERENT:       ['Had to step outside for a while. Nothing happened.', 'Did the door for an hour too. Hope that\'s fine.'],
      NOT_DONE_TOLD:   ['I couldn\'t make it. I\'m sorry.', 'didn\'t make it. something came up'],
      NOT_DONE_SILENT: ['(nobody was there to find)', '(you looked for them at 10. They weren\'t there.)'],
      OPINION:         ['You need someone at the gate after 10. That\'s when it gets weird.', 'Put "find {show|me} if anything\'s wrong" on the flyer.'],
      OFFER:           ['If you need someone people can find, I\'ll do it.', 'I\'m at every show anyway. I can be the person.']
    },
    LODGING: {
      YES:             ['They can stay with me. I have floor for five.', 'yeah send them over. i have a couch and a dog'],
      NO:              ['Can\'t this time. Roommate\'s back.', 'not this week. sorry'],
      NO_TASTE:        ['I\'d rather not host that band.', 'Not that one. Somebody else.'],
      DONE:            ['They were lovely. One of them did my dishes. Send me more like that.', 'They left before 9. Folded the blankets.'],
      DIFFERENT:       ['Only had room for three. Two slept in the van.', 'They stayed with my neighbor. Long story. Fine.'],
      NOT_DONE_TOLD:   ['Sorry, can\'t host after all. Something came up.', 'my landlord\'s around this weekend. can\'t. sorry'],
      NOT_DONE_SILENT: ['(the band texted you at 1 a.m. from a locked door)', '(nobody answered the door)'],
      OPINION:         ['Tell bands to bring sleeping bags. I\'m out of blankets.', 'The ones who ask what they can bring are always the good ones.'],
      OFFER:           ['If a band ever needs a floor, I have one.', 'I have a spare room now. Bands can stay.']
    }
  },

  /* Other bookers by BOOKER kind. Slots: room, date, band, genre, dow. */
  booker: {
    GENRE: {
      HELLO:           ['You\'re the new one? {dow}s at {room} are mine. Don\'t book against my {dow}s and we\'re good.'],
      CLASH:           ['You\'re on my {dow}. I\'m not mad. I\'m telling you.', 'Heads up, I\'ve got a {genre} bill the same night as yours. Want to stagger times?'],
      RELEASE_YES:     ['I\'m not using the {date:ord}. Take it.'],
      RELEASE_NO:      ['I\'m using it. Sorry.'],
      CHALLENGE:       ['I want the {date:ord} at {room}. Confirm it or let it go.'],
      LOST_RACE:       ['You got {band}? Fine. I\'d have put them on a Saturday.'],
      WON_RACE:        ['I got {band}. Nothing personal.'],
      SHARE_BILL:      ['You get the touring band, I\'ll bring my crowd, we split it.'],
      TREND:           ['Every band writing me sounds like this now.', 'That band\'s drummer is leaving. Don\'t book them for the spring.'],
      ASKS_ABOUT_BAND: ['You had {band}. Worth it?']
    },
    TALENT_BUYER: {
      HELLO:           ['I\'ve seen your numbers. If you can get me 60 on a Friday, we should talk.'],
      CLASH:           ['We have a show that night. Our crowd overlaps yours.'],
      RELEASE_YES:     ['I\'ll release the {date:ord}. It\'s yours.'],
      RELEASE_NO:      ['We\'re holding the {date:ord} for an agency avail.'],
      CHALLENGE:       ['We have an offer for the {date:ord}. Can you confirm by Friday?'],
      LOST_RACE:       ['You got {band}. We offered more.'],
      WON_RACE:        ['{band} took our offer. The agent wanted a ticketed room.'],
      SHARE_BILL:      ['Bring your band in as support on our show. Fifty dollars and drink tickets.'],
      TREND:           ['Agents are pushing a lot of this lately.'],
      ASKS_ABOUT_BAND: ['What did {band} do for you? Real numbers.']
    },
    ANYWHERE: {
      HELLO:           ['Oh, you\'re doing shows now? Cool. Let\'s not step on each other.'],
      CLASH:           ['You know I have a show that night, right?'],
      RELEASE_YES:     ['Sure, take the {date:ord}. You owe me one.'],
      RELEASE_NO:      ['I\'m using that one.'],
      CHALLENGE:       ['I want the {date:ord}. Are you confirming or not?'],
      LOST_RACE:       ['Oh, you got them? I talked to them first. No, it\'s fine.'],
      WON_RACE:        ['They went with me. You can have the next one.'],
      SHARE_BILL:      ['Want to do one together? Split everything.'],
      TREND:           ['Three bands in town sound like this now. Is this a thing?'],
      ASKS_ABOUT_BAND: ['Did {band} draw for you? They wrote me too.']
    },
    KID: {
      HELLO:           ['hi! i do shows at the skate shop sometimes. how do you get touring bands to write you. like how did that start'],
      CLASH:           ['oh no we\'re on the same night. should i move mine'],
      RELEASE_YES:     ['yeah take it!! i wasn\'t gonna use it'],
      RELEASE_NO:      ['i kind of need it, sorry. my friends\' band is playing'],
      CHALLENGE:       ['um are you using the {date:ord}? i wanted it for a show'],
      LOST_RACE:       ['aw you got {band}. that\'s ok. can i come'],
      WON_RACE:        ['{band} said yes to me!! i can\'t believe it'],
      SHARE_BILL:      ['would you want to do a show together? i have the kids, you have the bands'],
      TREND:           ['everybody at school\'s into {genre} now', '{band} is doing a whole show of it at the skate shop.'],
      ASKS_ABOUT_BAND: ['is {band} good? should i book them']
    },
    OLD: {
      HELLO:           ['We did shows in a hall that\'s gone now until a kid put his foot through the ceiling. The ceiling\'s still like that.'],
      CLASH:           ['I\'ve got one show a year and it\'s that night. I picked it in January.'],
      RELEASE_YES:     ['Take it. I don\'t do much anymore.'],
      RELEASE_NO:      ['That\'s the one night a year I still do.'],
      CHALLENGE:       ['I\'ve had that date booked for months.'],
      LOST_RACE:       ['They went with you. They should have.'],
      WON_RACE:        ['They asked me first. I\'ve known them twenty years.'],
      SHARE_BILL:      ['If you want the old crowd on your bill, I can bring them.'],
      TREND:           ['This\'ll pass.', 'We had this exact thing in the ’90s. It passed.'],
      ASKS_ABOUT_BAND: ['{band}? I booked their singer\'s first band. Ask me anything.']
    },
    PEER: {
      HELLO:           ['I book in {town}. {outgoing|The last booker} and I used to trade bands. Want to keep doing that?'],
      CLASH:           ['We\'re both after the same tour that weekend. Want to split the dates?'],
      RELEASE_YES:     ['They\'re yours that night. I\'ll take the next one.'],
      RELEASE_NO:      ['I need them that night. Next run.'],
      CHALLENGE:       ['I\'ve got a band from out of town with a hole on the {date:ord}. Yours?'],
      LOST_RACE:       ['They picked your town. Good for you.'],
      WON_RACE:        ['They\'re doing my town instead. Send me your next one.'],
      SHARE_BILL:      ['Send me your best local band and I\'ll put them on a Friday.'],
      TREND:           ['Every band through here this month sounds like this.'],
      ASKS_ABOUT_BAND: ['{band} wrote me. You had them. How\'d it go?']
    },
    OUTGOING: {
      HELLO:           ['It\'s bigger. Nobody answers anybody. I miss {room|the old rooms}.'],
      CLASH:           ['I\'ve got a band on that tour too. We can both have them.'],
      RELEASE_YES:     ['Take it. Not my town anymore.'],
      RELEASE_NO:      ['I need that band here that night. Sorry.'],
      CHALLENGE:       ['Got a band with a hole between here and you. You?'],
      LOST_RACE:       ['They did your town instead of mine. Told you you\'d be good at this.'],
      WON_RACE:        ['They played for me. Next time they\'ll do you too.'],
      SHARE_BILL:      ['Send me a band. I\'ll put them on a Friday.'],
      TREND:           ['Up here everybody sounds like this now. It\'ll get to you in about six months.'],
      ASKS_ABOUT_BAND: ['You ever have {band}? They wrote me.']
    }
  },

  /* Contacts in other towns. Slots: band, town, booker, date, n. */
  contact: {
    VET_GOOD:       ['Good kids. Played hard. Drew about {n} here.', 'Easy. They swept up and played to whoever came. I\'d have them back.'],
    VET_MIXED:      ['Showed up late but played hard. Drew about {n}.', 'Fine. Not great. Most people were there for the local band.'],
    VET_BAD:        ['They left my couch a mess and their singer argued with the door. I wouldn\'t.', 'Cancelled the day of. Their post that night was from a party.'],
    VET_UNKNOWN:    ['Never had them. Sorry.', 'Don\'t know them. Ask somebody in {town}.'],
    SWAP_OFFER:     ['Want to trade? Put one of mine on something and I\'ll give yours a good night here.', 'I\'ve got a Friday open next month. Send me your best local band and take one of mine.'],
    SWAP_DELIVERED: ['Your band played. Second to last on a Friday. They were good. My turn.', 'Put your band on like I said. They did fine. People stayed.'],
    SWAP_FAILED:    ['I couldn\'t get your band on after all. The room fell through. I owe you.', 'Sorry. I lost the night. I\'ll make it right.'],
    TREND_TIP:      ['Everybody up here is into the slow heavy stuff now. Give it a few months and it\'ll be you.', 'Bands with two drummers. Six of them this month. Watch for it.'],
    SHARE_YES:      ['Shared it. My people will see it.', 'Posted it. A few of mine said they\'d drive down.'],
    TOUR_YES:       ['Yes. I\'ll put them on {date:ord}. Door deal, a floor.', 'I\'ll take them. Tell them to be here by 7.'],
    TOUR_NO:        ['Can\'t that night. Next time.', 'I don\'t have a room that week. Sorry.'],
    OUTGOING: {
      SETTLING: ['It\'s bigger. Nobody answers anybody. I miss your shows.', 'I\'m doing the door at a bar up here now. It\'s fine. It\'s a lot of people.'],
      NUDGE:    ['Forwarding you everything. Most of it\'s junk. The ones from the peer towns are real. Don\'t let anybody talk you into a Saturday guarantee your first year.',
                 'Heard {dow|it} went good. Told you. Don\'t put a guarantee on a holiday weekend. You\'ll see why.'],
      ASKING:   ['Got a band with a hole between here and you. You?', 'Send me one of your bands. I\'ll put them on a Friday up here.']
    }
  },

  /* Regulars by REGULAR_TYPE. Slots: room, dow, band, town, month, storyName. */
  regular: {
    EVERYTHING:    { HELLO: ['Wouldn\'t miss one of yours.', 'Same spot as always.'],
                     DRIFTING: ['Haven\'t made it out lately. Work.', 'Missed a couple. I\'ll be back.'],
                     ASKED_WHY: ['Kind of the same bands every time lately.', 'Honestly the last few were a lot of the same thing.'] },
    COUPLE:        { HELLO: ['We met at {storyName|one of your shows}. You probably don\'t remember.', 'We come to all of them. Well, most.'],
                     DRIFTING: ['Baby\'s due in the spring. We\'ll be back for a matinee someday.', 'We\'ve been staying in. You know.'],
                     ASKED_WHY: ['We can\'t do late nights anymore. Do an early one sometime.', 'It\'s the late start. We\'re old now.'] },
    KID_WITH_RIDE: { HELLO: ['my mom says i can go if it\'s done by 10:30', 'is the {dow} one all ages? my little brother wants to come'],
                     DRIFTING: ['i can\'t get rides as much anymore', 'my mom said no more school nights'],
                     ASKED_WHY: ['they\'re all 21+ lately', 'the last ones ended too late for my ride'] },
    SAILOR:        { HELLO: ['first show since I got stationed here. this is the best thing in this town.', 'I\'m only here another year. Not missing any of these.'],
                     DRIFTING: ['Got duty most weekends now.', 'Working a lot of nights on base.'],
                     ASKED_WHY: ['Got orders. I\'m out next month. They have nothing like this where I\'m going.', 'Schedule changed. Weekends are gone.'] },
    NIGHT_SHIFT:   { HELLO: ['I can only do Sundays and Mondays.', 'Got off at 7, came straight here.'],
                     DRIFTING: ['They put me on weekends.', 'Can\'t make Fridays anymore.'],
                     ASKED_WHY: ['Do a Sunday sometime. Half the kitchens in town are off.', 'Everything\'s on Friday. I work Fridays.'] },
    OLD_HEAD:      { HELLO: ['Haven\'t been out this much in years. Thanks for that.', 'Saw the poster at the record store. Had it on the fridge.'],
                     DRIFTING: ['Didn\'t see a thing about the last couple anywhere.', 'Getting old. Getting home earlier.'],
                     ASKED_WHY: ['I look at the record store board every Saturday. Nothing was on it.', 'It\'s all kids\' bands lately. Not my thing.'] },
    OUT_OF_TOWNER: { HELLO: ['Hour drive. Worth it.', 'Came in from {town}. Brought two friends.'],
                     DRIFTING: ['Gas, you know.', 'There\'s a few shows in {town} now, actually.'],
                     ASKED_WHY: ['Somebody started doing shows in {town}. It\'s closer.', 'The drive back at midnight got old.'] }
  },

  /* Gossip: what people tell you, true or not. Slots: room, band, person, town, amount, member. */
  gossip: {
    ROOM_RENT:       ['Heard {room} is raising the rent on the hall. Heard it from the bartender there, so who knows.', 'Somebody said {room} wants {amount:money} a night now.'],
    HOUSE_SELLING:   ['Somebody said the house is getting sold. They\'ve been saying that for six years.', 'Heard the landlord had a realtor over to {room}.'],
    BAND_BROKE_UP:   ['You know {band} broke up? Their bass player\'s in {town} now. They say it was the move. It was not the move.', 'Heard {band} are done. Haven\'t heard it from them yet.'],
    NEW_BAND:        ['Some kids from {town} started a band. It\'s three of them and a drum machine they named.', '{member} is in a new thing. It\'s slower. They have four songs.'],
    PERSON_MOVING:   ['Heard {person} is moving to {town}.', 'Somebody said {person} got a job in {town}.'],
    LISTED_NEW_BAND: ['Heard {person} is in a new band with some kids from {town}.', 'Somebody said {person} is playing in a new band.']
  },

  /* Scene news, told by whoever would know. Slots vary by kind: band, members, member, room, person, town, storyName. */
  news: {
    BAND_FORMED:   ['{members} started a band. It\'s called {band}. (?fromShow: {member} was at {storyName}.)',
                    'New band: {band}. {members}. (?fromShow: {member} first came to {storyName}.)'],
    BAND_ENDED:    ['{band} broke up.', '{band} played their last show. Nobody\'s saying why. Probably nothing.'],
    BAND_STAGE: {
      FORMING:     ['{band} are practicing. No shows yet.'],
      NEW:         ['{band} played their first show.'],
      COMING_UP:   ['People are starting to come for {band}.'],
      ESTABLISHED: ['{band} are a local favorite now.'],
      DRAW:        ['{band} can fill a room on their own now.'],
      BROKE_OUT:   ['{band} are bigger than the town now. People in other cities know the words.'],
      FADING:      ['Fewer people come out for {band} than used to.'],
      ON_ICE:      ['{band} are on a break.'],
      ENDED:       ['{band} are done.']
    },
    MEMBER_LEFT:   ['{member} left {band}.', '{band} are down a member. {member} is out.'],
    MEMBER_JOINED: ['{member} joined {band}.', '{band} have a new member: {member}.'],
    ROOM_OPENED:   ['Some kids rented a unit for practice. They say you can do shows there if you keep it quiet.', '{room} has new owners. They want music on Wednesdays.',
                    'There\'s a fellowship hall with a youth pastor who used to play in a band.'],
    ROOM_CLOSED: {
      SOLD:       ['The landlord\'s selling {room}. Last show in the summer.', '{room} got sold. It\'s going to be something else.'],
      RENT:       ['{room} raised the rent past what a door can pay.', '{room} is too expensive now. Nobody\'s booking it.'],
      MARSHAL:    ['Fire marshal came to {room}. It\'s done.', 'Somebody called the fire marshal on {room}. Closed.'],
      STORM:      ['{room} took two feet of water. Nobody\'s going back in there.', 'The storm took the roof off {room}.'],
      TIRED:      ['{room} is done. They\'re tired. They said thanks for everything.', 'The people at {room} want their weekends back.'],
      COMPLAINTS: ['Too many complaints. {room} isn\'t doing shows anymore.', 'The neighbors won. {room} is closed for shows.']
    },
    PERSON_LEFT:   ['{person} moved to {town}.', '{person} is gone. {town}. Says to send bands.'],
    TREND_SIGN: {                          // SPEC? 03-content gives no slot for the trend; {trend} is its description (names.trend)
      NEW_BANDS:  ['Three new bands in town sound like {trend}.', 'Another new band doing {trend}.'],
      OUT_POSTED: ['Posts from bigger cities are all {trend} lately.', 'Somebody posted a clip of {trend} from up north and everybody shared it.'],
      REQUESTS:   ['Two bands wrote you this week, both doing {trend}.', 'The requests are starting to sound alike: {trend}.'],
      BOOKERS:    ['{booker} is doing a whole night of {trend}.', 'Other bookers are booking {trend} now.'],
      CONTACT:    ['A contact up the road says everybody there is into {trend}.', '{town} has a scene of {trend} now, apparently.'],
      KID:        ['everybody at school\'s into {trend} now', 'a kid at the door asked if you ever book {trend}']
    },
    BOOKER:        ['{booker} is booking at {room} now.', '{booker} stopped doing shows.'],
    GOSSIP:        ['Heard something. Might be nothing.'],
    SWAP:          ['{band} played {town} on the swap. Second to last on a Friday.', 'The swap came through: {band} played {town}.'],
    ANNIVERSARY:   ['A year ago tonight: {storyName}.', 'Somebody posted about {storyName}. A year already.']
  },

  drift:  ['Haven\'t heard from you since the {season}. Thought you quit.', 'Been a while. You still doing shows?'],
  repair: ['You paid {person} the {amount:money} from {month}. {person} said "about time" and then asked if you need them {dow}.',
           'You went to {person}\'s show and stayed for all of it. They noticed.'],

  /* People who do harm. story 8.7: who said it and how sure; never what happened; under 40 words. */
  harm: {
    tell: {
      DIRECT: {
        1: ['{teller} asked to talk after the show. "I won\'t play shows {person} plays, and I won\'t come to them. I\'m telling you because you book {band}. Please don\'t say it was me."'],
        2: ['{teller} found you at the side door. "I don\'t feel safe at shows {person} is at. Neither does a friend of mine. I\'d rather not say more. Please keep my name out of it."'],
        3: ['{teller}: "I\'m only going to say this once. I won\'t be anywhere {person} is. People know why. I\'m telling you because you book {band}."']
      },
      TRUSTED: {
        1: ['{teller}: "Somebody told me they don\'t want to be at shows {person} is at. That\'s all I know. I\'m telling you because you book {band}."'],
        2: ['{teller}: "Two people told me they don\'t want to be at shows {person} is at. I didn\'t ask them to explain and I\'m not going to. I\'m telling you because you book {them}."'],
        3: ['{teller}: "Several people have told me the same thing about {person}. Separately. I believe them. I wanted you to hear it from me."']
      },
      BOOKER: {
        1: ['{teller}: "Quietly. We don\'t book {person} anymore. Not saying more than that. You can ask me if you need to."'],
        2: ['{teller}: "We stopped booking {person}. So did {town}. I\'m telling you because you book {band}."'],
        3: ['{teller}: "Everybody on the route has stopped booking {person}. I\'d want to know, so I\'m telling you."']
      },
      SAW_IT: {
        1: ['Your floor contact asked {person} to leave at 10:20. {they:cap} argued, then left. Your floor contact didn\'t want to say more.'],
        2: ['{teller} asked {person} to leave. {they:cap} left. Afterward two people thanked {teller}.'],
        3: ['{teller} asked {person} to leave. {they:cap} left. Three people came to find you after, separately, to say they were glad.']
      },
      RUMOR: {
        1: ['Somebody said {person} is "a problem." Somebody also said it about the person who owes {them} money.'],
        2: ['A couple of people have said {person} is "a problem." Neither of them was sure who told them.'],
        3: ['People keep saying {person} is "a problem." Nobody you\'ve asked says how they know.']
      }
    },
    weight:  { 1: 'one person has said it', 2: 'more than one person says it', 3: 'it\'s known' },
    options: { ASK_AROUND: 'Ask someone who\'d know', LIST: 'Put {person} on your list', QUIET_WORD: 'Have a quiet word with {band}', PULL_SHOW: 'Pull the show', LEAVE: 'Wait and keep an eye out' },
    asked: {
      STRONGER:  ['{teller}: "I\'ve heard it too. From more than one person. I\'d take it seriously."', '{teller}: "Yes. I know about it. It\'s real."'],
      SAME:      ['{teller}: "I\'ve heard the same thing. I don\'t know more than that."', '{teller}: "Somebody told me something like that. That\'s all I have."'],
      NOT_HOLD:  ['{teller}: "That\'s someone else. Different person, same first name. I\'d have told you."', '{teller}: "I don\'t think that\'s right. I\'d ask again before doing anything."'],
      TWICE:     ['{teller}: "I told you what I know. I don\'t have more."'],
      WORD_BACK: ['{band} heard you\'ve been asking about {person}.']
    },
    closed: {
      NOTHING_MORE: ['Nothing more came of it.'],
      LEAVES:       ['{person} moved away.'],
      NEW_BAND:     ['{person} is in a different band now.']
    },
    bandReply: {
      HANDLING:   ['Yeah. We know. We\'re dealing with it. Give us a few weeks.'],
      DIDNT_KNOW: ['We didn\'t know. I need to talk to the others. Thank you for telling us and not, like, everyone.'],
      DEFENSIVE:  ['That\'s not what happened and you weren\'t there.'],
      SILENT:     ['No answer from {band}.'],          // SPEC? story 8.4 says "Silence."; a record line in the game voice, not the band's
      PARTED:     ['{person} isn\'t in the band anymore. We have a new {instrument} player, {newMember}. We\'d like to play for you again if you\'ll have us. Totally understand if not.']
    },
    reasons:    ['Someone told me they weren\'t safe around {them}.', 'More than one person told {teller}.', 'What I saw at my show.', 'Another booker asked me not to.', 'I don\'t know enough. Not until I do.'],
    conditions: { BAND_PARTS: 'If the band parts ways with {them}, they can play.', LOOK_AGAIN: 'Look at this again in a year.', TALK_FIRST: 'Not without talking to {teller} first.', NO: 'No.' },
    flag: {
      band:    'One member is on your list.',
      request: 'One name in this band is on your list.',
      confirm: '{person} is on your list. Book anyway?',
      gossip:  ['Heard {person} is in a new band with some kids from {town}.']
    },
    removed:  ['You took {person} off your list. Your note said: "{condition}"'],
    wrong:    ['{member}: "I\'m going to say this once. People are saying {person} is a problem and that you won\'t book us because of it. Whoever told you that was talking about someone else."'],
    note:     'A rumor isn\'t a report.',
    work:     ['{teller}: "For what it\'s worth, {person} has done the work. People I trust say so."'],
    atDoor:   ['{floor} had a word with {them} at the gate. {they:cap} left. Nobody followed.',
               'You asked {person} to leave. {they:cap} said something on the way out. Nobody followed.']
  }
};
