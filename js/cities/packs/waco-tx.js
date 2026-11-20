SB.Cities.register('waco-tx', {
  v: 1,
  slug: 'waco-tx',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['baylor', 'baylor university', 'baylor bubble', 'baylor lariat', 'magnolia market', 'magnolia silos', 'fixer upper', 'dr pepper', 'whataburger',
           'h-e-b', 'tstc', 'texas state technical college', 'mclennan community college', 'university of mary hardin-baylor', 'umhb', 'tarleton',
           'tarleton state', 'hill college', 'fort hood', 'fort cavazos', 'texas eagle', 'amtrak', 'waco tribune-herald', 'tribune-herald', 'waco citizen',
           'kwbu', 'kcen', 'kwtx', 'waco transit', 'cotton palace', 'brazos river festival', 'ironman', 'diadeloso', 'heart of texas fair',
           'buc-ee\'s', 'bucees', 'health camp', 'gut pak', 'lone star beer', 'shiner', 'topo chico', 'sxsw', 'south by southwest', 'austin city limits',
           'state fair of texas', 'vfw', 'american legion', 'elks', 'knights of columbus', 'moose lodge', 'sokol', 'aggies', 'texas a&m', 'sic \'em',
           'american eagle', 'tabc', 'branch davidian', 'waco regional airport', 'hotel 1928', 'alico',
           'the hogsback room', 'hogsback room', 'brazos bottoms annex', 'lake air lanes', 'the spur barn', 'sokol hall no. 2', 'waterworks warehouse',
           'the suspension door', 'valley mills skate and spin', 'the mammoth room', 'cedar ridge carport', 'elm avenue body shop'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['baylor*', 'magnolia market*', 'whataburger*', 'waco tribune*', 'hogsback*', 'sokol*', 'health camp*', 'buc-ee*'],

  blurb: ['A Brazos River city halfway between Austin and Dallas on the interstate, a churchgoing city where punk is a side door and Austin and Dallas pull the best away.',
          'Shows are open garages with a box fan going, lodge halls and church rooms, and the kids are mostly emo, pop-punk and metal.'],
  hard: 'Few rooms, a churchgoing town, and the big cities pull everyone away.',
  region: 'Central Texas',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.80 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'San Antonio', state: 'TX', lat: 29.42, lon: -98.49 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Waco' },
    { id: 'mcgregor', kind: 'FEEDER', name: 'McGregor', minutes: 25, bearing: 255, note: 'A small town west on US 84.' },
    { id: 'hillsboro', kind: 'FEEDER', name: 'Hillsboro', minutes: 35, bearing: 5, pop: 8221, note: 'A small town up I-35 with a junior college.' },
    { id: 'marlin', kind: 'FEEDER', name: 'Marlin', minutes: 35, bearing: 135, pop: 5462, note: 'A prison and hot-springs town southeast on TX 6.' },
    { id: 'temple', kind: 'FEEDER', name: 'Temple', minutes: 35, bearing: 180, pop: 82073, note: 'A railroad and hospital town down I-35 with distribution centers.' },
    { id: 'belton', kind: 'FEEDER', name: 'Belton', minutes: 40, bearing: 183, pop: 23054, note: 'A small Baptist college town on the interstate.' },
    { id: 'mexia', kind: 'FEEDER', name: 'Mexia', minutes: 45, bearing: 110, pop: 6893, note: 'A small oil-boom town east on US 84.' },
    { id: 'gatesville', kind: 'FEEDER', name: 'Gatesville', minutes: 45, bearing: 262, pop: 16135, note: 'A prison town to the west near the base.' },
    { id: 'meridian', kind: 'FEEDER', name: 'Meridian', minutes: 50, bearing: 320, note: 'A small farm and ranch county seat to the northwest.' },
    { id: 'killeen', kind: 'PEER', name: 'Killeen', minutes: 60, bearing: 215, slug: 'killeen-tx', note: 'A military boom town with a young, churning crowd.' },
    { id: 'college-station', kind: 'PEER', name: 'College Station', minutes: 90, bearing: 150, slug: 'college-station-tx', note: 'A big college town; crowds travel both ways for a show.' },
    { id: 'tyler', kind: 'PEER', name: 'Tyler', minutes: 150, bearing: 65, slug: 'tyler-tx', note: 'An East Texas peer across the pines.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown', route: 'downtown', note: 'The west bank of the river by the old bridge, rebuilt for visitors and priced up. A few storefronts and lofts are the contested space.' },
    { id: 'campus', name: 'the university and the riverfront', route: 'campus', note: 'Student rentals and student bars by the interstate. Crowds come only when a friend drags them.' },
    { id: 'east-waco', name: 'East Waco', route: 'old-side', note: 'The historically Black east side across the river: older frame houses, church halls and small storefronts. Cheap, being noticed, and not a place to treat as a punk district.' },
    { id: 'north-waco', name: 'North Waco', route: 'old-side', note: 'Older bungalows and cheap rentals north of downtown. Garages, backyards and practice rooms in outbuildings.' },
    { id: 'south-waco', name: 'South Waco', route: 'work-side', note: 'A largely Hispanic south side of older houses, taquerias and small warehouses. Garages and church halls.' },
    { id: 'west-waco', name: 'West Waco and Woodway', route: 'campus', note: 'Suburban sprawl along US 84 and the loop. The place the suburban kids come from, with living rooms and strip-center units.' },
    { id: 'bellmead', name: 'Bellmead and Lake Air', route: 'work-side', note: 'A separate town to the north with cheap highway strip units and warehouse space, and police-jurisdiction headaches.' },
    { id: 'lake-shore', name: 'China Spring and the lake shore', route: 'work-side', note: 'Rural acreage west and northwest. Field parties and generator shows nobody hears.' }
  ],

  contacts: ['killeen-tx', 'college-station-tx', 'tyler-tx'],

  points: [
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74, pop: 980000 },
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.80, pop: 1300000 },
    { name: 'Fort Worth', state: 'TX', lat: 32.75, lon: -97.33, pop: 960000 },
    { name: 'Denton', state: 'TX', lat: 33.21, lon: -97.13, pop: 150000 },
    { name: 'Round Rock', state: 'TX', lat: 30.51, lon: -97.68, pop: 125000 }
  ],
  roads: ['I-35', 'US 84', 'TX 6', 'Loop 340', 'I-14'],

  words: {
    street: ['Waco Drive', 'Woodway Drive', 'Elm Avenue', 'Valley Mills Drive', 'Austin Avenue', 'Franklin Avenue'],
    water: ['the Brazos', 'the Bosque', 'Lake Waco'],
    hood: ['North Waco', 'South Waco', 'East Waco', 'Sanger Heights', 'Castle Heights', 'Lake Air', 'Bellmead', 'Woodway', 'Hewitt', 'China Spring', 'Speegleville'],
    thing: ['carport', 'box fan', 'kolache', 'breakfast taco', 'pecan tree', 'live oak', 'fellowship hall', 'lodge hall', 'strip-mall unit', 'youth group', 'garage door', 'dry room'],
    weather: ['hail', 'tornado watch', 'ice storm']
  }
});
