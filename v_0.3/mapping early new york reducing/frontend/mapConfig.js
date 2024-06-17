/// <reference types="mapbox-gl" />
/// <reference types="mapbox__mapbox-gl-draw" />

let featuresSelected = []

mapboxgl.accessToken = "pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  projection: "mercator", // use "globe" to switch to globes
  zoom: 1,
  center: [30, 15],
});

map.addControl(new mapboxgl.NavigationControl());

let drawControls =  new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    point: true,
    line_string: true,
    polygon: true,
    trash: true,
  },
  styles: [
    // Set the custom icon for point features
    {
      'id': 'gl-draw-point-inactive',
      'type': 'circle',
      'filter': ['all', ['==', '$type', 'Point'], ['!=', 'meta', 'feature']],
      'layout': {},
      'paint': {
        'fill-color': '#fbb03b', // Customize the color
        'fill-opacity': 0.1
      }
    },
    {
      'id': 'gl-draw-point-active',
      'type': 'symbol',
      'filter': ['all', ['==', '$type', 'Point'], ['==', 'meta', 'feature']],
      'layout': {
        'icon-image': 'teardrop-icon',
        'icon-size': 0.04, // Adjust the icon size as needed
        'icon-allow-overlap': true
      },
      'paint': {}
    },
    // Style for inactive lines
    {
      'id': 'gl-draw-line-inactive',
      'type': 'line',
      'filter': ['all', ['==', '$type', 'LineString'], ['!=', 'meta', 'feature']],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#3b9ddd', // Customize the color
        'line-width': 2
      }
    },
    // Style for active lines
    {
      'id': 'gl-draw-line-active',
      'type': 'line',
      'filter': ['all', ['==', '$type', 'LineString'], ['==', 'meta', 'feature']],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#fbb03b', // Customize the color
        'line-width': 2
      }
    },
    // Style for polygon outlines
    {
      'id': 'gl-draw-polygon-stroke-inactive',
      'type': 'line',
      'filter': ['all', ['==', '$type', 'Polygon'], ['!=', 'meta', 'feature']],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#3b9ddd', // Customize the color
        'line-width': 2
      }
    },
    // Style for polygon fill
    {
      'id': 'gl-draw-polygon-fill-inactive',
      'type': 'fill',
      'filter': ['all', ['==', '$type', 'Polygon'], ['!=', 'meta', 'feature']],
      'layout': {},
      'paint': {
        'fill-color': '#3b9ddd', // Customize the color
        'fill-opacity': 0.1
      }
    },
    // Style for active polygon outlines
    {
      'id': 'gl-draw-polygon-stroke-active',
      'type': 'line',
      'filter': ['all', ['==', '$type', 'Polygon'], ['==', 'meta', 'feature']],
      'layout': {
        'line-cap': 'round',
        'line-join': 'round'
      },
      'paint': {
        'line-color': '#fbb03b', // Customize the color
        'line-width': 2
      }
    },
    // Style for active polygon fill
    {
      'id': 'gl-draw-polygon-fill-active',
      'type': 'fill',
      'filter': ['all', ['==', '$type', 'Polygon'], ['==', 'meta', 'feature']],
      'layout': {},
      'paint': {
        'fill-color': '#fbb03b', // Customize the color
        'fill-opacity': 0.1
      }
    },
    // Style for vertex points
    {
      'id': 'gl-draw-polygon-and-line-vertex-inactive',
      'type': 'circle',
      'filter': ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point']],
      'layout': {},
      'paint': {
        'circle-radius': 5,
        'circle-color': '#fff'
      }
    },
    // Style for active vertex points
    {
      'id': 'gl-draw-polygon-and-line-vertex-active',
      'type': 'circle',
      'filter': ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['==', 'active', 'true']],
      'layout': {},
      'paint': {
        'circle-radius': 5,
        'circle-color': '#fbb03b'
      }
    }
    // Other styles for line and polygon can go here
  ]
});

let selectedDataTableLayer = ""

document.getElementById("draw-controls").appendChild(drawControls.onAdd(map));

map.on("load", () => {
  map.loadImage('./location.png', function(error, image) {
    if (error) throw error;
    map.addImage('teardrop-icon', image)
  });
  map.loadImage("./location-active.png", (error, image) => {
    if(error) throw error;
    map.addImage("teardrop-icon-active", image)
  })
});

let userInteracting = false;
const spinEnabled = true;

map.on("mousedown", () => {
  userInteracting = true;
});

map.on("dragstart", () => {
  userInteracting = true;
});


map.on("draw.selectionchange", (e)=>{
  featuresSelected = e.features;
  if(!featuresSelected.length){
    toggleFeatureEditor(false)
  }else{
    const featureId = e.features[0].id
    // check if the feature id is part of the current layer features
    const currentLayer = layers.find(({id})=> id === currentLayerId)
    const selectedFeature = currentLayer.features.find(({id})=> id === featureId)
if(selectedFeature){
  toggleFeatureEditor(true, selectedFeature.properties)
  document.getElementById("feature-label-value").addEventListener("change", handleLabelInputChange)
  } else {
    Swal.fire({
      title: "Can't edit!",
      text: "Switch to the layer where this feature was created"
    })
  }
  }
})

