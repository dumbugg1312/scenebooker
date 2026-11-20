SB.Cities.register('shreveport-la', {
  v: 1,
  slug: 'shreveport-la',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['barksdale', 'barksdale air force base', 'barksdale afb', 'fort polk', 'fort johnson', 'louisiana tech', 'grambling', 'centenary college',
           'centenary', 'lsu shreveport', 'lsus', 'southern university at shreveport', 'bossier parish community college', 'lsu', 'red river revel',
           'state fair of louisiana', 'holiday in dixie', 'highland jazz & blues festival', 'highland jazz and blues festival', 'mudbug madness',
           'independence bowl', 'texas-ou', 'air show', 'shreveport times', 'the shreveport times', 'christmas lights festival',
           'natchitoches meat pie', 'rose city', 'the cypress knee', 'post 1187 hall', 'pecan row carport', 'red clay social club', 'the sandbag',
           'fourth street feed store', 'bayou pierre basement', 'hollywood heights shed', 'texas avenue tire and rim', 'the levee room',
           'pine island rec hall', 'allendale lanes', 'vfw', 'american legion'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['barksdale*', 'red river revel*', 'state fair of louisiana*', 'holiday in dixie*', 'independence bowl*', 'louisiana tech*', 'centenary*', 'mudbug madness*'],

  blurb: ['Carports, church halls and borrowed yards hold a scene too small to split by genre. Everyone plays with everyone, in the heat.',
          'It is a river city of casinos and old brick blocks, far from anywhere, and the best musicians leave for bigger cities.'],
  hard: 'Few rooms, brutal summers, and the one stable venue wants cover bands.',
  region: 'the Ark-La-Tex',
  houseType: 'CARPORT',
  whereGo: [
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8 },
    { name: 'New Orleans', state: 'LA', lat: 29.95, lon: -90.07 },
    { name: 'Houston', state: 'TX', lat: 29.76, lon: -95.37 },
    { name: 'Austin', state: 'TX', lat: 30.27, lon: -97.74 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Shreveport' },
    { id: 'bossier', kind: 'FEEDER', name: 'Bossier City', minutes: 15, bearing: 85, note: 'Casino strip and base housing across the river, in a different parish with its own sheriff. Mostly part of Shreveport\'s scene.' },
    { id: 'minden', kind: 'FEEDER', name: 'Minden', minutes: 35, bearing: 80, note: 'A small mill and farm seat east on the interstate; some bands, no real scene.' },
    { id: 'marshall', kind: 'FEEDER', name: 'Marshall', state: 'TX', minutes: 40, bearing: 265, note: 'A small east Texas college and railroad town; kids cross the state line for shows.' },
    { id: 'mansfield', kind: 'FEEDER', name: 'Mansfield', minutes: 45, bearing: 195, note: 'Timber and farm country south on the old highway; a few bands.' },
    { id: 'many', kind: 'FEEDER', name: 'Many and Zwolle', minutes: 60, bearing: 190, note: 'Tiny piney-woods towns; a few kids come in.' },
    { id: 'ruston', kind: 'FEEDER', name: 'Ruston', minutes: 70, bearing: 95, note: 'A big public university town with a real college music scene, with a neighboring historically Black university down the road.' },
    { id: 'natchitoches', kind: 'FEEDER', name: 'Natchitoches', minutes: 70, bearing: 175, note: 'The oldest town in the state: a university, tourists and a small college scene.' },
    { id: 'longview', kind: 'PEER', name: 'Longview', state: 'TX', minutes: 60, bearing: 262, slug: 'longview-tx', note: 'A mid-sized east Texas oil and retail town with some scene.' },
    { id: 'texarkana', kind: 'PEER', name: 'Texarkana', minutes: 80, bearing: 340, scene: 250, note: 'Two states in one city, with its own punk circle that trades with Shreveport.' },
    { id: 'monroe', kind: 'PEER', name: 'Monroe', minutes: 90, bearing: 90, scene: 400, note: 'A smaller, rougher neighbor an hour and a half east; the two scenes trade bands constantly.' },
    { id: 'tyler', kind: 'PEER', name: 'Tyler', state: 'TX', minutes: 120, bearing: 255, slug: 'tyler-tx', note: 'A larger, wealthier east Texas city with a small punk circle that swaps bands.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown Shreveport', route: 'downtown', note: 'Old brick blocks on the west bank by the river bridges, with a few lofts. Bars and a museum district, and the casinos across the water.' },
    { id: 'ledbetter', name: 'Ledbetter Heights and Allendale', route: 'old-side', note: 'Low-lying historically Black neighborhoods south and west of downtown: shotgun houses, vacant lots and boarded buildings. Do not treat it as a free blank space.' },
    { id: 'highland', name: 'Highland', route: 'old-side', note: 'A historic district of old bungalows and big houses just southwest of downtown, with a small commercial strip and watchful neighbors.' },
    { id: 'broadmoor', name: 'Broadmoor and Youree Drive', route: 'campus', note: 'Mid-century ranch houses, strip malls, church fellowship halls and bowling lanes. Suburban middle-class Shreveport.' },
    { id: 'queensborough', name: 'Queensborough and Hollywood Heights', route: 'work-side', note: 'Older working-class north-central streets of small houses and corner stores. Cheap, and the closest the city has to a punk district.' },
    { id: 'south-shreveport', name: 'South Shreveport and Southern Hills', route: 'campus', note: 'Newer money, malls and big churches along Line Avenue. Where the kids with cars come from. Almost no DIY, many rules.' },
    { id: 'bossier-side', name: 'Bossier City and Airline Drive', route: 'work-side', note: 'Casino row and base rentals across the river. A different parish, so different rules and a different sheriff.' },
    { id: 'cross-lake', name: 'Cross Lake and Caddo Heights', route: 'old-side', note: 'Lake houses and big yards northwest of town. A plausible warm-month yard show, if the neighbors are far enough.' }
  ],

  contacts: ['longview-tx', 'tyler-tx', 'lafayette-la', 'baton-rouge-la'],

  points: [
    { name: 'Dallas', state: 'TX', lat: 32.78, lon: -96.8, pop: 1300000 },
    { name: 'Monroe', state: 'LA', lat: 32.51, lon: -92.12, pop: 47000 },
    { name: 'Texarkana', state: 'AR', lat: 33.43, lon: -94.05, pop: 30000 },
    { name: 'Alexandria', state: 'LA', lat: 31.31, lon: -92.45, pop: 45000 }
  ],
  roads: ['I-20', 'I-49', 'I-220', 'US 71', 'US 171', 'US 80'],

  words: {
    street: ['Texas Street', 'Youree Drive', 'Line Avenue', 'Airline Drive', 'Hollywood Avenue', 'Fern Avenue', 'Mansfield Road'],
    water: ['the Red River', 'Cross Lake', 'Cypress Bayou', 'Bayou Pierre'],
    hood: ['Highland', 'Broadmoor', 'Ledbetter Heights', 'Allendale', 'Queensborough', 'Hollywood Heights', 'Southern Hills', 'Caddo Heights'],
    thing: ['carport', 'casino buffet', 'box fan', 'kudzu', 'sno-ball stand', 'pecan tree', 'tire shop', 'church fellowship hall', 'shotgun house', 'generator', 'extension cord', 'minivan', 'boudin run'],
    weather: ['heat advisory', 'hail', 'tornado watch', 'afternoon thunderstorm']
  }
});
