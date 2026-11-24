/* Scene Booker — content/requests.js   (role C2)
 * Request templates (story 2.4, T1 to T12, and LOCAL), follow-ups, how touring bands answer, the player's own
 * messages, vetting result lines, signals, the range ladder. Schema: design/spec/03-content.md section 5.
 * A line that carries a tell is written inside the matching guard (story 2.3), so the wording is evidence.
 * Every template carries a (?shortNotice: ...) line. Slots and flags: 03-content 5.1.
 * Data only: one assignment, no functions.
 */
SB.Content.requests = {
  templates: {

    /* T1. The careful one. */
    CAREFUL: {
      kind: ['COLD', 'REFERRAL'],
      tells: { want: ['PRO', 'HONEST'], avoid: ['MASS', 'OVERSELL', 'DESPERATE'] },
      weight: 1,
      teaches: 'A good ask: exact dates, the route, what they carry, a small honest number.',
      subject: [
        '{city}, {day1} the {date1:ord}{of1} (?date2: or {day2} the {date2:ord}{of2}), {band} ({home})',
        '{city} on the {date1:ord}{of1} (?date2: or the {date2:ord}{of2})? {band} ({home})'
      ],
      body: [
        "Hi {you|there},\n\n" +
        "We're {band}, a {genrePlain} band from {home}. We're doing {tourDays:words} days [on the road | out] in {month}, " +
        "coming from {prev} on the {date0:ord} and headed to {next} after. {city} would break up the drive.\n" +
        "(?shortNotice: I know this is no notice at all. A date fell out from under us, and we'd rather ask around than sit somewhere for the night.)\n\n" +
        "There are {n:words} of us and we play a {setLen}-minute set. (?PLEASANT: We can share drums and a bass cab.) We need two vocal mics and that's it.\n" +
        "(?hasDraw: Last time out we had about {draw} in {peerCity} on a {weekday}, which we were happy with.)\n" +
        "(?hasLocal: {local} said they'd be up for playing if you're into it.)\n" +
        "(?REFERRED: {referrer} said you'd be the one to ask.)\n\n" +
        "[?doorDeal: Door deal is fine. | We're asking {guarantee:money}, but talk to us.] " +
        "(?lodging: If there's a floor for {n:words} people, that'd help a lot, but we can figure it out.)\n\n" +
        "(?PROMOTES: Send us the flyer when it's done and we'll share it.)\n" +
        "Listen: \\[link\\]\nLive video: \\[link\\]\n\n" +
        "Thanks for reading this either way.\n{member}",

        "Hi {you|there},\n\n" +
        "We're {band}, from {home}, and we play {genrePlain}. (?firstVisit: It's our first time down your way, so honestly, don't expect a crowd for us.)(?nearby: We're only up the road, so a few of our friends usually make the drive.)\n\n" +
        "Dates: {day1} the {date1:ord}{of1} (?date2: or {day2} the {date2:ord}{of2}). " +
        "[?hasRoute: We're in {prev} the night before and {next} the night after, so either one works for the drive. | We're still building the rest of the run around these.]\n" +
        "(?shortNotice: Sorry this is so close. We'd understand a no.)\n\n" +
        "There are {n:words} of us and our set is {setLen} minutes, so we'll be done in time for the next band. (?PLEASANT: We'll bring our own snare and cymbals and we're happy to share the rest.)\n" +
        "(?hasDraw: At home we get around {draw}, but on the road it's been more like a dozen, sometimes less.)\n" +
        "(?OLDER: Most of the people who come see us are in their 30s, if that helps you pick a room.) " +
        "(?YOUNGER: All ages if you can. Half our friends can't get into bars.)\n\n" +
        "[?doorDeal: Whatever the door does is fine with us. | {guarantee:money} would cover the gas from {prev}, but say what's fair.] " +
        "(?lodging: A floor would be great.) (?meal: If there's food we won't say no.)\n\n" +
        "(?PROMOTES: We'll post it to our people and send it to the friends we have in {region}.)\n" +
        "\\[link\\]\n\n" +
        "Thanks,\n{member}"
      ],
      followup: [
        'Bumping this. We still have the {date1:ord}{of1} open if it works for you.',
        'Checking back on {day1} the {date1:ord}{of1}. We\'re holding it for you till the end of the week, then we\'ll ask {next}.'
      ]
    },

    /* T2. The one sent to forty bookers at once. Never follows up.
     * SPEC? The wrong-city pick is guarded on the slot wrongCity: the engine fills it only when it has decided this
     * message names the wrong city (and the band then answers with replies.WRONG_CITY); otherwise leave it empty. */
    MASS: {
      kind: ['COLD'],
      tells: { want: ['MASS', 'SLOPPY', 'OVERSELL'], avoid: ['PRO', 'REFERRED', 'HONEST'] },
      weight: 1,
      teaches: '"Your city," praise of nothing, no route and no local band: a message pasted to everyone. Sometimes a good band with a bad email.',
      subject: [
        'Booking Inquiry - {band:upper} - {season:cap} Tour!!',
        '{band} {season:cap} Tour - Dates Available!!!'
      ],
      body: [
        "Hello [Promoter | Booker | Venue | there]!\n\n" +
        "{band} is a [high-energy | genre-bending | hard to put in a box] act from {home} and we are hitting the road this {season}! People call us {genreOwn}, but you have to hear it. " +
        "We would LOVE to play [?wrongCity: {wrongCity} | your city^2 | your venue]!!\n\n" +
        "We have shared the stage with [many great bands | some amazing artists | a lot of incredible acts] and our new single has " +
        "[(?OVERSELL: {bigNumber} plays and counting) | been getting great feedback | been doing really well].\n" +
        "(?shortNotice: We have a few dates open SOON so let us know ASAP!!)\n\n" +
        "We are flexible on dates and looking for [fair compensation | a guarantee | whatever works for you]. Please let us know what you have available!\n\n" +
        "Best,\n{band} Booking\n\\[link to a page that wants you to log in\\]",

        "Hi there!!\n\n" +
        "Hope this finds you well! My name is {member} and I handle booking for {band}, a band out of {home}. You could call us {genreOwn}.\n\n" +
        "We are routing a {season} tour and looking for shows in [?wrongCity: {wrongCity} | your area^2 | your city]. " +
        "We love the scene there and have always wanted to play!\n\n" +
        "(?OVERSELL: We have been building serious momentum and we always bring the energy. )" +
        "Our live show is something you have to see to believe.\n" +
        "(?shortNotice: Any date in the next two weeks works!!)\n\n" +
        "Dates: flexible!\nCompensation: negotiable!\n\n" +
        "Looking forward to hearing from you!!\n{member}\n{band}\n\\[link\\] \\[link\\] \\[link\\]"
      ],
      followup: []                         // SPEC? story 2.2: mass-mailers never follow up, so this is empty; the engine checks SB.text.has before sending one
    },

    /* T3. The band too big for the room. */
    TOO_BIG: {
      kind: ['COLD'],
      tells: { want: ['ESTABLISHED', 'PRO', 'OLDER'], avoid: ['DESPERATE', 'SLOPPY', 'YOUNGER'] },
      weight: 1,
      teaches: 'An agent, a fee in the hundreds, a rider, a capacity question: a different business. "Not yet" is an answer.',
      subject: [
        'HOLD REQUEST: {band} · {city} · {month} {date1} (?date2: or {date2})',
        'Avails? {band}, {city}, {month}'
      ],
      body: [
        "Hi,\n\n" +
        "I handle routing for {band}. They're doing a {region} run in {month} supporting the new record and we're looking at {city} " +
        "for the {date1:ord}{of1} (?date2: or the {date2:ord}{of2}) as an off-day fill between {prev} and {next}.\n" +
        "(?shortNotice: Apologies for the short window; a date moved on us.)\n\n" +
        "Looking for a room in the 250 to 400 range. Ask is a {guarantee:money} guarantee versus {pct}% of the door after expenses, whichever is greater, " +
        "plus hospitality for {n} and two hotel rooms. Production rider attached. They'll want to know ticketing and age policy.\n\n" +
        "Can you hold either date? Let me know your best offer.\n\n" +
        "{agent}\n{agency}",

        "Hi {you|there},\n\n" +
        "Checking avails for {band} in {city}, {month}. Routing has them in {prev} on the {date0:ord} and {next} after, so the " +
        "{date1:ord}{of1} (?date2: or {date2:ord}{of2}) is the window.\n" +
        "(?shortNotice: This one's tight, I know.)\n\n" +
        "Terms we've been doing in markets your size: {guarantee:money} flat, or versus {pct}% after documented costs. " +
        "Hospitality: a hot meal and water for {n}, a locked room for merch. Hotel is on us if the guarantee clears {guarantee:money}.\n" +
        "(?OLDER: Their crowd skews 30 and up. A 21+ room with a bar is ideal.)\n\n" +
        "What's your capacity, and is it ticketed? I'll need a confirmation by the end of the week to hold the routing.\n\n" +
        "Thanks,\n{agent}\n{agency}"
      ],
      followup: [
        'Following up on {band}, {month} {date1}. I have another offer in the region and need to answer it by Friday.',
        'Circling back. Is {city} a possibility for {band} this run, or should I look at {next}?'
      ]
    },

    /* T4. The friend of a friend. */
    FRIEND: {
      kind: ['REFERRAL'],
      tells: { want: ['REFERRED', 'HONEST', 'PLEASANT'], avoid: ['MASS', 'OVERSELL'] },
      weight: 1,
      teaches: 'A referral carries the referrer\'s trust, and sometimes the referrer met them once.',
      subject: [
        '{referrer} said to write you',
        'friends of {referrer}, {month}'
      ],
      body: [
        "hey! {referrer} ({referrerHow}) said you're the person in {city}.\n\n" +
        "we're {band}, we're [kind of {genrePlain} | {genrePlain} but slower | sort of {genreOwn}]. we're driving {prev} to {next} around the {date1:ord}{of1} " +
        "and would love to stop. (?shortNotice: i know that's really soon. sorry.) we don't need much, honestly, gas and a floor.\n\n" +
        "{referrer} said you'd [know a house | know where to put us | be nice about it].\n" +
        "(?hasLocal: we know {local} a little, they said they'd play.)\n" +
        "(?PLEASANT: we're quiet and we clean up after ourselves, and we can bring food if that helps.)\n\n" +
        "\\[link\\]\nthanks!! {member}",

        "hi {you|there},\n\n" +
        "{member} from {band} ({home}). we stayed with {referrer} last time through and they said if we ever come back to write you before anybody else.\n\n" +
        "we'll be around {region} the week of the {date1:ord}{of1}(?date2: , {day1} or {day2} works best). " +
        "(?firstVisit: we've never played {city} before.) (?hasDraw: we usually get {draw} or so at home, and less than that out here.)\n" +
        "(?shortNotice: this is close, i know. tell me if it's too close.)\n\n" +
        "[?doorDeal: door's fine, whatever you think is fair. | we're trying to make {guarantee:money} a night for gas but we can talk about it.] (?lodging: a floor for {n:words} would be amazing.)\n" +
        "(?PROMOTES: we'll share it everywhere we can, and {referrer} said they would too.)\n\n" +
        "\\[link\\]\nthank you"
      ],
      followup: [
        'hey, just checking that this got to you. we\'re still hoping for the {date1:ord}{of1}.',
        '{referrer} said you\'re pretty busy, so no stress. i just wanted to bump this once.'
      ]
    },

    /* T5. Four days out. */
    RESCUE: {
      kind: ['RESCUE'],
      tells: { want: ['DESPERATE', 'HONEST'], avoid: ['ESTABLISHED', 'OVERSELL', 'MASS'] },
      weight: 1,
      teaches: 'A show with days instead of weeks: no posters, word of mouth and regulars only. The band remembers who caught them.',
      subject: [
        'last minute - {day1} the {date1:ord}{of1} - anything?',
        'show fell through {day1}, anything in {city}?'
      ],
      body: [
        "Hey, sorry for the short notice. (?shortNotice: I know this is no notice at all.) Our {day1} show in [{nearbyTown} | {city}] " +
        "[fell through | got cancelled, the house got a noise ticket | the venue double-booked us]. We're already on the road and we'll be driving through anyway.\n\n" +
        "We'd play anywhere, a backyard or somebody's kitchen. No money needed, door or nothing is fine, we just don't want a night off this far from home.\n" +
        "(?PLEASANT: We'll bring our own everything and sweep up after.)\n\n" +
        "{band}, from {home}. \\[link\\]\n{member}. text is better than email, we're in the van all day",

        "hi, this is {member} from {band} ({home}). our show on {day1} the {date1:ord}{of1} just fell apart because the room closed, and we only found out an hour ago.\n" +
        "(?shortNotice: i know that's only {daysOut:words} days from now.)\n\n" +
        "there are {n:words} of us, we play {genrePlain}, and we can share all our gear. we'll play any room, any time, for any money. (?lodging: we can sleep in the van if we have to.)\n" +
        "(?hasLocal: {local} said they'd play if you can find a place.)\n" +
        "(?DESPERATE: we'll take anything at this point, honestly.)\n\n" +
        "\\[link\\]"
      ],
      followup: [
        'we\'re still looking for something on {day1}, if anything comes up at all.',
        'sorry to bug you again. we\'re in {prev} tonight, so if anything opens up for {day1} we can be there by 6.',
        'ok, this is the last time i\'ll bug you about it. if it doesn\'t work out, no hard feelings.'
      ]
    },

    /* T6. The one that oversells itself. */
    OVERSELL: {
      kind: ['COLD'],
      tells: { want: ['OVERSELL', 'SLOPPY'], avoid: ['HONEST', 'PRO'] },
      weight: 1,
      teaches: 'A home number is not an away number. Round numbers with no room, no night and no town attached.',
      subject: [
        '{band} - {city} - {month} {date1} - BIGGEST SHOW OF THE TOUR',
        '{band} in {city}?? ({bigNumber}+ at our last show)'
      ],
      body: [
        "What's up!\n\n" +
        "{band} here, [{home}'s premier live act | the hardest-working band in {region} | you've probably heard of us]. " +
        "We [sold out | packed] our last hometown show ({bigNumber}+ people) and we're [building serious momentum | blowing up] right now.\n\n" +
        "We're routing through {city} on the {date1:ord}{of1} and want to make it a big one. Looking for a Saturday if possible and a {guarantee:money} guarantee, which honestly is below our usual.\n" +
        "(?shortNotice: We know it's soon but our people travel.)\n\n" +
        "We bring a crowd everywhere we go. Trust us.\n\n" +
        "\"Raw, urgent, essential.\" (a review from a site you've never heard of)\n\\[link\\]",

        "Yo {you|there}!\n\n" +
        "{band} is coming to {city} and we want the best room in town. We've been on fire this year: [{bigNumber} people at our release show | sold out back to back in {home} | everybody's talking about us in {region}].\n\n" +
        "Looking at {day1} the {date1:ord}{of1}. {guarantee:money} guarantee plus a rider, nothing crazy. We're the next big thing, period, and we'd love {city} to be part of it.\n" +
        "(?shortNotice: Date's close but trust us, we fill rooms fast.)\n" +
        "(?hasDraw: Our last show in {peerCity} did {draw} on a {weekday}.)\n\n" +
        "Hit us back!!\n{member}"
      ],
      followup: [
        'Hey! Following up, we have other offers for that night so let us know soon!!',
        'Still want to bring {band} to {city}! Guarantee is flexible-ish.'
      ]
    },

    /* T7. The show swap. */
    SWAP: {
      kind: ['SWAP'],
      tells: { want: ['REFERRED', 'PRO', 'PROMOTES', 'PLEASANT'], avoid: ['MASS', 'OVERSELL'] },
      weight: 1,
      teaches: 'Reciprocity: put them on here, your band gets a good night there. It is how a new booker gets bands to write.',
      subject: [
        'swap? {theirCity} <-> {city}',
        '{theirCity} for {city}, trade?'
      ],
      body: [
        "Hey, this is {member}, I book shows in {theirCity}. One of our bands, {band}, has been trying to get down your way for a while.\n\n" +
        "Want to trade? You put them on something in {city} {day1} the {date1:ord}{of1} (?date2: or {day2} the {date2:ord}{of2}), I'll get " +
        "[?yourBand: {yourBand} | ?yourBand: one of your bands | one of your bands] a good spot here, on a [Friday | weekend night]. I [book at {theirRoom} | know the people at {theirRoom}].\n" +
        "(?shortNotice: I know that's coming up fast, sorry.)\n\n" +
        "There are {n:words} of them, they play about {setLen} minutes, and they can share drums. (?doorDeal: A door deal is fine with them.) They'll drive home after, so nobody has to find them a floor.\n" +
        "(?PROMOTES: They'll make sure the people they know over there hear about it.)\n\n" +
        "\\[link\\]\n{member}",

        "hi {you|there}, this is {member}, i book shows in {theirCity}.\n\n" +
        "the person who had your inbox before you used to send us bands and we sent them some back. figured we'd keep it going if you want.\n\n" +
        "one of ours, {band}, would love {day1} the {date1:ord}{of1} in {city}. in return {theirRoom} has a [Friday | Saturday] open next month and we'd put [?yourBand: {yourBand} | whoever you want] on it, second to last, real slot.\n" +
        "(?shortNotice: sorry, i know that's soon.)\n\n" +
        "they play {genrePlain}, about {setLen} minutes, and they're easy to deal with. (?PLEASANT: they'll bring snacks and they don't need a floor.)\n\n" +
        "\\[link\\]\n{member}"
      ],
      followup: [
        'Still into the swap? I\'d hold the {theirRoom} date for your band till you say.',
        'no rush on the swap. just don\'t want to give the {theirRoom} night away if you want it.'
      ]
    },

    /* T8. The band coming back. */
    RETURN: {
      kind: ['RETURNING'],
      tells: { want: ['PLEASANT', 'PROMOTES', 'HONEST'], avoid: ['MASS', 'OVERSELL'] },
      weight: 1,
      teaches: 'A band coming back writes the way the last night went. A new name in the lineup is how a change reaches you.',
      subject: [
        'back again? {month}',
        '{band}, round two, {month}'
      ],
      body: [
        "Hey {you|there}! It's {member} from {band}. We're heading back down your way in {month} and wanted to ask you first before anybody.\n\n" +
        "[?lastGood: Last time was one of our favorite nights of the tour. | ?lastRough: Last time was rough but you treated us right. | ?lastWeird: We know last time was a weird night. | Last time was good, and we still talk about it in the van.]\n\n" +
        "{day1} the {date1:ord}{of1} works best(?date2: , {day2} the {date2:ord}{of2} too). Same deal is fine.\n" +
        "(?shortNotice: Sorry it's so close. We only just got the dates.)\n" +
        "(?host: Everybody says hi to {host}.)\n" +
        "(?lineupChanged: We've got a new {instrument|player}, {newMember}. It's the same songs, just faster.)\n\n" +
        "\\[link\\]",

        "hi again, it's {band}. we're coming back through in {month} and wondering about the {date1:ord}{of1} (?date2: or the {date2:ord}{of2}).\n\n" +
        "[?lastGood: people still bring up the {city} show in the van. | ?lastRough: we know the turnout last time wasn't what either of us wanted, and we'd like another shot. | ?lastWeird: we know last time was weird and we'll be better this time, i promise. | last time was a good night for us.]\n" +
        "(?shortNotice: this is short notice, i know, we only just got the dates.)\n" +
        "(?lineupChanged: heads up, {newMember} is in the band now.)\n\n" +
        "[?doorDeal: the door's fine, same as last time. | could we do {guarantee:money} this time? gas went up a lot since then. if not, the door is fine.] (?lodging: and if {host|anyone} has the floor for us again we'd love it.)\n" +
        "(?PROMOTES: we'll tell everyone who came last time.)\n\n" +
        "{member}"
      ],
      followup: [
        'Bumping this. We\'d rather play for you than anybody else down there.',
        'just checking in on the {date1:ord}{of1}. we\'re keeping it open for you.'
      ]
    },

    /* T9. The kids' first tour. */
    KIDS_TOUR: {
      kind: ['COLD'],
      tells: { want: ['YOUNGER', 'HONEST', 'SLOPPY'], avoid: ['ESTABLISHED', 'OLDER', 'PRO'] },
      weight: 1,
      teaches: 'An all-ages room, an early set, a parent in the car. These bands sometimes get big.',
      subject: [
        '(no subject)',
        'show???'
      ],
      body: [
        "hi! this is {member} from {band}, we're from {smallTown}. we're doing our first tour over spring break, it's just one week and my mom is driving us. " +
        "we would love to play {city} on the {date1:ord}{of1} if there is any show at all. we've only played about eight shows so we can play first. " +
        "we're punk but kind of [emo | surf | weird].\n" +
        "(?shortNotice: sorry it's so soon, we just found out we're allowed to go)\n\n" +
        "\\[link\\]\nthank you so much",

        "hey! we're {band} from {smallTown}. there are {n:words} of us and we're 16 and 17. " +
        "we're going on tour for the first time in {month} and someone told us {city} has good shows.\n" +
        "(?shortNotice: sorry, i know it's really soon!)\n\n" +
        "could we play the {date1:ord}{of1}? it has to be all ages, obviously, and we'd have to be done by about 10 because my dad is driving and he has work the next day. " +
        "we don't need money. (?PROMOTES: we can make a flyer too if you want, our drummer draws.)\n\n" +
        "\\[link\\] (it's mostly demos)\nthank you so much!"
      ],
      followup: [
        'hi, did you get this? sorry if you did and i\'m bugging you',
        'hi again! we still really want to play {city} if there\'s anything'
      ]
    },

    /* T10. The old heads' reunion run. */
    REUNION: {
      kind: ['COLD', 'RETURNING'],
      tells: { want: ['OLDER', 'HONEST', 'PRO'], avoid: ['YOUNGER', 'MASS', 'OVERSELL'] },
      weight: 1,
      teaches: 'The old heads move together. A room with a back to stand at, a door deal, and the old flyer.',
      subject: [
        '{band} - {city} - {month}',
        '{band}, a few dates in {month}'
      ],
      body: [
        "{you|Hello},\n\n" +
        "This is {band}. We played {city} a lot in {era}, mostly at houses that are gone now and a hall nobody remembers the name of. " +
        "We're doing a few dates in {month}, a couple of weekends and nothing crazy, since most of us have jobs now.\n" +
        "(?shortNotice: I realize this is late to be asking.)\n\n" +
        "We'd want a room where people our age can stand at the back with a drink and nobody's going to make them get in the pit. Door's fine. " +
        "We don't need a place to stay, {member} still lives in {nearbyTown}.\n\n" +
        "Old flyer attached, if you want to see what it used to look like.\n\n{member}",

        "{you|Hi},\n\n" +
        "I'm writing for {band}. Some people in {city} might remember us from {era}, and enough of them have asked that we're doing it: " +
        "{day1} the {date1:ord}{of1} (?date2: or {day2} the {date2:ord}{of2}), one night, then back to work.\n" +
        "(?shortNotice: I know this is short notice, and that's our fault.)\n\n" +
        "We'd like a hall or a bar, somewhere with parking. We'd like to go on last, if that's all right. {setLen} minutes. Door deal, or whatever's usual now; we haven't done this in a while.\n" +
        "(?hasLocal: {local} offered to open. Their singer's brother was our first drummer.)\n\n" +
        "Thank you for reading.\n{member}"
      ],
      followup: [
        'Following up on {month}. No rush, but we\'re setting the dates this month.',
        '{you|Hello}, checking whether this reached you. We\'d understand if the timing doesn\'t work.'
      ]
    },

    /* T11. The one with a guarantee and no reason for it. */
    TERSE: {
      kind: ['COLD'],
      tells: { want: ['ESTABLISHED'], avoid: ['HONEST', 'PLEASANT', 'MASS', 'PROMOTES'] },
      weight: 1,
      teaches: 'Terse is not rude, and not evidence of much. The tell is a guarantee with no draw at all.',
      subject: [
        '{band} / {city} / {month} {date1}',
        '{city} {date1:ord}{of1}?'
      ],
      body: [
        "{band} from {home}. {day1} the {date1:ord}{of1}. {guarantee:money} guarantee. Let us know.\n(?shortNotice: Short notice.)\n{member}",
        "Hey. {band}, {home}, {genrePlain}. Looking for {city}, the {date1:ord}{of1} (?date2: or {date2:ord}{of2}). {guarantee:money}. (?lodging: Need a floor.) (?shortNotice: Soon, I know.)\n\\[link\\]\n{member}"
      ],
      followup: [
        'Still open?',
        '{date1:ord}{of1}?'
      ]
    },

    /* T12. The van-is-broken rescue. */
    BREAKDOWN: {
      kind: ['RESCUE'],
      tells: { want: ['DESPERATE', 'PLEASANT', 'HONEST'], avoid: ['ESTABLISHED', 'MASS', 'OVERSELL'] },
      weight: 1,
      teaches: 'Nothing new. The scene asking whether you are the person you seemed to be.',
      subject: [
        'van',
        'broke down outside {nearbyTown}'
      ],
      body: [
        "we broke down outside {nearbyTown}. the shop says it won't be ready till {day2|thursday} and we have a show in {next} after that. " +
        "is there any chance of a show {day1} in {city} so we can pay for the alternator. anything. we'll play acoustic in a kitchen\n" +
        "(?shortNotice: i know it's {daysOut:words} days. i know.)\n{member}",

        "hey, it's {member} from {band}, you had us before. we're stuck. the van's at a shop near {nearbyTown} and the part is {amount:money}, which we don't have.\n" +
        "(?shortNotice: sorry, i know this is no notice at all.)\n\n" +
        "we can do any night this week, but {day1} the {date1:ord}{of1} would be best. we'll play any room for whatever comes in the door. " +
        "(?PLEASANT: we'll fix whatever needs fixing at the house in return. one of us is good with sinks.)\n\nthank you either way"
      ],
      followup: [
        'we\'re still stuck here. anything at all?',
        'the shop says one more day. we\'re still looking for a show if you have anything.'
      ]
    },

    /* LOCAL: a local band asking. Variants by the LOCAL_ASK flags. */
    LOCAL: {
      kind: ['LOCAL_ASK'],
      tells: { want: [], avoid: [] },
      weight: 1,
      teaches: 'A local band asking is a bill half built. Why they are asking tells you what the night is for.',
      subject: [
        '[?release: record release? | ?benefit: benefit show | ?firstShow: first show?? | ?emptyNight: got a night? | ?lastShow: last one | ?goingAway: going-away show | show?]',
        '{band}: [?release: the tape is done | ?benefit: can we do a benefit | ?firstShow: we\'re a band now | ?emptyNight: anything open? | ?lastShow: we\'re calling it | ?goingAway: one more before {member} goes | a show]'
      ],
      body: [
        "[?release: hey, the tape is finally done, it's at the place getting made right now. we want to do a release show in {month}. " +
        "we'd want to close, and we want it to feel special, like people came out for it. can you help? " +
        "| ?benefit: hey, a friend of ours had a really bad month, hospital stuff, and we want to do a show where the door goes to them. we'll play for free, obviously. " +
        "any chance you'd book it? " +
        "| ?firstShow: hi! we're {band}, we just started. we've got five songs and a name so far, and we'd play first on anything, any night. " +
        "| ?emptyNight: hey, we're itching to play, we haven't had a show since {season}. we'll take anything you've got, and a weeknight's fine. " +
        "| ?lastShow: hey, we're breaking up. it's fine, it's just time. we want to do one last show and we want it to be one of yours. " +
        "| ?goingAway: {member} is moving {town|away} at the end of the month and we want to do one more real show before that. " +
        "| hey, have you got anything coming up? we'd play if you need a band.]\n" +
        "(?shortNotice: sorry it's so soon.)\n" +
        "(?YOUNGER: all ages please, half of us can't get in bars.)" +
        "(?OLDER: a weekend would be better for us since we all work.)\n{member}",

        "[?release: The record's back from the plant. We want to do a release show, on a weekend if you can, and we'll make the flyer. " +
        "| ?benefit: We want to do a benefit, with the door going to a friend who needs it. We'll ask the other bands to play for free and they will. " +
        "| ?firstShow: we're a new band, it's {member} and some people from a couple of bands you know. can we open something? we're not bad. " +
        "| ?emptyNight: Have you got any nights that need a band? We're around all month. " +
        "| ?lastShow: We're playing our last show and we'd like it to be at a room we liked. You can pick which one. " +
        "| ?goingAway: We want to do a going-away show for {member}, who leaves on the {date:ord}. Any room is fine. " +
        "| We'd like to play one of your shows if you've got a spot.] " +
        "(?shortNotice: I know it's close.)\n" +
        "(?PROMOTES: We'll put it everywhere and get our friends to share it.)\n{member}"
      ],
      followup: [
        'we\'re still hoping for this one, but no pressure.',
        'just checking back. we can be flexible on which night.'
      ]
    }
  },

  /* What a touring band writes back. Slots: band, member, date, amount, n, town, prev, city. */
  replies: {
    YES: [
      'Amazing, we\'ll take it. Just tell us whatever you need from us.',
      'Yes, thank you. Put us wherever you want on the bill, we\'ll be there.',
      'perfect, we\'ll be there at 6. just tell us where to park.'
    ],
    YES_IF: [
      'We can do the door deal if you can find us a floor. There are {n:words} of us(%20: , plus a dog, and the dog\'s quiet).',
      'Yes, we\'re in. We\'re still looking for a floor for {n:words} if anybody has one, and if not we\'ll sleep in the van.',
      'We\'re in. Is there anywhere we could crash after? There are {n:words} of us and we bring our own sleeping bags.'
    ],
    COUNTER: [
      'Could you do {amount:money} guaranteed? Gas from {prev} is killing us. If not, door\'s fine, we still want to come.',
      'Can you get to {amount:money}? That\'s what the van costs us a day. Door plus a floor would also work.',
      'We\'d need {amount:money} to make the drive make sense. Tell me if that\'s not possible and we\'ll figure something else out.'
    ],
    NO_ROOM: [
      'Sounds good, but do you have a room yet? Get the date held and send it again and we\'re in.',
      'We\'d love to. Write back once you\'ve got a place locked for the {date:ord} and we\'ll say yes.'
    ],
    NO: [
      'That won\'t cover the drive for us, sorry. Thanks for answering.',
      'We can\'t make that work. Thanks for getting back to us though.'
    ],
    TOOK_OTHER: [
      'Sorry, we took {town} that night. Next time we\'ll write you first.',
      '{town} came through for that date, sorry. Thanks for answering, and keep us in mind next time.',
      'We ended up in {town} on the {date:ord}. Really appreciate you getting back to us.',
      'We had to take another date, sorry. We couldn\'t wait any longer on the van schedule, but we\'d love to come back through.'
    ],
    TOOK_OTHER_SLOW: [
      'We ended up taking {town}. We didn\'t hear back so we figured it was a no.',
      'We took {town} because we didn\'t hear from you in time. No worries, though.',
      'we had to say yes to {town}. we waited a week to hear from you.'
    ],
    CANCEL_HONEST: [
      'We have to drop the tour. {member}\'s dad is sick. I\'m so sorry. We\'ll make it up to you.',
      'The van\'s gone, it\'s the engine. We\'re getting it towed home and the rest of the dates are off. I\'m really sorry about the {date:ord}.',
      '{member} broke their wrist at work, so we can\'t play. I hate writing this. Please tell your bands we\'re sorry.'
    ],
    CANCEL_FLAKY: [
      'hey so we\'re not going to make it down there after all. routing stuff.',
      'gonna have to cancel the {date:ord}, sorry. something came up',
      'hey we\'re actually not doing the south part of the tour anymore. hope that\'s ok'
    ],
    WRONG_CITY: [
      'oh god sorry. yes {city}. we\'d still love to',
      'Ha. Yes. {city}. Sorry, we\'re writing a lot of people. We\'d still love to.',
      'sorry!! copied the wrong one. {city} for sure.'
    ]
  },

  pass: {
    SHORT: [
      'Can\'t make it work this time. Good luck on the run.',
      'Not this time, sorry. I hope the tour goes well.',
      'I\'m going to pass on this one. Thanks for thinking of {city|us}.'
    ],
    REASON: [
      /* one line, picked by what is true (fix-list 2.10): the clash only when a show is on that night, "too soon" only for short notice */
      '[?clash: I\'ve got a show that night and the town can\'t hold two. | ?soon: It\'s too soon for me to get people out. Write me earlier next time and I\'ll try. | I don\'t have a room that night that would do you right, and I\'d rather say no than put you somewhere bad.]'
    ],
    LEAD: [
      'Can\'t do it, but try {booker}, they book {room}.',
      'I can\'t this time, but {booker} does that kind of thing at {room}. Tell them I sent you.',
      'I can\'t, but {booker} might. They have {room}.'
    ]
  },

  /* The player's own messages, shown in the composer before sending. One group per ASK kind and REPLY. */
  compose: {
    INTERESTED: [
      '(?day: {day} works for me.) Give me a few days to get a room locked down.',
      '(?day: {day} could work.) Let me check rooms and get back to you this week.'
    ],
    OFFER: [
      '{dateLong}. (?doorDeal: Door deal: you get everything after {costs:money} for the room and sound.) (?guarantee: {guarantee:money} guaranteed.) ' +
      '{price:money} at the door, {ages}. (?lodging: You\'re sleeping at {stay}.) Does that work for you?'
    ],
    PASS: [
      'Can\'t make it work this time. Good luck on the run.'
    ],
    TERMS: [
      '{dateLong}. (?doorDeal: Door deal: you get everything after {costs:money} for the room and sound.) (?guarantee: {guarantee:money} guaranteed.) ' +
      '{price:money} at the door, {ages}. (?lodging: You\'re sleeping at {stay}.) Does that work for you?'
    ],
    BAND_PLAY: [
      'Do you want to {slotVerb} {dateLong}? It\'s {touring} from {home}, at {room}. (?fee: It pays {fee:money}.)',
      '{dateLong} at {room}, with {touring} from {home}. Are you in? (?fee: There\'s {fee:money} in it for you.)'
    ],
    ROOM_HOLD: [
      'Can I hold {dow} the {date:ord}?',
      'Is {dow} the {date:ord} open? I\'d like to hold it.'
    ],
    ROOM_CONFIRM: [
      'Confirming the {date:ord}. It\'s {bands} bands and we\'ll be done by {curfew}.'
    ],
    HOLDER_RELEASE: [
      'Are you using the {date:ord} at {room}?'
    ],
    CREW: [
      'Can you do {role} on the {date:ord}? It\'s at {room} and it pays {pay:money}.'
    ],
    HELPER_JOB: [
      'Could you [do a flyer run | make the flyer | do a run] for the {date:ord}? (?pay: {pay:money}.)'
    ],
    LODGING: [
      'Could you put up {n:words} people on the {date:ord}?'
    ],
    CONTACT_VET: [
      '{band} wrote me, and I know you had them. How\'d it go?'
    ],
    CONTACT_SHARE: [
      'Would you share this one with your people? {band} are from your way.'
    ],
    QUIET_WORD: [
      'Can we talk for a minute in person? I\'d rather not do it over messages.'
    ],
    TOUR_DATE: [
      'I\'ve got {band} from {city} looking for {dateLong}. They\'re good and they\'ll behave, and a door deal is fine with them.'
    ],
    BORROW: [
      'Can you float me {amount:money} till after the {date:ord}?'
    ]
  },

  /* Vetting results: a person's observation with its source. Flags choose. Slots: band, home, n, room, town, booker,
   * local, genrePlain, genreOwn. */
  vet: {
    LISTEN: [
      { if: 'genreDiffers', t: 'It\'s {genrePlain}. They call it "{genreOwn}." It\'s {genrePlain}.' },
      { if: 'young', t: 'Good songs, recorded in somebody\'s bedroom. They sound young.' },
      { if: 'OLDER', t: 'Recorded somewhere real. Sounds like people who\'ve been doing this a long time and aren\'t in a hurry.' },
      { if: 'OVERSELL', t: 'It\'s fine. It\'s well recorded and sounds like a lot of other bands.' },
      'It sounds like {genrePlain}. [They\'re tight. | It\'s loose in a good way. | It\'s fine.]',
      'Three songs of {genrePlain}, and the second one is the best by a lot. [They know what they\'re doing. | The singer\'s still finding it. | You\'d listen again.]'
    ],
    CLIP: [
      { if: 'emptyRoom', t: 'The clip\'s from a bar. The band\'s great and the room is empty.' },
      'A clip from a [house | backyard | hall] in {home}, with maybe {n} people, mostly [?YOUNGER: under 20 | ?OLDER: over 30 | in their 20s], [all moving | standing still].',
      { if: 'YOUNGER', t: 'A clip from a garage in {home}, with kids on the floor and a parent standing in the doorway. The band plays like it\'s the last show they\'ll ever get.' },
      { if: 'OLDER', t: 'A clip from a bar in {home}. People stand at the back with drinks, nodding along, and nobody\'s moving, but nobody\'s leaving either.' },
      { if: 'SLOPPY', t: 'The clip is ten minutes of tuning and two songs. When they play, they play.' },
      'A shaky phone clip from somewhere in {home}, about {n} people. The band and the room look like they\'re having the same night.'
    ],
    HISTORY: [
      { if: 'OVERSELL', t: 'On their last tour they played second of four in rooms like yours, and they didn\'t headline anywhere.' },
      'They have a couple thousand followers, and most of the comments are from {home}. [?knownHere: A few are from here, which is something. | None are from here.]',
      { if: 'PROMOTES', t: 'They share every show they play, flyer and all, and tag the other bands. Somebody over there knows how this works.' },
      { if: 'FLAKY', t: 'Two of last spring\'s dates got a "sorry, can\'t make it" post the day of.' },
      { if: 'ESTABLISHED', t: 'Last run was all clubs, and they closed most of them. An agency is tagged on every flyer.' },
      'Their last tour was houses and bars, mostly opening, with a weekend headline at home. The rooms were about the size of yours.'
    ],
    ASK_BOOKER: {
      good: [
        '{booker}: "Good kids. They played hard and drew about {n} here."',
        '{booker}: "They were easy. They showed up on time, swept up after, and played to the people who came, which was about {n}. I\'d have them back."'
      ],
      mixed: [
        '{booker}: "They showed up late, but they played hard. They drew about {n}."',
        '{booker}: "They were fine. Not great, not bad. We had around {n} people, and most of them were there for the local band."'
      ],
      bad: [
        '{booker}: "They left my couch a mess and their singer argued with the door. I wouldn\'t."',
        '{booker}: "They cancelled on me the morning of the show and said it was the van. Then their post that night was from a party."'
      ],
      unknown: [
        '{booker}: "I\'ve never had them, sorry."',
        '{booker}: "I don\'t know them. You could ask somebody in {town}."'
      ]
    },
    ASK_AROUND: [
      { if: 'knownHere', t: '{local} have been covering one of their songs. People here know them.' },
      'Nobody here has heard of them.',
      { if: 'warn', t: 'Somebody said they\'re hard to deal with. Somebody says that about everyone.' },
      { if: 'knownHere', t: 'A couple of kids at the record store had their tape and said they\'d come.' },
      { if: 'FLAKY', t: 'Somebody at the bar says they cancelled on a booker in {town} last year. Somebody else says that was a different band.' },
      'You asked around. Two people said "who?" and one said they\'d look them up.'
    ]
  },

  /* What a careful reader starts to see under a message, once its template has resolved once. One per row of the
   * tells table of story 2.3. `tell` is the TELL key the signal is evidence for. */
  signals: {
    dates_clear:   { text: 'dates clear', good: true, tell: 'PRO' },
    route_given:   { text: 'says where they\'re coming from', good: true, tell: 'PRO' },
    set_length:    { text: 'set length and gear', good: true, tell: 'PRO' },
    share_drums:   { text: '"can share drums"', good: true, tell: 'PLEASANT' },
    draw_context:  { text: 'draw with context', good: true, tell: 'HONEST' },
    small_number:  { text: 'a small honest number', good: true, tell: 'HONEST' },
    referral:      { text: 'someone sent them', good: true, tell: 'REFERRED' },
    flyer_ask:     { text: 'asks for the flyer to share', good: true, tell: 'PROMOTES' },
    offers_help:   { text: 'offers to bring something', good: true, tell: 'PLEASANT' },
    all_ages_ask:  { text: 'asks for all ages', good: true, tell: 'YOUNGER' },
    bar_ask:       { text: 'asks for a bar', good: true, tell: 'OLDER' },
    your_city:     { text: '"your city"', good: false, tell: 'MASS' },
    hello_promoter:{ text: '"Hello Promoter"', good: false, tell: 'MASS' },
    no_local:      { text: 'no local band named', good: false, tell: 'MASS' },
    round_number:  { text: 'big round number', good: false, tell: 'OVERSELL' },
    buzzwords:     { text: '"blowing up," "momentum"', good: false, tell: 'OVERSELL' },
    vague_dates:   { text: 'flexible on dates', good: false, tell: 'SLOPPY' },
    no_route:      { text: 'no route', good: false, tell: 'SLOPPY' },
    take_anything: { text: '"we\'ll take anything"', good: false, tell: 'DESPERATE' },
    agent_signs:   { text: 'an agent signs', good: false, tell: 'ESTABLISHED' },
    rider:         { text: 'a rider and a capacity question', good: false, tell: 'ESTABLISHED' },
    links_later:   { text: '"links tonight"', good: false, tell: 'FLAKY' }
  },

  ladder: { wide: 'could be {lo}, could be {hi}', mid: 'probably {lo} to {hi}', narrow: '{lo}–{hi}', known: 'drew {n} here on a {dow}' },
  /* the text a local band gets when you asked several of them for one slot and another said yes first (Bands.filledLine).
   * By the contact's generation. Slots: band, room, date, dow, other. */
  filled: {
    KIDS:   ['oh no worries, thanks for asking us! hit us up for the next one',
             'that\'s cool, we figured you were asking a bunch of bands. we\'ll be at {room} to watch {other} anyway'],
    MIDDLE: ['No problem at all, thanks for thinking of us. Tell {other} we said hi, and ask us again for the next one.',
             'Got it, the slot on the {date:ord} is taken. We\'ll catch you on the next bill.'],
    OLD:    ['That\'s fine. Thanks for letting me know before I told the rest of the band. Ask us again.',
             'Understood, and glad it\'s filled. Send us the next date when you have one.']
  },
  /* a local band's answer when you tell them yourself that the show is off (Bands.cancelLine). By the contact's generation.
   * Slots: band, room, date, dow. */
  cancelReply: {
    KIDS:   ['oh man, ok. thanks for telling us yourself and not letting us find out from the flyer. we were really looking forward to {dow}',
             'that sucks but thank you for texting us. let us know if you do something else, we\'ll play anything'],
    MIDDLE: ['Thanks for telling us right away. We\'ll find something else for {dow} the {date:ord}, and we\'d still play your next one.',
             'Understood. It\'s a bummer, but we\'d rather hear it from you today than find out at load-in.'],
    OLD:    ['I appreciate the call. These things happen. Ask us again when you\'ve got another date.',
             'Okay. Thanks for letting us know before we rearranged the week around it.']
  },
  shortNotice: 'This is short notice. Nobody expects a full room with {daysOut:words} days to get the word out, and the town will judge it that way.',
  /* under your guess when it sits far below what they say (Requests.view guessWhy); the engine adds SHORT and a period */
  guessWhy: {
    FIRST: 'They do about {says} at home. Nobody here knows them yet',
    NEARBY: 'They do about {says} at home, up the road. Only a few will make the drive',
    RETURN: "They do about {says} at home. Away from home it's always less",
    SHORT: ", and {daysOut:words} days isn't long for word to get around"
  },
  /* the warnings on a date (Crowd.near): a similar show the night before, a bigger similar show a night or three after */
  nightBefore: '{room:cap|Another room} has a show for the same crowd the night before, {night}. Some of them will still be worn out.',
  biggerAfter: '{room:cap|Another room} has a bigger show for the same crowd on {night}. Some will save their money for that one.',
  exposure: 'If nobody comes you owe {total:money}. You break even at {breakEven} paid.'
};
