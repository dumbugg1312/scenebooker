SB.Cities.register('daphne-al', {
  v: 1,
  slug: 'daphne-al',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['airbus', 'huntingdon college', 'united states sports academy', 'sports academy', 'daphne high', 'bayside academy', 'university of south alabama',
           'south alabama', 'spring hill college', 'university of mobile', 'coastal alabama', 'keesler', 'naval air station pensacola', 'poarch creek',
           'arts and crafts festival', 'blessing of the fleet', 'national shrimp festival', 'shrimp festival', 'beach music festival', 'hurricane danny',
           'hurricane ivan', 'george wallace', 'wallace tunnel', 'jubilee parkway', 'waffle house', 'vfw', 'american legion', 'elks', 'moose lodge',
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
    { id: 'fairhope', kind: 'FEEDER', name: 'Fairhope', minutes: 15, bearing: 180, note: 'The artsy, expensive twin and rival. Its kids are the closest crowd, with a small acoustic scene of its own.' },
    { id: 'loxley', kind: 'FEEDER', name: 'Loxley', minutes: 25, bearing: 85, note: 'Rural and forgotten: the longest drive and the fewest options, so the kids turn up reliably.' },
    { id: 'mobile', kind: 'FEEDER', name: 'Mobile', minutes: 25, bearing: 305, beyond: 'bayway', pop: 190000,
      note: 'Across the bay. They have rooms of their own, so they come over only now and then.' },
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
    { id: 'malbis', name: 'Malbis and the US 90 side', route: 'work-side', note: 'Older and half rural: pole barns and big lots, cheap until the subdivisions arrive.' }
  ],

  contacts: ['mobile-al', 'pensacola', 'gulfport-ms'],

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
      ] }
  ]
});
