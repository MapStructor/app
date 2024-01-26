/* Pasted everything into GPT from independent_labels_isolated_code.js and asked:
I want to have all the unique stuff needed to generate labels in a simple list, like
 an array, and template functions that make it all work.
*/



/*
Unique Information for Labels:
Create an array containing the unique properties for each label:
*/


var labelData = [
  {
    title: "Long Island",
    coordinates: [-72.94912, 40.85225],
    minZoom: null,
  },
  {
    title: "Brooklyn",
    coordinates: [-73.93772792292754, 40.65432897355928],
    minZoom: null,
  },
  {
    title: "New Amsterdam",
    coordinates: [-74.01255, 40.704882],
    minZoom: null,
  },
  {
    title: "Manhattan",
    coordinates: [-73.97719031118277, 40.78097749612493],
    minZoom: null,
  },
  {
    title: "New Netherland",
    coordinates: [-73.60361111111109, 41.09659166666665],
    minZoom: null,
  },
  {
    title: "New England",
    coordinates: [-71.67755127, 42.4971076267],
    minZoom: 5.2,
  },
];

/*
Template Function for Creating Labels:
Create a function that takes the unique information and returns a label object:
*/


function createLabel(title, coordinates, minZoom = null) {
  return {
    id: `label-${title.toLowerCase().replace(/\s+/g, '-')}`,
    type: "symbol",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [{
          type: "Feature",
          properties: { title, icon: "circle" },
          geometry: { type: "Point", coordinates }
        }],
      },
    },
    ...(minZoom && { minzoom: minZoom }),
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
        stops: [[6, 0], [6.5, 1]],
      },
    },
  };
}

/*
Function to Add Interactivity to Labels:
Create a function to add event listeners for interactivity (mouseenter, mouseleave, click):
*/


function addInteractivityToLabel(map, labelObject, boundsName) {
  const labelId = labelObject.id;

  map.on("mouseenter", labelId, function () {
    map.setPaintProperty(labelId, "text-color", lbl_color_hover);
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", labelId, function () {
    map.setPaintProperty(labelId, "text-color", lbl_color);
    map.getCanvas().style.cursor = "";
  });

  map.on("click", labelId, function () {
    zoom_labels_click_ev = true;
    zoomtobounds(boundsName);
  });
}

/*
Putting it All Together:
Loop through the label data to create and add the labels to the map, applying interactivity to each:
*/


labelData.forEach(labelInfo => {
  const labelObject = createLabel(labelInfo.title, labelInfo.coordinates, labelInfo.minZoom);
  afterMap.addLayer(labelObject);
  addInteractivityToLabel(afterMap, labelObject, labelInfo.title.replace(/\s+/g, ''));
});

/*
The afterMap variable in this case is assumed to be the Mapbox GL JS map instance that you're working
 with, and the zoomtobounds function is assumed to be available in the scope. The variable lbl_color
 hover and lbl_color are the colors for the label text when hovered and in normal state, respectively.
 The array labelData contains the unique properties for each label, including title and coordinates,
 with an optional minZoom level when necessary. The function createLabel generates the label object,
 and addInteractivityToLabel adds interactivity to each label on the provided map instance.
*/