// import "@/app/components/layers/section-layer.component"
// import "@/app/components/layers/section-layers.component"
import  mapboxgl  from "mapbox-gl";

const aftermap_container = () => {
  var afterMap = new mapboxgl.Map({
    container: "after",
    style: "mapbox://styles/mapny/clm2yu5fg022801phfh479c8x",
    center: [0, 0],
    hash: true,
    zoom: 0,
    attributionControl: false,
  });

  
  return ("html");
}

// ============ old js ============
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ";

var afterMap = new mapboxgl.Map({
  container: "after",
  style: "mapbox://styles/mapny/clm2yu5fg022801phfh479c8x",
  center: [0, 0],
  hash: true,
  zoom: 0,
  attributionControl: false,
});

var init_bearing, init_center, init_zoom;

var na_bearing = -51.3,
  na_center = [-74.01255, 40.704882],
  na_zoom = 16.34;

  var nav = new mapboxgl.NavigationControl();
afterMap.addControl(nav, "bottom-right");

function switchRightLayer(layer) {
  var rightLayerClass = layer.target.className;
  afterMap.setStyle("mapbox://styles/mapny/" + rightLayerClass);
}