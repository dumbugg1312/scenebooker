/* Scene Booker — content/events.js (role C3, the night).
 * Midweek and show-night events as data: design/spec/03-content.md section 8. SB.Director picks them, SB.Effects
 * interprets their conditions (SB.Enums.COND) and effects (SB.Enums.EFFECT). No logic lives here.
 *
 * Order: the eighteen events the engine raises by id (8.5), then the further midweek events, then the further
 * show-night events (story.md 7.6).
 *
 * SPEC? Draw weights for the events the engine raises itself. 8.5 says those are raised by a named module
 * (Night, Rooms, Requests, Harm, People, or the Director on a rule of its own). Where that rule cannot be written
 * in the condition language (a band's reliability, an incident already rolled, a hold challenged, a tour pulled),
 * the event has weight 0 and, on a night, risk base 0, so the general draw never picks it a second time. Night
 * events that are the decision form of an incident carry risk.incident, so the director's incident roll finds them.
 */
SB.Content.events = [

  /* ======================= The eighteen events the engine raises by id (03-content 8.5) ======================= */

  {
    id: 'DOORS',
    when: 'NIGHT', tier: 'GENTLE', weight: 0, cooldown: 0,
    bind: ['show'],
    if: {},
    at: 'DOORS',
    risk: { base: 0 },
    telegraph: null, replaces: null,
    title: 'Doors, and the room is thin',
    body: '{t}. By your own count, {heads:words} have come through the door so far. The first band is tuned and waiting, and the singer keeps looking over at you on the door to see if they should give it a few more minutes.',
    options: [
      { id: 'ON_TIME', label: 'Start on time', likely: 'The first band plays to whoever is here, and nothing after it runs late.',
        effects: [{ op: 'NOTHING' }],
        result: 'The first band started on time, to the people who were already there.' },
      { id: 'HOLD', label: 'Hold fifteen minutes', likely: 'The first band gets a fuller room, but every set after it starts fifteen minutes later.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 15 }, { op: 'SHOW_MOD', key: 'set1Presence', v: true }],
        result: 'You held it fifteen minutes. The first band played to a fuller room, and the rest of the night will run a little later.' },
      { id: 'LOOSE_LIST', label: 'Let the bands put a few more friends on the list', likely: 'The room fills up earlier, but there\'s less in the cash box at the end.',
        effects: [{ op: 'SHOW_MOD', key: 'comps', v: 6 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.03 }],
        result: 'The bands texted their friends and put them on the list. The room filled up a little, but none of them paid.' }
    ]
  },

  {
    /* The one stop a first show can always meet: the room is full and there are more people outside. Raised by the director
     * (a forced stop, like DOORS), only on the scripted first show, and only when the night really goes over the room. */
    id: 'DOORS_FULL',
    when: 'NIGHT', tier: 'GENTLE', weight: 0, cooldown: 0,
    bind: ['show'],
    if: {},
    at: 'DOORS',
    risk: { base: 0 },
    telegraph: null, replaces: null,
    title: 'The room is full',
    body: '{t}. The room is full at about {cap:words}, and {gate:words} more people are standing outside the door waiting to get in.',
    options: [
      { id: 'LET_A_FEW', label: 'Let a few more in', likely: 'It gets hot in there, and {owner|the person who runs the room} gets nervous about how many people are inside.',
        effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'ROOM_REL', d: -2 }],
        result: 'You let a few more squeeze in. It got hot, and {owner|the person who runs the room} kept looking at the door.' },
      { id: 'STOP_AT_CAP', label: 'Stop at the number the room holds and say sorry at the door', likely: 'The people outside go home without seeing the show, and nobody inside is crowded.',
        effects: [{ op: 'SHOW_MOD', key: 'capMul', v: 0.91 }],
        result: 'You stopped at the number the room holds and told everybody still outside you were sorry. Most of them said they\'d come next time.' },
      { id: 'START_A_LIST', label: 'Stop at the number the room holds and start a list for the next show', likely: 'The people outside leave their names, and some of them come back next time.',
        effects: [{ op: 'SHOW_MOD', key: 'capMul', v: 0.91 }, { op: 'REGULARS', pct: 0.04 }],
        result: 'You stopped at the number the room holds and passed a notebook down the line. A bunch of people wrote their names and said they\'d be at the next one.' }
    ]
  },

  {
    id: 'COUNT',
    when: 'NIGHT', tier: 'GENTLE', weight: 0, cooldown: 0,
    bind: ['show'],
    if: {},
    at: 'SETTLE',
    risk: { base: 0 },
    telegraph: null, replaces: null,
    title: 'The count',
    body: 'The last song\'s over. The cash box and the tally sheet are on the table, and {touring|the touring band} is loading out and hasn\'t asked about money yet.',
    options: [
      { id: 'WATCHED', label: 'Count it with {touring|the touring band} watching', likely: 'It takes ten more minutes, and afterward nobody can argue about the number.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 10 }, { op: 'SHOW_MOD', key: 'noDispute', v: true }],
        result: 'You counted it out loud with the band at the table. Everybody saw the same number.' },
      { id: 'ALONE', label: 'Count it yourself in the back', likely: 'It\'s quicker, but if the deal was a handshake, they may remember the number differently.',
        effects: [{ op: 'NOTHING' }],
        result: 'You counted it alone in the back. It was quick, but if anybody questions it later, it\'s your word against theirs.' }
    ]
  },

  {
    id: 'DEAL_DISPUTE',
    when: 'NIGHT', tier: 'REAL', weight: 0, cooldown: 0,
    bind: ['show', 'touring'],
    if: {},
    at: 'SETTLE',
    risk: { base: 0 },
    telegraph: null, replaces: null,
    title: 'They remember the deal differently',
    body: '{touring} remembers the deal being for more than you do, and nobody wrote it down. (?amount: The difference is {amount:money}.)',
    options: [
      { id: 'THEIRS', label: 'Pay what they say', likely: 'It costs you the difference, but they leave happy and they tell people about it.',
        effects: [{ op: 'DISPUTE', resolve: 'THEIRS' }],
        result: 'You paid what they remembered. They thanked you twice at the van.' },
      { id: 'YOURS', label: 'Pay what you meant', likely: 'You keep the difference, but it costs some trust and people may hear about it.',
        effects: [{ op: 'DISPUTE', resolve: 'YOURS' }],
        result: 'You paid what you meant. They took it, and they didn\'t say much.' },
      { id: 'SPLIT', label: 'Split the difference', likely: 'It costs you half the difference, and nobody leaves completely happy.',
        effects: [{ op: 'DISPUTE', resolve: 'SPLIT' }],
        result: 'You split it down the middle. Nobody was thrilled about it and nobody was angry.' }
    ]
  },

  {
    id: 'HOLD_CHALLENGED',
    when: 'WEEK', tier: 'REAL', weight: 0, cooldown: 0,
    bind: ['show', 'booker'],
    if: {},
    telegraph: 'Another booker is asking about {room} on the {date:ord}.', replaces: null,
    title: 'Your hold is challenged',
    body: '{booker} wants {room} on {dow} the {date:ord}, the night you\'re holding. {owner|The owner} says one of you confirms by the end of the week or it goes to whoever does.',
    options: [
      { id: 'CONFIRM', label: 'Confirm now', likely: 'The night is yours, but the deposit is due now and the terms with the bands had better already be settled.',
        effects: [{ op: 'ROOM_HOLD', do: 'CONFIRM' }, { op: 'REL', who: '$booker', d: -2 }],
        result: 'You confirmed. The night is yours, and {booker} knows it.' },
      { id: 'RELEASE', label: 'Let it go', likely: 'You lose the room and keep your money, and you\'ll need another room for that night.',
        effects: [{ op: 'ROOM_HOLD', do: 'RELEASE' }, { op: 'REL', who: '$booker', d: 3 }],
        result: 'You let it go. {booker} owes you one, more or less.' },
      { id: 'MESSAGE', label: 'Message {booker} about it', likely: 'They might take another night instead, and you get along well enough that asking costs you nothing.',
        needs: { rel: { who: '$booker', min: 40 } },
        effects: [{ op: 'CHANCE', p: 0.6,
                    then: [{ op: 'ROOM_HOLD', do: 'CONFIRM' }, { op: 'REL', who: '$booker', d: 2 }],
                    else: [{ op: 'ROOM_HOLD', do: 'RELEASE' }, { op: 'REL', who: '$booker', d: 1 }],
                    thenText: '{booker} took the next weekend instead, so you confirmed and there were no hard feelings.',
                    elseText: '{booker} needs that night more than you do, and asked nicely. You let it go.' }],
        result: 'You messaged {booker}.' }
    ]
  },

  {
    id: 'ROOM_FORGOT',
    when: 'WEEK', tier: 'HARD', weight: 0, cooldown: 0,
    bind: ['show', 'owner'],
    if: {},
    telegraph: null, replaces: null,
    title: 'The room forgot',
    body: '{owner} forgot about your {dow}, and somebody else has {room} that night. Their booking was written down and yours wasn\'t.',
    options: [
      { id: 'ANOTHER_NIGHT', label: 'Move it to the next night at {room}', likely: 'You keep the room. Some of the people who planned on the old night won\'t make the new one.',
        effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: true }, { op: 'ROOM_REL', d: 3 }, { op: 'STRESS', d: 3 }],
        result: 'You moved it a night. {owner} felt bad enough to say so.' },
      { id: 'ANOTHER_ROOM', label: 'Move it to a house the same night', likely: 'A house is free and smaller. It\'s the same date, so nobody\'s plans fall apart, but now there are neighbors to think about.',
        effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: true }, { op: 'STRESS', d: 4 }],
        result: 'It\'s the same night in a different room, and you have a lot of people to tell.' },
      { id: 'MAKE_CHOOSE', label: 'Make {owner} choose', likely: 'You might keep the night. It costs you with the owner either way.',
        effects: [{ op: 'STRESS', d: 3 },
                  { op: 'CHANCE', p: 0.5,
                    then: [{ op: 'ROOM_REL', d: -6 }],
                    else: [{ op: 'ROOM_REL', d: -10 }, { op: 'MOVE_SHOW', dayShift: 1, respect: false }],
                    thenText: '{owner} called the other people and gave you the night back, and wasn\'t happy about it.',
                    elseText: '{owner} kept the other booking. You\'re moving anyway, and now it\'s awkward.' }],
        result: 'You asked {owner} to pick.' }
    ]
  },

  {
    /* SPEC? 8.5: raised by the Director on a band's reliability, which the condition language cannot state, so
     * weight 0. `band` is taken to be the local band on the bound show that is dropping out. */
    id: 'BAND_DROPS',
    when: 'WEEK', tier: 'GENTLE', weight: 0, cooldown: 0,
    bind: ['show', 'band'],
    if: { daysOut: [2, 14] },
    telegraph: null, replaces: null,
    title: 'A band drops',
    body: '{band}: "hey, I\'m so sorry, but we can\'t do {dow} anymore. our singer got stuck working a double that night and there\'s no way out of it. we really hate doing this to you."',
    options: [
      { id: 'REPLACE', label: 'Ask a band that always says yes', likely: 'Someone fills the slot, but they draw a little less.',
        effects: [{ op: 'DROP_BAND', who: '$band' }, { op: 'ADD_BAND', pick: 'ALWAYS_YES' }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.97 }],
        result: 'You asked a band that says yes to everything, and they said yes.' },
      { id: 'RUN_SHORT', label: 'Run it with one fewer band', likely: 'The night is shorter and draws a little less, which is usually fine.',
        effects: [{ op: 'DROP_BAND', who: '$band' }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.94 }],
        result: 'With one fewer band, everybody gets home earlier.' },
      { id: 'LONGER', label: 'Ask {touring|the touring band} to play longer', likely: 'It costs nothing. Their fans get more of them, but the local band\'s friends won\'t come.',
        needs: { bands: [2, 5] },
        effects: [{ op: 'DROP_BAND', who: '$band' }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.93 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
        result: '{touring|The touring band} will play an extra fifteen minutes. They seemed glad to.' }
    ]
  },

  {
    id: 'TOUR_CANCELLED',
    when: 'WEEK', tier: 'HARD', weight: 0, cooldown: 0,
    bind: ['show', 'touring'],
    if: {},
    telegraph: null, replaces: null,
    title: 'The tour is cancelled',
    body: '{touring}: "Hey, I\'m really sorry to do this, but we have to cancel the rest of the tour. Something came up with family and we need to get home. We hate doing this to you this close to the show."',
    options: [
      { id: 'KEEP_LOCAL', label: 'Keep the date as a local show', likely: 'You have to redo the flyer and the night will be smaller, but the room stays happy.',
        effects: [{ op: 'DROP_BAND', who: '$touring' }, { op: 'JOB', type: 'MAKE_FLYER', set: 'TODO', addHours: 1 },
                  { op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
        result: 'It\'s a local show now, and the flyer needs doing again.' },
      { id: 'CANCEL', label: 'Cancel and tell everyone today', likely: 'Nobody plays, but the room will appreciate that you told them right away.',
        effects: [{ op: 'CANCEL_SHOW', why: 'BAND' }, { op: 'ROOM_REL', d: 1 }],
        result: 'You told the room, the bands and sound the same afternoon.' },
      { id: 'ASK_CONTACT', label: 'Ask a booker in another town who\'s routing through', likely: 'Somebody might have a band with a hole that week, or they might not.',
        /* SPEC? No effect op adds a touring band to a bill. Success is modelled as a smaller draw hit than a local
         * show, with a flag the engine can read; failure is the local show. */
        effects: [{ op: 'DROP_BAND', who: '$touring' },
                  { op: 'CHANCE', p: 0.4,
                    then: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }, { op: 'FLAG', key: 'contactFilledDate', v: true }],
                    else: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }, { op: 'JOB', type: 'MAKE_FLYER', set: 'TODO', addHours: 1 }],
                    thenText: '{contact|A booker you know} had a band routing through with a hole that week. They\'ll take the night.',
                    elseText: 'Nobody\'s routing through that week. It\'s a local show now, and the flyer needs doing again.' }],
        result: 'You asked around.' }
    ]
  },

  {
    /* SPEC? 8.5 asks for trait HURRICANE or SNOW; a condition object can only require all of its traits. This
     * event is the hurricane form, drawn in hurricane months. A snow city's pack can carry its own version. */
    id: 'STORM_WATCH',
    when: 'WEEK', tier: 'HARD', weight: 1, cooldown: 8,
    bind: ['show'],
    if: { daysOut: [1, 4], trait: 'HURRICANE', months: [6, 7, 8, 9, 10, 11] },
    telegraph: 'There\'s a storm in the forecast near {dow} the {date:ord}.', replaces: null,
    title: 'A storm in the forecast',
    body: 'There\'s a storm in the forecast for {dow}. If it comes the way they say, the roads close and nobody\'s out. If it turns, it\'s a normal night.',
    options: [
      { id: 'RESCHEDULE', label: 'Cancel and reschedule', likely: 'Everybody understands, and the bands and the room think better of you for it, but the flyers are wasted.',
        effects: [{ op: 'CANCEL_SHOW', why: 'RESPECTED' }],
        result: 'You called it early, and nobody argued.' },
      { id: 'GO_AHEAD', label: 'Go ahead', likely: 'It\'s a coin toss. If the storm hits, you get a handful of people and a long night.',
        effects: [{ op: 'CHANCE', p: 0.5,
                    then: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.55 }, { op: 'STRESS', d: 4 }],
                    else: [{ op: 'NOTHING' }],
                    thenText: 'The storm came, and the people who always come came anyway.',
                    elseText: 'The storm turned east, and it was a normal night after all.' }],
        result: 'You kept the date.' },
      { id: 'EARLIER', label: 'Move it earlier and finish by seven', likely: 'An early show draws less, but everybody\'s home before it hits.',
        effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
        result: 'Doors at four, done by seven, with short sets.' }
    ]
  },

  {
    id: 'VAN_NOT_HERE',
    when: 'NIGHT', tier: 'REAL', weight: 1, cooldown: 0,
    bind: ['show', 'touring'],
    if: {},
    at: 'DOORS',
    risk: { base: 0.04 },
    telegraph: null, replaces: null,
    title: 'The van\'s not here',
    body: '{t}. Doors are soon and {touring} isn\'t here. Their last post was from a gas station a couple of hours out, and now they\'re stuck behind a wreck.',
    options: [
      { id: 'LATER', label: 'Move them to the last slot', likely: 'They play last, to whoever stays, and the locals get the good slot.',
        effects: [{ op: 'SWAP_ORDER', touringTo: 'LAST' }],
        result: '{touring} closes tonight. You told the locals to stretch a little.' },
      { id: 'LOCAL_UP', label: 'Move a local up and keep going', likely: 'The night keeps moving, and {touring} gets a shorter set when they arrive.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 5 }, { op: 'CUT_SET', who: '$touring', minutes: 10 }],
        result: 'The locals moved up. {touring} will get what time is left.' },
      { id: 'STALL', label: 'Stall with long changeovers', likely: 'Everybody plays their full set, but the crowd gets restless.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 30 }, { op: 'SHOW_MOD', key: 'qAdd', v: -3 }],
        result: 'The changeovers dragged. People went outside and some of them didn\'t come back in.' }
    ]
  },

  {
    /* SPEC? 8.5 makes "someone in the room plays" need a local at trust 60 or more who is present. Binding `band`
     * would make the whole event ineligible when no such band is there, so the option relies on ADD_BAND with
     * pick IN_THE_ROOM choosing only such a band, and does nothing if there is none. */
    id: 'OPENER_NO_SHOW',
    when: 'NIGHT', tier: 'GENTLE', weight: 1, cooldown: 0,
    bind: ['show', 'opener'],
    if: {},
    at: 'SET:1',
    risk: { base: 0.03 },
    telegraph: null, replaces: null,
    title: 'The opener didn\'t show',
    body: '{t}. {opener} isn\'t here and nobody in the band is answering.',
    options: [
      { id: 'START_LATE', label: 'Start late and wait for them', likely: 'You wait twenty minutes. Maybe they show up, or maybe the night just runs late.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 20 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
        result: 'You waited. The night is running twenty minutes behind.' },
      { id: 'IN_THE_ROOM', label: 'Ask someone in the room to play a few songs on borrowed gear', likely: 'It\'s usually fine, and sometimes it\'s the best thing that happens all night.',
        effects: [{ op: 'DROP_BAND', who: '$opener' }, { op: 'ADD_BAND', pick: 'IN_THE_ROOM' },
                  { op: 'CHANCE', p: 0.35,
                    then: [{ op: 'SHOW_MOD', key: 'qAdd', v: 4 }],
                    else: [{ op: 'NOTHING' }],
                    thenText: 'Two songs turned into five. People are going to talk about it.',
                    elseText: 'They played a few songs on borrowed gear. Everybody clapped.' }],
        result: 'Someone from the crowd took the opening slot.' },
      { id: 'RUN_FEWER', label: 'Run with one fewer band', likely: 'The night is shorter, and a few people came just for the opener.',
        effects: [{ op: 'DROP_BAND', who: '$opener' }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.97 }],
        result: 'The next band goes on now, and the night is one band shorter.' }
    ]
  },

  {
    id: 'PA_DIED',
    when: 'NIGHT', tier: 'REAL', weight: 1, cooldown: 0,
    bind: ['show'],
    if: {},
    at: 'SET:PEAK',
    risk: { incident: 'PA_FAIL' },
    telegraph: null, replaces: null,
    title: 'The PA died',
    body: '{t}. The PA cut out in the middle of a song. {sound|Whoever\'s on sound} thinks it\'s a fuse or a cable, maybe the board.',
    options: [
      { id: 'BORROW', label: 'Borrow from a band', likely: 'It takes fifteen minutes and sounds a little worse, because somebody\'s amp is the PA now.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 15 }, { op: 'SHOW_MOD', key: 'soundAdd', v: -0.05 }],
        result: 'The vocals are going through a bass amp, and it mostly works.' },
      { id: 'SEND', label: 'Send someone for a part', likely: 'It takes half an hour or more. If it\'s the right part, it sounds like nothing happened.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 35 },
                  { op: 'CHANCE', p: 0.7,
                    then: [{ op: 'NOTHING' }],
                    else: [{ op: 'SHOW_MOD', key: 'soundAdd', v: -0.15 }],
                    thenText: 'It was a fuse. It took thirty-five minutes and now it sounds fine.',
                    elseText: 'It was the wrong part. That\'s thirty-five minutes gone and it still sounds rough.' }],
        result: 'Someone drove off for a part.' },
      { id: 'PLAY_THROUGH', label: 'Play through it, unplugged vocals', likely: 'There\'s no wait, but it\'s rough on loud bands, and once in a while people remember it.',
        effects: [{ op: 'SHOW_MOD', key: 'soundAdd', v: -0.2 },
                  { op: 'CHANCE', p: 0.25,
                    then: [{ op: 'SHOW_MOD', key: 'qAdd', v: 5 }],
                    else: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
                    thenText: 'The whole room sang the words. Nobody needed a PA.',
                    elseText: 'Nobody could hear the singer. People were patient about it.' }],
        result: 'The band kept going.' }
    ]
  },

  {
    id: 'KNOCK_AT_THE_DOOR',
    when: 'NIGHT', tier: 'HARD', weight: 1, cooldown: 0,
    bind: ['show', 'closer'],
    if: {},
    at: 'LATE',
    risk: { incident: 'NOISE', mul: [{ if: { jobNotDone: 'NEIGHBORS' }, x: 2.5 }] },
    telegraph: null, replaces: null,
    title: 'A knock at the door',
    body: '{t}. There\'s a patrol car at the curb and a neighbor standing on their porch, and the officer wants to know who\'s in charge.',
    options: [
      { id: 'TURN_DOWN', label: 'Turn it down and finish early', likely: 'The night gets quieter and shorter and the closer loses ten minutes, but nobody gets a ticket.',
        effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -5 }, { op: 'CUT_SET', who: '$closer', minutes: 10 }, { op: 'ROOM_REL', d: 1 }],
        result: 'You turned it down and cut ten minutes. The officer waited to hear it, then left.' },
      { id: 'END_NOW', label: 'End it now', likely: 'The night\'s over and everyone gets paid from what\'s there, and the owner sees you took it seriously.',
        effects: [{ op: 'SHOW_MOD', key: 'endEarly', v: true }, { op: 'SHOW_MOD', key: 'qMul', v: 0.7 }, { op: 'ROOM_REL', d: 2 }],
        result: 'You stopped it. People stood in the yard for a while, then went home.' },
      { id: 'TALK', label: 'Talk to them', likely: 'Goes much better if you told the neighbors ahead of time.',
        /* SPEC? CHANCE gives `p` or `pIf`; both are given here: pIf when the neighbors were told, p otherwise. */
        effects: [{ op: 'CHANCE', p: 0.35, pIf: [{ if: { jobDone: 'NEIGHBORS' }, p: 0.85 }],
                    then: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }, { op: 'SHOW_MOD', key: 'soundAdd', v: -0.05 }],
                    else: [{ op: 'SHOW_MOD', key: 'endEarly', v: true }, { op: 'SHOW_MOD', key: 'qMul', v: 0.7 },
                           { op: 'ROOM_REL', d: -6 }, { op: 'STANDING', d: -4, gens: [0, 1, 2] }],
                    thenText: 'The neighbors knew it was happening. The officer said turn it down a little and left.',
                    elseText: 'It went badly. The show\'s over, and {owner|the owner} heard about it from the officer first.' }],
        result: 'You went out to talk.' }
    ]
  },

  {
    id: 'LINE_DOWN_THE_BLOCK',
    when: 'NIGHT', tier: 'REAL', weight: 1, cooldown: 0,
    bind: ['show'],
    if: {},
    at: 'DOORS',
    risk: { incident: 'OVER_CAP' },
    telegraph: null, replaces: null,
    title: 'A line down the block',
    body: '{t}. The room is at {cap} and there\'s still a line out past the neighbor\'s mailbox.',
    options: [
      { id: 'CAP', label: 'Cap it at the door', likely: 'People get turned away and some of them post about it. Nobody gets hurt.',
        effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
        result: 'You capped it, and now you\'re at the door telling people you\'re sorry and to come next time.' },
      { id: 'LET_IN', label: 'Let everyone in', likely: 'You make more money and the room gets hotter, and the owner watches the exits all night.',
        effects: [{ op: 'SHOW_MOD', key: 'uncapped', v: true }, { op: 'ROOM_REL', d: -3 }],
        result: 'Everybody\'s in, and it\'s tight.' },
      { id: 'OUTSIDE', label: 'Move part of it outside', likely: 'There\'s room for more people, but the neighbors hear all of it.',
        needs: { roomKind: ['HOUSE', 'DIY', 'HALL', 'OUTDOOR'] },
        effects: [{ op: 'SHOW_MOD', key: 'capMul', v: 1.2 }, { op: 'SHOW_MOD', key: 'soundAdd', v: -0.05 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
        result: 'The doors are open and half the crowd is in the yard.' }
    ]
  },

  {
    /* SPEC? A night event that is the decision form of a rolled incident records the incident through its chosen
     * option (INCIDENT with that option's q). The assumption is that Night does not record it a second time. */
    id: 'A_FIGHT',
    when: 'NIGHT', tier: 'HARD', weight: 1, cooldown: 0,
    bind: ['show'],
    if: {},
    at: 'SET:PEAK',
    risk: { incident: 'FIGHT' },
    telegraph: null, replaces: null,
    title: 'A fight',
    body: '{t}. Two people are going at it by the door and a circle is forming around them.',
    options: [
      { id: 'FLOOR', label: 'Let {floor|your floor person} handle it', likely: 'They know how to handle this, and it\'s over in a minute.',
        needs: { hasCrew: 'floor' },
        effects: [{ op: 'INCIDENT', kind: 'FIGHT', q: -6 }],
        result: '{floor|Your floor person} walked one of them out to the curb. The band never stopped.' },
      { id: 'SECURITY', label: 'Let {security|security} handle it', likely: 'This is what you hired them for, and it\'s over before most of the room notices.',
        needs: { hasCrew: 'security' },
        effects: [{ op: 'INCIDENT', kind: 'FIGHT', q: -4 }],
        result: '{security|Security} stepped in between them and walked one out the side. Nobody else had to stop.' },
      { id: 'STOP', label: 'Stop the band until it\'s sorted', likely: 'Everybody sees the music stop. You lose ten minutes, and the fight ends.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 10 }, { op: 'INCIDENT', kind: 'FIGHT', q: -12 }],
        result: 'The band stopped, the whole room turned around to look, and that was the end of it.' },
      { id: 'CALL_IT', label: 'Call it', likely: 'The night ends here. It\'s safe, and it\'s a let-down.',
        effects: [{ op: 'SHOW_MOD', key: 'endEarly', v: true }, { op: 'INCIDENT', kind: 'FIGHT', q: -10 }],
        result: 'You ended the show. People left in twos and threes.' }
    ]
  },

  {
    id: 'SOMEONE_HURT',
    when: 'NIGHT', tier: 'REAL', weight: 1, cooldown: 0,
    bind: ['show'],
    if: {},
    at: 'SET:PEAK',
    risk: { incident: 'HURT' },
    telegraph: null, replaces: null,
    title: 'Someone got hurt',
    body: '{t}. A kid went down at the front and is sitting against the wall holding an ankle.',
    options: [
      { id: 'STOP_CHECK', label: 'Stop the band and check on them', likely: 'It takes ten minutes, and everybody sees you take care of it.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 10 }, { op: 'INCIDENT', kind: 'HURT', q: -4 }],
        result: 'You stopped the set and got them to a chair with ice. They want to stay.' },
      { id: 'ICE', label: 'Ice and keep going', likely: 'The night keeps moving. If it\'s worse than it looks, people will remember.',
        effects: [{ op: 'INCIDENT', kind: 'HURT', q: -8 },
                  { op: 'CHANCE', p: 0.15,
                    then: [{ op: 'ROOM_REL', d: -5 }, { op: 'STANDING', d: -3, gens: [0] }],
                    else: [{ op: 'NOTHING' }],
                    thenText: 'It was worse than it looked. Somebody\'s parent called the owner the next day.',
                    elseText: 'They got ice and a chair and watched the rest from the side.' }],
        result: 'Someone brought ice. The band kept playing.' },
      { id: 'CALL_PARENT', label: 'Call their parent', likely: 'They go home early, and the parents remember who called.',
        needs: { ages: 'ALL' },
        effects: [{ op: 'INCIDENT', kind: 'HURT', q: -5 }, { op: 'STANDING', d: 1, gens: [0] }],
        result: 'You called. Their mom was there in twenty minutes and thanked you.' },
      { id: 'SIT_WITH', label: 'Hand the cash box to a friend and sit with them yourself', likely: 'You leave the door for a few minutes. They\'re looked after, and a few people walk in without paying.',
        effects: [{ op: 'SHOW_MOD', key: 'doorLeak', v: 0.02 }, { op: 'STRESS', d: 2 }, { op: 'INCIDENT', kind: 'HURT', q: -3 }],
        result: 'A friend held the box and the stamp while you sat with them by the wall. They\'re fine. A couple of people walked in while you were gone.' }
    ]
  },

  {
    id: 'NOWHERE_TO_SLEEP',
    when: 'NIGHT', tier: 'REAL', weight: 0, cooldown: 0,
    bind: ['show', 'touring'],
    if: {},
    at: 'SETTLE',
    risk: { base: 0 },
    telegraph: null, replaces: null,
    title: 'Nowhere to sleep',
    body: '{touring} is packing the van and asks where they\'re staying tonight, and nobody ever sorted that out.',
    options: [
      { id: 'YOUR_FLOOR', label: 'Your floor', likely: 'That\'s the whole band on your floor, and you\'ll be tired tomorrow.',
        effects: [{ op: 'CREW', role: 'lodging', to: 'PLAYER' }, { op: 'STRESS', d: 4 }, { op: 'TRUST', who: '$touring', d: 2 }],
        result: 'They followed you home, and one of them picked the bathtub to sleep in.' },
      { id: 'ASK_REGULAR', label: 'Ask a regular', likely: 'Somebody might have a couch, and if not, it\'s your floor.',
        effects: [{ op: 'CHANCE', p: 0.6,
                    then: [{ op: 'CREW', role: 'lodging', to: 'NEW', skill: 0.5 }, { op: 'TRUST', who: '$touring', d: 1 }],
                    else: [{ op: 'CREW', role: 'lodging', to: 'PLAYER' }, { op: 'STRESS', d: 5 }],
                    thenText: 'A regular with a spare room said yes before you finished asking.',
                    elseText: 'Nobody could take them, so they\'re on your floor.' }],
        result: 'You asked around the room.' },
      { id: 'MOTEL', label: 'Pay for a motel', likely: 'It comes out of your pocket, but they get to sleep in beds.',
        effects: [{ op: 'MONEY', amountOf: 'MOTEL', sign: -1, cat: 'MOTEL' }, { op: 'TRUST', who: '$touring', d: 3 }],
        result: 'You got them a room with two beds out by the highway. They\'ll remember it.' }
    ]
  },

  {
    id: 'SOMEONE_ON_LIST',
    when: 'NIGHT', tier: 'HARD', weight: 0, cooldown: 0,
    bind: ['show', 'person'],
    if: { onList: true },
    at: 'DOORS',
    risk: { base: 0 },
    telegraph: null, replaces: null,
    title: 'Someone on your list is here',
    body: '{t}. {person} is at the door, and their name is on your list.',
    options: [
      { id: 'FLOOR_ASKS', label: 'Have {floor|your floor person} ask them to leave', likely: 'It\'s quiet and quick, because your floor person has done this before.',
        needs: { hasCrew: 'floor' },
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 5 }],
        result: '{floor|Your floor person} had a word at the gate. {person} left.' },
      { id: 'YOU_ASK', label: 'Ask them to leave yourself', likely: 'It\'s your show and your list, and doing it yourself will take something out of you tonight.',
        effects: [{ op: 'STRESS', d: 4 }, { op: 'SHOW_MOD', key: 'lateMin', v: 5 }],
        result: 'You asked {person} to go. They went.' },
      { id: 'LET_BE', label: 'Let it be', likely: 'Nothing happens at the door, but some people will notice who got in.',
        effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.97 }, { op: 'REGULARS', pct: -2, only: 'CAME' }],
        result: 'You let it be. A few people left early.' }
    ]
  },

  {
    id: 'SOMEBODY_GOOD',
    when: 'NIGHT', tier: 'GENTLE', weight: 0, cooldown: 0,
    bind: ['show', 'person'],
    if: { stage: [2, 4] },
    at: 'CHANGEOVER',
    risk: { base: 0 },
    telegraph: null, replaces: null,
    title: 'Somebody good',
    body: '{t}. {person} has been here since doors. They\'ve coiled cables, helped carry the bass cab and made change for the door twice.',
    options: [
      { id: 'TALK', label: 'Talk to them', likely: 'They might want to help out, but you\'d have to ask.',
        effects: [{ op: 'CIRCLE_ADD', who: '$person' }],
        result: '{person} says they\'d help out. You have their number now.' },
      { id: 'BAND_IDEA', label: 'Ask if they play in anything', likely: 'Maybe they\'re in a new band, and maybe it\'s one that wants a show.',
        effects: [{ op: 'NEW_BAND', from: 'KIDS', genre: 'HOT', wantsShow: true }, { op: 'REL', who: '$person', d: 2 }],
        result: 'They don\'t yet. By the end of the night they\'ve talked two people into it.' },
      { id: 'THANKS', label: 'Say thanks and leave it there', likely: 'You give them a good word and leave it at that.',
        effects: [{ op: 'REL', who: '$person', d: 2 }],
        result: 'You thanked {person}. They looked surprised anyone noticed.' }
    ]
  },

  /* ======================= Further midweek events (story 7.6, general items) ======================= */

  {
    id: 'ONE_DAY_LATER',
    when: 'WEEK', tier: 'GENTLE', weight: 1, cooldown: 26,
    bind: ['show', 'touring'],
    if: { daysOut: [10, 40] },
    telegraph: null, replaces: null,
    title: 'One day later?',
    body: '{touring}: "Hey, our route got moved around after a couple of dates fell through. Is there any chance we could do the next night instead of {dow} the {date:ord}? It\'s totally fine if not, we\'ll figure something out."',
    options: [
      { id: 'ASK_ROOM', label: 'Ask {owner|the room} about the next night', likely: 'You\'ll hear back tonight, and if the room is free, everybody\'s happy.',
        effects: [{ op: 'CHANCE', p: 0.6,
                    then: [{ op: 'MOVE_SHOW', dayShift: 1, respect: true }, { op: 'TRUST', who: '$touring', d: 2 }],
                    else: [{ op: 'TRUST', who: '$touring', d: -1 }],
                    thenText: '{owner|The room} wrote back within the hour: "The next night is open. Go ahead and move it, I\'ll fix my calendar." You told {touring}, and everybody heard in time.',
                    elseText: '{owner|The room} wrote back: "Sorry, somebody already has that night." {touring} said they\'ll make the original date work, mostly.' }],
        result: 'You asked the room.' },
      { id: 'KEEP', label: 'Say no and keep the date', likely: 'The date holds, but they may find a better offer somewhere else.',
        effects: [{ op: 'CHANCE', p: 0.15,
                    then: [{ op: 'DROP_BAND', who: '$touring', why: 'they couldn\'t do {dow}' }],
                    else: [{ op: 'NOTHING' }],
                    thenText: '{touring} wrote back: "Okay, I talked it over with the van and we really can\'t do {dow}. A promoter two towns over offered us a night that fits our route, and we have to take it. I\'m sorry. Ask us again next time we\'re through." They\'re off the bill.',
                    elseText: '{touring} wrote back: "No worries, we\'ll make {dow} work." They stay on the bill.' }],
        result: 'You kept the date.' },
      { id: 'YES_WITHOUT', label: 'Say yes without asking the room', likely: 'The band is happy, and the room finds out from the flyer.',
        effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }, { op: 'ROOM_REL', d: -4 }, { op: 'TRUST', who: '$touring', d: 3 }],
        result: 'You moved it. {owner|The owner} called to ask what happened.' }
    ]
  },

  {
    id: 'RECORD_RELEASE',
    when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 26,
    bind: ['band'],
    if: { trust: { who: '$band', min: 40 } },
    telegraph: null, replaces: null,
    title: 'Record release',
    body: '{band}: "the tapes are finally done! we want to do a release show on a saturday, and honestly we\'d like to take the door since it\'s our release. would that be okay?"',
    options: [
      { id: 'GIVE_DOOR', label: 'Give them the night and the door', likely: 'They\'ll remember it, and you make nothing that night.',
        effects: [{ op: 'MESSAGE', from: '$band', text: 'ok we\'re looking at saturdays now. thank you so much, we\'re going to get everybody we know to come.', delay: 1, localAsk: 'RELEASE' },
                  { op: 'TRUST', who: '$band', d: 5 }],
        result: 'You said yes. {band} is already picking a date.' },
      { id: 'SPLIT', label: 'Give them the night on a split', likely: 'It\'s a fair deal and they\'re happy enough with it.',
        effects: [{ op: 'MESSAGE', from: '$band', text: 'a split works for us. I\'ll send you some dates tonight.', delay: 1, localAsk: 'RELEASE' },
                  { op: 'TRUST', who: '$band', d: 2 }],
        result: 'A release show on a split. {band} said that\'s fair.' },
      { id: 'FRIDAY', label: 'Offer them a Friday instead', likely: 'They wanted a Saturday, so they\'ll take it, but a little less happily.',
        effects: [{ op: 'MESSAGE', from: '$band', text: 'a friday could work, I think. let me talk to everybody and get back to you.', delay: 2, localAsk: 'RELEASE' },
                  { op: 'TRUST', who: '$band', d: -1 }],
        result: 'You offered a Friday. {band} is thinking about it.' }
    ]
  },

  {
    id: 'NEVER_PLAYED',
    when: 'WEEK', tier: 'GENTLE', weight: 1, cooldown: 16,
    bind: [],
    if: { weekMin: 3 },
    telegraph: null, replaces: null,
    title: 'The kids who\'ve never played',
    body: 'A message from a kid you\'ve seen at shows: "hey, could my band open one of your shows sometime? we\'ve never played a show before but we have four songs, and one of them is about our bus driver."',
    options: [
      { id: 'FIRST_SLOT', label: 'Put them first at your next all-ages show', likely: 'All their friends will come to see them, and they might not be very good yet.',
        effects: [{ op: 'NEW_BAND', from: 'KIDS', genre: 'HOT', wantsShow: true }, { op: 'FOLLOWERS', d: 3 }],
        result: 'They said "oh my god" four times in one message, and they\'ll be asking for a date soon.' },
      { id: 'PRACTICE', label: 'Tell them to play a practice-space show first', likely: 'It\'s a gentle no, and they\'ll come back with more than four songs.',
        effects: [{ op: 'NEW_BAND', from: 'KIDS', genre: 'HOT', wantsShow: false }],
        result: 'You told them to play for their friends first. They said okay.' },
      { id: 'SEE_FIRST', label: 'Tell them you\'ll come hear them practice', likely: 'It takes an evening of your week, but you\'ll know what you\'re booking.',
        effects: [{ op: 'NEW_BAND', from: 'KIDS', genre: 'HOT', wantsShow: true }, { op: 'HOURS', d: -2, when: 'WEEK' }, { op: 'STRESS', d: -1 }],
        result: 'You sat on a bucket in a garage for an hour. They\'re loud and they\'re really trying.' }
    ]
  },

  {
    id: 'COVERED',
    when: 'WEEK', tier: 'GENTLE', weight: 1, cooldown: 10,
    bind: ['show'],
    if: { jobDone: 'FLYER_RUN', daysOut: [5, 20] },
    telegraph: null, replaces: null,
    title: 'Covered',
    body: 'Somebody put their flyers right over yours at the record store and the coffee place. Their show is the week after yours.',
    options: [
      { id: 'REPOST', label: 'Go put yours back up', likely: 'It takes an hour of your week, and your posters are back where they were.',
        effects: [{ op: 'HOURS', d: -1, when: 'WEEK' }],
        result: 'You put yours back up next to theirs, without covering any of them.' },
      { id: 'MESSAGE', label: 'Message the other booker', likely: 'They might fix it, or they might say it was their poster runner who did it.',
        effects: [{ op: 'CHANCE', p: 0.5,
                    then: [{ op: 'NOTHING' }],
                    else: [{ op: 'SHOW_MOD', key: 'genMul', gen: 2, v: 0.93 }],
                    thenText: 'They said sorry and had their runner fix it the same day.',
                    elseText: 'They said it wasn\'t them. Your posters stayed covered.' }],
        result: 'You sent a message.' },
      { id: 'LET_GO', label: 'Let it go', likely: 'Posters reach older people, and fewer of them will see yours.',
        effects: [{ op: 'SHOW_MOD', key: 'genMul', gen: 2, v: 0.9 }],
        result: 'You let it go, and your posters stayed under theirs.' }
    ]
  },

  {
    id: 'COPY_PLACE_CLOSED',
    when: 'WEEK', tier: 'GENTLE', weight: 1, cooldown: 16,
    bind: ['show'],
    if: { jobNotDone: 'PRINT', daysOut: [10, 30] },
    telegraph: null, replaces: null,
    title: 'The copy place is closed',
    body: 'The copier at the copy place is broken until Friday. There\'s a sign on it in marker.',
    options: [
      { id: 'HAND_DRAWN', label: 'Draw them by hand and copy them at the library', likely: 'It takes two hours and the flyer looks different, which people sometimes love.',
        effects: [{ op: 'HOURS', d: -2, when: 'WEEK' },
                  { op: 'CHANCE', p: 0.4,
                    then: [{ op: 'FOLLOWERS', d: 5 }],
                    else: [{ op: 'NOTHING' }],
                    thenText: 'People loved the hand-drawn ones. Two got taken off the wall and kept.',
                    elseText: 'The library copies came out a little gray, but they did the job.' }],
        result: 'You spent an evening with a marker and a stack of library change.' },
      { id: 'WAIT', label: 'Wait till Friday', likely: 'It\'s free, but the posters go up late.',
        effects: [{ op: 'SHOW_MOD', key: 'reachMul', v: 0.95 }],
        result: 'You\'ll print Friday. The posters will be a few days late.' },
      { id: 'HELPER', label: 'Ask a helper with a printer', likely: 'A favor from someone in your circle.',
        needs: { hasHelper: 'ARTIST' },
        effects: [{ op: 'NOTHING' }],
        result: 'Your helper printed them at home on slightly different paper, and nobody noticed.' }
    ]
  },

  {
    id: 'SOUND_GOT_A_GIG',
    when: 'WEEK', tier: 'GENTLE', weight: 1, cooldown: 20,
    bind: ['show', 'sound', 'closer'],
    if: { daysOut: [2, 10], hasCrew: 'sound' },
    telegraph: null, replaces: null,
    title: 'Sound got a paid gig',
    body: '{sound}: "hey, I can\'t do the {date:ord} anymore, I got a wedding that night and weddings actually pay. my buddy {new} can cover it. {new} knows how to run a board, just not your room like I do."',
    options: [
      { id: 'TAKE_FRIEND', label: 'Take {new} for the same {soundRate:money}', likely: '{new} charges what {sound} did, {soundRate:money} a night, and the sound will be a little worse.',
        effects: [{ op: 'CREW', role: 'sound', to: 'NEW', skill: 0.55, rate: 'SAME' }],
        result: '{new} texted back: "Thanks for having me. Send me the address and the load-in time, and I\'ll get there early to figure out the room." {new} is on sound for {soundRate:money}, the same as {sound}.' },
      { id: 'BAND_PA', label: 'Ask {closer} to run it off their PA, $0', likely: 'It costs you nothing, so you save {soundRate:money}, but it sounds worse, the changeovers run about ten minutes long, and you owe {closer} a favor.',
        needs: { bands: [2, 5] },
        effects: [{ op: 'CREW', role: 'sound', to: 'BAND' }, { op: 'TRUST', who: '$closer', d: -1 }, { op: 'SHOW_MOD', key: 'lateMin', v: 10 }],
        result: '{closer} wrote back: "Yeah, we can run it off ours. It won\'t sound amazing, and we\'ll need a few extra minutes between bands to swap stuff around." Nobody is paid for sound that night.' },
      { id: 'MOVE', label: 'Move the show to a night {sound} can do', likely: 'It breaks the date and costs you trust with everyone.',
        effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
        result: '{sound} wrote: "Oh man, thank you, that really helps me out." You moved it a day, and not everyone can make the new one.' }
    ]
  },

  {
    id: 'LANDLORD_HEARD',
    when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 20,
    bind: ['show', 'owner'],
    if: { roomKind: ['HOUSE'], daysOut: [5, 30] },
    telegraph: null, replaces: null,
    title: 'The landlord heard',
    body: '{owner}: "so my landlord got a call from somebody about the last show. he\'s not mad yet, he\'s just asking questions, but I really can\'t lose this house."',
    options: [
      { id: 'MOVE', label: 'Move the show somewhere else', likely: 'The house gets a break, but everybody has to find the new room.',
        effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: true }, { op: 'ROOM_REL', d: 3 }],
        result: 'You moved it. {owner} was relieved and tried not to show it.' },
      { id: 'QUIETER', label: 'Do it quieter: earlier, shorter, a quiet opener', likely: 'It\'s a smaller, softer night, and the house stays out of trouble with the landlord.',
        effects: [{ op: 'SHOW_MOD', key: 'soundAdd', v: -0.05 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }, { op: 'ROOM_REL', d: 2 }],
        result: 'Doors earlier, done by ten, the quiet band first. {owner} said thank you.' },
      { id: 'ANYWAY', label: 'Do it anyway', likely: 'Nothing changes tonight. The house and the host are both at risk.',
        effects: [{ op: 'ROOM_REL', d: -5 }, { op: 'ROOM_PRESSURE', d: 15 },
                  { op: 'FOLLOWUP', event: 'LANDLORD_HEARD', delay: [4, 10], p: 0.3 }],
        result: 'You kept it as it was. {owner} said okay, but didn\'t sound like it.' }
    ]
  },

  {
    id: 'COVER_A_SHIFT',
    when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 8,
    bind: ['show'],
    if: { bills: true, jobNotDone: 'MAKE_FLYER', daysOut: [14, 35] },
    telegraph: null, replaces: null,
    title: 'Cover a shift',
    body: 'Work wants you to cover a shift this week, on the evening you set aside for the flyer.',
    options: [
      { id: 'TAKE', label: 'Take the shift', likely: 'You get the money this month, and the flyer waits.',
        effects: [{ op: 'MONEY', amount: 80, cat: 'WAGES' }, { op: 'HOURS', d: -4, when: 'WEEK' }],
        result: 'You took the shift. The flyer is a problem for later.' },
      { id: 'SAY_NO', label: 'Say no', likely: 'The flyer gets made, but you\'re short this month and your manager remembers.',
        effects: [{ op: 'STRESS', d: 3 }],
        result: 'You said no. Your manager said "sure" in a way that wasn\'t sure.' },
      { id: 'HELPER', label: 'Take the shift and ask a helper to do the flyer', likely: 'Money and a flyer, if your helper comes through.',
        needs: { hasHelper: 'ARTIST' },
        effects: [{ op: 'MONEY', amount: 80, cat: 'WAGES' }, { op: 'HOURS', d: -4, when: 'WEEK' }, { op: 'JOB', type: 'MAKE_FLYER', set: 'DONE' }],
        result: 'You took the shift. Your helper sent a photo of the flyer at midnight.' }
    ]
  },

  {
    id: 'CAR_WONT_START',
    when: 'WEEK', tier: 'GENTLE', weight: 1, cooldown: 12,
    bind: ['show'],
    if: { jobNotDone: 'FLYER_RUN', daysOut: [7, 25] },
    telegraph: null, replaces: null,
    title: 'The car won\'t start',
    body: 'Your car won\'t start. The posters are in the trunk.',
    options: [
      { id: 'BUS', label: 'Bus and bike', likely: 'The route takes twice as long.',
        effects: [{ op: 'HOURS', d: -3, when: 'WEEK' }],
        result: 'You did the route with a backpack full of posters and a bus pass.' },
      { id: 'RUNNER', label: 'Ask a helper with a car', likely: 'It\'s a favor, and the route gets done on time.',
        needs: { hasHelper: 'RUNNER' },
        effects: [{ op: 'NOTHING' }],
        result: 'Your runner picked up the posters and did the route.' },
      { id: 'NEXT_WEEK', label: 'Do the route next week', likely: 'It\'s free, but the posters go up a week late.',
        effects: [{ op: 'SHOW_MOD', key: 'reachMul', v: 0.95 }],
        result: 'The posters will wait a week in the trunk.' }
    ]
  },

  {
    id: 'NOW_THEY_WANT_MONEY',
    when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 26,
    bind: ['band'],
    if: { trust: { who: '$band', min: 45 }, weekMin: 20 },
    telegraph: null, replaces: null,
    title: 'Now they want money',
    body: '{band}: "hey, so we\'ve played your shows for free for a long time and we\'ve loved doing it, but people come out for us now and we\'re trying to save up for a van. could we get $50 a show from now on?"',
    options: [
      { id: 'PAY', label: 'Pay them', likely: 'It\'s fifty a show from now on, and they\'ll feel like a real band.',
        effects: [{ op: 'TRUST', who: '$band', d: 5 }],
        result: 'You said yes. {band} sent a lot of exclamation points.' },
      { id: 'CUT', label: 'Offer them a cut of the door', likely: 'They make more when they bring more people, which is fair, but it\'s less certain for them.',
        effects: [{ op: 'TRUST', who: '$band', d: 2 }],
        result: 'A share of the door. {band} said that\'s fair.' },
      { id: 'CANT', label: 'Say you can\'t', likely: 'Trust drops, and they may start playing for other bookers.',
        effects: [{ op: 'TRUST', who: '$band', d: -5 }],
        result: 'You said you can\'t. {band} said they understand, and that they\'ll ask around.' }
    ]
  },

  {
    /* SPEC? 00-overview 2.1 says other bookers share a bill only through an event choice, but no effect op makes a
     * shared show. Accepting sets the flag coPromote for the engine to read; otherwise it moves relationship and Name. */
    id: 'CO_PROMOTE',
    when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 26,
    bind: ['booker'],
    if: { rel: { who: '$booker', min: 30 }, stage: [2, 4] },
    telegraph: null, replaces: null,
    title: 'Co-promote?',
    body: '{booker}: "Hey, there\'s a band coming through in a couple of months that\'s too big for either of us to do alone. I can get the room if you put the bill together. Want to split it?"',
    options: [
      { id: 'ACCEPT', label: 'Accept', likely: 'Both your names go on the flyer, and you share a bigger night.',
        effects: [{ op: 'REL', who: '$booker', d: 5 }, { op: 'NAME', d: 1 }, { op: 'FLAG', key: 'coPromote', v: true }],
        result: 'You said yes. "{bookingName} and friends present," more or less.' },
      { id: 'DECLINE', label: 'Decline', likely: 'You keep your nights to yourself, and {booker} is a little put out.',
        effects: [{ op: 'REL', who: '$booker', d: -2 }],
        result: 'You passed. {booker} said maybe next time.' },
      { id: 'NAME_FIRST', label: 'Accept, but ask for your name first on the flyer', likely: 'Maybe they agree. Maybe they think you\'re getting big for your boots.',
        effects: [{ op: 'CHANCE', p: 0.5,
                    then: [{ op: 'REL', who: '$booker', d: 2 }, { op: 'NAME', d: 2 }, { op: 'FLAG', key: 'coPromote', v: true }],
                    else: [{ op: 'REL', who: '$booker', d: -4 }],
                    thenText: '{booker} laughed and said fine, your name first.',
                    elseText: '{booker} said forget it, since it\'s their room.' }],
        result: 'You asked for top billing.' }
    ]
  },

  {
    id: 'GOING_AWAY_SHOW',
    when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 26,
    bind: ['regular', 'band'],
    if: { regularsMin: 6 },
    telegraph: null, replaces: null,
    title: 'A going-away show',
    body: '{regular}: "so I\'m moving at the end of the month for a job. could you do one last show with {band} and my friends\' bands before I go? I\'d owe you big."',
    options: [
      { id: 'BOOK', label: 'Book it', likely: 'It\'s a warm night that draws, and people will talk about it for a while.',
        effects: [{ op: 'MESSAGE', from: '$band', text: 'hey, we heard about the going-away show and we\'re in, obviously. when is it?', delay: 1, localAsk: 'GOING_AWAY' },
                  { op: 'REL', who: '$regular', d: 6 }],
        result: 'You said yes. {regular} cried a little in the message.' },
      { id: 'FOLD', label: 'Fold it into a show you already have', likely: 'It\'s less work, but it\'s a smaller send-off.',
        effects: [{ op: 'REL', who: '$regular', d: 3 }, { op: 'TRUST', who: '$band', d: 1 }],
        result: 'Their send-off will be the next one of yours. {regular} said that\'s perfect.' },
      { id: 'PASS', label: 'Pass', likely: 'Your calendar stays as it is, and {regular} is disappointed.',
        effects: [{ op: 'REL', who: '$regular', d: -3 }],
        result: 'You couldn\'t. {regular} said they understand.' }
    ]
  },

  {
    id: 'BROKE_UP_TUESDAY',
    when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 20,
    bind: ['show', 'closer'],
    if: { daysOut: [3, 12] },
    telegraph: null, replaces: null,
    title: 'They broke up on Tuesday',
    body: '{closer} broke up on Tuesday. They\'ll still play {dow} if you want them to, and it would be their last show.',
    options: [
      { id: 'LAST_SHOW', label: 'Make it their last show', likely: 'It\'ll be a bigger night with a lot of feelings in the room, and you have to reprint the flyer.',
        effects: [{ op: 'FLYER_TAG', tag: 'LAST_SHOW' }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }, { op: 'SHOW_MOD', key: 'qAdd', v: 3 },
                  { op: 'HOURS', d: -1, when: 'WEEK' }],
        result: 'LAST SHOW goes on the flyer. People who haven\'t been out in a year are asking about it.' },
      { id: 'REPLACE', label: 'Replace them', likely: 'Someone who always says yes fills the slot, and the night is smaller and calmer.',
        effects: [{ op: 'DROP_BAND', who: '$closer' }, { op: 'ADD_BAND', pick: 'ALWAYS_YES' }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.92 }],
        result: 'You found someone else. {closer} said that\'s probably for the best.' }
    ]
  },

  {
    id: 'DOWN_A_MEMBER',
    when: 'WEEK', tier: 'GENTLE', weight: 1, cooldown: 12,
    bind: ['band'],
    if: { trust: { who: '$band', min: 20 } },
    telegraph: null, replaces: null,
    title: 'Down a member',
    body: '{band}: "so our bass player quit last week. we still want to keep playing as a three-piece for now, is that weird?"',
    options: [
      { id: 'FINE', label: 'Tell them it\'s fine', likely: 'They keep playing, with a smaller sound for a while.',
        effects: [{ op: 'TRUST', who: '$band', d: 2 }],
        result: 'You said it\'s fine. Plenty of bands are three people.' },
      { id: 'WAIT', label: 'Ask them to wait till they have someone', likely: 'They take a break from your shows, and they might not like that.',
        effects: [{ op: 'TRUST', who: '$band', d: -1 }],
        result: 'You asked them to wait. They said they\'ll let you know.' },
      { id: 'SUGGEST', label: 'Suggest a bass player you know', likely: 'It takes an hour of messages, and you might end up making a band.',
        effects: [{ op: 'TRUST', who: '$band', d: 3 }, { op: 'HOURS', d: -1, when: 'WEEK' }],
        result: 'You put them in touch with someone. They\'re meeting at the practice space Thursday.' }
    ]
  },

  {
    id: 'NEW_BAND_OLD_PIECES',
    when: 'WEEK', tier: 'GENTLE', weight: 1, cooldown: 16,
    bind: [],
    if: { weekMin: 8 },
    telegraph: null, replaces: null,
    title: 'A new band from old pieces',
    body: 'People from three local bands started something new. They want a first show, and they think it should be one of yours.',
    options: [
      { id: 'GOOD_SLOT', label: 'Promise them a good slot', likely: 'Everybody\'s friends come to see the new thing.',
        effects: [{ op: 'NEW_BAND', from: 'MEMBERS', genre: 'HOT', wantsShow: true }, { op: 'FOLLOWERS', d: 3 }],
        result: 'They\'ll ask for a date. Their friends are already talking about it.' },
      { id: 'FIRST', label: 'Put them first on a bill', likely: 'They get a start without anybody getting their hopes up too high.',
        effects: [{ op: 'NEW_BAND', from: 'MEMBERS', genre: 'HOT', wantsShow: true }],
        result: 'They\'ll open your next one. They said that\'s fair.' },
      { id: 'WAIT', label: 'Wait to hear them', likely: 'They keep practicing, and you\'ll know what you\'re booking.',
        effects: [{ op: 'NEW_BAND', from: 'MEMBERS', genre: 'HOT', wantsShow: false }],
        result: 'You asked for a practice recording first.' }
    ]
  },

  {
    id: 'SOUND_AT_SCHOOL',
    when: 'WEEK', tier: 'GENTLE', weight: 1, cooldown: 20,
    bind: [],
    if: { weekMin: 4 },
    telegraph: null, replaces: null,
    title: 'A sound at school',
    body: 'A kid at your last show: "everybody at my school is into this new kind of stuff, it\'s fast but kind of weird. you should book some of it, people would come."',
    options: [
      { id: 'ASK_WHO', label: 'Ask who\'s playing it', likely: 'You get some band names, and maybe one of them wants a show.',
        effects: [{ op: 'TREND_SIGN', genre: 'HOT' }, { op: 'NEW_BAND', from: 'KIDS', genre: 'HOT', wantsShow: true }],
        result: 'The kid named two bands and gave you a number for one of them.' },
      { id: 'NOTE', label: 'Write it down', likely: 'It goes in your notebook as something to keep an eye on.',
        effects: [{ op: 'TREND_SIGN', genre: 'HOT' }, { op: 'NOTE', text: 'A kid says everybody at school is into a new sound. Heard once, from one kid.', conf: 1 }],
        result: 'You wrote it down.' },
      { id: 'IGNORE', label: 'Let it go', likely: 'Kids say a lot of things.',
        effects: [{ op: 'NOTHING' }],
        result: 'You nodded and forgot about it.' }
    ]
  },

  {
    /* SPEC? No effect op creates a show. Throwing together a show sets the flag rescueOffered for the engine
     * (SB.Requests can turn it into a RESCUE request); the trust and standing parts stand on their own. */
    id: 'STRANDED_BAND',
    when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 12,
    bind: ['contact'],
    if: { rel: { who: '$contact', min: 30 } },
    telegraph: null, replaces: null,
    title: 'A stranded band',
    body: '{contact}: "Hey, I\'ve got a band from out of town with a hole on Wednesday. They\'re good, I\'ve had them here twice. They need a floor to sleep on and any kind of show at all. Can you do anything?"',
    options: [
      { id: 'THROW', label: 'Throw together a show', likely: 'There\'s hardly any time for a flyer, so it\'s a small night, but the band will owe you.',
        effects: [{ op: 'REL', who: '$contact', d: 5 }, { op: 'STRESS', d: 5 }, { op: 'WORD', d: 1 }, { op: 'FLAG', key: 'rescueOffered', v: true }],
        result: 'You said yes, and you have four days and no room yet.' },
      { id: 'FLOOR_ONLY', label: 'Find them a floor and no show', likely: 'They get a night\'s sleep, and {contact} remembers it.',
        effects: [{ op: 'REL', who: '$contact', d: 2 }, { op: 'STRESS', d: 2 }],
        result: 'You found them a floor. They left a tape on the counter.' },
      { id: 'PASS', label: 'Pass', likely: 'Your week stays your own, and {contact} thinks a little less of you.',
        effects: [{ op: 'REL', who: '$contact', d: -3 }],
        result: 'You couldn\'t. {contact} said no worries, in a way that had some worries in it.' }
    ]
  },

  {
    id: 'SHOP_OUT_BACK',
    when: 'WEEK', tier: 'GENTLE', weight: 1, cooldown: 52,
    bind: [],
    if: { weekMin: 10 },
    telegraph: null, replaces: null,
    title: 'The shop out back',
    body: 'An old head who comes to everything says you can use his auto shop on weekends. "I\'ll roll the cars out on a Saturday and you can roll the bands in. Just sweep up after, I\'ve got customers first thing Monday."',
    options: [
      { id: 'TAKE', label: 'Take it', likely: 'It\'s a new room and it\'s cheap, but it has no reputation yet and nobody knows where it is.',
        effects: [{ op: 'NEW_ROOM', kind: 'DIY', hood: null }],
        result: 'You have a new room. It smells like motor oil.' },
      { id: 'VISIT', label: 'Go look at it first', likely: 'It takes an evening of your week, but you\'ll know what you\'re getting.',
        effects: [{ op: 'HOURS', d: -2, when: 'WEEK' }, { op: 'NEW_ROOM', kind: 'DIY', hood: null }, { op: 'STRESS', d: -1 }],
        result: 'You walked through it with him. It has two bay doors, one outlet that works, and a lot of room.' },
      { id: 'PASS', label: 'Pass', likely: 'Nothing changes.',
        effects: [{ op: 'NOTHING' }],
        result: 'You thanked him and said maybe later.' }
    ]
  },

  {
    id: 'ADDRESS_IS_OUT',
    when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 12,
    bind: ['show', 'owner'],
    if: { roomKind: ['HOUSE', 'DIY'], daysOut: [2, 14] },
    telegraph: null, replaces: null,
    title: 'The address is out',
    body: 'Somebody posted the address for {dow}\'s show where anybody can see it. {owner} has seen it too.',
    options: [
      { id: 'ASK_DOWN', label: 'Ask them to take it down', likely: 'It\'s one message, and most people take it down.',
        effects: [{ op: 'CHANCE', p: 0.75,
                    then: [{ op: 'NOTHING' }],
                    else: [{ op: 'ROOM_REL', d: -3 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.05 }],
                    thenText: 'They took it down within the hour, and apologized.',
                    elseText: 'They didn\'t see your message till the next day. People had already passed it around.' }],
        result: 'You sent a message.' },
      { id: 'MOVE', label: 'Move the show', likely: 'The host is relieved, but everybody needs to hear about the new room.',
        effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: true }, { op: 'ROOM_REL', d: 2 }],
        result: 'You moved it. {owner} thanked you.' },
      { id: 'LEAVE', label: 'Leave it', likely: 'More strangers will come, which means more risk, and the host is unhappy.',
        effects: [{ op: 'ROOM_REL', d: -5 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.08 }],
        result: 'You left it up. {owner} didn\'t say anything about it, and didn\'t say much to you at the show either.' }
    ]
  },

  {
    id: 'BOOKED_AGAINST_YOU',
    when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 12,
    bind: ['show'],
    if: { daysOut: [7, 30], stage: [1, 4] },
    telegraph: 'Another booker put a show on the same night as yours.', replaces: null,
    title: 'Someone\'s booked against you',
    body: 'After you announced, another booker put a show on {dow} the {date:ord} with a crowd a lot like yours.',
    options: [
      { id: 'STAGGER', label: 'Message them to stagger the times', likely: 'If they agree, people can go to both. If not, you split the crowd.',
        effects: [{ op: 'CHANCE', p: 0.5,
                    then: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.97 }],
                    else: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
                    thenText: 'They\'ll start early and send people over after. Both nights will be fine.',
                    elseText: 'They said they\'d already announced their times. You\'re splitting the crowd.' }],
        result: 'You sent a message.' },
      { id: 'PUSH', label: 'Push harder', likely: 'It takes two more evenings of promotion, and you keep more of your crowd.',
        effects: [{ op: 'HOURS', d: -2, when: 'WEEK' }, { op: 'SHOW_MOD', key: 'reachMul', v: 1.08 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.92 }],
        result: 'You doubled down: more posters, more messages, a post every day.' },
      { id: 'MOVE', label: 'Move yours', likely: 'The clash goes away, but moving costs you some people and some trust.',
        effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: true }],
        result: 'You moved yours to the next night.' }
    ]
  },

  {
    id: 'TAKE_A_NIGHT',
    when: 'WEEK', tier: 'GENTLE', weight: 1, cooldown: 8,
    bind: [],
    if: { stress: [45, 100] },
    telegraph: null, replaces: null,
    title: 'Take a night',
    body: 'A friend says you look tired and wants to drag you to a movie on Wednesday.',
    options: [
      { id: 'GO', label: 'Go', likely: 'You lose an evening of planned work, but you feel like a person again.',
        effects: [{ op: 'STRESS', d: -8 }, { op: 'HOURS', d: -3, when: 'WEEK' }],
        result: 'You went. You didn\'t check your phone for two hours.' },
      { id: 'DONT', label: 'Don\'t', likely: 'You get the work done, and you stay tired.',
        effects: [{ op: 'STRESS', d: 2 }],
        result: 'You stayed home and made a flyer. Your friend said next time.' }
    ]
  },

  /* ======================= Further show-night events (story 7.6, general items) ======================= */

  {
    id: 'NO_ID',
    when: 'NIGHT', tier: 'REAL', weight: 1, cooldown: 0,
    bind: ['show', 'owner'],
    if: { ages: 'A21' },
    at: 'DOORS',
    risk: { base: 0.05 },
    telegraph: null, replaces: null,
    title: 'No ID',
    body: '{t}. There are four kids at the door who came to see their friend\'s band, and none of them is twenty-one.',
    options: [
      { id: 'TURN_AWAY', label: 'Turn them away', likely: 'You follow the rule, and their friend\'s band plays to fewer friends.',
        effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
        result: 'You turned them away. They sat on the curb and listened through the wall.' },
      { id: 'X_HANDS', label: 'X their hands and let them stand in the back', likely: '{owner} has to say yes. You get a few more people in, and the owner watches them all night.',
        needs: { rel: { who: '$owner', min: 50 } },
        effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.03 }, { op: 'ROOM_REL', d: -2 }, { op: 'FOLLOWERS', d: 3 }],
        result: 'Big X\'s on both hands. They stood in the back and didn\'t move all night.' },
      { id: 'MATINEE', label: 'Promise them an all-ages matinee next month', likely: 'Nobody gets in tonight, and you owe them a show next month.',
        effects: [{ op: 'FLAG', key: 'promisedMatinee', v: true }, { op: 'FOLLOWERS', d: 2 }],
        result: 'You promised a matinee. One of them wrote it on her hand.' }
    ]
  },

  {
    id: 'MERCH_IN_THE_DOORWAY',
    when: 'NIGHT', tier: 'GENTLE', weight: 1, cooldown: 0,
    bind: ['show', 'touring'],
    if: {},
    at: 'CHANGEOVER',
    risk: { base: 0.05 },
    telegraph: null, replaces: null,
    title: 'Merch in the doorway',
    body: '{t}. {touring} set up their merch table right in front of the only other exit.',
    options: [
      { id: 'MOVE_IT', label: 'Ask them to move it', likely: 'They\'ll grumble for a minute.',
        effects: [{ op: 'TRUST', who: '$touring', d: -1 }],
        result: 'They moved it next to your spot at the door. They sold more there anyway.' },
      { id: 'LEAVE_IT', label: 'Leave it', likely: 'Probably nothing happens, but {owner|the host} notices.',
        effects: [{ op: 'ROOM_REL', d: -3 }],
        result: 'You left it. {owner|The host} looked at it twice.' }
    ]
  },

  {
    id: 'BROKEN_PEDAL',
    when: 'NIGHT', tier: 'GENTLE', weight: 1, cooldown: 0,
    bind: ['show'],
    if: {},
    at: 'SET:1',
    risk: { base: 0.05 },
    telegraph: null, replaces: null,
    title: 'A broken pedal',
    body: '{t}. The drummer\'s kick pedal snapped two songs in.',
    options: [
      { id: 'BORROW', label: 'Borrow one from another band', likely: 'It\'s quick if the gear was sorted out ahead of time. Otherwise somebody has to dig through cases.',
        effects: [{ op: 'CHANCE', p: 0.6, pIf: [{ if: { jobDone: 'SORT_GEAR' }, p: 1 }],
                    then: [{ op: 'SHOW_MOD', key: 'lateMin', v: 3 }],
                    else: [{ op: 'SHOW_MOD', key: 'lateMin', v: 12 }],
                    thenText: 'The next band had a spare pedal on top of their case, and it took three minutes.',
                    elseText: 'It took twelve minutes to find a pedal that fit.' }],
        result: 'You asked the other bands.' },
      { id: 'FIND', label: 'Send someone to find one', likely: 'It takes half an hour, and the night runs late.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 30 }],
        result: 'Somebody drove home for a pedal, and it took thirty minutes.' },
      { id: 'WITHOUT', label: 'Play without the kick', likely: 'There\'s no wait, but it sounds thin.',
        effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }, { op: 'SHOW_MOD', key: 'soundAdd', v: -0.05 }],
        result: 'They finished the set on snare and toms. People were nice about it.' }
    ]
  },

  {
    id: 'RAIN_AT_DOORS',
    when: 'NIGHT', tier: 'REAL', weight: 1, cooldown: 0,
    bind: ['show'],
    if: { outdoor: true },
    at: 'DOORS',
    risk: { base: 0.03, mul: [{ if: { weather: 'RAIN' }, x: 8 }] },
    telegraph: null, replaces: null,
    title: 'Rain at doors',
    body: '{t}. It started pouring right at doors. People are standing under the eaves.',
    options: [
      { id: 'PACK_IN', label: 'Move under cover and pack it tight', likely: 'Fewer people fit, but the ones who do will remember it.',
        effects: [{ op: 'SHOW_MOD', key: 'capMul', v: 0.6 }, { op: 'SHOW_MOD', key: 'qAdd', v: 2 }],
        result: 'Everybody crammed under the roof. It was hot and loud and nobody minded.' },
      { id: 'WAIT', label: 'Wait it out', likely: 'It usually passes, but every set slides back.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 40 },
                  { op: 'CHANCE', p: 0.7,
                    then: [{ op: 'NOTHING' }],
                    else: [{ op: 'SHOW_MOD', key: 'endEarly', v: true }],
                    thenText: 'It passed after forty minutes, and steam came off the yard during the first set.',
                    elseText: 'It didn\'t stop. You called it after one band.' }],
        result: 'You waited.' },
      { id: 'CALL', label: 'Call it', likely: 'Everybody goes home dry, and the bands get what\'s in the box.',
        effects: [{ op: 'SHOW_MOD', key: 'endEarly', v: true }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.6 }],
        result: 'You called it. One band played a short set to the people who stayed.' }
    ]
  },

  {
    id: 'ONE_MORE_SONG',
    when: 'NIGHT', tier: 'GENTLE', weight: 1, cooldown: 0,
    bind: ['show', 'closer'],
    if: {},
    at: 'LATE',
    risk: { base: 0.08 },
    telegraph: null, replaces: null,
    title: 'One more song',
    body: '{t}. {closer} wants to play past the curfew. The crowd is yelling for it.',
    options: [
      { id: 'LET_THEM', label: 'Let them', likely: 'The room goes home happy, but {owner|the owner} doesn\'t.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 8 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }, { op: 'ROOM_REL', d: -3 }, { op: 'TRUST', who: '$closer', d: 1 }],
        result: 'They played two more songs while {owner|the owner} stood by the light switch.' },
      { id: 'CUT', label: 'Cut them off', likely: 'The room gets out on time, but the band is a little stung.',
        effects: [{ op: 'TRUST', who: '$closer', d: -2 }],
        result: 'You gave them the sign. They stopped mid-song and thanked everybody.' },
      { id: 'TWO_MINUTES', label: 'Two more minutes', likely: 'They get one short song and nobody\'s really upset.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 2 }, { op: 'ROOM_REL', d: -1 }],
        result: 'They played one fast song and were done.' }
    ]
  },

  {
    id: 'A_LITTLE_MORE',
    when: 'NIGHT', tier: 'GENTLE', weight: 1, cooldown: 0,
    bind: ['show', 'touring'],
    if: {},
    at: 'SETTLE',
    risk: { base: 0.06 },
    telegraph: null, replaces: null,
    title: 'Can we get a little more?',
    body: '{touring} is counting what you handed them. "Hey, I hate to ask, but is there anything extra? Gas to the next town is going to be a lot and we\'re pretty low right now."',
    options: [
      { id: 'YOUR_CUT', label: 'Give them your cut', likely: 'You go home with nothing, and they don\'t forget it.',
        effects: [{ op: 'MONEY', amount: -40, cat: 'TOURING' }, { op: 'TRUST', who: '$touring', k: 'GAVE_ALL' }],
        result: 'You gave them your forty. They hugged you, all four of them.' },
      { id: 'HAT', label: 'Ask at the door for gas money', likely: 'People usually come through.',
        effects: [{ op: 'SHOW_MOD', key: 'hatBonus', v: 40 }, { op: 'TRUST', who: '$touring', d: 2 }],
        result: 'The door asked everybody for a few extra for their gas. People were generous.' },
      { id: 'MATH', label: 'Show them the math', likely: 'They see where every dollar went, and some bands appreciate that more than others.',
        effects: [{ op: 'TRUST', who: '$touring', d: -1 }],
        result: 'You walked them through the sheet, and they nodded for a long time without saying much.' }
    ]
  },

  {
    id: 'DEMO_IN_YOUR_HAND',
    when: 'NIGHT', tier: 'GENTLE', weight: 1, cooldown: 0,
    bind: ['show'],
    if: {},
    at: 'CHANGEOVER',
    risk: { base: 0.05 },
    telegraph: null, replaces: null,
    title: 'A demo in your hand',
    body: '{t}. A kid hands you a tape with a band name in marker and a phone number on the back.',
    options: [
      { id: 'LISTEN', label: 'Listen tomorrow', likely: 'It takes an hour, and maybe you get a new band for your list.',
        effects: [{ op: 'NEW_BAND', from: 'KIDS', genre: 'HOT', wantsShow: true }, { op: 'HOURS', d: -1, when: 'WEEK' }],
        result: 'You listened on your break. It\'s rough, but there\'s something in there.' },
      { id: 'POCKET', label: 'Put it in your pocket', likely: 'Nothing, for now.',
        effects: [{ op: 'NOTHING' }],
        result: 'It went in your jacket pocket with the other ones.' }
    ]
  },

  {
    id: 'STREAM_IT',
    when: 'NIGHT', tier: 'GENTLE', weight: 1, cooldown: 0,
    bind: ['show'],
    if: {},
    at: 'SET:1',
    risk: { base: 0.05 },
    telegraph: null, replaces: null,
    title: 'They want to stream it',
    body: '{t}. Somebody asks if they can broadcast the show live from their phone.',
    options: [
      { id: 'FINE', label: 'Fine', likely: 'More people see it. At a house, someone might work out where it is.',
        effects: [{ op: 'FOLLOWERS', d: 8 },
                  { op: 'CHANCE', p: 0, pIf: [{ if: { roomKind: ['HOUSE', 'DIY'] }, p: 0.25 }],
                    then: [{ op: 'ROOM_REL', d: -4 }],
                    else: [{ op: 'NOTHING' }],
                    thenText: 'Somebody watching worked out which house it was from the street sign in the background.',
                    elseText: 'A few hundred people watched part of a set. Nobody found the house.' }],
        result: 'They held the phone up for two songs.' },
      { id: 'BANDS_ONLY', label: 'Only if the bands say yes', likely: 'Some of them will say yes, so fewer people see it, but nobody\'s upset.',
        effects: [{ op: 'FOLLOWERS', d: 4 }],
        result: 'One band said yes and one said no, so they streamed the one that said yes.' },
      { id: 'NO', label: 'No', likely: 'Nothing changes.',
        effects: [{ op: 'NOTHING' }],
        result: 'You said no. They put the phone away.' }
    ]
  },

  {
    id: 'NO_AIR',
    when: 'NIGHT', tier: 'REAL', weight: 1, cooldown: 0,
    bind: ['show', 'closer'],
    if: { months: [5, 6, 7, 8, 9] },
    at: 'SET:PEAK',
    risk: { base: 0.02, mul: [{ if: { weather: 'HEAT' }, x: 8 }] },
    telegraph: null, replaces: null,
    title: 'No air',
    body: '{t}. It\'s still hot out and hotter inside. People are standing in the doorway to breathe.',
    options: [
      { id: 'FANS', label: 'Doors open, fans, water by the case', likely: 'The water is on you, but people stay.',
        effects: [{ op: 'MONEY', amount: -25, cat: 'EVENT' }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
        result: 'You bought water by the case. People drank all of it.' },
      { id: 'SHORTER', label: 'Shorter sets', likely: 'The closer loses ten minutes, and everybody gets out sooner.',
        effects: [{ op: 'CUT_SET', who: '$closer', minutes: 10 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
        result: 'The sets got shorter and nobody complained.' },
      { id: 'PUSH_ON', label: 'Push through it', likely: 'It\'s free and usually fine, but somebody might go down.',
        effects: [{ op: 'CHANCE', p: 0.15,
                    then: [{ op: 'INCIDENT', kind: 'HURT', q: -6 }],
                    else: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
                    thenText: 'Somebody fainted near the front. They were fine after water and the porch.',
                    elseText: 'Everybody was soaked through, but nobody went down.' }],
        result: 'You kept going.' }
    ]
  },

  {
    id: 'COLD_NIGHT_OUTSIDE',
    when: 'NIGHT', tier: 'GENTLE', weight: 1, cooldown: 0,
    bind: ['show'],
    if: { outdoor: true, months: [11, 12, 1, 2] },
    at: 'DOORS',
    risk: { base: 0.02, mul: [{ if: { weather: 'COLD' }, x: 8 }] },
    telegraph: null, replaces: null,
    title: 'Cold night outside',
    body: '{t}. It\'s a lot colder than anyone planned for and the show is outside.',
    options: [
      { id: 'FIRE', label: 'Light the fire pit', likely: 'People huddle around it between sets. The host keeps an eye on it.',
        effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: 2 }, { op: 'ROOM_REL', d: -1 }],
        result: 'Everybody stood around the fire between sets. Nobody wanted to leave.' },
      { id: 'PACK_IN', label: 'Pack everyone under cover', likely: 'Fewer people fit, but it\'s warmer.',
        effects: [{ op: 'SHOW_MOD', key: 'capMul', v: 0.7 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
        result: 'Everybody packed in tight, and it was warm enough.' },
      { id: 'KEEP_GOING', label: 'Keep going as it is', likely: 'Some people leave early.',
        effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
        result: 'The band played in gloves. Some people left after two songs.' }
    ]
  }
];
