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
      KIDS:   ['hi! someone at the last show said you\'re doing the booking now. we\'ve played six shows so far and we\'d be happy to open anything, but it has to be all ages because two of us are 17',
               'are you booking now? we\'re {band} and we\'ll play pretty much anything. if the room doesn\'t have a drum set we can bring ours'],
      MIDDLE: ['we\'ve been itching to play and we\'ll take whatever you\'ve got. if it\'s at {room} we can bring the drums too, the kit\'s been living in the truck since our last show.',
               'Heard you\'re doing the booking now. {band} is around all spring and nobody\'s working weekends, so put us on something whenever you\'ve got a spot.'],
      OLD:    ['I heard you took over the booking. {band} is still playing a few times a year. Weekends are easier for us since we\'ve all got jobs, but let us know if something comes up.',
               'So you\'re the one doing the shows now? We\'d be glad to play one of yours sometime. We don\'t need much, just a PA and somewhere to plug in.']
    },
    ASK_YES: {
      KIDS:   ['yes, we\'re in! (%30: and we can bring the kit if you need it.)', 'yes, we\'ll be there {dow}! everybody already said they can make it'],
      MIDDLE: ['Yeah, we\'re in. What time\'s load-in?', 'We\'re in. I checked with everybody and {dow} the {date:ord} works for all of us.'],
      OLD:    ['We can do that. Just tell me when and where and we\'ll be there.', 'Yes, we\'ll do it. Send me the load-in time when you have it.']
    },
    ASK_YES_IF: {
      KIDS:   ['yes, if we can go on before 10. our drummer\'s mom picks him up at 10 and she won\'t wait', 'yes, but only if somebody can lend us a bass amp, ours died at practice'],
      MIDDLE: ['Yes, as long as we\'re not first. Our bass player works till 7:45 and can\'t get there much before 8:15.', 'We\'re in if there\'s at least gas money in it for us. ({fee:money} is fine.)'],
      OLD:    ['Yes, as long as we\'re done by 11. A couple of us work Saturday mornings.', 'We\'ll do it if there\'s somewhere to park the van close to the door. My back isn\'t what it was.']
    },
    ASK_NO_BUSY: {
      KIDS:   ['we can\'t that weekend, our singer has a family thing out of town. ask us next time though', 'sorry, we can\'t that week. it\'s finals and none of us are allowed out'],
      MIDDLE: ['We can\'t, our bassist is out of town that whole week. Ask us for the next one?', 'Sorry, we\'re already playing out of town that weekend and we can\'t do both.'],
      OLD:    ['Can\'t do that night, I\'m working.', 'We can\'t make that weekend. Try us for the next one, though.']
    },
    ASK_NO_PLAYED_OUT: {
      KIDS:   ['we\'ve played four times this month already and we should probably take a break before people get sick of us', 'we\'ve played that same room so much lately. maybe ask us again in a month or two'],
      MIDDLE: ['We\'ve played a lot lately, and people are going to stop coming out if we\'re on every bill in town.', 'We\'re going to sit this one out. We\'re already on three bills this month.'],
      OLD:    ['We\'ve played too much lately. People need to miss us a little before we do another one.', 'We\'ll pass this time. We just played a couple of weeks ago.']
    },
    ASK_NO_BILL: {
      KIDS:   ['i don\'t know if we fit with {touring}. they\'re kind of a different thing and their crowd won\'t know who we are', 'honestly we\'d be the weird band on that bill, everybody else sounds nothing like us'],
      MIDDLE: ['I\'m not sure we fit with {touring}. Their crowd is going to walk out to the parking lot the minute we start.', 'I don\'t think that\'s the right bill for us, but ask us for the next one.'],
      OLD:    ['That\'s not really our crowd, so we\'ll pass. Thanks for thinking of us, though.', 'We\'d be the odd ones out on that bill, and nobody would stay for us.']
    },
    ASK_NO_ROOM: {
      KIDS:   ['we can\'t do {room}, it\'s 21+ and two of us are 18', 'we can\'t, our drummer\'s parents won\'t let them go to {room}. they heard something about it once'],
      MIDDLE: ['We don\'t play {room} anymore. It\'s a long story and it\'s nothing to do with you.', 'Not at {room}, sorry. Anywhere else and we\'d say yes.'],
      OLD:    ['We stopped playing {room} a few years ago.', 'Not that room.']
    },
    ASK_NO_LIST: {
      KIDS:   ['sorry, we can\'t play that one. it\'s not about you and i\'d rather not get into it', 'we\'re going to pass on that bill, sorry. ask us for something else'],
      MIDDLE: ['We\'re not going to play that bill. I\'d rather not say why.', 'We\'ll pass on that one. It\'s not about you or the room.'],
      OLD:    ['We won\'t play that bill. Ask me in person if you need to.', 'No on that one.']
    },
    WANT_SHOW: {
      KIDS:   ['hey, can we play something soon? we wrote new songs and we really want to try them out somewhere', 'we have three new songs and nowhere to play them'],
      MIDDLE: ['hey we got a new drummer and are itching to play. any chance you got something in {month|the spring}. we\'ll play first we don\'t care',
               'Put us on something when you can. We\'ve been practicing twice a week and we\'re ready.'],
      OLD:    ['If you have a weekend coming up, we\'d play it.', 'We\'d like to play one of yours sometime. No rush, we\'re not going anywhere.']
    },
    WANTS_MONEY: {
      KIDS:   ['could we maybe get gas money this time? it\'s forty minutes each way from {town} and my mom\'s car eats gas', 'is there any money for this one? we\'re trying to save up for a van'],
      MIDDLE: ['We need to start getting paid something, even if it\'s {fee:money}. We\'re not kids anymore and the practice space costs us every month.', 'Can we at least get gas this time? We\'ve been playing for free for about a year now.'],
      OLD:    ['We\'d want {fee:money}. That\'s what we get everywhere else, and it\'s not much once it\'s split four ways.', 'Sorry, but we don\'t play for nothing anymore. We did that for fifteen years.']
    },
    NEW_MEMBER: {
      KIDS:   ['we have a new {instrument|member}, it\'s {newMember}, and they\'re so good. they learned all our songs in a week', '{newMember} is in the band now. they know all the songs already'],
      MIDDLE: ['Our new {instrument|member} is {newMember}. Same songs, but we\'re playing them a lot faster now.', '{newMember} joined the band and honestly we\'re better now. Book us and you\'ll see.'],
      OLD:    ['{newMember} is playing with us now.', 'We have a new {instrument|member}, {newMember}. You might know them from the old days.']
    },
    MEMBER_LEFT: {
      MOVED:  ['{member} got a job in {town}, so we\'re looking for somebody. Let us know if you hear of anyone.', 'Our {instrument|drummer} moved to {town} last week. We\'re still figuring out what we\'re going to do.'],
      ORDERS: ['{member} got orders for {town}, so we\'ve got about six weeks left as a band.', '{member} ships out next month. We\'re doing one more show and then we\'ll see.'],
      SCHOOL: ['{member} is going to college in {town} in August.', '{member} starts school in the fall, and it\'s far away. We\'ll see what happens after that.'],
      LIFE:   ['{member}\'s taking some time off because the baby\'s due in the spring.', '{member} has to take care of their mom for a while, so we\'re on hold until that settles down.'],
      KICKED: ['We kicked {member} out. They never came to practice, and honestly it\'s better without them.', '{member} isn\'t in the band anymore. It was time, and nobody\'s mad about it.']
    },
    BROKE_UP: {
      KIDS:   ['so we broke up. it\'s ok, we\'re all still friends, mostly', 'we\'re done as a band, but {member} is already starting something new'],
      MIDDLE: ['Yeah, we\'re done. Our last show\'s the {date:ord} if you want to book it.', 'We broke up. Thanks for every show you put us on, really.'],
      OLD:    ['We\'re finished. Thanks for having us all those times.', 'That\'s it for us. We had a good run, longer than most bands get.']
    },
    LAST_SHOW: {
      KIDS:   ['it\'s our last show ever and we really want it to be one of yours. please', 'we want our last show to be at {room}. can you make that happen'],
      MIDDLE: ['We want our last show to be one of yours. Pick the room and we\'ll bring everybody we know.', 'It\'s our last show, so {dow} the {date:ord} if you can do it. We\'d like it to be a big one.'],
      OLD:    ['We want to do one last show, and we\'d like you to be the one to book it.', 'This is the last one, so somewhere people can stand at the back. Our old crowd doesn\'t do the front anymore.']
    },
    HIATUS: {
      KIDS:   ['we\'re taking a break for a while because of school', 'we\'re on a break, we didn\'t break up. it\'s just a break'],
      MIDDLE: ['We\'re taking a break for a bit. We\'ll let you know when we\'re ready again.', 'We\'re going quiet for a while. Everybody\'s worn out from this last year.'],
      OLD:    ['We\'re taking some time off.', 'We\'re not going to be playing for a while.']
    },
    BACK: {
      KIDS:   ['we\'re back! can we play something?', 'we\'re a band again! same songs plus some new ones'],
      MIDDLE: ['We\'re playing again. Can you put us on something?', '{band} is back together. We\'ve got new songs, and somehow it\'s the same van.'],
      OLD:    ['We\'re playing again after twelve years. Everybody we used to know is going to come out for this.', 'We\'re back. Book us whenever you have a weekend open.']
    },
    THANKS_AFTER: {
      KIDS:   ['thank you so much. can we play again? we have a new song about the bridge', 'that was the best show we\'ve ever played thank you'],
      MIDDLE: ['Thanks for {dow}. That was a good one, we\'re still talking about it.', 'Thanks for putting us on. That was a good night.'],
      OLD:    ['Thanks for that. Good night, and we\'d do it again.', 'Appreciate it. That was a well-run night.']
    },
    AFTER_TOUR: {
      KIDS:   ['we\'re home! the van\'s going to smell like a gas station forever. thank you for helping with the tour', 'we made forty dollars each and it was the best week of our lives'],
      MIDDLE: ['We just got back from {town}. They put us second to last on a Friday, which never happens for us. Thank you.', 'Tour\'s done. We made gas money and some friends, which is more than we expected. Thank you for routing it.'],
      OLD:    ['We\'re back. It was a good run, and the {town} night was the best one.', 'We\'re home. Thank you for setting it up.']
    }
  },

  /* An owner holding a night for the player until the room has what it asks for (then it is booked, no second ask). */
  holdUntil: ['I\'ll hold the {date:ord} for you.', 'The {date:ord} is yours if you want it.'],

  /* Room owners by OWNER kind. Slots: room, date, dow, curfew, amount, booker. */
  owner: {
    HOST: {
      HELLO:         ['I heard you\'re doing the shows now. That\'s fine, same rules as before. Everybody\'s done by {curfew}.', '{outgoing|The last booker} said you\'d write. Same rules as before: people park on the street and everybody\'s done by {curfew}.'],
      HOLD_YES:      ['The {date:ord} is fine. Done by {curfew}, and tell people to park on the street because the neighbor gets mad about his yard.', 'You can have the {date:ord}. Just keep people out of the back bedroom, my roommate\'s stuff is in there.'],
      HOLD_NO:       ['[?date: I can\'t do the {date:ord}, my sister\'s in town that weekend. | I can\'t do that night, my sister\'s in town that weekend.]', 'Not that weekend. We\'ve had people over every weekend this month and we need a break.'],
      HOLD_SECOND:   ['Somebody already asked about the {date:ord}, but if they drop it, it\'s yours.', '{booker} asked me first. If they let it go, you\'re next.'],
      CONFIRM_YES:   ['ok', 'Fine, the {date:ord}. Just make sure it\'s done by {curfew}.'],
      CONFIRM_NEEDS: ['Before I say yes I want to know who\'s playing.', 'I need to meet you before I say yes. Come by the house some afternoon.'],
      AFTER_GOOD:    ['That was fine. You can have another one whenever.', 'That was a good night. The touring band swept up before they left, so you can come back anytime.'],
      AFTER_BAD:     ['That can\'t happen again, not at my house. I have to live next to these people.', 'The neighbors came over this morning to talk to me about last night. I need a few months off from shows.'],
      AFTER_LATE:    ['It went past {curfew}. I told you {curfew}, and I\'m the one who has to hear about it.', 'When I say done by {curfew}, I mean done by {curfew}. The neighbors were out on their porch.'],
      CLOSING:       ['We\'re moving out in the summer because the landlord\'s selling the house.', 'We\'re done hosting. It was good, but it\'s been a lot, and we want our weekends back.'],
      LAST_SHOW:     ['The last show at the house is yours if you want it.', 'We want to do one more before we go, and we want you to book it.'],
      NEVER_THANKED: ['You never said thanks after last time. I noticed, and so did my roommate.', 'A thank-you would have been nice after last time. We were cleaning up for two hours.']
    },
    BAR_OWNER: {
      HELLO:         ['You\'re the new one? Fine. I\'ve got Thursdays open. The bar keeps what the bar makes and you keep the door, that\'s how it\'s always worked here.', 'If you\'re the one booking now, I\'ve got weeknights. Weeknights are dead in here anyway.'],
      HOLD_YES:      ['You can have the {date:ord}. Tell your bands the back lot is for the delivery trucks till 9, and I mean it this time.', '{dow}\'s yours. Have them load in through the side door so they\'re not dragging amps past people eating.'],
      HOLD_NO:       ['[?date: {dow} the {date:ord} is a private party. Somebody rented the whole place. | That night is a private party. Somebody rented the whole place.]', 'Not that night, I\'ve already got a band in.'],
      HOLD_SECOND:   ['{booker} has a hold on that night. If it falls through I\'ll let you know.', 'You\'re second on the {date:ord}. Somebody got to me first.'],
      CONFIRM_YES:   ['Okay, you\'re confirmed. Doors at 9.', 'You\'re on the calendar for the {date:ord}.'],
      CONFIRM_NEEDS: ['Who\'s the touring band and who\'s local? I need both before I put it up.', 'Get a local band on it and it\'s confirmed. Out-of-town bands don\'t bring anybody in here on their own.'],
      AFTER_GOOD:    ['Bar did well. You can have any Thursday you want, just call me first.', 'Nobody fought and the bar did fine, so you can have another one.'],
      AFTER_BAD:     ['The bar did nothing all night. I paid two bartenders to stand there, and I can\'t do another one of those.', 'Somebody got in a fight out in the lot. I don\'t need the cops coming by here, I\'ve got a license to think about.'],
      AFTER_LATE:    ['We close at 2, and your last band didn\'t go on till 1:15. I was turning the lights up during their set.', 'It ran long. My staff stayed an hour late and there was nobody left to buy anything.'],
      CLOSING:       ['We sold the bar. The new people want to put TVs where the stage is.', 'We\'re closing at the end of the month, the lease went up again. Thanks for everything you brought in.'],
      LAST_SHOW:     ['There\'s time for one more show before we close. Make it a good one, I want the place full one more time.', 'The last night we have music is yours if you want it.'],
      NEVER_THANKED: ['You never came back to settle up properly last time. I\'m still waiting on that.', 'I haven\'t heard a word from you since the last one.']
    },
    HALL_MANAGER: {
      HELLO:         ['The hall rents for {amount:money}, in cash. If you sweep up and take your trash with you, you\'re welcome back.', 'The members\' bar closes at 9 for your people, and nobody under 21 goes on that side at all.'],
      HOLD_YES:      ['I can pencil you in for the {date:ord}. It\'s held once I have the deposit.', 'The {date:ord} is open. Bring the deposit by the office during the week and I\'ll write you down.'],
      HOLD_NO:       ['We have a wedding reception that Saturday.', 'We have a members\' meeting that night. You\'ll have to pick another date.'],
      HOLD_SECOND:   ['Somebody\'s already penciled in for that night. If they don\'t bring the deposit, it\'s yours.', 'There\'s a hold on that date already. I\'ll call you if it opens up.'],
      CONFIRM_YES:   ['I have your deposit, so you\'re on the calendar.', 'You\'re confirmed for the {date:ord}. I need everyone out and the floor swept by {curfew}.'],
      CONFIRM_NEEDS: ['The deposit is {amount:money}, in cash, before I confirm.', 'I\'ll need the deposit before I can put you down.'],
      AFTER_GOOD:    ['The floor was swept and nobody went into the members\' bar. You\'re welcome back any time.', 'I don\'t know what that music is, but you\'ve never once left a mess.'],
      AFTER_BAD:     ['Some of the members are upset about the other night. I\'ll need to think about it before I rent to you again.', 'Somebody from your show went into the members\' bar. I asked you for one thing.'],
      AFTER_LATE:    ['You were out forty minutes past {curfew}, and I had to stay to lock up.', 'The building is supposed to close at {curfew}. I didn\'t get it locked until well after.'],
      CLOSING:       ['The lodge is selling the building. Our last events will be in the spring.', 'We\'re not renting the hall out anymore. The insurance went up and the members voted against it.'],
      LAST_SHOW:     ['We\'d like to have one last event before we close, and you\'ve always been good to us.', 'If you want the last night, it\'s yours.'],
      NEVER_THANKED: ['A note after the last one would have been courteous.', 'You didn\'t call after the last one. Most people call.']
    },
    SHOP_OWNER: {
      HELLO:         ['You can have the board. Don\'t cover my sale sign.', 'You\'re the new booker? Flyers go on the left side of the counter.'],
      HOLD_YES:      ['The afternoon of the {date:ord} is fine. Be done by 6, I close at 7.', 'An in-store\'s fine on the {date:ord}. Keep it under an hour or people stop shopping.'],
      HOLD_NO:       ['Can\'t that day, I\'m doing inventory.', 'Not that weekend, I\'m having a big sale and there won\'t be room to stand.'],
      HOLD_SECOND:   ['Somebody already asked about the {date:ord}. Let me see what they do.', 'Maybe. Somebody else asked first.'],
      CONFIRM_YES:   ['Fine, the {date:ord}.', 'You\'re on. Tell the people who come to buy something while they\'re here.'],
      CONFIRM_NEEDS: ['Ask nicely and bring me the flyer first.', 'Who\'s playing? I want to hear them before I say yes.'],
      AFTER_GOOD:    ['I sold eleven records that afternoon. Do it again.', 'That was a good one. People stayed after and went through the bins.'],
      AFTER_BAD:     ['Somebody knocked over the cassette rack and nobody picked it up. Let\'s wait a while.', 'Nobody bought anything. Not one record.'],
      AFTER_LATE:    ['I close at 7, and it was 7:40 before the last of them left.', 'It ran long and I missed dinner.'],
      CLOSING:       ['I\'m closing the shop in the spring. Lease is up and I\'m tired.', 'The shop\'s done at the end of the month. Come get the flyers off the board.'],
      LAST_SHOW:     ['Last day of the shop. Want to do a show in it?', 'Let\'s do one more in-store before I close.'],
      NEVER_THANKED: ['You didn\'t even come back to take the flyers down.', 'I haven\'t seen you in here since.']
    },
    CHURCH_CONTACT: {
      HELLO:         ['As far as anybody\'s concerned, this is a youth music night. Which it is.', 'The fellowship hall is free some evenings. There can\'t be any alcohol, and it has to be over by 9.'],
      HOLD_YES:      ['The {date:ord} works. Please make sure it\'s done by 9.', 'You can have the hall that evening. Nothing on the flyer I\'d have to explain.'],
      HOLD_NO:       ['There\'s a supper that night.', 'Not that week, we have a revival going every night.'],
      HOLD_SECOND:   ['Another group asked about that evening.', 'Let me check, I think someone else asked about it.'],
      CONFIRM_YES:   ['It\'s on the calendar as a youth night.', 'That\'s confirmed. Thank you for being careful about all this.'],
      CONFIRM_NEEDS: ['I\'d like to see the flyer before it goes out.', 'If there\'s no swearing on the flyer, I\'ll confirm it.'],
      AFTER_GOOD:    ['Nobody complained. Some of the young people asked when the next one is.', 'That went well, and as far as I know the pastor didn\'t hear a thing.'],
      AFTER_BAD:     ['Somebody told the pastor, so I can\'t do another one. I\'m sorry.', 'I had to answer some questions after service this morning.'],
      AFTER_LATE:    ['It went past 9, and people at the church noticed.', 'I did say 9. It was almost 10 when the last car left.'],
      CLOSING:       ['The church needs the hall back. It was nice while it lasted.', 'We have a new pastor, and there won\'t be any more music nights.'],
      LAST_SHOW:     ['One more, quietly, if you\'d like.', 'Let\'s do one last one before things change here.'],
      NEVER_THANKED: ['A thank-you note to the church would go a long way.', 'You didn\'t say anything after the last one. People here notice that kind of thing.']
    },
    LANDLORD: {
      HELLO:         ['I rent it as storage. What you store is your business. Don\'t make it my business.', 'Rent\'s due on the first. Whatever happens in there, I don\'t want to know about it.'],
      HOLD_YES:      ['Fine. Just don\'t call me about it.', 'Whatever you want. Just keep it quiet.'],
      HOLD_NO:       ['Not that night, I\'ve got somebody coming to look at the unit.', 'No, the inspector\'s coming out that week.'],
      HOLD_SECOND:   ['The other kids asked me first.', 'Somebody else has it that night.'],
      CONFIRM_YES:   ['Yeah, fine. Lock up after.', 'Fine.'],
      CONFIRM_NEEDS: ['Somebody I know has to vouch for you.', 'I don\'t know who you are. Have somebody I know tell me you\'re fine.'],
      AFTER_GOOD:    ['I didn\'t get any calls. Good.', 'Nobody called me. That\'s all I want.'],
      AFTER_BAD:     ['I got a call about your thing. I told you I don\'t want calls.', 'The fire marshal was asking about my unit. Don\'t put me in that spot again.'],
      AFTER_LATE:    ['The guy next door said it went till 2.', 'It went too late and somebody complained to me.'],
      CLOSING:       ['I\'m selling the building.', 'The unit\'s done. My insurance found out.'],
      LAST_SHOW:     ['Do one more before the sale if you want, but keep it quiet.', 'That\'s the last one, and then I need your stuff out.'],
      NEVER_THANKED: ['You still owe me for the light bill.', 'You didn\'t lock up last time. I found the door open on Monday.']
    },
    TALENT_BUYER: {
      HELLO:         ['We\'d want 60 through the door to make it work on a Friday. Can you get me 60?', 'Send me what you\'ve got. I book about six weeks out, so anything sooner than that is hard.'],
      HOLD_YES:      ['I can hold the {date:ord} for you for two weeks. After that I have to release it.', 'I\'ve penciled you in. I\'ll need a confirmed bill by the end of the month.'],
      HOLD_NO:       ['Sorry, that date\'s gone.', '[?date: We have a national act on the {date:ord}. | We have a national act that night.]'],
      HOLD_SECOND:   ['You\'re second hold on the {date:ord}.', 'There\'s already a first hold on it. If you want to confirm, I\'ll challenge it for you.'],
      CONFIRM_YES:   ['You\'re confirmed. I\'ll put it up on the marquee.', 'You\'re on. Tickets go up Monday morning.'],
      CONFIRM_NEEDS: ['Full bill before I confirm. And I need to see your last three numbers.', 'Once the bill is locked, you\'re confirmed.'],
      AFTER_GOOD:    ['We did our numbers on that one. Good night. Let\'s talk about doing more.', 'That beat the house average. Send me another one.'],
      AFTER_BAD:     ['That came in under what we needed to make the night work.', 'We lost money on that one, once you count staff and sound.'],
      AFTER_LATE:    ['The curfew is in the contract for a reason. We pay the staff by the hour.', 'You ran past {curfew}, and that costs us money.'],
      CLOSING:       ['The club\'s been sold. Last shows are next month.', 'We\'re closing for renovations, and nobody can tell me for how long.'],
      LAST_SHOW:     ['Do you want one of the last nights before we close?', 'The last weekend\'s still open. It\'s yours if you want it.'],
      NEVER_THANKED: ['You never sent the settlement sheet back.', 'I didn\'t hear from you after the show. The people I keep booking are the ones who follow up.']
    }
  },

  crew: {
    SOUND: {
      YES:       ['[?amount: I\'ll do it for {amount:money}, and I\'m not doing four bands for that, so keep the bill to three. | I\'ll do it as a favor, but I\'m not doing four bands, so keep the bill to three.]', 'yeah i can do it. i\'ll be there by 6, probably more like 6:15 because i have to grab the snake from my brother\'s'],
      NO:        ['Can\'t that night, sorry.', 'not that one, sorry. ask me for the next'],
      NO_BOOKED: ['can\'t do the {date:ord}, i\'ve got a paid wedding that night. my friend can do it and they\'re fine, they\'re just not me.', 'I\'m already booked that night on somebody else\'s show.'],
      RETIRING:  ['I\'m not doing it anymore, my back can\'t take loading the subs. Call {newMember|someone}, I taught them everything.', 'I\'m done running sound. It\'s been fifteen years of carrying speakers up stairs. Here\'s who to call.']
    },
    SECURITY: {
      YES:       ['[?amount: For {amount:money} I\'ll stand by your door table all night and make sure nobody gets weird. | I\'ll stand by your door table all night and make sure nobody gets weird.]', 'I can do it. I\'ll be there when doors open. I don\'t need to be in anybody\'s way, I just need people to see me.'],
      NO:        ['Sorry, I can\'t that night.', 'Not this one, I\'m working a wedding that night.'],
      QUIET:     ['Quiet one. I walked the lot twice and nobody needed me all night.', 'Nothing to report. I stood by the door and said hi to everybody, and nobody tried anything.'],
      HANDLED:   ['I had to walk one guy out. He went easy and the band never stopped playing.', 'A couple of people tried to come in the side door, so I sent them around to you to pay.']
    }
  },

  /* Helpers by ROLE. Slots: route, spots, show, band, reason, skipped, amount. */
  helper: {
    RUNNER: {
      YES:             ['yeah i\'ll do {route}. i\'m out that way anyway', 'I can do the poster run Tuesday after work.'],
      NO:              ['can\'t this week, sorry. i\'m working doubles', 'Not this time, I\'ve got work every day this week.'],
      NO_TASTE:        ['not really my kind of show. ask me for the next one', 'I\'d rather not have my name anywhere near that bill. Nothing personal.'],
      DONE:            ['Got flyers up at {spots}, so that\'s everything on the list.', 'Did {route}, every spot on it.'],
      DIFFERENT:       ['Did {route}, but I skipped {skipped}, {reason}.', 'Did it Tuesday instead of Monday because the copy place was closed.'],
      NOT_DONE_TOLD:   ['I didn\'t get to it, my car wouldn\'t start. Sorry.', 'i didn\'t do the run and i\'m really sorry. i\'ll do the next one, i promise'],
      NOT_DONE_SILENT: ['(you found out at the door)', '(nobody mentioned it until somebody said they never saw a flyer)'],
      OPINION:         ['People at the laundromat always ask me about the shows while I\'m putting them up. We should put more there.', 'The record store board is so full that nobody reads past the top layer anymore.'],
      OFFER:           ['can I do posters? I\'m on that side of town every day anyway', 'If you ever need flyers up, I drive past everything.']
    },
    ARTIST: {
      YES:             ['yeah i\'ll make it. give me till {show}', 'I\'ll do the flyer. Send me the bill and the date when you\'ve got them.'],
      NO:              ['too busy this week, sorry', 'I can\'t this week, I\'ve got a deadline at work.'],
      NO_TASTE:        ['i don\'t really know how to draw for that kind of band', 'Not my kind of flyer. Ask me for the next one.'],
      DONE:            ['The flyer\'s done, I just sent it to you.', 'Here\'s the flyer. Tell me if you hate it.'],
      DIFFERENT:       ['I did it in my own style instead of what you asked for. Trust me on this one.', 'I changed the colors, the ones you picked were kind of sad.'],
      NOT_DONE_TOLD:   ['i couldn\'t finish it, i\'m sorry. you should probably just do it yourself', 'I didn\'t get to finish it, sorry. Do you want what I have so far?'],
      NOT_DONE_SILENT: ['(the flyer never came)', '(no flyer, no message)'],
      OPINION:         ['Your flyers are too busy. Pick one thing and make it big, people only look for a second.', 'The flyers people actually share are the ones with a drawing on them.'],
      OFFER:           ['i could make your flyers sometime if you want', 'I draw. I\'d do a flyer for you if I can get on the list.']
    },
    FLOOR: {
      YES:             ['I\'ll be the one people find if something\'s wrong.', 'yeah i\'ll keep an eye on things'],
      NO:              ['Can\'t be there that night.', 'i can\'t do this one, sorry'],
      NO_TASTE:        ['I\'d rather not be at that one.', 'Not my kind of night.'],
      DONE:            ['It was a quiet night, nothing to report.', 'I kept an eye out all night and everybody was fine.'],
      DIFFERENT:       ['I had to step outside for a while, but nothing happened while I was gone.', 'I ended up doing the door for an hour too. Hope that\'s fine.'],
      NOT_DONE_TOLD:   ['I couldn\'t make it. I\'m sorry.', 'i didn\'t make it, something came up at home. sorry'],
      NOT_DONE_SILENT: ['(nobody was there to find)', '(you looked for them at 10. They weren\'t there.)'],
      OPINION:         ['You need somebody at the gate after 10. That\'s when people who weren\'t even at the show start wandering in.', 'You should put "find {show|me} if anything\'s wrong" on the flyer so people know who to look for.'],
      OFFER:           ['If you need someone people can find, I\'ll do it.', 'I\'m at every show anyway, so I can be the person people come find.']
    },
    LODGING: {
      YES:             ['They can stay with me. I\'ve got floor space for five if somebody takes the couch.', 'yeah send them over. i have a couch and a dog'],
      NO:              ['Can\'t this time, my roommate\'s back from out of town.', 'not this week, sorry'],
      NO_TASTE:        ['I\'d rather not host that band.', 'Not that band. Ask somebody else.'],
      DONE:            ['They were lovely. One of them did my dishes. Send me more like that.', 'They were gone before 9 and they folded the blankets.'],
      DIFFERENT:       ['I only had room for three of them, so two slept in the van.', 'They ended up staying with my neighbor. Long story, but it was fine.'],
      NOT_DONE_TOLD:   ['Sorry, can\'t host after all. Something came up.', 'my landlord\'s around this weekend so i can\'t, sorry'],
      NOT_DONE_SILENT: ['(the band texted you at 1 a.m. from a locked door)', '(nobody answered the door)'],
      OPINION:         ['Tell bands to bring sleeping bags, I\'m out of blankets.', 'The ones who ask what they can bring are always the good ones.'],
      OFFER:           ['If a band ever needs a floor, I have one.', 'I have a spare room now, so bands can stay with me.']
    }
  },

  /* Other bookers by BOOKER kind. Slots: room, date, band, genre, dow. */
  booker: {
    GENRE: {
      HELLO:           ['You\'re the new one? I\'ve done {dow}s at {room} for years. Don\'t book against my {dow}s and we\'ll get along fine.'],
      CLASH:           ['You booked a show on my {dow}. I\'m not mad about it, I just want you to know that\'s been my night for a long time.', 'Heads up, I\'ve got a {genre} bill the same night as yours. Want to stagger times?'],
      RELEASE_YES:     ['I\'m not using the {date:ord}, so go ahead and take it.'],
      RELEASE_NO:      ['Sorry, I\'ve already got something on it.'],
      CHALLENGE:       ['I want the {date:ord} at {room}. Either confirm it or let it go so I can have it.'],
      LOST_RACE:       ['You got {band}? Fine. I\'d have put them on a Saturday, for what it\'s worth.'],
      WON_RACE:        ['I got {band}. Nothing personal, they wrote me first.'],
      SHARE_BILL:      ['You get the touring band, I\'ll bring my crowd, we split it.'],
      TREND:           ['Every band that writes me lately sounds like this.', 'That band\'s drummer is leaving. Don\'t book them for the spring.'],
      ASKS_ABOUT_BAND: ['You had {band} the other week. Were they worth it?']
    },
    TALENT_BUYER: {
      HELLO:           ['I\'ve seen your numbers. If you can get me 60 on a Friday, we should talk.'],
      CLASH:           ['We have a show that same night, and our crowd overlaps with yours.'],
      RELEASE_YES:     ['I\'ll release the {date:ord}, so it\'s yours.'],
      RELEASE_NO:      ['We\'re holding the {date:ord} for an agency avail.'],
      CHALLENGE:       ['We have an offer for the {date:ord}. Can you confirm by Friday?'],
      LOST_RACE:       ['You got {band}. We offered them more, for what it\'s worth.'],
      WON_RACE:        ['{band} took our offer. The agent wanted a ticketed room.'],
      SHARE_BILL:      ['Bring one of your bands in as support on our show. It pays fifty dollars and drink tickets.'],
      TREND:           ['Agents are pushing a lot of this lately.'],
      ASKS_ABOUT_BAND: ['What did {band} actually do for you? I need real numbers.']
    },
    ANYWHERE: {
      HELLO:           ['Oh, you\'re doing shows now? Cool. Let\'s not step on each other.'],
      CLASH:           ['You know I have a show that night, right?'],
      RELEASE_YES:     ['Sure, take the {date:ord}. You owe me one.'],
      RELEASE_NO:      ['I\'m using that one.'],
      CHALLENGE:       ['I want the {date:ord}. Are you confirming or not?'],
      LOST_RACE:       ['Oh, you got them? I talked to them first. No, it\'s fine.'],
      WON_RACE:        ['They went with me. You can have the next one.'],
      SHARE_BILL:      ['Want to do one together? We split everything down the middle.'],
      TREND:           ['Three bands in town sound like this now. Is this a thing?'],
      ASKS_ABOUT_BAND: ['Did {band} draw for you? They wrote me too.']
    },
    KID: {
      HELLO:           ['hi! i do shows at the skate shop sometimes. how do you get touring bands to write you. like how did that start'],
      CLASH:           ['oh no we\'re on the same night. should i move mine'],
      RELEASE_YES:     ['yeah take it! i wasn\'t going to use it anyway'],
      RELEASE_NO:      ['i kind of need it, sorry. my friends\' band is playing'],
      CHALLENGE:       ['um are you using the {date:ord}? i wanted it for a show'],
      LOST_RACE:       ['aw, you got {band}. that\'s ok, can i come?'],
      WON_RACE:        ['{band} said yes to me! i can\'t believe it'],
      SHARE_BILL:      ['would you want to do a show together? i have the kids, you have the bands'],
      TREND:           ['everybody at school\'s into {genre} now', '{band} is doing a whole show of it at the skate shop.'],
      ASKS_ABOUT_BAND: ['is {band} good? should i book them']
    },
    OLD: {
      HELLO:           ['We used to do shows in a lodge hall until a kid put his foot through the ceiling in \'97. It\'s a tire shop now, and I\'d bet you the ceiling\'s still like that.'],
      CLASH:           ['I\'ve got one show a year and it\'s that night. I picked it in January.'],
      RELEASE_YES:     ['Take it. I don\'t do much anymore.'],
      RELEASE_NO:      ['That\'s the one night a year I still do.'],
      CHALLENGE:       ['I\'ve had that date booked for months.'],
      LOST_RACE:       ['They went with you, and they should have. I\'d have gone with you too.'],
      WON_RACE:        ['They asked me first. I\'ve known those guys twenty years.'],
      SHARE_BILL:      ['If you want the old crowd on your bill, I can bring them.'],
      TREND:           ['This\'ll pass.', 'We had this exact same thing in the ’90s. Everybody did it for about two years and then nobody did.'],
      ASKS_ABOUT_BAND: ['{band}? I booked their singer\'s first band. Ask me anything.']
    },
    PEER: {
      HELLO:           ['I book in {town}. {outgoing|The last booker} and I used to trade bands. Want to keep doing that?'],
      CLASH:           ['We\'re both after the same tour that weekend. Want to split the dates?'],
      RELEASE_YES:     ['They\'re yours that night. I\'ll take the next one.'],
      RELEASE_NO:      ['I need them that night, but you can have them on their next run.'],
      CHALLENGE:       ['I\'ve got a band from out of town with a hole on the {date:ord}. Yours?'],
      LOST_RACE:       ['They picked your town this time. Good for you.'],
      WON_RACE:        ['They\'re doing my town instead. Send me your next one.'],
      SHARE_BILL:      ['Send me your best local band and I\'ll put them on a Friday.'],
      TREND:           ['Every band through here this month sounds like this.'],
      ASKS_ABOUT_BAND: ['{band} wrote me. You had them. How\'d it go?']
    },
    OUTGOING: {
      HELLO:           ['It\'s bigger up here and nobody answers anybody. I miss {room|the old rooms}.'],
      CLASH:           ['I\'ve got a band on that tour too. We can both have them.'],
      RELEASE_YES:     ['Take it. It\'s not my town anymore.'],
      RELEASE_NO:      ['I need that band here that night. Sorry.'],
      CHALLENGE:       ['I\'ve got a band with a hole between here and you. Do you want them?'],
      LOST_RACE:       ['They did your town instead of mine. Told you you\'d be good at this.'],
      WON_RACE:        ['They played for me this time. Next time through they\'ll do your town too.'],
      SHARE_BILL:      ['Send me one of your bands and I\'ll put them on a Friday.'],
      TREND:           ['Up here everybody sounds like this now. It\'ll get to you in about six months.'],
      ASKS_ABOUT_BAND: ['You ever have {band}? They wrote me.']
    }
  },

  /* Contacts in other towns. Slots: band, town, booker, date, n. */
  contact: {
    VET_GOOD:       ['Good kids. They played hard and drew about {n} here.', 'They were easy. They swept up after and played hard to whoever came. I\'d have them back.'],
    VET_MIXED:      ['They showed up late but played hard, and drew about {n}.', 'They were fine, not great. Most of the people there came for the local band.'],
    VET_BAD:        ['They left my couch a mess and their singer argued with the door. I wouldn\'t.', 'They cancelled the day of the show, and then their post that night was from a party.'],
    VET_UNKNOWN:    ['I\'ve never had them, sorry.', 'I don\'t know them. You could ask somebody in {town}.'],
    SWAP_OFFER:     ['Want to trade? Put one of mine on something and I\'ll give yours a good night here.', 'I\'ve got a Friday open next month. Send me your best local band and take one of mine.'],
    SWAP_DELIVERED: ['Your band played here, second to last on a Friday, and they were good. Now it\'s my turn.', 'I put your band on like I said. They did fine and people stayed for them.'],
    SWAP_FAILED:    ['I couldn\'t get your band on after all. The room fell through. I owe you.', 'Sorry, I lost the night your band was on. I\'ll make it right.'],
    TREND_TIP:      ['Everybody up here is into the slow heavy stuff now. Give it a few months and it\'ll be you.', 'I\'ve had six bands with two drummers come through this month. You\'ll start seeing it down there.'],
    SHARE_YES:      ['I shared it, so my people will see it.', 'Posted it. A few of mine said they\'d drive down.'],
    TOUR_YES:       ['Yes, I\'ll put them on the {date:ord}. It\'s a door deal and they can sleep on my floor.', 'I\'ll take them. Tell them to be here by 7.'],
    TOUR_NO:        ['I can\'t that night. Next time, though.', 'I don\'t have a room that week. Sorry.'],
    OUTGOING: {
      SETTLING: ['It\'s bigger up here and nobody answers anybody. I miss your shows.', 'I\'m doing the door at a bar up here now. It\'s fine, it\'s just a lot of people every night.'],
      NUDGE:    ['Forwarding you everything. Most of it\'s junk. The ones from the peer towns are real. Don\'t let anybody talk you into a Saturday guarantee your first year.',
                 'Heard {dow|it} went good, I told you it would. One thing: don\'t put a guarantee on a holiday weekend. You\'ll see why.'],
      ASKING:   ['I\'ve got a band with a hole between here and you. Do you want them?', 'Send me one of your bands and I\'ll put them on a Friday up here.']
    }
  },

  /* Regulars by REGULAR_TYPE. Slots: room, dow, band, town, month, storyName. */
  regular: {
    EVERYTHING:    { HELLO: ['Wouldn\'t miss one of yours.', 'Same spot as always.'],
                     DRIFTING: ['I haven\'t made it out lately, work\'s been bad.', 'I\'ve missed a couple, I know. I\'ll be back.'],
                     ASKED_WHY: ['Kind of the same bands every time lately.', 'Honestly, the last few were a lot of the same bands in the same order.'] },
    COUPLE:        { HELLO: ['We met at {storyName|one of your shows}. You probably don\'t remember.', 'We come to all of them. Well, most.'],
                     DRIFTING: ['Baby\'s due in the spring. We\'ll be back for a matinee someday.', 'We\'ve been staying in. You know.'],
                     ASKED_WHY: ['We can\'t do late nights anymore with work. If you did an early one sometime we\'d be there.', 'It\'s the late start. By the time the last band goes on we\'re half asleep.'] },
    KID_WITH_RIDE: { HELLO: ['my mom says i can go if it\'s done by 10:30', 'is the {dow} one all ages? my little brother wants to come and he won\'t stop asking'],
                     DRIFTING: ['i can\'t get rides as much anymore', 'my mom said no more school nights'],
                     ASKED_WHY: ['the last few were all 21 and up, so i couldn\'t get in', 'the last ones went too late and my ride had to leave before the last band'] },
    SAILOR:        { HELLO: ['first show since I got stationed here. this is the best thing in this town.', 'I\'m only stationed here another year, so I\'m not missing any of these.'],
                     DRIFTING: ['I\'ve got duty most weekends now.', 'They\'ve got me working a lot of nights on base.'],
                     ASKED_WHY: ['I got orders and I\'m out next month. There\'s nothing like this where I\'m going.', 'My schedule changed and I don\'t get weekends anymore.'] },
    NIGHT_SHIFT:   { HELLO: ['I can only do Sundays and Mondays.', 'I got off at 7 and came straight here.'],
                     DRIFTING: ['They put me on weekends at work.', 'I can\'t make Fridays anymore.'],
                     ASKED_WHY: ['If you did a Sunday sometime, you\'d get half the kitchens in town. That\'s our night off.', 'Everything you do is on a Friday, and I work Fridays.'] },
    OLD_HEAD:      { HELLO: ['Haven\'t been out this much in years. Thanks for that.', 'Saw the poster at the record store and took one home. It was on my fridge all month.'],
                     DRIFTING: ['I didn\'t see a thing about the last couple anywhere.', 'I\'m getting old, and I like being home earlier than I used to.'],
                     ASKED_WHY: ['I look at the board at the record store every Saturday, and there was nothing on it for your last few.', 'It\'s been all kids\' bands lately, and that\'s not really my thing.'] },
    OUT_OF_TOWNER: { HELLO: ['It\'s an hour drive, but it\'s worth it.', 'Came in from {town} and brought two friends with me.'],
                     DRIFTING: ['Gas is too much to drive in every week, you know.', 'There\'s a few shows in {town} now, actually.'],
                     ASKED_WHY: ['Somebody started doing shows in {town}, and it\'s a lot closer for me.', 'Driving an hour back home at midnight got old.'] }
  },

  /* Gossip: what people tell you, true or not. Slots: room, band, person, town, amount, member. */
  gossip: {
    ROOM_RENT:       ['Heard {room} is raising the rent on the hall. Heard it from the bartender there, so who knows.', 'Somebody said {room} wants {amount:money} a night now.'],
    HOUSE_SELLING:   ['Somebody said the house is getting sold. They\'ve been saying that for six years.', 'Heard the landlord had a realtor over to {room}.'],
    BAND_BROKE_UP:   ['You know {band} broke up? Their bass player\'s in {town} now. They say it was the move. It was not the move.', 'I heard {band} are done, but I haven\'t heard it from them yet.'],
    NEW_BAND:        ['Some kids from {town} started a band. It\'s three of them and a drum machine they named.', '{member} is in a new thing. It\'s slower than their old band, and they have four songs so far.'],
    PERSON_MOVING:   ['Heard {person} is moving to {town}.', 'Somebody said {person} got a job in {town}.'],
    LISTED_NEW_BAND: ['Heard {person} is in a new band with some kids from {town}.', 'Somebody said {person} is playing in a new band.']
  },

  /* Scene news, told by whoever would know. Slots vary by kind: band, members, member, room, person, town, storyName. */
  news: {
    BAND_FORMED:   ['{members} started a band called {band}. (?fromShow: {member} was at {storyName}.)',
                    'New band: {band}. {members}. (?fromShow: {member} first came to {storyName}.)'],
    BAND_ENDED:    ['{band} broke up.', '{band} played their last show, and nobody\'s saying why.'],
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
      SOLD:       ['The landlord\'s selling {room}, so the last show there is in the summer.', '{room} got sold. It\'s going to be something else.'],
      RENT:       ['{room} raised the rent past what a door can pay.', '{room} is too expensive now. Nobody\'s booking it.'],
      MARSHAL:    ['Fire marshal came to {room}. It\'s done.', 'Somebody called the fire marshal on {room}, and it\'s closed.'],
      STORM:      ['{room} took two feet of water. Nobody\'s going back in there.', 'The storm took the roof off {room}.'],
      TIRED:      ['{room} is done. The people there are tired, and they said thanks for everything.', 'The people at {room} want their weekends back.'],
      COMPLAINTS: ['Too many complaints. {room} isn\'t doing shows anymore.', 'The neighbors won. {room} is closed for shows.']
    },
    PERSON_LEFT:   ['{person} moved to {town}.', '{person} moved to {town} and says to send bands up there.'],
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

  drift:  ['Haven\'t heard from you since the {season}. Thought you quit.', 'It\'s been a while. Are you still doing shows?'],
  repair: ['You paid {person} the {amount:money} from {month}. {person} said "about time" and then asked if you need them {dow}.',
           'You went to {person}\'s show and stayed for all of it. They noticed.'],

  /* People who do harm. story 8.7: who said it and how sure; never what happened; under 40 words. */
  harm: {
    tell: {
      DIRECT: {
        1: ['{teller} asked to talk after the show. "I won\'t play or go to shows {person} plays. I\'m telling you because you book {band}. Please don\'t say it was me."'],
        2: ['{teller} found you at the side door. "I don\'t feel safe at shows {person} is at. Neither does a friend of mine. I\'d rather not say more. Please keep my name out of it."'],
        3: ['{teller}: "I\'m only going to say this once. I won\'t be anywhere {person} is, and a lot of people feel the same way. I\'m telling you because you book {band}."']
      },
      TRUSTED: {
        1: ['{teller}: "Somebody told me they don\'t want to be at shows {person} is at. That\'s all I know. I\'m telling you because you book {band}."'],
        2: ['{teller}: "Two people told me they don\'t want to be at shows {person} is at. I didn\'t ask them to explain and I\'m not going to. I\'m telling you because you book {them}."'],
        3: ['{teller}: "Several people have told me the same thing about {person}, separately, without knowing the others had. I believe them, and I wanted you to hear it from me."']
      },
      BOOKER: {
        1: ['{teller}: "Quietly. We don\'t book {person} anymore. Not saying more than that. You can ask me if you need to."'],
        2: ['{teller}: "We stopped booking {person}, and so did the people in {town}. I\'m telling you because you book {band}."'],
        3: ['{teller}: "Everybody on the route has stopped booking {person}. I\'d want to know, so I\'m telling you."']
      },
      SAW_IT: {
        1: ['Your floor contact asked {person} to leave at 10:20. {they:cap} argued, then left. Your floor contact didn\'t want to say more.'],
        2: ['{teller} asked {person} to leave, and {they} left. Afterward two people came up to thank {teller}.'],
        3: ['{teller} asked {person} to leave, and {they} left. Three people came to find you afterward, separately, to say they were glad.']
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
      STRONGER:  ['{teller}: "I\'ve heard it too. From more than one person. I\'d take it seriously."', '{teller}: "Yes, I know about it, and it\'s real."'],
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
      DIDNT_KNOW: ['We didn\'t know. I need to talk to the others. Thank you for telling us and not everybody else.'],
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
    atDoor:   ['{floor} had a word with {them} at the gate, and {they} left. Nobody followed.',
               'You asked {person} to leave. {they:cap} said something on the way out, and nobody followed.']
  }
};
