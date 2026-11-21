SB.Cities.register('baltimore', {
  v: 1,
  slug: 'baltimore',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['johns hopkins', 'jhu', 'towson university', 'university of maryland', 'umd', 'umbc', 'morgan state', 'loyola', 'coppin state', 'maryland institute college of art',
           'mica', 'university of baltimore', 'baltimore sun', 'baltimore banner', 'baltimore magazine', 'baltimore beat', 'city paper', 'wbal', 'wjz', 'wmar', 'wypr', 'wtmd',
           'baltimore orioles', 'orioles', 'baltimore ravens', 'ravens', 'camden yards', 'm&t bank stadium', 'inner harbor', 'national aquarium', 'fort mchenry', 'port of baltimore',
           'key bridge', 'francis scott key bridge', 'bethlehem steel', 'sparrows point', 'johns hopkins hospital', 'preakness', 'artscape', 'hurricane isabel', 'hurricane sandy',
           'ghost ship', 'natty boh', 'old bay', 'edgar allan poe', 'lexington market', 'the wire'],
  blocklist: ['johns hopkins*', 'baltimore sun*', 'baltimore banner*', 'camden yards*', 'artscape*', 'natty boh*', 'old bay*', 'preakness*'],

  blurb: ['A rowhouse port city where cheap warehouses launched a loud, close scene. Hardcore and noise bands form fast and play everywhere.',
          'Everyone is in three bands. Shows happen in basements, galleries and old industrial blocks, with a mix of ages and a rail yard out back.'],
  hard: 'Fire code and gentrifying rents keep closing the best warehouses.',
  region: 'the Mid-Atlantic',
  houseType: 'ROWHOUSE',
  whereGo: [
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .10, reason: 'A long hardcore history and a recent boom: a new band every week, and the kids show up for all of them.' }
  ],

  chokepoints: [
    { id: 'harbor-tunnels', name: 'the harbor tunnels', p: .025 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Baltimore' },
    { id: 'towson', kind: 'FEEDER', name: 'Towson', minutes: 20, bearing: 5, note: 'A student suburb with house shows.' },
    { id: 'catonsville', kind: 'FEEDER', name: 'Catonsville', minutes: 20, bearing: 250, note: 'A west-side suburb. The kids ride in.' },
    { id: 'dundalk', kind: 'FEEDER', name: 'Dundalk', minutes: 20, bearing: 115, beyond: 'harbor-tunnels', note: 'An old steel and shipyard blue-collar town.' },
    { id: 'glen-burnie', kind: 'FEEDER', name: 'Glen Burnie', minutes: 20, bearing: 185, beyond: 'harbor-tunnels', note: 'A south suburb with metal and punk kids.' },
    { id: 'columbia', kind: 'FEEDER', name: 'Columbia', minutes: 30, bearing: 225, note: 'A planned suburb with many teenage bands.' },
    { id: 'annapolis', kind: 'FEEDER', name: 'Annapolis', minutes: 40, bearing: 165, beyond: 'harbor-tunnels', note: 'A small town down the Bay corridor.' },
    { id: 'bel-air', kind: 'FEEDER', name: 'Bel Air', minutes: 40, bearing: 35, note: 'The north exurb.' },
    { id: 'westminster', kind: 'FEEDER', name: 'Westminster', minutes: 50, bearing: 305, note: 'Rural west. Occasional.' },
    { id: 'washington', kind: 'PEER', name: 'Washington', state: 'DC', minutes: 60, bearing: 215, slug: 'washington-dc', note: 'Larger, with an older punk lineage. The two scenes share bands and bills.' },
    { id: 'wilmington', kind: 'PEER', name: 'Wilmington', state: 'DE', minutes: 85, bearing: 50, note: 'Smaller, on the same road.' },
    { id: 'philadelphia', kind: 'PEER', name: 'Philadelphia', state: 'PA', minutes: 105, bearing: 45, slug: 'philadelphia', note: 'Larger, and the other end of the touring corridor.' }
  ],

  hoods: [
    { id: 'station-north', name: 'Station North', route: 'downtown', note: 'An arts district near the train station: galleries, bars and many DIY rooms.' },
    { id: 'charles-village', name: 'Charles Village', route: 'campus', note: 'Rowhouses beside the big private university. Students and artists.' },
    { id: 'hampden', name: 'Hampden', route: 'old-side', note: 'Old mill rowhouses, now bars and shops. Mixed tolerance for noise.' },
    { id: 'remington', name: 'Remington', route: 'work-side', note: 'Old industrial blocks and rowhouses. Cheap space and warehouse shows.' },
    { id: 'highlandtown', name: 'Highlandtown', route: 'old-side', note: 'Rowhouses with long-time residents and artists side by side.' },
    { id: 'pigtown', name: 'Pigtown', route: 'work-side', note: 'Rowhouses beside the rail yards.' },
    { id: 'fells-point', name: 'Fells Point', route: 'downtown', note: 'Waterfront bars in old brick. Loud.' },
    { id: 'curtis-bay', name: 'Curtis Bay', route: 'work-side', note: 'The industrial south end by the harbor. Cheap.' },
    { id: 'waverly', name: 'Waverly', route: 'old-side', note: 'Rowhouses and a lot of band houses.' }
  ],

  contacts: ['washington-dc', 'philadelphia', 'new-york'],

  points: [
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04, pop: 6300000 },
    { name: 'Wilmington', state: 'DE', lat: 39.74, lon: -75.55, pop: 72000 },
    { name: 'Philadelphia', state: 'PA', lat: 39.95, lon: -75.17, pop: 6200000 },
    { name: 'York', state: 'PA', lat: 39.96, lon: -76.73, pop: 44000 }
  ],
  roads: ['I-95', 'I-83', 'I-695', 'I-70', 'I-97'],

  words: {
    street: ['North Avenue', 'Charles Street', 'Greenmount Avenue', 'Eastern Avenue', 'Pratt Street', 'Howard Street'],
    water: ['the Patapsco', 'Jones Falls', 'the Chesapeake'],
    hood: ['Station North', 'Charles Village', 'Hampden', 'Remington', 'Highlandtown', 'Pigtown', 'Fells Point', 'Curtis Bay', 'Waverly'],
    thing: ['rowhouse', 'formstone', 'stoop', 'warehouse', 'freight elevator', 'crab feast'],
    weather: ['humidity', 'snow day', 'afternoon thunderstorm']
  }
});
