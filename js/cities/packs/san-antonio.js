SB.Cities.register('san-antonio', {
  "v": 1,
  "slug": "san-antonio",
  "confidence": {
    "geography": "PARTLY",
    "scene": "PARTLY",
    "names": "UNCHECKED"
  },
  "banned": [
    "university of texas at san antonio",
    "utsa",
    "trinity university",
    "st. mary's university",
    "our lady of the lake university",
    "san antonio college",
    "ut health san antonio",
    "san antonio current",
    "san antonio express-news",
    "san antonio spurs",
    "san antonio fc",
    "fiesta san antonio",
    "river walk",
    "riverwalk",
    "the alamo",
    "joint base san antonio",
    "lackland",
    "fort sam houston",
    "randolph air force base",
    "kelly field",
    "sea world san antonio",
    "six flags fiesta texas",
    "hemisfair",
    "texas public radio",
    "h-e-b",
    "usaa",
    "valero",
    "port san antonio",
    "pearl brewery",
    "san antonio police",
    "bexar county",
    "cowboys dance hall",
    "school of hard knocks",
    "whataburger",
    "alamodome",
    "at&t center",
    "tower of the americas",
    "missions national park",
    "battle of flowers",
    "sa spurs"
  ],
  "blocklist": [
    "san antonio current*",
    "san antonio express*",
    "lackland*",
    "hemisfair*",
    "usaa*"
  ],
  "blurb": [
    "A big, mostly Latino city where DIY lives in West Side spaces, living rooms and family-sized crowds.",
    "Hardcore and metal share the bills, and the politics are loud."
  ],
  "hard": "DIY spaces are fragile, and the crowd is split by the loops and the rent.",
  "region": "Texas",
  "houseType": "LIVING_ROOM",
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
      "name": "Dallas",
      "state": "TX",
      "lat": 32.78,
      "lon": -96.8
    }
  ],
  "tilt": [
    {
      "fan": "hardcore",
      "band": "hardcore",
      "d": 0.08,
      "reason": "Political hardcore and metalcore are what the scene is known for."
    }
  ],
  "zones": [
    {
      "id": "city",
      "kind": "CITY",
      "name": "San Antonio"
    },
    {
      "id": "universal-city",
      "kind": "FEEDER",
      "name": "Universal City",
      "minutes": 25,
      "bearing": 70,
      "note": "A base-side suburb."
    },
    {
      "id": "schertz",
      "kind": "FEEDER",
      "name": "Schertz",
      "minutes": 30,
      "bearing": 45,
      "note": "A base-side suburb of kids and military families."
    },
    {
      "id": "helotes",
      "kind": "FEEDER",
      "name": "Helotes",
      "minutes": 30,
      "bearing": 305,
      "note": "A northwest suburb."
    },
    {
      "id": "new-braunfels",
      "kind": "FEEDER",
      "name": "New Braunfels",
      "minutes": 35,
      "bearing": 25,
      "note": "A tourist river town with some bands.",
      "bands": 2
    },
    {
      "id": "boerne",
      "kind": "FEEDER",
      "name": "Boerne",
      "minutes": 35,
      "bearing": 320,
      "note": "A Hill Country exurb. Teens come in."
    },
    {
      "id": "seguin",
      "kind": "FEEDER",
      "name": "Seguin",
      "minutes": 40,
      "bearing": 70,
      "note": "A small town of garage bands."
    },
    {
      "id": "floresville",
      "kind": "FEEDER",
      "name": "Floresville",
      "minutes": 40,
      "bearing": 105,
      "note": "Rural."
    },
    {
      "id": "san-marcos",
      "kind": "PEER",
      "name": "San Marcos",
      "minutes": 50,
      "bearing": 35,
      "note": "A college town with a small scene.",
      "scene": 700
    },
    {
      "id": "austin",
      "kind": "PEER",
      "name": "Austin",
      "minutes": 80,
      "bearing": 40,
      "note": "The bigger scene. Punks travel both ways and festival bills link them.",
      "slug": "austin"
    },
    {
      "id": "laredo",
      "kind": "PEER",
      "name": "Laredo",
      "minutes": 150,
      "bearing": 195,
      "note": "A small border city down I-35.",
      "slug": "laredo-tx"
    }
  ],
  "hoods": [
    {
      "id": "west-side",
      "name": "the West Side",
      "note": "Dense working-class Mexican American neighborhoods with a small DIY space and house shows.",
      "route": "work-side"
    },
    {
      "id": "southtown",
      "name": "Southtown and King William",
      "note": "Old houses near the river. Artsy and gentrifying.",
      "route": "old-side"
    },
    {
      "id": "blue-star",
      "name": "Blue Star and south of downtown",
      "note": "Warehouses and galleries in an industrial area. Art-gallery shows.",
      "route": "work-side"
    },
    {
      "id": "downtown",
      "name": "downtown",
      "note": "The tourist strip of bars and hotels. Mid-size rooms.",
      "route": "downtown"
    },
    {
      "id": "tobin-hill",
      "name": "Tobin Hill and the St. Mary's Strip",
      "note": "A long-time bar strip with old metal and punk history.",
      "route": "old-side"
    },
    {
      "id": "southeast",
      "name": "the Southeast Side",
      "note": "Cheap, industrial, near the rail. Garages.",
      "route": "work-side"
    },
    {
      "id": "northwest",
      "name": "the Northwest Side",
      "note": "Suburban apartments and strip malls near the medical center. Teens come in.",
      "route": "campus"
    },
    {
      "id": "alamo-heights",
      "name": "Alamo Heights",
      "note": "An affluent enclave. Kids drive in.",
      "route": "campus"
    }
  ],
  "points": [
    {
      "name": "Laredo",
      "state": "TX",
      "lat": 27.56,
      "lon": -99.49,
      "pop": 280000
    },
    {
      "name": "Corpus Christi",
      "state": "TX",
      "lat": 27.75,
      "lon": -97.4,
      "pop": 450000
    },
    {
      "name": "Houston",
      "state": "TX",
      "lat": 29.76,
      "lon": -95.37,
      "pop": 7900000
    }
  ],
  "roads": [
    "I-35",
    "I-10",
    "Loop 410",
    "Loop 1604",
    "US 281"
  ],
  "words": {
    "street": [
      "Commerce",
      "Broadway",
      "Zarzamora",
      "Guadalupe",
      "Culebra",
      "St. Mary's"
    ],
    "water": [
      "the San Antonio River",
      "Salado Creek"
    ],
    "hood": [
      "the West Side",
      "Southtown",
      "King William",
      "Blue Star",
      "Tobin Hill",
      "Alamo Heights"
    ],
    "thing": [
      "pan dulce",
      "low-water crossing",
      "trolley",
      "family barbecue",
      "cousin"
    ],
    "weather": [
      "flash flood",
      "hail",
      "triple digits"
    ]
  },
  "events": [
    {
      "id": "SAN_ANTONIO_LOW_WATER",
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
          4,
          5,
          6,
          9,
          10
        ]
      },
      "telegraph": "Flash flood watch for the creeks and low-water crossings.",
      "title": "The crossing is under",
      "body": "A flash flood has closed the low-water crossings on the creeks. The band from the north is stuck behind a gate and half the West Side is cut off from the other half.",
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
          "label": "Open an hour early so they get across before the creek rises",
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
          "result": "Doors early. They crossed with an inch to spare."
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
          "result": "The crossings stayed shut. The room was cousins and whoever lived close."
        }
      ]
    }
  ]
});
