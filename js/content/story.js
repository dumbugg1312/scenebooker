/* Scene Booker — content/story.js   (role WRITER)
 * Act I in words: the first-show walkthrough (Dana's texts), the chapter cutscenes, Dana's desk-drops, the bad-month drops,
 * the chapter list and the patch cards. Shape and ids: design/spec/09a-build-contract.md. Beats: 09-tutorial-story-patches.md.
 * Voice: design/story.md section 1 and 1.2a. People talk in ordinary full sentences, no clipped lines or tidy morals.
 * Data only: one assignment, no functions.
 *
 * Slots everywhere: outgoing, bookingName, town, bigCity, sound, host, room, curfew.
 * Per-item slots (the engine fills them; an empty slot renders as nothing):
 *   tutorial.*            touring (the touring band), touringHome (where they're from), local (the big local draw),
 *                         kids (the kids' band that opens), date ("Feb 14"), dow ("Saturday"), soundRate (number),
 *                         sender (the name on the touring band's message, as the phone lists it)
 *                         A step may have `stages`: one more text for what to do right now inside the step
 *                         (the engine picks the stage; SB.Tutorial.current(state).stage).
 *   GOING_AWAY_open       band1 (the young local band, opens), band2 (the touring band, second to last), band2Home,
 *                         band3 (the big local draw, last). These three names are also `who` values in that scene.
 *   DOORS_AT_8_close      paid (number paid at the door)
 *   OUT_OF_STATE_*        touring, touringHome
 *   THIN_open             paid
 *   FACES_open            regular (a regular's name)
 *   ASK_FOR_YOU_open      band (the band that wrote), referrer (the band that told them)
 *   POSTCARD_open         local (the band you might send)
 *   SWAP_open             peer (the other booker), peerTown, band (their band), local (yours)
 *   YOUR_BAND_open        band
 *   LAST_CALL_*           newRoom (close only); flags SOLD | POLICE | BEHAVIOR, one set, the reason the room closed
 *   ALL_AGES_*            newRoom (the all-ages room); close: flag kept (it lasted the year), else one of SOLD | POLICE | BEHAVIOR
 *   ROOM_GONE             flags SOLD | POLICE | BEHAVIOR as for LAST_CALL
 * Every cause-flagged pick also has an unguarded option, which renders when no flag is set.
 */
