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
    "tulsa county",
    "midbrow",
    "tulsa kids",
    "tulsa people",
    "public radio tulsa",
    "news on 6",
    "news 9",
    "kgou",
    "route 66 news",
    "visit tulsa",
    "downtown tulsa partnership",
    "tulsa council",
    "expo square",
    "chapman green",
    "saint francis tulsa tough",
    "tulsa juneteenth festival",
    "tulsa pride",
    "route 66 centennial",
    "tulsa botanic garden",
    "bmx grand nationals",
    "able commission",
    "tulsa police department",
    "inner dispersal loop",
    "greenwood historic district"
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
      "beyond": "river-bridges",
      "scene": 80
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
    },
    {
      "id": "sand-springs-hood",
      "name": "Sand Springs",
      "route": "town:sand-springs",
      "note": "A working-class river town west of the city with garages and carports. The parents are next door."
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
  },
  "rooms": [
    {
      "id": "kw-bungalow",
      "kind": "HOUSE",
      "hood": "kendall-whittier",
      "cap": 40,
      "curfew": 1320,
      "note": "A living room, a porch and a crawlspace under an old bungalow, with a name of its own. It depends on one or two tired people.",
      "start": true,
      "pressure": 50
    },
    {
      "id": "hill-house",
      "kind": "HOUSE",
      "hood": "crosbie-heights",
      "cap": 50,
      "curfew": 1320,
      "note": "A hillside house with a yard and a basement. The neighbors are close.",
      "pressure": 55
    },
    {
      "id": "sand-garage",
      "kind": "HOUSE",
      "hood": "sand-springs-hood",
      "cap": 30,
      "curfew": 1350,
      "note": "A garage show with the parents next door. Across the river from everything.",
      "pressure": 50
    },
    {
      "id": "north-arts",
      "kind": "DIY",
      "hood": "north-tulsa",
      "cap": 150,
      "curfew": 1380,
      "note": "A community arts space for punk and hardcore with two open rooms for moshing. Money and a thin volunteer crew are the worry.",
      "rent": 80,
      "pressure": 50
    },
    {
      "id": "route-room",
      "kind": "DIY",
      "hood": "west-tulsa",
      "cap": 80,
      "curfew": 1350,
      "note": "A rehearsal space and small room on the old highway with one main room. Shoegaze, punk and emo bills.",
      "rent": 60,
      "pressure": 50
    },
    {
      "id": "pearl-store",
      "kind": "DIY",
      "hood": "pearl",
      "cap": 100,
      "curfew": 1350,
      "note": "A storefront stage that could reopen under a new crew. The district is getting expensive.",
      "rent": 70,
      "pressure": 55
    },
    {
      "id": "fellowship-hall",
      "kind": "HALL",
      "hood": "cherry-street",
      "cap": 200,
      "curfew": 1320,
      "note": "A rented fellowship hall or lodge with a deposit and a curfew from the renter.",
      "deposit": 100
    },
    {
      "id": "kw-bar",
      "kind": "BAR",
      "hood": "kendall-whittier",
      "cap": 150,
      "curfew": 1500,
      "note": "A bar that books punk, noise, hardcore and death metal on one calendar. Welcoming, but nobody under twenty-one gets in.",
      "ages": [
        "A21"
      ]
    },
    {
      "id": "dome-bar",
      "kind": "BAR",
      "hood": "blue-dome",
      "cap": 250,
      "curfew": 1530,
      "note": "A downtown bar that makes its money on drinks and wants a twenty-one crowd.",
      "ages": [
        "A21"
      ]
    },
    {
      "id": "dome-club",
      "kind": "CLUB",
      "hood": "blue-dome",
      "cap": 300,
      "curfew": 1440,
      "note": "A club hall with an 18-plus night, hurt by downtown violence and a landlord who can say no.",
      "ages": [
        "A18"
      ],
      "owner": "TALENT_BUYER"
    },
    {
      "id": "main-street-big",
      "kind": "BIG",
      "hood": "blue-dome",
      "cap": 500,
      "curfew": 1380,
      "note": "The big downtown room, mostly all ages, with metal and hardcore beside country and pop on tour packages.",
      "ages": [
        "ALL"
      ]
    },
    {
      "id": "river-pavilion",
      "kind": "OUTDOOR",
      "hood": "riverside",
      "cap": 120,
      "curfew": 1260,
      "note": "A pavilion by the river parkway for an afternoon show. Heat, storms and park rules decide it.",
      "outdoor": true,
      "ac": false
    }
  ],
  "contacts": [
    "oklahoma-city",
    "fayetteville-ar",
    "springfield-mo",
    "wichita-ks"
  ],
  "calendar": [
    {
      "id": "state-fair-sep",
      "label": "the state fair",
      "tag": "fair",
      "month": 9,
      "weeks": [
        4,
        5
      ],
      "dows": [
        3,
        4,
        5,
        6
      ],
      "can": [
        0.9,
        0.88,
        0.88
      ]
    },
    {
      "id": "state-fair-oct",
      "label": "the state fair",
      "tag": "fair",
      "month": 10,
      "week": 1,
      "dows": [
        3,
        4,
        5,
        6
      ],
      "can": [
        0.9,
        0.88,
        0.88
      ]
    },
    {
      "id": "spring-arts",
      "label": "the spring arts festival",
      "tag": "festival",
      "month": 5,
      "week": 5,
      "dows": [
        4,
        5
      ],
      "can": [
        0.92,
        0.9,
        0.9
      ],
      "hoods": [
        "blue-dome"
      ],
      "elsewhere": [
        1,
        1,
        1
      ]
    },
    {
      "id": "race-weekend",
      "label": "race weekend",
      "tag": "race",
      "month": 6,
      "week": 1,
      "dows": [
        4,
        5,
        6
      ],
      "can": [
        0.9,
        0.88,
        0.88
      ],
      "hoods": [
        "blue-dome"
      ],
      "elsewhere": [
        1,
        1,
        0.97
      ]
    },
    {
      "id": "juneteenth",
      "label": "the Juneteenth festival",
      "tag": "festival",
      "month": 6,
      "week": 3,
      "dows": [
        3,
        4,
        5
      ],
      "can": [
        0.93,
        0.9,
        0.9
      ],
      "hoods": [
        "north-tulsa"
      ],
      "elsewhere": [
        1,
        1,
        1
      ]
    },
    {
      "id": "football-sep",
      "label": "home football",
      "tag": "game",
      "month": 9,
      "weeks": [
        1,
        5
      ],
      "dows": [
        5
      ],
      "can": [
        0.85,
        0.95,
        0.95
      ]
    },
    {
      "id": "football-oct",
      "label": "home football",
      "tag": "game",
      "month": 10,
      "weeks": [
        1,
        5
      ],
      "dows": [
        5
      ],
      "can": [
        0.85,
        0.95,
        0.95
      ]
    },
    {
      "id": "halloween",
      "label": "Halloween weekend",
      "tag": "holiday",
      "month": 10,
      "weeks": [
        4,
        5
      ],
      "dows": [
        4,
        5
      ],
      "can": [
        1.08,
        1.05,
        1
      ]
    },
    {
      "id": "thanksgiving-eve",
      "label": "the night before Thanksgiving",
      "tag": "holiday",
      "month": 11,
      "week": 4,
      "dows": [
        2
      ],
      "can": [
        1.05,
        1.15,
        1.1
      ]
    }
  ],
  "rules": {
    "curfewMinors": {
      "weeknight": 1380,
      "weekend": 1440,
      "inForce": true
    }
  },
  "events": [
    {
      "id": "TULSA_DOWNTOWN_CURFEW",
      "when": "WEEK",
      "tier": "HARD",
      "weight": 2,
      "cooldown": 45,
      "bind": [
        "show"
      ],
      "if": {
        "daysOut": [
          0,
          3
        ]
      },
      "telegraph": "The inner loop has an early curfew for kids under eighteen on weekend nights.",
      "title": "Kids out by nine",
      "body": "Under-eighteen fans have to be out of the downtown inner loop by nine. The big room’s headliner is due at ten.",
      "options": [
        {
          "id": "FLIP",
          "label": "Move the headliner up to a quarter past eight",
          "likely": "The kids hear the best set. The rest is thin.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "lateMin",
              "v": -90
            },
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.92
            }
          ],
          "result": "The headliner went on at eight-fifteen. Kids lined the sidewalk to leave early."
        },
        {
          "id": "ACCEPT",
          "label": "Run it as planned and lose the kids",
          "likely": "The young crowd leaves early.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.75
            }
          ],
          "result": "The kids were out by nine. The headliner played to the grown-ups."
        },
        {
          "id": "MOVE",
          "label": "Move it a day",
          "likely": "Breaks the date. Costs trust with the bands.",
          "effects": [
            {
              "op": "MOVE_SHOW",
              "dayShift": 1,
              "respect": false
            }
          ],
          "result": "You moved it a day. Not everyone could make the new one."
        }
      ]
    },
    {
      "id": "TULSA_JUNETEENTH_PARKING",
      "when": "WEEK",
      "tier": "REAL",
      "weight": 2,
      "cooldown": 40,
      "bind": [
        "show"
      ],
      "if": {
        "daysOut": [
          0,
          4
        ],
        "calendar": "festival",
        "months": [
          6
        ]
      },
      "telegraph": "The Juneteenth festival has the north side blocked off this weekend.",
      "title": "No parking on the north side",
      "body": "The festival has taken every parking space around the arts space on the north side, the same weekend as your show.",
      "options": [
        {
          "id": "MOVE",
          "label": "Move the show up a day",
          "likely": "Breaks the date. A smaller crowd.",
          "effects": [
            {
              "op": "MOVE_SHOW",
              "dayShift": 1,
              "respect": false
            }
          ],
          "result": "You moved it a day. The ones who could come, came."
        },
        {
          "id": "SHUTTLE",
          "label": "Run it and send people to park far away",
          "likely": "Most walk it.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.9
            },
            {
              "op": "SHOW_MOD",
              "key": "lateMin",
              "v": 30
            }
          ],
          "result": "People parked half a mile off and walked in. A late, warm night."
        },
        {
          "id": "ACCEPT",
          "label": "Run it as planned",
          "likely": "The families are at the festival.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.75
            }
          ],
          "result": "The festival kept the crowd. The ones who came stayed to the end."
        }
      ]
    },
    {
      "id": "TULSA_CRAWLSPACE_FLOOD",
      "when": "WEEK",
      "tier": "HARD",
      "weight": 2,
      "cooldown": 40,
      "bind": [
        "show"
      ],
      "if": {
        "daysOut": [
          0,
          3
        ],
        "months": [
          4,
          5,
          6
        ],
        "weather": "RAIN"
      },
      "telegraph": "A spring storm is sitting over the river and the yards in the old neighborhoods are already wet.",
      "title": "The crawlspace floods",
      "body": "A storm has put the yard under the bungalow under an inch of water. The host is out there with a bucket and the crawlspace show is in four hours.",
      "options": [
        {
          "id": "MOVE",
          "label": "Move the bill to the front room",
          "likely": "Smaller and louder.",
          "effects": [
            {
              "op": "MOVE_SHOW",
              "dayShift": 0,
              "toKind": "HOUSE",
              "respect": false
            },
            {
              "op": "SHOW_MOD",
              "key": "capMul",
              "v": 0.6
            }
          ],
          "result": "The bill went in the living room. It was packed and dry."
        },
        {
          "id": "BAIL",
          "label": "Bail it out and run it",
          "likely": "A short night and a muddy floor.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.85
            },
            {
              "op": "SHOW_MOD",
              "key": "lateMin",
              "v": 60
            }
          ],
          "result": "You bailed until eight and opened at nine. Wet shoes and a happy room."
        },
        {
          "id": "MOVE_DAY",
          "label": "Move it a day",
          "likely": "Breaks the date.",
          "effects": [
            {
              "op": "MOVE_SHOW",
              "dayShift": 1,
              "respect": false
            }
          ],
          "result": "You moved it a day, after the yard drained."
        }
      ]
    },
    {
      "id": "TULSA_RACE_CLOSURES",
      "when": "WEEK",
      "tier": "REAL",
      "weight": 2,
      "cooldown": 40,
      "bind": [
        "show"
      ],
      "if": {
        "daysOut": [
          0,
          5
        ],
        "calendar": "race"
      },
      "telegraph": "Race weekend closes the streets around the bars downtown.",
      "title": "The streets are shut",
      "body": "The race has closed the streets around the bars, and your load-in is two blocks past the barricades with a drum kit and a cart.",
      "options": [
        {
          "id": "EARLY",
          "label": "Load in at noon, before the barricades",
          "likely": "Most get in. A long wait.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "lateMin",
              "v": -60
            },
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.92
            }
          ],
          "result": "You were set up by two. The crowd walked in through the closed streets."
        },
        {
          "id": "ACCEPT",
          "label": "Carry it in by hand",
          "likely": "A late start.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "lateMin",
              "v": 60
            },
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.85
            }
          ],
          "result": "You hauled everything on a cart. Doors were an hour late."
        },
        {
          "id": "MOVE",
          "label": "Move it a day",
          "likely": "Breaks the date.",
          "effects": [
            {
              "op": "MOVE_SHOW",
              "dayShift": 1,
              "respect": false
            }
          ],
          "result": "You moved it a day. The barricades were gone and so was half the list."
        }
      ]
    }
  ]
});
