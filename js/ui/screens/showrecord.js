/* Scene Booker: js/ui/screens/showrecord.js (UI; the played show's page, called from shows.js mountShow's after())
 * The night's record, kept the way a booker keeps it: a black scrapbook page on the clipboard with the flyer for the
 * night, a photo of the night (a real cut-out band and the crowd from behind, through the same copier as the
 * cutscenes and the night screen), the set list with the heat noted in pen, the door tally stapled to the envelope
 * with the arithmetic on its back, what people said on torn notes, what you learned on an index card and the jobs
 * that got done on a legal-pad scrap. Everything C.ShowResult shows is here (verdict, the town's number, your call,
 * the room, the three generations, stamps, the ledger, luck, comments with their notebook links, learned, your cut,
 * the door), only pasted up instead of ruled.
 *
 * SB.UI.showRecord(state, view, { onNote(key), jobs }) -> element. view is SB.Shows.view(state, showId).
 * Paper, marker lettering, tally marks and the copier come from SB.NightScene and SB.Scenes; nothing draws a person.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.record = {
    title: 'How it went',
    setlist: 'The set list',
    doors: 'DOORS {t}',
    heat: 'heat {n}',
    peak: 'peak',
    present: '{n} in the room',
    stop: 'HARD STOP {t}',
    door: 'Through the door',
    expects: 'TOWN EXPECTED',
    call: 'YOUR CALL',
    holds: 'THE ROOM HOLDS',
    envelope: 'The envelope',
    said: 'What people said',
    learned: 'Learned',
    done: 'Got done',
    photo: 'A photo of the night: {band} on, {n} in the room.',
    posts: 'What went up online',
    posted: 'posted'
  };

  var TONER = '#141312';
  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function NS() { return SB.NightScene || null; }
  function C() { return SB.UI.C; }
  function R(key, ctx) { return SB.text.label('ui.record.' + key, ctx); }
  function U(key, ctx) { return SB.text.label('ui.c.' + key, ctx); }
  function has(key) { try { return SB.text.has('strings.' + key) || SB.text.has(key); } catch (e) { return false; } }
  function word(key, fb) { return has(key) ? SB.text.label(key) : (fb === undefined ? '' : fb); }
  function num(v) { return typeof v === 'number' && isFinite(v); }
  function lower(k) { return String(k || '').toLowerCase().replace(/_/g, ' '); }
  function safe(f, fb) { try { var v = f(); return v === undefined ? fb : v; } catch (e) { SB.log('warn', 'showrecord', String(e && e.message)); return fb; } }
  function clock(m) { var t = safe(function () { return SB.time.clock(m); }, ''); return t && t.indexOf(':') < 0 && /^\d+$/.test(t) ? t + ':00' : t; }
  function money(n) { return SB.text.money ? SB.text.money(n || 0) : '$' + Math.round(n || 0); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* sharpie capitals (SVG markup) and the paper a piece is cut from */
  function mk(text, size, o) { var n = NS(); return n ? n.marker(String(text), size, o || {}) : '<span class="rc-mkfb">' + esc(text) + '</span>'; }
  function paper(el, stock, seed, edges) {
    var n = NS(), st;
    if (!n) return el;
    st = safe(function () { return n.paperStyle(stock, seed, edges); }, null);
    if (st) Object.keys(st).forEach(function (k) { if (st[k] != null) safe(function () { el.style.setProperty(k, st[k]); }); });
    return el;
  }
  function turn(el, deg) { safe(function () { el.style.setProperty('--rot', deg + 'deg'); }); return el; }
  function tape(cls) { return h('span', { class: 'rc-tape ' + (cls || ''), aria: { hidden: 'true' } }); }
  function staple(cls) { return h('span', { class: 'rc-staple ' + (cls || ''), aria: { hidden: 'true' } }); }
  function rng(seed) { return SB.rng.make('record:' + seed); }

  /* ---------------- the photo of the night ---------------- */
  function blank(cv) {
    try { var d = cv.getContext('2d').getImageData(cv.width / 2 - 40, cv.height / 2 - 40, 80, 80).data, t = 0, i; for (i = 0; i < d.length; i += 4) t += d[i + 3] < 128 ? 0 : d[i] + d[i + 1] + d[i + 2]; return t / (d.length / 4) < 120; } catch (e) { return false; }
  }
  function canvas(w, ht) { var c = document.createElement('canvas'); c.width = Math.round(w); c.height = Math.round(ht); return c; }
  /* the band on the floor (the cutscene's STAGE_BAND, name on the kick) and two heads of the crowd in front, through the copier */
  function shoot(cv, o) {
    var S = SB.Scenes, key = 'STAGE_BAND', sctx = { seed: o.seed, band: o.band, bands: o.bands, paper: 'white' }, left = 2, r = rng('ph:' + o.seed),
        backs = (SB.Cutouts || []).filter(function (k) { return k.role === 'back' && (k.frame === 'close' || k.frame === 'waist'); }), front = [], i, j, t;
    if (!S || !S.draw || !cv.getContext || typeof Image === 'undefined') return;
    for (i = backs.length - 1; i > 0; i--) { j = Math.floor(r.next() * (i + 1)); t = backs[i]; backs[i] = backs[j]; backs[j] = t; }
    front = backs.slice(0, 2);
    function go() { if (--left === 0) safe(paint); }
    if (S.loadCuts) S.loadCuts(front.map(function (k) { return k.id; }), go); else go();
    if (S.preload) S.preload([key], go, [sctx], 5000); else go();
    function paint() {
      var W = cv.width, H = cv.height, c = cv.getContext('2d'), sh = canvas(W, H), tries;
      S.draw(sh, key, sctx);
      for (tries = 0; tries < 3 && blank(sh); tries++) S.draw(sh, key, sctx);
      c.save(); c.clearRect(0, 0, W, H); c.fillStyle = '#ddd'; c.fillRect(0, 0, W, H);
      c.filter = 'contrast(1.08) brightness(1.04)';
      c.drawImage(sh, -W * 0.04, -H * 0.02, W * 1.08, H * 1.08);           /* a little closer than the cutscene */
      c.filter = 'none';
      if (S.paste) front.forEach(function (k, n) {
        var x = n ? W * 0.9 : W * 0.1, hh = H * (n ? 0.62 : 0.7);
        S.paste(c, k.id, { x: x + r.range(-W * 0.03, W * 0.03), y: H + H * 0.1, h: hh, rot: r.range(-0.05, 0.05), flip: n === 1, border: 4, bright: 0.62, contrast: 1.3 });
      });
      var gr = c.createRadialGradient(W * 0.5, H * 0.42, H * 0.2, W * 0.5, H * 0.45, W * 0.7);    /* the flash and its falloff */
      gr.addColorStop(0, 'rgba(255,255,255,.12)'); gr.addColorStop(1, 'rgba(0,0,0,.32)'); c.fillStyle = gr; c.fillRect(0, 0, W, H);
      c.restore();
      if (S.copier) S.copier(cv, { paper: o.paper, cell: Math.max(3, W / 210), contrast: 1.3, bias: 0.06, seed: 'record:' + o.seed });
    }
  }

  /* ---------------- the number line, drawn in pen (what ExpectationBar shows) ---------------- */
  function line(o) {
    var vals = [o.lo, o.hi, o.par, o.actual, o.cap].filter(num), max = Math.max(10, Math.max.apply(null, vals.concat([0])) * 1.12),
        W = 270, Y = 40, r = rng('nl:' + o.seed), out = '';
    function X(v) { return 10 + Math.max(0, Math.min(1, v / max)) * (W - 20); }
    function j() { return r.range(-1.2, 1.2).toFixed(1); }
    out += '<path d="M6 ' + (Y + +j()) + 'C' + (W * 0.3) + ' ' + (Y + +j()) + ' ' + (W * 0.7) + ' ' + (Y + +j()) + ' ' + (W - 4) + ' ' + Y + '" stroke="currentColor" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    if (num(o.lo) && num(o.hi)) out += '<path d="M' + X(o.lo).toFixed(1) + ' ' + Y + 'H' + X(o.hi).toFixed(1) + '" stroke="#F2D93B" stroke-opacity=".85" stroke-width="14"/>' +
      '<path d="M' + X(o.lo).toFixed(1) + ' ' + (Y - 12) + 'v24M' + X(o.hi).toFixed(1) + ' ' + (Y - 12) + 'v24" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>';
    if (num(o.par)) out += '<path d="M' + X(o.par).toFixed(1) + ' ' + (Y - 7) + 'v14" stroke="currentColor" stroke-width="2" /><text x="' + X(o.par).toFixed(1) + '" y="' + (Y + 24) + '" text-anchor="middle" class="rc-svgt">' + esc(word('names.par', 'par')) + '</text>';
    if (num(o.cap)) out += '<path d="M' + X(o.cap).toFixed(1) + ' ' + (Y - 22) + 'V' + (Y + 12) + '" stroke="' + (o.over ? '#C8331E' : 'currentColor') + '" stroke-width="2.4" stroke-dasharray="4 3"/><text x="' + X(o.cap).toFixed(1) + '" y="' + (Y - 25) + '" text-anchor="middle" class="rc-svgt">' + esc(String(o.cap)) + '</text>';
    if (num(o.actual)) {
      var ax = X(o.actual);
      out += '<path d="M' + (ax - 6).toFixed(1) + ' ' + (Y - 6) + 'L' + (ax + 6).toFixed(1) + ' ' + (Y + 6) + 'M' + (ax + 6).toFixed(1) + ' ' + (Y - 6) + 'L' + (ax - 6).toFixed(1) + ' ' + (Y + 6) + '" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>' +
        '<ellipse cx="' + ax.toFixed(1) + '" cy="' + Y + '" rx="13" ry="11" transform="rotate(-12 ' + ax.toFixed(1) + ' ' + Y + ')" stroke="currentColor" stroke-width="2" fill="none"/>';
    }
    return '<svg class="rc-line" aria-hidden="true" width="' + W + '" height="70" viewBox="0 0 ' + W + ' 70">' + out + '</svg>';
  }
  function star() {
    return '<svg aria-hidden="true" width="30" height="30" viewBox="0 0 30 30"><path d="M15 2L18.6 11.4L28 11.8L20.6 17.6L23.4 27L15 21.4L6.8 27.4L9.4 17.8L2 12L11.4 11.4Z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/></svg>';
  }
  function check() {
    return '<svg aria-hidden="true" width="22" height="20" viewBox="0 0 22 20"><path d="M2 11L8 17L20 2" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  /* ---------------- the pieces ---------------- */
  function bandName(s, id) { return (s.bands && s.bands[id] && s.bands[id].name) || ''; }

  function flyerPiece(s, show) {
    var thumb = null;
    if (SB.UI.parts && SB.UI.parts.flyerThumb && SB.Jobs && SB.Jobs.flyerSpec) thumb = safe(function () { return SB.UI.cuDraw.thumb({ recipe: (show.flyer && show.flyer.recipe) || null, spec: SB.Jobs.flyerSpec(s, show.id) }, 170, true); }, null);
    if (!thumb) return null;
    return turn(h('figure', { class: 'rc-piece rc-flyer' }, [tape('rc-tape--tl'), thumb, tape('rc-tape--br')]), -4);
  }

  function setsOf(s, show, r) {
    var slots = (show.bill && show.bill.slots) || [], times = (show.bill && show.bill.times) || [], sets = r.sets || [];
    return slots.map(function (sl, i) {
      var st = sets.filter(function (x) { return x.bandId === sl.bandId; })[0] || null;
      return { id: sl.bandId, name: bandName(s, sl.bandId), start: st && num(st.start) ? st.start : times[i], set: st };
    });
  }

  function photoPiece(s, show, r, list) {
    var best = null, cv, label, cap, n = NS();
    list.forEach(function (b) { if (b.set && num(b.set.energy) && (!best || b.set.energy > best.set.energy || (b.set.peak && !best.set.peak))) best = b; });
    if (!best && list.length) best = list[list.length - 1];
    label = R('photo', { band: best ? best.name : '', n: r.heads });
    cv = canvas(Math.max(780, Math.round(600 * (SB.Finish && SB.Finish.res ? SB.Finish.res() : 1.5))), 0); cv.height = Math.round(cv.width * 0.625); cv.className = 'rc-photocv'; cv.setAttribute('aria-hidden', 'true');
    cap = (best ? best.name : '') + ' · ' + safe(function () { var d = SB.time.date(show.day); return d.m + '/' + d.d; }, '');
    var el = turn(h('figure', { class: 'rc-piece rc-polaroid', role: 'img', aria: { label: label } }, [
      h('div', { class: 'rc-photo' }, [cv]),
      h('figcaption', { class: 'rc-cap', html: mk(cap, 22, { seed: 'cap' + show.id, maxWidth: 360 }) }),
      tape('rc-tape--top')
    ]), 5.5);
    safe(function () { shoot(cv, { seed: show.id + ':' + (s.seed || ''), band: best ? best.name : '', bands: list.map(function (b) { return b.name; }), paper: n ? n.paperFor(show.id) : 'goldenrod' }); });
    return el;
  }

  function setPiece(s, show, room, list) {
    var el = h('section', { class: 'rc-piece rc-paper rc-setlist', aria: { label: R('setlist') } }), ol = h('ol', { class: 'rc-sl' });
    paper(el, 'white', 'sl' + show.id, 'b'); turn(el, -1.6);
    el.appendChild(h('h3', { class: 'rc-h', html: mk(R('setlist'), 26, { seed: 'sl', maxWidth: 190 }) }));
    if (show.bill && num(show.bill.doors)) el.appendChild(h('p', { class: 'rc-type rc-sl-doors', text: R('doors', { t: clock(show.bill.doors) }) }));
    list.forEach(function (b) {
      var x = b.set, note = x && num(x.energy) ? R('heat', { n: Math.round(x.energy * 100) }) + (x.peak ? ' · ' + R('peak') : '') : '';
      ol.appendChild(h('li', { class: 'rc-sl-band' + (x && x.peak ? ' is-peak' : '') }, [
        num(b.start) ? h('span', { class: 'rc-type rc-sl-time', text: clock(b.start) }) : null,
        h('span', { class: 'rc-type rc-sl-name', text: String(b.name).toUpperCase() }),
        note ? h('span', { class: 'rc-sl-heat', text: note }) : null,
        x && num(x.present) ? h('span', { class: 'rc-type rc-sl-present', text: R('present', { n: x.present }) }) : null
      ]));
    });
    el.appendChild(ol);
    if (room && num(room.curfew)) el.appendChild(h('p', { class: 'rc-type rc-sl-stop', text: R('stop', { t: clock(room.curfew) }) }));
    return el;
  }

  /* the tally scrap: the door count in marks, the town's number, your call, the room, the generations */
  function tallyPiece(show, r, room) {
    var cap = room ? room.cap : null, over = num(cap) && num(r.heads) && r.heads > cap, w = r.vsPar ? word('vsPar.' + r.vsPar, lower(r.vsPar)) : '',
        lo = r.call && r.call.lo, hi = r.call && r.call.hi, par = r.par && r.par.heads, n = NS(), g = Array.isArray(r.byGen) ? r.byGen : null, aria, el;
    aria = [num(lo) && num(hi) ? word('names.call', '') + ' ' + lo + '–' + hi : null, num(par) ? word('names.par', '') + ' ' + par : null,
            num(r.heads) ? r.heads + ' ' + U('actual') : null, over ? U('overCap') : null, w || null].filter(Boolean).join(', ');
    el = h('section', { class: 'rc-piece rc-paper rc-tally', role: 'img', aria: { label: aria } });
    paper(el, 'pink', 'tl' + show.id, 'rb'); turn(el, -2.4);
    el.appendChild(h('p', { class: 'rc-type rc-k', text: R('door').toUpperCase() }));
    el.appendChild(h('div', { class: 'rc-tl-row' }, [
      h('span', { class: 'rc-tl-marks', html: n ? n.tally(Math.max(0, Math.round(r.heads || 0)), { h: 20, per: 5, gap: 7, seed: show.id }) : '' }),
      h('span', { class: 'rc-tl-n', html: mk(String(num(r.heads) ? r.heads : '?'), 40, { seed: 'hd' + show.id, weight: 1.3 }) })
    ]));
    if (w) el.appendChild(h('p', { class: 'rc-tl-word', html: mk(w, 20, { seed: 'w' + show.id, maxWidth: 200 }) }));
    if (over) el.appendChild(h('p', { class: 'rc-tl-over', html: mk(U('overCap'), 15, { seed: 'ov' + show.id, maxWidth: 250 }) }));
    el.appendChild(h('div', { class: 'rc-tl-line', html: line({ lo: lo, hi: hi, par: par, actual: r.heads, cap: cap, over: over, seed: show.id }) }));
    el.appendChild(h('dl', { class: 'rc-tl-facts' }, [
      num(par) ? h('dt', { class: 'rc-type', text: R('expects') }) : null, num(par) ? h('dd', { class: 'rc-type', text: String(par) }) : null,
      num(lo) && num(hi) ? h('dt', { class: 'rc-type', text: R('call') }) : null, num(lo) && num(hi) ? h('dd', { class: 'rc-type', text: lo + '-' + hi }) : null,
      num(cap) ? h('dt', { class: 'rc-type', text: R('holds') }) : null, num(cap) ? h('dd', { class: 'rc-type', text: String(cap) }) : null
    ]));
    if (g) el.appendChild(h('ul', { class: 'rc-gens' }, g.map(function (a, i) {
      var key = ['KIDS', 'MIDDLE', 'OLD'][i], name = word('gen.' + key + '.name', ['kids', 'middle', 'old heads'][i]);
      return h('li', { class: 'rc-gen' }, [
        h('span', { class: 'rc-gen-n', html: mk(num(a) ? String(Math.round(a)) : U('unknown'), 20, { seed: 'g' + i + show.id }) }),
        h('span', { class: 'rc-type rc-gen-k', text: name })
      ]);
    })));
    return el;
  }

  /* the envelope: the door on the front, the ledger worked out on it in pen, your cut circled */
  function envelopePiece(show, r) {
    var el = h('section', { class: 'rc-piece rc-paper rc-env', aria: { label: R('envelope') } }), rows = r.ledger || [], stamps = (r.memory && r.memory.stamps) || [],
        cols = ['YOURS', 'HIDDEN', 'LUCK', 'REST'], sheet;
    paper(el, 'kraft', 'env' + show.id); turn(el, 1.2);
    el.appendChild(h('span', { class: 'rc-env-flap', aria: { hidden: 'true' } }));
    el.appendChild(h('h3', { class: 'rc-h rc-env-h', html: mk(R('envelope'), 30, { seed: 'env' + show.id, maxWidth: 300 }) }));
    if (r.door && num(r.door.gross)) el.appendChild(h('p', { class: 'rc-type rc-env-door', text: U('door', { paid: r.paid, price: r.door.price || 0, gross: r.door.gross }) }));
    if (stamps.length && C() && C().Stamp) el.appendChild(h('div', { class: 'rc-env-stamps' }, stamps.map(function (k) { return C().Stamp({ k: k }); })));
    function fig(x) {
      if (!num(x.d)) return U('unknown');
      return x.col === 'PAR' || x.col === 'TOTAL' ? String(Math.round(x.d)) : (x.d > 0 ? '+' : (x.d < 0 ? '−' : '')) + Math.abs(Math.round(x.d));
    }
    function row(x) {
      return h('li', { class: 'rc-lg-row rc-lg--' + lower(x.col).replace(/ /g, '-') }, [
        h('span', { class: 'rc-type rc-lg-l', text: x.label || word('feedback.ledger.' + x.col, '') }),
        h('span', { class: 'rc-lg-d' + (x.d < 0 ? ' is-neg' : (x.d > 0 ? ' is-pos' : '')), text: fig(x) })
      ]);
    }
    if (rows.length) {
      sheet = h('ol', { class: 'rc-lg' });
      rows.filter(function (x) { return x.col === 'PAR'; }).forEach(function (x) { sheet.appendChild(row(x)); });
      cols.forEach(function (k) {
        var rs = rows.filter(function (x) { return x.col === k; }), cap = word('feedback.ledger.' + k, lower(k));
        if (!rs.length) return;
        if (!(rs.length === 1 && rs[0].label === cap)) sheet.appendChild(h('li', { class: 'rc-type rc-lg-cap', text: cap }));
        rs.forEach(function (x) { sheet.appendChild(row(x)); });
      });
      rows.filter(function (x) { return x.col === 'TOTAL'; }).forEach(function (x) { sheet.appendChild(row(x)); });
      el.appendChild(sheet);
    }
    var net = num(r.playerNet) ? (r.playerNet > 0 ? '+' : '') + money(r.playerNet) : U('unknown');
    el.appendChild(h('p', { class: 'rc-env-you' + (r.playerNet < 0 ? ' is-neg' : ''), aria: { label: U('playerNet') + ' ' + net } }, [
      h('span', { class: 'rc-type rc-env-youk', aria: { hidden: 'true' }, text: U('playerNet').toUpperCase() }),
      h('span', { class: 'rc-env-net', aria: { hidden: 'true' }, html: mk(net, 34, { seed: 'net' + show.id, weight: 1.3 }) +
        '<svg class="rc-ring" aria-hidden="true" viewBox="0 0 160 70"><path d="M14 40C10 14 70 4 130 10C160 14 158 52 110 60C68 66 16 62 16 34" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>' })
    ]));
    return el;
  }

  /* the cash, rubber-banded, sticking out of the envelope */
  function cashPiece(r) {
    var n = NS(), p, art;
    if (!n || !n.object || !num(r.door && r.door.gross) || !(r.door.gross > 0)) return null;
    p = n.pileOf ? n.pileOf(r.door.gross) : { n: 4, bill: '5' };
    art = safe(function () { return n.object('pile', { n: Math.max(3, p.n), bill: p.bill, seed: 'rc', size: 1.1 }); }, null);
    return art ? h('span', { class: 'rc-cash', aria: { hidden: 'true' } }, [art]) : null;
  }

  var NOTE_PAPER = ['white', 'canary', 'bone', 'green'], DOWN_PAPER = ['blue', 'pink'];
  function saidPiece(r, onNote, seed) {
    var cs = r.comments || [], kids = [], up = 0, dn = 0;
    if (!cs.length) return null;
    kids.push(h('h3', { class: 'rc-label', text: R('said') }));
    kids.push(h('div', { class: 'rc-notes', role: 'group', aria: { label: U('comments') } }, cs.map(function (c, i) {
      var cause = c.cause ? word('notebook.cause.' + c.cause + '.title', lower(c.cause)) : null, stock = c.dir < 0 ? DOWN_PAPER[dn++ % 2] : NOTE_PAPER[up++ % 4],
          el = h('blockquote', { class: 'rc-piece rc-paper rc-note' + (c.starred ? ' is-starred' : '') + (c.dir < 0 ? ' is-down' : (c.dir > 0 ? ' is-up' : '')) }, [
            c.starred ? h('span', { class: 'rc-star', role: 'img', aria: { label: U('starred') }, title: U('starred'), html: star() }) : null,
            h('p', { class: 'rc-type rc-note-t', text: c.text || '' }),
            h('footer', { class: 'rc-note-by' }, [
              c.byName ? h('span', { class: 'rc-note-who', html: mk('- ' + c.byName, 17, { seed: 'by' + i + seed, maxWidth: 150 }) }) : null,
              c.byName ? h('span', { class: 'cb-sr', text: c.byName }) : null,
              cause ? (typeof onNote === 'function' && c.noteKey
                ? h('button', { type: 'button', class: 'rc-cause pz-hl', data: { fk: 'cause-' + (c.id || i) }, on: { click: function () { onNote(c.noteKey, c); } } }, cause)
                : h('span', { class: 'rc-cause is-flat', text: cause })) : null
            ])
          ]);
      paper(el, stock, 'note' + i + seed, i % 2 ? 'tb' : 'trb'); turn(el, [-2.6, 1.8, -1.1, 2.6, -0.4][i % 5]);
      return el;
    })));
    return h('section', { class: 'rc-said' }, kids);
  }

  /* luck on fortune-cookie strips, and what went up online on screenshot slips, beside the index card */
  function asidePiece(r, seed) {
    var luck = r.luck || [], posts = (r.posts && r.posts.lines) || [], kids = [];
    if (luck.length) kids.push(h('ul', { class: 'rc-luck', aria: { label: U('luck') } }, luck.map(function (l, i) {
      var el = h('li', { class: 'rc-piece rc-paper rc-luckslip' }, [h('span', { class: 'rc-type', text: l.text || '' })]);
      paper(el, 'white', 'luck' + i + seed, 'lr'); turn(el, i % 2 ? 1.2 : -1.4);
      return el;
    })));
    if (posts.length) kids.push(h('ul', { class: 'rc-posts', aria: { label: R('posts') } }, posts.map(function (t, i) {
      var el = h('li', { class: 'rc-piece rc-post' }, [h('span', { class: 'rc-post-k', aria: { hidden: 'true' }, text: R('posted') }), h('span', { class: 'rc-post-t', text: t })]);
      turn(el, i % 2 ? -1.6 : 2);
      return el;
    })));
    return kids.length ? h('div', { class: 'rc-aside' }, kids) : null;
  }

  function learnedPiece(r, seed) {
    var ls = r.learned || [], el;
    if (!ls.length) return null;
    el = h('section', { class: 'rc-piece rc-paper rc-card' }, [
      h('h3', { class: 'rc-h', html: mk(U('learned'), 24, { seed: 'ln', maxWidth: 200 }) }),
      h('ul', { class: 'rc-card-l', aria: { label: U('learned') } }, ls.map(function (l) { return h('li', { class: 'rc-type rc-learned', text: l.text || l.label || '' }); }))
    ]);
    paper(el, 'index', 'card' + seed); turn(el, -0.8);
    el.style.removeProperty('background-image');                                   /* the ruled lines are drawn by css/cu-record.css */
    return el;
  }

  function donePiece(jobs, seed) {
    var done = (jobs || []).filter(function (j) { return j.status === 'DONE'; }), el;
    if (!done.length) return null;
    el = h('section', { class: 'rc-piece rc-paper rc-pad' }, [
      h('h3', { class: 'rc-h', html: mk(R('done'), 22, { seed: 'dn', maxWidth: 200 }) }),
      h('ul', { class: 'rc-pad-l' }, done.map(function (j) { return h('li', { class: 'rc-pad-i' }, [h('span', { class: 'rc-tick', html: check() }), h('span', { class: 'rc-type' }, [h('b', { text: j.label + (j.text ? ': ' : '') }), j.text ? h('span', { class: 'rc-pad-t', text: j.text }) : null])]); }))
    ]);
    paper(el, 'canary', 'pad' + seed, 't'); turn(el, 0.5);
    return el;
  }

  SB.UI.showRecord = function (s, v, o) {
    o = o || {};
    var show = v.show, r = show.result, room = v.room || (s.rooms && s.rooms[show.roomId]) || null, list, verdict;
    if (!r) return C().Empty({});
    list = setsOf(s, show, r);
    verdict = r.verdictLine ? turn(h('p', { class: 'rc-piece rc-verdict' }, [h('span', { class: 'rc-type', text: r.verdictLine })]), -1) : null;
    return h('section', { class: 'rc-sheet', aria: { label: R('title') } }, [
      h('h2', { class: 'cb-sr', text: R('title') }),
      h('div', { class: 'rc-top' }, [flyerPiece(s, show), h('div', { class: 'rc-mid' }, [photoPiece(s, show, r, list), verdict]), setPiece(s, show, room, list)]),
      h('div', { class: 'rc-money' }, [tallyPiece(show, r, room), staple('rc-staple--a'), staple('rc-staple--b'), cashPiece(r), envelopePiece(show, r)]),
      saidPiece(r, o.onNote, show.id),
      h('div', { class: 'rc-foot' }, [learnedPiece(r, show.id), asidePiece(r, show.id)]),
      donePiece(o.jobs, show.id)
    ]);
  };
})(SB);