SB.Content.story = {

  tutorial: {
    /* Spec 14 "Text budget": every line {outgoing} sends during the walkthrough (a stage line, a nudge, a wrong line,
     * the clock lesson) is 25 words at most and says one thing. The phone and the strip show one line at a time: the
     * stage's own (`stages.*`), else the nudge or the wrong line. A step's `text` is the longer why-it-works, folded under
     * a "why?" on that line (js/ui/story.js), with `where` (the map of the whole show) under it. Never pushed. */
    intro: "Okay, you've got a show to book. I'll text you through this first one, and after that you're on your own, because I won't be here.",
    /* The clock lesson (spec 14, night 1): said once, right after the first thing that costs time (BOOK IT), with the
     * tape on the night clock (SB.Tutorial.current stage CLOCK). Slots: cost and left, in words ("half an hour"). */
    clock: "Everything costs time. That took {cost}, and you've got {left} left tonight. Replies come overnight: ask, then call it a night.",
    /* the same lesson on a night nothing has been spent yet (BOOK IT one night, the night called at once): no {cost} */
    clockNew: "You've got {left} tonight, and everything you do costs time. Replies come overnight, so ask, then call it a night.",
    /* One new thing a night (spec 14, the night table): tonight's lesson is done and the next one is tomorrow's.
     * SB.Tutorial.current gives stage WAIT with this line. */
    rest: "That's enough new stuff for one night. Answers come overnight, so call it a night.",
    /* Staying up, the first time the hours run out with work still open (stage OUT). The choice is the player's. */
    stayUp: "You're out of hours. You can stay up one more, but tomorrow starts a little tired. Calling it a night is fine too.",
    skip: {
      label: "I've done this before",
      line: "Okay, then I'll leave you alone. You know where the tin is. Call me if the room falls through or something, I'll still pick up."
    },
    /* the map of the whole show under each step's "why?", the part you're on in capitals */
    where: {
      ANSWER: "Where you are: THE DATE > room > bands > sound > flyer > word out > the night > pay out.",
      HOLD: "Where you are: the date > ROOM > bands > sound > flyer > word out > the night > pay out.",
      BILL: "Where you are: the date > room > BANDS > sound > flyer > word out > the night > pay out.",
      SOUND: "Where you are: the date > room > bands > SOUND > flyer > word out > the night > pay out.",
      FLYER: "Where you are: the date > room > bands > sound > FLYER > word out > the night > pay out.",
      PROMO: "Where you are: the date > room > bands > sound > flyer > WORD OUT > the night > pay out.",
      WAIT: "Where you are: the date > room > bands > sound > flyer > word out > THE NIGHT > pay out.",
      DOOR: "Where you are: the date > room > bands > sound > flyer > word out > THE NIGHT > pay out.",
      SETTLE: "Where you are: the date > room > bands > sound > flyer > word out > the night > PAY OUT.",
      CLOSEOUT: "Where you are: past the whole map, at the close-out."
    },
    steps: {
      ANSWER: {
        text: "Most shows start like this, with a band asking you for a night. {touring} are from {touringHome}. A week and a half is tight, but {room} can do it.",
        nudge: "hey, you still there? {touring} are waiting to hear back. just tell them {dow} works",
        stages: {
          REPLY: "{touring} want {dow}, {date}. Open {sender}'s message and tell them {dow} works. Saying yes is what makes it a show."
        }
      },
      HOLD: {
        text: "Get the room before you ask any bands. I once told a band they had a show, then the house fell through, and I had to call them back.",
        nudge: "still no room? if you haven't asked {host} about {dow} yet, do that before you ask any bands",
        stages: {
          ASK: "Text {host} and ask them to hold {dow} at {room} for you. Get the room before you ask any bands.",
          WAIT: "{host} answers overnight. You can pick something off the TONIGHT list on the desk, or just call it a night.",
          HELD: "{host} is holding {dow} for you. Send anything they asked for, then call it a night. It should be yours by morning."
        }
      },
      BILL: {
        text: "Three bands make a night. {kids} bring friends who show up early, {touring} play second to last while everybody's still there, and {local} close, so nobody leaves before {touring} are done.",
        nudge: "how's the bill coming? you want {kids} first, then {touring}, then {local} last",
        wrong: "If {local} play before {touring}, half the room goes home early. Put {kids} first, {touring} second, and {local} last.",
        stages: {
          OFFER: "The room's yours. Make {touring} an offer. The door deal they asked for is a fair one.",
          LOCAL: "Ask {local} to close. People here come out for them any night, and they're happy with a cut of the door.",
          KIDS: "Ask {kids} to open. Their friends come early to see them, so the room's already full for {touring}.",
          WAIT: "Everybody's asked, and nobody answers till tomorrow. Pick something off the TONIGHT list, or call it a night.",
          ORDER: "Fix the order on the bill: {kids} first, then {touring}, then {local} last."
        }
      },
      SOUND: {
        text: "The bands bring their own amps and drums, but somebody has to bring a PA and run it. {sound} is late every time but has never missed a show. You work the door yourself: you take the money and count who comes in.",
        nudge: "you still need somebody on sound. text {sound}, don't call, {sound} never picks up",
        stages: {
          ASK: "Somebody has to run the PA. Text {sound}. It's {soundRate:money} a night.",
          WAIT: "{sound} will say yes tomorrow. I've never heard {sound} say no. Call it a night."
        }
      },
      FLYER: {
        text: "A flyer only needs the room and the date. Bands that haven't answered go on it as TBA. The longer you wait to put it out, the more people already have plans that night.",
        nudge: "did you make the flyer yet? try to do it tonight if you can",
        wrong: "That flyer went out late, so some people already had plans. It still helps. Next time, make it the day you get the room.",
        stages: {
          NAME: "Every flyer says who's putting it on. Open the flyer desk and give your shows a name.",
          MAKE: "Open the flyer desk and paste up the flyer. Change whatever you want, and when it looks right, use it."
        }
      },
      PROMO: {
        text: "Posters, the listings, the mailing list and invites each reach different people. A work night gives you four hours and a day off gives you ten, so save the big jobs for days off.",
        nudge: "the flyer's not doing anything sitting on your desk. get it out there",
        stages: {
          PLAN: "Get the word out. Do whatever's due soonest tonight. Every job says how long it takes and when it's due.",
          PLAN_FLYER: "Make the flyer tonight. Every other job waits on it, and each one says how long it takes and when it's due.",
          /* '<stage>_OFF': said in place of the stage's line on the first day off (the ten hours, spec 14 night 6) */
          PLAN_OFF: "It's your day off, so you've got ten hours. Do whatever's due soonest, and the rest of the night is yours.",
          PLAN_FLYER_OFF: "It's your day off, so you've got ten hours. Make the flyer first, because every other job waits on it.",
          WAIT: "That's all the hours you've got tonight. The rest can go on other nights, so call it a night."
        }
      },
      WAIT: {
        text: "Answer the bands that write you while you wait, even if the answer's no. A band you turn down now might be your next show in the fall.",
        nudge: "you've still got mail you haven't answered. even a no is better than nothing",
        stages: {
          PLAY: "Nothing left to book until the show. Answer any mail that comes in, then call it a night.",
          PLAY_OFF: "Days off you get ten hours. Answer any mail that came in, and the rest of the night is yours.",
          EVE: "The show's tomorrow. Do whatever's still open tonight, then call it a night."
        }
      },
      DOOR: {
        text: "Working the door is the booker's job at most house shows. Stamp hands, count the money twice, and don't let all your friends in free, I know how that goes.",
        nudge: "it's time to open the doors. grab the tin and the stamp",
        stages: {
          PLAY: "Do whatever's still open tonight, then call it a night. The show is {dow}.",
          OPEN: "It's show night. Press GO TO THE SHOW on the clock, then open the doors.",
          DOOR: "You're the door. Count everybody who comes in, because that count is what everybody gets paid from."
        }
      },
      SETTLE: {
        text: "Everybody gets paid out of the door at the end of the night. {touring} go before the locals because they drive tomorrow. Whatever's left is yours, and it's usually not much.",
        nudge: "pay everybody before they load out. {touring} have to drive tomorrow",
        stages: {
          SETTLE: "It's all in the envelope. Pay the room, {sound} and {touring} first, then the locals. Whatever's left is yours."
        },
        /* one line for each part of the envelope, in the order it is paid (SB.Tutorial.payout): who, and why then */
        tabs: {
          ROOM: "Pay {room} first. A room that gets paid on the night says yes the next time you ask.",
          SOUND: "Then {sound}, who carried the PA in and ran it all night.",
          TOURING: "Then {touring}. They drive tomorrow, and the door money is their gas.",
          LOCALS: "Then the locals. They sleep at home tonight, so they go after the band that's driving.",
          YOU: "Whatever's left in the envelope is yours. It's usually not much, and that's normal."
        }
      },
      CLOSEOUT: {
        text: "Read what people said about the show, then write down what you'd do differently next time. I wish I'd started doing that sooner.",
        nudge: "read the close-out when you get a chance. it's how you figure out what to change",
        stages: {
          READ: "Let the rest of the week go by, then close it out. That's where you'll see what everybody said."
        }
      }
    },
    /* What finishes "You still haven't ..." when CALL IT A NIGHT is pressed with tonight's step undone (SB.Tutorial.undone;
     * js/ui/nightclock.js). Only the stages where there is something to do tonight. */
    undone: {
      ANSWER_REPLY: "answered {touring}",
      HOLD_ASK: "asked {host} to hold the date at {room}",
      HOLD_CLOCK: "asked {host} to hold the date at {room}",
      HOLD_HELD: "sent {host} what they asked for",
      BILL_OFFER: "made {touring} an offer",
      BILL_KIDS: "asked {kids} to open",
      BILL_LOCAL: "asked {local} to close",
      BILL_ORDER: "put the bill in order",
      SOUND_ASK: "asked {sound} about running sound",
      FLYER_NAME: "made the flyer",
      FLYER_MAKE: "made the flyer",
      PROMO_PLAN: "done tonight's job for getting the word out"
    },
    /* After the guided show (or a skipped one): one text from {outgoing} the first time each hard thing happens, so a
     * new player (a twelve-year-old, say) hears what happened, why, and what to try. Shown once each, by js/ui/story.js
     * (firsts()). First line says what to do; the color comes after. Asked for 2026-11-21. */
    after: {
      LATE: "Your {date} show is {n} days out and it's still {missing}. Do that tonight before anything else. When you let a show slide like that, fewer people come.",
      LOSS: "You lost {amount} on {date}. That happens to everybody, I promise. Not enough people came to cover what the night cost. Next time you could try a door deal instead of a guarantee, add a band people here already like, or spend a few more nights getting the word out.",
      NO_ROOM: "{name} said no to the room. You can ask a different room, or ask {name} about another night. Places usually say no because they're already booked or they don't know you yet.",
      NO_BAND: "{name} said no. That happens a lot, so don't take it personally. Their text usually says why: they're busy that night, it's too soon, the money's too low, or they just don't know you yet. Ask another band tonight.",
      NO_CREW: "{name} can't do it. Everybody's got a day job and stuff comes up. Ask somebody else tonight.",
      COUNTER: "{name} wrote back asking for a different deal, which is called a counter. It's on your phone. You can take their deal, offer something else, or pass.",
      SILENT: "{name} never wrote back. If somebody doesn't answer, take it as a no and ask somebody else. Don't sit around waiting on them.",
      SECOND: "Somebody else asked {room} for that night before you did. You're second in line, so you only get it if they drop it. It's probably safer to ask another room.",
      CRUNCH: "You've got more due than you have nights to do it. Do whatever's due soonest first. You get more hours on your days off, so save the big stuff for those.",
      NO_HOURS: "You're out of hours for tonight, so everything else will have to wait. Call it a night.",
      STUCK: "Still stuck on this one? {next} If you can't get to it tonight, call it a night and try again tomorrow."
    },
    /* what the player really did: flyered, how many came, who got paid (flags from ui/story.js afterFlags) */
    done: "That's a whole show: you booked it, [?flyered: flyered it, | ]counted the door and [?short: paid who you could, which is the part to fix next time. | paid everybody.] The next one is yours to start, and I'm going to bed, so I won't be texting you through it.",
    lapsed: "Looks like you've got it from here. The show I was walking you through fell through, and that happens to everybody. The next one is yours to start, and I'll pick up if you call.",
    doneList: "For the next show: 1. Say yes to a band that writes you, or start a show of your own on a date you pick. 2. Get the room. 3. Make the flyer the same night.",
    /* The recap card (spec 14, "After the show"): one card from the outgoing booker when the guided show is settled, in
       front of GOING_AWAY_setup (js/ui/story.js recapCard). `came` and `door` are the count and the door total, `paid`
       heads the column of who got what (the room and sound by their settle labels, each band by name, then `you`, what was left of the door),
       `good` is the one line on what went well, and `lesson` is the real-life lesson shown under it when the night
       picked none of its own. A game that gets this card does not also get `done` and `doneList` as texts: what to do
       for the next show is in the setup scene's goodbye. Flags as for `done`, and `all` when everyone who came paid; {heads}, {paid} and {door} are the night's. */
    recap: {
      title: "Your first show",
      from: "from {outgoing}",
      came: "[?none: Nobody came through the door, and that happens. | ?all: {heads} people came out and every one of them paid at the door. | {heads} people came out and {paid} of them paid at the door.]",
      door: "The door took in {door}.",
      paid: "Where the door money went",
      you: "You",
      good: "[?short: The door came up short and you still handed out every dollar it had. That's the hard version, and you did it. | ?flyered: You got a flyer out, counted the door yourself and paid everybody at the end of the night. That's a good show. | You counted the door yourself and paid everybody at the end of the night. That's a good show.]",
      lesson: "Everybody gets paid out of the door at the end of the night: the room and sound, the band that drove, the locals, then you.",
      go: "Okay"
    }
  },

  /* Once each, from {outgoing}, the first time a new thing comes out on the desk (SB.Rungs.isNew; js/ui/story.js
   * messages()). One person, one thing, what it is for. Fix list 4.8. */
  deskNew: {
    notebook: "I left you my notebook. It's the composition book with the coffee ring on the cover, and it fills in with whatever you learn about the bands and the rooms as you play shows.",
    stickers: "My sticker pile is on the desk now. There's one for every local band I know, and it says how they feel about whoever books them, so look before you ask somebody twice.",
    keys: "Those are the keys to the rooms I know. Open them to see who's got a night free and what each place expects from you.",
    tin: "The cash tin is yours now, and it keeps the bills too. Check it before you promise anybody money.",
    mug: "That's my coffee mug. It tells you how worn out you are, and if it gets bad you should call it a night early.",
    map: "The map shows the towns around this one. Touring bands drive in from there, and some of them might have a show for you on the way.",
    book: "I put my address book out. It's everybody I call for sound, the door and rides, and you can ring any of them from there.",
    flyers: "The flyer pile is every poster I ever made. Take your pick when you make your own, and change whatever you want.",
    jacket: "That's my jacket, with a patch for each thing I did that mattered. You'll earn yours the same way, one at a time."
  },

  /* Dana on the phone, as a short call, at the two moments a call is worth it in the guided first show (user, 2026-11-21:
   * "add little cut scenes of the person who left talking to you about what to do"): the first message, and the night of
   * the show. Played by js/ui/story.js (COACH_SCENES) when SB.Tutorial.current(state) first shows that step and stage: key
   * 'TUT_' + step + '_' + stage, else 'TUT_' + step; marked seen after. Every other step is taught by its one stage line
   * (tutorial.steps.*.stages), with the why one press away (spec 14, "Text budget": 25 words a line, one thing a line).
   * The caption is the map of the whole show, the part you're on in capitals. */
  coach: {
    TUT_ANSWER_REPLY: { kind: "SCENE", title: "The date", mood: "warm", frames: [
      { art: "INBOX_STACK", caption: "{outgoing} calls. Each part of a show opens the next: THE DATE > room > bands > sound > flyer > word out > the night > pay out.", lines: [
        { who: "outgoing", say: "Hey, it's me. {touring} wrote asking for {dow}, {date}. Most shows start like that, with a band asking you for a night." },
        { who: "outgoing", say: "I'll text you through this first one, one thing at a time. Start by telling {sender} that {dow} works." } ] }
    ] },

    /* the whole door step (its stages PLAY on the desk, OPEN on the night screen): once, before the doors open.
       Pay out is here too: it happens on the night screen, where no other call plays. */
    TUT_DOOR: { kind: "SCENE", title: "You're the door", mood: "warm", frames: [
      { art: "DOOR_TABLE", caption: "Where you are: the date > room > bands > sound > flyer > word out > THE NIGHT > pay out.", lines: [
        { who: "outgoing", say: "The show's how you find out how all of that went. The people who heard about it are the ones who'll come." },
        { who: "outgoing", say: "You're the door. Count everybody who comes in, because that count is what everybody gets paid from." } ] },
      { art: "HANDS_TIN", caption: "Then: the date > room > bands > sound > flyer > word out > the night > PAY OUT.", lines: [
        { who: "outgoing", say: "At the end of the night you do the envelope. Pay the room, then {sound}, then {touring}, then the locals." },
        { who: "outgoing", say: "Whatever's left over is yours. {touring} get paid before the locals because they drive tomorrow. Open the doors on {dow}." } ] }
    ] }
  },

  cutscenes: {

    /* ch. 0: Dana's going-away show. Dana's favorite bands, in the order Dana taught: kids open, touring second to last, the draw last. */
    /* ch. 0: the handoff. Cut down 2026-11-22 (user: "cut the opening down to the handoff"); the show itself was put
       back in front of the kitchen floor 2026-11-23 (user: "put the show back in front of the kitchen floor scene").
       Dana leaving (GOING_AWAY_close) and Monday's mail (DOORS_AT_8_open) still do not play. Those keys still queue
       and close their chapters; with no words here they are skipped (js/ui/story.js playNext). Each part of booking is
       taught when it comes up, in story.coach. Cut to 8 frames and under 150 words for spec 14 (the notebook and the
       flyer wall went: the notebook has its deskNew note, the flyer is taught at the FLYER step). */
    GOING_AWAY_open: { kind: "SCENE", title: "It's yours if you want it", frames: [
      { art: "CARPORT_NIGHT", caption: "{room}. A Saturday. Doors at 8. {outgoing}'s last show in {town}.", lines: [] },
      { art: "STAGE_BAND", caption: "{band1} opened. {outgoing} gave them their first show when they knew four songs.", lines: [
        { who: "band1", say: "We know six now. This one's for {outgoing}." } ] },
      { art: "STAGE_BAND", caption: "{band2} drove in from {band2Home}.", lines: [
        { who: "band2", say: "We'd have skipped {town} for years without {outgoing}. Good luck. Answer your phone." } ] },
      { art: "CROWD_FRONT", caption: "{band3} went last, so nobody left early.", lines: [
        { who: "band3", say: "Last song of the last show {outgoing} booked here." },
        { who: "crowd", say: "{outgoing:upper}." } ] },
      { art: "CARPORT_EMPTY", caption: "After. {host} hosing down the concrete, {sound} coiling cable.", lines: [
        { who: "outgoing", say: "Count it with me." } ] },
      /* The opening asks nothing (spec 14). A first-timer names their shows at the first flyer (the name sheet on the
         flyer desk); how to play, the day job and your band are asked in GOING_AWAY_setup, below. Somebody who has
         booked before is asked all of it here: GOING_AWAY_name and the setup's asks go in before the last frame
         (SB.UI.story.openingAsk). */
      { art: "KITCHEN_FLOOR", caption: "Your kitchen floor. The door money in stacks: the room, {sound}, the bands.", lines: [
        { who: "outgoing", say: "Fair warning, this doesn't pay rent. I did it for six years anyway." } ] },
      { art: "HANDS_TIN", caption: "The cash tin. A dent in the lid, a stamp pad, a clicker, a pen.", lines: [
        { who: "outgoing", say: "It's yours if you want it." },
        { who: "you", say: "Okay." } ] },
      { art: "CARPORT_EMPTY", caption: "{outgoing} at the curb, keys out.", lines: [
        { who: "outgoing", say: "There's already a band asking for a night, so check your phone." } ] }
    ] },

    /* The booking name, asked in the opening of somebody who has booked before (js/ui/story.js openingAsk puts these
       frames in before the opening's last one). A first-timer is asked at the first flyer instead, on the flyer desk
       (ui.flyerdesk.nameSay). The `ask` waits for the reply; its widget is the name sheet (js/ui/screens/start.js). */
    GOING_AWAY_name: { kind: "SCENE", title: "A name for the flyers", frames: [
      { art: "FLYER_WALL", amb: "kitchen", caption: "{outgoing}'s name is on every flyer on that wall.", lines: [
        { who: "outgoing", say: "You'll need a name to put on the flyers. Don't use mine, people will think I'm still here." } ],
        ask: { id: "name", kind: "name", q: "What name goes on the flyers?", say: "{bookingName}." } }
    ] },

    /* The setup, asked once the player knows what the words mean (spec 14, "After the show: the recap, then the
       choices"). A first-timer gets this scene at the desk after the guided first show is settled, and the replies
       change the game they are already playing (js/ui/story.js). Somebody who has booked before is asked the same
       frames inside the opening, right after the name (the last frame, the goodbye, is left out there). `after` is on
       when it plays after the first show; `cold` is on when it plays with no show played (the walkthrough was skipped
       before it, or the show fell through), and the scene then says neither. Each reply's `level` is stamped on its `note`, which says what the reply
       does; the tick box under them is the day job; `foot` sits under it all.
       how -> fog and windows: EASY is OPEN and FORGIVING, REALISTIC is NORMAL and NORMAL, DIFFICULT is HARD and NORMAL.
       The day job, changed after the first show, starts or stops when the next week does (SB.Game.setSetting). */
    GOING_AWAY_setup: { kind: "SCENE", title: "How it goes from here", frames: [
      { art: "KITCHEN_FLOOR", amb: "kitchen", caption: "[?after: Your kitchen again. {outgoing}'s car is packed and parked out front. | ?cold: Your kitchen. {outgoing}'s car is packed and parked out front. | Your kitchen, and the last of {outgoing}'s coffee.]", lines: [
        { who: "outgoing", say: "[?after: You did one, and that's how it really goes. Do you want it like that from here? | ?cold: Before I go, do you want it how it really goes, or a little easier while you learn? | You know how it really goes. Do you want it like that?]" } ],
        ask: { id: "how", q: "[?after: How do you want to keep going? | How do you want to play?]",
          foot: "[?after: You can change how it plays in Settings any time. If you change the day job here, the change starts next week, and this is the last time you can. | ?cold: You can change how it plays in Settings any time. If you change the day job here, the change starts next week, and this is the last time you can. | You can change how it plays in Settings any time. The day job can't be changed once you sit down at the desk.]",
          toggle: { id: "bills", def: true, label: "Rent and a day job",
            on: "On: rent is {rent|most of a paycheck} on the 1st, and a day job pays it. Work nights are short.",
            off: "Off: no rent and no day job, only the show money in the cash box." },
          options: [
          { v: "EASY", level: "EASY", say: "Give me more to go on.", note: "You know more about the bands and the rooms from the start, and jobs like flyering stay open a little longer." },
          { v: "REALISTIC", level: "REALISTIC", def: true, say: "Like that.", note: "Your guesses start wide and get sharper as you book shows, and jobs close when they really would." },
          { v: "DIFFICULT", level: "DIFFICULT", say: "Make me earn it.", note: "How many people a band will bring never gets better than a rough guess." } ] } },
      { art: "STAGE_BAND", amb: "kitchen", caption: "A band practicing through the wall, somewhere on your street.", lines: [
        { who: "outgoing", say: "One more thing. Are you in a band yourself? Most people who book shows are, and nobody minds you putting yourself on a bill." } ],
        ask: { id: "band", kind: "band", q: "Are you in a band?", options: [
          { v: null, def: true, say: "No, I only book.", note: "No band. You can still add one later." },
          { v: true, say: "Yeah, I play in one.", note: "Your band gets a name and a sound, and it shows up in the bill list as a free local act: it plays for nothing and brings some friends." } ] } },
      { art: "CARPORT_EMPTY", caption: "{outgoing} at the curb, keys out, for real this time.", lines: [
        { who: "outgoing", say: "[?cold: The first one's yours to start. | The next one's yours to start.] Say yes to a band or pick your own date, get the room, and make the flyer that night." },
        { who: "outgoing", say: "That's everything I've got. Call me when it goes wrong, and call me when it goes right too." } ] }
    ] },

    /* ch. 1: the guided first show */
    DOORS_AT_8_close: { kind: "SCENE", title: "Doors at 8", frames: [
      { art: "CARPORT_EMPTY", caption: "11:40. Everybody's gone. {host} is hosing down the concrete.", lines: [
        { who: "host", say: "Same time next month?" } ] },
      { art: "HANDS_TIN", caption: "You count it a second time. It comes out the same.", lines: [] },
      { art: "KITCHEN_FLOOR", caption: "The money on your kitchen floor in stacks: the room, {sound}, the band, the locals, you.", lines: [] },
      { art: "PHONE_SCREEN", caption: "12:15.", lines: [
        { who: "outgoing", say: "well?" },
        { who: "you", say: "[?none: Nobody came. | {paid} paid.] [?short: I couldn't pay everybody all of it tonight, and I owe a couple of people. | ?none: I still paid what I owed. | Everybody got paid.]" },
        { who: "outgoing", say: "That's pretty much the whole job. Go to bed." } ] }
    ] },

    /* ch. 2 */
    ANSWER_EVERYONE_open: { kind: "PANELS", title: "Answer everyone", frames: [
      { art: "INBOX_STACK", caption: "Forty messages by Thursday. Bands you've never heard of, from towns you've never been to.", lines: [] },
      { art: "PHONE_SCREEN", caption: "Some of them wrote to every booker in the South at once. You can tell.", lines: [
        { who: "stranger", say: "Hello Promoter, we would love to play your city, we are flexible on dates." } ] },
      { art: "PHONE_SCREEN", caption: "Some of them read your flyers first. You can tell that too.", lines: [
        { who: "stranger2", say: "We're coming from the west and could do a Wednesday or Thursday. A door deal is fine with us. Thanks for reading this." } ] },
      { art: "KITCHEN_FLOOR", caption: "A no takes a minute. Not answering costs a band a whole week of waiting.", lines: [
        { who: "you", say: "Can't do it this time, but write me again in the fall." } ] }
    ] },

    /* ch. 3 */
    OUT_OF_STATE_open: { kind: "PANELS", title: "Out of state", frames: [
      { art: "VAN_CURB", caption: "Here's how show night is going to go. {touring} will pull up around 6:10 with a cracked windshield and a cooler with no ice in it.", lines: [
        { who: "band", say: "Hey, where do we load in? And where's your bathroom?" } ] },
      { art: "MAP_ROUTE", caption: "They came in from {touringHome}, and tomorrow they're back on the interstate.", lines: [] },
      { art: "KITCHEN_FLOOR", caption: "Somebody's making rice. Nobody in the van has eaten since a gas station this morning.", lines: [] },
      { art: "HANDS_TIN", caption: "You pay the band that drove here before you pay yourself. That's the rule, and it's a good one.", lines: [] }
    ] },

    OUT_OF_STATE_close: { kind: "PANELS", title: "Out of state", frames: [
      { art: "FLOOR_SLEEP", caption: "[?floor: {touring|The band} on your floor. Somebody brought a box fan. Somebody snores. | The van pulled out after load-out, headed for the next town.]", lines: [] },
      { art: "CARPORT_EMPTY", caption: "[?floor: In the morning they swept the carport before they left. | Before they left they swept the carport.] Nobody asked them to.", lines: [] },
      { art: "PHONE_SCREEN", caption: "That night, from the road.", lines: [
        { who: "band", say: "[?floor: made it home. thanks again for the floor and the rice, we'd love to come back | made it to the next town. thanks again for having us, we'd love to come back]" } ] }
    ] },

    /* ch. 4 */
    THIN_open: { kind: "PANELS", title: "Thin", frames: [
      { art: "DOOR_TABLE", caption: "{paid} paid. You checked the clicker twice. It was right both times.", lines: [] },
      { art: "HANDS_TIN", caption: "The night cost more than the tin had in it. [?bills: You made up the difference out of your wallet. | The fund covered what was left.]", lines: [] },
      { art: "EMPTY_ROOM", caption: "The close-out says why. It usually comes down to when people heard, and what else was on that night.", lines: [] },
      { art: "PHONE_SCREEN", caption: "", lines: [
        { who: "outgoing", say: "Everybody has one. Mine was eight people and a dog. What did the close-out say?" } ] }
    ] },

    /* ch. 5 */
    FACES_open: { kind: "PANELS", title: "Faces", frames: [
      { art: "DOOR_TABLE", caption: "Same faces at the door. You stopped asking names a month ago because you know them.", lines: [
        { who: "regular", say: "What's next week?" } ] },
      { art: "CROWD_FRONT", caption: "{regular} hasn't missed one. Stands in the same spot, left of the PA.", lines: [] },
      { art: "CROWD_FRONT", caption: "They don't come because they know the bands. They come because it's yours.", lines: [
        { who: "crowd", say: "Is the next one all ages? My cousin won't shut up about it." } ] }
    ] },

    /* ch. 6 */
    ASK_FOR_YOU_open: { kind: "PANELS", title: "Say to ask for you", frames: [
      { art: "INBOX_STACK", caption: "A message from {band}. You've never heard of them.", lines: [
        { who: "band", say: "{referrer} told us to ask for you and said you'd actually write back." } ] },
      { art: "PHONE_SCREEN", caption: "Nobody mentioned {outgoing}.", lines: [
        { who: "you", say: "a band found me on their own." },
        { who: "outgoing", say: "Good. They're not asking for me anymore, which is how it's supposed to go." } ] },
      { art: "FLYER_WALL", caption: "{bookingName} is on enough flyers now that people know what it means.", lines: [] }
    ] },

    /* ch. 7 */
    POSTCARD_open: { kind: "PANELS", title: "Postcard from {bigCity}", frames: [
      { art: "POSTCARD_FRONT", caption: "A postcard from {bigCity}, on the desk with the bills.", lines: [
        { who: "outgoing", say: "They gave me a night here, a real one, on the calendar every month. Send me one of your bands." } ] },
      { art: "MAP_ROUTE", caption: "{town} to {bigCity}. A tank of gas each way, if the van's good.", lines: [] },
      { art: "VAN_CURB", caption: "{local} have never played out of town. They'd go tomorrow.", lines: [
        { who: "band", say: "Wait, for real? Are they paying gas?" } ] }
    ] },

    /* ch. 8 */
    SWAP_open: { kind: "PANELS", title: "The swap", frames: [
      { art: "PHONE_SCREEN", caption: "A message from {peer}, who books in {peerTown}.", lines: [
        { who: "peer", say: "Put {band} on your Friday and I'll put {local} on my Saturday. Same deal both ways." } ] },
      { art: "MAP_ROUTE", caption: "Two towns, one road between them, and two bookers who answer their mail.", lines: [] },
      { art: "VAN_CURB", caption: "Your band in their van. Their band at your curb. Nobody gets a guarantee and everybody gets a room.", lines: [] }
    ] },

    /* ch. 9 */
    YOUR_BAND_open: { kind: "PANELS", title: "Your band", frames: [
      { art: "STAGE_BAND", caption: "{band} played their first show on your bill. Fourteen people, and you were one of them.", lines: [] },
      { art: "FLYER_WALL", caption: "Their name got bigger on every flyer. Now they're at the bottom, where the closer goes.", lines: [] },
      { art: "CROWD_FRONT", caption: "People sing along to the second song now. You didn't know it had words.", lines: [
        { who: "crowd", say: "When's {band} again?" } ] },
      { art: "DOOR_TABLE", caption: "The band you'd put your name next to.", lines: [] }
    ] },

    /* ch. 10: the room closes. One of SOLD, POLICE, BEHAVIOR is set. */
    LAST_CALL_open: { kind: "PANELS", title: "Last call", frames: [
      { art: "PHONE_SCREEN", caption: "A message from {host}. It isn't about a date.", lines: [
        { who: "host", say: "[?SOLD: They sold the place. I found out when the sign went up. I'm sorry. | ?POLICE: That's the third noise call. The city sent a letter about a permit. I can't do it anymore. | ?BEHAVIOR: After last weekend I'm done. The window, the yard, all of it. I'm sorry. | I can't host anymore. I'm sorry.]" } ] },
      { art: { SOLD: "FOR_SALE", POLICE: "POLICE_LIGHTS", BEHAVIOR: "BROKEN_GLASS", _: "EMPTY_ROOM" }, caption: "[?SOLD: The rent on the block doubled in two years. Somebody bought the lot next door first. | ?POLICE: Nobody was hurt. The neighbor has a baby and a job at 6. Both of those are real. | ?BEHAVIOR: Two people you didn't know, a fight, a broken window. One night undoes thirty. | {room} is done.]", lines: [] },
      { art: "FLYER_WALL", caption: "Every flyer on the wall says {room}. Three shows on the calendar say it too.", lines: [] },
      { art: "MAP_ROUTE", caption: "Where do you go now?", lines: [] }
    ] },

    LAST_CALL_close: { kind: "PANELS", title: "Last call", frames: [
      { art: "STOREFRONT", caption: "{newRoom}. Different floor, different outlets, different neighbors.", lines: [
        { who: "you", say: "Done by {curfew}?" },
        { who: "host", say: "We'll see how the first one goes." } ] },
      { art: "FLYER_WALL", caption: "A new address on the flyer. Ask a punk for it.", lines: [] },
      { art: "CROWD_FRONT", caption: "Most of them found it. A few didn't, and you'll hear about it.", lines: [] }
    ] },

    /* ch. 11: the all-ages room */
    ALL_AGES_open: { kind: "PANELS", title: "The room the town doesn't have", frames: [
      { art: "STOREFRONT", caption: "{newRoom}. Empty for two years. The landlord said yes to a year if you sweep.", lines: [] },
      { art: "EMPTY_ROOM", caption: "Two weekends of mopping. Somebody found a couch on the curb. Somebody else knows a guy with a PA.", lines: [] },
      { art: "DOOR_TABLE", caption: "ALL AGES. $7. Doors at 7, last band by 10. It's a school night.", lines: [] },
      { art: "CROWD_FRONT", caption: "Kids who've never been to a show, because there was never a show they could get into.", lines: [
        { who: "crowd", say: "Is it always going to be here?" } ] }
    ] },

    ALL_AGES_close: { kind: "PANELS", title: "The room the town doesn't have", frames: [
      { art: { kept: "STOREFRONT", SOLD: "FOR_SALE", POLICE: "POLICE_LIGHTS", BEHAVIOR: "BROKEN_GLASS", _: "EMPTY_ROOM" }, caption: "[?kept: A year to the day. The landlord sent the new lease without being asked. | ?SOLD: The block got bought. The new rent is three times the old one, and the new owner wants a coffee bar. | ?POLICE: Officers at the door twice in a month. Then a letter about occupancy, then a letter about permits. | ?BEHAVIOR: A fight in the lot, then drinking in the alley. The landlord stopped answering. | It closed.]", lines: [] },
      { art: "EMPTY_ROOM", caption: "[?kept: The couch is still terrible. The kids from the first show are a year older and two of them have a band. | The last night, everybody stayed to help carry the couch out.]", lines: [] },
      { art: "FLYER_WALL", caption: "[?kept: {newRoom}. Doors at 7. Another year. | Somebody took the door sign home. It's on a bedroom wall somewhere.]", lines: [] }
    ] },

    /* ch. 12 */
    WATCHING_open: { kind: "PANELS", title: "Somebody's watching", frames: [
      { art: "INBOX_STACK", caption: "Bigger bands. Bigger bookers. A message with an agency signature at the bottom.", lines: [] },
      { art: "BAR_DOOR", caption: "A bar owner who never answered {outgoing} wants a word.", lines: [
        { who: "host", say: "You could do Thursdays here. There's money in it. I'd want a cut of the door." } ] },
      { art: "PHONE_SCREEN", caption: "", lines: [
        { who: "outgoing", say: "Now everybody's going to want something from you. Some of it's good, but don't say yes to anything the same day they ask." } ] },
      { art: "MAP_ROUTE", caption: "{town} is on the map for bands that used to drive past it.", lines: [] }
    ] },

    /* Dana's desk-drops */
    DANA_BRIDGE: { kind: "DROP", title: "A postcard", frames: [
      { art: "BRIDGE", obj: "postcard", caption: "The I-10 bridge at sunrise, in colors that were never real.", lines: [
        { who: "outgoing", say: "Crossed the bridge at 6 this morning and the water was totally flat. I almost turned around. Tell {sound} I still have the cable." } ] }
    ] },

    DANA_BAR_DOOR: { kind: "DROP", title: "A photo", frames: [
      { art: "BAR_DOOR", obj: "polaroid", caption: "{outgoing} on a stool at a bar door in {bigCity}, holding a stamp.", lines: [
        { who: "outgoing", say: "My new office. They pay me $80 a night and give me a stool. Nobody here has heard of a door deal yet." } ] }
    ] },

    DANA_TUESDAY: { kind: "DROP", title: "A text", frames: [
      { art: "PHONE_SCREEN", obj: "text", caption: "", lines: [
        { who: "outgoing", say: "They finally let me book a Tuesday." },
        { who: "outgoing", say: "Nine people came and I paid the band out of my own pocket." },
        { who: "outgoing", say: "It felt like being back home, honestly." } ] }
    ] },

    DANA_BAD_MONTH: { kind: "DROP", title: "A late text", frames: [
      { art: "PHONE_SCREEN", obj: "text", caption: "12:48 a.m. A missed call, then this.", lines: [
        { who: "outgoing", say: "I saw your close-outs. That was a bad month." },
        { who: "outgoing", say: "I had a whole year of them. The year before you started forwarding." },
        { who: "outgoing", say: "Pay yourself last, but make sure you pay yourself something. Call me back, I'm still up." } ] }
    ] },

    /* the bad months */
    ROOM_GONE: { kind: "DROP", title: "A note on the door", frames: [
      { art: { SOLD: "FOR_SALE", POLICE: "POLICE_LIGHTS", BEHAVIOR: "BROKEN_GLASS", _: "EMPTY_ROOM" }, obj: "note", caption: "Taped to the door of {room}, in {host}'s handwriting.", lines: [
        { who: "host", say: "[?SOLD: Closing day is the 30th. The new owners want it empty. Get your stuff by Sunday. | ?POLICE: No more shows here. The city says it's about a permit, I think it's the same three neighbors, but it doesn't really matter which. | ?BEHAVIOR: I can't have it here after that night. Your stuff is in the shed. | Sorry. No more shows here. Your stuff is in the shed.]" } ] }
    ] },

    COUCH: { kind: "DROP", title: "A couch", frames: [
      { art: "FLOOR_SLEEP", obj: "polaroid", caption: "A friend's couch. Your records in their hall closet. The tin under the cushion.", lines: [] },
      { art: "PHONE_SCREEN", obj: "note", caption: "Written on the back.", lines: [
        { who: "you", say: "Lost my place on the 1st. I still booked the Thursday show." } ] }
    ] },

    /* Show-night moments (design/cutscenes-draft.md). One may play after the night screen, before the close-out.
     * The engine rotates through every _N key of a family. Slots: the common ones, plus band (last band), opener,
     * paid, heads; touring and touringHome only in the touring-band scenes (VAN_LATE, KNOCK_END, PA_BORROW). */
    M_LINE_IN_1: { kind: "PANELS", title: "Line down the block", frames: [
      { art: "SIDEWALK_LINE", caption: "Doors at 8. By 8:20 the line went past the mailbox two houses down.", lines: [
        { who: "regular", say: "Is it worth waiting?" },
        { who: "you", say: "Everybody's getting in." } ] },
      { art: "CROWD_FRONT", caption: "Wall to wall by the second band. Somebody propped the door with a cinderblock for air.", lines: [] },
      { art: "CARPORT_EMPTY", caption: "After. Nobody knows whose cinderblock it is.", lines: [
        { who: "host", say: "It lives here now." } ] }
    ] },

    M_LINE_IN_2: { kind: "PANELS", title: "Line down the block", frames: [
      { art: "CARPORT_NIGHT", caption: "Full by 9 and still filling. People stood on the cooler to see.", lines: [
        { who: "host", say: "How many is that?" },
        { who: "you", say: "Don't ask me yet." } ] },
      { art: "STAGE_DIVE", caption: "{band} played the last song from the floor because the stage was full of people.", lines: [] }
    ] },

    M_LINE_CAP_1: { kind: "PANELS", title: "Full", frames: [
      { art: "DOOR_TABLE", caption: "The clicker hit the number at 9:10. You stood up from the table and stayed standing.", lines: [] },
      { art: "SIDEWALK_LINE", caption: "You turned away thirty people at the door. Some of them will come early next time. Some of them won't come back.", lines: [
        { who: "crowd", say: "We drove from across the bridge." },
        { who: "you", say: "I know, I'm sorry. Come at 8 next time." } ] },
      { art: "CROWD_FRONT", caption: "Inside there was room to stand. {host} could see the floor.", lines: [
        { who: "host", say: "Thank you." } ] }
    ] },

    M_LINE_OUT_1: { kind: "PANELS", title: "The yard", frames: [
      { art: "SIDEWALK_LINE", caption: "The line went to the corner. You moved the merch table to the yard and half the line went with it.", lines: [] },
      { art: "YARD_NIGHT", caption: "Half the show happened in the yard. The neighbors came out to see what it was.", lines: [
        { who: "host", say: "That's the guy from the blue house. He's never once come over." },
        { who: "regular", say: "You can hear it fine from the mailbox." } ] }
    ] },

    M_KNOCK_TALK_1: { kind: "PANELS", title: "A knock at the door", frames: [
      { art: "POLICE_LIGHTS", caption: "Two officers on the steps. You told the neighbors last week. It helped.", lines: [
        { who: "you", say: "We're done by {curfew}. The lady next door has my number." } ] },
      { art: "STAGE_BAND", caption: "{band} waited with their hands off the strings until the car pulled away.", lines: [
        { who: "band", say: "Are we good?" },
        { who: "you", say: "Yeah, we're good. Go ahead." } ] }
    ] },

    M_KNOCK_TALK_2: { kind: "PANELS", title: "A knock at the door", frames: [
      { art: "DOOR_TABLE", caption: "10:15. Somebody at the door who didn't want a stamp.", lines: [] },
      { art: "POLICE_LIGHTS", caption: "They asked who's in charge. Everybody looked at you.", lines: [
        { who: "you", say: "That's me. We'll be done at {curfew}." } ] },
      { art: "CROWD_FRONT", caption: "You walked back in and nodded at {sound}. The next band went on.", lines: [
        { who: "sound", say: "Quieter?" },
        { who: "you", say: "A little." } ] }
    ] },

    M_KNOCK_DOWN_1: { kind: "PANELS", title: "Amps on 3", frames: [
      { art: "STAGE_BAND", caption: "{band} was three songs in when {host} came to get you.", lines: [] },
      { art: "POLICE_LIGHTS", caption: "One car, one officer, one complaint. Turn it down or they come back.", lines: [
        { who: "you", say: "We have to turn everything way down." },
        { who: "sound", say: "It's a punk show, man. It's going to be loud." } ] },
      { art: "CROWD_FRONT", caption: "{band} played the rest with the amps on 3. It was still loud.", lines: [
        { who: "band", say: "This next one's a slow one, we promise." } ] }
    ] },

    M_KNOCK_END_1: { kind: "PANELS", title: "Lights on", frames: [
      { art: "POLICE_LIGHTS", caption: "Second visit. You didn't wait for a third.", lines: [
        { who: "you", say: "That's it for tonight, sorry. Thank you all for coming, and please be quiet on the way to your cars." } ] },
      { art: "YARD_NIGHT", caption: "Lights on at 10:40. {touring} sold three shirts in the yard by headlight.", lines: [
        { who: "band", say: "Can we still sleep here?" },
        { who: "host", say: "Quietly." } ] }
    ] },

    M_FIGHT_1: { kind: "PANELS", title: "A fight", frames: [
      { art: "STAGE_BAND", caption: "Halfway into {band}'s set, a shove that turned into something else.", lines: [] },
      { art: "CROWD_FRONT", caption: "Two people nobody knew. It was over in a minute and it was all anybody talked about.", lines: [
        { who: "regular", say: "Did you see who started it?" },
        { who: "you", say: "It doesn't matter, they're both outside now." } ] },
      { art: "YARD_NIGHT", caption: "One of them left. The other sat on the curb until a ride came.", lines: [
        { who: "host", say: "They're not coming back in." },
        { who: "you", say: "I wasn't going to let them." } ] }
    ] },

    M_FIGHT_CALL_1: { kind: "PANELS", title: "You called it", frames: [
      { art: "CROWD_FRONT", caption: "The same two, again, closer to the front this time.", lines: [
        { who: "you", say: "That's it, lights on. Everybody out, I'm sorry." } ] },
      { art: "YARD_NIGHT", caption: "You called it. Some people were mad at you. Nobody got hurt, so that's the right kind of mad.", lines: [
        { who: "crowd", say: "Two bands didn't even play." } ] },
      { art: "STACK_CHAIRS", caption: "{band} never went on. They stayed and stacked chairs.", lines: [
        { who: "band", say: "We'd have done the same thing." } ] }
    ] },

    M_PA_THROUGH_1: { kind: "PANELS", title: "No vocals", frames: [
      { art: "CARPORT_NIGHT", caption: "The PA made a sound like a soda can and quit.", lines: [
        { who: "sound", say: "It's not coming back tonight." } ] },
      { art: "CROWD_FRONT", caption: "No vocals for the last two bands. The room sang the parts it knew.", lines: [
        { who: "band", say: "You all know this one. Sing it for us." } ] }
    ] },

    M_PA_BORROW_1: { kind: "PANELS", title: "The practice amp", frames: [
      { art: "CROWD_FRONT", caption: "The PA quit during {opener}.", lines: [
        { who: "sound", say: "Does anybody have a vocal amp? Anything with an input, I don't care." },
        { who: "band", say: "There's a little one in the van." } ] },
      { art: "VAN_CURB", caption: "They dug it out from under the merch bins.", lines: [] },
      { art: "STAGE_BAND", caption: "{touring}'s little practice amp ran the vocals for the rest of the night. It sounded like a phone call.", lines: [] }
    ] },

    M_ROOMMATE_1: { kind: "PANELS", title: "Four songs", frames: [
      { art: "PHONE_SCREEN", caption: "7:45. A text from the opener.", lines: [
        { who: "band", say: "our drummer's car won't start and we're not going to make it. i'm so sorry" } ] },
      { art: "SOLO_SET", caption: "Somebody's roommate played four songs on a borrowed guitar. People still ask about it.", lines: [
        { who: "regular", say: "Who was that?" },
        { who: "host", say: "That's my cousin's roommate. He works at the copy place." } ] }
    ] },

    M_VAN_LATE_1: { kind: "PANELS", title: "10:50", frames: [
      { art: "PHONE_SCREEN", caption: "9:30. Nothing from {touring} since noon.", lines: [
        { who: "you", say: "where are you" },
        { who: "band", say: "Hey, we blew a tire about an hour out. Changing it now. We'll be late but we're still coming. Is it alright if we play last?" } ] },
      { art: "VAN_CURB", caption: "{touring} pulled up at 10:50, loaded straight onto the floor and played like they'd been waiting all day. They had.", lines: [
        { who: "host", say: "You've got until {curfew}. Not a minute after, I mean it." } ] },
      { art: "STAGE_BAND", caption: "Twenty-five minutes, no breaks between songs.", lines: [] }
    ] },

    M_RAIN_1: { kind: "PANELS", title: "Storm watch", frames: [
      { art: "PHONE_SCREEN", caption: "Storm watch until midnight. Four people asked if it was still on.", lines: [
        { who: "you", say: "still on. bring a jacket" } ] },
      { art: "RAIN_CARPORT", caption: "Rain on the carport roof so loud you could hear it between songs. Forty people stayed dry under one roof.", lines: [
        { who: "sound", say: "Keep the cables off the low side." } ] }
    ] },

    M_HURT_1: { kind: "PANELS", title: "Stop and check", frames: [
      { art: "CROWD_FRONT", caption: "Somebody went down hard near the front. You waved at {sound} and the music stopped.", lines: [
        { who: "you", say: "Give them some room." } ] },
      { art: "YARD_NIGHT", caption: "A sprained wrist and a ride home. The band waited. Nobody minded.", lines: [
        { who: "regular", say: "I'll drive. I'm going that way." } ] },
      { art: "STAGE_BAND", caption: "Ten minutes later {band} started the song over from the top.", lines: [] }
    ] },

    M_TIN_SHORT_1: { kind: "PANELS", title: "Forty light", frames: [
      { art: "DOOR_TABLE", caption: "Around 9:30 you left the table for a few minutes. Somebody said they'd watch it.", lines: [] },
      { art: "HANDS_TIN", caption: "The tin was forty dollars light. You know about when it happened. You don't know who.", lines: [] },
      { art: "KITCHEN_FLOOR", caption: "You counted it a third time on the kitchen floor. Same number.", lines: [
        { who: "you", say: "From now on the tin goes wherever I go." } ] }
    ] },

    M_GOOD_1: { kind: "PANELS", title: "A good night", frames: [
      { art: "STAGE_DIVE", caption: "Somebody went off the stage during the second song and the room caught them.", lines: [] },
      { art: "CARPORT_EMPTY", caption: "After, somebody found a shoe on top of the PA.", lines: [
        { who: "host", say: "Whose is this?" } ] }
    ] },

    M_GOOD_2: { kind: "PANELS", title: "A good night", frames: [
      { art: "STAGE_BAND", caption: "{band} played an extra song nobody asked for and everybody wanted.", lines: [
        { who: "band", say: "One more. Then we'll go. Sorry, {host}." } ] },
      { art: "YARD_NIGHT", caption: "People stood around in the yard until {host} turned the porch light off.", lines: [] }
    ] },

    M_GOOD_3: { kind: "PANELS", title: "A good night", frames: [
      { art: "CROWD_FRONT", caption: "Nobody left between bands.", lines: [
        { who: "regular", say: "Who's next?" } ] },
      { art: "HANDS_TIN", caption: "{paid} paid at the door. Every one of them was still there at the end.", lines: [] }
    ] },

    M_ROUGH_1: { kind: "PANELS", title: "A quiet one", frames: [
      { art: "DOOR_TABLE", caption: "{paid} paid. Most of them left after the band they came for.", lines: [] },
      { art: "STACK_CHAIRS", caption: "You stacked the chairs yourself. {sound} coiled the cable. Neither of you said much.", lines: [
        { who: "sound", say: "I'll take the cable home. Get some sleep." } ] }
    ] },

    M_ROUGH_2: { kind: "PANELS", title: "A quiet one", frames: [
      { art: "STAGE_BAND", caption: "{band} played like there were a hundred people there. There were {heads:words}.", lines: [
        { who: "band", say: "Thanks for coming out. All of you." } ] },
      { art: "VAN_CURB", caption: "They loaded out like it was any other night.", lines: [
        { who: "band", say: "Seriously, book us again sometime." } ] }
    ] },

    /* Milestones: once each, kept in the chapter box to watch again. Slots as for the moments; kids in MS_KIDS_BAND,
     * touring in MS_BACK_THROUGH. */
    MS_TEN: { kind: "PANELS", title: "Ten", frames: [
      { art: "FLYER_WALL", caption: "Ten flyers on the wall. The first one is already sun-faded.", lines: [] },
      { art: "PHONE_SCREEN", caption: "", lines: [
        { who: "outgoing", say: "That's ten shows! Who closed it?" },
        { who: "you", say: "{band}." },
        { who: "outgoing", say: "I'd have picked them too." } ] }
    ] },

    MS_KIDS_BAND: { kind: "PANELS", title: "The kids' band", frames: [
      { art: "DOOR_TABLE", caption: "Half the line asked for {kids} by name.", lines: [
        { who: "crowd", say: "Are {kids} on yet?" } ] },
      { art: "STAGE_BAND", caption: "They knew four songs at your first show. Tonight they went on last.", lines: [
        { who: "band", say: "We opened the very first show {bookingName} ever did. Thanks for sticking with us." } ] },
      { art: "CROWD_FRONT", caption: "Kids in the front row who weren't going to shows yet when {kids} played their first one.", lines: [] }
    ] },

    MS_BACK_THROUGH: { kind: "PANELS", title: "Back through", frames: [
      { art: "VAN_CURB", caption: "{touring} again. Same van, new windshield. They remembered which outlet works.", lines: [
        { who: "band", say: "Same outlet?" },
        { who: "you", say: "Same outlet." } ] },
      { art: "CROWD_FRONT", caption: "More people came for them this time. Some of them were here the last time.", lines: [
        { who: "regular", say: "These are the ones from last time?" } ] },
      { art: "FLOOR_SLEEP", caption: "Same floor too. One of them brought a pillow this time.", lines: [] }
    ] },

    MS_A_YEAR: { kind: "PANELS", title: "A year", frames: [
      { art: "POSTCARD_FRONT", caption: "A postcard from {bigCity}, a year to the week.", lines: [
        { who: "outgoing", say: "It's been a year. I still look at the {town} flyers every Monday. Tell {sound} I'm keeping the cable." } ] },
      { art: "HANDS_TIN", caption: "Fifty-some Saturdays. The tin has a second dent now.", lines: [] }
    ] },

    MS_FIRST_PACKED: { kind: "PANELS", title: "Sorry, we're full", frames: [
      { art: "DOOR_TABLE", caption: "9:05. The clicker said what {room} holds, and the line kept going.", lines: [] },
      { art: "SIDEWALK_LINE", caption: "The first time you had to say 'sorry, we're full.' It felt bad and it felt good.", lines: [
        { who: "crowd", say: "Can I just stand in the doorway?" },
        { who: "you", say: "That's where the people who got in are standing." } ] },
      { art: "CROWD_FRONT", caption: "{heads} inside. The windows fogged by the second band.", lines: [] }
    ] },

    MS_FIFTY: { kind: "PANELS", title: "Fifty", frames: [
      { art: "DOOR_TABLE", caption: "Fifty. Somebody made you a shirt with the cash tin on it.", lines: [
        { who: "regular", say: "It's screen-printed. Don't put it in the dryer." } ] },
      { art: "PHONE_SCREEN", caption: "", lines: [
        { who: "outgoing", say: "Fifty shows! Send me a picture of the shirt." } ] },
      { art: "STACK_CHAIRS", caption: "Then the chairs, the cable, the floor. Same as the first one.", lines: [] }
    ] }
  },

  chapters: {
    GOING_AWAY:      { title: "It's yours if you want it", line: "{outgoing}'s last show, and a cash tin handed over in a carport." },
    DOORS_AT_8:      { title: "Doors at 8", line: "Your first show, start to finish. It counts." },
    ANSWER_EVERYONE: { title: "Answer everyone", line: "Bands you've never heard of, and an answer for each one." },
    OUT_OF_STATE:    { title: "Out of state", line: "A van at the curb, four people on your floor, and who gets paid first." },
    THIN:            { title: "Thin", line: "A night that cost more than it made, and what the close-out says about it." },
    FACES:           { title: "Faces", line: "The same people at the door, because it's yours." },
    ASK_FOR_YOU:     { title: "Say to ask for you", line: "Bands find you without {outgoing}." },
    POSTCARD:        { title: "Postcard from {bigCity}", line: "{outgoing} has a night and wants one of your bands." },
    SWAP:            { title: "The swap", line: "Their band on your bill, your band on theirs." },
    YOUR_BAND:       { title: "Your band", line: "The band you'd put your name next to." },
    LAST_CALL:       { title: "Last call", line: "Your room closes. Where do you go now?" },
    ALL_AGES:        { title: "The room the town doesn't have", line: "An all-ages room. It lasts a year or it closes." },
    WATCHING:        { title: "Somebody's watching", line: "Bigger bookers, bigger bands and a bar owner all want something." }
  },

  patches: {
    DOORS_AT_8:           { name: "DOORS AT 8", card: "Your first show, start to finish. It's in the record now.", hint: "Play your first show." },
    SKIPPED_TUTORIAL:     { name: "SKIPPED THE TUTORIAL", card: "You said you'd done this before. Hope so.", hint: "Some people don't need the texts." },
    YOU_ARE_THE_DOOR:     { name: "YOU ARE THE DOOR", card: "Ten nights on the door. There's a stamp-pad stain on your thumb that doesn't wash out.", hint: "Work the door at 10 shows." },
    COUNT_IT_TWICE:       { name: "COUNT IT TWICE", card: "Your count and the tin matched to the dollar.", hint: "Make the count and the tin agree." },
    ANSWER_EVERYONE:      { name: "ANSWER EVERYONE", card: "Eight weeks and every band got an answer. Most of them were no.", hint: "Answer every request, yes or no, eight weeks running." },
    FLYER_SAME_DAY:       { name: "FLYER THE DAY YOU CONFIRM", card: "Five shows flyered the day they were confirmed. That's most of the trick.", hint: "Flyer the day you confirm, five times." },
    WEEK_OF_FLYER:        { name: "WEEK-OF FLYER", card: "Flyer up three days before the show. The people who plan ahead already had plans.", hint: "Late is a lesson too." },
    SECOND_TO_LAST:       { name: "SECOND TO LAST", card: "Ten bills with the touring band second to last and your draw closing. The room stayed full.", hint: "Touring band second to last, your draw last. Ten times." },
    OUT_OF_STATE:         { name: "OUT OF STATE", card: "A band crossed a state line to play your show.", hint: "Put on a touring band." },
    THEY_CAME_BACK:       { name: "THEY CAME BACK", card: "A touring band played for you a second time. They didn't have to.", hint: "Get a touring band to come back." },
    ASK_FOR_YOU:          { name: "SAY TO ASK FOR YOU", card: "A band wrote because somebody told them to ask for you. Not for {outgoing}. You.", hint: "Get a band to find you on their own." },
    PACKED:               { name: "PACKED", card: "The room was full and you turned people away at the door. You wrote down how many.", hint: "Fill a room to the walls." },
    ON_THE_WALL:          { name: "ON THE WALL", card: "People tell this one to people who weren't there. They get the count wrong.", hint: "Have a night people keep telling." },
    FOUR_PEOPLE:          { name: "FOUR PEOPLE AND THE BAND", card: "Five paid or fewer. The band played the whole set anyway.", hint: "Not every night is full." },
    OUT_OF_POCKET:        { name: "OUT OF POCKET", card: "You paid the guarantee out of your own money. {outgoing} told you not to promise one you couldn't.", hint: "A promise is a promise." },
    DONE_BY_1030:         { name: "DONE BY 10:30", card: "Ten carport shows and none of them ran past curfew. {host} noticed.", hint: "Ten carport shows, none over curfew." },
    MONDAY_NIGHT:         { name: "MONDAY NIGHT", card: "A good show on a Monday. Nobody believes you.", hint: "Have a good night on a Monday." },
    WEEKEND_PICK:         { name: "WEEKEND PICK", card: "A band picked your Saturday over another booker's.", hint: "Get picked for a Saturday." },
    SWAP:                 { name: "SWAP", card: "Your band on their bill, their band on yours. Two towns, one handshake.", hint: "Trade shows with another town's booker." },
    FIRST_SHOW_EVER:      { name: "FIRST SHOW EVER", card: "A band played its first show ever on your bill. They'll say so for years.", hint: "Give a new band its first show." },
    PIT_TO_STAGE:         { name: "PIT TO STAGE", card: "A kid who stood up front at your shows has a band now.", hint: "Watch somebody from the crowd start a band." },
    THEY_WENT_ON_TOUR:    { name: "THEY WENT ON TOUR", card: "A band you put on got in a van and left town to play. They'll come back different.", hint: "See a local band you put on go on tour." },
    SAME_ROOM_25:         { name: "SAME ROOM, 25 TIMES", card: "Twenty-five shows in one room. You know which outlet trips the breaker.", hint: "Book 25 shows in one room." },
    LAST_SHOW_IN_ROOM:    { name: "LAST SHOW IN THE ROOM", card: "You booked the last show in a room before it closed. Somebody took the door sign home.", hint: "Rooms don't last forever." },
    CONDOS:               { name: "CONDOS", card: "The room sold. There'll be something with a gym where the stage was.", hint: "Rooms get sold." },
    COPS_CAME:            { name: "COPS CAME", card: "A show ended with lights in the driveway. Everybody went home. Nobody got hurt.", hint: "Not every night ends on the last song." },
    RAINED_OUT:           { name: "RAINED OUT", card: "It rained on an outdoor show and people stayed. The drum kit played under a tarp.", hint: "Outdoor shows have weather." },
    COUCH:                { name: "COUCH", card: "You lost your place. The tin lives under somebody else's cushion now. You still booked the Thursday.", hint: "Some months are worse than others." },
    ROOM_TOWN_DIDNT_HAVE: { name: "THE ROOM THE TOWN DIDN'T HAVE", card: "The all-ages room lasted a year. Kids who were fifteen at the first show are sixteen now.", hint: "Keep an all-ages room open for a year." },
    SHOWS_50:             { name: "50 SHOWS", card: "Fifty shows. You've stopped counting them, except at the door.", hint: "Play 50 shows." },
    SHOWS_100:            { name: "100 SHOWS", card: "A hundred shows. You still owe {sound} for a cable.", hint: "Play 100 shows." },
    SHOWS_250:            { name: "250 SHOWS", card: "Two hundred and fifty. Somebody asked how you started, and you told them about the tin.", hint: "Play 250 shows." },
    TEN_YEARS:            { name: "TEN YEARS", card: "Ten years of answering bands. You've written the letter in your head a few times.", hint: "Book for ten years." }
  }
};
