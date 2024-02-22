var zoomLabels = [
  {
    id: "label-long-island",
    title: "Long Island",
    coordinates: [-72.94912, 40.85225],
    visibility: "visible",
    minzoom: null,
    opacityStops: [[7.5, 0], [8, 1]]
  },
  {
    id: "label-brooklyn",
    title: "Brooklyn",
    coordinates: [-73.93772792292754, 40.65432897355928],
    visibility: "visible",
    minzoom: null,
    opacityStops: [[10.2, 0], [10.5, 1]]
  },
  {
    id: "label-new-amsterdam",
    title: "New Amsterdam",
    coordinates: [-74.01255, 40.704882],
    visibility: "visible",
    minzoom: null,
    opacityStops: [[6, 0], [6.5, 1]]
  },
  {
    id: "label-manhattan",
    title: "Manhattan",
    coordinates: [-73.97719031118277, 40.78097749612493],
    visibility: "visible",
    minzoom: null,
    opacityStops: [[10.2, 0], [10.5, 1]]
  },
  {
    id: "label-new-netherland",
    title: "New Netherland",
    coordinates: [-73.60361111111109, 41.09659166666665],
    visibility: "visible",
    minzoom: null,
    opacityStops: null // Add the opacity stops if necessary
  },
  {
    id: "label-new-england",
    title: "New England",
    coordinates: [-71.67755127, 42.4971076267],
    visibility: "visible",
    minzoom: 5.2,
    opacityStops: [[5.2, 0], [5.6, 1]]
  }
];

// Usage example:
// var LongIslandZoomLabel = createZoomLabel(...zoomLabels[0]);
// var BrooklynZoomLabel = createZoomLabel(...zoomLabels[1]);
// ... and so on for other labels
