/* Scene Booker — content/jobs.js   (role C2)
 * For each of the 41 job types (SB.Enums.JOB): label, token verb (at most 14 characters), card (under 25 words), the
 * real reason, and the ON_TIME / LATE / SKIPPED lines the engine renders at 'jobs.<TYPE>.<TIMING>' (02-engine 5.2).
 * Also: the priced choices of PRINT, ANNOUNCE, WEEK_PUSH and LOCAL_AD; the tick lines of the promises; flyer-run
 * staleness; helper lines; slips; room needs; the evening send and phone-off lines; familiarity.
 * Schema: design/spec/03-content.md section 6. Late and skipped lines name who was missed (story 4.2).
 * Slots: bookingName, band, bands, room, dow, date, dateLong, daysOut, daysUp, hours, priceLine, agesLine, helper,
 * route, spots, host, sound, security, closer, times, curfew, amount, cost, copies, deadline, n.
 * Flags: different, house, bar, hall, firstTime, touring, askAPunk, addressOut, paid.
 * Data only: one assignment, no functions.
 */
SB.Content.jobs = {

  /* ------------------------------------------------------------ getting the show */

  ANSWER_REQUEST: {
    label: 'Answer the request',
    verb: 'Answer',
    card: 'Write {band} back: yes, no or interested. It goes out tonight. After a week they fill the date somewhere else.',
    why: 'Bands build a route around whoever answers. A no in three days helps them more than a yes in three weeks.',
    ON_TIME: [
      'You wrote back the same week. {band} are holding the {date:ord} for you.',
      'Answered inside a few days. {band} wrote: "Thanks for getting back to us so fast, most places we write to never answer at all."'
    ],
    LATE: [
      'You answered {band} after they\'d already asked the next town over. They can still do it, but they sound less sure.',
      'Your answer reached {band} a week late. They wrote back slower than before.'
    ],
    SKIPPED: [
      'No answer from you. {band} took another town.',
      'You never wrote {band} back, so they probably won\'t write again for a while, and bands do tell each other who answers.'
    ]
  },

  VET_LISTEN: {
    label: 'Listen to them',
    verb: 'Listen',
    card: 'Listen to {band}. {hours:words:cap} hour. You learn what they really play and whether it\'s any good.',
    why: 'A band\'s own words for its sound are often wrong. Its recordings aren\'t.',
    ON_TIME: [
      'You listened to {band} before you said yes.',
      'An hour with {band}\'s songs. Now you know what you\'d be booking.'
    ],
    LATE: [
      'You listened to {band} after you\'d already said yes, so what you heard is good to know but too late to change anything.',
      'You put {band} on after confirming. What you heard can\'t change the bill now.'
    ],
    SKIPPED: [
      'You never listened to {band}. What you know about their sound is what they told you.',
      'Nobody listened before the bill was set. You\'ll hear them at the show, with everyone else.'
    ]
  },

  VET_CLIP: {
    label: 'Watch a live clip',
    verb: 'Watch clip',
    card: 'Watch {band} play live. {hours:words:cap} hour. You see how they handle a room and how old their crowd is.',
    why: 'A recording shows the songs. A clip shows the room: who\'s in it, how many, and whether they\'re moving.',
    ON_TIME: [
      'You watched {band} play before you committed.',
      'A clip from one of {band}\'s home shows. You saw who comes to see them.'
    ],
    LATE: [
      'You watched {band}\'s clip after confirming. The bill\'s already built around a guess.',
      'You watched it the week of and it told you who their crowd is, but you\'d already picked the room.'
    ],
    SKIPPED: [
      'You never saw {band} play. How they work a room is a surprise for the night.',
      'No clip. Whether {band}\'s crowd is kids or old heads, you\'ll find out at the door.'
    ]
  },

  VET_HISTORY: {
    label: 'Look at their last tour',
    verb: 'Look them up',
    card: 'Look up {band}\'s followers and last tour. {hours:words:cap} hour. Where they played, in what slot, to whom.',
    why: 'A band\'s home number isn\'t its away number. Their last tour\'s flyers say where they really stand.',
    ON_TIME: [
      'You looked {band} up before you said yes: who they played with and where they were on the bill.',
      'An hour going through {band}\'s last tour. You know what size room they fill away from home.'
    ],
    LATE: [
      'You looked {band} up after you said yes. What you found can\'t move the bill now.',
      'You looked up their last tour the week of, which will be useful next time but doesn\'t help this show.'
    ],
    SKIPPED: [
      'You never checked {band}\'s last tour. What they said they draw is the only number you have.',
      'Nobody looked {band} up. Whatever they claimed, you took.'
    ]
  },

  VET_ASK_BOOKER: {
    label: 'Ask a booker who had them',
    verb: 'Ask booker',
    card: 'Ask a booker on {band}\'s route how their night went. A message; an answer in a few days.',
    why: 'Another booker knows if they showed up, how many came, and what the couch looked like after.',
    ON_TIME: [
      'You asked a booker who had {band}. The answer came back before you had to decide.',
      'A booker on {band}\'s route wrote back in time. You know what they\'re like to host.'
    ],
    LATE: [
      'The booker\'s answer about {band} came after you\'d confirmed.',
      'You asked about {band} too late for it to matter this time.'
    ],
    SKIPPED: [
      'Nobody who\'d had {band} was asked. How they behave on the road is a guess.',
      'You didn\'t ask around the route. If {band} flake, nobody warned you because you didn\'t ask.'
    ]
  },

  VET_ASK_AROUND: {
    label: 'Ask around about them',
    verb: 'Ask around',
    card: 'Ask the old heads, the regulars and your bands about {band}. {hours:words:cap} hour. Rumors, mostly.',
    why: 'If people here already know a band, they\'ll come. If someone has a warning, this is where you hear it.',
    ON_TIME: [
      'You asked around about {band} before you said yes.',
      'An hour of asking. You know whether anybody here has heard of {band}.'
    ],
    LATE: [
      'You asked around about {band} after confirming. If anybody had a warning, it came late.',
      'You asked around the week of, and it told you who is coming, but it was too late to change who you booked.'
    ],
    SKIPPED: [
      'You didn\'t ask around. If people here knew {band}, you didn\'t find out from them.',
      'Nobody in town was asked about {band}.'
    ]
  },

  HOLD_ROOM: {
    label: 'Hold a room',
    verb: 'Hold room',
    card: 'Ask {room} for {dow} the {date:ord}. Their yes makes it yours, once they have what they ask for.',
    why: 'You can\'t offer a band a date you don\'t have. Check the town\'s calendar while you\'re at it.',
    ON_TIME: [
      '{room} is held for {dow} the {date:ord}. It\'s only a soft hold, so they\'ll want a yes from you before long.',
      'Held: {room}, {dow} the {date:ord}. (?house: {host} said fine, same rules as always.)'
    ],
    LATE: [
      'By the time you asked, {room} had another hold on the {date:ord}. You\'re second in line.',
      'You asked {room} late. You got the night, but the band had already asked if you had a room.'
    ],
    SKIPPED: [
      'No room was ever held. {band} gave up waiting for a date.',
      'You never asked a room. The date went by with nothing in it.'
    ]
  },

  AGREE_TERMS: {
    label: 'Agree terms in writing',
    verb: 'Agree terms',
    card: 'Agree the deal, door price, ages and lodging with {band}, in writing. Before you confirm.',
    why: 'At midnight with a cash box, the only deal anybody remembers is the one that was written down.',
    ON_TIME: [
      'Terms agreed with {band}: the deal, {priceLine} at the door, {agesLine}. You wrote it down and they said "perfect."',
      'Deal\'s in writing with {band}. Nobody has to remember anything at settle-up.'
    ],
    LATE: [
      'You settled the deal with {band} by message the week of, which is fine, but it isn\'t written anywhere they\'ll look.',
      'Terms agreed {daysOut:words} days out. Their bassist may remember it differently at midnight.'
    ],
    SKIPPED: [
      'Nobody ever said what the deal was. Settle-up is going to be a conversation.',
      'No terms with {band}. Whatever you pay them, somebody will think it was wrong.'
    ]
  },

  ASK_LOCALS: {
    label: 'Ask the locals, closer first',
    verb: 'Ask locals',
    card: 'Ask local bands to play, closer first. Their yes comes faster once a closer is on.',
    why: 'Locals are how the town finds out. A touring band alone draws only the people who already know it.',
    ON_TIME: [
      'You asked the locals with {lead}. (?closer: {closer} said yes to closing, and the others answered fast after that.)',
      'Locals asked early. Everybody had time to say yes and keep the night free.'
    ],
    LATE: [
      'You asked locals {daysOut:words} days out. Two already had shows that weekend. You got the ones who always say yes.',
      'Asked late. The bands you wanted were busy, and the ones who weren\'t don\'t bring as many friends.'
    ],
    SKIPPED: [
      'No local band was asked. The touring band will draw the people who already know them, which here is almost nobody.',
      'Nobody local on the bill. The door will be the touring band\'s friends in town, if they have any.'
    ]
  },

  LOCK_BILL: {
    label: 'Lock the lineup and set times',
    verb: 'Lock bill',
    card: 'Lock who plays, in what order, and when. {hours:words:cap} hour. Then the flyer can say it.',
    why: 'Until it\'s locked, everybody wants to go last and the night runs half an hour late. A flyer made before the lock says "more TBA."',
    ON_TIME: [
      'Locked: {times}. Out by {curfew}.',
      'Bill\'s locked with {lead}. Everybody knows their slot. (?touring: The touring band is second to last, which is where they want to be.)'
    ],
    LATE: [
      'You locked set times {daysOut:words} days out, and by then everybody wanted to go last and nobody wanted to go first.',
      'The bill locked late. The flyer already went out saying "more TBA."'
    ],
    SKIPPED: [
      'Nobody knew the order. Two bands argued about it at the side door, and the night ran late.',
      'The bill was never locked. Set times are whatever happens.'
    ],
    helper: [
      '{helper} locked the bill the way you set it: {times}. "I sent everybody their slot, so nobody can fight me about going last."',
      '{helper} sent every band its slot and the set times. The bill\'s locked.'
    ]
  },

  CONFIRM_ROOM: {
    label: 'The room says yes',
    verb: 'Booked',
    card: '{room} books the {date:ord} once they have what they want. Then every day you wait to announce costs you people.',
    why: 'A hold is a maybe. A booked night is a show, and the promotion clock starts.',
    ON_TIME: [
      'Confirmed: {room}, {dow} the {date:ord}. The show is real now.',
      '{room} is yours for the {date:ord}. Confirmed. (?house: {host} wrote back "ok" and nothing else, which for them means yes.)'
    ],
    LATE: [
      'You confirmed after the hold should have run out. {room} let it go this time.',
      'You confirmed late, so the room had to hold the night longer than they wanted to.'
    ],
    SKIPPED: [
      '{room} never got what they asked for. They gave the {date:ord} to someone else.',
      'The hold ran out. There\'s no show on the {date:ord} anymore.'
    ]
  },

  /* ------------------------------------------------------------ telling people */

  MAKE_FLYER: {
    label: 'Make the flyer',
    verb: 'Make flyer',
    card: 'Make the flyer. {hours} hours. Best done this week: a show without a flyer has not been announced.',
    why: 'Bands can\'t share it, shops can\'t hang it and nobody can pass it on until it exists.',
    ON_TIME: [
      'Flyer\'s done. {bookingName} presents, {billLine}, {priceLine}, {agesLine}.{tbaNote} It looks like yours.',
      'Flyer\'s done with {lead}. {bookingName} presents, {agesLine}(?askAPunk: , ask a punk for the address). Everything else can start now.'
    ],
    LATE: [
      'The flyer took you till {daysOut} days out. Everything that needs the flyer is behind now too: posters, the bands sharing it, the record store counter.',
      'The flyer was done {daysOut:words} days out, and the old heads who plan ahead didn\'t see it in time.'
    ],
    SKIPPED: [
      'No flyer. People heard about it from posts with no picture, which people scroll past.',
      'There was never a flyer, so nothing went on a wall and the bands had nothing to share, and old heads and kids both missed it.'
    ],
    helper: [
      '{helper} made the flyer. (?different: "I did it my way instead of yours, but I think it looks better, so trust me on this.")',
      '{helper} sent the flyer over. (?different: "I changed the layout because the touring band\'s name was too small to read from across the room.") (?paid: You paid {amount:money}.)'
    ]
  },

  ANNOUNCE: {
    label: 'Announce it',
    verb: 'Announce',
    card: 'Post the date, the room and who\'s confirmed. The bill can be TBA. Old heads plan ahead, so say it early.',
    why: 'The people who plan ahead can only plan around what\'s been said. An announcement nobody repeats gets forgotten, so the week-of push matters too.',
    ON_TIME: [
      'Announced the day you confirmed, without the full bill. The old heads who plan ahead saw it.',
      'Announced with {lead}. A few people already have it on their calendar.'
    ],
    LATE: [
      'You waited for the full bill and announced {daysOut:words} days out. People who plan ahead had already planned.',
      'You announced late, and the middle saw it in time but most of the old heads didn\'t.'
    ],
    SKIPPED: [
      'It was never announced. People found out from the flyer, if they found out.',
      'No announcement. The only people who knew were the ones you told yourself.'
    ],
    opts: {
      LOW:  { label: 'Put {cost:money} behind the post', says: 'A few more people see it, mostly in their twenties.' },
      MID:  { label: 'Put {cost:money} behind the post', says: 'Most of the middle in town scrolls past it once. Some kids.' },
      HIGH: { label: 'Put {cost:money} behind the post', says: 'Nearly everyone in town who looks at posts sees it, more than once. Old heads still mostly don\'t.' }
    }
  },

  BANDS_SHARE: {
    label: 'Bands share the flyer',
    verb: 'Bands share',
    card: 'The bands post the flyer to their own people. It happens once the flyer and the announcement exist.',
    why: 'Every band on the bill has followers you don\'t. The touring band\'s people here only hear if the band posts it.',
    ON_TIME: [
      '{allBands} posted the flyer within a week. The touring band\'s post reached their people here.',
      'The bands shared it early. (?touring: {band} posted it with "see you there" and tagged everyone.)'
    ],
    LATE: [
      'Only two of the bands shared it the week of, and the touring band posted it from the road the night before.',
      'Shared late. Their friends saw it after making other plans.'
    ],
    SKIPPED: [
      'Nobody shared the flyer. Nobody came for the touring band.',
      'The bands never posted it. Their own friends didn\'t know.'
    ]
  },

  PRINT: {
    label: 'Print flyers',
    verb: 'Print',
    card: 'Print {copies} flyers at the copy place. {hours:words:cap} hour, daytime. Nothing goes on a wall until this is done.',
    why: 'Every flyer run waits for paper. The copy place keeps day-job hours.',
    ON_TIME: [
      '{copies} flyers, printed. {cost:money} at the copy place. They\'re in a box in your car.',
      'Printed with time to spare. {copies} copies, still warm.'
    ],
    LATE: [
      'You printed {daysOut:words} days out. The flyer runs will all be late now.',
      'You printed late, so whatever goes up now only reaches the people who walk past it this week.'
    ],
    SKIPPED: [
      'Nothing was printed, so no posters went up anywhere and the over-30s didn\'t hear about it.',
      'There was no paper, so the flyer exists only on phones.'
    ],
    helper: [
      '{helper} printed {copies} flyers on the way home from work. "You can pay me back in beer."',
      '{helper} picked up the flyers from the copy place. {copies} of them, in a box by your door.'
    ],
    opts: {
      SMALL: { label: '100 copies, {cost:money}', says: 'Enough for two routes.' },
      USUAL: { label: '250 copies, {cost:money}', says: 'Every route in town.' },
      BIG:   { label: '500 copies, {cost:money}', says: 'The town and the towns next door, if someone drives them out there.' }
    }
  },

  FLYER_RUN: {
    label: 'Put up flyers (?route:around {route})',
    labelAgain: 'Put up flyers again (?route:around {route})',
    verb: 'Flyer run',
    card: 'Put flyers up on {route}: {spots}. {hours} hours, daytime. Old heads read walls, so earlier is better.',
    why: 'The old heads still read walls and counters. What goes up early gets covered, so early needs a second run.',
    ON_TIME: [
      'Flyers up on {route}: {spots}, with {lead}.',
      'You did {route}, so the old heads who walk past {spots} will see the date. (?firstTime: The record store said you can use the board, just don\'t cover their sale sign.)'
    ],
    LATE: [
      'Flyers went up on {route} {daysOut:words} days out, which is long enough for people who pass every day but not for anybody else.',
      'You got to {route} late. The old heads who\'d have seen it had made plans.'
    ],
    SKIPPED: [
      'Nobody did {route}. The over-30s there didn\'t hear about it; most of them don\'t look at their phones for shows.',
      'No flyers on {route}. The old heads who walk past there didn\'t know.'
    ],
    helper: [
      '{helper} did {route}: {spots}. (?different: "I skipped a couple of the spots because the owners were weird about it, I\'ll tell you later.") (?paid: {amount:money} and the list.)',
      '{helper} got flyers up on {route}. (?different: They did it a day later than you asked.)'
    ],
    stale: [
      'The {route} flyers have been up {daysUp:words} days. Half of them are under something else by now.',
      'Your {route} flyers are {daysUp:words} days old. Somebody put a lost-cat sign over the one at the laundromat.'
    ],
    again: [
      'You went round {route} again. They\'re on top of the pile.',
      'Second run on {route}. Fresh flyers over the covered ones.'
    ]
  },

  LISTINGS: {
    label: 'Send the listings',
    verb: 'Listings',
    card: 'Send the show to the weekly paper\'s listings and the community calendars. {hours:words:cap} hour. Their deadlines run early.',
    why: 'Old heads still read the listings. Miss the deadline and the show isn\'t in that week\'s paper at all.',
    ON_TIME: [
      'Listings sent before the deadline. It\'ll be in the paper the week before.',
      'You\'re in the listings. Three lines in small type, read by exactly the people who don\'t look at posts.'
    ],
    LATE: [
      'You sent the listings a day after the deadline, so the show made the online calendar but missed the paper.',
      'Listings went in late. The old heads who read the paper won\'t see it till it\'s over.'
    ],
    SKIPPED: [
      'No listings. The old heads who plan from the paper didn\'t know there was a show.',
      'The show was never listed anywhere, so the paper went out without it.'
    ],
    helper: [
      '{helper} sent the listings. (?different: "I put it in the community calendar too while I was at it.")'
    ]
  },

  LOCAL_AD: {
    label: 'Buy a local ad',
    verb: 'Local ad',
    card: 'Pay for an ad in the weekly paper or a spot on community radio. Old heads, mostly. Never part of the usual.',
    why: 'Money can reach people your flyers don\'t: the ones who read the paper on the porch and listen to the late show.',
    ON_TIME: [
      'Ad\'s in. {cost:money}. The paper comes out {deadline:words} days before the show.',
      'You bought the spot. {cost:money}. The old heads who listen to the late show will hear the date twice.'
    ],
    LATE: [
      'The ad ran later than it should have. The paper was in recycling bins before most people saw it.',
      'The spot aired the week of and only some people heard it.'
    ],
    SKIPPED: [
      'No ad this time.',
      'You didn\'t buy an ad. Nobody expected one.'
    ],
    opts: {
      PAPER: { label: 'The weekly paper, {cost:money}', says: 'Old heads read it. In by {deadline} days before.' },
      RADIO: { label: 'Community radio, {cost:money}', says: 'A spot the week of. Old heads and the night-shift crowd.' }
    }
  },

  MAILING_LIST: {
    label: 'Mail your regulars',
    verb: 'Mail list',
    card: 'Send the show to your mailing list. {hours:words:cap} hour. The people who already come because it\'s yours.',
    why: 'Your regulars are the one crowd you can count on, and only if you tell them.',
    ON_TIME: [
      'Your list got the show a week out. A couple of them wrote back "in."',
      'You mailed the list, so the regulars know.'
    ],
    LATE: [
      'You mailed the list two days before. A few regulars already had plans.',
      'The list got it late, and two of them wrote back that they wished they\'d known sooner.'
    ],
    SKIPPED: [
      'Your list never heard about it, so some regulars found out anyway and some didn\'t.',
      'No mail to the list. The people who come because it\'s yours didn\'t know it was yours.'
    ],
    helper: [
      '{helper} mailed the list for you. "I figured they\'re my people too, at least for now."',
      '{helper} sent the show to the old list. A couple of them wrote back "in."'
    ]
  },

  HAND_OUT: {
    label: 'Hand out flyers at a show',
    verb: 'Hand out',
    card: 'Hand out flyers at someone else\'s show with a crowd like yours. {hours} hours, a night.',
    why: 'Nothing reaches a crowd like standing in it. It works best two to four weeks out, at a show that sounds like yours.',
    ON_TIME: [
      'You handed out flyers at a show two weeks before yours. Most people took one. A few asked questions.',
      'An evening handing out flyers. The people you talked to are the kind who come.'
    ],
    LATE: [
      'You handed out flyers a few days before, and only a few people took one.',
      'You flyered at a show the week of, but most people already had plans.'
    ],
    SKIPPED: [
      'You didn\'t hand out flyers anywhere this time.',
      'You didn\'t flyer at any other shows, and since it\'s extra, nobody counts it against you.'
    ]
  },

  INVITES: {
    label: 'Invite people directly',
    labelAgain: 'Invite people again (closer to the night)',
    verb: 'Invite people',
    card: 'Message people who bring friends, one by one. {hours:words:cap} hour. Kids hear about shows from each other.',
    why: 'A message from you is the only promotion that feels like an invitation. The kids plan days ahead, but only if somebody tells them.',
    ON_TIME: [
      'You messaged people who bring friends. Most said they\'d come.',
      'Invites sent with a week to go. A kid wrote back "you messaged my friend and she ended up telling about ten people."'
    ],
    LATE: [
      'You messaged people the day before, and four of them wrote back that they wished they\'d known sooner.',
      'Invites went out late. The kids had already made plans with each other.'
    ],
    SKIPPED: [
      'Nobody was invited. The kids who\'d have come never heard about it.',
      'No invites went out, and a kid who would have come says nobody told them about it.'
    ],
    helper: [
      '{helper} messaged their people about it. (?different: "I also told my whole group chat about it, so you might get more people than you planned for.")'
    ]
  },

  WEEK_PUSH: {
    label: 'The week-of push',
    verb: 'Week push',
    card: 'Post in the days before the show: the flyer, a song from each band, the set times.',
    why: 'People who saw it weeks ago forget. The week-of posts are what turn "I saw that" into going.',
    ON_TIME: [
      'You posted the flyer, a song from each band and the set times in the days before the show.',
      'The week-of push went out on time. The people who saw it early got reminded.'
    ],
    LATE: [
      'You put up two posts the day before, which was fine.',
      'You pushed it late, so some people remembered and some had already forgotten.'
    ],
    SKIPPED: [
      'No posts the week of. People who saw it early forgot it was this week.',
      'Nothing went up the week of, and someone who meant to come says they completely forgot it was this week.'
    ],
    helper: [
      '{helper} posted the flyer, a song from each band and the set times in the days before the show.',
      '{helper} did the week-of posts. "People saw it a month ago and forgot, so I posted again to remind them."'
    ],
    opts: {
      LOW:  { label: 'Put {cost:money} behind the post', says: 'A few more people in their twenties see it this week.' },
      MID:  { label: 'Put {cost:money} behind the post', says: 'Most of the middle sees it before the weekend. Some kids.' },
      HIGH: { label: 'Put {cost:money} behind the post', says: 'Everyone in town who scrolls sees it this week. Late money buys less than early money.' }
    }
  },

  DAY_OF_POST: {
    label: 'Post on the day',
    verb: 'Day-of post',
    card: 'Post the morning of the show and again at five. A promise ticked on the night.',
    why: 'People who\'d been meaning to come need one last nudge on the day.',
    tick: 'Post at noon and five',
    unticked: 'Unticked: the people who\'d been meaning to come don\'t get the nudge.',
    ON_TIME: [
      'Posted at 10 and at 5. The 5 o\'clock one got shared around.',
      'Two posts on the day. The door says a few people mentioned it.'
    ],
    LATE: [
      'You posted after doors opened.',
      'One post, late in the afternoon. It caught a few people.'
    ],
    SKIPPED: [
      'No posts on the day. The people who\'d been meaning to come didn\'t get the nudge.',
      'Nothing went up the day of.'
    ]
  },

  /* ------------------------------------------------------------ making it run */

  LINE_UP_CREW: {
    label: 'Line up sound (and security)',
    verb: 'Crew',
    card: 'Ask {sound|someone} to run sound, and {security|someone} for security if the room wants it. Good ones book up two weeks out.',
    why: 'Sound decides how the bands come across. Security is what a bar or a big room asks for before it confirms.',
    ON_TIME: [
      '{sound} is on sound. You\'ve got the door.',
      'Crew\'s set two weeks out: {sound} on sound, (?security: {security} by the podium,) you at the door with the cash box.'
    ],
    LATE: [
      '{sound|Your usual sound person} was booked. You got a friend of theirs, who\'s fine and doesn\'t know the room.',
      'You asked for crew late. {sound|Sound} said yes the day before, which counts.'
    ],
    SKIPPED: [
      'No sound person was asked. The closing band\'s guitarist ran the PA between his own sets.',
      'Nobody was lined up. You ran the door and the PA both, and neither one got your whole attention.'
    ]
  },

  SORT_GEAR: {
    label: 'Sort out shared gear',
    verb: 'Gear',
    card: 'Decide who brings the drum kit and the amps. Everybody brings their own snare and cymbals.',
    why: 'Five bands, five kits and one carport means fifteen-minute changeovers. A shared kit means five.',
    tick: 'Sort out who shares what',
    unticked: 'Unticked: every changeover runs ten minutes longer.',
    ON_TIME: [
      '(?closer: {closer} brings the kit.) Everybody brings their own snare and cymbals, so changeovers take five minutes.',
      'Gear\'s sorted: one kit, two bass cabs, everyone\'s own breakables.'
    ],
    LATE: [
      'You sorted the gear the day before. Most of it worked out.',
      'You sorted the gear late, and one band brought a whole kit anyway.'
    ],
    SKIPPED: [
      'Nobody sorted the gear, so three drum kits ended up in one room and changeovers ran long.',
      'There was no gear plan, so every changeover turned into a negotiation.'
    ]
  },

  HOUSE_RULES: {
    label: 'Write the house rules',
    verb: 'House rules',
    card: 'Write the rules down once: no drinking in the street, keep the drive clear, who to find if something\'s wrong.',
    why: 'Rules on the flyer mean you don\'t have to say them at the door. They also tell the neighbors you thought about it.',
    tick: 'Same house rules as always',
    unticked: 'Unticked: the flyer goes out with no rules, and nobody knows who to find.',
    ON_TIME: [
      'Rules are on the flyer: (?house: no drinking in the street, keep the driveway clear,) find whoever\'s at the door if anything\'s wrong.',
      'House rules written. (?firstTime: You\'ll use them for every show from now on.)'
    ],
    LATE: [
      'The rules went up on a piece of cardboard at the door the night of.',
      'Rules made it into the posts, not onto the flyer.'
    ],
    SKIPPED: [
      'There were no rules anywhere, so nobody knew who to tell when something felt off.',
      'Nobody wrote the rules down, and people parked on the grass.'
    ],
    helper: [
      '{helper} put the house rules on the flyer, the same ones they always used.',
      '{helper} wrote the rules down. "Copy these for now, and when you find one that doesn\'t work for your house, change it."'
    ]
  },

  NEIGHBORS: {
    label: 'Talk to the neighbors',
    verb: 'Neighbors',
    card: 'Knock on the neighbors\' doors with the date and when it ends. {hours:words:cap} hour, daytime, a day or two before.',
    why: 'A neighbor told in advance puts up with a lot. A neighbor never told calls.',
    ON_TIME: [
      'You knocked on both neighbors\' doors with the date and when it ends. "As long as it\'s all over by {curfew}, I don\'t mind."',
      'You told the neighbors, and one of them asked if they could come.'
    ],
    LATE: [
      'You told the neighbors the day of. One said fine, and the other said nothing, which isn\'t the same thing.',
      'Neighbors heard about it an hour before doors.'
    ],
    SKIPPED: [
      'Nobody told the neighbors.',
      'You didn\'t knock on any door, so the neighbors find out from the cars.'
    ],
    helper: [
      '{helper} knocked on the neighbors\' doors, and since they already know {helper}, they said fine.',
      '{helper} told the neighbors the date and when it ends.'
    ]
  },

  ADVANCE: {
    label: 'Advance every band',
    verb: 'Advance',
    card: 'Send every band the address, parking, load-in, set times, the deal and where the touring band sleeps. {hours} hours.',
    why: 'One message stops four problems: a lost van, a sound person who didn\'t know there were four bands, a host surprised by load-in, an argument at settle-up.',
    ON_TIME: [
      'Sent everybody the address, parking, load-in, set times, the deal, and where the touring band sleeps.',
      'The advance went out ten days before. The touring band answered within the hour: "got it."'
    ],
    LATE: [
      'The touring band got the address at noon the day of, and they did find it.',
      'You advanced the bands late, so load-in turned into a series of phone calls.'
    ],
    SKIPPED: [
      'Nobody was advanced, so the touring band was at a gas station at 5 not knowing the address, and {sound|Sound} didn\'t know there were {bandCount}.',
      'You sent no advance, and everybody showed up with a different idea of the night.'
    ],
    helper: [
      '{helper} sent the advance to every band. (?different: "I told them load-in was at 6 instead of 6:30, since it\'s easier to get everybody there early.")'
    ]
  },

  LODGING: {
    label: 'Find the band a floor',
    verb: 'Find a floor',
    card: 'Ask someone to put the touring band up. {n:words:cap} people. A message; answers come fast from friends.',
    why: 'A floor is worth more to a band on the road than the door. Where they sleep is what they remember.',
    ON_TIME: [
      '{host|A friend} has a floor for {n:words}, and even put out towels.',
      'You found the band a floor ahead of time, so they know where they\'re sleeping.'
    ],
    LATE: [
      'You found them a floor the day of. They\'d already looked up a motel.',
      'A couch came through at the last minute.'
    ],
    SKIPPED: [
      'Nobody found the band a place to stay. They slept in the van, or paid for a motel out of the door.',
      'There was no floor, so they drove on after the show.'
    ]
  },

  DAY_BEFORE: {
    label: 'Check in the day before',
    verb: 'Day before',
    card: 'Text every band and sound (and security, if you have it) the day before: still on, here\'s the time.',
    why: 'Most no-shows are people who forgot. A message the day before catches them.',
    tick: 'Text everyone the day before',
    unticked: 'Unticked: someone is likelier not to show up.',
    ON_TIME: [
      'Day-before texts went out. Everybody answered.',
      'Checked in with everyone the day before. One band said they\'d be early.'
    ],
    LATE: [
      'You checked in the morning of. Everybody answered by noon.',
      'The day-before texts went out late, and one band didn\'t answer until 4.'
    ],
    SKIPPED: [
      'Nobody was checked on the day before.',
      'No day-before texts.'
    ]
  },

  FOOD: {
    label: 'Feed the touring band',
    verb: 'Food',
    card: 'Feed the touring band: a pot at home for {homeCost:money}, or dinner out for {outCost:money}.',
    why: 'A band on the road eats gas station food for weeks. A real meal is what they tell the next town about.',
    tick: 'Feed the touring band',
    unticked: 'Unticked: the band eats whatever the gas station has.',
    ON_TIME: [
      '(?home:You made a pot of rice for {band}. -{amount:money}.)(?out:You took {band} out for dinner. -{amount:money}.) They ate before load-in and talked about it all night.',
      '(?home:You cooked at home for {band}. -{amount:money}.)(?out:You got {band} dinner at the place down the street. -{amount:money}.) Somebody asked for seconds.'
    ],
    LATE: [
      'Food showed up after their set.',
      'The band didn\'t eat until 11, which was better than nothing.'
    ],
    SKIPPED: [
      'Nobody fed the touring band.',
      'There was no food, and the band split a bag of chips.'
    ],
    opts: {
      HOME: { label: 'Cook for them at home, {cost:money}', says: 'A pot of rice and beans in your kitchen. It costs little and bands remember it.' },
      OUT:  { label: 'Take them out, {cost:money}', says: 'Dinner at the place down the street, on you.' }
    }
  },

  /* ------------------------------------------------------------ the night and after */

  RUN_SHOW: {
    label: 'Run the show',
    verb: 'Show night',
    card: 'The show. Doors, sets, the count, and settling up before anybody loads out.',
    why: 'Everything before tonight was so tonight could go right. Settle before load-out: touring band first, locals next, you last.',
    ON_TIME: [
      'Sets at {times}. Out by {curfew}.',
      'The show happened. {room}, {dow} the {date:ord}.'
    ],
    LATE: [
      'The night started late and ran later.',
      'Doors opened late. The first band went on after the people who came early had already left.'
    ],
    SKIPPED: [
      'The show didn\'t happen.',
      'Nobody opened the doors.'
    ]
  },

  THANKS: {
    label: 'Say thanks',
    verb: 'Thank people',
    card: 'Thank the host, the crew and every band within two days. Ask the touring band when they\'re back.',
    why: 'People rarely remember being thanked, but they remember for a long time when nobody thanked them.',
    ON_TIME: [
      'You sent thanks to {host|the room}, {sound|sound}, (?security: {security},) and every band the next day.',
      'Thanks went out within two days. The touring band wrote back: "Thank you, we\'re telling our friends about you."'
    ],
    LATE: [
      'You thanked people a week later, which is fine but means less than it would have.',
      'You thanked everybody late. They noticed, a little.'
    ],
    SKIPPED: [
      'Nobody got a thank-you.',
      'No thanks went out, and nobody will mention it now, but it will come up later.'
    ],
    helper: [
      '{helper} sent thanks to everybody from the booking name. "You should do this one yourself next time, because people notice when it comes from you."',
      '{helper} thanked the room, the crew and the bands for you.'
    ]
  },

  DEBRIEF: {
    label: 'Debrief',
    verb: 'Debrief',
    card: 'Sit down with sound and one band and ask what they saw. {hours:words:cap} hour. Optional.',
    why: 'The people who were there saw things you didn\'t. Asking turns a guess in your notebook into something you know.',
    ON_TIME: [
      'You asked {sound|sound} and one of the bands how it went, and wrote down your own door count next to it. Your notebook is longer.',
      'You spent an hour asking, and two things you only thought you knew are now things you actually know.'
    ],
    LATE: [
      'You asked a week later, and people remembered most of it.',
      'You did the debrief late, and the details were already getting fuzzy.'
    ],
    SKIPPED: [
      'No debrief this time.',
      'You didn\'t sit down with anyone about it.'
    ]
  },

  /* ------------------------------------------------------------ not tied to one show */

  GO_TO_SHOW: {
    label: 'Go to a show',
    verb: 'Go out',
    card: 'Go to somebody else\'s show. {hours} hours, a night. You see who comes, and people see you.',
    why: 'You learn a crowd by standing in it. You also meet the bands and bookers who don\'t know you yet.',
    ON_TIME: [
      'You went out. You watched who came, who left early and who stayed for the last band.',
      'A night at someone else\'s show. You talked to three people you\'d only messaged before.'
    ],
    LATE: [
      'You got there for the last band and saw some of it.',
      'You went late. The room was already thinning out.'
    ],
    SKIPPED: [
      'You meant to go out but didn\'t.',
      'You stayed in.'
    ]
  },

  VISIT: {
    label: 'Visit in person',
    verb: 'Visit',
    card: 'Go see them instead of messaging. {hours} hours, daytime. You get the answer on the spot.',
    why: 'Asking in person gets a faster answer and counts for more than a message.',
    ON_TIME: [
      'You went by in person. You got the answer right there.',
      'A visit instead of a message. They remembered you came.'
    ],
    LATE: [
      'You stopped by later than you said, but they waited.',
      'You got there late and they were on their way out.'
    ],
    SKIPPED: [
      'You never went by.',
      'The visit didn\'t happen.'
    ]
  },

  EXTRA_SHIFT: {
    label: 'Pick up a shift',
    verb: 'Extra shift',
    card: 'Work an extra shift at the day job. {hours} hours, daytime. Money now, tired later.',
    why: 'Shows don\'t pay rent. The day job does.',
    ON_TIME: [
      'You worked the extra shift. It\'ll be on the next check.',
      'You finished the extra shift and your feet hurt.'
    ],
    LATE: [
      'You picked up the shift late in the week.',
      'You covered somebody\'s shift, coming in late and staying late.'
    ],
    SKIPPED: [
      'You didn\'t pick up the shift.',
      'No extra shift this week.'
    ]
  },

  /* The harm jobs carry no account of anything: what was said comes only from people.harm (story 8.7).
   * SPEC? 06-harness harm.test says no text for a matter may contain anything but people.harm lines; these job lines
   * say only that the job was done. If the test counts them, the engine should not render them for HARM_ASK and HARM_WORD. */
  HARM_ASK: {
    label: 'Ask someone who\'d know',
    verb: 'Ask quietly',
    card: 'Ask someone you trust, privately, what they know. {hours:words:cap} hour. Not by message.',
    why: 'One report is one report. Someone who\'d know can tell you how sure to be, without telling you more.',
    ON_TIME: [
      'You asked quietly.',
      'You talked to someone who\'d know, in person.'
    ],
    LATE: [
      'You asked, later than you meant to.',
      'You got around to asking.'
    ],
    SKIPPED: [
      'You didn\'t ask.',
      'Nobody was asked.'
    ]
  },

  HARM_WORD: {
    label: 'Have a quiet word',
    verb: 'Quiet word',
    card: 'Talk to the band, privately. {hours:words:cap} hour. Say what you\'ve heard is about one person. Then listen.',
    why: 'A band may not know. A quiet word gives them the chance to deal with it without everyone watching.',
    ON_TIME: [
      'You had a quiet word with {band}.',
      'You talked to {band}, in person, privately.'
    ],
    LATE: [
      'You talked to {band}, later than you meant to.',
      'The word with {band} happened eventually.'
    ],
    SKIPPED: [
      'You didn\'t talk to {band}.',
      'The quiet word didn\'t happen.'
    ]
  },

  TOUR_ROUTE: {
    label: 'Route the tour',
    verb: 'Route tour',
    card: 'Pick the stops for {band}\'s tour and write the bookers. {hours} hours. Contacts answer; strangers mostly don\'t.',
    why: 'A local band can\'t tour until someone in each town says yes. The towns that owe you are the ones that answer.',
    ON_TIME: [
      'The route\'s planned and the asks are out to every stop.',
      'You routed {band}\'s run. Messages went to every town on the list.'
    ],
    LATE: [
      'You routed the tour late. Some towns had already filled the dates.',
      'The asks went out with less time than bookers like.'
    ],
    SKIPPED: [
      'The tour was never routed.',
      'Nobody wrote the other towns. {band} stayed home.'
    ]
  },

  TOUR_ADVANCE: {
    label: 'Advance the tour',
    verb: 'Advance tour',
    card: 'Send {band} every stop\'s address, load-in, deal and floor. {hours} hours. Once four stops have said yes.',
    why: 'A van that knows where it\'s sleeping every night comes home with money and friends.',
    ON_TIME: [
      'Every stop on {band}\'s tour is advanced: addresses, load-in, deals, floors.',
      'The tour advance went out. {band} has a sheet with every night on it.'
    ],
    LATE: [
      'You advanced the tour after they\'d left, so they got the addresses one town at a time.',
      'The advance caught up with the van on the second day.'
    ],
    SKIPPED: [
      'Nobody advanced the tour. {band} found each town on their own.',
      'There was no tour advance, and they called you from every gas station.'
    ]
  },

  /* ------------------------------------------------------------ around the jobs */

  send: {
    tonight: 'Goes out tonight.',
    over: '{n:words:cap} messages tonight. That\'s an hour of your night.',
    held: '{n:words:cap} will wait till tomorrow.',
    phoneOff: 'Phone off. Nothing goes out and nothing comes in till tomorrow.',
    sent: ['Sent {n:words}.', '{n:words:cap} went out tonight.']
  },

  waived: {                                // familiarity (Config.FAMILIAR)
    ROOM: [
      '{host} and the neighbors know the drill by now.',
      '{room} has had enough of your shows that the rules go without saying.'
    ],
    BAND: [
      '{band} shared it before you asked.',
      '{band} don\'t need a day-before text anymore because they always show up.'
    ]
  },

  slips: {
    WRONG_DATE: [
      'You wrote {wrongDow} on the flyer when the show is {dow}, and it took an hour to catch it and fix it.',
      'The flyer said the {date:ord} under the wrong weekday, and someone pointed it out, so redoing it took an hour.'
    ],
    WRONG_LOADIN: [
      'You told one band load-in at 5 and the others at 6:30. Somebody\'s going to stand in a driveway for an hour.',
      'The load-in time in your message was last show\'s, so you sent a correction and spent an hour going back and forth.'
    ],
    CREW_UNCONFIRMED: [
      'You thought {sound|sound} said yes, but reading it back they only said "probably," so you asked again.',
      'Security was never actually confirmed, so you sent another message and waited again.'
    ],
    DOUBLE_BOOKED: [
      'You put two bands in the same slot, and nobody noticed until you read it back.',
      'You promised the {date:ord} to two people. One of them has to hear it from you.'
    ],
    SHORT_ANSWER: [
      'You were tired and wrote back two words. They read it as annoyed.',
      'Your answer was shorter than you meant. They took it the wrong way.'
    ],
    SHOP_SHUT: [
      'The copy place closed at 5 and you got there at 5:10.',
      'The copy machine was down, and they told you to come back tomorrow.'
    ]
  },

  needs: {
    HOST_TRUSTS_YOU: 'the host knows you',
    DEPOSIT: 'a deposit of {deposit:money}',
    FULL_BILL: 'a full bill before it confirms',
    TOURING_AND_LOCAL: 'the touring band and one local agreed',
    VOUCH: 'someone vouches for you',
    ASK_NICELY: 'asking nicely',
    SECURITY: 'security on the night (they won\'t confirm without it)',
    INSURANCE: 'event insurance, {insurance:money}, bought when it confirms'
  },

  /* 1.12: what a greyed job waits on (by name), and what each one buys, in words */
  blocker: {
    HOLD_ROOM: 'After a room is holding the night.', CONFIRM_ROOM: 'After the room says yes.', MAKE_FLYER: 'Make the flyer first.',
    ANNOUNCE: 'After you announce it.', PRINT: 'After you print the flyers.', ASK_LOCALS: 'After a local band is asked.',
    LOCK_BILL: 'After the bill is locked.', BANDS: 'After a band says yes.', AGREE_TERMS: 'After you agree the terms.'
  },
  reach: {
    MAKE_FLYER: 'Everything else that spreads the word starts from it.',
    ANNOUNCE: 'The old heads who plan ahead, and anyone who follows the room.',
    BANDS_SHARE: 'Each band\'s own friends, once they post it.',
    PRINT: 'Paper for the walls. Nothing goes up without it.',
    FLYER_RUN: 'The old heads and the people who walk past that route, a handful at a time.',
    LISTINGS: 'The middle crowd, who still read the weekly paper.',
    LOCAL_AD: 'Old heads and the night-shift crowd.',
    MAILING_LIST: 'People who already like your shows.',
    HAND_OUT: 'People at another show that sounds like yours.',
    INVITES: 'Kids and friends, who come when somebody asks them. A few each time.',
    WEEK_PUSH: 'The people who meant to come and forgot.'
  },

  /* a room changes your night: phone messages (slots: room, date) */
  notice: {
    noFit: 'needs {need}, you have {left}',
    needBands: 'A band has to say yes first.',
    moved: 'Your show moved to {date} at {room}. Check the bands can still play.',
    roomGone: '{room} can\'t do your show anymore. Find another room or call it off.',
    roomClosed: '{room} closed. Your show on {date} is off.'
  },

  windowLoss: 'late · {kids}% of kids, {middle}% of the middle, {old}% of old heads won\'t hear in time'
};
