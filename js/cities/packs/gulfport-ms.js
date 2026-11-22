SB.Cities.register('gulfport-ms', {
  v: 1,
  slug: 'gulfport-ms',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['naval construction battalion center', 'seabee', 'seabees', 'keesler', 'keesler air force base', 'university of southern mississippi', 'southern miss',
           'usm', 'gulf park campus', 'gulfport-biloxi international', 'sun herald', 'world\'s largest fishing rodeo', 'fishing rodeo', 'cruisin\' the coast',
           'cruisin the coast', 'smokin\' the sound', 'smokin the sound', 'black spring break', 'new orleans saints', 'barq\'s', 'barqs', 'waffle house',
           'sonic drive-in', 'taco bell', 'amtrak', 'katrina', 'hurricane katrina', 'vfw', 'american legion', 'elks',
           'the slab', 'tidewater hall', 'seabee row annex', 'dock nineteen', 'the pump house', 'fellowship hall no. 3', 'bayou carport', 'seawall social club',
           'the drydock', 'harbor lot pavilion', 'pine hill shed',
           'mississippi gulf coast community college', 'gulf coast community college', 'mississippi coast coliseum', 'coast coliseum',
           'mississippi deep sea fishing rodeo', 'deep sea fishing rodeo', 'view the cruise', 'boo bash', 'gulfport arts festival', 'sky lantern festival',
           'memorial day blowout', 'gulfport dragway', 'gulfport little theatre', 'lynn meadows discovery center', 'wlox', 'coast observer',
           'mississippi today', 'mississippi folklife', 'hattiesburg american', 'jackson free press', 'mississippi abc'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The storm is written only as 'the storm' in game text. */
  blocklist: ['sun herald*', 'keesler*', 'cruisin the coast*', 'seabee*', 'waffle house*', 'barq*'],

  blurb: ['A working port and naval construction city on the Mississippi Gulf Coast: a long flat strip of beach towns and casino bars an hour from New Orleans.',
          'Everyone dates things before the storm or after it. Rooms are borrowed and temporary, the faces are the same at every bill, and the scene keeps restarting on generators and carports.'],
  hard: 'Rooms vanish to storms, sales and nervous owners; all-ages is scarce.',
  region: 'the Gulf',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'Nashville', state: 'TN', lat: 36.16, lon: -86.78 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Gulfport' },
    { id: 'pass-christian', kind: 'FEEDER', name: 'Pass Christian', minutes: 20, bearing: 255, note: 'A wealthy-leaning beach town to the west; kids come in by car.' },
    { id: 'ocean-springs', kind: 'FEEDER', name: 'Ocean Springs', minutes: 25, bearing: 85, note: 'An artsy, bohemian town with its own music culture; the likeliest DIY crossover.' },
    { id: 'bay-st-louis', kind: 'FEEDER', name: 'Bay St. Louis and Waveland', minutes: 35, bearing: 257, note: 'Arts-minded and storm-battered, with a small art-bar scene of its own.' },
    { id: 'diamondhead', kind: 'FEEDER', name: 'Diamondhead', minutes: 35, bearing: 270, note: 'A gated retiree and golf suburb; its teenagers drive east.' },
    { id: 'wiggins', kind: 'FEEDER', name: 'Wiggins and Perkinston', minutes: 40, bearing: 355, note: 'Pine-woods county seat and a community college town up US 49.' },
    { id: 'gautier', kind: 'FEEDER', name: 'Gautier', minutes: 40, bearing: 85, note: 'A suburb of the Pascagoula shipyard.' },
    { id: 'slidell', kind: 'FEEDER', name: 'Slidell', state: 'LA', minutes: 45, bearing: 262, note: 'A New Orleans suburb; Louisiana kids sometimes come across.' },
    { id: 'poplarville', kind: 'FEEDER', name: 'Poplarville', minutes: 45, bearing: 320, note: 'A farm town with a community college campus.' },
    { id: 'pascagoula', kind: 'FEEDER', name: 'Pascagoula and Moss Point', minutes: 50, bearing: 90, note: 'Shipbuilding and refinery towns east on I-10. Moss Point is the rougher one.' },
    { id: 'picayune', kind: 'FEEDER', name: 'Picayune', minutes: 50, bearing: 287, note: 'A mill and farm town near the Louisiana line.' },
    { id: 'lucedale', kind: 'FEEDER', name: 'Lucedale', minutes: 75, bearing: 37, note: 'A small farm county seat to the northeast.' },
    { id: 'mobile', kind: 'PEER', name: 'Mobile', state: 'AL', minutes: 65, bearing: 70, slug: 'mobile-al', note: 'An hour east on I-10: the bigger town and the trading partner on tours.' },
    { id: 'hattiesburg', kind: 'PEER', name: 'Hattiesburg', minutes: 75, bearing: 350, scene: 350, note: 'The nearest college town, up US 49, where the students are.' },
    { id: 'pensacola', kind: 'PEER', name: 'Pensacola', state: 'FL', minutes: 125, bearing: 88, slug: 'pensacola', note: 'The same coastal-military profile. Crowds travel both ways for big shows.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Gulfport', route: 'downtown', note: 'A small grid by the port where the highway ends: a few bars and restaurants, vacant lots, storefronts and a small hall.' },
    { id: 'biloxi', name: 'Biloxi and D\'Iberville', route: 'downtown', note: 'The casino cluster and old tourist strip just east. The same crowd goes to shows in both towns.' },
    { id: 'handsboro', name: 'Handsboro and Bayou View', route: 'work-side', note: 'Cheap old streets along the bayou, some rebuilt on stilts. Backyards and carports, and the flood risk.' },
    { id: 'north-gulfport', name: 'North Gulfport and Turkey Creek', route: 'old-side', note: 'A long-standing Black community with church halls and community centers. Not a place to treat as a cheap punk district.' },
    { id: 'soria-city', name: 'Soria City and central Gulfport', route: 'work-side', note: 'A cheap grid of ranch houses, auto shops and strip malls. Garages and practice rooms.' },
    { id: 'north-side', name: 'Orange Grove, Lyman and the north side', route: 'campus', note: 'Newer subdivisions and big-box retail north of the interstate. Suburban teenagers and strip-center units.' },
    { id: 'mississippi-city', name: 'Mississippi City and East Beach', route: 'old-side', note: 'Older beach-side streets toward Biloxi. Pricier, with retirees.' },
    { id: 'long-beach', name: 'Long Beach', route: 'campus', note: 'The beach suburb to the west with a branch campus. In effect Gulfport\'s west side.' }
  ],

  contacts: ['mobile-al', 'pensacola', 'slidell-la', 'daphne-al', 'new-orleans-la'],

  calendar: [
    { id: 'car-week', label: 'the classic-car week', tag: 'festival', month: 10, week: 1, dows: [4, 5, 6], can: [.88, .85, .85], hoods: ['downtown', 'mississippi-city'], elsewhere: [.97, .95, .95] },
    { id: 'fishing-weekend', label: 'the big fishing weekend', tag: 'festival', month: 7, week: 1, dows: [4, 5, 6], can: [.92, .90, .88], hoods: ['downtown'], elsewhere: [1, .97, .97] },
    { id: 'mardi-gras', label: 'Mardi Gras parade weekend', tag: 'parade', month: 2, weeks: [2, 4], dows: [4, 5, 6], can: [.85, .80, .80], hoods: ['downtown'], elsewhere: [.97, .95, .95] },
    { id: 'arts-festival', label: 'the arts festival', tag: 'festival', month: 9, week: 3, dows: [5], can: [.90, .88, .88], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'dragway-weekend', label: 'Memorial Day race weekend', tag: 'race', month: 5, week: 4, dows: [4, 5, 6], can: [.92, .90, .90], hoods: ['north-side'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.85, .95, .95] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [2, 4], dows: [4], can: [.85, .95, .95] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  points: [
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07, pop: 1000000 },
    { name: 'Hattiesburg', state: 'MS', lat: 31.33, lon: -89.29, pop: 170000 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37, pop: 7500000 },
    { name: 'Panama City', state: 'FL', lat: 30.16, lon: -85.66, pop: 200000 }
  ],
  roads: ['I-10', 'US 90', 'US 49', 'I-110', 'Highway 53', 'Highway 67'],

  words: {
    street: ['Highway 90', 'Highway 49', 'Highway 53', 'Highway 67'],
    water: ['the Mississippi Sound', 'the Sound', 'Turkey Creek', 'Back Bay'],
    hood: ['Handsboro', 'Bayou View', 'Turkey Creek', 'Soria City', 'Orange Grove', 'Lyman', 'Mississippi City', 'East Beach', 'West Beach', 'Long Beach', 'Broadmoor', 'Pine Hills'],
    thing: ['snoball stand', 'shrimp boat', 'bait shop', 'carport', 'generator', 'daiquiri stand', 'boudin', 'stilt house', 'carport fan', 'casino gig'],
    weather: ['afternoon thunderstorm', 'storm watch']
  }
});
