SB.Cities.register('boulder-co', {
  v: 1,
  slug: 'boulder-co',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['cu boulder', 'cu', 'university of colorado', 'colorado state university', 'csu', 'university of northern colorado', 'colorado school of mines',
           'school of mines', 'naropa', 'naropa university', 'big 12', 'bolder boulder', 'polar bear plunge', 'naked pumpkin run', 'happy thursday',
           'boulder international film festival', 'conference on world affairs', 'frozen dead guy days', 'frozen dead guy', 'marshall fire',
           'the marshall fire', 'flatiron flyer', 'flex bus', 'rtd', 'denver-boulder turnpike', 'pearl street mall', 'boulder junction', 'f. e. warren',
           'f.e. warren air force base', 'halloween on the hill',
           'goss street basement', 'the marine street annex', 'marine street annex', 'valmont cold storage', 'the table mesa carport', 'table mesa carport',
           'gunbarrel grange hall', 'the four mile pavilion', 'four mile pavilion', 'arapahoe feed & supply', 'arapahoe feed and supply',
           'the 55th street rehearsal barn', '55th street rehearsal barn', 'the sandstone room', 'broadway laundromat back room', 'the mapleton porch',
           'lee hill lodge'],
  /* The dossier's invented venue names are banned too: research, not content, unchecked. The university appears only as 'the university' and the fire as 'the fire'. */
  blocklist: ['cu boulder*', 'university of colorado*', 'naropa*', 'bolder boulder*', 'frozen dead guy*', 'marshall fire*', 'flatiron flyer*', 'goss street basement*'],

  blurb: ['A small, young punk scene tucked inside a folk-and-indie town under the Flatirons. The kids run it themselves, in a coffee-shop yard or a borrowed house.',
          'Half of them have one foot in Denver, and the town never quite calls itself a punk town.'],
  hard: 'Few rooms, landlords who don\'t renew, and Denver pulling everyone away.',
  region: 'the Front Range',
  houseType: 'LIVING_ROOM',
  whereGo: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Portland', state: 'OR', lat: 45.52, lon: -122.68 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Boulder' },
    { id: 'louisville', kind: 'FEEDER', name: 'Louisville and Superior', minutes: 20, bearing: 135, pop: 21226, note: 'Affluent suburbs hit hard by the fire; few shows, many band members.' },
    { id: 'lafayette', kind: 'FEEDER', name: 'Lafayette', minutes: 20, bearing: 115, pop: 30411, note: 'A former coal town, cheaper than Boulder, where many scene people live.' },
    { id: 'broomfield', kind: 'FEEDER', name: 'Broomfield', minutes: 20, bearing: 150, pop: 74112, note: 'A corporate suburb halfway to Denver; bored teenagers ride the bus in.' },
    { id: 'longmont', kind: 'FEEDER', name: 'Longmont', minutes: 25, bearing: 35, pop: 98900, note: 'The cheaper, grittier neighbor and the most important feeder: forgiving garages and its own small scene.' },
    { id: 'lyons', kind: 'FEEDER', name: 'Lyons', minutes: 25, bearing: 330, pop: 2209, note: 'A sandstone folk and bluegrass town; the punk kids come to Boulder.' },
    { id: 'nederland', kind: 'FEEDER', name: 'Nederland', minutes: 30, bearing: 265, pop: 1471, note: 'A hippie mountain town up the canyon with small bar and basement shows.' },
    { id: 'golden', kind: 'FEEDER', name: 'Golden', minutes: 35, bearing: 195, pop: 20399, note: 'A mining-college and brewing town with some crossover.' },
    { id: 'estes-park', kind: 'FEEDER', name: 'Estes Park', minutes: 70, bearing: 315, pop: 5904, note: 'A tourist town at the park gate; its teenagers come down when the road allows.' },
    { id: 'loveland', kind: 'FEEDER', name: 'Loveland', minutes: 45, bearing: 20, pop: 76378, note: 'A conservative exurb with a small, sometimes churchy-venue scene.' },
    { id: 'fort-collins', kind: 'PEER', name: 'Fort Collins', state: 'CO', minutes: 60, bearing: 10, slug: 'fort-collins-co', note: 'The truest peer: a college town with its own breweries and scene.' },
    { id: 'greeley', kind: 'PEER', name: 'Greeley', state: 'CO', minutes: 60, bearing: 55, slug: 'greeley-co', note: 'A farm and meatpacking world with a state college; a rougher, separate scene.' },
    { id: 'colorado-springs', kind: 'PEER', name: 'Colorado Springs', state: 'CO', minutes: 115, bearing: 190, slug: 'colorado-springs-co', note: 'A bigger, conservative military city with a distinct scene that trades through Denver.' }
  ],

  hoods: [
    { id: 'the-hill', name: 'the Hill', route: 'campus', note: 'West of the campus: student houses, fraternities and the old counterculture streets. Police know exactly what a loud house looks like.' },
    { id: 'downtown', name: 'downtown and the pedestrian mall', route: 'downtown', note: 'The tourist and street-performer center. Priced out for anything cheap, but where the flyers get stapled.' },
    { id: 'goss-grove', name: 'Goss-Grove', route: 'old-side', note: 'Old frame houses and small apartment buildings cut into student rentals. House shows, and neighbors who call the city.' },
    { id: 'north-boulder', name: 'North Boulder', route: 'old-side', note: 'Quiet, family-minded and expensive; where the older ex-scene people live.' },
    { id: 'east-boulder', name: 'East Boulder and the Valmont strip', route: 'work-side', note: 'Warehouses, flex buildings and office-park garages: practice spaces and the occasional unlicensed show, under zoning pressure.' },
    { id: 'south-boulder', name: 'South Boulder and Table Mesa', route: 'old-side', note: 'Mid-century ranch houses and duplexes with finished basements. Stable and expensive.' },
    { id: 'gunbarrel', name: 'Gunbarrel', route: 'work-side', note: 'Far northeast office parks and big-box sprawl: practice garages, basements and no scene center.' },
    { id: 'canyon', name: 'the foothills and the canyon', route: 'work-side', note: 'Cabins, mountain houses and bonfires up the canyon road. Loud shows with a long, icy drive.' }
  ],

  contacts: ['fort-collins-co', 'greeley-co', 'colorado-springs-co', 'denver'],

  points: [
    { name: 'Denver', state: 'CO', lat: 39.74, lon: -104.99, pop: 715522 },
    { name: 'Cheyenne', state: 'WY', lat: 41.14, lon: -104.82, pop: 65132 },
    { name: 'Laramie', state: 'WY', lat: 41.31, lon: -105.59, pop: 31000 },
    { name: 'Salt Lake City', state: 'UT', lat: 40.76, lon: -111.89, pop: 1200000 },
    { name: 'Omaha', state: 'NE', lat: 41.26, lon: -95.93, pop: 485000 }
  ],
  roads: ['US 36', 'I-25', 'SH 119', 'SH 7', 'SH 93', 'US 287'],

  words: {
    street: ['Pearl Street', 'Arapahoe Avenue', 'Valmont Road', 'Table Mesa Drive', '28th Street', 'Broadway', 'Canyon Boulevard', 'US 36'],
    water: ['Boulder Creek', 'Boulder Canyon', 'Four Mile Canyon'],
    hood: ['the Hill', 'Goss-Grove', 'North Boulder', 'Martin Acres', 'Table Mesa', 'Gunbarrel', 'Mapleton'],
    thing: ['Flatirons', 'chinook wind', 'cruiser bike', 'finished basement', 'trailhead', 'foothills cabin', 'brewery', 'coffee stand', 'yard show', 'cooler of waters'],
    weather: ['chinook wind', 'afternoon thunderstorm', 'canyon ice']
  }
});
