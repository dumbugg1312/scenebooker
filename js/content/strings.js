/* Scene Booker — content/strings.js   (role C1)
 * Game vocabulary: the words for every enum the player sees, verdict lines, the five-word scale, window labels,
 * refusal sentences, the glossary and the "your town" questions. Schema: design/spec/03-content.md section 3.
 * Keys are the enum's own keys under a camelCase table name (enum NEED -> strings.need.PAID). The game's own voice:
 * plain, exact, a little dry (design/story.md 1.1, 1.2). No app or brand names.
 */
SB.Content.strings = {
  gen: {
    KIDS:   { name: 'kids', short: 'kids', full: 'kids (under 21)' },
    MIDDLE: { name: 'the middle', short: 'middle', full: 'the middle (21 to about 35)' },
    OLD:    { name: 'old heads', short: 'old heads', full: 'old heads (about 35 and up)' }
  },

  genre: {
    'hardcore':    { name: 'hardcore', plain: 'hardcore' },
    'pop-punk':    { name: 'pop-punk', plain: 'pop-punk' },
    'emo':         { name: 'emo', plain: 'emo and screamo' },
    'crust':       { name: 'crust', plain: 'crust and d-beat' },
    'garage':      { name: 'garage', plain: 'garage and punk rock' },
    'post-punk':   { name: 'post-punk', plain: 'post-punk and cold wave' },
    'indie':       { name: 'indie', plain: 'indie and bedroom stuff' },
    'metal':       { name: 'metal', plain: 'sludge, doom and the heavy stuff' },
    'ska':         { name: 'ska', plain: 'ska and horn punk' },
    'folk-punk':   { name: 'folk-punk', plain: 'folk-punk' },
    'noise':       { name: 'noise', plain: 'powerviolence, grind and noise' },
    'street-punk': { name: 'street-punk', plain: 'street-punk and oi' }
  },

  /* What a band sounds like, one level finer than genre (Enums.STYLES). The first twelve are the genres themselves. */
  style: {
    'hardcore':      { name: 'hardcore' },
    'pop-punk':      { name: 'pop-punk' },
    'emo':           { name: 'emo' },
    'crust':         { name: 'crust' },
    'garage':        { name: 'garage' },
    'post-punk':     { name: 'post-punk' },
    'indie':         { name: 'indie' },
    'metal':         { name: 'metal' },
    'ska':           { name: 'ska' },
    'folk-punk':     { name: 'folk-punk' },
    'noise':         { name: 'noise' },
    'street-punk':   { name: 'street-punk' },
    'powerviolence': { name: 'powerviolence' },
    'sludge':        { name: 'sludge' },
    'shoegaze':      { name: 'shoegaze' },
    'math-rock':     { name: 'math rock' },
    'surf':          { name: 'surf' },
    'darkwave':      { name: 'darkwave' }
  },

  five: { SAME_CROWD: 'same crowd', GOOD_CROSSOVER: 'good crossover', SOME: 'some', THIN: 'thin', DONT_MIX: 'don\'t mix' },
  conf: { NONE: 'no data', RUMOR: 'heard once', HEARD: 'seen once', SEEN: 'seen twice', KNOWN: 'known', contested: 'people disagree' },
  stage: { SOUR: 'sour', STRANGER: 'a stranger', WORKING: 'working', TRUSTED: 'trusted', ALLY: 'an ally' },

  bandTier: ['nobody yet', 'heard of them', 'a local favorite', 'packs a room', 'bigger than the town'],
  bandStage: { FORMING: 'forming', NEW: 'new', COMING_UP: 'coming up', ESTABLISHED: 'established', DRAW: 'a draw',
               BROKE_OUT: 'broke out', FADING: 'fading', ON_ICE: 'on ice', ENDED: 'broke up' },
  motive: { MONEY: 'needs the money', GROW: 'wants to grow', FUN: 'in it for fun' },
  need: { PAID: 'paid what was agreed', CROWD: 'people in the room', SLOT: 'a good slot', SOUND: 'sound they can hear themselves in',
          FLOOR: 'a floor to sleep on', MEAL: 'a meal', ON_TIME: 'a night that runs on time', WEEKEND: 'a Friday or Saturday',
          ALL_AGES: 'an all-ages room', BILL: 'bands that fit with them', NAME_RIGHT: 'their name spelled right on the flyer' },
  buzz: { RISING: 'people are talking about them', STEADY: 'same as ever', FADING: 'people have stopped bringing them up' },

  wordTier: {
    SKIPPED:     { name: 'skipped', text: 'Bands drive through {city} on the way to somewhere. Most don\'t stop.' },
    FREE_NIGHT:  { name: 'a free night', text: 'Bands stop in {city} when they have a night to fill. They don\'t expect much.' },
    REAL_STOP:   { name: 'a real stop', text: 'Bands route through {city} on purpose now. They ask what you can do.' },
    ASKED_FOR:   { name: 'a town bands ask for', text: 'Bands ask other bookers whether they can get a date in {city}.' },
    DESTINATION: { name: 'a destination', text: 'Bands plan a tour around {city}. People drive in for your shows.' }
  },

  verdict: {
    count: {
      WELL_UNDER: ['{n} people. You\'d hoped for {par}.', '{n} came. {room} on a {dow} usually does about {par}.',
                   '{n} through the door. A {dow} at {room} should have done {par}.'],
      UNDER:      ['{n} came. A few short of what {room} does on a {dow}.', '{n} people. About {par} was the usual for a {dow} there.'],
      ABOUT:      ['{n} came, about what a {dow} at {room} does.', '{n} people. That\'s a normal {dow} at {room}.'],
      OVER:       ['{n} came. More than {room} usually sees on a {dow}.', '{n} people. A {dow} at {room} usually does about {par}.'],
      WAY_OVER:   ['{n} came. {room} on a {dow} usually does about {par}.', '{n} people on a {dow}. {room} doesn\'t see that often.']
    },
    tier: {
      ROUGH:  ['It was a long night.', 'Nobody will bring this one up again, and that\'s fine.'],
      THIN:   ['Not empty. Not what you wanted.', 'The people who came had a decent time. There weren\'t many of them.'],
      HELD:   ['A normal night. Those count.', 'It ran, people came, nobody got hurt.'],
      GOOD:   ['The room was full when it mattered.', 'People stayed for the last band.'],
      TALKED: ['This one\'s going to come up again.', 'People were still out front an hour after.']
    },
    word: { ROUGH: 'rough', THIN: 'thin', HELD: 'held', GOOD: 'good', TALKED: 'talked-about', WALL: 'talked-about' }
  },
  vsPar: { WELL_UNDER: 'well under', UNDER: 'under', ABOUT: 'about right', OVER: 'over', WAY_OVER: 'way over' },

  stress: {
    STEADY: 'steady', STRETCHED: 'stretched', FRIED: 'fried', BURNING_OUT: 'burning out', BURNT_OUT: 'burnt out',
    cause: {
      OVERTIME: 'staying up late', RAN_SHOW: 'ran a show', AFTER_SHIFT: 'a show after a shift', LOAD: 'too many shows at once',
      BROKE: 'money is short', BILLS_MISSED: 'a bill you missed', DUD: 'a night that fell flat', COVERED: 'covered a shortfall yourself',
      INCIDENT: 'something went wrong at a show', CANCELLED: 'a show that fell through', MAJOR: 'a hard week',
      HARM_OPEN: 'something about a person you haven\'t dealt with', HOUSEGUEST: 'a band sleeping at your place',
      INBOX: '{n} messages waiting', LATE_RENT: 'rent is late', EVENT: 'something came up',
      WEEK: 'a week went by', UNSPENT: 'hours you didn\'t spend', DAY_OFF: 'a day off', PHONE_OFF: 'a day with your phone off',
      WENT_OUT: 'went to a show for its own sake', GREAT_NIGHT: 'a night that went right', THANKED: 'somebody said thanks and meant it',
      CUSHION: 'two months of bills in the bank', NO_SHOW_WEEK: 'a week with no show'
    },
    effects: {
      STEADY: 'Nothing is slipping.',
      STRETCHED: 'Small things start to slip: a wrong date, a load-in time you meant to change.',
      FRIED: 'More slips. One hour less on your days off. Your flyers come out rougher, and you don\'t get the bonus for asking in person.',
      BURNING_OUT: 'A lot slips. You can\'t stay up late this week.',
      BURNT_OUT: 'Two weeks off. Every show in the next two weeks is handed off, moved or called off.'
    }
  },

  room: {
    HOUSE:   { name: 'a house', pays: 'no rent · hat to the host' },
    DIY:     { name: 'a DIY space', pays: 'a flat fee or a cut of the door' },
    HALL:    { name: 'a hall', pays: 'rent and a deposit' },
    BAR:     { name: 'a bar', pays: 'the bar keeps the drinks · sometimes a cut of the door' },
    CLUB:    { name: 'a club', pays: 'a cut of the door and their own sound' },
    BIG:     { name: 'a big room', pays: 'rent, a deposit and their own staff' },
    SHOP:    { name: 'a shop', pays: 'free · a jar by the register' },
    OUTDOOR: { name: 'outdoors', pays: 'free · a generator and some luck' }
  },
  houseType: { CARPORT: 'a carport', BASEMENT: 'a basement', ROWHOUSE: 'a rowhouse', GARAGE: 'a garage', LIVING_ROOM: 'a living room' },
  ages: { ALL: 'ALL AGES', A18: '18+', A21: '21+' },
  address: {
    ASK:  { name: 'ask a punk', says: 'The flyer says to ask. Fewer strangers and fewer old heads; the kids find it anyway.' },
    FULL: { name: 'address on the flyer', says: 'Everyone can find it. So can the neighbors and anyone looking for trouble.' }
  },
  printRun: { SMALL: '100 copies', USUAL: '250 copies', BIG: '500 copies' },
  push: { LOW: 'a small push', MID: 'a push', HIGH: 'a big push' },
  ad: { PAPER: 'an ad in the weekly paper', RADIO: 'a spot on community radio' },
  effort: { ROUGH: 'rough', STANDARD: 'standard', SHARP: 'sharp' },

  tune: {
    intro: 'We know the map here. We guessed the scene. You can tell us what we got wrong, or skip this.',
    nights:   { q: 'Which nights do shows do well here?', WEEKENDS: 'Fridays and Saturdays', THURSDAY_TOO: 'Thursdays too', ANY: 'Any night works' },
    lean:     { q: 'What does the scene lean toward? Pick up to two.' },
    allAges:  { q: 'Is there an all-ages room?', yes: 'Yes', no: 'No' },
    barOnly:  { q: 'Is the only real stage a bar?', yes: 'Yes', no: 'No' },
    town:     { q: 'College town, base town?', COLLEGE: 'College town', BASE: 'Base town', BOTH: 'Both', NEITHER: 'Neither' },
    mainRoom: { q: 'Where do most shows happen?' },
    football: { q: 'Do Friday nights in the fall belong to high school football?', yes: 'Yes', no: 'No' },
    skip: 'Skip this',
    tuned: 'Tuned by you.'
  },

  deal: {
    DOOR:           { name: 'door deal', words: '{pct}% of the door' },
    GUARANTEE:      { name: 'guarantee', words: '{amount:money} no matter what' },
    GUARANTEE_PLUS: { name: 'guarantee plus', words: '{amount:money}, plus half of what\'s left after costs' },
    VERSUS:         { name: 'versus', words: '{amount:money} or {pct}% of the door, whichever is more' },
    HAT:            { name: 'the hat', words: 'whatever goes in the hat' }
  },
  localPay: {
    FREE:  { name: 'for nothing', words: 'They play for free.' },
    GAS:   { name: 'gas money', words: '{amount:money|A little} for gas.' },
    FLAT:  { name: 'a flat fee', words: '{amount:money} flat.' },
    SHARE: { name: 'a share', words: 'A share of the door after the touring band.' }
  },
  pace: { OK: 'the door should cover it', TIGHT: 'it\'ll be close', SHORT: 'the door probably won\'t cover it' },
  label: { LOWKEY: 'low-key', NORMAL: '', BIG: 'a big one' },
  slot: { EVENING: 'evening', MATINEE: 'matinee' },
  window: { EARLY: 'opens {day}', OPEN: 'open', CLOSING: 'closing {day}', LATE: 'late', MISSED: 'missed', DONE: 'done', NONE: 'any time' },
  timing: { ON_TIME: 'on time', LATE: 'late', SKIPPED: 'skipped' },
  jobGroup: { GETTING: 'Getting the show', TELLING: 'Telling people', RUNNING: 'Making it run', NIGHT: 'The night and after',
              FREE: 'Not tied to one show' },
  jobStatus: { TODO: 'to do', PLANNED: 'planned', PROMISED: 'promised', WAITING: 'waiting on an answer', DONE: 'done',
               SKIPPED: 'skipped', MOOT: 'not needed' },
  slip: { WRONG_DATE: 'the wrong date on the flyer', WRONG_LOADIN: 'the wrong load-in time', CREW_UNCONFIRMED: 'sound never confirmed',
          DOUBLE_BOOKED: 'two things on one evening', SHORT_ANSWER: 'a short answer to someone who didn\'t deserve it',
          SHOP_SHUT: 'the copy place was shut' },
  half: { DAY: 'day', NIGHT: 'night' },
  dayJob: { FULL: 'full time', PART: 'part time', NONE: 'no day job' },
  channel: { ANNOUNCE: 'the announcement', RUN: 'flyers on walls', LISTINGS: 'the listings', WOM: 'word of mouth',
             SHARE: 'bands sharing it', ROOM: 'the room\'s own crowd', MAIL: 'your mailing list' },
  cameFor: { BAND: 'came for a band', SCENE: 'came because there was a show', REGULAR: 'came because it was yours',
             INVITE: 'came because you asked them', HANDOUT: 'came off a flyer you handed them' },
  weather: { CLEAR: 'clear', RAIN: 'rain', HEAT: 'heat', COLD: 'cold' },
  /* The warnings of Week.check ("before you play"): which job, which day, in plain words. */
  check: {
    over: '{dow} has {hours} more planned than the day has{what}. Move something to another day, or it is overtime.',
    late: '{job} is late(?show: for {show}) and isn\'t on the calendar this week.',
    hold: 'Your hold on {show} runs out {by}. Confirm the room or it goes to somebody else.',
    challenge: 'Somebody wants a date you\'re holding. Answer them before you play.',
    replyBy: '{band|A band} needs an answer by {dow}, and your phone is off that day.'
  },
  refuse: {
    PHASE: 'Not now.',
    STOP_PENDING: 'Something is waiting on you first.',
    NO_HOURS: 'That\'s more hours than the day has.',
    WRONG_HALF: 'That one has to happen in the other half of the day.',
    WINDOW: 'It\'s too early for that, or too late.',
    NEEDS: 'Something else has to be done first.',
    TAKEN: 'Somebody already has that.',
    LOCKED: 'That\'s already set. Changing it now costs more than it\'s worth.',
    STAGE: 'Nobody\'s offering that to you yet.',
    RELATIONSHIP: 'They don\'t know you well enough to say yes to that.',
    NO_MONEY: 'There isn\'t enough money for that.',
    ALREADY: 'That\'s already done.',
    TOO_MANY: 'That\'s as many as there can be.',
    BUSY: 'They\'re busy that night.',
    CONFIRM_LIST: 'Someone on this bill is on your list. Say so first.',
    BILLS_FIRST: 'The bills come first.',
    PLAN: 'The week isn\'t planned yet.',
    BURNT_OUT: 'You\'re burnt out. This waits.',
    INVALID: 'That doesn\'t work.',
    OVER: 'That part of your life is over.',
    NO_TIME: 'Not enough time tonight.'
  },
  /* the night clock (spec 10): hours spent on the spot, the stay-up hour, what is due when */
  clock: {
    noTime: 'Not enough time tonight: that\'s {need} and you have {left} left(?stay:, staying up included).',
    noTimeNone: 'Not enough time tonight: that\'s {need} and you\'re out of hours.',
    early: 'Too early for that. It opens {day}.',
    nightOver: 'You called it a night. That waits for tomorrow.',
    stayedUp: 'You stayed up {hours} past your night. Tomorrow starts {hours} short.',
    half: 'half an hour', one: 'an hour', many: '{n} hours'
  },

  names: { name: 'your name', word: 'the town\'s standing', par: 'what the town expects', call: 'your call',
           regulars: 'regulars', fund: 'cash box', bank: 'your account', list: 'Not booking' },
  pot: { FUND: 'cash box', BANK: 'your account' },
  fog: { OPEN: 'open book', NORMAL: 'normal', HARD: 'hard' },
  windows: { FORGIVING: 'forgiving', NORMAL: 'normal' },
  stamp: { LATE: 'LATE', REMEMBERED: 'REMEMBERED', PACKED: 'PACKED', FIRST_SHOW: 'FIRST SHOW', LAST_SHOW: 'LAST SHOW', KNOWN: 'KNOWN' },

  flyer: {
    presents: '{name} presents',
    askAPunk: ['ask a punk for the address', 'ask a punk', 'ask around for the address', 'address? ask a punk'],
    noOneTurned: 'no one turned away for lack of funds',
    tba: '+ more TBA',
    rules: ['be cool or be gone', 'respect the neighbors', 'no drinks in the street', 'park on the street, not the yard',
            'take your trash with you', 'keep it down out front'],
    tag: { RECORD_RELEASE: 'RECORD RELEASE', BENEFIT: 'BENEFIT', LAST_SHOW: 'LAST SHOW', FIRST_SHOW: 'FIRST SHOW',
           MATINEE: 'MATINEE', BACK_FROM_TOUR: 'BACK FROM TOUR', REUNION: 'REUNION' },
    doors: 'doors {t}',
    done: 'done by {t}',
    oneLiner: ['{n:words:cap}-piece from {home}. {plain:cap}.', '{plain:cap} from {home}.', 'From {home}. {plain:cap}, {n:words} of them.']
  },

  /* People and roles */
  role: { MUSICIAN: 'plays in a band', SOUND: 'does sound', SECURITY: 'does security when a show needs it', FLOOR: 'keeps an eye on the floor',
          RUNNER: 'puts up flyers', ARTIST: 'makes flyers', LODGING: 'puts bands up', OWNER: 'runs a room', BOOKER: 'books shows',
          CONTACT: 'books in another town', REGULAR: 'a regular', OUTGOING: 'booked here before you', AGENT: 'books tours for bands' },
  owner: { HOST: 'the host', BAR_OWNER: 'the owner', HALL_MANAGER: 'the hall manager', SHOP_OWNER: 'the shop owner',
           CHURCH_CONTACT: 'the church contact', LANDLORD: 'the landlord', TALENT_BUYER: 'the talent buyer' },
  booker: { GENRE: 'books one sound', TALENT_BUYER: 'buys talent for a club', ANYWHERE: 'books anything, anywhere',
            KID: 'a kid with a carport', OLD: 'an old head who still books', PEER: 'books in the next city over',
            OUTGOING: 'the booker before you' },
  regularType: { EVERYTHING: 'comes to everything', COUPLE: 'a couple who come together', KID_WITH_RIDE: 'a kid who needs a ride',
                 SAILOR: 'here on orders', NIGHT_SHIFT: 'works nights, comes when they can', OLD_HEAD: 'has been coming since before you',
                 OUT_OF_TOWNER: 'drives in from out of town' },
  focus: { SPECIALIST: 'a specialist', BETWEEN: 'somewhere in between', ALLROUNDER: 'an all-rounder' },
  pay: { CASH: 'cash', LIST: 'on the list', FAVOR: 'a favor you owe', NOTHING: 'nothing' },
  helpOutcome: { DONE: 'done', DIFFERENT: 'done, but not how you asked', NOT_DONE_TOLD: 'not done, and they told you',
                 NOT_DONE_SILENT: 'not done, and nobody said' },

  /* Money */
  money: { DOOR: 'the door', HAT: 'the hat', ROOM: 'room rent', DEPOSIT: 'deposit', SOUND: 'sound', SECURITY: 'security',
           INSURANCE: 'event insurance', DAMAGES: 'damages',
           HOST: 'the host', TOURING: 'touring band', LOCAL: 'local bands', PRINT: 'printing', PROMO: 'paid push and ads',
           FOOD: 'food', HELPER: 'helpers', FLYER: 'flyer art', MOTEL: 'motel', THEFT: 'stolen', WAGES: 'day job',
           BILLS: 'bills', FEE: 'fees', LOAN: 'loan', MOVE: 'moved between pots', EVENT: 'something came up', OTHER: 'other' },
  bill: { RENT: 'rent', UTILITIES: 'lights and water', CAR: 'the car', FOOD: 'groceries' },
  ladder: {
    OVERDRAFT:   { name: 'overdraft', says: 'The bank covers it and charges you for it.' },
    EXTRA_SHIFT: { name: 'an extra shift', says: 'Six hours of your week, and the money is there by Friday.' },
    BORROW:      { name: 'borrow from a friend', says: 'They\'ll say yes. You\'ll owe them.' },
    LATE_RENT:   { name: 'pay rent late', says: 'The landlord gets it a week late and remembers.' },
    COUCH:       { name: 'sleep on a couch', says: 'Give up your place for a while. It costs less and it costs more.' }
  },
  settle: { ROOM: 'the room', ROOM_DEP: 'the room: rent {rent:money} ({dep:money} of it paid already, comes back after)', DEPOSIT: 'room deposit back', SOUND: 'sound', SECURITY: 'security', HOST: 'the host', GUARANTEE: 'the touring band',
            LOCAL: 'the locals', SHARE: 'the touring band\'s share', SHARE_OF: '{band}\'s cut of what was left', INSURANCE: 'event insurance, paid when you confirmed',
            DAMAGES: 'damages, out of your pocket', DAMAGES_COVERED: 'damages, paid by the insurance', COSTS: 'costs', YOU: 'you, from the box',
            SOUND_EXPECTED: 'sound (nobody hired yet: about what it costs)',
            COSTS_BEFORE: '{what}, paid before the night',
            NET: 'You on this show, counting what you spent before the night' },
  /* Security and event insurance on the show page (C.SECURITY, C.INSURANCE). Slots: room, why, cost, rate, person. */
  security: {
    what: 'Somebody big and calm by your podium. Fewer fights, fewer people at the gate, nobody walking off with the cash box.',
    required: '{room:cap} won\'t confirm without security.',
    recommended: 'Worth having this time: {why}.',
    why: { SKETCHY: 'the room gets rough', BIG: 'it\'s a big show', ROWDY: 'this bill\'s crowd gets rowdy' },
    chill: 'At a house or a DIY room a guard costs the night a little. People don\'t like one at a house show.',
    optional: 'Not needed here. Your call.',
    none: 'Nobody you know does security yet.'
  },
  insurance: {
    what: 'Event insurance: if somebody gets hurt or the room gets damaged, it pays instead of you.',
    required: '{room:cap} won\'t confirm without event insurance.',
    optional: 'Not required here. You can still buy it.',
    cost: '{cost:money}, paid when the date confirms.',
    bought: 'Insured. You paid {cost:money}.'
  },
  shortfall: {
    POCKET:       { name: 'pay it yourself', says: 'The band gets what you promised. You\'re out the difference.' },
    ASK_LESS:     { name: 'ask the band to take less', says: 'Some bands understand. All of them remember.' },
    LOCALS_GIVE:  { name: 'the locals give theirs up', says: 'The local bands put their cut toward the touring band.' },
    HAT:          { name: 'pass the hat', says: 'Works when the room liked the band and there\'s still a room.' },
    SHORT_SILENT: { name: 'pay them short and say nothing', says: 'They\'ll count it in the van. Then everybody will hear.' },
    OFF_RENT:     { name: 'take it off the room\'s rent', says: 'The room gets less than you agreed. They keep the deposit.' }
  },

  /* Harm and the list (design/story.md 8) */
  harmAct: {
    ASK_AROUND: { name: 'ask around', says: 'Talk to people you trust. It takes an hour and it takes care.' },
    LIST:       { name: 'put them on your list', says: 'You won\'t book them. You decide what would change that.' },
    QUIET_WORD: { name: 'have a quiet word', says: 'Tell the band what you heard, privately. What they do next is up to them.' },
    PULL_SHOW:  { name: 'pull the show', says: 'Take the band off the bill. People will ask why.' },
    LEAVE:      { name: 'leave it for now', says: 'Nothing changes yet. It doesn\'t go away.' }
  },
  listCondition: { BAND_PARTS: 'until the band parts ways with them', LOOK_AGAIN: 'until you look at it again',
                   TALK_FIRST: 'not until you\'ve talked', NO: 'not booking' },

  /* The notebook, debrief, town */
  notePage: { CROWDS: 'Crowds', BANDS: 'Bands', ROOMS: 'Rooms', NIGHTS: 'Nights', HEAR: 'How people hear', DOOR: 'The door',
              TOWNS: 'Towns', MOVING: 'What\'s moving', PEOPLE: 'People', HOW: 'How it works', LIST: 'Not booking' },
  debrief: { KIDS: 'the kids', OLD_HEADS: 'the old heads', ROOM: 'the room', MONEY: 'the money', TOURING: 'the touring band' },
  trait: { COLLEGE: 'a college town', MILITARY: 'a base town', TOURIST: 'a tourist town', CAPITAL: 'the state capital',
           PORT: 'a port', COASTAL: 'on the coast', HURRICANE: 'hurricane country', SNOW: 'real winters', CHURCHED: 'a churchgoing town',
           BORDER: 'a border town', MILL: 'a mill town', TRANSIT: 'buses that run late', REMOTE: 'a long drive from anywhere',
           DESERT: 'desert', MOUNTAIN: 'in the mountains', RIVER: 'a river town' },
  zone: { CITY: 'in town', FEEDER: 'a town nearby', PEER: 'the next city over' },

  glossary: {
    guarantee: { term: 'guarantee', short: 'What you promised the band no matter how many people come.',
                 long: 'If the door doesn\'t cover it, you do.', example: '(?show: You promised {band} {amount:money}.)' },
    doorDeal: { term: 'door deal', short: 'The band gets a share of the door instead of a set amount.',
                long: 'Nobody loses money on a door deal. Nobody gets rich either.', example: '(?show: {band} gets {pct}% of the door.)' },
    versus: { term: 'versus', short: 'A guarantee or a share of the door, whichever is more.',
              long: 'The band is safe on a slow night and paid fairly on a good one. You carry the slow night.',
              example: '(?show: {band}: {amount:money} or {pct}% of the door.)' },
    hat: { term: 'the hat', short: 'Whatever people put in a hat, a jar or a bucket for the band.',
           long: 'It works when the room liked them. It doesn\'t when the room was empty.', example: '(?show: The hat at {room} goes to {band}.)' },
    hold: { term: 'hold', short: 'A room saying it\'ll keep a date for you. Not a promise.',
            long: 'Two people can ask for the same Saturday; you\'re next in line if they let it go.', example: '(?show: You have {room} held for the {date:ord}.)' },
    challenge: { term: 'challenge', short: 'Another booker asking for a date you hold.',
                 long: 'The room tells you, and you have a few days to confirm or let it go.',
                 example: '(?show: Someone wants {room} on the {date:ord}. Confirm by {day}.)' },
    confirm: { term: 'confirm', short: 'The room saying yes. Once they do, the date is yours.',
               long: 'Some rooms want something first, like a full bill or a deposit. They hold the night until you have it, then it\'s yours, and the deposit comes out then.',
               example: '(?show: {room} on the {date:ord} is confirmed.)' },
    advance: { term: 'advance', short: 'Telling every band the address, load-in, set times and where the touring band sleeps.',
               long: 'An advanced band shows up on time. A band that wasn\'t advanced shows up when it shows up.',
               example: '(?show: Advance {band} before the {date:ord}.)' },
    loadIn: { term: 'load-in', short: 'When the bands bring their gear in.',
              long: 'If the touring band has driven six hours, load-in is when they arrive, whatever you wrote.',
              example: '(?show: Load-in at {room} is {t}.)' },
    backline: { term: 'backline', short: 'The drums and amps everybody shares so nobody has to move theirs between sets.',
                long: 'Sorting it out ahead of time is what keeps changeovers short.', example: '' },
    changeover: { term: 'changeover', short: 'The time between one band leaving the stage and the next one starting.',
                  long: 'Ten minutes with shared gear. Twenty when every band brings its own kit. It adds up.', example: '' },
    offTheTop: { term: 'off the top', short: 'What comes out of the door money before the bands are paid: the room, sound, security if you had it.',
                 long: 'A door deal is a share of what\'s left after these, so they matter to the band too.', example: '' },
    settle: { term: 'settle', short: 'Paying everyone out of the door at the end of the night.',
              long: 'Touring band first, locals next, yourself last. Before anybody loads out.', example: '(?show: Settle with {band} before they load out.)' },
    comps: { term: 'comps', short: 'People let in free: the bands\' friends, the crew, the list.',
             long: 'A few are normal. Too many on a small night and the door can\'t pay anyone.', example: '' },
    theList: { term: 'the list', short: 'The people you won\'t book, each with what would change your mind.',
               long: 'Nobody sees it but you. A band is flagged while someone on it is in the band.', example: '' },
    listings: { term: 'listings', short: 'The free calendars: the weekly paper\'s page, the community board, the show calendar people check.',
                long: 'They have deadlines. Miss one and it\'s a week before the next.', example: '' },
    allAges: { term: 'all ages', short: 'Anyone can come in, whatever their age.',
               long: 'Kids can only come to all-ages shows. A bar show locks out the youngest crowd.', example: '' },
    matinee: { term: 'matinee', short: 'A show in the afternoon.',
               long: 'Kids and old heads come to an afternoon show. The middle is asleep or at work.', example: '' },
    par: { term: 'what the town expects', short: 'How many people the usual would bring: the usual promotion, done on time, on what anyone could know.',
           long: 'Beating it means you knew something, chose something or did more than the usual.',
           example: '(?show: {room} on a {dow} usually does about {par}.)' },
    theCall: { term: 'your call', short: 'Your own guess at how many will come, before the night.',
               long: 'It\'s a range. The more you know, the narrower it gets.', example: '' },
    regulars: { term: 'regulars', short: 'People who come because it\'s one of yours.',
                long: 'You win them with good nights and lose them with bad ones, and they don\'t care much who\'s playing.', example: '' },
    cashBox: { term: 'the cash box', short: 'The money that belongs to the shows, kept apart from your own.',
               long: 'Door money goes in. Deposits, printing and guarantees come out.', example: '' },
    theUsual: { term: 'the usual', short: 'What a careful booker does for every show, on the usual days.',
                long: 'Pressing it plans that much for you. It meets what the town expects; it doesn\'t beat it.', example: '' },
    exposure: { term: 'exposure', short: 'What you could lose if nobody comes.',
                long: 'Guarantees, rent and deposits you\'ve promised, less what you\'re sure to take in.', example: '' },
    deposit: { term: 'deposit', short: 'Money a room keeps until the night is over and nothing is broken.',
               long: 'You get it back unless something goes wrong. Sometimes something goes wrong.', example: '' },
    handshake: { term: 'handshake', short: 'A deal you agreed out loud and didn\'t write down.',
                 long: 'Most of the time it\'s fine. When it isn\'t, it\'s your word against theirs at the end of the night.', example: '' },
    stale: { term: 'stale', short: 'Posters get covered and announcements get forgotten.',
             long: 'Too early is a cost too. A poster from five weeks ago is under three newer ones.', example: '' },
    /* the words a first-time player (a twelve-year-old, say) trips on, added 2026-11-21 for tap-to-define (js/ui/words.js) */
    bill: { term: 'the bill', short: 'The list of bands playing the show, in the order they play.',
            long: 'Usually three: an opener, a middle band, a headliner.', example: '' },
    opener: { term: 'opener', short: 'The band that plays first.',
              long: 'Often a newer local band. Their friends get there early, so the room isn\'t empty.', example: '' },
    headliner: { term: 'headliner', short: 'The band that plays last, the one most people came to see.',
                 long: 'Put the biggest draw last so people stay for the whole night.', example: '' },
    touring: { term: 'touring band', short: 'A band from out of town, driving from show to show.',
               long: 'They need gas money and a floor to sleep on. Nobody here knows them yet, so locals help bring people.', example: '' },
    draw: { term: 'draw', short: 'How many people a band brings to a show.',
            long: '"They draw 11" means about eleven people come because of them.', example: '' },
    theDoor: { term: 'the door', short: 'The money people pay to get in, collected at the door.',
               long: 'Everyone gets paid out of it at the end of the night.', example: '' },
    flatFee: { term: 'flat fee', short: 'A set amount you pay a band, however many people come.',
               long: 'Same as a guarantee. If nobody comes, you still owe it.', example: '' },
    counter: { term: 'counter', short: 'When someone answers your offer with a different deal.',
               long: 'You can take their deal, offer again, or pass.', example: '' },
    tba: { term: 'TBA', short: 'To be announced: a spot on the flyer whose band isn\'t set yet.',
           long: 'Fine on an early flyer. Fill it in before the show.', example: '' },
    pa: { term: 'PA', short: 'The speakers and mixer that make the singer loud enough to hear.',
          long: 'Bands bring guitars and drums, not a PA. Your sound person brings it and runs it.', example: '' },
    promo: { term: 'promo', short: 'Getting the word out: flyers, posters, listings, texts, posts.',
             long: 'A great show nobody heard about is an empty room.', example: '' },
    callItANight: { term: 'call it a night', short: 'End tonight and go to sleep. This is how time moves.',
                    long: 'Answers to your texts come in overnight. Nothing changes until you call it a night.', example: '' }
  }
};
