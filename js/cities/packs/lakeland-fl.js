SB.Cities.register('lakeland-fl', {
  v: 1,
  slug: 'lakeland-fl',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['publix', 'fedex', 'fedex freight', 'amazon', 'geico', 'rooms to go', 'lakeland regional', 'southeastern university', 'florida southern', 'florida southern college',
           'florida polytechnic', 'polk state', 'polk state college', 'keiser university', 'frank lloyd wright', 'sun \'n fun', 'sun n fun', 'sun \'n fun aerospace expo',
           'detroit tigers', 'joker marchant', 'joker marchant stadium', 'publix field', 'flying tigers', 'florida strawberry festival', 'strawberry festival', 'legoland',
           'cypress gardens', 'bok tower', 'bok tower gardens', 'spook hill', 'avelo', 'amtrak', 'citrus connection', 'hurricane charley', 'macdill', 'macdill air force base',
           'saddle creek', 'vfw', 'american legion', 'swan city',
           'the citrus row', 'citrus row', 'swan lot', 'polk parkway annex', 'the bone valley hall', 'bone valley hall', 'lake beulah garage', 'hollingsworth carport',
           'the tin grove', 'orange crate room', 'the kathleen shed', 'dixie porch', 'sinkhole social club', 'the packing house'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['publix*', 'sun n fun*', 'florida southern*', 'southeastern university*', 'legoland*', 'joker marchant*'],

  blurb: ['A lake city between Tampa and Orlando, so it borrows from both and builds its own in garages, carports and grove lots.',
          'Nobody has a basement. A generator, a cooler and a pasture gate someone has to close make a show; heat and storms end it early.'],
  hard: 'Between two bigger coast scenes; no basements, heat, and neighbors who call.',
  region: 'central Florida',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Miami', state: 'FL', lat: 25.76, lon: -80.19 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Lakeland' },
    { id: 'auburndale', kind: 'FEEDER', name: 'Auburndale', minutes: 15, bearing: 85, note: 'An old citrus and railroad town turned suburb; no scene of its own.' },
    { id: 'plant-city', kind: 'FEEDER', name: 'Plant City', minutes: 20, bearing: 285, note: 'A strawberry farm town on I-4 toward Tampa; high-school bands and kids who drive east.' },
    { id: 'winter-haven', kind: 'FEEDER', name: 'Winter Haven', minutes: 25, bearing: 125, note: 'The chain-of-lakes city next door with a small scene and a half-friendly rivalry.' },
    { id: 'bartow', kind: 'FEEDER', name: 'Bartow', minutes: 25, bearing: 160, note: 'The county seat down US 98; courthouses and phosphate money, little scene.' },
    { id: 'mulberry', kind: 'FEEDER', name: 'Mulberry and Fort Meade', minutes: 25, bearing: 205, note: 'Very small phosphate towns; the kids drive in.' },
    { id: 'haines-city', kind: 'FEEDER', name: 'Haines City', minutes: 35, bearing: 100, note: 'A citrus town turned Orlando bedroom suburb.' },
    { id: 'brandon', kind: 'FEEDER', name: 'Brandon', minutes: 40, bearing: 280, note: 'A big Tampa suburb whose kids pick Tampa or Lakeland by the night.' },
    { id: 'lake-wales', kind: 'FEEDER', name: 'Lake Wales', minutes: 40, bearing: 130, note: 'A ridge-top citrus and tourist town.' },
    { id: 'sebring', kind: 'FEEDER', name: 'Sebring', minutes: 60, bearing: 155, note: 'A racetrack town an hour south; its teenagers drive up for shows.' },
    { id: 'wauchula', kind: 'FEEDER', name: 'Wauchula', minutes: 60, bearing: 175, note: 'Cattle and citrus country; a few kids drive in.' },
    { id: 'clearwater', kind: 'PEER', name: 'Clearwater', minutes: 60, bearing: 295, scene: 900, note: 'A beach-and-retiree city; a different, coastal world.' },
    { id: 'sarasota', kind: 'PEER', name: 'Sarasota', slug: 'sarasota-fl', minutes: 80, bearing: 215, scene: 700, note: 'A smaller Gulf-coast city that trades the odd band.' },
    { id: 'palm-bay', kind: 'PEER', name: 'Palm Bay and Melbourne', minutes: 105, bearing: 105, slug: 'palm-bay-fl', note: 'The Space Coast, a long drive east on I-4 and I-95.' },
    { id: 'gainesville', kind: 'PEER', name: 'Gainesville', minutes: 120, bearing: 345, slug: 'gainesville-fl', note: 'A university town with an older punk reputation; Lakeland kids look up to it.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Lake Mirror', route: 'downtown', note: 'Brick storefronts, restaurants and a few bars in a long downtown revival. Cheap storefronts are rarer each year.' },
    { id: 'dixieland', name: 'Dixieland', route: 'old-side', note: 'Bungalows with porches and deep back yards south of downtown, and a shop strip. Renters and artists, getting priced out.' },
    { id: 'lake-hollingsworth', name: 'Lake Hollingsworth', route: 'campus', note: 'A college beside the lake and student rentals around it. Parties come and go with the semester.' },
    { id: 'lake-morton', name: 'Lake Morton and the old lake districts', route: 'old-side', note: 'Big old houses and church campuses; the neighbors are organized and the rent is high. Almost nothing for loud shows.' },
    { id: 'moorehead', name: 'Moorehead and the east side', route: 'old-side', note: 'Historically Black neighborhoods with community and church halls; a community with its own history, not cheap-rent scenery.' },
    { id: 'north-lakeland', name: 'north Lakeland and Lake Parker', route: 'work-side', note: 'Older block ranch houses, auto shops and block-building bars. Backyards, garages and shop units.' },
    { id: 'kathleen', name: 'Kathleen and the south side', route: 'work-side', note: 'Flat scrub and old mine land toward Bartow. Sheds, barns and rural lots with a generator.' },
    { id: 'highlands', name: 'Lakeland Highlands and the Parkway sprawl', route: 'campus', note: 'Newer subdivisions and strip malls. Two-car garages for practice, and almost no rooms.' }
  ],

  contacts: ['gainesville-fl', 'palm-bay-fl', 'cape-coral-fl', 'ocala-fl'],

  points: [
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46, pop: 3200000 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 2700000 },
    { name: 'St. Petersburg', state: 'FL', lat: 27.77, lon: -82.64, pop: 260000 },
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66, pop: 1600000 }
  ],
  roads: ['I-4', 'SR 570', 'US 92', 'US 98', 'US 27', 'Florida Avenue'],

  words: {
    street: ['Memorial Boulevard', 'Florida Avenue', 'Lake Parker Drive', 'Winter Lake Road', 'the Polk Parkway'],
    water: ['Lake Morton', 'Lake Mirror', 'Lake Hollingsworth', 'Lake Parker', 'Lake Hunter'],
    hood: ['Dixieland', 'Moorehead', 'Kathleen', 'Highland City', 'Lakeland Highlands', 'Mass Market'],
    thing: ['carport', 'orange grove', 'sinkhole', 'phosphate pit', 'generator', 'strip mall', 'practice unit', 'church hall', 'pasture gate'],
    weather: ['afternoon thunderstorm', 'humidity', 'storm watch']
  }
});
