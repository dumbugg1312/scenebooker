SB.Cities.register('toledo-oh', {
  v: 1,
  slug: 'toledo-oh',
  confidence: { geography: 'PARTLY', scene: 'PARTLY', names: 'UNCHECKED' },
  banned: ['owens-illinois', 'owens illinois', 'libbey', 'owens corning', 'jeep', 'toledo war', 'mud hens', 'toledo walleye', 'university of toledo',
           'bowling green state university', 'bgsu', 'owens community college', 'lourdes university', 'ohio state', 'toledo blade', 'wxut', 'wbgu',
           'marco\'s', 'marco\'s pizza', 'packo', 'tony packo', 'vfw', 'american legion', 'eastern michigan', 'michigan state', 'marathon petroleum',
           'cullet hall', 'the annealer', 'lagrange social club', 'ten mile basement', 'the float line', 'birmingham turners hall', 'marsh road garage',
           'bay view legion post 412', 'tin roof sundries', 'the batch house', 'craft street annex', 'perch dinner hall',
           'black swamp', 'toledo deathfest', 'toledo jeep fest', 'jeep fest', 'old west end festival', 'biggest week in american birding', 'maumee summer fair', 'toledo free press',
           'toledo city paper', 'wtol', 'toledo rockets', 'glass bowl', 'battle of i-75', 'toledo zoo', 'zoo lights', 'record store day', 'maumee bay lodge',
           'imagination station', 'toledo museum of art', 'ohio air national guard', '180th fighter wing'],
  /* The dossier's invented venue names are in banned: research, not content, unchecked. */
  blocklist: ['toledo blade*', 'mud hens*', 'cullet hall*', 'packo*'],

  blurb: ["Detroit's quiet neighbor, where the shows are small and the basements are damp.",
          'Bands here do it themselves because nobody else will, and the road mostly skips them.'],
  hard: 'A fill date between bigger cities; rooms are patchy and short-lived.',
  region: 'the Midwest',
  houseType: 'BASEMENT',
  whereGo: [
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05 },
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69 },
    { name: 'Columbus', state: 'OH', lat: 39.96, lon: -83.0 },
    { name: 'Chicago', state: 'IL', lat: 41.88, lon: -87.63 }
  ],

  zones: [
    { id: 'city', kind: 'CITY', name: 'Toledo' },
    { id: 'bowling-green', kind: 'FEEDER', name: 'Bowling Green', minutes: 25, bearing: 190, note: 'A university town just down I-75 with its own small scene; kids go both ways.' },
    { id: 'monroe', kind: 'FEEDER', name: 'Monroe', state: 'MI', minutes: 30, bearing: 10, note: 'A factory and river town in Michigan; its kids look to Toledo and Detroit.' },
    { id: 'wauseon', kind: 'FEEDER', name: 'Wauseon and Archbold', minutes: 45, bearing: 265, note: 'Farm country to the west; almost no scene.' },
    { id: 'fremont', kind: 'FEEDER', name: 'Fremont', minutes: 45, bearing: 110, note: 'A small manufacturing town to the southeast.' },
    { id: 'port-clinton', kind: 'FEEDER', name: 'Port Clinton', minutes: 50, bearing: 95, note: 'A lake and ferry town; busy in summer, quiet otherwise.', season: { months: [6, 7, 8], mul: 1.3 } },
    { id: 'adrian', kind: 'FEEDER', name: 'Adrian', state: 'MI', minutes: 50, bearing: 315, note: 'A small college town with some arts life.' },
    { id: 'findlay', kind: 'FEEDER', name: 'Findlay', minutes: 50, bearing: 185, note: 'An oil company town with a small college and a little scene.' },
    { id: 'defiance', kind: 'FEEDER', name: 'Defiance and Napoleon', minutes: 60, bearing: 230, note: 'River towns up the Maumee with a college and a few bands.' },
    { id: 'sandusky', kind: 'FEEDER', name: 'Sandusky', minutes: 60, bearing: 90, note: 'A lakeshore tourist town with a modest scene and seasonal work.', season: { months: [6, 7, 8], mul: 1.3 } },
    { id: 'ann-arbor', kind: 'PEER', name: 'Ann Arbor', state: 'MI', minutes: 50, bearing: 350, slug: 'ann-arbor-mi', note: 'The college and music town up US 23; the pull and the bigger bills.' },
    { id: 'fort-wayne', kind: 'PEER', name: 'Fort Wayne', state: 'IN', minutes: 105, bearing: 240, slug: 'fort-wayne-in', note: 'A similar industrial city west on US 24, a common stop for bands.' },
    { id: 'akron', kind: 'PEER', name: 'Akron', minutes: 135, bearing: 110, slug: 'akron-oh', note: 'A longer tradition east on the turnpike; Toledo bands go play and envy it.' },
    { id: 'dayton', kind: 'PEER', name: 'Dayton', minutes: 135, bearing: 190, slug: 'dayton-oh', note: 'Same Rust Belt history, down I-75.' }
  ],

  hoods: [
    { id: 'downtown', name: 'downtown and the warehouse district', route: 'downtown', note: 'Old brick warehouses, a few lofts and a bar strip on the river; patchy and empty after dark.' },
    { id: 'old-west-end', name: 'the Old West End', route: 'old-side', note: 'Tall Victorian houses cut into apartments, with big basements and porches. Students and artists.' },
    { id: 'uptown', name: 'Uptown', route: 'downtown', note: 'Converted storefronts and galleries north of the core; small gallery shows.' },
    { id: 'east-toledo', name: 'East Toledo and Birmingham', route: 'work-side', note: 'Across the river: refinery-side, blue-collar, cheap. Basements, garages and corner bars.' },
    { id: 'north-toledo', name: 'North Toledo and Lagrange', route: 'work-side', note: 'Old Polish blocks with social halls, churches and vacant lots near the assembly plant.' },
    { id: 'west-toledo', name: 'West Toledo and Sylvania Avenue', route: 'campus', note: 'Student rentals and strip malls around the university; the main student crowd.' },
    { id: 'junction', name: 'Junction and the near south side', route: 'work-side', note: 'Older neighborhoods with many vacant lots and the cheapest basements.' },
    { id: 'point-place', name: 'Point Place', route: 'old-side', note: 'A bay-side boating neighborhood; bar and marina shows, mostly summer.' }
  ],

  rooms: [
    { id: 'sylvania-basement', kind: 'HOUSE', hood: 'west-toledo', cap: 40, hostCut: 0, pa: .4, curfew: 1260, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 50, start: true, note: 'A student-rental basement off Sylvania Avenue. A promoter walks the crowd down between bands, and the first neighbor complaint after nine ends it.' },
    { id: 'victorian-house', kind: 'HOUSE', hood: 'old-west-end', cap: 50, hostCut: 0, pa: .4, curfew: 1260, ac: false, outdoor: false, sketch: 25, standing: [65, 60, 45],
      pressure: 50, note: 'A tall Victorian cut into apartments, with a big basement and a porch. The shared walls and the landlord are the threat.' },
    { id: 'east-side-garage', kind: 'HOUSE', hood: 'east-toledo', cap: 35, hostCut: 0, pa: .4, curfew: 1290, ac: false, outdoor: false, sketch: 20, standing: [65, 60, 40],
      pressure: 40, note: 'A garage and basement across the river. Farther from complainers, and cold from November to April.' },
    { id: 'warehouse-hall', kind: 'DIY', hood: 'downtown', cap: 100, rent: 70, deposit: 0, pa: .5, curfew: 1320, ac: false, sketch: 45, standing: [55, 60, 45],
      pressure: 60, needs: ['VOUCH'], note: 'An old underground room in a house-turned-hall. Small and short-lived, and always a lease away from closing.' },
    { id: 'polish-hall', kind: 'HALL', hood: 'north-toledo', cap: 200, rent: 200, deposit: 75, pa: .6, curfew: 1320, ac: true, sketch: 10, standing: [55, 60, 70],
      owner: 'HALL_MANAGER', note: 'A social hall on the old Polish blocks, rented by the night. The fee is flat and the hall has its own rules.' },
    { id: 'bay-yard', kind: 'OUTDOOR', hood: 'point-place', cap: 80, rent: 10, pa: .4, curfew: 1260, sketch: 30, standing: [60, 55, 40],
      note: 'A yard and a pavilion by the bay. Summer only, and the quiet hour and the weather decide it.' },
    { id: 'river-bar', kind: 'BAR', hood: 'downtown', cap: 150, soundFee: 50, pa: .6, ages: ['ALL', 'A18'], matinee: true, curfew: 1440, ac: true, following: .3, sketch: 20,
      standing: [50, 65, 65], pressure: 50, note: 'A bar on the river with a back-room stage and an early all-ages window. New owners and insurance keep it nervous.' },
    { id: 'dark-club', kind: 'CLUB', hood: 'downtown', cap: 300, houseCosts: 200, split: .8, pa: .9, ages: ['A18'], curfew: 1440, ac: true, following: .6, sketch: 15,
      standing: [45, 70, 65], pressure: 55, owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The downtown club for original music. It has gone dark and come back under a new company more than once, and metal bills sell it out.' },
    { id: 'uptown-club', kind: 'CLUB', hood: 'uptown', cap: 250, houseCosts: 150, split: .8, pa: .85, ages: ['A21'], curfew: 1500, ac: true, following: .5, sketch: 15,
      standing: [50, 65, 65], owner: 'TALENT_BUYER', notice: 42, needs: ['FULL_BILL'], note: 'The other long-running music room. Dark for stretches, then back, with comedy on Mondays between bands.' },
    { id: 'arts-hall', kind: 'BIG', hood: 'west-toledo', cap: 500, rent: 1200, deposit: 300, pa: .85, curfew: 1380, ac: true, sketch: 10, standing: [50, 65, 65],
      owner: 'TALENT_BUYER', notice: 70, note: 'A basement-level hall inside a big renovated arts building. It holds five hundred and is hard to book outside the punk weekend.' },
    { id: 'record-store', kind: 'SHOP', hood: 'west-toledo', cap: 60, pa: .4, curfew: 1140, ac: true, sketch: 5, standing: [70, 70, 75], following: .2,
      note: 'A record store on the west side with a corner for in-store sets. Summer afternoons and the big record weekend, over by seven.' }
  ],

  contacts: ['ann-arbor-mi', 'fort-wayne-in', 'akron-oh', 'dayton-oh', 'detroit'],

  calendar: [
    { id: 'street-fest', label: 'the big downtown street festival', tag: 'festival', month: 8, week: 1, dows: [4, 5, 6], can: [.90, .85, .85], hoods: ['downtown', 'uptown'], elsewhere: [1, .97, .97] },
    { id: 'house-tours', label: 'the Old West End house-tour weekend', tag: 'festival', month: 6, week: 1, dows: [5, 6], can: [.90, .88, .88], hoods: ['old-west-end'], elsewhere: [1, 1, 1] },
    { id: 'football-sep', label: 'home football', tag: 'game', month: 9, weeks: [2, 4], dows: [5], can: [.85, .95, .95], hoods: ['west-toledo'], elsewhere: [.95, 1, 1] },
    { id: 'football-oct', label: 'home football', tag: 'game', month: 10, weeks: [2, 4], dows: [5], can: [.85, .95, .95], hoods: ['west-toledo'], elsewhere: [.95, 1, 1] },
    { id: 'rival-game', label: 'the rival game down I-75', tag: 'game', month: 11, week: 3, dows: [4], can: [.80, .90, .92] },
    { id: 'halloween', label: 'Halloween weekend', tag: 'holiday', month: 10, weeks: [4, 5], dows: [4, 5], can: [1.08, 1.05, 1] },
    { id: 'thanksgiving-eve', label: 'the night before Thanksgiving', tag: 'holiday', month: 11, week: 4, dows: [2], can: [1.05, 1.15, 1.10] }
  ],

  rules: { quiet: 1260, curfewMinors: { weeknight: 1380, weekend: 1380, inForce: false } },


  events: [
    { id: 'TOLEDO_OH_STREET_CLOSED', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 4], calendar: 'festival' },
      telegraph: 'The downtown blocks outside the club are closing for the street festival.',
      title: 'The street is shut outside the club',
      body: 'The festival has the blocks around the club barricaded, and parking is gone. The van has to wait for the street to reopen before it can load in.',
      options: [
        { id: 'WAIT', label: 'Hold the load-in until the street reopens', likely: 'A late start. The crowd waits on the sidewalk.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 75 }, { op: 'SHOW_MOD', key: 'headsMul', v: .92 }],
          result: 'The barricades came down at nine. You started late and the festival crowd wandered in.' },
        { id: 'CARRY', label: 'Carry the gear in by hand from three blocks away', likely: 'Tiring, but the doors open on time.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 20 }, { op: 'SHOW_MOD', key: 'qAdd', v: -1 }],
          result: 'Everyone hauled amps down the sidewalk. The set was ragged and the room was glad of it.' },
        { id: 'ACCEPT', label: 'Run it with whatever crowd the street lets through', likely: 'Parking is gone for most of them.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The ones who could not park went home. The regulars walked.' }
      ] },

    { id: 'TOLEDO_OH_GAME_FEST', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 45, bind: ['show'],
      if: { daysOut: [0, 5], calendar: 'game' },
      telegraph: 'The big punk weekend lands on the same night as a home game, and every street west of downtown is already full.',
      title: 'The kids and the cars fight for the street',
      body: 'A three-day punk weekend and a stadium game share the blocks around campus. Parking is gone and the rentals are packed.',
      options: [
        { id: 'LATE', label: 'Push doors back until the game lets out', likely: 'The crowd that wants a night out comes late.',
          effects: [{ op: 'SHOW_MOD', key: 'lateMin', v: 60 }, { op: 'SHOW_MOD', key: 'headsMul', v: .95 }],
          result: 'Doors an hour late. The crowd came in loud from the stadium.' },
        { id: 'ACCEPT', label: 'Run it as planned', likely: 'The casual crowd is at the game.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .8 }],
          result: 'The casual crowd stayed at the game. The regulars came.' },
        { id: 'MOVE', label: 'Move the show a day', likely: 'Breaks the date. Costs trust with the bands.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 1, respect: false }],
          result: 'You moved it a day. Not everyone could make the new one.' }
      ] },

    { id: 'TOLEDO_OH_NINE_PM', when: 'WEEK', tier: 'REAL', weight: 2, cooldown: 40, bind: ['show'],
      if: { daysOut: [0, 3], months: [5, 6, 7, 8, 9] },
      telegraph: 'The yard show by the bay is set for dusk, and the neighbors have complained before.',
      title: 'The nine o\'clock line arrives mid-set',
      body: 'The quiet hour lands in the middle of the second band. A neighbor is already on the porch with a phone.',
      options: [
        { id: 'UNPLUG', label: 'Finish unplugged', likely: 'Quieter and slower, but it keeps the night.',
          effects: [{ op: 'SHOW_MOD', key: 'qAdd', v: -1 }, { op: 'SHOW_MOD', key: 'headsMul', v: .9 }],
          result: 'The last two bands played acoustic on the lawn. Nobody left.' },
        { id: 'INSIDE', label: 'Move inside to a basement', likely: 'Smaller, and out of earshot.',
          effects: [{ op: 'MOVE_SHOW', dayShift: 0, toKind: 'HOUSE', respect: false }, { op: 'SHOW_MOD', key: 'capMul', v: .6 }],
          result: 'A basement took the bill. The floor was packed and the neighbors went to bed.' },
        { id: 'ACCEPT', label: 'Keep playing and take the complaint', likely: 'Risks the yard for next summer.',
          effects: [{ op: 'SHOW_MOD', key: 'headsMul', v: .85 }],
          result: 'The police came at nine-thirty. The yard is not offered again.' }
      ] }
  ],

  points: [
    { name: 'Detroit', state: 'MI', lat: 42.33, lon: -83.05, pop: 4300000 },
    { name: 'Cleveland', state: 'OH', lat: 41.5, lon: -81.69, pop: 2000000 },
    { name: 'Lansing', state: 'MI', lat: 42.73, lon: -84.55, pop: 540000 },
    { name: 'Lima', state: 'OH', lat: 40.74, lon: -84.11, pop: 100000 }
  ],
  roads: ['I-75', 'I-80/90', 'I-280', 'I-475', 'US 23', 'US 24'],

  words: {
    street: ['Sylvania Avenue', 'Dorr Street', 'Monroe Street', 'Detroit Avenue', 'Front Street'],
    water: ['the Maumee', 'Maumee Bay', 'Lake Erie'],
    hood: ['the Old West End', 'Uptown', 'Birmingham', 'Lagrange', 'Junction', 'Point Place', 'Sylvania', 'Maumee', 'Perrysburg', 'Oregon', 'Rossford'],
    thing: ['coney dog', 'lake perch', 'sump pump', 'cullet', 'turnpike', 'pallet', 'borrowed truck', 'perch dinner', 'fraternal hall'],
    weather: ['lake effect', 'ice storm']
  }
});
