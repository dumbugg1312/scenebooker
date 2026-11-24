/* Scene Booker — content/irl.js   (role CONTENT)
 * IN REAL LIFE: what each part of a night teaches about booking real shows. Schema: design/spec/13-real-booking.md
 * parts 1 and 3. Facts stay inside design/mechanics.md (sections 1, 3.4, 3.5, 4.5 to 4.7, 6, 7, 8). Plain booking
 * words, second person, one or two sentences, about real life and never about the game. `story` is left null for the
 * user's own stories.
 *
 * cause.<CAUSE>  one per SB.Enums.CAUSE:
 *   line     the lesson.
 *   whatIf   WHAT WOULD HAVE CHANGED IT, for a cause the player controlled. Slots: n (people, a number),
 *            gen (optional: the crowd most lost, a plain phrase such as 'kids' or 'old heads'),
 *            money (optional: a number of dollars, or text already formatted). HOSPITALITY and PAY measure how the
 *            bands were treated, not heads, so their whatIf carries no {n}.
 *   unknown  for a cause the player could not have known. Starts "You couldn't have known:". Slot n.
 * settle.<SHORTFALL>   one per SB.Enums.SHORTFALL (the real settle keys: POCKET, not PAY_POCKET).
 * cancel.<EARLY | MID | LATE | RESPECTED>   mechanics 4.7: more than 28 days out, 14 to 28, inside 14, a reason people respect.
 * answer.<PASSED | NEVER | PASSED_ON>       mechanics 4.7.
 * step           every CAUSE and every JOB to the booking step it is filed under on WHAT YOU'VE LEARNED.
 * steps          the steps in order; stepLabel  how each step is headed.
 * Data only: one assignment, no functions.
 */
