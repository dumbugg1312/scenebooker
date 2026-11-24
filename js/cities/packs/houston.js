SB.Cities.register('houston', {
  "v": 1,
  "slug": "houston",
  "confidence": {
    "geography": "PARTLY",
    "scene": "PARTLY",
    "names": "UNCHECKED"
  },
  "banned": [
    "university of houston",
    "rice university",
    "texas southern university",
    "houston community college",
    "houston chronicle",
    "houston press",
    "houstonia",
    "papercity",
    "houston astros",
    "astros",
    "houston rockets",
    "houston texans",
    "houston dynamo",
    "nasa",
    "johnson space center",
    "houston rodeo",
    "houston livestock show and rodeo",
    "art car parade",
    "houston marathon",
    "free press summer fest",
    "hurricane harvey",
    "hurricane ike",
    "tropical storm allison",
    "exxon",
    "exxonmobil",
    "port of houston",
    "ellington field",
    "memorial hermann",
    "texas medical center",
    "kpft",
    "kthx",
    "astrodome",
    "nrg stadium",
    "minute maid park",
    "toyota center",
    "buffalo bayou partnership",
    "metro rail",
    "harris county",
    "houston police",
    "h-e-b",
    "whataburger",
    "buc-ee's",
    "kroger",
    "texas southern",
    "chevron houston marathon",
    "aramco houston half marathon",
    "bayou city art festival",
    "azalea trail",
    "tour de houston",
    "h-e-b thanksgiving day parade",
    "go texan day",
    "downtown rodeo parade",
    "nrg park",
    "discovery green",
    "house of blues",
    "houston free thinkers",
    "noisey",
    "culturemap",
    "paper city",
    "kprc",
    "click2houston",
    "abc13",
    "fox 26",
    "community impact",
    "coog radio",
    "texas hardcore fest",
    "bayou doom fest",
    "punx mas fest",
    "tabc",
    "texas alcoholic beverage commission",
    "harris county constables"
  ],
  "blocklist": [
    "houston chronicle*",
    "houston press*",
    "free press summer*",
    "art car parade*",
    "kpft*",
    "astros*",
    "johnson space*",
    "house of blues*",
    "discovery green*",
    "bayou city art festival*"
  ],
  "blurb": [
    "A spread-out bayou sprawl where house shows hide in old Montrose bungalows and warehouse blocks east of downtown.",
    "Everything is an hour away by minivan, the ceiling fan does nothing, and the next storm is always on the radar."
  ],
  "hard": "Everything is an hour by car, and one storm can cancel a week.",
  "region": "the Gulf",
  "houseType": "LIVING_ROOM",
  "whereGo": [
    {
      "name": "Austin",
      "state": "TX",
      "lat": 30.27,
      "lon": -97.74
    },
    {
      "name": "San Antonio",
      "state": "TX",
      "lat": 29.42,
      "lon": -98.49
    },
    {
      "name": "Dallas",
      "state": "TX",
      "lat": 32.78,
      "lon": -96.8
    }
  ],
  "zones": [
    {
      "id": "city",
      "kind": "CITY",
      "name": "Houston"
    },
    {
      "id": "pasadena",
      "kind": "FEEDER",
      "name": "Pasadena",
      "minutes": 25,
      "bearing": 130,
      "note": "A refinery-side town of garages and carports; kids ride in.",
      "scene": 100,
      "rooms": [
        {
          "id": "pasadena-carport",
          "kind": "HOUSE",
          "hood": "pasadena-hood",
          "zone": "pasadena",
          "cap": 50,
          "ages": [
            "ALL"
          ],
          "curfew": 1380,
          "ac": false,
          "outdoor": true,
          "standing": [
            65,
            60,
            45
          ],
          "note": "A garage and carport near the refineries. Kids get driven in from the suburbs."
        }
      ]
    },
    {
      "id": "pearland",
      "kind": "FEEDER",
      "name": "Pearland",
      "minutes": 30,
      "bearing": 170,
      "note": "Suburban teens who come in for shows."
    },
    {
      "id": "sugar-land",
      "kind": "FEEDER",
      "name": "Sugar Land",
      "minutes": 30,
      "bearing": 220,
      "note": "A wealthy suburb; kids drive in."
    },
    {
      "id": "katy",
      "kind": "FEEDER",
      "name": "Katy",
      "minutes": 35,
      "bearing": 270,
      "note": "A far west suburb. A long drive and few rooms."
    },
    {
      "id": "the-woodlands",
      "kind": "FEEDER",
      "name": "The Woodlands",
      "minutes": 40,
      "bearing": 5,
      "note": "An affluent suburb of pop-punk and metal kids."
    },
    {
      "id": "baytown",
      "kind": "FEEDER",
      "name": "Baytown",
      "minutes": 35,
      "bearing": 80,
      "note": "Ship-channel working class."
    },
    {
      "id": "conroe",
      "kind": "FEEDER",
      "name": "Conroe",
      "minutes": 55,
      "bearing": 355,
      "note": "An exurb with the occasional band."
    },
    {
      "id": "league-city",
      "kind": "FEEDER",
      "name": "League City",
      "minutes": 40,
      "bearing": 155,
      "note": "A bay suburb."
    },
    {
      "id": "galveston",
      "kind": "PEER",
      "name": "Galveston",
      "minutes": 60,
      "bearing": 150,
      "note": "An island town with a small scene and a tourist season.",
      "scene": 300
    },
    {
      "id": "beaumont",
      "kind": "PEER",
      "name": "Beaumont",
      "minutes": 90,
      "bearing": 55,
      "note": "A small industrial scene up I-10.",
      "slug": "beaumont-tx"
    },
    {
      "id": "austin",
      "kind": "PEER",
      "name": "Austin",
      "minutes": 165,
      "bearing": 295,
      "note": "The bigger scene. Houston kids move there.",
      "slug": "austin"
    }
  ],
  "hoods": [
    {
      "id": "montrose",
      "name": "Montrose",
      "note": "Old bungalows split into rentals, art-school types and a queer scene. House shows and small rooms.",
      "route": "old-side"
    },
    {
      "id": "heights",
      "name": "the Heights",
      "note": "Older frame houses, gentrifying fast. Fewer cheap houses each year.",
      "route": "old-side"
    },
    {
      "id": "east-end",
      "name": "the East End and EaDo",
      "note": "Warehouses and old industrial blocks east of downtown. The bar and venue strip, and the closures.",
      "route": "downtown"
    },
    {
      "id": "third-ward",
      "name": "Third Ward",
      "note": "Cheap older houses near the university, a mixed neighborhood with a house-show tradition.",
      "route": "old-side"
    },
    {
      "id": "fifth-ward",
      "name": "Fifth Ward and the Northside",
      "note": "Cheap, industrial, rail yards. Warehouse-type spaces.",
      "route": "work-side"
    },
    {
      "id": "pasadena-hood",
      "name": "Pasadena",
      "note": "Refinery-side working class on the ship channel. Garages and carports.",
      "route": "town:pasadena"
    },
    {
      "id": "sharpstown",
      "name": "Sharpstown",
      "note": "An aging 1960s subdivision with cheap rent and many garages.",
      "route": "work-side"
    },
    {
      "id": "spring-branch",
      "name": "Spring Branch",
      "note": "The suburban west side: strip malls and apartment complexes. Teens ride in.",
      "route": "campus"
    },
    {
      "id": "alief",
      "name": "Southwest and Alief",
      "note": "Sprawling immigrant suburbs and apartment complexes. Kids with cars but no rooms.",
      "route": "campus"
    },
    {
      "id": "downtown",
      "name": "downtown",
      "note": "The towers and the big rooms. Only touring names and parade days.",
      "route": "downtown"
    }
  ],
  "points": [
    {
      "name": "New Orleans",
      "state": "LA",
      "lat": 29.95,
      "lon": -90.07,
      "pop": 1000000
    },
    {
      "name": "Beaumont",
      "state": "TX",
      "lat": 30.08,
      "lon": -94.15,
      "pop": 400000
    },
    {
      "name": "Corpus Christi",
      "state": "TX",
      "lat": 27.75,
      "lon": -97.4,
      "pop": 450000
    }
  ],
  "roads": [
    "I-10",
    "I-45",
    "US 59",
    "Loop 610",
    "Beltway 8",
    "Highway 288"
  ],
  "words": {
    "street": [
      "Westheimer",
      "Navigation",
      "Almeda",
      "Washington Avenue",
      "Fannin"
    ],
    "water": [
      "Buffalo Bayou",
      "the ship channel",
      "Brays Bayou"
    ],
    "hood": [
      "Montrose",
      "the Heights",
      "EaDo",
      "Third Ward",
      "Fifth Ward",
      "Sharpstown",
      "Alief",
      "Spring Branch"
    ],
    "thing": [
      "bayou",
      "freeway",
      "ceiling fan",
      "taco truck",
      "refinery flare",
      "minivan"
    ],
    "weather": [
      "humidity",
      "flood warning",
      "tropical storm"
    ]
  },
  "events": [
    {
      "id": "HOUSTON_BAYOU_FLOODS",
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
          5,
          6,
          7,
          8,
          9,
          10
        ]
      },
      "telegraph": "A tropical system is parked in the Gulf and the bayous are rising.",
      "title": "The bayou is in the yard",
      "body": "The rain has not stopped and the bayou behind the house is over its bank. The underpasses on the way in are going under, and the bands are an hour out in a minivan.",
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
          "result": "You moved it a day, and the people who could come, came."
        },
        {
          "id": "EARLY",
          "label": "Move doors an hour earlier so they beat the water",
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
          "result": "You opened doors an hour early, and the people who came got in before the underpasses closed."
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
          "result": "The freeways stayed backed up, the yard was a pond, and the room was half empty."
        }
      ]
    },
    {
      "id": "HOUSTON_LIVESTOCK_JAM",
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
        "calendar": "festival",
        "months": [
          2,
          3
        ]
      },
      "telegraph": "The rodeo is in town and the freeways south are already a parking lot.",
      "title": "The van is stuck in rodeo traffic",
      "body": "The suburb band is forty-five minutes out and the freeway is jammed solid with rodeo traffic. The load-in is going late.",
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
          "result": "The van got in at nine, so you started late, and most of them stayed."
        },
        {
          "id": "SHORT",
          "label": "Run a short bill with whoever is here",
          "likely": "It's thin but loose.",
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
      "id": "HOUSTON_NOISE_CALL",
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
          2
        ]
      },
      "telegraph": "The house on the corner has a new neighbor, and the night limit drops at ten.",
      "title": "A call at ten o'clock",
      "body": "A neighbor on the house street has the decibel limit memorized, and the clock says ten, and the set is not close to done.",
      "options": [
        {
          "id": "QUIET",
          "label": "Cut the set and turn it down",
          "likely": "The night ends early, but nobody gets hurt.",
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
          "result": "You turned it down and finished unplugged, and nobody minded much."
        },
        {
          "id": "MOVE",
          "label": "Move the last bands to another house",
          "likely": "It breaks the flow, and the people who follow are the ones who care.",
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
              "v": 0.7
            }
          ],
          "result": "Three cars of people followed the amps across town."
        },
        {
          "id": "ACCEPT",
          "label": "Play on and hope",
          "likely": "The squad car is the risk.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.8
            }
          ],
          "result": "You got through two more songs before the lights came."
        }
      ]
    }
  ],
  "rooms": [
    {
      "id": "ward-house",
      "kind": "HOUSE",
      "hood": "third-ward",
      "cap": 60,
      "ages": [
        "ALL"
      ],
      "curfew": 1350,
      "ac": false,
      "outdoor": false,
      "standing": [
        70,
        60,
        45
      ],
      "pressure": 55,
      "start": true,
      "note": "A rented house that hosts shows most nights. The police once came with weapons drawn, so one complaint can end it."
    },
    {
      "id": "montrose-porch",
      "kind": "HOUSE",
      "hood": "montrose",
      "cap": 50,
      "ages": [
        "ALL"
      ],
      "curfew": 1320,
      "ac": false,
      "outdoor": false,
      "standing": [
        65,
        60,
        45
      ],
      "pressure": 55,
      "note": "A porch and a living-room set in a bungalow. The neighbors are mixed with short-term rentals and quick to call."
    },
    {
      "id": "heights-house",
      "kind": "HOUSE",
      "hood": "heights",
      "cap": 40,
      "ages": [
        "ALL"
      ],
      "curfew": 1320,
      "ac": false,
      "outdoor": false,
      "standing": [
        60,
        60,
        45
      ],
      "pressure": 60,
      "note": "An old frame house, one of fewer each year. The neighbors have new money."
    },
    {
      "id": "eado-warehouse",
      "kind": "DIY",
      "hood": "east-end",
      "cap": 120,
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
      "note": "A gutted warehouse with a side-door entrance, sometimes BYOB. Rent and break-ins are what end these."
    },
    {
      "id": "fifth-ward-bay",
      "kind": "DIY",
      "hood": "fifth-ward",
      "cap": 100,
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
      "pressure": 55,
      "note": "A warehouse practice space by the rail yard with a show on weekends."
    },
    {
      "id": "strip-hall",
      "kind": "HALL",
      "hood": "sharpstown",
      "cap": 200,
      "ages": [
        "ALL"
      ],
      "curfew": 1350,
      "ac": true,
      "standing": [
        55,
        60,
        60
      ],
      "owner": "HALL_MANAGER",
      "note": "A rented hall in a strip mall, good for one big all-ages bill."
    },
    {
      "id": "east-storefront",
      "kind": "SHOP",
      "hood": "east-end",
      "cap": 40,
      "ages": [
        "ALL"
      ],
      "curfew": 1200,
      "ac": true,
      "standing": [
        65,
        65,
        70
      ],
      "note": "A storefront in-store set on the east side, over by suppertime."
    },
    {
      "id": "east-bar",
      "kind": "BAR",
      "hood": "east-end",
      "cap": 150,
      "ages": [
        "A21"
      ],
      "curfew": 1500,
      "ac": true,
      "standing": [
        50,
        65,
        70
      ],
      "pressure": 50,
      "note": "A dive with a stage that does punk and metal bills. The age door depends on the promoter."
    },
    {
      "id": "heights-club",
      "kind": "CLUB",
      "hood": "heights",
      "cap": 300,
      "ages": [
        "A18"
      ],
      "curfew": 1470,
      "ac": true,
      "standing": [
        45,
        70,
        70
      ],
      "notice": 42,
      "needs": [
        "FULL_BILL"
      ],
      "note": "A club in the old live-music district. Rooms here shut when the rent rose."
    },
    {
      "id": "downtown-hall",
      "kind": "BIG",
      "hood": "downtown",
      "cap": 1200,
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
      "note": "A big room where only touring names play."
    },
    {
      "id": "lot-pavilion",
      "kind": "OUTDOOR",
      "hood": "spring-branch",
      "cap": 80,
      "ages": [
        "ALL"
      ],
      "rent": 10,
      "curfew": 1290,
      "ac": false,
      "outdoor": true,
      "standing": [
        60,
        55,
        40
      ],
      "note": "A parking lot or pavilion afternoon show. Heat and storms rule it."
    }
  ],
  "contacts": [
    "beaumont-tx",
    "austin",
    "college-station-tx",
    "lafayette-la"
  ],
  "rules": {
    "quiet": 1320,
    "curfewMinors": {
      "weeknight": 1380,
      "weekend": 1500,
      "inForce": false
    }
  },
  "calendar": [
    {
      "id": "rodeo",
      "label": "rodeo season",
      "tag": "festival",
      "month": 3,
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
        0.88,
        0.9,
        0.9
      ]
    },
    {
      "id": "marathon",
      "label": "marathon weekend",
      "tag": "race",
      "month": 1,
      "weeks": [
        2,
        3
      ],
      "dows": [
        5,
        6
      ],
      "can": [
        0.92,
        0.9,
        0.9
      ],
      "hoods": [
        "montrose",
        "downtown"
      ],
      "elsewhere": [
        1,
        1,
        1
      ]
    },
    {
      "id": "arts-fest",
      "label": "the downtown arts festival",
      "tag": "festival",
      "month": 10,
      "week": 2,
      "dows": [
        5,
        6
      ],
      "can": [
        0.9,
        0.88,
        0.88
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
      "id": "art-parade",
      "label": "the big art parade",
      "tag": "parade",
      "month": 4,
      "week": 2,
      "dows": [
        5
      ],
      "can": [
        1.05,
        1.05,
        1.05
      ],
      "hoods": [
        "east-end",
        "downtown"
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
