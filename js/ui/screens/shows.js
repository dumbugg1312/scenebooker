/* Scene Booker — ui/screens/shows.js (UI-A2, redrawn for the desk; the card rebuilt on the booking pipeline)
 * The clipboards. shows: the clipboards of the shows on the way, a blank one to start a show, a shoebox of past ones.
 * show: one clipboard, and the whole show is booked on it (the card, design/spec/11-booking-pipeline.md). Left: NEXT
 * (the one thing to do now, with its button), then the seven steps in the order a booker works: DATE, ROOM, THE DEAL,
 * BILL, CREW, ANNOUNCE, SHOW NIGHT. Each has one stamp (DONE / TO DO / WAITING ON a name / LOCKED / !!); the step in
 * hand is unfolded to its rows, the rest fold to one line. Right: the picker for the row that is picked: the hold
 * form, the offer slip, the sticker sheet of local bands, the crew, the flyer, the jobs with DO IT TONIGHT, the door,
 * the deal; HOW IT LOOKS (the forecast) sits behind a strip. Tonight's clock and CALL IT A NIGHT are the pinned clock's
 * (js/ui/nightclock.js, the one place a night is called): a button here that takes time hatches its hours on it, and
 * a night called while the card is up brings the card back at the next evening.
 * Everything that takes time says what it takes, and is crossed out with the reason when tonight cannot take it.
 * A played or cancelled show is the night's record instead. bill: the old route; it opens the same card on the bill.
 * Also defines SB.UI.cuDraw, the small drawing helpers the clipboard, sticker sheet and key hooks share.
 * Reads Shows, Jobs, Forecast, Bands, Harm, People, Money, Rooms and Week views; changes state only through SB.UI.act
 */
