SB.Cities.register('portland-me', {
  v: 1,
  slug: 'portland-me',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['portland press herald', 'press herald', 'wmpg', 'amtrak', 'downeaster', 'concord trailways', 'greyhound', 'old port festival',
           'first friday art walk', 'bath iron works', 'portsmouth naval shipyard', 'bowdoin', 'bates', 'colby college',
           'university of southern maine', 'southern maine community college', 'maine college of art', 'moxie', 'allen\'s coffee brandy', 'allen\'s',
           'dunkin', 'dunks', 'maine maritime', 'sea dogs', 'portland sea dogs', 'maine lobster festival', 'maine mall', 'vfw', 'american legion',
           'knights of columbus', 'grange', 'the bait shed', 'the cold storage', 'tin can hall', 'the brine room', 'longshore social club',
           'sardine hall', 'the dooryard', 'fogbound', 'ferry terminal basement', 'back cove boat barn', 'the ledgeworks', 'kelp hall'],
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
    { id: 'south-portland', kind: 'FEEDER', name: 'South Portland', minutes: 10, bearing: 160, note: 'Across the bridge: a suburb of shipyards, oil tanks and a community college. Kids come over all the time.' },
    { id: 'westbrook', kind: 'FEEDER', name: 'Westbrook', minutes: 15, bearing: 285, note: 'A mill city and the cheaper next-door option, with some scene overlap.' },
    { id: 'freeport', kind: 'FEEDER', name: 'Freeport, Yarmouth and Falmouth', minutes: 20, bearing: 20, note: 'Wealthier coastal suburbs to the north; kids come for shows but there is not much scene.' },
    { id: 'windham', kind: 'FEEDER', name: 'Windham and Gray', minutes: 25, bearing: 315, note: 'Exurbs with kids who have cars and parents.' },
    { id: 'gorham', kind: 'FEEDER', name: 'Gorham', minutes: 25, bearing: 265, note: 'A suburb with a state university campus. A small scene.' },
    { id: 'biddeford', kind: 'FEEDER', name: 'Biddeford and Saco', minutes: 30, bearing: 215, note: 'Mill cities on the Saco River with a small college and a real scene of their own.' },
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
    { id: 'peninsula-edge', name: 'the harbor and the islands', route: 'downtown', note: 'Ferry-dock halls and island one-offs. Charming, and the last boat leaves early.' }
  ],

  contacts: ['manchester-nh', 'burlington-vt', 'boston', 'worcester-ma'],

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
  }
});
