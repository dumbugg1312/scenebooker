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
    "texas southern"
  ],
  "blocklist": [
    "houston chronicle*",
    "houston press*",
    "free press summer*",
    "art car parade*",
    "kpft*",
    "astros*",
    "johnson space*"
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
      "note": "A refinery-side town of garages and carports; kids ride in."
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
      "route": "work-side"
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
      "body": "The rain has not stopped and the bayou behind the house is over its bank. The underpasses on the way in are going under and the bands are an hour out in a minivan.",
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
          "label": "Move doors an hour earlier so they beat the water",
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
          "result": "Doors an hour early. The ones who came got in before the underpasses closed."
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
          "result": "The freeways stayed backed up. The yard was a pond and the room was half empty."
        }
      ]
    }
  ]
});
