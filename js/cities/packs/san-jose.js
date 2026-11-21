SB.Cities.register('san-jose', {
  v: 1,
  slug: 'san-jose',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['san jose state university', 'sjsu', 'santa clara university', 'stanford university', 'stanford', 'de anza college', 'san jose city college', 'evergreen valley college',
           'mercury news', 'san jose mercury news', 'metro silicon valley', 'san jose spotlight', 'kqed', 'kntv', 'san jose sharks', 'san jose earthquakes', 'sap center',
           'levi\'s stadium', 'san francisco 49ers', 'san jose giants', 'san jose jazz fest', 'cinequest', 'apple', 'google', 'adobe', 'cisco', 'ebay', 'intel', 'nvidia',
           'paypal', 'tesla', 'netflix', 'lockheed martin', 'santa clara valley transportation authority', 'vta', 'caltrain', 'norman y. mineta san jose international airport',
           'winchester mystery house', 'tech interactive', 'rosicrucian egyptian museum', 'great america', 'kaiser permanente'],
  blocklist: ['mercury news*', 'metro silicon valley*', 'sap center*', 'cinequest*', 'winchester mystery*', 'great america park*'],

  blurb: ['A rich tech city with no home for the kids who make noise.',
          'Hardcore moves between studios, basements and parking lots, one step ahead of the landlord.'],
  hard: 'Sky-high rent and police mean rooms last months, not years.',
  region: 'the Bay',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42 },
    { name: 'Oakland', state: 'CA', lat: 37.80, lon: -122.27 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24 }
  ],

  tilt: [
    { fan: 'hardcore', band: 'hardcore', d: .08, reason: 'Hardcore is the scene\'s strongest draw, and it fills lots.' }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'San Jose' },
    { id: 'santa-clara', kind: 'FEEDER', name: 'Santa Clara', minutes: 15, bearing: 305, note: 'A suburb to the northwest.' },
    { id: 'campbell', kind: 'FEEDER', name: 'Campbell', minutes: 15, bearing: 235, note: 'A suburb to the southwest.' },
    { id: 'milpitas', kind: 'FEEDER', name: 'Milpitas', minutes: 20, bearing: 25, note: 'Suburban kids.' },
    { id: 'sunnyvale', kind: 'FEEDER', name: 'Sunnyvale', minutes: 20, bearing: 305, note: 'Another suburb up the peninsula.' },
    { id: 'los-gatos', kind: 'FEEDER', name: 'Los Gatos', minutes: 20, bearing: 225, note: 'A hill suburb.' },
    { id: 'morgan-hill', kind: 'FEEDER', name: 'Morgan Hill', minutes: 25, bearing: 155, note: 'A small town to the south.' },
    { id: 'fremont', kind: 'FEEDER', name: 'Fremont', minutes: 30, bearing: 340, note: 'Across the bay.' },
    { id: 'gilroy', kind: 'FEEDER', name: 'Gilroy', minutes: 35, bearing: 155, note: 'A small farm town.' },
    { id: 'santa-cruz', kind: 'PEER', name: 'Santa Cruz', minutes: 45, bearing: 215, slug: 'santa-cruz-ca', note: 'A famed punk scene over the mountain on Highway 17.' },
    { id: 'salinas', kind: 'PEER', name: 'Salinas', minutes: 70, bearing: 165, slug: 'salinas-ca', note: 'A farm city to the south.' },
    { id: 'stockton', kind: 'PEER', name: 'Stockton', minutes: 90, bearing: 70, slug: 'stockton-ca', note: 'A Valley scene across the hills.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'A small bar and club core that empties after dark. A few all-ages rooms in restaurants and old clubs.' },
    { id: 'japantown', name: 'Japantown', route: 'old-side', note: 'Older houses and basement creative spaces with small crowds.' },
    { id: 'willow-glen', name: 'Willow Glen', route: 'old-side', note: 'Leafy, wealthier, quiet streets.' },
    { id: 'rose-garden', name: 'Rose Garden', route: 'old-side', note: 'Old bungalows near the park.' },
    { id: 'eastside', name: 'the Eastside and Alum Rock', route: 'work-side', note: 'Working-class Mexican-American and Vietnamese neighborhoods. Backyard and garage shows.' },
    { id: 'south-san-jose', name: 'South San Jose and Blossom Valley', route: 'work-side', note: 'Industrial strips and practice studios on side streets.' },
    { id: 'university-area', name: 'the downtown university area', route: 'campus', note: 'Apartments, basements and practice spaces.' },
    { id: 'north-san-jose', name: 'Berryessa and North San Jose', route: 'campus', note: 'Tech offices and new apartments. No shows.' },
    { id: 'almaden', name: 'Santa Teresa and Almaden', route: 'campus', note: 'Suburban, safe and quiet.' }
  ],

  contacts: ['santa-cruz-ca', 'oakland', 'stockton-ca'],

  points: [
    { name: 'San Francisco', state: 'CA', lat: 37.77, lon: -122.42, pop: 810000 },
    { name: 'Oakland', state: 'CA', lat: 37.80, lon: -122.27, pop: 430000 },
    { name: 'Berkeley', state: 'CA', lat: 37.87, lon: -122.27, pop: 120000 },
    { name: 'Los Angeles', state: 'CA', lat: 34.05, lon: -118.24, pop: 3900000 }
  ],
  roads: ['I-280', 'I-880', 'Highway 101', 'Highway 87', 'Highway 85', 'Highway 17'],

  words: {
    street: ['The Alameda', 'Santa Clara Street', 'First Street', 'Story Road', 'Monterey Road', 'Alum Rock Avenue', 'Stevens Creek Boulevard'],
    water: ['the Guadalupe River', 'the bay'],
    hood: ['Japantown', 'Willow Glen', 'Alum Rock', 'Blossom Valley', 'Berryessa', 'Almaden', 'Rose Garden'],
    thing: ['practice room', 'parking lot', 'light rail', 'taqueria', 'generator', 'industrial park'],
    weather: ['rainy season']
  }
});
