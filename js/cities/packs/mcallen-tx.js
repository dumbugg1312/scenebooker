SB.Cities.register('mcallen-tx', {
  "v": 1,
  "slug": "mcallen-tx",
  "confidence": {
    "geography": "PARTLY",
    "scene": "PARTLY",
    "names": "UNCHECKED"
  },
  "banned": [
    "university of texas rio grande valley",
    "utrgv",
    "university of texas pan american",
    "utpa",
    "south texas college",
    "the monitor",
    "valley morning star",
    "rio grande valley business times",
    "kgbt",
    "krgv",
    "kvea",
    "mcallen international airport",
    "border patrol",
    "mcallen palms",
    "rgv vipers",
    "rio grande valley toros",
    "rio grande valley fc",
    "rio grande valley whitewings",
    "rio grande valley livestock show",
    "texas citrus fiesta",
    "hidalgo county fair",
    "south texas border fair",
    "bert ogden arena",
    "h-e-b",
    "hidalgo medical center",
    "doctors hospital at renaissance",
    "mcallen independent school district",
    "rgv pride",
    "border fest",
    "hurricane beulah",
    "hurricane dolly",
    "hurricane hanna",
    "mcallen convention center",
    "la plaza mall",
    "quinta mazatlan",
    "hidalgo county",
    "mcallen police",
    "whataburger",
    "reynosa cartel",
    "texas monthly",
    "galax z fair",
    "galax-z fair",
    "fiesta de palmas",
    "palmfest",
    "mcallen holiday parade",
    "concert in the sky",
    "mcallen international carfest",
    "carfest",
    "parade of oranges",
    "mcallen performing arts center",
    "valleycentral",
    "myrgv",
    "trucha rgv",
    "experience mcallen",
    "bentsen palm community park",
    "mission events center",
    "bandsintown",
    "jambase",
    "texas border business",
    "town square publications",
    "grupo frontera"
  ],
  "blocklist": [
    "mcallen monitor*",
    "valley morning star*",
    "la plaza mall*",
    "quinta mazatlan*",
    "border fest*",
    "rgv vipers*",
    "mcallen performing arts center*",
    "galax-z fair*"
  ],
  "blurb": [
    "A hot border metro where hardcore and metal bookers fight gas money and distance.",
    "Touring bands treat the Valley as a long, lonely leg, and shows run late."
  ],
  "hard": "Hours from any other scene, so every show is a gas-money gamble.",
  "region": "the Valley",
  "houseType": "CARPORT",
  "weather": {
    "preset": "GULF"
  },
  "whereGo": [
    {
      "name": "San Antonio",
      "state": "TX",
      "lat": 29.42,
      "lon": -98.49
    },
    {
      "name": "Austin",
      "state": "TX",
      "lat": 30.27,
      "lon": -97.74
    },
    {
      "name": "Houston",
      "state": "TX",
      "lat": 29.76,
      "lon": -95.37
    }
  ],
  "zones": [
    {
      "id": "city",
      "kind": "CITY",
      "name": "McAllen"
    },
    {
      "id": "pharr",
      "kind": "FEEDER",
      "name": "Pharr",
      "minutes": 10,
      "bearing": 85,
      "note": "Close enough to count as the same city."
    },
    {
      "id": "edinburg",
      "kind": "FEEDER",
      "name": "Edinburg",
      "minutes": 15,
      "bearing": 355,
      "note": "The university town. Students and kids come in and out, and bands live there too.",
      "scene": 400,
      "rooms": [
        {
          "id": "edinburg-hall",
          "kind": "HALL",
          "hood": "edinburg-town",
          "zone": "edinburg",
          "cap": 200,
          "ages": [
            "ALL"
          ],
          "curfew": 1350,
          "ac": true,
          "note": "A rented student or church hall north of town. Easy to book, with an early curfew from whoever holds the lease."
        }
      ]
    },
    {
      "id": "mission",
      "kind": "FEEDER",
      "name": "Mission",
      "minutes": 15,
      "bearing": 290,
      "note": "Families and a younger crowd that drives in.",
      "scene": 150,
      "rooms": [
        {
          "id": "mission-grove",
          "kind": "OUTDOOR",
          "hood": "mission-town",
          "zone": "mission",
          "cap": 100,
          "ages": [
            "ALL"
          ],
          "curfew": 1320,
          "outdoor": true,
          "note": "A park pavilion or a grove yard. Free, hot in summer, and over when the neighbors call."
        }
      ]
    },
    {
      "id": "weslaco",
      "kind": "FEEDER",
      "name": "Weslaco",
      "minutes": 20,
      "bearing": 100,
      "note": "The east side, where a few bands and DIY promoters live."
    },
    {
      "id": "harlingen",
      "kind": "FEEDER",
      "name": "Harlingen",
      "minutes": 35,
      "bearing": 60,
      "note": "The middle of the Valley. Shows spill both ways."
    },
    {
      "id": "san-benito",
      "kind": "FEEDER",
      "name": "San Benito",
      "minutes": 40,
      "bearing": 85,
      "note": "Small. Kids ride in with older friends."
    },
    {
      "id": "rio-grande-city",
      "kind": "FEEDER",
      "name": "Rio Grande City",
      "minutes": 45,
      "bearing": 275,
      "note": "Upriver. Small towns and a few bands."
    },
    {
      "id": "brownsville",
      "kind": "PEER",
      "name": "Brownsville",
      "minutes": 60,
      "bearing": 115,
      "note": "The other end of the Valley. Shows trade back and forth.",
      "slug": "brownsville-tx"
    },
    {
      "id": "laredo",
      "kind": "PEER",
      "name": "Laredo",
      "minutes": 150,
      "bearing": 305,
      "note": "The other border city, with a similar thin scene.",
      "slug": "laredo-tx"
    },
    {
      "id": "corpus-christi",
      "kind": "PEER",
      "name": "Corpus Christi",
      "minutes": 165,
      "bearing": 20,
      "note": "The nearest coastal scene to the north.",
      "slug": "corpus-christi-tx"
    }
  ],
  "hoods": [
    {
      "id": "downtown",
      "name": "downtown McAllen and 17th Street",
      "note": "The bar strip. Mostly 21+ rooms, a few that open to younger crowds on off nights.",
      "route": "downtown"
    },
    {
      "id": "old-mcallen",
      "name": "old McAllen",
      "note": "Older single-story houses with big yards and carports. The likeliest backyard shows.",
      "route": "old-side"
    },
    {
      "id": "mission-hood",
      "name": "Mission",
      "note": "Older neighborhoods and family houses west of town.",
      "route": "old-side"
    },
    {
      "id": "alamo-san-juan",
      "name": "Alamo and San Juan",
      "note": "Working-class towns east, with small lots and long driveways.",
      "route": "old-side"
    },
    {
      "id": "southside",
      "name": "the Expressway side",
      "note": "Warehouses, produce sheds and strip malls. Rehearsal units and storefront rooms.",
      "route": "work-side"
    },
    {
      "id": "pharr-hood",
      "name": "Pharr",
      "note": "A bridge-side trade and trucking town. Cheap and industrial.",
      "route": "work-side"
    },
    {
      "id": "hidalgo",
      "name": "Hidalgo",
      "note": "A small bridge town on the river, flat and close to the border.",
      "route": "work-side"
    },
    {
      "id": "edinburg-hood",
      "name": "Edinburg",
      "note": "The university town north of the city. Student apartments and rented houses.",
      "route": "campus"
    },
    {
      "id": "edinburg-town",
      "name": "Edinburg",
      "route": "town:edinburg",
      "note": "The university town north of McAllen. Student halls, church halls and rented rooms, easy to book and early to close."
    },
    {
      "id": "mission-town",
      "name": "Mission",
      "route": "town:mission",
      "note": "Citrus groves, parks and family yards west of McAllen. Free and hot, and over when the neighbors call."
    }
  ],
  "points": [
    {
      "name": "Monterrey",
      "state": "NL",
      "lat": 25.69,
      "lon": -100.32,
      "pop": 1100000
    },
    {
      "name": "San Antonio",
      "state": "TX",
      "lat": 29.42,
      "lon": -98.49,
      "pop": 2800000
    },
    {
      "name": "Reynosa",
      "state": "TM",
      "lat": 26.08,
      "lon": -98.28,
      "pop": 700000
    }
  ],
  "roads": [
    "US 83",
    "I-2",
    "I-69C",
    "US 281",
    "I-69E"
  ],
  "words": {
    "street": [
      "10th Street",
      "23rd Street",
      "Nolana",
      "Ware Road",
      "the Expressway"
    ],
    "water": [
      "the Rio Grande",
      "the river"
    ],
    "hood": [
      "Pharr",
      "Edinburg",
      "Mission",
      "Hidalgo",
      "Alamo",
      "San Juan",
      "Weslaco"
    ],
    "thing": [
      "carport",
      "tortilleria",
      "expressway",
      "aguas frescas",
      "pan dulce",
      "palm tree"
    ],
    "weather": [
      "heat",
      "humidity",
      "storm season"
    ]
  },
  "events": [
    {
      "id": "MCALLEN_TX_AC_DIES",
      "when": "WEEK",
      "tier": "REAL",
      "weight": 2,
      "cooldown": 45,
      "bind": [
        "show"
      ],
      "if": {
        "daysOut": [
          0,
          4
        ],
        "months": [
          5,
          6,
          7,
          8,
          9,
          10
        ]
      },
      "telegraph": "It is ninety-five at night and the van has been making a noise.",
      "title": "The air conditioner dies on the road",
      "body": "The van's air conditioner quits on the way to the show, and the bands pull over to fix it in the heat. Gas money is the whole guarantee, and it just got smaller.",
      "options": [
        {
          "id": "MOVE",
          "label": "Move it a day",
          "likely": "Breaks the date, which costs you trust with everyone.",
          "effects": [
            {
              "op": "MOVE_SHOW",
              "dayShift": 1,
              "respect": false
            }
          ],
          "result": "You moved it a day, and the ones who could come, came."
        },
        {
          "id": "EARLY",
          "label": "Push doors an hour later and wait for them",
          "likely": "Most make it, but the night starts thin.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.9
            },
            {
              "op": "SHOW_MOD",
              "key": "lateMin",
              "v": 60
            }
          ],
          "result": "Doors were an hour late, and they came in drenched and played anyway."
        },
        {
          "id": "ACCEPT",
          "label": "Run it as planned and take what you get",
          "likely": "A lot of people stay home.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.7
            }
          ],
          "result": "They made it halfway and called it, and the bill got shorter."
        }
      ]
    },
    {
      "id": "MCALLEN_TX_PARADE_CLOSURE",
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
        "calendar": "parade",
        "months": [
          12
        ]
      },
      "telegraph": "The lit parade is Saturday and the main streets downtown close at five.",
      "title": "The parade shuts the street",
      "body": "The holiday parade has closed the main streets, and the van cannot reach the load-in door of the movie house. The crowd is on the sidewalk and not in your room.",
      "options": [
        {
          "id": "EARLY",
          "label": "Load in before the barricades go up",
          "likely": "It's a long afternoon and a short night.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "lateMin",
              "v": -90
            },
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.9
            }
          ],
          "result": "You loaded in at three and sat in the room while the parade went by."
        },
        {
          "id": "ACCEPT",
          "label": "Run it as planned and take what you get",
          "likely": "The crowd is at the parade.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.75
            }
          ],
          "result": "The parade took everyone, and the ones who found a way around the barricades stayed late."
        },
        {
          "id": "MOVE",
          "label": "Move it a day",
          "likely": "Breaks the date, which costs you trust with everyone.",
          "effects": [
            {
              "op": "MOVE_SHOW",
              "dayShift": 1,
              "respect": false
            }
          ],
          "result": "You moved it a day, and the ones who could come, came."
        }
      ]
    },
    {
      "id": "MCALLEN_TX_FIESTA_WEEKEND",
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
          10
        ]
      },
      "telegraph": "The convention-center music weekend takes the downtown, and the all-ages storefront has a stage booked against it.",
      "title": "The big weekend eats the crowd",
      "body": "A free music weekend across town has the whole downtown crowd, the parking and the sound. Your stage is ready and there is nobody in front of it.",
      "options": [
        {
          "id": "LATE",
          "label": "Push doors back until the big stage ends",
          "likely": "The crowd that wants more comes after eleven.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "lateMin",
              "v": 75
            },
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.9
            }
          ],
          "result": "Doors were at midnight, and the people with ringing ears came in for the loud part."
        },
        {
          "id": "ACCEPT",
          "label": "Run it as planned",
          "likely": "A small, loyal room.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.7
            }
          ],
          "result": "It was a stage and a few dozen people, and the ones who stayed knew every word."
        },
        {
          "id": "MOVE",
          "label": "Move it a day",
          "likely": "Breaks the date, which costs you trust with everyone.",
          "effects": [
            {
              "op": "MOVE_SHOW",
              "dayShift": 1,
              "respect": false
            }
          ],
          "result": "You moved it a day, and the ones who could come, came."
        }
      ]
    },
    {
      "id": "MCALLEN_TX_BACKYARD_CALL",
      "when": "WEEK",
      "tier": "REAL",
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
      "telegraph": "The extension cord runs out of a carport and a neighbor is on the porch with a phone.",
      "title": "The neighbor calls at ten",
      "body": "A backyard show in old McAllen. At ten a neighbor calls, the extension cord runs from the carport, and the drummer is in a lawn chair.",
      "options": [
        {
          "id": "UNPLUG",
          "label": "Unplug and play acoustic until the last song",
          "likely": "It's smaller and warmer, and nobody gets a ticket.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.9
            },
            {
              "op": "SHOW_MOD",
              "key": "qAdd",
              "v": -1
            }
          ],
          "result": "The amps went quiet, and the drummer played a cardboard box."
        },
        {
          "id": "MOVE_IT",
          "label": "Move the whole bill to the storefront",
          "likely": "It's packed in and loud, and it costs a little at the door.",
          "effects": [
            {
              "op": "MOVE_SHOW",
              "dayShift": 0,
              "respect": false
            },
            {
              "op": "MONEY",
              "amount": -25
            }
          ],
          "result": "A storefront took the bill, and the tile floor made it louder than the yard."
        },
        {
          "id": "ACCEPT",
          "label": "Play through and see what happens",
          "likely": "It's a quick end to the night.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.75
            }
          ],
          "result": "A car pulled up at ten past, and that was the show."
        }
      ]
    }
  ],
  "rooms": [
    {
      "id": "old-mcallen-carport",
      "kind": "HOUSE",
      "hood": "old-mcallen",
      "cap": 50,
      "ages": [
        "ALL"
      ],
      "curfew": 1380,
      "ac": false,
      "outdoor": true,
      "pressure": 50,
      "start": true,
      "note": "A carport and a backyard in an old single-story block. No basements here: a slab, a driveway and an extension cord."
    },
    {
      "id": "arts-storefront",
      "kind": "DIY",
      "hood": "downtown",
      "cap": 150,
      "ages": [
        "ALL"
      ],
      "curfew": 1470,
      "ac": true,
      "sketch": 35,
      "pressure": 50,
      "note": "A cultural-arts storefront with a tiled floor and a back patio, home of the alternative and punk nights. It lives on bar sales and a few bookers."
    },
    {
      "id": "strip-bar",
      "kind": "BAR",
      "hood": "downtown",
      "cap": 120,
      "ages": [
        "A21"
      ],
      "curfew": 1500,
      "ac": true,
      "note": "A small bar with a stage on the strip, booking post-punk and alternative nights. The weeknights are thin."
    },
    {
      "id": "movie-house",
      "kind": "CLUB",
      "hood": "downtown",
      "cap": 300,
      "ages": [
        "ALL",
        "A18"
      ],
      "curfew": 1440,
      "ac": true,
      "note": "A restored old movie house that takes touring packages and local-booker nights. The rent is the pressure."
    },
    {
      "id": "expressway-club",
      "kind": "CLUB",
      "hood": "southside",
      "cap": 250,
      "ages": [
        "A18"
      ],
      "curfew": 1500,
      "ac": true,
      "note": "A club that runs thrash, doom and hardcore nights, eighteen and up, with bands from both sides of the river. It runs late."
    },
    {
      "id": "shed-unit",
      "kind": "DIY",
      "hood": "southside",
      "cap": 80,
      "ages": [
        "ALL"
      ],
      "curfew": 1410,
      "ac": false,
      "sketch": 45,
      "pressure": 55,
      "note": "A rehearsal unit in a produce-shed strip. Cheap and loud, with air conditioning that is mostly a rumor."
    },
    {
      "id": "movie-house-big",
      "kind": "BIG",
      "hood": "downtown",
      "cap": 700,
      "ages": [
        "ALL"
      ],
      "curfew": 1380,
      "ac": true,
      "note": "The movie house in its big configuration, for the one or two nationals a year."
    }
  ],
  "contacts": [
    "brownsville-tx",
    "laredo-tx",
    "corpus-christi-tx",
    "san-antonio"
  ],
  "calendar": [
    {
      "id": "citrus-festival",
      "label": "the citrus festival",
      "tag": "festival",
      "month": 1,
      "weeks": [
        4,
        5
      ],
      "dows": [
        3,
        4,
        5
      ],
      "can": [
        0.85,
        0.88,
        0.9
      ],
      "hoods": [
        "mission-town"
      ],
      "elsewhere": [
        0.97,
        0.97,
        0.97
      ]
    },
    {
      "id": "fourth-fireworks",
      "label": "the Fourth of July fireworks",
      "tag": "holiday",
      "month": 7,
      "week": 1,
      "dows": [
        4,
        5
      ],
      "can": [
        0.88,
        0.9,
        0.9
      ],
      "hoods": [
        "downtown"
      ],
      "elsewhere": [
        1,
        1,
        1
      ]
    },
    {
      "id": "palm-fiesta",
      "label": "the palm fiesta weekend",
      "tag": "festival",
      "month": 10,
      "week": 3,
      "dows": [
        4,
        5,
        6
      ],
      "can": [
        0.85,
        0.88,
        0.9
      ],
      "hoods": [
        "downtown"
      ],
      "elsewhere": [
        0.97,
        0.97,
        0.97
      ]
    },
    {
      "id": "holiday-parade",
      "label": "the holiday parade",
      "tag": "parade",
      "month": 12,
      "week": 1,
      "dows": [
        5
      ],
      "can": [
        0.85,
        0.88,
        0.9
      ],
      "hoods": [
        "downtown"
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
        4
      ],
      "dows": [
        4
      ],
      "can": [
        0.88,
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
        4
      ],
      "dows": [
        4
      ],
      "can": [
        0.88,
        0.95,
        0.95
      ]
    },
    {
      "id": "football-nov",
      "label": "home football",
      "tag": "game",
      "month": 11,
      "weeks": [
        1,
        4
      ],
      "dows": [
        4
      ],
      "can": [
        0.88,
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
      "weeknight": 1350,
      "weekend": 1440,
      "inForce": false
    }
  }
});
