/* Scene Booker: cities/cities.js
 * SB.Cities: register, load, isLoaded, get, pack, entry, near, normalize, validate, questions.
 * Also holds the weather presets, the flyer style presets and the calendar presets (04-cities 4.3, 4.4).
 * Owner: CITY lead. Spec: design/spec/04-cities.md.
 * Loads in the browser (classic script) and in Node. It touches `document` only inside load, behind a guard.
 * Extra exports beyond SB.API: presetFor(entry) (the weather preset id for an index entry), generalBanned (a list the
 * harness may set), TABLES (the preset data, read-only).
 */
SB.module('Cities', function (SB) {
  'use strict';

  var E = SB.Enums, C = SB.Config, U = SB.util, CITY = C.CITY;

  var raws = {};          // slug -> raw pack as registered
  var normCache = {};     // slug + '|' + tune key -> normalized pack
  var checked = {};       // slug -> { problems: [string] }
  var pending = {};       // slug -> [callbacks] while a script is loading
  var idxMap = null, idxSrc = null, idxLen = -1;

  /* ------------------------------------------------------------------ */
  /* Preset data (04-cities 4.3). These are the only weather defaults.   */
  /* ------------------------------------------------------------------ */

  var WEATHER = {
    GULF:       { rain: [.25, .25, .25, .20, .25, .40, .45, .45, .35, .20, .20, .25], heat: [0, 0, 0, 0, .15, .50, .70, .70, .40, .05, 0, 0], cold: [.25, .15, .03, 0, 0, 0, 0, 0, 0, 0, .05, .20] },
    SOUTHEAST:  { rain: [.30, .30, .30, .25, .30, .35, .40, .35, .25, .20, .25, .30], heat: [0, 0, 0, 0, .10, .35, .55, .50, .20, 0, 0, 0], cold: [.40, .30, .10, 0, 0, 0, 0, 0, 0, 0, .15, .35] },
    NORTHEAST:  { rain: [.30, .30, .30, .30, .30, .30, .30, .30, .25, .25, .30, .30], heat: [0, 0, 0, 0, 0, .15, .30, .25, .05, 0, 0, 0], cold: [.65, .60, .35, .05, 0, 0, 0, 0, 0, .05, .30, .55] },
    MIDWEST:    { rain: [.25, .25, .30, .35, .35, .35, .30, .30, .25, .25, .25, .25], heat: [0, 0, 0, 0, .05, .20, .35, .30, .05, 0, 0, 0], cold: [.75, .70, .40, .08, 0, 0, 0, 0, 0, .05, .35, .65] },
    PLAINS:     { rain: [.15, .15, .20, .25, .35, .35, .25, .25, .20, .15, .15, .15], heat: [0, 0, 0, 0, .10, .35, .55, .50, .15, 0, 0, 0], cold: [.65, .55, .25, .05, 0, 0, 0, 0, 0, .05, .30, .55] },
    MOUNTAIN:   { rain: [.15, .15, .20, .20, .25, .20, .25, .25, .15, .15, .15, .15], heat: [0, 0, 0, 0, 0, .15, .30, .25, .05, 0, 0, 0], cold: [.70, .60, .40, .15, .03, 0, 0, 0, 0, .10, .40, .65] },
    DESERT:     { rain: [.08, .08, .08, .04, .03, .03, .15, .18, .10, .06, .06, .08], heat: [0, 0, 0, .10, .40, .80, .85, .80, .55, .15, 0, 0], cold: [.15, .08, 0, 0, 0, 0, 0, 0, 0, 0, .03, .12] },
    PACIFIC_NW: { rain: [.60, .55, .55, .45, .35, .25, .10, .10, .25, .45, .60, .60], heat: [0, 0, 0, 0, 0, .03, .10, .10, .02, 0, 0, 0], cold: [.30, .20, .08, 0, 0, 0, 0, 0, 0, 0, .10, .25] },
    CALIFORNIA: { rain: [.30, .30, .25, .12, .05, .02, .01, .01, .03, .10, .20, .30], heat: [0, 0, 0, 0, .03, .10, .20, .20, .15, .05, 0, 0], cold: [.05, .03, 0, 0, 0, 0, 0, 0, 0, 0, 0, .04] },
    ALASKA:     { rain: [.25, .20, .20, .20, .25, .30, .40, .45, .45, .35, .25, .25], heat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], cold: [.90, .85, .75, .40, .05, 0, 0, 0, .05, .40, .80, .90] }
  };

  var STYLE = {
    GULF:       { inks: ['bayouTeal', 'fluorPink', 'fluorYellow'], papers: ['goldenrod', 'pastelBlue'], motifs: ['palm', 'hurricane', 'anchor', 'bridgeTruss', 'routeShield', 'barbedWire'], pictures: ['palmSky', 'carport', 'bridgeSpan', 'storm', 'bayou'], cityInks: ['bayouTeal', 'fluorYellow'], cityPaper: 'goldenrod' },
    SOUTHEAST:  { inks: ['brick', 'oliveDrab', 'fluorOrange'], papers: ['kraft', 'pastelGreen'], motifs: ['flame', 'crow', 'routeShield', 'sun', 'pineCone'], pictures: ['pines', 'van', 'crowd', 'storm'], cityInks: ['brick', 'oliveDrab'], cityPaper: 'kraft' },
    NORTHEAST:  { inks: ['toner', 'fireRed', 'ballpointBlue'], papers: ['copyWhite', 'newsprint'], motifs: ['x', 'fist', 'bridgeTruss', 'skull', 'routeShield', 'snowflake'], pictures: ['rowhouses', 'basement', 'crowd', 'guitarist'], cityInks: ['fireRed', 'toner'], cityPaper: 'newsprint' },
    MIDWEST:    { inks: ['oliveDrab', 'brick', 'copyGray'], papers: ['newsprint', 'kraft'], motifs: ['gear', 'smokestack', 'corn', 'x', 'routeShield', 'snowflake'], pictures: ['basement', 'grainElevator', 'van', 'crowd'], cityInks: ['brick', 'copyGray'], cityPaper: 'kraft' },
    PLAINS:     { inks: ['brick', 'fluorYellow', 'oliveDrab'], papers: ['kraft', 'goldenrod'], motifs: ['corn', 'sun', 'bolt', 'routeShield', 'star'], pictures: ['grainElevator', 'storm', 'van'], cityInks: ['fluorYellow', 'brick'], cityPaper: 'kraft' },
    MOUNTAIN:   { inks: ['ballpointBlue', 'mint', 'fluorOrange'], papers: ['copyWhite', 'pastelBlue'], motifs: ['mountain', 'pineCone', 'bolt', 'star', 'snowflake'], pictures: ['pines', 'mesa', 'skateRamp', 'van'], cityInks: ['ballpointBlue', 'fluorOrange'], cityPaper: 'copyWhite' },
    DESERT:     { inks: ['fluorOrange', 'brick', 'lavender'], papers: ['kraft', 'pastelPink'], motifs: ['cactus', 'sun', 'skull', 'routeShield', 'flame'], pictures: ['mesa', 'van', 'skateRamp', 'crowd'], cityInks: ['fluorOrange', 'lavender'], cityPaper: 'kraft' },
    PACIFIC_NW: { inks: ['bayouTeal', 'oliveDrab', 'lavender'], papers: ['pastelGreen', 'newsprint'], motifs: ['pineCone', 'crow', 'waves', 'cat', 'cassette'], pictures: ['pines', 'basement', 'guitarist', 'storm'], cityInks: ['oliveDrab', 'lavender'], cityPaper: 'pastelGreen' },
    CALIFORNIA: { inks: ['fluorPink', 'mint', 'fluorYellow'], papers: ['pastelPink', 'pastelBlue'], motifs: ['palm', 'waves', 'sun', 'checker', 'flower'], pictures: ['palmSky', 'skateRamp', 'van', 'crowd'], cityInks: ['fluorPink', 'mint'], cityPaper: 'pastelBlue' },
    ALASKA:     { inks: ['ballpointBlue', 'copyGray', 'fluorPink'], papers: ['copyWhite', 'cardboard'], motifs: ['mountain', 'snowflake', 'crow', 'bolt'], pictures: ['pines', 'basement', 'storm'], cityInks: ['ballpointBlue', 'fluorPink'], cityPaper: 'copyWhite' }
  };

  var STATE_PRESET = {
    FL: 'GULF', AL: 'GULF', MS: 'GULF', LA: 'GULF',
    GA: 'SOUTHEAST', SC: 'SOUTHEAST', NC: 'SOUTHEAST', TN: 'SOUTHEAST', AR: 'SOUTHEAST', KY: 'SOUTHEAST', VA: 'SOUTHEAST',
    PA: 'NORTHEAST', NJ: 'NORTHEAST', NY: 'NORTHEAST', CT: 'NORTHEAST', MA: 'NORTHEAST', NH: 'NORTHEAST', VT: 'NORTHEAST',
    ME: 'NORTHEAST', MD: 'NORTHEAST', DC: 'NORTHEAST', WV: 'NORTHEAST', RI: 'NORTHEAST', DE: 'NORTHEAST',
    OH: 'MIDWEST', IN: 'MIDWEST', IL: 'MIDWEST', MI: 'MIDWEST', WI: 'MIDWEST', MN: 'MIDWEST', IA: 'MIDWEST', MO: 'MIDWEST',
    KS: 'PLAINS', NE: 'PLAINS', SD: 'PLAINS', ND: 'PLAINS', OK: 'PLAINS',
    CO: 'MOUNTAIN', UT: 'MOUNTAIN', ID: 'MOUNTAIN', MT: 'MOUNTAIN', WY: 'MOUNTAIN', NV: 'MOUNTAIN',
    AZ: 'DESERT', WA: 'PACIFIC_NW', OR: 'PACIFIC_NW', CA: 'CALIFORNIA', AK: 'ALASKA'
  };

  /* Full state names, so the town search finds "Wyoming" as well as "WY". */
  var STATE_NAME = {
    AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado', CT: 'Connecticut',
    DE: 'Delaware', DC: 'District of Columbia', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois',
    IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
    MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri', MT: 'Montana',
    NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York',
    NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
    RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah',
    VT: 'Vermont', VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming'
  };
  /** Two-letter state code -> full name ('' when unknown). */
  function stateName(code) { return STATE_NAME[code] || ''; }

  /** The weather preset id for an index entry: HURRICANE -> GULF, DESERT -> DESERT, then by state (04-cities 4.3). */
  function presetFor(entry, traits) {
    var st = entry && entry.state, tr = traits || (entry && entry.traits) || [], lon = entry && entry.lon, lat = entry && entry.lat;
    if (tr.indexOf('DESERT') >= 0) return 'DESERT';
    if (tr.indexOf('HURRICANE') >= 0) return 'GULF';
    if (st === 'TX') {
      if (tr.indexOf('COASTAL') >= 0) return 'GULF';
      if (typeof lon === 'number' && lon < -99) return 'PLAINS';   // SPEC? "west TX": west of 99 degrees W (takes in Laredo and Abilene)
      return 'SOUTHEAST';
    }
    if (st === 'NM') return (typeof lat === 'number' && lat < 34) ? 'DESERT' : 'MOUNTAIN';   // SPEC? "NM north / south" cut at 34 N
    if (STATE_PRESET[st]) return STATE_PRESET[st];
    return 'SOUTHEAST';   // SPEC? a state in no list (HI): the smallest guess
  }

  /* Basements: none where the water table is at your ankles or the ground is caliche. All of Florida and Louisiana, the
   * hurricane coast, the low Southern coast and the desert: houses there sit on slabs, so no basement shows, no basement
   * room names, no basement on a flyer. A pack can say otherwise with basements: true | false. */
  var SLAB_STATES = { FL: 1, LA: 1 }, LOW_COAST_STATES = { TX: 1, MS: 1, AL: 1, GA: 1, SC: 1, NC: 1 };
  function hasBasements(entry, traits) {
    var st = entry && entry.state, tr = traits || (entry && entry.traits) || [];
    if (SLAB_STATES[st]) return false;
    if (tr.indexOf('HURRICANE') >= 0 || tr.indexOf('DESERT') >= 0) return false;
    if (tr.indexOf('COASTAL') >= 0 && LOW_COAST_STATES[st]) return false;
    return true;
  }

  var NEEDS_BY_KIND = { HOUSE: ['HOST_TRUSTS_YOU'], DIY: ['VOUCH'], HALL: ['DEPOSIT'], BAR: ['ASK_NICELY'], CLUB: ['FULL_BILL'],
                        BIG: ['DEPOSIT'], SHOP: ['ASK_NICELY'], OUTDOOR: ['HOST_TRUSTS_YOU'] };   // SPEC? 03-content jobs.needs gives the keys, not the kinds
  var OWNER_BY_KIND = { HOUSE: 'HOST', BAR: 'BAR_OWNER', HALL: 'HALL_MANAGER', SHOP: 'SHOP_OWNER', DIY: 'LANDLORD', OUTDOOR: 'LANDLORD', CLUB: 'TALENT_BUYER', BIG: 'TALENT_BUYER' };
  var NEED_KEYS = ['HOST_TRUSTS_YOU', 'DEPOSIT', 'FULL_BILL', 'TOURING_AND_LOCAL', 'VOUCH', 'ASK_NICELY'];
  var AC_BY_KIND = { HOUSE: false, DIY: false, OUTDOOR: false, HALL: true, BAR: true, CLUB: true, BIG: true, SHOP: true };

  var GENERIC_SPOTS = {
    'downtown': [{ kind: 'POLE', label: 'the poles downtown' }, { kind: 'COFFEE_BOARD', label: 'the coffee place boards' }, { kind: 'BAR_WALL', label: 'the bar bathrooms' }],
    'old-side': [{ kind: 'RECORD_SHOP', label: 'the record store' }, { kind: 'COFFEE_BOARD', label: 'the coffee place boards' }, { kind: 'POLE', label: 'the poles on the old streets' }],
    'work-side': [{ kind: 'LAUNDROMAT', label: 'the laundromat' }, { kind: 'TATTOO_SHOP', label: 'the tattoo shop' }, { kind: 'PRACTICE_DOOR', label: 'the practice units' }],
    'campus': [{ kind: 'COLLEGE_BOARD', label: 'the board at the university' }, { kind: 'SKATE_SHOP', label: 'the skate shop counter' }, { kind: 'POLE', label: 'the poles by campus' }]
  };
  var GENERIC_ROUTE_NAME = { 'downtown': 'Downtown', 'old-side': 'The old side', 'work-side': 'The work side', 'campus': 'Campus' };

  /* ------------------------------------------------------------------ */
  /* Small helpers                                                       */
  /* ------------------------------------------------------------------ */

  function isNum(x) { return typeof x === 'number' && isFinite(x); }
  function isInt(x) { return isNum(x) && Math.floor(x) === x; }
  function isStr(x) { return typeof x === 'string' && x.length > 0; }
  function isArr(x) { return Array.isArray(x); }
  function isObj(x) { return x !== null && typeof x === 'object' && !Array.isArray(x); }
  function has(o, k) { return Object.prototype.hasOwnProperty.call(o, k); }
  function copy(x) { return x === undefined ? undefined : JSON.parse(JSON.stringify(x)); }
  function round(x, p) { var k = Math.pow(10, p || 0); return Math.round(x * k) / k; }
  function clamp(x, lo, hi) { return x < lo ? lo : (x > hi ? hi : x); }
  function enumHas(table, v) { return typeof v === 'string' && Object.prototype.hasOwnProperty.call(table, v); }
  function sumOf(list) { var t = 0, i; for (i = 0; i < list.length; i++) t += list[i]; return t; }
  function pad2(n) { return n < 10 ? '0' + n : '' + n; }
  function yes(v) { return v === true || v === 'YES' || v === 'yes' || v === 'Y'; }
  function no(v) { return v === false || v === 'NO' || v === 'no' || v === 'N'; }
  function stable(x) {
    if (isArr(x)) return '[' + x.map(stable).join(',') + ']';
    if (isObj(x)) return '{' + Object.keys(x).sort().map(function (k) { return JSON.stringify(k) + ':' + stable(x[k]); }).join(',') + '}';
    return JSON.stringify(x === undefined ? null : x);
  }
  function sceneSizeFor(pop, traits) {
    var m = 1, i, t = CITY.SCENE_SIZE.TRAIT;
    for (i = 0; i < traits.length; i++) if (t[traits[i]]) m *= t[traits[i]];
    return Math.round(CITY.SCENE_SIZE.k * Math.pow(pop, CITY.SCENE_SIZE.exp) * m);
  }
  function tOf(pop) {
    var lo = Math.log(CITY.REF_SMALL) / Math.LN10, hi = Math.log(CITY.REF_LARGE) / Math.LN10;
    return clamp((Math.log(Math.max(1, pop)) / Math.LN10 - lo) / (hi - lo), CITY.T_MIN, CITY.T_MAX);
  }
  var INT_SCALED = { trendLag: 1, glutAt: 1, traffic: 1, wordStart: 1, bookers: 1, rooms: 1 };
  function scaled(key, t) {
    var r = CITY.SCALED[key], v = r[0] + (r[1] - r[0]) * t, floor = Math.min(r[0], r[1]) / 2;
    if (v < floor) v = floor;
    return INT_SCALED[key] ? Math.round(v) : round(v, 4);
  }
  function normText(s) { return String(s).toLowerCase().replace(/[-_]+/g, ' ').replace(/\s+/g, ' '); }
  function roundTo(x, step) { return Math.round(x / step) * step; }

  /* ------------------------------------------------------------------ */
  /* The index                                                           */
  /* ------------------------------------------------------------------ */

  function idx() {
    var list = SB.CityIndex || [], i;
    if (idxMap && idxSrc === list && idxLen === list.length) return idxMap;
    idxMap = {}; idxSrc = list; idxLen = list.length;
    for (i = 0; i < list.length; i++) idxMap[list[i].slug] = list[i];
    return idxMap;
  }
  function entry(slug) { var e = idx()[slug]; return e || null; }
  function indexSize() { return (SB.CityIndex || []).length; }

  function pointEntry(p) {
    return { slug: p.slug || null, name: p.name, state: p.state, lat: p.lat, lon: p.lon, pop: p.pop || 0, point: !p.slug };
  }

  /** (point, maxMinutes) -> [{ entry, minutes }]: index cities and loaded packs' points within a drive, nearest first. */
  function near(point, maxMinutes) {
    var from, list = (SB.CityIndex || []), out = [], seen = {}, srcSlug = null, slugs, i, j, p, e, mins, packsToUse = [];
    if (typeof point === 'string') {
      e = entry(point);
      if (!e) SB.fail('Cities.near', 'unknown slug "' + point + '"');
      from = { lat: e.lat, lon: e.lon }; srcSlug = point;
    } else if (point && isNum(point.lat) && isNum(point.lon)) from = point;
    else SB.fail('Cities.near', 'point must be a slug or { lat, lon }');
    slugs = Object.keys(raws);
    for (i = 0; i < slugs.length; i++) if (!srcSlug || slugs[i] === srcSlug || !raws[srcSlug]) packsToUse.push(slugs[i]);
    for (i = 0; i < list.length; i++) {
      if (list[i].slug === srcSlug) continue;
      mins = SB.geo.drive(from, list[i]);
      if (mins <= maxMinutes) { out.push({ entry: list[i], minutes: mins }); seen[list[i].name + '|' + list[i].state] = true; }
    }
    for (i = 0; i < packsToUse.length; i++) {
      p = raws[packsToUse[i]].points || [];
      for (j = 0; j < p.length; j++) {
        if (seen[p[j].name + '|' + p[j].state]) continue;
        mins = SB.geo.drive(from, p[j]);
        if (mins <= maxMinutes && mins > 0) { out.push({ entry: pointEntry(p[j]), minutes: mins }); seen[p[j].name + '|' + p[j].state] = true; }
      }
    }
    out.sort(function (a, b) { return a.minutes - b.minutes; });
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* Register, load, get, pack                                           */
  /* ------------------------------------------------------------------ */

  function register(slug, pack) {
    if (!isStr(slug)) SB.fail('Cities.register', 'slug must be a string');
    if (!isObj(pack)) SB.fail('Cities.register', 'pack for "' + slug + '" is not an object');
    if (raws[slug]) SB.fail('Cities.register', 'pack "' + slug + '" is registered twice');
    raws[slug] = pack;
    if (isArr(pack.blocklist) && pack.blocklist.length) SB.text.block(pack.blocklist);
  }

  function isLoaded(slug) { return !!raws[slug]; }

  /* Problems whose text starts 'warning:' or 'content:' do not stop a pack from opening: a name that breaks the
   * generator rule or a banned word in a line of text must fail the harness, not the player's game. */
  function hardProblems(list) {
    return list.filter(function (s) { return s.indexOf('warning:') !== 0 && s.indexOf('content:') !== 0; });
  }

  function finish(slug, cb) {
    var res, hard, p;
    try {
      if (!checked[slug]) checked[slug] = { problems: validate(raws[slug]) };
      res = checked[slug].problems;
      hard = hardProblems(res);
      if (hard.length) { cb(new SB.SBError('Cities.load', 'pack "' + slug + '" is not valid: ' + hard.slice(0, 5).join('; ')), null); return; }
      if (res.length) SB.log('warn', 'Cities.load', 'pack "' + slug + '" has ' + res.length + ' content problem(s)', res.slice(0, 5));
      p = get(slug);
    } catch (e) { cb(e, null); return; }
    cb(null, p);
  }

  function load(slug, cb) {
    var e, list, script;
    if (typeof cb !== 'function') SB.fail('Cities.load', 'load needs a callback');
    if (typeof slug !== 'string' || !/^[a-z0-9-]+$/.test(slug)) { cb(new SB.SBError('Cities.load', 'bad city id'), null); return; }
    e = entry(slug);
    if (!e) { cb(new SB.SBError('Cities.load', 'no city "' + slug + '" in the index'), null); return; }
    if (raws[slug]) { finish(slug, cb); return; }
    if (typeof document === 'undefined' || !document.head) {
      cb(new SB.SBError('Cities.load', 'pack "' + slug + '" was not loaded and there is no document to load it with'), null);
      return;
    }
    if (pending[slug]) { pending[slug].push(cb); return; }
    pending[slug] = list = [cb];
    function done(err) {
      var cbs = pending[slug], i;
      delete pending[slug];
      if (script && script.parentNode) script.parentNode.removeChild(script);
      for (i = 0; i < cbs.length; i++) {
        if (err) cbs[i](err, null); else finish(slug, cbs[i]);
      }
    }
    script = document.createElement('script');
    script.src = 'js/cities/packs/' + slug + '.js';
    script.onload = function () {
      if (!raws[slug]) done(new SB.SBError('Cities.load', 'the file for "' + slug + '" ran but registered nothing'));
      else done(null);
    };
    script.onerror = function () { done(new SB.SBError('Cities.load', 'the file for "' + slug + '" could not be opened')); };
    document.head.appendChild(script);
  }

  function cacheKey(slug, tune) { return slug + '|' + (tune ? stable(tune) : ''); }

  function get(slug) {
    var k = cacheKey(slug, null);
    if (!raws[slug]) SB.fail('Cities.get', 'pack "' + slug + '" is not loaded');
    if (!normCache[k]) normCache[k] = normalize(raws[slug], entry(slug), null);
    return normCache[k];
  }

  function pack(state) {
    var slug, tune, k;
    if (!state || !isStr(state.citySlug)) SB.fail('Cities.pack', 'state has no citySlug');
    slug = state.citySlug; tune = state.tune || null;
    if (!raws[slug]) SB.fail('Cities.pack', 'pack "' + slug + '" is not loaded');
    if (tune && !Object.keys(tune).length) tune = null;
    k = cacheKey(slug, tune);
    if (!normCache[k]) normCache[k] = normalize(raws[slug], entry(slug), tune);
    return normCache[k];
  }

  /* ------------------------------------------------------------------ */
  /* "Your town": the questions (04-cities 4.5)                          */
  /* ------------------------------------------------------------------ */

  function questions(slug) {
    var raw = raws[slug];
    if (!raw) SB.fail('Cities.questions', 'pack "' + slug + '" is not loaded');
    if (!raw.confidence || raw.confidence.scene !== 'UNVERIFIED') return [];
    return [
      { key: 'nights', kind: 'ONE', options: Object.keys(E.TUNE_NIGHTS) },
      { key: 'lean', kind: 'UP_TO_TWO', options: E.GENRES.slice() },
      { key: 'allAges', kind: 'YES_NO', options: [true, false] },
      { key: 'barOnly', kind: 'YES_NO', options: [true, false] },
      { key: 'town', kind: 'ONE', options: Object.keys(E.TUNE_TOWN) },
      { key: 'mainRoom', kind: 'ONE', options: ['HOUSE', 'BAR', 'HALL', 'DIY'] },
      { key: 'football', kind: 'YES_NO', options: [true, false] }
    ];
  }

  /* ------------------------------------------------------------------ */
  /* The calendar presets (04-cities 4.4)                                */
  /* ------------------------------------------------------------------ */

  function presetCalendar(preset, traits, hoods, tune) {
    var out = [], n = 0, t = traits, has_ = function (x) { return t.indexOf(x) >= 0; };
    var ALL = [0, 1, 2, 3, 4, 5, 6];
    function add(label, tag, month, weeks, dows, can, extra) {
      var e = { id: 'preset:' + tag + ':' + (n++), label: label, tag: tag, month: month, dows: dows.slice(), can: can.slice(), hoods: [], elsewhere: [1, 1, 1] }, k;
      if (typeof weeks === 'number') e.week = weeks; else e.weeks = weeks.slice();
      if (extra) for (k in extra) e[k] = extra[k];
      out.push(e);
    }
    var football = ['SOUTHEAST', 'GULF', 'MIDWEST', 'PLAINS'].indexOf(preset) >= 0;
    if (tune && yes(tune.football)) football = true;
    if (tune && no(tune.football)) football = false;
    var m, w, beachHoods;
    if (football) { add('high school football', 'game', 9, [1, 5], [4], [.88, 1, .97]); add('high school football', 'game', 10, [1, 5], [4], [.88, 1, .97]); }
    if (has_('COLLEGE')) {
      [9, 10, 11].forEach(function (mo) { [1, 3, 5].forEach(function (wk) { add('home football Saturday', 'game', mo, wk, [5], [.92, .88, .92]); }); });
    }
    if (['MIDWEST', 'PLAINS', 'MOUNTAIN', 'NORTHEAST'].indexOf(preset) >= 0) add('the county fair', 'fair', 9, 3, [3, 4, 5, 6], [.90, .95, .97]);
    else add('the county fair', 'fair', 10, 3, [3, 4, 5, 6], [.90, .95, .97]);
    if (has_('COLLEGE')) {
      add('move-in week', 'movein', 8, 4, [3, 4, 5, 6], [1.10, 1, 1]);
      add('finals', 'finals', 12, 2, [0, 1, 2, 3, 4], [.80, .92, 1]);
      add('finals', 'finals', 5, 1, [0, 1, 2, 3, 4], [.80, .92, 1]);
      add('the students are gone', 'summer', 6, [1, 5], ALL, [.82, .95, 1]);
      add('the students are gone', 'summer', 7, [1, 5], ALL, [.82, .95, 1]);
      add('graduation weekend', 'graduation', 5, 2, [4, 5, 6], [.85, .90, .95]);
    }
    if (has_('COASTAL') || has_('TOURIST')) {
      beachHoods = (hoods || []).filter(function (h) { return /beach|boardwalk|tourist/i.test(h.note || ''); }).map(function (h) { return h.id; });
      if (beachHoods.length) add('spring break', 'springbreak', 3, [2, 3], ALL, [.80, .80, .80], { hoods: beachHoods, elsewhere: [.90, .92, .95] });
      else add('spring break', 'springbreak', 3, [2, 3], ALL, [.90, .92, .95]);
    }
    if (has_('TOURIST')) for (m = 6; m <= 8; m++) add('the season', 'season', m, [1, 5], [4, 5], [1, .92, .95]);
    if (preset === 'PLAINS' || preset === 'MOUNTAIN' || has_('REMOTE')) add('opening weekend', 'hunting', 11, 2, [4, 5, 6], [1, .88, .82]);
    if (has_('MILITARY')) for (m = 1; m <= 12; m++) { add('payday weekend', 'payday', m, 1, [4], [1, 1.04, 1]); add('payday weekend', 'payday', m, 3, [4], [1, 1.04, 1]); }
    if (has_('CHURCHED')) for (m = 1; m <= 12; m++) add('Wednesday night', 'church', m, [1, 5], [2], [.88, .95, .92]);
    if (has_('SNOW')) add('the holidays', 'holiday', 12, [4, 5], ALL, [.80, .85, .90]);
    add('Halloween weekend', 'holiday', 10, [4, 5], [4, 5], [1.08, 1.05, 1]);   // SPEC? "October week 5 (or 4)": both weeks, so the last weekend before the 31st is always caught
    add('the night before Thanksgiving', 'holiday', 11, 4, [2], [1.05, 1.15, 1.10]);
    return out;
  }

  /* ------------------------------------------------------------------ */
  /* normalize                                                           */
  /* ------------------------------------------------------------------ */

  function effectiveTraits(base, tune) {
    var t = (base || []).slice(), town = tune && tune.town;
    function add(x) { if (t.indexOf(x) < 0) t.push(x); }
    function drop(x) { var i = t.indexOf(x); if (i >= 0) t.splice(i, 1); }
    if (town === 'COLLEGE') { add('COLLEGE'); drop('MILITARY'); }
    else if (town === 'BASE') { add('MILITARY'); drop('COLLEGE'); }
    else if (town === 'BOTH') { add('COLLEGE'); add('MILITARY'); }
    else if (town === 'NEITHER') { drop('COLLEGE'); drop('MILITARY'); }
    return t;
  }

  function normShares(row) {
    var s = sumOf(row), i, out = [];
    if (s <= 0) return row.slice();
    for (i = 0; i < row.length; i++) out.push(round(row[i] / s, 4));
    return out;
  }

  function generatedRooms(raw, entry_, traits, hoods, houseType, tune, t) {
    var rng = SB.rng.make(raw.slug), n = scaled('rooms', t), mix = copy(CITY.ROOM_MIX), kinds = Object.keys(mix), counts = {}, i, k, total, rem = [], used, rooms = [], seq = {};
    var size = (entry_ && entry_.size) || 'MID';
    var noAges = tune && no(tune.allAges), barOnly = tune && yes(tune.barOnly);
    if (barOnly) mix = copy(CITY.TUNE.barOnlyMix);
    if (size === 'SMALL') mix.CLUB = 0;
    if (size !== 'LARGE' && size !== 'HUGE') mix.BIG = 0;
    if (noAges) { mix.DIY = 0; mix.SHOP = 0; }
    if (tune && ['HOUSE', 'BAR', 'HALL', 'DIY'].indexOf(tune.mainRoom) >= 0 && mix[tune.mainRoom] > 0) mix[tune.mainRoom] *= CITY.TUNE.mainRoomMix;
    total = 0; kinds.forEach(function (x) { total += mix[x]; });
    kinds.forEach(function (x) { counts[x] = 0; });
    used = 0;
    kinds.forEach(function (x) { var v = n * mix[x] / total; counts[x] = Math.floor(v); used += counts[x]; rem.push({ k: x, r: v - Math.floor(v) }); });
    rem.sort(function (a, b) { return b.r - a.r; });
    for (i = 0; used < n && i < rem.length; i++, used++) counts[rem[i].k]++;
    function takeFromLargest(except, floorMap) {
      var best = null;
      kinds.forEach(function (x) { if (x !== except && counts[x] > (floorMap[x] || 0) && (best === null || counts[x] > counts[best])) best = x; });
      return best;
    }
    var mins = { HOUSE: 2, HALL: 1, BAR: 1, SHOP: noAges ? 0 : 1 };
    Object.keys(mins).forEach(function (x) {
      while (counts[x] < mins[x]) { var from = takeFromLargest(x, mins); if (!from) break; counts[from]--; counts[x]++; }
    });
    // hoods by keyword: A bars/downtown/nightlife, C cheap/industrial/warehouse/working, S campus/student/university
    var cityHoods = hoods.filter(function (h) { return !/^town:/.test(h.route || ''); });
    if (!cityHoods.length) cityHoods = hoods.slice();
    var cat = {};
    cityHoods.forEach(function (h) {
      var s = (h.note || '') + ' ' + (h.name || ''), a = /\bbars?\b|downtown|nightlife/i.test(s), c = /cheap|industrial|warehouse|working/i.test(s), st = /campus|student|university/i.test(s);
      cat[h.id] = { A: a, C: c, S: st, O: !a && !c && !st };
    });
    var want = { BAR: ['A'], CLUB: ['A'], BIG: ['A'], DIY: ['C'], OUTDOOR: ['C'], SHOP: ['S'], HOUSE: ['S', 'O'], HALL: ['O'] };
    var rr = 0;
    function hoodFor(kind) {
      var c = cityHoods.filter(function (h) { return want[kind].some(function (g) { return cat[h.id][g]; }); }), h;
      if (c.length) return rng.pick(c).id;
      h = cityHoods[rr % cityHoods.length]; rr++;
      return h.id;
    }
    var order = ['HOUSE', 'DIY', 'HALL', 'BAR', 'CLUB', 'SHOP', 'OUTDOOR', 'BIG'];
    order.forEach(function (kind) {
      var d = CITY.ROOM_DEFAULT[kind], j, r;
      for (j = 0; j < (counts[kind] || 0); j++) {
        seq[kind] = (seq[kind] || 0) + 1;
        r = { id: kind.toLowerCase() + '-' + seq[kind], kind: kind, hood: hoodFor(kind) };
        r.cap = (kind === 'HOUSE' && (houseType === 'BASEMENT' || houseType === 'ROWHOUSE')) ? rng.int(40, 70) : rng.int(d.cap[0], d.cap[1]);
        if (isArr(d.rent)) r.rent = roundTo(rng.int(d.rent[0], d.rent[1]), 5);
        if (isArr(d.pa)) r.pa = round(rng.range(d.pa[0], d.pa[1]), 2);
        if (isArr(d.sketch)) r.sketch = rng.int(d.sketch[0], d.sketch[1]);
        if (isArr(d.notice)) r.notice = rng.int(d.notice[0], d.notice[1]);
        if (isArr(d.houseCosts)) r.houseCosts = roundTo(rng.int(d.houseCosts[0], d.houseCosts[1]), 10);
        r.generated = true;
        rooms.push(r);
      }
    });
    return rooms;
  }

  function fillRoom(r, zoneId, houseType, startAllowed) {
    var d = CITY.ROOM_DEFAULT[r.kind] || CITY.ROOM_DEFAULT.HOUSE;
    function mid(v) { return isArr(v) ? (v[0] + v[1]) / 2 : v; }
    function dflt(k, v) { if (r[k] === undefined || r[k] === null) r[k] = v; }
    var exposed = r.kind === 'OUTDOOR' || (r.kind === 'HOUSE' && (houseType === 'CARPORT' || houseType === 'GARAGE'));
    r.zone = zoneId;
    dflt('name', null);
    dflt('cap', Math.round(mid(d.cap)));
    dflt('rent', Math.round(mid(d.rent) || 0));
    dflt('deposit', d.deposit || 0);
    dflt('soundFee', d.soundFee || 0);
    dflt('houseCosts', Math.round(mid(d.houseCosts) || 0));
    if (r.split === undefined) r.split = d.split || null;
    dflt('hostCut', 0);   // SPEC? 04-cities 2.5 gives no default for hostCut: the smaller behavior is none
    dflt('pa', round(mid(d.pa), 2));
    dflt('ages', (r.kind === 'BAR' || r.kind === 'CLUB') ? ['A21'] : ['ALL']);
    dflt('matinee', false);
    dflt('curfew', d.curfew);
    dflt('ac', AC_BY_KIND[r.kind]);
    dflt('outdoor', exposed);
    dflt('lowLying', false);
    dflt('seated', false);
    dflt('following', 0);
    dflt('sketch', Math.round(mid(d.sketch)));
    dflt('standing', [60, 60, 60]);
    dflt('owner', OWNER_BY_KIND[r.kind]);
    dflt('notice', Math.round(mid(d.notice)));
    dflt('needs', NEEDS_BY_KIND[r.kind].slice());
    dflt('pressure', (r.kind === 'HOUSE' || r.kind === 'DIY') ? 50 : 40);
    dflt('start', false);
    dflt('note', '');
    dflt('generated', false);
    if (!startAllowed) r.start = false;
    return r;
  }

  function roundedList(list, step) { return list.map(function (x) { return roundTo(x, step); }); }

  function defaultBookers(raw, rooms, scene, t, slug) {
    var rng = SB.rng.make(slug + ':bookers'), n = scaled('bookers', t), out = [], clubs = rooms.filter(function (r) { return r.kind === 'CLUB'; }), i, genreScore = {}, g, order, rest;
    E.GENRES.forEach(function (x, gi) { genreScore[x] = 0; [0, 1, 2].forEach(function (k) { genreScore[x] += scene.gens[k] * scene.genreShares[k][gi]; }); });
    order = E.GENRES.slice().sort(function (a, b) { return genreScore[b] - genreScore[a]; });
    function genres() { var top = order.slice(0, 6), a = rng.pick(top), b = rng.pick(top); return a === b ? [a] : [a, b]; }
    function homes(kinds) { var c = rooms.filter(function (r) { return kinds.indexOf(r.kind) >= 0; }); return c.length ? [rng.pick(c).id] : []; }
    function style() { return { reliable: round(rng.range(.55, .95), 2), pays: round(rng.range(.5, .95), 2), promotes: round(rng.range(.3, .9), 2) }; }
    clubs.forEach(function (c) { out.push({ kind: 'TALENT_BUYER', genres: genres(), homeRooms: [c.id], name: rng.int(40, 60), showsPerMonth: 3, nights: [4, 5], style: style() }); });
    out.push({ kind: 'KID', genres: genres(), homeRooms: homes(['HOUSE', 'OUTDOOR']), name: rng.int(20, 30), showsPerMonth: 1, nights: [4, 5, 6], style: style() });
    out.push({ kind: 'OLD', genres: genres(), homeRooms: homes(['HALL', 'BAR']), name: rng.int(25, 40), showsPerMonth: .3, nights: [5], style: style() });
    for (i = out.length; i < n; i++) {
      g = i % 2 === 0 ? 'GENRE' : 'ANYWHERE';
      out.push({ kind: g, genres: genres(), homeRooms: homes(g === 'GENRE' ? ['DIY', 'HALL', 'HOUSE'] : ['BAR', 'HALL', 'SHOP']), name: rng.int(20, 60), showsPerMonth: round(rng.range(1, 2.5), 1), nights: [4, 5], style: style() });
    }
    return out;
  }

  function normalizeBooker(b, rooms) {
    var o = copy(b);
    if (!isArr(o.genres)) o.genres = [];
    if (!isArr(o.homeRooms)) o.homeRooms = [];
    if (!isNum(o.name)) o.name = 40;
    if (!isNum(o.showsPerMonth)) o.showsPerMonth = o.kind === 'OLD' ? .3 : 1;
    if (!isArr(o.nights)) o.nights = [4, 5];
    o.style = Object.assign({ reliable: .7, pays: .7, promotes: .6 }, o.style || {});
    return o;
  }

  function placeOf(x, zonesOf) {
    var e;
    if (typeof x === 'string') {
      e = entry(x);
      return e ? { slug: e.slug, name: e.name, state: e.state, lat: e.lat, lon: e.lon } : { slug: x, name: x, state: '', lat: 0, lon: 0 };
    }
    e = null;
    return { slug: x.slug || null, name: x.name, state: x.state, lat: x.lat, lon: x.lon };
  }

  function normalize(rawPack, indexEntry, tune) {
    var raw = copy(rawPack), ent = indexEntry || entry(raw.slug) || null, tn = tune && Object.keys(tune).length ? copy(tune) : null;
    var baseTraits = (ent && ent.traits) || [], traits = effectiveTraits(baseTraits, tn), pop = (ent && ent.pop) || CITY.REF_SMALL;
    var t = tOf(pop), P = {}, i, k, tuned = !!tn;
    var presetKey, wsrc, stsrc;

    /* identity */
    P.v = 1; P.slug = raw.slug;
    P.confidence = Object.assign({ geography: 'UNVERIFIED', scene: 'UNVERIFIED', names: 'UNCHECKED' }, raw.confidence || {});
    P.banned = (raw.banned || []).slice();
    P.blocklist = (raw.blocklist || []).slice();
    P.blurb = isArr(raw.blurb) ? raw.blurb.slice() : (raw.blurb ? [raw.blurb] : []);
    P.hard = raw.hard || '';
    P.region = raw.region || 'the region';
    P.missing = raw.missing === undefined ? null : raw.missing;
    if (!raw.missing && tn && no(tn.allAges)) P.missing = 'A safe, legal, all-ages room.';
    P.basements = typeof raw.basements === 'boolean' ? raw.basements : hasBasements(ent || { state: '' }, traits);
    P.houseType = raw.houseType || (traits.indexOf('SNOW') >= 0 ? 'BASEMENT' : ((traits.indexOf('HURRICANE') >= 0 || traits.indexOf('DESERT') >= 0) ? 'CARPORT' : 'GARAGE'));
    if (!P.basements && P.houseType === 'BASEMENT') P.houseType = 'CARPORT';

    /* whereGo */
    if (isArr(raw.whereGo) && raw.whereGo.length) P.whereGo = raw.whereGo.map(function (w) { return { name: w.name, state: w.state, lat: w.lat, lon: w.lon }; });
    else {
      var big = (SB.CityIndex || []).filter(function (c) { return (c.size === 'LARGE' || c.size === 'HUGE') && ent && c.slug !== ent.slug; });
      big.sort(function (a, b) { return SB.geo.drive(ent, a) - SB.geo.drive(ent, b); });
      P.whereGo = big.length ? [{ name: big[0].name, state: big[0].state, lat: big[0].lat, lon: big[0].lon }] : [];
    }

    /* scene */
    var sc = raw.scene || {}, S = {};
    S.size = isNum(sc.size) ? sc.size : sceneSizeFor(pop, traits);
    if (sc.gens) S.gens = sc.gens.slice();
    else {
      S.gens = CITY.GENS.slice();
      if (traits.indexOf('COLLEGE') >= 0) { S.gens[0] = round(S.gens[0] + CITY.TUNE.college.kids, 4); S.gens[2] = round(S.gens[2] - CITY.TUNE.college.kids, 4); }
      if (tn && no(tn.allAges)) {
        var kk = round(S.gens[0] * CITY.TUNE.noAllAgesKids, 4), rest = 1 - kk, mo = S.gens[1] + S.gens[2];
        S.gens = [kk, round(S.gens[1] / mo * rest, 4), round(S.gens[2] / mo * rest, 4)];
      }
    }
    if (sc.genreShares) S.genreShares = copy(sc.genreShares);
    else {
      S.genreShares = copy(CITY.GENRE_SHARES);
      if (tn && isArr(tn.lean) && tn.lean.length) {
        S.genreShares = S.genreShares.map(function (row) {
          return normShares(row.map(function (v, gi) { return tn.lean.indexOf(E.GENRES[gi]) >= 0 ? v * CITY.TUNE.lean : v; }));
        });
      }
    }
    ['stack', 'roomTau', 'trendLag', 'glutAt', 'traffic', 'wordStart', 'memberChurn'].forEach(function (key) {
      S[key] = isNum(sc[key]) ? sc[key] : scaled(key, t);
    });
    if (!isNum(sc.traffic) && traits.indexOf('REMOTE') >= 0) S.traffic = Math.round(S.traffic * .3);
    if (!isNum(sc.memberChurn) && tn && baseTraits.indexOf('MILITARY') < 0 && traits.indexOf('MILITARY') >= 0) S.memberChurn = round(S.memberChurn * CITY.TUNE.base.memberChurn, 5);
    S.kidIntake = isNum(sc.kidIntake) ? sc.kidIntake : Math.round(CITY.KID_INTAKE_SHARE * S.size);
    S.transit = typeof sc.transit === 'boolean' ? sc.transit : traits.indexOf('TRANSIT') >= 0;
    P.scene = S;

    /* money */
    var mn = raw.money || {}, M = {}, pi = isNum(mn.priceIndex) ? mn.priceIndex : scaled('priceIndex', t);
    M.priceIndex = pi;
    M.comfort = mn.comfort ? mn.comfort.slice() : CITY.COMFORT.map(function (x) { return Math.round(x * pi); });
    if (mn.bills) M.bills = Object.assign({}, mn.bills);
    else {
      M.bills = {};
      Object.keys(CITY.BILLS).forEach(function (b) { M.bills[b] = Math.round(CITY.BILLS[b] * pi * (b === 'CAR' && S.transit ? .5 : 1)); });
    }
    M.shiftPay = isNum(mn.shiftPay) ? mn.shiftPay : Math.round(CITY.SHIFT_PAY * pi);
    M.startCash = isNum(mn.startCash) ? mn.startCash : CITY.START_CASH;
    P.money = M;

    /* night */
    if (raw.night) P.night = copy(raw.night);
    else {
      var lift = scaled('weeknightLift', t), night = copy(C.NIGHT_DEFAULT), d;
      for (d = 1; d <= 3; d++) night[1][d] = round(Math.min(1, night[1][d] + lift), 3);
      if (tn && tn.nights === 'THURSDAY_TOO') for (i = 0; i < 3; i++) night[i][3] = round(Math.min(night[i][4], night[i][3] + CITY.TUNE.thursday), 3);
      else if (tn && tn.nights === 'ANY') for (i = 1; i < 3; i++) for (d = 0; d <= 3; d++) night[i][d] = round(Math.min(1, night[i][d] + CITY.TUNE.anyNight), 3);
      P.night = night;
    }

    /* tilt */
    P.tilt = copy(raw.tilt || []);
    if (!raw.tilt && tn && isArr(tn.lean) && tn.lean.length === 2) {
      P.tilt.push({ fan: tn.lean[0], band: tn.lean[1], d: .10, reason: 'The two crowds in this town overlap.' });
    }

    /* chokepoints, hoods */
    P.chokepoints = copy(raw.chokepoints || []);
    P.hoods = copy(raw.hoods || []).map(function (h) {
      var s = (h.note || '') + ' ' + (h.name || '');
      if (!h.note) h.note = '';
      if (!h.route) h.route = /\bbars?\b|downtown|nightlife/i.test(s) ? 'downtown' : (/cheap|industrial|warehouse|working/i.test(s) ? 'work-side' : (/campus|student|university/i.test(s) ? 'campus' : 'old-side'));
      return h;
    });

    /* zones */
    var zr = copy(raw.zones || []), feeders = zr.filter(function (z) { return z.kind !== 'CITY'; }), fi = 0, cityRooms, zoneRooms = [];
    var Z = zr.map(function (z) {
      var o = z;
      if (z.kind === 'CITY') {
        o.state = z.state || (ent && ent.state) || ''; o.minutes = 0; o.bearing = 0; o.scene = S.size; o.pop = z.pop || pop; o.slug = null; o.note = z.note || '';
        o.lean = []; o.gens = S.gens.slice(); o.bands = 0; o.beyond = null; o.season = null; o.rooms = [];
        return o;
      }
      if (!isNum(z.bearing)) o.bearing = Math.round(360 / Math.max(1, feeders.length) * fi);
      fi++;
      o.state = z.state || (ent && ent.state) || '';
      o.pop = isNum(z.pop) ? z.pop : null;
      o.slug = z.slug || null;
      if (!isNum(z.scene)) {
        if (z.kind === 'PEER' && z.slug && entry(z.slug)) o.scene = sceneSizeFor(entry(z.slug).pop, entry(z.slug).traits || []);
        else if (z.kind === 'PEER') o.scene = 400;   // SPEC? a PEER with no slug and no scene: a small-city guess
        else o.scene = o.pop ? Math.max(CITY.FEEDER.minScene, Math.round(o.pop * CITY.FEEDER.sceneShare)) : 40;
      }
      o.note = z.note || '';
      o.lean = (z.lean || []).slice(0, 2);
      o.gens = z.gens ? z.gens.slice() : S.gens.slice();
      o.bands = isNum(z.bands) ? z.bands : Math.round(o.scene / 90);
      o.beyond = z.beyond || null;
      o.season = z.season || null;
      if (z.kind === 'PEER') o.rooms = [];
      else if (!isArr(z.rooms)) o.rooms = (o.scene >= 80) ? [
        { id: z.id + '-hall', kind: 'HALL', hood: z.id, cap: 90, rent: 100, generated: true },
        { id: z.id + '-yard', kind: 'OUTDOOR', hood: z.id, cap: 50, generated: true }
      ] : [];
      return o;
    });
    // a hood for every feeder that has rooms and no hood
    Z.forEach(function (z) {
      if (z.kind !== 'FEEDER' || !z.rooms.length) return;
      var found = P.hoods.filter(function (h) { return h.route === 'town:' + z.id; })[0];
      z.rooms.forEach(function (r) {
        if (r.generated && found) r.hood = found.id;
      });
      if (!found && !P.hoods.some(function (h) { return h.id === z.id; })) P.hoods.push({ id: z.id, name: z.name, note: '', route: 'town:' + z.id, generated: true });
    });

    /* rooms */
    // SPEC? a FEEDER with scene >= 80 and no rooms gets the default HALL and OUTDOOR in zone.rooms; city rooms stay in pack.rooms; derived.allRooms lists both
    if (isArr(raw.rooms) && raw.rooms.length) cityRooms = copy(raw.rooms);
    else cityRooms = generatedRooms(raw, ent, traits, P.hoods, P.houseType, tn, t);
    cityRooms = cityRooms.map(function (r) { return fillRoom(r, 'city', P.houseType, true); });
    var starts = cityRooms.filter(function (r) { return r.start; });
    if (starts.length > 1) starts.slice(1).forEach(function (r) { r.start = false; });
    if (!starts.length || (tn && !isArr(raw.rooms) && ['HOUSE', 'DIY', 'HALL', 'BAR'].indexOf(tn.mainRoom) >= 0)) {
      cityRooms.forEach(function (r) { r.start = false; });
      var pick = null;
      if (tn && (tn.mainRoom === 'HOUSE' || tn.mainRoom === 'DIY')) pick = cityRooms.filter(function (r) { return r.kind === tn.mainRoom; })[0] || null;
      if (!pick) pick = cityRooms.filter(function (r) { return r.kind === 'HOUSE'; })[0] || null;
      if (!pick || (tn && (tn.mainRoom === 'BAR' || tn.mainRoom === 'HALL'))) {
        var allAges = cityRooms.filter(function (r) { return r.ages.indexOf('ALL') >= 0; });
        allAges.sort(function (a, b) { return (a.rent + a.deposit) - (b.rent + b.deposit) || a.cap - b.cap; });
        pick = allAges[0] || pick || cityRooms[0];
      }
      if (pick) pick.start = true;
    }
    P.rooms = cityRooms;
    Z.forEach(function (z) {
      if (z.kind === 'FEEDER') z.rooms = z.rooms.map(function (r) { return fillRoom(r, z.id, P.houseType, false); });
    });
    P.zones = Z;

    /* routes */
    var rts, assigned = {};
    if (isArr(raw.routes) && raw.routes.length) rts = copy(raw.routes).map(function (r) { if (!r.zone) r.zone = 'city'; if (!isArr(r.spots)) r.spots = []; if (!isNum(r.hours)) r.hours = 2; return r; });
    else {
      P.hoods.forEach(function (h) { if (!assigned[h.route]) assigned[h.route] = h; });
      rts = C.CHANNELS.RUN_DEFAULT.map(function (d) {
        var h = assigned[d.id], nm = h ? h.name.replace(/^the /, '') : GENERIC_ROUTE_NAME[d.id];
        return { id: d.id, name: nm ? nm.charAt(0).toUpperCase() + nm.slice(1) : d.id, zone: 'city', ceil: d.ceil.slice(), hours: 2, spots: copy(GENERIC_SPOTS[d.id] || []) };
      });
    }
    Z.forEach(function (z) {
      if (z.kind === 'CITY' || z.scene < 50) return;
      if (rts.some(function (r) { return r.id === 'town:' + z.id; })) return;
      rts.push({ id: 'town:' + z.id, name: z.name, zone: z.id, ceil: [.12, .10, .08], hours: 2 + Math.round(z.minutes / 30), spots: [] });
    });
    P.routes = rts;
    P.chokepoints = P.chokepoints.map(function (c) { return { id: c.id, name: c.name, p: isNum(c.p) ? c.p : .02 }; });

    /* bookers, contacts, cast */
    P.bookers = isArr(raw.bookers) ? raw.bookers.map(function (b) { return normalizeBooker(b, cityRooms); }) : defaultBookers(raw, cityRooms, S, t, raw.slug);
    var contacts = [], seenC = {};
    function addContact(x) {
      var p = placeOf(x), key = p.slug || (p.name + '|' + p.state);
      if (seenC[key]) return;
      seenC[key] = true; contacts.push(p);
    }
    if (isArr(raw.contacts)) raw.contacts.forEach(addContact);
    else {
      Z.forEach(function (z) {
        var home = ent || { lat: 0, lon: 0 }, mi, la, lo, b;
        if (z.kind !== 'PEER') return;
        if (z.slug && entry(z.slug)) { addContact(z.slug); return; }
        mi = z.minutes / C.DRIVE_FACTOR; b = z.bearing * Math.PI / 180;
        la = home.lat + mi * Math.cos(b) / 69; lo = home.lon + mi * Math.sin(b) / (69 * Math.cos(home.lat * Math.PI / 180));
        addContact({ name: z.name, state: z.state, lat: round(la, 2), lon: round(lo, 2) });
      });
      if (ent) near(ent.slug, 300).filter(function (n) { return !n.entry.point; }).slice(0, 2).forEach(function (n) { addContact(n.entry.slug); });
    }
    if (P.whereGo.length) {
      var wg = P.whereGo[0], match = (SB.CityIndex || []).filter(function (c) { return c.name === wg.name && c.state === wg.state; })[0];
      addContact(match ? match.slug : wg);
    }
    P.contacts = contacts;   // SPEC? normalized to place objects { slug, name, state, lat, lon } (the shape of 01-state's Contact.place)
    P.cast = Object.assign({ soundRate: C.PAY.SOUND[0], securityRate: Math.round(C.PAY.SECURITY[0] * pi) }, raw.cast || {});

    /* weather */
    presetKey = (raw.weather && raw.weather.preset) || presetFor(ent || { state: '', traits: traits }, traits);
    wsrc = raw.weather || {};
    var snow = traits.indexOf('SNOW') >= 0, hurr = traits.indexOf('HURRICANE') >= 0;
    P.weather = {
      preset: presetKey,
      rain: (wsrc.rain || WEATHER[presetKey].rain).slice(),
      heat: (wsrc.heat || WEATHER[presetKey].heat).slice(),
      cold: (wsrc.cold || WEATHER[presetKey].cold).slice(),
      fineMonths: (wsrc.fineMonths || (snow ? [4, 5] : [3, 4])).slice(),
      coolMonths: (wsrc.coolMonths || (snow ? [9] : [10])).slice(),
      storm: wsrc.storm ? copy(wsrc.storm) : (hurr ? { months: [6, 7, 8, 9, 10, 11], peak: [8, 9, 10], perWeek: .01, perWeekPeak: .04 }
              : (snow ? { months: [12, 1, 2, 3], peak: [1, 2], perWeek: .03, perWeekPeak: .06 } : null))
    };

    /* calendar */
    if (isArr(raw.calendar)) {
      P.calendar = copy(raw.calendar).map(function (c) {
        if (!isArr(c.dows)) c.dows = [0, 1, 2, 3, 4, 5, 6];
        if (c.week === undefined && !isArr(c.weeks)) c.weeks = [1, 5];
        if (!isArr(c.hoods)) c.hoods = [];
        if (!isArr(c.elsewhere)) c.elsewhere = [1, 1, 1];
        return c;
      });
      P.calendarFrom = 'PACK';
    } else {
      P.calendar = presetCalendar(presetKey, traits, P.hoods, tn);
      P.calendarFrom = 'PRESET';
    }

    /* rules, points, roads, style, words, events */
    P.rules = { curfewMinors: null, quiet: 1320 };
    if (raw.rules) { if (raw.rules.curfewMinors) P.rules.curfewMinors = copy(raw.rules.curfewMinors); if (isNum(raw.rules.quiet)) P.rules.quiet = raw.rules.quiet; }
    P.points = copy(raw.points || []);
    P.roads = (raw.roads || []).slice(0, 6);
    stsrc = raw.style || {};
    var sp = STYLE[presetKey] || STYLE.SOUTHEAST;
    P.style = {
      inks: (stsrc.inks || sp.inks).slice(), papers: (stsrc.papers || sp.papers).slice(), motifs: (stsrc.motifs || sp.motifs).slice(),
      avoid: (stsrc.avoid || []).slice(), pictures: (stsrc.pictures || sp.pictures).slice(), seasonal: copy(stsrc.seasonal || []),
      cityInks: (stsrc.cityInks || (ent && ent.inks) || sp.cityInks).slice(), cityPaper: stsrc.cityPaper || (ent && ent.paper) || sp.cityPaper,
      dateStyle: stsrc.dateStyle || 'FRI_NOV_20'
    };
    /* the flyer pictures this town never draws (flyer.js reads style.noPictures) */
    P.style.noPictures = P.basements ? [] : ['basement'];
    P.style.pictures = P.style.pictures.filter(function (x) { return P.style.noPictures.indexOf(x) < 0; });
    var w = raw.words || {};
    P.words = { street: (w.street || []).slice(), water: (w.water || []).slice(), hood: (w.hood || []).slice(), thing: (w.thing || []).slice(),
                weather: (w.weather || []).slice(), order: (w.order || []).slice(), surnames: (w.surnames || []).slice(), bands: copy(w.bands || {}) };
    P.events = copy(raw.events || []);

    /* derived */
    var D = { t: round(t, 3), zoneById: {}, roomById: {}, routeById: {}, hoodById: {}, cityRoutes: [], townRoutes: [], cuts: {}, localWords: [],
              calendarFrom: P.calendarFrom, tuned: tuned, billsTotal: 0, index: ent ? copy(ent) : null, traits: traits, allRooms: [] };
    Z.forEach(function (z) { D.zoneById[z.id] = z; });
    P.hoods.forEach(function (h) { D.hoodById[h.id] = h; });
    P.routes.forEach(function (r) { D.routeById[r.id] = r; (r.zone === 'city' ? D.cityRoutes : D.townRoutes).push(r.id); });
    P.chokepoints.forEach(function (c) { D.cuts[c.id] = []; });
    Z.forEach(function (z) { if (z.beyond && D.cuts[z.beyond]) D.cuts[z.beyond].push(z.id); });
    D.allRooms = cityRooms.slice();
    Z.forEach(function (z) { if (z.kind === 'FEEDER') z.rooms.forEach(function (r) { D.allRooms.push(r); }); });
    D.allRooms.forEach(function (r) { D.roomById[r.id] = r; });
    var lw = [], seenW = {};
    function addW(x) { if (x && !seenW[x]) { seenW[x] = true; lw.push(x); } }
    P.words.street.forEach(addW); P.words.water.forEach(addW);
    if (P.words.hood.length) P.words.hood.forEach(addW);
    else P.hoods.forEach(function (h) { if (!h.generated && normText(h.name) !== 'downtown') addW(h.name); });
    D.localWords = lw;
    D.billsTotal = sumOf(Object.keys(M.bills).map(function (b) { return M.bills[b]; }));
    P.derived = D;
    return P;
  }

  /* ------------------------------------------------------------------ */
  /* validate                                                            */
  /* ------------------------------------------------------------------ */

  var TOP_KEYS = ['v', 'slug', 'confidence', 'banned', 'blocklist', 'blurb', 'hard', 'region', 'missing', 'whereGo', 'houseType', 'basements', 'scene', 'money',
                  'night', 'tilt', 'zones', 'chokepoints', 'hoods', 'routes', 'rooms', 'bookers', 'contacts', 'cast', 'weather', 'calendar', 'rules',
                  'points', 'roads', 'style', 'words', 'events'];
  var ZONE_KEYS = ['id', 'kind', 'name', 'state', 'minutes', 'bearing', 'scene', 'pop', 'slug', 'note', 'lean', 'gens', 'bands', 'beyond', 'season', 'rooms'];
  var ROOM_KEYS = ['id', 'kind', 'hood', 'zone', 'cap', 'name', 'rent', 'deposit', 'soundFee', 'houseCosts', 'split', 'hostCut', 'pa', 'ages', 'matinee', 'curfew',
                   'ac', 'outdoor', 'lowLying', 'seated', 'following', 'sketch', 'standing', 'owner', 'notice', 'needs', 'pressure', 'start', 'note',
                   'security', 'insurance', 'parking', 'neighbor'];
  var SCENE_KEYS = ['size', 'gens', 'genreShares', 'stack', 'roomTau', 'trendLag', 'glutAt', 'traffic', 'wordStart', 'memberChurn', 'kidIntake', 'transit'];
  var MONEY_KEYS = ['comfort', 'bills', 'shiftPay', 'startCash', 'priceIndex'];
  var WORD_KEYS = ['street', 'water', 'hood', 'thing', 'weather', 'order', 'surnames', 'bands'];
  var STYLE_KEYS = ['inks', 'papers', 'motifs', 'avoid', 'pictures', 'seasonal', 'cityInks', 'cityPaper', 'dateStyle'];

  function textsOf(x, skipKeys, out, path) {
    var k, i;
    if (typeof x === 'string') { out.push({ path: path, text: x }); return out; }
    if (isArr(x)) { for (i = 0; i < x.length; i++) textsOf(x[i], skipKeys, out, path + '[' + i + ']'); return out; }
    if (isObj(x)) for (k in x) if (has(x, k) && !(skipKeys && path === '' && skipKeys.indexOf(k) >= 0)) textsOf(x[k], skipKeys, out, path ? path + '.' + k : k);
    return out;
  }

  function bannedRegex(term) {
    var t = normText(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '[^a-z0-9]+');
    return new RegExp('(^|[^a-z0-9])' + t + '([^a-z0-9]|$)');
  }

  function validate(raw, extraBanned) {
    var P = [], idsSeen, i, j, k, z, r, n, g;
    var index = idx(), haveIndex = indexSize() > 0;
    function bad(msg) { P.push(msg); }
    function warn(msg) { P.push('warning: ' + msg); }
    function content(msg) { P.push('content: ' + msg); }
    function nums(list, len, lo, hi, where) {
      var q;
      if (!isArr(list) || list.length !== len) { bad(where + ' must be a list of ' + len + ' numbers'); return false; }
      for (q = 0; q < list.length; q++) if (!isNum(list[q]) || list[q] < lo || list[q] > hi) { bad(where + '[' + q + '] must be a number from ' + lo + ' to ' + hi); return false; }
      return true;
    }
    function unknownKeys(o, allowed, where) {
      Object.keys(o).forEach(function (key) {
        if (allowed.indexOf(key) < 0) bad(where + ': unknown key "' + key + '"' + (key === 'minStage' ? ' (a room has no stage)' : (key === 'cuts' ? ' (a zone\'s beyond says what a chokepoint cuts)' : '')));
      });
    }
    if (!isObj(raw)) return ['the pack is not an object'];
    unknownKeys(raw, TOP_KEYS, 'pack');
    if (raw.v !== 1) bad('v must be 1');
    if (!isStr(raw.slug) || !/^[a-z0-9-]+$/.test(raw.slug)) bad('slug must be lower-case letters, digits and hyphens');
    else if (haveIndex && !index[raw.slug]) bad('slug "' + raw.slug + '" is not in the index');
    // confidence
    if (!isObj(raw.confidence)) bad('confidence is required');
    else {
      ['geography', 'scene'].forEach(function (key) { if (['VERIFIED', 'PARTLY', 'UNVERIFIED'].indexOf(raw.confidence[key]) < 0) bad('confidence.' + key + ' must be VERIFIED, PARTLY or UNVERIFIED'); });
      if (['CHECKED', 'UNCHECKED'].indexOf(raw.confidence.names) < 0) bad('confidence.names must be CHECKED or UNCHECKED');
    }
    ['banned', 'blocklist'].forEach(function (key) {
      if (raw[key] !== undefined && (!isArr(raw[key]) || raw[key].some(function (s) { return !isStr(s); }))) bad(key + ' must be a list of strings');
    });
    if (!(isStr(raw.blurb) || (isArr(raw.blurb) && raw.blurb.length >= 1 && raw.blurb.length <= 2 && raw.blurb.every(isStr)))) bad('blurb is required: one or two lines');
    if (!isStr(raw.hard)) bad('hard is required');
    if (raw.region !== undefined && !isStr(raw.region)) bad('region must be a string');
    if (raw.houseType !== undefined && !enumHas(E.HOUSE_TYPE, raw.houseType)) bad('houseType "' + raw.houseType + '" is not a HOUSE_TYPE');
    if (raw.basements !== undefined && typeof raw.basements !== 'boolean') bad('basements must be true or false');
    if (raw.whereGo !== undefined) {
      if (!isArr(raw.whereGo)) bad('whereGo must be a list');
      else raw.whereGo.forEach(function (w, q) { if (!isObj(w) || !isStr(w.name) || !isNum(w.lat) || !isNum(w.lon)) bad('whereGo[' + q + '] needs name, state, lat, lon'); });
    }
    // scene, money, night, tilt
    if (raw.scene !== undefined) {
      if (!isObj(raw.scene)) bad('scene must be an object');
      else {
        unknownKeys(raw.scene, SCENE_KEYS, 'scene');
        if (raw.scene.gens !== undefined) { if (nums(raw.scene.gens, 3, 0, 1, 'scene.gens') && Math.abs(sumOf(raw.scene.gens) - 1) > .02) bad('scene.gens must sum to 1'); }
        if (raw.scene.genreShares !== undefined) {
          if (!isArr(raw.scene.genreShares) || raw.scene.genreShares.length !== 3) bad('scene.genreShares must be 3 rows');
          else raw.scene.genreShares.forEach(function (row, q) { if (nums(row, 12, 0, 1, 'scene.genreShares[' + q + ']') && Math.abs(sumOf(row) - 1) > .02) bad('scene.genreShares[' + q + '] must sum to 1'); });
        }
        ['size', 'stack', 'roomTau', 'trendLag', 'glutAt', 'traffic', 'wordStart', 'memberChurn', 'kidIntake'].forEach(function (key) { if (raw.scene[key] !== undefined && !isNum(raw.scene[key])) bad('scene.' + key + ' must be a number'); });
      }
    }
    if (raw.money !== undefined) {
      if (!isObj(raw.money)) bad('money must be an object');
      else {
        unknownKeys(raw.money, MONEY_KEYS, 'money');
        if (raw.money.comfort !== undefined) nums(raw.money.comfort, 3, 0, 1000, 'money.comfort');
        if (raw.money.bills !== undefined) { if (!isObj(raw.money.bills)) bad('money.bills must be an object'); else ['RENT', 'UTILITIES', 'CAR', 'FOOD'].forEach(function (b) { if (!isNum(raw.money.bills[b])) bad('money.bills.' + b + ' must be a number'); }); }
      }
    }
    if (raw.night !== undefined) {
      if (!isArr(raw.night) || raw.night.length !== 3) bad('night must be 3 rows of 7');
      else raw.night.forEach(function (row, q) { nums(row, 7, 0, 1.5, 'night[' + q + ']'); });
    }
    if (raw.tilt !== undefined) {
      if (!isArr(raw.tilt) || raw.tilt.length > 4) bad('tilt is a list of at most four entries');
      else raw.tilt.forEach(function (tl, q) {
        if (!isObj(tl) || !enumHas(E.GENRE, tl.fan) || !enumHas(E.GENRE, tl.band) || !isNum(tl.d) || !isStr(tl.reason)) bad('tilt[' + q + '] needs fan, band (genres), d and reason');
        else if (tl.gen !== undefined && [0, 1, 2].indexOf(tl.gen) < 0) bad('tilt[' + q + '].gen must be 0, 1 or 2');
      });
    }
    // chokepoints first (zones refer to them)
    var chokeIds = {}, zoneIds = {}, roomIds = {}, hoodIds = {}, routeIds = {}, zoneList = isArr(raw.zones) ? raw.zones : [];
    if (raw.chokepoints !== undefined) {
      if (!isArr(raw.chokepoints)) bad('chokepoints must be a list');
      else {
        var ptotal = 0;
        raw.chokepoints.forEach(function (c, q) {
          if (!isObj(c) || !isStr(c.id) || !isStr(c.name) || !isNum(c.p)) { bad('chokepoints[' + q + '] needs id, name, p'); return; }
          unknownKeys(c, ['id', 'name', 'p'], 'chokepoints[' + q + ']');
          if (chokeIds[c.id]) bad('chokepoint id "' + c.id + '" is repeated');
          chokeIds[c.id] = true; ptotal += c.p;
        });
        if (ptotal > .05 + 1e-9) bad('chokepoint p values sum to ' + round(ptotal, 4) + ', more than .05');
      }
    }
    // zones
    var cityCount = 0, feederCount = 0;
    if (!isArr(raw.zones) || !raw.zones.length) bad('zones: at least the city zone is required');
    else {
      raw.zones.forEach(function (zn, q) {
        var where = 'zones[' + q + ']';
        if (!isObj(zn)) { bad(where + ' is not an object'); return; }
        unknownKeys(zn, ZONE_KEYS, where + (zn.id ? ' (' + zn.id + ')' : ''));
        if (!isStr(zn.id) || !/^[a-z0-9-]+$/.test(zn.id)) bad(where + ': id must be lower-case letters, digits and hyphens');
        else { if (zoneIds[zn.id]) bad(where + ': id "' + zn.id + '" is repeated'); zoneIds[zn.id] = zn; }
        if (!enumHas(E.ZONE, zn.kind)) { bad(where + ': kind must be CITY, FEEDER or PEER'); return; }
        if (!isStr(zn.name)) bad(where + ': name is required');
        if (zn.kind === 'CITY') { cityCount++; if (zn.id !== 'city') bad(where + ': the city zone\'s id must be "city"'); return; }
        if (!isNum(zn.minutes) || zn.minutes <= 0) bad(where + ' (' + zn.id + '): minutes is required');
        else if (zn.kind === 'FEEDER' && zn.minutes > CITY.FEEDER.maxMinutes) warn(where + ' (' + zn.id + '): a feeder farther than ' + CITY.FEEDER.maxMinutes + ' minutes is a peer or is left out');
        else if (zn.kind === 'PEER' && (zn.minutes < CITY.PEER_MINUTES[0] || zn.minutes > CITY.PEER_MINUTES[1])) warn(where + ' (' + zn.id + '): a peer is ' + CITY.PEER_MINUTES[0] + ' to ' + CITY.PEER_MINUTES[1] + ' minutes away');
        if (zn.kind === 'FEEDER') feederCount++;
        if (zn.bearing !== undefined && (!isNum(zn.bearing) || zn.bearing < 0 || zn.bearing >= 360)) bad(where + ': bearing must be 0 to 359');
        if (zn.lean !== undefined && (!isArr(zn.lean) || zn.lean.length > 2 || zn.lean.some(function (x) { return !enumHas(E.GENRE, x); }))) bad(where + ': lean is up to two genres');
        if (zn.gens !== undefined && zn.gens !== null && nums(zn.gens, 3, 0, 1, where + '.gens') && Math.abs(sumOf(zn.gens) - 1) > .02) bad(where + ': gens must sum to 1');
        if (zn.beyond !== undefined && zn.beyond !== null && !chokeIds[zn.beyond]) bad(where + ' (' + zn.id + '): beyond "' + zn.beyond + '" names no chokepoint');
        if (zn.slug !== undefined && zn.slug !== null && haveIndex && !index[zn.slug]) bad(where + ' (' + zn.id + '): slug "' + zn.slug + '" is not in the index');
        if (zn.season !== undefined && zn.season !== null && (!isObj(zn.season) || !isArr(zn.season.months) || !isNum(zn.season.mul))) bad(where + ': season needs months and mul');
        if (zn.kind === 'PEER' && zn.rooms !== undefined) bad(where + ' (' + zn.id + '): a PEER zone has no rooms');
        if (zn.kind === 'FEEDER' && zn.rooms !== undefined && !isArr(zn.rooms)) bad(where + ': rooms must be a list');
      });
      if (cityCount !== 1) bad('zones: exactly one CITY zone is required');
      if (feederCount > 14) bad('zones: at most 14 feeders');
    }
    if (isArr(raw.chokepoints)) {
      raw.chokepoints.forEach(function (c) {
        if (isObj(c) && c.id && !zoneList.some(function (zn) { return isObj(zn) && zn.beyond === c.id; })) bad('chokepoint "' + c.id + '" has no zone beyond it');
      });
    }
    // hoods
    var hoodList = isArr(raw.hoods) ? raw.hoods : null;
    if (!hoodList) bad('hoods: 3 to 10 are required');
    else {
      if (hoodList.length < 3 || hoodList.length > 10) bad('hoods: 3 to 10 are required, found ' + hoodList.length);
      hoodList.forEach(function (h, q) {
        var where = 'hoods[' + q + ']';
        if (!isObj(h) || !isStr(h.id) || !isStr(h.name)) { bad(where + ' needs id and name'); return; }
        unknownKeys(h, ['id', 'name', 'note', 'route'], where);
        if (hoodIds[h.id]) bad(where + ': id "' + h.id + '" is repeated');
        hoodIds[h.id] = h;
      });
    }
    // routes
    var defaultRouteIds = C.CHANNELS.RUN_DEFAULT.map(function (d) { return d.id; }), routeList = isArr(raw.routes) ? raw.routes : null;
    if (raw.routes !== undefined && !routeList) bad('routes must be a list');
    if (routeList) routeList.forEach(function (rt, q) {
      var where = 'routes[' + q + ']';
      if (!isObj(rt) || !isStr(rt.id)) { bad(where + ' needs an id'); return; }
      unknownKeys(rt, ['id', 'name', 'zone', 'ceil', 'hours', 'spots'], where);
      if (routeIds[rt.id]) bad(where + ': id "' + rt.id + '" is repeated');
      routeIds[rt.id] = true;
      if (rt.zone !== undefined && rt.zone !== 'city' && !zoneIds[rt.zone]) bad(where + ': zone "' + rt.zone + '" does not exist');
      if (rt.ceil !== undefined) nums(rt.ceil, 3, 0, 1, where + '.ceil');
      if (rt.hours !== undefined && !isNum(rt.hours)) bad(where + ': hours must be a number');
      if (rt.spots !== undefined) {
        if (!isArr(rt.spots) || rt.spots.length > 4) bad(where + ': spots is a list of at most four');
        else rt.spots.forEach(function (sp, w) { if (!isObj(sp) || !enumHas(E.SPOT, sp.kind) || !isStr(sp.label)) bad(where + '.spots[' + w + '] needs a SPOT kind and a label'); });
      }
    });
    function townRouteOk(id) {
      var m = /^town:(.+)$/.exec(id), zn;
      if (!m) return false;
      zn = zoneIds[m[1]];
      if (!zn || zn.kind === 'CITY') return false;
      return (isNum(zn.scene) ? zn.scene : (zn.kind === 'FEEDER' ? (isNum(zn.pop) ? Math.max(CITY.FEEDER.minScene, zn.pop * CITY.FEEDER.sceneShare) : 40) : 400)) >= 50;
    }
    if (hoodList) hoodList.forEach(function (h) {
      var m;
      if (!isObj(h) || h.route === undefined) return;
      if (routeList ? routeIds[h.route] : defaultRouteIds.indexOf(h.route) >= 0) { /* fine */ }
      else if (townRouteOk(h.route)) { /* fine */ }
      else bad('hood "' + h.id + '": route "' + h.route + '" is not a route of this pack');
      m = /^town:(.+)$/.exec(h.route);
      if (m && zoneIds[m[1]] && zoneIds[m[1]].kind === 'PEER') bad('hood "' + h.id + '": a hood on a PEER zone');
    });
    // rooms
    var startCount = 0;
    function checkRoom(rm, where, zoneId) {
      if (!isObj(rm)) { bad(where + ' is not an object'); return; }
      unknownKeys(rm, ROOM_KEYS, where + (rm.id ? ' (' + rm.id + ')' : ''));
      if (!isStr(rm.id)) { bad(where + ': id is required'); return; }
      if (roomIds[rm.id]) bad(where + ': id "' + rm.id + '" is repeated');
      roomIds[rm.id] = true;
      if (!enumHas(E.ROOM, rm.kind)) bad(where + ' (' + rm.id + '): kind "' + rm.kind + '" is not a ROOM');
      if (!isStr(rm.hood) || !hoodIds[rm.hood]) bad(where + ' (' + rm.id + '): hood "' + rm.hood + '" is not a hood of this pack');
      else if (/^town:(.+)$/.test(hoodIds[rm.hood].route || '') && zoneIds[/^town:(.+)$/.exec(hoodIds[rm.hood].route)[1]] && zoneIds[/^town:(.+)$/.exec(hoodIds[rm.hood].route)[1]].kind === 'PEER') bad(where + ' (' + rm.id + '): a room on a PEER zone');
      if (!isNum(rm.cap) || rm.cap <= 0) bad(where + ' (' + rm.id + '): cap is required');
      if (rm.zone !== undefined && rm.zone !== zoneId) bad(where + ' (' + rm.id + '): zone must be "' + zoneId + '"');
      if (rm.ages !== undefined && (!isArr(rm.ages) || !rm.ages.length || rm.ages.some(function (a) { return !enumHas(E.AGES, a); }))) bad(where + ' (' + rm.id + '): ages must be ALL, A18 or A21');
      if (rm.owner !== undefined && !enumHas(E.OWNER, rm.owner)) bad(where + ' (' + rm.id + '): owner "' + rm.owner + '" is not an OWNER');
      if (rm.needs !== undefined && (!isArr(rm.needs) || rm.needs.some(function (x) { return NEED_KEYS.indexOf(x) < 0; }))) bad(where + ' (' + rm.id + '): needs must be keys of jobs.needs');
      if (rm.standing !== undefined) nums(rm.standing, 3, 0, 100, where + '.standing');
      if (rm.pa !== undefined && rm.pa !== null && (!isNum(rm.pa) || rm.pa < 0 || rm.pa > 1)) bad(where + ' (' + rm.id + '): pa must be 0 to 1');
      if (rm.curfew !== undefined && (!isNum(rm.curfew) || rm.curfew < 0 || rm.curfew > 1800)) bad(where + ' (' + rm.id + '): curfew is minutes after midnight');
      ['sketch', 'pressure'].forEach(function (key) { if (rm[key] !== undefined && (!isNum(rm[key]) || rm[key] < 0 || rm[key] > 100)) bad(where + ' (' + rm.id + '): ' + key + ' must be 0 to 100'); });
      ['security', 'insurance'].forEach(function (key) { if (rm[key] !== undefined && typeof rm[key] !== 'boolean') bad(where + ' (' + rm.id + '): ' + key + ' must be true or false'); });
      if (rm.start) { startCount++; if (zoneId !== 'city') bad(where + ' (' + rm.id + '): the start room is in the city zone'); }
      if (rm.name !== undefined && rm.name !== null) {
        if (!isStr(rm.name)) bad(where + ': name must be a string');
        else if (!SB.text.nameOk(rm.name, localWordsOf(raw))) content(where + ' (' + rm.id + '): room name "' + rm.name + '" fails the name rule');
      }
    }
    if (raw.rooms !== undefined) {
      if (!isArr(raw.rooms)) bad('rooms must be a list');
      else raw.rooms.forEach(function (rm, q) { checkRoom(rm, 'rooms[' + q + ']', 'city'); });
    }
    zoneList.forEach(function (zn) {
      if (isObj(zn) && zn.kind === 'FEEDER' && isArr(zn.rooms)) zn.rooms.forEach(function (rm, q) { checkRoom(rm, 'zones.' + zn.id + '.rooms[' + q + ']', zn.id); });
    });
    if (startCount > 1) bad('rooms: more than one room has start: true');
    // bookers
    if (raw.bookers !== undefined) {
      if (!isArr(raw.bookers)) bad('bookers must be a list');
      else raw.bookers.forEach(function (b, q) {
        var where = 'bookers[' + q + ']';
        if (!isObj(b) || !enumHas(E.BOOKER, b.kind)) { bad(where + ': kind must be a BOOKER'); return; }
        unknownKeys(b, ['kind', 'genres', 'homeRooms', 'name', 'showsPerMonth', 'nights', 'style'], where);
        if (b.genres !== undefined && (!isArr(b.genres) || b.genres.some(function (x) { return !enumHas(E.GENRE, x); }))) bad(where + ': genres must be genres');
        if (b.homeRooms !== undefined && (!isArr(b.homeRooms) || b.homeRooms.some(function (x) { return !roomIds[x]; }))) bad(where + ': homeRooms must be rooms of this pack');
        if (b.nights !== undefined && (!isArr(b.nights) || b.nights.some(function (x) { return !isInt(x) || x < 0 || x > 6; }))) bad(where + ': nights are weekdays 0 to 6');
        if (b.style !== undefined) ['reliable', 'pays', 'promotes'].forEach(function (key) { if (!isNum(b.style[key]) || b.style[key] < 0 || b.style[key] > 1) bad(where + '.style.' + key + ' must be 0 to 1'); });
      });
    }
    if (raw.contacts !== undefined) {
      if (!isArr(raw.contacts)) bad('contacts must be a list');
      else raw.contacts.forEach(function (c, q) {
        if (typeof c === 'string') { if (haveIndex && !index[c]) bad('contacts[' + q + ']: "' + c + '" is not in the index'); }
        else if (!isObj(c) || !isStr(c.name) || !isNum(c.lat) || !isNum(c.lon)) bad('contacts[' + q + '] must be a slug or { name, state, lat, lon }');
      });
    }
    if (raw.cast !== undefined && (!isObj(raw.cast) || (raw.cast.soundRate !== undefined && !isNum(raw.cast.soundRate)) || (raw.cast.securityRate !== undefined && !isNum(raw.cast.securityRate)))) bad('cast needs numeric soundRate and securityRate');
    if (isObj(raw.cast)) Object.keys(raw.cast).forEach(function (k) { if (k !== 'soundRate' && k !== 'securityRate') bad('cast: unknown key "' + k + '" (soundRate, securityRate)'); });
    // weather
    if (raw.weather !== undefined) {
      var wv = raw.weather;
      if (!isObj(wv)) bad('weather must be an object');
      else {
        unknownKeys(wv, ['preset', 'rain', 'heat', 'cold', 'fineMonths', 'coolMonths', 'storm'], 'weather');
        if (wv.preset !== undefined && !enumHas(E.WEATHER_PRESET, wv.preset)) bad('weather.preset "' + wv.preset + '" is not a WEATHER_PRESET');
        ['rain', 'heat', 'cold'].forEach(function (key) { if (wv[key] !== undefined) nums(wv[key], 12, 0, 1, 'weather.' + key); });
        ['fineMonths', 'coolMonths'].forEach(function (key) { if (wv[key] !== undefined && (!isArr(wv[key]) || wv[key].some(function (x) { return !isInt(x) || x < 1 || x > 12; }))) bad('weather.' + key + ' are months 1 to 12'); });
        if (wv.storm !== undefined && wv.storm !== null) {
          if (!isObj(wv.storm) || !isArr(wv.storm.months) || !isArr(wv.storm.peak) || !isNum(wv.storm.perWeek) || !isNum(wv.storm.perWeekPeak)) bad('weather.storm needs months, peak, perWeek, perWeekPeak');
        }
      }
    }
    // calendar
    if (raw.calendar !== undefined) {
      if (!isArr(raw.calendar)) bad('calendar must be a list');
      else {
        var calIds = {};
        raw.calendar.forEach(function (c, q) {
          var where = 'calendar[' + q + ']';
          if (!isObj(c) || !isStr(c.id)) { bad(where + ' needs an id'); return; }
          unknownKeys(c, ['id', 'label', 'tag', 'month', 'week', 'weeks', 'dows', 'can', 'hoods', 'elsewhere'], where + ' (' + c.id + ')');
          if (calIds[c.id]) bad(where + ': id "' + c.id + '" is repeated');
          calIds[c.id] = true;
          if (!isStr(c.label) || !isStr(c.tag) || c.tag !== c.tag.toLowerCase()) bad(where + ' (' + c.id + '): label and a lower-case tag are required');
          if (!isInt(c.month) || c.month < 1 || c.month > 12) bad(where + ' (' + c.id + '): month must be 1 to 12');
          if (c.week !== undefined && (!isInt(c.week) || c.week < 1 || c.week > 5)) bad(where + ' (' + c.id + '): week must be 1 to 5');
          // SPEC? `weeks: [a, b]` is read as an inclusive range (the Pensacola football entries use [1, 5] for every week)
          if (c.weeks !== undefined && (!isArr(c.weeks) || c.weeks.length !== 2 || c.weeks[0] < 1 || c.weeks[1] > 5 || c.weeks[0] > c.weeks[1])) bad(where + ' (' + c.id + '): weeks is [first, last] from 1 to 5');
          if (c.week !== undefined && c.weeks !== undefined) bad(where + ' (' + c.id + '): week or weeks, not both');
          if (c.dows !== undefined && (!isArr(c.dows) || c.dows.some(function (x) { return !isInt(x) || x < 0 || x > 6; }))) bad(where + ' (' + c.id + '): dows are 0 to 6');
          nums(c.can, 3, 0, 1.5, where + '.can');
          if (c.elsewhere !== undefined) nums(c.elsewhere, 3, 0, 1.5, where + '.elsewhere');
          if (c.hoods !== undefined && (!isArr(c.hoods) || c.hoods.some(function (x) { return !hoodIds[x]; }))) bad(where + ' (' + c.id + '): hoods must be hoods of this pack');
        });
      }
    }
    if (raw.rules !== undefined) {
      if (!isObj(raw.rules)) bad('rules must be an object');
      else {
        unknownKeys(raw.rules, ['curfewMinors', 'quiet'], 'rules');
        if (raw.rules.quiet !== undefined && !isNum(raw.rules.quiet)) bad('rules.quiet must be minutes after midnight');
        var cm = raw.rules.curfewMinors;
        if (cm !== undefined && cm !== null && (!isObj(cm) || !isNum(cm.weeknight) || !isNum(cm.weekend) || typeof cm.inForce !== 'boolean')) bad('rules.curfewMinors needs weeknight, weekend, inForce');
      }
    }
    if (raw.points !== undefined) {
      if (!isArr(raw.points)) bad('points must be a list');
      else raw.points.forEach(function (p, q) { if (!isObj(p) || !isStr(p.name) || !isNum(p.lat) || !isNum(p.lon)) bad('points[' + q + '] needs name, state, lat, lon, pop'); });
    }
    if (raw.roads !== undefined && (!isArr(raw.roads) || raw.roads.length > 6 || raw.roads.some(function (x) { return !isStr(x); }))) bad('roads is up to six labels');
    // style
    if (raw.style !== undefined) {
      var sy = raw.style;
      if (!isObj(sy)) bad('style must be an object');
      else {
        unknownKeys(sy, STYLE_KEYS, 'style');
        [['inks', 'INK'], ['cityInks', 'INK'], ['papers', 'PAPER'], ['motifs', 'MOTIF'], ['avoid', 'MOTIF'], ['pictures', 'PICTURE']].forEach(function (pr) {
          if (sy[pr[0]] !== undefined && (!isArr(sy[pr[0]]) || sy[pr[0]].some(function (x) { return !enumHas(E[pr[1]], x); }))) bad('style.' + pr[0] + ' must be ' + pr[1] + ' ids');
        });
        if (sy.cityPaper !== undefined && !enumHas(E.PAPER, sy.cityPaper)) bad('style.cityPaper must be a PAPER id');
        if (sy.dateStyle !== undefined && !enumHas(E.DATE_STYLE, sy.dateStyle)) bad('style.dateStyle must be a DATE_STYLE id');
        if (sy.seasonal !== undefined) {
          if (!isArr(sy.seasonal)) bad('style.seasonal must be a list');
          else sy.seasonal.forEach(function (s, q) {
            if (!isObj(s) || !isArr(s.months) || !isNum(s.x)) { bad('style.seasonal[' + q + '] needs months, motifs, pictures, x'); return; }
            if ((s.motifs || []).some(function (x) { return !enumHas(E.MOTIF, x); })) bad('style.seasonal[' + q + '].motifs must be MOTIF ids');
            if ((s.pictures || []).some(function (x) { return !enumHas(E.PICTURE, x); })) bad('style.seasonal[' + q + '].pictures must be PICTURE ids');
          });
        }
      }
    }
    // words and names
    var lw = localWordsOf(raw);
    if (raw.words !== undefined) {
      var wd = raw.words;
      if (!isObj(wd)) bad('words must be an object');
      else {
        unknownKeys(wd, WORD_KEYS, 'words');
        WORD_KEYS.forEach(function (key) {
          if (key !== 'bands' && wd[key] !== undefined && (!isArr(wd[key]) || wd[key].some(function (x) { return !isStr(x); }))) bad('words.' + key + ' must be a list of strings');
        });
        if (wd.bands !== undefined) {
          if (!isObj(wd.bands)) bad('words.bands must be an object');
          else Object.keys(wd.bands).forEach(function (key) {
            if (!enumHas(E.GENRE, key) && !enumHas(E.STYLE, key) && ['KIDS', 'MIDDLE', 'OLD'].indexOf(key) < 0) bad('words.bands.' + key + ': not a genre, a style or a generation key');
            if (!isArr(wd.bands[key])) { bad('words.bands.' + key + ' must be a list'); return; }
            wd.bands[key].forEach(function (nm) { if (!isStr(nm) || !SB.text.nameOk(nm, lw, 'band')) content('words.bands.' + key + ': "' + nm + '" fails the name rule'); });
          });
        }
      }
    }
    // events
    if (raw.events !== undefined) {
      if (!isArr(raw.events) || raw.events.length > 20) bad('events is a list of at most twenty');
      else validateEvents(raw, bad, warn, content);
    }
    // banned terms
    var banned = (isArr(raw.banned) ? raw.banned : []).concat(isArr(extraBanned) ? extraBanned : (isArr(Cities.generalBanned) ? Cities.generalBanned : []));
    if (banned.length) {
      var res = banned.filter(isStr).map(function (b) { return { term: b, re: bannedRegex(b) }; }), texts = textsOf(raw, ['banned', 'blocklist'], [], ''), found = {};
      texts.forEach(function (tx) {
        var low = normText(tx.text);
        res.forEach(function (b) { if (b.re.test(low) && !found[tx.path + b.term]) { found[tx.path + b.term] = true; content(tx.path + ': contains the banned term "' + b.term + '"'); } });
      });
    }
    return P;
  }

  function localWordsOf(raw) {
    var w = (raw && raw.words) || {}, out = [], seen = {};
    function add(x) { if (isStr(x) && !seen[x]) { seen[x] = true; out.push(x); } }
    (w.street || []).forEach(add); (w.water || []).forEach(add);
    if (isArr(w.hood) && w.hood.length) w.hood.forEach(add);
    else ((raw && raw.hoods) || []).forEach(function (h) { if (h && h.name && normText(h.name) !== 'downtown') add(h.name); });
    return out;
  }

  function validateEvents(raw, bad, warn, content) {
    var prefix = String(raw.slug || '').toUpperCase().replace(/-/g, '_') + '_', ids = {};
    var HARM = /\b(hurt|fight|assault|injur|attack|threat|slur|bleed|harass|grope|beat up|punch)/i;
    function lintText(s, where) {
      var m;
      if (s === undefined || s === null) return;
      if (typeof s !== 'string') { bad(where + ' must be text'); return; }
      m = SB.text.lint(s);
      if (m) content(where + ': template error: ' + m);
    }
    function checkCond(c, where, bindsShow) {
      if (!isObj(c)) { bad(where + ' must be an object'); return; }
      Object.keys(c).forEach(function (key) { if (!enumHas(E.COND, key)) bad(where + ': unknown condition "' + key + '"'); });
    }
    function checkEffects(list, where, optHarm) {
      if (!isArr(list)) { bad(where + ' must be a list'); return; }
      list.forEach(function (ef, q) {
        var w = where + '[' + q + ']';
        if (!isObj(ef) || !enumHas(E.EFFECT, ef.op)) { bad(w + ': op "' + (ef && ef.op) + '" is not an EFFECT'); return; }
        if (ef.op === 'SHOW_MOD' && !enumHas(E.MOD, ef.key)) bad(w + ': SHOW_MOD key "' + ef.key + '" is not a MOD');
        if (ef.op === 'INCIDENT' && isNum(ef.q) && ef.q > 0 && optHarm) warn(w + ': an INCIDENT with a positive q on an option that describes harm');
        if (ef.op === 'CHANCE') { checkEffects(ef.then || [], w + '.then', optHarm); checkEffects(ef.else || [], w + '.else', optHarm); lintText(ef.thenText, w + '.thenText'); lintText(ef.elseText, w + '.elseText'); }
        if (ef.op === 'NOTE') lintText(ef.text, w + '.text');
        if (ef.op === 'MESSAGE') lintText(ef.text, w + '.text');
      });
    }
    raw.events.forEach(function (ev, q) {
      var where = 'events[' + q + ']';
      if (!isObj(ev) || !isStr(ev.id)) { bad(where + ' needs an id'); return; }
      where += ' (' + ev.id + ')';
      if (ev.id.indexOf(prefix) !== 0 || ev.id !== ev.id.toUpperCase()) bad(where + ': id must be upper case and start with ' + prefix);
      if (ids[ev.id]) bad(where + ': id is repeated');
      ids[ev.id] = true;
      if (!enumHas(E.EVENT_WHEN, ev.when)) bad(where + ': when must be WEEK, NIGHT or EITHER');
      if (!enumHas(E.TIER, ev.tier)) bad(where + ': tier must be GENTLE, REAL or HARD');
      if (!isNum(ev.weight)) bad(where + ': weight is required');
      if (ev.bind !== undefined && (!isArr(ev.bind) || ev.bind.some(function (x) { return !enumHas(E.REF, x); }))) bad(where + ': bind must be REF keys');
      if (ev.at !== undefined && !enumHas(E.EVENT_AT, ev.at)) bad(where + ': at "' + ev.at + '" is not an EVENT_AT');
      if (ev.if !== undefined) checkCond(ev.if, where + '.if');
      lintText(ev.telegraph, where + '.telegraph'); lintText(ev.title, where + '.title'); lintText(ev.body, where + '.body');
      if (!isArr(ev.options) || ev.options.length < 2 || ev.options.length > 4) { bad(where + ': 2 to 4 options are required'); return; }
      var oids = {};
      ev.options.forEach(function (op, w) {
        var ow = where + '.options[' + w + ']', harm;
        if (!isObj(op) || !isStr(op.id)) { bad(ow + ' needs an id'); return; }
        if (oids[op.id]) bad(ow + ': id is repeated');
        oids[op.id] = true;
        if (op.needs !== undefined) checkCond(op.needs, ow + '.needs');
        lintText(op.label, ow + '.label'); lintText(op.likely, ow + '.likely'); lintText(op.result, ow + '.result');
        harm = HARM.test((op.label || '') + ' ' + (op.result || ''));
        checkEffects(op.effects || [], ow + '.effects', harm);
      });
    });
  }

  var Cities = {
    register: register, load: load, isLoaded: isLoaded, get: get, pack: pack, entry: entry, near: near,
    normalize: normalize, validate: validate, questions: questions,
    presetFor: presetFor, hasBasements: hasBasements, stateName: stateName, generalBanned: null,
    TABLES: { WEATHER: WEATHER, STYLE: STYLE }
  };
  return Cities;
});