SB.Content.irl = {
  cause: {
    GENRE_MIX: {
      line: 'Put bands on together whose crowds already go to each other\'s shows. Mix two crowds that don\'t, and half the room goes outside every other set.',
      whatIf: 'Bands from one crowd on the bill: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: those two crowds don\'t go to each other\'s shows here. It cost about {n} people.',
      story: null
    },
    GEN_MIX: {
      line: 'Know how old each band\'s people are. Kids come early and old heads come late, so a bill split down the middle plays every set to half a room.',
      whatIf: 'Bands that pull the same age crowd: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: who a band brings outside their own age group only shows once they\'ve played. Tonight that was about {n} people.',
      story: null
    },
    ORDER: {
      line: 'Put the touring band second to last and your biggest local band last. The late crowd is in for the touring band, and the closer\'s friends haven\'t gone home yet.',
      whatIf: 'Touring band second to last, biggest local band closing: about {n} more people in the room when it counted(?gen:, mostly {gen}).',
      unknown: 'You couldn\'t have known: who stays for whom only shows once a night runs. The order cost about {n} people.',
      story: null
    },
    RUNTIME: {
      line: 'Keep sets tight and share a drum kit so changeovers stay around ten minutes. On a school night the under-18s are gone by 10:30, and old heads by 11.',
      whatIf: 'The night run on time: about {n} more people still there for the last band(?gen:, mostly {gen}).',
      unknown: 'You couldn\'t have known: that band runs late. The night ran over and lost about {n} people before the last set.',
      story: null
    },
    ROOM_FIT: {
      line: 'Book a room the crowd will fill. Forty people in a room for forty is a great show; forty in a room for two hundred feels like nobody came.',
      whatIf: 'A room this crowd would have filled: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known how this room holds and sounds with this kind of band until you\'d seen it. It cost about {n} people.',
      story: null
    },
    AGE_GATE: {
      line: 'Check the room\'s ages against the bill before you hold the date. A 21-and-up bar locks out the kids, and for some bands that\'s most of their crowd.',
      whatIf: 'An all-ages room: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: how many of these bands\' people are under 21. About {n} stayed home because they couldn\'t get in.',
      story: null
    },
    NIGHT: {
      line: 'Pick the night for the crowd you want. Kids and old heads come out Friday and Saturday; a lot of people in their twenties are working those nights in kitchens and bars.',
      whatIf: 'The best night of the week for this crowd: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: how this crowd treats that night of the week here. It cost about {n} people.',
      story: null
    },
    PROMO_ANNOUNCE: {
      line: 'Announce early: a house show can go up three weeks out, a hall wants four, a club six. Announce a week out and you get about four in ten of the people you would have.',
      whatIf: 'Announced on time, with the flyer: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: how far your posts and word of mouth carry with this crowd. It came up about {n} people short.',
      story: null
    },
    PROMO_FLYER: {
      line: 'Get the flyer done within a week of confirming the room. The posters, the bands sharing it and the announcement all wait on it.',
      whatIf: 'The flyer done the week the room was confirmed: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: how much this crowd goes by the flyer. It came up about {n} people short.',
      story: null
    },
    PROMO_POSTERS: {
      line: 'Posters need two to three weeks on the wall, and the community calendars close about twelve days out. Old heads find shows on poles and in the weekly paper.',
      whatIf: 'Posters up three weeks out and the listings in on time: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: how many people here still read the poles and the paper. It came up about {n} people short.',
      story: null
    },
    PROMO_SHARES: {
      line: 'Send every band the flyer the day you announce and ask them to post it, because most of their friends will hear about the show from them.',
      whatIf: 'Every band sharing the flyer when you announced: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: whether these bands actually post their shows. They mostly didn\'t, and it cost about {n} people.',
      story: null
    },
    PROMO_DMS: {
      line: 'In the last ten days, message the people who come to everything and ask them by name. Each one who says yes brings a friend or two.',
      whatIf: 'Asking your people directly the week before: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: how many of the people you asked would bring someone. It came up about {n} short.',
      story: null
    },
    PROMO_PUSH: {
      line: 'Post it again the week of the show and the morning of. People who saw the flyer a month ago have forgotten the date.',
      whatIf: 'A reminder the week of and the morning of: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: how many people needed the reminder this time. It came up about {n} short.',
      story: null
    },
    PROMO_EXIT: {
      line: 'Hand out flyers at the shows in the three weeks before yours, the ones with a crowd like yours, because those people already go out.',
      whatIf: 'Flyers handed out at a show like this one: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: how many of the people you handed flyers to would come. It came up about {n} short.',
      story: null
    },
    DOOR_PRICE: {
      line: 'Price the door for who\'s coming. Kids turn around when it\'s more than they have on them; a strong bill can ask a few dollars more.',
      whatIf: 'A door price this crowd was used to: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: where this crowd stops paying. The price kept about {n} people out.',
      story: null
    },
    DOOR_COUNT: {
      line: 'A DIY door is loose and that\'s fine. Put a friendly person on it with a cash box and a stamp, and don\'t make anyone feel bad for being a few dollars short.',
      whatIf: 'Somebody on the door the whole night: about {n} more paying (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: the door ran looser than usual tonight. About {n} came in without paying.',
      story: null
    },
    SOUND: {
      line: 'Line up a good sound person two weeks out; they\'re the biggest thing you control about how the bands sound. The good ones get booked first.',
      whatIf: 'A good sound person and the shared gear sorted: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known how this band sounds live until you\'d stood in front of them. Tonight that was worth about {n} people.',
      story: null
    },
    COMPETITION: {
      line: 'Before you hold a date, check what the regular venues and the house spots have that night and that week. Two shows for the same crowd split it, and people skip yours to save up for the bigger one.',
      whatIf: 'A night with nothing else on for this crowd: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: another show for the same crowd landed after you booked. It took about {n} people.',
      story: null
    },
    TOWN_EVENT: {
      line: 'Look at the town calendar before you hold the room: festivals, game days, the week before payday. If your show lands on the town\'s big weekend, most people will be at that instead.',
      whatIf: 'A night clear of the town\'s calendar: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: the town had something on that night. It took about {n} people.',
      story: null
    },
    TREND: {
      line: 'Watch what the kids are starting bands in. Book what\'s coming up and the young crowd comes; book what\'s fading and you play to whoever stayed.',
      whatIf: 'A sound that wasn\'t fading here: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: that sound is fading here right now. It cost about {n} people.',
      story: null
    },
    DRAW_AWAY: {
      line: 'A touring band draws a fraction of their home number the first time through. Ask a booker in the last town what they really drew, and plan for that.',
      whatIf: 'A local band with friends in town added to the bill: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: the touring band drew about {n} fewer here than you\'d guessed, because what a band draws at home usually doesn\'t carry over to a town that doesn\'t know them yet.',
      story: null
    },
    LOCAL_DRAW: {
      line: 'Local openers are how a touring show gets a room. Ask the ones who bring their friends, and don\'t put two bands with the same friends on one bill.',
      whatIf: 'A local band that brings its own people: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: how many people that local band really brings. It was about {n} fewer than you\'d guessed.',
      story: null
    },
    OVERUSE: {
      line: 'Don\'t book the same local band every couple of weeks. Once a month at most, or their friends skip it because they\'ll catch the next one.',
      whatIf: 'Bands that hadn\'t played in a while: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: that band had played around town a lot lately. Their friends sat this one out, about {n} people.',
      story: null
    },
    REPEAT: {
      line: 'A town like this has two or so venues with shows Thursday through Saturday, maybe Sunday, plus houses and DIY spots doing one or two a month. Your show is one of several that week, so don\'t put two of your own in front of the same crowd close together.',
      whatIf: 'More time since your last show for this crowd: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: this crowd was already worn out from a busy couple of weeks. It cost about {n} people.',
      story: null
    },
    REGULARS: {
      line: 'Put a sign-up sheet on the door table and write to that list before every show. People who trust your shows come to the odd bills too, and they come early.',
      whatIf: 'Your list written to on time: about {n} more of your regulars(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: fewer of your usual faces were free that night. It came up about {n} short.',
      story: null
    },
    HOSPITALITY: {
      line: 'Feed the touring band and know where they\'re sleeping before they get to town. Bands tell every other band how a town treated them.',
      whatIf: 'Food and a floor ready when they pulled up: they\'d have left telling other bands to come here.',
      unknown: 'You couldn\'t have known what this band needed that night. They left less happy than you\'d hoped.',
      story: null
    },
    PAY: {
      line: 'Pay every band at the very end of the night, with the math written down where they can see it. A band that feels shorted tells everyone on their route.',
      whatIf: 'Paying what you promised, on the night: they\'d have told the next towns you\'re good for it.',
      unknown: 'You couldn\'t have known the door would come in short of what you promised, and with a guarantee you owe the band that number either way.',
      story: null
    },
    ADVANCE: {
      line: 'Two weeks out, send every band and the room the address, load-in, set times, pay and where the touring band sleeps. A band that has it shows up on time; one that doesn\'t calls you from a gas station.',
      whatIf: 'The advance sent two weeks out: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: a band was going to be late whatever you sent them. It cost about {n} people.',
      story: null
    },
    VENUE_REP: {
      line: 'Know what people think of a room before you book it. Some people won\'t set foot in a sketchy place, and parents won\'t let their kids go.',
      whatIf: 'A room people trust: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known how this crowd feels about this room. About {n} people stayed home over it.',
      story: null
    },
    SAFETY: {
      line: 'Pick someone to be on the floor, post the house rules, keep the exits clear and stop the door at the room\'s number. At a house, keep the address off the poster and give it to whoever asks.',
      whatIf: 'Someone on the floor, the rules up and the door capped: about {n} more people(?gen:, mostly {gen}) (?money:(about {money:money})).',
      unknown: 'You couldn\'t have known: trouble walked in tonight. It cost about {n} people.',
      story: null
    }
  },

  /* After the player picks how to cover a door that came up short (mechanics 4.6). */
  settle: {
    POCKET: {
      line: 'If the door comes up short, you cover the guarantee yourself. That\'s what a guarantee is, so only promise what you can afford to lose.',
      story: null
    },
    ASK_LESS: {
      line: 'Never ask a band to take less than you promised; it\'s disrespectful and they won\'t forget it. If you\'re not sure the door will cover a number, offer part of the door from the start, which plenty of bands ask for anyway.',
      story: null
    },
    LOCALS_GIVE: {
      line: 'Local bands will often give up their cut for a touring band that drove a long way, but let them be the ones to offer it.',
      story: null
    },
    HAT: {
      line: 'Nobody passes a hat. If the touring band needs gas money, ask at the door: a few extra dollars for the band from out of town, and people give.',
      story: null
    },
    SHORT_SILENT: {
      line: 'Never short a band and say nothing. They find out, and every band on their route hears about it inside a month.',
      story: null
    },
    OFF_RENT: {
      line: 'You can ask the room to take less rent, but the owner remembers it and a hall may keep your deposit, so don\'t ask more than once.',
      story: null
    }
  },

  /* When the player calls off a show they said yes to (mechanics 4.7). */
  cancel: {
    EARLY: {
      line: 'If you have to cancel, do it a month or more out. The band can still fill the date somewhere else.',
      story: null
    },
    MID: {
      line: 'Cancel two to four weeks out and the band likely can\'t fill the hole in their route, and the locals and the room lose the night too. Tell every one of them yourself, the same day.',
      story: null
    },
    LATE: {
      line: 'Cancel inside two weeks and everyone pays: the band, the locals, the room, often your deposit. The people who planned on coming remember it.',
      story: null
    },
    RESPECTED: {
      line: 'A storm, a room closing, a warning that checked out: people understand those. Tell everyone fast and tell them why.',
      story: null
    }
  },

  /* When the player passes on a request, or never answers it (mechanics 4.7). */
  answer: {
    PASSED: {
      line: 'Say no fast and say it kindly. A quick no lets a band route around you, and they\'ll ask again next time.',
      story: null
    },
    NEVER: {
      line: 'Answer every request, even with a no. Bands stop writing to a town where nobody writes back.',
      story: null
    },
    PASSED_ON: {
      line: 'If a band isn\'t right for you, pass them to a booker they suit. The band remembers it, and so does the booker.',
      story: null
    }
  },

  /* The booking steps, in order, and how WHAT YOU'VE LEARNED heads each one. */
  steps: ['DATE', 'ROOM', 'DEAL', 'BILL', 'CREW', 'ANNOUNCE', 'NIGHT', 'SETTLE'],
  stepLabel: { DATE: 'DATE', ROOM: 'ROOM', DEAL: 'THE DEAL', BILL: 'BILL', CREW: 'CREW', ANNOUNCE: 'ANNOUNCE',
               NIGHT: 'SHOW NIGHT', SETTLE: 'SETTLING UP' },

  /* Every CAUSE and every JOB to its step. */
  step: {
    /* causes */
    GENRE_MIX: 'BILL', GEN_MIX: 'BILL', ORDER: 'BILL', RUNTIME: 'NIGHT', ROOM_FIT: 'ROOM', AGE_GATE: 'ROOM', NIGHT: 'DATE',
    PROMO_ANNOUNCE: 'ANNOUNCE', PROMO_FLYER: 'ANNOUNCE', PROMO_POSTERS: 'ANNOUNCE', PROMO_SHARES: 'ANNOUNCE', PROMO_DMS: 'ANNOUNCE',
    PROMO_PUSH: 'ANNOUNCE', PROMO_EXIT: 'ANNOUNCE', DOOR_PRICE: 'DEAL', DOOR_COUNT: 'SETTLE', SOUND: 'CREW', COMPETITION: 'DATE',
    TOWN_EVENT: 'DATE', TREND: 'BILL', DRAW_AWAY: 'BILL', LOCAL_DRAW: 'BILL', OVERUSE: 'BILL', REPEAT: 'DATE', REGULARS: 'ANNOUNCE',
    HOSPITALITY: 'NIGHT', PAY: 'SETTLE', ADVANCE: 'NIGHT', VENUE_REP: 'ROOM', SAFETY: 'CREW',
    /* jobs: getting the show */
    ANSWER_REQUEST: 'DATE', VET_LISTEN: 'DEAL', VET_CLIP: 'DEAL', VET_HISTORY: 'DEAL', VET_ASK_BOOKER: 'DEAL', VET_ASK_AROUND: 'DEAL',
    HOLD_ROOM: 'ROOM', AGREE_TERMS: 'DEAL', ASK_LOCALS: 'BILL', LOCK_BILL: 'BILL', CONFIRM_ROOM: 'ROOM',
    /* telling people */
    MAKE_FLYER: 'ANNOUNCE', ANNOUNCE: 'ANNOUNCE', BANDS_SHARE: 'ANNOUNCE', PRINT: 'ANNOUNCE', FLYER_RUN: 'ANNOUNCE', LISTINGS: 'ANNOUNCE',
    LOCAL_AD: 'ANNOUNCE', MAILING_LIST: 'ANNOUNCE', HAND_OUT: 'ANNOUNCE', INVITES: 'ANNOUNCE', WEEK_PUSH: 'ANNOUNCE', DAY_OF_POST: 'ANNOUNCE',
    /* making it run (the ADVANCE job shares its key, and its step, with the ADVANCE cause above) */
    LINE_UP_CREW: 'CREW', SORT_GEAR: 'NIGHT', HOUSE_RULES: 'NIGHT', NEIGHBORS: 'NIGHT', LODGING: 'NIGHT',
    DAY_BEFORE: 'NIGHT', FOOD: 'NIGHT',
    /* the night and after */
    RUN_SHOW: 'NIGHT', THANKS: 'SETTLE', DEBRIEF: 'SETTLE',
    /* not tied to one show */
    GO_TO_SHOW: 'BILL', VISIT: 'ROOM', EXTRA_SHIFT: 'SETTLE', HARM_ASK: 'BILL', HARM_WORD: 'BILL', TOUR_ROUTE: 'DATE', TOUR_ADVANCE: 'NIGHT'
  }
};
