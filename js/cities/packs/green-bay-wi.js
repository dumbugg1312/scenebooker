SB.Cities.register('green-bay-wi', {
  v: 1,
  slug: 'green-bay-wi',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['green bay packers', 'packers', 'lambeau field', 'lambeau', 'titletown', 'packerland', 'uw-green bay', 'uwgb', 'university of wisconsin-green bay',
           'st. norbert college', 'northeastern wisconsin technical college', 'nwtc', 'kwik trip', 'spotted cow', 'cellcom', 'brown county fair', 'eaa',
           'airventure', 'chicago bears', 'minnesota vikings', 'vikings', 'knights of columbus', 'vfw', 'american legion', 'cheesehead',
           'brown county back room', 'the booyah hall', 'fox street annex', 'packerland pole barn', 'slough road garage', 'mason bridge loft', 'third ward lanes',
           'curd & kettle', 'the belgian pie basement', 'kwik stop back lot', 'lakeshore legion hall', 'the draw bridge room'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['packers*', 'lambeau*', 'kwik trip*', 'uwgb*', 'st. norbert*', 'spotted cow*', 'titletown*'],

  blurb: ['A Wisconsin paper, packaging and shipping city at the head of the bay where the river meets the lake, where football and taverns set the whole calendar.',
          'Most rooms are bars with a stage in back, so the all-ages scene lives in basements, parish halls and pole sheds, and works around the home-game calendar. Kids drive in from the farm towns, and bands are usually on a detour.'],
  hard: 'Football Sundays, 21+ bars and long winter drives off the tour axis.',
  region: 'the Great Lakes',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91 },
    { name: 'Madison', state: 'WI', lat: 43.07, lon: -89.40 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 },
    { name: 'Minneapolis', state: 'MN', lat: 44.98, lon: -93.27 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Green Bay' },
    { id: 'de-pere', kind: 'FEEDER', name: 'De Pere', minutes: 10, bearing: 195, pop: 25000, note: 'A walkable river city to the south with a small college and student houses.' },
    { id: 'pulaski', kind: 'FEEDER', name: 'Pulaski', minutes: 25, bearing: 315, note: 'A Polish-heritage farm town to the northwest.' },
    { id: 'seymour', kind: 'FEEDER', name: 'Seymour, Denmark and Brillion', minutes: 25, bearing: 245, note: 'Dairy and farm towns whose teens have cars and garage bands.' },
    { id: 'oconto', kind: 'FEEDER', name: 'Oconto', minutes: 30, bearing: 15, note: 'A small bay-shore town up the highway; no known scene.' },
    { id: 'appleton', kind: 'FEEDER', name: 'Appleton and the Fox Cities', minutes: 35, bearing: 215, scene: 400, note: 'A bigger college and arts-leaning neighbor with a scene of its own; Green Bay is the blue-collar rival.' },
    { id: 'manitowoc', kind: 'FEEDER', name: 'Manitowoc and Two Rivers', minutes: 40, bearing: 150, note: 'Lakeshore shipbuilding and factory towns to the southeast.' },
    { id: 'shawano', kind: 'FEEDER', name: 'Shawano', minutes: 40, bearing: 285, note: 'A farm and lake town to the west; its teens drive east for shows.' },
    { id: 'oshkosh', kind: 'FEEDER', name: 'Oshkosh', minutes: 50, bearing: 200, note: 'A university town down the interstate.' },
    { id: 'sturgeon-bay', kind: 'FEEDER', name: 'Sturgeon Bay and Door County', minutes: 55, bearing: 55, note: 'Tourist and shipyard towns, very seasonal.', season: { months: [6, 7, 8, 9], mul: 1.5 } },
    { id: 'marinette', kind: 'FEEDER', name: 'Marinette', minutes: 60, bearing: 25, note: 'A mill and border town facing the Michigan peninsula, with a little scene of its own.' },
    { id: 'sheboygan', kind: 'PEER', name: 'Sheboygan', minutes: 60, bearing: 160, scene: 300, note: 'A lakeshore city down I-43.' },
    { id: 'fond-du-lac', kind: 'PEER', name: 'Fond du Lac', minutes: 70, bearing: 190, scene: 300, note: 'A lake and factory city at the south end of the big lake.' },
    { id: 'wausau', kind: 'PEER', name: 'Wausau', minutes: 105, bearing: 280, scene: 300, note: 'A paper and insurance city to the west.' },
    { id: 'marquette', kind: 'PEER', name: 'Marquette', state: 'MI', minutes: 170, bearing: 340, scene: 250, note: 'A university town on the far shore of the Upper Peninsula.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and Washington Street', route: 'downtown', note: 'Bars, restaurants, the arena and the riverfront. Mostly 21 and over, poor for houses, slowly filling with apartments.' },
    { id: 'broadway', name: 'the Broadway District', route: 'downtown', note: 'Old brick storefronts and riverfront warehouses north of downtown. The best candidate for storefront and warehouse rooms; risk of being priced out.' },
    { id: 'east-side', name: 'the east side', route: 'old-side', note: 'Tree-lined duplexes and upper flats with real basements and porches. Students and service workers; quiet and cheap-ish.' },
    { id: 'west-side', name: 'the near west side', route: 'old-side', note: 'Working-class streets, corner bars and parish halls. Cheap, ignored, and full of basements.' },
    { id: 'ashwaubenon', name: 'Ashwaubenon and the stadium strip', route: 'work-side', note: 'Chain hotels, big-box retail and strip-mall units. Garages and practice spaces, wrecked by game days.' },
    { id: 'de-pere-hood', name: 'De Pere', route: 'campus', note: 'A small college city on both banks of the river with student houses near campus.' },
    { id: 'allouez', name: 'Allouez', route: 'work-side', note: 'A quiet older suburb to the south with a few basements and higher rent.' },
    { id: 'bay-campus', name: 'the bay-shore campus', route: 'campus', note: 'A university on a bluff at the edge of town. Dorms and apartments; far out for kids without cars.' }
  ],

  contacts: ['madison-wi', 'eau-claire-wi', 'duluth-mn', { name: 'Appleton', state: 'WI', lat: 44.26, lon: -88.42 }],

  points: [
    { name: 'Milwaukee', state: 'WI', lat: 43.04, lon: -87.91, pop: 570000 },
    { name: 'Appleton', state: 'WI', lat: 44.26, lon: -88.42, pop: 75000 },
    { name: 'Oshkosh', state: 'WI', lat: 44.02, lon: -88.54, pop: 66000 },
    { name: 'Marquette', state: 'MI', lat: 46.54, lon: -87.40, pop: 21000 },
    { name: 'Wausau', state: 'WI', lat: 44.96, lon: -89.63, pop: 39000 }
  ],
  roads: ['I-43', 'US 41', 'WI 29', 'WI 57', 'WI 32', 'WI 54'],

  words: {
    street: ['Washington Street', 'Broadway', 'Mason Street', 'Monroe Avenue', 'Main Street', 'Velp Avenue'],
    water: ['the Fox River', 'the bay', 'Lake Michigan', 'Duck Creek'],
    hood: ['the east side', 'the west side', 'Allouez', 'Ashwaubenon', 'De Pere', 'Astor', 'Navarino'],
    thing: ['fish fry', 'bar pizza', 'cheese curds', 'brat', 'booyah', 'pole barn', 'parish hall', 'custard stand', 'draw bridge', 'carpool'],
    weather: ['lake-effect snow', 'January cold']
  }
});
