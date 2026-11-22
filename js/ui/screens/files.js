/* Scene Booker — ui/screens/files.js (the manila folder close-up, user 2026-11-22)
 * The folder on the desk holds a booker's paperwork, not the settings (those moved to the sticky pad under the phone):
 *   SETTLED SHOWS  one sheet per show played (or called off): the date, the room, the bill, the door, what you kept,
 *                  the night's line. Pressing a sheet opens that show's record.
 *   CHEAT SHEETS   every IN REAL LIFE lesson met so far, by the step of booking it belongs to (it lived at the foot of
 *                  the notebook's HOW page until this folder had room for it).
 * The open folder is drawn by js/desk/closeup.js ('drawer'); the layout borrows the settings folder's (css/cu-folder.css,
 * prefix sf-) and css/files.css (prefix fl-). Holds no game rule.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.files = {
    title: 'Files',
    tabs: { shows: 'settled shows', sheets: 'cheat sheets' },
    showsHead: 'Every show you’ve settled',
    showsNone: 'Nothing settled yet. After your first show is paid out, its sheet goes in here.',
    sheetsHead: 'How it works in real life',
    sheetsNone: 'No cheat sheets yet. Every time a show teaches you something about booking for real, it gets written down here.',
    open: 'Open the record of {when} at {room}',
    door: 'door', heads: 'people', kept: 'you kept', called: 'called off', noRoom: 'no room',
    owner: 'paperwork of', nobody: 'nobody yet'
  };

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function Kt() { return SB.UI.Kit; }
  function L(key, ctx) { return SB.text.label('ui.files.' + key, ctx); }
  function safe(fn, fb) { try { var v = fn(); return v === undefined ? fb : v; } catch (e) { SB.log('warn', 'files', String(e && e.message)); return fb; } }
  function num(n) { return typeof n === 'number' && isFinite(n); }
  function money(n) { return (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)); }

  var TAB = null;

  function mount(root) {
    function render() {
      var s = SB.UI.game(), tabs = ['shows', 'sheets'], body;
      if (!TAB || tabs.indexOf(TAB) < 0) TAB = tabs[0];
      SB.UI.clear(root);
      body = TAB === 'shows' ? showsSec(s) : sheetsSec(s);
      root.appendChild(h('div', { class: 'sf fl' }, [
        h('h1', { class: 'kt-sr', text: L('title') }),
        Kt().tabs({ list: tabs.map(function (t) { return { id: t, label: L('tabs.' + t) }; }), value: TAB, label: L('title'), idPrefix: 'fl-tab-', panel: 'fl-panel', cls: 'sf-tabs',
                    on: function (t) { TAB = t; render(); } }),
        h('div', { class: 'sf-page fl-page--' + TAB, id: 'fl-panel', role: 'tabpanel', aria: { labelledby: 'fl-tab-' + TAB } }, body)
      ]));
    }

    /* SETTLED SHOWS: the newest sheet on top */
    function showsSec(s) {
      var past = safe(function () { return SB.Shows.list(s, { status: ['PLAYED', 'CANCELLED'] }); }, []).slice().reverse();
      if (!past.length) return [h('h2', { class: 'fl-head', text: L('showsHead') }), h('p', { class: 'kt-pencil fl-none', text: L('showsNone') })];
      return [h('h2', { class: 'fl-head', text: L('showsHead') }), h('ol', { class: 'fl-sheets' }, past.map(function (x, i) { return h('li', null, sheet(s, x, i)); }))];
    }
    function sheet(s, x, i) {
      var show = (s.shows && s.shows[x.id]) || x, r = show.result || null, room = show.roomId && s.rooms ? s.rooms[show.roomId] : null,
          when = SB.time.fmt(show.day, 'short'), roomName = room ? room.name : L('noRoom'),
          bands = ((show.bill && show.bill.slots) || []).map(function (sl) { var b = sl && sl.bandId && s.bands ? s.bands[sl.bandId] : null; return b ? b.name : ''; }).filter(Boolean),
          called = show.status === 'CANCELLED', facts = [];
      if (r && num(r.heads)) facts.push([L('heads'), String(Math.round(r.heads))]);
      if (r && r.door && num(r.door.gross)) facts.push([L('door'), money(r.door.gross)]);
      if (r && num(r.playerNet)) facts.push([L('kept'), money(r.playerNet)]);
      return h('button', { type: 'button', class: 'fl-sheet pz-hl' + (called ? ' is-called' : '') + (i % 2 ? ' is-alt' : ''), data: { fk: 'file-' + show.id },
                           aria: { label: L('open', { when: when, room: roomName }) }, on: { click: function () { SB.UI.go('show', { showId: show.id }); } } }, [
        h('span', { class: 'fl-when', text: String(when).toUpperCase() }),
        h('span', { class: 'fl-room', text: roomName }),
        bands.length ? h('span', { class: 'fl-bill', text: bands.join(' / ') }) : null,
        called ? h('span', { class: 'fl-called', text: L('called').toUpperCase() }) : null,
        facts.length ? h('dl', { class: 'fl-facts' }, facts.map(function (f) { return h('div', null, [h('dt', { text: f[0] }), h('dd', { text: f[1] })]); })) : null,
        r && r.verdictLine ? h('span', { class: 'fl-line', text: r.verdictLine }) : null
      ]);
    }

    /* CHEAT SHEETS: every lesson met, by the step of booking it belongs to (the notebook's old WHAT YOU'VE LEARNED) */
    function sheetsSec(s) {
      var I = SB.Content && SB.Content.irl, list = SB.IRL && SB.IRL.learned ? safe(function () { return SB.IRL.learned(s) || []; }, []) : [],
          order = (I && I.steps) || ['DATE', 'ROOM', 'DEAL', 'BILL', 'CREW', 'ANNOUNCE', 'NIGHT', 'SETTLE'], by = {}, out = [h('h2', { class: 'fl-head', text: L('sheetsHead') })];
      function lineOf(key) {
        var i = key.indexOf(':'), kind = key.slice(0, i), id = key.slice(i + 1), c = SB.Content;
        if (kind === 'cause') return I && I.cause && I.cause[id] ? I.cause[id].line : '';
        if (kind === 'settle') return I && I.settle && I.settle[id] ? I.settle[id].line : '';
        if (kind === 'job') return c && c.jobs && c.jobs[id] ? c.jobs[id].why : '';
        return '';
      }
      list.forEach(function (x) { var t = lineOf(x.key); if (t) (by[x.step] = by[x.step] || []).push(t); });
      if (!Object.keys(by).length) { out.push(h('p', { class: 'kt-pencil fl-none', text: L('sheetsNone') })); return out; }
      out.push(h('div', { class: 'fl-cheats' }, order.filter(function (st) { return by[st]; }).map(function (st) {
        return h('section', { class: 'fl-cheat' }, [
          h('h3', { class: 'fl-step', text: String((I && I.stepLabel && I.stepLabel[st]) || st).toUpperCase() }),
          h('ul', null, by[st].map(function (t) { return h('li', { text: t }); }))
        ]);
      })));
      return out;
    }

    render();
    return { update: render };
  }

  SB.UI.screen('files', { rail: null, title: 'ui.files.title', full: false, mount: mount });
})(SB);