(function (SB) {
  'use strict';

  SB.Content.ui.shows = {
    title: 'Shows',
    none: 'No shows on the way. Start one yourself, or answer a band\'s message on the phone.',
    newOwn: 'Start a show of your own',
    blank: 'NEW SHOW',
    create: 'START IT',
    earlier: 'An earlier night',
    later: 'A later night',
    quick: 'Pick a weekend night',
    q: { thisFri: 'this Fri', thisSat: 'this Sat', nextFri: 'next Fri', nextSat: 'next Sat' },
    past: 'Past shows',
    pastBox: 'PLAYED',
    hidePast: 'Put the box away',
    noRoom: 'no room yet',
    gone: 'That show is not on the list any more.',
    asks: '{yes} yes, {wait} waiting, {no} no',
    reach: 'Who has heard',
    open: 'Open the show on {d}',
    status: { DRAFT: 'DRAFT', CONFIRMED: 'CONFIRMED', PLAYED: 'PLAYED', CANCELLED: 'CANCELLED' },
    pace: { OK: 'ON PACE', TIGHT: 'TIGHT', SHORT: 'SHORT' }
  };
  SB.Content.ui.show = {
    title: 'The show',
    back: 'All the shows',
    noRoom: 'NO ROOM YET',
    room: 'The room',
    holdRoom: 'ASK THEM TO HOLD IT',
    holdRoomL: 'Message {room} and ask them to hold {d}',
    holdOther: 'Try another night',
    pickRoom: 'Pick {room}',
    needs: 'It\'s yours once they have',
    needsMet: 'They have everything they asked for. It\'s yours in the morning.',
    release: 'LET THE NIGHT GO',
    releaseL: 'Tell the room you do not need the night anymore',
    rank: '#{n} IN LINE',
    jobs: 'TO DO',
    advance: 'On the advance',
    night: 'On the night',
    ifYouWant: 'If you want',
    covered: '{name} has these',
    coveredL: '{name} is doing these for you this time: {list}.',
    /* 2.12: what a rider press did, said once in a toast */
    riderOn: 'Promised: {what}.', riderOff: 'Taken back: {what}.', foodOn: 'You\'ll {what}.', foodOff: 'No food promised now.',
    planIn: 'Pencil it in: {d} {half}',
    waived: 'Not needed here.',
    bill: 'THE BILL',
    deal: 'The deal',
    written: 'written down',
    handshake: 'a handshake',
    exposure: 'What you owe if nobody comes',
    par: 'MOST NIGHTS THERE DRAW',
    call: 'YOU GUESSED',
    withThem: 'WITH THEM',
    full: 'FULL',
    even: 'EVEN',
    each: 'EACH = {n}',
    unknownL: 'You do not know yet: {what}. Open the notebook.',
    price: 'Door price',
    priceL: 'Door price {p}. Tap to change it.',
    cheaper: 'A dollar less',
    dearer: 'A dollar more',
    donation: 'DONATION',
    donationL: 'Donation at the door',
    ages: 'Ages: {a}',
    address: 'The address',
    label: 'How big: {l}',
    normal: 'REGULAR',
    flyerDesk: 'Open the flyer desk',
    flyerDeskT: 'FLYER DESK',
    crew: 'CREW',
    sound: 'SOUND',
    security: 'SECURITY',
    noSecurity: 'NONE',
    noSecurityL: 'Take security off this show',
    insurance: 'INSURANCE',
    insureL: 'Buy event insurance, {cost}',
    insureDropL: 'Drop the insurance. Nothing has been charged yet.',
    insureDrop: 'Drop the insurance',
    insured: 'Insured, {cost}',
    insureHaveL: 'Event insurance, {cost}, paid when the date was confirmed. It can\'t be taken back now.',
    floor: 'FLOOR',
    nobody: 'nobody yet',
    you: 'You',
    youWork: 'You work the door',
    ask: 'Ask {name} ({rate} a night)',
    put: 'Put {name} on',
    on: '{name} is on it',
    busy: '{name} is busy',
    asked: 'Asked {name}. Waiting to hear back.',
    queued: 'Asking {name}: the message goes out tonight.',
    askedShort: 'asked, waiting',
    queuedShort: 'goes out tonight',
    saidNo: '{name} said no to this one. Ask again?',
    noSound: 'no sound yet',
    noSecurity2: 'no security yet',
    cancel: 'CANCEL IT',
    cancelL: 'Cancel the show',
    cancelSure: 'Cancel this show? The bands and the room will remember.',
    cancelYes: 'Cancel it',
    cancelHead: 'THE SHOW IS OFF',
    cancelWho: 'Booked bands that this reaches: {list}.',
    cancelNobody: 'No band had said yes yet, so nobody else was counting on this night.',
    cancelCost: 'They will remember how far ahead you told them. {room} remembers too, and the next week page shows what it did to your standing.',
    cancelFree: 'Nobody had been told about this one yet, so it costs you nothing.',
    tellOff: 'TELL EVERYONE IT IS OFF',
    tellOffL: 'Text every booked band tonight that the show is off',
    cancelTold: 'You told them yourself, tonight. Their answers are in your messages.',
    houseHead: 'HOUSE RULES',
    houseRead: 'These go on the flyer and at the door. The host and the neighbors both expect them.',
    housePick: 'Pick the rules for this night. Each one says what it does.',
    houseRule: {
      ALL_AGES: 'All ages. Kids can come, and nobody gets served at the door.',
      NO_STREET_DRINKS: 'No drinking in the street, so the neighbors have nothing to complain about.',
      PARK_ON_STREET: 'Park on the street and leave the driveway clear, so nobody blocks the neighbor in.',
      MUSIC_OFF: 'Music off by {t}, so the night ends when you told the neighbors it would.',
      GIVE_AT_DOOR: 'Give what you can at the door. Somebody asks people for a few extra for the bands\' gas.',
      NO_GLASS: 'No glass bottles, because somebody always steps on one in the dark on the concrete.',
      NO_SMOKING: 'No smoking inside, which keeps the air clear and keeps the host happy to lend you the house.'
    },
    neighborHead: 'THE NEIGHBORS',
    firstHouse: 'Heads up, a house show is not a bar. Your sound person brings the PA, there is no guard on the door, and the bands will sleep on the floor.',
    lockOffer: '{name} has not answered yet. Lock the bill without them?',
    lockOfferYes: 'Lock it without them',
    lockOfferNo: 'Wait for them',
    penciled: 'offered, waiting',
    whySecondLast: 'Second to last: the touring band plays while the room is fullest.',
    whyTop: 'Top of a two-band bill: the touring band is the reason people come.',
    whyOpen: 'First on: the room fills up while they play.',
    whyClose: 'Last on: the people who stay come to the end.',
    roomsLater: 'ROOMS YOU CAN REACH LATER',
    roomsLaterNone: '',
    keep: 'Keep it',
    evenMoved: 'That puts your break-even at {n} paid. Your guess for the night is {lo} to {hi}.',
    guessMoved: 'Your guess for the night is now {lo} to {hi} people. It was {lo0} to {hi0}.',
    soundHouse: 'HOUSE PA, $0',
    soundHouseL: 'The house PA, or a friend on sound: no pay, no ask',
    soundHouseOn: 'The house PA, or a friend on sound',
    soundHouseNote: 'Nobody is paid for sound. The PA the room has, or a friend who knows a board, runs it. It sounds a bit rougher than a person who does this every week.',
    soundEats: 'Sound and the host together come to {off}, which is over half of the {door} you could take at the door at your guess ({n} paying). The band is paid after that, so a slow night leaves the band little.',
    doorYou: 'You work the door. That is the booker\'s job at most house shows.',
    doorWhat: 'You take the money, count who comes in, and stop letting people in when the room is full.',
    doorNobody: 'Nobody is on the door yet. At most house shows that is you.',
    crowdPar: 'Most nights like this one draw about {n}.',
    crowdCall: 'You guessed {lo} to {hi}.',
    crowdCap: 'The room holds about {n}.',
    crowdEven: 'You break even at {n} paying.',
    crowdNobody: 'If you tell nobody more, about {lo} to {hi}.',
    lookHead: 'About {lo} to {hi} people. You break even at {n}.',
    lookHeadNoEven: 'About {lo} to {hi} people.',
    effect: { FLYER: 'Your flyer: about {n} more {who}.', ANNOUNCE: 'The announcement: about {n} more {who}.', POSTERS: 'Flyers up around town: about {n} more {who}.',
              LISTINGS: 'The listings: about {n} more {who}.', AD: 'The ad: about {n} more {who}.', MAIL: 'Your mailing list: about {n} more {who}.',
              INVITES: 'Texts and DMs to people: about {n} more {who}.', PUSH: 'The push in the last days: about {n} more {who}.', DAYOF: 'Posting the day of: about {n} more {who}.',
              ROOM: 'The room posting it: about {n} more {who}.', SHARES: 'The bands sharing it: about {n} more {who}.', HANDOUTS: 'Flyers handed out: about {n} more {who}.' },
    effectPlan: 'planned',
    who0: 'kids', who1: 'people in the middle', who2: 'old heads', whoX: 'people',
    effortGain: '{k}: about {n} more people than a standard flyer, {h}.',
    effortLoss: '{k}: about {n} fewer people than a standard flyer, {h}.',
    effortSame: '{k}: the usual, {h}.',
    locked: 'The bill is locked. Changing it now costs trust with the bands.',
    result: 'How it went',
    unknown: '?'
  };
  SB.Content.ui.card = {
    rows: 'The show, part by part',
    picker: 'The part you picked',
    forecast: 'How it looks',
    hint: 'This is your read on the night as it stands. The steps on the left are how you book it.',
    night: 'NIGHT', room: 'ROOM', sound: 'SOUND', door: 'DOOR', security: 'SECURITY', flyer: 'FLYER', promo: 'PROMO', prep: 'PREP', price: 'PRICE', deal: 'DEAL',
    blank: 'nothing yet',
    noJobs: 'Nothing to do here yet. It fills in as the show comes together.',
    inDays: 'IN {n} DAYS', inDay: 'TOMORROW', tonight: 'TONIGHT',
    st: { EMPTY: 'TO DO', OPT: 'IF YOU WANT', TONIGHT: 'GOES OUT TONIGHT', WAITING: 'WAITING', YES: 'YES', NO: 'SAID NO', COUNTER: 'COUNTERED', HELD: 'ON HOLD · FIRST IN LINE', HELDN: 'ON HOLD · #{n} IN LINE', CONFIRMED: 'CONFIRMED', OFFER: 'NO OFFER YET', DONE: 'DONE' },
    flyerV: { MADE: 'made', PASTED: 'pasted up' },
    flyerNone: 'No flyer yet. Paste one up at the flyer desk.',
    flyerPasted: 'Pasted up. Now make it: pick how sharp, then DO IT TONIGHT.',
    flyerMade: 'Made. Change it at the flyer desk if you want.',
    promoV: '{n} of {of} done',
    owe: '{amount} if nobody comes',
    out0: 'no messages go out tonight', out1: '1 message goes out tonight', outN: '{n} messages go out tonight',
    theirNights: 'THE NIGHTS THEY ASKED FOR',
    holdAsked: 'You asked {room} to hold {d}.',
    holdQueued: 'The message goes out tonight.', holdSent: 'Asked on {day}. You hear back overnight.',
    theyAsk: 'They asked for {deal}.',
    toOffer: 'THE OFFER', toOfferL: 'Open the offer to the touring band',
    page: 'PAGE', bandPage: 'Open {name}\'s page',
    order: 'RUNNING ORDER', earlier: 'EARLIER', later: 'LATER', earlierL: 'Move {name} earlier in the night', laterL: 'Move {name} later in the night',
    booked: 'BOOKED',
    billPlaying: 'PLAYING, IN THIS ORDER: DRAG ONE OR USE THE ARROWS', billPlaying1: 'PLAYING', billAsked: 'ASKED, WAITING TO HEAR BACK', billOpen: 'STILL OPEN',
    moneyHave: 'You have {have} in the bank.', moneyFund: 'The show fund has {have}.', moneyOwe: 'Promised so far for this show: {owe}.',
    droppedL: '{band} dropped: {why}.', putBack: 'PUT THEM BACK', putBackL: 'Put {band} back on the bill, on the same terms',
    bigger: 'BIGGER', smaller: 'SMALLER',
    another: '+ ANOTHER BAND', anotherL: 'Ask another band for the {slot} slot',
    peel: 'TAKE THEM OFF',
    takeIt: 'TAKE IT', takeItL: 'Take what they came back with',
    takeBack: 'TAKE IT BACK', takeBackL: 'Take back the ask',
    /* the seven steps (design/spec/11-booking-pipeline.md): one stamp each, the current one unfolded */
    steps: 'The show, step by step',
    step: { DATE: 'DATE', ROOM: 'ROOM', DEAL: 'THE DEAL', BILL: 'BILL', CREW: 'CREW', ANNOUNCE: 'ANNOUNCE', NIGHT: 'SHOW NIGHT' },
    /* the "?" on each step's header: why the step is there, two lines, shown in place */
    whyBtn: '?', whyL: 'Why is there a step for {step}?',
    why: { DATE: 'A show starts with a day. Pick one that suits the band you want, and one you have the evenings to get ready for.',
           ROOM: 'A band needs somewhere to play. Ask early, because a room can say no, or hold your date and give it to someone else.',
           DEAL: 'This is what you promise the band before they say yes. Everybody gets paid out of the door at the end of the night, so only promise what the door can cover.',
           BILL: 'Who plays, and in what order. People leave after the band they came for, so the band they came for goes near the end.',
           CREW: 'Somebody has to run the sound, and somebody has to take money at the door. Ask early. The door is usually you.',
           ANNOUNCE: 'A show nobody has heard of has no crowd. Make a flyer, then put it up, post it and hand it around.',
           NIGHT: 'On the night you open the doors, count everybody who comes in, and pay people out of the door at the end.' },
    stepSt: { DONE: 'DONE', TODO: 'TO DO', WAITING: 'WAITING ON {name}', WAITING0: 'WAITING', LOCKED: 'NOT YET', BANG: 'somebody said no or countered' },
    opens: { ROOM: 'opens when the room is confirmed', BILL: 'opens when the bands have said yes' },
    stepL: 'Step {n}, {step}, {stamp}: {line}',
    lock: 'LOCK IT', lockV: 'locked', lockNo: 'NOT LOCKED',
    sum: { date: '{d} · {when}', bill0: 'nobody yet', asked: '{n} asked', booked0: 'nobody booked', crew: 'sound {sound} · door {door}', flyer: 'flyer made', flyerNo: 'no flyer yet',
           ready: 'ready for the night', soon: 'nothing to do till the night', wants: 'they want: {need}', yours: 'yours in the morning' },
    offerRow: 'OFFER', soon: 'IN {n} DAYS', soon1: 'TOMORROW', soon0: 'TONIGHT',
    asked: 'ASKED {day}', tonightWord: 'TONIGHT',
    askedSince: 'Asked {name} on {day}. You hear back overnight.',
    next: 'NEXT',
    nextL: 'What to do next',
    nx: {
      room: 'Pick a room and ask them to hold {d}.',
      roomNo: '{room} said no: ask another room, or another night.',
      roomWants: '{room} is holding the night and wants this first: {need}.',
      pickRoom: 'PICK A ROOM', holdGo: 'ASK THEM', offerGo: 'SEND IT', jobGo: 'DO IT',
      offer: 'Send {band} your offer.',
      offerNo: '{band} said no to the offer: change it and send it again.',
      counter: '{band} came back with their own number: take it, or take back the ask.',
      seeOffer: 'THE OFFER', see: 'SEE IT',
      band: 'Ask a band {role}: press their sticker.',
      bandNamed: 'Ask {band} {role}: press their sticker.',
      bandNo: '{band} said no: ask another band for the {slot} slot.',
      bandOrLock: 'Ask a band for the {slot} slot, or lock the bill as it stands.',
      pickBand: 'PICK A BAND',
      order: 'Set the running order: drag a band up or down the bill, or use its arrows.',
      pickOrder: 'RUNNING ORDER',
      crew: 'Ask someone to run {role}.',
      crewNamed: 'Ask {name} to run {role}.',
      crewNo: '{name} said no: ask someone else to run {role}.',
      pickCrew: 'PICK SOMEONE',
      door: 'Say who works the door. At most house shows that is you: you take the money, count who comes in, and stop letting people in when the room is full.',
      doorMe: 'I WILL',
      flyer: 'Paste up the flyer at the flyer desk.',
      flyerName: 'Open the flyer desk and give your shows a name.',
      flyerMake: 'Make the flyer: pick how sharp, then do it tonight.',
      job: 'Do this tonight: {job}{due}.',
      jobDue: ', {due}',
      seeJobs: 'SEE THE JOBS',
      noTime: '{job}. {why} Call it a night.',
      stayJob: '{job} means staying up {n}: your call, or call it a night.',
      stayMsg: 'Another message means staying up {n}: your call, or call it a night.',
      noMsg: '{why} Call it a night.',
      early: 'Nothing on this show can be done yet. {job}. {why}',
      jobTomorrow: '{job} waits for tomorrow night: call it a night.',
      waiting: 'Waiting on {names}: you hear back overnight.',
      heldYours: '{room} has what it asked for, so the night is yours in the morning.',
      held2: '{room} has you #{n} in line: you hear if it opens up.',
      nothing: 'Nothing more to do on this show tonight. Call it a night.',
      nothingPhone: 'Nothing more to do on this show tonight. {n} on your phone need an answer, or call it a night.',
      keepOn: 'Everything is in hand: call it a night till the show.',
      notOpen: 'This evening is over.',
      showNight: 'It\'s show night: press GO TO THE SHOW on the clock, then open the doors.'
    },
    look: 'HOW IT LOOKS', lookL: 'How the night looks: the crowd you can expect', lookBack: 'BACK TO {row}', lookBackL: 'Back to {row}',
    toClock: 'then call it a night, on the clock ↘', toClockShort: 'on the clock ↘',
    callOff: 'cancel the show',
    laterLoss: '{day} instead of tonight: about {n} fewer{gen}{money}.', laterGenKids: ', mostly kids', laterGenOld: ', mostly old heads', laterMoney: ' (about {m} at the door)',
    priced: 'How many, and what it costs',
    moreWays: 'More ways to get the word out ({n})',
    printTba: 'PRINT NOW, BANDS TBA', doNow: 'DO IT TONIGHT', doNowL: 'Do it tonight: {job}', stillYours: 'Still yours on this show:',
    effort: 'HOW SHARP', effortWord: { ROUGH: 'ROUGH', STANDARD: 'STANDARD', SHARP: 'SHARP' },
    hasIt: '{name} has it',
    stayUp: 'means staying up {n}: +{s} stress, and tomorrow starts that much more tired',
    msgCost: 'Each ask is a message: {cost} of tonight.',
    theShow: 'this show'
  };
  SB.Content.ui.bill = {
    title: 'The bill',
    back: 'Back to the show',
    cands: 'LOCAL BANDS',
    listen: 'listen',
    listenStop: 'stop',
    listenL: 'Hear what {name} sound like',
    hearBill: 'hear the bill',
    hearBillL: 'Hear the bill in order, one band after another',
    freeOnly: 'ONLY FREE THAT NIGHT',
    freeOnlyL: 'Only bands free that night',
    pileL: 'Only {g} bands',
    allPiles: 'Every kind of band',
    noCands: 'No local band fits that.',
    pick: 'Ask {name} {role}: {fee}, answers in {lo} to {hi} days',
    withThem: '',
    /* the slot an ask is for, in the verb the row uses, and on the sticker's tab */
    role: { OPEN: 'to open', MIDDLE: 'to play second to last or in the middle', CLOSE: 'to headline' },
    askStrip: { OPEN: 'ASK TO OPEN', MIDDLE: 'ASK FOR MIDDLE', CLOSE: 'ASK TO HEADLINE' },
    filling: 'You are filling the {slot} slot. Every ask below is for it.',
    firstEmpty: 'You had no slot picked, so this ask is for the {slot} slot.',
    normalBill: 'Two or three bands is a normal bill. More than that and the night runs long.',
    /* what a band wants, in words, and when it is paid (fix list 1.7) */
    pay: { FREE: 'plays for free', GAS: 'wants gas money ({n})', FLAT: 'wants {n} for the night', SHARE: 'wants a share of the door', DOOR: 'wants a share of the door' },
    payShort: { FREE: 'FREE', GAS: 'GAS {n}', FLAT: '{n}', SHARE: 'A SHARE', DOOR: 'A SHARE' },
    payWhen: { GAS: 'Paid from the door at the end of the night.', FLAT: 'Paid from the door at the end of the night.', SHARE: 'Plays for a share of what is left after the room and sound.', DOOR: 'Plays for a share of what is left after the room and sound.' },
    ownPay: 'your band, plays for nothing',
    running: 'The local bands on this bill want {n} in all, paid from the door at the end of the night.',
    /* what a yes looks like, in words (fix list 2.19) */
    yesWord: { LIKELY: 'They usually say yes to a night like this.', GOOD: 'Good odds of a yes.', EVEN: 'Could go either way.', LONG: 'A long shot: they are booked a lot or this bill is not for them.', BOOKED: 'They are already booked that night.', OWN: 'Your own band.' },
    answerLate: 'May not answer before the show.',
    answerNever: 'Cannot answer before the show.',
    callIt: 'CALL THEM',
    callItL: 'Call {name} and hear the answer tonight, an hour of tonight',
    callCost: 'Call them: an hour tonight, and you hear back tonight.',
    several: 'You can ask two or three locals for the {slot} slot at once. The first yes takes it and the rest get a kind text.',
    severalFull: 'That is three asks out for this slot. Wait for one of them.',
    oneAtATime: 'Headliners and touring bands are asked one at a time.',
    ownGo: 'PUT US ON',
    ownGoL: 'Put {name}, your band, on the bill for this slot',
    ownTaken: '{name} are on the bill.',
    picksHead: 'WHO I WOULD ASK',
    seeAll: 'See every band in town ({n})',
    seeAllL: 'Show all {n} local bands',
    fewer: 'Just the best picks',
    why: { free: 'They are free that night. ', pull: 'They bring about {n} here. ' },
    gloss: {
      'hardcore': 'fast, tight, loud, with a lot of shouting along',
      'pop-punk': 'catchy and fast, with a crowd that sings every word',
      'emo': 'emotional and loud, with lots of kids who know the words',
      'crust': 'fast, loud and political, mostly older punks',
      'garage': 'loose, noisy rock and roll in the garage style',
      'post-punk': 'dark, cold and rhythmic, for the people in black',
      'indie': 'quieter and softer, the bedroom-and-friends crowd',
      'metal': 'slow, heavy and loud, with people who love it',
      'ska': 'upbeat with horns, and a crowd that dances',
      'folk-punk': 'acoustic and loud, with everyone singing together',
      'noise': 'extremely short, extremely loud, not for everyone',
      'street-punk': 'rough old-school punk with a patched-jacket crowd'
    },
    glossHead: 'WHAT {g} MEANS',
    fit: { FIT: 'FITS THIS BILL', STRETCH: 'A STRETCH', WRONG: 'WRONG BILL' },
    fitL: { FIT: 'their sound fits this bill', STRETCH: 'their sound is a stretch for this bill', WRONG: 'wrong bill for their sound' },
    peeled: '{name}: {state}',
    picked: 'Now tap a gap in the set list to stick {name} there, or press Escape.',
    asked: 'asked',
    yes: 'said yes',
    no: 'said no',
    counter: 'came back with a number',
    onBill: 'on the bill',
    listed: 'Someone in this band is on your list',
    gap: { OPEN: 'OPENER', MIDDLE: 'MIDDLE', CLOSE: 'HEADLINER' },
    gapL: 'Stick a band here to ask them to play as the {slot}',
    stickHere: 'STICK IT HERE',
    listedTitle: 'Before you ask',
    listedGo: 'Ask anyway',
    listedNo: 'Don\'t ask',
    setL: '{n}. {name}, {state}, on at {t}, {m} minutes. Arrow keys move it, Delete peels it off.',
    shorter: 'Five minutes shorter',
    longer: 'Five minutes longer',
    drop: 'Take {name} off the bill',
    minutes: '{n} MIN',
    starts: 'ON AT {t}',
    stop: 'The music has to stop by {t}.',
    billing: 'ON THE FLYER',
    billUp: 'Move {name} up the flyer',
    billDown: 'Move {name} down the flyer',
    pace: 'GUARANTEE {w}',
    arrive: 'in by {t}',
    leave: 'gone by {t}',
    unknownPairs: 'You don\'t know yet how these sounds go together: {list}',
    lockedWarn: 'The bill is locked. This costs trust with the band. Go ahead?',
    yesGo: 'Go ahead',
    noGo: 'Leave it',
    noWord: 'NO',
    /* what a band's sticker says about them (SB.UI.bandRead): their pull, then what helps and what holds them back */
    pull: 'PULLS {n}', pullGuess: 'PULLS {n}?', pullL: 'they pull {n} people', pullGuessL: 'word is they pull {n} people (not seen yet)',
    showWith: 'show with them: {lo}-{hi}', answers: 'answers in {lo}-{hi} days', crowd: 'their crowd: {who}', crowdL: 'Their crowd: {who}',
    plusL: 'Good: {list}', minusL: 'Holds them back: {list}',
    read: {
      fit: 'fits this bill', wrong: 'wrong bill', stretch: 'a stretch for this bill', slot: 'wants this slot', headline: 'wants to headline',
      busy: 'busy that night', no21: 'won\'t play a 21+ room', weekend: 'Fri/Sat only', justPlayed: 'just played',
      out: 'lineup change', playedOut: 'played out', listed: 'someone\'s on your list', trusts: 'trusts you', sour: 'sour on you',
      liveGood: 'great live', liveBad: 'shaky live', relGood: 'always shows up', relBad: 'flaky', promoGood: 'shares the flyer', promoBad: 'won\'t promote',
      crossGood: 'pulls other scenes', crossBad: 'only their own crowd', fun: 'in it for fun', grow: 'wants to grow', money: 'in it for the money',
      buzz: 'people are talking', fading: 'fading', hot: 'their sound is hot', cooling: 'their sound is cooling', brandNew: 'brand new band',
      fast: 'answers fast', slow: 'slow to answer', comingUp: 'coming up', playOften: 'can play often', wearsFast: 'plays out fast', worn: 'people have seen them a lot',
      needPAID: 'must get paid', needCROWD: 'wants a real crowd', needSLOT: 'picky about slots', needSOUND: 'picky about sound', needFLOOR: 'needs a floor',
      needMEAL: 'needs a meal', needON_TIME: 'hates a late night', needALL_AGES: 'all-ages rooms only', needBILL: 'picky about the bill', needNAME_RIGHT: 'spell their name right'
    }
  };

  /* ================================================================ */
  /* SB.UI.cuDraw: the paste-up pieces the clipboard, the sticker      */
  /* sheet and the key hooks share (design/spec/07-desk.md 2 and 2b)   */
  /* ================================================================ */
  /* One sign per kind of action, the same everywhere:
   *   a label-maker strip (black tape, white capitals) = open it or do it      -> strip(), thing({ strip })
   *   a tear-off tab along the foot of a slip          = pick one of these     -> tabs()
   *   a drawn box                                      = tick it               -> tickThing()
   *   a sticker or note with a lifted corner           = drag it (or tap it, then tap where it goes)
   * Reading matter (typed slips, heads, stamps already inked) carries none of them.
   * Every drawn piece goes through the copier: its SVG is rasterised, run through SB.DeskKit.photocopy (the desk's
   * and the flyers' toner pass) and swapped in as an image, cached by its markup, so the close-ups and the desk come
   * out of one machine. Without a canvas (Node) the SVG stays inline. */

  SB.UI.cuDraw = (function () {
    var TONER = '#141413', PAPER = '#f4f2ea', BONE = '#e7ddc4', GRAY = '#77756f';
    function K() { return SB.DeskKit; }
    function h(t, a, k) { return SB.UI.h(t, a, k); }
    function f(n) { return Math.round(n * 10) / 10; }
    function num(v) { return typeof v === 'number' && isFinite(v); }
    /* drawings are made in stage-scaled units (--p, one px of the old 1280 x 800 layout) and shown at w by h of them whatever the window;
       the copier rasters them as finely as the screen shows them */
    function pxPerP() { return (SB.UI.unit ? SB.UI.unit() : 0.8) * 1.25; }
    function res() { return SB.Finish && SB.Finish.res ? SB.Finish.res() : Math.max(1, Math.min(4, pxPerP() * ((typeof window !== 'undefined' && window.devicePixelRatio) || 1))); }
    function pu(n) { return 'calc(var(--p) * ' + f(n) + ')'; }
    function fonts(m) { return SB.Finish && SB.Finish.withFonts ? SB.Finish.withFonts(m) : m; }
    var DEFS = null;
    function defs() { if (DEFS === null) { try { DEFS = K().defs(); } catch (e) { DEFS = ''; } } return DEFS; }
    function svg(inner, w, ht) {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + f(w) + ' ' + f(ht) + '" width="' + f(w) + '" height="' + f(ht) + '" aria-hidden="true" focusable="false">' + defs() + inner + '</svg>';
    }

    /* ---- the copier ---- */
    var cache = {}, cacheKeys = [], queue = [], waiting = {}, busy = false;
    function hash(s) { var a = 5381, b = 52711, i, c; for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); a = ((a << 5) + a + c) | 0; b = ((b << 5) + b ^ c) | 0; } return (a >>> 0).toString(36) + (b >>> 0).toString(36) + s.length; }
    function canCopy() {
      return typeof document !== 'undefined' && document.createElement && typeof Image !== 'undefined' && typeof Blob !== 'undefined' &&
             typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function' && !!(SB.DeskKit && SB.DeskKit.photocopy) && !!(document.body && document.body.getBoundingClientRect);
    }
    /* the kit numbers its clip paths from a running count, so the same drawing differs between renders; the cache key
       renumbers them so a redraw of the same piece finds its copy */
    function norm(m) { var map = {}, n = 0; return m.replace(/\b(pc|ph|dk)(\d+)\b/g, function (all) { if (!map[all]) { map[all] = 'z' + n; n += 1; } return map[all]; }); }
    function imgHtml(url, w, ht) { return '<img alt="" draggable="false" src="' + url + '" width="' + f(w) + '" height="' + f(ht) + '">'; }
    function remember(key, url) {
      cache[key] = url; cacheKeys.push(key);
      if (cacheKeys.length > 600) { var old = cacheKeys.shift(); K().dropUrl(cache[old]); delete cache[old]; }
    }
    function pump() {
      if (busy || !queue.length) return;
      var job = queue.shift(), url, im, scale = job.res;
      busy = true;
      function done(dataUrl) {
        var list = waiting[job.key] || [];
        delete waiting[job.key];
        if (dataUrl) remember(job.key, dataUrl);
        list.forEach(function (el) { if (dataUrl && el.getAttribute('data-copy') === job.key) { el.innerHTML = imgHtml(dataUrl, job.w, job.ht); el.classList.add('is-copied'); } });
        busy = false;
        setTimeout(pump, 0);
      }
      try { url = URL.createObjectURL(new Blob([fonts(job.markup)], { type: 'image/svg+xml' })); } catch (e) { done(null); return; }
      im = new Image();
      im.onload = function () {
        var c, cw = Math.max(2, Math.round(job.w * scale)), ch = Math.max(2, Math.round(job.ht * scale));
        try {
          c = K().copyCanvas(cw, ch);
          c.ctx.drawImage(im, 0, 0, cw, ch);
        } catch (e) { c = null; }
        URL.revokeObjectURL(url);
        if (!c) { done(null); return; }
        K().photocopyAsync(c.ctx, cw, ch, job.key, { px: scale, streaks: Math.max(1, Math.round(cw / 400)), amp: 0.14 }, function (ok) {
          if (ok) K().copyUrl(c.cv, done); else done(null);
        });
      };
      im.onerror = function () { URL.revokeObjectURL(url); done(null); };
      im.src = url;
    }
    /** art(inner, w, ht, cls): a drawn piece, w by ht px, as a span; it is photocopied when it can be. */
    function art(inner, w, ht, cls) {
      var markup = svg(inner, w, ht), key, r = res(), el = h('span', { class: 'cb-art' + (cls ? ' ' + cls : ''), aria: { hidden: 'true' }, style: { width: pu(w), height: pu(ht), aspectRatio: f(w) + ' / ' + f(ht) } });
      if (!canCopy()) { el.innerHTML = markup; return el; }
      key = hash(norm(markup)) + '@' + r;
      el.setAttribute('data-copy', key);
      if (cache[key]) { el.innerHTML = imgHtml(cache[key], w, ht); el.classList.add('is-copied'); return el; }
      el.innerHTML = markup;
      if (!waiting[key]) { waiting[key] = []; queue.push({ key: key, markup: markup, w: w, ht: ht, res: r }); }
      waiting[key].push(el);
      pump();
      return el;
    }
    /** thumb(flyer, wP, flat): the flyer thumbnail part, rastered as finely as the screen shows it and shown wP units wide (its tilt unless flat) */
    function thumb(flyer, wP, flat) {
      var el = SB.UI.parts.flyerThumb(flyer, Math.max(wP, Math.round(wP * res()))), bl;
      if (!el) return el;
      el.style.width = pu(wP);
      if (flat) el.style.transform = 'none';
      bl = el.querySelector ? el.querySelector('.sb-flyer-blank') : null;
      if (bl) bl.style.height = pu(wP * 1.3);
      return el;
    }
    function strip0(m) { return String(m || '').replace(/<title>[\s\S]*?<\/title>/g, '').replace(/ role="img"/, '').replace(/ aria-label="[^"]*"/, ''); }
    /** place(markup, x, y): put a whole <svg> string inside another at x, y. */
    function place(m, x, y) { return strip0(m).replace('<svg', '<svg x="' + f(x) + '" y="' + f(y) + '"'); }
    function cityInk() {
      var s = SB.UI.game ? SB.UI.game() : null, p = null;
      try { p = s ? SB.Cities.pack(s) : null; } catch (e) { p = null; }
      var inks = p && p.style && p.style.cityInks ? p.style.cityInks : ['fireRed', 'bayouTeal'];
      return [K().ink(inks[0]), K().ink(inks[1] || inks[0])];
    }
    /** hot(): what needs the player is marked in toner with a highlighter swipe behind it (swipe()), never a red */
    function hot() { return TONER; }
    /** swipe(x, y, w, s): one real highlighter swipe across something that needs the player, centred on y */
    function swipe(x, y, w, s) { s = s || 14; return '<path d="M' + f(x) + ' ' + f(y + 1) + 'L' + f(x + w) + ' ' + f(y - 1) + '" stroke="' + K().ink('fluorYellow') + '" stroke-opacity=".62" stroke-width="' + f(s) + '" stroke-linecap="butt"/>'; }
    function blue() { return K().ink('ballpointBlue'); }

    /* ---- lettering ---- */
    function marker(t, x, y, s, o) { return K().marker(String(t), x, y, s, o || {}); }
    function mw(t, s, o) { return K().markerWidth(String(t), s, o); }
    function type(t, x, y, s, o) { return K().type(String(t), x, y, s, o || {}); }
    function tw(t, s) { return K().typeWidth(String(t), s); }
    function letter(t, x, y, s, o) { return K().letter(String(t), x, y, s, o || {}); }
    function lw(t, s) { return K().letterWidth(String(t), s); }
    /** word(t, s, o): a heading in marker capitals, sized to its own piece (reading matter: it is not a control) */
    function word(t, s, o) {
      o = o || {};
      t = String(t).toUpperCase();
      var w = mw(t, s) + 12;
      return art(marker(t, 5, s + 4, s, { fill: o.ink || TONER, seed: 'w' + t, rot: o.rot || 0, halo: o.halo }), w, s + 12, 'cb-word' + (o.cls ? ' ' + o.cls : ''));
    }
    /** typed(t, s): a short typed line as a drawn piece */
    function typed(t, s, o) { o = o || {}; var w = tw(t, s) + 8; return art(type(t, 4, s + 2, s, { fill: o.ink, bold: o.bold }), w, s + 7, o.cls); }

    /* ---- the label-maker strip: black tape, white embossed capitals, a white edge: open it, or do it ---- */
    function stripW(t, s) { return tw(String(t).toUpperCase(), s) + s * 1.5 + 6; }
    function strip(t, x, y, s, o) {
      o = o || {};
      t = String(t).toUpperCase();
      var w = stripW(t, s), ht = s * 1.75 + 4, ground = o.ground || TONER, ink = o.ink || PAPER;
      return '<g transform="rotate(' + f(o.rot || 0) + ' ' + f(x + w / 2) + ' ' + f(y + ht / 2) + ')">' +
        '<path d="M' + f(x + 3) + ' ' + f(y + 4) + 'h' + f(w) + 'v' + f(ht) + 'h' + f(-w) + 'Z" fill="#000" fill-opacity=".6"/>' +
        '<path d="M' + f(x) + ' ' + f(y) + 'h' + f(w) + 'l-2 ' + f(ht / 2) + 'l2 ' + f(ht / 2) + 'h' + f(-w) + 'l2 ' + f(-ht / 2) + 'Z" fill="' + ground + '"/>' +
        '<path d="M' + f(x + 3) + ' ' + f(y + 2.5) + 'h' + f(w - 6) + 'M' + f(x + 3) + ' ' + f(y + ht - 2.5) + 'h' + f(w - 6) + '" stroke="' + ink + '" stroke-width="1.1" stroke-opacity=".75"/>' +
        type(t, x + s * 0.75 + 3, y + ht / 2 + s * 0.36, s, { fill: ink, bold: true }) + '</g>';
    }
    /** stripArt(t, s, o): a strip as its own piece (inverts on hover and focus, through CSS). */
    function stripArt(t, s, o) { s = s || 13; return art(strip(t, 2, 2, s, o), stripW(t, s) + 8, s * 1.75 + 12, 'cb-strip'); }

    /** thing(o): a drawn thing you tap. o = { cls, label, svg, w, h, kids, onClick, fk, pressed, disabled, drop, on, strip, stripSize }
     *  o.strip puts the label-maker strip on the thing's top-left corner (or makes the strip the whole thing when there is no svg). */
    function thing(o) {
      var kids = [];
      if (o.svg) kids.push(art(o.svg, o.w, o.h));
      if (o.strip) kids.push(stripArt(o.strip, o.stripSize || (o.svg ? 11 : 13), o.stripOpts));
      if (o.kids) kids = kids.concat(o.kids);
      return h('button', { type: 'button', class: 'cb-thing pz-hl' + (o.svg && o.strip ? ' has-strip' : '') + (!o.svg && o.strip ? ' is-strip' : '') + (o.cls ? ' ' + o.cls : ''), title: o.title || null,
        aria: { label: o.label, pressed: o.pressed === undefined ? null : String(!!o.pressed) },
        data: { fk: o.fk || null, drop: o.drop || null, tut: o.tut || null, 'tut-ref': o.tutRef || null }, disabled: !!o.disabled,
        on: o.on || (typeof o.onClick === 'function' ? { click: o.onClick } : null) }, kids);
    }
    /** listen(o): a small typed control that plays a loop (SB.Audio) and reads "stop" while it plays; null when there is
     *  nothing to hear. o = { band } for one band's loop, or { bill: [bands] } for the bill in order; o.text, o.stopText, o.label, o.fk */
    function listen(o) {
      var A = SB.Audio, band = o.band, bill = o.bill, box, off, any;
      if (!A) return null;
      any = band ? A.has(band) : (bill || []).some(function (b) { return A.has(b); });
      if (!any) return null;
      box = h('span', { class: 'cb-listen' });
      function draw() {
        var n = A.now(), on = band ? (n.kind === 'band' && n.bandId === band.id) : n.kind === 'bill', t = on ? (o.stopText || 'stop') : (o.text || 'listen'),
            icon = on ? '<path d="M2 3H12V13H2Z" fill="' + TONER + '"/>' : '<path d="M2 2L13 8L2 14Z" fill="' + TONER + '"/>',
            doc = typeof document !== 'undefined' ? document : null, had = !!(doc && doc.activeElement && box.contains && box.contains(doc.activeElement)), el;
        SB.UI.clear(box);
        el = thing({ cls: 'cb-listenbtn' + (on ? ' is-on' : ''), label: (o.label || t) + (on ? ' (' + (o.stopText || 'stop') + ')' : ''), pressed: on, fk: o.fk,
          svg: icon + type(t, 18, 13, 12, { bold: true }), w: tw(t, 12) + 24, h: 18,
          onClick: function (e) { if (e && e.stopPropagation) e.stopPropagation(); if (band) A.playBand(band); else A.playBill(bill); } });
        box.appendChild(el);
        if (had && el.focus) try { el.focus(); } catch (e2) { /* fine */ }
      }
      draw();
      off = A.watch(function () { if (box.isConnected === false) { off(); return; } draw(); });
      return box;
    }
    /** act(text, label, fk, onClick, o): a strip that does something (the commonest control) */
    function act(text, label, fk, onClick, o) { o = o || {}; return thing({ cls: 'cb-act' + (o.cls ? ' ' + o.cls : ''), strip: text, stripSize: o.size || 14, stripOpts: o.hot ? { ground: hot() } : null, label: label, fk: fk, onClick: onClick, disabled: o.disabled, tut: o.tut, tutRef: o.tutRef }); }

    /** tabs(o): a slip of paper with tear-off tabs along its foot: pick one. o = { label, title, items: [{ text, on, label, fk, onClick, art, w, disabled }], stock, size }
     *  The picked tab is torn off: inked solid and hanging loose. */
    function tabs(o) {
      var s = o.size || 12, items = (o.items || []).map(function (it, i) {
        var t = String(it.text || '').toUpperCase(), aw = it.w || 0, w = Math.max(aw + 12, tw(t, s) + 16, 34), th = (it.ah || 0) + s * 2 + 8, out = '', r = K().rng('tab' + t + i);
        out += '<path d="' + K().polyD(K().cutPts(2, 2, w - 4, th - 4, { rng: r, cut: 1.1, torn: it.on ? 't' : '' })) + '" fill="' + (it.on ? TONER : PAPER) + '"/>';
        if (!it.on) out += '<path d="M3 2.5H' + f(w - 3) + '" stroke="' + TONER + '" stroke-width="1.6" stroke-dasharray="3 3"/>' + '<path d="M2 3V' + f(th - 2) + 'M' + f(w - 2) + ' 3V' + f(th - 2) + '" stroke="' + TONER + '" stroke-width="1.2" stroke-opacity=".5"/>';
        if (it.art) out += '<g transform="translate(' + f((w - aw) / 2) + ' 6)">' + it.art + '</g>';
        out += type(t, w / 2, th - s * 0.75 - 1, s, { anchor: 'middle', bold: true, fill: it.on ? PAPER : TONER, maxWidth: w - 8 });
        if (it.no) out += K().line(5, th - s * 0.75 - 4, w - 5, th - s * 0.75 - 7, { seed: 'tno' + i, sw: 2.2 });      // crossed out: it will not fit tonight
        return thing({ cls: 'cb-tab' + (it.on ? ' is-on' : '') + (it.no ? ' cb-nofit' : ''), label: it.label || t, pressed: !!it.on, fk: it.fk, disabled: it.disabled, tut: it.tut, tutRef: it.tutRef, svg: out, w: w, h: th, onClick: it.onClick });
      });
      return h('div', { class: 'cb-tabslip cb-stock-' + (o.stock || 'white') + (o.cls ? ' ' + o.cls : ''), role: 'group', aria: { label: o.label || o.title || '' } }, [
        o.title ? h('span', { class: 'cb-tabtitle', aria: { hidden: 'true' } }, typed(String(o.title).toUpperCase(), 11, { bold: true })) : null,
        h('div', { class: 'cb-tabrow' }, items)
      ]);
    }

    /* ---- marks ---- */
    /** tick(st, s): a drawn box: ticked (DONE, PROMISED, PLANNED), crossed (MISSED), struck (WAIVED), empty (TODO) */
    function tick(st, s) {
      var out = '<path d="M3 3H' + f(s - 3) + 'V' + f(s - 3) + 'H3Z" fill="' + PAPER + '"/>' + K().rect(3, 3, s - 6, s - 6, { seed: 'tk' + s, sw: Math.max(2, s / 9), wob: 0.5, over: 1.2 });
      if (st === 'DONE' || st === 'PROMISED' || st === 'PLANNED') out += K().path([[s * 0.2, s * 0.5], [s * 0.42, s * 0.78], [s * 0.92, s * 0.02]], { seed: 'tkk', sw: Math.max(2.6, s / 7), wob: 0.4, cap: 'square' });
      else if (st === 'MISSED') out += K().xout(s * 0.2, s * 0.2, s * 0.6, s * 0.6, { seed: 'tx', sw: Math.max(2.4, s / 8) });
      else if (st === 'WAIVED') out += K().line(s * 0.1, s * 0.5, s * 0.9, s * 0.5, { seed: 'tw', sw: 2.4 });
      return out;
    }
    /** tickThing(o): a box you tick with its typed words beside it. o = { on, text, label, fk, onClick, size, disabled } */
    function tickThing(o) {
      var s = o.size || 22, t = String(o.text || '');
      return thing({ cls: 'cb-tick' + (o.on ? ' is-on' : ''), label: o.label || t, pressed: !!o.on, fk: o.fk, disabled: o.disabled,
        svg: tick(o.on ? 'DONE' : 'TODO', s) + (t ? type(t, s + 6, s * 0.72, 12, { bold: true }) : ''), w: s + (t ? tw(t, 12) + 12 : 0), h: s, onClick: o.onClick });
    }
    /** mark(st, s): how a job stands, as a mark that is not a box (it is not a control): a check, a cross, a dash, an arrow */
    function mark(st, s) {
      if (st === 'DONE' || st === 'PROMISED' || st === 'PLANNED') return K().path([[s * 0.1, s * 0.5], [s * 0.38, s * 0.85], [s * 0.95, s * 0.05]], { seed: 'mk', sw: s / 6, cap: 'square' });
      if (st === 'MISSED') return K().xout(s * 0.15, s * 0.15, s * 0.7, s * 0.7, { seed: 'mx', sw: s / 7 });
      if (st === 'WAIVED') return K().line(s * 0.1, s * 0.5, s * 0.9, s * 0.5, { seed: 'mw', sw: s / 7 });
      return K().arrow(s * 0.05, s * 0.5, s * 0.9, s * 0.5, { seed: 'ma', sw: s / 8, head: s * 0.35, wob: 1 });
    }
    /** stamp(text, x, y, s, o): an inked rubber stamp: a box and marker capitals, a little rotated; o.on false: barely there */
    function stamp(t, x, y, s, o) {
      o = o || {};
      t = String(t).toUpperCase();
      var w = stampW(t, s), ht = s * 1.9, col = o.ink || TONER, op = o.on === false ? 0.22 : 0.95;
      return '<g opacity="' + op + '" transform="rotate(' + f(o.rot || 0) + ' ' + f(x + w / 2) + ' ' + f(y + ht / 2) + ')" filter="url(#dk-toner)">' +
        K().rect(x + 1, y + 1, w - 2, ht - 2, { seed: 'stp' + t, sw: Math.max(2, s / 5), stroke: col, wob: 0.8, over: 0.5 }) +
        marker(t, x + s * 0.55, y + ht / 2 + s / 2, s, { fill: col, seed: 'sp' + t, vary: 0.06, tilt: 2, rough: false }) + '</g>';
    }
    /** bang(x, y, s, ink): a marker "!!" (needs you now), baseline at y */
    function bang(x, y, s, ink) {
      var c = ink || hot(), out = swipe(x - s * 0.2, y - s * 0.45, s * 1.1, s * 0.9), i;
      for (i = 0; i < 2; i++) out += '<path d="M' + f(x + i * s * 0.42) + ' ' + f(y - s) + 'h' + f(s * 0.26) + 'l' + f(-s * 0.06) + ' ' + f(s * 0.68) + 'h' + f(-s * 0.14) + 'Z M' + f(x + i * s * 0.42 + s * 0.02) + ' ' + f(y - s * 0.18) + 'h' + f(s * 0.2) + 'v' + f(s * 0.18) + 'h' + f(-s * 0.2) + 'Z" fill="' + c + '"/>';
      return out;
    }
    function stampW(t, s) { return mw(String(t).toUpperCase(), s) + s * 1.1 + 4; }

    /* ---- heads: angular silhouettes cut from a copy ---- */
    function headPts(cx, by, s) {
      var hy = by - s * 0.66, r = s * 0.24;
      return {
        head: [[cx - r * 0.85, hy - r * 0.55], [cx - r * 0.35, hy - r], [cx + r * 0.45, hy - r * 0.95], [cx + r * 0.9, hy - r * 0.4], [cx + r * 0.8, hy + r * 0.55], [cx + r * 0.25, hy + r], [cx - r * 0.45, hy + r * 0.9], [cx - r * 0.95, hy + r * 0.3]],
        body: [[cx - s * 0.42, by], [cx - s * 0.36, by - s * 0.3], [cx - s * 0.12, by - s * 0.4], [cx + s * 0.12, by - s * 0.4], [cx + s * 0.36, by - s * 0.3], [cx + s * 0.42, by]]
      };
    }
    /** head(cx, by, s, o): o.mode 'solid' (toner), 'open' (white cut paper, toner edge), 'dots' (halftone), 'ink' (o.ink); o.op */
    function head(cx, by, s, o) {
      o = o || {};
      var p = headPts(cx, by, s), d = K().polyD(p.head) + K().polyD(p.body), mode = o.mode || 'solid', op = o.op === undefined ? 1 : o.op, out;
      if (mode === 'open') out = '<path d="' + d + '" fill="' + PAPER + '" stroke="' + (o.ink || TONER) + '" stroke-width="1.5" stroke-linejoin="miter"' + (o.dash ? ' stroke-dasharray="2 2"' : '') + '/>';
      else if (mode === 'dots') out = '<path d="' + d + '" fill="url(#dk-ht3)"/>';
      else out = '<path d="' + d + '" fill="' + (mode === 'ink' ? (o.ink || hot()) : TONER) + '"/>';
      return '<g opacity="' + f(op) + '">' + out + '</g>';
    }
    function niceUnit(max, per) {
      var raw = Math.max(1, max / per), steps = [1, 2, 3, 4, 5, 10, 15, 20, 25, 50, 100, 200, 250, 500, 1000], i;
      for (i = 0; i < steps.length; i++) if (steps[i] >= raw) return steps[i];
      return Math.ceil(raw);
    }
    /** crowd(o): rows of heads, the figure hand-lettered beside each row.
     *  o = { par, lo, hi, cap, even, add: { lo, hi }, w } -> element. Your call is a solid row fading into a range. */
    function crowd(o) {
      var L = function (k, c) { return SB.text.label('ui.show.' + k, c); }, per = o.per || 22, step = 17, x0 = 8, rows = [], out = '', y = 58,
          max = Math.max(1, o.par || 0, o.hi || 0, o.cap || 0, o.add ? o.add.hi || 0 : 0), unit = niceUnit(max, per), i, n, a, b, r, W = x0 + per * step + 96;
      per = Math.min(per, Math.max(8, Math.ceil(max / unit) + 1)); W = x0 + per * step + 96;   // no empty yards of paper to the right of a small crowd
      function xAt(v) { return x0 + Math.min(per + 0.5, v / unit) * step; }
      if (num(o.par)) rows.push({ k: 'par', label: L('par'), fig: String(Math.round(o.par)), draw: function (yy) {
        var s = ''; n = Math.max(1, Math.round(o.par / unit));
        for (i = 0; i < Math.min(per, n); i++) s += head(x0 + i * step + 5, yy, 24, { mode: 'open' });
        return s; } });
      if (num(o.lo) && num(o.hi) && o.hi > 0) rows.push({ k: 'call', label: L('call'), fig: Math.round(o.lo) + '-' + Math.round(o.hi), draw: function (yy) {
        var s = ''; a = Math.round(o.lo / unit); b = Math.max(a, Math.round(o.hi / unit));
        for (i = 0; i < Math.min(per, b); i++) s += head(x0 + i * step + 5, yy, 24, i < a ? { mode: 'solid' } : { mode: 'dots', op: Math.max(0.25, 1 - (i - a + 1) / (b - a + 2)) });
        return s; } });
      else rows.push({ k: 'call', label: L('call'), fig: '?', draw: function () { return ''; } });
      if (o.add && num(o.add.hi) && o.add.hi > 0) rows.push({ k: 'add', label: L('withThem'), fig: Math.round(o.add.lo) + '-' + Math.round(o.add.hi), draw: function (yy) {
        var s = ''; a = Math.round(o.add.lo / unit); b = Math.max(a, Math.round(o.add.hi / unit));
        for (i = 0; i < Math.min(per, b); i++) s += head(x0 + i * step + 5, yy, 24, i < a ? { mode: 'ink', ink: blue() } : { mode: 'open', ink: blue(), dash: true });
        return s; } });
      rows.forEach(function (row, k) {
        r = y + k * 56;
        out += type(row.label, 4, r - 30, 12, { bold: true, fill: row.k === 'add' ? blue() : TONER });
        out += row.draw(r);
        if (!(o.noCallFig && row.k === 'call' && row.fig !== '?')) out += marker(row.fig, x0 + per * step + 12, r, 22, { fill: row.k === 'add' ? blue() : TONER, seed: 'cf' + row.k + row.fig });
      });
      var bot = y + rows.length * 56 - 34;
      if (num(o.cap) && o.cap > 0) {
        out += K().line(xAt(o.cap), 22, xAt(o.cap), bot, { seed: 'cap', sw: 3, dash: '6 4', over: 0 });
        out += type(L('full') + ' ' + o.cap, xAt(o.cap) - 6, bot + 15, 12, { bold: true, anchor: 'end' });
      }
      if (num(o.even) && o.even > 0) {
        out += K().line(xAt(o.even), 22, xAt(o.even), bot, { seed: 'even', sw: 2, over: 0 });
        out += type('$ ' + L('even') + ' ' + o.even, xAt(o.even) + 4, 14, 12, { bold: true });
      }
      if (unit > 1) out += head(10, bot + 18, 16) + type('= ' + unit, 22, bot + 15, 12, { bold: true });
      rows.forEach(function (row) { W = Math.max(W, x0 + per * step + 30 + mw(row.fig, 22)); });   // the widest figure fits
      var lab = rows.map(function (row) { return row.k === 'par' ? L('crowdPar', { n: row.fig }) : (row.k === 'call' && row.fig !== '?' ? L('crowdCall', { lo: row.fig.split('-')[0], hi: row.fig.split('-')[1] }) : row.label + ' ' + row.fig); }).join(' ') + (num(o.cap) ? ', ' + L('full') + ' ' + o.cap : '') + (num(o.even) ? ', ' + L('even') + ' ' + o.even : '');
      return h('div', { class: 'cb-crowd', role: 'img', aria: { label: lab } }, [art(out, W, bot + 22)]);
    }
    /** unknowns(list): question-mark scraps; each opens its notebook page (so it carries a strip) */
    function unknowns(list) {
      if (!list || !list.length) return null;
      return h('div', { class: 'cb-scraps' }, list.slice(0, 3).map(function (u, i) {
        var t = String(u.label || u.key || '?'), w = Math.min(230, Math.max(96, tw(t, 12) + 50)), out = '';
        out += K().paper(4, 6, w - 10, 50, { seed: 'uq' + i, stock: 'white', torn: 'tr', rot: i % 2 ? 2 : -2, sx: 3, sy: 4, burn: 0.4,
          inner: marker('?', 12, 46, 34, { seed: 'uqm' + i }) + type(t, 40, 34, 12, { bold: true, maxWidth: w - 54 }) });
        return thing({ cls: 'cb-scrap', label: SB.text.label('ui.show.unknownL', { what: t }), svg: out, w: w, h: 60, strip: '?', stripSize: 12,
          onClick: function () { SB.UI.go('notebook', { key: u.key }); } });
      }));
    }
    /** face(id, s, o): a stamped face, like a xeroxed photo-booth frame: a toner square, a head cut in its own ink. o.past fades it. */
    function face(id, s, o) {
      o = o || {};
      var r = K().rng('face:' + id), inkA = TONER, out = '', hair = Math.floor(r.next() * 4), p, k = s / 40;
      try { inkA = SB.Identity.inks(id).a; } catch (e) { inkA = GRAY; }
      out += '<path d="M2 2H' + f(s - 2) + 'V' + f(s - 2) + 'H2Z" fill="' + PAPER + '" stroke="' + TONER + '" stroke-width="2"/>';
      out += K().dotsRect(2, 2, s - 4, s - 4, 1);
      p = headPts(s / 2, s - 2, s * 1.15);
      out += '<path d="' + K().polyD(p.body) + '" fill="' + inkA + '"/>';
      out += '<path d="' + K().polyD(p.head) + '" fill="' + TONER + '"/>';
      if (hair === 0) out += '<path d="M' + f(s * 0.3) + ' ' + f(s * 0.3) + 'L' + f(s * 0.5) + ' ' + f(s * 0.08) + 'L' + f(s * 0.7) + ' ' + f(s * 0.3) + 'Z" fill="' + TONER + '"/>';
      else if (hair === 1) { var i; for (i = 0; i < 5; i++) out += '<path d="M' + f(s * (0.33 + i * 0.085)) + ' ' + f(s * 0.3) + 'L' + f(s * (0.3 + i * 0.1)) + ' ' + f(s * 0.06) + '" stroke="' + TONER + '" stroke-width="' + f(2.6 * k + 0.6) + '"/>'; }
      else if (hair === 2) out += '<path d="M' + f(s * 0.24) + ' ' + f(s * 0.78) + 'L' + f(s * 0.26) + ' ' + f(s * 0.28) + 'L' + f(s * 0.5) + ' ' + f(s * 0.16) + 'L' + f(s * 0.74) + ' ' + f(s * 0.28) + 'L' + f(s * 0.76) + ' ' + f(s * 0.78) + 'L' + f(s * 0.66) + ' ' + f(s * 0.5) + 'L' + f(s * 0.34) + ' ' + f(s * 0.5) + 'Z" fill="' + TONER + '"/>';
      out += K().dots(K().polyD(p.head.slice(0, 5)), 2, { white: true });
      out += '<path d="M' + f(s * 0.4) + ' ' + f(s * 0.44) + 'h' + f(s * 0.07) + 'M' + f(s * 0.54) + ' ' + f(s * 0.44) + 'h' + f(s * 0.07) + '" stroke="' + PAPER + '" stroke-width="' + f(1.6 * k + 0.6) + '"/>';
      return '<g' + (o.past ? ' opacity=".4"' : '') + '>' + out + '</g>';
    }
    /** heartMeter(v, cx, cy, s, id): a sharpie heart outline, hatched in as far as the value 0..100 goes */
    function heartMeter(v, cx, cy, s, id) {
      var top = cy - s / 2, fillH = s * Math.max(0, Math.min(100, v || 0)) / 100, cid = 'hm' + String(id).replace(/[^a-z0-9]/gi, '');
      return '<defs><clipPath id="' + cid + '"><rect x="' + f(cx - s) + '" y="' + f(top + s - fillH) + '" width="' + f(s * 2) + '" height="' + f(fillH + 2) + '"/></clipPath></defs>' +
        K().heart(cx, cy, s, { seed: cid + 'o', fill: PAPER }) + '<g clip-path="url(#' + cid + ')">' + K().heart(cx, cy, s, { seed: cid + 'o', fill: TONER }) + '</g>';
    }
    /** highlighter(window, today, planned, w): the job's window as highlighter streaks on a ruler of days */
    function highlighter(win, today, planned, w) {
      win = win || {};
      var pts = [win.opens, win.idealUntil, win.lateFrom, win.missedAt, today, planned].filter(num), a, b, span, out = '', ht = 18;
      if (!pts.length) return '';
      a = Math.min.apply(null, pts); b = Math.max.apply(null, pts) + 1; span = Math.max(1, b - a);
      function X(d) { return 4 + (d - a) / span * (w - 8); }
      function streak(from, to, col, op) { if (!num(from) || !num(to) || to < from) return ''; return '<path d="M' + f(X(from)) + ' 9H' + f(X(to + 1)) + '" stroke="' + col + '" stroke-opacity="' + (op || 0.75) + '" stroke-width="12" stroke-linecap="butt"/>'; }
      out += streak(num(win.opens) ? win.opens : a, num(win.idealUntil) ? win.idealUntil : (num(win.lateFrom) ? win.lateFrom - 1 : b - 1), K().ink('fluorYellow'));
      if (num(win.idealUntil) && num(win.lateFrom)) out += streak(win.idealUntil + 1, win.lateFrom - 1, K().ink('fluorYellow'), 0.35);
      if (num(win.lateFrom)) out += K().hatch(X(win.lateFrom), 4, Math.max(2, X(num(win.missedAt) ? win.missedAt : b) - X(win.lateFrom)), 10, { seed: 'hlt', gap: 4, sw: 1.4 });
      if (num(win.missedAt)) out += '<path d="M' + f(X(win.missedAt)) + ' 9H' + f(X(b)) + '" stroke="' + TONER + '" stroke-width="2" stroke-dasharray="3 3"/>';
      out += '<path d="M4 17H' + f(w - 4) + '" stroke="' + TONER + '" stroke-width="1.2"/>';
      if (num(today)) out += K().line(X(today + 0.5), 0, X(today + 0.5), ht, { seed: 'tdy', sw: 3, over: 0 });
      if (num(planned)) out += '<path d="M' + f(X(planned + 0.5)) + ' 2l5 7-5 7-5-7z" fill="' + TONER + '"/>';
      return out;
    }
    /* ---- the clipboard as a thing: masonite, sheets, a steel clip ---- */
    function rrD(x, y, w, ht, rad, r) {
      function jj(a) { return r ? (r.next() * 2 - 1) * a : 0; }
      var x2 = x + w, y2 = y + ht, k = rad;
      return 'M' + f(x + k) + ' ' + f(y + jj(0.6)) + 'L' + f(x2 - k) + ' ' + f(y + jj(0.6)) + 'Q' + f(x2) + ' ' + f(y) + ' ' + f(x2 + jj(0.6)) + ' ' + f(y + k) +
        'L' + f(x2 + jj(0.6)) + ' ' + f(y2 - k) + 'Q' + f(x2) + ' ' + f(y2) + ' ' + f(x2 - k) + ' ' + f(y2 + jj(0.6)) + 'L' + f(x + k) + ' ' + f(y2 + jj(0.6)) +
        'Q' + f(x) + ' ' + f(y2) + ' ' + f(x + jj(0.6)) + ' ' + f(y2 - k) + 'L' + f(x + jj(0.6)) + ' ' + f(y + k) + 'Q' + f(x) + ' ' + f(y) + ' ' + f(x + k) + ' ' + f(y) + 'Z';
    }
    /** masonite(x, y, w, h, seed, o): a hardboard clipboard's board: brown masonite with rounded corners, a dark pressed
     *  edge, a mottle and fibre flecks, pale worn scuffs at the corners, scratches. o.s scale (1 = a 230px clipboard). */
    function masonite(x, y, w, ht, seed, o) {
      o = o || {};
      var r = K().rng('mz' + seed), s = o.s || 1, rad = Math.max(3, 10 * s), d = rrD(x, y, w, ht, rad, r), out = '', inner = '', i, n, px, py, a, l,
          dark = '', light = '', scr = '', cid = K().id('pc');
      out += '<path d="' + d + '" transform="translate(' + f(2 + 4 * s) + ' ' + f(3 + 5 * s) + ')" fill="#000" fill-opacity=".64"/>';
      out += '<path d="' + d + '" fill="#7e5c38"/>';
      /* the mottle: big soft patches a shade darker and lighter */
      n = Math.max(4, Math.round(w * ht / 9000));
      for (i = 0; i < n; i++) {
        inner += '<ellipse cx="' + f(x + r.next() * w) + '" cy="' + f(y + r.next() * ht) + '" rx="' + f((18 + r.next() * 60) * Math.max(0.4, s)) + '" ry="' + f((10 + r.next() * 30) * Math.max(0.4, s)) +
          '" fill="' + (r.next() < 0.55 ? '#5c4127' : '#a07a4b') + '" fill-opacity="' + f(0.24 + r.next() * 0.26) + '" transform="rotate(' + f(r.range(-25, 25)) + ' ' + f(x + w / 2) + ' ' + f(y + ht / 2) + ')"/>';
      }
      /* fibre flecks, mostly lying one way */
      n = Math.min(2600, Math.round(w * ht / (o.detail === false ? 600 : 210)));
      for (i = 0; i < n; i++) {
        px = x + r.next() * w; py = y + r.next() * ht; l = (1.5 + r.next() * 5) * Math.max(0.5, s); a = r.range(-0.35, 0.35);
        if (r.next() < 0.7) dark += 'M' + f(px) + ' ' + f(py) + 'l' + f(Math.cos(a) * l) + ' ' + f(Math.sin(a) * l);
        else light += 'M' + f(px) + ' ' + f(py) + 'l' + f(Math.cos(a) * l) + ' ' + f(Math.sin(a) * l);
      }
      inner += '<path d="' + dark + '" stroke="#3e2a17" stroke-opacity=".55" stroke-width="' + f(Math.max(0.6, 0.9 * s)) + '" stroke-linecap="round"/>';
      inner += '<path d="' + light + '" stroke="#b8925f" stroke-opacity=".5" stroke-width="' + f(Math.max(0.5, 0.8 * s)) + '" stroke-linecap="round"/>';
      inner += K().dotsRect(x, y, w, ht, 1, { op: 0.22 });
      /* worn corners and edges: pale scuffs where hands and table wore the face off, a chipped corner */
      [[x, y, 1, 1], [x + w, y, -1, 1], [x + w, y + ht, -1, -1], [x, y + ht, 1, -1]].forEach(function (c) {
        var sz = (14 + r.next() * 22) * Math.max(0.45, s), pts = [], k, t, rr;
        for (k = 0; k <= 8; k++) { t = (k / 8) * Math.PI / 2; rr = sz * (0.55 + r.next() * 0.6); pts.push([c[0] + c[2] * Math.cos(t) * rr, c[1] + c[3] * Math.sin(t) * rr]); }
        pts.push([c[0], c[1]]);
        inner += '<path d="' + K().polyD(pts) + '" fill="#c7a476" fill-opacity="' + f(0.35 + r.next() * 0.3) + '"/>';
      });
      n = Math.round(8 + 10 * s);
      for (i = 0; i < n; i++) {
        var edge = r.int(0, 3), along = r.next();
        px = edge === 0 || edge === 2 ? x + along * w : (edge === 1 ? x + w - r.next() * 18 * s : x + r.next() * 18 * s);
        py = edge === 1 || edge === 3 ? y + along * ht : (edge === 2 ? y + ht - r.next() * 18 * s : y + r.next() * 18 * s);
        l = (5 + r.next() * 16) * Math.max(0.5, s); a = r.range(-0.6, 0.6) + (edge % 2 ? Math.PI / 2 : 0);
        scr += 'M' + f(px) + ' ' + f(py) + 'l' + f(Math.cos(a) * l) + ' ' + f(Math.sin(a) * l);
      }
      inner += '<path d="' + scr + '" stroke="#ead8b5" stroke-opacity=".6" stroke-width="' + f(Math.max(0.6, 1 * s)) + '" stroke-linecap="round"/>';
      inner += '<path d="' + d + '" fill="none" stroke="#2c1d0f" stroke-opacity=".8" stroke-width="' + f(Math.max(2, 6 * s)) + '"/>';
      inner += '<path d="' + rrD(x + 3 * s + 1, y + 3 * s + 1, w - 6 * s - 2, ht - 6 * s - 2, Math.max(2, rad - 3 * s)) + '" fill="none" stroke="#b28c5c" stroke-opacity=".45" stroke-width="' + f(Math.max(0.6, 1.2 * s)) + '"/>';
      if (o.chip !== false) { px = x + w * (0.2 + r.next() * 0.6); inner += '<path d="M' + f(px) + ' ' + f(y + ht) + 'l' + f(4 * s) + ' ' + f(-5 * s) + 'l' + f(7 * s) + ' ' + f(1 * s) + 'l' + f(3 * s) + ' ' + f(4 * s) + 'Z" fill="#2c1d0f"/>'; }
      out += '<clipPath id="' + cid + '"><path d="' + d + '"/></clipPath><g clip-path="url(#' + cid + ')">' + inner + '</g>';
      return out;
    }
    /** typedLines(x, y, w, h, seed, s): rows of typing on a sheet, seen as toner bars (on a page you see only the edge of) */
    function typedLines(x, y, w, ht, seed, s) {
      var r = K().rng('tl' + seed), out = '', yy = y + 16 * s, step = 9 * s;
      for (; yy < y + ht - 10 * s; yy += step) { if (r.next() < 0.15) { yy += step; continue; } out += 'M' + f(x + 10 * s) + ' ' + f(yy) + 'h' + f((w - 20 * s) * (0.45 + r.next() * 0.55)); }
      return '<path d="' + out + '" stroke="#262624" stroke-width="' + f(Math.max(0.8, 2.2 * s)) + '" stroke-dasharray="' + f(5 * s) + ' ' + f(1.2 * s) + '"/>';
    }
    /** topSheet(x, y, w, h, seed, o): the top sheet of copy paper, its bottom right corner curled up; flat paper (words go
     *  on it). o.stock, o.back (the curl's underside), o.curl px, o.burn. */
    function topSheet(x, y, w, ht, seed, o) {
      o = o || {};
      var r = K().rng('ts' + seed), c = o.curl || 0, out = '', pts;
      function jj(a) { return (r.next() * 2 - 1) * a; }
      pts = [[x + jj(0.8), y + jj(0.8)], [x + w * 0.5 + jj(1), y + jj(1)], [x + w + jj(0.8), y + jj(0.8)], [x + w + jj(1), y + ht * 0.5]];
      if (c) pts.push([x + w + jj(0.5), y + ht - c], [x + w - c, y + ht + jj(0.5)]); else pts.push([x + w + jj(0.8), y + ht + jj(0.8)]);
      pts.push([x + w * 0.5 + jj(1), y + ht + jj(1)], [x + jj(0.8), y + ht + jj(0.8)], [x + jj(1), y + ht * 0.5]);
      out += K().paper(0, 0, 0, 0, { pts: pts, seed: seed, stock: o.stock || 'white', burn: o.burn === undefined ? 0.3 : o.burn, sx: o.sx || 3, sy: o.sy || 4, sop: 0.55, shadow: o.shadow });
      if (c) {
        var ax = x + w, ay = y + ht - c, bx = x + w - c, by = y + ht, fx = x + w - c * 0.95, fy = y + ht - c * 0.95,
            flap = 'M' + f(ax) + ' ' + f(ay) + 'Q' + f(fx + c * 0.42) + ' ' + f(fy + c * 0.12) + ' ' + f(fx) + ' ' + f(fy) + 'Q' + f(fx + c * 0.12) + ' ' + f(fy + c * 0.42) + ' ' + f(bx) + ' ' + f(by) + 'Z';
        out += '<path d="' + flap + '" transform="translate(' + f(c * 0.12 + 1) + ' ' + f(c * 0.16 + 1) + ')" fill="#000" fill-opacity=".38"/>';
        out += '<path d="' + flap + '" fill="' + (o.back || '#d6ceb6') + '" stroke="#141413" stroke-opacity=".55" stroke-width="1"/>';
        out += '<path d="M' + f(ax - c * 0.08) + ' ' + f(ay + c * 0.12) + 'L' + f(bx + c * 0.12) + ' ' + f(by - c * 0.08) + '" stroke="#fff" stroke-opacity=".55" stroke-width="' + f(Math.max(1, c * 0.08)) + '"/>';
      }
      return out;
    }
    /** steelClip(x, y, W, seed): a lever clip, xeroxed and cut out: the lever with its slot, the riveted plate, the jaw,
     *  a shine down it, dents and scratches. Drawn in grays so the copier gives it toner grit. W wide, W*0.34 tall. */
    function steelClip(x, y, W, seed) {
      var H = W * 0.34, r = K().rng('stc' + seed), e = Math.max(1.6, W * 0.022), out = '', sil, i, dx, dy;
      function P(pts) { return K().polyD(pts.map(function (p) { return [x + p[0] * W, y + p[1] * H]; })); }
      sil = P([[0.2, 0], [0.8, 0], [0.83, 0.33], [0.99, 0.35], [0.95, 1], [0.05, 1], [0.01, 0.35], [0.17, 0.33]]);
      out += '<defs><linearGradient id="cbsteelA" x1="0" y1="0" x2=".25" y2="1"><stop offset="0" stop-color="#ececE7"/><stop offset=".38" stop-color="#b4b6b1"/>' +
        '<stop offset=".74" stop-color="#6e706c"/><stop offset="1" stop-color="#363734"/></linearGradient>' +
        '<linearGradient id="cbsteelB" x1="0" y1="0" x2=".15" y2="1"><stop offset="0" stop-color="#9c9e99"/><stop offset=".22" stop-color="#dcded9"/><stop offset=".46" stop-color="#5b5d59"/>' +
        '<stop offset="1" stop-color="#2f302d"/></linearGradient></defs>';
      out += '<path d="' + sil + '" transform="translate(' + f(e + 2) + ' ' + f(e + 3) + ')" fill="#000" fill-opacity=".66" stroke="#000" stroke-opacity=".66" stroke-width="' + f(e * 2) + '" stroke-linejoin="bevel"/>';
      out += '<path d="' + sil + '" fill="#f4f2ea" stroke="#f4f2ea" stroke-width="' + f(e * 2) + '" stroke-linejoin="bevel"/>';
      /* the lever, its slot */
      function Q(pts) { return pts.map(function (p, i) { return (p.length > 2 ? 'Q' + f(x + p[2] * W) + ' ' + f(y + p[3] * H) + ' ' : (i ? 'L' : 'M')) + f(x + p[0] * W) + ' ' + f(y + p[1] * H); }).join('') + 'Z'; }
      out += '<path d="' + Q([[0.2, 0.42], [0.2, 0.2], [0.36, 0.02, 0.2, 0.02], [0.64, 0.02], [0.8, 0.2, 0.8, 0.02], [0.8, 0.42]]) + '" fill="url(#cbsteelB)" stroke="#141413" stroke-width="' + f(Math.max(1, W * 0.006)) + '"/>';
      out += '<path d="' + Q([[0.38, 0.27], [0.38, 0.2], [0.42, 0.11, 0.38, 0.11], [0.58, 0.11], [0.62, 0.2, 0.62, 0.11], [0.62, 0.27]]) + '" fill="#141413"/>';
      /* the plate, riveted to the board, and the rolled jaw over the paper */
      out += '<path d="' + P([[0.03, 0.37], [0.97, 0.37], [0.935, 0.8], [0.065, 0.8]]) + '" fill="url(#cbsteelA)" stroke="#141413" stroke-width="' + f(Math.max(1, W * 0.006)) + '"/>';
      out += '<path d="' + P([[0.065, 0.78], [0.935, 0.78], [0.915, 0.97], [0.085, 0.97]]) + '" fill="#4b4c49" stroke="#141413" stroke-width="' + f(Math.max(1, W * 0.005)) + '"/>';
      out += '<path d="M' + f(x + 0.08 * W) + ' ' + f(y + 0.83 * H) + 'H' + f(x + 0.92 * W) + '" stroke="#e8e8e3" stroke-opacity=".8" stroke-width="' + f(Math.max(0.8, H * 0.035)) + '"/>';
      /* a shine down it, a thinner one after */
      out += '<path d="' + P([[0.29, 0.39], [0.35, 0.39], [0.32, 0.78], [0.26, 0.78]]) + '" fill="#fff" fill-opacity=".66"/>';
      out += '<path d="' + P([[0.385, 0.39], [0.405, 0.39], [0.375, 0.78], [0.355, 0.78]]) + '" fill="#fff" fill-opacity=".45"/>';
      /* rivets */
      [0.075, 0.925].forEach(function (cx) {
        out += '<circle cx="' + f(x + cx * W) + '" cy="' + f(y + 0.6 * H) + '" r="' + f(W * 0.02) + '" fill="#6a6c68" stroke="#141413" stroke-width="' + f(Math.max(0.8, W * 0.005)) + '"/>' +
          '<circle cx="' + f(x + (cx - 0.005) * W) + '" cy="' + f(y + 0.57 * H) + '" r="' + f(W * 0.007) + '" fill="#fff" fill-opacity=".85"/>';
      });
      /* dents: a dull smudge pushed into the steel with a lit lip on one side, off centre; scratches */
      for (i = 0; i < 1; i++) {
        dx = x + (0.6 + r.next() * 0.2) * W; dy = y + 0.7 * H;
        out += '<ellipse cx="' + f(dx) + '" cy="' + f(dy) + '" rx="' + f(W * 0.04) + '" ry="' + f(H * 0.035) + '" transform="rotate(' + f(r.range(-30, 30)) + ' ' + f(dx) + ' ' + f(dy) + ')" fill="#2f302d" fill-opacity=".35"/>' +
          '<path d="M' + f(dx + W * 0.012) + ' ' + f(dy + H * 0.07) + 'l' + f(W * 0.022) + ' ' + f(-H * 0.09) + '" stroke="#fff" stroke-opacity=".75" stroke-width="' + f(Math.max(0.7, W * 0.006)) + '" stroke-linecap="round"/>';
      }
      for (i = 0; i < 6; i++) {
        dx = x + (0.08 + r.next() * 0.84) * W; dy = y + (0.4 + r.next() * 0.36) * H;
        out += '<path d="M' + f(dx) + ' ' + f(dy) + 'l' + f(r.range(4, 14) * W / 230) + ' ' + f(r.range(-2, 2) * W / 230) + '" stroke="' + (i % 2 ? '#fff' : '#2a2b29') + '" stroke-opacity=".6" stroke-width="' + f(Math.max(0.5, W * 0.003)) + '"/>';
      }
      return out;
    }
    /** clipboard(w, h, seed, o): a small clipboard: a masonite board, an older sheet or two under a typed top sheet with a
     *  curled corner, a xeroxed steel clip. The top sheet is the box (12, 24, w - 26, h - 40). o.paper top sheet stock, o.under. */
    function clipboard(w, ht, seed, o) {
      o = o || {};
      var s = w / 230, big = w >= 120, r = K().rng('cbu' + seed), sx = 12, sy = 24, sw = w - 26, sh = ht - 40, out = '';
      out += masonite(4, 10, w - 10, ht - 16, seed + 'b', { s: s, detail: big, chip: big });
      if (big) {
        out += K().paper(sx + 4 * s, sy + 4 * s, sw, sh, { seed: seed + 'u1', stock: o.under || ['goldenrod', 'pink', 'blue', 'mint'][r.int(0, 3)], rot: 1.3, sx: 2, sy: 3, sop: 0.5, burn: 0.5, cut: 1,
          inner: typedLines(sx + 4 * s, sy + 4 * s, sw, sh, seed + 'u1', s) });
      }
      out += topSheet(sx, sy, sw, sh, seed + 'p', { stock: o.paper || 'white', curl: big ? Math.round(16 * s) : 0, sx: 2, sy: 3, back: o.paper === 'bone' ? '#cbbf9f' : '#d6d1c1' });
      out += steelClip(w / 2 - w * 0.23, 1, w * 0.46, seed + 'c');
      return out;
    }
    /** peel(x, y, s): the lifted corner (you can drag this): the corner folded up, the backing showing under it */
    function peel(x, y, s) {
      return '<path d="M' + f(x) + ' ' + f(y - s) + 'L' + f(x) + ' ' + f(y) + 'L' + f(x - s) + ' ' + f(y) + 'Z" fill="' + TONER + '"/>' +
        '<path d="M' + f(x) + ' ' + f(y - s) + 'L' + f(x - s * 0.95) + ' ' + f(y - s * 1.05) + 'L' + f(x - s) + ' ' + f(y) + 'Z" fill="' + PAPER + '" stroke="' + TONER + '" stroke-width="1.6"/>' +
        '<path d="M' + f(x - s * 0.15) + ' ' + f(y - s * 0.95) + 'L' + f(x - s * 0.9) + ' ' + f(y - s * 0.2) + '" stroke="' + TONER + '" stroke-opacity=".35" stroke-width="1"/>';
    }
    /** draggable(el, payload, onDrop(target, payload)): pointer drag with a ghost; drop targets carry data-drop. */
    function draggable(el, payload, onDrop) {
      if (!el || typeof el.addEventListener !== 'function') return;
      var st = null, ghost = null, over = null, swallow = false;
      function finish() {
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        if (over) over.classList.remove('is-over');
        el.classList.remove('is-lifted');
        if (typeof document !== 'undefined' && document.body) document.body.classList.remove('cb-dragging');
        ghost = null; over = null;
      }
      function targetAt(x, y) {
        var t = typeof document !== 'undefined' && document.elementFromPoint ? document.elementFromPoint(x, y) : null;
        while (t && t.getAttribute && !t.getAttribute('data-drop')) t = t.parentNode;
        return t && t.getAttribute ? t : null;
      }
      el.addEventListener('pointerdown', function (e) { if (e.button !== undefined && e.button !== 0) return; st = { x: e.clientX, y: e.clientY, id: e.pointerId, on: false }; });
      el.addEventListener('pointermove', function (e) {
        if (!st || e.pointerId !== st.id) return;
        if (!st.on && Math.abs(e.clientX - st.x) + Math.abs(e.clientY - st.y) > 7) {
          st.on = true;
          try { el.setPointerCapture(e.pointerId); } catch (x) { /* fine */ }
          var r = el.getBoundingClientRect();
          ghost = el.cloneNode(true); ghost.className += ' cb-ghost'; ghost.removeAttribute('data-drop');
          ghost.style.width = pu(r.width / pxPerP()); ghost.style.height = pu(r.height / pxPerP());
          st.dx = st.x - r.left; st.dy = st.y - r.top;
          document.body.appendChild(ghost); document.body.classList.add('cb-dragging');
          el.classList.add('is-lifted');
        }
        if (st.on && ghost) {
          ghost.style.left = pu((e.clientX - st.dx) / pxPerP()); ghost.style.top = pu((e.clientY - st.dy) / pxPerP());
          var t = targetAt(e.clientX, e.clientY);
          if (t === el) t = null;
          if (t !== over) { if (over) over.classList.remove('is-over'); over = t; if (over) over.classList.add('is-over'); }
          e.preventDefault();
        }
      });
      el.addEventListener('pointerup', function (e) {
        if (!st) return;
        var was = st.on, t = was ? targetAt(e.clientX, e.clientY) : null;
        st = null;
        if (!was) return;
        swallow = true;
        finish();
        if (t && t !== el) onDrop(t.getAttribute('data-drop'), payload);
      });
      el.addEventListener('pointercancel', function () { st = null; finish(); });
      el.addEventListener('click', function (e) { if (swallow) { swallow = false; e.stopImmediatePropagation(); e.preventDefault(); } }, true);
    }
    /** bandSticker(card, w, o): a die-cut sticker made from the band's mark (markup, w by w*0.42); o.fill backing, o.peel lifts a corner */
    function bandSticker(c, w, o) {
      o = o || {};
      var ht = Math.round(w * 0.42), mark = '', out = '', mh = Math.floor(Math.min(ht - 18, (w - 24) / 3));
      try { mark = SB.Identity.bandMark({ id: c.id, name: c.name, genre: c.genre }, mh); } catch (e) { mark = ''; }
      out += K().sticker({ rect: [6, 6, w - 14, ht - 14] }, '', { seed: 'bs' + c.id, edge: 4, fill: o.fill || PAPER });
      if (mark) out += '<g style="color:' + TONER + '">' + place(mark, Math.max(9, (w - 4 - mh * 3) / 2), Math.max(8, (ht - 2 - mh) / 2)) + '</g>';
      else out += type(String(c.name || '').toUpperCase(), w / 2, ht / 2 + 4, 11, { anchor: 'middle', bold: true, maxWidth: w - 24 });
      if (o.peel) out += peel(w - 8, ht - 8, Math.min(20, ht * 0.4));
      return out;
    }

    return { svg: svg, art: art, strip: strip, stripW: stripW, stripArt: stripArt, place: place, thing: thing, act: act, tabs: tabs, tickThing: tickThing, mark: mark,
             marker: marker, mw: mw, type: type, tw: tw, letter: letter, lw: lw, word: word, typed: typed, head: head, crowd: crowd,
             unknowns: unknowns, face: face, stamp: stamp, bang: bang, swipe: swipe, stampW: stampW, heartMeter: heartMeter, tick: tick, highlighter: highlighter,
             clipboard: clipboard, masonite: masonite, topSheet: topSheet, steelClip: steelClip, typedLines: typedLines, peel: peel, draggable: draggable, listen: listen, bandSticker: bandSticker, cityInk: cityInk, hot: hot, blue: blue, f: f, pu: pu, pxPerP: pxPerP, res: res, thumb: thumb,
             TONER: TONER, PAPER: PAPER, BONE: BONE, GRAY: GRAY };
  })();

  var LIVE = { DRAFT: 1, CONFIRMED: 1 };
  var D = SB.UI.cuDraw;

  function K() { return SB.DeskKit; }
  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function C() { return SB.UI.C; }
  function T(route, key, ctx) { return SB.text.label('ui.' + route + '.' + key, ctx); }
  function has(key) { try { return SB.text.has('strings.' + key) || SB.text.has(key); } catch (e) { return false; } }
  function word(key, fb, ctx) { return has(key) ? SB.text.label(key, ctx) : (fb === undefined ? '' : fb); }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function safe(f, fb) { try { var v = f(); return v === undefined ? fb : v; } catch (e) { SB.log('warn', 'shows', String(e && e.message)); return fb; } }
  function act(f) { return SB.UI.act(f); }
  /* the one day count every screen uses (fix-list 2.11): SB.Week.daysTo, which counts from the closed week's last night */
  function daysTo(s, day) { return safe(function () { return SB.Week.daysTo(s, day); }, day - s.clock.day); }
  function st() { return SB.UI.game(); }
  function lower(k) { return String(k || '').toLowerCase().replace(/_/g, ' '); }
  /* a band named in lowercase ("we were weather") is quoted inside a sentence, so "Ask we were weather..." reads as a name (fix-list 3.8) */
  function bandWord(n) { n = String(n || ''); return /^[a-z]/.test(n) ? '“' + n + '”' : n; }
  function money(n) { return SB.text.money ? SB.text.money(n || 0) : '$' + Math.round(n || 0); }
  function md(day) { var d = SB.time.date(day); return d.m + '/' + d.d; }

  /* The money of an offer in sentences (fix list 1.3): what they asked for, what the guess pays each side, where you stop losing.
   * b = SB.Forecast.breakEven(...); o = { band, shape, guarantee, pct, says }; room = the room card (for the big-room warning). Terse numbers stay on the stamps. */
  function offerSentences(b, o, room) {
    var out = [], g = b && b.guess, deal, outcome, cap = room && num(room.cap) ? room.cap : 0, big;
    o = o || {};
    deal = word('deal.' + (o.shape || 'DOOR') + '.words', '', { amount: o.guarantee || 0, pct: Math.round((o.pct == null ? 1 : o.pct) * 100) });
    if (o.band) out.push(word('offer.ask', '', { band: o.band, deal: deal }) + (o.shape === 'DOOR' || !o.shape ? ' ' + word('offer.doorAfter', '') : ''));
    if (g) {
      if (b.hat) out.push(word('offer.guessHat', ''));
      else {
        outcome = g.you > 0 ? word('offer.keep', '', { you: g.you }) : (g.you < 0 ? word('offer.lose', '', { lose: -g.you }) : word('offer.zero', ''));
        out.push(word('offer.guess', '', { n: g.at, price: b.price, band: g.band, outcome: outcome }));
        out.push(b.even != null && b.price > 0 ? word('offer.even', '', { n: b.even }) : word('offer.evenNever', ''));
        /* before the locals are on, the guess is the touring band's own crowd: say so, so a fair deal does not read as a loss */
        if (typeof o.billN === 'number' && o.billN < 2) out.push(word('offer.thin', ''));
      }
      if (o.shape && o.shape !== 'DOOR' && num(b.nobody) && b.nobody < 0) out.push(word('offer.nobody', '', { lose: -b.nobody }));
    }
    if (o.says && cap && o.says >= 100 && o.says > cap * 2.5) {
      big = o.says >= 1000 ? Math.round(o.says / 100) * 100 : Math.round(o.says / 50) * 50;
      out.push(word('offer.bigRoom', '', { says: big, room: (room && room.name) || 'The room', cap: cap }));
    }
    return out;
  }
  /* the same sentences for another screen (the inbox message): o = { band, shape, guarantee, pct, says } */
  SB.UI.offerLines = function (state, sid, o) {
    var b = safe(function () { return SB.Forecast.breakEven(state, sid, { shape: o.shape, guarantee: o.guarantee || 0, share: o.pct == null ? 1 : o.pct }); }, null),
        sh = state.shows && state.shows[sid], room = sh && sh.roomId && state.rooms ? state.rooms[sh.roomId] : null;
    return offerSentences(b, Object.assign({ billN: sh && sh.bill ? (sh.bill.slots || []).length : 0 }, o), room);
  };

  /* ---- SB.UI.bandRead: what a band brings and what holds them back, read off what the player could know ---- */
  /** bandRead(state, card, o): { pull: { text, sure }, plus: [words], minus: [words], crowd: words }. Only public facts and
   *  what the notebook has learned: the draw range (word of mouth until seen), trust, the band's known needs and why they
   *  play, their buzz, how their sound is doing, and (with o.showId / o.slot / o.fit) how they sit with this show: the
   *  fit, the slot they would want, the night, the room's door. Each list leads with what matters for this show. */
  SB.UI.bandRead = function (s, c, o) {
    var E = SB.Enums, Cf = SB.Config, plus = [], minus = [], show, b, d, tp, want, rank = { OPEN: 0, MIDDLE: 1, CLOSE: 2 }, dow, crowd = [], gk = ['KIDS', 'MIDDLE', 'OLD'], seen = {};
    o = o || {};
    if (!s || !c) return { pull: null, plus: plus, minus: minus, crowd: '' };
    function R(k) { return SB.text.label('ui.bill.read.' + k); }
    function add(list, k) { if (!seen[k]) { seen[k] = true; list.push(R(k)); } }
    function mid(v) { return v && num(v.conf) && v.conf >= E.CONF.HEARD ? (v.lo50 + v.hi50) / 2 : null; }
    show = o.showId && s.shows ? s.shows[o.showId] : null;
    b = s.bands ? s.bands[c.id] : null;
    d = c.draw && c.draw.text && c.draw.text !== '—' ? { text: c.draw.text, sure: c.draw.conf >= E.CONF.SEEN } : null;
    /* this show first: how their sound sits with the bill, the slot they would want, the night and the room */
    if (o.fit === 'FIT') add(plus, 'fit'); else if (o.fit === 'WRONG') add(minus, 'wrong'); else if (o.fit === 'STRETCH') add(minus, 'stretch');
    tp = num(c.tierPublic) ? c.tierPublic : 0; want = tp >= 2 ? 'CLOSE' : (tp === 1 ? 'MIDDLE' : 'OPEN');
    if (o.slot && o.slot === want) add(plus, 'slot');
    else if (o.slot && tp >= 2 && rank[o.slot] < rank[want]) add(minus, 'headline');
    if (show && o.free === false) add(minus, 'busy');
    if (show && (c.needs || []).indexOf('ALL_AGES') >= 0 && show.door && show.door.ages === 'A21') add(minus, 'no21');
    dow = show ? SB.time.dow(show.day) : null;
    if (show && (c.needs || []).indexOf('WEEKEND') >= 0 && dow !== 4 && dow !== 5) add(minus, 'weekend');
    if (b && (b.plays || []).some(function (p) { return p <= s.clock.day && s.clock.day - p <= ((Cf.YES && Cf.YES.wornDays) || 14); })) add(minus, 'justPlayed');
    /* the band itself */
    if (c.out) add(minus, 'out');
    if (c.playedOut) add(minus, 'playedOut');
    if (c.listedMembers) add(minus, 'listed');
    if (c.trust && (c.trust.stage === 'TRUSTED' || c.trust.stage === 'ALLY')) add(plus, 'trusts');
    else if (c.trust && c.trust.stage === 'SOUR') add(minus, 'sour');
    if (num(mid(c.live))) { if (mid(c.live) >= 70) add(plus, 'liveGood'); else if (mid(c.live) <= 48) add(minus, 'liveBad'); }
    if (num(mid(c.rel))) { if (mid(c.rel) >= 0.8) add(plus, 'relGood'); else if (mid(c.rel) <= 0.55) add(minus, 'relBad'); }
    if (num(mid(c.promo))) { if (mid(c.promo) >= 0.7) add(plus, 'promoGood'); else if (mid(c.promo) <= 0.4) add(minus, 'promoBad'); }
    if (num(mid(c.cross))) { if (mid(c.cross) >= 0.5) add(plus, 'crossGood'); else if (mid(c.cross) <= 0.15) add(minus, 'crossBad'); }
    (c.needs || []).forEach(function (n) {
      if (show && (n === 'WEEKEND' || n === 'ALL_AGES')) return;                // said above when this show breaks it
      if (n === 'WEEKEND') add(minus, 'weekend');
      else if (SB.text.has('ui.bill.read.need' + n)) add(minus, 'need' + n);
    });
    if (c.motive === 'FUN') add(plus, 'fun'); else if (c.motive === 'GROW') add(plus, 'grow'); else if (c.motive === 'MONEY') add(minus, 'money');
    if (c.buzzWord === 'rising') add(plus, 'buzz'); else if (c.buzzWord === 'fading' || c.stage === 'FADING') add(minus, 'fading');
    if (c.trend === 'UP') add(plus, 'hot'); else if (c.trend === 'DOWN') add(minus, 'cooling');
    if (c.stage === 'COMING_UP') add(plus, 'comingUp');
    /* how fast the town tires of them (Bands.fresh, C.WEAR): new bands can play often, old heads play out fast */
    if (c.gens && num(c.gens[2]) && c.gens[2] >= 0.99) add(minus, 'wearsFast');                         // an old-head band (the engine checks this first)
    else if (c.stage === 'FORMING' || c.stage === 'NEW') add(plus, 'playOften');
    if (c.stage === 'FORMING' || c.stage === 'NEW') add(minus, 'brandNew');
    if (b && !c.playedOut && !seen.justPlayed && safe(function () { return SB.Bands.fresh(s, b, show ? show.day : s.clock.day); }, 1) < 0.8) add(minus, 'worn');
    if (o.rw && o.rw.hi <= 3) add(plus, 'fast'); else if (o.rw && o.rw.lo >= 4) add(minus, 'slow');
    /* who comes to see them (the band's crowd, public: it is on their sticker) */
    (c.gens || []).forEach(function (g, i) { if (num(g) && g >= 0.6) crowd.push(word('gen.' + gk[i] + '.short', lower(gk[i]))); });
    return { pull: d, plus: plus, minus: minus, crowd: crowd.join(', ') };
  };

  /** piece(cls, stock, kids, o): one self-contained piece of paper on the board (CSS cuts it and casts its paste-up shadow) */
  function piece(cls, stock, kids, o) {
    o = o || {};
    return h(o.tag || 'section', { class: 'cb-piece cb-stock-' + (stock || 'white') + (cls ? ' ' + cls : ''), role: o.role || null, aria: o.aria || (o.label ? { label: o.label } : null), data: o.data || null }, kids);
  }

  function keepFocus(root, fn) {
    var a = (typeof document !== 'undefined') ? document.activeElement : null, key = a && a.getAttribute ? a.getAttribute('data-fk') : null, el, lab = a && a.getAttribute ? a.getAttribute('aria-label') : null, had = !!(a && a !== document.body && root && root.contains && root.contains(a));
    fn();
    if (key) { el = safe(function () { return root.querySelector('[data-fk="' + key + '"]'); }, null); if (el && el.focus) { try { el.focus(); } catch (e) { /* fine */ } } }
    /* the control it was on is gone (the press used it up): land on the page's main button, not on the page (fix list 0.9) */
    if (had && (!document.activeElement || document.activeElement === document.body) && lab) {   // a word or a control with no key: the same label
      safe(function () { var l = root.querySelectorAll('[aria-label]'), i; for (i = 0; i < l.length; i++) if (l[i].getAttribute('aria-label') === lab) { l[i].focus({ preventScroll: true }); return; } }, null);
    }
    if (had && (!document.activeElement || document.activeElement === document.body)) {
      el = safe(function () { return root.querySelector('[data-fk="next"]:not([disabled])') || root.querySelector('.cb-stephead.is-on') || root.querySelector('.cb-act:not([disabled]), button:not([disabled])'); }, null);
      if (el && el.focus) { try { el.focus({ preventScroll: true }); } catch (e) { /* fine */ } }
    }
  }

  /* the moves (js/ui/finish.js): a screen's papers slap down one after another when it first shows or its list really changes */
  function slap(root, sel, sig, from) {
    var F = SB.Finish, key, els;
    if (!F || !root || !root.querySelectorAll) return;
    key = root.getAttribute ? root.getAttribute('data-mv-sig') : null;
    if (key === sig) return;
    if (root.setAttribute) root.setAttribute('data-mv-sig', sig);
    els = Array.prototype.slice.call(root.querySelectorAll(sel));
    F.stagger(els, from || 3);
    els.forEach(function (el) { el.classList.add('mv-slap'); });
  }

  /* 13-real-booking: the lesson for calling a show off, by how far out it is (more than 28 days, 14 to 28, under 14) */
  function cancelLesson(s, id) {
    var sh = s.shows && s.shows[id], irl = SB.Content && SB.Content.irl, days, key, e;
    if (!sh || !irl || !irl.cancel || !SB.UI.parts || !SB.UI.parts.irl) return null;
    days = sh.day - s.clock.day; key = days > 28 ? 'EARLY' : (days >= 14 ? 'MID' : 'LATE'); e = irl.cancel[key];
    return e && e.line ? SB.UI.parts.irl(e.line) : null;
  }

  /* does this extra control come out yet (SB.Rungs.SHOWS): unguided games and games without the rung table get everything */
  var DOOR_SET = {};   // shows whose door was set to you once; taking yourself off it sticks
  function rungShows(s, feature) { try { return SB.Rungs && SB.Rungs.shows ? SB.Rungs.shows(s, feature) : true; } catch (e) { return true; } }
  function confirmCard(text, yes, no, onYes, extra) {
    var close = SB.UI.card(h('div', { class: 'sb-confirm cb-confirm' }, [
      h('p', { class: 'cb-typed', text: text }),
      extra || null,
      h('div', { class: 'cb-row' }, [
        D.act(yes, yes, 'cf-yes', function () { close(); onYes(); }),
        D.act(no, no, 'cf-no', function () { close(); })
      ])
    ]), { label: text });
  }

  function asksFor(s, showId) {
    var out = [], k, a;
    for (k in (s.asks || {})) { a = s.asks[k]; if (a.showId === showId) out.push(a); }
    return out;
  }
  function bandAsks(s, showId) {
    var by = {};
    var on = {}, sh = s.shows && s.shows[showId];
    ((sh && sh.bill && sh.bill.slots) || []).forEach(function (x) { if (x && x.bandId) on[x.bandId] = true; });
    /* a taken-back ask, or a yes whose band was peeled off the bill, is not an open ask: the band can be asked again */
    asksFor(s, showId).forEach(function (a) {
      if (a.kind !== 'BAND_PLAY' || a.status === 'WITHDRAWN' || (a.status === 'YES' && !on[a.toId])) return;
      by[a.toId] = a;
    });
    return by;
  }
  function roomName(s, id) { return id && s.rooms && s.rooms[id] ? s.rooms[id].name : ''; }

  /* a tear-off date page: the day in jagged marker, black band on top */
  function datePage(day, w) {
    var t = SB.time.date(day), ht = w * 1.1, out = '';
    out += K().paper(4, 4, w - 10, ht - 8, { seed: 'dp' + day, stock: 'white', torn: 't', sx: 3, sy: 4, burn: 0.5,
      inner: '<path d="M0 0H' + f(w) + 'V' + f(w * 0.3) + 'H0Z" fill="' + D.TONER + '"/>' +
        D.type(SB.time.fmt(day, 'dow3').toUpperCase(), w / 2 - 1, w * 0.23, w * 0.15, { anchor: 'middle', bold: true, fill: D.PAPER }) +
        D.marker(String(t.d), w / 2 - 1, w * 0.84, w * 0.42, { anchor: 'middle', seed: 'dpd' + day }) +
        D.type(SB.time.fmt(day, 'month').slice(0, 3).toUpperCase(), w / 2 - 1, ht - 14, w * 0.12, { anchor: 'middle', bold: true }) });
    return out;
  }
  function f(n) { return D.f(n); }
  /* a key on a manila tag: the key a xeroxed cut-out, the tag with the room's glyph and its name on a label strip */
  function keyTag(room, w, o) {
    o = o || {};
    var out = '', gl = '', id = room ? room.id : 'x', kx = w * 0.17;
    out += K().cutout([[kx - 11, 6], [kx + 11, 6], [kx + 13, 26], [kx + 4, 30], [kx + 4, 40], [kx + 11, 42], [kx + 11, 48], [kx + 4, 50], [kx + 4, 56], [kx + 9, 58], [kx + 4, 64], [kx - 4, 64], [kx - 4, 30], [kx - 13, 26]],
      '<rect x="' + f(kx - 4) + '" y="13" width="8" height="7" fill="' + D.PAPER + '"/>' + K().dotsRect(kx - 10, 8, 10, 22, 2, { white: true }), { seed: 'k' + id, edge: 3 });
    out += K().line(kx + 2, 14, w * 0.36, 34, { seed: 'kst' + id, sw: 1.4, stroke: D.PAPER, over: 0 });
    out += K().paper(w * 0.3, 8, w * 0.68, 56, { seed: 'kg' + id, stock: o.stock || 'manila', sx: 3, sy: 4, burn: 0.5,
      inner: '<circle cx="' + f(w * 0.36) + '" cy="34" r="3.5" fill="#141413"/>' });
    if (room) {
      try { gl = SB.Identity.roomGlyph(room.kind, 22); } catch (e) { gl = ''; }
      if (gl) out += '<g style="color:#141413">' + D.place(gl, w * 0.41, 12) + '</g>';
      out += D.type(word('room.' + room.kind + '.name', lower(room.kind)).toUpperCase(), w * 0.41 + 27, 28, 12, { bold: true, maxWidth: w * 0.5 });
      /* the name strip slides left over the tag when it is long, so it is never cut off at the picture's edge */
      var nm = String(room.name || '').toUpperCase().slice(0, 18);
      out += D.strip(nm, Math.max(w * 0.2, Math.min(w * 0.38, w - 4 - D.stripW(nm, 12))), 38, 12);
    } else out += D.marker('?', w * 0.62, 52, 28, { seed: 'kq' });
    return out;
  }

  /* ================================================================ */
  /* the clipboard in your hands (the close-up's frame, dressed)      */
  /* ================================================================ */
  /* The close-up (js/desk/closeup.js) holds shows, show and bill in its 'clipboard' frame; its flat board is hidden by
   * css/r-clip.css and the screens dress the frame here. One show: a masonite board with a band sticker or two, older
   * sheets under the top sheet, the top sheet itself (flat copy paper the screen is typed on, its corner curled) and a
   * xeroxed steel clip over it. The list: a patch of the black table the clipboards lie on.
   * SHEET must match the .cu-in insets for .cb-held--show in css/r-clip.css. */
  var SHEET = { t: 80, r: 60, b: 54, l: 48 }, TOPSTOCK = '#ECD668', TOPBACK = '#c4ae4a';
  function holder(root) {
    var el = root;
    while (el && el.classList) { if (el.classList.contains('cu-obj')) return el.classList.contains('cu--clipboard') ? el : null; el = el.parentNode; }
    return null;
  }
  function boardBands(s) {
    var ids = s && s.bands ? Object.keys(s.bands).sort() : [], r = K().rng('boardbands'), out = [], i, b;
    for (i = 0; i < 6 && out.length < 2 && ids.length; i++) {
      b = s.bands[ids.splice(r.int(0, ids.length - 1), 1)[0]];
      if (b && b.name) out.push({ id: b.id, name: b.name, genre: b.genre });
    }
    return out;
  }
  /* the board behind one show: masonite, stickers on its margin, the older sheets under the top sheet (photocopied) */
  function heldBoard(w, ht, bands) {
    var P = SHEET, X = P.l, Y = P.t, W = w - P.l - P.r, H = ht - P.t - P.b, out = '';
    out += D.masonite(6, 24, w - 14, ht - 30, 'held', { s: 1.6 });
    /* a band sticker or two stuck on the board's top margin, a torn one's leavings down the side */
    if (bands[0]) out += '<g transform="translate(26 18) rotate(-6 85 36)">' + D.bandSticker(bands[0], 172) + '</g>';
    if (bands[1] && w > 760) out += '<g transform="translate(' + f(w / 2 + 166) + ' 22) rotate(5 75 32)">' + D.bandSticker(bands[1], 150) + '</g>';
    out += K().paper(12, ht * 0.5, 18, 22, { seed: 'resid', stock: 'white', torn: 'rb', rot: -8, shadow: false, burn: 0.2 }) + K().paper(16, ht * 0.5 + 34, 13, 10, { seed: 'resid2', stock: 'white', torn: 'tr', shadow: false, burn: 0.2 });
    out += K().sticker({ circle: [30, ht - 34, 21] }, K().skull(30, ht - 35, 26, { seed: 'bst' }), { seed: 'bstk', edge: 3, fill: '#F0B2C0' });
    /* the older sheets: blue and pink peeking out at the sides and foot, typed to the edge; a white one right under */
    out += K().paper(X - 11, Y + 16, W, H - 6, { seed: 'u-blue', stock: '#B4CDE4', rot: -0.8, sx: 3, sy: 4, sop: 0.55, burn: 0.55, cut: 1.2, inner: typedLines(X - 11, Y + 16, W, H - 6, 'ub', 1.4) });
    out += K().paper(X + 13, Y + 8, W, H, { seed: 'u-pink', stock: '#F0B2C0', rot: 0.9, sx: 3, sy: 4, sop: 0.55, burn: 0.55, cut: 1.2, inner: typedLines(X + 13, Y + 8, W, H, 'up', 1.4) });
    out += K().paper(X + 5, Y + 4, W, H, { seed: 'u-white', stock: 'white', rot: 0.3, sx: 2, sy: 3, sop: 0.5, burn: 0.4, cut: 1, inner: typedLines(X + 5, Y + 4, W, H, 'uw', 1.4) });
    return out;
  }
  function typedLines(x, y, w, ht, seed, s) { return D.typedLines(x, y, w, ht, seed, s); }
  /* the list: a patch of the black table under the lamp, registration marks at its corners */
  function heldTable(w, ht) {
    var inner = K().regmark(26, 26, 9, { stroke: '#3a3a37' }) + K().regmark(w - 26, 26, 9, { stroke: '#3a3a37' }) + K().regmark(26, ht - 26, 9, { stroke: '#3a3a37' }) + K().regmark(w - 26, ht - 26, 9, { stroke: '#3a3a37' });
    return K().paper(4, 4, w - 8, ht - 8, { seed: 'cbtable', stock: '#101010', inner: inner, burn: 0, cut: 1.2, sop: 0.8 });
  }
  /** dress(root, mode, s): put the clipboard round the screen ('show') or lay the table under the list ('list').
   *  Returns the undress function (stops watching the size). */
  function dress(root, mode, s) {
    var obj = safe(function () { return holder(root); }, null), inner, layers = {}, last = '', ro = null, bands;
    var wide = mode === 'card';
    if (wide) mode = 'show';
    if (!obj || typeof document === 'undefined' || !obj.querySelector) return function () {};
    inner = obj.querySelector('.cu-in');
    if (wide) obj.classList.add('cb-held--card');
    obj.classList.add('cb-held');
    obj.classList.add('cb-held--' + mode);
    bands = mode === 'show' ? boardBands(s) : [];
    ['board', 'sheet', 'clip'].forEach(function (k) {
      if (mode !== 'show' && k !== 'board') return;
      layers[k] = h('div', { class: 'cb-hold cb-hold--' + k, aria: { hidden: 'true' } });
      if (k === 'clip' || !inner) obj.appendChild(layers[k]); else obj.insertBefore(layers[k], inner);
    });
    function draw() {
      var k = D.pxPerP(), w = Math.round((obj.offsetWidth || 0) / k), ht = Math.round((obj.offsetHeight || 0) / k), cw;
      if (!w || !ht || last === w + 'x' + ht + '@' + D.res()) return;
      last = w + 'x' + ht + '@' + D.res();
      ['board', 'sheet'].forEach(function (n) { if (layers[n]) { layers[n].style.width = D.pu(w); layers[n].style.height = D.pu(ht); } });
      SB.UI.clear(layers.board);
      if (mode !== 'show') { layers.board.appendChild(D.art(heldTable(w, ht), w, ht)); return; }
      layers.board.appendChild(D.art(heldBoard(w, ht, bands), w, ht));
      layers.sheet.innerHTML = D.svg(topSheet(SHEET.l, SHEET.t, w - SHEET.l - SHEET.r, ht - SHEET.t - SHEET.b, 'held', { stock: TOPSTOCK, back: TOPBACK, curl: 30, burn: 0.35, sx: 4, sy: 6 }), w, ht);
      cw = Math.min(300, Math.max(200, w * 0.32));
      SB.UI.clear(layers.clip);
      layers.clip.style.left = D.pu(w / 2 - cw / 2 - 4);
      layers.clip.style.top = D.pu(SHEET.t + 12 - cw * 0.34);
      layers.clip.appendChild(D.art(D.steelClip(4, 2, cw, 'held'), cw + 14, cw * 0.34 + 14));
    }
    function topSheet(x, y, w, ht, seed, o) { return D.topSheet(x, y, w, ht, seed, o); }
    safe(draw);
    if (typeof ResizeObserver === 'function') { ro = new ResizeObserver(function () { safe(draw); }); safe(function () { ro.observe(obj); }); }
    return function () { if (ro) safe(function () { ro.disconnect(); }); };
  }

  /* ================================================================ */
  /* shows: the clipboards                                            */
  /* ================================================================ */

  function mountShows(root) {
    var showPast = false, ownDay = null, lastSig = null, firstDraw = true;
    if (root && root.removeAttribute) root.removeAttribute('data-mv-sig');
    function render() { keepFocus(root, function () { draw(); settle(); }); }   /* a press that redraws keeps the keyboard on its control (fix list 0.9) */
    /* the clipboards slap down when the table is new or its list really changes; the next show's is stamped on, hardest */
    function settle() {
      var F = SB.Finish, s = st(), sig, hero = root.querySelector('.cb-clipwrap.is-next');
      if (!F || !s) return;
      sig = (s.shows ? Object.keys(s.shows).length : 0) + ':' + (hero ? hero.getAttribute('data-show') : '') + ':' + showPast;
      slap(root, '.cb-clips > .cb-clipwrap:not(.is-next), .cb-shelf .cb-clipwrap, .cb-pastrow > *', sig, 2);
      if (hero && sig !== lastSig) F.move(hero, 'stamp', { delay: firstDraw ? 220 : 0, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: hero } });
      lastSig = sig; firstDraw = false;
    }
    function draw() {
      var s = st(), live, past, tomorrow, kids = [];
      SB.UI.clear(root);
      if (!s) { root.appendChild(C().Empty({})); return; }
      live = safe(function () { return SB.Shows.list(s, { status: ['DRAFT', 'CONFIRMED'] }); }, []);
      past = safe(function () { return SB.Shows.list(s, { status: ['PLAYED', 'CANCELLED'] }); }, []).reverse();
      tomorrow = s.clock.day + 1;
      /* the own-show date opens on the first Friday with two weeks of lead (fix-list 4.3: the scene books Thursday to Saturday) */
      if (ownDay == null || ownDay < tomorrow) ownDay = friOnOrAfter(tomorrow + 13);
      live.forEach(function (x, i) { kids.push(clip(s, x, i)); });
      kids.push(blank(s, tomorrow));
      /* the clipboards fill the table: bigger when there are fewer of them; the shoebox and the last few played
         flyers lie along the foot (every played one with the box open) */
      root.appendChild(h('div', { class: 'cb-shows', style: { '--cb-zoom': kids.length <= 2 ? '1.15' : kids.length === 3 ? '1.05' : '.95', '--cb-zoom-next': kids.length <= 2 ? '1.9' : '1.6' } }, [
        h('h1', { class: 'cb-sr', text: T('shows', 'title') }),
        !live.length ? piece('cb-hintslip', 'white', [h('p', { class: 'cb-typed', text: T('shows', 'none') })]) : null,
        h('div', { class: 'cb-clips' }, kids),
        past.length ? h('div', { class: 'cb-shelf' + (showPast ? ' is-open' : '') }, [shoebox(s, past), h('div', { class: 'cb-pastrow' }, (showPast ? past : past.slice(0, 5)).map(function (x, i) {
          var out = K().paper(4, 4, 92, 74, { seed: 'pf' + x.id, stock: x.status === 'CANCELLED' ? 'newsprint' : 'white', rot: i % 2 ? 3 : -3, sx: 3, sy: 4,
            inner: D.marker(md(x.day), 50, 40, 20, { anchor: 'middle', seed: 'pfd' + x.id }) + (x.status === 'CANCELLED' ? K().xout(14, 14, 72, 56, { seed: 'pfx' + x.id, sw: 3 })
              : D.type((x.result && x.result.vsPar ? String(x.result.vsPar) : '').slice(0, 9).toUpperCase(), 50, 64, 11, { anchor: 'middle', bold: true, maxWidth: 84 })) });
          return D.thing({ cls: 'cb-pastflyer', label: SB.time.fmt(x.day, 'short') + ', ' + (x.roomId && roomName(s, x.roomId) ? roomName(s, x.roomId) + ', ' : '') + (x.result && x.result.verdictLine ? x.result.verdictLine : T('shows', 'status.' + x.status)),
            svg: out, w: 100, h: 84, onClick: function () { SB.UI.go('show', { showId: x.id }); } });
        }))]) : null
      ]));
    }
    function clip(s, x, i) {
      var a = asksFor(s, x.id).filter(function (q) { return q.kind === 'BAND_PLAY'; }), yes = 0, wait = 0, no = 0, counter = 0, out, thumb = null, nj, fc = null, rs, w = 230, ht = 300, k, late;
      a.forEach(function (q) { if (q.status === 'YES') yes++; else if (q.status === 'COUNTER') { counter++; wait++; } else if (q.status === 'QUEUED' || q.status === 'SENT') wait++; else if (q.status === 'NO' || q.status === 'SILENT') no++; });
      out = D.clipboard(w, ht, 'cl' + x.id);
      out += D.marker(SB.time.fmt(x.day, 'dow3').toUpperCase() + ' ' + md(x.day), 22, 66, 24, { seed: 'cld' + x.id, maxWidth: 120 });
      out += D.type(x.roomId ? roomName(s, x.roomId).toUpperCase() : T('shows', 'noRoom').toUpperCase(), 24, 88, 12, { bold: true, maxWidth: 124 });
      /* the asks: a yes stuck flat (solid), a wait taped with a ?, a no torn */
      for (k = 0; k < Math.min(6, yes); k++) out += '<path d="M' + (24 + k * 20) + ' 196h16v12h-16z" fill="#141413"/>';
      for (k = 0; k < Math.min(6, wait); k++) out += '<path d="M' + (24 + (yes + k) * 20) + ' 196h16v12h-16z" fill="#f4f2ea" stroke="#141413" stroke-width="1.6"/>' + D.type('?', 32 + (yes + k) * 20, 206, 10, { anchor: 'middle', bold: true }) + K().tape(32 + (yes + k) * 20, 195, 14, 5, { seed: 'wt' + k, rot: -20 });
      for (k = 0; k < Math.min(4, no); k++) out += '<path d="M' + (24 + (yes + wait + k) * 20) + ' 196h12l-4 6 6 6h-14z" fill="#9a9890"/>';
      out += D.stamp(T('shows', 'status.' + x.status), 26, 238, 13, { rot: -6, on: true });
      if (x.deal && x.deal.guarantee > 0) { fc = safe(function () { return SB.Forecast.card(s, x.id); }, null); if (fc && fc.guaranteePace) out += D.type(T('shows', 'pace.' + fc.guaranteePace), 26, 226, 11, { bold: true, fill: fc.guaranteePace === 'OK' ? '#141413' : D.hot() }); }
      rs = safe(function () { return SB.Forecast.reachStrip(s, x.id); }, null);
      if (rs && rs.gens) rs.gens.forEach(function (g, gi) {
        var hi = g && g.heard ? Math.max(0, Math.min(1, g.heard.hi || 0)) : 0, lo = g && g.heard ? Math.max(0, Math.min(1, g.heard.lo || 0)) : 0;
        out += '<path d="M24 ' + (110 + gi * 12) + 'h70v7h-70z" fill="none" stroke="#141413" stroke-width="1.2"/><path d="M24 ' + (110 + gi * 12) + 'h' + f(70 * hi) + 'v7h' + f(-70 * hi) + 'z" fill="url(#dk-ht2)"/><path d="M24 ' + (110 + gi * 12) + 'h' + f(70 * lo) + 'v7h' + f(-70 * lo) + 'z" fill="#141413"/>';
      });
      nj = nextJob(s, x);
      late = nj && nj.late;
      if (nj) {
        out += '<path d="M24 ' + 164 + 'H' + f(24 + 180 * nj.frac) + '" stroke="' + K().ink('fluorYellow') + '" stroke-width="13" stroke-opacity=".8"/>';
        out += D.type(String(nj.label).slice(0, 26), 26, 169, 12, { bold: true, maxWidth: 178 });
        if (late) out += D.bang(198, 178, 22);
      }
      if (counter) out += D.swipe(190, 202, 36, 16) + D.marker('$?', 196, 210, 18, { seed: 'ctr' + x.id });
      if (SB.UI.parts.flyerThumb) thumb = safe(function () { return D.thumb({ recipe: (x.flyer && x.flyer.recipe) || null, spec: SB.Jobs.flyerSpec(s, x.id) }, 70); }, null);
      var label = T('shows', 'open', { d: SB.time.fmt(x.day, 'short') }) + ', ' + (x.roomId ? roomName(s, x.roomId) : T('shows', 'noRoom')) + ', ' + T('shows', 'status.' + x.status).toLowerCase() +
        (a.length ? ', ' + T('shows', 'asks', { yes: yes, wait: wait, no: no }) : '') + (nj ? ', ' + nj.label : '') + (fc && fc.guaranteePace ? ', ' + T('shows', 'pace.' + fc.guaranteePace).toLowerCase() : '');
      return h('div', { class: 'cb-clipwrap' + (i === 0 ? ' is-next' : ''), data: { show: x.id }, style: i === 0 ? null : { transform: 'rotate(' + ((i % 3) - 1) * 1.4 + 'deg)' } }, [
        D.thing({ cls: 'cb-clip', label: label, svg: out, w: w, h: ht, fk: 'clip-' + x.id,
          onClick: function () { SB.UI.go('show', { showId: x.id }); } }),
        thumb ? h('div', { class: 'cb-clip-flyer', aria: { hidden: 'true' } }, thumb) : null
      ]);
    }
    function friOnOrAfter(d) { return d + ((4 - SB.time.dow(d)) + 7) % 7; }   // dow 0 is Monday, 4 Friday
    /* this Fri / this Sat / next Fri / next Sat: one press each (fix-list 4.3) */
    function quickDays(tomorrow) {
      var f = friOnOrAfter(tomorrow), sat = SB.time.dow(tomorrow) === 5 ? tomorrow : f + 1;   // tomorrow a Saturday: this Sat is tomorrow
      return [{ k: 'thisFri', day: f }, { k: 'thisSat', day: sat }, { k: 'nextFri', day: f + 7 }, { k: 'nextSat', day: sat + 7 }];
    }
    function blank(s, tomorrow) {
      var w = 230, ht = 380, out = D.clipboard(w, ht, 'blank', { paper: 'bone' });   // taller since 4.3 put the weekend-night tabs on it
      out += D.marker(T('shows', 'blank'), w / 2, 70, 22, { anchor: 'middle', seed: 'blank' });
      out += '<g transform="translate(68 88)">' + datePage(ownDay, 96) + '</g>';
      function move(d) { ownDay = Math.max(tomorrow, Math.min(tomorrow + 83, ownDay + d)); render(); }
      return h('div', { class: 'cb-clipwrap cb-blank' }, [
        D.art(out, w, ht),
        h('div', { class: 'cb-blank-ctl' }, [
          D.tabs({ label: SB.time.fmt(ownDay, 'short'), items: [
            { text: '<', label: T('shows', 'earlier'), fk: 'own-prev', onClick: function () { move(-1); } },
            { text: '>', label: T('shows', 'later'), fk: 'own-next', onClick: function () { move(1); } }] }),
          D.tabs({ label: T('shows', 'quick'), items: quickDays(tomorrow).map(function (q) {
            return { text: T('shows', 'q.' + q.k), label: T('shows', 'q.' + q.k) + ': ' + SB.time.fmt(q.day, 'short'), fk: 'own-' + q.k, on: ownDay === q.day,
                     onClick: function () { ownDay = q.day; render(); } };
          }) }),
          D.act(T('shows', 'create'), T('shows', 'newOwn') + ': ' + SB.time.fmt(ownDay, 'short'), 'own-go', function () {
            var day = ownDay, dup = null, k, o, r;
            for (k in (st().shows || {})) { o = st().shows[k]; if (!o.requestId && !o.roomId && o.day === day && (o.status === 'DRAFT' || o.status === 'CONFIRMED')) { dup = o; break; } }
            if (dup) { SB.UI.go('show', { showId: dup.id }); return; }
            r = act(function (x) { return SB.Shows.create(x, { own: true, day: day, tags: [], benefitFor: null }); });
            if (r && r.ok !== false && r.showId) SB.UI.go('show', { showId: r.showId });
          }, { size: 14 })
        ])
      ]);
    }
    function shoebox(s, past) {
      var w = 230, ht = 180, out = '';
      /* a kraft shoebox, its lid lifted when it is open, a typed label taped on its end (words on plain paper) */
      out += K().cutout([[10, 60], [w - 10, 60], [w - 14, ht - 8], [14, ht - 8]], K().dotsRect(14, ht - 30, w - 28, 22, 2, { op: 0.5 }) +
        '<path d="M14 66H' + (w - 14) + '" stroke="#5c4127" stroke-width="3"/>', { seed: 'sbx', edge: 5, fill: '#a77d4b' });
      out += K().paper(4, showPast ? 30 : 44, w - 8, 30, { seed: 'sbl', stock: '#8d6a3e', rot: showPast ? -8 : 0, inner: K().dotsRect(0, 0, w, 80, 1, { op: 0.4 }) });
      out += K().paper(w / 2 - 72, 84, 144, 76, { seed: 'sblab', stock: 'white', rot: -2, sx: 3, sy: 4, burn: 0.4 });
      out += K().tape(w / 2 - 70, 88, 34, 12, { seed: 'sbt1', rot: -30 }) + K().tape(w / 2 + 70, 154, 34, 12, { seed: 'sbt2', rot: -30 });
      out += D.marker(T('shows', 'pastBox'), w / 2, 120, 26, { anchor: 'middle', seed: 'pb', maxWidth: 128 });
      out += D.marker(String(past.length), w / 2, 152, 22, { anchor: 'middle', seed: 'pbn' });
      return h('div', { class: 'cb-clipwrap cb-box' }, D.thing({ cls: 'cb-shoebox', label: showPast ? T('shows', 'hidePast') : T('shows', 'past') + ' (' + past.length + ')', pressed: showPast, fk: 'box', svg: out, w: w, h: ht,
        onClick: function () { showPast = !showPast; render(); } }));
    }
    var undress = dress(root, 'list', st());
    render();
    return { update: function () { keepFocus(root, render); }, unmount: function () { undress(); } };
  }

  function nextJob(s, x) {
    var jobs = safe(function () { return SB.Jobs.forShow(s, x.id); }, []), next = null, w, span;
    jobs.forEach(function (j) {
      if (j.status !== 'TODO' || j.optional || !j.window || !num(j.window.lateFrom)) return;
      if (!next || j.window.lateFrom < next.window.lateFrom) next = j;
    });
    if (!next) return null;
    w = next.window; span = Math.max(1, w.lateFrom - (num(w.opens) ? w.opens : s.clock.day));
    return { label: next.label, frac: Math.max(0.05, Math.min(1, 1 - (w.lateFrom - s.clock.day) / span)), late: s.clock.day >= w.lateFrom };
  }

  /* CALL IT A NIGHT while the card is up (the pinned clock's, js/ui/nightclock.js: SB.UI.lamp.pull: Week.endNight, then the desk plays the
   * night out, with its stage cards, decisions and show nights). The card only asks to be picked up again at the next
   * evening: when the play-out stops at an evening one day on and nothing else took the screen. */
  var backTo = null, backHooked = false, backWatch = null;
  function backDrop() { backTo = null; if (backWatch) { clearInterval(backWatch); backWatch = null; } }
  function backTook() {
    var d = typeof document !== 'undefined' ? document : null;
    if (!backTo) return true;
    if (safe(function () { return SB.UI.route(); }, null) !== 'desk') return true;                    // the night screen, the week's close, the phone
    if (SB.Cutscene && SB.Cutscene.playing && safe(function () { return SB.Cutscene.playing(); }, false)) return true;
    return !!(d && d.querySelector && d.querySelector('#overlay .sb-scrim:not(.is-leaving) .sb-decision'));                       // a decision is the player's now
  }
  function backCheck() {
    var s = st(), stop, id, x;
    if (!backTo) return;
    if (!s || backTook()) { backDrop(); return; }
    stop = s.clock.stop;
    if (!stop || stop.kind !== 'EVENING') { if (stop && stop.kind === 'END_OF_WEEK') backDrop(); return; }
    id = backTo.showId; x = s.shows && s.shows[id];
    if (s.clock.day !== backTo.day + 1 || !x || !LIVE[x.status]) { backDrop(); return; }
    backDrop();
    SB.UI.go('show', { showId: id });
  }
  function comeBack(showId, day) {
    backDrop();
    backTo = { showId: showId, day: day };
    if (!backHooked && typeof document !== 'undefined') {
      backHooked = true;
      SB.UI.on(document, 'sb-play', function (e) {
        var d = e && e.detail;
        if (!backTo || !d || d.cmd !== 'pause') return;
        if (d.by === 'player') { backDrop(); return; }
        setTimeout(backCheck, 0);
      });
    }
    if (typeof setInterval === 'function') backWatch = setInterval(function () { if (backTo && backTook()) backDrop(); }, 400);
  }

  function lockSvg() { return K().rect(4, 12, 18, 14, { seed: 'lk', fill: '#141413', sw: 2.2 }) + K().path([[8, 12], [8, 6], [13, 2], [18, 6], [18, 12]], { seed: 'lks', sw: 2.4 }); }
  function guard(locked, fn) { if (locked) confirmCard(T('bill', 'lockedWarn'), T('bill', 'yesGo'), T('bill', 'noGo'), fn); else fn(); }

  /* the header of a clipboard: the date in jagged marker, the room typed under it, the status stamped */
  function showHead(s, show, room, backLabel, backFn, title, big) {
    var tt = (title || SB.time.fmt(show.day, 'long')).toUpperCase(), stt = T('shows', 'status.' + show.status), sx = Math.min(412, D.mw(tt, 34) + 26), w = Math.ceil(sx + D.stampW(stt, 16) + 20), out = '', sw = 0;
    out += D.marker(tt, 4, 40, 34, { maxWidth: 400, seed: 'hd' + show.id });
    if (room) out += D.type(String(room.name).toUpperCase(), 6, 65, 14, { bold: true, maxWidth: 400 });
    /* the one loud thing on a show: its status, stamped big across the date line, a long way off level */
    var ss = typeof big === 'number' ? big : 32;                    // the card stamps it a size smaller, so it stays on its own column
    if (big) { w = Math.ceil(sx) + 10; sw = Math.ceil(D.stampW(stt, ss)) + 34; }
    else out += D.stamp(stt, sx, 10, 16, { rot: -7 });
    return h('header', { class: 'cb-showhead' + (big ? ' cb-showhead--big' : '') }, [
      D.act('<', backLabel, 'back', backFn, { size: 14 }),
      h('h1', { class: 'cb-showtitle', aria: { label: SB.time.fmt(show.day, 'long') + (room ? ', ' + room.name : '') + ', ' + T('shows', 'status.' + show.status).toLowerCase() } },
        [D.art(out, w, 76), big ? D.art(D.stamp(stt, 16, typeof big === 'number' ? 8 : 18, ss, { rot: typeof big === 'number' ? -3 : -8 }), sw, typeof big === 'number' ? ss * 2.7 : ss * 3, 'cb-statstamp mv-stamp') : null])
    ]);
  }

  /* ================================================================ */
  /* show: one clipboard                                              */
  /* ================================================================ */
  function mountShow(root, params) {
    var showId = params && params.showId, ui = { roomId: null, day: params && num(params.day) ? params.day : null, editPrice: false, deal: null, effort: null, noTime: null }, lastStat = null, firstDraw = true,
        sel = params && params.row ? String(params.row) : null,       // the row whose picker shows on the right
        auto = !sel,                                                   // nobody picked a row: the card picks the one NEXT is about
        look = false,                                                  // HOW IT LOOKS: the forecast, on the right, in place of the picker
        selDay = null, tutJob = null, tonightV = null, curStep = null, canMsg = null,
        fl = { freeOnly: true, genre: '', all: false }, confirmedLock = false, whatCache = {}, lastSel = null, lastGenre = '', mode = 'show', keyHandler;
    if (root && root.removeAttribute) root.removeAttribute('data-mv-sig');
    function pick(k) { if (k) { sel = k; auto = false; } else auto = true; look = false; keepFocus(root, render); }

    function render() { keepFocus(root, function () { draw(); settle(); }); }   /* a press that redraws keeps the keyboard on its control (fix list 0.9) */
    /* the papers slap down when the page first shows; the status is stamped on whenever it changes (and sounds like it) */
    function settle() {
      var F = SB.Finish, el = root.querySelector('.cb-statstamp'), s = st(), sh = s && s.shows ? s.shows[showId] : null;
      var pk = root.querySelector('.cb-pick'), sheetEl = root.querySelector('.cb-sheet');
      slap(root, '.cb-show .cb-piece, .rc-sheet .rc-piece:not(.rc-polaroid):not(.rc-tape)', 'show:' + showId, 2);
      /* the picker's papers slap down when another row is picked; a different pile tears across the sheet */
      if (F && pk && !firstDraw && lastSel !== sel) { F.stagger(Array.prototype.slice.call(pk.querySelectorAll('.cb-piece')), 2); Array.prototype.forEach.call(pk.querySelectorAll('.cb-piece'), function (e) { e.classList.add('mv-slap'); }); }
      if (F && pk && F.scrollbar) F.scrollbar(pk);
      if (F && sheetEl && !firstDraw && lastSel === sel && lastGenre !== fl.genre) F.move(sheetEl, 'wipe');
      lastSel = sel; lastGenre = fl.genre;
      /* a played show: the night's photo is stamped on, and the ledger's figures count up */
      var ph = root.querySelector('.rc-polaroid');
      if (F && ph && firstDraw) {
        F.move(ph, 'stamp', { delay: 260, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: ph } });
        Array.prototype.forEach.call(root.querySelectorAll('.rc-lg-d'), function (d) {
          var t = d.textContent, m = /^([+\u2212-]?)(\d+)$/.exec(t), sg;
          if (!m) return;
          sg = m[1];
          F.countUp(d, parseInt(m[2], 10), { from: 0, delay: 420, fmt: function (n) { return sg + n; } });
        });
      }
      if (F && el && sh && lastStat !== sh.status) { F.move(el, 'stamp', { delay: firstDraw ? 220 : 0, cue: 'stamp', cueAt: 83, cueOpts: { gain: -5, el: el } }); }
      if (sh) lastStat = sh.status;
      firstDraw = false;
    }
    function tutCur(s) {
      var tc = safe(function () { return SB.Tutorial && SB.Tutorial.current ? SB.Tutorial.current(s) : null; }, null);
      return tc && tc.showId === showId ? tc : null;
    }
    function gone() {
      return h('div', { class: 'cb-gone' }, [C().Empty({ text: T('shows', 'gone') }),
        D.act(T('show', 'back'), T('show', 'back'), 'gone-back', function () { SB.UI.go('shows'); }, { size: 14 })]);
    }
    function draw() {
      var s = st(), v, show, rows, steps, nx, n, tc, tgt, pk, r, i, ink;
      SB.UI.clear(root);
      if (!s || !showId || !s.shows || !s.shows[showId]) { root.appendChild(gone()); return; }
      v = safe(function () { return SB.Shows.view(s, showId); }, null);
      if (!v) { root.appendChild(gone()); return; }
      show = v.show;
      if (!LIVE[show.status]) { root.appendChild(after(s, v)); return; }
      whatCache = {};
      /* a new evening: the card opens on what is next again, and last night's "no time" is gone */
      if (selDay !== s.clock.day) { if (selDay !== null) { auto = true; look = false; } ui.noTime = null; selDay = s.clock.day; }
      tonightV = safe(function () { return SB.Week.tonight(s); }, null);
      canMsg = fitsNow(s, mailH());
      tc = tutCur(s);
      tutJob = tc && tc.step === 'PROMO' ? tc.jobId : null;
      /* the guided first show: the card stands on the row the guide is talking about */
      tgt = tc ? tutRow(s, v, tc) : null;
      if (auto && tgt) sel = tgt;
      rows = rowsOf(s, v);
      if (sel === 'bill') sel = (rows.filter(function (x) { return x.kind === 'slot'; })[0] || rows.filter(function (x) { return x.band; })[0] || { key: null }).key;
      if (sel && !rows.some(function (x) { return x.key === sel; })) sel = fallbackSel(rows, sel);
      steps = stepsOf(s, v, rows, tc, auto ? null : sel);
      nx = nextOf(s, v, rows, steps, tc);
      /* nothing picked: the row NEXT is about, else the first open row of the first step that is not done */
      if (auto || !sel) {
        r = nx.row && rows.some(function (x) { return x.key === nx.row; }) ? nx.row : null;
        if (!r) for (i = 0; i < steps.length && !r; i++) if (steps[i].state !== 'DONE' && steps[i].state !== 'LOCKED') r = (firstOpen(steps[i]) || {}).key;
        sel = r || (rows[0] && rows[0].key) || null;
      }
      r = rows.filter(function (x) { return x.key === sel; })[0];
      curStep = r ? stepOfRow(r) : null;
      n = queuedN(s);
      pk = picker(s, v, rows);                                    // first: the hold form and the offer slip set what NEXT's button sends
      nx = nextOf(s, v, rows, steps, tc);                         // again: its button depends on which row is open and what the picker holds
      ink = hotInk(s);                                           // the city's hot ink: late work, the stay-up hour, what will not fit
      root.appendChild(h('div', { class: 'cb-show cb-card', data: { sel: sel || '', step: curStep || '' }, style: ink ? { '--hot': ink, '--ck-hot': ink } : null }, [
        h('div', { class: 'cb-cardleft' }, [
          showHead(s, show, null, T('show', 'back'), function () { SB.UI.go('shows'); }, SB.time.fmt(show.day, 'dow3') + ' ' + md(show.day), 13),   // the room has its own step; the stamp sits beside the date
          nextLine(s, nx),
          h('ol', { class: 'cb-steps', aria: { label: T('card', 'steps') } }, steps.map(function (sp, k) {
            var open = sp.key === curStep, m = sp.rows.length + (sp.key === 'BILL' ? 1.5 : 0), ht = Math.max(24, Math.min(34, Math.floor(196 / Math.max(1, m))));
            return h('li', { class: 'cb-step is-' + sp.state.toLowerCase() + (open ? ' is-open' : '') }, [
              stepThing(sp, k, open),
              whyButton(sp, k),
              /* a step with one row is that row: the step's own line says it, so the row is not drawn again under it
                 (user 2026-11-24: "isnt this the same info twice?") */
              open && !(sp.key !== 'BILL' && sp.rows.length === 1) ? h('ol', { class: 'cb-cardrows', aria: { label: T('card', 'rows') } }, sp.key === 'BILL' ? billRows(v, sp.rows, ht) : sp.rows.map(function (x, j) { return h('li', null, rowThing(x, j, ht)); })) : null
            ]);
          })),
          foot(s, v, n)
        ]),
        h('div', { class: 'cb-pick', role: 'region', aria: { label: T('card', look ? 'forecast' : 'picker'), live: 'polite' } }, pk)
      ]));
    }

    /* ---- tonight's clock on the card (js/ui/clock.js draws it; SB.Week says what fits) ---- */
    function CK() { return SB.Clock || null; }
    function mailH() { return SB.Config.MAIL && num(SB.Config.MAIL.hours) ? SB.Config.MAIL.hours : 0.5; }
    function fitsNow(s, hours) { return safe(function () { return SB.Week.fits(s, hours); }, null) || { ok: true }; }
    function canNow(s, id, o) { return safe(function () { return SB.Week.canDoNow(s, id, o || {}); }, null) || { ok: false, why: '' }; }
    function tag(label, hours) { return CK() ? CK().tag(label, hours) : String(label); }
    function costT(hours) { return CK() ? CK().cost(hours) : ''; }
    function whyT(r) { return (CK() ? CK().why(r) : (r && r.why)) || ''; }
    /* an action that takes time: a refusal for want of hours stays on the card (the foot), not only in a toast */
    /* a hire or a print run that moves the break-even says so (fix list 1.5): the new number and the guess it sits against */
    function evenNow() { var b = safe(function () { return SB.Forecast.breakEven(st(), showId); }, null); return b && !b.hat && num(b.even) ? b : null; }
    function movedAct(f) {
      var a = evenNow(), r = act(f), b;
      if (r && r.ok !== false && a) {
        b = evenNow();
        if (b && b.even !== a.even) SB.UI.toast(T('show', 'evenMoved', { n: b.even, lo: b.lo, hi: b.hi }), 'info');
        /* a job that tells people moves the guess, and the move is said (fix-list 2.7) */
        else if (b && num(b.lo) && num(b.hi) && (b.lo !== a.lo || b.hi !== a.hi)) SB.UI.toast(T('show', 'guessMoved', { lo: b.lo, hi: b.hi, lo0: a.lo, hi0: a.hi }), 'info');
      }
      return r;
    }
    function doAct(f) {
      var r = movedAct(f);
      if (r && r.ok === false && (r.code === 'NO_TIME' || r.code === 'BURNT_OUT' || r.code === 'PHASE')) { ui.noTime = whyT(r); render(); }
      else if (r && r.ok !== false && ui.noTime) { ui.noTime = null; render(); }
      return r;
    }
    /* the top sheet is yellow copy paper: a city whose hot ink is the yellow gets the red here, so it can be read */
    function hotInk(s) { var c = CK() ? CK().hot(s) : null; return c && c === safe(function () { return K().ink('fluorYellow'); }, '') ? safe(function () { return K().ink('fireRed'); }, c) : c; }
    /* while a button that takes time is pointed at, its hours are hatched on the pinned clock's ruler */
    function preview(el, hours) {
      function show(x) { if (SB.NightClock) SB.NightClock.preview(x, el); }
      if (!el || !el.addEventListener || !(hours > 0)) return el;
      el.addEventListener('mouseenter', function () { show(hours); });
      el.addEventListener('focus', function () { show(hours); });
      el.addEventListener('mouseleave', function () { show(0); });
      el.addEventListener('blur', function () { show(0); });
      return el;
    }
    /** costAct(o): a strip that does something and takes time: its words carry what it costs; when it will not fit even
     *  staying up it is crossed out with the reason and does nothing. o = { text, label, fk, hours, fn, refusal, size, tut, tutRef, cls } */
    function costAct(o) {
      var r = o.refusal === undefined ? (o.hours > 0 ? fitsNow(st(), o.hours) : { ok: true }) : (o.refusal || { ok: true }), ok = r.ok !== false, why = ok ? '' : whyT(r), el;
      el = D.thing({ cls: 'cb-act' + (ok ? '' : ' cb-nofit') + (o.cls ? ' ' + o.cls : ''), strip: tag(o.text, o.hours), stripSize: o.size || 14, fk: o.fk, disabled: !ok, tut: o.tut, tutRef: o.tutRef,
        label: (o.label || o.text) + (costT(o.hours) ? ', ' + costT(o.hours).toLowerCase() : '') + (ok ? '' : '. ' + why), onClick: ok ? o.fn : function () {} });
      if (ok) return preview(el, o.hours);
      return h('span', { class: 'cb-nofitwrap' }, [el, why ? h('span', { class: 'cb-typed cb-small cb-whynot', text: why }) : null]);
    }
    function dayWordOf(s, day) { return !num(day) || day >= s.clock.day ? T('card', 'tonightWord') : SB.time.fmt(day, 'dow3').toUpperCase(); }
    function sinceOf(s, a) { return dayWordOf(s, a && num(a.queuedDay) ? a.queuedDay : (a ? a.sentDay : null)); }

    /* the foot: what will not fit before it is due (this show's), the asks going out tonight; calling the show off is a small link.
       Tonight's clock and CALL IT A NIGHT are the pinned clock's (js/ui/nightclock.js). */
    function foot(s, v, n) {
      var ours = {}, cr, today = s.clock.day, ink = hotInk(s);
      (v.jobs || []).forEach(function (j) { ours[j.id] = true; });
      /* only warn about work the player can start: a crunch made of jobs still waiting on the room or the bill is noise */
      function startable(id) { var r = safe(function () { return SB.Week.canDoNow(s, id); }, null); return !!r && (r.ok !== false || r.code === 'NO_TIME'); }
      cr = CK() ? (safe(function () { return SB.Week.crunch(s); }, []) || []).filter(function (c) { return (c.jobs || []).some(function (id) { return ours[id] && startable(id); }); }) : [];
      return h('footer', { class: 'cb-cardfoot cb-nightfoot', data: { tut: 'card-foot', 'tut-ref': showId }, style: ink ? { '--ck-hot': ink } : null }, [
        ui.noTime ? h('p', { class: 'cb-typed cb-small cb-notime', role: 'alert' }, [h('span', { class: 'ck-bang', aria: { hidden: 'true' }, text: '!!' }), ' ' + ui.noTime]) : null,
        cr.length ? h('ul', { class: 'ck-crunch cb-crunch', role: 'note' }, cr.slice(0, 1).map(function (c) {
          return h('li', null, [h('span', { class: 'ck-bang', aria: { hidden: 'true' }, text: '!!' }), CK().crunchLine(c, { today: today })]);
        })) : null,
        h('div', { class: 'cb-footrow' }, [
          h('span', { class: 'cb-asksout cb-typed cb-small', role: 'status', data: { n: String(n) }, text: T('card', n === 1 ? 'out1' : (n ? 'outN' : 'out0'), { n: n }) }),
          h('button', { type: 'button', class: 'cb-link pz-hl', data: { fk: 'cancel' }, aria: { label: T('show', 'cancelL') }, text: T('card', 'callOff'), on: { click: function () {
            confirmCard(T('show', 'cancelSure'), T('show', 'cancelYes'), T('show', 'keep'), function () { act(function (x) { return SB.Shows.cancel(x, showId, 'PLAYER'); }); }, cancelLesson(s, showId));
          } } })
        ])
      ]);
    }

    /* ================= the card: one row per part of the show (left), the picked row's picker (right) ================= */
    var OPEN_ASK = { QUEUED: 1, SENT: 1, COUNTER: 1 };
    function askState(a) {
      if (!a) return null;
      return a.status === 'QUEUED' ? 'TONIGHT' : (a.status === 'SENT' ? 'WAITING' : (a.status === 'COUNTER' ? 'COUNTER' : (a.status === 'YES' ? 'YES' : (a.status === 'NO' || a.status === 'SILENT' ? 'NO' : null))));
    }
    /* the ask that matters among these: the one still open, else the last one answered */
    function askOf(list, test) {
      var open = null, last = null;
      list.forEach(function (a) { if (a.status === 'WITHDRAWN' || !test(a)) return; if (OPEN_ASK[a.status]) open = a; last = a; });
      return open || last;
    }
    /* asks are queued by SB.Mail.ask and go out with the evening's send: how many of this show's are waiting to go */
    function queuedN(s) { return asksFor(s, showId).filter(function (a) { return a.status === 'QUEUED'; }).length; }
    function bandCard(s, id) { return safe(function () { return SB.Bands.card(s, id); }, null); }
    function first(s, id) { return s.people && s.people[id] ? (s.people[id].first || '') : ''; }
    /* the jobs that get the word out, once the flyer is made (making the flyer is the FLYER row's own job) */
    function promoJobs(v) { return (v.jobs || []).filter(function (j) { return j.group === 'TELLING' && j.type !== 'MAKE_FLYER' && j.mode === 'HOURS' && !j.covered && !j.hidden && !j.more && !j.optional && !j.waived; }); }
    /* the rest of the work that takes hours (the advance, the neighbours, the house rules, the thanks, the debrief): not promo, not booking */
    function prepJobs(v) { return (v.jobs || []).filter(function (j) { return j.group !== 'TELLING' && j.type !== 'LOCK_BILL' && j.mode === 'HOURS' && !j.covered && !j.hidden && !j.optional && !j.waived; }); }
    function jobOf(v, type) { return (v.jobs || []).filter(function (j) { return j.type === type && !j.covered && !j.hidden && !j.waived; })[0] || null; }
    function late(s, j) { return mine(j) && j.window && (j.window.state === 'LATE' || (num(j.window.lateFrom) && s.clock.day >= j.window.lateFrom)); }
    function byOther(j) { return j.planned && j.planned.by && j.planned.by !== 'player' ? j.planned.by : null; }
    function mine(j) { return (j.status === 'TODO' || j.status === 'PLANNED') && !byOther(j); }                                      // still the player's to do
    function jobsDone(list) { return list.every(function (j) { return j.status !== 'TODO' && j.status !== 'PLANNED' && j.status !== 'WAITING'; }); }      // done, or missed: nothing left to do about it
    function jobsState(list) {
      var w;
      if (jobsDone(list)) return { state: 'DONE' };
      if (list.some(mine)) return { state: 'TODO' };
      w = list.filter(byOther)[0];
      return { state: 'WAIT', who: w ? (w.planned.byName || '') : '' };                                                              // somebody else has what is left
    }

    /* Every row says how it stands for the step it is in (r.state): DONE, TODO (the player's move), WAIT (somebody
     * else's: r.who, asked on r.since), BAD (a no or a counter, or work that is late), HOLD (the room wants something
     * first), OPT (open, but nothing has to happen there). */
    function rowsOf(s, v) {
      var show = v.show, rows = [], asks = asksFor(s, showId), q = show.requestId && s.requests ? s.requests[show.requestId] : null,
          tourId = q && q.bandId && s.bands && s.bands[q.bandId] ? q.bandId : null, onBill = {}, n = v.bands.length, days = daysTo(s, show.day),
          hold = askOf(asks, function (a) { return a.kind === 'ROOM_HOLD'; }), conf = askOf(asks, function (a) { return a.kind === 'ROOM_CONFIRM'; }),
          terms = askOf(asks, function (a) { return a.kind === 'TERMS'; }), slots = { OPEN: [], MIDDLE: [], CLOSE: [] }, noes = {}, st0, c, d = v.deal || {}, pj, np, ex, paid, sec = v.security,
          offerRow = null, anyBand, rm, owner, unmet, ra, lj, fj, js;
      function add(r) { rows.push(r); return r; }
      function waitState(k) { return k === 'TONIGHT' || k === 'WAITING' ? 'WAIT' : (k === 'NO' || k === 'COUNTER' ? 'BAD' : null); }
      function asked(a) { return a.status === 'QUEUED' ? null : T('card', 'asked', { day: sinceOf(s, a) }); }
      function crew(role, key, need) {
        var cur = show.crew[role], a = askOf(asks, function (x) { return x.kind === 'CREW' && x.payload && x.payload.role === role; }), stc = cur ? 'YES' : (a && a.status !== 'YES' ? askState(a) : 'EMPTY'),
            who = a ? first(s, a.toId) : '', wt = waitState(stc);
        if (stc === 'EMPTY' && !need) stc = 'OPT';
        add({ key: key, label: T('card', key), value: cur ? (cur === 'player' ? T('show', 'you') : first(s, cur)) : (a && a.status !== 'YES' ? who : ''), struck: !cur && stc === 'NO',
              st: stc, stText: wt === 'WAIT' ? asked(a) : null, hot: stc === 'NO' || (need && stc === 'EMPTY'),
              state: cur ? 'DONE' : (wt || (need ? 'TODO' : 'OPT')), who: wt === 'WAIT' ? who : null, ask: a && a.status !== 'YES' ? a : null });
      }
      add({ key: 'night', label: T('card', 'night'), value: SB.time.fmt(show.day, 'short'), note: days > 0 ? T('card', days === 1 ? 'inDay' : 'inDays', { n: days }) : (days === 0 ? T('card', 'tonight') : ''), state: 'DONE' });
      st0 = show.status === 'CONFIRMED' ? 'CONFIRMED' : (conf && conf.status !== 'YES' && (show.hold || show.roomId) ? askState(conf) : (show.hold || show.roomId ? 'HELD' : (hold && hold.status !== 'YES' ? askState(hold) : 'EMPTY')));
      rm = v.room || (hold && hold.status !== 'YES' && s.rooms ? s.rooms[hold.toId] : null);
      owner = rm && rm.ownerId ? first(s, rm.ownerId) : '';
      unmet = (v.needsToConfirm || []).filter(function (x) { return !x.met; });
      ra = st0 === 'HELD' ? null : (conf && conf.status !== 'YES' && (show.hold || show.roomId) ? conf : hold);
      add({ key: 'room', label: T('card', 'room'), value: v.room ? v.room.name : (hold && hold.status !== 'YES' ? roomName(s, hold.toId) : ''), struck: !v.room && st0 === 'NO', st: st0,
            stText: st0 === 'HELD' && show.hold && num(show.hold.rank) && show.hold.rank > 1 ? T('card', 'st.HELDN', { n: show.hold.rank }) : (waitState(st0) === 'WAIT' && ra ? asked(ra) : null),
            hot: st0 === 'NO' || (st0 === 'HELD' && show.hold && show.hold.rank > 1),
            state: st0 === 'CONFIRMED' ? 'DONE' : (st0 === 'EMPTY' ? 'TODO' : (st0 === 'HELD' ? (show.hold && show.hold.rank > 1 ? 'WAIT' : (unmet.length ? 'HOLD' : 'WAIT')) : (waitState(st0) || 'TODO'))),
            who: owner || (rm ? String(rm.name || '').replace(/^the\s+/i, '') : ''), room: rm, unmet: unmet, rank: show.hold && num(show.hold.rank) ? show.hold.rank : null });
      /* the bill, in running order: who is on it, who has been asked, and a blank line for any slot nobody is in */
      v.bands.forEach(function (b, i) {
        var raw = show.bill.slots[i] || {}, k = n >= 3 ? (i === 0 ? 'OPEN' : (i === n - 1 ? 'CLOSE' : 'MIDDLE')) : (n === 2 ? (i === 0 ? 'OPEN' : 'CLOSE') :
                (raw.want === 'OPEN' ? 'OPEN' : (raw.want === 'CLOSE' || raw.role === 'TOURING' ? 'CLOSE' : 'MIDDLE'))),
            ba = b.confirmed ? null : askOf(asks, function (a) { return a.kind === 'BAND_PLAY' && a.toId === b.band.id; });
        onBill[b.band.id] = true;
        slots[k].push({ key: 'band-' + b.band.id, kind: 'band', slot: k, band: b.band, b: b, idx: i, value: b.band.name, st: b.confirmed ? 'YES' : 'WAITING', stText: b.confirmed ? T('card', 'booked') : (ba && OPEN_ASK[ba.status] ? asked(ba) : null), hot: !!b.listed,
                        state: b.confirmed ? 'DONE' : 'WAIT', who: b.confirmed ? null : b.band.name,
                        why: raw.role === 'TOURING' ? (n >= 3 ? T('show', 'whySecondLast') : (n === 2 ? T('show', 'whyTop') : '')) : (n > 1 && i === 0 ? T('show', 'whyOpen') : (n > 2 && i === n - 1 ? T('show', 'whyClose') : '')) });
      });
      asks.forEach(function (a) {
        var k = (a.payload && a.payload.wantSlot) || 'MIDDLE';
        if (a.kind !== 'BAND_PLAY' || onBill[a.toId]) return;
        if (!slots[k]) k = 'MIDDLE';
        if (OPEN_ASK[a.status]) { c = bandCard(s, a.toId); if (c) slots[k].push({ key: 'ask-' + a.toId, kind: 'ask', slot: k, band: c, ask: a, value: c.name, st: askState(a), stText: a.status === 'SENT' ? asked(a) : null, hot: a.status === 'COUNTER',
                                                                                 state: a.status === 'COUNTER' ? 'BAD' : 'WAIT', who: c.name }); }
        else if (a.status === 'NO' || a.status === 'SILENT') noes[k] = a;
      });
      /* a request's touring band: its offer is THE DEAL's first row until they take it; then they sit in their slot */
      if (tourId && !onBill[tourId] && ((terms && OPEN_ASK[terms.status]) || q.status === 'NEW' || q.status === 'REPLIED' || q.status === 'NEGOTIATING')) {
        c = bandCard(s, tourId);
        st0 = terms && terms.status !== 'YES' ? askState(terms) : 'OFFER';
        /* pencilled into the slot they will play from the moment they are offered: second to last on three or more, top of two */
        var tourPlanned = n + ['OPEN', 'MIDDLE', 'CLOSE'].reduce(function (t, k2) { return t + slots[k2].filter(function (x) { return x.kind === 'ask'; }).length; }, 0) + 1;
        if (c) offerRow = add({ key: 'offer', kind: 'offer', slot: tourPlanned >= 3 ? 'MIDDLE' : 'CLOSE', label: T('card', 'offerRow'), band: c, ask: terms, req: q, value: c.name, st: st0, stText: terms && terms.status === 'SENT' ? asked(terms) : null,
                                hot: !!terms && (terms.status === 'COUNTER' || terms.status === 'NO' || terms.status === 'SILENT'), state: st0 === 'OFFER' ? 'TODO' : (waitState(st0) || 'TODO'), who: c.name,
                                why: tourPlanned >= 3 ? T('show', 'whySecondLast') : T('show', 'whyTop') });
      }
      anyBand = n > 0 || slots.OPEN.length + slots.MIDDLE.length + slots.CLOSE.length > 0;
      ['OPEN', 'MIDDLE', 'CLOSE'].forEach(function (k) {
        var no = noes[k], nc = null, held = !!offerRow && offerRow.slot === k;          // the touring band's place, while the offer is out
        slots[k].forEach(function (r) { r.label = T('bill', 'gap.' + k); add(r); });
        if ((slots[k].length || held) && sel !== 'slot-' + k) return;
        if (no && !slots[k].length) nc = bandCard(s, no.toId);
        add({ key: 'slot-' + k, kind: 'slot', slot: k, label: T('bill', 'gap.' + k), value: nc ? nc.name : '', struck: !!nc, st: nc ? 'NO' : (slots[k].length || held || show.bill.locked ? 'OPT' : 'EMPTY'),
              state: nc ? 'BAD' : (slots[k].length || held || show.bill.locked ? 'OPT' : 'TODO'), band: nc || null });
      });
      lj = jobOf(v, 'LOCK_BILL');
      if (lj || show.bill.locked) add({ key: 'lock', kind: 'lock', label: T('card', 'lock'), value: show.bill.locked ? T('card', 'lockV') : '', st: show.bill.locked ? 'DONE' : 'OPT', stText: show.bill.locked ? null : T('card', 'lockNo'), job: lj,
                                        hot: !!lj && !show.bill.locked && late(s, lj), state: show.bill.locked ? 'DONE' : 'OPT' });
      crew('sound', 'sound', true);
      add({ key: 'door', label: T('card', 'door'), value: show.crew.floor ? (show.crew.floor === 'player' ? T('show', 'you') : first(s, show.crew.floor)) : '', st: show.crew.floor ? 'YES' : 'EMPTY', state: show.crew.floor ? 'DONE' : 'TODO' });
      if (sec && (sec.required || sec.recommended || show.crew.security || asks.some(function (a) { return a.kind === 'CREW' && a.payload && a.payload.role === 'security' && OPEN_ASK[a.status]; }))) crew('security', 'security', !!sec.required);
      st0 = show.promo && show.promo.flyer ? 'MADE' : (show.flyer && show.flyer.recipe ? 'PASTED' : 'EMPTY');
      fj = jobOf(v, 'MAKE_FLYER');
      add({ key: 'flyer', label: T('card', 'flyer'), value: st0 === 'EMPTY' ? '' : T('card', 'flyerV.' + st0), st: st0 === 'EMPTY' ? 'EMPTY' : (st0 === 'MADE' ? 'YES' : null), job: fj, pasted: st0 !== 'EMPTY',
            hot: st0 !== 'MADE' && !!fj && late(s, fj), state: st0 === 'MADE' ? 'DONE' : 'TODO' });
      pj = promoJobs(v); np = pj.filter(function (j) { return j.status === 'DONE'; }).length; js = jobsState(pj);
      add({ key: 'promo', label: T('card', 'promo'), value: pj.length ? T('card', 'promoV', { n: np, of: pj.length }) : '', st: pj.length && js.state === 'DONE' ? 'DONE' : null, jobs: pj,
            hot: pj.some(function (j) { return late(s, j); }), state: js.state, who: js.who || null });
      pj = prepJobs(v); np = pj.filter(function (j) { return j.status === 'DONE'; }).length; js = jobsState(pj);
      add({ key: 'prep', label: T('card', 'prep'), value: pj.length ? T('card', 'promoV', { n: np, of: pj.length }) : '', st: pj.length && js.state === 'DONE' ? 'DONE' : null, jobs: pj,
            hot: pj.some(function (j) { return late(s, j); }), state: js.state, who: js.who || null });
      add({ key: 'price', label: T('card', 'price'), value: (show.door.donation ? T('show', 'donation') : '$' + (show.door.price || 0)) + ' · ' + word('ages.' + show.door.ages, show.door.ages), state: 'DONE' });
      paid = show.bill.slots.some(function (x) { return (x.fee || 0) > 0; });
      if (tourId || paid || (d.guarantee || 0) > 0) {
        ex = safe(function () { return SB.Money.exposure(s, showId); }, null);
        add({ key: 'deal', label: T('card', 'deal'), value: tourId || (d.guarantee || 0) > 0 ? word('deal.' + (d.shape || 'DOOR') + '.name', lower(d.shape || 'DOOR')) + ((d.guarantee || 0) > 0 ? ' ' + money(d.guarantee) : '') : T('card', 'owe', { amount: money(ex && num(ex.total) ? ex.total : 0) }),
              st: d.agreedDay != null ? 'YES' : null, state: 'DONE' });
      }
      return rows;
    }

    /* ---- the seven steps (design/spec/11-booking-pipeline.md) ---- */
    var STEPS = ['DATE', 'ROOM', 'DEAL', 'BILL', 'CREW', 'ANNOUNCE', 'NIGHT'], DEAL_ORDER = { offer: 0, deal: 1, price: 2 }, SLOT_FIRST = { CLOSE: 0, OPEN: 1, MIDDLE: 2 },
        RANK = { STAY: 3, NO_TIME: 2, BURNT_OUT: 2 };            // why NEXT says call it a night: staying up is the player's call, never NEXT's
    function stepOfRow(r) {
      var k = r.kind || r.key;
      if (k === 'night') return 'DATE';
      if (k === 'room') return 'ROOM';
      if (k === 'offer' || k === 'deal' || k === 'price') return 'DEAL';
      if (k === 'slot' || k === 'band' || k === 'ask' || k === 'lock') return 'BILL';
      if (k === 'sound' || k === 'door' || k === 'security') return 'CREW';
      if (k === 'flyer' || k === 'promo') return 'ANNOUNCE';
      return 'NIGHT';
    }
    function firstOpen(sp) {
      var order = ['BAD', 'TODO', 'WAIT', 'HOLD'], i, r;
      for (i = 0; i < order.length; i++) { r = sp.rows.filter(function (x) { return x.state === order[i]; })[0]; if (r) return r; }
      return sp.rows[0] || null;
    }
    function short(t, max) { t = String(t || ''); return t.length > max ? t.slice(0, max - 2).replace(/\s+$/, '') + '..' : t; }
    /* stepsOf: each step's rows, how it stands (DONE / TODO / WAITING / LOCKED / BANG), who it waits on, and the one line
     * it folds to. Locks are the card's own (the engine gates nothing here): the deal, the bill, the crew and the show
     * night open when the room is confirmed (or holds the night and wants something from them first); announcing opens
     * when the bill is done. A step the guide is on, one with an ask already out, or one picked by hand is never locked. */
    function stepsOf(s, v, rows, tc, picked) {
      var show = v.show, by = {}, room = rows.filter(function (r) { return r.key === 'room'; })[0], offer = rows.filter(function (r) { return r.key === 'offer'; })[0],
          roomOk = show.status === 'CONFIRMED' || (room && room.state === 'HOLD'), tutStep = tc ? tutStepOf(tc) : null, pr = picked ? rows.filter(function (r) { return r.key === picked; })[0] : null,
          billDone, out, days = daysTo(s, show.day);
      STEPS.forEach(function (k) { by[k] = []; });
      rows.forEach(function (r) { by[stepOfRow(r)].push(r); });
      by.DEAL.sort(function (a, b) { return DEAL_ORDER[a.key] - DEAL_ORDER[b.key]; });
      function some(k, stt) { return by[k].some(function (r) { return r.state === stt; }); }
      function stateOf(k) { return some(k, 'BAD') ? 'BANG' : (some(k, 'TODO') ? 'TODO' : (some(k, 'WAIT') ? 'WAITING' : (some(k, 'HOLD') ? 'TODO' : 'DONE'))); }
      billDone = !!show.bill.locked || (v.bands.length > 0 && !some('BILL', 'BAD') && !some('BILL', 'TODO') && !some('BILL', 'WAIT') && !offer);
      out = STEPS.map(function (k) {
        var stt = stateOf(k), need = (k === 'DATE' || k === 'ROOM' ? null : 'ROOM'), locked, w, line = '', f;
        if (k === 'BILL') stt = billDone ? 'DONE' : (stt === 'DONE' ? 'WAITING' : stt);              // every band said yes, but the touring band has not taken the offer
        locked = !!need && !(need === 'ROOM' ? roomOk : billDone) && !some(k, 'WAIT') && k !== tutStep && !(pr && stepOfRow(pr) === k) &&
                 !(k === 'BILL' && (billDone || v.bands.length || some(k, 'BAD'))) && !(k === 'DEAL' && ((offer && offer.state !== 'TODO') || (v.deal && v.deal.agreedDay != null))) &&
                 !(k === 'ANNOUNCE' && by[k].some(function (r) { return r.pasted; }));
        if (locked) stt = 'LOCKED';
        else if (k === 'NIGHT' && stt === 'DONE') stt = 'SOON';                                    // nothing to do for it yet: it is done when it is played
        w = stt === 'WAITING' ? ((by[k].filter(function (r) { return r.state === 'WAIT' && r.who; })[0] || {}).who || (k === 'BILL' && offer ? offer.who : '')) : '';
        /* the one line a folded step says */
        if (stt === 'LOCKED') line = T('card', 'opens.' + need);
        else if (k === 'DATE') line = T('card', 'sum.date', { d: SB.time.fmt(show.day, 'short'), when: days > 0 ? T('card', days === 1 ? 'inDay' : 'inDays', { n: days }) : T('card', 'tonight') });
        else if (k === 'ROOM') line = room && room.value ? room.value + (room.state === 'HOLD' && room.unmet[0] ? ' · ' + T('card', 'sum.wants', { need: room.unmet[0].text }) : (room.st === 'HELD' && room.state === 'WAIT' && room.rank === 1 ? ' · ' + T('card', 'sum.yours') : '')) : T('show', 'noRoom');
        else if (k === 'DEAL') line = by[k].map(function (r) { return r.key === 'offer' ? r.value + ': ' + (r.stText || T('card', 'st.' + r.st)) : r.value; }).join(' · ');
        else if (k === 'BILL') {                                                          // who is booked, in running order; then how many are asked
          f = by[k].filter(function (r) { return r.kind === 'ask'; }).length;
          line = by[k].filter(function (r) { return r.kind === 'band'; }).sort(function (a, b) { return a.idx - b.idx; }).map(function (r) { return short(r.value, 16) + (r.state === 'DONE' ? '' : '?'); }).join(', ');
          line = line || f ? (line || T('card', 'sum.booked0')) + (f ? ' · ' + T('card', 'sum.asked', { n: f }) : '') : T('card', 'sum.bill0');
        }
        else if (k === 'CREW') line = T('card', 'sum.crew', { sound: (by[k][0] && by[k][0].value) || '?', door: (by[k][1] && by[k][1].value) || '?' });
        else if (k === 'ANNOUNCE') { f = by[k][0]; line = T('card', f && f.state === 'DONE' ? 'sum.flyer' : 'sum.flyerNo') + (by[k][1] && by[k][1].value ? ' · ' + by[k][1].value : ''); }
        else line = stt === 'SOON' ? T('card', 'sum.soon') : (by[k][0] && by[k][0].value ? by[k][0].value : T('card', 'sum.ready'));
        return { key: k, rows: by[k], state: stt, who: w, line: line, need: need, days: days };
      });
      return out;
    }
    function tutStepOf(tc) { return { HOLD: 'ROOM', BILL: tc.stage === 'OFFER' ? 'DEAL' : 'BILL', SOUND: 'CREW', FLYER: 'ANNOUNCE', PROMO: 'ANNOUNCE' }[tc.step] || null; }
    /* the row the guide is talking about, or null when it is only waiting */
    function tutRow(s, v, tc) {
      var j;
      switch (tc.step) {
        case 'HOLD': return 'room';
        case 'BILL':
          if (tc.stage === 'OFFER') return 'offer';
          if (tc.stage === 'KIDS' || tc.stage === 'LOCAL') return 'slot-' + (tc.slot || 'MIDDLE');
          if (tc.stage === 'ORDER') return v.bands.length ? 'band-' + v.bands[v.bands.length - 1].band.id : null;
          return null;
        case 'SOUND': return 'sound';
        case 'FLYER': return 'flyer';
        case 'PROMO':
          j = tc.jobId ? (v.jobs || []).filter(function (x) { return x.id === tc.jobId; })[0] : null;
          return j ? (j.type === 'MAKE_FLYER' ? 'flyer' : (j.group === 'TELLING' ? 'promo' : 'prep')) : null;
      }
      return null;
    }

    /* ---- NEXT: the one thing to do now, in plain words, with its button ---- */
    function sortJobs(s, list) {
      function k(j) { var d = !mine(j) ? (byOther(j) ? 8.5e6 : 9e6) : (late(s, j) ? -1 : (num(j.due) ? j.due : (j.window && num(j.window.idealUntil) ? j.window.idealUntil : 8e6))); return d; }
      return list.map(function (j, i) { return { j: j, k: k(j), i: i }; }).sort(function (a, b) { return (a.k - b.k) || (a.i - b.i); }).map(function (x) { return x.j; });
    }
    function effortOf() { return ui.effort || (SB.Config.USUAL && SB.Config.USUAL.effort) || 'STANDARD'; }
    /* 1.22: the priced sizes (print run, local ad) are buttons with their price; the one picked is what the press does */
    function pricedOpt(j) { return j.opt && j.opt.choices && (j.type === 'PRINT' || j.type === 'LOCAL_AD') ? j.opt : null; }
    function optOf(j) { var o = pricedOpt(j); return o ? ((ui.opts && ui.opts[j.id]) || o.chosen || (j.type === 'PRINT' ? 'USUAL' : 'PAPER')) : null; }
    function jobOpts(j) { return j.type === 'MAKE_FLYER' ? { effort: effortOf() } : (pricedOpt(j) ? { opt: optOf(j) } : {}); }
    /* the touring band who was offered the night and has not answered: locking the bill leaves them off it (fix list 1.9) */
    function openOfferName(s) {
      var show = s.shows && s.shows[showId], q = show && show.requestId && s.requests ? s.requests[show.requestId] : null, on = {}, nm = null;
      if (!show || !q || !q.bandId || !s.bands || !s.bands[q.bandId]) return null;
      show.bill.slots.forEach(function (x) { on[x.bandId] = true; });
      if (on[q.bandId]) return null;
      if (q.status === 'NEW' || q.status === 'REPLIED' || q.status === 'NEGOTIATING') nm = s.bands[q.bandId].name;
      return nm;
    }
    function doJob(j) {
      var id = j.id, o = jobOpts(j), r, who;
      if (j.type === 'LOCK_BILL' && !confirmedLock) {
        who = openOfferName(st());
        if (who) { confirmCard(T('show', 'lockOffer', { name: who }), T('show', 'lockOfferYes'), T('show', 'lockOfferNo'), function () { confirmedLock = true; try { doJob(j); } finally { confirmedLock = false; } }); return null; }
      }
      r = doAct(function (x) { return SB.Week.doNow(x, id, o); });
      if (!r || r.ok === false) return r;
      if (r.answer && r.answer.text) SB.UI.toast(r.answer.text, r.answer.status === 'NO' ? 'no' : 'info');
      (r.records || []).forEach(function (x) { if (x && x.t === 'OVERTIME' && x.text) SB.UI.toast(x.text, 'info'); });
      return r;
    }
    function doHold() { var rid = ui.roomId, day = ui.day; if (!rid || !num(day)) return null; return doAct(function (x) { return SB.Mail.ask(x, 'ROOM_HOLD', rid, { showId: showId, day: day }); }); }
    function sendOffer(q, show) {
      var d = ui.deal, withG, deal, day = show.day, res;
      if (!d || !q) return null;
      withG = d.shape === 'GUARANTEE' || d.shape === 'GUARANTEE_PLUS' || d.shape === 'VERSUS';
      deal = { shape: d.shape, guarantee: withG ? d.guarantee : 0, pct: d.pct, lodging: !!d.lodging, meal: !!d.meal };
      res = doAct(function (x) { return SB.Mail.reply(x, q.id, 'OFFER', { showId: showId, deal: deal, date: day }); });
      if (res && res.ok !== false) ui.deal = null;
      return res;
    }
    /* what a row asks of the player: { text, row, btn: { text, label, hours, fn, refusal }, msg: it is a message, stop: { kind, why } when it cannot be done tonight } */
    function todoFor(s, v, r, tc) {
      var on = sel === r.key && !look, N = function (k, c) { return T('card', 'nx.' + k, c); }, go = function () { pick(r.key); }, band = r.band ? bandWord(r.band.name) : '', slot = r.slot ? T('bill', 'gap.' + r.slot).toLowerCase() : '', role, name, list, j, i, c, t = null;
      function open(text) { return { text: text, label: text, fn: go }; }
      switch (r.kind || r.key) {
        case 'room':
          if (r.state === 'HOLD') return null;
          return { row: r.key, msg: true, text: r.st === 'NO' ? N('roomNo', { room: r.value }) : N('room', { d: SB.time.fmt(num(ui.day) ? ui.day : v.show.day, 'short') }),
                   btn: on && ui.roomId ? { text: N('holdGo'), label: T('show', 'holdRoomL', { room: roomName(s, ui.roomId), d: SB.time.fmt(ui.day, 'short') }), hours: mailH(), fn: doHold } : open(N('pickRoom')) };
        case 'offer':
          if (r.st === 'COUNTER') return { row: r.key, text: N('counter', { band: band }), btn: on ? null : open(N('see')) };
          return { row: r.key, msg: true, text: r.st === 'NO' ? N('offerNo', { band: band }) : N('offer', { band: band }),
                   btn: on && ui.deal ? { text: N('offerGo'), label: SB.text.label('ui.inbox.sendOffer') + ': ' + band, hours: mailH(), fn: function () { sendOffer(r.req, v.show); } } : open(N('seeOffer')) };
        case 'ask': return { row: r.key, text: N('counter', { band: band }), btn: on ? null : open(N('see')) };
        case 'slot':
          c = tc && tc.bandId && (tc.stage === 'KIDS' || tc.stage === 'LOCAL') && tc.slot === r.slot ? bandCard(s, tc.bandId) : null;
          return { row: r.key, msg: true, text: c ? N('bandNamed', { band: bandWord(c.name), slot: slot, role: T('bill', 'role.' + r.slot) }) : (r.st === 'NO' ? N('bandNo', { band: band, slot: slot }) : N(v.bands.length >= 2 && v.bands.every(function (b) { return b.confirmed; }) ? 'bandOrLock' : 'band', { slot: slot, role: T('bill', 'role.' + r.slot) })),
                   btn: on ? null : open(N('pickBand')) };
        case 'band': return { row: r.key, text: N('order'), btn: on ? null : open(N('pickOrder')) };
        case 'sound': case 'security':
          role = T('show', (r.kind || r.key) === 'sound' ? 'sound' : 'security').toLowerCase();
          name = tc && tc.step === 'SOUND' && tc.personId && r.key === 'sound' ? first(s, tc.personId) : '';
          return { row: r.key, msg: true, text: r.st === 'NO' ? N('crewNo', { name: r.value || '?', role: role }) : (name ? N('crewNamed', { name: name, role: role }) : N('crew', { role: role })), btn: on ? null : open(N('pickCrew')) };
        case 'door':
          return { row: r.key, text: N('door'), btn: on ? { text: N('doorMe'), label: T('show', 'youWork'), fn: function () { act(function (x) { return SB.Shows.setCrew(x, showId, 'floor', 'player'); }); } } : open(N('pickCrew')) };
        case 'flyer':
          if (!r.pasted) return { row: r.key, text: N(tc && tc.step === 'FLYER' && tc.stage === 'NAME' ? 'flyerName' : 'flyer'), btn: { text: T('show', 'flyerDeskT'), label: T('show', 'flyerDesk'), fn: function () { SB.UI.go('flyerdesk', { showId: showId }); } } };
          list = r.job ? [r.job] : [];
          break;
        case 'lock': list = r.job ? [r.job] : []; break;
        case 'promo': case 'prep': list = sortJobs(s, r.jobs || []); break;
        default: return null;
      }
      /* work that takes hours: the soonest due that can be done tonight; else why nothing here can */
      for (i = 0; i < list.length; i++) {
        j = list[i];
        if (!mine(j)) continue;
        if (tutJob && tc && tc.step === 'PROMO' && tc.stage === 'PLAN' && j.id !== tutJob && list.some(function (x) { return x.id === tutJob; })) continue;
        c = canNow(s, j.id, jobOpts(j));
        if (c.ok && c.overtime > 0) { if (!t || t.kind !== 'STAY') t = { kind: 'STAY', why: costT(c.overtime).toLowerCase(), job: j.label }; continue; }
        if (c.ok) {
          return (function (job, can) {
            var due = CK() ? CK().due(job, { today: s.clock.day }) : null;
            return { row: r.key, text: job.type === 'MAKE_FLYER' ? N('flyerMake') : N('job', { job: job.label, due: due ? N('jobDue', { due: due.text.toLowerCase() }) : '' }),
                     btn: on ? { text: N('jobGo'), label: T('card', 'doNowL', { job: job.label }), hours: can.hours, refusal: can, fn: function () { doJob(job); } } : open(N('seeJobs')) };
          })(j, c);
        }
        if (!t || (c.code === 'NO_TIME' && t.kind !== 'NO_TIME' && t.kind !== 'STAY')) t = { kind: c.code, why: whyT(c), job: j.label };
      }
      return t ? { row: r.key, stop: t } : null;
    }
    function nightNext(text, row) { return { text: text, row: row || null, night: true }; }
    function nextOf(s, v, rows, steps, tc) {
      var N = function (k, c) { return T('card', 'nx.' + k, c); }, i, k, sp, r, t, order = ['BAD', 'TODO'], stop = null, names = [], room = rows.filter(function (x) { return x.key === 'room'; })[0], tr, tk, later = [],
          asked = rows.filter(function (x) { return x.kind === 'band' || x.kind === 'ask' || x.kind === 'offer'; }).length;
      function rowBy(key) { return rows.filter(function (x) { return x.key === key; })[0] || null; }
      function usable(t0) {
        if (!t0) return null;
        if (t0.stop) { if (!stop || (RANK[t0.stop.kind] || 0) > (RANK[stop.kind] || 0)) stop = t0.stop; return null; }
        if (t0.msg && canMsg && canMsg.ok === false) { if (!stop || !RANK[stop.kind]) stop = { kind: 'NO_TIME', why: whyT(canMsg), job: '' }; return null; }
        if (t0.msg && tonightV && tonightV.left < mailH()) { if (!stop || stop.kind !== 'STAY') stop = { kind: 'STAY', why: costT(mailH()).toLowerCase(), job: '', text: t0.text }; return null; }
        return t0;
      }
      function stopText() {
        if (stop.kind === 'STAY') return stop.job ? N('stayJob', { job: stop.job, n: stop.why }) : N('stayMsg', { n: stop.why });
        return stop.kind === 'NO_TIME' || stop.kind === 'BURNT_OUT' ? (stop.job ? N('noTime', { job: stop.job, why: stop.why }) : N('noMsg', { why: stop.why })) : N('early', { job: stop.job, why: stop.why });
      }
      if (tonightV && !tonightV.open) return nightNext(tonightV.called ? N('nothing') : N('notOpen'));
      /* the guided show's own night: the clock's button is GO TO THE SHOW, and the card says so, as the guide does */
      if (tc && tc.step === 'DOOR' && tc.stage === 'OPEN') return nightNext(N('showNight'));
      /* the guided first show: the card says what the guide says */
      if (tc) {
        tk = tutRow(s, v, tc); tr = tk ? rowBy(tk) : null;
        if (tc.stage === 'WAIT') {
          /* the guide says call it a night: so does the card, with who it is waiting on (WAIT:PLAY and DOOR:PLAY say
             "do what fits, then call it a night": that is the card's own reading, below) */
          if (tc.step === 'HOLD' && room) return nightNext(N('waiting', { names: room.who || room.value }), 'room');
          if (tc.step === 'PROMO' && tc.jobId) { t = (v.jobs || []).filter(function (x) { return x.id === tc.jobId; })[0]; if (t) return nightNext(N('jobTomorrow', { job: t.label }), tk); }
          rows.forEach(function (x) { if (x.state === 'WAIT' && x.who && names.indexOf(x.who) < 0) names.push(x.who); });
          return nightNext(names.length ? N('waiting', { names: names.slice(0, 3).join(', ') }) : N('keepOn'));
        } else if (tc.step === 'HOLD' && tc.stage === 'HELD' && room && room.state === 'WAIT') {
          return nightNext(room.rank > 1 ? N('held2', { room: room.value, n: room.rank }) : N('heldYours', { room: room.value }), 'room');
        } else if (tr && !(tc.step === 'HOLD' && tc.stage === 'HELD')) {
          t = usable(todoFor(s, v, tr, tc));
          if (t) return t;
          if (stop) return nightNext(stopText(), tr.key);
        }
      }
      for (i = 0; i < steps.length; i++) {
        sp = steps[i];
        if (sp.state === 'LOCKED' || sp.state === 'DONE') continue;
        for (k = 0; k < order.length; k++) {
          r = sp.rows.filter(function (x) { return x.state === order[k]; });
          if (sp.key === 'BILL' && order[k] === 'TODO') {
            /* the headliner first, then the opener; with two bands asked a third is the player's call (it, or locking
               the bill as it stands), so it waits until everything else is asked for */
            r.sort(function (a, b) { return (SLOT_FIRST[a.slot] === undefined ? 9 : SLOT_FIRST[a.slot]) - (SLOT_FIRST[b.slot] === undefined ? 9 : SLOT_FIRST[b.slot]); });
            if (asked >= 2) { later = later.concat(r); r = []; }
          }
          for (t = 0; t < r.length; t++) { tr = usable(todoFor(s, v, r[t], tc)); if (tr) return tr; }
        }
        sp.rows.forEach(function (x) { if (x.state === 'WAIT' && x.who && names.indexOf(x.who) < 0) names.push(x.who); });
      }
      for (t = 0; t < later.length; t++) { tr = usable(todoFor(s, v, later[t], tc)); if (tr) return tr; }
      if (stop && RANK[stop.kind]) return nightNext(stopText());
      if (room && room.state === 'WAIT' && room.st === 'HELD') return nightNext(room.rank > 1 ? N('held2', { room: room.value, n: room.rank }) : N('heldYours', { room: room.value }), 'room');
      if (names.length) return nightNext(N('waiting', { names: names.slice(0, 3).join(', ') }));
      if (room && room.state === 'HOLD') return nightNext(N('roomWants', { room: room.value, need: room.unmet.map(function (x) { return x.text; }).join('; ') }), 'room');
      if (stop) return nightNext(stopText());
      i = safe(function () { return SB.Mail.needsYou(s).length; }, 0);
      return nightNext(i ? N('nothingPhone', { n: i }) : N('nothing'));
    }
    function nextLine(s, nx) {
      var b = nx.btn, btn = null, w = D.mw(T('card', 'next'), 20);
      /* waiting is calling it a night, and that is the pinned clock's button: the line points at it */
      if (nx.night) btn = tonightV && tonightV.open ? h('span', { class: 'cb-typed cb-small cb-nexthint', text: T('card', /call it a night|go to the show/i.test(nx.text || '') ? 'toClockShort' : 'toClock') }) : null;
      else if (b && b.hours > 0) btn = costAct({ text: b.text, label: b.label, fk: 'next', hours: b.hours, fn: b.fn, refusal: b.refusal, size: 12, tut: 'card-next', tutRef: showId });
      else if (b) btn = D.act(b.text, b.label || b.text, 'next', b.fn, { size: 12, tut: 'card-next', tutRef: showId });
      return h('div', { class: 'cb-next' + (nx.night ? ' is-night' : ''), role: 'group', aria: { label: T('card', 'nextL') } }, [
        h('span', { class: 'cb-nextword', aria: { hidden: 'true' } }, D.art(D.swipe(2, 17, w + 8, 20) + D.marker(T('card', 'next'), 5, 24, 20, { seed: 'nx' }), w + 14, 32)),
        h('p', { class: 'cb-typed cb-nexttext', role: 'status', text: nx.text || '' }),
        btn
      ]);
    }

    /* where the selection goes when its row has turned into another (an empty slot that was asked, an ask that said yes) */
    function fallbackSel(rows, was) {
      var m = /^(slot|ask|band)-(.+)$/.exec(was), r = null;
      if (was === 'offer') r = rows.filter(function (x) { return x.kind === 'band' && x.band && v0Tour(x); })[0];
      else if (m && m[1] === 'ask') r = rows.filter(function (x) { return x.key === 'band-' + m[2]; })[0];
      else if (m && m[1] === 'slot') r = rows.filter(function (x) { return x.slot === m[2]; })[0];
      return r ? r.key : null;
    }
    function v0Tour(x) { var s = st(), sh = s && s.shows[showId], q = sh && sh.requestId && s.requests ? s.requests[sh.requestId] : null; return !!q && q.bandId === x.band.id; }

    /* a typed rubber stamp (o.dashed: a pencilled box, nothing inked yet), right-aligned at xr; returns { svg, w } */
    function stampBox(t, xr, cy, o) {
      o = o || {};
      var sw, out;
      if (o.dashed) {
        sw = D.tw(t, 12) + 16;
        out = '<path d="M' + f(xr - sw) + ' ' + f(cy - 10) + 'h' + f(sw) + 'v20h' + f(-sw) + 'Z" fill="none" stroke="' + (o.ink || D.GRAY) + '" stroke-width="1.4" stroke-dasharray="4 3"/>' + D.type(t, xr - sw / 2, cy + 4.5, 12, { anchor: 'middle', bold: true, fill: o.ink || D.GRAY });
        return { svg: out, w: sw };
      }
      sw = D.tw(t, 12) + 28;                                        // the letters start well inside the box and end well inside it
      out = '<g transform="rotate(' + (o.rot || 0) + ' ' + f(xr - 1 - sw / 2) + ' ' + f(cy) + ')">' + K().rect(xr - sw, cy - 10.5, sw - 2, 21, { seed: 'rst' + t, sw: 2.2, wob: 0.5, over: 0.3 }) +
        D.type(t, xr - sw + 12, cy + 4.5, 12, { bold: true }) + D.type(t, xr - sw + 12.5, cy + 4.5, 12, { bold: true }) + '</g>';   // struck twice: a stamp inks heavy
      return { svg: out, w: sw + 4 };
    }
    function fitType(t, s, max) { t = String(t || ''); if (D.tw(t, s) <= max) return t; while (t.length > 1 && D.tw(t.replace(/\s+$/, '') + '..', s) > max) t = t.slice(0, -1); return t.replace(/\s+$/, '') + '..'; }

    /* a step's header: its number and name on a strip, the one line it folds to, and its one stamp. The open step is
       boxed; a locked one is pencil grey and says what opens it. Pressing a folded step that is open to work unfolds it. */
    function stepThing(sp, i, open) {
      var W = 434, ht = 27, out = '', name = (i + 1) + ' ' + T('card', 'step.' + sp.key), locked = sp.state === 'LOCKED', x0 = 4, sx, stT, sb, line, first0 = firstOpen(sp),
          who = String(sp.who || '').split(' ').slice(0, 2).join(' ').toUpperCase();
      stT = sp.state === 'BANG' ? '' : (sp.state === 'WAITING' ? (who ? T('card', 'stepSt.WAITING', { name: short(who, 14) }) : T('card', 'stepSt.WAITING0')) :
            (sp.state === 'SOON' ? T('card', sp.days > 1 ? 'soon' : (sp.days === 1 ? 'soon1' : 'soon0'), { n: sp.days }) : T('card', 'stepSt.' + sp.state)));
      /* one row, its message not sent yet: the step says so (the row it would have repeated is not drawn) */
      if (sp.key !== 'BILL' && sp.rows.length === 1 && sp.rows[0].st === 'TONIGHT') stT = T('card', 'st.TONIGHT');
      if (open) out += '<path d="M2 2H' + (W - 3) + 'L' + (W - 2) + ' ' + (ht - 2) + 'H3Z" fill="' + D.PAPER + '" stroke="' + D.TONER + '" stroke-width="2.6"/>';
      else out += '<path d="M4 ' + (ht - 1.5) + 'H' + (W - 6) + '" stroke="' + D.TONER + '" stroke-opacity="' + (locked ? '.25' : '.5') + '" stroke-width="1.2"/>';
      out += D.strip(name, x0, 1, 12, locked ? { ground: D.GRAY } : null);
      sx = x0 + D.stripW(name, 12) + 10;
      /* the "?" (the press itself is a button laid over it, whyButton) */
      out += '<circle cx="' + f(sx + 7) + '" cy="' + f(ht / 2) + '" r="8" fill="none" stroke="' + (locked ? D.GRAY : D.TONER) + '" stroke-width="1.5"/>' + D.type('?', sx + 7, ht / 2 + 4.5, 12, { anchor: 'middle', bold: true, fill: locked ? D.GRAY : D.TONER });
      sx += 22;
      if (sp.state === 'BANG') { out += D.bang(W - 30, ht / 2 + 9, 19); sb = { w: 30 }; }
      else { sb = stampBox(stT, W - 8, ht / 2 + 0.5, { dashed: locked || sp.state === 'TODO' || sp.state === 'SOON', ink: sp.state === 'TODO' ? D.TONER : null, rot: i % 2 ? 1.2 : -1.2 }); out += sb.svg; }
      if (sp.state === 'DONE') { out += '<g transform="translate(' + f(sx) + ' ' + f(ht / 2 - 8) + ')">' + D.mark('DONE', 15) + '</g>'; sx += 20; }
      line = fitType(String(sp.line || '').toUpperCase(), 12, Math.max(30, W - 8 - sb.w - 8 - sx));
      if (line) out += D.type(line, sx, ht / 2 + 4.5, 12, { bold: open || sp.state === 'DONE', fill: locked ? D.GRAY : D.TONER });
      var headEl = D.thing({ cls: 'cb-stephead' + (open ? ' is-on' : '') + (locked ? ' is-locked' : ''), pressed: open, fk: 'step-' + sp.key, tut: 'card-step', tutRef: sp.key, svg: out, w: W, h: ht,
        label: T('card', 'stepL', { n: i + 1, step: T('card', 'step.' + sp.key).toLowerCase(), stamp: (sp.state === 'BANG' ? T('card', 'stepSt.BANG') : stT).toLowerCase(), line: sp.line || '' }),
        onClick: function () { if (locked) { SB.UI.toast(T('card', 'step.' + sp.key) + ': ' + sp.line + '.', 'info'); return; } if (first0) pick(first0.key); } });
      /* a locked step says what opens it, but is not a Tab stop (keyboard play, 0.9) */
      if (locked && headEl && headEl.setAttribute) { headEl.setAttribute('tabindex', '-1'); headEl.setAttribute('aria-disabled', 'true'); }
      return headEl;
    }

    /* the press over a step header's "?": its two-line why opens under the header, and closes on the next press */
    function pq(n) { return 'calc(var(--p) * ' + n + ')'; }
    function whyButton(sp, i) {
      var name = (i + 1) + ' ' + T('card', 'step.' + sp.key), x = 4 + D.stripW(name, 12) + 10 + 7, p = h('p', { class: 'cb-why', hidden: true, text: T('card', 'why.' + sp.key) }), b;
      b = h('button', { type: 'button', class: 'cb-whybtn', data: { fk: 'why-' + sp.key }, style: { left: pq(x - 10), width: pq(20), height: pq(20), top: pq(3.5) },
        aria: { label: T('card', 'whyL', { step: T('card', 'step.' + sp.key).toLowerCase() }), expanded: 'false' }, text: T('card', 'whyBtn'),
        on: { click: function (ev) {
          var on = p.hasAttribute('hidden');
          if (ev && ev.stopPropagation) ev.stopPropagation();
          if (on) p.removeAttribute('hidden'); else p.setAttribute('hidden', '');
          b.setAttribute('aria-expanded', on ? 'true' : 'false');
        } } });
      return [b, p];
    }

    /* one row: its name on a label-maker strip (it opens), what is written in by hand, how it stands as a stamp */
    function rowThing(r, i, ht, o) {
      o = o || {};
      var W = o.W || 420, on = sel === r.key, out = '', lx = 98, stT = r.st ? (r.stText || T('card', 'st.' + r.st)) : '', sw = 0, vx = lx + 6, maxV, val = String(r.value || '').toUpperCase(), vw, sb;
      if (on) out += '<path d="M2 2H' + (W - 3) + 'L' + (W - 2) + ' ' + (ht - 3) + 'H3Z" fill="' + D.PAPER + '" stroke="' + D.TONER + '" stroke-width="2.4"/>';
      else out += '<path d="M' + lx + ' ' + (ht - 2.5) + 'H' + (W - 6) + '" stroke="' + D.TONER + '" stroke-opacity=".4" stroke-width="1.2"/>';
      out += D.strip(r.label, 5, (ht - 25) / 2 - 1, 12, o.pencil ? { rot: ((i % 3) - 1) * 0.7, ground: D.GRAY } : { rot: ((i % 3) - 1) * 0.7 });
      if (o.tick) { out += '<g transform="translate(' + f(W - 26) + ' ' + f(ht / 2 - 8) + ')">' + D.mark('DONE', 16) + '</g>'; sw = 22; }   // booked: the PLAYING heading says it, a tick is enough
      else if (r.st) { sb = stampBox(stT, W - 8, ht / 2, { dashed: r.st === 'EMPTY' || r.st === 'OPT', ink: r.st === 'EMPTY' ? D.TONER : null, rot: i % 2 ? 1.5 : -1.5 }); out += sb.svg; sw = sb.w; }
      else if (r.note) { sw = D.tw(r.note, 12) + 4; out += D.type(r.note, W - 8 - sw, ht / 2 + 4.5, 12, { bold: true }); }
      if (r.hot) { out += D.bang(W - 8 - sw - 22, ht / 2 + 8, 17); sw += 26; }
      if (o.time) { out += D.type(o.time, W - 8 - sw - 6, ht / 2 + 4.5, 12, { anchor: 'end', bold: true }); sw += D.tw(o.time, 12) + 10; }   // when they go on
      maxV = Math.max(40, W - 8 - sw - 6 - vx);
      var vs = ht >= 30 ? 17 : (ht >= 27 ? 15 : 13);                // a long step packs its rows tighter: the hand shrinks with them
      if (o.pencil) vs -= 3;                                         // asked, not booked: typed small in pencil, not written in marker
      function vW(t) { return o.pencil ? D.tw(t, vs) : D.mw(t, vs, { seed: 'rv' + r.key }); }
      if (val) {
        /* what is written in keeps its size: a long name is cut short, never squeezed under the stamp */
        if (vW(val) > maxV) val = val.replace(/^THE\s+/, '');
        if (vW(val) > maxV) { while (val.length > 1 && vW(val.replace(/\s+$/, '') + '..') > maxV) val = val.slice(0, -1); val = val.replace(/\s+$/, '') + '..'; }
        vw = vW(val);
        out += (o.pencil ? D.type(val, vx, ht / 2 + vs * 0.36, vs, { bold: true, fill: '#5a5953' }) : D.marker(val, vx, ht / 2 + vs * 0.38, vs, { seed: 'rv' + r.key })) +
               (r.struck ? K().line(vx - 2, ht / 2 + 1, vx + vw + 2, ht / 2 - 1, { seed: 'rs' + r.key, sw: 2.6 }) : '');
      } else out += '<path d="M' + vx + ' ' + (ht - 8) + 'h' + f(maxV * 0.7) + '" stroke="' + D.TONER + '" stroke-width="1.4" stroke-dasharray="2 4"/>';
      return D.thing({ cls: 'cb-cardrow' + (on ? ' is-on' : ''), pressed: on, fk: 'row-' + r.key, tut: 'card-row', tutRef: r.kind || r.key, svg: out, w: W, h: ht, drop: o.drop || null,
        label: r.label + ': ' + (r.value || T('card', 'blank')) + (stT ? ', ' + stT.toLowerCase() : '') + (o.time ? ', ' + T('bill', 'starts', { t: o.time }).toLowerCase() : '') + (r.note ? ', ' + r.note.toLowerCase() : '') + (r.hot ? ' (!!)' : ''),
        onClick: function () { pick(r.key); } });
    }
    /* the bill step unfolded: who is playing, in running order, each with its set time and arrows (and drag one onto another
     * to swap places); then who has been asked and not answered, in pencil; then the slots nobody is in; then the lock */
    function billRows(v, rows, ht) {
      var locked = !!v.show.bill.locked, order = v.show.bill.slots.map(function (x) { return x.bandId; }), many = order.length > 1, out = [], j = 0,
          booked = rows.filter(function (r) { return r.kind === 'band'; }).sort(function (a, b) { return a.idx - b.idx; }),
          asked = rows.filter(function (r) { return r.kind === 'ask'; }), gaps = rows.filter(function (r) { return r.kind === 'slot'; }),
          rest = rows.filter(function (r) { return r.kind !== 'band' && r.kind !== 'ask' && r.kind !== 'slot'; });
      function head(t) { return h('li', { class: 'cb-billhead', aria: { hidden: 'true' } }, h('span', { class: 'cb-typed', text: t })); }
      function moveTo(id, to) {
        var o2 = order.slice(), from = o2.indexOf(id);
        if (from < 0 || to < 0 || to >= o2.length || from === to) return;
        o2.splice(from, 1); o2.splice(to, 0, id);
        guard(locked, function () { act(function (x) { return SB.Shows.setBill(x, showId, { order: o2 }); }); });
      }
      function arrow(up) {
        var y0 = ht / 2 - 6, y1 = ht / 2 + 6;
        return '<path d="' + (up ? 'M13 ' + f(y0) + 'L21 ' + f(y1) + 'L5 ' + f(y1) : 'M13 ' + f(y1) + 'L21 ' + f(y0) + 'L5 ' + f(y0)) + 'Z" fill="' + D.TONER + '" stroke="' + D.TONER + '" stroke-width="1.6" stroke-linejoin="round"/>';
      }
      if (booked.length) out.push(head(T('card', many ? 'billPlaying' : 'billPlaying1')));
      booked.forEach(function (r) {
        var id = r.band.id, i = order.indexOf(id), name = r.band.name,
            el = rowThing(r, j++, ht, { W: many ? 366 : 420, drop: many ? 'bill:' + id : null, time: num(r.b.start) ? SB.time.clock(r.b.start) : '', tick: !!r.b.confirmed });
        if (many) D.draggable(el, { id: id }, function (t, p) { if (t && t.indexOf('bill:') === 0) moveTo(p.id, order.indexOf(t.slice(5))); });
        out.push(h('li', { class: 'cb-billrow' + (many ? ' is-movable' : '') }, [el, many ? h('span', { class: 'cb-billmv', role: 'group', aria: { label: T('card', 'order') + ': ' + name } }, [
          D.thing({ cls: 'cb-mvbtn', label: T('card', 'earlierL', { name: name }), fk: 'up-' + id, tut: 'bill-move', tutRef: showId, svg: arrow(true), w: 26, h: ht, disabled: i <= 0, onClick: function () { moveTo(id, i - 1); } }),
          D.thing({ cls: 'cb-mvbtn', label: T('card', 'laterL', { name: name }), fk: 'dn-' + id, svg: arrow(false), w: 26, h: ht, disabled: i >= order.length - 1, onClick: function () { moveTo(id, i + 1); } })
        ]) : null, r.why ? h('p', { class: 'cb-typed cb-small cb-slotwhy', text: r.why }) : null]));
      });
      if (asked.length) out.push(head(T('card', 'billAsked')));
      asked.forEach(function (r) { out.push(h('li', null, [rowThing(r, j++, ht, { pencil: true }), r.why ? h('p', { class: 'cb-typed cb-small cb-slotwhy', text: r.why }) : null])); });
      if (gaps.length && (booked.length || asked.length)) out.push(head(T('card', 'billOpen')));
      gaps.concat(rest).forEach(function (r) { out.push(h('li', null, [rowThing(r, j++, ht, r.kind === 'offer' ? { pencil: true } : undefined), r.why ? h('p', { class: 'cb-typed cb-small cb-slotwhy', text: r.why }) : null])); });
      /* a band that left says so on the bill, and one still willing goes back with one press (fix-list 0.12) */
      (v.show.bill.dropped || []).forEach(function (d) {
        var bd = safe(function () { return st().bands[d.bandId]; }, null), nm = bd ? bd.name : '';
        if (!nm || order.indexOf(d.bandId) >= 0) return;
        out.push(h('li', { class: 'cb-billhint cb-dropped' }, [h('p', { class: 'cb-typed cb-small', text: T('card', 'droppedL', { band: nm, why: d.why }) }),
          d.willing && !locked ? D.act(T('card', 'putBack'), T('card', 'putBackL', { band: nm }), 'putback-' + d.bandId, function () { act(function (x) { return SB.Shows.putBack(x, showId, d.bandId); }); }, { size: 11 }) : null]));
      });
      if (booked.length || asked.length || rest.length) {
        /* what the bands on the bill, and the ones asked, will take: paid from the door at the end of the night */
        var owed = v.show.bill.slots.reduce(function (t, x) { return t + (x.role === 'TOURING' ? 0 : (x.fee || 0)); }, 0) +
          asked.reduce(function (t, r) { return t + ((r.ask && r.ask.payload && r.ask.payload.fee) || 0); }, 0);
        out.push(h('li', { class: 'cb-billhint' }, h('p', { class: 'cb-typed cb-small', text: T('bill', 'normalBill') + (owed > 0 ? ' ' + T('bill', 'running', { n: money(owed) }) : '') })));
      }
      return out;
    }
    function pickHead(t) { return h('h2', { class: 'cb-pickhead', aria: { label: t } }, D.word(String(t).slice(0, 34), 22)); }

    function picker(s, v, rows) {
      var r = rows.filter(function (x) { return x.key === sel; })[0], head, body, nm = r ? r.label : T('card', 'theShow');
      function bar(hd, on) {
        return h('div', { class: 'cb-pickbar' }, [hd, D.act(on ? T('card', 'lookBack', { row: nm }) : T('card', 'look'), on ? T('card', 'lookBackL', { row: nm.toLowerCase() }) : T('card', 'lookL'), 'look',
          function () { look = !on; keepFocus(root, render); }, { size: 11, tut: 'card-look', tutRef: showId })]);
      }
      if (look || !r) { body = forecast(s, v); return [bar(body[0], !!r)].concat(body.slice(1)); }
      head = bar(pickHead(r.label + (r.value && (r.kind || r.key === 'room') ? ': ' + r.value : '')), false);
      switch (r.kind || r.key) {
        case 'night': case 'room': return [head, roomSection(s, v)];
        case 'slot': return [head, sheet(s, v, r.slot)];
        case 'band': return [head, bandPicker(s, v, r)];
        case 'ask': return [head, askPicker(s, v, r)];
        case 'offer': return [head, offerPicker(s, v, r)];
        case 'lock': return [head, jobList(s, v, r.job ? [r.job] : [], 'prep-jobs')];
        case 'sound': return [head, piece('cb-crew', 'white', [crewRow(s, v, 'sound', 'sound')], { label: T('show', 'sound') })];
        case 'security': return [head, piece('cb-crew', 'white', [crewRow(s, v, 'security', 'security'), securityNote(s, v)], { label: T('show', 'security') })];
        case 'door': return [head, floorPicker(s, v, rows)];
        case 'flyer': return [head, flyerSection(s, v, r)];
        case 'promo': return [head, jobsSection(s, v, true)];
        case 'prep': return [head, jobsSection(s, v, false)];
        case 'price': return [head, doorSection(s, v)];
        case 'deal': return [head, dealSection(s, v), rows.some(function (x) { return x.key === 'offer'; }) ? h('div', { class: 'cb-under' }, [D.act(T('card', 'toOffer'), T('card', 'toOfferL'), 'to-offer', function () { pick('offer'); }, { size: 12 })]) : null];
      }
      body = forecast(s, v);
      return [bar(body[0], false)].concat(body.slice(1));
    }

    /* "How the night looks" says it in people first (fix list 1.6, 3.3): the head count and where you break even, then each number as a sentence */
    function crowdHead(fc, be) {
      var c = fc.call;
      if (!c || !(c.hi > 0)) return null;
      return h('p', { class: 'cb-typed cb-crowdhead', role: 'status', data: { fk: 'crowd-head' },
        text: be && num(be.even) && be.even > 0 && !be.hat ? T('show', 'lookHead', { lo: Math.round(c.lo), hi: Math.round(c.hi), n: be.even }) : T('show', 'lookHeadNoEven', { lo: Math.round(c.lo), hi: Math.round(c.hi) }) });
    }
    function crowdSentences(fc, be) {
      var out = [], c = fc.call, n = fc.nobody;
      if (fc.par && num(fc.par.heads)) out.push(T('show', 'crowdPar', { n: Math.round(fc.par.heads) }));
      if (c && c.hi > 0) out.push(T('show', 'crowdCall', { lo: Math.round(c.lo), hi: Math.round(c.hi) }));
      if (fc.cap) out.push(T('show', 'crowdCap', { n: fc.cap }));
      if (be && num(be.even) && be.even > 0 && !be.hat) out.push(T('show', 'crowdEven', { n: be.even }));
      if (n && n.hi > 0 && c && (n.hi < c.hi || n.lo < c.lo)) out.push(T('show', 'crowdNobody', { lo: Math.round(n.lo), hi: Math.round(n.hi) }));
      return out.length ? h('p', { class: 'cb-typed cb-small cb-crowdsay', text: out.join(' ') }) : null;
    }
    /* what each piece of telling people is worth, from the same guess: one line per job, so the range above is seen to move (fix list 2.7) */
    function promoLines(s, v) {
      var show = v.show, key = JSON.stringify([show.promo, s.week && s.week.plan, s.clock.day, show.bill && show.bill.slots.length]), list;
      if (ui.effKey !== key) { ui.effKey = key; ui.effVal = safe(function () { return SB.Forecast.promoEffects(s, showId); }, []); }
      list = ui.effVal || [];
      if (!list.length) return null;
      return h('ul', { class: 'cb-effects', aria: { label: T('card', 'forecast') } }, list.map(function (e) {
        var who = T('show', 'who' + (e.gen === null || e.gen === undefined ? 'X' : e.gen)), t = T('show', 'effect.' + e.kind, { n: e.heads, who: who });
        return h('li', { class: 'cb-typed cb-small' + (e.done ? '' : ' is-planned') }, [t + (e.done ? '' : ' (' + T('show', 'effectPlan') + ')')]);
      }));
    }
    /* sound and the host come off the top before the band is paid: when they eat over half the door at the guess, say so before the night (fix list 2.16) */
    function payOrderWarn(s, be) {
      var ex = safe(function () { return SB.Money.exposure(s, showId); }, null), off = 0, door;
      if (!be || !be.guess || be.hat) return null;
      ((ex && ex.lines) || []).forEach(function (l) { if (l.cat === 'SOUND' || l.cat === 'HOST') off += l.amount || 0; });
      (be.extras || []).forEach(function (l) { if (l.k === 'SOUND') off += l.amount || 0; });
      door = be.guess.door;
      if (!(door > 0) || off <= door / 2) return null;
      return h('p', { class: 'cb-typed cb-small cb-eats', role: 'note', data: { fk: 'sound-eats' }, text: T('show', 'soundEats', { off: money(off), door: money(door), n: be.guess.at }) });
    }

    /* nothing picked: the night as it stands: your call against what the town expects, the room's size, what you do not know yet */
    /* what you have and what this show has promised so far, one sentence (fix-list 1.17 step 2) */
    function moneyLine(s, ex) {
      var m = s.money || {}, have = num(m.bank) ? m.bank : (num(m.fund) ? m.fund : null), owe = ex && num(ex.total) ? ex.total : 0;
      if (have === null) return null;
      return h('p', { class: 'cb-typed cb-small cb-moneyline', data: { fk: 'money-line' },
        text: T('card', num(m.bank) ? 'moneyHave' : 'moneyFund', { have: money(have) }) + ' ' + T('card', 'moneyOwe', { owe: money(owe) }) });
    }
    function forecast(s, v) {
      var fc = v.forecast || {}, ex = safe(function () { return SB.Money.exposure(s, showId); }, null), be = safe(function () { return SB.Forecast.breakEven(s, showId); }, null), room = v.room, pace = v.show.deal && v.show.deal.guarantee > 0 && fc.guaranteePace ? T('bill', 'pace', { w: T('shows', 'pace.' + fc.guaranteePace) }) : '',
          stop = room && num(room.curfew) ? T('bill', 'stop', { t: SB.time.clock(room.curfew) }) : '';
      return [
        pickHead(T('card', 'forecast')),
        piece('cb-crowdsec', 'bone', [
          crowdHead(fc, be),
          moneyLine(s, ex),
          D.crowd({ par: fc.par && fc.par.heads, lo: fc.call && fc.call.lo, hi: fc.call && fc.call.hi, cap: fc.cap || null, even: be && num(be.even) ? be.even : (ex && num(ex.breakEven) ? ex.breakEven : null), per: 22 }),
          crowdSentences(fc, be),
          promoLines(s, v),
          payOrderWarn(s, be),
          D.unknowns(fc.call && fc.call.unknowns ? fc.call.unknowns.slice(0, 2) : null)
        ]),
        pace || stop || (fc.flow && fc.flow.length) || (fc.unknownPairs && fc.unknownPairs.length) ? piece('cb-nightnotes', 'white', [
          pace ? D.art(D.stamp(pace, 4, 4, 13, { rot: -3 }), D.stampW(pace, 13) + 14, 36) : null,
          stop ? h('div', { class: 'cb-curfew', role: 'img', aria: { label: stop } }, D.art(D.marker(stop, 6, 22, 16, { seed: 'cf' }) + K().under3(6, 28, D.mw(stop, 16), { seed: 'cfu', sw: 2.2, gap: 3 }), D.mw(stop, 16) + 20, 42)) : null,
          fc.flow && fc.flow.length ? h('ul', { class: 'cb-flow' }, fc.flow.map(function (x) {
            var gl = safe(function () { return SB.Identity.genGlyph(x.gen, 18); }, '');
            return h('li', null, [gl ? D.art('<g style="color:#141413">' + D.place(gl, 0, 0) + '</g>', 18, 18) : null, h('span', { class: 'cb-typed cb-small', text: word('gen.' + ['KIDS', 'MIDDLE', 'OLD'][x.gen] + '.name', '') + ': ' +
              (num(x.arrive) ? T('bill', 'arrive', { t: SB.time.clock(x.arrive) }) : '') + (num(x.leave) ? ', ' + T('bill', 'leave', { t: SB.time.clock(x.leave) }) : '') })]);
          })) : null,
          fc.unknownPairs && fc.unknownPairs.length ? h('p', { class: 'cb-typed cb-small cb-pairs', text: T('bill', 'unknownPairs', {
            list: fc.unknownPairs.map(function (p) { return word('genre.' + p.a + '.name', p.a) + ' + ' + word('genre.' + p.b + '.name', p.b); }).join('; ') }) }) : null,
          hearBill(s, v.show)
        ]) : hearBill(s, v.show),
        h('p', { class: 'cb-typed cb-small cb-pickhint', text: T('card', 'hint') })
      ];
    }

    /* a band on the bill: when they are on, how long, where in the order and on the flyer; peel them off */
    function bandPicker(s, v, r) {
      var b = r.b, show = v.show, locked = !!show.bill.locked, order = show.bill.slots.map(function (x) { return x.bandId; }), i = r.idx,
          bill = (v.billing && v.billing.length ? v.billing : order).slice(), bi, name = b.band.name;
      if (bill.length && typeof bill[0] === 'object') bill = bill.map(function (x) { return x.bandId || x.id; });
      bi = bill.indexOf(b.band.id);
      function move(d) {
        var o = order.slice(), t = o[i];
        if (i + d < 0 || i + d >= o.length) return;
        o[i] = o[i + d]; o[i + d] = t;
        guard(locked, function () { act(function (x) { return SB.Shows.setBill(x, showId, { order: o }); }); });
      }
      function flyerMove(d) { var o = bill.slice(), t = o[bi]; o[bi] = o[bi + d]; o[bi + d] = t; act(function (x) { return SB.Shows.setBilling(x, showId, o); }); }
      function setMin(m) { var mm = {}; mm[b.band.id] = Math.max(15, Math.min(90, m)); act(function (x) { return SB.Shows.setBill(x, showId, { minutes: mm }); }); }
      return piece('cb-bandpick', 'white', [
        locked ? h('p', { class: 'cb-typed cb-locked' }, [D.art(lockSvg(), 26, 28), ' ', T('show', 'locked')]) : null,
        h('div', { class: 'cb-row' }, [
          D.thing({ cls: 'cb-bandstk', label: T('card', 'bandPage', { name: name }), fk: 'bandpage', svg: D.bandSticker(b.band, 200), w: 200, h: 84, strip: T('card', 'page'), stripSize: 11, onClick: function () { SB.UI.go('band', { bandId: b.band.id }); } }),
          h('div', { class: 'cb-setctl' }, [
            h('span', { class: 'cb-typed', text: (b.confirmed ? T('bill', 'yes') : T('bill', 'asked')) + (b.listed ? '. ' + T('bill', 'listed') : '') }),
            num(b.start) ? D.typed(T('bill', 'starts', { t: SB.time.clock(b.start) }), 13, { bold: true }) : null,
            D.listen({ band: b.band, text: T('bill', 'listen'), stopText: T('bill', 'listenStop'), label: T('bill', 'listenL', { name: name }), fk: 'hear-' + b.band.id })
          ])
        ]),
        h('div', { class: 'cb-row cb-bandtabs' }, [
          D.tabs({ label: T('bill', 'minutes', { n: b.minutes || 0 }) + ', ' + name, title: T('bill', 'minutes', { n: b.minutes || 0 }), items: [
            { text: '-5', label: T('bill', 'shorter') + ': ' + name, fk: 'mn-' + b.band.id, onClick: function () { setMin((b.minutes || 30) - 5); } },
            { text: '+5', label: T('bill', 'longer') + ': ' + name, fk: 'mx-' + b.band.id, onClick: function () { setMin((b.minutes || 30) + 5); } }] }),
          order.length > 1 ? D.tabs({ label: T('card', 'order'), title: T('card', 'order'), items: [
            { text: T('card', 'earlier'), label: T('card', 'earlierL', { name: name }), tut: 'bill-move', tutRef: showId, fk: 'mv-up', disabled: i === 0, onClick: function () { move(-1); } },
            { text: T('card', 'later'), label: T('card', 'laterL', { name: name }), tut: 'bill-move', tutRef: showId, fk: 'mv-down', disabled: i === order.length - 1, onClick: function () { move(1); } }] }) : null,
          bill.length > 1 && bi >= 0 ? D.tabs({ label: T('bill', 'billing'), title: T('bill', 'billing') + ' ' + (bi + 1) + '/' + bill.length, items: [
            { text: T('card', 'bigger'), label: T('bill', 'billUp', { name: name }), fk: 'bu-' + b.band.id, disabled: bi === 0, onClick: function () { flyerMove(-1); } },
            { text: T('card', 'smaller'), label: T('bill', 'billDown', { name: name }), fk: 'bd-' + b.band.id, disabled: bi === bill.length - 1, onClick: function () { flyerMove(1); } }] }) : null
        ]),
        h('div', { class: 'cb-row' }, [
          D.act(T('card', 'another'), T('card', 'anotherL', { slot: r.label.toLowerCase() }), 'another', function () { pick('slot-' + r.slot); }, { size: 12 }),
          D.act(T('card', 'peel'), T('bill', 'drop', { name: name }), 'dr-' + b.band.id, function () { guard(locked && b.confirmed, function () { act(function (x) { return SB.Shows.dropBand(x, showId, b.band.id, 'PLAYER'); }); }); }, { size: 11 })
        ])
      ], { label: name });
    }

    /* an ask that is out (or about to go): how it stands; take what they came back with, or take the ask back */
    function askStatus(s, a, name) {
      var t = a.status === 'QUEUED' ? T('show', 'queued', { name: name }) : (a.status === 'SENT' ? T('card', 'askedSince', { name: name, day: SB.time.fmt(num(a.queuedDay) ? a.queuedDay : a.sentDay, 'dow') }) : (a.status === 'COUNTER' ? name + ': ' + T('bill', 'counter') + '.' : (a.status === 'YES' ? name + ' ' + T('bill', 'yes') + '.' : name + ' ' + T('bill', 'no') + '.')));
      return h('p', { class: 'cb-typed', text: t + (a.answer && a.answer.text && a.status !== 'QUEUED' && a.status !== 'SENT' ? ' “' + a.answer.text + '”' : '') });
    }
    function askActs(a, r) {
      return h('div', { class: 'cb-row' }, [
        a.status === 'COUNTER' ? costAct({ text: T('card', 'takeIt'), label: T('card', 'takeItL'), fk: 'take-it', hours: mailH(), fn: function () {
          var p = Object.assign({}, a.payload || {}, { acceptCounter: a.id });
          delete p.inPerson;
          doAct(function (x) { return SB.Mail.ask(x, a.kind, a.toId, p); });
        } }) : null,
        r && r.kind === 'ask' ? D.act(T('card', 'another'), T('card', 'anotherL', { slot: r.label.toLowerCase() }), 'another', function () { pick('slot-' + r.slot); }, { size: 12 }) : null,
        OPEN_ASK[a.status] ? D.act(T('card', 'takeBack'), T('card', 'takeBackL'), 'take-back', function () { act(function (x) { return SB.Mail.withdraw(x, a.id); }); }, { size: 11 }) : null
      ]);
    }
    function bandTop(c) {
      return h('div', { class: 'cb-row' }, [
        D.thing({ cls: 'cb-bandstk', label: T('card', 'bandPage', { name: c.name }), fk: 'bandpage', svg: D.bandSticker(c, 200), w: 200, h: 84, strip: T('card', 'page'), stripSize: 11, onClick: function () { SB.UI.go('band', { bandId: c.id }); } }),
        D.listen({ band: c, text: T('bill', 'listen'), stopText: T('bill', 'listenStop'), label: T('bill', 'listenL', { name: c.name }), fk: 'hear-' + c.id }),
        /* what it sounds like in words, beside the play button (fix-list 3.8) */
        SB.text.has('strings.genreSound.' + c.genre) ? h('span', { class: 'cb-typed cb-small', text: SB.text.label('genreSound.' + c.genre) }) : null
      ]);
    }
    function askPicker(s, v, r) { return piece('cb-bandpick', 'white', [bandTop(r.band), askStatus(s, r.ask, r.band.name), askActs(r.ask, r)], { label: r.band.name }); }

    /* the touring band of a request: the offer slip (what they asked for, changed if you like), sent as the reply to their request */
    function offerPicker(s, v, r) {
      var q = r.req, a = r.ask, show = v.show, rv = safe(function () { return SB.Requests.view(s, q.id); }, null), ask = (rv && rv.ask) || {}, d, withG, askNow, many, opts, cur, over, dealText, mealCost, gFloor, I = function (k, c) { return SB.text.label('ui.inbox.' + k, c); };
      if (a && OPEN_ASK[a.status]) return piece('cb-bandpick', 'manila', [bandTop(r.band), askStatus(s, a, r.band.name),
        h('p', { class: 'cb-typed cb-small', text: word('deal.' + ((a.payload && a.payload.deal && a.payload.deal.shape) || 'DOOR') + '.words', '', { amount: (a.payload && a.payload.deal && a.payload.deal.guarantee) || 0, pct: Math.round((((a.payload && a.payload.deal) || {}).pct == null ? 1 : a.payload.deal.pct) * 100) }) }),
        askActs(a, r)], { label: r.band.name });
      askNow = { shape: ask.shape || 'DOOR', guarantee: ask.guarantee || 0, pct: ask.pct == null ? 1 : ask.pct };
      if (!ui.deal) ui.deal = { shape: askNow.shape, guarantee: askNow.guarantee, pct: askNow.pct, lodging: !!ask.lodging, meal: !!ask.meal };
      d = ui.deal;
      /* fix list 1.4: show one sends what they asked for and nothing else. From show two each kind of deal is a button with its own dollars,
         and a deal that would pay the band less than they asked at the guess is not offered (design call D2). */
      many = rungShows(s, 'dealTypes');
      opts = many ? dealOpts(show, askNow, d) : [];
      if (!many || !opts.some(function (o) { return o.shape === d.shape; })) { d.shape = askNow.shape; d.guarantee = askNow.guarantee; d.pct = askNow.pct; }
      cur = opts.filter(function (o) { return o.shape === d.shape; })[0] || null;
      withG = d.shape === 'GUARANTEE' || d.shape === 'GUARANTEE_PLUS' || d.shape === 'VERSUS';
      over = { shape: d.shape, guarantee: withG ? (d.guarantee || 0) : 0, share: d.pct == null ? 1 : d.pct, meal: !!d.meal };
      dealText = word('deal.' + d.shape + '.words', lower(d.shape), { amount: d.guarantee || 0, pct: Math.round((d.pct == null ? 1 : d.pct) * 100) }) + (d.meal ? ', ' + I('meal') : '') + (d.lodging ? ', ' + I('lodging') : '');
      mealCost = safe(function () { var l = SB.Forecast.plannedCosts(s, show, { meal: true }).list.filter(function (x) { return x.k === 'FOOD'; })[0]; return l ? l.amount : 0; }, 0);
      function outcomeOf(you) { return you > 0 ? word('offer.keep', '', { you: you }) : (you < 0 ? word('offer.lose', '', { lose: -you }) : word('offer.zero', '')); }
      function pickKind(o) { d.shape = o.shape; d.guarantee = o.guarantee; d.pct = o.pct == null ? 1 : o.pct; render(); }
      function optLine(o) {
        var t = word('deal.' + o.shape + '.line', '', { amount: o.guarantee || 0, pct: Math.round((o.pct == null ? 1 : o.pct) * 100) });
        if (o.hat) return t + ' ' + word('offer.optLine', '', { line: '', n: o.at, band: o.band, outcome: outcomeOf(o.you) }).trim();
        return word('offer.optLine', '', { line: t, n: o.at, band: o.band, outcome: outcomeOf(o.you) }) + (o.shape !== 'DOOR' && o.nobody < 0 ? ' ' + word('offer.optNobody', '', { lose: -o.nobody }) : '');
      }
      gFloor = cur && withG ? cur.guarantee : 0;
      return piece('cb-offer', 'manila', [
        bandTop(r.band),
        a && (a.status === 'NO' || a.status === 'SILENT') ? askStatus(s, a, r.band.name) : null,
        h('p', { class: 'cb-typed', text: T('card', 'theyAsk', { deal: word('deal.' + (ask.shape || 'DOOR') + '.words', lower(ask.shape || 'DOOR'), { amount: ask.guarantee || 0, pct: Math.round((ask.pct == null ? 1 : ask.pct) * 100) }) }) }),
        payOrderWarn(s, safe(function () { return SB.Forecast.breakEven(s, showId, { shape: askNow.shape, guarantee: askNow.guarantee, share: askNow.pct }); }, null)),
        evenLine({ shape: askNow.shape, guarantee: askNow.guarantee, share: askNow.pct, meal: !!ask.meal }, { band: r.band.name, shape: askNow.shape, guarantee: askNow.guarantee, pct: askNow.pct, says: rv && num(rv.says) ? rv.says : 0 }),
        many ? h('div', { class: 'cb-dealopts', role: 'group', aria: { label: I('deal') } }, opts.map(function (o) {
          var on = d.shape === o.shape, nm = word('deal.' + o.shape + '.name', lower(o.shape)), line = optLine(o);
          return h('div', { class: 'cb-dealopt' + (on ? ' is-on' : '') }, [
            D.tickThing({ on: on, text: nm.toUpperCase() + (on ? ' · ' + word('offer.pick', 'PICKED') : ''), label: nm + (on ? ', ' + word('offer.pick', 'picked').toLowerCase() : '') + '. ' + line, fk: 'shape-' + o.shape, onClick: function () { pickKind(o); } }),
            h('p', { class: 'cb-typed cb-small', text: line })
          ]);
        })) : null,
        many && withG ? h('div', { class: 'cb-row cb-offerrow' }, [
          D.tabs({ label: I('guarantee') + ' ' + money(d.guarantee || 0), title: I('guarantee') + ' ' + money(d.guarantee || 0), items: [
            { text: '-$5', label: I('guarantee') + ' -5', fk: 'g-less', disabled: (d.guarantee || 0) - 5 < gFloor, onClick: function () { d.guarantee = Math.max(gFloor, (d.guarantee || 0) - 5); render(); } },
            { text: '+$5', label: I('guarantee') + ' +5', fk: 'g-more', onClick: function () { d.guarantee = (d.guarantee || 0) + 5; render(); } }] }),
          h('p', { class: 'cb-typed cb-small', text: word('offer.guaranteeLess', '') })
        ]) : null,
        h('div', { class: 'cb-row cb-offerrow' }, [
          D.tickThing({ on: !!d.meal, text: I('meal').toUpperCase() + (mealCost ? ' ~' + money(mealCost) : ''), label: I('meal') + (mealCost ? ', about ' + money(mealCost) : ''), fk: 'meal', onClick: function () { d.meal = !d.meal; render(); } }),
          D.tickThing({ on: !!d.lodging, text: I('lodging').toUpperCase(), label: I('lodging'), fk: 'lodging', onClick: function () { d.lodging = !d.lodging; render(); } })
        ]),
        d.shape !== askNow.shape || d.meal !== !!ask.meal ? evenLine(over, { shape: d.shape, guarantee: over.guarantee, pct: over.share }) : null,
        h('p', { class: 'cb-typed cb-small cb-sum', role: 'note', data: { fk: 'offer-sum' }, text: word('offer.summary', '', { band: r.band.name, deal: dealText }) + '.' }),
        h('div', { class: 'cb-row' }, [costAct({ text: many ? I('sendOffer') : word('offer.askShow1', I('sendOffer'), { deal: dealText }), label: I('sendOffer') + ': ' + r.band.name + ', ' + dealText, fk: 'send-offer', hours: mailH(), size: 15, tut: 'card-offer', tutRef: showId,
          fn: function () { sendOffer(q, show); } })]),
        !many ? h('p', { class: 'cb-typed cb-small cb-grey', text: word('offer.later', '') }) : null
      ], { label: I('slip') });
    }

    /* the deals worth offering (Forecast.dealOptions is a hundred runs of the settle, so it is kept until something it reads changes) */
    function dealOpts(show, askNow, d) {
      var s = st(), key = JSON.stringify([askNow, !!d.meal, show.door && show.door.price, show.crew, show.bill && show.bill.slots.length, show.hold && show.hold.rank, s.money && s.money.ledger ? s.money.ledger.length : 0, s.clock.day]);
      if (ui.dealKey !== key) { ui.dealKey = key; ui.dealVal = safe(function () { return SB.Forecast.dealOptions(s, showId, askNow, { meal: !!d.meal }); }, []); }
      return ui.dealVal || [];
    }

    /* the door and the floor: you (or nobody yet); security sits here when the room does not ask for it by name */
    function floorPicker(s, v, rows) {
      var floor = v.show.crew.floor, own = rows.some(function (x) { return x.key === 'security'; }), extra = rungShows(s, 'security');
      return piece('cb-crew', 'white', [
        h('div', { class: 'cb-crewrow' }, [D.word(T('show', 'floor'), 13),
          D.tickThing({ on: floor === 'player', text: T('show', 'you'), label: T('show', 'youWork'), fk: 'floor', onClick: function () { var on = floor !== 'player'; act(function (x) { return SB.Shows.setCrew(x, showId, 'floor', on ? 'player' : null); }); } })]),
        h('p', { class: 'cb-typed cb-small', text: (floor === 'player' ? T('show', 'doorYou') : T('show', 'doorNobody')) + ' ' + T('show', 'doorWhat') }),
        !own && extra && v.security ? crewRow(s, v, 'security', 'security') : null,
        !own && extra ? securityNote(s, v) : null
      ], { label: T('card', 'door') });
    }

    /* what is still yours on a played show (the debrief, the thanks): the record only lists what is done, and the night's
       own page with these buttons is gone once you leave it, so they are here too */
    function afterTodo(s, v) {
      var open = (v.jobs || []).filter(function (j) { return mine(j) && j.mode !== 'PROMISE' && !(j.window && (j.window.state === 'EARLY' || j.window.state === 'MISSED')); });
      if (!open.length) return null;
      return h('div', { class: 'cb-aftertodo', role: 'group', aria: { label: T('card', 'stillYours') } }, [
        h('p', { class: 'cb-typed cb-aftertodo-h', text: T('card', 'stillYours') })
      ].concat(open.map(function (j) {
        var can = canNow(s, j.id, jobOpts(j));
        return h('div', { class: 'cb-aftertodo-row' }, [
          h('span', { class: 'cb-typed', text: j.label }),
          costAct({ text: T('card', 'doNow'), label: T('card', 'doNowL', { job: j.label }), fk: 'after-' + j.id, hours: can.hours || j.hours || 0, refusal: can, size: 12, fn: function () { doJob(j); } })
        ]);
      })));
    }
    /* a cancelled show's receipt: who it reaches and what they will remember, and the one press that tells them tonight (fix list 2.13) */
    function cancelReceipt(s, show) {
      var c = show.cancelled, names, kids = [];
      if (!c) return null;
      names = (c.affected || []).map(function (a) { return a.name; });
      kids.push(D.word(T('show', 'cancelHead'), 18));
      kids.push(h('p', { class: 'cb-typed', text: names.length ? T('show', 'cancelWho', { list: names.join(', ') }) : T('show', 'cancelNobody') }));
      kids.push(h('p', { class: 'cb-typed cb-small', text: c.costs ? T('show', 'cancelCost', { room: c.room || 'The room' }) : T('show', 'cancelFree') }));
      if (names.length && !c.told) kids.push(costAct({ text: T('show', 'tellOff'), label: T('show', 'tellOffL'), fk: 'tell-off', hours: mailH(), size: 13, fn: function () { act(function (x) { return SB.Shows.tellOff(x, show.id); }); } }));
      else if (c.told) kids.push(h('p', { class: 'cb-typed', text: T('show', 'cancelTold') }));
      return piece('cb-cancelled', 'manila', kids, { label: T('show', 'cancelHead') });
    }
    function after(s, v) {
      var show = v.show, onNote = function (key) { SB.UI.go('notebook', { key: key }); };
      /* the night's record, pasted up (js/ui/screens/showrecord.js); the ruled ledger below if that file is missing */
      if (show.result && typeof SB.UI.showRecord === 'function') return h('div', { class: 'cb-show is-after' }, [
        showHead(s, show, v.room, T('show', 'back'), function () { SB.UI.go('shows'); }),
        afterTodo(s, v),
        SB.UI.showRecord(s, v, { onNote: onNote, jobs: v.jobs || [] })
      ]);
      return h('div', { class: 'cb-show is-after' }, [
        showHead(s, show, v.room, T('show', 'back'), function () { SB.UI.go('shows'); }),
        cancelReceipt(s, show),
        h('h2', { class: 'cb-sr', text: T('show', 'result') }),
        piece('cb-result', 'white', [show.result ? C().ShowResult({ show: show, onNote: function (key) { SB.UI.go('notebook', { key: key }); } }) : C().Empty({})]),
        h('ul', { class: 'cb-notes' }, (v.jobs || []).filter(function (j) { return j.status === 'DONE'; }).map(function (j, i) {
          return piece('cb-note', i % 2 ? 'bone' : 'white', [D.art(D.mark('DONE', 20), 22, 22), h('span', { class: 'cb-typed', text: j.label + (j.text ? ': ' + j.text : '') })], { tag: 'li' });
        }))
      ]);
    }

    /* the room: ask for a night: pick a key, pick a day, text the room to hold it */
    function holdForm(s, v) {
      var rooms = safe(function () { return SB.Rooms.list(s, { bookable: true }); }, []), lo, hi;
      if (ui.roomId == null || rooms.indexOf(ui.roomId) < 0) ui.roomId = (v.show.roomId && rooms.indexOf(v.show.roomId) >= 0) ? v.show.roomId : (rooms[0] || null);
      if (ui.day == null) ui.day = v.show.day;
      lo = Math.max(s.clock.day + 1, v.show.day - 14); hi = lo + 28;
      if (!rooms.length) return null;
      function move(d) { ui.day = Math.max(lo, Math.min(hi, ui.day + d)); render(); }
      var rv = v.show.requestId ? safe(function () { return SB.Requests.view(s, v.show.requestId); }, null) : null, asked = rv && rv.dates ? rv.dates.filter(function (d) { return d.day > s.clock.day; }) : [];
      return h('div', { class: 'cb-holdform' }, [
        asked.length > 1 ? D.tabs({ label: T('card', 'theirNights'), title: T('card', 'theirNights'), items: asked.map(function (d) {
          return { text: SB.time.fmt(d.day, 'dow3') + ' ' + md(d.day), label: SB.time.fmt(d.day, 'long') + (d.clash && d.clash.length ? ', ' + d.clash.join(', ') : ''), on: ui.day === d.day, fk: 'rq-' + d.day, onClick: function () { ui.day = d.day; render(); } };
        }) }) : null,
        D.tabs({ label: T('show', 'room'), items: rooms.map(function (id) {
          var r = s.rooms[id], gl = safe(function () { return SB.Identity.roomGlyph(r.kind, 22); }, '');
          return { text: String(r.name).slice(0, 16), label: T('show', 'pickRoom', { room: String(r.name).replace(/^the\s+/i, '') }) + ', ' + word('room.' + r.kind + '.name', lower(r.kind)) + (num(r.cap) ? ', ' + r.cap : ''),
                   on: ui.roomId === id, fk: 'kp-' + id, art: gl ? '<g style="color:' + (ui.roomId === id ? D.PAPER : D.TONER) + '">' + D.place(gl, 0, 0) + '</g>' : '', w: 22, ah: 24, onClick: function () { ui.roomId = id; render(); } };
        }) }),
        roomFactsEl(s, ui.roomId),
        h('div', { class: 'cb-dayctl' }, [
          D.tabs({ label: SB.time.fmt(ui.day, 'short'), items: [{ text: '<', label: T('shows', 'earlier'), fk: 'hd-prev', onClick: function () { move(-1); } }] }),
          D.art(datePage(ui.day, 70), 70, 80),
          D.tabs({ label: SB.time.fmt(ui.day, 'short'), items: [{ text: '>', label: T('shows', 'later'), fk: 'hd-next', onClick: function () { move(1); } }] }),
          costAct({ text: T('show', 'holdRoom'), label: T('show', 'holdRoomL', { room: roomName(s, ui.roomId), d: SB.time.fmt(ui.day, 'short') }), fk: 'hold', hours: mailH(), fn: doHold, tut: 'card-hold', tutRef: showId })
        ])
      ]);
    }

    /* what a night at a room is like, in plain sentences: how many fit, the curfew, the host, parking, neighbors, PA, who can come (fix list 2.17) */
    function roomFactsEl(s, roomId) {
      var card = roomId ? safe(function () { return SB.Rooms.card(s, roomId); }, null) : null, lines = card && SB.UI.roomFacts ? SB.UI.roomFacts(card) : [];
      if (!lines.length) return null;
      return h('ul', { class: 'cb-needs cb-roomfacts', aria: { label: T('show', 'room') } }, lines.map(function (t) { return h('li', null, h('span', { class: 'cb-typed cb-small', text: t })); }));
    }
    /* the other rooms in town, each with what it would take to get a night there (fix list 4.2) */
    function roomLadder(s) {
      var ids = safe(function () { return SB.Rooms.list(s, { open: true }); }, []), ok = safe(function () { return SB.Rooms.list(s, { bookable: true }); }, []), rows = [];
      ids.forEach(function (id) {
        var card, how;
        if (ok.indexOf(id) >= 0) return;
        card = safe(function () { return SB.Rooms.card(s, id); }, null);
        how = card && SB.UI.roomHow ? SB.UI.roomHow(card) : [];
        if (how.length) rows.push({ name: card.name, how: how[0] });
      });
      if (!rows.length) return null;
      return h('div', { class: 'cb-roomladder' }, [
        h('p', { class: 'cb-typed cb-small', text: T('show', 'roomsLater') }),
        h('ul', { class: 'cb-needs is-greyed' }, rows.slice(0, 7).map(function (r) { return h('li', null, h('span', { class: 'cb-typed cb-small', text: r.name + ': ' + r.how })); }))
      ]);
    }
    /* the house rules on the table (fix list 2.18): read on show one, picked from a short list from show two */
    var RULE_DEFAULT = ['ALL_AGES', 'NO_STREET_DRINKS', 'PARK_ON_STREET', 'MUSIC_OFF', 'GIVE_AT_DOOR'], RULE_ALL = RULE_DEFAULT.concat(['NO_GLASS', 'NO_SMOKING']);
    function houseRulesEl(s, v, room) {
      var show = v.show, keys, pick = rungShows(s, 'houseRulesPick') && LIVE[show.status] && !show.bill.locked, t = num(room.curfew) ? SB.time.clock(room.curfew) : '', allAges = (room.ages || []).indexOf('ALL') >= 0, avail;
      if (room.kind !== 'HOUSE' && room.kind !== 'OUTDOOR') return null;
      avail = RULE_ALL.filter(function (k) { return k !== 'ALL_AGES' || allAges; });
      keys = (show.houseRules || RULE_DEFAULT).filter(function (k) { return avail.indexOf(k) >= 0; });
      if (!pick) return h('div', { class: 'cb-houserules' }, [
        D.typed(T('show', 'houseHead'), 12, { bold: true }),
        h('p', { class: 'cb-typed cb-small', text: T('show', 'houseRead') }),
        h('ul', { class: 'cb-needs' }, keys.map(function (k) { return h('li', null, h('span', { class: 'cb-typed cb-small', text: T('show', 'houseRule.' + k, { t: t }) })); }))
      ]);
      return h('div', { class: 'cb-houserules' }, [
        D.typed(T('show', 'houseHead'), 12, { bold: true }),
        h('p', { class: 'cb-typed cb-small', text: T('show', 'housePick') }),
        h('div', { class: 'cb-hrpick' }, avail.map(function (k) {
          var on = keys.indexOf(k) >= 0, line = T('show', 'houseRule.' + k, { t: t });
          return h('div', { class: 'cb-dealopt' + (on ? ' is-on' : '') }, [
            D.tickThing({ on: on, text: line.split('.')[0].toUpperCase(), label: line, fk: 'hr-' + k, onClick: function () {
              var nk = on ? keys.filter(function (x) { return x !== k; }) : keys.concat([k]);
              act(function (x) { return SB.Shows.setHouseRules(x, showId, nk); });
            } }),
            h('p', { class: 'cb-typed cb-small', text: line })
          ]);
        }))
      ]);
    }
    function roomSection(s, v) {
      var show = v.show, room = v.room, kids = [], asks = asksFor(s, showId), ha = askOf(asks, function (a) { return a.kind === 'ROOM_HOLD'; }), ar;
      function takeBack(a) { return D.act(T('card', 'takeBack'), T('card', 'takeBackL'), 'take-back', function () { act(function (x) { return SB.Mail.withdraw(x, a.id); }); }, { size: 11 }); }
      if (!room && ha && OPEN_ASK[ha.status] && s.rooms && s.rooms[ha.toId]) {
        /* the hold is asked for: what was asked, how it stands, take it back; another night stays possible, folded away */
        ar = s.rooms[ha.toId];
        kids.push(D.art(keyTag(ar, 230), 230, 70));
        kids.push(h('p', { class: 'cb-typed', text: T('card', 'holdAsked', { room: ar.name, d: SB.time.fmt(ha.payload && num(ha.payload.day) ? ha.payload.day : show.day, 'long') }) + ' ' + T('card', ha.status === 'QUEUED' ? 'holdQueued' : 'holdSent', { day: SB.time.fmt(num(ha.queuedDay) ? ha.queuedDay : ha.sentDay, 'dow') }) }));
        kids.push(h('div', { class: 'cb-row' }, [takeBack(ha)]));
        kids.push(h('details', { class: 'cb-fold' }, [h('summary', { class: 'pz-hl' }, [D.stripArt(T('show', 'holdOther'), 11)]), holdForm(s, v)]));
      } else if (!room) {
        kids.push(D.art(K().cutout([[14, 6], [26, 6], [26, 30], [36, 34], [36, 40], [14, 40]], '', { seed: 'hook', edge: 3 }) + D.marker(T('show', 'noRoom'), 48, 36, 20, { seed: 'nr' }), D.mw(T('show', 'noRoom'), 20) + 64, 48));
        kids.push(holdForm(s, v));
        kids.push(roomLadder(s));
      } else {
        kids.push(D.thing({ cls: 'cb-roomkey', label: room.name + ', ' + word('room.' + room.kind + '.name', lower(room.kind)) + (num(room.cap) ? ', ' + room.cap : '') + (show.hold && num(show.hold.rank) ? ', ' + T('show', 'rank', { n: show.hold.rank }).toLowerCase() : ''),
          fk: 'roomkey', svg: keyTag(room, 230), w: 230, h: 70, onClick: function () { SB.UI.go('room', { roomId: room.id }); } }));
        if (show.hold && num(show.hold.rank)) { ar = show.hold.rank > 1 ? T('card', 'st.HELDN', { n: show.hold.rank }) : T('card', 'st.HELD'); kids.push(D.art(D.marker(ar, 4, 24, 18, { seed: 'rk', fill: show.hold.rank > 1 ? D.hot() : D.TONER }), D.mw(ar, 18) + 12, 32)); }
        if (show.status === 'DRAFT') {
          if (v.needsToConfirm && v.needsToConfirm.some(function (n) { return !n.met; })) kids.push(h('p', { class: 'cb-typed cb-small', text: T('show', 'needs') + ':' }));
          if (v.needsToConfirm && v.needsToConfirm.length) kids.push(h('ul', { class: 'cb-needs', aria: { label: T('show', 'needs') } }, v.needsToConfirm.map(function (n) {
            return h('li', { class: n.met ? 'is-met' : '' }, [D.art(D.mark(n.met ? 'DONE' : 'TODO', 16), 18, 18), h('span', { class: 'cb-typed cb-small', text: n.text })]);
          })));
          /* no confirm ask: their yes books it the day they have what they asked for (Rooms.firmUp) */
          if (show.hold && show.hold.rank === 1 && !(v.needsToConfirm || []).some(function (n) { return !n.met; })) kids.push(h('p', { class: 'cb-typed', text: T('show', 'needsMet') }));
          kids.push(h('div', { class: 'cb-row' }, [
            D.act(T('show', 'release'), T('show', 'releaseL'), 'release', function () { act(function (x) { return SB.Rooms.release(x, showId); }); }, { size: 11 })
          ]));
        }
        kids.push(roomFactsEl(s, room.id));
        /* the first house booking: one short text from the person who handed the scene over, not a lesson */
        if (room.kind === 'HOUSE' && !((s.player && s.player.showsPlayed) > 0)) {
          var mid = safe(function () { return SB.Rungs.mentor(s); }, null), mn = mid ? first(s, mid) : '';
          kids.push(h('p', { class: 'cb-typed cb-small cb-mentortext', text: (mn ? mn + ': ' : '') + T('show', 'firstHouse') }));
        }
        kids.push(houseRulesEl(s, v, room));
        kids.push(insuranceRow(s, v));
        kids.push(h('details', { class: 'cb-fold' }, [h('summary', { class: 'pz-hl' }, [D.stripArt(T('show', 'holdOther'), 11)]), holdForm(s, v), roomLadder(s)]));
      }
      return piece('cb-roompiece', 'bone', kids, { label: T('show', 'room') });
    }

    function v0Room() { var sh = st().shows && st().shows[showId]; return sh && sh.roomId && st().rooms ? st().rooms[sh.roomId] : null; }

    /* 13-real-booking part 3: what the night has to draw before you are even, at the deal and price as they stand (over: unsaved choices) */
    function evenLine(over, o) {
      var b = safe(function () { return SB.Forecast.breakEven(st(), showId, over); }, null), lines;
      if (!b || !b.guess) return null;
      lines = offerSentences(b, Object.assign({ shape: b.shape, guarantee: (over && over.guarantee) || 0, pct: over && over.share,
        billN: safe(function () { return (st().shows[showId].bill.slots || []).length; }, 0) }, o || {}), v0Room());
      if (!lines.length) return null;
      return h('p', { class: 'cb-typed cb-small cb-even' + (!b.hat && !b.split && b.even > b.hi ? ' is-late' : ''), role: 'note', data: { fk: 'even' }, text: lines.join(' ') });
    }

    function doorSection(s, v) {
      var show = v.show, door = show.door, room = v.room, ages = room && room.ages && room.ages.length ? room.ages : Object.keys(SB.Enums.AGES), kids = [], price = door.price || 0, pt;
      function setPrice(p) { p = Math.max(0, Math.min(100, Math.round(Number(p) || 0))); act(function (x) { return SB.Shows.setDoor(x, showId, { price: p }); }); }
      pt = money(price);
      var tagSvg = K().paper(0, 0, 0, 0, { pts: [[16, 30], [40, 6], [150, 8], [148, 74], [40, 76]], stock: 'manila', burn: 0.6, sx: 4, sy: 6,
          inner: '<circle cx="36" cy="40" r="5" fill="#141413"/>' + D.marker(pt, 98, 62, 40, { anchor: 'middle', seed: 'price' + price, maxWidth: 96 }) }) +
        K().path([[0, 4], [18, 26], [34, 40]], { seed: 'ps', sw: 1.6, stroke: '#141413' });
      kids.push(D.word(T('show', 'price'), 14));
      kids.push(h('div', { class: 'cb-pricerow' }, [
        ui.editPrice ? h('input', { type: 'number', class: 'cb-priceedit', min: '0', max: '100', step: '1', value: String(price), aria: { label: T('show', 'price') }, data: { fk: 'price' },
          on: { change: function (e) { ui.editPrice = false; setPrice(e.target.value); }, blur: function () { if (ui.editPrice) { ui.editPrice = false; render(); } },
                keydown: function (e) { if (e.key === 'Escape') { ui.editPrice = false; render(); } } } })
          : D.thing({ cls: 'cb-pricetag', label: T('show', 'priceL', { p: money(price) }), fk: 'price', svg: tagSvg, w: 156, h: 84, strip: '$', stripSize: 11,
              onClick: function () { ui.editPrice = true; render(); var el = root.querySelector('.cb-priceedit'); if (el) { try { el.focus(); el.select(); } catch (e) { /* fine */ } } } }),
        D.tabs({ label: T('show', 'price'), items: [
          { text: '-$1', label: T('show', 'cheaper'), fk: 'p-', onClick: function () { setPrice(price - 1); } },
          { text: '+$1', label: T('show', 'dearer'), fk: 'p+', onClick: function () { setPrice(price + 1); } }] }),
        D.tickThing({ on: !!door.donation, text: T('show', 'donation'), label: T('show', 'donationL'), fk: 'don', onClick: function () { var on = !door.donation; act(function (x) { return SB.Shows.setDoor(x, showId, { donation: on }); }); } })
      ]));
      kids.push(evenLine(null));
      /* the ages as a stamp inked on the sheet; the choices torn off below it */
      kids.push(h('div', { class: 'cb-agesrow' }, [
        /* the ALL AGES stamp opens its note on the first press (fix-list 1.2 step 7) */
        door.ages === 'ALL' ? h('span', { class: 'cb-agesterm', tabindex: '0', data: { term: 'allAges', termNote: '1' }, aria: { label: word('ages.ALL', 'all ages') } },
          D.art(D.stamp(word('ages.' + door.ages, door.ages), 6, 6, 18, { rot: -6 }), D.stampW(word('ages.' + door.ages, door.ages), 18) + 20, 52))
          : D.art(D.stamp(word('ages.' + door.ages, door.ages), 6, 6, 18, { rot: -6 }), D.stampW(word('ages.' + door.ages, door.ages), 18) + 20, 52),
        D.tabs({ label: T('show', 'ages', { a: word('ages.' + door.ages, door.ages) }), items: ages.map(function (k) {
          return { text: word('ages.' + k, k), label: word('ages.' + k, k), on: door.ages === k, fk: 'age-' + k, onClick: function () { act(function (y) { return SB.Shows.setDoor(y, showId, { ages: k }); }); } };
        }) })
      ]));
      kids.push(D.tabs({ label: T('show', 'label', { l: word('label.' + show.label, lower(show.label)) || T('show', 'normal') }), items: Object.keys(SB.Enums.LABEL).map(function (k) {
        var t = (word('label.' + k, lower(k)) || T('show', 'normal'));
        return { text: t, label: t.toLowerCase(), on: show.label === k, fk: 'lab-' + k, onClick: function () { act(function (y) { return SB.Shows.setLabel(y, showId, k, null); }); } };
      }) }));
      if (door.address != null) kids.push(D.tabs({ label: T('show', 'address'), title: T('show', 'address'), items: Object.keys(SB.Enums.ADDRESS).map(function (k) {
        return { text: word('address.' + k + '.name', lower(k)), label: word('address.' + k + '.name', lower(k)) + '. ' + word('address.' + k + '.says', ''), on: door.address === k, fk: 'addr-' + k,
                 onClick: function () { act(function (x) { return SB.Shows.setDoor(x, showId, { address: k }); }); } };
      }) }));
      return piece('cb-door', 'white', kids, { label: T('show', 'price') });
    }

    /* what you have spent or planned on telling people and feeding the band, and the sound nobody is hired for yet (fix list 1.5): the break-even counts all of it */
    function costNote(ex) {
      var parts = [], be = safe(function () { return SB.Forecast.breakEven(st(), showId); }, null), spent = { PRINT: 1, PROMO: 1, FOOD: 1, HELPER: 1, FLYER: 1, MOTEL: 1 }, t = [];
      ((ex && ex.lines) || []).forEach(function (l) { if (spent[l.cat]) parts.push((l.label || lower(l.cat)) + ' ' + money(l.amount || 0)); });
      if (parts.length) t.push(word('offer.extrasHead', '', { list: parts.join(', ') }) + '.');
      ((be && be.extras) || []).forEach(function (l) { if (l.k === 'SOUND' && l.guess) t.push(word('offer.extraSound', '', { amount: l.amount }).replace(/^./, function (c) { return c.toUpperCase(); }) + ', not hired yet.'); });
      return t.length ? h('p', { class: 'cb-typed cb-small cb-spent', data: { fk: 'spent' }, text: t.join(' ') }) : null;
    }
    function dealSection(s, v) {
      var d = v.deal || {}, ex = safe(function () { return SB.Money.exposure(s, showId); }, null), t = word('deal.' + (d.shape || 'DOOR') + '.words', lower(d.shape), { amount: d.guarantee || 0, pct: Math.round((d.pct || 0) * 100) }),
          bills = ex && num(ex.total) ? Math.max(0, Math.min(8, Math.ceil(ex.total / 40))) : 0, out = '', i;
      for (i = 0; i < bills; i++) out += K().paper(6 + i * 8, 8 + (i % 2) * 3, 56, 28, { seed: 'eb' + i, stock: '#b9c4a6', rot: -6 + i * 2, sx: 2, sy: 3, burn: 0.3, inner: '<path d="M' + (20 + i * 8) + ' 22h28" stroke="#141413" stroke-opacity=".4" stroke-width="5"/>' });
      if (ex && num(ex.total)) out += D.marker(money(ex.total), 80 + bills * 8, 34, 22, { seed: 'ex' });
      return piece('cb-deal', 'manila', [
        h('div', { class: 'cb-dealslip' }, [
          D.art(d.written ? K().path([[4, 24], [26, 4], [32, 10], [10, 30]], { seed: 'pen', sw: 2.4 }) + K().scrawl(6, 32, 36, { seed: 'sig', sw: 1.6 }) : K().heart(20, 18, 22, { seed: 'hs', fill: 'none' }), 46, 38),
          h('p', { class: 'cb-typed', text: t + ', ' + (d.written ? T('show', 'written') : T('show', 'handshake')) })
        ]),
        evenLine(null),
        ex ? h('div', { class: 'cb-iou', role: 'img', aria: { label: T('show', 'exposure') + ': ' + (num(ex.total) ? money(ex.total) : '?') } }, [D.art(out, 220, 48),
          h('p', { class: 'cb-typed cb-small', aria: { hidden: 'true' }, text: (ex.lines || []).map(function (l) { return (l.label || lower(l.cat)) + ' ' + money(l.amount || 0); }).join(' / ') })]) : null,
        costNote(ex)
      ], { label: T('show', 'deal') });
    }

    function flyerSection(s, v, r) {
      var thumb = null, j = r && r.job;
      if (SB.UI.parts.flyerThumb) thumb = safe(function () { return D.thumb({ recipe: (v.show.flyer && v.show.flyer.recipe) || null, spec: SB.Jobs.flyerSpec(s, showId) }, 200); }, null);
      /* what to do about it first (the words, then making it: a job), the paste-up itself under that */
      return h('div', { class: 'cb-flyerclip' }, [
        h('p', { class: 'cb-typed cb-flyernote', text: T('card', v.show.promo && v.show.promo.flyer ? 'flyerMade' : (v.show.flyer && v.show.flyer.recipe ? 'flyerPasted' : 'flyerNone')) }),
        j && j.status !== 'MOOT' && r.pasted ? h('ol', { class: 'cb-notes cb-flyerjob', data: { tut: 'promo-jobs', 'tut-ref': showId } }, [jobNote(s, j, 0)]) : null,
        h('button', { type: 'button', class: 'cb-thing pz-hl has-strip cb-flyerbtn', aria: { label: T('show', 'flyerDesk') }, data: { fk: 'flyer', tut: 'show-flyer', 'tut-ref': showId }, on: { click: function () { SB.UI.go('flyerdesk', { showId: showId }); } } },
          [D.stripArt(T('show', 'flyerDeskT') || 'FLYER', 11), D.art(K().cutout([[46, 2], [96, 2], [100, 18], [42, 18]], '', { seed: 'bc', edge: 3 }) + K().path([[52, 16], [71, 34], [90, 16]], { seed: 'bcw', sw: 2.4, stroke: '#f4f2ea' }), 140, 36, 'cb-binder'), thumb])
      ]);
    }

    var PROMO_JOBS = { MAKE_FLYER: 1, FLYER_RUN: 1, ANNOUNCE: 1, BANDS_SHARE: 1, PRINT: 1, LISTINGS: 1, LOCAL_AD: 1, MAILING_LIST: 1, HAND_OUT: 1, INVITES: 1, WEEK_PUSH: 1, DAY_OF_POST: 1 };
    /* one job, as the calendar's note says it (js/ui/screens/week.js): what it costs, when it is due (late in hot ink),
       and DO IT TONIGHT; crossed out with the reason when tonight cannot take it. The flyer picks how sharp first. */
    /* 13-real-booking part 3: what waiting until the next night costs this job, from the engine's own loss (heads, by generation) */
    function laterLine(s, j) {
      var sh = s.shows && s.shows[j.showId], today = s.clock.day, next = today + 1, a, b, d = [], tot = 0, g, top = 0, gen = '', m = '', price;
      if (j.group !== 'TELLING' || !sh || next > sh.day) return null;
      a = safe(function () { return SB.Forecast.jobLoss(s, j.id, today); }, null); b = safe(function () { return SB.Forecast.jobLoss(s, j.id, next); }, null);
      if (!a || !b) return null;
      for (g = 0; g < 3; g++) { d[g] = (b[g] || 0) - (a[g] || 0); tot += d[g]; if (d[g] > d[top]) top = g; }
      if (Math.round(tot) < 1) return null;
      if (d[top] >= tot * 0.5 && top !== 1) gen = T('card', top === 0 ? 'laterGenKids' : 'laterGenOld');
      price = sh.door && !sh.door.donation ? sh.door.price : 0;
      if (price > 0) m = T('card', 'laterMoney', { m: money(Math.round(tot) * price) });
      return h('p', { class: 'cb-typed cb-small cb-later', text: T('card', 'laterLoss', { day: SB.time.fmt(next, 'dow'), n: Math.round(tot), gen: gen, money: m }) });
    }
    /* what rough, standard and sharp each buy, before the press (fix list 2.7): the guess's people, from the same Call the card shows */
    function effortNote(s, effs) {
      var show = s.shows[showId], key = JSON.stringify([show.promo && show.promo.flyer, s.week && s.week.plan, s.clock.day, show.bill && show.bill.locked]), e;
      if (ui.effortKey !== key) { ui.effortKey = key; ui.effortVal = safe(function () { return SB.Forecast.flyerEfforts(s, showId); }, null); }
      e = ui.effortVal;
      if (!e) return null;
      return h('ul', { class: 'cb-efforts' }, effs.map(function (k) {
        var n = e[k] || 0, nm = T('card', 'effortWord.' + k), hrs = costT(SB.Config.FLYER.HOURS[k]).toLowerCase();
        return h('li', { class: 'cb-typed cb-small' + (k === effortOf() ? ' is-on' : ''), text: T('show', n > 0 ? 'effortGain' : (n < 0 ? 'effortLoss' : 'effortSame'), { k: nm.charAt(0) + nm.slice(1).toLowerCase(), n: Math.abs(n), h: hrs }) });
      }));
    }
    /* printing before any band has said yes says so on the button (fix-list 3.2 step 3) */
    function printTba(s, j) {
      var sh = j.type === 'PRINT' && s.shows ? s.shows[j.showId || showId] : null;
      return !!(sh && sh.bill && !(sh.bill.slots || []).some(function (x) { return x.confirmed; }));
    }
    function jobNote(s, j, i) {
      var status = j.waived ? 'WAIVED' : j.status, by = byOther(j), todo = j.mode === 'HOURS' && mine(j),
          o = jobOpts(j), can = todo ? canNow(s, j.id, o) : null, hours = can && can.ok ? can.hours : (j.type === 'MAKE_FLYER' && SB.Config.FLYER && SB.Config.FLYER.HOURS ? SB.Config.FLYER.HOURS[effortOf()] : j.hours),
          due = todo && CK() ? CK().due(j, { today: s.clock.day }) : null, effs = todo && j.type === 'MAKE_FLYER' && SB.Config.FLYER && SB.Config.FLYER.HOURS ? Object.keys(SB.Config.FLYER.HOURS) : null, kids;
      kids = [
        h('div', { class: 'cb-note-top' }, [D.art(D.mark(status, 18), 20, 20),
          h('span', { class: 'cb-typed cb-jobl', text: j.label }),
          todo && costT(hours) ? h('span', { class: 'cc-note-cost', text: costT(hours) }) : null,
          todo && pricedOpt(j) ? h('span', { class: 'cc-note-cost', text: money((pricedOpt(j).choices.filter(function (c) { return c.key === optOf(j); })[0] || { cost: 0 }).cost) }) : null,
          due ? h('span', { class: 'cc-note-due' + (due.late ? ' is-late' : ''), text: due.text }) : null,
          h('span', { class: 'cb-sr', text: ' ' + word('jobStatus.' + j.status, lower(j.status)) + (j.window && j.window.label ? ', ' + j.window.label : '') })]),
        todo && can && can.ok ? laterLine(s, j) : null,
        /* 1.12: what it buys, what it waits on, and a job that will not fit tonight says so before the press */
        j.reach && (status === 'TODO' || status === 'PLANNED') ? h('p', { class: 'cb-typed cb-small cb-reach', text: j.reach }) : null,
        j.blocker && status !== 'DONE' ? h('p', { class: 'cb-typed cb-small cb-blocker', text: j.blocker }) : null,
        j.window && j.window.lateCost && todo ? h('p', { class: 'cb-typed cb-small cb-latecost', text: j.window.lateCost }) : null,
        todo && j.noFit ? h('p', { class: 'cb-typed cb-small cb-nofit-line', text: j.noFit }) : null,
        j.waived ? h('p', { class: 'cb-typed cb-small', text: j.text || word('jobs.waived', T('show', 'waived')) }) : null,
        by ? h('p', { class: 'cb-typed cb-small cb-hasit', text: T('card', 'hasIt', { name: j.planned.byName || first(s, by) || '' }) }) : null,
        j.status === 'DONE' && j.text ? h('p', { class: 'cb-typed cb-small', text: j.text }) : null,
        todo && pricedOpt(j) ? D.tabs({ label: T('card', 'priced'), title: T('card', 'priced'), size: 11, items: pricedOpt(j).choices.map(function (c) {
          return { text: c.label, label: c.label + (c.why ? '. ' + c.why : ''), on: optOf(j) === c.key, disabled: !c.enabled, fk: 'opt-' + j.id + '-' + c.key,
                   onClick: function () { ui.opts = ui.opts || {}; ui.opts[j.id] = c.key; render(); } };
        }) }) : null,
        effs ? D.tabs({ label: T('card', 'effort'), title: T('card', 'effort'), size: 11, items: effs.map(function (k) {
          return { text: tag(T('card', 'effortWord.' + k), SB.Config.FLYER.HOURS[k]), label: T('card', 'effortWord.' + k).toLowerCase() + ', ' + costT(SB.Config.FLYER.HOURS[k]).toLowerCase(), on: effortOf() === k, fk: 'eff-' + k,
                   onClick: function () { ui.effort = k; render(); } };
        }) }) : null,
        effs ? effortNote(s, effs) : null,
        todo ? h('div', { class: 'cb-row cb-donow' }, [
          costAct({ text: printTba(s, j) ? T('card', 'printTba') : T('card', 'doNow'), label: (printTba(s, j) ? T('card', 'printTba') + '. ' : '') + T('card', 'doNowL', { job: j.label }),
                    fk: 'now-' + j.id, hours: hours, refusal: can, size: 12, tut: 'card-donow', tutRef: j.id, fn: function () { doJob(j); } }),
          can && can.ok && can.overtime > 0 ? h('span', { class: 'cb-typed cb-small cb-stayup', text: T('card', 'stayUp', { n: costT(can.overtime).toLowerCase(), s: Math.round(((SB.Config.STRESS && SB.Config.STRESS.UP && SB.Config.STRESS.UP.OVERTIME) || 3) * can.overtime) }) }) : null
        ]) : null
      ];
      return piece('cb-note is-' + String(status).toLowerCase() + (due && due.late ? ' is-late' : ''), status === 'DONE' || status === 'WAIVED' ? 'newsprint' : (i % 2 ? 'bone' : 'white'), kids,
        { tag: 'li', data: j.type === 'LOCK_BILL' ? { tut: 'bill-lock', 'tut-ref': showId } : (PROMO_JOBS[j.type] ? { tut: 'promo-job', 'tut-ref': j.id } : null) });
    }
    function jobList(s, v, list, tut) {
      return h('section', { class: 'cb-jobs' }, [
        h('ol', { class: 'cb-notes', data: { tut: tut, 'tut-ref': showId } }, list.map(function (j, i) { return jobNote(s, j, i); })),
        !list.length ? h('p', { class: 'cb-typed cb-pickhint', text: T('card', 'noJobs') }) : null
      ]);
    }

    function riders(list, labelKey, played) {
      if (!list || !list.length) return null;
      return piece('cb-riders', 'white', [D.word(T('show', labelKey), 13)].concat(list.map(function (r) {
        var on = r.status === 'PROMISED' || r.status === 'DONE' || !!r.planned;
        /* 1.22: the food is two buttons, each with its price; pressing the one that is on takes it back */
        if (r.type === 'FOOD' && r.opt && r.opt.choices) return h('span', { class: 'cb-foodpair', role: 'group', aria: { label: r.label } }, r.opt.choices.map(function (c) {
          var mine = on && r.opt.chosen === c.key;
          return D.tickThing({ on: mine, disabled: r.status === 'DONE' || (!c.enabled && !mine), fk: 'rd-' + r.id + '-' + c.key, text: c.label, label: c.label + (c.why ? '. ' + c.why : ''),
            onClick: function () { SB.UI.act(function (x) { return SB.Jobs.promise(x, r.id, !mine, c.key); },
              { say: !mine ? T('show', 'foodOn', { what: String(c.label).charAt(0).toLowerCase() + String(c.label).slice(1) }) : T('show', 'foodOff') }); } });
        }));
        return D.tickThing({ on: on, disabled: r.status === 'DONE', fk: 'rd-' + r.id, text: r.label + (r.cost ? ' ' + money(r.cost.lo) : ''),
          label: r.label + (r.cost ? ' (' + money(r.cost.lo) + (r.cost.hi !== r.cost.lo ? '-' + money(r.cost.hi) : '') + ')' : '') + (r.text && played ? '. ' + r.text : ''),     // how it went is told after the night, not while the promise still stands
          onClick: function () { SB.UI.act(function (x) { return SB.Jobs.promise(x, r.id, !on); }, { say: T('show', on ? 'riderOff' : 'riderOn', { what: r.label }) }); } });
      })), { role: 'group', label: T('show', labelKey) });
    }

    /* the friend's chores on a guided start (SB.Rungs): one note, ticked as they get done */
    function coveredNote(cov) {
      var name = cov[0].coveredName || '', seen = {}, labels = [];
      cov.forEach(function (j) { if (!seen[j.label]) { seen[j.label] = true; labels.push(j.label + (j.status === 'DONE' ? ' \u2713' : '')); } });
      return piece('cb-note cb-covered', 'newsprint', [
        h('div', { class: 'cb-note-top' }, [h('span', { class: 'cb-typed cb-jobl', text: T('show', 'covered', { name: name }) })]),
        h('p', { class: 'cb-typed cb-small', text: T('show', 'coveredL', { name: name, list: labels.join(', ') }) })
      ], { tag: 'div' });
    }

    /* the PROMO row's picker (promo true): the jobs that get the word out. The PREP row's (promo false): the other work that
       takes hours, and what you promise on the advance and on the night. Booking jobs (answer, hold, ask, confirm) are the
       card's own rows, so they are in neither. The one the texts point at first, then what is to do, then what is done. */
    function jobsSection(s, v, promo) {
      var all = (v.jobs || []).filter(function (j) { return (j.group === 'TELLING') === promo && (promo || j.mode === 'HOURS') && j.type !== 'MAKE_FLYER' && j.type !== 'LOCK_BILL'; }), jobs = all.filter(function (j) { return !j.covered && !j.hidden; }),
          cov = all.filter(function (j) { return j.covered && j.status !== 'MOOT'; }),
          main = jobs.filter(function (j) { return !j.optional && !j.more && j.mode !== 'PROMISE'; }),
          opt = jobs.filter(function (j) { return (j.optional || j.more) && j.mode !== 'PROMISE'; }), adv = [], night = [], played = !!(s.shows[showId] && s.shows[showId].status === 'PLAYED');
      (v.jobs || []).forEach(function (j) { if (j.covered || j.hidden) return; (j.riders || []).forEach(function (r) { if ((r.group === 'TELLING') === promo) (j.type === 'ADVANCE' ? adv : night).push(r); }); });
      main = sortJobs(s, main);                                   // what is due soonest first (late before all); what is done last
      return h('section', { class: 'cb-jobs' }, [
        h('ol', { class: 'cb-notes', data: { tut: promo ? 'promo-jobs' : 'prep-jobs', 'tut-ref': showId } }, main.map(function (j, i) { return jobNote(s, j, i); })),
        cov.length ? coveredNote(cov) : null,
        adv.length ? riders(adv, 'advance', played) : null,
        night.length ? riders(night, 'night', played) : null,
        opt.length ? h('details', { class: 'cb-fold' }, [h('summary', { class: 'pz-hl' }, [D.stripArt(promo ? T('card', 'moreWays', { n: opt.length }) : T('show', 'ifYouWant'), 11)]), h('ul', { class: 'cb-notes is-optional' }, sortJobs(s, opt).map(function (j, i) { return jobNote(s, j, i); }))]) : null,
        !main.length && !cov.length && !adv.length && !night.length && !opt.length ? h('p', { class: 'cb-typed cb-pickhint', text: T('card', 'noJobs') }) : null
      ]);
    }

    function crewRow(s, v, role, labelKey) {
      var list = safe(function () { return SB.People.crew(s, role, showId); }, []), cur = v.show.crew[role], yes = {}, out = {}, said = {}, curName, flag, noMsg = !!canMsg && canMsg.ok === false, anyAsk = false, houseOpt = false, items;
      asksFor(s, showId).forEach(function (a) {
        if (a.kind !== 'CREW' || (a.payload && a.payload.role && a.payload.role !== role)) return;
        if (a.status === 'YES') yes[a.toId] = true;
        else if (a.status === 'QUEUED' || a.status === 'SENT') out[a.toId] = a.status;
        else if (a.status === 'NO' || a.status === 'SILENT') said[a.toId] = true;
      });
      curName = cur ? (cur === 'player' ? T('show', role === 'sound' ? 'soundHouseOn' : 'you') : (s.people[cur] ? (s.people[cur].first || '') : '')) : T('show', 'nobody');
      /* a house or a DIY room with no PA fee: the house PA, or a friend who knows a board, for nothing (design call D2.16) */
      houseOpt = role === 'sound' && safe(function () { var t = SB.Rooms.terms(s, v.show.roomId, showId); return !!v.show.roomId && !(t && t.soundFee > 0); }, false);
      /* nobody on sound yet: the highlighter and "!!" until somebody says yes (security only where the room requires it) */
      if (!cur && (role === 'sound' || (v.security && v.security.required))) {
        flag = T('show', role === 'sound' ? 'noSound' : 'noSecurity2').toUpperCase();
        flag = h('span', { class: 'cb-noflag', role: 'img', aria: { label: flag } }, D.art(D.swipe(0, 16, D.mw(flag, 15) + 34, 20) + D.marker(flag + ' !!', 4, 22, 15, { fill: D.hot() }), D.mw(flag + ' !!', 15) + 14, 32));
      }
      return h('div', { class: 'cb-crewrow', role: 'group', aria: { label: T('show', labelKey) + ': ' + curName }, data: role === 'sound' ? { tut: 'crew-sound', 'tut-ref': showId } : null }, [
        h('span', { class: 'cb-crewcur' }, [D.word(T('show', labelKey), 13), D.art(cur && cur !== 'player' ? D.face(cur, 40) : '<path d="M3 3h34v34h-34z" fill="none" stroke="#141413" stroke-width="1.6" stroke-dasharray="4 3"/>', 40, 40),
          h('span', { class: 'cb-typed cb-small', text: curName })]),
        flag || null,
        list.length || houseOpt ? D.tabs({ label: T('show', labelKey), items: list.map(function (p) {
          var isOn = cur === p.personId, canPut = !!yes[p.personId], waiting = out[p.personId], lab, asks, tooLate;
          lab = isOn ? T('show', 'on', { name: p.name }) : (canPut ? T('show', 'put', { name: p.name }) : (waiting ? T('show', waiting === 'SENT' ? 'asked' : 'queued', { name: p.name }) :
                (said[p.personId] ? T('show', 'saidNo', { name: p.name }) : (p.busy ? T('show', 'busy', { name: p.name }) : T('show', 'ask', { name: p.name, rate: money(p.rate || 0) })))));
          if (waiting) return { text: String(p.name || '').split(' ')[0] + ' · ' + T('show', waiting === 'SENT' ? 'askedShort' : 'queuedShort'), label: lab, on: false, disabled: true, fk: 'cr-' + role + p.personId,
                                art: D.face(p.personId, 30), w: 30, ah: 32, onClick: function () {} };
          asks = !isOn && !canPut && !p.busy;                    // pressing it writes a message: half an hour of tonight
          if (asks) anyAsk = true;
          /* a message goes out tonight and is answered the next day: for tonight's show it can never be answered in time (fix list 1.8) */
          tooLate = asks && v.show.day - s.clock.day < 1;
          return { text: (canPut && !isOn ? '+ ' : '') + String(p.name || '').split(' ')[0] + ' ' + money(p.rate || 0) + (asks && costT(mailH()) ? ' · ' + costT(mailH()) : ''),
                   label: lab + (asks && costT(mailH()) ? ', ' + costT(mailH()).toLowerCase() : '') + (asks && noMsg ? '. ' + whyT(canMsg) : '') + (tooLate ? '. ' + T('bill', 'answerNever') : ''), on: isOn, disabled: isOn || (!canPut && !!p.busy) || (asks && noMsg) || tooLate, no: (asks && noMsg) || tooLate,
                   fk: 'cr-' + role + p.personId, tut: asks ? 'crew-ask' : null, tutRef: asks ? p.personId : null,
                   art: D.face(p.personId, 30), w: 30, ah: 32,
                   onClick: function () {
                     if (canPut) movedAct(function (x) { return SB.Shows.setCrew(x, showId, role, p.personId); });
                     else doAct(function (x) { return SB.Mail.ask(x, 'CREW', p.personId, { showId: showId, role: role, pay: { kind: 'CASH', amount: p.rate || 0 } }); });
                   } };
        }).concat(houseOpt ? [{ text: T('show', 'soundHouse'), label: T('show', 'soundHouseL'), on: cur === 'player', fk: 'cr-sound-house', disabled: cur === 'player',
                                onClick: function () { movedAct(function (x) { return SB.Shows.setCrew(x, showId, 'sound', 'player'); }); } }] : []), size: 12 }) : null,
        houseOpt ? h('p', { class: 'cb-typed cb-small', text: T('show', 'soundHouseNote') }) : null,
        anyAsk && noMsg ? h('p', { class: 'cb-typed cb-small cb-whynot', text: whyT(canMsg) }) : null
      ]);
    }

    /* security: what the room says (required, recommended, or your call), what it is for, and the cost at a house */
    function securityNote(s, v) {
      var R = v.security, room = v.room ? v.room.name || '' : '', out = [];
      if (!R) return null;
      out.push(R.required ? word('security.required', '', { room: room }) : (R.recommended ? word('security.recommended', '', { why: R.why.map(function (k) { return word('security.why.' + k, lower(k)); }).join(', ') }) : word('security.optional', '')));
      out.push(word('security.what', ''));
      if (!R.required) out.push(word('security.worth', ''));
      if (R.chill) out.push(word('security.chill', ''));
      if (!R.personId) out.push(word('security.none', ''));
      return h('div', { class: 'cb-crewrow' }, [
        h('p', { class: 'cb-typed cb-small', text: out.filter(Boolean).join(' ') }),
        v.show.crew.security ? D.tickThing({ on: false, text: T('show', 'noSecurity'), label: T('show', 'noSecurityL'), fk: 'sec-none', onClick: function () { act(function (x) { return SB.Shows.setCrew(x, showId, 'security', null); }); } }) : null
      ]);
    }
    /* event insurance (fix list 1.22, 1.20): one button with the price on it. Before the room confirms it is only a plan, and the same button takes it back
       for free; once the date is confirmed and it is paid for, it stays, and the row says so. Shown from show two unless the room insists. */
    function insuranceRow(s, v) {
      var I = v.insurance, room = v.room ? v.room.name || '' : '', show = v.show, confirmed = show.status === 'CONFIRMED', bought = I && I.bought > 0, lines, btn = null;
      if (!I || !show.roomId) return null;
      if (!I.required && !rungShows(s, 'insurance')) return null;
      lines = [I.required ? word('insurance.required', '', { room: room }) : word('insurance.optional', ''), word('insurance.what', ''), I.required ? '' : word('insurance.worth', ''),
               bought ? word('insurance.bought', '', { cost: I.bought }) + ' ' + word('insurance.locked', '') : word(confirmed ? 'insurance.costNow' : 'insurance.cost', '', { cost: I.cost })];
      if (!bought && !I.required) {
        btn = I.on ? D.act(word('insurance.drop', '', { cost: I.cost }), word('insurance.drop', '', { cost: I.cost }), 'insure', function () { act(function (x) { return SB.Shows.setInsurance(x, showId, false); }); }, { size: 12 })
                   : D.act(word('insurance.buy', '', { cost: I.cost }), word('insurance.buy', '', { cost: I.cost }), 'insure', function () { movedAct(function (x) { return SB.Shows.setInsurance(x, showId, true); }); }, { size: 12 });
      }
      return h('div', { class: 'cb-crewrow', role: 'group', aria: { label: T('show', 'insurance') } }, [D.word(T('show', 'insurance'), 13), btn,
        h('p', { class: 'cb-typed cb-small', text: lines.filter(Boolean).join(' ') })]);
    }

    /* ---- the sticker sheet (was the bill screen): candidates for the slot that is picked ---- */

    /* the bill as it would sound, in running order: each band's loop twice, one after another */
    function hearBill(s, show) {
      var bands = show.bill.slots.map(function (x) { return s.bands[x.bandId]; }).filter(Boolean);
      return bands.length ? D.listen({ bill: bands, text: T('bill', 'hearBill'), stopText: T('bill', 'listenStop'), label: T('bill', 'hearBillL'), fk: 'hear-bill' }) : null;
    }

    function askBand(s, bandId, slot, confirmList, call) {
      var fee = safe(function () { return SB.Bands.fee(s, bandId, showId); }, { pay: 'FREE', amount: 0 }) || { pay: 'FREE', amount: 0 }, r;
      var payload = { showId: showId, pay: fee.pay || 'FREE', fee: fee.amount || 0, wantSlot: slot || 'MIDDLE' };
      if (confirmList) payload.confirmList = true;
      if (call) payload.call = true;
      r = act(function (x) { return SB.Mail.ask(x, 'BAND_PLAY', bandId, payload); });
      if (r && r.ok === false && r.code === 'CONFIRM_LIST') {
        var flags = safe(function () { return SB.Harm.flags(s, bandId); }, null);
        var close = SB.UI.card(h('div', { class: 'sb-confirm cb-confirm' }, [
          h('h2', { text: T('bill', 'listedTitle') }),
          h('p', { class: 'cb-typed', text: (flags && flags.text) || r.why || '' }),
          h('div', { class: 'cb-row' }, [
            D.act(T('bill', 'listedNo'), T('bill', 'listedNo'), 'ls-no', function () { close(); }),
            D.act(T('bill', 'listedGo'), T('bill', 'listedGo'), 'ls-go', function () { close(); askBand(st(), bandId, slot, true, call); })
          ])
        ]), { label: T('bill', 'listedTitle') });
      } else if (!r || r.ok === false) { if (r && (r.code === 'NO_TIME' || r.code === 'BURNT_OUT' || r.code === 'PHASE')) ui.noTime = whyT(r); render(); }
      else {
        ui.noTime = null;
        if (call && r.askId) { var ca = safe(function () { return st().asks[r.askId]; }, null); if (ca && ca.answer && ca.answer.text) SB.UI.toast(ca.answer.text, ca.status === 'YES' ? 'info' : 'no'); }
        if (sel === 'slot-' + slot) pick('ask-' + bandId);
      }
    }

    function what(s, id) {
      if (whatCache[id] === undefined) whatCache[id] = safe(function () { return SB.Forecast.what(s, showId, { addBandId: id }); }, null);
      return whatCache[id];
    }

    /* Does a band's sound fit this bill? From public genre affinity only (Config.AFFINITY and the pack's tilt): how much a
     * band of genre g goes for the touring band's sound. The same reading the band makes when asked (Bands judge, bill). */
    function billGenreOf(s, show) {
      var g = null, req;
      show.bill.slots.forEach(function (x) { if (x.role === 'TOURING' && s.bands[x.bandId] && !g) g = s.bands[x.bandId].genre; });
      req = !g && show.requestId && s.requests ? s.requests[show.requestId] : null;
      if (req && req.bandId && s.bands[req.bandId]) g = s.bands[req.bandId].genre;
      return g;
    }
    function fitOf(s, bandGenre, top) {
      var E = SB.Enums, a, p;
      if (!top || !bandGenre) return null;
      if (bandGenre === top) return 'FIT';
      a = SB.Config.AFFINITY[E.GENRE_INDEX[bandGenre]] ? SB.Config.AFFINITY[E.GENRE_INDEX[bandGenre]][E.GENRE_INDEX[top]] : null;
      if (!num(a)) return null;
      p = safe(function () { return SB.Cities.pack(s); }, null);
      ((p && p.tilt) || []).forEach(function (t) { if (t.fan === bandGenre && t.band === top && (t.gen === undefined || t.gen === null)) a += t.d; });
      return a >= 0.7 ? 'FIT' : (a >= 0.45 ? 'STRETCH' : 'WRONG');
    }

    var billTop = null;
    function sheet(s, v, slot) {
      var show = v.show, onBill = {}, asks = bandAsks(s, showId), ids, piles = {}, cards, keys, out = [], nAll, short = false;
      billTop = billGenreOf(s, show);
      show.bill.slots.forEach(function (x) { onBill[x.bandId] = true; });
      ids = safe(function () { return SB.Bands.list(s, fl.freeOnly ? { local: true, active: true, freeOn: show.day, stack: true } : { local: true, active: true, stack: true }); }, []);
      /* only your band stack is offered (user 2026-11-24); the band the walkthrough is pointing at is offered even before
         you add it, so the guided first show never waits on it */
      (function () {
        var tc = safe(function () { return SB.Tutorial.current(s); }, null), tb = tc && tc.bandId;
        if (tb && ids.indexOf(tb) < 0 && s.bands && s.bands[tb] && s.bands[tb].local) ids.push(tb);
      })();
      cards = ids.map(function (id) { return safe(function () { return SB.Bands.card(s, id); }, null); }).filter(Boolean);
      nAll = cards.length;
      /* show one: five bands worth asking for this slot, with a reason each; the rest of the town is one press away (fix list 1.7) */
      short = !fl.all && !rungShows(s, 'bandListAll') && cards.length > 5;
      if (short) cards = topPicks(s, cards, slot, show, onBill, asks);
      cards.forEach(function (c) { (piles[short ? 'picks' : c.genre] = piles[short ? 'picks' : c.genre] || []).push(c); });
      keys = Object.keys(piles).sort();
      out.push(D.word(T('bill', 'cands'), 22, { cls: 'cb-head' }));
      if (slot) out.push(h('p', { class: 'cb-typed cb-small cb-fillslot', role: 'note', text: T('bill', 'filling', { slot: T('bill', 'gap.' + slot).toLowerCase() }) }));
      out.push(h('p', { class: 'cb-typed cb-small cb-msgcost' + (canMsg && canMsg.ok === false ? ' cb-whynot' : ''), text: canMsg && canMsg.ok === false ? whyT(canMsg) : T('card', 'msgCost', { cost: costT(mailH()).toLowerCase() }) }));
      out.push(h('p', { class: 'cb-typed cb-small', text: T('bill', 'normalBill') }));
      if (slot && slot !== 'CLOSE' && rungShows(s, 'askSeveral')) out.push(h('p', { class: 'cb-typed cb-small', text: T('bill', 'several', { slot: T('bill', 'gap.' + slot).toLowerCase() }) }));
      else if (slot === 'CLOSE') out.push(h('p', { class: 'cb-typed cb-small', text: T('bill', 'oneAtATime') }));
      if (!short) out.push(D.tickThing({ on: fl.freeOnly, text: T('bill', 'freeOnly'), label: T('bill', 'freeOnlyL'), fk: 'free', onClick: function () { fl.freeOnly = !fl.freeOnly; render(); } }));
      if (!short && keys.length > 1) out.push(D.tabs({ label: T('bill', 'allPiles'), items: keys.map(function (g) {
        var name = word('genre.' + g + '.name', g);
        return { text: name, label: fl.genre === g ? T('bill', 'allPiles') : T('bill', 'pileL', { g: name }), on: fl.genre === g, fk: 'pile-' + g, onClick: function () { fl.genre = fl.genre === g ? '' : g; render(); } };
      }), size: 12 }));
      if (!short && fl.genre && SB.text.has('ui.bill.gloss.' + fl.genre)) out.push(h('p', { class: 'cb-typed cb-small', text: word('genre.' + fl.genre + '.name', fl.genre) + ': ' + T('bill', 'gloss.' + fl.genre) + '.' }));
      if (!cards.length) out.push(h('p', { class: 'cb-typed cb-hint', text: T('bill', 'noCands') }));
      keys.forEach(function (g) {
        if (fl.genre && fl.genre !== g) return;
        out.push(D.typed(short ? T('bill', 'picksHead') : word('genre.' + g + '.name', g).toUpperCase(), 12, { bold: true, cls: 'cb-pilename' }));
        if (!short && !fl.genre && SB.text.has('ui.bill.gloss.' + g)) out.push(h('p', { class: 'cb-typed cb-small cb-gloss', text: T('bill', 'gloss.' + g) + '.' }));
        out.push(h('div', { class: 'cb-pile' }, piles[g].map(function (c, i) {
          var el = candidate(s, c, onBill[c.id], asks[c.id], i, slot, show),
              ear = D.listen({ band: c, text: T('bill', 'listen'), stopText: T('bill', 'listenStop'), label: T('bill', 'listenL', { name: c.name }), fk: 'hear-' + c.id });
          /* the listen button sits on the sticker's corner: one control per band, no second row */
          return h('div', { class: 'cb-candbox', style: { position: 'relative' } }, [el.thing, h('div', { class: 'cb-hearcorner', style: { position: 'absolute', top: '2px', right: '2px' } }, ear), short ? pickReason(s, c, slot, show) : null, el.read, el.pay, el.ask2]);
        })));
      });
      if (short) out.push(D.act(T('bill', 'seeAll', { n: nAll }), T('bill', 'seeAllL', { n: nAll }), 'see-all', function () { fl.all = true; render(); }, { size: 13 }));
      else if (fl.all && !rungShows(s, 'bandListAll')) out.push(D.act(T('bill', 'fewer'), T('bill', 'fewer'), 'see-few', function () { fl.all = false; render(); }, { size: 12 }));
      return piece('cb-sheet', 'blue', out, { label: T('bill', 'cands') });
    }

    /* the read under a sticker: what helps them (ballpoint), what holds them back (the hot ink), then the small print */
    function readEl(rd, small) {
      return h('div', { class: 'cb-read', aria: { hidden: 'true' } }, [
        rd.plus.length ? h('ul', { class: 'cb-read-plus' }, rd.plus.slice(0, 3).map(function (t) { return h('li', { text: t }); })) : null,
        rd.minus.length ? h('ul', { class: 'cb-read-minus' }, rd.minus.slice(0, 3).map(function (t) { return h('li', { text: t }); })) : null,
        small ? h('p', { class: 'cb-read-small', text: small }) : null
      ]);
    }
    function readLabel(rd) {
      return (rd.pull ? '. ' + T('bill', rd.pull.sure ? 'pullL' : 'pullGuessL', { n: rd.pull.text }) : '') +
             (rd.plus.length ? '. ' + T('bill', 'plusL', { list: rd.plus.slice(0, 3).join(', ') }) : '') +
             (rd.minus.length ? '. ' + T('bill', 'minusL', { list: rd.minus.slice(0, 3).join(', ') }) : '') + (rd.crowd ? '. ' + T('bill', 'crowdL', { who: rd.crowd }) : '');
    }

    /* a band's sticker on the sheet: the lifted corner says peel me; under it, what they cost and how many they pull, then
     * what helps them and what holds them back (SB.UI.bandRead), and the small print: the show with them, how soon they answer */
    function candidate(s, c, on, ask, i, slot, show) {
      var rw = safe(function () { return SB.Bands.replyWindow(s, c.id); }, null), fee = safe(function () { return SB.Bands.fee(s, c.id, showId); }, null), w = 200, ht = 118, out = '', peeled = on || (ask && ask.status !== 'NO' && ask.status !== 'SILENT'),
          payK = fee && fee.pay && ['FREE', 'GAS', 'FLAT', 'SHARE', 'DOOR'].indexOf(fee.pay) >= 0 ? fee.pay : (fee && fee.amount > 0 ? 'FLAT' : 'FREE'), payN =fee && fee.amount ? money(fee.amount) : '',
          feeT = c.own ? T('bill', 'payShort.FREE') : (fee ? T('bill', 'payShort.' + payK, { n: payN }) : '?'),
          payLine = c.own ? T('bill', 'ownPay') : (fee ? T('bill', 'pay.' + payK, { n: payN }) : ''),
          stg = c.trust && c.trust.stage, el, lab, sh = Math.round(w * 0.42), days = show ? daysTo(s, show.day) : 99,
          yw = peeled || !show ? null : safe(function () { return SB.Bands.yesWords(s, c.id, showId, slot); }, null),
          never = !c.own && !!rw && days < rw.lo, maybe = !c.own && !!rw && !never && days < rw.hi,
          fit = fitOf(s, c.genre, billTop), noMsg = false, rd, small, pt, callAct = null, payEl = null;
      var sty = c.style && c.style !== c.genre ? word('style.' + c.style + '.name', c.style) : '';
      rd = peeled ? { pull: null, plus: [], minus: [], crowd: '' } : safe(function () {
        return SB.UI.bandRead(s, c, { showId: showId, slot: slot, fit: fit, rw: rw, free: fl.freeOnly || !show ? true : SB.Bands.isFree(s, c.id, show.day) });
      }, { pull: null, plus: [], minus: [], crowd: '' });
      small = peeled ? '' : [rd.crowd ? T('bill', 'crowd', { who: rd.crowd }) : '', rw && !c.own ? T('bill', 'answers', { lo: rw.lo, hi: rw.hi }) : ''].filter(Boolean).join(' · ');
      if (!peeled) payEl = h('p', { class: 'cb-typed cb-small cb-paywords' }, [
        c.name + ' ' + payLine + (fee && !c.own && payK !== 'FREE' && T('bill', 'payWhen.' + payK) ? '. ' + T('bill', 'payWhen.' + payK) : '.'),
        yw ? ' ' + T('bill', 'yesWord.' + yw.k) : '',
        never ? ' ' + T('bill', 'answerNever') : (maybe ? ' ' + T('bill', 'answerLate') : '')
      ]);
      if (sty && !peeled) ht += 16;
      if (peeled) {
        /* a blank sticker space outlined in pencil, the unknown typed in pencil (not a web drop zone) */
        out += '<path d="M10 10L' + (w - 11) + ' 9L' + (w - 9) + ' ' + (sh - 8) + 'L9 ' + (sh - 9) + 'Z" fill="none" stroke="#6b6a64" stroke-opacity=".8" stroke-width="1.3" stroke-linejoin="round"/>';
        out += D.type(on ? T('bill', 'onBill').toUpperCase() : (ask.status === 'COUNTER' ? '$?' : T('show', 'nobody')), w / 2, sh / 2 + 5, on ? 12 : 14, { anchor: 'middle', bold: !!on || ask.status === 'COUNTER', rot: on ? 0 : -1, fill: on ? '#141413' : (ask && ask.status === 'COUNTER' ? D.hot() : '#5a5953') });
        lab = T('bill', 'peeled', { name: c.name, state: on ? T('bill', 'onBill') : (ask.status === 'COUNTER' ? T('bill', 'counter') : T('bill', 'asked')) });
      } else {
        out += '<g transform="rotate(' + ((i % 3) - 1) * 2 + ' 88 37)">' + D.bandSticker(c, w, { peel: true }) + '</g>';
        if (stg === 'TRUSTED' || stg === 'ALLY') out += K().heart(w - 30, 16, 16, { seed: 'th' + c.id, fill: '#141413' });
        if (stg === 'ALLY') out += '<g transform="translate(' + (w - 56) + ' 6)">' + D.mark('DONE', 16) + '</g>';
        else if (stg === 'SOUR') out += K().heart(w - 30, 16, 16, { seed: 'th' + c.id, fill: 'none' }) + K().line(w - 38, 8, w - 22, 24, { seed: 'thx', sw: 2 });
        if (c.listedMembers) out += D.bang(8, 26, 18);
        /* what they cost on a manila tag; what they pull in marker beside it (a question mark until you have seen them) */
        out += K().paper(4, sh + 4, 86, 26, { seed: 'fe' + c.id, stock: 'manila', sx: 2, sy: 3, burn: 0.3, rot: -3, inner: D.type(feeT.toUpperCase(), 47, sh + 22, 12, { anchor: 'middle', bold: true, maxWidth: 78 }) });
        if (rd.pull) {
          pt = T('bill', rd.pull.sure ? 'pull' : 'pullGuess', { n: rd.pull.text });
          out += D.head(104, sh + 31, 20, rd.pull.sure ? { mode: 'solid' } : { mode: 'open', dash: true });
          out += D.marker(pt.replace(/^\S+\s+/, ''), 116, sh + 25, 17, { seed: 'pl' + c.id, maxWidth: w - 120 });
          out += D.type(pt.split(' ')[0], 116, sh + 33, 8, { bold: true, fill: '#5a5953' });
        }
        if (sty) out += D.type(sty.toUpperCase(), 8, ht - 5, 12, { bold: true, maxWidth: w - 16 });
        lab = (sty ? sty + '. ' : '') + (c.own ? T('bill', 'ownGoL', { name: c.name }) : T('bill', 'pick', { name: bandWord(c.name), role: T('bill', 'role.' + (slot || 'MIDDLE')), fee: payLine, lo: rw ? rw.lo : '?', hi: rw ? rw.hi : '?' })) +
          (yw ? '. ' + T('bill', 'yesWord.' + yw.k) : '') + (never ? '. ' + T('bill', 'answerNever') : (maybe ? '. ' + T('bill', 'answerLate') : '')) +
          readLabel(rd) + (stg ? '. ' + word('stage.' + stg, lower(stg)) : '');
        lab = lab.replace(/\.(\s*\.)+/g, '.');   // a sentence that already ends in a period is not followed by another
      }
      /* peeling a sticker writes a message: when tonight has no half hour left the sticker is crossed out and stays put;
         a band that cannot answer before the show cannot be messaged, only called (fix list 1.8) */
      if (!peeled && canMsg && canMsg.ok === false) { noMsg = true; out += K().line(8, sh - 4, w - 10, 12, { seed: 'cn' + c.id, sw: 3 }); lab += '. ' + whyT(canMsg); }
      else if (!peeled && never) { noMsg = true; out += K().line(8, sh - 4, w - 10, 12, { seed: 'cn' + c.id, sw: 3 }); }
      else if (!peeled && !c.own && costT(mailH())) lab += ', ' + costT(mailH()).toLowerCase();
      /* the same-night answer: a phone call, an hour of tonight (fix list 2.16) */
      if (!peeled && !c.own && show) callAct = costAct({ text: T('bill', 'callIt'), label: T('bill', 'callItL', { name: c.name }), fk: 'call-' + c.id, hours: 1, size: 11, fn: function () { askBand(st(), c.id, slot, false, true); } });
      el = D.thing({ cls: 'cb-cand' + (peeled ? ' is-peeled' : '') + (noMsg ? ' cb-nofit' : ''), label: lab, tut: 'bill-cand', tutRef: showId, fk: 'cand-' + c.id, svg: out, w: w, h: peeled ? sh + 4 : ht, disabled: noMsg,
        strip: peeled || noMsg ? null : (c.own ? T('bill', 'ownGo') : T('bill', 'askStrip.' + (slot || 'MIDDLE'))), stripSize: 10,
        onClick: peeled ? function () { SB.UI.go('band', { bandId: c.id }); } : (noMsg ? function () {} : (c.own ? function () { act(function (x) { return SB.Shows.addOwnBand(x, showId, slot || 'OPEN'); }); } : function () { askBand(st(), c.id, slot, false); })) });
      return { thing: noMsg || c.own ? el : preview(el, peeled ? 0 : mailH()), read: peeled ? null : readEl(rd, small), pay: payEl, ask2: callAct };
    }

    function pickReason(s, c, slot, show) {
      var rd = safe(function () { return SB.UI.bandRead(s, c, { showId: showId, slot: slot, rw: null, free: true }); }, null), yw = safe(function () { return SB.Bands.yesWords(s, c.id, showId, slot); }, null), t = '';
      if (c.own) return h('p', { class: 'cb-typed cb-small cb-why', text: c.name + ': ' + T('bill', 'ownPay') + '.' });
      if (yw && yw.k !== 'BOOKED') t += T('bill', 'why.free') + ' ';
      if (rd && rd.pull) t += T('bill', 'why.pull', { n: rd.pull.text }) + ' ';
      if (yw) t += T('bill', 'yesWord.' + yw.k);
      return h('p', { class: 'cb-typed cb-small cb-why', text: t.replace(/\s+/g, ' ').trim() });
    }
    /* five bands worth asking first: free that night, likely to say yes, a fit for this slot, with your own band always among them */
    function topPicks(s, cards, slot, show, onBill, asks) {
      var tc = tutCur(s), want = { OPEN: 0, MIDDLE: 1, CLOSE: 2 };
      var scored = cards.filter(function (c) { return !onBill[c.id] || c.own; }).map(function (c) {
        var yw = safe(function () { return SB.Bands.yesWords(s, c.id, showId, slot); }, null), sc = ({ LIKELY: 3, GOOD: 2, EVEN: 1, LONG: 0, BOOKED: -3, OWN: 4 })[yw ? yw.k : 'EVEN'], tp = num(c.tierPublic) ? c.tierPublic : 0;
        if (tc && tc.bandId === c.id) sc += 10;
        if (fitOf(s, c.genre, billTop) === 'FIT') sc += 0.5; else if (fitOf(s, c.genre, billTop) === 'WRONG') sc -= 1;
        if (want[slot || 'OPEN'] === Math.min(2, tp)) sc += 0.5;
        if (asks[c.id]) sc -= 0.2;
        return { c: c, sc: sc + (c.draw && num(c.draw.hi50) ? Math.min(0.4, c.draw.hi50 / 100) : 0) };
      }).sort(function (a, b) { return b.sc - a.sc; });
      return scored.slice(0, 5).map(function (x) { return x.c; });
    }

    /* Escape puts HOW IT LOOKS away (back to the picked row); otherwise it is the close-up's own */
    keyHandler = function (e) { if (e.key === 'Escape' && look) { e.stopPropagation(); e.preventDefault(); look = false; keepFocus(root, render); } };
    if (root && typeof root.addEventListener === 'function') root.addEventListener('keydown', keyHandler);
    mode = safe(function () { var x = st().shows[showId]; return x && LIVE[x.status] ? 'card' : 'show'; }, 'show');
    /* show one: you work the door, as the booker does at most house shows (fix list 1.14); it can be taken off in the crew picker */
    if (mode === 'card') safe(function () {
      var x = st().shows[showId];
      if (x && x.crew && !x.crew.floor && !DOOR_SET[showId] && LIVE[x.status] && !rungShows(st(), 'dealTypes')) { DOOR_SET[showId] = true; act(function (y) { return SB.Shows.setCrew(y, showId, 'floor', 'player'); }); }
    }, null);
    var undress = dress(root, mode, st());
    /* a night called on the pinned clock while this card is up: the card asks to be picked up again next evening
       (and lets that go when the night was not called after all: the card is still up) */
    var offNight = typeof document === 'undefined' ? null : SB.UI.on(document, 'sb-callnight', function (e) {
      var at = e && e.detail && e.detail.at, s = st();
      if (!s || mode !== 'card') return;
      if (at === 'before') comeBack(showId, s.clock.day);
      else if (at === 'after' && safe(function () { return SB.UI.route(); }, null) === 'show') backDrop();
    });
    render();
    return { update: function () { keepFocus(root, render); }, unmount: function () { undress(); if (offNight) offNight(); if (SB.NightClock) SB.NightClock.preview(0); if (SB.Audio) SB.Audio.stop(); if (root && root.removeEventListener) root.removeEventListener('keydown', keyHandler); } };
  }
  /* the old bill route: the same card, opened on the bill (the first open slot, else the first band) */
  function mountBill(root, params) { return mountShow(root, { showId: params && params.showId, row: (params && params.row) || 'bill' }); }

  SB.UI.screen('shows', { rail: 'shows', title: 'ui.shows.title', full: false, mount: mountShows });
  SB.UI.screen('show', { rail: 'shows', title: 'ui.show.title', full: false, mount: mountShow });
  SB.UI.screen('bill', { rail: 'shows', title: 'ui.bill.title', full: false, mount: mountBill });
})(SB);