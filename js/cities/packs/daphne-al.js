SB.Cities.register('daphne-al', {
  v: 1,
  slug: 'daphne-al',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['airbus', 'huntingdon college', 'united states sports academy', 'sports academy', 'daphne high', 'bayside academy', 'university of south alabama',
           'south alabama', 'spring hill college', 'university of mobile', 'coastal alabama', 'keesler', 'naval air station pensacola', 'poarch creek',
           'arts and crafts festival', 'blessing of the fleet', 'national shrimp festival', 'shrimp festival', 'beach music festival', 'hurricane danny',
           'hurricane ivan', 'george wallace', 'wallace tunnel', 'jubilee parkway', 'waffle house', 'vfw', 'american legion', 'elks', 'moose lodge',
           'daphne civic center', 'w.o. lott park', 'lott park', 'jubilee festival of arts', 'jubilee festival', 'eastern shore chamber of commerce',
           'fairhope arts & crafts festival', 'mobile bay anime festival', 'soul kitchen', 'saenger theatre', 'the merry widow', '309 punk project',
           'mob punk rock flea', 'daphne christmas parade', 'light up olde towne', 'alabama public radio', 'fox10', 'fox10tv', 'bandsintown', 'eventbrite',
           'alabama crimson tide', 'university of alabama', 'alabama music box',
           'the bluffside carport', 'jubilee hall', 'post 98', 'bayway annex', 'the spartina house', 'dead mullet garage', 'live oak dinette',
           'whispering pines rec', 'the marsh radio room', 'old crab lot', 'fellowship hall no. 2', 'thursday tide'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. Storms are written only as 'the storm'. */
  blocklist: ['airbus*', 'huntingdon*', 'bayside academy*', 'shrimp festival*', 'waffle house*'],

  blurb: ['A Mobile Bay eastern-shore suburb of subdivisions and church-league ball fields, the biggest town in Baldwin County and nowhere to go on a Friday.',
          'The kids here fill the rooms across the bay and down the coast; the rooms inside town are always about to be shut.'],
  hard: 'Spread-out subdivisions, neighbors who call, and every room is about to be shut.',
  region: 'the Gulf',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Mobile', state: 'AL', lat: 30.67, lon: -88.11 },
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.80 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Daphne' },
    { id: 'spanish-fort', kind: 'FEEDER', name: 'Spanish Fort', minutes: 10, bearing: 350, note: 'The same kind of suburb a few miles north, with no separate scene from Daphne.' },
    { id: 'fairhope', kind: 'FEEDER', name: 'Fairhope', minutes: 15, bearing: 180, scene: 60, note: 'The artsy, expensive twin and rival. Its kids are the closest crowd, with a small acoustic scene of its own.',
      rooms: [{ id: 'fairhope-yard', kind: 'OUTDOOR', hood: 'fairhope-hood', cap: 40, curfew: 1260,
      note: 'A park or a yard down the shore. An acoustic set at the loudest, over by nine.' }] },
    { id: 'loxley', kind: 'FEEDER', name: 'Loxley', minutes: 25, bearing: 85, note: 'Rural and forgotten: the longest drive and the fewest options, so the kids turn up reliably.' },
    { id: 'mobile', kind: 'FEEDER', name: 'Mobile', minutes: 25, bearing: 305, beyond: 'bayway', pop: 190000, scene: 150,
      note: 'Across the bay. They have rooms of their own, so they come over only now and then.',
      rooms: [{ id: 'bay-hall', kind: 'CLUB', hood: 'mobile-hood', cap: 300, ages: ['A18'], curfew: 1410, ac: true,
      note: 'The mid-size music hall across the bay, where the kids really go. The tunnel and the Bayway are the price.' },
              { id: 'bay-box', kind: 'BIG', hood: 'mobile-hood', cap: 1000, ages: ['A21'], curfew: 1380, ac: true,
      note: 'The 21-plus room that books the touring bands. Not a Daphne room, but a Daphne band can dream.' }] },
    { id: 'bay-minette', kind: 'FEEDER', name: 'Bay Minette', minutes: 30, bearing: 20, note: 'The county seat, small and rural, with its own high school.' },
    { id: 'foley', kind: 'FEEDER', name: 'Foley', minutes: 35, bearing: 135, note: 'A hub for the beach-tourism worker class. Hungry for something to do.' },
    { id: 'robertsdale', kind: 'FEEDER', name: 'Robertsdale', minutes: 35, bearing: 107, note: 'A farm town; kids who drive an hour for a show.' },
    { id: 'bayou-la-batre', kind: 'FEEDER', name: 'Bayou La Batre', minutes: 50, bearing: 236, beyond: 'bayway', note: 'A fishing and shrimping town with few cars. Not many come.' },
    { id: 'gulf-shores', kind: 'FEEDER', name: 'Gulf Shores and Orange Beach', minutes: 55, bearing: 153, season: { months: [5, 6, 7, 8], mul: 1.5 },
      note: 'Beach service workers: busy in summer, a ghost town in winter.' },
    { id: 'atmore', kind: 'FEEDER', name: 'Atmore', minutes: 60, bearing: 40, note: 'A small prison and casino town. Occasionally someone comes.' },
    { id: 'pascagoula', kind: 'FEEDER', name: 'Pascagoula and Ocean Springs', state: 'MS', minutes: 80, bearing: 248, beyond: 'bayway',
      note: 'A shipyard town and a beach-arts town, a reasonable pair across the line.' },
    { id: 'brewton', kind: 'FEEDER', name: 'Brewton and Monroeville', minutes: 85, bearing: 50, note: 'Small mill and farm towns. A kid shows up when a band they love comes through.' },
    { id: 'pensacola', kind: 'PEER', name: 'Pensacola', state: 'FL', minutes: 65, bearing: 107, slug: 'pensacola',
      note: 'Twice this town\'s size, with an established scene. Daphne goes to see real shows; Pensacola sees Daphne as a suburb of Mobile.' },
    { id: 'gulfport', kind: 'PEER', name: 'Gulfport and Biloxi', state: 'MS', minutes: 95, bearing: 257, slug: 'gulfport-ms', note: 'A casino and base pair, bigger, with a rougher Gulf Coast scene.' },
    { id: 'fort-walton', kind: 'PEER', name: 'Fort Walton Beach', state: 'FL', minutes: 120, bearing: 99, slug: 'fort-walton-beach-fl', note: 'Military-adjacent, past Pensacola.' },
    { id: 'hattiesburg', kind: 'PEER', name: 'Hattiesburg', state: 'MS', minutes: 135, bearing: 301, scene: 350, note: 'A college town with a real music scene, a long way around the bay.' }
  ],

  chokepoints: [                                // which zones each one cuts is said by the zones' `beyond`, above
    { id: 'bayway', name: 'the tunnel and the Bayway', p: .03 }
  ],

  hoods: [
    { id: 'olde-towne', name: 'Olde Towne', route: 'old-side', note: 'The historic core on the bluff: older frame houses, a few shops, a church hall and porches. Long-time residents.' },
    { id: 'bayfront', name: 'the Bayfront', route: 'old-side', note: 'The park and the pier along the bay. Pretty and heavily patrolled; a permitted daytime pavilion at best.' },
    { id: 'us98-strip', name: 'the US 98 strip', route: 'work-side', note: 'Big-box stores, car dealers and strip malls. Cheap vacant units and storage bays, and the place a kid actually hangs out.' },
    { id: 'lake-forest', name: 'Lake Forest', route: 'campus', note: 'A wealthy planned community with a lake and a golf course. Not a show place, but plenty of band parents live here.' },
    { id: 'northeast', name: 'Northeast Daphne', route: 'campus', note: 'Newer subdivisions and apartments off Whispering Pine Road and the interstate. Garages and bonus rooms.' },
    { id: 'malbis', name: 'Malbis and the US 90 side', route: 'work-side', note: 'Older and half rural: pole barns and big lots, cheap until the subdivisions arrive.' },
    { id: 'fairhope-hood', name: 'Fairhope', route: 'town:fairhope', note: 'The artsy twin down the shore. Parks, yards and an acoustic crowd, nothing loud.' },
    { id: 'mobile-hood', name: 'Mobile across the bay', route: 'town:mobile', note: 'The real rooms are over there, past the tunnel and the Bayway.' }
  ],

  rooms: [
    { id: 'bonus-room', kind: 'HOUSE', hood: 'northeast', cap: 40, curfew: 1320, pressure: 55, start: true,
      note: 'A garage and bonus room in a newer subdivision. There is no basement on this coast, and one neighbor\'s email ends the night.' },
    { id: 'pole-barn', kind: 'HOUSE', hood: 'malbis', cap: 60, curfew: 1380, pressure: 35,
      note: 'A pole barn on a big half-rural lot. Far enough from the neighbors to run late, until the subdivisions reach it.' },
    { id: 'bluff-porch', kind: 'HOUSE', hood: 'olde-towne', cap: 30, curfew: 1320, pressure: 55,
      note: 'A porch set on the bluff. Close neighbors who have lived here forty years, and they call.' },
    { id: 'fellowship-hall', kind: 'HALL', hood: 'olde-towne', cap: 100, curfew: 1320, ac: true, owner: 'CHURCH_CONTACT', pressure: 45,
      note: 'A church fellowship hall. All ages, no beer, the deposit gone if anything spills, and the church can say no.' },
    { id: 'civic-hall', kind: 'HALL', hood: 'us98-strip', cap: 200, rent: 400, deposit: 150, curfew: 1320, ac: true, owner: 'HALL_MANAGER', insurance: true,
      note: 'The city hall that rents out for conventions. Big, dear and strict, with a sober adult on the lease and insurance.' },
    { id: 'strip-bay', kind: 'DIY', hood: 'us98-strip', cap: 70, curfew: 1380, pressure: 60, needs: ['VOUCH'],
      note: 'A vacant strip-mall unit with a cheap lease. The landlord or the fire marshal ends it the first time a crowd shows.' },
    { id: 'bay-pavilion', kind: 'OUTDOOR', hood: 'bayfront', cap: 80, curfew: 1080, pressure: 60,
      note: 'A pavilion in the park on the bay. Permit for daytime only, and the patrol drives by every hour.' },
    { id: 'strip-bar', kind: 'BAR', hood: 'us98-strip', cap: 150, ages: ['A21'], curfew: 1500, ac: true,
      note: 'A bar with a stage on the highway. Tribute bands and 21-plus, and the owner will not wall off the booze for kids.' }
  ],

  contacts: ['mobile-al', 'pensacola', 'gulfport-ms', 'fort-walton-beach-fl'],

  calendar: [
    { id: 'arts-fest', label: 'the arts festival', tag: 'festival', month: 10, week: 3, dows: [5, 6], can: [.90, .88, .88], hoods: ['olde-towne'], elsewhere: [.98, .97, .97] },
    { id: 'xmas-parade', label: 'the Christmas parade', tag: 'parade', month: 12, week: 1, dows: [5], can: [.90, .95, .95], hoods: ['olde-towne'], elsewhere: [1, 1, 1] },
    { id: 'craft-fest', label: 'the shore craft festival', tag: 'festival', month: 3, week: 3, dows: [4, 5, 6], can: [.92, .88, .88] },
    { id: 'carnival', label: 'carnival season across the bay', tag: 'parade', month: 2, weeks: [1, 3], dows: [4, 5], can: [.90, .88, .88] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'fourth', label: 'the Fourth of July on the bay', tag: 'holiday', month: 7, week: 1, dows: [4, 5], can: [.90, .92, .92], hoods: ['bayfront'], elsewhere: [1, 1, 1] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1320 },

  points: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07, pop: 1000000 },
    { name: 'Birmingham', state: 'AL', lat: 33.52, lon: -86.80, pop: 1100000 },
    { name: 'Hattiesburg', state: 'MS', lat: 31.33, lon: -89.29, pop: 170000 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78, pop: 2100000 }
  ],
  roads: ['I-10', 'US 98', 'US 90', 'AL 59', 'AL 181', 'I-65'],

  words: {
    street: ['Main Street', 'Daphne Avenue', 'Whispering Pine Road', 'Highway 98', 'Highway 90', 'Highway 59', 'Highway 181'],
    water: ['Mobile Bay', 'the Bayway', 'the Causeway', 'the delta'],
    hood: ['Olde Towne', 'Lake Forest', 'Malbis', 'Montrose', 'Spanish Fort'],
    thing: ['jubilee', 'pecan tree', 'live oak', 'bonus room', 'pole barn', 'boiled peanuts', 'crab claws', 'flounder gig', 'group chat', 'HOA email', 'youth night', 'tunnel traffic'],
    weather: ['afternoon thunderstorm']
  },

  events: [
    { id: 'DAPHNE_AL_BAYWAY_JAM', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], chokepoint: true },
      telegraph: 'There is a wreck waiting to happen on the Bayway and the tunnel on a Friday.',
      title: 'The Bayway is jammed',
      body: 'A wreck on the Bayway and a backup at the tunnel have everyone on the Mobile side at a crawl the night of your show. The crowd from across the bay is stuck on the causeway.',
      options: [
        { id: 'EARLIER', label: 'Move the show an hour earlier so they can beat the traffic', likely: 'Most of them make it. The night starts thin.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .8, beyond: true }, { op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'qAdd', v: -2 }],
          result: 'Doors moved up an hour. The ones who wanted to come left work early.' },
        { id: 'ACCEPT', label: 'Accept a smaller crowd', likely: 'Lose most of the people from across the bay.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .3, beyond: true }],
          result: 'The traffic never cleared. Mobile stayed on its side of the water.' },
        { id: 'RIDES', label: 'Organize rides', likely: 'Two hours of your day. Most of them get there.',
          effects: [{ op: 'SHOW_MOD', key: 'zoneMul', v: .9, beyond: true }, { op: 'HOURS', d: -2, when: 'TODAY' }, { op: 'REGULARS', pct: .02 }],
          result: 'Two carloads sat in traffic together all the way over. They\'ll remember that.' }
      ] },

    { id: 'DAPHNE_AL_FOOTBALL_FRIDAY', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'game' },
      telegraph: 'It is a home Friday and the whole town will be under the stadium lights.',
      title: 'The football Friday',
      body: 'The kids you want are at the game or in the stands with their parents, and your show is the same night. The ones who come are the ones nobody picked.',
      options: [
        { id: 'LATE', label: 'Push doors back until the game lets out', likely: 'The ones who care show up after. A late start.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. They came straight from the game, still loud.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'A thin crowd, and a loyal one.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'Half the list was at the game. The room was small and glad.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it to Saturday. Not everyone could make the new one.' }
      ] },

    { id: 'DAPHNE_AL_ARTS_WEEKEND', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The festival is this weekend and the bluff streets will be closed by morning.',
      title: 'The parking is gone',
      body: 'The festival has filled the bluff, the vendors have the church hall, and a porch show means the police will come looking for a permit.',
      options: [
        { id: 'EARLY', label: 'Move the show earlier, before the vendors pack up', likely: 'Fewer people, and nobody blocked in.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Doors early. The set was done before the street reopened.' },
        { id: 'BARN', label: 'Move the bill to a barn out on the edge', likely: 'Farther out, and a smaller room.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .8 }],
          result: 'A barn on a big lot took the bill. No neighbors, and no one blocked in.' },
        { id: 'ACCEPT', label: 'Run it and hope', likely: 'The street is closed and the neighbors are watching.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'People parked a mile off and many gave up and went home.' }
      ] }
  ]
});
