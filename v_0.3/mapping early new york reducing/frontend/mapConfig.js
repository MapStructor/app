/// <reference types="mapbox-gl" />
/// <reference types="mapbox__mapbox-gl-draw" />

mapboxgl.accessToken = "pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ";

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  projection: "globe",
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

spinGlobe();
