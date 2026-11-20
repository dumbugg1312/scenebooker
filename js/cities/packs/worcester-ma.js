SB.Cities.register('worcester-ma', {
  v: 1,
  slug: 'worcester-ma',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['clark university', 'clark', 'holy cross', 'college of the holy cross', 'assumption university', 'worcester polytechnic', 'wpi',
           'worcester state', 'quinsigamond community college', 'umass chan', 'umass medical', 'massachusetts college of pharmacy', 'fitchburg state',
           'telegram & gazette', 'telegram and gazette', 'wchc', 'wcuw', 'wicn', 'wcca', 'wcca-tv', 'dunkin', 'dunkin\'', 'start on the street',
           'wormtown', 'wormtown brewery', 'worcester railers', 'railers', 'worcester red sox', 'polar park', 'dcu center', 'mechanics hall',
           'massmutual', 'worcester lunch car', 'worcester lunch car company', 'amtrak', 'mbta', 'wrta', 'vfw', 'american legion', 'west warwick',
           'the station nightclub', 'worcester cold storage', 'cold storage fire', 'seven hills legion post', 'pioneer valley', 'norton company',
           'washburn', 'abrasive room', 'wire mill social club', 'seven hills legion post 411', 'blackstone cellar', 'lunch car annex',
           'millbury street hall', 'three-decker third floor', 'quinsig garage', 'union hill lithuanian hall', 'pike exit pizza'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The two fires are written only as 'the old fire'. */
  blocklist: ['wormtown*', 'telegram*', 'dunkin*', 'clark university*', 'holy cross*', 'polar park*', 'mechanics hall*', 'railers*'],

  blurb: ['A hilly mill city of three-deckers with a chip on its shoulder about Boston, forty miles east. Shows are heavy, local and scrappy, and the crowd mostly knows each other.',
          'Cellars, halls and mill rooms do the work. Metal and hardcore lead, and the last train east decides who leaves early.'],
  hard: 'Neighbors a few feet away, a fire marshal with a memory, and a train that drains your crowd.',
  region: 'New England',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'Providence', state: 'RI', lat: 41.82, lon: -71.41 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Worcester' },
    { id: 'holden', kind: 'FEEDER', name: 'Holden and Paxton', minutes: 15, bearing: 330, note: 'Bedroom towns just north; a few kids with a garage.' },
    { id: 'shrewsbury', kind: 'FEEDER', name: 'Shrewsbury and Westborough', minutes: 20, bearing: 80, note: 'Tech and retail suburbs to the east; kids are as likely to go to Boston.' },
    { id: 'auburn', kind: 'FEEDER', name: 'Auburn, Millbury and Leicester', minutes: 15, bearing: 220, note: 'Adjacent suburbs and mill villages; no scene of their own.' },
    { id: 'grafton', kind: 'FEEDER', name: 'Grafton, Sutton and Oxford', minutes: 25, bearing: 190, note: 'Rural-edge towns with woods and the odd garage band.' },
    { id: 'milford', kind: 'FEEDER', name: 'Milford and Franklin', minutes: 30, bearing: 135, note: 'Suburban working-class towns to the southeast.' },
    { id: 'leominster', kind: 'FEEDER', name: 'Leominster and Fitchburg', minutes: 35, bearing: 355, note: 'Old plastics and paper mill cities up I-190, with a small arts crowd.' },
    { id: 'webster', kind: 'FEEDER', name: 'Webster, Dudley and Southbridge', minutes: 35, bearing: 205, note: 'Mill and lake towns down I-395; thin or no scene.' },
    { id: 'putnam', kind: 'FEEDER', name: 'Putnam and Killingly', state: 'CT', minutes: 40, bearing: 190, note: 'A corner of mill villages over the Connecticut line.' },
    { id: 'gardner', kind: 'FEEDER', name: 'Gardner and Athol', minutes: 50, bearing: 320, note: 'Cold, isolated furniture and mill towns; kids drive far for a show.' },
    { id: 'northampton', kind: 'FEEDER', name: 'Amherst and Northampton', minutes: 60, bearing: 270, note: 'A college valley with its own scene; trades with the city both ways.' },
    { id: 'providence', kind: 'PEER', name: 'Providence', state: 'RI', minutes: 50, bearing: 185, note: 'The nearest real peer: artier, with a bigger DIY base. Bands trade steadily.' },
    { id: 'springfield', kind: 'PEER', name: 'Springfield', minutes: 55, bearing: 255, slug: 'springfield-ma', note: 'A tougher, more run-down peer city out the Pike.' },
    { id: 'hartford', kind: 'PEER', name: 'Hartford', state: 'CT', minutes: 70, bearing: 235, note: 'A city of similar size down I-84.' },
    { id: 'manchester', kind: 'PEER', name: 'Manchester', state: 'NH', minutes: 75, bearing: 5, slug: 'manchester-nh', note: 'A smaller mill city to the north.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the Main Street core', route: 'downtown', note: 'Bars with stages, upstairs rooms and old commercial blocks, with new apartments pushing rents up.' },
    { id: 'canal', name: 'the Canal District and Green Island', route: 'work-side', note: 'Old mill-era brick, bars, loading docks and garages around the five-way junction. Game-day traffic jams it.' },
    { id: 'main-south', name: 'Main South', route: 'campus', note: 'Three-deckers and parish halls south of downtown, near a private university. Cheap, improving slowly.' },
    { id: 'union-hill', name: 'Union Hill', route: 'old-side', note: 'Steep streets of three-deckers, cheap rents and mostly ignored. House and apartment shows.' },
    { id: 'quinsigamond', name: 'Quinsigamond Village', route: 'work-side', note: 'A mill village on the south side. Basements, garages and rehearsal rooms.' },
    { id: 'grafton-hill', name: 'Grafton Hill and Greendale', route: 'old-side', note: 'Residential hills to the north with yards and basements; a parent\'s driveway is the venue.' },
    { id: 'elm-park', name: 'Elm Park and the college hills', route: 'campus', note: 'Student apartments and a few bars on the west side. House shows and campus all-ages nights.' }
  ],

  contacts: ['springfield-ma', 'manchester-nh', 'new-haven-ct', 'boston'],

  points: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06, pop: 4900000 },
    { name: 'Providence', state: 'RI', lat: 41.82, lon: -71.41, pop: 1600000 },
    { name: 'Hartford', state: 'CT', lat: 41.76, lon: -72.67, pop: 1200000 },
    { name: 'Lowell', state: 'MA', lat: 42.63, lon: -71.32, pop: 115000 },
    { name: 'Albany', state: 'NY', lat: 42.65, lon: -73.76, pop: 900000 }
  ],
  roads: ['I-290', 'I-90', 'I-190', 'I-395', 'Route 146', 'Route 9'],

  words: {
    street: ['Main Street', 'Shrewsbury Street', 'Millbury Street', 'Route 9', 'Route 20', 'Route 146'],
    water: ['the Blackstone Canal', 'the Blackstone River', 'Lake Quinsigamond'],
    hood: ['Green Island', 'Union Hill', 'Main South', 'Quinsigamond Village', 'Grafton Hill', 'Greendale', 'Elm Park', 'Kelley Square'],
    thing: ['three-decker', 'parish hall', 'the Pike', 'packie', 'diner car', 'snow emergency', 'parking ban', 'cellar', 'mill room', 'social-club hall'],
    weather: ['nor\'easter', 'snow emergency']
  }
});
