/* Scene Booker — ui/screens/notebook.js (the composition book close-up, 07-desk.md sections 2 and 2b)
 * Opened, the composition book is a spread of ruled pages in the booker's own hand and typewriter. Index tabs cut into
 * the edge of the right page move between sections. The left page is the section: what goes with what is a hand-ruled
 * grid of sounds where a cell is a tick, a cross or a question mark that fades in as it becomes known (CROWDS, NIGHTS,
 * HEAR); rooms, bands, nights and towns are margin notes, each a ruled line with its name on a label strip and a range
 * drawn as a scribbled bracket that tightens as you learn; what is moving in town is a little hand-drawn chart per sound
 * with a marker arrow; the people you will not book are torn scraps. Rumors are in pencil, things seen in pen, things
 * known underlined twice. What is new since the book was last opened carries a highlighter swipe. The right page is the
 * entry you are reading.
 * One sign per kind of action (2b): an index tab or tear-off tab chooses, a label strip opens, a grid square opens its
 * entry. Reading matter carries none of them.
 * Reads Notebook.pages / entry / tally, Trends.signs, Harm.list / current. Actions: Harm.remove, Harm.act, through
 * SB.UI.act. Nothing here is computed: every finding, range and word comes from the engine's pages.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.notebook = {
    title: 'Notes',
    empty: {
      CROWDS: 'nothing here yet. you learn what crowds mix by putting them on one bill.',
      BANDS: 'nothing here yet. you learn a band by booking them.',
      ROOMS: 'nothing here yet. you learn a room by booking it.',
      NIGHTS: 'nothing here yet. you learn a night by running it.',
      HEAR: 'nothing here yet. you learn how people hear by telling them.',
      DOOR: 'nothing here yet. you learn what people will pay at the door.',
      TOWNS: 'nothing here yet. you learn a town by playing to it.',
      MOVING: 'nothing here yet. watch what people ask for and what they stop asking for.',
      PEOPLE: 'nothing here yet. you learn people by working with them.',
      HOW: 'nothing here yet. terms land here the first time you meet them.',
      CHAPTERS: 'pick one to look at it again.',
      LIST: 'nobody. this page is for the people you will not book, and why.'
    },
    pickCell: 'pick a square or a note to read what you know',
    scrap: {
      CROWDS: 'who stands next to who. fill it in one bill at a time.',
      BANDS: 'what a band does when the room is not theirs.',
      ROOMS: 'every room has a wall that sounds wrong. find it.',
      NIGHTS: 'write it down before the van is loaded.',
      HEAR: 'ask them. they will tell you more than the numbers.',
      DOOR: 'the door tells the truth, even when the crowd does not.',
      TOWNS: 'a town is just a lot of people who already know each other.',
      MOVING: 'keep watching what people ask for.',
      PEOPLE: 'the ones who show up early and leave late.',
      HOW: 'terms, as they come up.',
      LIST: 'a short list. keep it short.',
      CHAPTERS: 'the story so far.'
    },
    scrapOpen: 'nothing written on this page yet, so the first thing you learn goes here.',
    finding: 'What you found',
    evidence: 'where it came from',
    related: 'see also',
    week: 'wk {n}',
    contested: 'people disagree',
    stale: 'last seen {n} months ago',
    newSince: 'new since you last looked',
    sign: 'Signs',
    noSigns: 'no signs yet.',
    jobsDone: 'jobs you have done, and why they matter',
    callTally: 'your calls this year',
    tallyLine: '{inside} of {shows} shows came inside your call.',
    tallyWidth: 'your calls were {now} wide this year and {then} wide last year.',
    listRemove: 'take them off',
    listRemoveSay: 'Take {name} off the list',
    listSince: 'since wk {n}',
    listMet: 'met',
    listWas: 'was in',
    openMatter: 'something is still open',
    openFrom: 'what you heard',
    asksLeft: '{n} more people you could ask',
    listAdd: 'add someone',
    cellLabel: '{a} with {b}',
    marks: { WORKS: 'goes together', DOESNT: 'does not mix', DEPENDS: 'not sure', NONE: 'nothing yet', SELF: 'the same crowd' },
    chapters: 'Chapters',
    tabSay: 'Turn to {page}',
    pages: 'Sections',
    unknown: '?'
  };

  function L(key, ctx) { return SB.text.label('ui.notebook.' + key, ctx); }
  function h(tag, attrs, kids) { return SB.UI.h(tag, attrs, kids); }
  function C() { return SB.UI.C; }
  function D() { return SB.UI.cuDraw; }
  function Kc() { return SB.UI.calKit; }
  function K() { return SB.DeskKit; }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function game() { return SB.UI.game(); }
  function safe(f, fb) { try { var v = f(); return v === undefined ? fb : v; } catch (e) { return fb; } }
  function f(n) { return Math.round(n * 10) / 10; }

  var PAGES = ['CROWDS', 'BANDS', 'ROOMS', 'NIGHTS', 'HEAR', 'DOOR', 'TOWNS', 'MOVING', 'PEOPLE', 'HOW', 'LIST', 'CHAPTERS'];
  /* CHAPTERS is the box (09 section 3): every chapter that has opened, each cutscene seen can be watched again (js/ui/story.js) */
  function pageName(p) { return p === 'CHAPTERS' ? L('chapters') : SB.text.label('notePage.' + p); }
  var TONER = '#141413', PAPER = '#f4f2ea', PENCIL = '#77756f';
  var LOOKED = {};   // display memory: the week the book was last opened, per career (for the highlighter swipe)

  function famOf(key) { return String(key || '').split(':')[0]; }
  function confName(c) { var out = ''; Object.keys(SB.Enums.CONF).forEach(function (k) { if (SB.Enums.CONF[k] === c) out = SB.text.label('conf.' + k); }); return out; }
  function confCls(c) { return ' nb-c' + (num(c) ? Math.max(0, Math.min(4, c)) : 0); }
  function weeksAgo(s, seen) { var w = s.clock ? s.clock.week : null; return num(w) && num(seen) ? Math.max(0, w - seen) : null; }

  /* ---------------- drawn pieces ---------------- */

  /** a grid square's mark: a tick, a cross or a question mark, in pencil when it is a rumor, darker as it is known */
  function cellMark(cell, cs, isNew) {
    var out = '', c = cell.conf || 0, op = [0, 0.32, 0.6, 0.85, 1][Math.max(0, Math.min(4, c))], ink = c <= 1 ? PENCIL : TONER, seed = 'cm' + (cell.key || 'self') + c;
    if (isNew) out += D().swipe(2, cs / 2, cs - 4, cs * 0.55);
    if (!cell.key) return out + K().hatch(3, 3, cs - 6, cs - 6, { seed: 'self', gap: 4, sw: 1.1, opacity: 0.5 });
    if (!c) return out;
    if (cell.dir === 'WORKS') {
      out += K().path([[cs * 0.2, cs * 0.52], [cs * 0.42, cs * 0.78], [cs * 0.84, cs * 0.18]], { seed: seed, sw: 3, stroke: ink, wob: 0.6, cap: 'square' });
      if (cell.word === 'SAME_CROWD' && c >= 3) out += K().path([[cs * 0.34, cs * 0.5], [cs * 0.52, cs * 0.7], [cs * 0.92, cs * 0.24]], { seed: seed + 'b', sw: 2, stroke: ink, wob: 0.5, cap: 'square' });
    } else if (cell.dir === 'DOESNT') out += K().xout(cs * 0.24, cs * 0.24, cs * 0.52, cs * 0.52, { seed: seed, sw: 2.8, stroke: ink });
    else out += K().marker('?', cs * 0.5, cs * 0.8, cs * 0.62, { anchor: 'middle', fill: ink, seed: seed });
    if (c >= 4) out += '<path d="M' + f(cs * 0.18) + ' ' + f(cs * 0.9) + 'H' + f(cs * 0.82) + '" stroke="' + TONER + '" stroke-width="1.6"/>';
    return '<g opacity="' + op + '">' + out + '</g>';
  }
  /** the hand-ruled lines under a grid of n by m squares */
  function ruling(n, m, cs) {
    var out = '', i;
    for (i = 0; i <= n; i++) out += K().line(i * cs + 1, 1, i * cs + 1 + (i % 3 - 1) * 0.8, m * cs + 1, { seed: 'rv' + i, sw: i % 4 === 0 ? 1.8 : 1.1, over: 1.5, wob: 0.7, stroke: '#3c3b37' });
    for (i = 0; i <= m; i++) out += K().line(1, i * cs + 1, n * cs + 1, i * cs + 1 + (i % 3 - 1) * 0.8, { seed: 'rh' + i, sw: i % 4 === 0 ? 1.8 : 1.1, over: 1.5, wob: 0.7, stroke: '#3c3b37' });
    return out;
  }
  /** a range as a scribbled bracket on a pencil line: the outer bracket is what it could be, the heavy bar what it
   *  likely is; the figure is lettered beside it. Wide when you know little, tight when you know it. */
  function bracketArt(rg, axisMax, conf, w, big) {
    var out = '', ht = big ? 40 : 26, y = big ? 26 : 17, ink = conf <= 1 ? PENCIL : TONER, mx = Math.max(axisMax || 0, rg.hi90 || 1, 1), seed = 'br' + rg.text + w,
        X = function (v) { return 6 + Math.max(0, Math.min(1, v / mx)) * (w - 12); }, a = X(rg.lo90), b = X(rg.hi90), s = big ? 9 : 6, dash = conf ? null : '3 3';
    out += K().line(4, y, w - 4, y, { seed: 'ax' + w, sw: 1, stroke: PENCIL, over: 0, wob: 0.4 });
    out += K().line(a, y - s, a, y + s, { seed: seed + 'a', sw: 2, stroke: ink, over: 0.5, dash: dash }) + K().line(a, y - s, a + 5, y - s - 1, { seed: seed + 'a1', sw: 2, stroke: ink, over: 0.5 }) + K().line(a, y + s, a + 5, y + s + 1, { seed: seed + 'a2', sw: 2, stroke: ink, over: 0.5 });
    out += K().line(b, y - s, b, y + s, { seed: seed + 'b', sw: 2, stroke: ink, over: 0.5, dash: dash }) + K().line(b, y - s, b - 5, y - s + 1, { seed: seed + 'b1', sw: 2, stroke: ink, over: 0.5 }) + K().line(b, y + s, b - 5, y + s - 1, { seed: seed + 'b2', sw: 2, stroke: ink, over: 0.5 });
    if (conf > 0 && num(rg.lo50) && num(rg.hi50)) out += K().line(X(rg.lo50), y, Math.max(X(rg.lo50) + 3, X(rg.hi50)), y, { seed: seed + 'm', sw: big ? 7 : 5, stroke: ink, over: 1, wob: 0.8 });
    if (rg.known) out += K().line(X(rg.lo90) - 2, y + s + 4, X(rg.hi90) + 2, y + s + 4, { seed: seed + 'k', sw: 1.6, over: 1, twice: true });
    return { svg: out, w: w, h: ht };
  }
  /** a hand-drawn chart for one sound: the signs seen as a line on graph paper, a marker arrow if it is moving */
  function chartArt(line, arrow, w, ht) {
    var out = '', i, pts = [], lo = Infinity, hi = -Infinity, k = K();
    for (i = 10; i < w; i += 12) out += '<path d="M' + i + ' 2V' + (ht - 2) + '" stroke="#5a7fa6" stroke-opacity=".3" stroke-width="1"/>';
    for (i = 8; i < ht; i += 12) out += '<path d="M2 ' + i + 'H' + (w - 30) + '" stroke="#5a7fa6" stroke-opacity=".3" stroke-width="1"/>';
    out += k.line(6, ht - 6, w - 34, ht - 6, { seed: 'cx', sw: 1.6, over: 1 }) + k.line(6, 4, 6, ht - 6, { seed: 'cy', sw: 1.6, over: 1 });
    (line || []).forEach(function (p) { if (num(p.v)) { lo = Math.min(lo, p.v); hi = Math.max(hi, p.v); } });
    if (lo === Infinity) { lo = -1; hi = 1; }
    if (hi - lo < 0.2) { hi += 0.1; lo -= 0.1; }
    (line || []).forEach(function (p, j, all) { pts.push([10 + (all.length > 1 ? j / (all.length - 1) : 0.5) * (w - 50), ht - 10 - (p.v - lo) / (hi - lo) * (ht - 20)]); });
    if (pts.length > 1) out += k.path(pts, { seed: 'cl' + w + pts.length, sw: 2.4, wob: 0.6 });
    pts.forEach(function (p) { out += '<rect x="' + f(p[0] - 2.5) + '" y="' + f(p[1] - 2.5) + '" width="5" height="5" fill="' + TONER + '"/>'; });
    if (arrow === 'UP') out += k.arrow(w - 26, ht - 8, w - 8, 6, { seed: 'au', sw: 3.4, head: 10 });
    else if (arrow === 'DOWN') out += k.arrow(w - 26, 8, w - 8, ht - 8, { seed: 'ad', sw: 3.4, head: 10 });
    return out;
  }
  /** a tally in gates of five: the ones inside your call in pen, the rest in pencil */
  function tallyArt(inside, total) {
    var out = '', i, x = 4, n = Math.min(60, total);
    for (i = 0; i < n; i++) {
      var g = i % 5, ink = i < inside ? TONER : PENCIL;
      if (g === 4) out += K().line(x - 30, 24, x - 2, 6, { seed: 'tg' + i, sw: 2.2, stroke: ink, over: 2 });
      else { out += K().line(x, 4, x + 1, 26, { seed: 'tl' + i, sw: 2.2, stroke: ink, over: 1 }); x += 7; }
      if (g === 4) x += 12;
    }
    return { svg: out, w: Math.max(40, x + 10) };
  }

  /* ---------------- the screen ---------------- */

  SB.UI.screen('notebook', {
    rail: 'notebook', title: 'ui.notebook.title', full: false,
    mount: function (root, params) {
      var page = params && PAGES.indexOf(params.page) >= 0 ? params.page : 'CROWDS', openKey = params && params.key ? params.key : null,
          s0 = game(), seed = s0 ? String(s0.seed || 'game') : 'none', wk = s0 && s0.clock ? s0.clock.week : 0,
          since = LOOKED[seed] !== undefined ? LOOKED[seed] : wk - 1, focusCell = null,
          wrap = h('section', { class: 'nb' }), left = h('div', { class: 'nb-page nb-left' }), right = h('div', { class: 'nb-page nb-right', aria: { live: 'polite' } }),
          tabs = h('nav', { class: 'nb-ptabs', aria: { label: L('pages') } });
      LOOKED[seed] = wk;
      root.appendChild(wrap);
      wrap.appendChild(h('h1', { class: 'cb-sr', text: L('title') }));
      wrap.appendChild(h('div', { class: 'nb-spread' }, [left, h('div', { class: 'nb-gutter', aria: { hidden: 'true' } }), right, tabs]));
      wrap.appendChild(h('span', { class: 'nb-grain', aria: { hidden: 'true' } }));

      function isNew(seen) { return num(seen) && seen > since; }
      function pageOf(p) { return safe(function () { return SB.Notebook.pages(game(), p); }, null); }
      function pageNew(p) {
        var pg;
        if (p === 'MOVING') return safe(function () { return SB.Trends.signs(game()).some(function (x) { return (x.signs || []).some(function (sg) { return isNew(sg.week); }); }); }, false);
        if (p === 'LIST' || p === 'CHAPTERS') return false;
        pg = pageOf(p);
        return !!(pg && pg.rows.some(function (r) { return r.conf > 0 && isNew(r.seen); }));
      }
      function pick(p) { page = p; openKey = null; focusCell = null; render(); keepTab(); }
      function keepTab() { var el = safe(function () { return tabs.querySelector('[data-page="' + page + '"]'); }, null); if (el && el.focus) safe(function () { el.focus(); }); }

      /* index tabs cut into the page edge */
      function paintTabs() {
        SB.UI.clear(tabs);
        PAGES.forEach(function (p, i) {
          var on = p === page, nw = !on && pageNew(p), name = pageName(p);
          tabs.appendChild(h('button', { type: 'button', class: 'nb-ptab fx' + (on ? ' is-on' : '') + (nw ? ' is-new' : '') + (i % 2 ? ' is-alt' : ''), data: { page: p },
            aria: { pressed: on ? 'true' : 'false', label: L('tabSay', { page: name }) + (nw ? ', ' + L('newSince') : '') },
            on: { click: function () { pick(p); },
                  keydown: function (e) {
                    var d = e.key === 'ArrowDown' ? 1 : (e.key === 'ArrowUp' ? -1 : 0);
                    if (!d) return;
                    e.preventDefault(); pick(PAGES[(PAGES.indexOf(page) + d + PAGES.length) % PAGES.length]);
                  } } }, h('span', { class: 'nb-ptab-l', text: name })));
        });
      }

      /* the right page: the entry you are reading */
      var SCRAP = { CROWDS: 'crowd-02', BANDS: 'singer-03', ROOMS: 'amp-02', NIGHTS: 'crowd-04', HEAR: 'mic-01', DOOR: 'boots-01', TOWNS: 'stand-04',
                    MOVING: 'line-01', PEOPLE: 'crowd-03', HOW: 'guitar-02', LIST: 'back-02', CHAPTERS: 'drums-02' },
          PAPERS = ['canary', 'pink', 'blue', 'goldenrod'];
      /* a pasted-in scrap: a copied photo taped down, and a typed strip beside it */
      function scrapBlock(big) {
        var id = SCRAP[page] || 'crowd-01', kit = SB.UI.Kit, frame = /^(crowd|stand)/.test(id), els = [];
        if (!kit || !kit.photo) return null;
        safe(function () {
          els.push(kit.photo({ id: id, w: big ? 250 : (frame ? 150 : 130), h: big ? 190 : (frame ? 108 : 150), paper: PAPERS[PAGES.indexOf(page) % PAPERS.length], cut: !frame, tape: ['tl', 'tr'], seed: 'nb' + page }));
          els.push(kit.card({ paper: PAPERS[(PAGES.indexOf(page) + 1) % PAPERS.length], tape: ['top'], cls: 'nb-scrapcard', seed: 'nc' + page },
            [h('p', { class: 'nb-scraptext', text: L('scrap.' + page) })]));
        });
        return els.length ? h('div', { class: 'nb-pasted' + (big ? ' is-big' : '') }, els) : null;
      }
      /* the entry the right page opens on when nothing was picked: the newest, then the surest */
      function bestKey(pg) {
        var best = null, bs = -1, seen = function (k, r) { return num(r && r.seen) ? r.seen : safe(function () { return SB.Notebook.range(game(), k).seen; }, 0) || 0; };
        function eat(k, conf, sn) { if (!k || !(conf > 0)) return; var sc = (num(sn) ? sn : 0) * 10 + conf; if (sc > bs) { bs = sc; best = k; } }
        if (!pg) return null;
        if (pg.grid) pg.grid.cells.forEach(function (row) { row.forEach(function (c) { if (c.key) eat(c.key, c.conf, seen(c.key)); }); });
        (pg.rows || []).forEach(function (r) { eat(r.key, r.conf, seen(r.key, r)); });
        return best;
      }

      function scrapBlockLeft() {
        var kit = SB.UI.Kit, el = null;
        if (!kit || !kit.photo) return null;
        safe(function () { el = h('div', { class: 'nb-pasted nb-pasted--left' }, [kit.photo({ id: 'crowd-0' + (1 + PAGES.indexOf(page) % 4), w: 280, h: 150, paper: 'canary', tape: ['tr'], seed: 'nl' + page })]); });
        return el;
      }
      function showEntry(key) {
        var s = game(), e = null, kids = [], rg;
        openKey = key;
        SB.UI.clear(right);
        safe(function () { left.querySelectorAll('.is-open').forEach(function (x) { x.classList.remove('is-open'); }); });
        safe(function () { var el = left.querySelector('[data-key="' + String(key).replace(/"/g, '') + '"]'); if (el) el.classList.add('is-open'); });
        if (!key) { right.appendChild(h('p', { class: 'nb-pencil nb-pick', text: L('scrapOpen') })); var sb = scrapBlock(true); if (sb) right.appendChild(sb); return; }
        e = safe(function () { return SB.Notebook.entry(s, key); }, null);
        if (!e) { right.appendChild(h('p', { class: 'nb-pencil', text: L('empty.' + page) })); return; }
        kids.push(h('h2', { class: 'nb-etitle', aria: { label: e.title || '' } }, Kc().mk(String(e.title || '').toUpperCase(), 24, { max: 380, say: false })));
        if (e.contested) kids.push(h('p', { class: 'nb-scrawl' }, Kc().hand(L('contested'), 17, { stroke: TONER })));
        if (e.finding) kids.push(h('p', { class: 'nb-finding' + confCls(e.conf), text: e.finding }));
        rg = e.range;
        if (rg && num(rg.lo90) && num(rg.hi90)) {
          var br = bracketArt(rg, rg.hi90 * 1.25, e.conf, 300, true);
          kids.push(h('div', { class: 'nb-bigrange', role: 'img', aria: { label: rg.text + (confName(e.conf) ? ', ' + confName(e.conf) : '') } }, [
            D().art(br.svg, br.w, br.h), D().art(D().marker(rg.text, 4, 30, 22, { seed: 'bt' + key, maxWidth: 140 }), 150, 40)]));
        }
        if (confName(e.conf)) kids.push(h('p', { class: 'nb-conf' + confCls(e.conf), text: confName(e.conf) }));
        if (e.evidence && e.evidence.length) {
          kids.push(h('h3', { class: 'nb-sub', text: L('evidence') }));
          kids.push(h('ul', { class: 'nb-evidence' }, e.evidence.map(function (x) {
            return h('li', null, [num(x.week) ? h('span', { class: 'nb-wk', text: L('week', { n: x.week + 1 }) }) : null, h('span', { text: x.text || '' })]);
          })));
        }
        if (e.related && e.related.length) {
          kids.push(h('h3', { class: 'nb-sub', text: L('related') }));
          kids.push(h('div', { class: 'nb-related' }, e.related.map(function (k) {
            var t = safe(function () { return SB.Notebook.entry(s, k).title || k; }, k);
            return h('button', { type: 'button', class: 'nb-open fx', aria: { label: t }, on: { click: function () { showEntry(k); } } }, Kc().strip(String(t).slice(0, 34)));
          })));
        }
        right.appendChild(h('article', { class: 'nb-entry' }, kids));
        var sb2 = scrapBlock(false); if (sb2) right.appendChild(sb2);
      }

      /* a hand-ruled grid of squares (CROWDS, NIGHTS, HEAR); arrows move between squares, Enter reads one */
      function gridView(grid, cs, lw) {
        var n = grid.colLabels.length, m = grid.rowsLabels.length, cells = [], btns = [], el, start = null, i, j;
        el = h('div', { class: 'nb-grid', role: 'grid', aria: { label: pageName(page) },
                         style: { gridTemplateColumns: lw + 'px repeat(' + n + ', ' + cs + 'px)', gridTemplateRows: '78px repeat(' + m + ', ' + cs + 'px)' } });
        el.appendChild(h('span', { class: 'nb-gcorner', aria: { hidden: 'true' } }));
        grid.colLabels.forEach(function (c) { el.appendChild(h('span', { class: 'nb-colh', role: 'columnheader', text: c })); });
        for (i = 0; i < m; i++) {
          el.appendChild(h('span', { class: 'nb-rowh', role: 'rowheader', text: grid.rowsLabels[i] }));
          for (j = 0; j < n; j++) {
            var cell = grid.cells[i][j], nw = cell.key && cell.conf > 0 && isNew(safe(function () { return SB.Notebook.range(game(), cell.key).seen; }, null)),
                word = !cell.key ? L('marks.SELF') : (!cell.conf ? L('marks.NONE') : L('marks.' + (cell.dir === 'WORKS' || cell.dir === 'DOESNT' ? cell.dir : 'DEPENDS'))), b;
            if (!cell.key) { el.appendChild(h('span', { class: 'nb-cell is-self', role: 'gridcell', aria: { label: word } }, D().art(cellMark(cell, cs, false), cs, cs))); continue; }
            b = h('button', { type: 'button', class: 'nb-cell fx' + (cell.key === openKey ? ' is-open' : ''), role: 'gridcell', tabindex: '-1', data: { key: cell.key, r: i, c: j },
              aria: { label: L('cellLabel', { a: grid.rowsLabels[i], b: grid.colLabels[j] }) + ', ' + word + (cell.conf ? ', ' + confName(cell.conf) : '') + (nw ? ', ' + L('newSince') : '') },
              on: { click: (function (k, r, c) { return function () { focusCell = [r, c]; showEntry(k); }; })(cell.key, i, j), keydown: gridKey } },
              D().art(cellMark(cell, cs, nw), cs, cs));
            el.appendChild(b);
            btns.push(b);
            cells.push([i, j, b]);
            if (!start && (cell.key === openKey || (focusCell && focusCell[0] === i && focusCell[1] === j))) start = b;
          }
        }
        (start || btns[0] || { setAttribute: function () {} }).setAttribute('tabindex', '0');
        function at(r, c) { var x = null; cells.forEach(function (q) { if (q[0] === r && q[1] === c) x = q[2]; }); return x; }
        function gridKey(e) {
          var r = Number(this.getAttribute('data-r')), c = Number(this.getAttribute('data-c')), dr = 0, dc = 0, nx = null, k = 0;
          if (e.key === 'ArrowUp') dr = -1; else if (e.key === 'ArrowDown') dr = 1; else if (e.key === 'ArrowLeft') dc = -1; else if (e.key === 'ArrowRight') dc = 1; else return;
          e.preventDefault();
          while (!nx && k < Math.max(n, m)) { k += 1; r = (r + dr + m) % m; c = (c + dc + n) % n; nx = at(r, c); }
          if (!nx) return;
          btns.forEach(function (b) { b.setAttribute('tabindex', '-1'); });
          nx.setAttribute('tabindex', '0'); focusCell = [r, c];
          try { nx.focus(); } catch (x) { /* fine */ }
        }
        var wrapG = h('div', { class: 'nb-gridwrap' }, [h('span', { class: 'nb-ruling', aria: { hidden: 'true' }, style: { left: lw + 'px', top: '78px' } }, D().art(ruling(n, m, cs), n * cs + 3, m * cs + 3)), el]);
        return wrapG;
      }

      /* margin notes: one ruled line per thing known; its name on a label strip opens it */
      function rowsView(rows) {
        var s = game(), axis = {};
        rows = rows.slice().sort(function (a, b) { return (b.conf || 0) - (a.conf || 0); });
        rows.forEach(function (r) { var fm = famOf(r.key); if (r.range && num(r.range.hi90)) axis[fm] = Math.max(axis[fm] || 0, r.range.hi90 * 1.15); });
        return h('ul', { class: 'nb-notes' }, rows.map(function (r) {
          var ago = weeksAgo(s, r.seen), nw = r.conf > 0 && isNew(r.seen), br = r.range ? bracketArt(r.range, axis[famOf(r.key)], r.conf, 132, false) : null;
          return h('li', { class: 'nb-note' + confCls(r.conf) + (nw ? ' is-new' : '') }, [
            h('button', { type: 'button', class: 'nb-open fx' + (r.key === openKey ? ' is-open' : ''), data: { key: r.key },
              aria: { label: (r.label || '') + (r.range ? ', ' + r.range.text : '') + ', ' + confName(r.conf) + (nw ? ', ' + L('newSince') : '') },
              on: { click: function () { showEntry(r.key); } } }, Kc().strip(String(r.label || '').slice(0, 40))),
            br ? h('span', { class: 'nb-range', aria: { hidden: 'true' } }, [D().art(br.svg, br.w, br.h), h('span', { class: 'nb-fig', text: r.range.text })]) : null,
            r.text && !br ? h('span', { class: 'nb-line', text: r.text }) : null,
            (ago !== null && ago >= 8) ? h('span', { class: 'nb-stale', text: L('stale', { n: Math.max(1, Math.round(ago / 4.3)) }) }) : null
          ]);
        }));
      }

      function emptyNote(p) { return h('p', { class: 'nb-pencil nb-empty', text: L('empty.' + p) }); }

      function movingView() {
        var list = safe(function () { return SB.Trends.signs(game()) || []; }, []);
        list = list.filter(function (x) { return x.conf > 0 || (x.signs && x.signs.length) || (x.line && x.line.length); });
        if (!list.length) return emptyNote('MOVING');
        return h('ul', { class: 'nb-charts' }, list.map(function (x) {
          var gname = SB.text.label('genre.' + x.genre + '.name'), nw = (x.signs || []).some(function (sg) { return isNew(sg.week); });
          return h('li', { class: 'nb-chart' + confCls(x.conf) + (nw ? ' is-new' : '') }, [
            h('div', { class: 'nb-charthead' }, [Kc().mk(String(gname).toUpperCase(), 17, { max: 200 }), h('span', { class: 'nb-conf' + confCls(x.conf), text: confName(x.conf) })]),
            h('div', { role: 'img', aria: { label: gname + (x.arrow === 'UP' ? ', up' : (x.arrow === 'DOWN' ? ', down' : '')) } }, D().art(chartArt(x.line, x.arrow, 210, 62), 210, 62)),
            (x.signs && x.signs.length) ? h('ul', { class: 'nb-signs', aria: { label: L('sign') } }, x.signs.slice(-3).map(function (sg) { return h('li', { class: isNew(sg.week) ? 'is-new' : '', text: sg.text || '' }); })) : h('p', { class: 'nb-pencil', text: L('noSigns') })
          ]);
        }));
      }

      function howView() {
        var s = game(), out = [], done = {}, types = [], tally = null, pg = pageOf('HOW') || { rows: [] }, t;
        if (pg.rows.length) out.push(rowsView(pg.rows));
        Object.keys(s.jobs || {}).forEach(function (id) { var j = s.jobs[id]; if (j && j.status === 'DONE' && !done[j.type]) { done[j.type] = 1; types.push(j.type); } });
        if (types.length) {
          out.push(h('h3', { class: 'nb-sub', text: L('jobsDone') }));
          out.push(h('ul', { class: 'nb-jobs' }, types.map(function (ty) {
            return h('li', null, [h('b', { text: SB.text.label('jobs.' + ty + '.label') }), ' ', SB.text.label('jobs.' + ty + '.why')]);
          })));
        }
        tally = safe(function () { return SB.Notebook.tally(s); }, null);
        if (tally && tally.shows > 0) {
          t = tallyArt(tally.inside, tally.shows);
          out.push(h('h3', { class: 'nb-sub', text: L('callTally') }));
          out.push(h('div', { class: 'nb-tally', role: 'img', aria: { label: L('tallyLine', { inside: tally.inside, shows: tally.shows }) } }, [
            D().art(t.svg, t.w, 32), D().art(D().marker(tally.inside + '/' + tally.shows, 4, 28, 22, { seed: 'tly' }), 90, 36)]));
          out.push(h('p', { class: 'nb-line', text: L('tallyLine', { inside: tally.inside, shows: tally.shows }) }));
          if (num(tally.widthNow) && num(tally.widthThen) && tally.widthThen > 0) out.push(h('p', { class: 'nb-pencil', text: L('tallyWidth', { now: tally.widthNow, then: tally.widthThen }) }));
        }
        if (!out.length) return emptyNote('HOW');
        return h('div', null, out);
      }

      function listView() {
        var s = game(), list = safe(function () { return SB.Harm.list(s) || []; }, []), cur = safe(function () { return SB.Harm.current(s); }, null), out = [],
            add = SB.UI.parts && SB.UI.parts.listDialog, heads = '', i;
        if (cur) {
          for (i = 0; i < Math.min(12, cur.asksLeft || 0); i++) heads += D().head(10 + i * 16, 26, 22, { mode: 'open' });
          out.push(h('section', { class: 'nb-matter', role: 'group', aria: { label: L('openMatter') } }, [
            h('p', { class: 'nb-mattertop' }, [D().art(D().bang(4, 26, 24), 40, 30), Kc().mk(String(L('openMatter')).toUpperCase(), 15, { max: 300 })]),
            h('p', { class: 'nb-finding nb-c3', text: cur.weightText || '' }),
            cur.personName ? h('p', { class: 'nb-who', text: cur.personName + (cur.bandName ? ' / ' + cur.bandName : '') }) : null,
            cur.sourceText ? h('p', { class: 'nb-pencil', text: L('openFrom') + ': ' + cur.sourceText }) : null,
            heads ? h('div', { class: 'nb-asks', role: 'img', aria: { label: L('asksLeft', { n: cur.asksLeft }) } }, [D().art(heads, Math.min(12, cur.asksLeft) * 16 + 14, 30), h('span', { class: 'nb-pencil', text: L('asksLeft', { n: cur.asksLeft }) })]) : null,
            Kc().tabsRow((cur.options || []).map(function (o) {
              return { label: o.label || SB.text.label('harmAct.' + o.k + '.name'), cost: (o.costs || []).map(Kc().chipText).join(', '), disabled: o.enabled === false, why: o.why,
                       on: function () { SB.UI.act(function (st) { return SB.Harm.act(st, o.k, {}); }); render(); } };
            })),
            h('ul', { class: 'nb-says' }, (cur.options || []).map(function (o) { return h('li', { class: 'nb-pencil', text: (o.label || SB.text.label('harmAct.' + o.k + '.name')) + ': ' + SB.text.label('harmAct.' + o.k + '.says') }); }))
          ]));
        }
        if (!list.length) out.push(emptyNote('LIST'));
        else out.push(h('ul', { class: 'nb-scraps' }, list.map(function (x, i) {
          return h('li', { class: 'nb-scrap', style: { '--r': ((i % 3) - 1) * 1.4 + 'deg' } }, [
            h('p', { class: 'nb-scrapname', aria: { label: x.name } }, Kc().mk(String(x.name || '').toUpperCase(), 18, { max: 260, say: false })),
            x.wasIn && x.wasIn.length ? h('p', { class: 'nb-pencil', text: L('listWas') + ' ' + x.wasIn.join(', ') }) : null,
            h('p', { class: 'nb-line', text: SB.text.label('listCondition.' + x.condition) + ' / ' + L('listSince', { n: (x.since || 0) + 1 }) }),
            x.why ? h('p', { class: 'nb-line nb-why', text: x.why }) : null,
            x.conditionMet ? h('span', { class: 'nb-met', role: 'img', aria: { label: L('listMet') } }, D().art(D().stamp(L('listMet'), 4, 4, 14, { rot: -6 }), D().stampW(L('listMet'), 14) + 12, 38)) : null,
            Kc().tab({ label: L('listRemove'), say: L('listRemoveSay', { name: x.name }), hot: !!x.conditionMet, on: function () { SB.UI.act(function (st) { return SB.Harm.remove(st, x.personId); }); render(); } })
          ]);
        })));
        if (typeof add === 'function') out.push(h('button', { type: 'button', class: 'nb-open nb-add fx', aria: { label: L('listAdd') },
          on: { click: function () { var close = function () {}; close = SB.UI.card(add({ onDone: function () { close(); render(); } }), {}); } } }, Kc().strip(L('listAdd'))));
        return h('div', null, out);
      }

      function anyKnown(grid) { return grid.cells.some(function (row) { return row.some(function (c) { return c.key && c.conf > 0; }); }); }

      function render() {
        var s = game(), pg = null, kids = [], name = pageName(page);
        paintTabs();
        SB.UI.clear(left);
        if (!s) { left.appendChild(emptyNote(page)); return; }
        kids.push(h('h2', { class: 'nb-ptitle', aria: { label: name } }, Kc().mk(String(name).toUpperCase(), 30, { max: 420, say: false })));
        if (page === 'CHAPTERS') kids.push(SB.UI.story && SB.UI.story.chapters ? SB.UI.story.chapters(s) : emptyNote(page));
        else if (page === 'MOVING') kids.push(movingView());
        else if (page === 'HOW') kids.push(howView());
        else if (page === 'LIST') kids.push(listView());
        else {
          pg = pageOf(page);
          if (!pg || (!pg.rows.length && !(pg.grid && anyKnown(pg.grid)))) kids.push(emptyNote(page));
          if (pg) {
            if (pg.grid && page === 'CROWDS' && pg.grid.colLabels.length === SB.Enums.GENRES.length) {
              pg.grid.colLabels = SB.Enums.GENRES.map(function (g) { return SB.text.label('genre.' + g + '.name'); });
              pg.grid.rowsLabels = pg.grid.colLabels.slice();
            }
            if (pg.grid) kids.push(gridView(pg.grid, pg.grid.colLabels.length > 7 ? 28 : 40, page === 'HEAR' ? 120 : 100));
            /* the squares open their own entries; what else the page holds (causes, notes) stays as margin notes */
            var inGrid = {}, rest;
            if (pg.grid) pg.grid.cells.forEach(function (row) { row.forEach(function (c) { if (c.key) inGrid[c.key] = 1; }); });
            rest = pg.rows.filter(function (r) { return !inGrid[r.key]; });
            if (rest.length) kids.push(rowsView(rest));
          }
        }
        if (pg && (pg.grid || (pg.rows && pg.rows.length <= 6))) kids.push(scrapBlockLeft());
        kids.forEach(function (k) { if (k) left.appendChild(k); });
        showEntry(openKey || bestKey(pg));
      }

      render();
      return { update: function () { render(); }, unmount: function () {} };
    }
  });
})(SB);
