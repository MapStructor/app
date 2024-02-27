const layers = [
  {
    //ID: CHANGE THIS, 1 OF 3
    id: "dutch_grants-5ehfqe-highlighted",
    type: "fill",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.7q2vs9ar",
    },
    layout: {
      visibility: document.getElementById("grants_layer").checked
        ? "visible"
        : "none",
    },
    "source-layer": "dutch_grants-5ehfqe",
    paint: {
      "fill-color": "#e3ed58",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0,
      ],
      "fill-outline-color": "#FF0000",
    },
    toggleElement: "grants_layer",
  },
  {
    //ID: CHANGE THIS, 1 OF 3
    id: "dutch_grants-5ehfqe",
    type: "fill",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.7q2vs9ar",
    },
    layout: {
      visibility: document.getElementById("grants_layer").checked
        ? "visible"
        : "none",
    },
    "source-layer": "dutch_grants-5ehfqe",
    paint: {
      "fill-color": "#e3ed58",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.8,
        0.45,
      ],
      "fill-outline-color": "#FF0000",
    },
  },
  {
    id: "grant-lots-lines",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapny.7dw0tqar",
    },
    layout: {
      visibility: document.getElementById("grants_layer_lines").checked
        ? "visible"
        : "none",
    },
    "source-layer": "dutch_grants_lines-0y4gkx",
    paint: {
      "line-color": "#FF0000",
      "line-width": 3,
      "line-opacity": 0.8,
    },
  },
  {
    id: "places",
    type: "circle",
    source: {
      type: "vector",
      url: "mapbox://mapny.cvcg7wo0",
    },
    layout: {
      visibility: document.getElementById("castello_points").checked
        ? "visible"
        : "none",
    },
    "source-layer": "taxlots-cpwvol",
    paint: {
      "circle-color": "#FF0000",
      "circle-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.5,
        1,
      ],
      "circle-stroke-width": 2,
      "circle-stroke-color": "#FF0000",
      "circle-stroke-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0,
      ],
    },
  },
  {
    id: "native-groups-labels",
    type: "symbol",
    source: {
      type: "vector",
      url: "mapbox://mapny.5m6t979e",
    },
    layout: {
      visibility: document.getElementById("native_groups_labels").checked
        ? "visible"
        : "none",
      "text-field": "{name}",
      "text-offset": [0, 1],
      "text-size": {
        stops: [
          [0, 4],
          [22, 34],
        ],
      },
    },
    "source-layer": "indian_labels_long_island-247yi6",
    paint: {
      "text-color": "#000080",
      "text-halo-color": "#ffffff",
      "text-halo-width": 5,
      "text-halo-blur": 1,
      "text-opacity": {
        stops: [
          [6, 0],
          [7, 1],
        ],
      },
    },
  },
  {
    id: "native-groups-lines",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapny.bwpbasrr",
    },
    layout: {
      visibility: document.getElementById("native_groups_lines").checked
        ? "visible"
        : "none",
    },
    "source-layer": "indian_borders_simplified_lon-buo3kf",
    paint: {
      "line-color": "#ff9900",
      "line-width": 15,
      "line-blur": 20,
      "line-opacity": 1.0,
    },
  },
  {
    id: "native-groups-area",
    type: "fill",
    source: {
      type: "vector",
      url: "mapbox://mapny.8in6hi37",
    },
    layout: {
      visibility: document.getElementById("native_groups_area").checked
        ? "visible"
        : "none",
    },
    "source-layer": "indian_areas_long_island-50h2dj",
    paint: {
      "fill-color": "#FF1493",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.5,
        0.2,
      ],
      "fill-outline-color": "#FFD700",
    },
  },
  {
    id: "native-groups-area-highlighted",
    type: "fill",
    source: {
      type: "vector",
      url: "mapbox://mapny.8in6hi37",
    },
    layout: {
      visibility: document.getElementById("native_groups_area").checked
        ? "visible"
        : "none",
    },
    "source-layer": "indian_areas_long_island-50h2dj",
    paint: {
      "fill-color": "#FF1493",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.3,
        0,
      ],
      "fill-outline-color": "#FFD700",
    },
  },

