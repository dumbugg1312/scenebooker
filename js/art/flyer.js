/* Scene Booker: art/flyer.js (ART-A)
 * SB.Flyer: the flyer generator of art.md 4 through the interface of 05-interface 6. Ten templates, drawn on a
 * 2D canvas at logical 850 x 1100. Every random choice comes from SB.rng.make(spec.seed + ':' + aspect + ':' +
 * recipe.roll[aspect]), so a recipe and its spec always draw the same flyer.
 *
 * The pipeline is split in two: plan() turns (recipe, spec) into a display list (every position, size, ink and
 * random detail decided), and paint() draws that list. check() reads the same plan, so what the legibility check
 * judges is exactly what gets drawn. SB.Draw (ART-B) is called only inside functions and every call has a plain
 * fallback, so a missing Draw function never breaks a flyer.
 *
 * Registers the part "flyerThumb" (05-interface 1.1) at load, which SB.UI (core) allows.
 */
SB.module('Flyer', function (SB) {
  'use strict';

  var W = 850, H = 1100, RENDERER = 'flyer-1';
  var INK = { toner: '#1A1A1A', copyGray: '#7D7D78', fireRed: '#E03A2F', ballpointBlue: '#2F4FB5', bayouTeal: '#0F7C82',
              oliveDrab: '#6B6B2E', fluorPink: '#FF48B0', fluorOrange: '#FF6C2F', fluorYellow: '#FFE800', mint: '#5FD4A8',
              lavender: '#A58CE0', brick: '#9C3B27' };
  var PAPER = { copyWhite: '#F7F6F1', newsprint: '#E6E1D3', goldenrod: '#F2C14E', pastelPink: '#F6C9D4', pastelBlue: '#C9DDF0',
                pastelGreen: '#D3EBC5', kraft: '#C8A77A', cardboard: '#B8916A', blackStock: '#1C1B1A' };
  var FAMS = ['FAST', 'MELODIC', 'CRUST', 'GARAGE', 'EMO', 'METAL', 'ART', 'PARTY'];
  var AFF = { T1: [3, 2, 3, 3, 2, 1, 3, 2], T2: [5, 2, 3, 2, 1, 3, 1, 1], T3: [2, 4, 2, 2, 4, 1, 2, 5], T4: [3, 2, 2, 5, 3, 3, 3, 2],
              T5: [2, 1, 3, 1, 4, 1, 4, 3], T6: [1, 4, 1, 4, 3, 2, 3, 4], T7: [2, 1, 5, 1, 1, 3, 1, 2], T8: [1, 1, 1, 1, 3, 1, 5, 1],
              T11: [3, 4, 2, 4, 4, 2, 3, 4], T12: [5, 3, 3, 4, 3, 4, 3, 4], T13: [3, 3, 4, 4, 3, 2, 5, 4], T14: [3, 1, 4, 3, 1, 5, 2, 2] };
  var VARIANTS = { T1: 3, T2: 4, T3: 3, T4: 3, T5: 3, T6: 3, T7: 3, T8: 3, T9: 1, T10: 1, T11: 3, T12: 2, T13: 1, T14: 1 };
  var SMALLW = /^(the|a|an|of|and|&|el|la|los|le|de|da|der|die|das|des|du|to|in|on|at|no|my)$/i;
  var PIC_LED = { T11: 2.2, T12: 2.2, T13: 1.6, T14: 1.3, T4: 1.3 };
  var ASPECTS = ['layout', 'type', 'ink', 'paper', 'picture', 'grit', 'extras'];
  var TREAT = { T1: ['ransom', 'tape', 'headline'], T2: ['stretchBlock', 'block', 'spike', 'stencil', 'nib'],
                T3: ['bubble', 'block', 'marker', 'tape', 'drip'], T4: ['stretchBlock', 'headline', 'block'], T5: ['typewriter'],
                T6: ['block', 'bubble', 'stretchBlock', 'nib', 'spike'], T7: ['stencil', 'drip'], T8: ['stretchBlock', 'typewriter'],
                T9: ['stretchBlock'], T10: ['nib', 'spike', 'block', 'bubble', 'stretchBlock'],
                T11: ['stretchBlock', 'block', 'headline', 'marker', 'bubble'], T12: ['stretchBlock', 'block', 'marker', 'headline', 'nib'],
                T13: ['ransom', 'headline', 'stretchBlock', 'marker'], T14: ['nib', 'spike', 'stretchBlock', 'drip', 'stencil'] };
  var SKEL = { marker: 1, block: 1, bubble: 1, stencil: 1, nib: 1, spike: 1, drip: 1, tape: 1 };
  var FAM_TREAT = { FAST: ['stretchBlock', 'block'], MELODIC: ['bubble', 'marker'], CRUST: ['stencil', 'drip'], GARAGE: ['headline', 'ransom'],
                    EMO: ['marker', 'typewriter'], METAL: ['nib', 'spike'], ART: ['stretchBlock', 'typewriter'], PARTY: ['marker', 'tape'] };
  var FAM_INK = { FAST: ['toner', 'fluorPink', 'fluorOrange', 'fluorYellow'], MELODIC: ['fluorPink', 'mint', 'lavender', 'ballpointBlue'],
                  CRUST: ['copyGray', 'oliveDrab', 'toner'], GARAGE: ['fireRed', 'toner'], EMO: ['lavender', 'mint', 'ballpointBlue'],
                  METAL: ['toner', 'copyGray', 'brick'], ART: ['fireRed', 'ballpointBlue'], PARTY: ['fluorOrange', 'mint', 'fluorYellow', 'bayouTeal'] };
  var FAM_PAPER = { FAST: ['goldenrod', 'copyWhite'], MELODIC: ['pastelPink', 'pastelBlue', 'pastelGreen'], CRUST: ['kraft', 'cardboard', 'newsprint'],
                    GARAGE: ['copyWhite', 'goldenrod'], EMO: ['pastelBlue', 'pastelPink', 'pastelGreen'], METAL: ['blackStock', 'copyWhite'],
                    ART: ['copyWhite', 'pastelBlue'], PARTY: ['goldenrod', 'pastelGreen', 'pastelPink'] };
  var FAM_MOTIF = { FAST: ['x', 'fist', 'bridgeTruss'], MELODIC: ['cat', 'checker', 'starburst', 'heart'], CRUST: ['skull', 'crow', 'barbedWire', 'hurricane'],
                    GARAGE: ['flame', 'star', 'bolt'], EMO: ['flower', 'cassette', 'heart'], METAL: ['skull', 'flame', 'crow', 'horns'],
                    ART: ['eye', 'arrow', 'gear'], PARTY: ['mullet', 'palm', 'sun', 'starburst'] };
  var FAM_PIC = { FAST: ['crowd', 'skateRamp'], MELODIC: ['crowd', 'carport', 'skateRamp'], CRUST: ['storm', 'basement'], GARAGE: ['guitarist', 'van'],
                  EMO: ['carport', 'pines', 'rowhouses'], METAL: ['storm', 'guitarist'], ART: ['rowhouses', 'grainElevator', 'bridgeSpan'],
                  PARTY: ['palmSky', 'crowd', 'van'] };
  /* Cut-out photos from the booker's collage kits (SB.Cutouts), by the family the bill leans to. A flyer's picture is
   * a real pasted photo, photocopied, the way the references do it; the drawn pictures are only the fallback. */
  var FAM_CUT = { FAST: ['singer', 'diver', 'crowd', 'singguitar'], MELODIC: ['band', 'singguitar', 'kids', 'sitting'],
                  CRUST: ['crowd', 'back', 'singer', 'asleep'], GARAGE: ['guitar', 'singguitar', 'van', 'bass'],
                  EMO: ['sitting', 'band', 'singguitar', 'kids'], METAL: ['guitar', 'singer', 'bass', 'drums'],
                  ART: ['odd', 'older', 'adult', 'storefront'], PARTY: ['crowd', 'diver', 'kids', 'van'] };
  var CUT_PEOPLE = ['singer', 'guitar', 'bass', 'drums', 'singguitar', 'band', 'crowd', 'diver', 'kids', 'standing', 'sitting', 'back', 'odd', 'older', 'adult'];
  var CUT_GROUND = ['crowd', 'room', 'back', 'band', 'road', 'storefront', 'house'];
  var CUT_PROPS = ['cassette', 'van', 'amp', 'speaker', 'cooler', 'handset', 'machine', 'mic', 'car', 'envelope'];
  var PAPERS_T = { T1: ['copyWhite', 'newsprint'], T2: ['copyWhite', 'goldenrod', 'pastelPink', 'pastelBlue', 'pastelGreen'],
                   T3: ['copyWhite', 'pastelPink', 'pastelBlue', 'pastelGreen', 'goldenrod'], T4: ['copyWhite'], T5: ['newsprint', 'copyWhite'],
                   T6: ['copyWhite', 'kraft', 'pastelPink', 'pastelBlue', 'pastelGreen', 'goldenrod'], T7: ['cardboard', 'kraft'],
                   T8: ['copyWhite', 'pastelBlue'], T9: ['copyWhite'], T10: ['copyWhite', 'newsprint'],
                   T11: ['copyWhite', 'goldenrod', 'pastelPink', 'pastelBlue', 'pastelGreen', 'kraft'], T12: ['copyWhite', 'goldenrod', 'pastelPink', 'pastelBlue', 'pastelGreen'],
                   T13: ['copyWhite', 'newsprint', 'goldenrod', 'kraft', 'pastelPink'], T14: ['blackStock'] };
  var MAIN_T = { T3: ['toner', 'ballpointBlue', 'fireRed'], T6: ['toner', 'ballpointBlue', 'bayouTeal', 'brick', 'oliveDrab', 'fireRed'] };
  var ACC_T = { T1: ['fluorPink', 'fluorYellow', 'fluorOrange'], T2: ['fluorPink', 'fluorYellow', 'fluorOrange', 'fireRed'],
                T3: ['fluorYellow', 'fluorPink', 'mint', 'fluorOrange'], T4: ['fluorPink', 'bayouTeal', 'fireRed', 'fluorOrange'],
                T5: ['copyGray'], T6: ['fluorPink', 'fluorOrange', 'fluorYellow', 'mint', 'lavender', 'bayouTeal'],
                T7: ['fireRed'], T8: ['fireRed', 'ballpointBlue', 'fluorOrange', 'bayouTeal', 'fluorPink'], T9: ['copyGray'],
                T10: ['fluorPink', 'fireRed', 'bayouTeal', 'fluorOrange', 'mint'],
                T11: ['fluorPink', 'fireRed', 'fluorOrange', 'bayouTeal', 'ballpointBlue'], T12: ['fluorPink', 'fluorYellow', 'fluorOrange', 'fireRed', 'mint', 'lavender'],
                T13: ['fluorPink', 'fireRed', 'fluorYellow', 'mint'], T14: ['fireRed', 'fluorPink', 'fluorYellow', 'mint', 'fluorOrange', 'lavender'] };
  var STENCIL_MOTIFS = ['fist', 'crow', 'skull', 'hurricane', 'x', 'star', 'bolt', 'flame', 'anchor', 'palm'];
  var RATIO = [1, 0.5, 0.45, 0.42, 0.4, 0.38, 0.36, 0.34];
  var CAP = { heavy: 0.74, serif: 0.68, type: 0.6, ui: 0.71, num: 0.7 };
  var WEIGHT = { heavy: '900', serif: '700', type: '400', ui: '700', num: '700' };

  /* ------------------------------------------------------------------ */
  /* Small helpers                                                       */
  /* ------------------------------------------------------------------ */

  function copy(o) { return o == null ? o : JSON.parse(JSON.stringify(o)); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function has(list, x) { return !!list && list.indexOf(x) >= 0; }
  function draw(name) { return SB.Draw && typeof SB.Draw[name] === 'function' ? SB.Draw[name] : null; }
  function lab(key, ctx, fb) {
    try { if (SB.text && SB.text.has && SB.text.has('strings.' + key)) return SB.text.label(key, ctx || {}); } catch (e) { /* fall through */ }
    return fb;
  }
  function uiLabel(key, fb) {
    var u = SB.Content && SB.Content.ui && SB.Content.ui.flyerdesk;
    return u && typeof u[key] === 'string' ? u[key] : fb;
  }
  function rgb(hex) {
    var h = String(hex || '#000000').replace('#', '');
    if (h.length === 3) h = h.charAt(0) + h.charAt(0) + h.charAt(1) + h.charAt(1) + h.charAt(2) + h.charAt(2);
    return [parseInt(h.slice(0, 2), 16) || 0, parseInt(h.slice(2, 4), 16) || 0, parseInt(h.slice(4, 6), 16) || 0];
  }
  function lum(hex) {
    var c = rgb(hex).map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  function contrast(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  function mixHex(a, b, t) {
    var x = rgb(a), y = rgb(b), i, o = '#';
    for (i = 0; i < 3; i++) o += ('0' + Math.round(x[i] + (y[i] - x[i]) * t).toString(16)).slice(-2);
    return o;
  }
  function rr(spec, recipe, aspect) {
    var idx = recipe && recipe.roll && recipe.roll[aspect] ? recipe.roll[aspect] : 0;
    return SB.rng.make((spec && spec.seed ? spec.seed : 'flyer') + ':' + aspect + ':' + idx);
  }
  function wpick(rng, list, wf) { var x = rng.weighted(list, wf); return x == null ? list[0] : x; }
  function houseMul(tally, key) {
    if (!tally) return 1;
    var tot = 0, k;
    for (k in tally) if (Object.prototype.hasOwnProperty.call(tally, k)) tot += tally[k] || 0;
    if (!tot || !tally[key]) return 1;
    return 1 + 1.5 * Math.min(1, (tally[key] / tot) * 2);
  }
  function fams(spec) {
    var f = spec && spec.families ? spec.families : null, out = {}, any = false;
    FAMS.forEach(function (k) { out[k] = f && f[k] ? f[k] : 0; if (out[k]) any = true; });
    if (!any) FAMS.forEach(function (k) { out[k] = 1 / FAMS.length; });
    return out;
  }
  function famBias(F, table, id) {
    var s = 0;
    FAMS.forEach(function (k) { if (has(table[k], id)) s += F[k]; });
    return s;
  }
  function dominant(F) { var best = 'FAST'; FAMS.forEach(function (k) { if (F[k] > F[best]) best = k; }); return best; }
  function ordinal(n) {
    var s = ['TH', 'ST', 'ND', 'RD'], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  function monthNum(d) {
    var names = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    var i = names.indexOf(String(d.mon || '').toUpperCase());
    return i >= 0 ? i + 1 : 1;
  }
  function dateText(d, style) {
    if (!d) return '';
    if (style === 'LONG') return (String(d.dowLong || d.dow || '') + ' the ' + ordinal(d.d) + ' of ' + String(d.monthLong || d.mon || '')).toUpperCase();
    if (style === 'friday_11_20') return String(d.dowLong || d.dow || '').toLowerCase() + ' ' + monthNum(d) + '.' + d.d;
    return String(d.dow || '').toUpperCase() + ' ' + String(d.mon || '').toUpperCase() + ' ' + d.d;
  }
  function titleCase(s) { return String(s).replace(/\b([a-z])/g, function (m) { return m.toUpperCase(); }); }

  var FONTS = null;
  function fonts() {
    var d = { heavy: 'sans-serif', serif: 'serif', type: 'monospace', ui: 'sans-serif', num: 'monospace' };
    try {
      if (typeof document !== 'undefined' && typeof getComputedStyle === 'function' && document.documentElement) {
        var cs = getComputedStyle(document.documentElement);
        Object.keys(d).forEach(function (k) { var v = cs.getPropertyValue('--font-' + k); if (v && v.trim()) d[k] = v.trim(); });
      }
    } catch (e) { /* keep the generic stacks */ }
    FONTS = d;
    return d;
  }
  function fontStr(kind, weight, em) { return (weight || WEIGHT[kind] || '700') + ' ' + Math.max(1, Math.round(em * 10) / 10) + 'px ' + (FONTS || fonts())[kind]; }

  var MCTX = null;
  function measurer(ctx) {
    if (!ctx && !MCTX && typeof document !== 'undefined' && document.createElement) {
      try { var c = document.createElement('canvas'); MCTX = c.getContext ? c.getContext('2d') : null; } catch (e) { MCTX = null; }
    }
    var m = ctx || MCTX;
    return function (text, kind, weight, em) {
      if (m && m.measureText) { m.font = fontStr(kind, weight, em); return m.measureText(text).width; }
      return String(text).length * em * (kind === 'type' ? 0.6 : kind === 'heavy' ? 0.52 : 0.56);
    };
  }

  /* ------------------------------------------------------------------ */
  /* Choosing: template, then every aspect (art.md 4.3, 4.8)             */
  /* ------------------------------------------------------------------ */

  function forcedT9(spec) { return !!(spec && (spec.plain || spec.finish === 'ROUGH')); }

  function pickTemplate(spec, idx) {
    var rng = SB.rng.make((spec.seed || 'flyer') + ':layout:' + (idx || 0)), F = fams(spec), list = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T11', 'T12', 'T13', 'T14'],
        taste = spec.maker && spec.maker.taste ? spec.maker.taste : null, hs = spec.houseStyle || {}, t;
    if (forcedT9(spec)) return { template: 'T9', variant: 0 };
    if (spec.route && spec.route.length) list.push('T10');
    t = wpick(rng, list, function (k) {
      var w = 0, i;
      if (k === 'T10') w = 4;
      else for (i = 0; i < FAMS.length; i++) w += F[FAMS[i]] * AFF[k][i];
      if (PIC_LED[k]) w *= PIC_LED[k];   /* the references are picture-led: most flyers are built around a photo */
      if (taste && has(taste.templates, k)) w *= 2.5;
      w *= houseMul(hs.templates, k);
      if (hs.last && hs.last.length >= 2 && hs.last[0] === k && hs.last[1] === k) w *= 0.5;
      return w;
    });
    return { template: t, variant: rng.int(0, VARIANTS[t] - 1) };
  }

  /* Everything a recipe decides, resolved against its spec. */
  function resolve(recipe, spec) {
    var t = recipe.template || 'T9', v = recipe.variant || 0, o = recipe.over || {}, F = fams(spec), st = spec.style || {},
        taste = spec.maker && spec.maker.taste ? spec.maker.taste : null, hs = spec.houseStyle || {}, month = spec.month || 1,
        R = { t: t, v: v % (VARIANTS[t] || 1), F: F, dom: dominant(F), sharp: spec.finish === 'SHARP' }, ri, rp, rt, rpic, rg, mains, accs, paps;

    function inkW(id) {
      var w = 1 + 2 * famBias(F, FAM_INK, id);
      if (has(st.inks, id)) w *= 1.6;
      if (taste && has(taste.inks, id)) w *= 2.5;
      return w * houseMul(hs.inks, id);
    }
    ri = rr(spec, recipe, 'ink');
    mains = MAIN_T[t] || ['toner'];
    accs = ACC_T[t] || ['copyGray'];
    R.main = mains.length > 1 ? wpick(ri, mains, function (id) { return id === 'toner' ? 2 : inkW(id); }) : mains[0];
    R.acc = wpick(ri, accs, inkW);
    R.useAcc = t === 'T12' || t === 'T14' || t === 'T6' || t === 'T3' || t === 'T8' || t === 'T10' || ri.chance(t === 'T1' ? 0.3 : t === 'T7' ? 0.4 : 0.5);
    if (t === 'T10') {
      var tour = touringBand(spec), id = tour ? tour.bandId : null, ids;
      if (id && SB.Identity && typeof SB.Identity.inks === 'function') {
        try { ids = SB.Identity.inks(id); if (ids && INK[ids.aId]) { R.tourA = ids.aId; R.tourB = INK[ids.bId] ? ids.bId : R.acc; } } catch (e) { ids = null; }
      }
      if (!R.tourA) { R.tourA = wpick(ri, ['toner', 'brick', 'ballpointBlue', 'bayouTeal', 'oliveDrab'], inkW); R.tourB = R.acc; }
    }
    if (o.inkPair && INK[o.inkPair[0]]) { R.main = o.inkPair[0]; if (INK[o.inkPair[1]]) { R.acc = o.inkPair[1]; R.useAcc = true; } }

    rp = rr(spec, recipe, 'paper');
    paps = PAPERS_T[t] || ['copyWhite'];
    R.paper = wpick(rp, paps, function (id) {
      var w = 1 + 2 * famBias(F, FAM_PAPER, id);
      if (has(st.papers, id)) w *= 1.6;
      if (st.cityPaper === id) w *= 1.3;
      if (taste && has(taste.papers, id)) w *= 2.5;
      return w * houseMul(hs.papers, id);
    });
    if (t === 'T2' && R.v === 2) R.paper = 'blackStock';
    if (o.paper && PAPER[o.paper]) R.paper = o.paper;
    R.brick = t === 'T7' && R.v === 1;

    rt = rr(spec, recipe, 'type');
    R.treat = wpick(rt, TREAT[t], function (id) { return (1 + 3 * famBias(F, FAM_TREAT, id)) * houseMul(hs.treatments, id); });
    if (o.treatment && has(TREAT[t], o.treatment)) R.treat = o.treatment;
    R.lower = (F.EMO + F.ART) > 0.45 && rt.chance(0.5);
    R.typeSeed = (spec.seed || 'flyer') + ':typeitems:' + ((recipe.roll && recipe.roll.type) || 0);

    rpic = rr(spec, recipe, 'picture');
    var seas = (st.seasonal || []).filter(function (s) { return has(s.months, month); });
    function seasonMul(kind, id) { var m = 1; seas.forEach(function (s) { if (has(s[kind], id)) m *= s.x || 2; }); return m; }
    var pics = Object.keys(SB.Enums.PICTURE);
    R.picture = wpick(rpic, pics, function (id) {
      var w = 0.4 + 3 * famBias(F, FAM_PIC, id);
      if (has(st.pictures, id)) w *= 3;
      return w * seasonMul('pictures', id);
    });
    if (o.picture && SB.Enums.PICTURE[o.picture]) R.picture = o.picture;
    var motifs = Object.keys(SB.Enums.MOTIF);
    function motifW(id) {
      if (has(st.avoid, id)) return 0;
      var w = 0.3 + 3 * famBias(F, FAM_MOTIF, id);
      if (has(st.motifs, id)) w *= 2;
      return w * seasonMul('motifs', id);
    }
    R.motif = wpick(rpic, motifs, motifW);
    R.motif2 = wpick(rpic, motifs, motifW);
    if (o.motif && SB.Enums.MOTIF[o.motif]) R.motif = o.motif;
    R.stencilMotif = has(STENCIL_MOTIFS, R.motif) ? R.motif : wpick(rpic, STENCIL_MOTIFS, function (id) { return 0.2 + motifW(id); });
    R.routeShield = st.routeShields && st.routeShields.length ? rpic.pick(st.routeShields) : null;
    pickCuts(R, F, (spec.seed || 'flyer') + ':cuts:' + ((recipe.roll && recipe.roll.picture) || 0));

    rg = rr(spec, recipe, 'grit');
    R.grit = t === 'T9' ? rg.int(1, 2) : rg.int(1, 3);
    if (o.grit) R.grit = clamp(Math.round(o.grit), 1, 5);
    if (t === 'T8') R.grit = Math.min(R.grit, 2);
    R.skew = rg.range(-1, 1);
    R.gritSeed = (spec.seed || 'flyer') + ':gritpass:' + ((recipe.roll && recipe.roll.grit) || 0) + ':' + R.grit;

    R.layoutSeed = (spec.seed || 'flyer') + ':layoutitems:' + ((recipe.roll && recipe.roll.layout) || 0) + ':' + t + ':' + R.v;
    R.extrasSeed = (spec.seed || 'flyer') + ':extras:' + ((recipe.roll && recipe.roll.extras) || 0);
    R.dateStyle = t === 'T3' ? 'friday_11_20' : (t === 'T5' && R.v !== 0) ? 'LONG' : (st.dateStyle && st.dateStyle !== 'LONG' ? st.dateStyle : 'FRI_NOV_20');
    R.big = !!o.big;
    R.got = { inks: [R.main, R.acc], paper: R.paper, treatment: R.treat, picture: R.picture, motif: R.motif, grit: R.grit, cut: R.cutFig || R.cutPrint || null };
    return R;
  }

  /* The flyer's photos: a figure (a person cut out), a print (a rectangular photo), a ground (a crowd or a room blown up
   * behind everything) and props for the collage. Its own rng, so the drawn picks above never shift. */
  function pickCuts(R, F, seed) {
    var L = (SB.Cutouts || []).filter(function (k) { return k.role !== 'named' && k.role !== 'flyer' && k.role !== 'postcard'; }), r = SB.rng.make(seed), used = {};
    function roleW(role) { var w = 0.15; FAMS.forEach(function (f) { if (has(FAM_CUT[f], role)) w += F[f] * 3; }); return w; }
    function one(ok, wf) {
      var c = L.filter(function (k) { return !used[k.id] && ok(k); }), roles = [], pick, of;
      if (!c.length) return null;
      c.forEach(function (k) { if (roles.indexOf(k.role) < 0) roles.push(k.role); });
      pick = wpick(r, roles, wf || roleW);
      of = c.filter(function (k) { return k.role === pick; });
      pick = r.pick(of.length ? of : c);
      used[pick.id] = true;
      return pick.id;
    }
    R.cutFig = one(function (k) { return has(CUT_PEOPLE, k.role) && k.role !== 'back' && /full|waist|close|kit/.test(k.frame) && k.h >= k.w * 0.9 && k.tone >= 0.25 && k.tone <= 0.8; });
    R.cutPrint = one(function (k) { return has(CUT_PEOPLE, k.role) && (k.frame === 'photo' || k.frame === 'strip') && k.tone >= 0.22 && k.tone <= 0.8; });
    R.cutGround = one(function (k) { return has(CUT_GROUND, k.role) && k.frame === 'photo'; }, function () { return 1; });
    R.cutMore = [one(function (k) { return has(CUT_PEOPLE, k.role) && k.frame !== 'object'; }),
                 one(function (k) { return has(CUT_PROPS, k.role); }, function () { return 1; }),
                 one(function (k) { return has(CUT_PEOPLE, k.role) && /full|waist|close/.test(k.frame); })].filter(Boolean);
    R.look = r.pick(['dots', 'dots', 'thresh', 'line']);
  }
  function cutInfo(id) { var L = SB.Cutouts || [], i; for (i = 0; i < L.length; i++) if (L[i].id === id) return L[i]; return null; }
  function cutImg(id) { return id && SB.Scenes && typeof SB.Scenes.img === 'function' ? SB.Scenes.img(id) : null; }

  function touringBand(spec) {
    var b = spec && spec.billing ? spec.billing : [], i;
    for (i = 0; i < b.length; i++) if (b[i].touring) return b[i];
    return b[0] || null;
  }

  function flags(recipe, t) {
    var s = (recipe.over && recipe.over.show) || {}, timesDefault = t === 'T3' || t === 'T5' || t === 'T8' || t === 'T9';
    return { setTimes: s.setTimes == null ? timesDefault : !!s.setTimes, rules: s.rules !== false, doors: s.doors !== false, tags: s.tags !== false };
  }

  function infoOf(spec, recipe, R) {
    var S = flags(recipe, R.t), I = {};
    I.presenter = lab('flyer.presents', { name: spec.presenter || '' }, (spec.presenter || '') + ' presents');
    I.bands = (spec.billing || []).map(function (b) {
      return { name: String(b.name || '') + (b.unconfirmed ? '?' : ''), home: b.touring && b.home ? '(' + b.home + ')' : '',
               one: b.oneLiner || '', touring: !!b.touring, bandId: b.bandId };
    });
    I.date = dateText(spec.date, R.dateStyle);
    I.dateShort = dateText(spec.date, 'FRI_NOV_20');
    I.doors = spec.doors && S.doors ? lab('flyer.doors', { t: spec.doors }, 'doors ' + spec.doors) : '';
    I.times = S.setTimes && spec.times && spec.times.length ? spec.times.join(' / ') : '';
    I.room = spec.room ? spec.room.name || '' : '';
    I.address = spec.room && spec.room.address ? spec.room.address : '';
    I.price = spec.price ? spec.price.text || '' : '';
    I.noOne = spec.price && spec.price.noOneTurned ? lab('flyer.noOneTurned', {}, 'no one turned away for lack of funds') : '';
    I.ages = spec.agesText || 'ALL AGES';
    I.rules = S.rules && spec.rules ? spec.rules : '';
    I.tags = S.tags ? (spec.tags || []).map(function (t) { return lab('flyer.tag.' + t, {}, String(t).replace(/_/g, ' ')); }) : [];
    I.tba = spec.tba ? lab('flyer.tba', {}, '+ more TBA') : '';
    I.S = S;
    return I;
  }

  /* ------------------------------------------------------------------ */
  /* The plan: a display list in logical units                           */
  /* ------------------------------------------------------------------ */

  function Builder(R, spec, M) {
    var P = { items: [], paper: PAPER[R.paper] || PAPER.copyWhite, ground: null, R: R, misreg: null };
    var lr = SB.rng.make(R.layoutSeed), xr = SB.rng.make(R.extrasSeed), tr = SB.rng.make(R.typeSeed), dark = lum(P.paper) < 0.2;
    var B = { P: P, lr: lr, xr: xr, tr: tr, dark: dark };
    B.ink = dark ? PAPER.copyWhite : INK[R.main] || INK.toner;
    B.acc = INK[R.acc] || INK.copyGray;
    B.toner = dark ? PAPER.copyWhite : INK.toner;

    B.push = function (it) { P.items.push(it); return it; };
    B.rect = function (x, y, w, h, fill, o) { return B.push(Object.assign({ k: 'rect', x: x, y: y, w: w, h: h, fill: fill }, o || {})); };
    B.rule = function (x1, y1, x2, y2, lw, ink) { return B.push({ k: 'rule', x1: x1, y1: y1, x2: x2, y2: y2, lw: lw || 3, ink: ink || B.toner }); };
    B.motif = function (id, x, y, size, o) {
      return B.push(Object.assign({ k: 'motif', id: id, x: x, y: y, size: size, ink: B.toner, rot: 0, seed: R.extrasSeed + ':m' + P.items.length }, o || {}));
    };
    B.pic = function (x, y, w, h, o) {
      return B.push(Object.assign({ k: 'pic', id: R.picture, cut: R.cutPrint || R.cutFig, look: R.look, x: x, y: y, w: w, h: h, shape: 'rect', level: 0.6, cell: 8, alpha: 1,
                                    inks: [INK.toner, R.useAcc ? B.acc : INK.copyGray], seed: R.layoutSeed + ':pic' + P.items.length }, o || {}));
    };
    /* A cut-out photo from the kits, photocopied in one ink. o: fit (contain | cover), ax (0 left .. 1 right), ay (0 top .. 1
     * bottom), look (dots | thresh | line), ink, knock (paper inside the cut, else see-through), border (scissor margin),
     * cell, contrast, bias, alpha, rot, solid (text over it gets a knockout box). Null when the kits are not loaded. */
    B.photo = function (id, x, y, w, h, o) {
      if (!id) return null;
      return B.push(Object.assign({ k: 'photo', id: id, x: x, y: y, w: w, h: h, fit: 'contain', ax: 0.5, ay: 1, look: R.look,
                                    ink: dark ? B.acc : INK.toner, paper: P.paper, knock: true, border: true, cell: 7, contrast: 1.6, bias: 0,
                                    alpha: 1, rot: 0, solid: true, seed: R.layoutSeed + ':ph' + P.items.length }, o || {}));
    };
    B.tape = function (x, y, w, angle) { return B.push({ k: 'tape', x: x, y: y, w: w, angle: angle, seed: R.extrasSeed + ':t' + P.items.length }); };
    B.shape = function (o) { return B.push(Object.assign({ k: 'shape' }, o)); };

    /* Measure one line at cap height `size`. */
    function lineWidth(it, size) {
      var em, i, wsum, L;
      if (SKEL[it.treat]) return SB.Skeleton.measure(it.text, size, it.treat, {});
      if (it.treat === 'ransom') {
        wsum = 0;
        for (i = 0; i < it.letters.length; i++) {
          L = it.letters[i];
          if (L.space) { wsum += size * 0.4 / 0.7; continue; }
          em = size * L.k / CAP[L.font];
          L.w = M(L.ch, L.font, L.weight, em);
          wsum += L.w + 2 * L.pad * size / 100 + 2;
        }
        return wsum;
      }
      em = size / CAP[it.font];
      return M(it.text, it.font, it.weight, em);
    }

    function ransomLetters(text, ground) {
      var kinds = ['serif', 'heavy', 'ui', 'num', 'type'], grounds = [PAPER.copyWhite, PAPER.newsprint, INK.toner, ground, B.acc], prev = null, out = [], i, ch, g;
      for (i = 0; i < text.length; i++) {
        ch = text.charAt(i);
        if (ch === ' ') { out.push({ space: true }); prev = null; continue; }
        g = tr.pick(grounds.filter(function (x) { return x !== prev; }));
        prev = g;
        out.push({ ch: tr.chance(0.7) ? ch.toUpperCase() : ch.toLowerCase(), font: tr.pick(kinds), weight: tr.pick(['400', '700', '900']),
                   k: tr.range(0.85, 1.2), ground: g, ink: contrast(INK.toner, g) >= contrast(PAPER.copyWhite, g) ? INK.toner : PAPER.copyWhite,
                   pad: tr.range(3, 8), rot: tr.range(-7, 7) * Math.PI / 180, shift: tr.range(-0.06, 0.06), cut: [tr.range(-2, 2), tr.range(-2, 2), tr.range(-2, 2), tr.range(-2, 2)] });
      }
      return out;
    }

    /* Fit one text item into a width and push it. o: field, text, x, y (baseline), w, size, min, treat, font, weight,
     * align, stretch, ink, box { fill, pad, cut }, rot, anchor, ground, deco, layer, fields, idx. */
    B.text = function (o) {
      var it = Object.assign({ k: 'text', font: 'heavy', treat: null, align: 'left', ink: B.ink, sx: 1, min: 14, rot: 0 }, o);
      var size = it.size, w0, sx = 1, maxW = it.w || W - 80;
      it.text = String(it.text == null ? '' : it.text);
      if (!it.treat) it.treat = 'font';
      if (it.treat === 'stretchBlock') { it.font = 'heavy'; it.text = it.text.toUpperCase(); }
      if (it.treat === 'headline') it.font = it.font === 'heavy' ? 'heavy' : 'serif';
      if (it.treat === 'typewriter') it.font = 'type';
      if (it.treat === 'ransom') it.letters = ransomLetters(it.text, P.paper);
      it.seed = R.typeSeed + ':' + P.items.length;
      w0 = lineWidth(it, size);
      if (it.stretch) {
        sx = w0 > 0 ? clamp(maxW / w0, 0.55, 1.6) : 1;
        if (w0 * sx > maxW) { size *= maxW / (w0 * sx); }
      } else if (w0 > maxW) {
        sx = Math.max(0.78, maxW / w0);
        if (w0 * sx > maxW) size *= maxW / (w0 * sx);
      }
      if (size < it.min) { size = it.min; w0 = lineWidth(it, size); sx = Math.min(sx, maxW / Math.max(1, w0)); }
      else if (size !== it.size) w0 = lineWidth(it, size);
      it.size = size; it.sx = sx; it.wpx = w0 * sx;
      if (it.align === 'center') it.x = it.x + (maxW - it.wpx) / 2;
      else if (it.align === 'right') it.x = it.x + maxW - it.wpx;
      it.desc = (it.treat === 'font' || it.treat === 'typewriter' || it.treat === 'headline') && /[a-z,()]/.test(it.text) ? size * 0.3 : 0;
      return B.push(it);
    };

    /* Width of a line at a size, before any item exists (for wrapping decisions). */
    B.probe = function (text, size, treat, font, weight) {
      if (SKEL[treat]) return SB.Skeleton.measure(text, size, treat, {});
      if (treat === 'ransom') return M(text, 'serif', '700', size / CAP.serif) * 1.3;
      if (treat === 'stretchBlock') return M(String(text).toUpperCase(), 'heavy', '900', size / CAP.heavy);
      if (treat === 'typewriter') return M(text, 'type', '400', size / CAP.type);
      font = font || 'heavy';
      return M(text, font, weight, size / CAP[font]);
    };
    /* A long band name goes onto two lines rather than shrinking past readability. Returns one or two lines. */
    B.split = function (l, w) {
      var words = String(l.text).split(' '), wd, best = -1, bd = 1e9, i, a, b, c;
      if (words.length < 2 || l.wrap === false) return [l];
      wd = B.probe(l.text, l.size, l.treat, l.font, l.weight);
      if (wd * (l.stretch ? 0.55 : 0.78) <= w * 1.2) return [l];
      for (i = 1; i < words.length; i++) {
        if ((i === 1 && SMALLW.test(words[0])) || (i === words.length - 1 && SMALLW.test(words[i]))) continue;   /* never "THE" or "&" alone on a line */
        a = words.slice(0, i).join(' ').length; b = words.slice(i).join(' ').length;
        if (Math.abs(a - b) < bd) { bd = Math.abs(a - b); best = i; }
      }
      if (best < 0) return [l];
      c = Object.assign({}, l, { text: words.slice(best).join(' '), cont: true });
      return [Object.assign({}, l, { text: words.slice(0, best).join(' '), gap: l.box ? 0.55 : 0.18 }), c];
    };
    /* One text item, wrapped onto two lines when it is long. Returns the items. */
    B.wrapText = function (o) {
      var parts = B.split(o, o.w || W - 80), first = B.text(parts[0]), out = [first];
      if (parts[1]) out.push(B.text(Object.assign(parts[1], { y: first.y + first.size * (o.box ? 1.5 : 1.16), x: o.x, size: first.size })));
      return out;
    };

    /* Insert an item just under another one already in the list. */
    B.under = function (above, it) {
      var i = P.items.indexOf(above);
      if (i < 0) P.items.push(it); else P.items.splice(i, 0, it);
      return it;
    };

    /* Lay lines down a region: sizes shrink together (never below each line's min) to fit between top and bottom. */
    B.stack = function (lines, x, top, bottom, w, so) {
      so = so || {};
      var total = 0, avail = bottom - top, k, extra = 0, y = top, out = [];
      lines = lines.filter(function (l) { return l && l.text; });
      if (so.wrap !== false) lines = [].concat.apply([], lines.map(function (l) { return l.field === 'band' ? B.split(Object.assign({}, so.base || {}, l), l.w || w) : [l]; }));
      /* a line's room: cap + ink past it (hand letters) + descenders + box padding above and below, then its gap */
      function pad(l) { var b = l.box || (so.base && so.base.box); return b ? b.pad || 0 : 0; }
      function upOf(l) { var o = inkOut(l.treat || (so.base && so.base.treat)); return o; }
      function room(l, s, kk) { var o = upOf(l); return s * (1 + o[0] + o[1] + (l.lowerish ? 0.25 : 0)) + 2 * pad(l) + s * (l.gap == null ? 0.42 : l.gap) * kk; }
      function sum(kk) { return lines.reduce(function (a, l) { return a + room(l, Math.max(l.min || 14, l.size * kk), Math.min(1, kk * 1.15)); }, 0); }
      function fitK(av) { var lo = 0.2, hi = 1, j, kk; if (sum(1) <= av) return 1; for (j = 0; j < 14; j++) { kk = (lo + hi) / 2; if (sum(kk) > av) hi = kk; else lo = kk; } return lo; }
      total = sum(1);
      k = fitK(avail);
      if (so.up && sum(k) > avail + 1) {   /* still too tall at the smallest sizes: climb (over a picture) rather than run into the next block */
        var climb = Math.min(so.up, sum(k) - avail);
        top -= climb; y -= climb; avail += climb; k = fitK(avail);
      }
      if (k === 1 && so.spread && lines.length > 1) extra = (avail - total) / lines.length;
      if (k === 1 && so.center) y += (avail - total) / 2;
      lines.forEach(function (l, i) {
        var s = Math.max(l.min || 14, l.size * k), it, o = upOf(l);
        y += s * (1 + o[0]) + pad(l);
        it = B.text(Object.assign({}, so.base || {}, l, { x: x + (l.dx || 0), y: y, w: (l.w || w), size: s }));
        if (so.rules && i < lines.length - 1 && !lines[i + 1].cont) B.rule(x, y + s * 0.22 + 3, x + w, y + s * 0.22 + 3, so.rules, B.toner);
        y += s * (o[1] + (l.lowerish ? 0.25 : 0)) + pad(l) + s * (l.gap == null ? 0.42 : l.gap) * Math.min(1, k * 1.15) + extra;
        out.push(it);
      });
      return out;
    };

    /* Band lines in billing order, line 1 largest. */
    B.bandLines = function (I, s1, o) {
      o = o || {};
      var out = [];
      I.bands.forEach(function (b, i) {
        var size = s1 * (o.ratio ? o.ratio[Math.min(i, o.ratio.length - 1)] : RATIO[Math.min(i, RATIO.length - 1)]), txt = b.name;
        if (o.upper !== false) txt = txt.toUpperCase();
        if (o.lower) txt = txt.toLowerCase();
        if (o.title && i > 0) txt = titleCase(b.name.toLowerCase());
        if (o.numbered) txt = (i + 1) + ' ' + txt;
        out.push(Object.assign({ field: 'band', idx: i, text: txt, size: size, min: i === 0 ? (o.min1 || 34) : (o.min || 20),
                                 treat: i === 0 ? (o.treat1 || o.treat) : o.treat, gap: o.gap }, i === 0 ? (o.first || {}) : (o.rest || {})));
        if (b.home && o.homes !== false) out.push(Object.assign({ field: 'home', idx: i, text: o.upper === false ? b.home : b.home.toUpperCase(), size: Math.max(20, size * 0.36), min: 16,
                                                                treat: o.homeTreat || 'font', font: o.homeFont || 'ui', weight: '700', gap: 0.5 }, o.homeStyle || {}));
        if (o.oneLiners && b.one) out.push({ field: 'oneLiner', idx: i, text: b.one, size: o.oneSize || 20, min: 14, treat: 'typewriter', gap: 0.7, lowerish: true });
      });
      if (I.tba && o.tba !== false) out.push(Object.assign({ field: 'tba', text: o.upper === false ? I.tba : I.tba.toUpperCase(), size: Math.max(22, s1 * 0.28), min: 18, treat: o.treat === 'ransom' ? 'headline' : o.treat }, o.rest || {}));
      return out;
    };

    /* The info lines. o: merge (price and ages on one line), upper, k (size factor), treat, font. */
    B.infoLines = function (I, o) {
      o = o || {};
      var U = function (s) { return o.upper === false ? s : String(s).toUpperCase(); }, kk = o.k || 1, big = R.big ? 1.25 : 1, L = [], dt;
      L.push({ field: 'date', text: U(o.dateText || I.date), size: 52 * kk * big, min: 30 });
      dt = [I.doors, I.times].filter(Boolean).join(' · ');
      if (dt) L.push({ field: 'doors', text: U(dt), size: 28 * kk, min: 18 });
      L.push({ field: 'room', text: U(I.room), size: 40 * kk, min: 22 });
      if (I.address) L.push({ field: 'address', text: U(I.address), size: 26 * kk, min: 18 });
      if (o.merge) L.push({ field: 'price', fields: ['price', 'ages'], text: U(I.price + ' · ' + I.ages), size: 50 * kk * big, min: 30 });
      else {
        L.push({ field: 'price', text: U(I.price), size: 50 * kk * big, min: 30 });
        L.push({ field: 'ages', text: U(I.ages), size: 50 * kk * big, min: 30 });
      }
      if (I.noOne) L.push({ field: 'noOne', text: U(I.noOne), size: 22 * kk, min: 16 });
      I.tags.forEach(function (t) { L.push({ field: 'tags', text: U(t), size: 30 * kk, min: 20, box: { fill: B.toner, pad: 6 }, ink: P.paper }); });
      if (I.rules) L.push({ field: 'rules', text: U(I.rules), size: 24 * kk, min: 16 });
      if (o.tba && I.tba) L.push({ field: 'tba', text: U(I.tba), size: 26 * kk, min: 18 });
      L.forEach(function (l) { if (o.treat && !l.treat) l.treat = o.treat; if (o.font && !l.font) l.font = o.font; if (o.upper === false) l.lowerish = true; });
      return L;
    };

    B.presenter = function (I, o) {
      return B.text(Object.assign({ field: 'presenter', text: I.presenter, size: 30, min: 20, font: 'ui', weight: '700' }, o || {}));
    };

    /* Doodles for hand details (SHARP) and the happy accident. */
    B.handDetails = function () {
      if (!R.sharp) return;
      var spots = [[60, 60], [790, 60], [60, 1040], [790, 1040]], i, s;
      for (i = 0; i < 2; i++) {
        s = spots[xr.int(0, 3)];
        B.under(P.items[0] || null, { k: 'motif', id: xr.pick(['star', 'arrow', 'heart', 'bolt', 'sun', 'flower']), x: s[0], y: s[1], size: 54, ink: B.ink, rot: xr.range(-0.4, 0.4), rough: true, seed: R.extrasSeed + ':hd' + i });
      }
      if (xr.chance(0.25)) B.under(P.items[0] || null, { k: 'splash', x: xr.range(120, 730), y: xr.range(120, 980), r: xr.range(30, 70), ink: B.acc, seed: R.extrasSeed + ':splash' });
    };
    return B;
  }

  /* ---------------- the ten templates (art.md 4.4) ---------------- */

  var BUILD = {};

  BUILD.T1 = function (B, I, R) {
    var lr = B.lr, xr = B.xr, v = R.v, picBox, line1, rest, strips, info, k;
    if (xr.chance(0.8)) B.push({ k: 'greek', x: xr.range(40, 520), y: xr.range(780, 980), w: 260, h: 110, rot: xr.range(-0.06, 0.06) });
    if (xr.chance(0.5)) B.push({ k: 'checker', x: xr.range(20, 500), y: xr.range(110, 130), w: 300, h: 22, rot: xr.range(-0.05, 0.05) });
    picBox = v === 0 ? [480, 120, 330, 330] : v === 1 ? [255, 330, 340, 280] : [40, 120, 770, 620];
    B.pic(picBox[0], picBox[1], picBox[2], picBox[3], { alpha: v === 2 ? 0.4 : 1, torn: true, level: 0.65 });
    if (xr.chance(0.6)) B.motif('arrow', v === 0 ? 420 : 160, v === 0 ? 480 : 700, 70, { rot: xr.range(-1, 1) });
    B.presenter(I, { x: 50, y: 92, w: 600, size: 32, treat: 'headline', font: 'heavy', box: { fill: INK.toner, pad: 8, cut: true }, ink: PAPER.copyWhite, rot: lr.range(-0.035, 0.035) });
    rest = B.bandLines(I, 100, { treat1: R.treat, treat: 'headline', ratio: [1, 0.52, 0.47, 0.44, 0.42], min1: 46, min: 26 });
    line1 = rest.shift();
    while (rest.length && rest[0].field === 'home' && rest[0].idx === 0) rest.shift() && null;
    var home0 = I.bands[0] && I.bands[0].home ? I.bands[0].home.toUpperCase() : '';
    if (line1.treat === 'headline') { line1.box = { fill: INK.toner, pad: 10, cut: true }; line1.ink = PAPER.copyWhite; }
    var h1 = v === 0 ? B.wrapText(Object.assign(line1, { x: 50, y: 230, w: 410, size: 92 })) : v === 1 ? B.wrapText(Object.assign(line1, { x: 50, y: 200, w: 750, size: 96 }))
                      : B.wrapText(Object.assign(line1, { x: 60, y: 280, w: 730, size: 110 }));
    var hl = h1[h1.length - 1];
    var hb = hl.y + inkOut(hl.treat)[1] * hl.size + (hl.box ? hl.box.pad : 0) + (hl.desc || 0), hm = null;
    if (home0) hm = B.text({ field: 'home', idx: 0, text: home0, x: 50, y: hb + 40, w: v === 0 ? 410 : 700, size: 30, min: 18, font: 'type', box: { fill: PAPER.copyWhite, pad: 5 } });
    hb = hm ? hm.y + 14 : hb + 10;
    strips = rest.map(function (l) {
      var bg = lr.chance(0.5) ? INK.toner : PAPER.copyWhite;
      return Object.assign(l, { font: lr.chance(0.5) ? 'serif' : 'heavy', box: { fill: bg, pad: 8, cut: true }, ink: bg === INK.toner ? PAPER.copyWhite : INK.toner, rot: lr.range(-0.04, 0.04), dx: lr.range(0, 60) });
    });
    k = v === 1 ? [630, 770] : v === 2 ? [430, 770] : [480, 770];
    k[0] = Math.max(k[0], hb + 10);
    B.stack(strips, 50, k[0], k[1], 680, { up: Math.max(0, k[0] - hb - 10) });
    info = B.infoLines(I, { merge: true, font: 'heavy', k: 0.9 }).map(function (l) {
      var bg = lr.chance(0.6) ? PAPER.copyWhite : INK.toner;
      return Object.assign(l, { font: l.field === 'doors' || l.field === 'address' ? 'type' : lr.chance(0.5) ? 'heavy' : 'type', box: l.box || { fill: bg, pad: 7, cut: true },
                                ink: l.ink || (bg === INK.toner ? PAPER.copyWhite : INK.toner), rot: lr.range(-0.05, 0.05), dx: lr.range(0, 80) });
    });
    B.stack(info, 50, 800, 1065, 660, {});
    var n = xr.int(2, 4), i;
    for (i = 0; i < n; i++) B.tape(xr.pick([70, 300, 560, 760]), xr.pick([120, 470, 800, 1000]), 70, xr.range(-0.6, 0.6));
  };

  BUILD.T2 = function (B, I, R) {
    var v = R.v, lr = B.lr, barFill = R.useAcc && v !== 2 ? B.acc : (B.dark ? PAPER.copyWhite : INK.toner), lines, top, rest, dateInk;
    dateInk = lum(barFill) > 0.3 ? INK.toner : PAPER.copyWhite;
    lines = B.bandLines(I, 120, { treat: R.treat, stretch: true, ratio: [1, 0.6, 0.55, 0.5, 0.48], min1: 50, min: 30, homeStyle: { stretch: false, font: 'type' }, gap: 0.3 });
    lines.forEach(function (l) { if (l.field === 'band' || l.field === 'tba') l.stretch = true; });
    if (v === 3) {
      var x = 40, i, s, it;
      lines = lines.filter(function (l) { return l.field === 'band'; });
      var total = 0; lines.forEach(function (l) { total += l.size * 1.25; });
      var k = Math.min(1, 420 / total);
      for (i = 0; i < lines.length; i++) {
        s = Math.max(lines[i].min, lines[i].size * k);
        x += s;
        it = B.text(Object.assign({}, lines[i], { x: x, y: 1060, w: 1010, size: s, rot: -Math.PI / 2, anchor: 'base' }));
        x += s * 0.25;
      }
      B.presenter(I, { x: 500, y: 80, w: 310, size: 28, font: 'ui' });
      B.rect(490, 380, 360, 130, barFill);
      B.text({ field: 'date', text: I.date, x: 510, y: 470, w: 320, size: 64, min: 30, font: 'heavy', ink: dateInk, ground: barFill, align: 'center' });
      B.motif(R.motif, 650, 250, 120, { ink: B.toner });
      B.stack(B.infoLines(I, { font: 'heavy', k: 0.8 }).filter(function (l) { return l.field !== 'date'; }), 500, 540, 1060, 320, {});
      return;
    }
    B.presenter(I, { x: 40, y: 70, w: 500, size: 26, font: 'ui' });
    if (v === 1) {
      top = lines.filter(function (l) { return l.idx === 0; });
      rest = lines.filter(function (l) { return l.idx !== 0; });
      B.stack(top, 40, 100, 440, 770, { rules: 5 });
      B.rect(0, 460, W, 120, barFill);
      B.text({ field: 'date', text: I.date, x: 40, y: 553, w: 770, size: 80, min: 30, font: 'heavy', ink: dateInk, ground: barFill, align: 'center' });
      B.stack(rest, 40, 600, 860, 770, { rules: 5 });
    } else {
      B.stack(lines, 40, 100, 715, 770, { rules: 5, spread: true });
      B.motif(R.motif, 780, 800, 70, { ink: dateInk });
      B.rect(0, 740, W, 120, barFill);
      B.text({ field: 'date', text: I.date, x: 40, y: 833, w: 700, size: 80, min: 30, font: 'heavy', ink: dateInk, ground: barFill, align: 'center' });
    }
    var info = B.infoLines(I, { font: 'heavy', k: 0.75 }).filter(function (l) { return l.field !== 'date'; });
    var left = info.filter(function (l) { return has(['doors', 'room', 'address', 'rules'], l.field); });
    var right = info.filter(function (l) { return !has(['doors', 'room', 'address', 'rules'], l.field); });
    B.stack(left, 40, 885, 1065, 370, {});
    B.stack(right, 440, 885, 1065, 370, {});
    if (lr.chance(0.3)) B.motif(R.motif2, 800, 60, 50, {});
  };

  BUILD.T3 = function (B, I, R) {
    var v = R.v, xr = B.xr, lr = B.lr, P = B.P, paperKind = /pastel|goldenrod/.test(R.paper) ? 'plain' : lr.pick(['rule', 'graph', 'rule']);
    var hl = B.acc, pen = B.ink, x = 60, w = v === 1 ? 540 : 730, align = v === 1 ? 'left' : 'center', bands, info, date, ages, mt;
    if (paperKind !== 'plain') B.push({ k: 'lines', kind: paperKind, ink: paperKind === 'rule' ? '#7FA6D6' : '#9DBBD6' });
    mt = R.F && spec0(B).mark && SKEL[spec0(B).mark.treatment] ? spec0(B).mark.treatment : 'marker';
    if (v === 2) {
      B.shape({ kind: 'bubble', cx: 425, cy: 380, rx: 395, ry: 300, tx: 150, ty: 760, stroke: pen, lw: 6, rough: true });
      bands = B.bandLines(I, 92, { treat1: R.treat === 'marker' ? 'block' : R.treat, treat: 'marker', min1: 40, min: 24, homeTreat: 'marker', ink: pen });
      B.stack(bands, 130, 160, 620, 590, { base: { align: 'center', ink: pen, ink2: hl } });
      B.presenter(I, { x: 60, y: 830, w: 700, size: 34, treat: mt, ink: pen, text: I.presenter.toUpperCase() + ':' });
      info = B.infoLines(I, { treat: 'marker', merge: true, k: 0.8 });
      B.stack(info, 60, 860, 1070, 730, { base: { ink: pen } });
    } else {
      B.presenter(I, { x: x, y: 95, w: w, size: 34, treat: mt, ink: pen, align: align });
      bands = B.bandLines(I, 92, { treat1: R.treat === 'marker' ? 'block' : R.treat, treat: 'marker', min1: 40, min: 24, homeTreat: 'marker' });
      var bl = B.stack(bands, x, 130, 640, w, { base: { align: align, ink: pen, ink2: hl }, spread: true });
      if (bl[0]) B.push({ k: 'squiggle', x: bl[0].x, y: bl[0].y + 18, w: bl[0].wpx, ink: hl, lw: 7, seed: R.extrasSeed + ':sq' });
      info = B.infoLines(I, { treat: 'marker', k: 0.85 });
      var il = B.stack(info, x, 670, 1070, w, { base: { align: align, ink: pen } });
      il.forEach(function (it) {
        if (it.field === 'date' || it.field === 'ages') {
          var sw = { k: 'rect', x: it.x - 12, y: it.y - it.size * 1.05, w: it.wpx + 24, h: it.size * 1.35, fill: hl, alpha: 0.75, mult: true, rot: xr.range(-0.02, 0.02) };
          B.under(it, sw); it.ground = mixHex(P.paper, hl, 0.75);
          if (it.field === 'date') date = it; else ages = it;
        }
      });
      if (date) B.under(P.items[0], { k: 'motif', id: 'arrow', x: Math.max(40, date.x - 50), y: date.y - date.size / 2, size: 60, ink: pen, rough: true, rot: 0, seed: R.extrasSeed + ':ar' });
      var spots = v === 1 ? [[700, 240], [700, 470], [700, 700], [700, 930]] : [[70, 60], [790, 60], [790, 1050], [60, 1050]], n = xr.int(2, 4), i, s;
      for (i = 0; i < n; i++) {
        s = spots[i];
        B.under(P.items[0], { k: 'motif', id: i === 0 ? R.motif : xr.pick(['star', 'bolt', 'sun', 'heart', 'flower', R.motif2]), x: s[0], y: s[1], size: v === 1 ? 120 : 64, ink: i % 2 ? hl : pen, rough: true, rot: xr.range(-0.3, 0.3), seed: R.extrasSeed + ':d' + i });
      }
    }
  };
  function spec0(B) { return B.spec || {}; }

  BUILD.T4 = function (B, I, R) {
    var v = R.v, lr = B.lr, duo = R.useAcc ? [B.acc, INK.toner] : [INK.toner, INK.copyGray], side, bands, i;
    if (v === 0) B.pic(0, 0, W, H, { inks: duo, level: 0.7, cell: lr.int(7, 9) });
    else if (v === 1) {
      if (lr.chance(0.5)) B.pic(95, 70, 660, 660, { shape: 'circle', inks: duo, cell: 8 });
      else { B.rect(70, 60, 710, 600, INK.toner, { r: 40 }); B.pic(100, 90, 650, 540, { shape: 'tv', inks: duo, cell: 8 }); }
    } else {
      for (i = 0; i < 3; i++) B.pic(40 + i * 262, 110, 248, 330, { inks: duo, cell: 7, seed: R.layoutSeed + ':contact' });
    }
    side = v === 0 ? (lr.chance(0.5) ? [60, 520] : [330, 810]) : v === 1 ? [560, 830] : [470, 830];
    B.presenter(I, { x: 40, y: 50, w: 520, size: 28, font: 'heavy', box: { fill: PAPER.copyWhite, pad: 7 }, ink: INK.toner });
    bands = B.bandLines(I, 92, { treat: R.treat, ratio: [1, 0.5, 0.47, 0.44, 0.42], min1: 44, min: 30, homeStyle: { box: { fill: PAPER.copyWhite, pad: 5 }, ink: INK.toner } });
    bands.forEach(function (l, j) {
      var bg = j === 0 ? (lr.chance(0.5) ? INK.toner : PAPER.copyWhite) : lr.chance(0.4) ? INK.toner : PAPER.copyWhite;
      if (l.box) return;
      l.box = { fill: bg, pad: 10 }; l.ink = bg === INK.toner ? PAPER.copyWhite : INK.toner; l.rot = lr.range(-0.025, 0.025); l.dx = lr.range(0, 50);
    });
    B.stack(bands, 50, side[0], side[1], 700, { up: Math.max(0, side[0] - 110) });
    B.rect(30, 845, 790, 230, PAPER.copyWhite);
    B.rule(30, 846, 820, 846, 3, INK.toner);
    var info = B.infoLines(I, { font: 'heavy', merge: true, k: 0.85 }).map(function (l) { l.ground = PAPER.copyWhite; l.ink = l.ink || INK.toner; return l; });
    B.stack(info, 50, 860, 1068, 750, {});
  };

  BUILD.T5 = function (B, I, R) {
    var v = R.v, xr = B.xr, ch = xr.pick(['*', '+', 'x', '=', '~', '#']), bands, info, it, box;
    B.push({ k: 'border', ch: ch, size: 22, ink: INK.toner });
    B.rule(60, 62, 790, 62, 2); B.rule(60, 150, 790, 150, 2);
    B.presenter(I, { x: 60, y: 125, w: 730, size: 44, treat: 'typewriter', text: I.presenter.toUpperCase(), align: 'center' });
    var bl = { treat: 'typewriter', upper: true, title: true, ratio: [1, 0.68, 0.66, 0.64, 0.62], min1: 30, min: 22, oneLiners: true, homeStyle: { font: 'type' } };
    if (v === 0) {
      bands = B.bandLines(I, 54, bl);
      B.stack(bands, 60, 175, 1040, 420, {});
      B.pic(510, 180, 290, 250, { level: 0.55, cell: 6, inks: [INK.toner, INK.copyGray] });
      box = B.rect(498, 462, 314, 580, null, { stroke: INK.toner, lw: 2 });
      info = B.infoLines(I, { treat: 'typewriter', k: 0.72, tba: false, dateText: I.dateShort });
      it = B.stack(info, 515, 470, 1030, 280, {});
    } else {
      if (v === 1) {
        B.text({ field: 'dateNum', deco: true, text: String(spec0(B).date ? spec0(B).date.d : ''), x: 60, y: 390, w: 260, size: 210, min: 60, font: 'heavy' });
        B.text({ field: 'date', text: I.date, x: 330, y: 230, w: 460, size: 40, min: 30, treat: 'typewriter' });
        bands = B.bandLines(I, 54, bl);
        B.stack(bands, 330, 260, 640, 460, {});
      } else {
        B.text({ field: 'letter', text: 'hey everybody,', x: 60, y: 210, w: 600, size: 34, min: 20, treat: 'typewriter', deco: true });
        bands = B.bandLines(I, 54, bl);
        B.stack(bands, 100, 240, 640, 690, {});
      }
      B.pic(560, 690, 240, 200, { level: 0.55, cell: 6, inks: [INK.toner, INK.copyGray] });
      box = B.rect(48, 670, 490, 380, null, { stroke: INK.toner, lw: 2 });
      info = B.infoLines(I, { treat: 'typewriter', k: 0.72, tba: false }).filter(function (l) { return !(v === 1 && l.field === 'date'); });
      if (v === 2) info.forEach(function (l) { if (l.field === 'date') l.text = I.dateShort; });
      it = B.stack(info, 64, 680, 1040, 460, {});
    }
    var doors = it.filter(function (x) { return x.field === 'doors'; })[0];
    var room = (v === 0 ? 795 : 525) - (doors ? doors.x + doors.wpx : 0);
    if (doors && I.doors && room > 120 && xr.chance(0.7)) {
      B.push({ k: 'rule', x1: doors.x - 4, y1: doors.y - doors.size * 0.4, x2: doors.x + doors.wpx + 4, y2: doors.y - doors.size * 0.45, lw: 3, ink: INK.toner });
      B.text({ field: 'doors', text: (I.doors).toUpperCase(), x: doors.x + doors.wpx + 10, y: doors.y + 4, w: room - 14, size: 28, min: 18, treat: 'marker', ink: INK.ballpointBlue, rot: -0.05 });
      doors.deco = true;
    }
  };

  BUILD.T6 = function (B, I, R) {
    var v = R.v, lr = B.lr, A = B.acc, Bi = B.ink, P = B.P, fig = lr.pick(['sun', 'waves', 'rings', 'star', 'palm', 'sun']), bands, info, ground = null, it;
    P.misreg = { dx: lr.range(-2.5, 2.5), dy: lr.range(-2.5, 2.5) };
    function figure(cx, cy, r) {
      if (fig === 'sun') B.shape({ kind: 'sun', cx: cx, cy: cy, r: r * 0.55, rays: lr.int(12, 20), len: r * 0.42, fill: A, layer: 'A', mult: true });
      else if (fig === 'waves') B.shape({ kind: 'waves', x: cx - r, y: cy - r * 0.7, w: r * 2, h: r * 1.4, n: lr.int(4, 7), fill: A, layer: 'A', mult: true });
      else if (fig === 'rings') B.shape({ kind: 'rings', cx: cx, cy: cy, r: r, n: lr.int(4, 7), lw: r / 12, stroke: A, layer: 'A', mult: true });
      else B.motif(fig, cx, cy, r * 1.9, { ink: A, layer: 'A', mult: true });
    }
    B.presenter(I, { x: 50, y: 70, w: 750, size: 28, font: 'heavy', ink: Bi, layer: 'B', mult: true, align: 'center' });
    if (v === 0) {
      figure(425, 300, 220);
      bands = B.bandLines(I, 76, { treat: R.treat, ratio: [1, 0.6, 0.53, 0.5, 0.47], min1: 40, min: 28 });
      B.stack(bands, 50, 560, 830, 750, { base: { ink: Bi, layer: 'B', mult: true, align: 'center' } });
      B.rect(30, 850, 790, 220, A, { layer: 'A', mult: true });
      ground = A;
      info = B.infoLines(I, { font: 'heavy', merge: true, k: 0.8 });
      B.stack(info, 60, 862, 1065, 730, { base: { ink: Bi, layer: 'B', mult: true, ground: ground, align: 'center' } });
    } else if (v === 1) {
      B.shape({ kind: 'circle', cx: 425, cy: 560, r: 400, fill: A, layer: 'A', mult: true });
      bands = B.bandLines(I, 76, { treat: R.treat, ratio: [1, 0.6, 0.53, 0.5, 0.47], min1: 40, min: 28 });
      B.stack(bands, 110, 210, 640, 630, { base: { ink: Bi, layer: 'B', mult: true, ground: A, align: 'center' } });
      info = B.infoLines(I, { font: 'heavy', merge: true, k: 0.8 });
      B.stack(info, 150, 670, 1000, 550, { base: { ink: Bi, layer: 'B', mult: true, ground: A, align: 'center' } });
    } else {
      bands = B.bandLines(I, 100, { treat: R.treat === 'bubble' ? 'block' : R.treat, ratio: [1, 0.55, 0.5, 0.46, 0.44], min1: 44, min: 30 });
      var shadows = B.stack(bands, 50, 120, 760, 740, { base: { ink: Bi, layer: 'B', mult: true } });
      shadows.forEach(function (s) {
        var c = Object.assign({}, s, { x: s.x - 8, y: s.y - 8, ink: A, layer: 'A', deco: true, field: 'shadow' });
        B.push(c);
      });
      figure(700, 900, 110);
      info = B.infoLines(I, { font: 'heavy', merge: true, k: 0.8 });
      B.stack(info, 50, 790, 1065, 560, { base: { ink: Bi, layer: 'B', mult: true } });
    }
    it = null;
  };

  BUILD.T7 = function (B, I, R) {
    var v = R.v, xr = B.xr, lr = B.lr, P = B.P, bands, info, all, red = R.useAcc ? INK.fireRed : INK.toner;
    if (v === 1) { B.push({ k: 'brick', seed: R.extrasSeed + ':brick' }); P.ground = '#8E3A27'; }
    if (v === 2) B.pic(70, 120, 710, 520, { level: 0.6, cell: 9, alpha: 0.85, inks: [INK.toner, INK.copyGray] });
    B.motif(R.stencilMotif, v === 2 ? 720 : 425, v === 2 ? 1000 : 260, v === 2 ? 130 : 300, { ink: v === 1 ? PAPER.copyWhite : red, rough: true });
    B.presenter(I, { x: 50, y: 70, w: 750, size: 30, treat: 'stencil', text: I.presenter.toUpperCase(), align: 'center' });
    bands = B.bandLines(I, 90, { treat: R.treat, ratio: [1, 0.62, 0.53, 0.5, 0.47], min1: 44, min: 30, homeTreat: 'block' });
    all = B.stack(bands, 50, v === 2 ? 150 : 430, v === 2 ? 620 : 800, 750, { base: { align: 'center' } });
    info = B.infoLines(I, { treat: 'block', merge: true, k: 0.8 });
    all = all.concat(B.stack(info, 50, v === 2 ? 660 : 830, 1065, v === 2 ? 600 : 750, { base: { align: v === 2 ? 'left' : 'center' } }));
    all.forEach(function (it) {
      if (it.size >= 40) B.push({ k: 'spray', x: it.x, y: it.y - it.size, w: it.wpx, h: it.size, n: Math.min(900, Math.round(it.text.length * xr.range(30, 60))), ink: it.ink, seed: it.seed + ':spray' });
    });
    [[30, 30, -0.7], [820, 30, 0.7], [30, 1070, 0.7], [820, 1070, -0.7]].forEach(function (c) { if (xr.chance(0.7)) B.tape(c[0], c[1], 110, c[2]); });
  };

  BUILD.T8 = function (B, I, R) {
    var v = R.v, lr = B.lr, x0 = 40, y0 = 40, cw = 770 / 6, rh = 1020 / 8, spot = B.acc, d = spec0(B).date, low = R.lower, bands, i, n = I.bands.length, rot = null;
    B.push({ k: 'grid', x: x0, y: y0, cols: 6, rows: 8, cw: cw, rh: rh, lw: 2, ink: B.toner });
    var geo = lr.pick(['circle', 'bar', 'quarter']);
    if (v === 1) B.rect(-100, 560, 1100, 110, spot, { rot: -0.45, mult: true });
    if (geo === 'circle') B.shape({ kind: 'circle', cx: x0 + cw * lr.int(1, 4), cy: y0 + rh * 2, r: rh * 0.9, fill: spot, mult: true });
    else if (geo === 'bar') B.rect(x0, y0 + rh * 2.5, cw * 6, 26, spot, { mult: true });
    else B.shape({ kind: 'quarter', cx: x0, cy: y0 + rh * 8, r: rh * 2.2, fill: spot, mult: true });
    B.text({ field: 'dateNum', deco: true, text: String(d ? d.d : ''), x: x0 + cw * 3, y: y0 + rh * 2.9, w: cw * 3 - 10, size: 280, min: 80, font: 'heavy', ink: spot, align: 'right' });
    B.presenter(I, { x: x0 + 10, y: y0 + 46, w: cw * 3 - 20, size: 30, font: 'heavy', text: low ? I.presenter.toLowerCase() : I.presenter.toUpperCase() });
    if (n >= 2 && v !== 2) rot = n - 1;
    bands = I.bands.map(function (b, j) {
      var t = low ? b.name.toLowerCase() : b.name.toUpperCase();
      if (v === 2) t = (j + 1) + '  ' + t;
      return { field: 'band', idx: j, text: t, size: j === 0 ? 110 : 46, min: j === 0 ? 44 : 26, treat: R.treat === 'typewriter' ? 'typewriter' : 'font', font: 'heavy' };
    });
    B.stack([bands[0]], x0 + 8, y0 + rh * 3, y0 + rh * 4.6, cw * 6 - 16, {});
    var mid = bands.slice(1).filter(function (b) { return b.idx !== rot; });
    I.bands.forEach(function (b, j) { if (b.home) mid.push({ field: 'home', idx: j, text: b.home.toUpperCase(), size: 24, min: 16, font: 'ui' }); });
    if (I.tba) mid.push({ field: 'tba', text: low ? I.tba : I.tba.toUpperCase(), size: 26, min: 18, font: 'heavy' });
    mid.sort(function (a, b) { return (a.idx == null ? 99 : a.idx) - (b.idx == null ? 99 : b.idx); });
    B.stack(mid, x0 + 8, y0 + rh * 4.75, y0 + rh * 7 - 6, rot != null ? cw * 5 - 16 : cw * 6 - 16, {});
    if (rot != null) B.text(Object.assign({}, bands[rot], { x: x0 + cw * 5 + 70, y: y0 + rh * 7 - 8, w: rh * 4 - 30, size: 50, min: 26, rot: -Math.PI / 2, anchor: 'base' }));
    var y7 = y0 + rh * 7, big = R.big ? 1.2 : 1;
    B.text({ field: 'date', text: I.dateShort, x: x0 + 8, y: y7 + 46, w: cw * 2 - 16, size: 36 * big, min: 30, font: 'heavy' });
    var dt = [I.doors, I.times].filter(Boolean).join(' · ');
    if (dt) B.text({ field: 'doors', text: dt.toUpperCase(), x: x0 + 8, y: y7 + 92, w: cw * 2 - 16, size: 22, min: 14, font: 'ui' });
    B.text({ field: 'room', text: I.room.toUpperCase(), x: x0 + cw * 2 + 8, y: y7 + 40, w: cw * 2 - 16, size: 28, min: 16, font: 'heavy' });
    if (I.address) B.text({ field: 'address', text: I.address.toUpperCase(), x: x0 + cw * 2 + 8, y: y7 + 74, w: cw * 2 - 16, size: 20, min: 13, font: 'ui' });
    if (I.rules) B.text({ field: 'rules', text: I.rules.toUpperCase(), x: x0 + cw * 2 + 8, y: y7 + 104, w: cw * 2 - 16, size: 17, min: 12, font: 'ui' });
    B.text({ field: 'price', text: I.price.toUpperCase(), x: x0 + cw * 4 + 8, y: y7 + 46, w: cw * 2 - 16, size: 36 * big, min: 30, font: 'heavy' });
    B.text({ field: 'ages', text: I.ages.toUpperCase(), x: x0 + cw * 4 + 8, y: y7 + 96, w: cw * 2 - 16, size: 34 * big, min: 30, font: 'heavy' });
    if (I.noOne) B.text({ field: 'noOne', text: I.noOne.toUpperCase(), x: x0 + 10, y: y0 + rh * 1.7, w: cw * 3 - 20, size: 18, min: 12, font: 'ui' });
    I.tags.forEach(function (t, j) { B.text({ field: 'tags', text: t.toUpperCase(), x: x0 + 10, y: y0 + rh * 1.2 + j * 36, w: cw * 3 - 20, size: 26, min: 16, font: 'heavy', box: { fill: B.toner, pad: 5 }, ink: B.P.paper }); });
  };

  BUILD.T9 = function (B, I, R) {
    if (B.xr.chance(0.6)) B.motif(R.motif, 770, 1030, 80, {});
    B.presenter(I, { x: 50, y: 82, w: 750, size: 30, font: 'ui', text: I.presenter.toUpperCase() });
    B.rule(50, 102, 800, 102, 4);
    B.stack(B.bandLines(I, 130, { treat: 'stretchBlock', stretch: true, ratio: [1, 0.6, 0.55, 0.5, 0.48], min1: 50, min: 30, homeStyle: { font: 'ui' } }), 50, 120, 690, 750, { spread: true });
    B.rule(50, 712, 800, 712, 4);
    B.stack(B.infoLines(I, { font: 'heavy' }), 50, 725, 1065, 750, {});
  };

  BUILD.T10 = function (B, I, R) {
    var lr = B.lr, xr = B.xr, sp = spec0(B), tour = touringBand(sp), ti = tour ? (sp.billing || []).indexOf(tour) : 0, A = INK[R.tourA] || INK.toner, Bk = INK[R.tourB] || B.acc;
    var route = sp.route || [], mt = sp.mark && SKEL[sp.mark.treatment] ? sp.mark.treatment : 'marker', i, y, stopH, it, strip;
    if (ti < 0) ti = 0;
    B.motif(R.motif, 290, 540, 380, { ink: Bk, mult: true });
    var tb = I.bands[ti] || { name: '', home: '' };
    var th = B.wrapText({ field: 'band', idx: ti, text: tb.name.toUpperCase(), x: 40, y: 150, w: 770, size: 120, min: 50, treat: R.treat, ink: A, ink2: Bk, stretch: R.treat === 'stretchBlock' });
    if (tb.home) B.text({ field: 'home', idx: ti, text: tb.home.toUpperCase(), x: 40, y: th[th.length - 1].y + 52, w: 500, size: 34, min: 18, font: 'heavy', ink: A });
    stopH = Math.min(52, 440 / Math.max(1, route.length));
    for (i = 0; i < route.length; i++) {
      y = 330 + (i + 1) * stopH;
      it = B.text({ field: route[i].here ? 'routeHere' : 'route', text: route[i].text, x: 540, y: y, w: 280, size: Math.min(30, stopH * 0.62), min: 13, font: 'heavy', ink: A });
      if (route[i].here) B.push({ k: 'shape', kind: 'ellipse', cx: it.x + it.wpx / 2, cy: it.y - it.size / 2, rx: it.wpx / 2 + 16, ry: it.size * 0.95, stroke: INK.fireRed, lw: 5, rough: true, seed: R.extrasSeed + ':circ' });
    }
    strip = B.rect(30, 800, 790, 272, PAPER.copyWhite, { rot: lr.range(-0.02, 0.02), cut: true });
    B.tape(60, 805, 90, -0.5); B.tape(790, 805, 90, 0.5);
    B.presenter(I, { x: 50, y: 850, w: 420, size: 30, treat: mt, ink: B.ink === PAPER.copyWhite ? INK.toner : B.ink, text: I.presenter.toUpperCase(), ground: PAPER.copyWhite });
    var locals = I.bands.map(function (b, j) { return { b: b, j: j }; }).filter(function (x) { return x.j !== ti; });
    var ll = locals.map(function (x) { return { field: 'band', idx: x.j, text: ('+ ' + x.b.name).toUpperCase(), size: 34, min: 16, treat: 'marker' }; });
    if (I.tba) ll.push({ field: 'tba', text: I.tba.toUpperCase(), size: 24, min: 14, treat: 'marker' });
    var base = { ink: INK.toner, ground: PAPER.copyWhite };
    B.stack(ll, 50, 870, 1062, 400, { base: base });
    var info = B.infoLines(I, { treat: 'marker', merge: true, k: 0.62, dateText: I.dateShort });
    B.stack(info, 470, 818, 1066, 335, { base: base });
    if (xr.chance(0.5)) B.motif(R.motif2, 760, 70, 70, { ink: Bk, mult: true });
  };

  /* ---------------- the picture-led templates: a pasted photo carries the sheet (the references: a big photo or
   * figure, a burst or dot field behind it, the type knocked out over it, the details in a strip at the foot) ---- */

  /* The details for a foot strip: date and price large, the rest under them. Two columns when there is room. */
  function footInfo(B, I, x, top, bottom, w, o) {
    o = o || {};
    var info = B.infoLines(I, { font: 'heavy', merge: true, k: o.k || 0.8, dateText: o.dateText }), left, right, base = o.base || {};
    if (w < 600) return B.stack(info, x, top, bottom, w, { base: base });
    left = info.filter(function (l) { return has(['date', 'doors', 'tags'], l.field); });
    right = info.filter(function (l) { return !has(['date', 'doors', 'tags'], l.field); });
    B.stack(left, x, top, bottom, w * 0.48, { base: base });
    return B.stack(right, x + w * 0.52, top, bottom, w * 0.48, { base: base });
  }

  /* T11 photo poster: a print fills the top of the sheet, the headliner is pasted across its bottom edge. */
  BUILD.T11 = function (B, I, R) {
    var v = R.v, lr = B.lr, xr = B.xr, box, h1, bands, rest, nSup, two, hs, supH, headH, top, foot = 860;
    bands = B.bandLines(I, 130, { treat: R.treat, ratio: [1, 0.36, 0.33, 0.31, 0.3], min1: 54, min: 26, homes: false });
    h1 = bands.shift(); rest = bands;
    if (I.bands[0] && I.bands[0].home) rest.unshift({ field: 'home', idx: 0, text: I.bands[0].home.toUpperCase(), size: 26, min: 16, font: 'type', gap: 0.5 });
    two = B.split(Object.assign({}, h1, { size: 124 }), 770).length > 1;
    hs = two ? 96 : 124; headH = hs * (two ? 2.25 : 1.1);
    nSup = rest.length; supH = Math.min(190, nSup * 40);
    top = v === 2 ? 60 + headH + 30 : v === 1 ? 0 : 120;
    /* the headliner sits across the photo's foot: first baseline 0.45 of a size below it, boxed lines 1.5 sizes apart */
    var bottom = foot - 40 - supH - hs * 0.45 - (two ? hs * 1.5 : 0);
    box = v === 0 ? [40, top, 770, bottom - top] : v === 1 ? [0, 0, W, bottom] : [60, top, 730, foot - 30 - supH - top];
    if (v === 2) B.rect(box[0] - 14, box[1] - 14, box[2] + 28, box[3] + 28, INK.toner, { r: 70 });
    if (!B.photo(R.cutPrint || R.cutFig, box[0], box[1], box[2], box[3], { fit: 'cover', border: false, cell: lr.int(6, 9), round: v === 2 ? 60 : 0 })) B.pic(box[0], box[1], box[2], box[3], { shape: v === 2 ? 'tv' : 'rect', level: 0.65 });
    if (v === 0) { B.rule(box[0], box[1], box[0] + box[2], box[1], 5); }
    B.presenter(I, v === 1 ? { x: 40, y: 70, w: 560, size: 30, font: 'heavy', box: { fill: PAPER.copyWhite, pad: 8, cut: true }, ink: INK.toner, rot: lr.range(-0.03, 0.03) }
                           : { x: 50, y: v === 2 ? 50 : 92, w: 750, size: 30, font: 'heavy', text: I.presenter.toUpperCase() });
    if (v === 2) h1 = B.wrapText(Object.assign(h1, { x: 40, y: 60 + hs * 1.05, w: 770, size: hs, stretch: R.treat === 'stretchBlock' }));
    else h1 = B.wrapText(Object.assign(h1, { x: 40, y: bottom + hs * 0.45, w: 770, size: hs, stretch: R.treat === 'stretchBlock', box: { fill: v === 1 ? INK.toner : PAPER.copyWhite, pad: 10, cut: true },
                                             ink: v === 1 ? PAPER.copyWhite : INK.toner, rot: lr.range(-0.02, 0.02) }));
    var hb = h1[h1.length - 1], sTop = v === 2 ? box[1] + box[3] + 18 : hb.y + 22;
    if (rest.length) B.stack(rest, 40, sTop, foot - 16, 770, {});
    B.rule(40, foot, 810, foot, 4);
    footInfo(B, I, 40, foot + 6, 1068, 770, { k: 0.78 });
    if (xr.chance(0.6)) B.tape(xr.pick([90, 760]), box[1] + 10, 100, xr.range(-0.6, 0.6));
  };

  /* T12 figure: one person cut out, huge, standing on the bottom edge on one side, with a burst or a dot field behind;
   * the bill runs down the other side. */
  BUILD.T12 = function (B, I, R) {
    var lr = B.lr, xr = B.xr, left = lr.chance(0.5), fx = left ? 0 : 400, tx = left ? 470 : 40, tw = 340, cx = fx + 225;
    if (R.v === 0) B.push({ k: 'burst', cx: cx, cy: lr.range(380, 520), n: lr.int(18, 28), ink: R.useAcc ? B.acc : INK.copyGray, mult: true, alpha: 0.9 });
    else B.push({ k: 'dots', x: fx, y: 0, w: 450, h: H, cx: cx, cy: lr.range(300, 600), cell: lr.int(24, 32), maxD: 520, ink: R.useAcc ? B.acc : INK.copyGray, mult: true });
    if (!B.photo(R.cutFig || R.cutPrint, fx - 20, 130, 490, 970, { ax: left ? 0.35 : 0.65, cell: lr.int(6, 8), solid: false }))
      B.pic(fx + 20, 200, 410, 700, { level: 0.65, torn: true });
    B.presenter(I, { x: tx, y: 82, w: tw, size: 28, font: 'heavy', text: I.presenter.toUpperCase() });
    B.rule(tx, 100, tx + tw, 100, 4);
    var bands = B.bandLines(I, 96, { treat: R.treat, ratio: [1, 0.46, 0.42, 0.4, 0.38], min1: 40, min: 24, homeStyle: { font: 'type' } });
    var st = B.stack(bands, tx, 110, 590, tw, {}), y = st.length ? st[st.length - 1].y + 30 : 600;
    B.rule(tx, y, tx + tw, y, 4);
    footInfo(B, I, tx, y + 8, 1068, tw, { k: 0.86 });
    if (xr.chance(0.5)) B.motif(R.motif, left ? 380 : 470, 1000, 70, { ink: B.acc, mult: true, rot: xr.range(-0.4, 0.4) });
  };

  /* T13 paste-up: a crowd or a room blown up faint behind everything, three or four cut-outs taped on at angles, the
   * names on strips of paper. */
  BUILD.T13 = function (B, I, R) {
    var lr = B.lr, xr = B.xr, cuts = [R.cutFig].concat(R.cutMore || []).filter(Boolean), spots, i, s, it;
    B.photo(R.cutGround, 0, 0, W, H, { fit: 'cover', knock: false, border: false, alpha: R.useAcc ? 0.75 : 1, cell: 10, look: 'dots', bias: 0.2, contrast: 1.3, solid: false,
                                      ink: R.useAcc ? B.acc : B.dark ? PAPER.copyWhite : INK.toner });
    spots = lr.chance(0.5) ? [[430, 120, 400, 640], [20, 400, 300, 380], [520, 560, 300, 260], [260, 300, 260, 300]]
                           : [[20, 110, 400, 640], [520, 380, 300, 400], [60, 560, 280, 250], [430, 200, 260, 280]];
    for (i = 0; i < cuts.length && i < 4; i++) {
      s = spots[i];
      it = B.photo(cuts[i], s[0], s[1], s[2], s[3], { rot: lr.range(-0.14, 0.14), cell: lr.int(5, 7), ink: i === 1 && R.useAcc ? B.acc : (B.dark ? B.acc : INK.toner), solid: false });
      if (it && xr.chance(0.7)) B.tape(s[0] + s[2] * xr.range(0.3, 0.7), s[1] + 20, 90, xr.range(-0.5, 0.5));
    }
    B.presenter(I, { x: 40, y: 70, w: 520, size: 28, font: 'type', box: { fill: PAPER.copyWhite, pad: 6, cut: true }, ink: INK.toner, rot: lr.range(-0.04, 0.04) });
    var bands = B.bandLines(I, 104, { treat: R.treat === 'ransom' || R.treat === 'headline' ? R.treat : 'headline', treat1: R.treat, ratio: [1, 0.5, 0.46, 0.43, 0.4], min1: 46, min: 26 });
    bands.forEach(function (l) {
      var bg = l.idx === 0 || lr.chance(0.45) ? INK.toner : PAPER.copyWhite;
      if (l.treat === 'ransom') return;
      l.box = { fill: bg, pad: 9, cut: true }; l.ink = bg === INK.toner ? PAPER.copyWhite : INK.toner; l.rot = lr.range(-0.05, 0.05); l.dx = lr.range(0, 70);
    });
    B.stack(bands, 40, 100, 760, 700, {});
    B.rect(30, 790, 790, 285, PAPER.copyWhite, { rot: lr.range(-0.02, 0.02), cut: true });
    B.tape(70, 795, 100, -0.4); B.tape(780, 795, 100, 0.5);
    footInfo(B, I, 50, 800, 1062, 750, { k: 0.8, base: { ink: INK.toner, ground: PAPER.copyWhite } });
  };

  /* T14 black stock: the figure printed in one bright ink straight onto black paper, the name in white over the top. */
  BUILD.T14 = function (B, I, R) {
    var lr = B.lr, xr = B.xr, bands, h1, rest, st, y;
    if (xr.chance(0.6)) B.push({ k: 'burst', cx: W / 2, cy: 560, n: lr.int(24, 36), ink: B.acc, alpha: 0.22 });
    if (!B.photo(R.cutFig || R.cutPrint, 90, 230, 670, 600, { ink: B.acc, knock: false, border: false, look: lr.pick(['thresh', 'dots']), cell: lr.int(5, 7), contrast: 1.8, solid: false }))
      B.pic(150, 260, 550, 520, { level: 0.6, inks: [B.acc, INK.copyGray] });
    B.presenter(I, { x: 40, y: 58, w: 770, size: 26, font: 'ui', align: 'center', text: I.presenter.toUpperCase() });
    bands = B.bandLines(I, 140, { treat: R.treat, ratio: [1, 0.4, 0.37, 0.35, 0.33], min1: 54, min: 24, homes: false });
    h1 = B.wrapText(Object.assign(bands.shift(), { x: 40, y: 84 + 140 * (1 + inkOut(R.treat)[0]), w: 770, size: 140, align: 'center', stretch: R.treat === 'stretchBlock' }));
    rest = bands.map(function (l) { l.font = 'heavy'; l.treat = 'font'; return l; });
    st = B.stack(rest, 40, 850, 1060, 360, {});
    y = 850;
    B.rule(425, y + 8, 425, 1060, 3);
    footInfo(B, I, 450, y, 1064, 360, { k: 0.72 });
  };

  /* Text fixes: picture overlap gets a knockout box; low contrast swaps the ink, then adds a box. */
  function finish(B) {
    var P = B.P, pics = P.items.filter(function (it) { return it.k === 'pic' || (it.k === 'photo' && it.solid); });
    P.items.forEach(function (it) {
      if (it.k !== 'text') return;
      if (!it.box && pics.length) {
        var bb = bounds(it);
        pics.forEach(function (p) {
          var pb = { x: p.x, y: p.y, w: p.w, h: p.h };
          if (!it.box && P.items.indexOf(p) < P.items.indexOf(it) && overlap(bb, pb) > 0) {
            it.box = { fill: PAPER.copyWhite, pad: 6 }; it.ground = null;
          }
        });
      }
      var g = groundOf(P, it);
      if (it.deco) return;
      if (contrast(it.ink, g) < 4.5) {
        var t = contrast(INK.toner, g) >= contrast(PAPER.copyWhite, g) ? INK.toner : PAPER.copyWhite;
        it.ink = t;
        if (contrast(t, g) < 4.5) { it.box = { fill: PAPER.copyWhite, pad: 6 }; it.ink = INK.toner; it.ground = null; }
      }
      if (it.ink2 && it.treat === 'bubble' && contrast(it.ink2, g) < 1.2) it.ink2 = null;
    });
  }
  function groundOf(P, it) { return it.box && it.box.fill ? it.box.fill : it.ground || P.ground || P.paper; }

  /* Hand-drawn letters carry ink past the cap line and baseline: half the stroke, plus spikes or drips (size fractions). */
  var OUT = { marker: [0.08, 0.08], tape: [0.08, 0.08], nib: [0.11, 0.11], block: [0.16, 0.16], stencil: [0.16, 0.16], bubble: [0.2, 0.2],
              spike: [0.3, 0.3], drip: [0.16, 0.4] };
  function inkOut(treat) { return OUT[treat] || [0, 0]; }
  function corners(it) {
    var o = inkOut(it.treat), up = o[0] * it.size, dn = o[1] * it.size,
        x0 = it.x - (it.box ? it.box.pad : 0), y0 = it.y - it.size - up - (it.box ? it.box.pad : 0), w = it.wpx + (it.box ? 2 * it.box.pad : 0),
        h = it.size + up + dn + (it.desc || 0) + (it.box ? 2 * it.box.pad : 0), cx, cy, c, s, pts;
    pts = [[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h]];
    if (!it.rot) return pts;
    if (it.anchor === 'base') { cx = it.x; cy = it.y; } else { cx = x0 + w / 2; cy = y0 + h / 2; }
    c = Math.cos(it.rot); s = Math.sin(it.rot);
    return pts.map(function (p) { var dx = p[0] - cx, dy = p[1] - cy; return [cx + dx * c - dy * s, cy + dx * s + dy * c]; });
  }
  function bounds(it) {
    var p = corners(it), xs = p.map(function (q) { return q[0]; }), ys = p.map(function (q) { return q[1]; }),
        x = Math.min.apply(null, xs), y = Math.min.apply(null, ys);
    return { x: x, y: y, w: Math.max.apply(null, xs) - x, h: Math.max.apply(null, ys) - y };
  }
  function overlap(a, b) {
    var w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    return w > 0 && h > 0 ? (w * h) / Math.max(1, a.w * a.h) : 0;
  }

  /* Text may overlap other text a little, never sit on it: when a line covers more than CLASH of a smaller line,
   * the smaller one moves up or down (whichever is shorter and stays on the sheet), or shrinks when it cannot move. */
  var CLASH = 0.3, CLEAR = 0.1, NOCLASH = false;
  function covered(a, b) {
    var w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    return w > 0 && h > 0 ? (w * h) / Math.max(1, Math.min(a.w * a.h, b.w * b.h)) : 0;
  }
  function clashText(P) { return P.items.filter(function (it) { return it.k === 'text' && !it.deco && it.text; }); }
  function clashes(P) {
    var t = clashText(P), bb = t.map(bounds), out = [], i, j, c;
    for (i = 0; i < t.length; i++) for (j = i + 1; j < t.length; j++) {
      c = covered(bb[i], bb[j]);
      if (c > CLASH) out.push({ a: t[i], b: t[j], c: c });
    }
    return out;
  }
  function unclash(P) {
    var t = clashText(P), pass, cl, w, m, o, mb, ob, cands, best, pad = 10;
    function hits(it) {
      var b = bounds(it), n = 0;
      t.forEach(function (u) { if (u !== it && covered(b, bounds(u)) > CLASH) n++; });
      return n;
    }
    function shrink(it) {
      var k = 0.85, s = Math.max(it.min || 14, it.size * k), w0 = it.wpx;
      if (s >= it.size - 0.5) return false;
      k = s / it.size; it.size = s; it.wpx *= k; it.desc = (it.desc || 0) * k;
      if (it.align === 'center') it.x += (w0 - it.wpx) / 2; else if (it.align === 'right') it.x += w0 - it.wpx;
      return true;
    }
    for (pass = 0; pass < 24; pass++) {
      cl = clashes(P);
      if (!cl.length) return;
      w = cl.reduce(function (a, b) { return b.c > a.c ? b : a; });
      mb = bounds(w.a); ob = bounds(w.b);
      if (mb.w * mb.h <= ob.w * ob.h) { m = w.a; o = w.b; } else { m = w.b; o = w.a; mb = bounds(m); ob = bounds(o); }
      cands = [ob.y + CLEAR * mb.h - (mb.y + mb.h), ob.y + ob.h - CLEAR * mb.h - mb.y].filter(function (dy) {
        return mb.y + dy >= pad && mb.y + mb.h + dy <= H - pad;
      });
      best = null;
      cands.forEach(function (dy) {
        m.y += dy; var s = hits(m) * 1000 + Math.abs(dy); m.y -= dy;
        if (!best || s < best.s) best = { dy: dy, s: s };
      });
      if (best && best.s < 1000) m.y += best.dy;
      else if (!shrink(m) && !shrink(o)) return;
    }
  }

  /* The type-led templates get a ground:a crowd or a room blown up and printed thin under the type, as a copied flyer
   * pasted over an old one does. Sparse solid dots (faint grey would be whitened by the copy pass). */
  var GHOST = { T2: 0.6, T3: 0.45, T5: 0.4, T6: 0.5, T8: 0.55, T9: 0.5, T10: 0.4 };
  function ghost(B, R) {
    var gr = SB.rng.make(R.extrasSeed + ':ghost'), it;
    if (!GHOST[R.t] || !R.cutGround || !gr.chance(GHOST[R.t])) return;
    it = B.photo(R.cutGround, 0, 0, W, H, { fit: 'cover', knock: false, border: false, cell: gr.int(9, 13), look: gr.pick(['dots', 'line']), bias: 0.34, contrast: 1.25,
                                            solid: false, alpha: R.useAcc ? 0.55 : 1, ink: R.useAcc ? B.acc : B.dark ? PAPER.newsprint : INK.copyGray });
    if (it) { B.P.items.pop(); B.P.items.unshift(it); }
  }

  function plan(recipe, spec, M) {
    var R = resolve(recipe, spec), I = infoOf(spec, recipe, R), B = Builder(R, spec, M || measurer());
    B.spec = spec;
    (BUILD[R.t] || BUILD.T9)(B, I, R);
    ghost(B, R);
    B.handDetails();
    if (!NOCLASH) unclash(B.P);
    finish(B);
    B.P.I = I;
    return B.P;
  }

  /* ------------------------------------------------------------------ */
  /* Painting                                                            */
  /* ------------------------------------------------------------------ */

  function paintText(ctx, P, it) {
    var b = it.box, pad = b ? b.pad : 0, x0 = it.x - pad, y0 = it.y - it.size - pad, w = it.wpx + 2 * pad, h = it.size + (it.desc || 0) + 2 * pad, cx, cy, rng, em;
    ctx.save();
    if (it.rot) {
      if (it.anchor === 'base') { cx = it.x; cy = it.y; } else { cx = x0 + w / 2; cy = y0 + h / 2; }
      ctx.translate(cx, cy); ctx.rotate(it.rot); ctx.translate(-cx, -cy);
    }
    if (b && b.fill) {
      ctx.fillStyle = b.fill;
      if (b.cut) {
        rng = SB.rng.make(it.seed + ':cut');
        ctx.beginPath();
        ctx.moveTo(x0 + rng.range(-3, 3), y0 + rng.range(-3, 3)); ctx.lineTo(x0 + w + rng.range(-3, 3), y0 + rng.range(-3, 3));
        ctx.lineTo(x0 + w + rng.range(-3, 3), y0 + h + rng.range(-3, 3)); ctx.lineTo(x0 + rng.range(-3, 3), y0 + h + rng.range(-3, 3));
        ctx.closePath(); ctx.fill();
      } else ctx.fillRect(x0, y0, w, h);
    }
    rng = SB.rng.make(it.seed);
    ctx.translate(it.x, it.y);
    if (it.sx !== 1) ctx.scale(it.sx, 1);
    if (SKEL[it.treat]) {
      SB.Skeleton.draw(ctx, it.text, 0, 0, it.size, it.treat, { rng: rng, ink: it.ink, paper: groundOf(P, it), ink2: it.ink2 || null });
    } else if (it.treat === 'ransom') {
      paintRansom(ctx, it);
    } else if (it.treat === 'typewriter') {
      em = it.size / CAP.type;
      ctx.font = fontStr('type', '400', em);
      ctx.fillStyle = it.ink;
      var x = 0, i, ch, cwid;
      for (i = 0; i < it.text.length; i++) {
        ch = it.text.charAt(i);
        cwid = ctx.measureText(ch).width;
        ctx.globalAlpha = rng.range(0.75, 1);
        ctx.fillText(ch, x, 0);
        if (rng.chance(0.08)) ctx.fillText(ch, x + 0.6, 0.3);
        x += cwid;
      }
      ctx.globalAlpha = 1;
    } else {
      em = it.size / CAP[it.font];
      ctx.font = fontStr(it.font, it.weight, em);
      ctx.fillStyle = it.ink;
      ctx.fillText(it.text, 0, 0);
    }
    ctx.restore();
  }

  function paintRansom(ctx, it) {
    var x = 0, i, L, em, pad, bw, bh;
    for (i = 0; i < it.letters.length; i++) {
      L = it.letters[i];
      if (L.space) { x += it.size * 0.4 / 0.7; continue; }
      em = it.size * L.k / CAP[L.font];
      pad = L.pad * it.size / 100;
      bw = L.w + 2 * pad; bh = it.size * L.k + 2 * pad;
      ctx.save();
      ctx.translate(x + bw / 2, -it.size / 2 + L.shift * it.size);
      ctx.rotate(L.rot);
      ctx.fillStyle = L.ground;
      ctx.beginPath();
      ctx.moveTo(-bw / 2 + L.cut[0], -bh / 2); ctx.lineTo(bw / 2, -bh / 2 + L.cut[1]); ctx.lineTo(bw / 2 + L.cut[2], bh / 2); ctx.lineTo(-bw / 2, bh / 2 + L.cut[3]);
      ctx.closePath(); ctx.fill();
      ctx.font = fontStr(L.font, L.weight, em);
      ctx.fillStyle = L.ink;
      ctx.fillText(L.ch, -L.w / 2, it.size * L.k / 2);
      ctx.restore();
      x += bw + 2;
    }
  }

  function starPath(ctx, x, y, r) {
    var i, a;
    ctx.beginPath();
    for (i = 0; i < 10; i++) { a = -Math.PI / 2 + i * Math.PI / 5; ctx.lineTo(x + Math.cos(a) * (i % 2 ? r * 0.45 : r), y + Math.sin(a) * (i % 2 ? r * 0.45 : r)); }
    ctx.closePath();
  }

  /* ---------------- photos from the kits ---------------- */

  var PENDING = null;   /* the cut-out ids a render wanted and did not have (render() loads them, then draws again) */
  function want(id) { if (PENDING && id && PENDING.indexOf(id) < 0) PENDING.push(id); }
  function mkCanvas(w, h) {
    var c = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(w, h) : document.createElement('canvas');
    c.width = w; c.height = h; return c;
  }

  /* The photocopy of one photo: its grey becomes ink in dots, a hard threshold or a line screen; paper inside the cut
   * (knock) or nothing; outside the cut stays clear. pw x ph device pixels, the source rect (sx, sy, sw, sh) of img. */
  function copyPhoto(img, sx, sy, sw, sh, pw, ph, it, scale) {
    var cv = mkCanvas(pw, ph), c = cv.getContext('2d'), d, D, x, y, k, l, a, u, v, fu, fv, dd, n, hv,
        I = rgb(it.ink), Pp = rgb(it.paper), cell = Math.max(2.2, (it.cell || 7) * scale), con = it.contrast || 1.6, bias = (it.bias || 0) + (it.tone == null ? 0 : clamp((0.5 - it.tone) * 0.7, -0.2, 0.25)),
        ca = Math.SQRT1_2, look = it.look || 'dots', s0 = SB.rng.make(it.seed + ':px').int(1, 99999);
    c.drawImage(img, sx, sy, sw, sh, 0, 0, pw, ph);
    try { D = c.getImageData(0, 0, pw, ph); } catch (e) { return cv; }
    d = D.data;
    for (y = 0; y < ph; y++) {
      for (x = 0; x < pw; x++) {
        k = (y * pw + x) * 4;
        if (d[k + 3] < 12) { d[k + 3] = 0; continue; }
        hv = Math.imul(x + s0, 374761393) ^ Math.imul(y, 668265263); hv = Math.imul(hv ^ (hv >>> 13), 1274126177);
        n = ((hv ^ (hv >>> 16)) >>> 0) / 4294967296 - 0.5;
        l = (0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2]) / 255;
        l = (l - 0.5) * con + 0.5 + bias + n * 0.1;
        if (look === 'thresh') a = l < 0.5 ? 1 : 0;
        else if (look === 'line') { fv = (y / cell) % 1; a = fv < clamp(1 - l, 0, 1) ? 1 : 0; }
        else if (l < 0.1) a = 1;
        else if (l > 0.92) a = 0;
        else {
          u = (x * ca + y * ca) / cell; v = (-x * ca + y * ca) / cell;
          fu = u - Math.floor(u) - 0.5; fv = v - Math.floor(v) - 0.5; dd = Math.sqrt(fu * fu + fv * fv) * 1.4142;
          a = dd < Math.sqrt(clamp((0.92 - l) / 0.82, 0, 1)) ? 1 : 0;
        }
        if (a) { d[k] = I[0]; d[k + 1] = I[1]; d[k + 2] = I[2]; }
        else if (it.knock) { d[k] = Pp[0]; d[k + 1] = Pp[1]; d[k + 2] = Pp[2]; }
        else d[k + 3] = 0;
      }
    }
    c.putImageData(D, 0, 0);
    return cv;
  }

  /* Paint a photo item into the box (x, y, w, h) at ctx's current scale. Returns false when its image is not in yet. */
  function paintPhoto(ctx, P, it) {
    var img = cutImg(it.id), tr, s, iw, ih, sc, dw, dh, sx = 0, sy = 0, sw, sh, pw, ph, cv, ox, oy, pad, sil, sc2, i, a, rr;
    if (!img) { want(it.id); return false; }
    iw = img.naturalWidth || img.width || 1; ih = img.naturalHeight || img.height || 1;
    tr = ctx.getTransform ? ctx.getTransform() : { a: 1, b: 0 }; s = Math.hypot(tr.a, tr.b) || 1;
    if (it.fit === 'cover') {
      sc = Math.max(it.w / iw, it.h / ih); dw = it.w; dh = it.h;
      sw = it.w / sc; sh = it.h / sc; sx = (iw - sw) / 2; sy = (ih - sh) * 0.3;
    } else {
      sc = Math.min(it.w / iw, it.h / ih); dw = iw * sc; dh = ih * sc; sw = iw; sh = ih;
    }
    ox = it.x + (it.w - dw) * (it.ax == null ? 0.5 : it.ax); oy = it.y + (it.h - dh) * (it.ay == null ? 1 : it.ay);
    pw = Math.max(1, Math.round(dw * s)); ph = Math.max(1, Math.round(dh * s));
    if (it.tone == null) { var ci = cutInfo(it.id); it = Object.assign({}, it, { tone: ci ? ci.tone : null }); }
    cv = copyPhoto(img, sx, sy, sw, sh, pw, ph, it, s);
    ctx.save();
    if (it.alpha != null) ctx.globalAlpha = it.alpha;
    ctx.translate(ox + dw / 2, oy + dh / 2); ctx.rotate(it.rot || 0);
    if (it.round) { ctx.beginPath(); roundRect(ctx, -dw / 2, -dh / 2, dw, dh, it.round); ctx.clip(); }
    ctx.scale(1 / s, 1 / s);
    if (it.border) {
      /* the scissor margin: the cut's own shape grown a few pixels, in paper, with a soft offset shadow under it */
      pad = Math.max(2, Math.round(6 * s)); rr = SB.rng.make(it.seed + ':cut');
      sil = mkCanvas(pw + pad * 2, ph + pad * 2); sc2 = sil.getContext('2d');
      for (i = 0; i < 16; i++) { a = i * Math.PI / 8; sc2.drawImage(cv, pad + Math.cos(a) * pad * rr.range(0.5, 1.2), pad + Math.sin(a) * pad * rr.range(0.5, 1.2)); }
      sc2.globalCompositeOperation = 'source-in';
      sc2.fillStyle = 'rgba(20,20,20,0.35)'; sc2.fillRect(0, 0, sil.width, sil.height);
      ctx.drawImage(sil, -pw / 2 - pad + 2 * s, -ph / 2 - pad + 3 * s);
      sc2.fillStyle = it.knock ? it.paper : PAPER.copyWhite; sc2.fillRect(0, 0, sil.width, sil.height);
      ctx.drawImage(sil, -pw / 2 - pad, -ph / 2 - pad);
    }
    ctx.drawImage(cv, -pw / 2, -ph / 2);
    ctx.restore();
    return true;
  }

  /* Rays from a point, alternate wedges inked (the burst behind a figure). */
  function paintBurst(ctx, it) {
    var i, a0, step = Math.PI * 2 / (it.n * 2), R = 1600;
    ctx.fillStyle = it.ink; if (it.alpha != null) ctx.globalAlpha = it.alpha;
    ctx.beginPath();
    for (i = 0; i < it.n * 2; i += 2) {
      a0 = i * step;
      ctx.moveTo(it.cx, it.cy); ctx.lineTo(it.cx + Math.cos(a0) * R, it.cy + Math.sin(a0) * R); ctx.lineTo(it.cx + Math.cos(a0 + step) * R, it.cy + Math.sin(a0 + step) * R); ctx.closePath();
    }
    ctx.fill();
  }
  /* A coarse halftone field, dots largest near (cx, cy) and shrinking away from it. */
  function paintDots(ctx, it) {
    var c = it.cell, x, y, d, r, maxD = it.maxD || 700;
    ctx.fillStyle = it.ink;
    ctx.beginPath();
    for (y = it.y; y < it.y + it.h + c; y += c) for (x = it.x + ((y / c) % 2 ? c / 2 : 0); x < it.x + it.w + c; x += c) {
      d = Math.hypot(x - it.cx, y - it.cy); r = c * 0.5 * clamp(1 - d / maxD, 0, 1);
      if (r > 0.6) { ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, Math.PI * 2); }
    }
    ctx.fill();
  }

  function paintPic(ctx, P, it, month) {
    var pic = draw('picture'), ht = draw('halftone'), rng = SB.rng.make(it.seed), x = it.x, y = it.y, w = it.w, h = it.h;
    if (it.cut && cutImg(it.cut)) {
      ctx.save();
      ctx.globalAlpha = it.alpha == null ? 1 : it.alpha;
      ctx.beginPath();
      if (it.shape === 'circle') ctx.arc(x + w / 2, y + h / 2, Math.min(w, h) / 2, 0, Math.PI * 2);
      else if (it.shape === 'tv') roundRect(ctx, x, y, w, h, 60);
      else ctx.rect(x, y, w, h);
      ctx.clip();
      ctx.fillStyle = P.paper; ctx.fillRect(x, y, w, h);
      paintPhoto(ctx, P, { id: it.cut, x: x, y: y, w: w, h: h, fit: 'cover', look: it.look, ink: it.inks[0], paper: P.paper, knock: true, border: false, cell: it.cell || 7, seed: it.seed });
      ctx.restore();
      if (!it.torn) return;
    } else if (it.cut) want(it.cut);
    if (!(it.cut && cutImg(it.cut))) {
    ctx.save();
    ctx.globalAlpha = it.alpha == null ? 1 : it.alpha;
    ctx.beginPath();
    if (it.shape === 'circle') ctx.arc(x + w / 2, y + h / 2, Math.min(w, h) / 2, 0, Math.PI * 2);
    else if (it.shape === 'tv') roundRect(ctx, x, y, w, h, 60);
    else ctx.rect(x, y, w, h);
    ctx.clip();
    if (pic) {
      try { pic(ctx, it.id, x, y, w, h, { rng: rng, inks: it.inks, paper: P.paper, month: month }); } catch (e) { pic = null; }
    }
    if (!pic) { ctx.fillStyle = it.inks[1] || INK.copyGray; ctx.globalAlpha *= 0.45; ctx.fillRect(x, y, w, h); }
    if (ht) {
      try { ht(ctx, x, y, w, h, { rng: SB.rng.make(it.seed + ':ht'), level: it.level, cell: it.cell, angle: 45, ink: it.inks[0] }); } catch (e) { /* plain */ }
    }
    ctx.restore();
    }
    if (it.torn) {
      rng = SB.rng.make(it.seed + ':torn');
      ctx.save(); ctx.fillStyle = P.paper; ctx.beginPath();
      var i, n = 24;
      ctx.moveTo(x - 4, y + h + 4);
      for (i = 0; i <= n; i++) ctx.lineTo(x + w * i / n, y + h - rng.range(0, 9));
      ctx.lineTo(x + w + 4, y + h + 4); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(x - 4, y - 4);
      for (i = 0; i <= n; i++) ctx.lineTo(x + rng.range(0, 9), y + h * i / n);
      ctx.lineTo(x - 4, y + h + 4); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
  }

  function paintShape(ctx, it) {
    var i, a, rng = SB.rng.make(String(it.seed || 'shape'));
    ctx.save();
    if (it.kind === 'circle') { ctx.fillStyle = it.fill; ctx.beginPath(); ctx.arc(it.cx, it.cy, it.r, 0, Math.PI * 2); ctx.fill(); }
    else if (it.kind === 'quarter') { ctx.fillStyle = it.fill; ctx.beginPath(); ctx.moveTo(it.cx, it.cy); ctx.arc(it.cx, it.cy, it.r, -Math.PI / 2, 0); ctx.closePath(); ctx.fill(); }
    else if (it.kind === 'sun') {
      ctx.fillStyle = it.fill; ctx.beginPath(); ctx.arc(it.cx, it.cy, it.r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = it.fill; ctx.lineWidth = it.r * 0.12; ctx.lineCap = 'round';
      for (i = 0; i < it.rays; i++) {
        a = i * Math.PI * 2 / it.rays;
        ctx.beginPath(); ctx.moveTo(it.cx + Math.cos(a) * it.r * 1.15, it.cy + Math.sin(a) * it.r * 1.15);
        ctx.lineTo(it.cx + Math.cos(a) * (it.r * 1.15 + it.len), it.cy + Math.sin(a) * (it.r * 1.15 + it.len)); ctx.stroke();
      }
    } else if (it.kind === 'rings') {
      ctx.strokeStyle = it.stroke; ctx.lineWidth = it.lw;
      for (i = 1; i <= it.n; i++) { ctx.beginPath(); ctx.arc(it.cx, it.cy, it.r * i / it.n, 0, Math.PI * 2); ctx.stroke(); }
    } else if (it.kind === 'waves') {
      ctx.fillStyle = it.fill;
      var bh = it.h / (it.n * 2), k;
      for (i = 0; i < it.n; i++) {
        ctx.beginPath();
        for (k = 0; k <= 40; k++) ctx.lineTo(it.x + it.w * k / 40, it.y + i * bh * 2 + Math.sin(k / 40 * Math.PI * 4) * bh * 0.6);
        for (k = 40; k >= 0; k--) ctx.lineTo(it.x + it.w * k / 40, it.y + i * bh * 2 + bh + Math.sin(k / 40 * Math.PI * 4) * bh * 0.6);
        ctx.closePath(); ctx.fill();
      }
    } else if (it.kind === 'bubble' || it.kind === 'ellipse') {
      ctx.strokeStyle = it.stroke; ctx.lineWidth = it.lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath();
      var n = 64, j = it.rough ? 0.02 : 0;
      for (i = 0; i <= n; i++) {
        a = i / n * Math.PI * 2 + (it.kind === 'ellipse' ? -0.3 : 0);
        ctx.lineTo(it.cx + Math.cos(a) * it.rx * (1 + rng.range(-j, j)), it.cy + Math.sin(a) * it.ry * (1 + rng.range(-j, j)));
      }
      if (it.kind === 'ellipse') ctx.lineTo(it.cx + Math.cos(0.15) * it.rx * 1.05, it.cy + Math.sin(0.15) * it.ry * 1.05);
      ctx.stroke();
      if (it.kind === 'bubble') {
        ctx.beginPath(); ctx.moveTo(it.cx - it.rx * 0.45, it.cy + it.ry * 0.88); ctx.lineTo(it.tx, it.ty); ctx.lineTo(it.cx - it.rx * 0.2, it.cy + it.ry * 0.97); ctx.stroke();
      }
    }
    ctx.restore();
  }

  function paintItem(ctx, P, it, month) {
    var t, rng, i, k;
    ctx.save();
    if (it.layer === 'B' && P.misreg) ctx.translate(P.misreg.dx, P.misreg.dy);
    if (it.mult && !(lum(P.paper) < 0.2)) ctx.globalCompositeOperation = 'multiply';
    if (it.k === 'rect') {
      if (it.rot) { ctx.translate(it.x + it.w / 2, it.y + it.h / 2); ctx.rotate(it.rot); ctx.translate(-(it.x + it.w / 2), -(it.y + it.h / 2)); }
      if (it.alpha != null) ctx.globalAlpha = it.alpha;
      ctx.beginPath();
      if (it.r) roundRect(ctx, it.x, it.y, it.w, it.h, it.r); else ctx.rect(it.x, it.y, it.w, it.h);
      if (it.fill) { ctx.fillStyle = it.fill; ctx.fill(); }
      if (it.stroke) { ctx.strokeStyle = it.stroke; ctx.lineWidth = it.lw || 2; ctx.stroke(); }
    } else if (it.k === 'rule') {
      ctx.strokeStyle = it.ink; ctx.lineWidth = it.lw; ctx.beginPath(); ctx.moveTo(it.x1, it.y1); ctx.lineTo(it.x2, it.y2); ctx.stroke();
    } else if (it.k === 'text') {
      paintText(ctx, P, it);
    } else if (it.k === 'pic') {
      paintPic(ctx, P, it, month);
    } else if (it.k === 'photo') {
      paintPhoto(ctx, P, it);
    } else if (it.k === 'burst') {
      paintBurst(ctx, it);
    } else if (it.k === 'dots') {
      paintDots(ctx, it);
    } else if (it.k === 'motif') {
      t = draw('motif');
      ok: {
        if (t) { try { t(ctx, it.id, it.x, it.y, it.size, { rng: SB.rng.make(it.seed), ink: it.ink, rotate: it.rot || 0, rough: !!it.rough }); break ok; } catch (e) { /* fallback */ } }
        ctx.fillStyle = it.ink; starPath(ctx, it.x, it.y, it.size / 2); ctx.fill();
      }
    } else if (it.k === 'tape') {
      t = draw('tape');
      ok2: {
        if (t) { try { t(ctx, it.x, it.y, it.w, it.angle, { rng: SB.rng.make(it.seed) }); break ok2; } catch (e) { /* fallback */ } }
        ctx.translate(it.x, it.y); ctx.rotate(it.angle); ctx.fillStyle = 'rgba(232,226,200,0.72)'; ctx.fillRect(-it.w / 2, -14, it.w, 28);
      }
    } else if (it.k === 'shape') {
      paintShape(ctx, it);
    } else if (it.k === 'greek') {
      rng = SB.rng.make('greek:' + it.x + ':' + it.y);
      ctx.translate(it.x + it.w / 2, it.y + it.h / 2); ctx.rotate(it.rot || 0); ctx.translate(-it.w / 2, -it.h / 2);
      ctx.fillStyle = PAPER.newsprint; ctx.fillRect(0, 0, it.w, it.h);
      ctx.fillStyle = 'rgba(26,26,26,0.45)';
      for (k = 0; k < 3; k++) for (i = 8; i < it.h - 6; i += 7) ctx.fillRect(6 + k * (it.w / 3), i, (it.w / 3 - 12) * rng.range(0.5, 1), 3);
    } else if (it.k === 'checker') {
      ctx.translate(it.x, it.y); ctx.rotate(it.rot || 0); ctx.fillStyle = INK.toner;
      for (i = 0; i * it.h / 2 < it.w; i++) for (k = 0; k < 2; k++) if ((i + k) % 2 === 0) ctx.fillRect(i * it.h / 2, k * it.h / 2, it.h / 2, it.h / 2);
    } else if (it.k === 'lines') {
      ctx.strokeStyle = it.ink; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.6; ctx.beginPath();
      if (it.kind === 'rule') { for (i = 120; i < H; i += 34) { ctx.moveTo(0, i); ctx.lineTo(W, i); } ctx.stroke(); ctx.strokeStyle = '#E58C8C'; ctx.beginPath(); ctx.moveTo(48, 0); ctx.lineTo(48, H); }
      else { for (i = 0; i < W; i += 20) { ctx.moveTo(i, 0); ctx.lineTo(i, H); } for (i = 0; i < H; i += 20) { ctx.moveTo(0, i); ctx.lineTo(W, i); } }
      ctx.stroke();
    } else if (it.k === 'grid') {
      ctx.strokeStyle = it.ink; ctx.lineWidth = it.lw; ctx.beginPath();
      for (i = 0; i <= it.cols; i++) { ctx.moveTo(it.x + i * it.cw, it.y); ctx.lineTo(it.x + i * it.cw, it.y + it.rows * it.rh); }
      for (i = 0; i <= it.rows; i++) { ctx.moveTo(it.x, it.y + i * it.rh); ctx.lineTo(it.x + it.cols * it.cw, it.y + i * it.rh); }
      ctx.stroke();
    } else if (it.k === 'border') {
      ctx.font = fontStr('type', '400', it.size / CAP.type); ctx.fillStyle = it.ink;
      for (i = 24; i < W - 24; i += it.size * 1.1) { ctx.fillText(it.ch, i, 38); ctx.fillText(it.ch, i, H - 18); }
      for (i = 60; i < H - 40; i += it.size * 1.3) { ctx.fillText(it.ch, 20, i); ctx.fillText(it.ch, W - 38, i); }
    } else if (it.k === 'squiggle') {
      rng = SB.rng.make(it.seed);
      ctx.strokeStyle = it.ink; ctx.lineWidth = it.lw; ctx.lineCap = 'round'; ctx.beginPath();
      for (i = 0; i <= 30; i++) ctx.lineTo(it.x + it.w * i / 30, it.y + Math.sin(i * 1.3) * 5 + rng.range(-1, 1));
      ctx.stroke();
    } else if (it.k === 'spray') {
      rng = SB.rng.make(it.seed); ctx.fillStyle = it.ink; ctx.globalAlpha = 0.15;
      for (i = 0; i < it.n; i++) {
        var ex = rng.chance(0.5), px = it.x + rng.range(0, it.w), py = it.y + (ex ? (rng.chance(0.5) ? 0 : it.h) : rng.range(0, it.h));
        ctx.fillRect(px + rng.normal(0, 6), py + rng.normal(0, 6), 1.6, 1.6);
      }
      ctx.globalAlpha = 1;
      for (i = 0; i < 2; i++) if (rng.chance(0.5)) { var dx = it.x + rng.range(0, it.w), dl = rng.range(20, 60); ctx.fillRect(dx, it.y + it.h - 2, 3, dl); ctx.beginPath(); ctx.arc(dx + 1.5, it.y + it.h + dl, 3.5, 0, Math.PI * 2); ctx.fill(); }
    } else if (it.k === 'splash') {
      rng = SB.rng.make(it.seed); ctx.fillStyle = it.ink; ctx.globalAlpha = 0.85; ctx.globalCompositeOperation = 'multiply';
      ctx.beginPath(); ctx.arc(it.x, it.y, it.r, 0, Math.PI * 2); ctx.fill();
      for (i = 0; i < 9; i++) { var a = rng.range(0, Math.PI * 2), d = it.r * rng.range(1.1, 2); ctx.beginPath(); ctx.arc(it.x + Math.cos(a) * d, it.y + Math.sin(a) * d, rng.range(3, it.r * 0.25), 0, Math.PI * 2); ctx.fill(); }
    } else if (it.k === 'brick') {
      rng = SB.rng.make(it.seed); var bw = 120, bh = 46, r, c;
      ctx.fillStyle = '#D9CFC0'; ctx.fillRect(0, 0, W, H);
      for (r = 0; r * bh < H; r++) for (c = -1; c * bw < W; c++) {
        ctx.fillStyle = mixHex('#9C3B27', '#7A2E1F', rng.range(0, 1));
        ctx.fillRect(c * bw + (r % 2 ? bw / 2 : 0) + 3, r * bh + 3, bw - 6, bh - 6);
      }
    }
    ctx.restore();
  }

  /* The photocopy pass (art.md 4.7), on near-gray pixels only (the toner layer); spot colors keep their ink. */
  function copyPass(ctx, cw, ch, g, seed, paperHex, strength) {
    if (!ctx.getImageData || !ctx.putImageData || cw < 2 || ch < 2) return;
    var img;
    try { img = ctx.getImageData(0, 0, cw, ch); } catch (e) { return; }
    if (!img || !img.data) return;
    var d = img.data, rng = SB.rng.make(seed + ':px'), amp = 0.04 * g, gain = 1 + 0.45 * g, cell = 12, gw = Math.ceil(cw / cell) + 2,
        gh = Math.ceil(ch / cell) + 2, grid = new Float32Array(gw * gh), s0 = rng.int(1, 100000), i, x, y, idx, r, gg, b, mx, mn, L, gx, gy, x0, y0, fx, fy, nl, nh, v, t, out,
        pr = rgb(paperHex), dark = lum(paperHex) < 0.2, lo = dark ? pr : rgb(INK.toner), hi = dark ? rgb(PAPER.copyWhite) : pr, hv;
    for (i = 0; i < grid.length; i++) grid[i] = rng.next() * 2 - 1;
    for (y = 0; y < ch; y++) {
      gy = y / cell; y0 = gy | 0; fy = gy - y0;
      for (x = 0; x < cw; x++) {
        idx = (y * cw + x) * 4;
        r = d[idx]; gg = d[idx + 1]; b = d[idx + 2];
        mx = r > gg ? (r > b ? r : b) : (gg > b ? gg : b); mn = r < gg ? (r < b ? r : b) : (gg < b ? gg : b);
        if (mx - mn > 40) continue;
        L = (0.299 * r + 0.587 * gg + 0.114 * b) / 255;
        gx = x / cell; x0 = gx | 0; fx = gx - x0;
        nl = (grid[y0 * gw + x0] * (1 - fx) + grid[y0 * gw + x0 + 1] * fx) * (1 - fy) + (grid[(y0 + 1) * gw + x0] * (1 - fx) + grid[(y0 + 1) * gw + x0 + 1] * fx) * fy;
        hv = Math.imul(x + s0, 374761393) ^ Math.imul(y, 668265263);
        hv = Math.imul(hv ^ (hv >>> 13), 1274126177);
        nh = ((hv ^ (hv >>> 16)) >>> 0) / 4294967296 * 2 - 1;
        v = (L - 0.5) * gain + 0.5 + amp * (0.55 * nh + 0.45 * nl);
        v = v < 0 ? 0 : v > 1 ? 1 : v;
        t = (v - 0.47) / 0.06; t = t < 0 ? 0 : t > 1 ? 1 : t; t = t * t * (3 - 2 * t);
        out = v + (t - v) * strength;
        d[idx] = lo[0] + (hi[0] - lo[0]) * out; d[idx + 1] = lo[1] + (hi[1] - lo[1]) * out; d[idx + 2] = lo[2] + (hi[2] - lo[2]) * out;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  /* A sheet that has been handled: folded in half or thirds (a light ridge with a shadow beside it), a corner rubbed. */
  function paintWear(ctx, rng, paperHex) {
    var dark = lum(paperHex) < 0.2, n = rng.pick([0, 1, 1, 2]), i, v, p, j;
    for (i = 0; i < n; i++) {
      v = rng.chance(0.6); p = (v ? H : W) * (n === 2 ? (i + 1) / 3 : 0.5) + rng.range(-12, 12);
      ctx.save(); ctx.lineWidth = 2.2;
      for (j = 0; j < 2; j++) {
        ctx.strokeStyle = j === 0 ? (dark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.55)') : (dark ? 'rgba(0,0,0,0.5)' : 'rgba(60,55,45,0.16)');
        ctx.beginPath();
        if (v) { ctx.moveTo(0, p + j * 2.5); ctx.lineTo(W, p + j * 2.5 + rng.range(-6, 6)); } else { ctx.moveTo(p + j * 2.5, 0); ctx.lineTo(p + j * 2.5 + rng.range(-6, 6), H); }
        ctx.stroke();
      }
      ctx.restore();
    }
    if (rng.chance(0.4) && ctx.createRadialGradient) {
      var cx = rng.pick([0, W]), cy = rng.pick([0, H]), gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, 260);
      gr.addColorStop(0, dark ? 'rgba(255,255,255,0.07)' : 'rgba(120,100,70,0.14)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
    }
  }

  function paint(ctx, P, spec, scale, grit, cw, ch) {
    var R = P.R, i, rng, tex, g = R.grit, ang;
    FONTS = fonts();
    ctx.save();
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
    ctx.fillStyle = P.paper; ctx.fillRect(0, 0, W, H);
    ctx.save();
    if (grit) { ang = clamp(R.skew * 0.35 * g, -1.5, 1.5) * Math.PI / 180; ctx.translate(W / 2, H / 2); ctx.rotate(ang); ctx.translate(-W / 2, -H / 2); }
    for (i = 0; i < P.items.length; i++) paintItem(ctx, P, P.items[i], spec.month || 1);
    ctx.restore();
    ctx.restore();
    if (!grit) return;
    copyPass(ctx, cw, ch, g, R.gritSeed, P.paper, clamp(scale * 1.2, 0.35, 1));
    ctx.save();
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    rng = SB.rng.make(R.gritSeed);
    tex = draw('texture');
    if (tex) {
      [['grain', 0.1 + 0.06 * g], ['toner', 0.08 * g], ['speckle', 0.12 * g]].concat(g >= 3 ? [['streak', 0.25 + 0.05 * g]] : []).forEach(function (k) {
        try { tex(ctx, k[0], 0, 0, W, H, { rng: rng, amount: clamp(k[1], 0, 1), ink: INK.toner }); } catch (e) { /* skip that texture */ }
      });
    }
    paintWear(ctx, rng, P.paper);
    if (g >= 3) {
      var edge = rng.int(0, 3), wd = rng.range(10, 30), gr;
      if (ctx.createLinearGradient) {
        gr = edge === 0 ? ctx.createLinearGradient(0, 0, wd, 0) : edge === 1 ? ctx.createLinearGradient(W, 0, W - wd, 0) : edge === 2 ? ctx.createLinearGradient(0, 0, 0, wd) : ctx.createLinearGradient(0, H, 0, H - wd);
        gr.addColorStop(0, 'rgba(40,40,38,0.35)'); gr.addColorStop(1, 'rgba(40,40,38,0)');
        ctx.fillStyle = gr;
        if (edge === 0) ctx.fillRect(0, 0, wd, H); else if (edge === 1) ctx.fillRect(W - wd, 0, wd, H); else if (edge === 2) ctx.fillRect(0, 0, W, wd); else ctx.fillRect(0, H - wd, W, wd);
      }
    }
    ctx.restore();
  }

  /* ------------------------------------------------------------------ */
  /* The public functions (05-interface 6.3)                             */
  /* ------------------------------------------------------------------ */

  function legible(r, spec) {
    var c = check(r, spec);
    if (c.hard.length && r.template !== 'T9') {
      r.template = 'T9'; r.variant = 0;
      r.got = resolve(r, spec).got;
    }
    return r;
  }

  function recipe(spec, opts) {
    if (!spec) SB.fail('Flyer.recipe', 'no spec');
    opts = opts || {};
    var pk = pickTemplate(spec, 0), r = { v: 1, renderer: RENDERER, template: pk.template, variant: pk.variant,
                                           roll: { layout: 0, type: 0, ink: 0, paper: 0, picture: 0, grit: 0, extras: 0 }, lock: [], over: {} };
    if (opts.template && VARIANTS[opts.template] && !forcedT9(spec) && (opts.template !== 'T10' || (spec.route && spec.route.length))) {
      r.template = opts.template;
      r.variant = SB.rng.make((spec.seed || 'flyer') + ':layout:0:' + opts.template).int(0, VARIANTS[opts.template] - 1);
    }
    r.got = resolve(r, spec).got;
    return legible(r, spec);
  }

  function roll(rec, spec, aspects) {
    if (!spec) SB.fail('Flyer.roll', 'no spec');
    var r = rec ? copy(rec) : recipe(spec), list = aspects && aspects.length ? aspects : ASPECTS, pk;
    r.roll = r.roll || {}; r.over = r.over || {}; r.lock = r.lock || [];
    list.forEach(function (a) {
      if (ASPECTS.indexOf(a) < 0 || has(r.lock, a)) return;
      r.roll[a] = (r.roll[a] || 0) + 1;
      if (a === 'layout') { pk = pickTemplate(spec, r.roll.layout); r.template = pk.template; r.variant = pk.variant; }
      if (a === 'type') delete r.over.treatment;
      if (a === 'ink') delete r.over.inkPair;
      if (a === 'paper') delete r.over.paper;
      if (a === 'picture') { delete r.over.picture; delete r.over.motif; }
      if (a === 'grit') delete r.over.grit;
    });
    if (forcedT9(spec)) { r.template = 'T9'; r.variant = 0; }
    r.got = resolve(r, spec).got;
    return legible(r, spec);
  }

  function setup(canvas, opts) {
    var dpr = clamp(opts.dpr || 1, 1, 2), w = opts.width || canvas.width || W, cw = Math.max(1, Math.round(w * dpr)), ch = Math.max(1, Math.round(w * H / W * dpr));
    if (canvas.width !== cw) canvas.width = cw;
    if (canvas.height !== ch) canvas.height = ch;
    if (canvas.style && opts.width) { canvas.style.width = w + 'px'; canvas.style.height = Math.round(w * H / W) + 'px'; }
    return { cw: cw, ch: ch, scale: cw / W };
  }

  function render(canvas, rec, spec, opts) {
    if (!canvas || !canvas.getContext) SB.fail('Flyer.render', 'no canvas');
    if (!spec) SB.fail('Flyer.render', 'no spec');
    opts = opts || {};
    var r = rec || recipe(spec), s = setup(canvas, opts), ctx = canvas.getContext('2d'), P, got, tok;
    FONTS = fonts();
    P = plan(r, spec, measurer(ctx));
    PENDING = [];
    try { paint(ctx, P, spec, s.scale, opts.grit !== false, s.cw, s.ch); } finally { got = PENDING; PENDING = null; }
    /* a photo not in yet: load it, then draw this canvas again (unless something else has been drawn on it since) */
    tok = canvas.__sbFlyer = (canvas.__sbFlyer || 0) + 1;
    if (got.length && SB.Scenes && typeof SB.Scenes.loadCuts === 'function' && !opts.noWait) {
      SB.Scenes.loadCuts(got, function () {
        if (canvas.__sbFlyer !== tok) return;
        if (!got.some(function (id) { return cutImg(id); })) return;
        render(canvas, r, spec, Object.assign({}, opts, { noWait: true }));
        if (opts.onRedraw) opts.onRedraw(canvas);
      });
    }
    return got.length === 0;
  }

  /* need(rec, spec, cb): load every photo this flyer uses, then cb() (at once if there are none or they are in). */
  function need(rec, spec, cb) {
    var P = plan(rec || recipe(spec), spec, measurer()), ids = [];
    P.items.forEach(function (it) { var id = it.k === 'photo' ? it.id : it.k === 'pic' ? it.cut : null; if (id && ids.indexOf(id) < 0) ids.push(id); });
    if (!ids.length || !SB.Scenes || typeof SB.Scenes.loadCuts !== 'function') { if (cb) cb(); return; }
    SB.Scenes.loadCuts(ids, function () { if (cb) cb(); });
  }

  var CACHE = new Map(), CACHE_MAX = 80;
  function thumb(rec, spec, width) {
    width = width || 170;
    /* width is in stage units (--p): drawn as fine as the screen needs (SB.Finish.res), shown at that many --p */
    var res = SB.Finish && SB.Finish.res ? SB.Finish.res() : ((typeof window !== 'undefined' && window.devicePixelRatio) || 1),
        key = (spec && spec.showId) + '|' + SB.rng.hash(JSON.stringify(spec || {})) + '|' + JSON.stringify(rec || null) + '|' + width + '@' + res, src, out, ctx;
    src = CACHE.get(key);
    if (src) { CACHE.delete(key); CACHE.set(key, src); }
    else {
      src = document.createElement('canvas');
      var whole = render(src, rec, spec, { width: width, dpr: res,
                                           onRedraw: function () {
                                             CACHE.set(key, src);
                                             if (out && out.getContext) { var oc = out.getContext('2d'); oc.clearRect(0, 0, out.width, out.height); oc.drawImage(src, 0, 0); }
                                           } });
      if (whole) CACHE.set(key, src);
      while (CACHE.size > CACHE_MAX) CACHE.delete(CACHE.keys().next().value);
    }
    out = document.createElement('canvas');
    out.width = src.width; out.height = src.height;
    if (out.style) { out.style.width = 'calc(var(--p, 1px) * ' + width + ')'; out.style.height = 'auto'; }
    ctx = out.getContext('2d');
    if (ctx && ctx.drawImage) ctx.drawImage(src, 0, 0);
    out.setAttribute('role', 'img');
    out.setAttribute('aria-label', text(spec));
    return out;
  }

  function text(spec) {
    if (!spec) return '';
    var parts = [], bands, d = spec.date, when, ages;
    bands = (spec.billing || []).map(function (b) {
      // SPEC? "bands with homes": the home is printed for touring bands, as on the flyer (art.md 4.1)
      return String(b.name || '') + (b.unconfirmed ? '?' : '') + (b.touring && b.home ? ' (' + b.home + ')' : '');
    });
    if (spec.tba) bands.push(lab('flyer.tba', {}, '+ more TBA'));
    parts.push(lab('flyer.presents', { name: spec.presenter || '' }, (spec.presenter || '') + ' presents') + ': ' + bands.join(', ') + '.');
    when = d ? (d.dowLong || d.dow || '') + ' ' + (d.monthLong || d.mon || '') + ' ' + d.d : '';
    if (spec.doors) when += ', ' + lab('flyer.doors', { t: spec.doors }, 'doors ' + spec.doors);
    if (when) parts.push(when + '.');
    if (spec.room) parts.push(spec.room.name + (spec.room.address ? ', ' + spec.room.address : '') + '.');
    if (spec.price) parts.push(spec.price.text + (spec.price.noOneTurned ? ', ' + lab('flyer.noOneTurned', {}, 'no one turned away for lack of funds') : '') + '.');
    ages = spec.agesText || 'ALL AGES';
    parts.push(ages.charAt(0) + ages.slice(1).toLowerCase() + '.');
    return parts.join(' ');
  }

  var SOFT = {
    dateSmall: 'the date is small', agesSmall: 'the ages are small', headliner: 'the top band is not the biggest thing on it',
    grit: 'small type will not survive five copies', crowded: 'more than five bands: it reads crowded'
  };

  function check(rec, spec) {
    if (!spec) SB.fail('Flyer.check', 'no spec');
    var r = rec || recipe(spec), P = plan(r, spec, measurer()), hard = [], soft = [], seen = { presenter: null, room: null, date: null, price: null, ages: null },
        bands = {}, maxOther = 0, n = (spec.billing || []).length, k, fx;
    P.items.forEach(function (it) {
      if (it.k !== 'text' || it.deco || !it.text) return;
      (it.fields || [it.field]).forEach(function (f) {
        if (f === 'band') { if (!bands[it.idx] || it.size > bands[it.idx].size) bands[it.idx] = it; }
        else if (Object.prototype.hasOwnProperty.call(seen, f)) { if (!seen[f] || it.size > seen[f].size) seen[f] = it; }
      });
      if (it.field !== 'band' || it.idx !== 0) maxOther = Math.max(maxOther, it.size);
      if (contrast(it.ink, groundOf(P, it)) < 4.5) hard.push('contrast:' + it.field);
    });
    if (spec.presenter && !seen.presenter) hard.push('missing:presenter');
    for (k = 0; k < n; k++) if (!bands[k]) hard.push('missing:band');
    if (spec.room && !seen.room) hard.push('missing:room');
    ['date', 'price', 'ages'].forEach(function (f) {
      if (!seen[f]) hard.push('missing:' + f);
      else if (seen[f].size < 29.5) hard.push('size:' + f);
    });
    function fix(o) { fx = copy(r); fx.over = Object.assign(fx.over || {}, o); return fx; }
    if (seen.date && seen.date.size < 44) soft.push({ k: 'dateSmall', text: SOFT.dateSmall, fix: r.over && r.over.big ? null : fix({ big: true }) });
    if (seen.ages && seen.ages.size < 44) soft.push({ k: 'agesSmall', text: SOFT.agesSmall, fix: r.over && r.over.big ? null : fix({ big: true }) });
    if (bands[0] && maxOther > bands[0].size * 1.01) soft.push({ k: 'headliner', text: SOFT.headliner, fix: null });
    if ((P.R.grit || 1) >= 5 && bands[0] && bands[0].size < 60) soft.push({ k: 'grit', text: SOFT.grit, fix: fix({ grit: 4 }) });
    if (n > 5) soft.push({ k: 'crowded', text: SOFT.crowded, fix: null });
    hard = hard.filter(function (h, i) { return hard.indexOf(h) === i; });
    return { ok: hard.length === 0, hard: hard, soft: soft, sizes: { date: seen.date ? seen.date.size : 0, price: seen.price ? seen.price.size : 0, ages: seen.ages ? seen.ages.size : 0 } };
  }

  function learn(houseStyle, rec) {
    var hs = copy(houseStyle) || {}, g = rec && rec.got ? rec.got : {}, o = rec && rec.over ? rec.over : {};
    ['templates', 'inks', 'papers', 'treatments'].forEach(function (k) { if (!hs[k] || typeof hs[k] !== 'object') hs[k] = {}; });
    function add(tally, key) { if (key) tally[key] = (tally[key] || 0) + 1; }
    if (!rec) return hs;
    add(hs.templates, rec.template);
    (o.inkPair || g.inks || []).forEach(function (i) { if (i && i !== 'toner') add(hs.inks, i); });
    add(hs.papers, o.paper || g.paper);
    add(hs.treatments, o.treatment || g.treatment);
    hs.last = [rec.template].concat(hs.last || []).slice(0, 2);
    return hs;
  }

  function sample(seedString) {
    /* names come from the style pools (content/bandNames.js); a style's flyer family is its parent genre's */
    var N = (SB.Content && SB.Content.names) || {}, r = SB.rng.make('sample:' + seedString), BN = (SB.Content && SB.Content.bandNames && SB.Content.bandNames.styles) || {}, byGenre = {},
        SG = SB.Enums.STYLE_GENRE || {}, genres,
        idx = SB.CityIndex || [], city = idx.length ? r.pick(idx) : null, n = r.int(2, 5), used = {}, billing = [], i, g, name, b, fam = {}, day, t, spec, kind, colors, ages, room, homeCity, tries = 0;
    Object.keys(BN).forEach(function (st) { if (BN[st] && BN[st].length) byGenre[st] = BN[st]; });
    genres = Object.keys(byGenre);
    if (!genres.length) genres = ['hardcore'];
    for (i = 0; i < n; i++) {
      g = r.pick(genres);
      name = byGenre[g] ? r.pick(byGenre[g]) : 'Band ' + i;
      g = SG[g] || g;
      if (used[name] || (SB.text && SB.text.nameOk && !SB.text.nameOk(name, [], 'band'))) { if (++tries > 30) break; i--; continue; }   /* never a real well-known band on a sample flyer */
      used[name] = true;
      homeCity = idx.length ? r.pick(idx) : null;
      b = { bandId: 'x' + i, name: name, genre: g, family: SB.Enums.GENRE_FAMILY[g] || 'FAST', unconfirmed: i > 0 && r.chance(0.1),
            touring: i === 0 && r.chance(0.6), home: '', oneLiner: '' };
      if (b.touring && homeCity) b.home = homeCity.name + ', ' + homeCity.state;
      else if (city) b.home = city.name;
      if (SB.text && SB.text.has && SB.text.has('strings.flyer.oneLiner')) b.oneLiner = SB.text.line('strings.flyer.oneLiner', { n: r.int(2, 5), home: b.home, plain: g }, r);
      billing.push(b);
      fam[b.family] = (fam[b.family] || 0) + (i === 0 ? 0.5 : 0.5 / Math.max(1, n - 1));
    }
    if (billing.length === 1) { fam = {}; fam[billing[0].family] = 1; }
    day = r.int(0, 360);
    t = SB.time && SB.time.date ? SB.time.date(day) : { m: 2, d: 18, y: 2027 };
    kind = r.pick(['HOUSE', 'HOUSE', 'DIY', 'BAR', 'HALL']);
    colors = N.shared && N.shared.color ? N.shared.color : ['Yellow', 'Blue', 'Green'];
    room = 'the ' + r.pick(colors) + ' ' + (kind === 'HOUSE' ? r.pick(['House', 'Carport', 'Porch', 'Basement', 'Garage']) : kind === 'DIY' ? 'Room' : kind === 'BAR' ? 'Lounge' : 'Hall');
    ages = r.pick(['ALL', 'ALL', 'ALL', '21', '18']);
    var MONTHS = (SB.time && SB.time.MONTHS) || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var dow = SB.time && SB.time.fmt ? SB.time.fmt(day, 'dow') : 'Friday';
    var route = null;
    if (billing[0].touring && idx.length && r.chance(0.5)) {
      route = [];
      for (i = 0; i < 5; i++) {
        var c = i === 2 && city ? city : r.pick(idx), dd = SB.time && SB.time.date ? SB.time.date(day - 2 + i) : { m: t.m, d: t.d - 2 + i };
        route.push({ text: MONTHS[dd.m - 1].slice(0, 3).toUpperCase() + ' ' + dd.d + ' ' + String(c.name).toUpperCase() + ' ' + c.state, here: i === 2 });
      }
    }
    var price = r.chance(0.2) ? { text: '$' + r.int(5, 8) + '–' + r.int(10, 15), donation: true, noOneTurned: true } : { text: '$' + r.int(5, 15), donation: false, noOneTurned: false };
    spec = {
      showId: 'sample-' + seedString, seed: 'sample:' + seedString,
      presenter: N.booking && N.booking.whole ? r.pick(N.booking.whole) : 'Back Gate Shows',
      mark: { v: 1, seed: 'm' + seedString, treatment: r.pick(['marker', 'block', 'bubble', 'stencil']) },
      billing: billing, tba: r.chance(0.2),
      date: { day: day, dow: dow.slice(0, 3).toUpperCase(), dowLong: dow, mon: MONTHS[t.m - 1].slice(0, 3).toUpperCase(), monthLong: MONTHS[t.m - 1], d: t.d, y: t.y },
      doors: String(r.int(6, 8)), times: r.chance(0.6) ? ['7:30', '8:15', '9:00', '9:50'].slice(0, n) : null, done: null,
      room: { name: room, kind: kind, address: kind === 'HOUSE' || kind === 'DIY' ? lab('flyer.askAPunk', {}, 'ask a punk for the address') : null },
      price: price, ages: ages, agesText: lab('ages.' + ages, {}, ages === 'ALL' ? 'ALL AGES' : ages + '+'),
      label: 'NORMAL', tags: r.chance(0.25) ? [r.pick(Object.keys(SB.Enums.FLYER_TAG))] : [],
      rules: r.chance(0.5) ? lab('flyer.rules', {}, 'be cool or be gone') : null,
      route: route, families: fam, month: t.m,
      style: city ? { inks: city.inks || [], papers: city.paper ? [city.paper] : [], cityInks: city.inks || [], cityPaper: city.paper || null } : {},
      houseStyle: {}, maker: { id: 'player', name: null, taste: null },
      finish: r.pick(['STANDARD', 'STANDARD', 'STANDARD', 'SHARP', 'ROUGH']), plain: false
    };
    return { recipe: recipe(spec), spec: spec };
  }

  /* Knob data for the desk (not in the manifest; used by flyerdesk.js). */
  function options(rec, spec) {
    var t = rec ? rec.template : 'T9', F = fams(spec || {}), list = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T11', 'T12', 'T13', 'T14', 'T9'], pairs = [], mains, accs;
    if (spec && spec.route && spec.route.length) list.push('T10');
    mains = MAIN_T[t] || ['toner']; accs = ACC_T[t] || ['copyGray'];
    mains.forEach(function (m) { accs.forEach(function (a) { if (m !== a) pairs.push([m, a]); }); });
    Object.keys(INK).forEach(function (a) { if (pairs.length < 8 && a !== 'toner' && !pairs.some(function (p) { return p[1] === a; })) pairs.push(['toner', a]); });
    pairs.sort(function (x, y) { return famBias(F, FAM_INK, y[1]) - famBias(F, FAM_INK, x[1]); });
    return { templates: forcedT9(spec || {}) ? ['T9'] : list, variants: VARIANTS, treatments: TREAT[t] || [], inkPairs: pairs.slice(0, 8), allInks: Object.keys(INK),
             papers: Object.keys(PAPER), pictures: Object.keys(SB.Enums.PICTURE), motifs: Object.keys(SB.Enums.MOTIF), aspects: ASPECTS.slice() };
  }

  /* Register the thumbnail part (05-interface 1.1). */
  if (SB.UI && typeof SB.UI.part === 'function' && !SB.UI.parts.flyerThumb) {
    SB.UI.part('flyerThumb', function (flyer, width) {
      width = width || 170;
      var wrap = document.createElement('div'), tilt, c, blank;
      wrap.className = 'sb-flyer-thumb';
      wrap.style.width = 'calc(var(--p, 1px) * ' + width + ')';
      tilt = flyer && flyer.spec ? SB.rng.make('tilt:' + flyer.spec.showId).range(-1.2, 1.2) : -0.6;
      wrap.style.transform = 'rotate(' + tilt.toFixed(2) + 'deg)';
      if (!flyer || !flyer.spec) {
        blank = document.createElement('div');
        blank.className = 'sb-flyer-blank';
        blank.style.height = 'calc(var(--p, 1px) * ' + Math.round(width * H / W) + ')';
        blank.textContent = uiLabel('blank', 'no flyer yet');
        wrap.appendChild(blank);
        return wrap;
      }
      try { c = thumb(flyer.recipe || null, flyer.spec, width); wrap.appendChild(c); }
      catch (e) {
        SB.log('error', 'Flyer.flyerThumb', String(e && e.message ? e.message : e));
        wrap.textContent = text(flyer.spec);
      }
      return wrap;
    });
  }

  return { recipe: recipe, roll: roll, render: render, need: need, thumb: thumb, text: text, check: check, learn: learn, sample: sample,
           options: options,
           /* Recompute what a hand-edited recipe resolves to (the desk's knobs set `over`), keeping it legible. */
           settle: function (rec, spec) { var r = copy(rec); r.over = r.over || {}; r.lock = r.lock || []; r.got = resolve(r, spec).got; return legible(r, spec); },
           plan: function (rec, spec) { return plan(rec || recipe(spec), spec, measurer()); },
           colors: function () { return { inks: copy(INK), papers: copy(PAPER) }; }, RENDERER: RENDERER,
           _clash: function (rec, spec, off) { NOCLASH = !!off; try { return clashes(plan(rec, spec, measurer())); } finally { NOCLASH = false; } } };
});
