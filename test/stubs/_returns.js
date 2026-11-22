'use strict';
/* The table of stub return values (06-harness 1.1).
 *
 * Each entry is the SOURCE TEXT of an expression. test/stubs/_gen.js writes it into
 *     function () { return <expression>; }
 * so an expression may read `arguments[n]` and `SB`, and it builds a fresh object on every call.
 * Views return a minimal well-formed object of the shape 02-engine documents; actions return { ok: true };
 * internals return [] or a neutral number. A function with no entry here is an error in _gen.js, so a
 * function added to SB.API cannot be forgotten.
 *
 * Owner: TEST. Rewrite test/stubs/*.js with: node test/stubs/_gen.js
 */

var OK = '{ ok: true }';
var RANGE_VIEW = "{ lo90: 0, lo50: 0, hi50: 0, hi90: 0, conf: 0, src: 'PRIOR', seen: null, text: '0', known: false }";
var RANGE = '{ lo: 0, hi: 0 }';
var GENS3 = '[0, 0, 0]';
var REL = "{ value: 50, stage: 'STRANGER' }";
var WINDOW_VIEW = "{ state: 'NONE', opens: null, idealUntil: null, lateFrom: null, missedAt: null, label: '', loss: null }";
var JOB_VIEW = "{ id: 'j0', type: 'ANSWER_REQUEST', group: 'GETTING', mode: 'MESSAGE', showId: null, key: '', label: '', why: '', hours: 0, half: 'ANY', status: 'TODO', timing: null, by: null, byName: null, planned: null, rides: null, riders: [], optional: false, waived: null, opt: null, window: " + WINDOW_VIEW + ", due: null, needs: [], helper: null, helperOk: false, cost: null, text: null }";
var REACH_STRIP = '{ gens: [0, 1, 2].map(function () { return { heard: ' + RANGE + ', reachable: ' + RANGE + ', usual: 0, missed: 0 }; }) }';
var SHOW_ACCOUNTS = '{ door: 0, offTop: [], guarantee: 0, locals: [], left: 0, touringShare: 0, playerCosts: [], player: 0 }';
var CALL = '{ lo: 0, hi: 0, mid: 0, byGen: [' + RANGE + ', ' + RANGE + ', ' + RANGE + '], unknowns: [] }';
var PAR = '{ heads: 1, q: 0, byGen: ' + GENS3 + ' }';
var FORECAST_CARD = "{ par: " + PAR + ", call: " + CALL + ", cap: 0, exposure: 0, breakEven: null, guaranteePace: 'OK', reach: " + REACH_STRIP + ", unknownPairs: [], flow: null }";
var DEMAND = '{ heads: 0, byGen: ' + GENS3 + ', byZone: {}, byReason: {}, cells: [], reach: [1, 1, 1], can: ' + GENS3 + ', luck: [] }';
var NIGHT_OUTCOME = '{ heads: 0, byGen: ' + GENS3 + ', turnedAway: 0, sets: [], q: 0, run: 1, lateMin: 0, incidents: [], paid: 0, comps: 0, gross: 0, hat: 0, leak: 0, posts: 0, barHeads: 0 }';
var STOP_END = "{ kind: 'END_OF_WEEK' }";
var NIGHT_STEP_END = "{ records: [], stop: { kind: 'SETTLE', showId: arguments[1] } }";
var BAND_VIEW = "{ id: arguments[1], name: '', local: true, home: '', genre: 'hardcore', genre2: null, years: 0, stage: 'NEW', followers: 0, tierPublic: 0, members: [], past: [], trust: { value: 50, stage: 'STRANGER' }, ask: null, motive: null, needs: [], draw: " + RANGE_VIEW + ", live: " + RANGE_VIEW + ", cross: " + RANGE_VIEW + ", rel: " + RANGE_VIEW + ", promo: " + RANGE_VIEW + ", gens: [0, 1, 0], buzzWord: null, trend: null, playedOut: false, out: false, listedMembers: 0, shows: [], history: [] }";
var PERSON_VIEW = "{ id: arguments[1], name: '', nick: null, gen: 1, roles: [], bands: [], rel: " + REL + ", taste: null, wants: null, rate: 0, owed: { favors: 0, text: '' }, last: [], lastReport: null, origin: null, listed: false, where: '' }";
var NOTEBOOK_PAGE = '{ page: arguments[1], rows: [], grid: null }';
var ASK_ANSWER = "(arguments[2] === 'SEND' ? { days: 1, will: 'YES', counter: null } : { status: 'YES', text: '', counter: null, records: [] })";
var STATE = "{ v: SB.SAVE_VERSION, seed: String((arguments[0] && arguments[0].seed) || 'stub'), rng: SB.rng.init(), ids: {}, week: { n: 0, log: [], logN: 0 }, clock: { day: 0, half: 'DAY', pending: [], stop: null }, player: { name: 10, followers: 0, stage: 1 }, settings: { bills: true }, tune: null }";
var HARM_NONE = 'null';
var SETTLE_VIEW = "{ door: { paid: 0, price: 0, gross: 0, hat: 0 }, lines: [], gap: 0, shortfall: [], left: 0, split: { custom: [0, 0, 0], keepMax: 0, fairMax: 0 }, dispute: null }";
var ROOM_VIEW = "{ id: arguments[1], name: '', kind: 'HOUSE', zoneId: '', ownerName: '', ownerStage: 'STRANGER', terms: { rent: 0, deposit: 0, soundFee: 0, houseCosts: 0, split: null, hostCut: 0, discount: 0, needs: [], words: '' }, capRange: " + RANGE_VIEW + ", gens: [], fit: " + RANGE_VIEW + ", needs: [], yours: { shows: 0, avgVsPar: null }, incidents: [], canHold: " + OK + " }";
var LEARN_LIST = '[]';
var YEAR_RECAP = "{ year: 1, shows: 0, heads: 0, firstShows: [], toured: [], roomsOpen: 0, roomsClosed: [], nights: [], crowd: '', callTally: { shows: 0, inside: 0, widthNow: 0, widthThen: 0 }, flyers: [], seasons: ['', '', '', ''], forward: '' }";
var CLOSE_REPORT = '{ week: (arguments[0] && arguments[0].week && arguments[0].week.n) || 0, shows: [], money: { in: 0, out: 0, net: 0, fund: 0, bank: null, owedAhead: { total: 0, lines: [] } }, learned: [], people: [], stress: { from: 0, to: 0, zone: \'STEADY\', causes: [] }, news: [], bills: null, year: null, next: { open: 0, late: 0, repliesDue: 0 } }';

