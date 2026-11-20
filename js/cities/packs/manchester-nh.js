SB.Cities.register('manchester-nh', {
  v: 1,
  slug: 'manchester-nh',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['amoskeag', 'amoskeag manufacturing company', 'southern new hampshire university', 'snhu', 'saint anselm', 'st. anselm', 'st anselm',
           'new england college', 'keene state', 'plymouth state', 'university of new hampshire', 'unh', 'umass lowell', 'laconia motorcycle week',
           'motorcycle week', 'bike week', 'pumpkin festival', 'giant pumpkin regatta', 'new hampshire union leader', 'union leader', 'hippo', 'nhpr',
           'market basket', 'dunkin', 'dunkin\'', 'patriots', 'red sox', 'fisher cats', 'new hampshire fisher cats',
           'manchester-boston regional airport', 'lowell folk festival', 'rounder records', 'vfw', 'american legion', 'elks', 'knights of columbus',
           'massholes', 'the back of the millyard', 'piscat hall', 'hollow street social club', 'the third floor on canal', 'granite square annex',
           'st. anselm\'s basement co-op', 'the rimmon room', 'queen city legion post 12', 'amoskeag loading dock', 'the falls garage',
           'north end cellar', 'the notre dame parish hall'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['amoskeag*', 'union leader*', 'market basket*', 'dunkin*', 'fisher cats*', 'bike week*', 'snhu*', 'nhpr*'],

  blurb: ['A New Hampshire mill city on the Merrimack, loud, working-class and a little scrappy. Kids drive in from the small towns around it.',
          'Triple-decker basements, club halls and mill practice rooms carry the shows. Rents climb, rooms get shut, and the scene finds the next one.'],
  hard: 'Mill rooms and basements get shut fast, bars mean 21+, and Boston pulls bands south.',
  region: 'New England',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06 },
    { name: 'Providence', state: 'RI', lat: 41.82, lon: -71.41 },
    { name: 'New York', state: 'NY', lat: 40.71, lon: -74.01 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Manchester' },
    { id: 'hooksett', kind: 'FEEDER', name: 'Hooksett', minutes: 10, bearing: 10, note: 'A suburb up I-93 with a big campus. No real scene.' },
    { id: 'goffstown', kind: 'FEEDER', name: 'Goffstown', minutes: 15, bearing: 275, scene: 50, note: 'A suburb and college town to the west with yards and basements. Lots of kids drive over.' },
    { id: 'bedford', kind: 'FEEDER', name: 'Bedford', minutes: 15, bearing: 225, note: 'A wealthy suburb whose kids come in because nothing is happening at home.' },
    { id: 'londonderry', kind: 'FEEDER', name: 'Londonderry', minutes: 20, bearing: 150, note: 'A suburb beside the airport with a skate-and-mall kid pool.' },
    { id: 'merrimack', kind: 'FEEDER', name: 'Merrimack', minutes: 20, bearing: 200, note: 'A suburb on the Nashua side where kids float between the two cities.' },
    { id: 'concord', kind: 'FEEDER', name: 'Concord', minutes: 25, bearing: 355, note: 'The smaller state capital up the interstate. It trades bands and kids.' },
    { id: 'derry', kind: 'FEEDER', name: 'Derry', minutes: 25, bearing: 135, scene: 50, note: 'An old mill and shoe town with a small scene of its own.' },
    { id: 'weare', kind: 'FEEDER', name: 'Weare and New Boston', minutes: 30, bearing: 260, note: 'Farm and woods country where kids arrive by the carload.' },
    { id: 'raymond', kind: 'FEEDER', name: 'Raymond, Candia and Epping', minutes: 30, bearing: 90, note: 'Exurbs and rural roads out NH 101.' },
    { id: 'nashua', kind: 'FEEDER', name: 'Nashua', minutes: 30, bearing: 195, note: 'The nearest same-size city, a friendly rival. The two share bands and crowds almost entirely.' },
    { id: 'lowell', kind: 'PEER', name: 'Lowell', state: 'MA', minutes: 45, bearing: 160, note: 'A sister mill city over the Massachusetts line, closest in spirit.' },
    { id: 'portsmouth', kind: 'PEER', name: 'Portsmouth', state: 'NH', minutes: 55, bearing: 85, note: 'The Seacoast: a tourist town that usually gets the New Hampshire date on a tour.' },
    { id: 'worcester', kind: 'PEER', name: 'Worcester', state: 'MA', minutes: 80, bearing: 190, slug: 'worcester-ma', note: 'A bigger city that trades bands both ways.' },
    { id: 'portland', kind: 'PEER', name: 'Portland', state: 'ME', minutes: 105, bearing: 70, slug: 'portland-me', note: 'The other end of the coast run, where tours often go instead.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Elm Street and the Millyard', route: 'downtown', note: 'Bars, restaurants and an arena by the long brick mills. Mill apartments push rents up, and the weekend bar crowd is not the punk crowd.' },
    { id: 'west-side', name: 'the West Side', route: 'old-side', note: 'Triple-deckers and two-families across the river, corner stores and parish halls. Basements and back rooms, cheap but being noticed.' },
    { id: 'north-end', name: 'the North End', route: 'campus', note: 'Big old single-family houses near the hospital and the college district. Yards and garage practice rooms.' },
    { id: 'south-end', name: 'the South End', route: 'work-side', note: 'Dense, working-class and immigrant, with multi-family basements, storefronts and church halls. Cheap, with real displacement risk if downtown spreads.' },
    { id: 'east-side', name: 'the east-side villages', route: 'old-side', note: 'Quiet older pockets with backyards, garages and a fraternal hall or two.' },
    { id: 'willow-street', name: 'South Willow Street and the mall strip', route: 'campus', note: 'Retail strip and parking lots at the south end. Nothing legal for shows, but where the kids hang out.' },
    { id: 'goffs-falls', name: 'Youngsville and Goffs Falls', route: 'work-side', note: 'Suburban and industrial mix at the southern edge. Garages, sheds and big yards, car required.' },
    { id: 'goffstown-hood', name: 'Goffstown', route: 'town:goffstown', note: 'Suburban garages and yards west of the river.' }
  ],

  contacts: ['worcester-ma', 'portland-me', 'boston'],

  points: [
    { name: 'Boston', state: 'MA', lat: 42.36, lon: -71.06, pop: 4900000 },
    { name: 'Keene', state: 'NH', lat: 42.93, lon: -72.28, pop: 23000 },
    { name: 'Laconia', state: 'NH', lat: 43.53, lon: -71.47, pop: 17000 },
    { name: 'Burlington', state: 'VT', lat: 44.48, lon: -73.21, pop: 45000 }
  ],
  roads: ['I-93', 'I-293', 'US 3', 'NH 101', 'NH 28', 'the Everett Turnpike'],

  words: {
    street: ['Elm Street', 'South Willow Street', 'Canal Street', 'Granite Street', 'Hanover Street'],
    water: ['the Merrimack', 'the Piscataquog'],
    hood: ['the West Side', 'Piscataquog', 'Rimmon Heights', 'McGregorville', 'the North End', 'the South End', 'Hallsville', 'Bakersville', 'Janeville', 'Youngsville', 'Goffs Falls'],
    thing: ['triple-decker', 'parish hall', 'American chop suey', 'chicken tender', 'poutine', 'oil furnace', 'mill brick', 'snow day', 'club hall', 'mill room', 'practice space', 'thaw'],
    weather: ['nor\'easter', 'mud season', 'two feet of snow']
  }
});
