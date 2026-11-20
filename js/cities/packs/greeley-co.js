SB.Cities.register('greeley-co', {
  v: 1,
  slug: 'greeley-co',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of northern colorado', 'unc', 'aims community college', 'colorado state university', 'colorado state', 'csu', 'greeley tribune',
           'greeley independence stampede', 'independence stampede', 'stampede', 'island grove', 'union colony', 'warped tour', 'poudre express', 'express arrow',
           'the crucible', 'jbs', 'colorado air national guard', 'air national guard', 'greeley west', 'vfw', 'american legion', 'knights of columbus',
           'downtown greeley entertainment district', 'rocky mountain oysters', 'the feedlot annex', 'meeker street hall', 'union colony basement', 'the beet dump',
           'chinook room', 'latham station', 'the lincoln park carport', 'overland lanes', 'poudre bottom', 'the spud hall', 'dry town social club',
           'tenth street tire and lube'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['greeley tribune*', 'stampede*', 'independence stampede*', 'warped tour*', 'jbs*', 'poudre express*', 'island grove*'],

  blurb: ['A High Plains farm and meatpacking city on the flat land north of Denver, started as a temperance colony and still church-minded, with a university in the middle and the smell of the feedlots on the wind.',
          'Kids here wait out the shift whistle, the school calendar and the highway snow to get a show going. A big working-class Hispanic east side has the garages, but the better-known college towns up the interstate take the best bands.'],
  hard: 'Off the interstate, shadowed by bigger college towns, and the crowd resets with school.',
  region: 'the Front Range',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Fort Collins', state: 'CO', lat: 40.59, lon: -105.08 },
    { name: 'Boulder', state: 'CO', lat: 40.01, lon: -105.27 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Greeley' },
    { id: 'kersey', kind: 'FEEDER', name: 'Kersey', minutes: 15, bearing: 95, note: 'A farm village to the east on the highway; no scene of its own.' },
    { id: 'evans', kind: 'FEEDER', name: 'Evans and Garden City', minutes: 10, bearing: 190, pop: 22000, note: 'A fast-growing young and heavily Hispanic bedroom city to the south, with a tiny enclave beside it.' },
    { id: 'windsor', kind: 'FEEDER', name: 'Windsor', minutes: 20, bearing: 295, pop: 32000, note: 'A fast-growing suburb toward the interstate; kids here are the garage-band kind.' },
    { id: 'eaton', kind: 'FEEDER', name: 'Eaton', minutes: 20, bearing: 5, note: 'A farm and dairy town up the highway with a high school.' },
    { id: 'johnstown', kind: 'FEEDER', name: 'Johnstown and Milliken', minutes: 25, bearing: 240, note: 'Growing exurbs by the interstate; kids ride the highway for shows.' },
    { id: 'platteville', kind: 'FEEDER', name: 'Platteville, Gilcrest and LaSalle', minutes: 25, bearing: 175, note: 'Oilfield and farm towns, working-class and mostly Hispanic.' },
    { id: 'ault', kind: 'FEEDER', name: 'Ault and Pierce', minutes: 30, bearing: 355, note: 'Farm villages to the north.' },
    { id: 'fort-lupton', kind: 'FEEDER', name: 'Fort Lupton', minutes: 35, bearing: 185, note: 'A farm and oil town with an old Hispanic community and plenty of kids with cars.' },
    { id: 'loveland', kind: 'FEEDER', name: 'Loveland', minutes: 35, bearing: 255, note: 'An arts-and-tourism town of its own to the west.' },
    { id: 'fort-morgan', kind: 'FEEDER', name: 'Fort Morgan', minutes: 50, bearing: 100, note: 'A farm and dairy town out on the eastern interstate; kids come in for the big shows.' },
    { id: 'fort-collins', kind: 'PEER', name: 'Fort Collins', minutes: 40, bearing: 320, slug: 'fort-collins-co', note: 'The better-known college town that Greeley kids look up to and resent.' },
    { id: 'boulder', kind: 'PEER', name: 'Boulder', minutes: 65, bearing: 230, slug: 'boulder-co', note: 'Pricier and more cosmopolitan; where bands leave for.' },
    { id: 'cheyenne', kind: 'PEER', name: 'Cheyenne', state: 'WY', minutes: 75, bearing: 5, scene: 250, note: 'A fellow plains-and-rail town up the interstate that trades small tours.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'Old brick blocks and an entertainment district around Tenth Street. Bar back rooms that go all-ages early; landlord and city attention are highest here.' },
    { id: 'university', name: 'the university area', route: 'campus', note: 'Older houses cut into rentals around a two-part campus. House shows, student rooms, empty in May and December.' },
    { id: 'east-side', name: 'east and southeast Greeley', route: 'work-side', note: 'Working-class, heavily Hispanic and industrial, by the rail line and the plant. Backyards, garages and practice units. Cheap and ignored.' },
    { id: 'northwest', name: 'northwest Greeley and the US 34 strip', route: 'campus', note: 'New subdivisions and big-box strips. Teen garage bands and a church youth room or two.' },
    { id: 'fairgrounds', name: 'the fairgrounds', route: 'old-side', note: 'Arenas and exhibition halls rented to anyone with a deposit. Never a punk neighborhood, but it rules the town in late June.' },
    { id: 'evans-us85', name: 'Evans and Garden City', route: 'work-side', note: 'Commercial strips along US 85 and 23rd Avenue. Warehouse units, backyards and a bar that ignores the noise rules.' },
    { id: 'river', name: 'the Poudre river bottoms', route: 'old-side', note: 'Trail and bridge spots for bonfire and generator nights. Gone the moment someone calls it in.' }
  ],

  contacts: ['fort-collins-co', 'boulder-co', 'denver', 'colorado-springs-co'],

  points: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 715000 },
    { name: 'Cheyenne', state: 'WY', lat: 41.14, lon: -104.82, pop: 65000 },
    { name: 'Longmont', state: 'CO', lat: 40.17, lon: -105.10, pop: 98000 },
    { name: 'Pueblo', state: 'CO', lat: 38.25, lon: -104.61, pop: 112000 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 485000 }
  ],
  roads: ['I-25', 'I-76', 'US 34', 'US 85', 'CO 257', 'Highway 392'],

  words: {
    street: ['Tenth Street', 'Eighth Street', '23rd Avenue', '35th Avenue', 'US 34', 'US 85'],
    water: ['the Poudre', 'the South Platte', 'the Cache la Poudre'],
    hood: ['Evans', 'Garden City', 'Windsor', 'Kersey', 'Eaton', 'Milliken', 'Johnstown', 'Platteville', 'Gilcrest'],
    thing: ['feedlot', 'beet truck', 'breakfast burrito', 'green chili', 'dairy', 'grain elevator', 'garage', 'hay field', 'shift whistle', 'rodeo parking'],
    weather: ['chinook', 'plains wind', 'hail', 'blizzard']
  }
});
