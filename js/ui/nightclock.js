/* Scene Booker — js/ui/nightclock.js
 * SB.NightClock: tonight's clock, pinned to the same corner of every screen while a week is played (the desk and every
 * close-up), with the game's one CALL IT A NIGHT (user, 2026-11-21: "you should only be able to call it a night in one
 * place"). The tape deck, the calendar and the show card no longer call it a night: the deck, pressed at an evening,
 * nudges this clock. Close-ups make room for it at the stage's foot (css/clock.css, body.nc-on).
 *
 *   SB.NightClock.render(state, info)  redraw when what it says has changed. info: { full } (js/ui/app.js renderShell)
 *   SB.NightClock.preview(hours, el)   hatch on the ruler what a pointed-at button would take; 0 clears. el: that
 *                                      button, so a preview is dropped once its button is gone
 *   SB.NightClock.nudge()              shake it, say where a night is called, and put the keyboard on its button
 *                                      (the tape deck pressed at an evening)
 * Calling it a night is SB.UI.lamp.pull() (js/ui/app.js), with 'sb-callnight' fired on the document just before and
 * just after it ({ at: 'before' | 'after' }), so the show card can ask to be picked up again next evening.
 */
(function (SB) {
  'use strict';

  SB.Content.ui.nightclock = {
    region: 'Tonight', callNight: 'call it a night', toShow: 'go to the show',
    toShowSay: 'Go to the show: tonight is your show night, the doors are next',
    callNightSay: 'Call it a night: the night plays out, answers come overnight, and the next evening is yours',
    playOn: 'play on', playOnSay: 'Play on: let the days run to the next evening', pause: 'pause', pauseSay: 'Pause the days running',
    closeWeek: 'close the week', toClose: 'the week is done', toCloseSay: 'The week is done: back to its page, where the next week starts', closeWeekSay: 'Close the week: see how it went and start the next one',
    overnight: 'Overnight', gotIt: 'got it', quiet: 'Nobody has answered yet. They answer when they answer.',
    stayUp: 'stay up 1 hr', stayUpSay: 'Stay up one more hour: you can do more tonight, and tomorrow starts a little more tired',
    stayUpHint: 'a little more tired', things: 'Open the list of things to do tonight',
    skip: 'Skip to {day}: nothing\'s due until then', skipSay: 'Skip ahead to {day}: nothing is due until then, and the nights in between play out right now',
    callNightTip: 'Call it a night: you are done for today. Answers to your texts come in overnight and the next evening is yours.',
    skipped: 'Skipped to {day}.', weekDay: '{day}',
    still: 'Quiet night.', quietPools: 'quiet', flyerFilled: 'The bill is full, so you wrote the bands in on the flyer where it said TBA. Anything you print from now on has them.', onClock: 'Call it a night is on the clock.',
    YES: '{who} said yes.', NO: '{who} said no.', COUNTER: '{who} wrote back with a change. Answer them on the phone.',
    said: '{who}: “{text}”',
    gone: 'The request from {who} is gone. They booked somewhere else.', confirmed: '{date} at {room} is confirmed. The show is real.',
    more: '+{n} more on the phone',
    stillNot: 'You still haven\'t {thing}. Call it a night anyway?', stillYes: 'call it a night', stillNo: 'not yet'
  };

  /* What a quiet night says instead of "nothing changed" (2.1): somebody you know, in their own words. Who is named in {who}:
   * the mentor, a room, or a band from this town. Twelve for each. */
  SB.Content.ui.nightclock.quietLines = {
    mentor: [
      '{who} texted: "A slow week is normal. My first month of booking I mostly sat around watching my phone not ring."',
      '{who} texted: "Go eat something that did not come out of a vending machine. The flyers will still be there tomorrow."',
      '{who} sent a photo of an old flyer taped inside their closet door and wrote: "I kept the flyer from every show I ever booked, and the first ones went up on nights when nothing was happening."',
      '{who} texted: "I always did my best thinking on the bus home from work. Anything you want to rework before tomorrow?"',
      '{who} texted: "Nobody\'s written back yet? They\'re probably just busy, so I\'d give it a day or two before you follow up."',
      '{who} wrote: "I\'m at practice, so if you text me I won\'t see it until eleven. You\'re doing fine."',
      '{who} texted: "My first show had nine people and one of them was the sound guy, and I still wanted to do another."',
      '{who} wrote: "Put a pen next to your phone. Half of what I\'ve learned about booking I wrote on the back of a receipt."',
      '{who} texted: "Listen to a band you have not booked yet tonight. Pick one that has an actual recording out."',
      '{who} texted: "If a night is quiet, check that your flyer is hanging somewhere people actually walk past."',
      '{who} wrote: "Tuesdays are slow for everybody, so I always used mine to answer the messages I\'d been putting off."',
      '{who} texted: "Quick tip from my van days: always have a phone charger in the glove box. Other than that, I got nothing tonight."'
    ],
    host: [
      '{who} left a note on the door: "Took the trash out and swept up. The room is in decent shape if you need it."',
      '{who} sent a picture of the stage, freshly mopped, with no caption.',
      '{who} texted: "We had a band here last night who left their cables behind, so now we have a spare set if you need one."',
      '{who} posted that the heat is finally fixed, so the room will not be freezing for the next show.',
      '{who} wrote: "The neighbor stopped by to say hi, and it was a nice talk. No complaints so far."',
      '{who} texted: "Somebody dropped off a box of stickers for the merch table. They are actually kind of good."',
      '{who} left word at the bar: "Tell the booker we are not doing anything this weekend, so call if you want to ask about dates."',
      '{who} sent a text: "Got the new lock installed, so I will have a spare key cut for you this week."',
      '{who} wrote: "Quiet in here tonight. I fixed the loose wire on the PA while it was empty."',
      '{who} texted a thumbs up and a picture of the lights they replaced.',
      '{who} wrote: "Rain has been coming in by the back door, so I put down a rug and some buckets."',
      '{who} texted: "Slow night. Come by sometime and I will show you where the extension cords live."'
    ],
    band: [
      '{who} posted a clip from practice. The bass is way too loud in it, and they seem happy about that.',
      '{who} sent a text: "Sorry, the van is making a noise again. We are getting it looked at on Friday."',
      '{who} sent a photo of their new merch shirts, which are green and a little crooked.',
      '{who} wrote: "We wrote a new song on the porch tonight. It has three chords and a lot of yelling."',
      '{who} texted: "We have a day off from our jobs on Thursday, in case you hear about a spot."',
      '{who} posted a picture of the setlist, scratched out and rewritten twice.',
      '{who} sent a voice memo of someone laughing and a drum fill, and no explanation.',
      '{who} wrote: "Our singer lost their voice, so practice was mostly pizza."',
      '{who} texted: "Got the demo back from our friend. It sounds like a band, which is a relief."',
      '{who} sent a text: "Thanks for keeping us in mind. We are around if anything opens up."',
      '{who} wrote: "Somebody gave us a free amp and now we cannot get it up the stairs."',
      '{who} posted a photo from the thrift store. Somebody in the band bought a tambourine and nothing else.'
    ]
  };

  var el = null, key = null, info0 = {}, pv = { hours: 0, el: null }, nudging = null, sayEl = null, saying = null;

  function h(t, a, k) { return SB.UI.h(t, a, k); }
  function L(k, c) { return SB.text.label('ui.nightclock.' + k, c); }
  function safe(f, fb) { try { var v = f(); return v === undefined ? fb : v; } catch (e) { return fb; } }
  function doc() { return typeof document !== 'undefined' ? document : null; }
  function lampKey() { var l = safe(function () { return SB.UI.lamp.label(); }, null); return l ? l.key : ''; }
  function gone(e) { return !!e && e.isConnected === false; }

  function ensure() {
    var d = doc();
    if (el) return el;
    if (!d || !d.body || !SB.UI || !SB.UI.h) return null;
    el = h('section', { class: 'nc', id: 'nightclock', role: 'region', aria: { label: L('region') } });
    el.hidden = true;
    /* the folded clock opens on a tap of its strip (touch has no hover); the button inside still just presses */
    el.addEventListener('click', function (e) {
      if (e.target && e.target.closest && e.target.closest('button')) return;
      el.classList.toggle('is-open');
    });
    d.addEventListener('click', function (e) { if (el && !el.contains(e.target)) el.classList.remove('is-open'); }, true);
    d.body.appendChild(el);
    return el;
  }

  /* ---- the overnight slip: what came back while you slept, shown once at the next evening ---- */
  var snap = null, slipEl = null;
  function nameOf(s, id) {
    var m = [s.bands, s.people, s.rooms], i;
    /* a band that writes its name in lowercase is quoted, so "houses we left said yes" reads as a sentence; a room
     * ("the Fairfield Carport") is not */
    if (id && s.people && s.people[id] && s.people[id].first) return s.people[id].first;
    for (i = 0; i < m.length; i++) if (m[i] && id && m[i][id] && m[i][id].name) return i === 0 && /^[a-z]/.test(m[i][id].name) ? '\u201c' + m[i][id].name + '\u201d' : m[i][id].name;
    return '';
  }
  function takeSnap(s) {
    var shows = {};
    if (!s || !s.clock) return;
    Object.keys(s.shows || {}).forEach(function (k) { shows[k] = s.shows[k].status; });
    snap = { seed: s.seed, day: s.clock.day, shows: shows,
             waiting: Object.keys(s.asks || {}).some(function (k) { var a = s.asks[k]; return !a.answer && a.status !== 'WITHDRAWN'; }) };
  }
  /* "Sierra: \"Sure, park on the street.\"": the first two sentences of what they wrote, at most 150 characters; '' when nothing was written */
  function quoteOf(who, text) {
    var t = String(text || '').replace(/\s+/g, ' ').trim(), m;
    if (!t || /^\(/.test(t)) return '';
    m = t.match(/^(.+?[.!?])(\s+.+?[.!?])?(\s|$)/);
    t = m ? (m[1] + (m[2] || '')).trim() : t;
    if (t.length > 150) t = t.slice(0, 147).replace(/\s+\S*$/, '') + '...';
    return L('said', { who: who, text: t });
  }
  function overnightLines(s, sn) {
    var out = [];
    Object.keys(s.asks || {}).forEach(function (k) {
      var a = s.asks[k], st = a.answer && a.answer.status, who;
      if (!a.answer || a.answer.day == null || a.answer.day <= sn.day || !(st === 'YES' || st === 'NO' || st === 'COUNTER')) return;
      who = nameOf(s, a.toId);
      /* the answer in the sender's own words, one or two sentences (fix-list 2.5); "X said yes." only when they wrote nothing */
      if (who) out.push({ t: quoteOf(who, a.answer.text) || L(st, { who: who }), hot: st !== 'YES' });
    });
    Object.keys(s.shows || {}).forEach(function (k) {
      var x = s.shows[k];
      if (x.status === 'CONFIRMED' && sn.shows[k] !== 'CONFIRMED')
        out.push({ t: L('confirmed', { date: SB.time.fmt(x.day, 'short'), room: nameOf(s, x.roomId) || '?' }) });
      if (x.promo && x.promo.flyer && x.promo.flyer.filledDay != null && x.promo.flyer.filledDay > sn.day) out.push({ t: L('flyerFilled') });
    });
    Object.keys(s.requests || {}).forEach(function (k) {
      var q = s.requests[k], who;
      if (q.closedDay == null || q.closedDay <= sn.day || !(q.status === 'LAPSED' || q.status === 'IGNORED' || q.status === 'WITHDRAWN')) return;
      who = nameOf(s, q.bandId);
      if (who) out.push({ t: L('gone', { who: who }), hot: true });
    });
    return out;
  }
  function dropSlip() { if (slipEl && slipEl.parentNode) slipEl.parentNode.removeChild(slipEl); slipEl = null; }
  function showSlip(lines, waiting) {
    var d = doc(), MAX = 6, list;
    dropSlip();
    if (!d || !d.body) return;
    list = lines.length ? lines.slice(0, MAX).map(function (x) { return h('li', { class: x.hot ? 'is-hot' : '', text: x.t }); })
                        : [h('li', { text: L(waiting ? 'quiet' : 'still') })];
    if (lines.length > MAX) list.push(h('li', { class: 'is-more', text: L('more', { n: lines.length - MAX }) }));
    slipEl = h('section', { class: 'on-slip pz-paper', role: 'status', aria: { label: L('overnight') } }, [
      h('h2', { class: 'on-head', text: L('overnight') }),
      h('ul', { class: 'on-list' }, list),
      h('button', { type: 'button', class: 'on-ok pz-hl', text: L('gotIt').toUpperCase(), on: { click: dropSlip } })
    ]);
    if (d.body.firstChild) d.body.insertBefore(slipEl, d.body.firstChild); else d.body.appendChild(slipEl);   // first in the Tab order, not after the whole page (keyboard play, 0.9)
    /* a morning card, not a DONE to press (fix-list 1.19): the first press anywhere else puts it away and still does its own thing */
    (function (el) {
      function away(e) {
        if (slipEl !== el) { d.removeEventListener('pointerdown', away, true); return; }
        if (e && e.target && el.contains && el.contains(e.target)) return;
        d.removeEventListener('pointerdown', away, true);
        dropSlip();
      }
      if (d.addEventListener) d.addEventListener('pointerdown', away, true);
      /* Escape puts the card away first, before it opens the quick menu */
      function esc(e) {
        if (slipEl !== el) { d.removeEventListener('keydown', esc, true); return; }
        if (e.key !== 'Escape') return;
        d.removeEventListener('keydown', esc, true);
        e.preventDefault(); e.stopPropagation(); dropSlip();
      }
      if (d.addEventListener) d.addEventListener('keydown', esc, true);
    })(slipEl);
  }
  function checkSlip(s, t) {
    if (snap && s && snap.seed !== s.seed) snap = null;
    if (!snap || !t || !s || !s.clock || s.clock.day <= snap.day || lampKey() !== 'night') return;
    var sn = snap; snap = null;
    var lines = safe(function () { return overnightLines(s, sn); }, []) || [];
    if (!lines.length) { sayOn(quietLine(s)); return; }  // nothing came back: one line on the clock, no card to click through (2.1)
    showSlip(lines, sn.waiting);
  }

  /* a quiet night: one line from the mentor, a room or a band from this town, picked by the seed and the day */
  function quietLine(s) {
    var pools = SB.Content.ui.nightclock.quietLines || {}, r = SB.rng.make('quiet:' + s.seed + ':' + s.clock.day), roles = [], who, k, list, men;
    men = safe(function () { return SB.Rungs.mentor(s); }, null);
    if (men && s.people && s.people[men] && s.people[men].first) roles.push(['mentor', s.people[men].first]);
    k = Object.keys(s.rooms || {}).filter(function (i) { return s.rooms[i] && s.rooms[i].name; });
    if (k.length) roles.push(['host', s.rooms[k[r.int(0, k.length - 1)]].name]);
    k = safe(function () { return SB.Bands.list(s, { local: true, active: true }); }, []) || [];
    if (k.length) { who = nameOf(s, typeof k[0] === 'string' ? k[r.int(0, k.length - 1)] : k[r.int(0, k.length - 1)].id); if (who) roles.push(['band', who]); }
    if (!roles.length) return L('still');
    k = roles[r.int(0, roles.length - 1)];
    list = pools[k[0]] || [];
    return list.length ? list[r.int(0, list.length - 1)].replace(/\{who\}/g, k[1]) : L('still');
  }

  /* While the walkthrough is on and tonight's step has something to do tonight, CALL IT A NIGHT asks once per step: the clock
   * swaps the button for the question, with CALL IT A NIGHT and NOT YET. Never when the step waits on someone else, or the
   * hours are spent. */
  var asking = null, askedFor = null, askGame = null;
  function undone(s) {
    var u = s && s.story && s.story.tutorial && s.story.tutorial.on && SB.Tutorial && SB.Tutorial.undone ? safe(function () { return SB.Tutorial.undone(s); }, null) : null;
    return u && u.thing ? u : null;
  }
  function press() {
    var s = safe(function () { return SB.UI.game(); }, null), t = s ? safe(function () { return SB.Week.tonight(s); }, null) : null, u, k;
    if (s !== askGame) { askGame = s; asking = null; askedFor = null; }   // a new game asks afresh
    if (lampKey() === 'night' && t && t.left > 0 && !showTonight()) {
      u = undone(s); k = u ? u.step + ':' + u.stage : null;
      if (u && askedFor !== k) { askedFor = k; asking = u.thing; render(s, info0); focusAsk(); return; }
    }
    asking = null;
    call();
  }
  function focusAsk() {
    var b = el && el.querySelector ? el.querySelector('[data-fk="callnight"]') : null;
    if (b && b.focus) { try { b.focus({ preventScroll: true }); } catch (x) { b.focus(); } }
  }
  function notYet() { asking = null; render(safe(function () { return SB.UI.game(); }, null), info0); }
  function askGroup() {
    return h('div', { class: 'ck-group ck-ask', role: 'group', aria: { label: L('stillNot', { thing: asking }) }, style: { display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'stretch' } }, [
      h('p', { class: 'ck-asktext', text: L('stillNot', { thing: asking }) }),
      h('button', { type: 'button', class: 'ck-call pz-hl', data: { fk: 'callnight' }, text: L('stillYes').toUpperCase(), on: { click: function () { asking = null; call(); } } }),
      h('button', { type: 'button', class: 'ck-call ck-stay pz-hl is-hot', data: { fk: 'notyet', tut: 'night' }, text: L('stillNo').toUpperCase(), on: { click: notYet } })
    ]);
  }

  function call() {
    if (lampKey() !== 'night') return;
    dropSlip();
    takeSnap(safe(function () { return SB.UI.game(); }, null));
    SB.UI.fire('sb-callnight', { at: 'before' });
    SB.UI.lamp.pull();
    SB.UI.fire('sb-callnight', { at: 'after' });
  }

  function showTonight() {
    return safe(function () {
      var s = SB.UI.game(), k, sh;
      if (!s || !s.shows || !s.clock) return false;
      for (k in s.shows) { sh = s.shows[k]; if (sh && sh.status === 'CONFIRMED' && sh.day === s.clock.day) return true; }
      return false;
    }, false);
  }
  function button(t) {
    /* the week is over: the same corner holds the way on, so nobody has to hunt the tape deck for it */
    /* the week is closed but its page was put away: the clock leads back to it, where the next week starts */
    if (lampKey() === 'next') return h('button', { type: 'button', class: 'ck-call pz-hl is-hot', data: { fk: 'toclose' },
                         aria: { label: L('toCloseSay') }, text: L('toClose').toUpperCase(), on: { click: function () { dropSlip(); SB.UI.go('close'); } } });
    if (lampKey() === 'close') return h('button', { type: 'button', class: 'ck-call pz-hl is-hot', data: { fk: 'closeweek', tut: 'night' },
                         aria: { label: L('closeWeekSay') }, text: L('closeWeek').toUpperCase(), on: { click: function () { dropSlip(); SB.UI.lamp.pull(); } } });
    /* on a show's own night the same press heads to the door (the night plays to the show), so it says so */
    var show = showTonight();
    return h('button', { type: 'button', class: 'ck-call pz-hl' + (t.left <= 0 || show ? ' is-hot' : ''), data: { fk: 'callnight', tut: 'night' },
                         title: show ? L('toShowSay') : L('callNightTip'),
                         aria: { label: L(show ? 'toShowSay' : 'callNightSay') }, text: L(show ? 'toShow' : 'callNight').toUpperCase(), on: { click: press } });
  }

  /* the extras beside the one press (0.8, 2.1, 2.6): STAY UP 1 HR, SKIP TO <day>, and on an open night the top two things to do.
   * Each acts on the spot; CALL IT A NIGHT stays one press and is always the first button. */
  /* what the stay-up hour costs, in the one sentence strings.stay.cost keeps (1.22 step 5) */
  function stayCost() {
    return safe(function () { return SB.text.label('stay.cost', { n: SB.Config.STRESS.UP.OVERTIME }); }, L('stayUpSay'));
  }
  function group(t) {
    var main = button(t), extra = [], s, q, st, qk;
    if (lampKey() !== 'night' || !t) return main;
    s = safe(function () { return SB.UI.game(); }, null);
    if (asking) {
      /* the question goes when the thing it names has been done (or the game changed) */
      qk = undone(s);
      if (s === askGame && qk && qk.thing === asking) return askGroup();
      asking = null;
    }
    st = t.stay || {};
    if (!showTonight()) {
      if (t.left <= 0 && st.left > 0 && SB.UI.evening)
        extra.push(h('button', { type: 'button', class: 'ck-call ck-stay pz-hl', data: { fk: 'stayup' }, aria: { label: L('stayUpSay') + '. ' + stayCost() },
                                 title: stayCost(), text: L('stayUp').toUpperCase() + ', ' + L('stayUpHint'),
                                 on: { click: function () { SB.UI.evening.open(); } } }));
      q = s ? safe(function () { return SB.Week.quiet(s); }, null) : null;
      if (q) {
        qk = SB.time.fmt(q.day, 'dow');
        extra.push(h('button', { type: 'button', class: 'ck-call ck-skip pz-hl', data: { fk: 'skip' }, aria: { label: L('skipSay', { day: qk }) },
                                 text: L('skip', { day: qk }).toUpperCase(), on: { click: function () { skipTo(q.day); } } }));
      }
      /* the two evening activities that used to sit under CALL IT A NIGHT were taken off 2026-11-24 (user: "call it a
         night is enough"); they are still on the TONIGHT list on the desk */
    }
    if (!extra.length) return main;
    return h('div', { class: 'ck-group', style: { display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'stretch' } }, [main].concat(extra));
  }

  /* SKIP TO <day>: the nights between play out right now, up to the day the next thing lands or the next thing that
   * needs the player; one morning card says what happened (2.1). Never routes to the calendar. */
  function skipTo(day) {
    var s = safe(function () { return SB.UI.game(); }, null), g = 0, n, c, r;
    if (!s) return;
    dropSlip();
    takeSnap(s);
    SB.UI.fire('sb-callnight', { at: 'before' });
    while (g++ < 21) {
      c = s.clock;
      if (!c.stop || c.stop.kind !== 'EVENING' || c.day >= day) break;
      /* after the first night: stop on the evening something lands (a reply that needs you, a job whose window opens) */
      if (g > 1 && !safe(function () { return SB.Week.quiet(s); }, null)) break;
      r = SB.UI.act(function (x) { return SB.Week.endNight(x); });
      if (!r || r.ok === false) break;
      n = 0;                                               // the night's own steps, counted apart from the nights
      while (n++ < 60 && s.clock.phase === 'PLAY' && !s.clock.stop) {
        r = SB.UI.act(function (x) { return SB.Week.step(x); });
        if (!r || r.ok === false) break;
      }
    }
    SB.UI.fire('sb-callnight', { at: 'after' });
    SB.UI.toast(L('skipped', { day: SB.time.fmt(s.clock.day, 'short') }), 'info');
    /* a stop that needs the player (a reply, a decision, the doors) is the play loop's to open */
    if (s.clock.stop && s.clock.stop.kind !== 'EVENING') SB.UI.fire('sb-play', { cmd: 'resume' });
    render(s, info0);
  }
  /* the rest of tonight (js/ui/evening.js): beside CALL IT A NIGHT while the evening is up */
  /* (the THINGS TO DO button came off the clock 2026-11-22: the to-do list on the desk opens them, js/desk/scene.js) */
  function things(t) {
    if (lampKey() !== 'night' || !SB.UI.evening) return null;
    return h('button', { type: 'button', class: 'ck-things pz-hl' + (t.left > 0 ? ' is-on' : ''), data: { fk: 'things' },
                         aria: { label: SB.text.label('ui.evening.openSay') }, text: SB.text.label('ui.evening.open').toUpperCase(),
                         on: { click: function () { SB.UI.evening.open(); } } });
  }

  /* between evenings: PLAY ON when the nights are stopped, PAUSE while they run (the tape deck's job until 2026-11-22,
     when the user had it taken off the desk: the clock is the one place time is moved) */
  function playButton() {
    var k = lampKey();
    if (k !== 'resume' && k !== 'pause') return null;
    return h('button', { type: 'button', class: 'ck-call pz-hl', data: { fk: k === 'resume' ? 'playon' : 'pause', tut: 'night' },
                         aria: { label: L(k === 'resume' ? 'playOnSay' : 'pauseSay') }, text: L(k === 'resume' ? 'playOn' : 'pause').toUpperCase(),
                         on: { click: function () { SB.UI.lamp.pull(); } } });
  }

  /** render(state, info): shown while a week is played on the desk or a close-up; hidden on a full screen. */
  function render(s, info) {
    var e = ensure(), d = doc(), t = null, cr, ink, btnOn, k;
    info0 = info || {};
    if (!e) return;
    if (s && s.clock && s.clock.phase === 'PLAY' && !info0.full && SB.Clock && SB.Week) t = safe(function () { return SB.Week.tonight(s); }, null);
    if (d && d.body && d.body.classList) d.body.classList.toggle('nc-on', !!t);
    if (!t) {
      /* no evening to show, but the week is playing: the clock is just its PLAY ON / PAUSE button */
      /* or, once the evenings are over, CLOSE THE WEEK (and after that, the way back to the week's page): with no evening
         left these used to be drawn nowhere, so the NEXT strip pointed at a button that was not there (playtests 2 and 4) */
      var lk = lampKey(), pb = s && s.clock && (s.clock.phase === 'PLAY' || s.clock.phase === 'CLOSE') && !info0.full
        ? (playButton() || (lk === 'close' || (lk === 'next' && safe(function () { return SB.UI.route(); }, '') !== 'close') ? button(null) : null)) : null;
      if (pb) {
        e.hidden = false;
        if (d && d.body && d.body.classList) d.body.classList.add('nc-on');
        k = 'play|' + lampKey();
        if (k === key) return;
        key = k; SB.UI.clear(e);
        e.appendChild(h('div', { class: 'ck-slip nc-slip nc-slip--play' }, [h('div', { class: 'ck-foot' }, [pb])]));
        retape();
        return;
      }
      e.hidden = true; key = null; if (!s || !s.clock || s.clock.phase !== 'PLAY') { dropSlip(); snap = null; } return;
    }
    e.hidden = false;
    checkSlip(s, t);
    if (pv.el && gone(pv.el)) pv = { hours: 0, el: null };
    cr = safe(function () { return SB.Week.crunch(s); }, []) || [];
    ink = SB.Clock.hot(s);
    btnOn = lampKey() === 'night' || lampKey() === 'close' || lampKey() === 'next' || lampKey() === 'resume' || lampKey() === 'pause';
    k = JSON.stringify([t, cr.slice(0, 1), ink, btnOn && lampKey(), asking, asking ? !!undone(s) : 0, pv.hours, safe(function () { return SB.Week.quiet(s); }, null)]);
    if (k === key) return;
    key = k;
    SB.UI.clear(e);
    void things;
    e.appendChild(SB.Clock.slip(s, { tonight: t, list: cr, crunch: 1, short: true, hot: ink, extra: pv.hours, cls: 'nc-slip', foot: btnOn ? (playButton() || group(t)) : null }));
    if (sayEl) e.appendChild(sayEl);                             // a redraw keeps the line that is up
    retape();
  }
  /* the button was rebuilt: the walkthrough's tape, if it was on it, finds the new one */
  function retape() { if (SB.UI.story && typeof SB.UI.story.retape === 'function') safe(function () { SB.UI.story.retape(); }, null); }

  /** preview(hours, el): what a button would take, hatched from now on; preview(0, el) takes that button's off again. */
  function preview(hours, src) {
    var n = hours > 0 ? hours : 0;
    if (!n && src && pv.el && pv.el !== src) return;            // another button's preview is up: leave it
    pv = { hours: n, el: n ? (src || null) : null };
    render(safe(function () { return SB.UI.game(); }, null), info0);
  }

  /* a line on the clock for a few seconds (role status, so it is read out too) */
  function dropSay() { if (saying) clearTimeout(saying); saying = null; if (sayEl && sayEl.parentNode) sayEl.parentNode.removeChild(sayEl); sayEl = null; }
  function sayOn(text) {
    if (!el) return;
    dropSay();
    sayEl = h('p', { class: 'nc-say', role: 'status', text: text });
    el.appendChild(sayEl);
    if (typeof setTimeout === 'function') saying = setTimeout(dropSay, 3200);
  }

  /** nudge(): the clock jumps, so the eye finds it, says where a night is called, and the keyboard is put on CALL IT A NIGHT. */
  function nudge() {
    var b = el && el.querySelector ? el.querySelector('.ck-call') : null;
    if (!el || el.hidden) return;
    el.classList.remove('is-nudged');
    if (nudging) clearTimeout(nudging);
    void el.offsetWidth;                                         // restart the jump if it is already running
    el.classList.add('is-nudged');
    nudging = setTimeout(function () { nudging = null; if (el) el.classList.remove('is-nudged'); }, 700);
    sayOn(L('onClock'));
    if (b && b.focus) { try { b.focus({ preventScroll: true }); } catch (x) { b.focus(); } }
  }

  SB.NightClock = { render: render, preview: preview, nudge: nudge, callNight: call, press: press };
})(SB);