module.exports = {
  /* things the manifest does not list but a neighbour may call: { Module: 'source of members, comma separated' } */
  EXTRA: {
    Notebook: "key: { aff: function (f, b) { return 'aff:' + f + ':' + b; }, draw: function (b, z) { return 'draw:' + b + ':' + z; }, cross: function (b) { return 'cross:' + b; }, live: function (b) { return 'live:' + b; }, rel: function (b) { return 'rel:' + b; }, promo: function (b) { return 'promo:' + b; }, honest: function (b) { return 'honest:' + b; }, night: function (g, d) { return 'night:' + g + ':' + d; }, roomgen: function (r, g) { return 'roomgen:' + r + ':' + g; }, roomcap: function (r) { return 'roomcap:' + r; }, roomfit: function (r) { return 'roomfit:' + r; }, chan: function (c, g) { return 'chan:' + c + ':' + g; }, price: function (g) { return 'price:' + g; }, zone: function (z) { return 'zone:' + z; }, heat: function (g) { return 'heat:' + g; }, person: function (p) { return 'person:' + p; } }"
  },

  /* ---- E1a / E1b ---- */
  'Game.newGame': STATE,
  'Game.strip': "{ week: 0, from: 0, to: 6, phase: 'PLAY', fund: 0, bank: null, hours: { used: 0, cap: 40, over: 0 }, tonight: null, stress: { value: 0, zone: 'STEADY' }, name: 10, word: 22, wordTier: 'SKIPPED', stage: 1, badges: { inbox: 0, late: 0 } }",
  'Game.setSetting': OK,
  'Game.adjustName': "{ t: 'NAME', day: 0, half: 'DAY', showId: null, text: '', from: 10, to: 10, k: arguments[2], beat: null }",
  'Game.adjustFollowers': 'undefined',

  'Week.view': "{ week: 0, phase: 'PLAY', days: [], hours: { used: 0, cap: 40, over: 0 }, runway: [], risks: [], tonight: { day: 0, dayIdx: 0, off: false, cap: 4, used: 0, left: 4, reserved: 0, spent: 0, stay: { max: 1, used: 0, left: 1 }, tired: 0, show: false, showId: null, open: false, called: false, burnt: false, phoneOff: false, message: 0.5, stop: null }, crunch: [] }",
  'Week.plan': "{ ok: true, overtime: 0, timing: 'ON_TIME', answer: null }",
  'Week.unplan': OK,
  'Week.addJob': "{ ok: true, jobId: 'j0' }",
  'Week.removeJob': OK,
  'Week.suggest': '[]',
  'Week.dropShift': OK,
  'Week.setDayJob': OK,
  'Week.phoneOff': OK,
  'Week.check': '{ ok: true, issues: [] }',
  'Week.startPlay': OK,
  'Week.step': '{ records: [], stop: ' + STOP_END + ", cursor: { dayIdx: 6, half: 'NIGHT' } }",
  'Week.decide': '{ records: [], stop: ' + STOP_END + ", cursor: { dayIdx: 6, half: 'NIGHT' } }",
  'Week.close': CLOSE_REPORT,
  'Week.payBills': '{ ok: true, records: [] }',
  'Week.nextWeek': '{ ok: true, records: [] }',
  'Week.log': 'undefined',
  'Week.raise': 'undefined',
  'Week.tonight': "{ day: 0, dayIdx: 0, off: false, cap: 4, used: 0, left: 4, reserved: 0, spent: 0, stay: { max: 1, used: 0, left: 1 }, tired: 0, show: false, showId: null, open: false, called: false, burnt: false, phoneOff: false, message: 0.5, stop: null }",
  'Week.canDoNow': '{ ok: true, hours: 0, cost: 0, overtime: 0 }',
  'Week.doNow': "{ ok: true, records: [], hours: 0, overtime: 0, done: true, tonight: { day: 0, dayIdx: 0, off: false, cap: 4, used: 0, left: 4, reserved: 0, spent: 0, stay: { max: 1, used: 0, left: 1 }, tired: 0, show: false, showId: null, open: false, called: false, burnt: false, phoneOff: false, message: 0.5, stop: null } }",
  'Week.endNight': OK,
  'Week.crunch': '[]',

  'Shows.create': "{ ok: true, showId: 's0' }",
  'Shows.get': "{ id: arguments[1], status: 'DRAFT', day: 0, roomId: null, bill: { slots: [], times: [], doors: 0, ends: 0, locked: false }, deal: null, door: {}, promo: {}, prep: {}, crew: {}, mods: {}, result: null }",
  'Shows.list': '[]',
  'Shows.view': "{ show: SB.Shows.get(arguments[0], arguments[1]), room: null, bands: [], billing: [], jobs: [], forecast: " + FORECAST_CARD + ", accounts: " + SHOW_ACCOUNTS + ", deal: null, needsToConfirm: [], canAnnounce: false }",
  'Shows.setBill': OK,
  'Shows.setBilling': OK,
  'Shows.setDoor': OK,
  'Shows.setLabel': OK,
  'Shows.setDeal': 'undefined',
  'Shows.setCrew': OK,
  'Shows.setInsurance': OK,
  'Shows.addBand': 'undefined',
  'Shows.dropBand': OK,
  'Shows.lock': 'undefined',
  'Shows.onConfirmed': '[]',
  'Shows.move': OK,
  'Shows.cancel': '{ ok: true, records: [] }',

  'Jobs.catalog': "{ type: arguments[0], mode: 'MESSAGE', group: 'GETTING', hours: 0, half: 'ANY', helper: null, label: '', why: '' }",
  'Jobs.ensure': 'undefined',
  'Jobs.refreshAll': 'undefined',
  'Jobs.get': JOB_VIEW,
  'Jobs.forShow': '[]',
  'Jobs.tray': '{ late: [], thisWeek: [], soon: [], later: [] }',
  'Jobs.freeJobs': '[]',
  'Jobs.window': WINDOW_VIEW,
  'Jobs.canDo': OK,
  'Jobs.promise': OK,
  'Jobs.resolve': '[]',
  'Jobs.flyerSpec': '{ showId: arguments[1] }',
  'Jobs.setFlyer': OK,

  'Mail.inbox': '[]',
  'Mail.message': "{ id: arguments[1], kind: 'REQUEST', fromId: null, fromName: '', subject: '', body: '', needs: false, refs: {}, keep: false, read: true, window: null, replyBy: null }",
  'Mail.markRead': OK,
  'Mail.reply': OK,
  'Mail.ask': "{ ok: true, askId: 'a0' }",
  'Mail.withdraw': OK,
  'Mail.chase': OK,
  'Mail.setNeedBy': OK,
  'Mail.waiting': '[]',
  'Mail.needsYou': '[]',
  'Mail.outbox': '[]',
  'Mail.post': "'m0'",
  'Mail.flush': '{ records: [], hours: 0 }',
  'Mail.deliver': '{ records: [], stops: [] }',
  'Mail.unqueue': OK,

  'Money.spend': "{ ok: true, from: 'FUND' }",
  'Money.earn': 'undefined',
  'Money.move': OK,
  'Money.canCover': 'true',
  'Money.exposure': '{ total: 0, lines: [], breakEven: null }',
  'Money.owedAhead': '{ total: 0, lines: [] }',
  'Money.showAccounts': SHOW_ACCOUNTS,
  'Money.ledger': '[]',
  'Money.billsView': 'null',
  'Money.payBills': '{ ok: true, records: [] }',
  'Money.weekly': '[]',

  'Stress.add': 'undefined',
  'Stress.zone': "'STEADY'",
  'Stress.view': "{ value: 0, zone: 'STEADY', causes: [], easing: [], effects: '' }",
  'Stress.slip': 'null',
  'Stress.weekly': '[]',

  'Save.save': "{ ok: false, code: 'INVALID', why: 'no storage in the stub' }",
  'Save.load': "{ ok: false, code: 'INVALID', why: 'no storage in the stub' }",
  'Save.list': '[]',
  'Save.remove': "{ ok: false, code: 'INVALID', why: 'no storage in the stub' }",
  'Save.exportText': "JSON.stringify(arguments[0] || {})",
  'Save.importText': "{ ok: false, code: 'INVALID', why: 'the stub cannot import' }",
  'Evening.list': '[]',
  'Evening.can': "{ ok: false, code: 'INVALID', why: 'the stub does nothing' }",
  'Evening.doIt': "{ ok: false, code: 'INVALID', why: 'the stub does nothing' }",

  /* ---- E2 ---- */
  'Model.affinity': 'SB.Config.AFFINITY[SB.Enums.GENRE_INDEX[arguments[1]] || 0][SB.Enums.GENRE_INDEX[arguments[2]] || 0]',
  'Model.bandGen': '[0, 1, 0]',
  'Model.reach': '{ raw: [1, 1, 1], reach: [1, 1, 1], byChannel: {}, perBand: {} }',
  'Model.demand': DEMAND,
  'Model.night': NIGHT_OUTCOME,
  'Model.resolve': '{ demand: ' + DEMAND + ', night: ' + NIGHT_OUTCOME + ' }',

  'Forecast.lens': "{ mode: arguments[1], get: function () { return 0; }, luck: true, quirks: true, publicDraw: false, promo: 'ACTUAL', trendKnown: false, over: arguments[2] || {} }",
  'Forecast.usual': '{}',
  'Forecast.par': PAR,
  'Forecast.call': CALL,
  'Forecast.ablate': '{ demand: ' + DEMAND + ', night: ' + NIGHT_OUTCOME + ' }',
  'Forecast.card': FORECAST_CARD,
  'Forecast.what': '{ par: ' + PAR + ', call: ' + CALL + ' }',
  'Forecast.reachStrip': REACH_STRIP,
  'Forecast.jobLoss': 'null',

  'Night.begin': "{ records: [], stop: { kind: 'SETTLE', showId: arguments[1] } }",
  'Night.next': NIGHT_STEP_END,
  'Night.settleView': SETTLE_VIEW,
  'Night.settle': '{ ok: true, records: [] }',
  'Night.auto': '{ records: [] }',
  'Night.finish': '[]',
  'Night.resolveOther': '{ heads: 0, q: 0, byGen: ' + GENS3 + ', hostScore: 0 }',

  'Feedback.causes': '[]',
  'Feedback.build': "{ ledger: [], comments: [], luck: [], verdictLine: '' }",
  'Feedback.debrief': '[]',

  'Notebook.init': 'undefined',
  'Notebook.est': 'null',
  'Notebook.range': 'null',
  'Notebook.narrow': 'null',
  'Notebook.reopen': 'undefined',
  'Notebook.learnFromShow': LEARN_LIST,
  'Notebook.scout': LEARN_LIST,
  'Notebook.knowledge': "'NEW'",
  'Notebook.mark': 'null',
  'Notebook.addNote': "'n0'",
  'Notebook.seeTerm': 'false',
  'Notebook.pages': NOTEBOOK_PAGE,
  'Notebook.entry': "{ title: '', finding: '', conf: 0, dir: 'NEUTRAL', contested: false, evidence: [], related: [], range: null }",
  'Notebook.tally': '{ shows: 0, inside: 0, widthNow: 0, widthThen: 0 }',
  'Notebook.weekly': 'undefined',

  /* ---- E3 ---- */
  'WorldGen.build': 'undefined',
  'WorldGen.band': "'b0'",
  'WorldGen.person': "'p0'",
  'WorldGen.touringBand': "'b0'",
  'WorldGen.room': "'r0'",

  'Bands.get': "{ id: arguments[1], name: '', local: true, hid: {} }",
  'Bands.list': '[]',
  'Bands.card': BAND_VIEW,
  'Bands.tier': '0',
  'Bands.publicDraw': '0',
  'Bands.fresh': '1',
  'Bands.isFree': 'true',
  'Bands.fee': "{ pay: 'FREE', amount: 0 }",
  'Bands.replyWindow': '{ lo: 1, hi: 3 }',
  'Bands.answerAsk': ASK_ANSWER,
  'Bands.addTrust': "{ t: 'TRUST', day: 0, half: 'DAY', showId: null, text: '', id: arguments[1], name: '', d: 0, k: arguments[2], value: 50, stage: 'STRANGER', stageChanged: false }",
  'Bands.trust': "{ value: 50, stage: 'STRANGER', events: [] }",
  'Bands.removeMember': '[]',
  'Bands.afterShow': '[]',
  'Bands.weekly': '[]',

  'Rooms.get': "{ id: arguments[1], name: '', kind: 'HOUSE', zoneId: '' }",
  'Rooms.list': '[]',
  'Rooms.card': ROOM_VIEW,
  'Rooms.calendar': '[]',
  'Rooms.terms': "{ rent: 0, deposit: 0, soundFee: 0, houseCosts: 0, split: null, hostCut: 0, discount: 0, needs: [], words: '' }",
  'Rooms.answerAsk': ASK_ANSWER,
  'Rooms.confirm': OK,
  'Rooms.release': OK,
  'Rooms.challenge': OK,
  'Rooms.rel': REL,
  'Rooms.adjustRel': "{ t: 'TRUST', day: 0, half: 'DAY', showId: null, text: '', id: arguments[1], name: '', d: 0, k: arguments[3], value: 50, stage: 'STRANGER', stageChanged: false }",
  'Rooms.otherShows': '[]',
  'Rooms.bookers': '[]',
  'Rooms.bookerRel': REL,
  'Rooms.adjustBookerRel': "{ t: 'TRUST', day: 0, half: 'DAY', showId: null, text: '', id: arguments[1], name: '', d: 0, k: arguments[3], value: 50, stage: 'STRANGER', stageChanged: false }",
  'Rooms.afterShow': '[]',
  'Rooms.daily': '{ records: [], stops: [] }',
  'Rooms.weekly': '[]',

  'Requests.get': "{ id: arguments[1], status: 'NEW' }",
  'Requests.list': '[]',
  'Requests.view': "{ request: SB.Requests.get(arguments[0], arguments[1]), band: null, message: null, dates: [], route: SB.Requests.route(arguments[0], arguments[1]), ask: null, signals: [], vet: [], flags: [], says: null, here: " + RANGE_VIEW + " }",
  'Requests.route': "{ prev: { name: '', state: '', minutes: 0, day: null }, next: { name: '', state: '', minutes: 0, day: null }, stops: [] }",
  'Requests.vet': '[]',
  'Requests.answerAsk': ASK_ANSWER,
  'Requests.pass': '[]',
  'Requests.accept': 'undefined',
  'Requests.daily': '[]',
  'Requests.weekly': '[]',

  'Trends.heat': '0',
  'Trends.known': 'false',
  'Trends.arrow': 'null',
  'Trends.signs': '[]',
  'Trends.weekly': '[]',

  'Crowd.cells': '[0, 1, 2].map(function () { return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; })',
  'Crowd.regulars': "{ total: 0, byGen: [0, 0, 0], byGenre: [], byZone: [], floor: { lo: 0, hi: 0 }, faces: [], drifting: 0, kind: 'BETWEEN', mailingList: 0 }",
  'Crowd.addRegulars': '0',
  'Crowd.loseRegulars': '0',
  'Crowd.load': '0',
  'Crowd.focus': "{ value: 0, kind: 'BETWEEN', genres: [] }",
  'Crowd.afterShow': '[]',
  'Crowd.weekly': '[]',

  'Territory.word': "{ value: 22, base: 22, tier: 'SKIPPED', text: '' }",
  'Territory.tier': "'SKIPPED'",
  'Territory.adjustWord': "{ t: 'WORD', day: 0, half: 'DAY', showId: null, text: '', from: 22, to: 22, tier: 'SKIPPED', tierChanged: false }",
  'Territory.contacts': '[]',
  'Territory.adjustContact': "{ t: 'TRUST', day: 0, half: 'DAY', showId: null, text: '', id: arguments[1], name: '', d: 0, k: arguments[3], value: 50, stage: 'STRANGER', stageChanged: false }",
  'Territory.answerAsk': ASK_ANSWER,
  'Territory.drive': '0',
  'Territory.tourCandidates': '[]',
  'Territory.tourStops': '[]',
  'Territory.startTour': "{ ok: true, tourId: 't0' }",
  'Territory.tour': "{ id: arguments[1], bandName: '', legs: [] }",
  'Territory.afterShow': '[]',
  'Territory.weekly': '[]',

  /* ---- E4 ---- */
  'Effects.test': 'true',
  'Effects.why': 'null',
  'Effects.apply': '[]',
  'Effects.preview': '[]',

  'Director.opening': 'undefined',
  'Director.planWeek': 'undefined',
  'Director.due': 'null',
  'Director.resolve': '[]',
  'Director.nightStops': '[]',
  'Director.risks': '[]',

  'People.get': "{ id: arguments[1], name: '', roles: [], hid: {} }",
  'People.card': PERSON_VIEW,
  'People.rel': REL,
  'People.adjust': "{ t: 'TRUST', day: 0, half: 'DAY', showId: null, text: '', id: arguments[1], name: '', d: 0, k: arguments[3], value: 50, stage: 'STRANGER', stageChanged: false }",
  'People.stage': "'STRANGER'",
  'People.crew': '[]',
  'People.circle': '{ max: 0, people: [] }',
  'People.favor': 'undefined',
  'People.meet': "{ t: 'NOTE', day: 0, half: 'DAY', showId: null, text: '' }",
  'People.answerAsk': ASK_ANSWER,
  'People.perform': "{ outcome: 'DONE', effect: 1, text: '' }",
  'People.afterShow': '[]',
  'People.weekly': '[]',

  'Harm.current': HARM_NONE,
  'Harm.act': '{ ok: true, records: [] }',
  'Harm.answerAsk': ASK_ANSWER,
  'Harm.list': '[]',
  'Harm.add': OK,
  'Harm.remove': '{ ok: true, records: [] }',
  'Harm.flags': '{ listed: [], text: null }',
  'Harm.onBooked': '[]',
  'Harm.weekly': '[]',

  'Legacy.stage': '1',
  'Legacy.mark': 'null',
  'Legacy.afterShow': '[]',
  'Legacy.wall': '[]',
  'Legacy.binder': '[]',
  'Legacy.bandHistory': "{ name: '', lines: [], yourPart: '' }",
  'Legacy.townLine': '{ line: [], marks: [] }',
  'Legacy.firsts': '[]',
  'Legacy.offers': '[]',
  'Legacy.answerOffer': '{ ok: true, records: [] }',
  'Legacy.end': "{ ok: true, epilogue: '' }",
  'Legacy.yearly': YEAR_RECAP,
  'Legacy.weekly': '[]',

  'Chapters.check': '[]',
  'Chapters.nextCutscene': 'null',
  'Chapters.markSeen': OK,
  'Chapters.list': '[]',
  'Tutorial.start': "{ ok: true, step: null }",
  'Tutorial.skip': "{ ok: true, step: null }",
  'Tutorial.current': 'null',
  'Tutorial.notify': 'null',
  'Patches.check': '[]',
  'Patches.all': '[]',
  'Rungs.rung': '5', 'Rungs.onDesk': 'true', 'Rungs.isNew': 'false', 'Rungs.opened': 'undefined', 'Rungs.covers': 'false',
  'Rungs.hides': 'false', 'Rungs.mentor': 'null', 'Rungs.billsWaiting': 'false', 'Rungs.cover': '[]', 'Rungs.weekly': '[]'
};
