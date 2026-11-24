SB.Cities.register('portland-me', {
  v: 1,
  slug: 'portland-me',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['portland press herald', 'press herald', 'wmpg', 'amtrak', 'downeaster', 'concord trailways', 'greyhound', 'old port festival',
           'first friday art walk', 'bath iron works', 'portsmouth naval shipyard', 'bowdoin', 'bates', 'colby college',
           'university of southern maine', 'southern maine community college', 'maine college of art', 'moxie', 'allen\'s coffee brandy', 'allen\'s',
           'dunkin', 'dunks', 'maine maritime', 'sea dogs', 'portland sea dogs', 'maine lobster festival', 'maine mall', 'vfw', 'american legion',
           'knights of columbus', 'grange', 'the bait shed', 'the cold storage', 'tin can hall', 'the brine room', 'longshore social club',
           'sardine hall', 'the dooryard', 'fogbound', 'ferry terminal basement', 'back cove boat barn', 'the ledgeworks', 'kelp hall',
           'shipyard old port half marathon', 'old port half marathon', 'pride portland', 'portland pride', 'harvest on the harbor',
           'maine international film festival', 'portland maine comedy festival', 'yarmouth clam festival', 'portland schoonerfest', 'schoonerfest',
           'bangor daily news', 'bdn', 'sun journal', 'down east', 'downeast', 'the maine mag', 'kennebec journal', 'eastern promenade',
           'eastern prom', 'deering oaks', 'casco bay lines', 'portland housing authority'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['press herald*', 'wmpg*', 'old port festival*', 'bath iron works*', 'allen\'s coffee*', 'sea dogs*', 'bowdoin*'],

  blurb: ['A hilly peninsula city on Casco Bay with a working waterfront and a tourist downtown, the one place in a rural state where enough kids concentrate.',
          'A small cold-water scene on the end of the road, kept going by damp cellars and halls. Rent keeps pushing it out to the mill towns.'],
  hard: 'Short summers, long snow, and a 21+ bar calendar.',
  region: 'New England',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Providence', state: 'RI', lat: 41.82, lon: -71.41 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Portland' },
    { id: 'south-portland', kind: 'FEEDER', name: 'South Portland', minutes: 10, bearing: 160, scene: 80, note: 'Across the bridge: a suburb of shipyards, oil tanks and a community college. Kids come over all the time.' },
    { id: 'westbrook', kind: 'FEEDER', name: 'Westbrook', minutes: 15, bearing: 285, note: 'A mill city and the cheaper next-door option, with some scene overlap.' },
    { id: 'freeport', kind: 'FEEDER', name: 'Freeport, Yarmouth and Falmouth', minutes: 20, bearing: 20, note: 'Wealthier coastal suburbs to the north; kids come for shows but there is not much scene.' },
    { id: 'windham', kind: 'FEEDER', name: 'Windham and Gray', minutes: 25, bearing: 315, note: 'Exurbs with kids who have cars and parents.' },
    { id: 'gorham', kind: 'FEEDER', name: 'Gorham', minutes: 25, bearing: 265, note: 'A suburb with a state university campus. A small scene.' },
    { id: 'biddeford', kind: 'FEEDER', name: 'Biddeford and Saco', minutes: 30, bearing: 215, scene: 80, note: 'Mill cities on the Saco River with a small college and a real scene of their own.' },
    { id: 'kennebunk', kind: 'FEEDER', name: 'Kennebunk and Wells', minutes: 30, bearing: 205, note: 'Beach and summer-people towns; kids come for shows in the off season.' },
    { id: 'brunswick', kind: 'FEEDER', name: 'Brunswick', minutes: 30, bearing: 40, note: 'A college town with a closed naval air station: college kids and townies.' },
    { id: 'lewiston', kind: 'FEEDER', name: 'Lewiston and Auburn', minutes: 40, bearing: 355, note: 'Franco-American mill cities with a tougher economy, a college and a scene that likes to snipe at Portland.' },
    { id: 'sanford', kind: 'FEEDER', name: 'Sanford and Springvale', minutes: 45, bearing: 250, note: 'A mill and factory town with a small scene.' },
    { id: 'portsmouth', kind: 'PEER', name: 'Portsmouth', state: 'NH', minutes: 50, bearing: 215, note: 'A smaller seacoast arts city that shares bands with Portland constantly. A little richer and more touristy.' },
    { id: 'manchester', kind: 'PEER', name: 'Manchester', state: 'NH', minutes: 80, bearing: 235, slug: 'manchester-nh', note: 'A bigger mill city with a rougher edge. Some traffic both ways.' },
    { id: 'bangor', kind: 'PEER', name: 'Bangor', minutes: 120, bearing: 40, note: 'The in-state peer to the north. Its kids drive down more than Portland kids drive up.' },
    { id: 'burlington', kind: 'PEER', name: 'Burlington', state: 'VT', minutes: 180, bearing: 290, slug: 'burlington-vt', note: 'A similar college-town size, but a long drive over the mountains; the link is mostly touring.' }
  ],

  hoods: [
    { id: 'old-port', name: 'the Old Port', route: 'downtown', note: 'Cobblestones, brick warehouses, bars and tourists. Licensed 21 and over rooms and fully priced out; where DIY kids work and drink.' },
    { id: 'bayside', name: 'Bayside and East Bayside', route: 'work-side', note: 'Former rail and industrial land with warehouses, breweries and new apartments. The cheap zone is closing fast.' },
    { id: 'munjoy-hill', name: 'Munjoy Hill', route: 'old-side', note: 'The hill at the east end, once working-class and cheap, now mostly condos. House shows face neighbors.' },
    { id: 'west-end', name: 'the West End', route: 'old-side', note: 'Victorian houses cut into apartments with young roommates and a few stone cellars. Loud shows get noticed.' },
    { id: 'parkside', name: 'Parkside and the Back Cove side', route: 'campus', note: 'A rowdy rental area with a student feel, cheaper than the peninsula tips. Good house show ground.' },
    { id: 'deering', name: 'Deering and Woodfords Corner', route: 'campus', note: 'Single-family houses, duplexes, cellars and yards off the peninsula, with more room and fewer neighbors.' },
    { id: 'riverton', name: 'Riverton, Stroudwater and Libbytown', route: 'work-side', note: 'The cheapest in-city blocks along the big avenues, car-dependent, with light industrial space nearby.' },
    { id: 'peninsula-edge', name: 'the harbor and the islands', route: 'downtown', note: 'Ferry-dock halls and island one-offs. Charming, and the last boat leaves early.' },
    { id: 'south-portland-hood', name: 'South Portland', route: 'town:south-portland', note: 'Across the bridge: oil tanks, a shipyard past and halls that rent by the night.' },
    { id: 'biddeford-hood', name: 'Biddeford and Saco', route: 'town:biddeford', note: 'Mill-city brick and cheap cellars thirty minutes down I-95, where rent is lower than on the peninsula.' }
  ],

  rooms: [
    { id: 'parkside-cellar', kind: 'HOUSE', hood: 'parkside', cap: 50, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 50],
      pressure: 50, start: true, note: 'A rental basement behind a hand-passed address. One noise complaint ends the night, and the rent is pushing the hosts out.' },
    { id: 'deering-cellar', kind: 'HOUSE', hood: 'deering', cap: 60, hostCut: 0, pa: .4, curfew: 1320, ac: false, outdoor: false, sketch: 20, standing: [65, 60, 50],
      pressure: 45, note: 'A single-family cellar off the peninsula. More room and fewer neighbors, but everyone needs a car.' },
    { id: 'west-end-cellar', kind: 'HOUSE', hood: 'west-end', cap: 35, hostCut: 0, pa: .4, curfew: 1290, ac: false, outdoor: false, sketch: 25, standing: [60, 60, 45],
      pressure: 60, note: 'A stone-walled cellar under roommates\' apartments in a cut-up Victorian. Small, damp, and the neighbors notice.' },
    { id: 'bayside-room', kind: 'DIY', hood: 'bayside', cap: 120, rent: 0, pa: .5, curfew: 1410, ac: false, sketch: 40, standing: [60, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'A hand-billed, cash-at-the-door shop room with three or four bands a night. The taprooms and new apartments are closing in.' },
    { id: 'congress-room', kind: 'DIY', hood: 'old-port', cap: 200, rent: 90, pa: .6, ages: ['A18'], curfew: 1440, ac: true, sketch: 30, standing: [55, 65, 55],
      pressure: 50, note: 'A punk and metal room in a former movie house, licensed now. It started underground, and staying legal costs money.' },
    { id: 'old-port-bar', kind: 'BAR', hood: 'old-port', cap: 150, soundFee: 60, pa: .7, ages: ['A21'], curfew: 1500, ac: true, following: .3, sketch: 20,
      standing: [50, 65, 70], note: 'A long-running dive with a stage and original bands, mostly 21 and over. Tourist-district rent hangs over it.' },
    { id: 'hill-club', kind: 'CLUB', hood: 'munjoy-hill', cap: 300, houseCosts: 150, split: .8, pa: .9, ages: ['A18'], curfew: 1410, ac: true, following: .5, sketch: 15,
      standing: [45, 70, 70], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'A standing-room club for touring metal and rock. The off-season calendar runs thin.' },
    { id: 'palace-theater', kind: 'BIG', hood: 'old-port', cap: 1600, pa: 1, ages: ['ALL'], curfew: 1380, ac: true, following: .7, sketch: 5,
      standing: [40, 70, 70], note: 'A restored movie palace on Congress Street. Touring punk and metal bills, and some of them all ages.' },
    { id: 'south-portland-hall', kind: 'HALL', hood: 'south-portland-hood', cap: 150, rent: 150, deposit: 75, pa: .5, curfew: 1350, ac: true, sketch: 10,
      standing: [60, 60, 65], owner: 'HALL_MANAGER', note: 'A rented hall across the bridge. It works with a one-night permit and a sober adult on the door.' },
    { id: 'park-pavilion', kind: 'OUTDOOR', hood: 'deering', cap: 100, rent: 15, pa: .4, curfew: 1140, sketch: 30, standing: [60, 55, 40],
      note: 'A bandstand and a pavilion by the big city park. Three good months, and the bill is over by seven.' },
    { id: 'island-dock', kind: 'OUTDOOR', hood: 'peninsula-edge', cap: 60, rent: 20, pa: .4, curfew: 1080, sketch: 30, standing: [55, 55, 40],
      note: 'A ferry-dock hall on one of the islands. The last boat back sets your set time and the headliner\'s song count.' },
    { id: 'biddeford-cellar', kind: 'HOUSE', hood: 'biddeford-hood', cap: 70, hostCut: 0, pa: .4, curfew: 1350, ac: false, outdoor: false, sketch: 30, standing: [65, 60, 45],
      pressure: 45, note: 'A mill-town basement with cheap rent and a scene of its own. Half an hour down the highway.' }
  ],

  contacts: ['manchester-nh', 'burlington-vt', 'boston', 'worcester-ma', 'providence'],

  calendar: [
    { id: 'half-marathon', label: 'the half-marathon weekend', tag: 'race', month: 6, weeks: [3, 4], dows: [5, 6], can: [.90, .92, .95], hoods: ['old-port', 'parkside'], elsewhere: [1, 1, 1] },
    { id: 'pride-weekend', label: 'the pride parade and festival', tag: 'festival', month: 6, weeks: [2, 3], dows: [5], can: [.92, .90, .90], hoods: ['deering', 'old-port'], elsewhere: [1, .97, .97] },
    { id: 'harbor-fireworks', label: 'the Fourth of July harbor fireworks', tag: 'holiday', month: 7, week: 1, dows: [3, 4, 5], can: [.88, .85, .85], hoods: ['munjoy-hill', 'old-port', 'peninsula-edge'], elsewhere: [1, .97, .97] },
    { id: 'coast-festival', label: 'the summer coast festival up the road', tag: 'festival', month: 7, week: 3, dows: [4, 5, 6], can: [.97, .92, .92] },
    { id: 'comedy-weekend', label: 'the comedy festival', tag: 'festival', month: 9, week: 1, dows: [3, 4, 5, 6], can: [.95, .92, .92], hoods: ['old-port'], elsewhere: [1, 1, 1] },
    { id: 'harbor-food', label: 'the harbor food weekend', tag: 'festival', month: 10, weeks: [2, 3], dows: [4, 5, 6], can: [.95, .92, .90], hoods: ['old-port'], elsewhere: [1, 1, 1] },
    { id: 'snow-ban', label: 'the first snow-ban nights', tag: 'holiday', month: 12, weeks: [2, 4], dows: [1, 2, 3, 4, 5], can: [.85, .88, .88] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'Portsmouth', state: 'NH', lat: 43.07, lon: -70.76, pop: 22000 },
    { name: 'Bangor', state: 'ME', lat: 44.8, lon: -68.77, pop: 32000 },
    { name: 'Lewiston', state: 'ME', lat: 44.1, lon: -70.21, pop: 37000 },
    { name: 'Augusta', state: 'ME', lat: 44.31, lon: -69.78, pop: 19000 },
    { name: 'Rockland', state: 'ME', lat: 44.1, lon: -69.11, pop: 7000 }
  ],
  roads: ['I-95', 'I-295', 'US 1', 'US 302', 'Route 25', 'Route 22'],

  words: {
    street: ['Forest Avenue', 'Brighton Avenue', 'Congress Street', 'Washington Avenue', 'Commercial Street', 'Franklin Arterial'],
    water: ['Casco Bay', 'Back Cove', 'the Fore River', 'the Saco River', 'Portland Harbor'],
    hood: ['Munjoy Hill', 'East Bayside', 'Bayside', 'West End', 'Parkside', 'Deering', 'Woodfords Corner', 'Riverton', 'Stroudwater', 'Libbytown', 'Nason\'s Corner', 'Peaks Island'],
    thing: ['lobster boat', 'ferry', 'fish pier', 'mill building', 'stone cellar', 'dooryard', 'cruise ship', 'red-skin hot dog', 'whoopie pie', 'wristband', 'backyard', 'tip jar'],
    weather: ['nor\'easter', 'fog', 'mud season', 'snow emergency']
  },

  events: [
    { id: 'PORTLAND_ME_SNOW_BAN', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [12, 1, 2, 3] },
      telegraph: 'The city has called a snow ban for tonight, overnight parking off every street on the hill.',
      title: 'The vans are getting towed',
      body: 'From ten the peninsula is a tow zone, and the side streets are where the touring vans always end up. The bill has three vans and one legal lot, by the waterfront.',
      options: [
        { id: 'EARLY', label: 'Cut the night short and get everyone out by ten', likely: 'It\'s a tight bill, and the late crowd misses it.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors were early and you were done by ten, and the vans were out before the plows came.' },
        { id: 'LOT', label: 'Pay for the waterfront lot and play on', likely: 'Costs money, and the crowd shrinks a little.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Everybody parked down by the water and walked up through the snow, and the room was warm and loud.' },
        { id: 'ACCEPT', label: 'Run it as planned and hope', likely: 'Nobody wants to lose a van.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .7 }],
          result: 'Half the list stayed home, and two bands left in the middle of the headliner to move their van.' }
      ] },

    { id: 'PORTLAND_ME_LAST_FERRY', when: 'WEEK', tier: 'HARD', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3], months: [6, 7, 8, 9] },
      telegraph: 'The island show is on, and the last boat back leaves at a quarter to nine.',
      title: 'The last boat',
      body: 'The ferry sets the set times, and the headliner wants a full set, but the last boat does not wait for anyone.',
      options: [
        { id: 'CUT', label: 'Cut the bill short and make the boat', likely: 'Shorter sets, and everyone gets home.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The headliner cut two songs and everyone ran for the dock, and the boat pulled out with the whole bill on the deck.' },
        { id: 'FLOOR', label: 'Let the bill sleep on the hall floor', likely: 'A full night, and a long morning.',
          effects: [{ op: 'MONEY', amount: -25 }, { op: 'SHOW_MOD', key: 'qAdd', v: 1 }],
          result: 'The set ran as long as the bands wanted, and everyone slept on the hall floor with the tide outside.' },
        { id: 'MOVE', label: 'Move it a day', likely: 'It breaks the date and costs you some trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day, and the ones who could make the boat, made it.' }
      ] },

    { id: 'PORTLAND_ME_FIREWORKS', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 60, bind: ['show'],
      if: { daysOut: [0, 4], months: [7], calendar: 'holiday' },
      telegraph: 'The harbor fireworks are on Saturday, and the whole east end will be shut to cars.',
      title: 'The east end is closed',
      body: 'Streets are blocked from the hill to the Old Port. Anybody who loads in after dark cannot reach the door, and half the town is on the water.',
      options: [
        { id: 'EARLY', label: 'Load in early and start before the fireworks', likely: 'It\'s a short, early night, and the crowd comes after.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'Everything was loaded by six and the bill was done as the first rocket went up.' },
        { id: 'LATE', label: 'Push doors back until the crowds clear', likely: 'The ones who want a show come in after the crowd.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 90 }, { op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'Doors were at ten, and the room filled up with sunburned, loud people from the water.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'Vans stuck behind the barricades.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .75 }],
          result: 'Two bands carried their gear in on foot, and the crowd went to the water instead.' }
      ] }
  ]
});
