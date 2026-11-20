SB.Cities.register('charlottesville-va', {
  v: 1,
  slug: 'charlottesville-va',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['university of virginia', 'uva', 'the cavaliers', 'wahoos', 'hoos', 'hokies', 'virginia tech', 'james madison university', 'jmu', 'cavalier daily', 'the daily progress', 'daily progress',
           'c-ville weekly', 'charlottesville tomorrow', 'wtju', 'wnrn', 'foxfield', 'foxfield races', 'virginia film festival', 'virginia festival of the book', 'first night virginia',
           'mary baldwin', 'longwood university', 'piedmont virginia community college', 'liberty university', 'csx', 'norfolk southern', 'amtrak', 'vfw', 'american legion',
           'waffle house', 'wawa', 'sheetz', 'virginia abc', 'unite the right', 'vinegar hill',
           'the carlton boiler room', 'meadowbrook lanes', 'the piedmont feed annex', 'rivanna grange hall', 'hydraulic road glass and mirror', 'the seminole trail rink',
           'locust alley laundromat', 'the ridge street cannery', 'shamrock road fellowship hall', 'the mulberry ave annex', 'free bridge tire and wheel', 'the preston plaza warehouse'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. The 2017 events are never written in game text. */
  blocklist: ['uva*', 'foxfield*', 'cavalier daily*', 'c-ville*', 'wtju*', 'wnrn*', 'waffle house*', 'sheetz*'],

  blurb: ['Shows live in student houses and Sunday matinees, and the address travels by word of mouth.',
          'The best house closed in 2020, and the town\'s money makes the next one hard to keep.'],
  hard: 'Houses turn over with every August lease, and the clubs want an older crowd.',
  region: 'the Piedmont',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04 },
    { name: 'Baltimore', state: 'MD', lat: 39.29, lon: -76.61 },
    { name: 'Raleigh', state: 'NC', lat: 35.78, lon: -78.64 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Charlottesville' },
    { id: 'crozet', kind: 'FEEDER', name: 'Crozet', minutes: 20, bearing: 270, note: 'A commuter village at the foot of the mountains with breweries and orchards.' },
    { id: 'scottsville', kind: 'FEEDER', name: 'Scottsville', minutes: 25, bearing: 195, note: 'A tiny river town south on VA 20; kids from the south county.' },
    { id: 'waynesboro', kind: 'FEEDER', name: 'Waynesboro', minutes: 30, bearing: 280, note: 'An old mill town over the mountain with a small teenage DIY scene.', bands: 2 },
    { id: 'palmyra', kind: 'FEEDER', name: 'Palmyra and the lake suburb', minutes: 30, bearing: 100, note: 'A retiree and commuter suburb southeast; kids drive in.' },
    { id: 'stanardsville', kind: 'FEEDER', name: 'Stanardsville and Greene County', minutes: 30, bearing: 5, note: 'Rural country north on US 29.' },
    { id: 'orange', kind: 'FEEDER', name: 'Orange', minutes: 35, bearing: 40, note: 'A small county seat in horse country.' },
    { id: 'louisa', kind: 'FEEDER', name: 'Louisa', minutes: 35, bearing: 85, note: 'Farm and bedroom country to the east.' },
    { id: 'staunton', kind: 'FEEDER', name: 'Staunton', minutes: 40, bearing: 285, note: 'A valley small city with an arts downtown and some DIY.', bands: 2 },
    { id: 'lovingston', kind: 'FEEDER', name: 'Lovingston and Nelson County', minutes: 40, bearing: 215, note: 'Orchards, breweries and mountain roads; kids come in for shows.' },
    { id: 'culpeper', kind: 'FEEDER', name: 'Culpeper', minutes: 45, bearing: 55, note: 'A farm and commuter town edging toward the capital\'s exurbs.', bands: 1 },
    { id: 'harrisonburg', kind: 'PEER', name: 'Harrisonburg', minutes: 65, bearing: 315, slug: 'harrisonburg-va', note: 'A cheaper valley college town with more basements; Charlottesville is the fancy one.' },
    { id: 'lynchburg', kind: 'PEER', name: 'Lynchburg', minutes: 70, bearing: 215, slug: 'lynchburg-va', note: 'The church-heavy conservative neighbor down US 29.' },
    { id: 'roanoke', kind: 'PEER', name: 'Roanoke', minutes: 105, bearing: 235, slug: 'roanoke-va', note: 'A gritty rail city, the rougher cousin.' },
    { id: 'blacksburg', kind: 'PEER', name: 'Blacksburg and Christiansburg', minutes: 135, bearing: 245, scene: 1100, note: 'A big technical-college town with a real DIY culture.' }
  ],

  hoods: [
    { id: 'the-corner', name: 'the Corner and the Rugby Road streets', route: 'campus', note: 'Student bars and rental houses behind them; houses turn over every August and policing is tight.' },
    { id: 'downtown-mall', name: 'the Downtown Mall', route: 'downtown', note: 'An eight-block brick pedestrian street of clubs, theaters and cafes; any room here is a business.' },
    { id: 'belmont', name: 'Belmont', route: 'old-side', note: 'Small frame houses up the hill from the rail line, now restaurants and new neighbors; heating up fast.' },
    { id: 'fifeville', name: 'Fifeville and Tenth and Page', route: 'work-side', note: 'Historically Black working-class blocks near the hospital, being squeezed from both sides; shows need care here.' },
    { id: 'starr-hill', name: 'Starr Hill and West Main', route: 'downtown', note: 'The strip between downtown and the campus: old houses, a brewery, a depot and an arts district; priced out.' },
    { id: 'preston', name: 'Preston Avenue and Rose Hill', route: 'work-side', note: 'Warehouses, auto shops and old lots: the likeliest place for rehearsal rooms and cheap-ish space.' },
    { id: 'woolen-mills', name: 'Woolen Mills and the Rivanna', route: 'old-side', note: 'A quiet riverside neighborhood by a shuttered mill: backyard shows and flood risk.' },
    { id: 'pantops-29', name: 'Pantops and the US 29 corridor', route: 'campus', note: 'Strip malls, apartments and industrial parks in the county where working renters live; practice rooms and parking lots.' }
  ],

  contacts: ['harrisonburg-va', 'lynchburg-va', 'roanoke-va', 'richmond'],

  points: [
    { name: 'Richmond', state: 'VA', lat: 37.54, lon: -77.44, pop: 230000 },
    { name: 'Washington', state: 'DC', lat: 38.91, lon: -77.04, pop: 700000 },
    { name: 'Fredericksburg', state: 'VA', lat: 38.3, lon: -77.46, pop: 28000 },
    { name: 'Winchester', state: 'VA', lat: 39.19, lon: -78.16, pop: 28000 },
    { name: 'Asheville', state: 'NC', lat: 35.6, lon: -82.55, pop: 95000 }
  ],
  roads: ['I-64', 'US 29', 'US 250', 'VA 20', 'I-81'],

  words: {
    street: ['Rugby Road', 'University Avenue', 'Main Street', 'Preston Avenue', 'Ridge Street', 'Hydraulic Road', 'Rio Road', 'Emmet Street', 'Seminole Trail'],
    water: ['the Rivanna', 'the Rivanna River', 'the James'],
    hood: ['the Corner', 'Belmont', 'Fifeville', 'Starr Hill', 'Rose Hill', 'Woolen Mills', 'Pantops', 'Zion Crossroads', 'Ix'],
    thing: ['apple cider', 'orchard', 'brewery', 'cideries', 'brick', 'country ham', 'biscuit', 'walkout basement', 'matinee', 'student radio', 'lease', 'zine'],
    weather: ['pollen', 'Afton fog', 'ice storm']
  }
});
