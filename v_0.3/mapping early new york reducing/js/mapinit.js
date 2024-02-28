// #region Mapbox Access Token
// Set the access token for Mapbox services.

//ACCESS TOKEN
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ";

// #endregion

// #region Map Initialization
// Initialize the 'before' and 'after' Mapbox GL maps with specific configurations.

var beforeMap = new mapboxgl.Map({
  container: "before",
  style: "mapbox://styles/mapny/clm2yrx1y025401p93v26bhyl",
  center: [0, 0],
  hash: true,
  zoom: 0,
  attributionControl: false,
});

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

// #endregion

// #region Map Comparison Tool

// Initialize the map comparison tool, allowing users to compare 'before' and 'after' maps.
var map = new mapboxgl.Compare(beforeMap, afterMap, {
  //WERE THESE COMMENTS THERE FROM BEFORE??:
  // Set this to enable comparing two maps by mouse movement:
  // mousemove: true
});

// #endregion

// #region Navigation Controls
// Add navigation controls to both maps for zooming and rotating.

//Before map
var nav = new mapboxgl.NavigationControl();
beforeMap.addControl(nav, "bottom-right");

//After map
var nav = new mapboxgl.NavigationControl();
afterMap.addControl(nav, "bottom-right");

// #endregion

// #region Layer Switching
// Functions and event listeners for switching layers based on user input.

//RIGHT MENU
var rightInputs = document.getElementsByName("rtoggle");

function switchRightLayer(layer) {
  var rightLayerClass = layer.target.className;
  afterMap.setStyle("mapbox://styles/mapny/" + rightLayerClass);
}

for (var i = 0; i < rightInputs.length; i++) {
  rightInputs[i].onclick = switchRightLayer;
}

//LEFT MENU
var leftInputs = document.getElementsByName("ltoggle");

function switchLeftLayer(layer) {
  var leftLayerClass = layer.target.className;
  beforeMap.setStyle("mapbox://styles/mapny/" + leftLayerClass);
}

for (var i = 0; i < leftInputs.length; i++) {
  leftInputs[i].onclick = switchLeftLayer;
}

// #endregion

// #region URL Hash

// Capture the URL hash for potential use in initializing map states or layers.
var urlHash = window.location.hash;

// #endregion

// #region Dynamic Filtering
// Functions for filtering map data dynamically based on user interactions or other criteria.

function demoFilterRangeCalc() {
  //A* demo filter range calculator
  demo_layer_features = afterMap.queryRenderedFeatures({
    layers: ["lot_events-bf43eb-right"],
  });

  if (demo_layer_features.length > 0) {
    var sliderStartMin = null,
      sliderEndMax = null,
      curr_start_timestamp = null,
      curr_end_timestamp = null;

    for (let i = 0; i < demo_layer_features.length; i++) {
      if (demo_layer_features[i].properties.TAXLOT == demo_layer_taxlot) {
        demo_layer_feature_props = demo_layer_features[i].properties;

        if (
          typeof demo_layer_features[i].properties.DayStart === "undefined" ||
          demo_layer_features[i].properties.DayStart === null
        )
          curr_start_timestamp = null;
        else
          curr_start_timestamp = moment(
            demo_layer_features[i].properties.DayStart,
            "YYYYMMDD"
          ).unix();
        if (
          typeof demo_layer_features[i].properties.DayEnd === "undefined" ||
          demo_layer_features[i].properties.DayEnd === null
        )
          curr_end_timestamp = null;
        else
          curr_end_timestamp = moment(
            demo_layer_features[i].properties.DayEnd,
            "YYYYMMDD"
          ).unix();

        if (curr_start_timestamp !== null && curr_end_timestamp !== null) {
          if (curr_start_timestamp <= curr_end_timestamp) {
            if (sliderStartMin === null) {
              sliderStartMin = curr_start_timestamp;
            } else {
              if (sliderStartMin > curr_start_timestamp)
                sliderStartMin = curr_start_timestamp;
            }
            if (sliderEndMax === null) {
              sliderEndMax = curr_end_timestamp;
            } else {
              if (sliderEndMax < curr_end_timestamp)
                sliderEndMax = curr_end_timestamp;
            }
          }
          if (curr_start_timestamp > curr_end_timestamp) {
            if (sliderStartMin === null) {
              sliderStartMin = curr_end_timestamp;
            } else {
              if (sliderStartMin > curr_end_timestamp)
                sliderStartMin = curr_end_timestamp;
            }
            if (sliderEndMax === null) {
              sliderEndMax = curr_start_timestamp;
            } else {
              if (sliderEndMax < curr_start_timestamp)
                sliderEndMax = curr_start_timestamp;
            }
          }
        }

        if (curr_start_timestamp !== null && curr_end_timestamp === null) {
          if (sliderStartMin === null) {
            sliderStartMin = curr_start_timestamp;
          } else {
            if (sliderStartMin > curr_start_timestamp)
              sliderStartMin = curr_start_timestamp;
          }
          if (sliderEndMax === null) {
            sliderEndMax = curr_start_timestamp;
          } else {
            if (sliderEndMax < curr_start_timestamp)
              sliderEndMax = curr_start_timestamp;
          }
        }

        if (curr_start_timestamp === null && curr_end_timestamp !== null) {
          if (sliderEndMax === null) {
            sliderEndMax = curr_end_timestamp;
          } else {
            if (sliderEndMax < curr_end_timestamp)
              sliderEndMax = curr_end_timestamp;
          }
          if (sliderStartMin === null) {
            sliderStartMin = curr_end_timestamp;
          } else {
            if (sliderStartMin > curr_end_timestamp)
              sliderStartMin = curr_end_timestamp;
          }
        }
      }
    }

    if (sliderStartMin !== null && sliderEndMax !== null) {
      sliderStartDrag = sliderStartMin;
      sliderEndDrag = sliderEndMax;

      if (demo_layer_view_flag) buildPopUpInfo(demo_layer_feature_props, "#demoLayerInfo");
    }
  }
}

// #endregion

// #region Basemap Switching and Layer Addition
// Handle style loading events to add or switch basemaps and layers dynamically.

function addLayers() {
  var sliderVal = moment($("#date").text()).unix();
  var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
  var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));

  addAllLayers(yr, date);

  labelData.forEach((labelInfo) => {
    const labelObject = createLabel(
      labelInfo.title,
      labelInfo.coordinates,
      labelInfo.minZoom
    );
    afterMap.addLayer(labelObject);
    beforeMap.addLayer(labelObject);
    addInteractivityToLabel(
      afterMap,
      labelObject,
      labelInfo.title.replace(/\s+/g, "")
    );
    addInteractivityToLabel(
      beforeMap,
      labelObject,
      labelInfo.title.replace(/\s+/g, "")
    );
  });
}

let styleLoaded = 0;

function addLayersOnLoad(){
  ++styleLoaded;
  if (styleLoaded === 2) {
    setTimeout(addLayers, 3_000);
  }
}

beforeMap.on("style.load", addLayersOnLoad);
afterMap.on("style.load", addLayersOnLoad);

// #endregion