SB.Cities.register('reading-pa', {
  v: 1,
  slug: 'reading-pa',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['reading railroad', 'conrail', 'reading eagle', 'albright', 'alvernia', 'penn state berks', 'reading area community college',
           'kutztown university', 'kutztown folk festival', 'folk festival', 'world war ii weekend', 'duryea hill climb', 'hill climb',
           'pretzel city', 'plcb', 'liquor control board', 'amtrak thruway', 'fort indiantown gap', 'indiantown gap', 'wawa', 'sheetz', 'eagles',
           'phillies', '76ers', 'reading fightin phils', 'fightin phils', 'royals', 'santander arena', 'sovereign center', 'goggleworks',
           'penn state', 'hawk mountain', 'neversink grange', 'southwark social hall', 'pretzel works loft', 'schuylkill boat shed',
           'fifth street annex', 'hampden heights turner hall', 'turner hall', 'loading dock on washington', 'mount penn rec room',
           'penn\'s commons basement', 'tulpehocken hall', 'old brewery cold room', 'oley pike grange annex'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['reading eagle*', 'reading railroad*', 'goggleworks*', 'santander*', 'kutztown folk*', 'wawa*', 'sheetz*'],

  blurb: ['A brick mill city off every tour line, where a hall, a damp basement and a few stubborn kids keep a small, loud, loyal scene going.',
          'Vacant mill space is everywhere, but touring bands only come if a local asked, and Philadelphia is an hour and a quarter east.'],
  hard: 'Off the tour route, so you have to beg a fill date.',
  region: 'the Mid-Atlantic',
  houseType: 'ROWHOUSE',
  whereGo: [
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Pittsburgh', state: 'PA', lat: 40.44, lon: -80.00 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Reading' },
    { id: 'inner-ring', kind: 'FEEDER', name: 'Shillington, Mohnton and Sinking Spring', minutes: 15, bearing: 220, note: 'Suburban boroughs with their own fire halls and school districts; the base crowd.' },
    { id: 'kutztown', kind: 'FEEDER', name: 'Kutztown', minutes: 25, bearing: 50, note: 'A college town in farm country with the most of its own scene of any small town here.', bands: 2 },
    { id: 'hamburg', kind: 'FEEDER', name: 'Hamburg', minutes: 25, bearing: 10, note: 'A small borough at the foot of Blue Mountain; fire-hall shows.' },
    { id: 'fleetwood', kind: 'FEEDER', name: 'Fleetwood and Topton', minutes: 25, bearing: 55, note: 'Farm and factory boroughs whose teens drive to Reading and Allentown.' },
    { id: 'west-berks', kind: 'FEEDER', name: 'Womelsdorf, Robesonia and Wernersville', minutes: 25, bearing: 265, note: 'Tiny west county boroughs; church-hall culture.' },
    { id: 'birdsboro', kind: 'FEEDER', name: 'Birdsboro and Elverson', minutes: 25, bearing: 130, note: 'An old iron mill borough and a farm village.' },
    { id: 'boyertown', kind: 'FEEDER', name: 'Boyertown', minutes: 35, bearing: 100, note: 'A manufacturing borough on the county line; school and church circuit.' },
    { id: 'pottstown', kind: 'FEEDER', name: 'Pottstown', minutes: 40, bearing: 115, note: 'A working-class river mill town with some shows of its own, on the road to Philadelphia.', bands: 2 },
    { id: 'ephrata', kind: 'FEEDER', name: 'Ephrata and Lititz', minutes: 40, bearing: 230, note: 'Farm-and-tourist towns that split their loyalty with Lancaster.' },
    { id: 'lebanon', kind: 'FEEDER', name: 'Lebanon', minutes: 45, bearing: 280, note: 'A small city with a small scene that looks to both Harrisburg and Reading.' },
    { id: 'pottsville', kind: 'FEEDER', name: 'Pottsville', minutes: 50, bearing: 350, note: 'Shrinking coal-region town with a loud hardcore and metal reputation.', lean: ['hardcore', 'metal'], bands: 2 },
    { id: 'allentown', kind: 'PEER', name: 'Allentown', minutes: 60, bearing: 55, slug: 'allentown-pa', note: 'The closest same-size pair; bands run both on one weekend.' },
    { id: 'lancaster', kind: 'PEER', name: 'Lancaster', minutes: 50, bearing: 225, slug: 'lancaster-pa', note: 'Arty and pricier; a show in one pulls kids from the other.' },
    { id: 'harrisburg', kind: 'PEER', name: 'Harrisburg', minutes: 65, bearing: 285, slug: 'harrisburg-pa', note: 'The state capital and the usual next stop west.' },
    { id: 'york', kind: 'PEER', name: 'York', minutes: 75, bearing: 245, slug: 'york-pa', note: 'Smaller, with a similar post-industrial feel.' }
  ],

  hoods: [
    { id: 'center-city', name: 'Center City and Penn Street', route: 'downtown', note: 'The old downtown grid: bank towers, empty department stores and repeated revival plans. Occasional storefront and upstairs shows.' },
    { id: 'outlet-district', name: 'the Outlet District', route: 'work-side', note: 'Big brick mills and loading docks, mostly watched and owned. Warehouse potential and cheap practice rooms.' },
    { id: 'southwest', name: 'Southwest Reading', route: 'work-side', note: 'Dense Latino rowhouse blocks by the river with corner stores, social clubs and churches. Basements if you have friends there.' },
    { id: 'northeast', name: 'Northeast Reading and Hampden Heights', route: 'old-side', note: 'Rowhouses and duplexes climbing away from the river. Basements and backyards, cheap and ignored.' },
    { id: 'mount-penn', name: 'Mount Penn', route: 'old-side', note: 'A residential hillside under the pagoda. House and yard shows, with the hill giving some noise cover.' },
    { id: 'west-reading', name: 'West Reading', route: 'downtown', note: 'The walkable borough across the bridge: bars and restaurants, nothing all-ages, priced out and polished.' },
    { id: 'inner-suburbs', name: 'the inner suburbs', route: 'campus', note: 'Shillington, Mohnton and Exeter: fire halls, church basements and finished suburban basements. Where the suburban kids come from.' }
  ],

  contacts: ['allentown-pa', 'lancaster-pa', 'harrisburg-pa', 'philadelphia'],

  points: [
    { name: 'Pottstown', state: 'PA', lat: 40.25, lon: -75.65, pop: 23000 },
    { name: 'Phoenixville', state: 'PA', lat: 40.13, lon: -75.52, pop: 19000 },
    { name: 'Wilmington', state: 'DE', lat: 39.74, lon: -75.55, pop: 70000 },
    { name: 'Trenton', state: 'NJ', lat: 40.22, lon: -74.76, pop: 90000 }
  ],
  roads: ['US 422', 'US 222', 'PA 61', 'I-78', 'I-176', 'Penn Street'],

  words: {
    street: ['Penn Street', 'Perkiomen Avenue', 'Fifth Street', 'Washington Street', 'Tulpehocken Street'],
    water: ['the Schuylkill', 'the Tulpehocken', 'Antietam Lake'],
    hood: ['Southwest Reading', 'Hampden Heights', 'Mount Penn', 'Outlet District', 'West Reading', 'Wyomissing', 'Shillington'],
    thing: ['soft pretzel', 'rowhouse stoop', 'fire company hall', 'hoagie', 'scrapple', 'bodega', 'birch beer', 'mill building', 'practice space', 'bull roast'],
    weather: ['nor\'easter', 'river flood']
  }
});
