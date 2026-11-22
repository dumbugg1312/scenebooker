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
    body: '{t}. {heads:words:cap} through the door so far, by your own count, and the first band is tuned and waiting. They look over at you on the door: give it a few minutes?',
    options: [
      { id: 'ON_TIME', label: 'Start on time', likely: 'The first band plays to whoever is here. Nothing after it slips.',
        effects: [{ op: 'NOTHING' }],
        result: 'The first band started on time, to the people who were already there.' },
      { id: 'HOLD', label: 'Hold fifteen minutes', likely: 'A fuller room for the first band. Every set after starts fifteen minutes later.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 15 }, { op: 'SHOW_MOD', key: 'set1Presence', v: true }],
        result: 'You held fifteen minutes. The first band played to a fuller room, and the night will run a little later.' },
      { id: 'LOOSE_LIST', label: 'Let the bands put a few more friends on the list', likely: 'A fuller room early. Less in the cash box.',
        effects: [{ op: 'SHOW_MOD', key: 'comps', v: 6 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.03 }],
        result: 'The bands texted their friends. The room filled a little and the cash box didn\'t.' }
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
    body: 'Last song. The cash box and the tally sheet are on the table. {touring|The touring band} is loading out and hasn\'t asked about money yet.',
    options: [
      { id: 'WATCHED', label: 'Count it with {touring|the touring band} watching', likely: 'Ten more minutes. Nobody can argue with the number after.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 10 }, { op: 'SHOW_MOD', key: 'noDispute', v: true }],
        result: 'You counted it out loud with the band at the table. Everybody saw the same number.' },
      { id: 'ALONE', label: 'Count it yourself in the back', likely: 'Quicker. On a handshake deal, they may remember the number differently.',
        effects: [{ op: 'NOTHING' }],
        result: 'You counted it alone in the back. Quick, and your word against theirs if it comes to that.' }
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
    body: '{touring} remembers the deal as more than you do. Nothing was written down. (?amount: The difference is {amount:money}.)',
    options: [
      { id: 'THEIRS', label: 'Pay what they say', likely: 'Costs the difference. They leave happy and they tell people.',
        effects: [{ op: 'DISPUTE', resolve: 'THEIRS' }],
        result: 'You paid what they remembered. They thanked you twice at the van.' },
      { id: 'YOURS', label: 'Pay what you meant', likely: 'Keeps the difference. Costs some trust, and it may get talked about.',
        effects: [{ op: 'DISPUTE', resolve: 'YOURS' }],
        result: 'You paid what you meant. They took it, and they didn\'t say much.' },
      { id: 'SPLIT', label: 'Split the difference', likely: 'Half the cost, half the hard feelings.',
        effects: [{ op: 'DISPUTE', resolve: 'SPLIT' }],
        result: 'You split it. Nobody\'s thrilled and nobody\'s angry. Next time, write it down.' }
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
      { id: 'CONFIRM', label: 'Confirm now', likely: 'The night is yours. The deposit is due now, and the terms had better be settled.',
        effects: [{ op: 'ROOM_HOLD', do: 'CONFIRM' }, { op: 'REL', who: '$booker', d: -2 }],
        result: 'You confirmed. The night is yours, and {booker} knows it.' },
      { id: 'RELEASE', label: 'Let it go', likely: 'You lose the room and keep your money. You need another room for that night.',
        effects: [{ op: 'ROOM_HOLD', do: 'RELEASE' }, { op: 'REL', who: '$booker', d: 3 }],
        result: 'You let it go. {booker} owes you one, more or less.' },
      { id: 'MESSAGE', label: 'Message {booker} about it', likely: 'Maybe they take another night. It costs nothing to ask someone you get along with.',
        needs: { rel: { who: '$booker', min: 40 } },
        effects: [{ op: 'CHANCE', p: 0.6,
                    then: [{ op: 'ROOM_HOLD', do: 'CONFIRM' }, { op: 'REL', who: '$booker', d: 2 }],
                    else: [{ op: 'ROOM_HOLD', do: 'RELEASE' }, { op: 'REL', who: '$booker', d: 1 }],
                    thenText: '{booker} took the next weekend instead. You confirmed, no hard feelings.',
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
    body: '{owner} forgot about your {dow}. Somebody else has {room} that night. Theirs was written down; yours wasn\'t.',
    options: [
      { id: 'ANOTHER_NIGHT', label: 'Move it to the next night at {room}', likely: 'You keep the room. Some of the people who planned on the old night won\'t make the new one.',
        effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: true }, { op: 'ROOM_REL', d: 3 }, { op: 'STRESS', d: 3 }],
        result: 'You moved it a night. {owner} felt bad enough to say so.' },
      { id: 'ANOTHER_ROOM', label: 'Move it to a house the same night', likely: 'Free and smaller. Same date, so nobody\'s plans break. The neighbors become part of it.',
        effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: true }, { op: 'STRESS', d: 4 }],
        result: 'Same night, a different room. You have a lot of people to tell.' },
      { id: 'MAKE_CHOOSE', label: 'Make {owner} choose', likely: 'You might keep the night. It costs you with the owner either way.',
        effects: [{ op: 'STRESS', d: 3 },
                  { op: 'CHANCE', p: 0.5,
                    then: [{ op: 'ROOM_REL', d: -6 }],
                    else: [{ op: 'ROOM_REL', d: -10 }, { op: 'MOVE_SHOW', dayShift: 1, respect: false }],
                    thenText: '{owner} called the other people and gave you the night back. Not happily.',
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
    body: '{band}: "can\'t do {dow}. work picked up a double and there\'s no getting out of it. we\'re really sorry."',
    options: [
      { id: 'REPLACE', label: 'Ask a band that always says yes', likely: 'Someone fills the slot. They draw a little less.',
        effects: [{ op: 'DROP_BAND', who: '$band' }, { op: 'ADD_BAND', pick: 'ALWAYS_YES' }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.97 }],
        result: 'You found a band that says yes to everything. They said yes.' },
      { id: 'RUN_SHORT', label: 'Run it with one fewer band', likely: 'A shorter night and a little less draw. Fine.',
        effects: [{ op: 'DROP_BAND', who: '$band' }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.94 }],
        result: 'One fewer band. Everybody gets home earlier.' },
      { id: 'LONGER', label: 'Ask {touring|the touring band} to play longer', likely: 'Free. Their crowd gets more of them; the locals\' friends don\'t come.',
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
    body: '{touring}: "we have to pull the tour. family stuff. we\'re so sorry. we hate doing this to you."',
    options: [
      { id: 'KEEP_LOCAL', label: 'Keep the date as a local show', likely: 'Redo the flyer. A smaller night. The room stays happy.',
        effects: [{ op: 'DROP_BAND', who: '$touring' }, { op: 'JOB', type: 'MAKE_FLYER', set: 'TODO', addHours: 1 },
                  { op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
        result: 'It\'s a local show now. The flyer needs doing again.' },
      { id: 'CANCEL', label: 'Cancel and tell everyone today', likely: 'Nobody plays. The room appreciates hearing it today, not Friday.',
        effects: [{ op: 'CANCEL_SHOW', why: 'BAND' }, { op: 'ROOM_REL', d: 1 }],
        result: 'You told the room, the bands and sound the same afternoon.' },
      { id: 'ASK_CONTACT', label: 'Ask a booker in another town who\'s routing through', likely: 'Maybe someone has a band with a hole that week. Maybe not.',
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
      { id: 'RESCHEDULE', label: 'Cancel and reschedule', likely: 'Everybody understands. The bands and the room think better of you. The flyers are wasted.',
        effects: [{ op: 'CANCEL_SHOW', why: 'RESPECTED' }],
        result: 'You called it early. Nobody argued.' },
      { id: 'GO_AHEAD', label: 'Go ahead', likely: 'A coin toss. If it hits, it\'s a handful of people and a long night.',
        effects: [{ op: 'CHANCE', p: 0.5,
                    then: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.55 }, { op: 'STRESS', d: 4 }],
                    else: [{ op: 'NOTHING' }],
                    thenText: 'The storm came. The people who always come came anyway.',
                    elseText: 'The storm turned east. A normal night after all.' }],
        result: 'You kept the date.' },
      { id: 'EARLIER', label: 'Move it earlier and finish by seven', likely: 'An early show draws less. Everybody\'s home before it hits.',
        effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
        result: 'Doors at four, done by seven. Short sets.' }
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
    body: '{t}. Doors soon and {touring} isn\'t here. Their last post was from a gas station a couple of hours out. They\'re behind a wreck.',
    options: [
      { id: 'LATER', label: 'Move them to the last slot', likely: 'They play last, to whoever stays. The locals get the good slot.',
        effects: [{ op: 'SWAP_ORDER', touringTo: 'LAST' }],
        result: '{touring} closes tonight. You told the locals to stretch a little.' },
      { id: 'LOCAL_UP', label: 'Move a local up and keep going', likely: 'The night keeps moving. {touring} gets a shorter set when they arrive.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 5 }, { op: 'CUT_SET', who: '$touring', minutes: 10 }],
        result: 'The locals moved up. {touring} will get what time is left.' },
      { id: 'STALL', label: 'Stall with long changeovers', likely: 'Everybody plays their full set. The crowd gets restless.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 30 }, { op: 'SHOW_MOD', key: 'qAdd', v: -3 }],
        result: 'Long changeovers. People went outside and some of them didn\'t come back in.' }
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
      { id: 'START_LATE', label: 'Start late and wait for them', likely: 'Twenty minutes. Maybe they show, maybe the night just runs late.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 20 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
        result: 'You waited. The night is running twenty minutes behind.' },
      { id: 'IN_THE_ROOM', label: 'Ask someone in the room to play a few songs on borrowed gear', likely: 'Usually fine. Sometimes it\'s the best thing that happens all night.',
        effects: [{ op: 'DROP_BAND', who: '$opener' }, { op: 'ADD_BAND', pick: 'IN_THE_ROOM' },
                  { op: 'CHANCE', p: 0.35,
                    then: [{ op: 'SHOW_MOD', key: 'qAdd', v: 4 }],
                    else: [{ op: 'NOTHING' }],
                    thenText: 'Two songs turned into five. People are going to talk about it.',
                    elseText: 'They played a few songs on borrowed gear. Everybody clapped.' }],
        result: 'Someone from the crowd took the opening slot.' },
      { id: 'RUN_FEWER', label: 'Run with one fewer band', likely: 'A shorter night. A few people came for the opener.',
        effects: [{ op: 'DROP_BAND', who: '$opener' }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.97 }],
        result: 'One fewer band. The next band goes on now.' }
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
      { id: 'BORROW', label: 'Borrow from a band', likely: 'Fifteen minutes. It sounds a little worse. Somebody\'s amp is a PA now.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 15 }, { op: 'SHOW_MOD', key: 'soundAdd', v: -0.05 }],
        result: 'Vocals through a bass amp. It works, mostly.' },
      { id: 'SEND', label: 'Send someone for a part', likely: 'Half an hour or more. If it\'s the right part, it sounds like nothing happened.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 35 },
                  { op: 'CHANCE', p: 0.7,
                    then: [{ op: 'NOTHING' }],
                    else: [{ op: 'SHOW_MOD', key: 'soundAdd', v: -0.15 }],
                    thenText: 'It was a fuse. Thirty-five minutes and it sounds fine.',
                    elseText: 'Wrong part. Thirty-five minutes gone and it still sounds rough.' }],
        result: 'Someone drove off for a part.' },
      { id: 'PLAY_THROUGH', label: 'Play through it, unplugged vocals', likely: 'No wait. Rough for loud bands. Once in a while people remember it.',
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
    body: '{t}. A patrol car at the curb and a neighbor on their porch. The officer asks who\'s in charge.',
    options: [
      { id: 'TURN_DOWN', label: 'Turn it down and finish early', likely: 'Quieter and shorter. The closer loses ten minutes. Nobody gets a ticket.',
        effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -5 }, { op: 'CUT_SET', who: '$closer', minutes: 10 }, { op: 'ROOM_REL', d: 1 }],
        result: 'You turned it down and cut ten minutes. The officer waited to hear it, then left.' },
      { id: 'END_NOW', label: 'End it now', likely: 'The night\'s over. Everyone gets paid from what\'s there. The owner sees you took it seriously.',
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
        result: 'You capped it. You\'re at the door telling people sorry, next time.' },
      { id: 'LET_IN', label: 'Let everyone in', likely: 'More money and a hotter room. The owner watches the exits all night.',
        effects: [{ op: 'SHOW_MOD', key: 'uncapped', v: true }, { op: 'ROOM_REL', d: -3 }],
        result: 'Everybody\'s in. It\'s tight.' },
      { id: 'OUTSIDE', label: 'Move part of it outside', likely: 'Room for more people. The neighbors hear all of it.',
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
    body: '{t}. Two people are going at it by the door. A circle is forming.',
    options: [
      { id: 'FLOOR', label: 'Let {floor|your floor person} handle it', likely: 'They know how to do this. It\'s over in a minute.',
        needs: { hasCrew: 'floor' },
        effects: [{ op: 'INCIDENT', kind: 'FIGHT', q: -6 }],
        result: '{floor|Your floor person} walked one of them out to the curb. The band never stopped.' },
      { id: 'SECURITY', label: 'Let {security|security} handle it', likely: 'This is what you hired them for. Over before most of the room notices.',
        needs: { hasCrew: 'security' },
        effects: [{ op: 'INCIDENT', kind: 'FIGHT', q: -4 }],
        result: '{security|Security} stepped in between them and walked one out the side. Nobody else had to stop.' },
      { id: 'STOP', label: 'Stop the band until it\'s sorted', likely: 'Everybody sees it stop. Ten minutes lost, and it ends.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 10 }, { op: 'INCIDENT', kind: 'FIGHT', q: -12 }],
        result: 'The band stopped. The room turned and looked, and it was over.' },
      { id: 'CALL_IT', label: 'Call it', likely: 'The night ends here. Safe, and a let-down.',
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
      { id: 'STOP_CHECK', label: 'Stop the band and check on them', likely: 'Ten minutes. Everybody sees you take care of it.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 10 }, { op: 'INCIDENT', kind: 'HURT', q: -4 }],
        result: 'You stopped the set and got them to a chair with ice. They want to stay.' },
      { id: 'ICE', label: 'Ice and keep going', likely: 'The night keeps moving. If it\'s worse than it looks, people will remember.',
        effects: [{ op: 'INCIDENT', kind: 'HURT', q: -8 },
                  { op: 'CHANCE', p: 0.15,
                    then: [{ op: 'ROOM_REL', d: -5 }, { op: 'STANDING', d: -3, gens: [0] }],
                    else: [{ op: 'NOTHING' }],
                    thenText: 'It was worse than it looked. Somebody\'s parent called the owner the next day.',
                    elseText: 'Ice and a chair. They watched the rest from the side.' }],
        result: 'Someone brought ice. The band kept playing.' },
      { id: 'CALL_PARENT', label: 'Call their parent', likely: 'They go home early. The parents remember who called.',
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
    body: '{touring} is packing the van and asks where they\'re staying. Nobody ever sorted that out.',
    options: [
      { id: 'YOUR_FLOOR', label: 'Your floor', likely: 'Four people on your floor. You\'ll be tired tomorrow.',
        effects: [{ op: 'CREW', role: 'lodging', to: 'PLAYER' }, { op: 'STRESS', d: 4 }, { op: 'TRUST', who: '$touring', d: 2 }],
        result: 'They followed you home. Somebody\'s sleeping in the bathtub, by choice.' },
      { id: 'ASK_REGULAR', label: 'Ask a regular', likely: 'Somebody might have a couch. If not, it\'s your floor.',
        effects: [{ op: 'CHANCE', p: 0.6,
                    then: [{ op: 'CREW', role: 'lodging', to: 'NEW', skill: 0.5 }, { op: 'TRUST', who: '$touring', d: 1 }],
                    else: [{ op: 'CREW', role: 'lodging', to: 'PLAYER' }, { op: 'STRESS', d: 5 }],
                    thenText: 'A regular with a spare room said yes before you finished asking.',
                    elseText: 'Nobody could. They\'re on your floor.' }],
        result: 'You asked around the room.' },
      { id: 'MOTEL', label: 'Pay for a motel', likely: 'It comes out of your pocket. They sleep in beds.',
        effects: [{ op: 'MONEY', amountOf: 'MOTEL', sign: -1, cat: 'MOTEL' }, { op: 'TRUST', who: '$touring', d: 3 }],
        result: 'Two beds by the highway. They\'ll remember it.' }
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
    body: '{t}. {person} is at the door. Their name is on your list.',
    options: [
      { id: 'FLOOR_ASKS', label: 'Have {floor|your floor person} ask them to leave', likely: 'Quiet and quick. Your floor person has done this before.',
        needs: { hasCrew: 'floor' },
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 5 }],
        result: '{floor|Your floor person} had a word at the gate. {person} left.' },
      { id: 'YOU_ASK', label: 'Ask them to leave yourself', likely: 'It\'s your show and your list. It will cost you something tonight.',
        effects: [{ op: 'STRESS', d: 4 }, { op: 'SHOW_MOD', key: 'lateMin', v: 5 }],
        result: 'You asked {person} to go. They went.' },
      { id: 'LET_BE', label: 'Let it be', likely: 'Nothing happens at the door. Some people will notice who got in.',
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
      { id: 'TALK', label: 'Talk to them', likely: 'Maybe they want to help. You\'d have to ask.',
        effects: [{ op: 'CIRCLE_ADD', who: '$person' }],
        result: '{person} says they\'d help out. You have their number now.' },
      { id: 'BAND_IDEA', label: 'Ask if they play in anything', likely: 'Maybe a new band. Maybe a new band that wants a show.',
        effects: [{ op: 'NEW_BAND', from: 'KIDS', genre: 'HOT', wantsShow: true }, { op: 'REL', who: '$person', d: 2 }],
        result: 'They don\'t yet. By the end of the night they\'ve talked two people into it.' },
      { id: 'THANKS', label: 'Say thanks and leave it there', likely: 'A good word. Nothing more.',
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
    body: '{touring}: "our route moved. any chance we could do the next night instead of {dow} the {date:ord}? totally fine if not, we\'ll figure it out."',
    options: [
      { id: 'ASK_ROOM', label: 'Ask {owner|the room} about the next night', likely: 'A day or two to hear back. If the room is free, everybody\'s happy.',
        effects: [{ op: 'CHANCE', p: 0.6,
                    then: [{ op: 'MOVE_SHOW', dayShift: 1, respect: true }, { op: 'TRUST', who: '$touring', d: 2 }],
                    else: [{ op: 'TRUST', who: '$touring', d: -1 }],
                    thenText: 'The room had the next night open. Moved, and everybody heard in time.',
                    elseText: 'The room is booked that night. {touring} will make the original date work, mostly.' }],
        result: 'You asked the room.' },
      { id: 'KEEP', label: 'Say no and keep the date', likely: 'The date holds. They may find a better offer for it.',
        effects: [{ op: 'CHANCE', p: 0.3,
                    then: [{ op: 'DROP_BAND', who: '$touring' }],
                    else: [{ op: 'NOTHING' }],
                    thenText: '{touring} found another town for that night. They\'re off the bill.',
                    elseText: '{touring} grumbled and kept the date.' }],
        result: 'You kept the date.' },
      { id: 'YES_WITHOUT', label: 'Say yes without asking the room', likely: 'The band is happy. The room finds out from the flyer.',
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
    body: '{band}: "tapes are done!! we want a release show, a saturday, and honestly we\'d like the door. it\'s kind of our thing."',
    options: [
      { id: 'GIVE_DOOR', label: 'Give them the night and the door', likely: 'They\'ll remember it. You make nothing on that night.',
        effects: [{ op: 'MESSAGE', from: '$band', text: 'ok we\'re looking at saturdays. thank you for real. we\'ll bring everybody.', delay: 1, localAsk: 'RELEASE' },
                  { op: 'TRUST', who: '$band', d: 5 }],
        result: 'You said yes. {band} is already picking a date.' },
      { id: 'SPLIT', label: 'Give them the night on a split', likely: 'A fair deal. They\'re happy enough.',
        effects: [{ op: 'MESSAGE', from: '$band', text: 'split works. sending you dates.', delay: 1, localAsk: 'RELEASE' },
                  { op: 'TRUST', who: '$band', d: 2 }],
        result: 'A release show on a split. {band} said that\'s fair.' },
      { id: 'FRIDAY', label: 'Offer them a Friday instead', likely: 'They wanted a Saturday. They\'ll take what they can get, a little less happily.',
        effects: [{ op: 'MESSAGE', from: '$band', text: 'a friday could work. let us talk about it.', delay: 2, localAsk: 'RELEASE' },
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
    body: 'A message from a kid you\'ve seen at shows: "can we open? we\'ve never played a show. we have four songs. one of them is about our bus driver."',
    options: [
      { id: 'FIRST_SLOT', label: 'Put them first at your next all-ages show', likely: 'Their friends come. They might be bad. Everybody starts somewhere.',
        effects: [{ op: 'NEW_BAND', from: 'KIDS', genre: 'HOT', wantsShow: true }, { op: 'FOLLOWERS', d: 3 }],
        result: 'They said "oh my god" four times. They\'ll want a date.' },
      { id: 'PRACTICE', label: 'Tell them to play a practice-space show first', likely: 'A gentle no. They\'ll come back with more than four songs.',
        effects: [{ op: 'NEW_BAND', from: 'KIDS', genre: 'HOT', wantsShow: false }],
        result: 'You told them to play for their friends first. They said okay.' },
      { id: 'SEE_FIRST', label: 'Tell them you\'ll come hear them practice', likely: 'An evening of your week. You\'ll know what you\'re booking.',
        effects: [{ op: 'NEW_BAND', from: 'KIDS', genre: 'HOT', wantsShow: true }, { op: 'HOURS', d: -2, when: 'WEEK' }, { op: 'STRESS', d: -1 }],
        result: 'You sat on a bucket in a garage for an hour. They\'re loud. They\'re trying.' }
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
      { id: 'REPOST', label: 'Go put yours back up', likely: 'An hour of your week. Your posters are back where they were.',
        effects: [{ op: 'HOURS', d: -1, when: 'WEEK' }],
        result: 'You put yours back up, next to theirs. Not over.' },
      { id: 'MESSAGE', label: 'Message the other booker', likely: 'Maybe they fix it. Maybe they say it was their runner.',
        effects: [{ op: 'CHANCE', p: 0.5,
                    then: [{ op: 'NOTHING' }],
                    else: [{ op: 'SHOW_MOD', key: 'genMul', gen: 2, v: 0.93 }],
                    thenText: 'They said sorry and had their runner fix it the same day.',
                    elseText: 'They said it wasn\'t them. Your posters stayed covered.' }],
        result: 'You sent a message.' },
      { id: 'LET_GO', label: 'Let it go', likely: 'Posters reach older people, and fewer of them will see yours.',
        effects: [{ op: 'SHOW_MOD', key: 'genMul', gen: 2, v: 0.9 }],
        result: 'You let it go. Posters get covered. That\'s posters.' }
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
      { id: 'HAND_DRAWN', label: 'Draw them by hand and copy them at the library', likely: 'Two hours. The flyer looks different. Sometimes people love that.',
        effects: [{ op: 'HOURS', d: -2, when: 'WEEK' },
                  { op: 'CHANCE', p: 0.4,
                    then: [{ op: 'FOLLOWERS', d: 5 }],
                    else: [{ op: 'NOTHING' }],
                    thenText: 'People loved the hand-drawn ones. Two got taken off the wall and kept.',
                    elseText: 'Library copies, a little gray. They did the job.' }],
        result: 'You spent an evening with a marker and a stack of library change.' },
      { id: 'WAIT', label: 'Wait till Friday', likely: 'Free. The posters go up late.',
        effects: [{ op: 'SHOW_MOD', key: 'reachMul', v: 0.95 }],
        result: 'You\'ll print Friday. The posters will be a few days late.' },
      { id: 'HELPER', label: 'Ask a helper with a printer', likely: 'A favor from someone in your circle.',
        needs: { hasHelper: 'ARTIST' },
        effects: [{ op: 'NOTHING' }],
        result: 'Your helper printed them at home. Slightly different paper. Nobody noticed.' }
    ]
  },

  {
    id: 'SOUND_GOT_A_GIG',
    when: 'WEEK', tier: 'GENTLE', weight: 1, cooldown: 20,
    bind: ['show', 'sound', 'closer'],
    if: { daysOut: [2, 10], hasCrew: 'sound' },
    telegraph: null, replaces: null,
    title: 'Sound got a paid gig',
    body: '{sound}: "can\'t do the {date:ord}, got a paid gig at a wedding. my buddy {new} can. he\'s fine. he\'s not me."',
    options: [
      { id: 'TAKE_FRIEND', label: 'Take {new}', likely: 'Sound a little worse.',
        effects: [{ op: 'CREW', role: 'sound', to: 'NEW', skill: 0.55 }],
        result: '{new} is on sound. He doesn\'t know the room.' },
      { id: 'BAND_PA', label: 'Ask {closer} to run it off their PA', likely: 'Free. Worse. One more thing for the closer to worry about.',
        needs: { bands: [2, 5] },
        effects: [{ op: 'CREW', role: 'sound', to: 'BAND' }, { op: 'TRUST', who: '$closer', d: -1 }],
        result: '{closer} will run sound between their own songs.' },
      { id: 'MOVE', label: 'Move the show to a night {sound} can do', likely: 'Breaks the date. Costs trust with everyone.',
        effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
        result: 'You moved it a day. Not everyone can make the new one.' }
    ]
  },

  {
    id: 'LANDLORD_HEARD',
    when: 'WEEK', tier: 'REAL', weight: 1, cooldown: 20,
    bind: ['show', 'owner'],
    if: { roomKind: ['HOUSE'], daysOut: [5, 30] },
    telegraph: null, replaces: null,
    title: 'The landlord heard',
    body: '{owner}: "my landlord got a call about the last one. he\'s not mad yet. he\'s asking."',
    options: [
      { id: 'MOVE', label: 'Move the show somewhere else', likely: 'The house gets a break. Your people have to find a new room.',
        effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: true }, { op: 'ROOM_REL', d: 3 }],
        result: 'You moved it. {owner} was relieved and tried not to show it.' },
      { id: 'QUIETER', label: 'Do it quieter: earlier, shorter, a quiet opener', likely: 'A smaller, softer night. The house stays a house.',
        effects: [{ op: 'SHOW_MOD', key: 'soundAdd', v: -0.05 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }, { op: 'ROOM_REL', d: 2 }],
        result: 'Doors earlier, done by ten, the quiet band first. {owner} said thank you.' },
      { id: 'ANYWAY', label: 'Do it anyway', likely: 'Nothing changes tonight. The house and the host are both at risk.',
        effects: [{ op: 'ROOM_REL', d: -5 }, { op: 'ROOM_PRESSURE', d: 15 },
                  { op: 'FOLLOWUP', event: 'LANDLORD_HEARD', delay: [4, 10], p: 0.3 }],
        result: 'You kept it as it was. {owner} said okay, the way people say okay.' }
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
      { id: 'TAKE', label: 'Take the shift', likely: 'Money this month. The flyer waits.',
        effects: [{ op: 'MONEY', amount: 80, cat: 'WAGES' }, { op: 'HOURS', d: -4, when: 'WEEK' }],
        result: 'You took the shift. The flyer is a problem for later.' },
      { id: 'SAY_NO', label: 'Say no', likely: 'The flyer gets made. You\'re short this month and your manager remembers.',
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
      { id: 'RUNNER', label: 'Ask a helper with a car', likely: 'A favor. The route gets done on time.',
        needs: { hasHelper: 'RUNNER' },
        effects: [{ op: 'NOTHING' }],
        result: 'Your runner picked up the posters and did the route.' },
      { id: 'NEXT_WEEK', label: 'Do the route next week', likely: 'Free. Posters go up late.',
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
    body: '{band}: "hey so. we\'ve played yours for free for a long time and we love it. but we kind of draw now. could we get $50 a show?"',
    options: [
      { id: 'PAY', label: 'Pay them', likely: 'Fifty a show from now on. They\'ll feel like a real band, because they are.',
        effects: [{ op: 'TRUST', who: '$band', d: 5 }],
        result: 'You said yes. {band} sent a lot of exclamation points.' },
      { id: 'CUT', label: 'Offer them a cut of the door', likely: 'They make more when they bring more. Fair, if less sure.',
        effects: [{ op: 'TRUST', who: '$band', d: 2 }],
        result: 'A share of the door. {band} said that\'s fair.' },
      { id: 'CANT', label: 'Say you can\'t', likely: 'Trust drops. They may start playing for other bookers.',
        effects: [{ op: 'TRUST', who: '$band', d: -5 }],
        result: 'You said you can\'t. {band} said they understand. They\'ll ask around.' }
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
    body: '{booker}: "there\'s a band coming through in a couple months that\'s too big for either of us alone. I\'ve got the room, you\'ve got the bill. Split it?"',
    options: [
      { id: 'ACCEPT', label: 'Accept', likely: 'Both names on the flyer. A bigger night, shared.',
        effects: [{ op: 'REL', who: '$booker', d: 5 }, { op: 'NAME', d: 1 }, { op: 'FLAG', key: 'coPromote', v: true }],
        result: 'You said yes. "{bookingName} and friends present," more or less.' },
      { id: 'DECLINE', label: 'Decline', likely: 'You keep your nights your own. {booker} is a little put out.',
        effects: [{ op: 'REL', who: '$booker', d: -2 }],
        result: 'You passed. {booker} said maybe next time.' },
      { id: 'NAME_FIRST', label: 'Accept, but ask for your name first on the flyer', likely: 'Maybe they agree. Maybe they think you\'re getting big for your boots.',
        effects: [{ op: 'CHANCE', p: 0.5,
                    then: [{ op: 'REL', who: '$booker', d: 2 }, { op: 'NAME', d: 2 }, { op: 'FLAG', key: 'coPromote', v: true }],
                    else: [{ op: 'REL', who: '$booker', d: -4 }],
                    thenText: '{booker} laughed and said fine, your name first.',
                    elseText: '{booker} said forget it. It\'s their room.' }],
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
    body: '{regular}: "so I\'m moving at the end of the month. could you do one last show with {band} and my friends\' bands? I\'d owe you forever."',
    options: [
      { id: 'BOOK', label: 'Book it', likely: 'A warm night that draws. The kind people remember.',
        effects: [{ op: 'MESSAGE', from: '$band', text: 'heard about the going-away show. we\'re in, obviously. when?', delay: 1, localAsk: 'GOING_AWAY' },
                  { op: 'REL', who: '$regular', d: 6 }],
        result: 'You said yes. {regular} cried a little in the message.' },
      { id: 'FOLD', label: 'Fold it into a show you already have', likely: 'Less work. A smaller send-off.',
        effects: [{ op: 'REL', who: '$regular', d: 3 }, { op: 'TRUST', who: '$band', d: 1 }],
        result: 'Their send-off will be the next one of yours. {regular} said that\'s perfect.' },
      { id: 'PASS', label: 'Pass', likely: 'Your calendar stays as it is. {regular} is disappointed.',
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
    body: '{closer} broke up on Tuesday. They\'ll still play {dow} if you want. It would be their last show.',
    options: [
      { id: 'LAST_SHOW', label: 'Make it their last show', likely: 'A bigger night. Emotions high. Reprint the flyer.',
        effects: [{ op: 'FLYER_TAG', tag: 'LAST_SHOW' }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.15 }, { op: 'SHOW_MOD', key: 'qAdd', v: 3 },
                  { op: 'HOURS', d: -1, when: 'WEEK' }],
        result: 'LAST SHOW goes on the flyer. People who haven\'t been out in a year are asking about it.' },
      { id: 'REPLACE', label: 'Replace them', likely: 'Someone who says yes fills the slot. A smaller night, a calmer one.',
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
    body: '{band}: "our bass player quit. we want to keep playing as a three-piece. is that weird?"',
    options: [
      { id: 'FINE', label: 'Tell them it\'s fine', likely: 'They keep playing. Smaller sound for a while.',
        effects: [{ op: 'TRUST', who: '$band', d: 2 }],
        result: 'You said it\'s fine. Plenty of bands are three people.' },
      { id: 'WAIT', label: 'Ask them to wait till they have someone', likely: 'They take a break from your shows. They might not like it.',
        effects: [{ op: 'TRUST', who: '$band', d: -1 }],
        result: 'You asked them to wait. They said they\'ll let you know.' },
      { id: 'SUGGEST', label: 'Suggest a bass player you know', likely: 'An hour of messages. You might make a band.',
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
      { id: 'FIRST', label: 'Put them first on a bill', likely: 'They get a start. Nobody gets their hopes up.',
        effects: [{ op: 'NEW_BAND', from: 'MEMBERS', genre: 'HOT', wantsShow: true }],
        result: 'They\'ll open your next one. They said that\'s fair.' },
      { id: 'WAIT', label: 'Wait to hear them', likely: 'They keep practicing. You\'ll know what you\'re booking.',
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
    body: 'A kid at your last show: "everybody at my school is into a new kind of thing. it\'s like fast but weird. you should book some of it."',
    options: [
      { id: 'ASK_WHO', label: 'Ask who\'s playing it', likely: 'Names of bands. Maybe one that wants a show.',
        effects: [{ op: 'TREND_SIGN', genre: 'HOT' }, { op: 'NEW_BAND', from: 'KIDS', genre: 'HOT', wantsShow: true }],
        result: 'The kid named two bands and gave you a number for one of them.' },
      { id: 'NOTE', label: 'Write it down', likely: 'A line in your notebook. Something to watch.',
        effects: [{ op: 'TREND_SIGN', genre: 'HOT' }, { op: 'NOTE', text: 'A kid says everybody at school is into a new sound. One kid, one time.', conf: 1 }],
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
    body: '{contact}: "got a band with a hole on Wednesday. they\'re good. they need a floor and a show, any show. can you do anything?"',
    options: [
      { id: 'THROW', label: 'Throw together a show', likely: 'No flyer window to speak of. A small night and a band that owes you.',
        effects: [{ op: 'REL', who: '$contact', d: 5 }, { op: 'STRESS', d: 5 }, { op: 'WORD', d: 1 }, { op: 'FLAG', key: 'rescueOffered', v: true }],
        result: 'You said yes. You have four days and no room yet.' },
      { id: 'FLOOR_ONLY', label: 'Find them a floor and no show', likely: 'They get a night\'s sleep. {contact} remembers.',
        effects: [{ op: 'REL', who: '$contact', d: 2 }, { op: 'STRESS', d: 2 }],
        result: 'You found them a floor. They left a tape on the counter.' },
      { id: 'PASS', label: 'Pass', likely: 'Your week stays your own. {contact} dips a little on you.',
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
    body: 'An old head who comes to everything says you can use his auto shop on weekends. "Roll the cars out, roll the bands in. Just sweep up after."',
    options: [
      { id: 'TAKE', label: 'Take it', likely: 'A new room. Cheap, no reputation yet, nobody knows where it is.',
        effects: [{ op: 'NEW_ROOM', kind: 'DIY', hood: null }],
        result: 'You have a new room. It smells like motor oil.' },
      { id: 'VISIT', label: 'Go look at it first', likely: 'An evening of your week. You\'ll know what you\'re getting.',
        effects: [{ op: 'HOURS', d: -2, when: 'WEEK' }, { op: 'NEW_ROOM', kind: 'DIY', hood: null }, { op: 'STRESS', d: -1 }],
        result: 'You walked it with him. Two bay doors, one outlet that works, a lot of room.' },
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
      { id: 'ASK_DOWN', label: 'Ask them to take it down', likely: 'A message. Most people take it down.',
        effects: [{ op: 'CHANCE', p: 0.75,
                    then: [{ op: 'NOTHING' }],
                    else: [{ op: 'ROOM_REL', d: -3 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.05 }],
                    thenText: 'They took it down within the hour, and apologized.',
                    elseText: 'They didn\'t see your message till the next day. People had already passed it around.' }],
        result: 'You sent a message.' },
      { id: 'MOVE', label: 'Move the show', likely: 'The host is relieved. Everybody needs to hear about the new room.',
        effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'DIY', respect: true }, { op: 'ROOM_REL', d: 2 }],
        result: 'You moved it. {owner} thanked you.' },
      { id: 'LEAVE', label: 'Leave it', likely: 'More strangers, more risk. The host is unhappy.',
        effects: [{ op: 'ROOM_REL', d: -5 }, { op: 'SHOW_MOD', key: 'headsMul', v: 1.08 }],
        result: 'You left it. {owner} didn\'t say anything, which said something.' }
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
      { id: 'PUSH', label: 'Push harder', likely: 'Two more evenings of promotion. You keep more of your crowd.',
        effects: [{ op: 'HOURS', d: -2, when: 'WEEK' }, { op: 'SHOW_MOD', key: 'reachMul', v: 1.08 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.92 }],
        result: 'You doubled down: more posters, more messages, a post every day.' },
      { id: 'MOVE', label: 'Move yours', likely: 'The clash goes away. Moving costs you some people and some trust.',
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
      { id: 'GO', label: 'Go', likely: 'You lose an evening of planned work. You feel like a person.',
        effects: [{ op: 'STRESS', d: -8 }, { op: 'HOURS', d: -3, when: 'WEEK' }],
        result: 'You went. You didn\'t check your phone for two hours.' },
      { id: 'DONT', label: 'Don\'t', likely: 'You get the work done. You stay tired.',
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
    body: '{t}. Four kids at the door. They\'re here to see their friend\'s band and none of them is twenty-one.',
    options: [
      { id: 'TURN_AWAY', label: 'Turn them away', likely: 'The rule is the rule. Their friend\'s band plays to fewer friends.',
        effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
        result: 'You turned them away. They sat on the curb and listened through the wall.' },
      { id: 'X_HANDS', label: 'X their hands and let them stand in the back', likely: 'Needs {owner} to say yes. A few more people, and the owner is watching.',
        needs: { rel: { who: '$owner', min: 50 } },
        effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 1.03 }, { op: 'ROOM_REL', d: -2 }, { op: 'FOLLOWERS', d: 3 }],
        result: 'Big X\'s on both hands. They stood in the back and didn\'t move all night.' },
      { id: 'MATINEE', label: 'Promise them an all-ages matinee next month', likely: 'Nobody gets in tonight. Next month, you owe them one.',
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
      { id: 'LEAVE_IT', label: 'Leave it', likely: 'Nothing happens, probably. {owner|The host} notices.',
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
      { id: 'BORROW', label: 'Borrow one from another band', likely: 'Quick if the gear was sorted ahead. Otherwise some digging through cases.',
        effects: [{ op: 'CHANCE', p: 0.6, pIf: [{ if: { jobDone: 'SORT_GEAR' }, p: 1 }],
                    then: [{ op: 'SHOW_MOD', key: 'lateMin', v: 3 }],
                    else: [{ op: 'SHOW_MOD', key: 'lateMin', v: 12 }],
                    thenText: 'The next band had a spare pedal on top of their case. Three minutes.',
                    elseText: 'It took twelve minutes to find a pedal that fit.' }],
        result: 'You asked the other bands.' },
      { id: 'FIND', label: 'Send someone to find one', likely: 'Half an hour. The night runs late.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 30 }],
        result: 'Somebody drove home for a pedal. Thirty minutes.' },
      { id: 'WITHOUT', label: 'Play without the kick', likely: 'No wait. It sounds thin.',
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
      { id: 'PACK_IN', label: 'Move under cover and pack it tight', likely: 'Fewer fit. The ones who do will remember it.',
        effects: [{ op: 'SHOW_MOD', key: 'capMul', v: 0.6 }, { op: 'SHOW_MOD', key: 'qAdd', v: 2 }],
        result: 'Everybody crammed under the roof. It was hot and loud and nobody minded.' },
      { id: 'WAIT', label: 'Wait it out', likely: 'It usually passes. Every set slides back.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 40 },
                  { op: 'CHANCE', p: 0.7,
                    then: [{ op: 'NOTHING' }],
                    else: [{ op: 'SHOW_MOD', key: 'endEarly', v: true }],
                    thenText: 'Forty minutes and it passed. Steam came off the yard during the first set.',
                    elseText: 'It didn\'t stop. You called it after one band.' }],
        result: 'You waited.' },
      { id: 'CALL', label: 'Call it', likely: 'Everybody goes home dry. The bands get what\'s in the box.',
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
      { id: 'LET_THEM', label: 'Let them', likely: 'The room goes home happy. {owner|The owner} doesn\'t.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 8 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }, { op: 'ROOM_REL', d: -3 }, { op: 'TRUST', who: '$closer', d: 1 }],
        result: 'Two more songs. {owner|The owner} was standing by the light switch.' },
      { id: 'CUT', label: 'Cut them off', likely: 'On time for the room. The band is a little stung.',
        effects: [{ op: 'TRUST', who: '$closer', d: -2 }],
        result: 'You gave them the sign. They stopped mid-song and thanked everybody.' },
      { id: 'TWO_MINUTES', label: 'Two more minutes', likely: 'A short one. Nobody\'s really upset.',
        effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 2 }, { op: 'ROOM_REL', d: -1 }],
        result: 'One fast song. Done.' }
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
    body: '{touring} is counting what you handed them. "Is there anything extra? Gas to the next town is a lot."',
    options: [
      { id: 'YOUR_CUT', label: 'Give them your cut', likely: 'You go home with nothing. They don\'t forget it.',
        effects: [{ op: 'MONEY', amount: -40, cat: 'TOURING' }, { op: 'TRUST', who: '$touring', k: 'GAVE_ALL' }],
        result: 'You gave them your forty. They hugged you, all four of them.' },
      { id: 'HAT', label: 'Ask at the door for gas money', likely: 'People usually come through.',
        effects: [{ op: 'SHOW_MOD', key: 'hatBonus', v: 40 }, { op: 'TRUST', who: '$touring', d: 2 }],
        result: 'The door asked everybody for a few extra for their gas. People were generous.' },
      { id: 'MATH', label: 'Show them the math', likely: 'They see where every dollar went. Some bands like that; some don\'t.',
        effects: [{ op: 'TRUST', who: '$touring', d: -1 }],
        result: 'You walked them through the sheet. They nodded. It was a long nod.' }
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
      { id: 'LISTEN', label: 'Listen tomorrow', likely: 'An hour. Maybe a new band for your list.',
        effects: [{ op: 'NEW_BAND', from: 'KIDS', genre: 'HOT', wantsShow: true }, { op: 'HOURS', d: -1, when: 'WEEK' }],
        result: 'You listened on your break. Rough, and something in there.' },
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
      { id: 'BANDS_ONLY', label: 'Only if the bands say yes', likely: 'Some of them will. Fewer views, nobody upset.',
        effects: [{ op: 'FOLLOWERS', d: 4 }],
        result: 'One band said yes, one said no. They streamed the one.' },
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
      { id: 'FANS', label: 'Doors open, fans, water by the case', likely: 'The water is on you. People stay.',
        effects: [{ op: 'MONEY', amount: -25, cat: 'EVENT' }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
        result: 'You bought water by the case. People drank all of it.' },
      { id: 'SHORTER', label: 'Shorter sets', likely: 'The closer loses ten minutes. Everybody gets out sooner.',
        effects: [{ op: 'CUT_SET', who: '$closer', minutes: 10 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
        result: 'Sets got shorter. Nobody complained.' },
      { id: 'PUSH_ON', label: 'Push through it', likely: 'Free. Usually fine. Somebody might go down.',
        effects: [{ op: 'CHANCE', p: 0.15,
                    then: [{ op: 'INCIDENT', kind: 'HURT', q: -6 }],
                    else: [{ op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
                    thenText: 'Somebody fainted near the front. They were fine after water and the porch.',
                    elseText: 'Everybody was soaked. Nobody went down.' }],
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
      { id: 'PACK_IN', label: 'Pack everyone under cover', likely: 'Fewer fit. Warmer.',
        effects: [{ op: 'SHOW_MOD', key: 'capMul', v: 0.7 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
        result: 'Packed in tight. Warm enough.' },
      { id: 'KEEP_GOING', label: 'Keep going as it is', likely: 'Some people leave early.',
        effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
        result: 'The band played in gloves. Some people left after two songs.' }
    ]
  }
];
