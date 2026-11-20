/* Scene Booker — core/config.js
 * Every tunable constant, under the name mechanics.md section 17 gives it. Data only: no functions.
 *
 * FROZEN CONTRACT FILE. Owned by the architect. Balance changes are made here, by the architect, from harness reports,
 * and each change re-issues js/core/core.sha.
 * Loads after enums.js. Read as SB.Config (alias SB.C).
 *
 * Revision 2 (after review). New or changed, each marked "R2" where it sits: USUAL (what Par assumes), NAME_CLEAN,
 * FLYER_STALE and ANNOUNCE_STALE, the priced promotion menu (FLYER.PRINT, PAID_PUSH, LOCAL_AD), ADDRESS, MAIL,
 * promise jobs and optional jobs in JOBS, FAMILIAR, REQUESTS.SHARE_FLOOR and STAGE1, the stage gates on rooms and
 * deals removed, signed incident q, HARM waiting rules, SHARE_DEAL for every kind of pay. WEATHER_DEFAULT is gone:
 * the presets of 04-cities 4.3 are the only weather defaults.
 *
 * Arrays of three are always [kids, middle, old heads]. Arrays of twelve follow SB.Enums.GENRES. Arrays of seven are
 * Monday to Sunday. Money is whole dollars at Pensacola prices; the engine scales by the city's price index where noted.
 *
 * ================================================================================================================
 * NUMBERS THE DESIGNERS COULD ONLY GUESS. Each block below marked  >>> ASK THE BOOKER  holds values to be replaced
 * with the booker's real answers. They are grouped so one conversation can settle each group:
 *   A. Money on a normal night      (PAY, SPLIT, DOOR)                      mechanics 18 q1, story 12 q2
 *   B. How late is too late         (TAU, LEAD_EXP, job windows in JOBS)    mechanics 18 q2, art 12 q3
 *   C. After someone has done harm  (HARM.BAND_RECOVERY_WEEKS and friends)  mechanics 18 q3, story 12 q1
 *   D. Running order and weeknights (NIGHT_DEFAULT Thursday, PEAK_SLOT)     mechanics 18, last paragraph
 *   E. What makes you say no        (REQUESTS.TELL_WEIGHTS in content)      story 12 q3 — lives in js/content/requests.js
 *   F. Flyers and where they go     (CHANNELS.RUN_DEFAULT, FLYER)           art 12 q1, q2
 * ================================================================================================================
 */
