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
    "myriad gardens"
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
      "note": "A working-class suburb. Kids with older friends driving."
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
      "bands": 3
    },
    {
      "id": "norman",
      "kind": "FEEDER",
      "name": "Norman",
      "minutes": 25,
      "bearing": 185,
      "note": "Students and house venues that come and go.",
      "bands": 3
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
      "route": "work-side"
    },
    {
      "id": "edmond-hood",
      "name": "Edmond",
      "note": "A big northern suburb of kids and rented houses.",
      "route": "campus"
    },
    {
      "id": "norman-hood",
      "name": "Norman",
      "note": "A college town south of the city. House venues come and go.",
      "route": "campus"
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
    }
  ]
});
