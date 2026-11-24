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
    "sa spurs",
    "fiesta flambeau",
    "flambeau",
    "king william fair",
    "san antonio stock show and rodeo",
    "frost bank center",
    "sbc center",
    "freeman coliseum",
    "utsa roadrunners",
    "trinitonian",
    "sa current",
    "kens 5",
    "ksat",
    "news 4 san antonio",
    "mysanantonio",
    "express-news",
    "culturemap",
    "do210",
    "axios san antonio",
    "san antonio public library",
    "central library",
    "latino collection and resource center",
    "visit san antonio",
    "jbsa",
    "bexarflood",
    "via metropolitan transit",
    "san antonio zoo",
    "aztec theatre"
  ],
  "blocklist": [
    "san antonio current*",
    "san antonio express*",
    "lackland*",
    "hemisfair*",
    "usaa*",
    "san antonio zoo*",
    "aztec theatre*",
    "frost bank center*",
    "freeman coliseum*"
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
    },
    {
      "fan": "hardcore",
      "band": "metal",
      "d": 0.07,
      "reason": "A city library chose a punk-metal bill for a free show and drew crowds of nearly a thousand."
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
      "body": "A flash flood has closed the low-water crossings on the creeks. The band from the north is stuck behind a gate, and half the West Side is cut off from the other half.",
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
          "result": "You moved it a day, and the ones who could come, came."
        },
        {
          "id": "EARLY",
          "label": "Open an hour early so they get across before the creek rises",
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
          "result": "You opened doors early, and they crossed with an inch to spare."
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
          "result": "The crossings stayed shut, and the room was cousins and whoever lived close."
        }
      ]
    },
    {
      "id": "SAN_ANTONIO_PARADE_NIGHT",
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
          4
        ]
      },
      "telegraph": "The parade is on Saturday night and half a million people will be on the streets.",
      "title": "Parade night fills the strip",
      "body": "The big spring parade has the strip packed, the parking gone and the bars full. The all-ages side room could open its door to the walk-ins, but the kids' curfew and the eleven o'clock quiet hour still stand.",
      "options": [
        {
          "id": "OPEN",
          "label": "Open the door to the walk-ins",
          "likely": "You get a huge crowd and a nervous eye on the clock.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 1.15
            },
            {
              "op": "SHOW_MOD",
              "key": "lateMin",
              "v": -60
            }
          ],
          "result": "The door stayed open, and the room was packed by nine and quiet by eleven."
        },
        {
          "id": "KEEP",
          "label": "Keep it a regular night",
          "likely": "The kids are at the parade.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.8
            }
          ],
          "result": "Half the list was in the street, and the regulars filled the rest."
        },
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
          "result": "You moved it a day, and the ones who could come, came."
        }
      ]
    },
    {
      "id": "SAN_ANTONIO_LIBRARY_ROOF",
      "when": "WEEK",
      "tier": "REAL",
      "weight": 1,
      "cooldown": 60,
      "bind": [
        "show"
      ],
      "if": {
        "daysOut": [
          3,
          10
        ]
      },
      "telegraph": "The library called. They want the bill by Friday, and they want it clean.",
      "title": "The library wants a free show",
      "body": "The city library wants a free punk-metal bill on its garage rooftop, with a talk first. The crowd could be ten times any basement you know, and the list of rules is long.",
      "options": [
        {
          "id": "YES",
          "label": "Take it and keep it clean",
          "likely": "You get a huge crowd and a lot of strangers, and it costs an afternoon.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 1.15
            },
            {
              "op": "HOURS",
              "d": -2,
              "when": "TODAY"
            },
            {
              "op": "REGULARS",
              "pct": 0.02
            }
          ],
          "result": "Nine hundred people came to the rooftop, and somebody's grandmother asked for the set list."
        },
        {
          "id": "NO",
          "label": "Pass and keep to your own rooms",
          "likely": "You lose nothing and gain nothing.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.95
            }
          ],
          "result": "You kept to your rooms, and the roof show went on without you."
        }
      ]
    },
    {
      "id": "SAN_ANTONIO_HOTEL_BILL",
      "when": "WEEK",
      "tier": "REAL",
      "weight": 1,
      "cooldown": 60,
      "bind": [
        "show"
      ],
      "if": {
        "daysOut": [
          0,
          5
        ]
      },
      "telegraph": "A crane is going up where an upstairs rock room has run twenty-five years.",
      "title": "One last bill before the wrecking crew",
      "body": "A hotel is going up where an upstairs rock room has run for twenty-five years. The bar offers one last bill before the crew starts.",
      "options": [
        {
          "id": "BOOK",
          "label": "Book the last bill",
          "likely": "Everyone who ever played there wants in.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 1.2
            },
            {
              "op": "REGULARS",
              "pct": 0.02
            }
          ],
          "result": "The last night was packed to the stairs, and somebody took the sign."
        },
        {
          "id": "SKIP",
          "label": "Let it go quietly",
          "likely": "There's no fuss, but you miss a good night.",
          "effects": [
            {
              "op": "SHOW_MOD",
              "key": "headsMul",
              "v": 0.95
            }
          ],
          "result": "You stayed away, and the last night went on without you."
        }
      ]
    }
  ],
  "rooms": [
    {
      "id": "west-punk-house",
      "kind": "HOUSE",
      "hood": "west-side",
      "cap": 60,
      "ages": [
        "ALL"
      ],
      "curfew": 1350,
      "ac": false,
      "pressure": 55,
      "start": true,
      "note": "A living room and a backyard on a West Side street. The address goes by word of mouth, and houses like this come and go."
    },
    {
      "id": "southtown-house",
      "kind": "HOUSE",
      "hood": "southtown",
      "cap": 40,
      "ages": [
        "ALL"
      ],
      "curfew": 1320,
      "ac": false,
      "pressure": 50,
      "note": "An old frame house run by local musicians. A front room or a porch, and neighbors who know the ten o'clock line."
    },
    {
      "id": "strip-side-room",
      "kind": "DIY",
      "hood": "tobin-hill",
      "cap": 100,
      "ages": [
        "ALL"
      ],
      "curfew": 1380,
      "sketch": 40,
      "pressure": 55,
      "note": "An all-ages side room with its own door, off the side of a bigger club. Punk and hardcore are the point, and the club holds the lease."
    },
    {
      "id": "southeast-bar-diy",
      "kind": "DIY",
      "hood": "southeast",
      "cap": 150,
      "ages": [
        "A18"
      ],
      "curfew": 1440,
      "sketch": 45,
      "pressure": 60,
      "note": "A DIY bar beside a longer-running one, with a young crowd. The last one shut with no warning, and this kind of room can reopen under a new host."
    },
    {
      "id": "library-roof",
      "kind": "HALL",
      "hood": "downtown",
      "cap": 900,
      "ages": [
        "ALL"
      ],
      "curfew": 1260,
      "ac": false,
      "outdoor": true,
      "rent": 0,
      "sketch": 5,
      "note": "A rooftop garage deck for a free city show, with a talk first and the bill clean by Friday. It only happens if the library says yes."
    },
    {
      "id": "strip-bar",
      "kind": "BAR",
      "hood": "tobin-hill",
      "cap": 200,
      "ages": [
        "A21"
      ],
      "curfew": 1560,
      "ac": true,
      "note": "A rock bar on the strip that books loud bills Tuesday through Sunday. Closing time sits well past any curfew."
    },
    {
      "id": "strip-club",
      "kind": "CLUB",
      "hood": "tobin-hill",
      "cap": 250,
      "ages": [
        "ALL"
      ],
      "curfew": 1410,
      "ac": true,
      "note": "A big club on the strip with a small side room for niche bills: hardcore, noise, indie and hip-hop."
    },
    {
      "id": "north-side-bar",
      "kind": "CLUB",
      "hood": "northwest",
      "cap": 250,
      "ages": [
        "A21"
      ],
      "curfew": 1560,
      "ac": true,
      "note": "What is left of the north-side bar circuit, after the old rock room closed and its successor went on a drawing board."
    },
    {
      "id": "metal-room",
      "kind": "CLUB",
      "hood": "west-side",
      "cap": 350,
      "ages": [
        "A18"
      ],
      "curfew": 1440,
      "ac": true,
      "note": "A mid-size metal room where the old guard of a forty-year local metal sound turns out."
    },
    {
      "id": "old-theater",
      "kind": "BIG",
      "hood": "downtown",
      "cap": 2000,
      "ages": [
        "ALL"
      ],
      "curfew": 1380,
      "ac": true,
      "note": "An old theater that takes national metal and deathcore dates. Local bands only open on a bigger bill."
    },
    {
      "id": "west-yard",
      "kind": "OUTDOOR",
      "hood": "southtown",
      "cap": 80,
      "ages": [
        "ALL"
      ],
      "curfew": 1320,
      "outdoor": true,
      "note": "A backyard in summer, a barbecue next door, and flood weather in the spring."
    }
  ],
  "contacts": [
    "austin",
    "laredo-tx",
    "corpus-christi-tx",
    "houston"
  ],
  "calendar": [
    {
      "id": "spring-festival",
      "label": "the spring festival weeks",
      "tag": "festival",
      "month": 4,
      "weeks": [
        3,
        4
      ],
      "dows": [
        3,
        4,
        5
      ],
      "can": [
        0.78,
        0.8,
        0.85
      ],
      "hoods": [
        "downtown",
        "tobin-hill"
      ],
      "elsewhere": [
        0.95,
        0.95,
        0.95
      ]
    },
    {
      "id": "livestock-show",
      "label": "the livestock show and rodeo",
      "tag": "fair",
      "month": 2,
      "weeks": [
        2,
        4
      ],
      "dows": [
        4,
        5,
        6
      ],
      "can": [
        0.95,
        0.93,
        0.95
      ]
    },
    {
      "id": "december-holidays",
      "label": "the December holidays",
      "tag": "holiday",
      "month": 12,
      "weeks": [
        1,
        2
      ],
      "dows": [
        4,
        5
      ],
      "can": [
        0.95,
        0.9,
        0.92
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
        4
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
      "month": 11,
      "weeks": [
        1,
        4
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
      "weekend": 1380,
      "inForce": false
    }
  }
});