(function (root) {
  'use strict';
  var SB = root.SB;
  var C = {};

  /* ============================== 1. THE FORMULA (mechanics 1) ============================== */

  /* 1.3 Base affinity A[fan][band]: how readily a fan of the row genre comes out for a band of the column genre.
   * The same in every save. Rows and columns in SB.Enums.GENRES order. */
  C.AFFINITY = [
    /*            HC   PP   EM   CR   GA   PO   IN   ME   SK   FP   NO   ST  */
    /* HC */ [1.00, .35, .40, .65, .30, .20, .15, .60, .20, .15, .35, .55],
    /* PP */ [ .40,1.00, .65, .15, .35, .20, .45, .15, .55, .35, .05, .40],
    /* EM */ [ .40, .60,1.00, .20, .20, .40, .60, .20, .25, .45, .20, .15],
    /* CR */ [ .65, .10, .20,1.00, .30, .30, .10, .60, .15, .50, .50, .45],
    /* GA */ [ .30, .35, .15, .30,1.00, .50, .50, .20, .30, .30, .30, .55],
    /* PO */ [ .20, .15, .40, .30, .50,1.00, .60, .25, .10, .20, .45, .20],
    /* IN */ [ .10, .40, .60, .05, .50, .60,1.00, .10, .20, .40, .25, .10],
    /* ME */ [ .55, .10, .15, .60, .20, .25, .10,1.00, .05, .10, .45, .25],
    /* SK */ [ .25, .60, .25, .20, .30, .10, .20, .05,1.00, .40, .05, .50],
    /* FP */ [ .15, .35, .45, .50, .30, .20, .40, .10, .40,1.00, .15, .30],
    /* NO */ [ .35, .05, .20, .50, .30, .45, .25, .45, .05, .15,1.00, .10],
    /* ST */ [ .55, .40, .10, .45, .55, .20, .10, .25, .50, .30, .10,1.00]
  ];
  C.SECOND_GENRE = 0.3;            // a band with a second genre uses 0.7 primary + 0.3 secondary
  C.FIVE_WORD_CUTS = [.80, .50, .30, .15];   // >= .80 same crowd, >= .50 good crossover, >= .30 some, >= .15 thin, else don't mix

  C.QUIRK_COUNT = 6;               // pair quirks per save
  C.QUIRK_SIZE = [.25, .45];       // size of each, either sign
  C.QUIRK_BOTH_WAYS = 0.5;         // chance a quirk applies in both directions
  C.QUIRK_LIFE_WEEKS = 78;         // one dissolves and one forms about every 18 months
  C.NIGHT_QUIRKS = 2;              // night-table cells moved per save
  C.NIGHT_QUIRK_SIZE = 0.15;
  C.ROOM_FIT_QUIRK = 0.15;         // hidden +/- per room on roomGenre
  C.CHANNEL_SHUFFLE = 0.30;        // +/- per channel and generation, per save
  C.SHARES_JITTER = 0.20;          // a save shifts each genre share by up to this

  /* 1.4 Generation profiles G for a band's age reading, and the "everyone comes out" profile. */
  C.GEN_PROFILE = { KIDS: [1.0, .45, .08], MIDDLE: [.45, 1.0, .40], OLD: [.10, .50, 1.0], EVERYONE: [.90, 1.0, .90] };
  C.KIDS_BAND_AGE = 22;            // median member age under this: a kids' band
  C.OLD_BAND_AGE = 36;             // median member age at or over this: an old-head band
  C.OLD_BONUS_PER_4_YEARS = 0.10;  // added to the old-heads weight for every 4 years a band has existed
  C.PULL_CAP = 0.90;

  /* 1.5 */
  C.SCENE_RATE = 0.025;
  C.SCENE_RATE_FEEDER = 1.6;       // multiplier in a feeder town's own room

  /* 1.6 Reach.   >>> ASK THE BOOKER (B): the whole lateness curve hangs on TAU and LEAD_EXP. */
  C.TAU = [12, 19, 26];            // days of notice each generation needs
  C.LEAD_EXP = 1.3;                // lead(d, tau) = 1 - exp(-(d / tau)^LEAD_EXP)
  C.ROOM_TAU = { HOUSE: .8, DIY: .9, HALL: 1.0, BAR: 1.0, CLUB: 1.4, BIG: 1.8, SHOP: .8, OUTDOOR: .8 };
  C.FORGIVING_TAU = 0.7;           // Windows: Forgiving multiplies every tau by this
  C.CHANNELS = {
    ANNOUNCE_CEIL: [.30, .38, .15],
    NAME_REACH: { base: .35, span: .65, followers: 1500 },   // ceiling x (base + span x min(1, followers / 1500))
    ANNOUNCE_NO_FLYER: 0.5,
    ANNOUNCE_SPECIALIST: 1.2,      // in the genres a specialist is known for
    /* >>> ASK THE BOOKER (F): where flyers go and whom they reach. Defaults for a pack that gives no routes. */
    RUN_DEFAULT: [
      { id: 'downtown', ceil: [.06, .16, .18] },
      { id: 'old-side', ceil: [.05, .12, .14] },
      { id: 'work-side', ceil: [.10, .10, .10] },
      { id: 'campus',   ceil: [.16, .09, .03] }
    ],
    FLYER_TAU_FACTOR: 1.15,
    /* R2. Posters get covered and torn down. A route's flyers lose perWeek of their effect for every week they
     * have been up past `after` days, down to `floor`, unless the same route is run again (its lead still counts
     * from the first run; its freshness from the latest).   >>> ASK THE BOOKER (F): is later really fresher? */
    FLYER_STALE: { after: 14, perWeek: .10, floor: .60 },
    /* R2. An announcement older than this many days that nobody pushed the week of counts NO_PUSH twice. */
    ANNOUNCE_STALE: 35,
    LISTING_CEIL: [.03, .10, .28],
    LISTING_DEADLINE: 12,          // in by this many days before, or nothing
    WOM_MAX: [.40, .28, .22],
    WOM_T: 18,                     // word of mouth lead = 1 - exp(-days since announce / WOM_T)
    EXCITE: { base: .5, perTier: .25, hot: .2, big: .1, backFromTour: .25, min: .5, max: 1.5 },
    SHARE_CEIL: [.04, .04, .02],   // each band sharing, x that band's promotes
    SHARE_TAU: 12,
    /* R2. A band with a stake in the door shares harder. SHARE_KEY maps every way a band can be paid
     * (a touring band's DEAL shape, a local band's LOCAL_PAY) to one of the three rates. */
    SHARE_DEAL: { STAKE: 1.2, FLAT: 0.9, FREE: 1.0 },
    SHARE_KEY: { DOOR: 'STAKE', GUARANTEE_PLUS: 'STAKE', VERSUS: 'STAKE', HAT: 'STAKE', SHARE: 'STAKE',
                 GUARANTEE: 'FLAT', FLAT: 'FLAT', GAS: 'FLAT', FREE: 'FREE' },
    ROOM_CEIL: [.03, .12, .20],    // the room's own calendar, x the room's following; only if advanced
    MAIL_LEAD: 0.6,                // mailing list lead uses 0.6 x TAU
    MAIL_AWARE: 1.1,
    NO_PUSH: 0.85,
    NO_DAY_OF: 0.97,
    /* R2. The priced promotion menu (brief, core loop step 6). Dollars x the city's price index. None of it is in
     * "the usual", so none of it is in Par; all of it is in a show's exposure.
     * PAID_PUSH: paid when announcing or with the week-of push. Adds x * gen[g] to the ANNOUNCE ceiling, with a
     * lead that counts from the day it was paid and a tau of `tau` x the usual. One per show; a second replaces it.
     * LOCAL_AD: an ad in the weekly paper or a spot on community radio. It adds its ceiling to the LISTINGS
     * channel (no hidden number of its own), and must be in by `deadline` days before the show. */
    PAID_PUSH: { LOW: { cost: 20, x: .15 }, MID: { cost: 50, x: .30 }, HIGH: { cost: 100, x: .42 }, gen: [.6, 1, .5], tau: .5 },
    LOCAL_AD: { PAPER: { cost: 40, ceil: [.01, .04, .10], deadline: 12 }, RADIO: { cost: 60, ceil: [.02, .05, .07], deadline: 5 } },
    /* R2. A house, yard or DIY room's flyer either prints the address or says "ask a punk" (show.door.address).
     * FULL: noise chance x noise; sketch + sketch for the night; standing lost to any incident x standing.
     * ASK:  run and listing ceilings x askCeil[g] (kids hear through each other); the invitation cap x askInviteCap. */
    ADDRESS: { kinds: ['HOUSE', 'OUTDOOR', 'DIY'], noise: 1.5, sketch: 15, standing: 1.5, askCeil: [1, .5, .5], askInviteCap: 2 },
    REACH_REF: 0.57,
    REACH_CAP: 1.25,
    CLOSE: 0.5,                    // half a band's draw are close fans who also hear from the band
    CLOSE_K: 0.9,
    OUT_OF_TOWN_REACH: 0.25,
    TOUR_REACH: 2.0,               // out-of-town reach near a tour stop, for 26 weeks after a tour
    TOUR_REACH_WEEKS: 26
  };
  C.FLYER = {                      // >>> ASK THE BOOKER (F)
    QUALITY: { ROUGH: 0.85, STANDARD: 1.0, SHARP: 1.15 },
    HOURS:   { ROUGH: 1, STANDARD: 3, SHARP: 5 },
    HELPER: { base: 0.8, perSkill: 0.4 },
    FRIED: -0.15,
    TBA: 0.85,
    MIN: 0.7, MAX: 1.2,
    /* R2. How many copies: what it costs and how many routes it can cover (handouts need any print run).
     * BIG is what reaches the feeder-town routes as well as the city's. */
    PRINT: { SMALL: { copies: 100, cost: 12, routes: 2 }, USUAL: { copies: 250, cost: 25, routes: 4 }, BIG: { copies: 500, cost: 45, routes: 99 } },
    PAID_ARTIST: [0, 40]
  };

  /* 1.7 Regulars and direct asks */
  C.REG_RATE = 0.40;
  C.REG_FLOOR = { SPECIALIST: .40, BETWEEN: .50, ALLROUNDER: .60 };
  C.INVITE = { heads: 6.3, sessions: 2, capBase: 6, capPerRegular: 0.25, earlyDays: 14, early: 0.6, split: [.3, .5, .2] };
  C.HAND_RATE = 0.08;

  /* 1.8 Can */
  C.NIGHT_DEFAULT = [              // >>> ASK THE BOOKER (D): is a Thursday better or worse than this?
    [.45, .50, .55, .65, 1.0, 1.0, .70],
    [.50, .55, .65, .80, 1.0, .95, .65],
    [.35, .40, .50, .65, .90, 1.0, .60]
  ];
  C.SUMMER_KIDS = { months: [6, 7, 8], weeknight: 1.3, cap: .85 };   // mid-August end is approximated by month
  C.MATINEE = [1.0, null, 1.0];    // a Sunday matinee counts as this for kids and old heads; null keeps the table value
  C.ROOM_GEN = {
    HOUSE:   { ALL: [1.10, 1.00, .70] },
    DIY:     { ALL: [1.00, 1.00, .80] },
    HALL:    { ALL: [1.00, .92, .90] },
    BAR:     { A21: [0, 1.05, 1.10], A18: [.45, 1.02, 1.05], ALL: [.80, .95, 1.00] },
    CLUB:    { A21: [0, 1.05, 1.10], A18: [.45, 1.02, 1.05], ALL: [.80, .95, 1.00] },
    BIG:     { A21: [0, 1.00, 1.00], A18: [.45, 1.00, 1.00], ALL: [1.00, 1.00, 1.00] },
    SHOP:    { ALL: [.90, .80, 1.00] },
    OUTDOOR: { ALL: [1.05, 1.00, .75] }
  };
  C.PRICE = {
    WORTH: { base: .7, perBand: .1, perTier: .15, min: .8, max: 2.0 },
    FLAT_TO: 0.75,                 // price / (comfort x worth) at or under this: nobody minds
    SLOPE: 0.8,                    // PRICE_SLOPE between 0.75 and 1.5
    STEEP_FROM: 1.5, STEEP_AT: .40, STEEP_SLOPE: .5, FLOOR: .08,
    HAT_RATE: 0.65
  };
  C.WEATHER = { RAIN_IN: .85, RAIN_OUT: .5, HEAT_NO_AC: .85, HEAT_Q: -5, COLD: .9, FORECAST_DAYS: 5, FORECAST_RIGHT: .75 };
  C.PAYDAY = { firstFriday: 1.05, lastWeek: .95 };
  C.STEAL_K = 0.7;
  C.STEAL_MAX = 0.6;
  C.ROOM_REP = { base: .7, span: .3, kidsParentsUnder: 40, kidsParents: .8 };
  C.HOUSE_RULES_TURNOUT = 1.03;

  /* 1.9 The room, the order, the night score */
  C.OVERSELL = 1.1;
  C.EARLY = [.90, .80, .75];
  C.STAY = [.85, .78, .62];
  C.STAY_FIT = { base: .4, span: .6 };
  C.SCENE_PRESENT = { set1: [.80, .55, .50], set2: [.95, .85, .85], driftFromThird: .07 };
  C.CLOCK = {                      // minutes after midnight; a set that starts after these loses part of a generation
    kidsSchoolNight: 1350, kidsFactor: .75,     // 10:30 p.m., Sunday to Thursday
    oldHeads: 1380, oldFactor: .80,             // 11:00 p.m.
    middleWeeknight: 1440, middleFactor: .85,   // midnight, Sunday to Thursday
    curfewFactor: .4
  };
  C.FEEL = [[0, .15], [.15, .30], [.30, .55], [.50, .80], [.70, .95], [.85, 1.0], [1.0, 1.0], [1.15, .90], [1.4, .70]];
  /* Integration, round 1: likeAt was .4. With A x G (a kids' band's G for the middle generation is about .6) hardly
   * anyone "liked" an opener, and the golden show of mechanics 1.13 scored 59 against its 69. At .15 its sets come
   * out at .53 / .75 / .73 (mechanics: .59 / .75 / .69) and the night at 69. */
  C.ENERGY = { feelExp: .6, base: .5, span: .5, likeBase: .6, likeSpan: .4, likeAt: .15 };   // "likes this band": A x G >= likeAt
  C.SOUND = { pa: .5, person: .5, noPerson: .4 };
  C.ROOM_GENRE = { pitInSeatedBar: .85, quietInLivingRoom: 1.1,
                   pit: ['hardcore', 'crust', 'metal', 'street-punk', 'noise'], quiet: ['indie', 'folk-punk', 'emo'] };
  C.Q_WEIGHTS = [.45, .30, .25];   // peak set, best other set, average of the rest
  C.PEAK_SLOT = 'TOURING';         // the booker (D, 2026-11-18): touring band second to last, big local draw last. The touring set is the peak; with none, the last set
  C.RUN = { onTime: 1.0, over20: .95, cut: .88, lateMinutes: 20 };
  C.SET = { min: 15, max: 45, def: 30, step: 5, changeover: 10, changeoverNoGear: 20, doorsLead: 45 };

  /* 1.10 Luck */
  C.LUCK = {
    SOMETHING_ELSE: { p: .15, size: [-.12, -.06] },   // one generation
    WORD_GOT_AROUND: { p: .10, size: [.08, .15] },    // kids or middle
    ROAD: { size: -.30 },                             // chance from the city pack's chokepoints
    FINE_EVENING: { size: .05 },                      // months from the city pack
    NOISE: { size: .05 }                              // always, +/-
  };
  C.LUCK_SPREAD = 0.08;            // target spread of all luck together (a balance target, not an input)

  /* 1.11 What comes out */
  C.POST_RATE = [.45, .22, .06];
  C.POST = { base: .4, photos: 1.15, followersPerPost: .6, hotPerPoint: .20 };
  C.COMPS_PER_MEMBER = 1;
  C.VERDICT = { WALL: { q: 84, par: 1.2 }, TALKED: { q: 72, par: 1.0 }, GOOD: { q: 60 }, HELD: { q: 48 }, THIN: { q: 35 } };
  C.VS_PAR = [.60, .90, 1.10, 1.40];   // under .60 well under, under .90 under, to 1.10 about, to 1.40 over, else way over

  /* 1.12 Par, the Beat, Name */
  C.FOLLOW_RATE = 0.035;
  C.AWAY_RATE = 0.0035;
  C.AWAY = { sceneRef: 2400, sceneExp: .8, wordBase: .7, wordSpan: .6, nearHours: 4, near: 1.3, knownHere: [1.0, 2.0] };
  C.RETURN_BONUS = [1.4, 1.2];     // second visit after a night of 60 or better, then later visits
  C.RETURN_Q = 60;
  C.PAR = { promotes: .6, shareDay: 24 };
  /* R2. "The usual": what Par assumes was done to tell people. Every job below on its ideal day (the last on-time
   * day), by the player, at standard quality, with the player's real followers, regulars and mailing
   * list, and the public (unshuffled) channel values. Hand-outs, paid pushes, ads, a big print run, a sharp flyer
   * and a second run of a route are beyond the usual: they are how effort beats Par. For a request that arrived
   * after a job's ideal day, the usual does that job `lag` days after the request arrived (short notice has its
   * own Par). `followers` is used only to calibrate REACH_REF, which is by definition the raw reach of the usual
   * for a HALL at 300 followers, averaged over the generations by CITY.GENS: model.test measures it and the
   * architect sets REACH_REF to the measured figure whenever a reach constant changes.
   * SB.Forecast.usual(state, show) builds the promo object; SB.Week.suggest plans exactly these jobs, each in the
   * week its ideal day falls. Running a route earlier than its ideal day can beat the usual; so can running it twice. */
  C.USUAL = { followers: 300, effort: 'STANDARD', print: 'USUAL', listings: true, mail: true, invites: 2,
              push: true, dayOf: true, address: 'ASK', lag: 2 };
  C.STANDARD_PLAN = C.USUAL;       // the name mechanics 17 uses
  C.BEAT = { heads: .6, q: .4, qSpan: 25 };
  C.NAME_K = 6;
  /* R2. Diligence has its own slow track. A clean night (on time, no incident, everyone paid as agreed) adds
   * d * (1 - name / until), never less than 0: being reliable gets a booker known up to a point, and past it only
   * nights that beat what the town expected do. */
  C.NAME_CLEAN = { d: 1.5, until: 30 };
  C.NAME_MAX = 100;
  C.NAME_SIZE = { ref: 60, min: .5, max: 1.6 };
  C.LABELS = { LOWKEY: { par: .6, name: .5 }, NORMAL: { par: 1, name: 1 }, BIG: { par: 1.3, name: 2 } };
  C.NAME_IDLE = { after: 4, perWeek: .25 };
  C.NAME_FLOOR = { abs: 5, ofPeak: .5 };
  C.NAME_START = 5;
  C.FOLLOWERS_START = 120;

  /* ============================== 2. DISCOVERY (mechanics 2) ============================== */

  C.PRIOR = {                      // what anyone would assume about each family of hidden number
    aff: .25,                      // base value +/- this
    draw: [.4, 1.8],               // public figure x this range
    cross: [0, 1],
    live: [30, 90],
    rel: [.3, 1], promo: [.1, 1], honest: [.2, 1],
    night: .15, roomgen: .15,
    roomcap: [.8, 1.15],           // stated capacity x this
    roomfit: .15,
    chan: .30,                     // default x (1 +/- this)
    price: 2,                      // dollars either way
    zone: .40,
    heat: [-1, 1],
    person: [.3, 1]
  };
  C.LEARN = 0.45;
  C.CLARITY_MIN = 0.02;
  C.OBSERVATION_BONUS = 1.25;
  C.SCOUT_RATE = 0.6;
  C.SCOUT_LIVE = 0.5;              // going to a show narrows each band's live range to this fraction
  C.HUNCH = 0.8;                   // being told narrows to this fraction
  C.STALE = { perQuarter: .04, draws: .08 };
  C.CONF_CUTS = [.60, .30, .12];   // width as a share of the prior: over .60 rumor, .30-.60 heard, .12-.30 seen, under known
  C.FOG = { OPEN: { learn: 2 }, NORMAL: { learn: 1 }, HARD: { learn: 1, bandFloor: .12 } };
  C.VET = {                        // what each vetting action does to the band's ranges (fraction of current width)
    LISTEN:     { live: .5, cross: .8, genre: true },
    CLIP:       { live: .27, cross: .45, members: true },
    HISTORY:    { draw: .5, honest: .45, members: true },
    ASK_BOOKER: { draw: .35, rel: .4, honest: .4, warn: true, needsContact: true },
    ASK_AROUND: { draw: .7, knownHere: true, warn: true }
  };
  C.READING_TRUE = 0.85;
  C.COMMENTS = { base: 4, surprises: 3, controlled: 1, regularAt: 15, debrief: 2 };
  C.KNOW_AT = [1, 2];              // true comments heard on a cause and context: 1 learning, 2 knows
  C.CALL_K = 1.3;

  /* ============================== 3. THE WEEK (mechanics 3) ============================== */

  C.HOURS = { shift: { DAY: 1, NIGHT: 2 }, off: { DAY: 3, NIGHT: 3 } };
  C.SHIFTS = { FULL: [0, 1, 2, 3, 4], PART: [0, 2, 4], NONE: [] };   // weekdays worked (0 = Monday)
  C.BILLS_OFF_BUSY = [0, 2, 4];    // with bills off, three short days stand in for a life: 33 hours a week
  C.OVERTIME_MAX = 3;
  C.SHIFT_DROPS_PER_MONTH = 2;
  C.SHOW_NIGHT_HOURS = { DAY: 2, NIGHT: 3 };   // what RUN_SHOW reserves on a show day; the only source for its hours
  /* R2. Messages. Everything written goes out that evening for nothing, up to freePerDay items; each further
   * perHour items (or part) cost one Night hour. A phone-off day sends and delivers nothing and eases stress
   * (STRESS.DOWN.PHONE_OFF); at most phoneOffPerWeek. */
  C.MAIL = { freePerDay: 5, perHour: 5, phoneOffPerWeek: 2 };
  C.FEEDER_DRIVE_HOURS_PER_30MIN = 1;   // each way, for a show in a feeder town

  /* 3.3 Waiting on other people: [min, max] days and the chance of no answer at all. */
  C.WAIT = {
    LOCAL_BAND: { base: 5, perTrust: 4, min: .5, silent: .20, silentExp: 1.5, inPersonYes: .10 },
    TOURING: { days: [1, 3], silent: .10 },
    BAR: { days: [1, 3], silent: .05 },
    HALL: { days: [2, 5], weekdaysOnly: true, silent: .10 },
    HOST: { days: [0, 0], silent: 0 },
    CONTACT: { days: [1, 6], silentCold: .40, silentKnown: .05, knownAt: 50 },
    ARTIST: { days: [2, 5], silent: .05 },
    HELPER: { days: [0, 0], silent: 0 },
    HOLDER: { days: [1, 3], silent: .05 }
  };
  C.ADVANCE_FORGOT = { without: .08, withAdvance: .01 };
  C.NOT_ADVANCED = { bandLate: 2.0, touringTrust: -3 };
  C.NO_DAY_BEFORE = 1.5;           // no-shows this much likelier
  C.NO_GEAR = { changeover: 10, nothingToPlayThrough: .08 };
  C.UNLOCKED_BILL_LATE_MIN = 25;   // minutes the night slips when nobody locked the order

  /* 3.4 Every job.   >>> ASK THE BOOKER (B): each `ideal` is "the last day this is still on time".
   * mode      HOURS | MESSAGE | AUTO                      group  for the tray and the show page
   * hours     the player's hours                          half   DAY | NIGHT | ANY
   * clock     SHOW: opens / ideal / missed are days before the show (negative = days after it)
   *           REQUEST: on time until the request's reply-by date        HOLD: on time until the hold expires
   *           CONFIRM: on time until the room is confirmed, late after
   * opens     first day it can be done (null: as soon as `needs` are done)
   * ideal     last on-time day          missed  from this day on it does nothing      (late is everything between)
   * by        overrides per room kind   needs   job types that must be DONE first     kinds  room kinds it applies to
   * helper    role that can do it ('CIRCLE': anyone in the circle)   helperStage  the stage from which they will
   * repeat    ROUTE | BAND | a number   again   extra instances the player may add (a second run of a route)
   * cost      dollars [min, max]        opt     the priced choice made when it is planned (PRINT_RUN, PUSH, AD)
   * rides     PROMISE jobs only: the job it is ticked on and done with; its hours are added there
   * optional  true: never part of "the usual", never counted late, no skipped line. It exists to be chosen.
   * A need on a repeated job is met when every instance of it is DONE or MOOT. */
  C.JOBS = {
    ANSWER_REQUEST: { mode: 'MESSAGE', group: 'GETTING', hours: 0, half: 'ANY', clock: 'REQUEST' },
    VET_LISTEN:     { mode: 'HOURS', group: 'GETTING', hours: 1, half: 'ANY', clock: 'CONFIRM' },
    VET_CLIP:       { mode: 'HOURS', group: 'GETTING', hours: 1, half: 'ANY', clock: 'CONFIRM' },
    VET_HISTORY:    { mode: 'HOURS', group: 'GETTING', hours: 1, half: 'ANY', clock: 'CONFIRM' },
    VET_ASK_BOOKER: { mode: 'MESSAGE', group: 'GETTING', hours: 0, half: 'ANY', clock: 'CONFIRM' },
    VET_ASK_AROUND: { mode: 'HOURS', group: 'GETTING', hours: 1, half: 'ANY', clock: 'CONFIRM' },
    HOLD_ROOM:      { mode: 'MESSAGE', group: 'GETTING', hours: 0, half: 'ANY', clock: 'REQUEST' },
    AGREE_TERMS:    { mode: 'MESSAGE', group: 'GETTING', hours: 0, half: 'ANY', clock: 'CONFIRM', needs: ['HOLD_ROOM'] },
    /* R2. Locals are asked a week before the bill has to lock, so an on-time ask can give an on-time lock. */
    ASK_LOCALS:     { mode: 'MESSAGE', group: 'GETTING', hours: 0, half: 'ANY', clock: 'SHOW', opens: null, ideal: 35, missed: 0, repeat: 'BAND',
                      by: { HOUSE: { ideal: 28 }, SHOP: { ideal: 28 }, OUTDOOR: { ideal: 28 }, CLUB: { ideal: 49 } } },
    LOCK_BILL:      { mode: 'HOURS', group: 'GETTING', hours: 1, half: 'ANY', clock: 'SHOW', opens: null, ideal: 28, missed: 0,
                      by: { HOUSE: { ideal: 21 }, SHOP: { ideal: 21 }, OUTDOOR: { ideal: 21 }, CLUB: { ideal: 42 } },
                      needs: ['ASK_LOCALS'] },
    CONFIRM_ROOM:   { mode: 'MESSAGE', group: 'GETTING', hours: 0, half: 'ANY', clock: 'HOLD', needs: ['HOLD_ROOM'] },

    MAKE_FLYER:     { mode: 'HOURS', group: 'TELLING', hours: 3, half: 'ANY', clock: 'SHOW', opens: null, ideal: 28, missed: 0,
                      by: { HOUSE: { ideal: 21 }, SHOP: { ideal: 21 }, OUTDOOR: { ideal: 21 }, CLUB: { ideal: 42 } },
                      needs: ['CONFIRM_ROOM'], helper: 'ARTIST', cost: [0, 40] },
    ANNOUNCE:       { mode: 'HOURS', group: 'TELLING', hours: 1, half: 'ANY', clock: 'SHOW', opens: 70, ideal: 28, missed: -1,
                      by: { HOUSE: { ideal: 21 }, SHOP: { ideal: 21 }, OUTDOOR: { ideal: 21 }, CLUB: { ideal: 42 } },
                      needs: ['CONFIRM_ROOM'], opt: 'PUSH', cost: [0, 100] },
    BANDS_SHARE:    { mode: 'AUTO', group: 'TELLING', hours: 0, half: 'ANY', clock: 'SHOW', opens: null, ideal: 24, missed: -1,
                      needs: ['MAKE_FLYER', 'ANNOUNCE'] },
    PRINT:          { mode: 'HOURS', group: 'TELLING', hours: 1, half: 'DAY', clock: 'SHOW', opens: null, ideal: 19, missed: 1,
                      needs: ['MAKE_FLYER'], opt: 'PRINT_RUN', cost: [12, 45] },
    /* R2. One instance per route the print run can cover; `again: 1` lets the player add a second run of a route
     * to freshen it (FLYER_STALE). A town route costs a paid runner PAY.HELPER_RUN_TOWN. */
    FLYER_RUN:      { mode: 'HOURS', group: 'TELLING', hours: 2, half: 'DAY', clock: 'SHOW', opens: 42, ideal: 18, missed: 1,
                      needs: ['PRINT'], helper: 'RUNNER', repeat: 'ROUTE', again: 1, cost: [15, 40] },
    LISTINGS:       { mode: 'HOURS', group: 'TELLING', hours: 1, half: 'ANY', clock: 'SHOW', opens: 49, ideal: 12, missed: 11,
                      needs: ['CONFIRM_ROOM'], helper: 'CIRCLE', helperStage: 3 },
    LOCAL_AD:       { mode: 'HOURS', group: 'TELLING', hours: 1, half: 'ANY', clock: 'SHOW', opens: 42, ideal: 12, missed: 4,
                      needs: ['CONFIRM_ROOM'], opt: 'AD', cost: [40, 60], optional: true },
    MAILING_LIST:   { mode: 'HOURS', group: 'TELLING', hours: 1, half: 'ANY', clock: 'SHOW', opens: 28, ideal: 7, missed: 0,
                      needs: ['ANNOUNCE'] },
    HAND_OUT:       { mode: 'HOURS', group: 'TELLING', hours: 3, half: 'NIGHT', clock: 'SHOW', opens: 21, ideal: 3, missed: 0,
                      needs: ['PRINT'], optional: true },
    INVITES:        { mode: 'HOURS', group: 'TELLING', hours: 1, half: 'ANY', clock: 'SHOW', opens: 21, ideal: 2, missed: 0,
                      needs: ['ANNOUNCE'], repeat: 2, helper: 'CIRCLE', helperStage: 3 },
    WEEK_PUSH:      { mode: 'HOURS', group: 'TELLING', hours: 1, half: 'ANY', clock: 'SHOW', opens: 7, ideal: 2, missed: 0,
                      needs: ['ANNOUNCE'], opt: 'PUSH', cost: [0, 100] },
    DAY_OF_POST:    { mode: 'PROMISE', rides: 'RUN_SHOW', group: 'TELLING', hours: 0, half: 'DAY', clock: 'SHOW', opens: 0, ideal: 0, missed: -1,
                      needs: ['ANNOUNCE'] },

    LINE_UP_CREW:   { mode: 'MESSAGE', group: 'RUNNING', hours: 0, half: 'ANY', clock: 'SHOW', opens: null, ideal: 14, missed: -1 },
    /* R2. The jobs with nothing to schedule are promises ticked on the advance (or carried by the show day). */
    SORT_GEAR:      { mode: 'PROMISE', rides: 'ADVANCE', group: 'RUNNING', hours: 1, half: 'ANY', clock: 'SHOW', opens: null, ideal: 7, missed: -1 },
    /* The first time ever it is an hour of writing the rules down (HOURS). Once player.houseRules is set it is a
     * free promise on the advance. */
    HOUSE_RULES:    { mode: 'HOURS', group: 'RUNNING', hours: 1, half: 'ANY', clock: 'SHOW', opens: null, ideal: 28, missed: -1,
                      by: { HOUSE: { ideal: 21 }, SHOP: { ideal: 21 }, OUTDOOR: { ideal: 21 }, CLUB: { ideal: 42 } },
                      thenPromise: { rides: 'ADVANCE', hours: 0 } },
    NEIGHBORS:      { mode: 'HOURS', group: 'RUNNING', hours: 1, half: 'DAY', clock: 'SHOW', opens: 2, ideal: 1, missed: -1,
                      kinds: ['HOUSE', 'OUTDOOR', 'DIY'] },
    ADVANCE:        { mode: 'HOURS', group: 'RUNNING', hours: 2, half: 'ANY', clock: 'SHOW', opens: 14, ideal: 10, missed: 0,
                      needs: ['LOCK_BILL'], helper: 'CIRCLE', helperStage: 3 },
    LODGING:        { mode: 'MESSAGE', group: 'RUNNING', hours: 0, half: 'ANY', clock: 'SHOW', opens: null, ideal: 7, missed: -1 },
    DAY_BEFORE:     { mode: 'PROMISE', rides: 'ADVANCE', group: 'RUNNING', hours: 0, half: 'ANY', clock: 'SHOW', opens: 1, ideal: 1, missed: 0 },
    FOOD:           { mode: 'PROMISE', rides: 'RUN_SHOW', group: 'RUNNING', hours: 1, half: 'DAY', clock: 'SHOW', opens: 0, ideal: 0, missed: -1, cost: [15, 40] },

    /* R2. RUN_SHOW has no hours of its own: it reserves SHOW_NIGHT_HOURS on the show day (Day and Night), plus the
     * hours of the promises that ride on it and the drive to a feeder town. */
    RUN_SHOW:       { mode: 'AUTO', group: 'NIGHT', hours: 0, half: 'ANY', clock: 'SHOW', opens: 0, ideal: 0, missed: -1 },
    THANKS:         { mode: 'HOURS', group: 'NIGHT', hours: 1, half: 'ANY', clock: 'SHOW', opens: -1, ideal: -2, missed: -8 },
    DEBRIEF:        { mode: 'HOURS', group: 'NIGHT', hours: 1, half: 'ANY', clock: 'SHOW', opens: -1, ideal: -3, missed: -4, optional: true },

    GO_TO_SHOW:     { mode: 'HOURS', group: 'FREE', hours: 3, half: 'NIGHT' },
    VISIT:          { mode: 'HOURS', group: 'FREE', hours: 2, half: 'DAY' },
    EXTRA_SHIFT:    { mode: 'HOURS', group: 'FREE', hours: 6, half: 'DAY' },
    HARM_ASK:       { mode: 'HOURS', group: 'FREE', hours: 1, half: 'ANY', repeat: 2 },
    HARM_WORD:      { mode: 'HOURS', group: 'FREE', hours: 1, half: 'ANY' },
    TOUR_ROUTE:     { mode: 'HOURS', group: 'FREE', hours: 2, half: 'ANY' },
    TOUR_ADVANCE:   { mode: 'HOURS', group: 'FREE', hours: 3, half: 'ANY' }
  };
  C.THANKS = { posts: 1.15, trust: 1 };
  C.VISIT = { ownerRel: 4 };       // coming in to ask instead of messaging; the answer is on the spot. R2: was 2
  /* R2. Work gets lighter with people and rooms you know. A room the player has put roomShows shows in waives
   * HOUSE_RULES and NEIGHBORS and halves ADVANCE (and SORT_GEAR rides free). A band at bandTrust shares the flyer
   * the day after it exists, unprompted, and never needs the day-before confirmation. */
  C.FAMILIAR = { roomShows: 3, bandTrust: 60 };
  C.SCOUT = { stressOwnSake: -5, stressScouting: -2.5, meetChance: .5 };

  /* 3.6, 3.7 The director */
  C.DIRECTOR = {
    minor: 1, minorPerTwoShows: 1, minorMax: 3,
    hardMax: 1, hardNeverTwoWeeksRunning: true, hardNotBeforeWeek: 5, gentleOnlyBeforeWeek: 5,
    quietAfterHardNight: true,
    /* R2. Doors and the count stop the night only when there is something to decide (02-engine 5.6). Every night
     * has at least `min` stops and at most `max`. Doors is raised when the room at the first set would hold under
     * doorsUnder of the Call's middle, or when holding fifteen minutes would cross a curfew or a clock. */
    nightStops: { min: 1, max: 4, doorsUnder: .5 },
    cityEventShare: 0.35           // of drawn events, the share taken from the city pack when it has any eligible
  };

  /* 3.8, 13.1 Stages */
  /* R2. Stages are recognition, not permission. No room and no deal is locked behind a stage: a room is had through
   * its owner, its deposit and what it needs to confirm (7.14), and any deal can be offered once its exposure has
   * been shown. What a stage changes is who thinks of the player: which tours write (REQUESTS.STAGE1), who offers
   * to help, what helpers will take on, tours for local bands, and offers. */
  C.STAGES = {
    2: { name: 15, shows: 5 },
    3: { name: 45, word: 40, shows: 30 },
    4: { name: 60, word: 60 }
  };
  C.STAGE_HELPERS = 2;             // people start offering to help
  C.STAGE_HELPER_JOBS = 3;         // helpers will take invitations, listings and the advance (JOBS.helperStage)
  C.STAGE_TOURS = 3;               // a tour for a local band

  /* ============================== 4. REQUESTS AND DEALS (mechanics 4) ============================== */

  C.REQUESTS = {
    SEASON: [.5, .6, 1.0, .9, .9, 1.2, 1.2, 1.0, .8, 1.0, .7, .4],   // January to December
    STOP: { base: .15, perWord: .6 },                                // chance a passing tour wants the town
    SHARE_EXP: 1.3,                                                  // w = Name^1.3 x match
    /* R2. Small tours do not all write the big bookers: the player's share of passing tours is never under this. */
    SHARE_FLOOR: .25,
    /* R2. At stage 1 cold asks start in week `fromWeek` (after the scripted opening), come only from bands of tier
     * `maxTier` or under, ask for the door, and want a Sunday-to-Thursday date `weeknight` of the time. */
    STAGE1: { fromWeek: 4, maxTier: 1, weeknight: .7 },
    MATCH: { known: 1.5, booked: 1.0, never: .5 },
    REFERRAL: { perTrustedBand: .04, perContact: .06, trustAt: 50, contactAt: 50 },
    RETURN: { p: .6, hostAbove: .3, weeks: [26, 60] },
    SWAP: { perContact: .03, contactAt: 50 },                        // R2: per contact at this strength or better
    LOCAL_ASK_PER_WEEK: .25,                                         // about one a month, from the first week (R2)
    REPLY_BY: [3, 10],                                               // days the band will wait
    FOLLOWUP_DAYS: [8, 14],
    DATES: [1, 3],
    LEAD_DAYS: [21, 70],                                             // how far ahead a tour asks; RESCUE is 3 to 6
    OVERSELL: [{ p: .60, x: [1.0, 1.2] }, { p: .30, x: [1.2, 1.7] }, { p: .10, x: [1.7, 2.5] }],
    CONVERSION: { range: [.4, 2.2], common: [.7, 1.4] },
    GOOD_TELLS: { honestAt: .7, p: .8, count: 3 },                   // an honest band writes 3+ good tells 80% of the time
    BAD_TELLS: { hypeAt: 1.7, p: .7, count: 2 },
    RACE: .5,                                                        // chance another booker in town got the same message
    NEGOTIATE_MAX: 3
  };
  C.VAN_COST = { perMile: .21, perMember: 10, dayOff: .6, hosted: 40, wordBase: 1.15, wordSpan: .3 };
  C.ASK_OVER_FLOOR = [1.3, 2.0];
  C.HANDSHAKE_DISPUTE = 0.25;
  C.DOOR_DEAL_PCT = [.6, .8];
  C.PLUS_SHARE = 0.5;              // "guarantee plus": this share of what is left after costs

  /* 4.6 When the door does not cover it. trust / word / rel are changes; share is how much of the gap it covers. */
  C.SHORTFALL = {
    POCKET:       { trust: 3, word: .3, stress: 5 },
    ASK_LESS:     { trust: [-12, -4], word: -.5, share: [.4, 1], softenedByHost: true },
    LOCALS_GIVE:  { localTrust: -2, offerFreeAt: 60 },
    HAT:          { perHead: [1, 2], minQ: 60, oncePerNight: true },
    SHORT_SILENT: { trust: -20, word: -6, spreads: true },
    OFF_RENT:     { ownerRel: -8, keepsDeposit: true }
  };
  /* 4.7 Passing and cancelling */
  C.PASS = { answered: { word: .1 }, passedOn: { rel: 3 }, never: { word: -.3 }, neverManyPerQuarter: 5 };
  C.CANCEL = {
    far:    { days: 28, trust: -5, word: -1 },
    mid:    { days: 14, trust: -12, word: -3, locals: -4, room: -5 },
    near:   { trust: -25, word: -6, locals: -8, room: -10, deposit: true, regulars: -.03 },
    respected: 1 / 3,
    stress: 6
  };

  /* 8.2 The split.   >>> ASK THE BOOKER (A): what is left after costs, and who gets it. */
  C.SPLIT = { custom: [.5, .25, .25], FAIR_SHARE: .40, takeNothing: { trust: 2, word: .3 }, takeTooMuch: { trust: -3, word: -1 } };

  /* ============================== 5. BANDS (mechanics 5) ============================== */

  C.TIERS = [10, 36, 96, 240];     // draw at which a band becomes tier 1, 2, 3, 4, for a scene of 2,400 (scaled by scene size)
  C.BAND_ASK = [[0, 0], [0, 40], [50, 120], [150, 400], [500, 900]];   // dollars by tier, x the city's price index
  C.MOTIVE_ASK = { MONEY: 1.3, GROW: .5, FUN: .3 };
  C.TRUST_ASK = 250;               // ask x (1 - trust / 250)
  C.HOT_ASK_PER_HALF_POINT = 0.15;
  /* base was .35 and bill .15: a local band whose sound fits the bill said yes to a new booker 40% of the time (free bands, 500 asks);
   * now about 70%, while a wrong bill stays mostly no (20% -> 16%). */
  C.YES = { base: .50, perTrust: .004, bill: .45, slot: .10, money: .15, room: .05, worn: -.20, min: .02, max: .97,
            moneyFloor: 20, wornDays: 14,
            shortDays: 7, lastDays: 2 };   // R2: asked inside shortDays needs TRUST_AT.shortNotice; inside lastDays, TRUST_AT.solid
  C.BAND_FREE = [.70, .90];        // share of nights a band is free before other shows are counted
  C.BAND_GAP_DAYS = 5;             // a band will not take two shows in town within this
  C.EAR_CONV = 0.04;
  C.EAR = { liveRef: 70, liveExp: 2, slot: { opening: .8, middle: 1.0, peak: 1.0, closingAfterPeak: .9 } };
  C.BUZZ_FADE = 0.10;
  C.BUZZ_DRAW = 0.01;              // each week D x (1 + BUZZ_DRAW x buzz)
  C.NEGLECT = { afterWeeks: 10, perWeek: .01, floor: .60 };
  C.FOLLOWER_LAG = 0.15;           // followers move this share of the way to draw / FOLLOW_RATE each week
  C.TRUST_START = { base: 30, introduced: 40, warned: 20 };
  C.TRUST_DRIFT = { perMonth: 1, toward: 30, slowAbove: 60 };
  C.TRUST_STAGES = [20, 40, 60, 75];   // under 20 sour, to 39 stranger, to 59 working, to 74 trusted, 75 up ally
  C.TRUST_AT = { noAnswer: 20, shortNotice: 45, solid: 60, close: 75, closeDiscount: .40 };
  /* Trust events: size, weeks to fade, and the part that never fades. Ranges are scaled by the engine (see 02-engine 7). */
  C.TRUST_EVENTS = {
    PAID_AGREED:    { size: 4, fade: 26, keep: 1 },
    PAID_MORE:      { size: 6, fade: 26, keep: 2 },
    GAVE_ALL:       { size: 2, fade: 26, keep: 0 },
    GOOD_SLOT:      { size: 3, fade: 13, keep: 0 },
    GOOD_NIGHT:     { size: [2, 6], fade: 26, keep: 0 },     // 2 at Q 60, 6 at Q 90
    FIRST_SHOW:     { size: 10, fade: 0, keep: 10 },
    WITH_HERO:      { size: 5, fade: 26, keep: 2 },
    DETAILS:        { size: 1, fade: 9, keep: 0 },
    FED:            { size: 1, fade: 9, keep: 0 },
    THANKED:        { size: 1, fade: 9, keep: 0 },
    REBOOKED:       { size: 2, fade: 26, keep: 0 },
    TOUR_BOOKED:    { size: 15, fade: 52, keep: 8 },
    COLD_BOOKED:    { size: 3, fade: 0, keep: 3 },
    CAME_OUT:       { size: 5, fade: 26, keep: 1 },
    UNANSWERED:     { size: -2, fade: 9, keep: 0 },
    DROPPED_ASK:    { size: -2, fade: 9, keep: 0 },
    BUMPED:         { size: -6, fade: 26, keep: 0 },
    EMPTY_ROOM:     { size: -4, fade: 17, keep: 0 },
    BAD_SOUND:      { size: -3, fade: 13, keep: 0 },
    NOT_ADVANCED:   { size: -3, fade: 13, keep: 0 },
    PAID_SHORT:     { size: [-20, -8], fade: 52, keep: -3 },
    TOOK_TOO_MUCH:  { size: -3, fade: 26, keep: 0 },
    ASKED_TO_GIVE:  { size: -2, fade: 13, keep: 0 },
    CANCELLED:      { size: [-25, -5], fade: 52, keep: 0 },
    BAD_BILL:       { size: -10, fade: 52, keep: 0 },
    PROMISE_BROKEN: { size: -4, fade: 26, keep: 0 },
    SHORT_ANSWER:   { size: -3, fade: 9, keep: 0 },
    CLOSED_RANKS:   { size: -10, fade: 52, keep: 0 },
    ASKED_AROUND:   { size: -3, fade: 13, keep: 0 },         // R2: word got back that the player was asking about them
    LISTED_WRONG:   { size: -15, fade: 104, keep: -3 }
  };
  C.HOST_SCORE = { paidMore: .3, brokenPromise: -.5, wellAbove: .3, badBelow: -.3 };
  C.WEAR = { base: .30, oldHead: .45, brandNew: .20, weeks: 3, window: 10 };
  C.PLAYED_OUT = { fresh: .7, weeks: 12, penalty: .10, tagWeeks: 13 };
  C.BAND_END = { FORMING: .02, NEW: .009, COMING_UP: .005, ESTABLISHED: .003, DRAW: .002, BROKE_OUT: .002,
                 FADING: .006, ON_ICE: .01, lowCohesion: 3, lowCohesionAt: .35, iceReturn: .01, reunion: .001,
                 relocatePerMonth: .01, coldAt: -.3, coldMul: 1.5 };
  C.MEMBER_LEAVE = 0.0025;         // per member per week, plus the city's churn
  C.MEMBER = { outWeeks: [2, 10], replaced: .70, liveShift: 8, reopen: .5, size: [3, 5] };
  C.POOL = { start: [10, 10, 6, 2], perSceneRef: 2400, formPerYear: 9, musicians: 130, inTwoBands: .25, rejoin: .60,
             sources: { exMembers: .60, fromShows: .25, newToTown: .15 }, newBandDraw: .3, touringCircle: [3, 8] };

  /* ============================== 6. THE CROWD (mechanics 6) ============================== */

  C.TURNOVER = { kidsToMiddle: .17, middleToOld: .07, middleStop: .06, oldStop: .05, middleArrive: .04 };
  C.ALLAGES_REF = 24;
  C.KID_INTAKE_CLAMP = [.4, 1.6];
  C.REG_WIN = { ROUGH: 0, THIN: 0, HELD: .01, GOOD: .03, TALKED: .06, WALL: .10, sheet: 1.5 };
  C.REG_CAP = 0.15;
  C.REG_LOSS = { THIN: .03, ROUGH: .08, forgiveWeeks: 8, incident: [.05, .15], idleAfterWeeks: 5, idlePerWeek: .015,
                 pricey: { over: 1.3, shows: 5, loss: .02 }, cancelNear: .03 };
  C.REGULAR_FACES = 6;
  C.DRIVE_TAU = [22, 40, 30];
  C.DRIVE_BOOST = { weekend: 1.3, tier3: 1.5, hometownBand: 2.5, regulars: 1.5, tourPlaysThem: .3 };
  C.BURN = [.35, .20, .45];
  C.BURN_WINDOW = 14;
  C.BURN_OWN = 1.5;
  /* Looking ahead: a similar show that the public knows about, on one of the next few nights and bigger than this one,
   * adds to the burnout load (people save their money and their night for it). days[i]: weight i + 1 nights after.
   * Size is the public tier's draw (TIERS; tier0 for a tier-0 bill); weight 0 at the same size or smaller, full at `full`
   * times this show's size. w: the whole forward part against the backward one. similar: the public genre affinity at
   * which the interface warns of a show the night before or a bigger one ahead. */
  C.AHEAD = { days: [1, .6, .25], full: 2, tier0: 5, w: 1, similar: .5 };
  C.FOCUS = { specialist: .45, allrounder: .20, shows: 20 };
  C.GENRE_DRIFT = { perQuarter: .03, kids: .06 };

  /* ============================== 7. ROOMS (mechanics 7) ============================== */

  C.HOLD_DAYS = { HALL: 10, BAR: 10, DIY: 10, SHOP: 10, OUTDOOR: 10, CLUB: 7, BIG: 7, HOUSE_UNTIL: 21 };
  C.HOLDS_MAX = { def: 2, CLUB: 3, BIG: 3 };
  C.CHALLENGE_HOURS = { base: 48, friendly: 72, friendlyAt: 60 };
  C.HOLD = { challengeCost: 4, releaseEarlyDays: 21, releaseEarly: 1, releaseLate: -3, twoRooms: { p: .20, rel: -2 },
             takeFromFriend: -3, shareBill: 5, calendarWeeks: 10 };
  C.BOOKERS = { relStart: 40, holdAhead: [28, 56], firmUp: .6, firmDays: 10, chaseTrendWeeks: [8, 12], chaseAt: .4 };
  /* R2. start: where an owner the player has never dealt with begins. A visit lifts it to `stranger`, a vouch to
   * `vouched`. A room that takes a deposit needs no more than `stranger`: the deposit is the trust. */
  C.OWNER = { start: 15, stranger: 20, vouched: 30, weeknights: 40, weekends: 50, warns: 60, discount: 70, discountPct: .20, offer: 75,
              drank: [2, 5], thin: [-8, -4], clean: 1, paid: 1, steadyPerMonth: 1, overCurfew: -3, trouble: [-20, -5],
              kidsNoDrinks: -3, cancel: [-10, -5] };
  C.BAR_SPEND = 14;
  C.BAR_GOOD_NIGHT = 700;
  /* R2. Every q here is a signed change to the night score, added as it stands (02-engine 7.7). */
  C.INCIDENTS = {
    NOISE:       { p: .06, kinds: ['HOUSE', 'OUTDOOR', 'DIY'], notTold: 2.5, pastQuiet: 3, overCap: 2, endEarlyQ: .7, turnDownQ: -5, secondVisitWeeks: 13 },
    FIGHT:       { p: .02, sketchDiv: 40, q: [-20, -8], halvedWithFloor: true },
    THEFT:       { p: .01, sketchDiv: 25, loss: [50, 400] },
    PA_FAIL:     { p: .12, skilled: .4, skilledAt: .7 },
    OVER_CAP:    { from: 1.10, p: .10, above: 1.25, pAbove: .30 },
    HURT:        { p: .01, pit: .02, q: -10 },
    ROOM_FORGOT: { p: .08, advanced: .01 }
  };
  C.STANDING = { drop: [5, 25], cleanWeeks: 13, cleanGain: 3 };
  C.ROOM_CLOSE = 400;              // a room closes with probability pressure / 400 each quarter
  C.ROOM_PRESSURE = { benefit: -20, steadyPerMonth: -2, newRoomsPerYear: 1, houseLeaseYears: [1, 3] };
  C.FEEDER_SHOW = { bandTrust: 5, burnout: 0.25 };

  /* 7.3 People paid on the night.   >>> ASK THE BOOKER (A): "its usually 60 for door 80 for sound", and the door is the
   * booker's own job (the podium on a show night), so nobody is paid for it. Sound is always hired; SECURITY sometimes. */
  C.PAY = { SOUND: [70, 90], SOUND_HOUSE: [100, 150], SECURITY: [80, 120], HOST: 20, FLOOR: 0, HELPER_RUN: [15, 25],
            HELPER_RUN_TOWN: [25, 40], LIST_COSTS_HEADS: 1 };
  /* Security, sometimes ("you do have to hire sound guy and sometimes security"). A person from the scene, asked like the
   * sound person and paid off the top like them (PAY.SECURITY). A room will not confirm without it when its kind is in
   * `kinds` (bars, clubs, the big room) or it is a hall of `hallCap` or more; a pack's room may say security: true or false.
   * The show page recommends it anyway at a room of `sketchy` or more, at a show labelled BIG and where the bill's crowd
   * runs rowdy (a genre of ROOM_GENRE.pit). On the night it multiplies the chance of each of `incidents` by pMul, and a
   * fight's q, a theft's loss and the damages of a serious incident by costMul. At a room of `chill` kind a guard costs
   * the night chillQ (signed q): people do not like a guard at a house show. */
  C.SECURITY = { kinds: ['BAR', 'CLUB', 'BIG'], hallCap: 200, sketchy: 40, incidents: ['FIGHT', 'OVER_CAP', 'THEFT'],
                 pMul: .5, costMul: .5, chill: ['HOUSE', 'DIY'], chillQ: -3 };
  /* Event insurance at bigger places ("even event insurance once you play bigger places"). A room of `capAt` or more, or
   * of a kind in `kinds`, will not confirm without it; a pack's room may say insurance: true or false. Anywhere else it
   * can still be bought. Bought when the date is confirmed: base + perCap x capacity, at the city's prices. It pays the
   * damages of a serious incident (`serious`, dollars at Pensacola prices: someone hurt, a room damaged in a fight),
   * which the booker pays out of pocket without it. */
  C.INSURANCE = { capAt: 200, kinds: ['CLUB', 'BIG'], base: 40, perCap: .4, serious: { HURT: 300, FIGHT: 200 } };
  /* Door prices the bill builder offers.   >>> ASK THE BOOKER (A) */
  C.DOOR = { prices: [0, 5, 7, 8, 10, 12, 15, 20], suggested: [5, 7, 10], def: 7 };

  /* ============================== 8. MONEY (mechanics 8) ============================== */

  C.MONEY = {
    OVERDRAFT: { limit: -300, fee: 35 },
    EXTRA_SHIFT: { shifts: 2, hours: 6 },
    BORROW: { max: 200, weeks: 8, rel: -15 },
    LATE_RENT: { fee: 40, stress: 10, strikes: 3 },
    COUCH: { bills: 700, hours: -4, stressFloor: 30, until: 1500, noFloor: true },
    BILLS_OFF: { fund: 300, hours: 33 },
    HOUSEGUEST: { hoursNextMorning: -1, stress: 2 },
    MOTEL: 70
  };

  /* ============================== 9. STRESS (mechanics 9) ============================== */

  C.STRESS = {
    START: 20,
    UP: { OVERTIME: 3, RAN_SHOW: 4, AFTER_SHIFT: 3, LOAD: 2, BROKE: 4, BILLS_MISSED: 10, DUD: 6, COVERED: 5,
          INCIDENT: [5, 15], CANCELLED: 6, MAJOR: 5, HARM_OPEN: 2, HOUSEGUEST: 2, INBOX: 1 },   // R2: HARM_OPEN was 6
    DOWN: { WEEK: -4, UNSPENT: -.5, UNSPENT_MAX: -8, DAY_OFF: -6, PHONE_OFF: -2, WENT_OUT: -5, GREAT_NIGHT: -10, THANKED: -2,
            CUSHION: -2, NO_SHOW_WEEK: -6 },
    LOAD_BASE: 2, LOAD_PER_HELPER: 1, LOAD_MAX: 6,
    BROKE_UNDER: 100, CUSHION_MONTHS: 2, INBOX_OVER: 5
  };
  C.STRESS_ZONES = [40, 70, 90, 100];
  C.SLIP = { STEADY: 0, STRETCHED: .08, FRIED: .20, BURNING_OUT: .35 };
  C.FRIED = { hoursOffDay: -1, noInPersonBonus: true };
  C.BURNOUT = { weeks: 2, days: 14, stressAfter: 50, name: -3 };

  /* ============================== 10. HELP (mechanics 10) ============================== */

  C.CIRCLE = { base: 2, perName: 12, max: 4 };   // 2 + Name / 12; mechanics' ceiling of 10 is LATER
  C.HELP = {
    yes: { base: .30, perRel: .5, lovesBill: .2, wontTouch: -.5, askedOften: -.3, oftenPerMonth: 3 },
    notDoneShare: .4,              // of (1 - reliability): not done; the rest is done differently
    toldShare: 2 / 3,
    differentEffect: .5,
    reliability: [.5, .98],
    freeForAsks: [.4, .8],
    favorsOwedMax: 3, favorsOwedCost: 2,
    relStart: 35, relPerJob: 1
  };

  /* ============================== 11. TRENDS (mechanics 11) ============================== */

  C.TREND = {
    follow: .04, localBuzz: .015, glut: .02, localBuzzClamp: 2, glutWeeks: 8,
    cycles: 2, period: [150, 320], amplitude: .45, pulse: .4, pulseFadeWeeks: 60,
    parKnowsAt: .5, parKnowsWeeks: 8, coldAt: -.3,
    newBandExp: 1                  // new bands form in a genre in proportion to exp(heat x this)
  };
  C.TREND_AMP = 0.30;
  C.TREND_SENS = [1.5, 1.0, 0.3];

  /* ============================== 12. TERRITORY (mechanics 12) ============================== */

  C.WORD_K = 1.5;
  C.WORD = { perTier: .5, driftPerMonth: .02, baselineShare: .5, baselineWeeks: 52, tiers: [20, 40, 60, 80] };
  C.CIRCLE_SPREAD = { weeks: 78, likelier: 1.5, lessLikely: .5, arriveGood: 40, arriveBad: 20, contactGood: 5, contactBad: -5 };
  C.CONTACT = { hosted: 10, honest: 4, swap: 15, bandBehaved: 8, firstAsk: 1, pester: -1, pesterPerMonth: 2,
                swapFail: .2, swapFailCost: -20, weakUnder: 50, swapOwedWeeks: 26,
                outgoingStart: 50 };   // R2: was 40. The booker who handed it on sends people from the first week
  C.TOUR = { tier: 2, trust: 60, contacts: 2, dates: [4, 8], coldYes: .25, coldSilent: .40, legMaxMinutes: 330,
             leadWeeks: [6, 8], live: [2, 5], homeDraw: 1.10, wordPerGoodDate: .5, requestsPerDate: .5, contact: 8,
             badNightsBreak: 2 };
  C.DRIVE_FACTOR = 1.26;           // minutes per straight-line mile (mechanics 12.5; section 17's 1.12 is superseded)
  C.DETOUR_MAX = 90;
  C.TOUR_LEG_MINUTES = [120, 330];

  /* ============================== 13. GETTING BIGGER ============================== */

  C.OFFERS = {
    ROOM: { ownerRel: 75, shows: 8, avgQ: 62, name: 55, salary: 1600 },
    BAND: { tier: 4, trust: 75, cut: .10 },
    notBeforeWeek: 104, repeatAfterWeeks: 52
  };

  /* ============================== 14. PEOPLE WHO DO HARM (mechanics 14) ============================== */

  C.HARM = {                       // >>> ASK THE BOOKER (C)
    RATE: 0.02,                    // HARM_RATE: share of generated people who carry the trait
    GAP: 45,                       // HARM_GAP: average weeks between matters
    GAP_MIN: 26,
    NOT_BEFORE_WEEK: 12,
    FOUNDED: [.70, .90, .97],      // chance a matter is well founded at weight 1, 2, 3
    ASKS: 2,
    PART: { base: .25, perWeight: .25, founder: -.3, trusted: .2 },
    BOOK_ANYWAY: [{}, { regulars: -.05, localsDecline: 1 / 3, localTrust: -5 }, { regulars: -.20, name: -5, word: -2 }],
    NOT_BOOK: { trust: 10, friends: -5 },
    WRONG: { trust: -15, apology: 30 },
    REGULARS_MAX_LOSS: .20,
    AFTER: { LEAVES: .50, NEW_BAND: .35, DOES_THE_WORK: .15 },
    NEW_BAND_WEEKS: [26, 78],
    BAND_RECOVERY_WEEKS: 13,       // after the band parts with the person, nobody holds it against them
    BAND_RECOVERY: { trustFloor: 30, draw: -.15, drawWeeks: 26 },
    RUMOR_ONLY_WRONG: 1 / 3,
    /* R2. Waiting is a legitimate answer. An open matter weighs STRESS.UP.HARM_OPEN for its first STRESS_OPEN_WEEKS
     * weeks only. One the player chose to leave closes by itself after LEAVE_CLOSES weeks unless its weight rose.
     * Asking around is not free: the second ask costs the teller's relationship ASK_TWICE_REL, and each ask has an
     * ASK_WORD_BACK chance that the band hears of it (TRUST.ASKED_AROUND). */
    STRESS_OPEN_WEEKS: 2,
    LEAVE_CLOSES: [6, 10],
    ASK_TWICE_REL: -2,
    ASK_WORD_BACK: .10
  };

  /* ============================== 15. MEMORY (mechanics 15) ============================== */

  C.WALL_AT = 3;
  C.MEMORY = { WALL: 3, TALKED: 2, each: 1, later: 2, laterTier: 3, laterFollowers: 10, roughStoryRarity: .9 };
  C.TOLD = { perYear: .12, capOfRoom: 2 };   // the told count grows this much a year, up to twice the room

  /* ============================== 16. CITY DEFAULTS AND SCALING (mechanics 12.6) ==============================
   * SB.Cities.normalize fills any value a pack leaves out. Each scaled value runs from its Pensacola figure
   * (metro 540,000) to its Philadelphia figure (metro 6.2 million) on log10(metro population), clamped. */
  C.CITY = {
    REF_SMALL: 540000, REF_LARGE: 6200000, T_MIN: -0.7, T_MAX: 1.2,
    SCALED: {
      stack:       [.60, .85],
      roomTau:     [1.0, 1.3],
      trendLag:    [20, 3],
      glutAt:      [4, 20],
      traffic:     [6, 40],
      wordStart:   [22, 78],
      otherShows:  [.4, 6],
      bookers:     [5, 12],
      rooms:       [11, 24],
      memberChurn: [.0015, .0005],
      roomsClosePerYear: [.10, .20],
      priceIndex:  [1.0, 1.5],
      weeknightLift: [0, .20]       // added to Tuesday-Thursday for the middle generation
    },
    SCENE_SIZE: { k: 0.0019, exp: 1.06, TRAIT: { COLLEGE: 1.2, MILITARY: 1.05, CAPITAL: 1.05, TOURIST: 1.0, REMOTE: .9 } },
    GENS: [.29, .46, .25],
    GENRE_SHARES: [
      [.20, .17, .16, .03, .04, .05, .12, .10, .05, .05, .02, .01],
      [.18, .10, .10, .07, .09, .09, .13, .12, .03, .04, .03, .02],
      [.15, .08, .03, .09, .14, .08, .07, .13, .10, .02, .02, .09]
    ],
    KID_INTAKE_SHARE: .05,           // new kids a year as a share of the scene (120 of 2,400)
    COMFORT: [7, 10, 12],            // x priceIndex
    BILLS: { RENT: 650, UTILITIES: 160, CAR: 290, FOOD: 350 },   // x priceIndex; a TRANSIT city halves CAR
    SHIFT_PAY: 88,                   // x priceIndex
    START_CASH: 700,                 // the first bills (two paychecks in) payable with about $100 to spare
    FEEDER: { sceneShare: .0002, minScene: 15, maxMinutes: 90 },   // a feeder with no scene given: town population x this
    PEER_MINUTES: [45, 180],
    ROAD_CHANCE: .02,
    ROOM_MIX: {                      // rooms generated when a pack lists none, by share
      HOUSE: .30, DIY: .10, HALL: .15, BAR: .20, CLUB: .08, SHOP: .10, OUTDOOR: .05, BIG: .02
    },
    ROOM_DEFAULT: {                  // per kind: capacity, rent, deposit, house costs, pa, curfew (minutes after midnight), sketch
      HOUSE:   { cap: [25, 70],   rent: 0,            deposit: 0,   pa: [.3, .5],  curfew: 1350, sketch: [15, 40], notice: [14, 28] },
      DIY:     { cap: [60, 150],  rent: [40, 80],     deposit: 0,   pa: [.5, .8],  curfew: 1440, sketch: [30, 55], notice: [21, 35] },
      HALL:    { cap: [90, 200],  rent: [120, 450],   deposit: 100, pa: [.5, .8],  curfew: 1380, sketch: [10, 30], notice: [28, 42] },
      BAR:     { cap: [50, 120],  rent: 0,            deposit: 0,   pa: [.6, .8],  curfew: 1560, sketch: [15, 45], notice: [28, 42], soundFee: 50 },
      CLUB:    { cap: [200, 350], rent: 0,            deposit: 0,   pa: [.8, .95], curfew: 1560, sketch: [10, 30], notice: [42, 70], houseCosts: [150, 300], split: .8 },
      BIG:     { cap: [600, 900], rent: [1500, 2200], deposit: 500, pa: [.9, 1],   curfew: 1500, sketch: [5, 15],  notice: [70, 112] },
      SHOP:    { cap: [25, 50],   rent: 0,            deposit: 0,   pa: [.4, .4],  curfew: 1140, sketch: [5, 15],  notice: [14, 14] },
      OUTDOOR: { cap: [50, 150],  rent: [10, 25],     deposit: 0,   pa: [.4, .4],  curfew: 1320, sketch: [30, 50], notice: [7, 14] }
    },
    /* R2. Weather has no default here: the presets of 04-cities 4.3 (held in js/cities/cities.js) are the only source.
     * TUNE: what each "your town" answer does to a lightly researched city's defaults (04-cities 4.5). */
    TUNE: { lean: 1.5, thursday: .10, anyNight: .15, noAllAgesKids: .8, mainRoomMix: 2,
            barOnlyMix: { HOUSE: .20, DIY: 0, HALL: .10, BAR: .45, CLUB: .10, SHOP: .05, OUTDOOR: .08, BIG: .02 },
            college: { sceneMul: 1.2, kids: .04 }, base: { sceneMul: 1.05, memberChurn: 1.5 } }
  };

  /* ============================== 17. SECTION-17 NAMES THAT ARE SET PER CITY ==============================
   * mechanics.md section 17 lists these as constants; they are properties of a city. Pensacola's values are kept here
   * under their section-17 names for reference and for the harness's golden tests. The engine reads the normalized
   * city pack (pack.scene.*, pack.money.*), never this block.   >>> ASK THE BOOKER (A): COMFORT, BILLS, SHIFT_PAY. */
  C.REFERENCE_CITY = {
    slug: 'pensacola',
    STACK: 0.60, COMFORT: [7, 10, 12], BILLS: 1450, SHIFT_PAY: 88, START_CASH: 700,
    WORD_START: 22, TRAFFIC: 6, TREND_LAG: 20, GLUT_AT: 4, KID_INTAKE: 120, SCENE: 2400
  };

  SB.Config = C;
  SB.C = C;

})(typeof window !== 'undefined' ? window : globalThis);
