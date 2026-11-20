SB.Cities.register('tallahassee-fl', {
  v: 1,
  slug: 'tallahassee-fl',
  confidence: { geography: 'PARTLY', scene: 'UNVERIFIED', names: 'UNCHECKED' },
  banned: ['florida state university', 'fsu', 'famu', 'florida a&m', 'tallahassee state college', 'tallahassee community college', 'university of florida',
           'valdosta state', 'vsu', 'moody air force base', 'chipola college', 'tallahassee memorial', 'tallahassee democrat', 'starmetro', 'doak campbell',
           'railroad square', 'first friday', 'downtown getdown', 'springtime tallahassee', 'greek food festival', 'wine and food festival', 'asian festival',
           'rose festival', 'watermelon festival', 'cascades park', 'tyndall', 'publix', 'waffle house', 'natty light', 'vfw', 'american legion', 'elks',
           'sinkhole social club', 'tin roof annex', 'cypress knee room', 'canopy road rec hall', 'red clay pavilion', 'capitol hill laundry', 'spanish moss carport',
           'lime sink lanes', 'tupelo mill annex', 'lafayette street garage', 'weeping oak hall', 'lake bradford boat barn'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['railroad square*', 'doak campbell*', 'tallahassee democrat*', 'starmetro*', 'publix*', 'waffle house*'],

  blurb: ['Students fill the room in term and vanish in summer, so the scene rebuilds itself every fall.',
          'A capital with a big campus and no basements: porches, garages and bar back rooms carry the shows.'],
  hard: 'Football Saturdays, summer exodus and few rooms that will take a punk bill.',
  region: 'north Florida',
  houseType: 'GARAGE',
  whereGo: [
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66 },
    { name: 'Atlanta', state: 'GA', lat: 33.75, lon: -84.39 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Tallahassee' },
    { id: 'havana', kind: 'FEEDER', name: 'Havana', minutes: 20, bearing: 330, note: 'An antique-shop town on the way to Lake Talquin. A tiny scene, if any.' },
    { id: 'crawfordville', kind: 'FEEDER', name: 'Crawfordville', minutes: 30, bearing: 200, note: 'The county seat toward the Gulf. Boaters and families, no scene.' },
    { id: 'quincy', kind: 'FEEDER', name: 'Quincy', minutes: 30, bearing: 300, note: 'An old farm town to the west. Church and gospel spaces more than punk.' },
    { id: 'monticello', kind: 'FEEDER', name: 'Monticello', minutes: 30, bearing: 75, note: 'Tiny and historic, east on US 90.' },
    { id: 'thomasville', kind: 'FEEDER', name: 'Thomasville', state: 'GA', minutes: 40, bearing: 35, note: 'Plantation-money town up US 319, across the Georgia line.' },
    { id: 'gulf-villages', kind: 'FEEDER', name: 'Panacea, St. Marks and Sopchoppy', minutes: 40, bearing: 180, note: 'Gulf fishing villages. No scene.' },
    { id: 'chattahoochee', kind: 'FEEDER', name: 'Chattahoochee', minutes: 45, bearing: 295, note: 'A hospital-and-prison town, tiny.' },
    { id: 'madison', kind: 'FEEDER', name: 'Madison', minutes: 50, bearing: 90, note: 'A small north Florida farm town on I-10.' },
    { id: 'perry', kind: 'FEEDER', name: 'Perry', minutes: 60, bearing: 120, note: 'A timber and paper-mill town in a hard-hit Gulf county.' },
    { id: 'marianna', kind: 'FEEDER', name: 'Marianna', minutes: 75, bearing: 290, note: 'Caverns, farms and a college nearby, up I-10 to the west.' },
    { id: 'valdosta', kind: 'FEEDER', name: 'Valdosta', state: 'GA', minutes: 80, bearing: 65, note: 'A college and base town, larger than the others on the list.' },
    { id: 'apalachicola', kind: 'FEEDER', name: 'Apalachicola', minutes: 85, bearing: 220, note: 'An oyster and tourist town down US 98.' },
    { id: 'gainesville', kind: 'PEER', name: 'Gainesville', minutes: 130, bearing: 115, slug: 'gainesville-fl',
      note: 'The nearest equal, with the bigger punk name. People drive across for its fall festival.' },
    { id: 'panama-city', kind: 'PEER', name: 'Panama City', minutes: 110, bearing: 257, scene: 500, note: 'A beach-and-base town still rebuilding after the big storm of 2018.' },
    { id: 'fort-walton', kind: 'PEER', name: 'Fort Walton Beach', minutes: 170, bearing: 270, slug: 'fort-walton-beach-fl', note: 'A small Gulf Coast scene, west past Panama City.' },
    { id: 'pensacola', kind: 'PEER', name: 'Pensacola', minutes: 180, bearing: 270, slug: 'pensacola', note: 'Smaller than this town but with a bigger Gulf-coast punk and metal sense. Bands play both.' },
    { id: 'albany', kind: 'PEER', name: 'Albany', state: 'GA', minutes: 100, bearing: 5, scene: 250, note: 'A lower-tier trading partner up in Georgia.' },
    { id: 'dothan', kind: 'PEER', name: 'Dothan', state: 'AL', minutes: 120, bearing: 309, scene: 250, note: 'A lower-tier trading partner, northwest over the line.' }
  ],

  hoods: [
    { id: 'gaines', name: 'Gaines Street', route: 'downtown', note: 'Old warehouse and rail-yard blocks south of the university, turned into bars, student apartments and an arts district. Heating up, then priced out.' },
    { id: 'tennessee', name: 'Tennessee Street', route: 'campus', note: 'The strip west of campus: bars, pawn shops, motels, taquerias and cheap strip-mall units.' },
    { id: 'midtown', name: 'Midtown and Lake Ella', route: 'old-side', note: 'North of the strip on Monroe Street: cafes, a small lake and older houses. Young professionals and grad students; priced up.' },
    { id: 'frenchtown', name: 'Frenchtown', route: 'old-side', note: 'The oldest historically Black neighborhood in the state: small houses, corner stores and church halls. A newcomer needs real relationships.' },
    { id: 'bond', name: 'Bond and Callen', route: 'campus', note: 'South of downtown around the historically Black university. Its own music culture, mostly separate from rock shows.' },
    { id: 'southwood', name: 'Southwood and Capital Circle', route: 'work-side', note: 'The planned-suburb and strip-mall belt to the southeast: chains, apartments, industrial parks and church halls.' },
    { id: 'northside', name: 'Killearn, Bradfordville and Lake Jackson', route: 'campus', note: 'Big lots and subdivisions north on Thomasville Road: garages, backyards and teenagers living at home.' },
    { id: 'woodville', name: 'Woodville Highway', route: 'work-side', note: 'Cheap rent, trailers and pole barns heading south toward the Gulf. Ignored.' }
  ],

  contacts: ['gainesville-fl', 'pensacola', 'fort-walton-beach-fl'],

  points: [
    { name: 'Jacksonville', state: 'FL', lat: 30.33, lon: -81.66, pop: 1700000 },
    { name: 'Panama City', state: 'FL', lat: 30.16, lon: -85.66, pop: 200000 },
    { name: 'Valdosta', state: 'GA', lat: 30.83, lon: -83.28, pop: 150000 },
    { name: 'Dothan', state: 'AL', lat: 31.22, lon: -85.39, pop: 150000 },
    { name: 'Orlando', state: 'FL', lat: 28.54, lon: -81.38, pop: 2700000 },
    { name: 'Tampa', state: 'FL', lat: 27.95, lon: -82.46, pop: 3200000 }
  ],
  roads: ['I-10', 'US 90', 'US 27', 'US 319', 'Capital Circle', 'US 98'],

  words: {
    street: ['Gaines Street', 'Tennessee Street', 'Monroe Street', 'Thomasville Road', 'Capital Circle', 'Apalachee Parkway', 'Woodville Highway', 'Mahan Drive',
             'Macomb Street', 'Meridian Road', 'Crawfordville Road'],
    water: ['Lake Ella', 'Lake Jackson', 'Lake Talquin'],
    hood: ['Midtown', 'Frenchtown', 'Bond', 'Callen', 'Southwood', 'Killearn', 'Bradfordville', 'Woodville'],
    thing: ['sinkhole', 'red clay', 'spanish moss', 'canopy road', 'boiled peanuts', 'mullet dip', 'screened porch', 'carport', 'bug zapper', 'live oak', 'fellowship hall'],
    weather: ['afternoon thunderstorm']
  }
});
