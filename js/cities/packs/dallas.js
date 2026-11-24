SB.Cities.register('dallas', {
  "v": 1,
  "slug": "dallas",
  "confidence": {
    "geography": "PARTLY",
    "scene": "PARTLY",
    "names": "UNCHECKED"
  },
  "banned": [
    "university of north texas",
    "unt",
    "texas woman's university",
    "southern methodist university",
    "smu",
    "university of texas at dallas",
    "ut dallas",
    "texas christian university",
    "tcu",
    "dallas morning news",
    "dallas observer",
    "fort worth weekly",
    "centraltrack",
    "culturemap",
    "dallas cowboys",
    "texas rangers",
    "dallas mavericks",
    "dallas stars",
    "fc dallas",
    "state fair of texas",
    "big tex",
    "fair park",
    "dfw airport",
    "american airlines",
    "texas instruments",
    "at&t stadium",
    "lockheed martin",
    "naval air station fort worth",
    "kera",
    "wfaa",
    "kdfw",
    "north texas state",
    "six flags over texas",
    "trinity river audubon",
    "whataburger",
    "dart rail",
    "dallas police",
    "tarrant county",
    "denton county",
    "bomb factory",
    "dallas county",
    "fox 4",
    "nbc dfw",
    "dallas news",
    "central track",
    "do214",
    "cotton bowl",
    "red river showdown",
    "red river rivalry",
    "deep ellum community arts fair",
    "deep ellum arts festival",
    "dallas international film festival",
    "dallas police department",
    "dpd beat",
    "dallas college",
    "richland college",
    "american airlines center",
    "dallas pride",
    "house bill 1819",
    "hb 1819",
    "texas womans university"
  ],
  "blocklist": [
    "dallas observer*",
    "dallas morning news*",
    "state fair of texas*",
    "big tex*",
    "dfw airport*",
    "fort worth weekly*",
    "cotton bowl*",
    "red river showdown*",
    "deep ellum community arts fair*",
    "dallas international film festival*"
  ],
  "blurb": [
    "Three hubs thirty miles apart, tied together by tollways, house shows and a long memory for crust.",
    "The all-ages rooms keep getting evicted and the sprawl makes every bill a drive."
  ],
  "hard": "Tollways and distance, and every house is one noise call from closing.",
  "region": "Texas",
  "houseType": "GARAGE",
  "whereGo": [
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
    },
    {
      "name": "Oklahoma City",
      "state": "OK",
      "lat": 35.47,
      "lon": -97.52
    }
  ],
  "tilt": [
    {
      "fan": "crust",
      "band": "crust",
      "d": 0.08,
      "reason": "A town with a long tradition of crust."
    }
  ],
  "zones": [
    {
      "id": "city",
      "kind": "CITY",
      "name": "Dallas"
    },
    {
      "id": "garland",
      "kind": "FEEDER",
      "name": "Garland",
      "minutes": 20,
      "bearing": 60,
      "note": "Kids drive in. Garage bands.",
      "scene": 100,
      "rooms": [
        {
          "id": "east-club",
          "kind": "CLUB",
          "hood": "garland-mesquite",
          "zone": "garland",
          "cap": 250,
          "ages": [
            "ALL"
          ],
          "curfew": 1380,
          "ac": true,
          "standing": [
            50,
            65,
            65
          ],
          "note": "A strip-mall room where kids with cars come in from the east suburbs."
        }
      ]
    },
    {
      "id": "irving",
      "kind": "FEEDER",
      "name": "Irving",
      "minutes": 20,
      "bearing": 270,
      "note": "An airport-side suburb."
    },
    {
      "id": "mesquite",
      "kind": "FEEDER",
      "name": "Mesquite",
      "minutes": 20,
      "bearing": 100,
      "note": "Working-class east."
    },
    {
      "id": "plano",
      "kind": "FEEDER",
      "name": "Plano",
      "minutes": 30,
      "bearing": 5,
      "note": "Affluent suburban teens.",
      "scene": 100,
      "rooms": [
        {
          "id": "suburb-hall",
          "kind": "HALL",
          "hood": "richardson-plano",
          "zone": "plano",
          "cap": 200,
          "ages": [
            "ALL"
          ],
          "curfew": 1320,
          "ac": true,
          "standing": [
            60,
            60,
            60
          ],
          "owner": "HALL_MANAGER",
          "note": "A rented rec building out north. Cheap, but the staff can pull the plug if a show gets rough."
        }
      ]
    },
    {
      "id": "arlington",
      "kind": "FEEDER",
      "name": "Arlington",
      "minutes": 30,
      "bearing": 250,
      "note": "Halfway to the other city."
    },
    {
      "id": "denton",
      "kind": "FEEDER",
      "name": "Denton",
      "minutes": 40,
      "bearing": 340,
      "note": "A college town with a strong house scene.",
      "bands": 3
    },
    {
      "id": "waxahachie",
      "kind": "FEEDER",
      "name": "Waxahachie",
      "minutes": 40,
      "bearing": 195,
      "note": "A small town to the south."
    },
    {
      "id": "mckinney",
      "kind": "FEEDER",
      "name": "McKinney",
      "minutes": 45,
      "bearing": 15,
      "note": "Exurb kids."
    },
    {
      "id": "fort-worth",
      "kind": "PEER",
      "name": "Fort Worth",
      "minutes": 45,
      "bearing": 270,
      "note": "The other hub, with warehouse co-ops and a proud punk scene.",
      "scene": 2500
    },
    {
      "id": "waco",
      "kind": "PEER",
      "name": "Waco",
      "minutes": 100,
      "bearing": 195,
      "note": "A small scene down I-35.",
      "slug": "waco-tx"
    }
  ],
  "hoods": [
    {
      "id": "deep-ellum",
      "name": "Deep Ellum",
      "note": "The old bar and club strip east of downtown. Loud and expensive, and rooms keep closing.",
      "route": "downtown"
    },
    {
      "id": "lower-greenville",
      "name": "Lower Greenville",
      "note": "A bar strip with heavy rock and punk bars.",
      "route": "downtown"
    },
    {
      "id": "oak-cliff",
      "name": "Oak Cliff",
      "note": "Old houses across the river, cheap rentals, artists and punks.",
      "route": "old-side"
    },
    {
      "id": "east-dallas",
      "name": "East Dallas",
      "note": "Older houses and duplexes on tight blocks. Many house shows.",
      "route": "old-side"
    },
    {
      "id": "south-dallas",
      "name": "South Dallas",
      "note": "Warehouses and light industrial. Cheap space.",
      "route": "work-side"
    },
    {
      "id": "pleasant-grove",
      "name": "Pleasant Grove",
      "note": "Working-class southeast, full of garages.",
      "route": "work-side"
    },
    {
      "id": "cedars",
      "name": "the Cedars",
      "note": "Rail and industrial south of downtown. Warehouse shows.",
      "route": "work-side"
    },
    {
      "id": "garland-mesquite",
      "name": "Garland and Mesquite",
      "note": "Eastern suburbs. Kids with cars and strip-mall rooms.",
      "route": "town:garland"
    },
    {
      "id": "richardson-plano",
      "name": "Richardson and Plano",
      "note": "North suburbs. Teens come in on the tollways.",
      "route": "town:plano"
    }
  ],
  "points": [
    {
      "name": "Oklahoma City",
      "state": "OK",
      "lat": 35.47,
      "lon": -97.52,
      "pop": 1500000
    },
    {
      "name": "Houston",
      "state": "TX",
      "lat": 29.76,
      "lon": -95.37,
      "pop": 7900000
    },
    {
      "name": "Shreveport",
      "state": "LA",
      "lat": 32.47,
      "lon": -93.79,
      "pop": 380000
    }
  ],
  "roads": [
    "I-35E",
    "I-30",
    "I-20",
    "I-635",
    "US 75",
    "the Tollway"
  ],
  "words": {
    "street": [
      "Elm",
      "Commerce",
      "Greenville Avenue",
      "Jefferson",
      "Ervay",
      "Henderson"
    ],
    "water": [
      "the Trinity",
      "White Rock Lake"
    ],
    "hood": [
      "Deep Ellum",
      "Oak Cliff",
      "East Dallas",
      "Lower Greenville",
      "the Cedars",
      "Pleasant Grove"
    ],
    "thing": [
      "tollway",
      "toll tag",
      "back room",
      "hailstorm",
      "taqueria"
    ],
    "weather": [
      "hail",
      "ice storm",
      "triple digits"
    ]
  },
  "events": [
    {
      "id": "DALLAS_HAILSTORM",
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
        ],
        "weather": "RAIN",
        "months": [
          3,
          4,
          5,
          6
        ]
      },
      "telegraph": "Hail is in the forecast for the whole metro.",
      "title": "Hail in the forecast",
      "body": "A line of hail is rolling across the metro the night of your show. The van is parked in an open lot and the bands are not sure they want to drive.",
      "options": [
        {
          "id": "MOVE",
          "label": "Move it a day",
          "likely": "It breaks the date and costs you some trust with everyone.",
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
          "label": "Open early so the bands load in before the hail",
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
              "v": -60
            }
          ],
          "result": "Doors were early, and everyone was inside when the ice hit."
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
          "result": "The hail came through at load-in, and half the list waited it out at home."
        }
      ]
    },
    {
      "id": "DALLAS_FAIR_TRAFFIC",
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
          3
        ],
        "calendar": "fair"
      },
      "telegraph": "The fairgrounds are jammed all month and the roads into South Dallas are one long line of brake lights.",
      "title": "The van is stuck behind the fair",
      "body": "Your show in South Dallas falls on a fair weekend, the roads in are packed, and the first band is still on the freeway.",
      "options": [
        {
          "id": "WAIT",
          "label": "Hold the doors and start late",
          "likely": "The crowd waits, a little cranky.",
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
          "result": "The van got in at nine, and you started late but most of them stayed."
        },
        {
          "id": "SHORT",
          "label": "Run a short bill with whoever is here",
          "likely": "Thin but loose.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.85
            },
            {
              "op": "SHOW_MOD",
              "key": "qAdd",
              "v": -1
            }
          ],
          "result": "Two bands made it, and the room was half full and it was fine."
        },
        {
          "id": "MOVE",
          "label": "Move it a day",
          "likely": "It breaks the date and costs you some trust with the bands.",
          "effects": [
            {
              "op": "MOVE_SHOW",
              "dayShift": 1,
              "respect": false
            }
          ],
          "result": "You moved it a day, and not everyone could make the new one."
        }
      ]
    },
    {
      "id": "DALLAS_HALLOWEEN_PATROL",
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
        "calendar": "holiday",
        "months": [
          10
        ]
      },
      "telegraph": "Police are talking about extra patrols on the strip after the last shooting.",
      "title": "New patrols on the strip",
      "body": "The lots near the Deep Ellum rooms are closed to cars and the patrols are thick. Your Halloween show is in the middle of it.",
      "options": [
        {
          "id": "INSIDE",
          "label": "Move the whole bill to a house",
          "likely": "Smaller and quieter, since nobody can close a lot at a house.",
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
          "result": "A house took the bill with an hour to spare, and the floor was packed."
        },
        {
          "id": "EARLY",
          "label": "Start early and be out before the crowds",
          "likely": "Most get in, but it's a short night.",
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
          "result": "Doors were early and you were done before the patrols tightened."
        },
        {
          "id": "ACCEPT",
          "label": "Run it and take what you get",
          "likely": "People are nervous about the lots.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.75
            }
          ],
          "result": "Half the list stayed home rather than risk the car."
        }
      ]
    }
  ],
  "rooms": [
    {
      "id": "south-house",
      "kind": "HOUSE",
      "hood": "south-dallas",
      "cap": 60,
      "ages": [
        "ALL"
      ],
      "curfew": 1380,
      "ac": false,
      "outdoor": false,
      "standing": [
        65,
        60,
        45
      ],
      "pressure": 55,
      "start": true,
      "note": "A lived-in house run by a small crew who want it all ages. One neighbor call or one tired landlord ends it."
    },
    {
      "id": "east-house",
      "kind": "HOUSE",
      "hood": "east-dallas",
      "cap": 50,
      "ages": [
        "ALL"
      ],
      "curfew": 1350,
      "ac": false,
      "outdoor": false,
      "standing": [
        65,
        60,
        45
      ],
      "pressure": 55,
      "note": "A back room in an old duplex on a tight block. Every neighbor hears the drums."
    },
    {
      "id": "cliff-house",
      "kind": "HOUSE",
      "hood": "oak-cliff",
      "cap": 50,
      "ages": [
        "ALL"
      ],
      "curfew": 1350,
      "ac": false,
      "outdoor": true,
      "standing": [
        65,
        60,
        45
      ],
      "note": "A cheap old rental across the river, a van and a cooler in the yard."
    },
    {
      "id": "cedars-warehouse",
      "kind": "DIY",
      "hood": "cedars",
      "cap": 150,
      "ages": [
        "ALL"
      ],
      "curfew": 1410,
      "ac": false,
      "standing": [
        55,
        60,
        45
      ],
      "pressure": 60,
      "needs": [
        "VOUCH"
      ],
      "note": "A warehouse room by the rail with no paper on it. The first fire marshal visit ends it."
    },
    {
      "id": "practice-units",
      "kind": "DIY",
      "hood": "south-dallas",
      "cap": 120,
      "ages": [
        "ALL"
      ],
      "curfew": 1380,
      "ac": false,
      "standing": [
        55,
        60,
        45
      ],
      "pressure": 50,
      "note": "A storefront practice unit that doubles as a stage, cheap rent and thin walls."
    },
    {
      "id": "strip-bar",
      "kind": "BAR",
      "hood": "lower-greenville",
      "cap": 150,
      "ages": [
        "A21"
      ],
      "curfew": 1530,
      "ac": true,
      "standing": [
        50,
        65,
        70
      ],
      "pressure": 50,
      "note": "A heavy-rock and punk bar with a stage on the strip. Twenty-one and up, and the neighbors are close."
    },
    {
      "id": "ellum-bar",
      "kind": "BAR",
      "hood": "deep-ellum",
      "cap": 120,
      "ages": [
        "ALL",
        "A18"
      ],
      "matinee": true,
      "curfew": 1500,
      "ac": true,
      "standing": [
        50,
        65,
        70
      ],
      "note": "A bar with a back-room stage on the strip. Eighteen-plus and all-ages nights, until the lease runs out."
    },
    {
      "id": "ellum-club",
      "kind": "CLUB",
      "hood": "deep-ellum",
      "cap": 300,
      "ages": [
        "ALL"
      ],
      "curfew": 1380,
      "ac": true,
      "standing": [
        45,
        70,
        70
      ],
      "note": "A real club with a booker and a paid door, all ages unless the bill says otherwise."
    },
    {
      "id": "factory-hall",
      "kind": "BIG",
      "hood": "deep-ellum",
      "cap": 1500,
      "ages": [
        "ALL"
      ],
      "curfew": 1380,
      "ac": true,
      "standing": [
        40,
        70,
        70
      ],
      "note": "A converted factory the scene watches from the sidewalk. Only touring names play it."
    },
    {
      "id": "grove-yard",
      "kind": "OUTDOOR",
      "hood": "pleasant-grove",
      "cap": 80,
      "ages": [
        "ALL"
      ],
      "rent": 10,
      "curfew": 1260,
      "ac": false,
      "outdoor": true,
      "standing": [
        60,
        55,
        40
      ],
      "note": "A backyard and a garage in the southeast. Bring water, because the heat is the other headliner."
    }
  ],
  "contacts": [
    "waco-tx",
    "tyler-tx",
    "oklahoma-city",
    "longview-tx"
  ],
  "calendar": [
    {
      "id": "fair-sep",
      "label": "the state fair",
      "tag": "fair",
      "month": 9,
      "weeks": [
        4,
        5
      ],
      "dows": [
        4,
        5,
        6
      ],
      "can": [
        0.8,
        0.85,
        0.85
      ],
      "hoods": [
        "south-dallas",
        "cedars"
      ],
      "elsewhere": [
        0.95,
        0.95,
        0.95
      ]
    },
    {
      "id": "fair-oct",
      "label": "the state fair",
      "tag": "fair",
      "month": 10,
      "weeks": [
        1,
        3
      ],
      "dows": [
        4,
        5,
        6
      ],
      "can": [
        0.8,
        0.85,
        0.85
      ],
      "hoods": [
        "south-dallas",
        "cedars"
      ],
      "elsewhere": [
        0.95,
        0.95,
        0.95
      ]
    },
    {
      "id": "rivalry",
      "label": "the big rivalry game",
      "tag": "game",
      "month": 10,
      "weeks": [
        2,
        3
      ],
      "dows": [
        5
      ],
      "can": [
        0.88,
        0.9,
        0.9
      ],
      "hoods": [
        "deep-ellum"
      ],
      "elsewhere": [
        0.95,
        0.95,
        0.95
      ]
    },
    {
      "id": "arts-fair",
      "label": "the Deep Ellum arts fair",
      "tag": "festival",
      "month": 4,
      "week": 1,
      "dows": [
        4,
        5,
        6
      ],
      "can": [
        0.88,
        0.85,
        0.85
      ],
      "hoods": [
        "deep-ellum"
      ],
      "elsewhere": [
        1,
        1,
        1
      ]
    },
    {
      "id": "football-oct",
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
      "id": "football-nov",
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
      ],
      "hoods": [
        "deep-ellum"
      ],
      "elsewhere": [
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
  ]
});
