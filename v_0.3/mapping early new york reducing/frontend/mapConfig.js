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

const drawControls = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
    point: true,
    line_string: true,
    polygon: true,
    trash: true,
  },
});

let selectedDataTableLayer = ""

document.getElementById("draw-controls").appendChild(drawControls.onAdd(map));

map.on("style.load", () => {
  map.setFog({});
});

let userInteracting = false;
const spinEnabled = true;

function spinGlobe() {
  if (spinEnabled && !userInteracting && map.getZoom() < 5) {
    map.easeTo({
      center: [map.getCenter().lng - 360 / 240, map.getCenter().lat],
      duration: 1000,
      easing: (n) => n,
    });
  }
}

map.on("mousedown", () => {
  userInteracting = true;
});

map.on("dragstart", () => {
  userInteracting = true;
});

map.on("moveend", () => {
  spinGlobe();
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

spinGlobe();

