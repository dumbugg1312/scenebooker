/* Scene Booker — content/names.js   (role C1)
 * Name pools and patterns: people, bands, rooms, labels, zines, agencies, booking names; how people describe a sound;
 * the rare words, the cleared names and the blocklist. Schema: design/spec/03-content.md section 4.
 *
 * Every pattern here yields three words or more after a leading "The" is dropped, so its output passes
 * SB.text.nameOk on its own, except the patterns that carry a place slot ({street}, {water}, {hood}), which pass
 * because that slot is a local word. Those place slots come only from the city pack's `words`; a pattern whose bank
 * is empty should not be drawn.  // SPEC? 03-content 4 does not say what the generator does with a pattern whose
 * bank has no words (a pack without `words`). The smaller behavior assumed here: skip the pattern, or redraw.
 * Bank names are chosen so they never merge with a pack's `thing`, `weather` or `surnames` banks by accident; only
 * `street`, `water`, `hood` and `order` are meant to merge.
 * Base pools read as plausible in any American city; coast, base and mill words belong in the packs.
 * The blocklist is a filter and is never shown to the player.
 */
SB.Content.names = {
  rare: ['saltglass', 'tannin', 'norther', 'rotgut', 'tensaw', 'bulkhead', 'pilings', 'creosote', 'slough'],

  cleared: ['Shift Whistle', 'Brine Hymn', 'Rot Lantern', 'Tensaw Static', 'Liberty Risk', "Sheriff's Sale", 'Lovebug Season',
            "the Mariners' Lodge", 'the Rusty Cleat', 'the Second Watch', 'the Net Loft',
            'Slack Water', 'Mildew Remediation', 'Dredge Barge', 'The Gnat Line', 'The Satsuma Crates', 'The Pier Review',
            'The Plywood Partiers'],

  blocklist: [
    /* names the check found in use */
    'brackish', 'cold front', 'bog iron', 'mildew', 'creosote', 'night heron', 'night herons', 'wet season', 'pollen count',
    'half mast', 'rot gut', 'rotgut', 'local 98', 'dredge', 'dredger', 'dredged', 'box fan', 'boxfan', 'satsuma', 'satsumas',
    'bilge rat', 'bilge rats', 'bilge pump', 'pier pressure', 'peer pressure', 'hold short', 'slough', 'tensaw', 'heat index',
    'needle drop*', 'needledrop*', 'sand gnats*', 'hurricane party*', 'horn section 8', 'section 8*',
    /* the other names the check replaced */
    'the pollen count', 'the bilge rats', 'the sand gnats', 'needle drop records', 'woodmens hall', 'peavy', 'lonnies lounge',
    'boat barn on bayou chico', 'cannery annex', 'old cannery annex', 'hurricane party favors', 'the hurricane partiers',
    'the pier pressure',
    /* real societies and orders (rule 5) */
    'woodmen*', 'woodmens*', 'elks*', 'moose lodge*', 'masons*', 'masonic*', 'odd fellows*', 'oddfellows*', 'knights of*',
    'grange*', 'vfw*', 'american legion*', 'eagles lodge*', 'seamens*', 'seamans*',
    /* real rooms that surfaced in the Pensacola searches; each pack adds its own city's in its own blocklist */
    'handlebar*', 'vinyl music hall*', 'seville quarter*', 'intermission', 'play', 'wild gregs*', 'shack', 'flora bama*',
    'trader jons*', '1216 north*', 'sanctuary', 'loft on sabine bay*', 'barn', 'lonnies western room', 'lotties lounge',
    /* brands that are one letter from a surname */
    'peavey*'
  ],

  shared: {
    color: ['Yellow', 'Pink', 'Green', 'Blue', 'Orange', 'Grey', 'Red', 'White', 'Purple', 'Gold', 'Brown', 'Teal', 'Lavender', 'Mint'],
    number: ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Nine', 'Eleven', 'Twelve', 'Fourteen']
  },

  /* By generation at the start year (2027). Kids born about 2006 to 2011, the middle 1991 to 2005, old heads 1962 to 1990. */
  first: {
    KIDS: ['Aiden', 'Delaney', 'Reese', 'Kaylee', 'Jayden', 'Ivy', 'Brayden', 'Nevaeh', 'Mateo', 'Harper', 'Kai', 'Zoe', 'Elijah',
           'Aaliyah', 'Gavin', 'Lila', 'Josiah', 'Marley', 'Ezra', 'Paisley', 'Liam', 'Emma', 'Noah', 'Ava', 'Mason', 'Sophia',
           'Lucas', 'Mia', 'Chloe', 'Carter', 'Riley', 'Grayson', 'Avery', 'Landon', 'Addison', 'Cameron', 'Brooklyn', 'Hudson',
           'Peyton', 'Easton', 'Skylar', 'Ryder', 'Kennedy', 'Colton', 'Makayla', 'Jaxon', 'Aubrey', 'Damian', 'Savannah',
           'Xavier', 'Gianna', 'Isaiah', 'Camila', 'Dominic', 'Natalia', 'Malik', 'Jada', 'Diego', 'Ximena', 'Andres',
           'Valeria', 'Khalil', 'Imani', 'Tristan', 'Hailey', 'Bryce', 'Owen', 'Sadie', 'Wyatt', 'Piper', 'Rowan', 'Willow',
           'Silas', 'Hazel', 'Declan', 'Juniper', 'Axel', 'Luna', 'Jude', 'Nova', 'Micah', 'Talia', 'Bao', 'Linh', 'Darius',
           'Kiara', 'Tatum', 'Rory'],
    MIDDLE: ['Tyler', 'Ashley', 'Kyle', 'Marisol', 'Devin', 'Jasmine', 'Cody', 'Brittany', 'Andre', 'Kayla', 'Logan', 'Destiny',
             'Hunter', 'Bianca', 'Trey', 'Courtney', 'Dustin', 'Alexis', 'Jordan', 'Kendra', 'Brandon', 'Megan', 'Justin',
             'Amber', 'Austin', 'Samantha', 'Zach', 'Chase', 'Morgan', 'Dylan', 'Kelsey', 'Garrett', 'Shelby', 'Marcus',
             'Tiana', 'Javier', 'Yesenia', 'Luis', 'Gabriela', 'Derek', 'Crystal', 'Travis', 'Danielle', 'Corey', 'Monique',
             'Jamal', 'Ebony', 'Kevin', 'Stephanie', 'Raul', 'Vanessa', 'Blake', 'Haley', 'Colby', 'Lindsey', 'Caleb',
             'Whitney', 'Seth', 'Sierra', 'Evan', 'Erica', 'Shane', 'Tara', 'Quinton', 'Dakota', 'Cassie', 'Mitchell',
             'Brianna', 'Malcolm', 'Keisha', 'Tuan', 'Thao', 'Duc', 'Omar', 'Leticia', 'Ryan', 'Rachel', 'Josh', 'Paige',
             'Brett', 'Krista', 'Derrick', 'Alyssa'],
    OLD: ['Wes', 'Tammy', 'Ray', 'Lonnie', 'Dana', 'Jeff', 'Sherri', 'Darnell', 'Dwayne', 'Angie', 'Rusty', 'Tonya', 'Curtis',
          'Misty', 'Glenn', 'Renee', 'Earl', 'Shonda', 'Todd', 'Lisa', 'Greg', 'Kim', 'Scott', 'Tina', 'Darren', 'Michelle',
          'Troy', 'Dawn', 'Chad', 'Heather', 'Brian', 'Wendy', 'Rodney', 'Felicia', 'Keith', 'Rhonda', 'Marty', 'Lori',
          'Vince', 'Denise', 'Duane', 'Kelly', 'Reggie', 'Yolanda', 'Tim', 'Carla', 'Lance', 'Robin', 'Shawn', 'Tracy',
          'Jerome', 'Sonya', 'Craig', 'Jill', 'Ricky', 'Annette', 'Terrence', 'Vicki', 'Jimmy', 'Starla', 'Hector', 'Rosa',
          'Manny', 'Gloria', 'Leon', 'Bobbie', 'Clint', 'Becky', 'Darryl', 'Charlene', 'Phuong', 'Hung', 'Lan', 'Thanh',
          'Frank', 'Debbie', 'Bart', 'Jolene', 'Stacy', 'Marlon', 'Gina', 'Dale', 'Cheryl']
  },

  /* Base bank; the pack's words.surnames are drawn 60% of the time. No surname here is also a brand. */
  last: ['Pruitt', 'Castillo', 'McCants', 'Nguyen', 'Hollinger', 'Ortiz', 'Tran', 'Fairley', 'Ladner', 'Delgado', 'Henley', 'Pham',
         'Cobb', 'Rivas', 'Godwin', 'Mabry', 'Truong', 'Sellers', 'Jernigan', 'Montoya', 'Hough', 'Strickland', 'Odom', 'Alvarez',
         'Brennan', 'Kowalski', 'Okafor', 'Haskins', 'Lindqvist', 'Mendoza', 'Whitaker', 'Dunleavy', 'Pacheco', 'Greer',
         'Abernathy', 'Yoder', 'Salgado', 'Pettaway', 'Kincaid', 'Huang', 'Garza', 'Lockhart', 'Mercado', 'Tolliver', 'Szabo',
         'Ruiz', 'Haddad', 'Bledsoe', 'Ferreira', 'Nakamura', 'Quintero', 'Rollins', 'Varga', 'Whitfield', 'Ochoa', 'Eckert',
         'Mosley', 'Bui', 'Gallegos', 'Harjo', 'Sandoval', 'Tillman', 'Lemieux', 'Chavis'],

  nick: { p: .2, patterns: ['{last}', 'Big {first}', 'Little {first}', '{thing:cap}'],
          banks: { thing: ['Cooler', 'Ladder', 'Toolbox', 'Clipboard', 'Flashlight', 'Tape Gun', 'Cowbell', 'Tackle Box', 'Zip Tie',
                           'Keyring', 'Bucket', 'Lunchbox', 'Hammer', 'Jumper Cables'] } },

  band: {
    genShare: .35,          // chance a band is named from its generation's patterns, not its genre's
    placeShare: .10,        // at most this share of bands may use a slot filled from the pack's place banks
    wholeShare: .30,        // chance of taking a whole name before trying patterns
    byGenre: {
      'hardcore': {
        whole: ['Load Bearing Wall Down', 'Concrete Cure Time', 'Rebar In The Footing', 'Condemned By Thursday',
                'Tagout Before Repair', 'Second Shift Collapse', 'Cinderblock Faith Healers', 'Burn Ban In Effect',
                'Spit Shine Inspection', 'Pressure Treated Grudge', 'No Shoulder Ahead', 'Frost Line Depth',
                'Dry Rot Under Paint', 'Jackhammer At Dawn', 'Sandbag Wall Holding', 'Detour Ends Here',
                'Bent Rebar Gospel', 'Overpass Under Repair', 'Loose Gravel Warning', 'Weight Limit Bridge'],
        patterns: ['{A:cap} {N:cap} {W:cap}', '{N:cap} {N2:cap} {W:cap}', '{V:cap} The {N:cap} {W:cap}', '{N:cap} {W:cap} In Effect',
                   '{A:cap} {N:cap} On {street}'],
        banks: { A: ['Hard', 'Bent', 'Dry', 'Loose', 'Raw', 'Bare', 'Burnt', 'Cracked', 'Rusted', 'Sheared', 'Stripped', 'Gutted',
                     'Grey', 'Low', 'Split', 'Sunk'],
                 N: ['Rebar', 'Cinderblock', 'Gravel', 'Footing', 'Girder', 'Joist', 'Drywall', 'Asphalt', 'Culvert', 'Overpass',
                     'Frost', 'Lumber', 'Breaker', 'Conduit', 'Mortar', 'Scaffold', 'Plywood', 'Ground'],
                 W: ['Warning', 'Advisory', 'Ban', 'Notice', 'Order', 'Inspection', 'Permit', 'Citation', 'Detour', 'Curfew',
                     'Lockout', 'Foreman', 'Collapse', 'Variance'],
                 V: ['Hold', 'Spit', 'Burn', 'Pour', 'Strip', 'Gut', 'Brace', 'Shore', 'Haul', 'Crack'] },
        lower: 0, the: 0
      },
      'pop-punk': {
        whole: ['Grounded Until Graduation', 'Your Dad Still Has My Ladder', 'Two Exits Past The Outlet Mall',
                'Parking Lot After Prom', 'Late Fee On The Library Book', 'Mom Took The Long Way', 'Somebody Call My Manager',
                'Free Refills Forever', 'My Cousin Has A Pool', 'Cul De Sac Season', 'Grandma Liked Our Demo',
                'Gas Money And A Prayer', 'Still On The Family Plan', 'Mandatory Fun Weekend', 'Sunburn In February',
                'We Ate At The Rest Stop', 'Three Chords And A Minivan', 'The Drive Thru Is Closed', 'Ask Your Mom First',
                'Detour Through The Suburbs'],
        patterns: ['{who} {did} {what}', 'Grounded Till {till}', '{num} {unit} To {dest}', 'Last Exit Before {hood}'],
        banks: { who: ['My Mom', 'Your Dad', 'My Cousin', 'The Neighbor', 'My Manager', 'Your Sister', 'The Youth Pastor',
                       'My Landlord', 'The Substitute', 'My Stepdad', 'Your Ex', 'The Mailman'],
                 did: ['Borrowed', 'Sold', 'Crashed', 'Forgot', 'Hid', 'Repainted', 'Towed', 'Returned', 'Outgrew', 'Kept',
                       'Lost', 'Named'],
                 what: ['The Minivan', 'My Bike', 'The Good Cooler', 'Our Drum Throne', 'The Porch Swing', 'The Family Dog',
                        'The Spare Key', 'The Group Photo', 'My Prom Tux', 'The Lawn Mower', 'Our Van', 'The Trampoline'],
                 till: ['Prom', 'Graduation', 'Spring Break', 'Labor Day', 'My Birthday', 'The Fourth', 'Christmas Break',
                        'Payday', 'Next Summer', 'Further Notice', 'Thanksgiving', 'The Weekend'],
                 num: ['Two', 'Three', 'Four', 'Six', 'Nine', 'Eleven', 'Forty'],
                 unit: ['Hours', 'Exits', 'Miles', 'Days', 'Stoplights', 'Payments', 'Missed Calls', 'Gas Stations'],
                 dest: ['Your House', 'The Coast', 'Nowhere', 'The Mall', 'Payday', 'The Interstate', 'Your Ex', 'Graduation',
                        'The Lake', 'Grandma\'s', 'The Outlet Mall'] },
        lower: .05, the: 0
      },
      'emo': {
        whole: ['i kept your hoodie for some reason', 'Everything In This Town Closes Early', 'Your Mom Still Waves At Me',
                'We Should Have Taken The Bus', 'The Year We Moved Twice', 'Things I Left In Your Car', 'Every Streetlight Between Us',
                'i still have the mixtape', 'Sorry I Missed Your Call Again', 'Postcards From The Laundromat',
                'We Used To Sit On The Roof', 'The Last Bus Was At Eleven', 'Your Handwriting On The Fridge',
                'Rain On The Shed Roof', 'i will text you from the parking lot', 'Moving Boxes In The Hallway',
                'All My Friends Moved Away', 'Half A Sandwich At Midnight', 'Your Brother Still Has My Records',
                'Remember The Snow Day'],
        patterns: ['{we} {where}', '{obj} From {time}', '{still} Is Still {state}', 'Last One Out Of {hood}'],
        banks: { we: ['We Used To Sit', 'You Used To Sleep', 'I Used To Wait', 'We Used To Walk', 'You Always Parked',
                      'I Still Drive', 'We Never Swam', 'You Kissed Me', 'We Buried It', 'I Learned To Drive'],
                 where: ['On The Roof', 'Behind The Library', 'In The Quarry', 'By The Train Tracks', 'Under The Overpass',
                         'In Your Backyard', 'Past Your House', 'Outside The Gym', 'At The Reservoir', 'By The Water Tower',
                         'In The Church Lot', 'Behind The Bowling Alley'],
                 obj: ['Photographs', 'Letters', 'Receipts', 'Voicemails', 'Postcards', 'Mixtapes', 'Bruises', 'Polaroids',
                       'Directions', 'Leftovers', 'Keys', 'Ticket Stubs'],
                 time: ['The Year We Moved', 'Your Old Apartment', 'Last Summer', 'The Hospital Parking Lot',
                        'Your Sister\'s Wedding', 'Senior Year', 'The Night Shift', 'The Old House', 'Before The Storm',
                        'Your Last Address', 'The Long Winter'],
                 still: ['The Kitchen Radio', 'My Old Bike', 'Your Toothbrush', 'The Ceiling Fan', 'Your Jacket', 'The Spare Key',
                         'Your Car Alarm', 'The Answering Machine', 'Your Name', 'The Night Light', 'Your Cat'],
                 state: ['Here', 'Running', 'Broken', 'In My Trunk', 'Under The Mat', 'Warm', 'Ringing', 'Unpacked',
                         'On My Phone', 'Waiting Up', 'In The Garage'] },
        lower: .35, the: 0
      },
      'crust': {
        whole: ['Runoff Permit Denied', 'Landfill Gas Flare', 'Tailings Pond Baptism', 'Ash Pond Breach', 'Fish Advisory Season',
                'Do Not Drink Order', 'Condemned Lot Sale', 'Plant Closure Notice', 'Spill Response Theater', 'Coal Ash Christmas',
                'Shuttered Plant Lungs', 'Black Mold Census', 'Rust Belt Rosary', 'Scrap Yard Sermon', 'Evacuation Route Closed',
                'Ozone Action Day', 'Dead Zone Summer', 'Lead Pipe Childhood', 'Salvage Rights Only', 'Sparrows Under The Smelter'],
        patterns: ['{H:cap} {Nt:cap} {T:cap}', '{body:cap} Under {buried:cap}', '{adj:cap} {site:cap} {end:cap}', '{H:cap} In {water}'],
        banks: { H: ['Coal Ash', 'Runoff', 'Tailings', 'Lead Pipe', 'Black Mold', 'Smokestack', 'Landfill', 'Fly Ash', 'Sludge Pond',
                     'Slag Heap', 'Chemical Plume', 'Scrap Metal', 'Acid Rain', 'Leachate', 'Asbestos', 'Burn Pit'],
                 Nt: ['Notice', 'Permit', 'Advisory', 'Order', 'Hearing', 'Violation', 'Settlement', 'Report', 'Cleanup', 'Exemption',
                      'Waiver', 'Variance'],
                 T: ['Denied', 'Pending', 'Expired', 'Overturned', 'Ignored', 'Season', 'Rosary', 'Choir', 'Lungs', 'Census',
                     'Sermon', 'Funeral', 'Lullaby'],
                 body: ['Graves', 'Lungs', 'Wells', 'Children', 'Pines', 'Gardens', 'Rivers', 'Sparrows', 'Fields', 'Orchards'],
                 buried: ['Fill Dirt', 'Slag', 'Coal Ash', 'The Stack', 'The Spillway', 'Fly Ash', 'The Tailings', 'The Smelter',
                          'The Refinery', 'The Rail Yard'],
                 adj: ['Condemned', 'Shuttered', 'Poisoned', 'Flooded', 'Abandoned', 'Fenced', 'Gutted', 'Rusted', 'Capped',
                       'Leaking'],
                 site: ['Plant', 'Mill', 'Smelter', 'Refinery', 'Quarry', 'Rail Yard', 'Landfill', 'Mine', 'Tannery', 'Foundry'],
                 end: ['Lungs', 'Sky', 'Rosary', 'Choir', 'Hymnal', 'Census', 'Ledger', 'Children', 'Prayer', 'Orphans'] },
        lower: .05, the: 0
      },
      'garage': {
        whole: ['The Pawn Shop Tickets', 'The Bowling Alley Kings', 'The Night Shift Mechanics', 'The Gravel Lot Romeos',
                'The Cheap Beer Saints', 'The Loading Dock Lights', 'The Tow Truck Widows', 'The Muffler Shop Boys',
                'The Coin Laundry Queens', 'The Parts Counter Girls', 'The Swap Meet Sinners', 'The Car Wash Casanovas',
                'The Junkyard Dog Tags', 'The Second Hand Saints', 'The Fry Cook Fiends', 'The Pool Hall Liars',
                'The Gas Station Roses', 'The Bait Bucket Brigade', 'The Short Order Ghosts', 'The Spare Hubcap Thieves'],
        patterns: ['The {place:cap} {who:cap}', '{cheap:cap} {drink:cap} {saints:cap}', 'The {part:cap} {who:cap}', 'The {street} {who:cap}'],
        banks: { place: ['Pawn Shop', 'Car Wash', 'Tire Shop', 'Pool Hall', 'Bait Shop', 'Gas Station', 'Loading Dock', 'Truck Stop',
                         'Bowling Alley', 'Swap Meet', 'Parts Counter', 'Rail Yard', 'Fry Station', 'Night Shift', 'Tow Lot',
                         'Body Shop'],
                 who: ['Kings', 'Queens', 'Saints', 'Sinners', 'Romeos', 'Widows', 'Thieves', 'Liars', 'Ghosts', 'Mechanics',
                       'Brides', 'Bandits', 'Casanovas', 'Drifters', 'Sweethearts'],
                 cheap: ['Cheap', 'Warm', 'Flat', 'Day Old', 'Watered', 'Stolen'],
                 drink: ['Rum', 'Beer', 'Coffee', 'Wine', 'Whiskey', 'Gin', 'Soda', 'Cider'],
                 saints: ['Saints', 'Sinners', 'Prophets', 'Deacons', 'Martyrs', 'Angels', 'Widows'],
                 part: ['Spare Hubcap', 'Oil Change', 'Tail Light', 'Fan Belt', 'Spark Plug', 'Jumper Cable', 'Pawn Ticket', 'Lug Nut',
                         'Bottle Cap', 'Seat Cover'] },
        lower: 0, the: 0
      },
      'post-punk': {
        whole: ['Sodium Vapor Hymns', 'Hollow Pine Ward', 'Fog Over The Overpass', 'Night Ferry Ticket', 'Static On The Platform',
                'Cold Room Archive', 'Pale Signal Tower', 'Mercury Lamp Choir', 'Glass Block Window', 'Empty Lot Lanterns',
                'The Hour After Closing', 'Frost On The Antenna', 'Grey Light Ministry', 'Vacant Floor Seven',
                'Television Snow Parish', 'Long Corridor Fever', 'Second Floor Fog', 'Ashen Stairwell Choir', 'Night Bus Window',
                'Quiet Hum Of Wires'],
        patterns: ['{light:cap} {mid:cap} {end:cap}', '{fall:cap} On The {on:cap}', '{fall:cap} Over {water}'],
        banks: { light: ['Sodium', 'Mercury', 'Neon', 'Fluorescent', 'Halogen', 'Strobe', 'Ember', 'Pale', 'Grey', 'Static',
                         'Tungsten', 'Cathode'],
                 mid: ['Vapor', 'Lamp', 'Fog', 'Frost', 'Glass', 'Ash', 'Signal', 'Mirror', 'Wire', 'Ice', 'Smoke', 'Hum'],
                 end: ['Choir', 'Ward', 'Parish', 'Hymns', 'Ministry', 'Archive', 'Hour', 'Station', 'Corridor', 'Window', 'Tower',
                       'Ritual', 'Garden', 'Vigil'],
                 fall: ['Static', 'Frost', 'Fog', 'Ash', 'Rain', 'Rust', 'Snow', 'Smoke', 'Moths', 'Sleet', 'Pigeons', 'Shadows'],
                 on: ['Platform', 'Antenna', 'Overpass', 'Stairwell', 'Window', 'Wires', 'Water Tower', 'Parking Deck', 'Rooftop',
                      'Signal', 'Fire Escape', 'Turnstile'] },
        lower: .05, the: 0
      },
      'indie': {
        whole: ['Borrowed Ladder Weekend', 'Window Unit Lullaby', 'Laundromat On Sunday', 'Hand Me Down Sweater', 'Unsweet Tea Again',
                'Folding Chairs In The Yard', 'Second Hand Ceiling Fan', 'Tomato Plants On The Porch', 'Spare Key Under The Mat',
                'Crossword In Pen', 'Kitchen Radio Weather', 'Library Card Renewal', 'Dish Rack Morning', 'Nightlight In The Hall',
                'Two Cats One Porch', 'Junk Drawer Inventory', 'Sunday Dinner Leftovers', 'Mismatched Coffee Mugs',
                'Bike Bell In The Rain', 'Quilt From A Yard Sale'],
        patterns: ['{obj:cap} {at:cap}', '{obj:cap} For {whom:cap}', '{gentle:cap} {chore:cap} {day:cap}'],
        banks: { obj: ['Spare Key', 'Folding Chair', 'Kitchen Radio', 'Ceiling Fan', 'Porch Swing', 'Dish Rack', 'Tomato Plant',
                       'Nightlight', 'Junk Drawer', 'Coffee Mug', 'Bike Bell', 'Wind Chime', 'Window Unit', 'Space Heater',
                       'Crossword', 'Quilt', 'Library Book', 'Tea Kettle', 'Houseplant', 'Record Player'],
                 at: ['On The Porch', 'In The Hall', 'Under The Mat', 'By The Window', 'In The Yard', 'On The Fridge',
                      'In The Kitchen', 'At The Laundromat', 'On The Stairs', 'In The Garage', 'Out Back'],
                 whom: ['Two', 'The Neighbors', 'Your Mom', 'Company', 'Later', 'The Winter', 'Nobody', 'The Cat', 'Sunday',
                        'Old Times'],
                 gentle: ['Slow', 'Quiet', 'Rainy', 'Early', 'Late', 'Sleepy', 'Soft', 'Lazy'],
                 chore: ['Laundry', 'Dishes', 'Gardening', 'Repair', 'Baking', 'Yard Work', 'Canning', 'Ironing', 'Mending',
                         'Porch Sweeping'],
                 day: ['Sunday', 'Night', 'Weather', 'Weekend', 'Afternoon', 'Season', 'Morning', 'Club'] },
        lower: .15, the: 0
      },
      'metal': {
        whole: ['Strip Mine Cathedral', 'Peat Fire Hymnal', 'Coal Seam Prophet', 'Slag Heap Deacon', 'Quarry Water Baptism',
                'Tar Pit Congregation', 'Clay Pit Gospel', 'Stump Grinder Sermon', 'Furnace Stack Revival', 'Bedrock Funeral March',
                'Sinkhole Under The Chapel', 'Copperhead In The Pew', 'Controlled Burn Psalm', 'Old Growth Stump',
                'Heavy Water Tabernacle', 'Mudslide Altar Call', 'Foundry Ash Psalter', 'Rotten Trestle Choir',
                'Smelter Smoke Liturgy', 'Fault Line Vespers'],
        patterns: ['{G:cap} {M:cap} {C:cap}', '{beast:cap} In The {holy:cap}', '{G:cap} Under {hood}'],
        banks: { G: ['Slag', 'Peat', 'Silt', 'Clay', 'Shale', 'Coal', 'Tar', 'Lye', 'Rust', 'Ash', 'Sinkhole', 'Strip Mine', 'Quarry',
                     'Furnace', 'Mud', 'Lime', 'Gravel', 'Bedrock'],
                 M: ['Fire', 'Pit', 'Seam', 'Heap', 'Water', 'Smoke', 'Burn', 'Flood', 'Vein', 'Bed', 'Field', 'Stack', 'Kiln'],
                 C: ['Cathedral', 'Hymnal', 'Deacon', 'Revival', 'Tabernacle', 'Psalm', 'Vespers', 'Liturgy', 'Altar Call',
                     'Congregation', 'Sermon', 'Prophet', 'Pulpit', 'Choir', 'Baptism'],
                 beast: ['Copperhead', 'Buzzard', 'Snapping Turtle', 'Mud Dauber', 'Hog', 'Catfish', 'Possum', 'Crow', 'Wasp',
                         'Leech', 'Bullfrog', 'Black Snake'],
                 holy: ['Pew', 'Baptistry', 'Steeple', 'Choir Loft', 'Collection Plate', 'Pulpit', 'Vestry', 'Bell Tower',
                        'Fellowship Hall', 'Hymn Rack'] },
        lower: 0, the: 0
      },
      'ska': {
        whole: ['The Roller Rink Rudies', 'The Boardwalk Brass Band', 'The Shuffleboard Court Kings', 'The Snack Bar Steppers',
                'Checkerboard Lunch Break', 'The Bus Stop Horn Line', 'Upstroke At The Car Wash', 'The Lifeguard Stand Stompers',
                'The Bowling Shoe Brass', 'The Ice Cream Truck Rebellion', 'Sax Solo On Layaway', 'The Pool Party Horn Line',
                'The Funnel Cake Fanfare', 'Off The Beat And Hungry', 'The Rink Night Rudeboys', 'Trombone Slide Season',
                'Raccoons At The Roller Rink', 'The Mini Golf Marching Band', 'Tuba In The Carpool', 'The Laundry Day Strutters'],
        patterns: ['The {place:cap} {dance:cap}', '{horn:cap} Solo On {deal:cap}', '{beast:cap} At The {spot:cap}'],
        banks: { place: ['Roller Rink', 'Snack Bar', 'Bus Stop', 'Car Wash', 'Bowling Shoe', 'Lifeguard Stand', 'Ice Cream Truck',
                         'Funnel Cake', 'Pool Party', 'Mini Golf', 'Food Truck', 'Laundry Day', 'Lunch Break', 'Corn Dog',
                         'County Fair'],
                 dance: ['Steppers', 'Stompers', 'Rudies', 'Shufflers', 'Brass', 'Horn Line', 'Upstrokes', 'Two Steppers',
                         'Strutters', 'Skippers', 'Checkerboards', 'Trombones', 'All Stars', 'Fanfare'],
                 horn: ['Sax', 'Trumpet', 'Trombone', 'Tuba', 'French Horn', 'Bari Sax', 'Clarinet'],
                 deal: ['Layaway', 'Lunch Break', 'Credit', 'Payday', 'The Bus', 'The Boardwalk', 'The Ferris Wheel',
                        'Roller Skates', 'The Bumper Cars', 'Speakerphone'],
                 beast: ['Raccoons', 'Possums', 'Seagulls', 'Pigeons', 'Squirrels', 'Armadillos', 'Ducks', 'Geese', 'Goats'],
                 spot: ['Roller Rink', 'Car Wash', 'Snack Bar', 'Bus Stop', 'Mini Golf', 'County Fair', 'Bowling Alley',
                        'Ice Rink', 'Drive In', 'Water Park'] },
        lower: 0, the: 0
      },
      'folk-punk': {
        whole: ['Bicycle Repair Collective', 'Free Store On Fridays', 'Potluck Every Thursday', 'Seed Library Saturday',
                'Mandolin In The Trunk', 'Banjo With Three Strings', 'Washboard And Wishbone', 'Back Porch Assembly',
                'Rent Strike Lullaby', 'Bus Fare And Bandanas', 'Patched Jacket Hymns', 'Tent City Postcards',
                'Freight Yard Sweethearts', 'Accordion From A Pawn Shop', 'Compost Heap Choir', 'Thrift Store Saints',
                'Stolen Shopping Cart Waltz', 'Rooftop Garden Plot', 'Spare Socks For The Road', 'Mended Boots Brigade'],
        patterns: ['{inst:cap} In The {spot:cap}', '{cause:cap} {song:cap}', '{adj:cap} {obj:cap} {kin:cap}'],
        banks: { inst: ['Banjo', 'Mandolin', 'Accordion', 'Washboard', 'Fiddle', 'Harmonica', 'Upright Bass', 'Ukulele',
                        'Tambourine', 'Spoons', 'Kazoo', 'Melodica'],
                 spot: ['Trunk', 'Laundromat', 'Free Store', 'Rail Yard', 'Squat', 'Back Porch', 'Bus Station', 'Potluck',
                        'Garden', 'Overpass', 'Tool Shed', 'Kitchen'],
                 cause: ['Rent Strike', 'Free Store', 'Seed Library', 'Bike Kitchen', 'Tool Library', 'Tent City',
                         'Community Fridge', 'Food Share', 'Picket Line', 'Squat Kitchen', 'Mutual Aid', 'Coat Drive'],
                 song: ['Lullaby', 'Waltz', 'Hymns', 'Shanty', 'Ballad', 'Two Step', 'Hoedown', 'Sing Along', 'Reel', 'Breakdown',
                        'Lament', 'Jamboree'],
                 adj: ['Patched', 'Borrowed', 'Stolen', 'Thrifted', 'Mended', 'Secondhand', 'Darned', 'Rescued'],
                 obj: ['Jacket', 'Bicycle', 'Shopping Cart', 'Tent', 'Sleeping Bag', 'Bandana', 'Boots', 'Guitar Case', 'Wagon',
                       'Bedroll'],
                 kin: ['Saints', 'Sweethearts', 'Choir', 'Collective', 'Brigade', 'Kin', 'Neighbors', 'Stowaways', 'Cousins',
                       'Congregation'] },
        lower: .1, the: 0
      },
      'noise': {
        whole: ['HOA Violation Notice', 'Mosquito Truck Tuesday', 'Spray Foam Insulation', 'Code Enforcement Visit',
                'Gnat Swarm Season', 'Drywall Dust Everywhere', 'Septic Backup Sunday', 'Breaker Box Again', 'Roof Tarp Flapping',
                'Condensation Line Clog', 'Noise Ordinance Violation', 'Grease Trap Overflow', 'Flood Insurance Denied',
                'Leaf Blower At Seven', 'Car Alarm All Night', 'Smoke Detector Chirp', 'Lawn Service Monday', 'Pilot Light Out',
                'Parking Ticket Appeal', 'Ceiling Stain Spreading'],
        patterns: ['{nuis:cap} {act:cap}', 'Final {bill:cap} Notice', '{pest:cap} In The {room:cap}'],
        banks: { nuis: ['Smoke Detector', 'Car Alarm', 'Leaf Blower', 'Grease Trap', 'Septic Tank', 'Breaker Box', 'Roof Tarp',
                        'Gnat Swarm', 'Fire Ant', 'Drywall Dust', 'Spray Foam', 'Water Heater', 'Garbage Disposal',
                        'Ceiling Stain', 'Parking Ticket', 'Lawn Mower', 'Sump Pump', 'Pest Control', 'Tow Truck', 'Property Tax',
                        'Mosquito Truck', 'Code Enforcement'],
                 act: ['Overflow', 'Violation', 'Again', 'Denied', 'Appeal', 'Chirp', 'Season', 'Backup', 'Notice', 'Inspection',
                       'Tuesday', 'Forever', 'Estimate', 'Deductible', 'Complaint', 'Citation'],
                 bill: ['Water', 'Gas', 'Sewer', 'Trash', 'Shutoff', 'Eviction', 'Tow', 'Lien', 'Late Fee', 'Collections'],
                 pest: ['Roaches', 'Ants', 'Gnats', 'Termites', 'Mold', 'Mice', 'Wasps', 'Fleas', 'Silverfish', 'Ticks'],
                 room: ['Drywall', 'Vents', 'Breaker Box', 'Crawlspace', 'Attic', 'Walls', 'Window Unit', 'Dishwasher',
                        'Mailbox', 'Water Heater'] },
        lower: .1, the: 0
      },
      'street-punk': {
        whole: ['The Night Shift Rejects', 'The Rail Yard Wreckers', 'The Mandatory Overtime Casualties', 'The Lunch Pail Riot',
                'Steel Toe Choir', 'The Break Room Dropouts', 'The Time Clock Brats', 'The Payday Loan Sharks',
                'The Pawn Ticket Outcasts', 'The Boot Heel Brigade', 'The Garnished Wage Gang', 'The Last Call Delinquents',
                'The Corner Store Rejects', 'The Second Shift Saints', 'The Hard Hat Hooligans', 'The Bottom Shelf Boys',
                'The Cheap Seats Chorus', 'The Laid Off Lads', 'The Dented Can Saints', 'The Bus Depot Burnouts'],
        patterns: ['The {place:cap} {gang:cap}', 'The {street} {gang:cap}', 'The {shift:cap} {gang:cap}'],
        banks: { place: ['Night Shift', 'Rail Yard', 'Break Room', 'Time Clock', 'Tow Lot', 'Corner Store', 'Pawn Shop', 'Bus Depot',
                         'Loading Dock', 'Bottom Shelf', 'Steel Toe', 'Lunch Pail', 'Hard Hat', 'Back Alley', 'Shop Floor',
                         'Picket Line', 'Dented Can', 'Cheap Seats'],
                 gang: ['Rejects', 'Wreckers', 'Dropouts', 'Brats', 'Casualties', 'Delinquents', 'Outcasts', 'Hooligans', 'Strays',
                        'Brigade', 'Lads', 'Gang', 'Saints', 'Burnouts', 'Losers', 'Riot'],
                 shift: ['Eight Hour', 'Ten Hour', 'Twelve Hour', 'Sixteen Hour', 'Double Shift', 'Split Shift', 'Graveyard Shift',
                         'Mandatory Overtime'] },
        lower: 0, the: 0
      }
    },
    byGen: {
      KIDS: {
        whole: ['my mom is driving', 'we got kicked out of the skatepark', 'Hall Pass Revoked', 'Group Project Partner',
                'teacher workday again', 'Forged Permission Slip', 'Learner\'s Permit Pending', 'Spirit Week Casualties',
                'Saturday Detention Crew', 'Senior Skip Day', 'Lunch Table Politics', 'Pep Rally Walkout', 'Substitute Teacher Day',
                'Prom Was Mid Anyway', 'Late Bus Riders', 'kicked from the group chat', 'my brother\'s old drum kit',
                'Seventh Period Study Hall', 'we\'re not allowed downtown', 'Fire Drill During Finals'],
        patterns: ['{school:cap} {slip:cap} {when:cap}', '{who} {says}'],
        banks: { school: ['Hall', 'Bus', 'Prom', 'Lunch', 'Study Hall', 'Pep Rally', 'Fire Drill', 'Homeroom', 'Gym Class',
                          'Field Trip', 'Spirit Week', 'Yearbook', 'Locker Room', 'Band Room'],
                 slip: ['Pass', 'Rider', 'Monitor', 'Duty', 'Permit', 'Ticket', 'Photo', 'Slip', 'Partner', 'Committee', 'Seat'],
                 when: ['Revoked', 'Again', 'Forever', 'Pending', 'Denied', 'Postponed', 'Canceled', 'Ruined', 'Tomorrow',
                        'Was Mid', 'Survivors'],
                 who: ['my mom', 'my dad', 'my sister', 'our drummer', 'the principal', 'my stepdad', 'the bus driver', 'my grandma',
                       'our bassist', 'the vice principal'],
                 says: ['is driving', 'took my phone', 'says no', 'is still mad', 'found the flyer', 'has the car',
                        'is picking us up', 'grounded our bassist', 'read the group chat', 'signed the slip'] },
        lower: .4, the: 0
      },
      MIDDLE: {
        whole: ['Last Call Ministry', 'Double Shift Sunday', 'Tip Pool Dispute', 'Lease Renewal Blues', 'Brunch Rush Survivors',
                'Security Deposit Gone', 'Night Audit Ghosts', 'Shift Drink Theory', 'Back Of House Choir', 'Roommate Wanted Again',
                'Tow Zone Romance', 'Payday Is Thursday', 'Clock Out Early', 'Overdraft Fee Waltz', 'Line Cook Burns',
                'Rent Is Due Friday', 'Closing Shift Confessions', 'Break Room Microwave', 'Health Insurance Someday',
                'Side Job Season'],
        patterns: ['{work:cap} {money:cap} {tail:cap}', '{bill:cap} Is Due {day:cap}'],
        banks: { work: ['Night', 'Closing', 'Swing', 'Double', 'Split', 'Morning', 'Weekend', 'Holiday', 'Graveyard', 'Third',
                        'Opening'],
                 money: ['Shift', 'Audit', 'Deposit', 'Tip Out', 'Paycheck', 'Overdraft', 'Rent', 'Lease', 'Invoice', 'Timecard',
                         'Schedule'],
                 tail: ['Blues', 'Again', 'Club', 'Choir', 'Ministry', 'Theory', 'Survivors', 'Confessions', 'Waltz', 'Romance',
                        'Saints', 'Revival'],
                 bill: ['Rent', 'The Phone Bill', 'Car Insurance', 'The Light Bill', 'Tuition', 'The Storage Unit', 'The Lease',
                        'The Water Bill'],
                 day: ['Friday', 'Monday', 'Tomorrow', 'Again', 'The First', 'Thursday', 'Today'] },
        lower: 0, the: 0
      },
      OLD: {
        whole: ['The Strip Mall Rejects', 'The Water Tower Wreckers', 'The Video Store Delinquents', 'The Drive In Casualties',
                'The Junior High Dropouts', 'The Skate Park Ghosts', 'Class Of Ninety Three', 'The Mall Cop Menace',
                'Burnt Out By Thirty', 'The Bad Influence Squad', 'The Curfew Breaker Club', 'The Spray Paint Saints',
                'The Broken Taillight Gang', 'The Liquor Store Lookouts', 'The Back Seat Bandits', 'The Pay Phone Prophets',
                'The Bowling Alley Brats', 'Still Banned From The Mall', 'The Fourth Ward Riot', 'Same Three Chords Since School'],
        patterns: ['The {place:cap} {gang:cap}', 'The {hood} {gang:cap}', 'Still Banned From {where:cap}'],
        banks: { place: ['Strip Mall', 'Water Tower', 'Video Store', 'Drive In', 'Junior High', 'Skate Park', 'Mall Cop',
                         'Liquor Store', 'Back Seat', 'Pay Phone', 'Bowling Alley', 'Car Wash', 'Roller Rink', 'Spray Paint',
                         'Detention Hall', 'Trailer Park'],
                 gang: ['Rejects', 'Wreckers', 'Dropouts', 'Brats', 'Casualties', 'Delinquents', 'Outcasts', 'Menace', 'Fiends',
                        'Bandits', 'Lookouts', 'Squad', 'Noise'],
                 where: ['The Mall', 'The Rink', 'The Arcade', 'The Skate Park', 'The Bowling Alley', 'The Pool Hall',
                         'The Waffle Place', 'The Library', 'The Video Store', 'The Fair'] },
        lower: 0, the: .6
      }
    }
  },

  /* Used when a pack room has no `name`. One group per ROOM kind, 12 patterns each. Owner names come from the
   * group's own banks so that rule 5 (a first name plus Lounge, Tap, Saloon or Tavern needs a second specific
   * word) holds by construction. Halls take invented trades only; {order} merges with the pack's own invented trades. */
  room: {
    HOUSE: {
      patterns: ['the {street} Carport', 'the {color:cap} House on {street}', 'the {yard:cap} House', 'the {street} Porch',
                 'the {color:cap} Duplex on {street}', 'the {yard:cap} House on {street}', 'the Basement on {street}',
                 'the {hood} Living Room', 'the {color:cap} Garage House', 'the House with the {yard:cap}',
                 'the {last} Street Carport', 'the Big {color:cap} House'],
      banks: { yard: ['Pink Flamingo', 'Tire Swing', 'Wind Chime', 'Plastic Deer', 'Garden Gnome', 'Porch Couch', 'Basketball Hoop',
                      'Christmas Light', 'Satellite Dish', 'Boat In The Yard', 'Broken Fence', 'Rain Barrel', 'Fig Tree',
                      'Blue Shutter'],
               last: ['Pruitt', 'Castillo', 'Hollinger', 'Fairley', 'Ladner', 'Godwin', 'Mabry', 'Jernigan', 'Whitaker', 'Kincaid'] }
    },
    BAR: {
      patterns: ['{owner}\'s Back Bar on {street}', 'the {sign:cap} Tap on {street}', 'the {boat:cap} on {street}',
                 'the {sign:cap} Lounge', '{owner}\'s {sign:cap} Tavern', 'the {sign:cap} Saloon on {street}',
                 '{owner}\'s Place on {street}', 'the {hood} Tap Room', 'the {number:cap} Stool Tavern', 'the {sign:cap} Room',
                 'the {family} Brothers Tavern', 'the {sign:cap} Icehouse'],
      banks: { owner: ['Lonnie', 'Dwayne', 'Rusty', 'Tammy', 'Earl', 'Starla', 'Glenn', 'Rhonda', 'Marty', 'Jolene', 'Hector',
                       'Bobbie'],
               sign: ['Busted Neon', 'Half Lit', 'Cracked Mirror', 'Last Stool', 'Two Pool Table', 'Slow Ceiling Fan', 'Back Booth',
                      'Short Pour', 'Broken Clock', 'Long Pour', 'Low Hanger', 'Dart Board', 'Stuck Jukebox'],
               boat: ['Rusty Cleat', 'Second Watch', 'Net Loft', 'Last Stool', 'Back Booth', 'Broken Clock', 'Short Pour'],
               family: ['Pruitt', 'Ladner', 'Kowalski', 'Varga', 'Dunleavy', 'Szabo', 'Haskins', 'Tolliver'] }
    },
    HALL: {
      patterns: ['the {order:cap} Lodge on {street}', 'the {order:cap} Hall on {street}', 'the {hood} Fellowship Hall',
                 'the {order:cap} Lodge Hall', 'the {order:cap} Meeting Hall', 'the Old {order:cap} Lodge',
                 'the Fellowship Hall at {tree} {church}', 'the {order:cap} Social Hall', 'the Upstairs Hall at the {order:cap} Lodge',
                 'the {hood} Rec Hall', 'the Hall over {family} Hardware', 'the {tree} {church} Fellowship Hall'],
      banks: { order: ['Netmenders\'', 'Ropewalkers\'', 'Lamplighters\'', 'Bellringers\'', 'Sawyers\'', 'Tinsmiths\'',
                       'Wheelwrights\'', 'Chairmenders\'', 'Icecutters\'', 'Lockkeepers\''],
               tree: ['Live Oak', 'Cedar Grove', 'Sweetgum', 'Pecan Grove', 'Magnolia', 'Persimmon', 'Sycamore', 'Hickory Ridge'],
               church: ['Chapel', 'Tabernacle', 'Gospel Chapel', 'Bible Chapel', 'Mission Chapel'],
               family: ['Peaden', 'Hough', 'Odom', 'Sellers', 'Bledsoe', 'Eckert', 'Mosley', 'Tillman'] }
    },
    SHOP: {
      patterns: ['{rec:cap} Records', '{rec:cap} Records and Tapes', '{rec:cap} Records on {street}', '{cafe:cap} Coffee',
                 'the Back Room at {cafe:cap} Coffee', '{ramp:cap} Skate on {street}', 'the Ramp Room at {ramp:cap} Skate',
                 'the Back Room at {family} Books', 'the {family} Music Exchange', 'the {hood} Bike Kitchen',
                 'the Print Shop on {street}', '{family} Pawn and Music'],
      banks: { rec: ['Stylus Tray', 'Dust Sleeve', 'Cue Burn', 'Dog Ear', 'Back Stock', 'Lathe Cut', 'Test Pressing',
                     'Gatefold Sleeve', 'Hype Sticker', 'Skip Groove', 'Warped Sleeve'],
               cafe: ['Third Shift', 'Short Stack', 'Slow Drip', 'Cold Mug', 'Second Pour', 'Late Pot', 'Burnt Toast',
                      'Hand Crank', 'Last Refill'],
               ramp: ['Low Ledge', 'Flat Bar', 'Bent Rail', 'Coping Block', 'Grip Tape', 'Kicktail', 'Bank Ramp'],
               family: ['Pruitt', 'Castillo', 'Delgado', 'Truong', 'Montoya', 'Haddad', 'Lindqvist', 'Quintero'] }
    },
    DIY: {
      patterns: ['Unit {unit} on {street}', 'the {space:cap} on {water}', 'the {space:cap} on {street}', 'the {bldg:cap}',
                 'the {street} Practice Space', 'the {hood} Warehouse', 'Bay {unit} at the {family} Building',
                 'the Basement under {family} Hardware', 'the {color:cap} Door Space', 'the Space behind {family} Tire',
                 'the Old {family} Bakery', 'the {color:cap} Warehouse on {street}'],
      banks: { unit: ['4', '7', '9', '12', '14', '16', '21', '23', '31', 'B', 'C', 'D'],
               space: ['Rope Walk', 'Old Ice House', 'Packing Shed Annex', 'Old Bottling Plant', 'Feed Store Annex', 'Tire Shop Bay',
                       'Body Shop Bay', 'Print Shop Loft', 'Old Laundry', 'Cold Storage Room', 'Mattress Warehouse', 'Old Bank Vault'],
               bldg: ['Old Ice House', 'Packing Shed Annex', 'Old Bottling Plant', 'Feed Store Annex', 'Print Shop Loft',
                      'Old Laundry Building', 'Cold Storage Room', 'Old Bank Vault', 'Upholstery Shop Floor', 'Old Sign Shop'],
               family: ['Pruitt', 'Castillo', 'Ladner', 'Jernigan', 'Okafor', 'Kowalski', 'Garza', 'Whitfield', 'Rollins', 'Harjo'] }
    },
    CLUB: {
      patterns: ['the {club:cap} Room', 'the {club:cap} Ballroom', 'the {club:cap} Music Room', 'the {club:cap} on {street}',
                 'the {club:cap} Showroom', 'the {hood} Music Hall', 'the Upstairs at the {club:cap}', 'the {club:cap} Supper Club',
                 'the {club:cap} Lounge and Stage', 'the Back Room at the {club:cap}', 'the {club:cap} Social Club',
                 'the {club:cap} Theater Bar'],
      banks: { club: ['Second Watch', 'Low Hanger', 'Long Shadow', 'Blue Ceiling', 'Copper Rail', 'Slow Burn', 'Iron Gate',
                      'Brass Lamp', 'Velvet Curtain', 'Dead Air', 'Tall Ceiling', 'Green Lamp', 'Tin Ceiling'] }
    },
    BIG: {
      patterns: ['the {hood} Auditorium', 'the {family} Municipal Hall', 'the {family} Memorial Hall', 'the {family} Memorial Theater',
                 'the Old {family} Opera House', 'the {hood} Assembly Hall', 'the {family} Event Center',
                 'the Old {family} Theater on {street}', 'the {street} Armory Hall', 'the {family} Exposition Hall',
                 'the {family} Performing Arts Hall', 'the {tree} Pavilion Hall'],
      banks: { family: ['Abernathy', 'Whitaker', 'Lockhart', 'Kincaid', 'Tolliver', 'Brennan', 'Mercado', 'Whitfield', 'Dunleavy',
                        'Hollinger'],
               tree: ['Live Oak', 'Sweetgum', 'Magnolia', 'Sycamore', 'Pecan Grove', 'Cedar Grove'] }
    },
    OUTDOOR: {
      patterns: ['the lot behind {street}', 'the boat ramp at {water}', 'the pavilion at {hood} Park', 'the backyard on {street}',
                 'the field behind the {family} Building', 'the empty lot on {street}', 'the picnic shelter at {tree} Park',
                 'the dead end of {street}', 'the clearing off {street}', 'the old drive in lot', 'the gravel lot by {water}',
                 'the ramp under the {street} overpass'],
      banks: { family: ['Pruitt', 'Ladner', 'Godwin', 'Mabry', 'Sellers', 'Strickland', 'Odom', 'Yoder'],
               tree: ['Live Oak', 'Sweetgum', 'Magnolia', 'Sycamore', 'Pecan Grove', 'Cedar Grove', 'Hickory'] }
    }
  },

  label: {
    patterns: ['{obj:cap} Tapes', '{beast:cap} {part:cap} Records', '{hood} Tape Club', '{obj:cap} Cassette Club',
               '{obj:cap} Recordings', '{beast:cap} {part:cap} Tapes', '{obj:cap} Records'],
    banks: { obj: ['Heat Lightning', 'Wet Paint', 'Tin Roof', 'Dock Rope', 'Pine Straw', 'Porch Light', 'Paper Route', 'Fence Post',
                   'Tail Light', 'Rain Gauge', 'Feed Sack', 'Bottle Cap', 'Junk Drawer', 'Ceiling Stain', 'Paper Plate', 'Lawn Chair',
                   'Pay Phone', 'Screen Door'],
             beast: ['Possum', 'Grackle', 'Mud Dauber', 'Cicada', 'Box Turtle', 'Armadillo', 'Barn Owl', 'Crawdad', 'Firefly',
                     'Lovebug', 'Raccoon', 'Whippoorwill', 'Katydid', 'Bullfrog'],
             part: ['Feather', 'Tooth', 'Shell', 'Wing', 'Tail', 'Bone', 'Claw', 'Whisker', 'Nest', 'Egg'] }
  },

  zine: {
    whole: ['Sweat Stains Monthly', 'Copy Machine Prayers', 'Low Pressure System', 'Last Bus Home', 'Toner Low Again',
            'Staple Gun Gazette', 'Folded In Half', 'Free With Admission', 'Holding Pattern Newsletter', 'Carport Report Weekly',
            'Ask At The Door', 'Back Of The Flyer'],
    patterns: ['{color:cap} {zthing:cap} Quarterly', '{zthing:cap} Monthly', 'The {zthing:cap} Newsletter', '{zthing:cap} Gazette',
               '{zthing:cap} Number {number:cap}'],
    banks: { zthing: ['Copy Machine', 'Staple Gun', 'Glue Stick', 'Toner Cartridge', 'Paper Cut', 'Folded Flyer', 'Back Issue',
                      'Hand Stamp', 'Long Box', 'Cut And Paste', 'Mail Slot', 'Rubber Cement', 'Paper Jam', 'Second Draft',
                      'Free Table', 'Merch Table'] }
  },

  agency: {
    patterns: ['{last} & {last2} Routing', '{color:cap} Van Booking', '{last} Tour Support', '{road:cap} Routing Company',
               '{color:cap} Van Tour Booking', '{last} & {last2} Booking'],
    banks: { last: ['Pruitt', 'Castillo', 'Okafor', 'Lindqvist', 'Mendoza', 'Whitaker', 'Pacheco', 'Greer', 'Salgado', 'Kincaid',
                    'Huang', 'Garza', 'Varga', 'Ochoa'],
             road: ['Long Haul', 'Back Road', 'Two Lane', 'Mile Marker', 'Rest Stop', 'Night Drive', 'Shoulder Lane', 'Gas Money'] }
  },

  /* Suggestions on the naming screen. They pass the rule like any generated name. */
  booking: {
    whole: ['Late Bus Booking', 'Three Mile Shows', 'Ask A Punk', 'Done By 10:30', 'Park On The Street', 'Doors At Eight',
            'Nine Mile Nights', 'Carport Weather Shows', 'Second Rain Shows', 'Heat Lightning Shows', 'Back Gate Shows',
            'Folding Chairs And Extension Cords', 'Spare Snare Booking', 'Box Fan Nights', 'Low Ceiling Shows', 'Wet Paint Shows',
            'Cash Box Nights', 'Side Door Shows', 'Hand Stamp Booking', 'Extension Cord Booking'],
    patterns: ['{street} & Friends', '{pair:cap} Shows', '{pair:cap} Booking', '{pair:cap} Nights', 'Shows On {street}'],
    banks: { pair: ['Folding Chair', 'Extension Cord', 'Spare Snare', 'Side Door', 'Hand Stamp', 'Cash Box', 'Back Gate',
                    'Porch Light', 'Wet Paint', 'Late Bus', 'Low Ceiling', 'Second Rain', 'Heat Lightning', 'Short Notice',
                    'Hat Passed', 'Borrowed Amp', 'Gas Money', 'Floor Space'] }
  },

  /* How people describe a sound: three per genre. Read as the comment slot {trendWords} and request slot {genreOwn}. */
  trend: {
    'hardcore': ['the fast stuff', 'the fast weird stuff', 'the stuff where everybody points at the singer'],
    'pop-punk': ['the catchy stuff', 'the stuff the kids sing every word to', 'the fast happy songs about being sad'],
    'emo': ['the slow sad stuff with the really long songs', 'the twinkly stuff', 'the stuff where the singer cries a little'],
    'crust': ['the dirty stuff with the patches', 'the d-beat stuff', 'the stuff that sounds like a truck falling down stairs'],
    'garage': ['the old-sounding stuff', 'the three-chord stuff with the fuzz', 'the stuff that sounds like a basement in 1966'],
    'post-punk': ['the cold stuff with the chorus pedal', 'the gloomy dance stuff', 'the stuff with the bass way up front'],
    'indie': ['the soft stuff', 'the bedroom stuff', 'the quiet stuff you have to stand still for'],
    'metal': ['the slow heavy stuff', 'the sludgy stuff', 'the stuff you feel in your teeth'],
    'ska': ['the horn stuff', 'the upstroke stuff', 'the stuff everybody dances to whether they admit it or not'],
    'folk-punk': ['the banjo stuff', 'the acoustic sing-along stuff', 'the stuff they play on the porch after the show'],
    'noise': ['the short loud stuff', 'the stuff that is over in nine seconds', 'the harsh stuff with the pedal table'],
    'street-punk': ['the oi stuff', 'the sing-along stuff with the boots', 'the stuff the old heads still have the jackets for']
  }
};
