var LongIslandZoomLabel = {
  id: "label-long-island",
  type: "symbol",
  source: {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            title: "Long Island",
            icon: "circle",
          },
          geometry: {
            type: "Point",
            coordinates: [-72.94912, 40.85225],
          },
        },
      ],
    },
  },
  layout: {
    visibility: "visible",
    "text-font": ["Asap Medium"],
    "text-field": "{title}",
    "text-size": 18,
  },
  paint: {
    "text-color": "#000000",
    "text-halo-width": 3,
    "text-halo-blur": 2,
    "text-halo-color": "#ffffff",
    "text-opacity": {
      default: 1,
      stops: [
        [7.5, 0],
        [8, 1],
      ],
    },
  },
};

var BrooklynZoomLabel = {
  id: "label-brooklyn",
  type: "symbol",
  source: {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            title: "Brooklyn",
            icon: "circle",
          },
          geometry: {
            type: "Point",
            coordinates: [-73.93772792292754, 40.65432897355928],
          },
        },
      ],
    },
  },
  layout: {
    visibility: "visible",
    "text-font": ["Asap Medium"],
    "text-field": "{title}",
    "text-size": 18,
  },
  paint: {
    "text-color": "#000000",
    "text-halo-width": 3,
    "text-halo-blur": 2,
    "text-halo-color": "#ffffff",
    "text-opacity": {
      default: 1,
      stops: [
        [10.2, 0],
        [10.5, 1],
      ],
    },
  },
};

var NewAmsterdamZoomLabel = {
  id: "label-new-amsterdam",
  type: "symbol",
  source: {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            title: "New Amsterdam",
            icon: "circle",
          },
          geometry: {
            type: "Point",
            coordinates: [-74.01255, 40.704882],
          },
        },
      ],
    },
  },
  layout: {
    visibility: "visible",
    "text-font": ["Asap Medium"],
    "text-field": "{title}",
    "text-size": 18,
  },
  paint: {
    "text-color": "#000000",
    "text-halo-width": 3,
    "text-halo-blur": 2,
    "text-halo-color": "#ffffff",
    "text-opacity": {
      default: 1,
      stops: [
        [6, 0],
        [6.5, 1],
      ],
    },
  },
};

var ManhattanZoomLabel = {
  id: "label-manhattan",
  type: "symbol",
  source: {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            title: "Manhattan",
            icon: "circle",
          },
          geometry: {
            type: "Point",
            coordinates: [-73.97719031118277, 40.78097749612493],
          },
        },
      ],
    },
  },
  layout: {
    visibility: "visible",
    "text-font": ["Asap Medium"],
    "text-field": "{title}",
    "text-size": 18,
  },
  paint: {
    "text-color": "#000000",
    "text-halo-width": 3,
    "text-halo-blur": 2,
    "text-halo-color": "#ffffff",
    "text-opacity": {
      default: 1,
      stops: [
        [10.2, 0],
        [10.5, 1],
      ],
    },
  },
};

var NewNetherlandZoomLabel = {
  id: "label-new-netherland",
  type: "symbol",
  source: {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            title: "New Netherland",
            icon: "circle",
          },
          geometry: {
            type: "Point",
            coordinates: [-73.60361111111109, 41.09659166666665],
          },
        },
      ],
    },
  },
  layout: {
    visibility: "visible",
    "text-font": ["Asap Medium"],
    "text-field": "{title}",
    "text-size": 18,
  },
  paint: {
    "text-color": "#000000",
    "text-halo-width": 3,
    "text-halo-blur": 2,
    "text-halo-color": "#ffffff",
  },
};

var NewEnglandZoomLabel = {
  id: "label-new-england",
  type: "symbol",
  source: {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            title: "New England",
            icon: "circle",
          },
          geometry: {
            type: "Point",
            coordinates: [-71.67755127, 42.4971076267],
          },
        },
      ],
    },
  },
  //For some reason, New Netherland label disappears unless minzoom is created
  minzoom: 5.2,
  layout: {
    visibility: "visible",
    "text-font": ["Asap Medium"],
    "text-field": "{title}",
    "text-size": 18,
    //"text-anchor": "center"
  },
  paint: {
    "text-color": "#000000",
    "text-halo-width": 3,
    "text-halo-blur": 2,
    "text-halo-color": "#ffffff",

    "text-opacity": {
      default: 1,
      stops: [
        [5.2, 0],
        [5.6, 1],
      ],
    },
  },
};
