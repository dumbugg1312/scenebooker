SB.Cities.register('tulsa', {
  "v": 1,
  "slug": "tulsa",
  "confidence": {
    "geography": "PARTLY",
    "scene": "PARTLY",
    "names": "UNCHECKED"
  },
  "banned": [
    "university of tulsa",
    "oklahoma state university-tulsa",
    "osu-tulsa",
    "tulsa community college",
    "northeastern state university",
    "tulsa world",
    "tulsa voice",
    "tulsa flyer",
    "urban tulsa weekly",
    "kjrh",
    "ktul",
    "kotv",
    "kwgs",
    "tulsa drillers",
    "tulsa oilers",
    "tulsa golden hurricane",
    "golden hurricane",
    "tulsa shock",
    "tulsa roughnecks",
    "tulsa air and space",
    "tulsa international airport",
    "american airlines maintenance base",
    "williams companies",
    "onecok",
    "bok center",
    "bok tower",
    "tulsa state fair",
    "mayfest",
    "tulsa oktoberfest",
    "tulsa tough",
    "tulsa race massacre",
    "tulsa riverparks",
    "gathering place",
    "oral roberts university",
    "oral roberts",
    "city of faith",
    "philbrook",
    "gilcrease",
    "tulsa ballet",
    "tulsa opera",
    "tulsa police",
    "tulsa county"
  ],
  "blocklist": [
    "tulsa world*",
    "tulsa voice*",
    "urban tulsa*",
    "mayfest*",
    "gathering place park*",
    "oral roberts*",
    "bok center*"
  ],
  "blurb": [
    "Four decades of punk in a church-ridden river city, where rooms open and shut but the house shows never stop.",
    "All-ages is hard to keep and the clubs want you at twenty-one."
  ],
  "hard": "All-ages rooms keep closing and the clubs want you at twenty-one.",
  "region": "the plains",
  "houseType": "BASEMENT",
  "whereGo": [
    {
      "name": "Kansas City",
      "state": "MO",
      "lat": 39.1,
      "lon": -94.58
    },
    {
      "name": "Dallas",
      "state": "TX",
      "lat": 32.78,
      "lon": -96.8
    },
    {
      "name": "St. Louis",
      "state": "MO",
      "lat": 38.63,
      "lon": -90.2
    },
    {
      "name": "Austin",
      "state": "TX",
      "lat": 30.27,
      "lon": -97.74
    }
  ],
  "chokepoints": [
    {
      "id": "river-bridges",
      "name": "the Arkansas River bridges",
      "p": 0.02
    }
  ],
  "zones": [
    {
      "id": "city",
      "kind": "CITY",
      "name": "Tulsa"
    },
    {
      "id": "jenks",
      "kind": "FEEDER",
      "name": "Jenks",
      "minutes": 20,
      "bearing": 190,
      "note": "An affluent south suburb. Kids come in with the family car."
    },
    {
      "id": "owasso",
      "kind": "FEEDER",
      "name": "Owasso",
      "minutes": 20,
      "bearing": 40,
      "note": "A north suburb. Kids drive in."
    },
    {
      "id": "catoosa",
      "kind": "FEEDER",
      "name": "Catoosa",
      "minutes": 20,
      "bearing": 65,
      "note": "An industrial edge."
    },
    {
      "id": "sand-springs",
      "kind": "FEEDER",
      "name": "Sand Springs",
      "minutes": 20,
      "bearing": 285,
      "note": "A working-class river town of garages.",
      "beyond": "river-bridges"
    },
    {
      "id": "broken-arrow",
      "kind": "FEEDER",
      "name": "Broken Arrow",
      "minutes": 25,
      "bearing": 115,
      "note": "A big suburb. Kids ride in on weekends."
    },
    {
      "id": "bixby",
      "kind": "FEEDER",
      "name": "Bixby",
      "minutes": 25,
      "bearing": 165,
      "note": "A south suburb with few bands."
    },
    {
      "id": "sapulpa",
      "kind": "FEEDER",
      "name": "Sapulpa",
      "minutes": 25,
      "bearing": 240,
      "note": "An old Route 66 town with a few bands.",
      "beyond": "river-bridges"
    },
    {
      "id": "claremore",
      "kind": "FEEDER",
      "name": "Claremore",
      "minutes": 30,
      "bearing": 55,
      "note": "A small town. Thin."
    },
    {
      "id": "oklahoma-city",
      "kind": "PEER",
      "name": "Oklahoma City",
      "minutes": 95,
      "bearing": 235,
      "note": "The other main scene. Shows trade both ways.",
      "slug": "oklahoma-city"
    },
    {
      "id": "fayetteville",
      "kind": "PEER",
      "name": "Fayetteville",
      "minutes": 110,
      "bearing": 105,
      "note": "A college-town scene to the east.",
      "slug": "fayetteville-ar"
    },
    {
      "id": "springfield",
      "kind": "PEER",
      "name": "Springfield",
      "minutes": 150,
      "bearing": 70,
      "note": "Up the road in Missouri.",
      "slug": "springfield-mo"
    },
    {
      "id": "wichita",
      "kind": "PEER",
      "name": "Wichita",
      "minutes": 165,
      "bearing": 335,
      "note": "North toward Kansas.",
      "slug": "wichita-ks"
    }
  ],
  "hoods": [
    {
      "id": "blue-dome",
      "name": "Blue Dome and the Brady Arts District",
      "note": "Bar and club blocks and old warehouses turned venues. Mostly 21+ rooms, plus one large downtown all-ages room.",
      "route": "downtown"
    },
    {
      "id": "pearl",
      "name": "the Pearl District",
      "note": "Small storefronts, where an all-ages room has opened before.",
      "route": "old-side"
    },
    {
      "id": "kendall-whittier",
      "name": "Kendall-Whittier",
      "note": "Old bungalows and a few shops east of downtown. Artist renters.",
      "route": "old-side"
    },
    {
      "id": "cherry-street",
      "name": "Cherry Street and Brookside",
      "note": "Older commercial strips. Better-off, with more bars.",
      "route": "old-side"
    },
    {
      "id": "crosbie-heights",
      "name": "Crosbie Heights",
      "note": "A small hill neighborhood west of downtown where a community house has hosted all-ages shows.",
      "route": "old-side"
    },
    {
      "id": "north-tulsa",
      "name": "North Tulsa",
      "note": "North of the tracks. A community arts space for punk and hardcore.",
      "route": "work-side"
    },
    {
      "id": "west-tulsa",
      "name": "West Tulsa and Route 66",
      "note": "Refinery edges, an old motel strip and an alley room.",
      "route": "work-side"
    },
    {
      "id": "riverside",
      "name": "Riverside and Midtown",
      "note": "A river parkway, campus edges and student rentals.",
      "route": "campus"
    }
  ],
  "points": [
    {
      "name": "Kansas City",
      "state": "MO",
      "lat": 39.1,
      "lon": -94.58,
      "pop": 2200000
    },
    {
      "name": "Dallas",
      "state": "TX",
      "lat": 32.78,
      "lon": -96.8,
      "pop": 8400000
    },
    {
      "name": "St. Louis",
      "state": "MO",
      "lat": 38.63,
      "lon": -90.2,
      "pop": 2800000
    }
  ],
  "roads": [
    "I-44",
    "I-244",
    "US 75",
    "US 169",
    "Route 66",
    "the Broken Arrow Expressway"
  ],
  "words": {
    "street": [
      "Peoria Avenue",
      "Admiral Boulevard",
      "Eleventh Street",
      "Cherry Street",
      "Lewis Avenue",
      "Pine Street"
    ],
    "water": [
      "the Arkansas River"
    ],
    "hood": [
      "the Pearl District",
      "Kendall-Whittier",
      "Brookside",
      "Crosbie Heights",
      "Greenwood",
      "Blue Dome"
    ],
    "thing": [
      "crawlspace",
      "steeple",
      "Route 66",
      "derrick",
      "church sign",
      "basement"
    ],
    "weather": [
      "ice storm",
      "tornado warning"
    ]
  }
});
