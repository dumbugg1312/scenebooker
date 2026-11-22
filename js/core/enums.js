/* Scene Booker — core/enums.js
 * Every identifier shared between roles. A value always equals its key, so enums survive JSON and read well in saves.
 *
 * FROZEN CONTRACT FILE. Owned by the architect. No engineer edits it.
 * Loads after sb.js. Read as SB.Enums (alias SB.E).
 *
 * Revision 2 (after review): MESSAGES is no longer a job (messages go out every evening); LOCAL_AD is one;
 * JOB_MODE gained PROMISE and JOB_STATUS gained PROMISED; new tables ADDRESS, PRINT_RUN, PUSH, AD, PROMO_AS,
 * TUNE_NIGHTS, TUNE_TOWN; new MOD keys and EFFECT ops for the events the engine raises itself; CAUSE_VOICES now
 * lists every voice's hobby cause and the helper voice for SAFETY and HOSPITALITY.
 */
(function (root) {
  'use strict';
  var SB = root.SB;

  function en(keys) {
    var o = {}, i;
    for (i = 0; i < keys.length; i++) o[keys[i]] = keys[i];
    return Object.freeze(o);
  }

  var E = {};

  /* ---------------- The three generations. Arrays indexed by generation are always [kids, middle, old]. ---- */
  E.GEN = Object.freeze({ KIDS: 0, MIDDLE: 1, OLD: 2 });
  E.GENS = Object.freeze([0, 1, 2]);
  E.GEN_KEY = Object.freeze(['KIDS', 'MIDDLE', 'OLD']);   // for content paths and labels

  /* ---------------- Genres (mechanics 1.1). The order is the order of every 12-wide table. ---------------- */
  E.GENRES = Object.freeze(['hardcore', 'pop-punk', 'emo', 'crust', 'garage', 'post-punk', 'indie', 'metal',
                            'ska', 'folk-punk', 'noise', 'street-punk']);
  E.GENRE = en(E.GENRES);
  E.GENRE_INDEX = Object.freeze({ 'hardcore': 0, 'pop-punk': 1, 'emo': 2, 'crust': 3, 'garage': 4, 'post-punk': 5,
                                  'indie': 6, 'metal': 7, 'ska': 8, 'folk-punk': 9, 'noise': 10, 'street-punk': 11 });
  /* Two- or three-letter tags shown on genre chips. */
  E.GENRE_TAG = Object.freeze({ 'hardcore': 'HC', 'pop-punk': 'PP', 'emo': 'EMO', 'crust': 'CRU', 'garage': 'GAR',
                                'post-punk': 'PPK', 'indie': 'IND', 'metal': 'MTL', 'ska': 'SKA', 'folk-punk': 'FLK',
                                'noise': 'NOI', 'street-punk': 'STP' });
  /* The eight colour and flyer families of art.md 2.1 and 4.3. */
  E.FAMILY = en(['FAST', 'MELODIC', 'CRUST', 'GARAGE', 'EMO', 'METAL', 'ART', 'PARTY']);
  E.FAMILIES = Object.freeze(['FAST', 'MELODIC', 'CRUST', 'GARAGE', 'EMO', 'METAL', 'ART', 'PARTY']);
  E.GENRE_FAMILY = Object.freeze({ 'hardcore': 'FAST', 'street-punk': 'FAST', 'pop-punk': 'MELODIC', 'crust': 'CRUST',
                                   'noise': 'CRUST', 'garage': 'GARAGE', 'emo': 'EMO', 'indie': 'EMO', 'metal': 'METAL',
                                   'post-punk': 'ART', 'folk-punk': 'PARTY', 'ska': 'PARTY' });

  /* ---------------- Styles: what a band sounds like, one level finer than genre. Every style has one parent genre,
   * and the parent carries all crowd, affinity and trend arithmetic: a style is a name, a tag, a name pool and a loop. */
  E.STYLES = Object.freeze(['hardcore', 'pop-punk', 'emo', 'crust', 'garage', 'post-punk', 'indie', 'metal',
                            'ska', 'folk-punk', 'noise', 'street-punk',
                            'powerviolence', 'sludge', 'shoegaze', 'math-rock', 'surf', 'darkwave']);
  E.STYLE = en(E.STYLES);
  E.STYLE_GENRE = Object.freeze({ 'hardcore': 'hardcore', 'pop-punk': 'pop-punk', 'emo': 'emo', 'crust': 'crust', 'garage': 'garage',
                                  'post-punk': 'post-punk', 'indie': 'indie', 'metal': 'metal', 'ska': 'ska', 'folk-punk': 'folk-punk',
                                  'noise': 'noise', 'street-punk': 'street-punk',
                                  'powerviolence': 'hardcore', 'sludge': 'metal', 'shoegaze': 'indie', 'math-rock': 'indie',
                                  'surf': 'garage', 'darkwave': 'post-punk' });
  /* The child styles of each genre that has any. */
  E.GENRE_STYLES = Object.freeze({ 'hardcore': Object.freeze(['powerviolence']), 'metal': Object.freeze(['sludge']),
                                   'indie': Object.freeze(['shoegaze', 'math-rock']), 'garage': Object.freeze(['surf']),
                                   'post-punk': Object.freeze(['darkwave']) });
  E.STYLE_TAG = Object.freeze({ 'hardcore': 'HC', 'pop-punk': 'PP', 'emo': 'EMO', 'crust': 'CRU', 'garage': 'GAR',
                                'post-punk': 'PPK', 'indie': 'IND', 'metal': 'MTL', 'ska': 'SKA', 'folk-punk': 'FLK',
                                'noise': 'NOI', 'street-punk': 'STP',
                                'powerviolence': 'PV', 'sludge': 'SLG', 'shoegaze': 'SHG', 'math-rock': 'MTH',
                                'surf': 'SRF', 'darkwave': 'DKW' });

  /* ---------------- Time ---------------- */
  E.HALF = en(['DAY', 'NIGHT']);
  E.PHASE = en(['PLAN', 'PLAY', 'CLOSE', 'OVER']);       // OVER: the career has ended
  E.SLOT = en(['EVENING', 'MATINEE']);                   // when a show starts
  E.DAY_JOB = en(['FULL', 'PART', 'NONE']);

  /* ---------------- Settings ---------------- */
  E.FOG = en(['OPEN', 'NORMAL', 'HARD']);
  E.WINDOWS = en(['FORGIVING', 'NORMAL']);

  /* ---------------- Places ---------------- */
  E.ZONE = en(['CITY', 'FEEDER', 'PEER']);
  E.SIZE = en(['SMALL', 'MID', 'LARGE', 'HUGE']);        // metro under 250k, under 1M, under 4M, 4M and up
  E.TRAIT = en(['COLLEGE', 'MILITARY', 'TOURIST', 'CAPITAL', 'PORT', 'COASTAL', 'HURRICANE', 'SNOW', 'CHURCHED',
                'BORDER', 'MILL', 'TRANSIT', 'REMOTE', 'DESERT', 'MOUNTAIN', 'RIVER']);
  E.WEATHER = en(['CLEAR', 'RAIN', 'HEAT', 'COLD']);

  /* ---------------- Rooms ---------------- */
  E.ROOM = en(['HOUSE', 'DIY', 'HALL', 'BAR', 'CLUB', 'BIG', 'SHOP', 'OUTDOOR']);
  E.AGES = en(['ALL', 'A18', 'A21']);
  /* What a flyer for a house, yard or DIY room says about where it is: "ask a punk", or the address in print. */
  E.ADDRESS = en(['ASK', 'FULL']);
  E.NIGHT_STATE = en(['OPEN', 'OWN', 'HELD', 'CONFIRMED']);          // one night on a room's calendar
  E.HOLD = en(['SOFT', 'CHALLENGED', 'CONFIRMED']);                  // one hold on that night
  E.OWNER = en(['HOST', 'BAR_OWNER', 'HALL_MANAGER', 'SHOP_OWNER', 'CHURCH_CONTACT', 'LANDLORD', 'TALENT_BUYER']);
  E.SPOT = en(['POLE', 'COFFEE_BOARD', 'RECORD_SHOP', 'SKATE_SHOP', 'LAUNDROMAT', 'BAR_WALL', 'COLLEGE_BOARD',
               'PRACTICE_DOOR', 'TATTOO_SHOP']);
  E.INCIDENT = en(['NOISE', 'FIGHT', 'THEFT', 'PA_FAIL', 'OVER_CAP', 'HURT', 'RAINED_OUT', 'ROOM_FORGOT']);

  /* ---------------- Bands and people ---------------- */
  E.BAND_STAGE = en(['FORMING', 'NEW', 'COMING_UP', 'ESTABLISHED', 'DRAW', 'BROKE_OUT', 'FADING', 'ON_ICE', 'ENDED']);
  E.MOTIVE = en(['MONEY', 'GROW', 'FUN']);
  E.NEED = en(['PAID', 'CROWD', 'SLOT', 'SOUND', 'FLOOR', 'MEAL', 'ON_TIME', 'WEEKEND', 'ALL_AGES', 'BILL', 'NAME_RIGHT']);
  E.INSTRUMENT = en(['GUITAR', 'BASS', 'DRUMS', 'VOX', 'KEYS', 'OTHER']);
  E.PERSON_STATE = en(['ACTIVE', 'LEFT_TOWN', 'LEFT_SCENE']);
  /* What a person can be. A person may hold several. */
  E.ROLE = en(['MUSICIAN', 'SOUND', 'SECURITY', 'FLOOR', 'RUNNER', 'ARTIST', 'LODGING', 'OWNER', 'BOOKER', 'CONTACT',
               'REGULAR', 'OUTGOING', 'AGENT']);
  /* Other bookers in town and elsewhere (story 5.2). */
  E.BOOKER = en(['GENRE', 'TALENT_BUYER', 'ANYWHERE', 'KID', 'OLD', 'PEER', 'OUTGOING']);
  E.REGULAR_TYPE = en(['EVERYTHING', 'COUPLE', 'KID_WITH_RIDE', 'SAILOR', 'NIGHT_SHIFT', 'OLD_HEAD', 'OUT_OF_TOWNER']);
  /* Relationship stages for every band and person, cut at 20 / 40 / 60 / 75 (Config.TRUST_STAGES). */
  E.STAGE = en(['SOUR', 'STRANGER', 'WORKING', 'TRUSTED', 'ALLY']);
  /* Things that happened between the player and a band (mechanics 5.4). Sizes and fades are in Config.TRUST_EVENTS. */
  E.TRUST = en(['PAID_AGREED', 'PAID_MORE', 'GOOD_SLOT', 'GOOD_NIGHT', 'FIRST_SHOW', 'WITH_HERO', 'DETAILS', 'FED',
                'THANKED', 'REBOOKED', 'TOUR_BOOKED', 'COLD_BOOKED', 'CAME_OUT', 'GAVE_ALL', 'UNANSWERED', 'DROPPED_ASK',
                'BUMPED', 'EMPTY_ROOM', 'BAD_SOUND', 'PAID_SHORT', 'TOOK_TOO_MUCH', 'CANCELLED', 'BAD_BILL',
                'PROMISE_BROKEN', 'SHORT_ANSWER', 'ASKED_TO_GIVE', 'CLOSED_RANKS', 'LISTED_WRONG', 'NOT_ADVANCED',
                'ASKED_AROUND']);
  /* The hidden traits a request's wording is built from (story 2.3). Flags passed to the request templates. */
  E.TELL = en(['PRO', 'SLOPPY', 'MASS', 'OVERSELL', 'HONEST', 'DESPERATE', 'ESTABLISHED', 'FLAKY', 'REFERRED',
               'OLDER', 'YOUNGER', 'PROMOTES', 'PLEASANT']);

  /* ---------------- Requests, deals, shows ---------------- */
  E.REQ_KIND = en(['COLD', 'REFERRAL', 'RETURNING', 'SWAP', 'LOCAL_ASK', 'RESCUE']);
  E.REQ_TEMPLATE = en(['CAREFUL', 'MASS', 'TOO_BIG', 'FRIEND', 'RESCUE', 'OVERSELL', 'SWAP', 'RETURN', 'KIDS_TOUR',
                       'REUNION', 'TERSE', 'BREAKDOWN', 'LOCAL']);
  E.REQ = en(['NEW', 'REPLIED', 'NEGOTIATING', 'ACCEPTED', 'PASSED', 'LAPSED', 'IGNORED', 'WITHDRAWN']);
  E.LOCAL_ASK = en(['RELEASE', 'BENEFIT', 'FIRST_SHOW', 'EMPTY_NIGHT', 'LAST_SHOW', 'GOING_AWAY']);
  E.VET = en(['LISTEN', 'CLIP', 'HISTORY', 'ASK_BOOKER', 'ASK_AROUND']);
  E.PASS_TONE = en(['SHORT', 'REASON', 'LEAD']);
  E.DEAL = en(['DOOR', 'GUARANTEE', 'GUARANTEE_PLUS', 'VERSUS', 'HAT']);
  E.LOCAL_PAY = en(['FREE', 'GAS', 'FLAT', 'SHARE']);                // how a local band on a bill is paid
  E.SHOW = en(['DRAFT', 'CONFIRMED', 'PLAYED', 'CANCELLED']);
  E.LABEL = en(['LOWKEY', 'NORMAL', 'BIG']);
  E.BILL_ROLE = en(['TOURING', 'LOCAL']);
  E.FLYER_TAG = en(['RECORD_RELEASE', 'BENEFIT', 'LAST_SHOW', 'FIRST_SHOW', 'MATINEE', 'BACK_FROM_TOUR', 'REUNION']);
  E.CANCEL = en(['PLAYER', 'RESPECTED', 'BAND', 'ROOM', 'STORM']);   // who or what cancelled

  /* ---------------- Jobs ---------------- */
  E.JOB = en([
    /* getting the show */
    'ANSWER_REQUEST', 'VET_LISTEN', 'VET_CLIP', 'VET_HISTORY', 'VET_ASK_BOOKER', 'VET_ASK_AROUND',
    'HOLD_ROOM', 'AGREE_TERMS', 'ASK_LOCALS', 'LOCK_BILL', 'CONFIRM_ROOM',
    /* telling people */
    'MAKE_FLYER', 'ANNOUNCE', 'BANDS_SHARE', 'PRINT', 'FLYER_RUN', 'LISTINGS', 'LOCAL_AD', 'MAILING_LIST', 'HAND_OUT',
    'INVITES', 'WEEK_PUSH', 'DAY_OF_POST',
    /* making it run */
    'LINE_UP_CREW', 'SORT_GEAR', 'HOUSE_RULES', 'NEIGHBORS', 'ADVANCE', 'LODGING', 'DAY_BEFORE', 'FOOD',
    /* the night and after */
    'RUN_SHOW', 'THANKS', 'DEBRIEF',
    /* not tied to one show */
    'GO_TO_SHOW', 'VISIT', 'EXTRA_SHIFT', 'HARM_ASK', 'HARM_WORD', 'TOUR_ROUTE', 'TOUR_ADVANCE'
  ]);
  /* How a job gets done.
   * HOURS:   the player (or a helper) spends hours on a planned day. These are the tokens on the day grid.
   * MESSAGE: it is an ask. It goes out that evening with everything else written that day (free), and the job
   *          completes when the answer comes.
   * PROMISE: nothing to schedule. The player ticks it on the job it rides on (Config.JOBS[type].rides) and it is
   *          done when that job is done, adding its hours there. Unticked, it is skipped and says what that costs.
   * AUTO:    other people or the calendar do it. */
  E.JOB_MODE = en(['HOURS', 'MESSAGE', 'PROMISE', 'AUTO']);
  E.JOB_GROUP = en(['GETTING', 'TELLING', 'RUNNING', 'NIGHT', 'FREE']);
  E.JOB_STATUS = en(['TODO', 'PLANNED', 'PROMISED', 'WAITING', 'DONE', 'SKIPPED', 'MOOT']);
  /* Priced choices on promotion jobs (Config.FLYER.PRINT, Config.CHANNELS.PAID_PUSH, Config.CHANNELS.LOCAL_AD). */
  E.PRINT_RUN = en(['SMALL', 'USUAL', 'BIG']);                       // 100, 250, 500 copies
  E.PUSH = en(['LOW', 'MID', 'HIGH']);                               // a paid push on a post
  E.AD = en(['PAPER', 'RADIO']);                                     // the weekly paper, community radio
  E.TIMING = en(['ON_TIME', 'LATE', 'SKIPPED']);                     // also the three text variants of every job
  E.WINDOW = en(['EARLY', 'OPEN', 'CLOSING', 'LATE', 'MISSED', 'DONE', 'NONE']);
  E.EFFORT = en(['ROUGH', 'STANDARD', 'SHARP']);                     // flyer effort and finish
  E.SLIP = en(['WRONG_DATE', 'WRONG_LOADIN', 'CREW_UNCONFIRMED', 'DOUBLE_BOOKED', 'SHORT_ANSWER', 'SHOP_SHUT']);
  E.HELP_OUTCOME = en(['DONE', 'DIFFERENT', 'NOT_DONE_TOLD', 'NOT_DONE_SILENT']);
  E.PAY = en(['CASH', 'LIST', 'FAVOR', 'NOTHING']);

  /* ---------------- Mail ---------------- */
  E.MSG = en(['REQUEST', 'BAND', 'ROOM', 'CREW', 'HELPER', 'BOOKER', 'CONTACT', 'REGULAR', 'SCENE', 'GOSSIP',
              'GAME', 'OFFER', 'HARM', 'HANDOFF']);
  E.ASK = en(['TERMS', 'BAND_PLAY', 'ROOM_HOLD', 'ROOM_CONFIRM', 'HOLDER_RELEASE', 'CREW', 'HELPER_JOB', 'LODGING',
              'CONTACT_VET', 'CONTACT_SHARE', 'QUIET_WORD', 'TOUR_DATE', 'BORROW']);
  E.ASK_STATUS = en(['QUEUED', 'SENT', 'YES', 'NO', 'COUNTER', 'SILENT', 'WITHDRAWN']);
  E.REPLY = en(['INTERESTED', 'OFFER', 'PASS']);                     // the player's reply to a request

  /* ---------------- Stops: why Week.step or Night.next handed control back ---------------- */
  /* EVENING: the day has reached its night and the hours are the player's to spend, until Week.endNight (spec 10). */
  E.STOP = en(['DECISION', 'REPLY', 'SHOW_NIGHT', 'SETTLE', 'NEED_BY', 'EVENING', 'END_OF_WEEK']);
  E.DECISION = en(['INTERRUPT', 'NIGHT_STOP', 'DOORS', 'COUNT', 'SHORTFALL', 'HARM', 'OFFER', 'BURNOUT']);
  E.TIER = en(['GENTLE', 'REAL', 'HARD']);                           // event tiers; HARD is mechanics' "major"
  E.EVENT_WHEN = en(['WEEK', 'NIGHT', 'EITHER']);
  E.SHORTFALL = en(['POCKET', 'ASK_LESS', 'LOCALS_GIVE', 'HAT', 'SHORT_SILENT', 'OFF_RENT']);

  /* ---------------- The model ---------------- */
  E.CAME_FOR = en(['BAND', 'SCENE', 'REGULAR', 'INVITE', 'HANDOUT']);
  E.CHANNEL = en(['ANNOUNCE', 'RUN', 'LISTINGS', 'WOM', 'SHARE', 'ROOM', 'MAIL']);
  E.LENS = en(['TRUTH', 'PAR', 'CALL']);
  /* Which promotion a model run reads: what was really done, or "the usual" done on time (Forecast.usual). */
  E.PROMO_AS = en(['ACTUAL', 'USUAL']);
  E.LUCK = en(['RAIN', 'HEAT', 'COLD', 'SOMETHING_ELSE', 'WORD_GOT_AROUND', 'ROAD', 'FINE_EVENING', 'NOISE']);
  /* Verdict of a night (mechanics 1.11 thresholds, story 3.1 words). WALL reads as TALKED in text. */
  E.VERDICT = en(['ROUGH', 'THIN', 'HELD', 'GOOD', 'TALKED', 'WALL']);
  E.VERDICTS = Object.freeze(['ROUGH', 'THIN', 'HELD', 'GOOD', 'TALKED', 'WALL']);
  /* Heads against Par (art 5.5 words). */
  E.VS_PAR = en(['WELL_UNDER', 'UNDER', 'ABOUT', 'OVER', 'WAY_OVER']);

  /* ---------------- Discovery ---------------- */
  /* Families of hidden numbers. An estimate key is FAMILY-prefix + ids, built by SB.Notebook key helpers:
   *   'aff:<fanGenre>:<bandGenre>'  'draw:<bandId>:<zoneId>'  'cross:<bandId>'  'live:<bandId>'  'rel:<bandId>'
   *   'promo:<bandId>'  'honest:<bandId>'  'night:<gen>:<dow>'  'roomgen:<roomId>:<gen>'  'roomcap:<roomId>'
   *   'roomfit:<roomId>'  'chan:<CHANNEL>:<gen>'  'price:<gen>'  'zone:<zoneId>'  'heat:<genre>'  'person:<personId>' */
  E.HID = en(['aff', 'draw', 'cross', 'live', 'rel', 'promo', 'honest', 'night', 'roomgen', 'roomcap', 'roomfit',
              'chan', 'price', 'zone', 'heat', 'person']);
  E.CONF = Object.freeze({ NONE: 0, RUMOR: 1, HEARD: 2, SEEN: 3, KNOWN: 4 });
  E.CONF_KEY = Object.freeze(['NONE', 'RUMOR', 'HEARD', 'SEEN', 'KNOWN']);
  E.KNOW = en(['NEW', 'LEARNING', 'KNOWS']);                         // feedback knowledge level per cause and context
  E.DIRECTION = en(['WORKS', 'DOESNT', 'DEPENDS', 'NEUTRAL']);       // what a notebook entry says
  E.NOTE_PAGE = en(['CROWDS', 'BANDS', 'ROOMS', 'NIGHTS', 'HEAR', 'DOOR', 'TOWNS', 'MOVING', 'PEOPLE', 'HOW', 'LIST']);
  E.FIVE = en(['SAME_CROWD', 'GOOD_CROSSOVER', 'SOME', 'THIN', 'DONT_MIX']);   // the five-word affinity scale

  /* ---------------- Feedback (story 3.2, 3.3) ---------------- */
  E.CAUSE = en(['GENRE_MIX', 'GEN_MIX', 'ORDER', 'RUNTIME', 'ROOM_FIT', 'AGE_GATE', 'NIGHT', 'PROMO_ANNOUNCE',
                'PROMO_FLYER', 'PROMO_POSTERS', 'PROMO_SHARES', 'PROMO_DMS', 'PROMO_PUSH', 'PROMO_EXIT', 'DOOR_PRICE',
                'DOOR_COUNT', 'SOUND', 'COMPETITION', 'TOWN_EVENT', 'TREND', 'DRAW_AWAY', 'LOCAL_DRAW', 'OVERUSE',
                'REPEAT', 'REGULARS', 'HOSPITALITY', 'PAY', 'ADVANCE', 'VENUE_REP', 'SAFETY']);
  E.VOICE = en(['SOUND', 'DOOR', 'TOURING', 'OLD_HEAD', 'KID', 'REGULAR', 'OWNER', 'POSTS', 'BOOKER', 'HELPER',
                'LOCAL_BAND']);
  /* Which voices can notice which cause, most fitting first. The picker never uses a voice outside this list.
   * Every voice's hobby cause (VOICE_HOBBY, below) lists that voice, so a wrong reading always has a cell to
   * read from; and HELPER is listed wherever a helper's job maps to the cause (02-engine 7.9 step 3). */
  E.CAUSE_VOICES = Object.freeze({
    GENRE_MIX:      ['OLD_HEAD', 'REGULAR', 'TOURING', 'KID', 'POSTS', 'OWNER'],
    GEN_MIX:        ['DOOR', 'OLD_HEAD', 'KID', 'REGULAR', 'OWNER'],
    ORDER:          ['TOURING', 'SOUND', 'DOOR', 'LOCAL_BAND'],
    RUNTIME:        ['SOUND', 'KID', 'OWNER', 'DOOR', 'OLD_HEAD'],
    ROOM_FIT:       ['SOUND', 'TOURING', 'OWNER', 'OLD_HEAD'],
    AGE_GATE:       ['DOOR', 'KID', 'OWNER', 'REGULAR'],
    NIGHT:          ['KID', 'REGULAR', 'DOOR', 'BOOKER'],
    PROMO_ANNOUNCE: ['REGULAR', 'DOOR', 'POSTS', 'TOURING'],
    PROMO_FLYER:    ['DOOR', 'REGULAR', 'HELPER', 'POSTS'],
    PROMO_POSTERS:  ['OLD_HEAD', 'DOOR', 'HELPER'],
    PROMO_SHARES:   ['DOOR', 'LOCAL_BAND', 'TOURING'],
    PROMO_DMS:      ['KID', 'REGULAR'],
    PROMO_PUSH:     ['REGULAR', 'DOOR', 'POSTS'],
    PROMO_EXIT:     ['DOOR', 'BOOKER', 'KID'],
    DOOR_PRICE:     ['KID', 'DOOR', 'REGULAR', 'TOURING'],
    DOOR_COUNT:     ['DOOR', 'TOURING'],
    SOUND:          ['SOUND', 'TOURING', 'OLD_HEAD', 'POSTS'],
    COMPETITION:    ['REGULAR', 'BOOKER', 'DOOR'],
    TOWN_EVENT:     ['REGULAR', 'OWNER', 'DOOR'],
    TREND:          ['KID', 'POSTS', 'BOOKER', 'OLD_HEAD'],
    DRAW_AWAY:      ['TOURING', 'DOOR'],
    LOCAL_DRAW:     ['DOOR', 'LOCAL_BAND', 'REGULAR'],
    OVERUSE:        ['REGULAR', 'LOCAL_BAND', 'OLD_HEAD'],
    REPEAT:         ['REGULAR', 'OLD_HEAD'],
    REGULARS:       ['DOOR', 'REGULAR', 'OLD_HEAD'],
    HOSPITALITY:    ['TOURING', 'OWNER', 'HELPER'],
    PAY:            ['TOURING', 'LOCAL_BAND'],
    ADVANCE:        ['TOURING', 'SOUND', 'OWNER', 'LOCAL_BAND'],
    VENUE_REP:      ['OLD_HEAD', 'REGULAR', 'OWNER', 'KID'],
    SAFETY:         ['OWNER', 'DOOR', 'REGULAR', 'HELPER']
  });
  /* What each voice blames when its reading is wrong (mechanics 2.4). A voice with null is never wrong. */
  E.VOICE_HOBBY = Object.freeze({ SOUND: 'ROOM_FIT', DOOR: null, TOURING: 'PROMO_ANNOUNCE', OLD_HEAD: 'RUNTIME',
                                  KID: 'DOOR_PRICE', REGULAR: 'TOWN_EVENT', OWNER: 'GENRE_MIX', POSTS: null,
                                  BOOKER: 'COMPETITION', HELPER: null, LOCAL_BAND: 'ORDER' });
  E.COMMENT = en(['OBSERVATION', 'READING']);
  E.LEDGER_COL = en(['YOURS', 'HIDDEN', 'LUCK', 'REST']);            // the three columns of the close-out, plus the remainder
  E.DEBRIEF = en(['KIDS', 'OLD_HEADS', 'ROOM', 'MONEY', 'TOURING']);

  /* ---------------- Money and stress ---------------- */
  E.POT = en(['FUND', 'BANK']);
  E.MONEY = en(['DOOR', 'HAT', 'ROOM', 'DEPOSIT', 'SOUND', 'SECURITY', 'INSURANCE', 'DAMAGES', 'HOST', 'TOURING', 'LOCAL', 'PRINT', 'PROMO',
                'FOOD', 'HELPER', 'FLYER', 'MOTEL', 'THEFT', 'WAGES', 'BILLS', 'FEE', 'LOAN', 'MOVE', 'EVENT', 'OTHER']);
  E.BILL = en(['RENT', 'UTILITIES', 'CAR', 'FOOD']);
  E.LADDER = en(['OVERDRAFT', 'EXTRA_SHIFT', 'BORROW', 'LATE_RENT', 'COUCH']);
  E.STRESS_ZONE = en(['STEADY', 'STRETCHED', 'FRIED', 'BURNING_OUT', 'BURNT_OUT']);
  E.STRESS = en(['OVERTIME', 'RAN_SHOW', 'AFTER_SHIFT', 'LOAD', 'BROKE', 'BILLS_MISSED', 'DUD', 'COVERED', 'INCIDENT',
                 'CANCELLED', 'MAJOR', 'HARM_OPEN', 'HOUSEGUEST', 'INBOX', 'LATE_RENT', 'EVENT',
                 'WEEK', 'UNSPENT', 'DAY_OFF', 'PHONE_OFF', 'WENT_OUT', 'GREAT_NIGHT', 'THANKED', 'CUSHION',
                 'NO_SHOW_WEEK', 'JOURNAL', 'WORKOUT', 'SLEPT', 'FRIENDS']);

  /* ---------------- Territory, harm, legacy ---------------- */
  E.WORD_TIER = en(['SKIPPED', 'FREE_NIGHT', 'REAL_STOP', 'ASKED_FOR', 'DESTINATION']);
  E.WORD_TIERS = Object.freeze(['SKIPPED', 'FREE_NIGHT', 'REAL_STOP', 'ASKED_FOR', 'DESTINATION']);
  E.TOUR = en(['PLANNING', 'ASKING', 'READY', 'OUT', 'DONE', 'DROPPED']);
  E.HARM_SOURCE = en(['DIRECT', 'TRUSTED', 'BOOKER', 'SAW_IT', 'RUMOR']);
  E.HARM_ACT = en(['ASK_AROUND', 'LIST', 'QUIET_WORD', 'PULL_SHOW', 'LEAVE']);
  E.HARM_AFTER = en(['LEAVES', 'NEW_BAND', 'DOES_THE_WORK']);        // what becomes of the person
  E.LIST_CONDITION = en(['BAND_PARTS', 'LOOK_AGAIN', 'TALK_FIRST', 'NO']);
  E.MEMORY = en(['BAND_FIRST', 'TOURING_FIRST', 'ROOM_FIRST', 'ROOM_LAST', 'REUNION', 'TURNED_AWAY', 'STORM',
                 'TOWN_FIRST', 'BAND_LAST', 'INCIDENT', 'DECISION', 'OBJECT', 'ORDINARY']);
  E.FIRST = en(['SHOW', 'COLD_ASK', 'RETURN', 'WORD_OF_MOUTH', 'WEEKEND_PICK', 'TIER4', 'TOUR', 'WALL', 'FEEDER_SHOW',
                'ROOM_KEPT', 'STAGE_2', 'STAGE_3', 'WORD_UP', 'OFFER_ROOM', 'OFFER_BAND', 'BAND_FROM_SHOW']);
  E.OFFER = en(['ROOM', 'BAND']);
  E.END = en(['HANDED_ON', 'LAST_SHOW', 'TOOK_ROOM', 'TOOK_BAND']);
  E.STAMP = en(['LATE', 'REMEMBERED', 'PACKED', 'FIRST_SHOW', 'LAST_SHOW', 'KNOWN']);

  /* ---------------- Random streams (SB.rng.stream names). Owner in brackets. ---------------- */
  E.STREAM = Object.freeze({
    WORLDGEN: 'worldgen',   // E3 WorldGen
    NAMES: 'names',         // E3 WorldGen (every generated name)
    BANDS: 'bands',         // E3 Bands
    ROOMS: 'rooms',         // E3 Rooms (owners, closures)
    BOOKERS: 'bookers',     // E3 Rooms (other bookers)
    REQUESTS: 'requests',   // E3 Requests
    TRENDS: 'trends',       // E3 Trends
    CROWD: 'crowd',         // E3 Crowd
    TERRITORY: 'territory', // E3 Territory
    JOBS: 'jobs',           // E1b Jobs (slips)
    MAIL: 'mail',           // E1b Mail
    MONEY: 'money',         // E1a Money
    FEEDBACK: 'feedback',   // E2 Feedback
    DIRECTOR: 'director',   // E4 Director
    PEOPLE: 'people',       // E4 People
    HARM: 'harm',           // E4 Harm
    LEGACY: 'legacy',       // E4 Legacy
    TEXT: 'text'            // any engine module, only as the rng argument of SB.text.line
    /* per show: 'show:' + showId (E2 Night: luck and stops), 'learn:' + showId (E2 Notebook) */
  });

  /* ---------------- Result records (design/spec/02-engine.md section 6) ---------------- */
  E.REC = en([
    /* a day */
    'DAY_START', 'QUIET_DAY', 'JOB_DONE', 'JOB_BLOCKED', 'SLIP', 'HELPER_REPORT', 'MESSAGE', 'ASK_ANSWERED',
    'HOLD', 'REQUEST_GONE', 'EVENT', 'CHOICE', 'OVERTIME', 'MONEY', 'STRESS', 'TRUST', 'NEWS', 'NOTE', 'RANGE', 'EVENING',
    /* a show night */
    'NIGHT_START', 'TICK', 'ARRIVALS', 'SET_START', 'SET_END', 'POST', 'INCIDENT', 'NIGHT_END',
    'SETTLE_LINE', 'SETTLE_DONE',
    /* a show's result */
    'SHOW_RESULT', 'LEDGER', 'LUCK', 'COMMENT', 'LEARNED', 'REGULARS', 'NAME', 'WORD', 'MEMORY', 'DRAW',
    /* a week and beyond */
    'WEEK_SUMMARY', 'BILLS', 'LADDER', 'STAGE', 'FIRST', 'OFFER', 'TOUR_DATE', 'YEAR', 'ENDING'
  ]);

  /* ---------------- Small vocabularies carried in records, views and content keys ---------------- */
  E.NEWS = en(['BAND_FORMED', 'BAND_ENDED', 'BAND_STAGE', 'MEMBER_LEFT', 'MEMBER_JOINED', 'ROOM_OPENED', 'ROOM_CLOSED',
               'TREND_SIGN', 'PERSON_LEFT', 'BOOKER', 'GOSSIP', 'ANNIVERSARY', 'SWAP']);
  E.HOLD_CHANGE = en(['GRANTED', 'SECOND', 'LAPSED', 'CHALLENGED', 'WON', 'LOST', 'RELEASED', 'CONFIRMED']);
  E.GONE = en(['LAPSED', 'TOOK_OTHER', 'WITHDRAWN', 'PASSED']);                 // why a request went away
  E.SIGN = en(['NEW_BANDS', 'OUT_POSTED', 'REQUESTS', 'BOOKERS', 'CONTACT', 'KID']);   // trend signs
  E.LEFT_WHY = en(['MOVED', 'ORDERS', 'SCHOOL', 'LIFE', 'KICKED', 'PARTED']);  // why a member left; PARTED: section 14
  E.CLOSED_WHY = en(['SOLD', 'RENT', 'MARSHAL', 'STORM', 'TIRED', 'COMPLAINTS']);
  E.CHIP = en(['HOURS', 'MONEY', 'TRUST', 'REL', 'STRESS', 'RISK', 'HEADS', 'WORD', 'NAME', 'REGULARS', 'Q']);
  E.FACTOR = en(['PROMO', 'HIDDEN', 'LUCK']);                                  // reference runs besides the CAUSE ones
  E.SRC = en(['PRIOR', 'SHOW', 'SCOUT', 'VET', 'TOLD']);                       // where an estimate came from ('TOLD:<personId>')
  E.FOCUS = en(['SPECIALIST', 'BETWEEN', 'ALLROUNDER']);
  E.PACE = en(['OK', 'TIGHT', 'SHORT']);                                       // will the likely door cover the guarantee
  E.SETTLE = en(['ROOM', 'SOUND', 'SECURITY', 'HOST', 'GUARANTEE', 'LOCAL', 'SHARE', 'INSURANCE', 'DAMAGES', 'COSTS', 'YOU']);   // settle lines, in order
  E.BUZZ = en(['RISING', 'STEADY', 'FADING']);                                 // hearsay about a band
  E.ARROW = en(['UP', 'DOWN']);
  E.DIR = en(['UP', 'DOWN']);                                                  // a cause pushed the night up or down (content key)
  E.HOUSE_TYPE = en(['CARPORT', 'BASEMENT', 'ROWHOUSE', 'GARAGE', 'LIVING_ROOM']);
  E.WEATHER_PRESET = en(['GULF', 'SOUTHEAST', 'NORTHEAST', 'MIDWEST', 'PLAINS', 'MOUNTAIN', 'DESERT', 'PACIFIC_NW',
                         'CALIFORNIA', 'ALASKA']);
  E.CONFIDENCE = en(['VERIFIED', 'PARTLY', 'UNVERIFIED', 'CHECKED', 'UNCHECKED']);
  /* Answers to the "your town" questions a lightly researched city may ask (04-cities section 4.5; state.tune). */
  E.TUNE_NIGHTS = en(['WEEKENDS', 'THURSDAY_TOO', 'ANY']);
  E.TUNE_TOWN = en(['COLLEGE', 'BASE', 'BOTH', 'NEITHER']);
  E.EVENT_AT = en(['DOORS', 'SET:1', 'SET:PEAK', 'CHANGEOVER', 'LATE', 'SETTLE']);   // when in a night an event stops

  /* ---------------- Refusals: Result.code when an action says no ---------------- */
  E.REFUSE = en(['PHASE', 'STOP_PENDING', 'NO_HOURS', 'WRONG_HALF', 'WINDOW', 'NEEDS', 'TAKEN', 'LOCKED', 'STAGE',
                 'RELATIONSHIP', 'NO_MONEY', 'ALREADY', 'TOO_MANY', 'BUSY', 'CONFIRM_LIST', 'BILLS_FIRST', 'PLAN',
                 'BURNT_OUT', 'INVALID', 'OVER', 'NO_TIME']);   // NO_TIME: it does not fit tonight, even staying up

  /* ---------------- Events as data (design/spec/03-content.md section 8) ---------------- */
  /* Who an event is about. The director binds these before an event fires; effects and text refer to them. */
  E.REF = en(['show', 'touring', 'closer', 'opener', 'band', 'room', 'owner', 'sound', 'security', 'floor', 'helper',
              'booker', 'contact', 'person', 'regular', 'zone']);
  /* Condition keys allowed in an event's `when`, an option's `needs`, and a conditional effect. */
  E.COND = en(['daysOut', 'roomKind', 'outdoor', 'ages', 'jobDone', 'jobNotDone', 'months', 'calendar', 'trait',
               'stage', 'bills', 'flag', 'notFlag', 'stress', 'weekMin', 'weekMax', 'hasCrew', 'hasHelper',
               'trust', 'rel', 'deal', 'written', 'label', 'bands', 'fundMin', 'weather', 'slot', 'chokepoint',
               'heatAbove', 'regularsMin', 'onList', 'chance']);
  /* Effect operations the engine can interpret (03-content section 8.4). DISPUTE, ROOM_HOLD and CIRCLE_ADD exist
   * so that the events the engine raises itself (DEAL_DISPUTE, HOLD_CHALLENGED, SOMEBODY_GOOD) are plain data too. */
  E.EFFECT = en(['MONEY', 'STRESS', 'HOURS', 'TRUST', 'REL', 'WORD', 'NAME', 'REGULARS', 'FOLLOWERS', 'SHOW_MOD',
                 'JOB', 'MOVE_SHOW', 'CANCEL_SHOW', 'DROP_BAND', 'ADD_BAND', 'SWAP_ORDER', 'CUT_SET', 'CREW',
                 'ROOM_REL', 'ROOM_PRESSURE', 'STANDING', 'INCIDENT', 'FLAG', 'NOTE', 'MESSAGE', 'FOLLOWUP',
                 'NEW_BAND', 'NEW_ROOM', 'MEMORY', 'FAVOR', 'FLYER_TAG', 'TREND_SIGN', 'DISPUTE', 'ROOM_HOLD',
                 'CIRCLE_ADD', 'CHANCE', 'NOTHING']);
  /* What a DISPUTE effect settles on, what a ROOM_HOLD effect does, and the computed amounts a MONEY effect may name. */
  E.DISPUTE = en(['THEIRS', 'YOURS', 'SPLIT']);
  E.HOLD_DO = en(['CONFIRM', 'RELEASE']);
  E.AMOUNT_OF = en(['DISPUTE', 'GAP', 'MOTEL']);
  /* Keys of a show's night modifiers: what SHOW_MOD effects and night stops change (02-engine section 7.7).
   * set1Presence: the first set's scene presence at the set-2 rate (doors were held). noDispute: the count was
   * watched, so a handshake deal cannot be disputed tonight. uncapped: everyone was let in past the room's limit. */
  E.MOD = en(['headsMul', 'genMul', 'zoneMul', 'reachMul', 'qAdd', 'qMul', 'run', 'soundAdd', 'capMul', 'lateMin',
              'comps', 'doorLeak', 'hatBonus', 'endEarly', 'set1Presence', 'noDispute', 'uncapped']);

  /* ---------------- Flyers and identity: ids shared by ART, CITY and CONTENT ---------------- */
  E.FLYER_TEMPLATE = en(['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10']);
  E.INK = en(['toner', 'copyGray', 'fireRed', 'ballpointBlue', 'bayouTeal', 'oliveDrab', 'fluorPink', 'fluorOrange',
              'fluorYellow', 'mint', 'lavender', 'brick']);
  E.PAPER = en(['copyWhite', 'newsprint', 'goldenrod', 'pastelPink', 'pastelBlue', 'pastelGreen', 'kraft',
                'cardboard', 'blackStock']);
  E.MOTIF = en(['skull', 'bones', 'x', 'bolt', 'star', 'starburst', 'arrow', 'fist', 'horns', 'eye', 'crow', 'cat',
                'speaker', 'cassette', 'record', 'safetyPin', 'barbedWire', 'checker', 'waves', 'sun', 'flower',
                'hurricane', 'anchor', 'oyster', 'mullet', 'palm', 'pineCone', 'routeShield', 'bridgeTruss', 'jet',
                'heart', 'flame', 'snowflake', 'cactus', 'mountain', 'smokestack', 'corn', 'gear']);
  E.PICTURE = en(['crowd', 'van', 'carport', 'palmSky', 'bridgeSpan', 'skateRamp', 'guitarist', 'storm', 'bayou',
                  'basement', 'rowhouses', 'grainElevator', 'mesa', 'pines']);
  E.TREATMENT = en(['marker', 'block', 'bubble', 'stencil', 'nib', 'spike', 'drip', 'tape', 'ransom',
                    'stretchBlock', 'typewriter', 'headline']);
  E.DATE_STYLE = en(['FRI_NOV_20', 'friday_11_20', 'LONG']);

  SB.Enums = Object.freeze(E);
  SB.E = SB.Enums;

})(typeof window !== 'undefined' ? window : globalThis);
