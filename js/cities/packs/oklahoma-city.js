SB.Cities.register('oklahoma-city', {
  "v": 1,
  "slug": "oklahoma-city",
  "confidence": {
    "geography": "PARTLY",
    "scene": "PARTLY",
    "names": "UNCHECKED"
  },
  "banned": [
    "university of oklahoma",
    "oklahoma state university",
    "oklahoma city university",
    "university of central oklahoma",
    "uco",
    "oklahoma city community college",
    "the oklahoman",
    "oklahoma gazette",
    "free press okc",
    "okc friday",
    "koco",
    "kfor",
    "kwtv",
    "kocm",
    "oklahoma city thunder",
    "oklahoma city dodgers",
    "oklahoma city barons",
    "oklahoma sooners",
    "sooners",
    "oklahoma state cowboys",
    "tinker air force base",
    "vance air force base",
    "fort sill",
    "will rogers world airport",
    "devon energy",
    "chesapeake energy",
    "continental resources",
    "oklahoma state fair",
    "red earth festival",
    "paseo arts festival",
    "oklahoma city memorial marathon",
    "oklahoma city memorial",
    "scissortail park",
    "cox convention center",
    "paycom center",
    "chesapeake arena",
    "tornado of 1999",
    "may 3, 2013 moore tornado",
    "everything is not ok",
    "bricktown ballpark",
    "state capitol",
    "oklahoma city police",
    "oklahoma county",
    "braum's",
    "sonic drive-in",
    "myriad gardens",
    "freepressokc",
    "405 magazine",
    "metrofamily",
    "news9",
    "news 9",
    "okc fox",
    "kgou",
    "oklahoma today",
    "oklahoma farm report",
    "visit okc",
    "visitokc",
    "welcome to bricktown",
    "oklahoma history center",
    "oklahoma farm bureau",
    "able commission",
    "juneteenth on the east",
    "pride on 39th",
    "pride on 39th street",
    "oklahoma city zoo",
    "okc philharmonic",
    "oklahoma city philharmonic",
    "oklahoma city fair park",
    "state fair park",
    "festival of the arts",
    "oklahoma city festival of the arts",
    "pawnee bill",
    "oklahoma free fall",
    "downtown okc",
    "oklahoma sooners football"
  ],
  "blocklist": [
    "the oklahoman*",
    "oklahoma gazette*",
    "free press okc*",
    "everything is not ok*",
    "red earth festival*",
    "scissortail*"
  ],
  "blurb": [
    "A sprawling plains city where DIY runs on collective spaces, karate schools and garages.",
    "The crowd is small, mixed and freaky, and the tornado sirens test on Saturday noon."
  ],
  "hard": "Sprawl, tornado warnings, and a crowd of a few dozen.",
  "region": "the plains",
  "houseType": "GARAGE",
  "whereGo": [
    {
      "name": "Dallas",
      "state": "TX",
      "lat": 32.78,
      "lon": -96.8
    },
    {
      "name": "Kansas City",
      "state": "MO",
      "lat": 39.1,
      "lon": -94.58
    },
    {
      "name": "Austin",
      "state": "TX",
      "lat": 30.27,
      "lon": -97.74
    }
  ],
  "tilt": [
    {
      "fan": "folk-punk",
      "band": "crust",
      "d": 0.08,
      "reason": "A folk-punk house venue and a crust scene stand out."
    }
  ],
  "zones": [
    {
      "id": "city",
      "kind": "CITY",
      "name": "Oklahoma City"
    },
    {
      "id": "midwest-city",
      "kind": "FEEDER",
      "name": "Midwest City",
      "minutes": 15,
      "bearing": 95,
      "note": "A military-family suburb."
    },
    {
      "id": "moore",
      "kind": "FEEDER",
      "name": "Moore",
      "minutes": 20,
      "bearing": 185,
      "note": "A working-class suburb. Kids with older friends driving.",
      "scene": 80
    },
    {
      "id": "yukon",
      "kind": "FEEDER",
      "name": "Yukon",
      "minutes": 20,
      "bearing": 265,
      "note": "A small town west with a thin scene."
    },
    {
      "id": "edmond",
      "kind": "FEEDER",
      "name": "Edmond",
      "minutes": 25,
      "bearing": 10,
      "note": "A big suburb of kids. The first house shows in the metro were out here.",
      "bands": 3,
      "scene": 80
    },
    {
      "id": "norman",
      "kind": "FEEDER",
      "name": "Norman",
      "minutes": 25,
      "bearing": 185,
      "note": "Students and house venues that come and go.",
      "bands": 3,
      "scene": 80
    },
    {
      "id": "mustang",
      "kind": "FEEDER",
      "name": "Mustang",
      "minutes": 25,
      "bearing": 230,
      "note": "Kids come in."
    },
    {
      "id": "guthrie",
      "kind": "FEEDER",
      "name": "Guthrie",
      "minutes": 40,
      "bearing": 5,
      "note": "A small old town north."
    },
    {
      "id": "shawnee",
      "kind": "FEEDER",
      "name": "Shawnee",
      "minutes": 45,
      "bearing": 105,
      "note": "A small town with a few bands."
    },
    {
      "id": "stillwater",
      "kind": "FEEDER",
      "name": "Stillwater",
      "minutes": 60,
      "bearing": 25,
      "note": "A university town with a student crowd."
    },
    {
      "id": "tulsa",
      "kind": "PEER",
      "name": "Tulsa",
      "minutes": 90,
      "bearing": 65,
      "note": "The other scene in the state. They trade shows.",
      "slug": "tulsa"
    },
    {
      "id": "lawton",
      "kind": "PEER",
      "name": "Lawton",
      "minutes": 85,
      "bearing": 215,
      "note": "A military town with a small scene.",
      "scene": 500
    },
    {
      "id": "wichita",
      "kind": "PEER",
      "name": "Wichita",
      "minutes": 160,
      "bearing": 5,
      "note": "North on I-35.",
      "slug": "wichita-ks"
    }
  ],
  "hoods": [
    {
      "id": "plaza",
      "name": "the Plaza District",
      "note": "Old storefronts turned arts and music blocks. Small rooms and alleys, an art-minded crowd.",
      "route": "old-side"
    },
    {
      "id": "paseo",
      "name": "the Paseo",
      "note": "A Spanish-revival arts strip and old houses. Artists and renters.",
      "route": "old-side"
    },
    {
      "id": "northwest",
      "name": "Northwest OKC",
      "note": "Rented houses and small bungalows with a house-venue tradition.",
      "route": "old-side"
    },
    {
      "id": "midtown",
      "name": "Midtown and Automobile Alley",
      "note": "Bars, restaurants and converted garages. Mostly 21+.",
      "route": "downtown"
    },
    {
      "id": "bricktown",
      "name": "Bricktown",
      "note": "The big tourist entertainment strip with the canal. A different crowd from punk.",
      "route": "downtown"
    },
    {
      "id": "south-side",
      "name": "the south side",
      "note": "Cheap warehouse and shop buildings. Shop and garage shows.",
      "route": "work-side"
    },
    {
      "id": "moore-mwc",
      "name": "Moore and Midwest City",
      "note": "Working-class suburbs with military families and cheap garages.",
      "route": "town:moore"
    },
    {
      "id": "edmond-hood",
      "name": "Edmond",
      "note": "A big northern suburb of kids and rented houses.",
      "route": "town:edmond"
    },
    {
      "id": "norman-hood",
      "name": "Norman",
      "note": "A college town south of the city. House venues come and go.",
      "route": "town:norman"
    }
  ],
  "points": [
    {
      "name": "Dallas",
      "state": "TX",
      "lat": 32.78,
      "lon": -96.8,
      "pop": 8400000
    },
    {
      "name": "Kansas City",
      "state": "MO",
      "lat": 39.1,
      "lon": -94.58,
      "pop": 2200000
    },
    {
      "name": "Amarillo",
      "state": "TX",
      "lat": 35.2,
      "lon": -101.83,
      "pop": 276000
    }
  ],
  "roads": [
    "I-35",
    "I-40",
    "I-44",
    "the Kilpatrick Turnpike",
    "Broadway Extension"
  ],
  "words": {
    "street": [
      "NW 23rd Street",
      "Western Avenue",
      "Classen Boulevard",
      "Penn Avenue",
      "May Avenue",
      "Reno Avenue",
      "SW 29th Street"
    ],
    "water": [
      "Lake Hefner",
      "the Oklahoma River",
      "the North Canadian"
    ],
    "hood": [
      "the Plaza District",
      "the Paseo",
      "Capitol Hill",
      "Midtown",
      "Automobile Alley",
      "Edmond",
      "Norman"
    ],
    "thing": [
      "tornado siren",
      "brick ranch",
      "strip mall",
      "red dirt",
      "storm cellar",
      "karate mat"
    ],
    "weather": [
      "tornado warning",
      "ice storm",
      "wind"
    ]
  },
  "events": [
    {
      "id": "OKLAHOMA_CITY_TORNADO_WARNING",
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
        ],
        "months": [
          4,
          5,
          6
        ]
      },
      "telegraph": "The sirens are going to be busy this week. Spring storms are lined up on the radar.",
      "title": "Tornado warning at doors",
      "body": "A tornado warning has the whole metro in the hallway. The sirens are going and half the room is in somebody's storm cellar. Nobody knows whether the set will happen.",
      "options": [
        {
          "id": "MOVE",
          "label": "Move it a day",
          "likely": "Breaks the date. Costs trust with everyone.",
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
          "id": "EARLY",
          "label": "Start early and finish before the line gets here",
          "likely": "Most make it. The night starts thin.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.9
            },
            {
              "op": "SHOW_MOD",
              "key": "lateMin",
              "v": -60
            }
          ],
          "result": "Doors early. You got through the set with the sirens warming up outside."
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
          "result": "The warning lasted two hours. Most people went home to their own cellars."
        }
      ]
    },
    {
      "id": "OKLAHOMA_CITY_NORMAN_CITATION",
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
          4
        ]
      },
      "telegraph": "A neighbor in Norman has been counting the cars outside the house, and the city has a counting rule of its own.",
      "title": "The third citation",
      "body": "Your show runs long at the house in Norman, a neighbor calls it in, and it is the third citation this year. The city can shut off the water to a house that gets three.",
      "options": [
        {
          "id": "STOP",
          "label": "Stop at ten and send everyone home",
          "likely": "The host is safe. A short night.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.85
            },
            {
              "op": "SHOW_MOD",
              "key": "lateMin",
              "v": -90
            }
          ],
          "result": "You pulled the plug at ten. The host kept the water on, and the crowd grumbled home."
        },
        {
          "id": "MOVE",
          "label": "Move the bill to a bigger room",
          "likely": "Costs trust with the host.",
          "effects": [
            {
              "op": "MOVE_SHOW",
              "dayShift": 0,
              "toKind": "DIY",
              "respect": false
            },
            {
              "op": "SHOW_MOD",
              "key": "capMul",
              "v": 1.2
            }
          ],
          "result": "A building on the south side took the bill. The house kept its water."
        },
        {
          "id": "ACCEPT",
          "label": "Run it and hope",
          "likely": "If it goes long again, the host pays.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.9
            },
            {
              "op": "MONEY",
              "amount": -40
            }
          ],
          "result": "It went long again. The host paid the fine, and you paid half."
        }
      ]
    },
    {
      "id": "OKLAHOMA_CITY_FAIR_TRAFFIC",
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
        "calendar": "fair"
      },
      "telegraph": "The state fair opens this week and the northwest is already one long line of brake lights.",
      "title": "The fair has the road",
      "body": "Fair weekend puts every family in the metro on the road to the fairgrounds, and the van is stuck in it on the way to load-in.",
      "options": [
        {
          "id": "LATE",
          "label": "Push doors back for the van",
          "likely": "The crowd waits. A late start.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "lateMin",
              "v": 60
            },
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.95
            }
          ],
          "result": "Doors an hour late. The van finally crawled in with ten minutes to spare."
        },
        {
          "id": "EARLY",
          "label": "Start early and finish ahead of it",
          "likely": "Most make it. The night starts thin.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.9
            },
            {
              "op": "SHOW_MOD",
              "key": "lateMin",
              "v": -60
            }
          ],
          "result": "Doors early, the van took the back roads and made it."
        },
        {
          "id": "ACCEPT",
          "label": "Run it as planned",
          "likely": "Kids are at the midway.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.8
            }
          ],
          "result": "The kids were on the midway. The regulars came."
        }
      ]
    },
    {
      "id": "OKLAHOMA_CITY_CANAL_CURFEW",
      "when": "WEEK",
      "tier": "REAL",
      "weight": 1,
      "cooldown": 50,
      "bind": [
        "show"
      ],
      "if": {
        "daysOut": [
          0,
          3
        ],
        "months": [
          5,
          6,
          7,
          8,
          9
        ]
      },
      "telegraph": "The strip by the canal has an early curfew for kids under eighteen, and the bill is late.",
      "title": "Out by nine",
      "body": "The outdoor show by the canal hits the nine o’clock curfew for unaccompanied minors. The kids have to leave before the headliner.",
      "options": [
        {
          "id": "SWAP",
          "label": "Flip the bill so the headliner goes first",
          "likely": "The kids hear the best set. The rest is thin.",
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
          "result": "The headliner played at eight to a full crowd. After nine it was a quiet patio."
        },
        {
          "id": "EARLY",
          "label": "Start at five",
          "likely": "Most make it. A long, hot afternoon.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "lateMin",
              "v": -120
            },
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.85
            }
          ],
          "result": "Doors at five. The kids heard everyone and were gone by nine."
        },
        {
          "id": "ACCEPT",
          "label": "Run it as planned and lose the kids",
          "likely": "The early crowd leaves.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.7
            }
          ],
          "result": "The kids were told to leave and did. The headliner played to the bar crowd."
        }
      ]
    }
  ],
  "rooms": [
    {
      "id": "nw-bungalow",
      "kind": "HOUSE",
      "hood": "northwest",
      "cap": 40,
      "curfew": 1350,
      "note": "A rented bungalow with a living-room stage and a back patio. The landlord and the neighbors are the only real threat.",
      "start": true,
      "pressure": 50
    },
    {
      "id": "edmond-garage",
      "kind": "HOUSE",
      "hood": "edmond-hood",
      "cap": 30,
      "curfew": 1320,
      "note": "A garage set on a small suburban lot for kids with a driver. The neighbors and the street rules are close.",
      "pressure": 55
    },
    {
      "id": "norman-living",
      "kind": "HOUSE",
      "hood": "norman-hood",
      "cap": 60,
      "curfew": 1380,
      "note": "A student-run living space with an ID check and wristbands. One house here ran to 3:30 and lost its lease.",
      "pressure": 60
    },
    {
      "id": "opry-space",
      "kind": "DIY",
      "hood": "south-side",
      "cap": 120,
      "curfew": 1380,
      "note": "A cheap old building on the south side that bands rent by the night. Rent and the fire marshal are the worry.",
      "rent": 70,
      "pressure": 55
    },
    {
      "id": "plaza-patio",
      "kind": "DIY",
      "hood": "plaza",
      "cap": 60,
      "curfew": 1380,
      "note": "A small all-ages room with a back patio and a punk streak. One bad neighbor from trouble.",
      "rent": 50,
      "pressure": 55
    },
    {
      "id": "norman-coop",
      "kind": "DIY",
      "hood": "norman-hood",
      "cap": 80,
      "curfew": 1380,
      "note": "A music space that shut for most of a year and came back run by young musicians. Money is the worry.",
      "rent": 50,
      "pressure": 50
    },
    {
      "id": "karate-school",
      "kind": "SHOP",
      "hood": "south-side",
      "cap": 50,
      "curfew": 1320,
      "note": "A karate school with the mats rolled to the wall. About seventy-five kids on and off, and a landlord who worries.",
      "pressure": 50
    },
    {
      "id": "rented-hall",
      "kind": "HALL",
      "hood": "moore-mwc",
      "cap": 150,
      "curfew": 1320,
      "note": "A rented church or fraternal hall with a deposit and a rules sheet. All ages, out by ten.",
      "deposit": 100
    },
    {
      "id": "midtown-bar",
      "kind": "BAR",
      "hood": "midtown",
      "cap": 100,
      "curfew": 1500,
      "note": "A stage in the back of a bar. Twenty-one and over, and a late start.",
      "ages": [
        "A21"
      ]
    },
    {
      "id": "nw-hall",
      "kind": "CLUB",
      "hood": "northwest",
      "cap": 300,
      "curfew": 1410,
      "note": "A mid-size pro-level hall that is all ages unless it says otherwise. It leans to guaranteed draws over locals.",
      "ages": [
        "ALL"
      ],
      "owner": "TALENT_BUYER",
      "needs": [
        "FULL_BILL"
      ]
    },
    {
      "id": "western-club",
      "kind": "CLUB",
      "hood": "northwest",
      "cap": 250,
      "curfew": 1410,
      "note": "The all-ages workhorse for punk, metal and hardcore, with a packed calendar. It stayed strong while the warehouses closed.",
      "ages": [
        "ALL"
      ],
      "owner": "TALENT_BUYER"
    },
    {
      "id": "central-dive",
      "kind": "CLUB",
      "hood": "midtown",
      "cap": 350,
      "curfew": 1470,
      "note": "A dive where the hardcore vets drink, with crowds from a hundred to five hundred. Older heads and heavy touring bills.",
      "ages": [
        "A18"
      ],
      "owner": "TALENT_BUYER"
    },
    {
      "id": "plaza-theater",
      "kind": "BIG",
      "hood": "plaza",
      "cap": 900,
      "curfew": 1380,
      "note": "A bigger theater for touring metal and hardcore. Costs push the bills toward safe draws.",
      "ages": [
        "ALL"
      ]
    },
    {
      "id": "canal-stage",
      "kind": "OUTDOOR",
      "hood": "bricktown",
      "cap": 500,
      "curfew": 1260,
      "note": "An outdoor stage by the canal. Mostly tourists, and the minor curfew starts early.",
      "outdoor": true,
      "ac": false
    }
  ],
  "contacts": [
    "tulsa",
    "wichita-ks",
    "dallas",
    "kansas-city"
  ],
  "calendar": [
    {
      "id": "state-fair",
      "label": "the state fair",
      "tag": "fair",
      "month": 9,
      "weeks": [
        3,
        4
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
      "id": "pride-strip",
      "label": "the Pride weekend",
      "tag": "festival",
      "month": 6,
      "week": 1,
      "dows": [
        4,
        5,
        6
      ],
      "can": [
        0.92,
        0.9,
        0.9
      ],
      "hoods": [
        "midtown"
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
        0.95,
        0.93,
        0.93
      ]
    },
    {
      "id": "fourth-week",
      "label": "the Fourth of July week",
      "tag": "holiday",
      "month": 7,
      "week": 1,
      "dows": [
        2,
        3,
        4,
        5,
        6
      ],
      "can": [
        0.9,
        0.92,
        0.92
      ]
    },
    {
      "id": "diy-weekend",
      "label": "the DIY festival weekend",
      "tag": "festival",
      "month": 8,
      "week": 4,
      "dows": [
        3,
        4,
        5,
        6
      ],
      "can": [
        1.05,
        1.05,
        1
      ],
      "hoods": [
        "plaza",
        "midtown"
      ],
      "elsewhere": [
        0.97,
        0.97,
        0.97
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
      "weeknight": 1440,
      "weekend": 1500,
      "inForce": true
    }
  }
});
