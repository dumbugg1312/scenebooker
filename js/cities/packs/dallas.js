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
    "dallas county"
  ],
  "blocklist": [
    "dallas observer*",
    "dallas morning news*",
    "state fair of texas*",
    "big tex*",
    "dfw airport*",
    "fort worth weekly*"
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
      "note": "Kids drive in. Garage bands."
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
      "note": "Affluent suburban teens."
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
      "route": "campus"
    },
    {
      "id": "richardson-plano",
      "name": "Richardson and Plano",
      "note": "North suburbs. Teens come in on the tollways.",
      "route": "campus"
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
          "label": "Open early so the bands load in before the hail",
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
          "result": "Doors early. Everyone was inside when the ice hit."
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
          "result": "The hail came through at load-in. Half the list waited it out at home."
        }
      ]
    }
  ]
});
