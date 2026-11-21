/* Scene Booker — content/story.js   (role WRITER)
 * Act I in words: the first-show walkthrough (Dana's texts), the chapter cutscenes, Dana's desk-drops, the bad-month drops,
 * the chapter list and the patch cards. Shape and ids: design/spec/09a-build-contract.md. Beats: 09-tutorial-story-patches.md.
 * Voice: design/story.md section 1. Plain, a little dry, no cheering, no scolding. The player is the door.
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
    intro: "{bookingName}. I'd go to that. Okay. You have a show to book and I'm going to text you through it. This one time, then you're on your own.",
    skip: {
      label: "I've done this before",
      line: "Okay. You know where the tin is. Call me if the room falls through."
    },
    steps: {
      ANSWER: {
        text: "{touring} from {touringHome} want {dow}, {date}. That's a week and a half out. Tight, but plenty for {room}. Say yes. And put {local} on it, they bring forty people.",
        nudge: "you there? {touring} are waiting on an answer. just say yes.",
        stages: {
          REPLY: "It's the message from {sender}. Open it and tell them you're interested."
        }
      },
      HOLD: {
        text: "Text {host} for {room}. {dow}, {date}. Get it held, then get it confirmed, before you tell anybody it's happening.",
        nudge: "did {host} say yes? a show without a room is a rumor.",
        stages: {
          ASK: "On the clipboard, the ROOM row: pick {room}, {dow}, hang your tag. No clipboard yet? HOLD on {sender}'s message starts one.",
          WAIT: "Asked. Nobody answers until the days go by. Press play on the tape deck.",
          CONFIRM: "{host} is holding {dow} for you. A hold isn't a show. On the clipboard, the ROOM row. Ask to confirm."
        }
      },
      BILL: {
        text: "Three bands. {touring} get on the bill when you make them an offer and they take it. The locals you ask yourself. Kids open: {kids} go first, they bring their friends early. {touring} goes second to last, while everybody's still there. {local} goes last so nobody leaves before {touring} is done. {local} will play for a cut of the door. I asked.",
        nudge: "set list. kids, then {touring}, then {local}. that's the whole trick.",
        wrong: "Look at the order again. If {local} plays before {touring}, half the room goes home before the band that drove here. Touring second to last. {local} last.",
        stages: {
          OFFER: "Start with {touring}. They're already on the clipboard. Tap their row and make the offer. The door deal they asked for is fine. Send it.",
          KIDS: "Offer's out. Now the OPENER row. Pick {kids} off the sticker sheet.",
          LOCAL: "Now {local}. The HEADLINER row. A cut of the door, no flat fee.",
          WAIT: "Everybody's asked. Press play. Bands answer when they answer.",
          ORDER: "Tap a band's row and move them until it reads {kids}, {touring}, {local}."
        }
      },
      SOUND: {
        text: "{sound} for sound. {soundRate:money}. Late every time, never misses. Unless a wedding calls. Weddings pay better than we do.",
        nudge: "you need sound. {sound} answers texts faster than calls.",
        stages: {
          ASK: "The SOUND row on the clipboard. Ask {sound}.",
          WAIT: "Asked. Press play. {sound} will say yes, {sound} always says yes."
        }
      },
      FLYER: {
        text: "Make the flyer today. The room's confirmed and the bands said yes, so there's nothing left to wait on. Every day it sits, somebody makes other plans.",
        nudge: "flyer. today. every day it waits is people making other plans.",
        wrong: "That flyer's late. Every day it sat in your head, somebody made other plans. It'll still help. Next time, the day you confirm.",
        stages: {
          MAKE: "The FLYER row on the clipboard takes you to the paste-up. Change whatever you want on it, then press USE THIS FLYER."
        }
      },
      PROMO: {
        text: "Now get it out. The record store counter, the coffee place, and send it to the bands so they share it. Two places at least.",
        nudge: "a flyer nobody sees is a drawing. put it somewhere.",
        stages: {
          PLAN: "The PROMO row on the clipboard. Pencil a job in on a day. Two of them.",
          WAIT: "Planned. Press play and they get done."
        }
      },
      WAIT: {
        text: "Now you wait. Answer the rest of your mail. Everybody gets an answer, even if it's no.",
        nudge: "still mail in there. a no takes a minute.",
        stages: {
          PLAY: "Keep the tape deck running. It stops on the night of the show."
        }
      },
      DOOR: {
        text: "You're the door now. Stamp hands, count twice, and don't let your friends in free.",
        nudge: "doors. tin, stamp, the count. that's the job.",
        stages: {
          PLAY: "Keep the tape deck running till the night of the show. Then press OPEN THE DOORS.",
          DOOR: "Doors are open. Watch the night play out."
        }
      },
      SETTLE: {
        text: "Pay the room, pay {sound}, pay {touring} first, then the locals. What's left is yours. It's never much.",
        nudge: "settle before anybody loads out. {touring} have a drive tomorrow.",
        stages: {
          SETTLE: "The envelope is the night's money. Pick how to split what's left over. The usual split is fine tonight."
        }
      },
      CLOSEOUT: {
        text: "Read what they said. Write down what you'd do different.",
        nudge: "read the close-out. it's the only part nobody else will do for you.",
        stages: {
          READ: "Let the week run out, then close it. The close-out is the page that comes up."
        }
      }
    },
    done: "That's a show. Booked, flyered, counted, paid. Next one's yours. I'm not texting you through it. I'm going to bed."
  },

  cutscenes: {

    /* ch. 0: Dana's going-away show. Dana's favorite bands, in the order Dana taught: kids open, touring second to last, the draw last. */
    GOING_AWAY_open: { kind: "SCENE", title: "It's yours if you want it", frames: [
      { art: "CARPORT_NIGHT", caption: "{room}. A Saturday. Doors at 8. {outgoing}'s last show in {town}.", lines: [] },
      { art: "STAGE_BAND", caption: "{band1} opened. {outgoing} gave them their first show, back when they knew four songs.", lines: [
        { who: "band1", say: "We know six now. This one's for {outgoing}. Good luck up there." } ] },
      { art: "STAGE_BAND", caption: "{band2} drove in from {band2Home} for this. Second to last, with the room full.", lines: [
        { who: "band2", say: "We'd have skipped {town} for years if it wasn't for {outgoing}. Slept on that floor five times. Good luck. Answer your phone." } ] },
      { art: "CROWD_FRONT", caption: "{band3} went last, so nobody left early.", lines: [
        { who: "band3", say: "Last song of the last show {outgoing} booked here. Good luck in {bigCity}. We'll be fine. Probably." },
        { who: "crowd", say: "{outgoing:upper}." } ] },
      { art: "CARPORT_EMPTY", caption: "After. {host} hosing down the concrete. {sound} coiling cable in the dark.", lines: [
        { who: "outgoing", say: "Count it with me." } ] },
      { art: "HANDS_TIN", caption: "The cash tin. A dent in the lid, a stamp pad, a clicker, a pen that works.", lines: [
        { who: "outgoing", say: "It's yours if you want it." },
        { who: "you", say: "Okay." },
        { who: "outgoing", say: "You'll need a name for the flyers. Don't use mine." } ] }
    ] },

    GOING_AWAY_close: { kind: "PANELS", title: "It's yours if you want it", frames: [
      { art: "VAN_CURB", caption: "{outgoing} left on a Tuesday with a mattress tied to the roof.", lines: [
        { who: "outgoing", say: "Everything's forwarded to you. Most of it's junk." } ] },
      { art: "BRIDGE", caption: "Over the bridge by 6. {bigCity} by dinner.", lines: [] },
      { art: "PHONE_SCREEN", caption: "Your phone, 9:14 that morning.", lines: [
        { who: "you", say: "{bookingName}. That's the name." },
        { who: "outgoing", say: "Good. Now you have mail." } ] }
    ] },

    /* ch. 1: the guided first show */
    DOORS_AT_8_open: { kind: "PANELS", title: "Doors at 8", frames: [
      { art: "INBOX_STACK", caption: "Monday. Eleven messages, and every one of them used to be for {outgoing}.", lines: [] },
      { art: "PHONE_SCREEN", caption: "One of them is real.", lines: [
        { who: "outgoing", say: "Read the one from {touringHome}. That's your first show." } ] },
      { art: "CARPORT_EMPTY", caption: "{room}, in daylight. An oil stain, a hose, an outlet that works if you hold it.", lines: [] }
    ] },

    DOORS_AT_8_close: { kind: "SCENE", title: "Doors at 8", frames: [
      { art: "CARPORT_EMPTY", caption: "11:40. Everybody's gone. {host} is hosing down the concrete.", lines: [
        { who: "host", say: "Same time next month?" } ] },
      { art: "HANDS_TIN", caption: "You count it a second time. It comes out the same.", lines: [] },
      { art: "KITCHEN_FLOOR", caption: "The money on your kitchen floor in stacks: the room, {sound}, the band, the locals, you.", lines: [] },
      { art: "PHONE_SCREEN", caption: "12:15.", lines: [
        { who: "outgoing", say: "well?" },
        { who: "you", say: "{paid} paid. everybody got paid." },
        { who: "outgoing", say: "That's the whole job. Go to bed." } ] }
    ] },

    /* ch. 2 */
    ANSWER_EVERYONE_open: { kind: "PANELS", title: "Answer everyone", frames: [
      { art: "INBOX_STACK", caption: "Forty messages by Thursday. Bands you've never heard of, from towns you've never been to.", lines: [] },
      { art: "PHONE_SCREEN", caption: "Some of them wrote to every booker in the South at once. You can tell.", lines: [
        { who: "band", say: "Hello Promoter, we would love to play your city, we are flexible on dates." } ] },
      { art: "PHONE_SCREEN", caption: "Some of them read your flyers first. You can tell that too.", lines: [
        { who: "band", say: "Wednesday or Thursday, coming from the west. Door deal is fine. Thanks for reading." } ] },
      { art: "KITCHEN_FLOOR", caption: "A no takes a minute. Not answering costs a band a whole week of waiting.", lines: [
        { who: "you", say: "Not this time. Write me again in the fall." } ] }
    ] },

    /* ch. 3 */
    OUT_OF_STATE_open: { kind: "PANELS", title: "Out of state", frames: [
      { art: "VAN_CURB", caption: "{touring} pulled up at 6:10 with a cracked windshield and a cooler with no ice in it.", lines: [
        { who: "band", say: "Where do we load in. Also where's the bathroom." } ] },
      { art: "MAP_ROUTE", caption: "They left {touringHome} nine days ago. Tomorrow is six more hours of interstate.", lines: [] },
      { art: "KITCHEN_FLOOR", caption: "Somebody's making rice. Nobody in the van has eaten since a gas station this morning.", lines: [] },
      { art: "HANDS_TIN", caption: "You pay the band that drove here before you pay yourself. That's the rule, and it's a good one.", lines: [] }
    ] },

    OUT_OF_STATE_close: { kind: "PANELS", title: "Out of state", frames: [
      { art: "FLOOR_SLEEP", caption: "Four people on your floor. Somebody brought a box fan. Somebody snores.", lines: [] },
      { art: "CARPORT_EMPTY", caption: "In the morning they swept the carport before they left. Nobody asked them to.", lines: [] },
      { art: "PHONE_SCREEN", caption: "That night, from three hundred miles off.", lines: [
        { who: "band", say: "made it. thanks for the floor and the rice. we'd come back." } ] }
    ] },

    /* ch. 4 */
    THIN_open: { kind: "PANELS", title: "Thin", frames: [
      { art: "DOOR_TABLE", caption: "{paid} paid. You checked the clicker twice. It was right both times.", lines: [] },
      { art: "HANDS_TIN", caption: "The night cost more than the tin had in it. You made up the difference out of your wallet.", lines: [] },
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
        { who: "band", say: "{referrer} said to ask for you. Said you'd answer." } ] },
      { art: "PHONE_SCREEN", caption: "Nobody mentioned {outgoing}.", lines: [
        { who: "you", say: "a band found me on their own." },
        { who: "outgoing", say: "Good. They're not asking for me anymore. That's how it's supposed to go." } ] },
      { art: "FLYER_WALL", caption: "{bookingName} is on enough flyers now that people know what it means.", lines: [] }
    ] },

    /* ch. 7 */
    POSTCARD_open: { kind: "PANELS", title: "Postcard from {bigCity}", frames: [
      { art: "POSTCARD_FRONT", caption: "A postcard from {bigCity}, on the desk with the bills.", lines: [
        { who: "outgoing", say: "They gave me a night. A real one, on the calendar. Send me a band. One of yours." } ] },
      { art: "MAP_ROUTE", caption: "{town} to {bigCity}. A tank of gas each way, if the van's good.", lines: [] },
      { art: "VAN_CURB", caption: "{local} have never played out of town. They'd go tomorrow.", lines: [
        { who: "band", say: "Wait. A real city? Are they paying gas?" } ] }
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
        { who: "outgoing", say: "Everybody wants something now. Some of it is good. Don't say yes the same day." } ] },
      { art: "MAP_ROUTE", caption: "{town} is on the map for bands that used to drive past it.", lines: [] }
    ] },

    /* Dana's desk-drops */
    DANA_BRIDGE: { kind: "DROP", title: "A postcard", frames: [
      { art: "BRIDGE", obj: "postcard", caption: "The I-10 bridge at sunrise, in colors that were never real.", lines: [
        { who: "outgoing", say: "Crossed at 6. The bay was flat. I almost turned around. Didn't. Tell {sound} I still have the cable." } ] }
    ] },

    DANA_BAR_DOOR: { kind: "DROP", title: "A photo", frames: [
      { art: "BAR_DOOR", obj: "polaroid", caption: "{outgoing} on a stool at a bar door in {bigCity}, holding a stamp.", lines: [
        { who: "outgoing", say: "My new office. $80 a night and a stool. They don't know what a door deal is yet." } ] }
    ] },

    DANA_TUESDAY: { kind: "DROP", title: "A text", frames: [
      { art: "PHONE_SCREEN", obj: "text", caption: "", lines: [
        { who: "outgoing", say: "They let me book a Tuesday." },
        { who: "outgoing", say: "Nine people. I paid the band out of my own pocket." },
        { who: "outgoing", say: "Felt like home." } ] }
    ] },

    DANA_BAD_MONTH: { kind: "DROP", title: "A late text", frames: [
      { art: "PHONE_SCREEN", obj: "text", caption: "12:48 a.m. A missed call, then this.", lines: [
        { who: "outgoing", say: "I saw the close-outs. Bad month." },
        { who: "outgoing", say: "I had a whole year of them. The year before you started forwarding." },
        { who: "outgoing", say: "Pay yourself last, but pay yourself something. Call me back. I'm up." } ] }
    ] },

    /* the bad months */
    ROOM_GONE: { kind: "DROP", title: "A note on the door", frames: [
      { art: { SOLD: "FOR_SALE", POLICE: "POLICE_LIGHTS", BEHAVIOR: "BROKEN_GLASS", _: "EMPTY_ROOM" }, obj: "note", caption: "Taped to the door of {room}, in {host}'s handwriting.", lines: [
        { who: "host", say: "[?SOLD: Closing day is the 30th. The new owners want it empty. Get your stuff by Sunday. | ?POLICE: No more shows. The city says it's a permit. I say it's the same three neighbors. Either way. | ?BEHAVIOR: I can't have it here after that night. Your stuff is in the shed. | Sorry. No more shows here. Your stuff is in the shed.]" } ] }
    ] },

    COUCH: { kind: "DROP", title: "A couch", frames: [
      { art: "FLOOR_SLEEP", obj: "polaroid", caption: "A friend's couch. Your records in their hall closet. The tin under the cushion.", lines: [] },
      { art: "PHONE_SCREEN", obj: "note", caption: "Written on the back.", lines: [
        { who: "you", say: "Lost the place on the 1st. Still booked the Thursday." } ] }
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
        { who: "you", say: "I know. Next one, come at 8." } ] },
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
        { who: "you", say: "We're good. Play." } ] }
    ] },

    M_KNOCK_TALK_2: { kind: "PANELS", title: "A knock at the door", frames: [
      { art: "DOOR_TABLE", caption: "10:15. Somebody at the door who didn't want a stamp.", lines: [] },
      { art: "POLICE_LIGHTS", caption: "They asked who's in charge. Everybody looked at you.", lines: [
        { who: "you", say: "Me. It's done at {curfew}." } ] },
      { art: "CROWD_FRONT", caption: "You walked back in and nodded at {sound}. The next band went on.", lines: [
        { who: "sound", say: "Quieter?" },
        { who: "you", say: "A little." } ] }
    ] },

    M_KNOCK_DOWN_1: { kind: "PANELS", title: "Amps on 3", frames: [
      { art: "STAGE_BAND", caption: "{band} was three songs in when {host} came to get you.", lines: [] },
      { art: "POLICE_LIGHTS", caption: "One car, one officer, one complaint. Turn it down or they come back.", lines: [
        { who: "you", say: "Everything down. Way down." },
        { who: "sound", say: "It's a punk show." } ] },
      { art: "CROWD_FRONT", caption: "{band} played the rest with the amps on 3. It was still loud.", lines: [
        { who: "band", say: "This next one's a slow one. It isn't." } ] }
    ] },

    M_KNOCK_END_1: { kind: "PANELS", title: "Lights on", frames: [
      { art: "POLICE_LIGHTS", caption: "Second visit. You didn't wait for a third.", lines: [
        { who: "you", say: "That's the night. Thanks for coming. Go home quiet." } ] },
      { art: "YARD_NIGHT", caption: "Lights on at 10:40. {touring} sold three shirts in the yard by headlight.", lines: [
        { who: "band", say: "Can we still sleep here?" },
        { who: "host", say: "Quietly." } ] }
    ] },

    M_FIGHT_1: { kind: "PANELS", title: "A fight", frames: [
      { art: "STAGE_BAND", caption: "Halfway into {band}'s set, a shove that turned into something else.", lines: [] },
      { art: "CROWD_FRONT", caption: "Two people nobody knew. It was over in a minute and it was all anybody talked about.", lines: [
        { who: "regular", say: "Did you see who started it?" },
        { who: "you", say: "Doesn't matter. They're both outside now." } ] },
      { art: "YARD_NIGHT", caption: "One of them left. The other sat on the curb until a ride came.", lines: [
        { who: "host", say: "Not back in." },
        { who: "you", say: "Wasn't going to." } ] }
    ] },

    M_FIGHT_CALL_1: { kind: "PANELS", title: "You called it", frames: [
      { art: "CROWD_FRONT", caption: "The same two, again, closer to the front this time.", lines: [
        { who: "you", say: "That's it. Lights on. Everybody out." } ] },
      { art: "YARD_NIGHT", caption: "You called it. Some people were mad at you. Nobody got hurt, so that's the right kind of mad.", lines: [
        { who: "crowd", say: "Two bands didn't even play." } ] },
      { art: "STACK_CHAIRS", caption: "{band} never went on. They stayed and stacked chairs.", lines: [
        { who: "band", say: "We'd have done the same thing." } ] }
    ] },

    M_PA_THROUGH_1: { kind: "PANELS", title: "No vocals", frames: [
      { art: "CARPORT_NIGHT", caption: "The PA made a sound like a soda can and quit.", lines: [
        { who: "sound", say: "It's not coming back tonight." } ] },
      { art: "CROWD_FRONT", caption: "No vocals for the last two bands. The room sang the parts it knew.", lines: [
        { who: "band", say: "You know this one. Do the words." } ] }
    ] },

    M_PA_BORROW_1: { kind: "PANELS", title: "The practice amp", frames: [
      { art: "CROWD_FRONT", caption: "The PA quit during {opener}.", lines: [
        { who: "sound", say: "Anybody have a vocal amp. Anything with an input." },
        { who: "band", say: "There's a little one in the van." } ] },
      { art: "VAN_CURB", caption: "They dug it out from under the merch bins.", lines: [] },
      { art: "STAGE_BAND", caption: "{touring}'s little practice amp ran the vocals for the rest of the night. It sounded like a phone call.", lines: [] }
    ] },

    M_ROOMMATE_1: { kind: "PANELS", title: "Four songs", frames: [
      { art: "PHONE_SCREEN", caption: "7:45. A text from the opener.", lines: [
        { who: "band", say: "drummer's car won't start. we're not going to make it. so sorry" } ] },
      { art: "SOLO_SET", caption: "Somebody's roommate played four songs on a borrowed guitar. People still ask about it.", lines: [
        { who: "regular", say: "Who was that?" },
        { who: "host", say: "Lives with my cousin. Works at the copy place." } ] }
    ] },

    M_VAN_LATE_1: { kind: "PANELS", title: "10:50", frames: [
      { art: "PHONE_SCREEN", caption: "9:30. Nothing from {touring} since noon.", lines: [
        { who: "you", say: "where are you" },
        { who: "band", say: "flat tire. an hour out. still coming" } ] },
      { art: "VAN_CURB", caption: "{touring} pulled up at 10:50, loaded straight onto the floor and played like they'd been waiting all day. They had.", lines: [
        { who: "host", say: "{curfew}. Not a minute after." } ] },
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
        { who: "you", say: "The tin goes where I go now." } ] }
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
        { who: "band", say: "Book us again. We mean it." } ] }
    ] },

    /* Milestones: once each, kept in the chapter box to watch again. Slots as for the moments; kids in MS_KIDS_BAND,
     * touring in MS_BACK_THROUGH. */
    MS_TEN: { kind: "PANELS", title: "Ten", frames: [
      { art: "FLYER_WALL", caption: "Ten flyers on the wall. The first one is already sun-faded.", lines: [] },
      { art: "PHONE_SCREEN", caption: "", lines: [
        { who: "outgoing", say: "Ten. Who closed it?" },
        { who: "you", say: "{band}." },
        { who: "outgoing", say: "I'd have picked them too." } ] }
    ] },

    MS_KIDS_BAND: { kind: "PANELS", title: "The kids' band", frames: [
      { art: "DOOR_TABLE", caption: "Half the line asked for {kids} by name.", lines: [
        { who: "crowd", say: "Are {kids} on yet?" } ] },
      { art: "STAGE_BAND", caption: "They knew four songs at your first show. Tonight they went on last.", lines: [
        { who: "band", say: "We opened the first show this person ever booked. Thanks for keeping us around." } ] },
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
        { who: "outgoing", say: "A year. I still look at the {town} flyers every Monday. Tell {sound} I'm keeping the cable." } ] },
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
        { who: "outgoing", say: "Fifty. Send me a picture of the shirt." } ] },
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
