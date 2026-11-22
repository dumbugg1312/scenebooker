SB.Cities.register('manchester-nh', {
  v: 1,
  slug: 'manchester-nh',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['amoskeag', 'amoskeag manufacturing company', 'southern new hampshire university', 'snhu', 'saint anselm', 'st. anselm', 'st anselm',
           'new england college', 'keene state', 'plymouth state', 'university of new hampshire', 'unh', 'umass lowell', 'laconia motorcycle week',
           'motorcycle week', 'bike week', 'pumpkin festival', 'giant pumpkin regatta', 'new hampshire union leader', 'union leader', 'hippo', 'nhpr',
           'market basket', 'dunkin', 'dunkin\'', 'patriots', 'red sox', 'fisher cats', 'new hampshire fisher cats',
           'manchester-boston regional airport', 'lowell folk festival', 'rounder records', 'vfw', 'american legion', 'elks', 'knights of columbus',
           'massholes', 'the back of the millyard', 'piscat hall', 'hollow street social club', 'the third floor on canal', 'granite square annex',
           'st. anselm\'s basement co-op', 'the rimmon room', 'queen city legion post 12', 'amoskeag loading dock', 'the falls garage',
           'north end cellar', 'the notre dame parish hall',
           'manchester ink link', 'ink link', 'wmur', 'hippo press', 'nh magazine', 'new hampshire magazine', 'glendi', 'manchester pride', 'wzid', 'latino vibe festival', 'visit manchester nh'],
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

  rooms: [
    { id: 'west-side-basement', kind: 'HOUSE', hood: 'west-side', cap: 40, curfew: 1320, pressure: 55, start: true, note: 'A stone basement under a triple-decker. The stairs are steep, the ceiling is low, and one neighbor can end it.' },
    { id: 'north-end-house', kind: 'HOUSE', hood: 'north-end', cap: 60, curfew: 1320, note: 'A big old house with a garage and a long lawn. Roomier, with fewer close neighbors, but a parent or a landlord can still shut it.' },
    { id: 'goffstown-garage', kind: 'HOUSE', hood: 'goffstown-hood', cap: 50, curfew: 1350, note: 'A suburban garage west of the river. Nobody inspects it, and everybody needs a car and a ride home.' },
    { id: 'south-end-hall', kind: 'HALL', hood: 'south-end', cap: 150, curfew: 1320, rent: 150, owner: 'HALL_MANAGER', note: 'A parish hall in the dense south end. It runs its own bar and its own rules, and it wants the lights up by ten.' },
    { id: 'mill-room', kind: 'DIY', hood: 'downtown', cap: 80, curfew: 1350, pressure: 60, needs: ['VOUCH'], note: 'A practice room in a long brick mill. Cheap and cool, and shut fast by fire code or a sale.' },
    { id: 'elm-bar', kind: 'BAR', hood: 'downtown', cap: 120, ages: ['A18'], curfew: 1410, matinee: false, soundFee: 50, note: 'A bar on Elm Street with a stage and an eighteen-plus punk bill. The bar crowd and the show crowd tangle at the door.' },
    { id: 'mill-hall', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['ALL'], curfew: 1380, following: 0.5, note: 'A two-room hall that closed in the pandemic and came back. The one room the heavy scene calls its own, and it knows how fragile that is.' },
    { id: 'elm-club', kind: 'CLUB', hood: 'downtown', cap: 300, ages: ['A18'], curfew: 1380, note: 'A music hall on Elm Street that books cover bands and tributes. A punk bill here is a rental.' },
    { id: 'arena', kind: 'BIG', hood: 'downtown', cap: 2000, ages: ['ALL'], curfew: 1380, note: 'The downtown arena, all ages. Far out of reach for now, but you can look at it from the bridge.' },
    { id: 'south-yard', kind: 'OUTDOOR', hood: 'goffs-falls', cap: 60, curfew: 1290, outdoor: true, note: 'A big yard and a shed at the south edge. Warm months only, and you need a car to find it.' }
  ],

  contacts: ['worcester-ma', 'portland-me', 'boston', 'providence'],

  calendar: [
    { id: 'late-may-parade', label: 'the late-May downtown parade', tag: 'parade', month: 5, week: 4, dows: [0], can: [.85, .85, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'june-parade', label: 'the June downtown parade and festival', tag: 'parade', month: 6, week: 4, dows: [5], can: [.90, .88, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'july-fireworks', label: 'the Fourth of July fireworks nights', tag: 'festival', month: 7, week: 1, dows: [4, 5, 6], can: [.92, .90, .92], hoods: ['downtown', 'east-side'], elsewhere: [1, .97, .97] },
    { id: 'greek-festival', label: 'the church food festival weekend', tag: 'festival', month: 9, week: 3, dows: [4, 5, 6], can: [.92, .90, .90], hoods: ['south-end', 'downtown'], elsewhere: [1, .98, .98] },
    { id: 'car-cruise', label: 'the downtown car cruise', tag: 'festival', month: 9, week: 1, dows: [5], can: [.95, .92, .92], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'december-parade', label: 'the December downtown parade', tag: 'parade', month: 12, week: 1, dows: [5], can: [.88, .88, .90], hoods: ['downtown'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [1, 5], dows: [4], can: [.88, 1, .97] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { curfewMinors: { weeknight: 1260, weekend: 1260, inForce: false } },

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
  },

  events: [
    { id: 'MANCHESTER_NH_PARADE_BRIDGE', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], calendar: 'parade' },
      telegraph: 'A parade is on the calendar for Saturday, and the city has posted the road closures.',
      title: 'The bridge is closed',
      body: 'The downtown parade shuts Elm Street and the bridge at four. The bands from the west side are on the wrong side of the river at load-in.',
      options: [
        { id: 'EARLY', label: 'Load in at noon, before the roads close', likely: 'Tiring, but everyone is in before the barriers go up.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: -60 }],
          result: 'You loaded in at noon and sat in the hall for four hours. Nobody was stuck.' },
        { id: 'DETOUR', label: 'Send the vans the long way around', likely: 'The bands arrive, late and sour.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.95 }],
          result: 'The vans came the long way. Doors an hour late, and the kids waited.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'MANCHESTER_NH_CHURCH_LOT', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The church food festival takes over the south side this weekend.',
      title: 'The street is full of cars',
      body: 'The food festival takes every parking space on the south side, and your hall show is a few blocks away. The load-in has to go through the back lot.',
      options: [
        { id: 'BACK', label: 'Load in through the back lot and tell everyone', likely: 'A slow, awkward load-in.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 45 }, { op: 'SHOW_MOD', key: 'headsMul', v: 0.92 }],
          result: 'The back lot worked. The first band went on forty-five minutes late.' },
        { id: 'ACCEPT', label: 'Run it and hope people find a space', likely: 'The parking is bad and people notice.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: 'A lot of people circled the block twice and gave up.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. The ones who could come, came.' }
      ] },

    { id: 'MANCHESTER_NH_NINE_PM', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 3] },
      telegraph: 'The city has a curfew for kids under eighteen, and the hour is nine.',
      title: 'The nine o clock rule',
      body: 'The curfew for kids under eighteen starts at nine, and the early all-ages show will not reach the headliner before then.',
      options: [
        { id: 'SHORT', label: 'Cut the sets short and finish by nine', likely: 'Everybody gets a set. The headliner plays half of theirs.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Short sets all night. The kids got home before the curfew, and the headliner was not happy.' },
        { id: 'PARENTS', label: 'Tell the parents to pick everyone up at nine', likely: 'Half the room leaves at once.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.8 }],
          result: 'Parents lined the curb at nine. The room was half empty for the last band.' },
        { id: 'ACCEPT', label: 'Run the whole bill and hope for the best', likely: 'Some kids will risk it.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: 0.9 }],
          result: 'The kids ran for the cars after the last song, and nobody got stopped.' }
      ] }
  ]
});