{
    //ID: CHANGE THIS, 1 OF 3
    id: "lot_events-bf43eb-right",
    type: "circle",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.9s9s67wu",
    },
    layout: {
      visibility: document.getElementById("circle_point").checked
        ? "visible"
        : "none",
    },
    "source-layer": "lot_events-bf43eb",
    paint: {
      //CIRCLE COLOR
      "circle-color": {
        type: "categorical",
        property: "color",
        stops: [
          ["6", "#0000ee"],
          ["5", "#097911"],
          ["4", "#0000ee"],
          ["3", "#097911"],
          ["2", "#0000ee"],
          ["1", "#097911"],
        ],
        default: "#FF0000",
      },

      //CIRCLE OPACITY
      "circle-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.5,
        1,
      ],
      "circle-stroke-width": 2,
      "circle-stroke-color": {
        type: "categorical",
        property: "color",
        stops: [
          ["6", "#0000ee"],
          ["5", "#097911"],
          ["4", "#0000ee"],
          ["3", "#097911"],
          ["2", "#0000ee"],
          ["1", "#097911"],
        ],
        default: "#FF0000",
      },
      "circle-stroke-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0,
      ],

      //CIRCLE RADIUS
      "circle-radius": {
        type: "categorical",
        property: "TAXLOT",
        stops: [["C7", 9]],
      },
    },
    toggleElement: "circle_point"
  },
  {
    id: "native-groups-labels",
    type: "symbol",
    source: {
      type: "vector",
      url: "mapbox://mapny.5m6t979e",
    },
    layout: {
      visibility: document.getElementById("native_groups_labels").checked
        ? "visible"
        : "none",
      "text-field": "{name}",
      "text-offset": [0, 1],
      "text-size": {
        stops: [
          [0, 4],
          [22, 34],
        ],
      },
    },
    "source-layer": "indian_labels_long_island-247yi6",
    paint: {
      "text-color": "#000080",
      "text-halo-color": "#ffffff",
      "text-halo-width": 5,
      "text-halo-blur": 1,
      "text-opacity": {
        stops: [
          [6, 0],
          [7, 1],
        ],
      },
    },
  },
  {
    //ID: CHANGE THIS, 1 OF 3
    id: "lot_events-bf43eb-left",
    type: "circle",
    source: {
      type: "vector",
      //URL: CHANGE THIS, 2 OF 3
      url: "mapbox://mapny.9s9s67wu",
    },
    layout: {
      visibility: document.getElementById("circle_point").checked
        ? "visible"
        : "none",
    },
    "source-layer": "lot_events-bf43eb",
    paint: {
      //CIRCLE COLOR
      "circle-color": {
        type: "categorical",
        property: "color",
        stops: [
          ["6", "#0000ee"],
          ["5", "#097911"],
          ["4", "#0000ee"],
          ["3", "#097911"],
          ["2", "#0000ee"],
          ["1", "#097911"],
        ],
        default: "#FF0000",
      },

      //CIRCLE OPACITY
      "circle-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        0.5,
        1,
      ],
      "circle-stroke-width": 2,
      "circle-stroke-color": {
        type: "categorical",
        property: "color",
        stops: [
          ["6", "#0000ee"],
          ["5", "#097911"],
          ["4", "#0000ee"],
          ["3", "#097911"],
          ["2", "#0000ee"],
          ["1", "#097911"],
        ],
        default: "#FF0000",
      },
      "circle-stroke-opacity": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1,
        0,
      ],

      //CIRCLE RADIUS
      "circle-radius": {
        type: "categorical",
        property: "TAXLOT",
        stops: [["C7", 9]],
      },
    },
  }
];