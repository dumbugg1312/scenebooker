/* Scene Booker — content/legacy.js   (role C2)
 * The opening (the handoff message, the first notebook notes, the scripted first weeks), story names and the objects
 * nights turn on, retellings, band history lines, firsts, the town's standing, stages, the year page, the two career
 * offers and the endings. Schema: design/spec/03-content.md section 10; words: design/story.md sections 4.4, 6 and 9.
 * Plain voice, no score, no cheering.
 * SPEC? 03-content 10 writes '[year | years]', which picks at random; here it is '[?oneYear: year | years]', so the
 * engine sets the flag oneYear when years is 1 and the line otherwise says "years". Data only: one assignment, no functions.
 */
SB.Content.legacy = {

  opening: {
    handoff: {                             // the first message of every game. Slots: outgoing, bigCity, sound, soundRate, security, securityRate, host, room, curfew, outgoingInitial
      subject: 'it\'s yours if you want it',
      body: 'I\'m doing it. I\'m moving to {bigCity} the first of the month. The job\'s real and the rent\'s not worse and I\'m tired.\n\n' +
            'Somebody has to answer the bands. I\'ve been forwarding everything to you since Christmas anyway, so this is just me saying it out loud. Here\'s what you need:\n\n' +
            '{sound} runs sound. {soundRate:money} for a house. Always late and never misses.\n' +
            '{security} does security when a show needs one. Big and calm, and {securityRate:money} a night. Bars and the big rooms want somebody like that before they\'ll confirm. Don\'t bring them to a house show.\n' +
            'The door is yours. Cash box, stamp, the count. That\'s the whole job, so don\'t hand it off.\n' +
            '{host} has {room}. Done by {curfew}, no exceptions.\n\n' +
            'Three things I wish somebody told me:\n1. Answer everyone, even with a no.\n2. Don\'t promise a guarantee you can\'t pay out of your own pocket.\n3. Flyer the day you confirm. Not the week of. The day you confirm.\n\n' +
            'You\'ll need a name to put on the flyers. Don\'t use mine.\n\nI\'ll still answer my phone. Probably.\n{outgoingInitial}'
    },
    notes: ['Answer everyone.', 'Flyer the day you confirm.', '{room}: done by {curfew}.'],     // the first three notebook notes, conf RUMOR
    script: [                              // the scripted first weeks (story 4.4), as 03-content section 10 gives them
      { week: 0, day: 0, post: 'REQUEST', template: 'CAREFUL', first: true, from: 'PEER', dates: [31, 32], guided: [11, 12], ask: 'DOOR' },  // the first show: a band writes you (guided: a week and a half out)
      { week: 0, day: 0, post: 'LOCAL', path: 'people.band.FIRST_ASK', band: 'CLOSER' },
      { week: 0, day: 0, post: 'REQUEST', template: 'MASS' },
      { week: 0, day: 0, post: 'OWNER', path: 'people.owner.HOST.HELLO' },
      { week: 0, day: 2, post: 'LOCAL', path: 'people.band.FIRST_ASK', band: 'KIDS_OPENER' },
      { week: 1, event: 'SOUND_GOT_A_GIG' },
      { week: 3, day: 0, post: 'REQUEST', template: 'OVERSELL', calendar: 'ANY', ask: 'GUARANTEE' },
      { week: 3, day: 0, post: 'CONTACT', path: 'people.contact.OUTGOING.NUDGE' },
      { week: 5, day: 0, post: 'REQUEST', template: 'SWAP', from: 'PEER', dates: [66, 67], cross: 'CAREFUL' },   // the first trade, once you know the basics
      { week: 6, day: 1, post: 'REQUEST', template: 'FRIEND', from: 'SWAP_CIRCLE', if: 'SWAP_HOST_OK' },
      { week: 9, day: 0, post: 'REQUEST', template: 'RESCUE', lead: [5, 6] }
    ],
    confirmLine: 'Confirmed. The show is real now. From today, every day you wait to tell people costs you some of them.',
    rescueLabel: 'This one is short notice on purpose. Nobody books a full room in {daysOut:words} days. See what regulars and word of mouth can do.'
  },

  /* What a night gets called, by its distinctive detail (SB.Enums.MEMORY). Slots: band, touring, home, room, roomShort,
   * dow, object, incident, town, decision.
   * SPEC? roomShort is taken as a bare noun ("carport", "Lodge"), as 03-content's 'the last {roomShort} show' implies. */
  storyName: {
    OBJECT:        ['the {object} show', 'the {object} night'],
    INCIDENT:      ['the night {incident}', 'the {roomShort} show where {incident}'],
    BAND_FIRST:    ['{band:poss} first show', 'the night {band} played for the first time'],
    TOURING_FIRST: ['the night {touring} played the {roomShort}', 'the first time {touring} came through'],
    ROOM_FIRST:    ['the first {roomShort} show', 'the night the {roomShort} opened'],
    ROOM_LAST:     ['the last {roomShort} show', 'the night the {roomShort} closed'],
    REUNION:       ['the {band} reunion', 'the night {band} came back'],
    TURNED_AWAY:   ['the night they turned people away at the {roomShort}', 'the {roomShort} show nobody could get into'],
    STORM:         ['the {roomShort} flood', 'the night of the storm'],
    TOWN_FIRST:    ['the first {town} show', 'the night {town} got a show'],
    BAND_LAST:     ['{band:poss} last show', 'the night {band} said goodbye'],
    DECISION:      ['the night {decision}', 'the {roomShort} show where {decision}'],
    ORDINARY:      ['the {dow} the {home} band played', 'that {dow} at the {roomShort}']
  },

  /* Things a touring band brings, or a night turns on. Used as {object}: "the ___ show". */
  objects: ['satsuma', 'oscillating fan', 'borrowed snare', 'extension cord', 'kiddie pool', 'pancake breakfast', 'flashlight',
            'cooler of popsicles', 'tambourine', 'boiled peanut', 'thrift-store couch', 'bubble machine', 'porch light',
            'second drum kit', 'birthday cake', 'garden hose', 'shopping cart', 'mattress against the window', 'crawfish',
            'dog on the stage', 'broken string', 'paper lanterns', 'cassette giveaway', 'folding chairs', 'mosquito coils',
            'flooded yard', 'ice chest', 'Christmas lights', 'hand-painted banner', 'accordion', 'fog machine', 'sheet cake',
            'tarp', 'lawn chairs'],

  /* Phrases for {incident}, by SB.Enums.INCIDENT. "the night ___". */
  incident: { NOISE: 'the cops came', FIGHT: 'it got stopped', THEFT: 'the cash box walked off', PA_FAIL: 'the power went out',
              OVER_CAP: 'they had to close the gate', HURT: 'the ambulance came', RAINED_OUT: 'it rained', ROOM_FORGOT: 'nobody had the key' },

  /* A story coming back. Slots: story (its name), band, room, dow, otherBand, told, heads, n. */
  retell: {
    ANNIVERSARY:  ['a year ago tonight, {story}. still not over it.', 'one year since {story}. i still have the flyer on my wall'],
    BAND_RETURNS: ['Last time they were here was {story}. People are going to come for that.', 'They\'re back. Everybody remembers {story}.'],
    OLD_HEAD:     ['Best thing in this town since {story}.', 'Haven\'t seen a room like that since {story}.'],
    ROOM_CLOSES:  ['{room:cap}\'s last show is {dow}. Everybody\'s bringing up {story}.', 'They\'re closing {room}. People keep saying "remember {story}."'],
    IN_REQUEST:   ['{otherBand} told us about {story}. We want in.', 'We heard about {story}. Is it true?'],
    KID_ASKS:     ['you were at {story} right? my brother talks about that.', 'wait you booked {story}??'],
    TOLD:         ['They say {told} came. It was {heads}.', 'Everybody says they were at {story}. You counted {heads} at the door.'],
    RENAMED:      ['People used to call it {old}. Now it\'s {story}.']
  },

  /* A local band's history, one line per milestone, the player's part said plainly. Slots: band, season, how, slot, dow,
   * room, month, count, left, joined, heads, towns, n, year. */
  bandHistory: {
    FORMED:             ['Formed: {season}, {how}.'],
    FIRST_SHOW_FOR_YOU: ['First show you booked them: {slot} a {dow} at {room}, {month}. {count:words:cap} of their friends came.'],
    FIRST_CLOSED:       ['First time they closed one of yours: {month}, {room}, {heads} people.'],
    TOUR:               ['First tour: you booked it. {towns}. {n:words:cap} nights. They came home with gas money and a van that smells like a gas station forever.',
                         'Toured: {towns}. (?yours: You routed it.)'],
    LINEUP:             ['Lineup change: {left} left; {joined} joined.'],
    STAGE: {
      FORMING:     ['Started practicing: {season}.'],
      NEW:         ['First shows: {season}.'],
      COMING_UP:   ['People started coming for them: {season}.'],
      ESTABLISHED: ['A local favorite by {season}.'],
      DRAW:        ['Became the band everyone shows up for: {season}.'],
      BROKE_OUT:   ['Bigger than the town: {season}. People in other cities know the words.'],
      FADING:      ['Fewer people coming out: {season}.'],
      ON_ICE:      ['On a break: {season}.'],
      ENDED:       ['Ended: {season}.']
    },
    BACK:      ['Playing again: {season}.'],
    ENDED:     ['Broke up: {season}.', 'Done: {season}. Nobody said why, which is usually the reason.'],
    LAST_SHOW: ['Last show you booked them: {slot} a {dow} at {room}, {heads} people.'],
    yourPart:  ['You booked them {n:words} times.', 'You booked {n:words} of their shows, the first one included.', 'You booked them {n:words} times. You never booked their first.']
  },

  /* Firsts, one per SB.Enums.FIRST. Slots as each needs: dow, room, heads, band, town, word, stage. */
  firsts: {
    SHOW:           ['Your first show: {dow}, {room}, {heads} people.'],
    COLD_ASK:       ['The first band who wrote you without anybody telling them to.'],
    RETURN:         ['The first touring band to come back: {band}.'],
    WORD_OF_MOUTH:  ['That\'s the first one who found you by word of mouth.'],
    WEEKEND_PICK:   ['The first time a band asked for a weekend and you could give it to them.'],
    TIER4:          ['The first band you booked that\'s bigger than the town now: {band}.'],
    TOUR:           ['The first tour you routed: {band}.'],
    WALL:           ['The first night people will still be talking about in ten years.'],
    FEEDER_SHOW:    ['Your first show outside the city: {town}.'],
    ROOM_KEPT:      ['The first room that\'s still open because of your shows: {room}.'],
    STAGE_2:        ['The first season people knew who to write.'],
    STAGE_3:        ['The first season people offered to help without being asked.'],
    WORD_UP:        ['The first time the town moved up a step: {word}.'],
    OFFER_ROOM:     ['The first time a room asked you to book it.'],
    OFFER_BAND:     ['The first time a band asked you to run their shows.'],
    BAND_FROM_SHOW: ['The first band started by people who met at one of your shows: {band}.']
  },

  /* The town's standing with touring bands, by SB.Enums.WORD_TIER (story 6.4). `line` is the game's description,
   * `bands` how touring bands talk about it, `up` the year-page line when it is reached. Slots: city, peerCity,
   * bookingName, region. */
  word: {
    SKIPPED:     { line: 'Bands drive through {city} on the way to somewhere. Most don\'t stop.',
                   bands: ['We\'re just driving through.'],
                   up: '{city} is a town bands drive through.' },
    FREE_NIGHT:  { line: 'Bands stop here when {peerCity} falls through, or when they need a Tuesday.',
                   bands: ['We\'ve got a free Tuesday between {peerCity} and the next one.'],
                   up: 'Bands started stopping in {city} when they had a night to fill.' },
    REAL_STOP:   { line: 'Bands on the {region} route plan a night here now. Some of them ask for you by name.',
                   bands: ['Everybody says hit {city} and ask for {bookingName}.'],
                   up: '{city} became a real stop. Bands plan a night here.' },
    ASKED_FOR:   { line: 'Bands route around {city} instead of through it. Bookers in bigger cities ask if you\'ve got a date first.',
                   bands: ['We\'d rather do {city} on a Wednesday than a big city on a Friday, honestly.'],
                   up: 'Bands started asking for {city}.' },
    DESTINATION: { line: '{city} is a town bands talk about in vans. It\'s a night on a tour people look forward to.',
                   bands: ['Is it true about the shows down there?', 'We\'re doing two nights there.'],
                   up: '{city} is a destination now. Bands look forward to it.' },
    down: '{city} slipped a step this year. Bands noticed before you did.',
    feeder: ['{town} had {n:words} shows this year. Last year it had none. {mine:words:cap} of them were yours.',
             '{town} has a scene now. Some of your out-of-towners stopped driving in, which is how you know.']
  },

  /* Stages: recognition, never permission (02-engine 7.22). */
  stage: {
    2: { line: 'People know who to write now.', opens: ['Tours of any size write to you', 'People offer to help', 'Other bookers know your name'] },
    3: { line: 'People ask for you now, and some of them want to help.', opens: ['Helpers take invitations, listings and the advance', 'A tour for a local band'] },
    4: { line: 'The rooms and the bands are starting to make offers.', opens: ['A room may ask you to book it', 'A band that got big may ask you to run their shows'] }
  },

  /* The year page. Slots: years, shows, topRooms, returned, season, note, n, nextSeason, stories, flyers. */
  year: {
    front:   ['{years:words:cap} [?oneYear: year | years]. {shows} shows, most of them in {topRooms}. {returned} touring bands came back a second time.',
              '{years:words:cap} [?oneYear: year | years] of shows. {shows} of them. {returned} touring bands came back. (?owes: You still owe {owes}.)'],
    season:  ['{season:cap}: {shows} shows. {note}', '{season:cap}. {shows} shows. {note}'],
    crowd: {
      UP:   ['More kids are coming up than {n:words} years ago.', 'The all-ages shows are fuller than they were.'],
      DOWN: ['Fewer kids are coming up than {n:words} years ago.', 'The kids\' shows are thinner. Some of them went to the bars.'],
      FLAT: ['About the same crowd as last year. Older by a year.', 'Same faces, mostly. A few new ones.']
    },
    stories: ['Nights people still talk about: {stories}.', 'The ones that got names: {stories}.'],
    none:    ['No nights got a name this year. Most years are like that.'],
    forward: ['Bands are already writing about the {nextSeason}.', 'There\'s a message in the inbox about the {nextSeason} already.']
  },

  /* The two career offers. Accepting ends this career in V1 (00-overview 2.1). Slots: room, owner, salary, nights,
   * bookingName, band, member, cut, city. */
  offers: {
    ROOM: {
      subject: '{room}',
      body: 'I\'ve been doing the numbers on your nights here. They\'re the best nights we have that aren\'t a holiday.\n\n' +
            'I want you booking this room. {nights:words:cap} nights a week, your call on who plays. {salary:money} a month and a budget for guarantees. ' +
            'You\'d have the calendar. You\'d also have the calendar: the slow Tuesdays, the cover band somebody\'s brother-in-law likes, the birthday parties.\n\n' +
            'One thing, and I know it matters to you. The flyers say "{room} presents." You can put your name under it.\n\n' +
            'Think about it. Not long.\n{owner}',
      accept: 'Take the room',
      decline: 'Stay independent',
      later: 'Not yet',
      ends: 'Taking it ends this career. You\'d be booking a room, not a town. The box and the wall stay.'
    },
    BAND: {
      subject: 'ok so',
      body: 'ok so. the label wants us on the road for basically all of spring and summer and the person they set us up with doesn\'t answer and doesn\'t know anybody. ' +
            'we want it to be you. you know every booker between here and anywhere and they all like you.\n\n' +
            'we can pay you. not a lot. {cut}%.\n\n' +
            'you\'d have to be gone some of the time. or not, you can do it from your phone mostly. we don\'t really know how it works. that\'s why we\'re asking you.\n{member} ({band})',
      accept: 'Run their shows',
      decline: 'Stay where you are',
      later: 'Not yet',
      ends: 'Taking it ends this career. You\'d be booking a band, not a town. The box and the wall stay.'
    },
    declined: ['You said no to {room|them}. You\'re still booking {city}.', 'Not this time. The offer goes in the box with everything else.']
  },

  /* The epilogue: three to five plain sentences. Slots: years, shows, returned, toured, wordTier, city, owes, room, band, bookingName. */
  endings: {
    HANDED_ON: [
      '{years:words:cap} [?oneYear: year | years]. {shows} shows. {returned} touring bands came back a second time, and {toured} local bands went on tour. {city} is {wordTier} now. Somebody else answers the bands. (?owes: You still owe {owes}.)',
      'You handed it on after {years:words} [?oneYear: year | years] and {shows} shows. {city} is {wordTier}. The next booker has your three lines and your three people. The bands will write them on Monday.'
    ],
    LAST_SHOW: [
      'That was the last one. {years:words:cap} [?oneYear: year | years], {shows} shows. {returned} touring bands came back a second time. {city} is {wordTier}. (?owes: You still owe {owes}.)',
      '{shows} shows, and then the last one. {city} is {wordTier} now. Somebody will start answering the bands. It might take them a while.'
    ],
    TOOK_ROOM: [
      'You book {room} now. {years:words:cap} [?oneYear: year | years] and {shows} shows got you there. {city} is {wordTier}. The flyers say {room} presents, with your name under it.',
      'You took the room. Four nights a week and a salary. The old scene says it feels different. Still good. Different.'
    ],
    TOOK_BAND: [
      'You run {band:poss} shows now. {years:words:cap} [?oneYear: year | years] and {shows} shows taught you every booker on the road. {city} is {wordTier}. You write the requests now.',
      'You\'re on the band\'s side of the inbox now. {city} is {wordTier}. Somebody there will answer you, or they won\'t.'
    ]
  },

  /* The frame of the message the player writes when handing it on (story 9.4). */
  handoffFrame: {
    subject: 'it\'s yours if you want it',
    people: 'Here\'s who you need:',
    three: 'Three things I wish somebody told me:',
    close: 'You\'ll need a name to put on the flyers. Don\'t use mine.'
  }
};
