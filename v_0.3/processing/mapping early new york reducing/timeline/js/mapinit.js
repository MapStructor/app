let styleLoaded = 0;

// #region Variable Initialization
// Initialize variables for view IDs and visibility flags for different layers.

var grant_lots_view_id = null,
  dgrants_layer_view_id = null,
  native_group_layer_view_id = null,
  grant_lots_view_flag = false,
  demo_layer_view_flag = false,
  castello_layer_view_flag = false,
  settlements_layer_view_flag = false,
  info_layer_view_flag = false,
  dgrants_layer_view_flag = false,
  native_group_layer_view_flag = false;

$("#infoLayerGrantLots").slideUp();
$("#infoLayerDutchGrants").slideUp();
$("#demoLayerInfo").slideUp();
$("#infoLayerCastello").slideUp();
$("#infoLayerNativeGroups").slideUp();

// #endregion

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

// #region Popups Initialization
// Initialize popups for displaying information on the maps without close buttons.

var afterHighDemoPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  }),
  beforeHighDemoPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

//THIS REGION APPEARS COMPLETE. NOT SURE WHY IT ADDED THIS COMMENT:
// Additional popup initializations omitted for brevity...
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

// #region URL and Click Event Flags
// Capture the URL hash for potential use in initializing map states or layers.
var urlHash = window.location.hash;

// Initialize flags for tracking click events on various map features.
var castello_click_ev = false,
  grant_lots_click_ev = false,
  demo_taxlot_click_ev = false,
  dutch_grant_click_ev = false,
  native_groups_click_ev = false,
  farms_click_ev = false,
  settlements_click_ev = false,
  karl_click_ev = false,
  curr_layer_click_ev = false,
  info_click_ev = false,
  gravesend_click_ev = false,
  zoom_labels_click_ev = false;
// #endregion

// #region Popup Content Variables
// Initialize variables to hold HTML content for various popups. These variables will likely be updated dynamically based on user interactions or data queries.

var info_popup_html = "",
  places_popup_html = "",
  settlements_popup_html = "";

// #endregion

// #region Popups Initialization
// Initialize popups for displaying information on the maps. These popups are configured to not close on click, indicating they may be used for persistent display of information.

var afterMapPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  }),
  beforeMapPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

var afterMapPlacesPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  }),
  beforeMapPlacesPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

var afterHighCastelloPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  }),
  beforeHighCastelloPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });
var afterHighGrantLotsPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  }),
  beforeHighGrantLotsPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  });

var afterMapGrantLotPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  }),
  beforeMapGrantLotPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  });

var afterHighMapGrantLotPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  }),
  beforeHighMapGrantLotPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  });

var afterMapDutchGrantPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  }),
  beforeMapDutchGrantPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  });

var afterMapNativeGroupsPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  }),
  beforeMapNativeGroupsPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  });

var afterHighMapNativeGroupsPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  }),
  beforeHighMapNativeGroupsPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    offset: 5,
  });

// #endregion

// #region Hovered and Clicked State Management
// Variables to manage the state of hovered and clicked map features. These are used to track which features are currently under interaction, allowing for dynamic updates to the UI or map based on user actions.
var hoveredStateIdRight = null,
  hoveredStateIdLeft = null,
  hoveredStateIdRightCircle = null,
  hoveredStateIdLeftCircle = null,
  hoveredGrantStateIdRight = null,
  hoveredGrantStateIdLeft = null,
  hoveredGrantLotIdRight = null,
  hoveredGrantLotIdLeft = null,
  hoveredDutchGrantIdRight = null,
  hoveredDutchGrantIdLeft = null,
  /* REPLACE THIS */
  hoveredNativeGroupsIdRight = null,
  hoveredNativeGroupsIdLeft = null;
(hoveredInfoIdRight = null), (hoveredInfoIdLeft = null);

var clickedInfoId = null,
  clickedStateId = null,
  clickedSettlementsId = null;

var demo_layer_feature_props = null,
  demo_layer_features = null,
  demo_layer_taxlot = "";
// #endregion

// #region Event Handling and Popups
// Functions to handle click events on map features and display popups with detailed information.

beforeMap.on("load", function () {
  init_zoom = beforeMap.getZoom();
  init_bearing = beforeMap.getBearing();
  init_center = beforeMap.getCenter();

  beforeMap
    .on("click", "lot_events-bf43eb-left", function (e) {
      DemoClickHandle(e);
    })
    .on("click", "places-left", function (e) {
      CastelloClickHandle(e);
    })

    .on("click", "dutch_grants-5ehfqe-left", function (e) {
      DutchGrantsClickHandle(e);
    })

    .on("click", "native-groups-area-left", function (e) {
      NativeGroupsClickHandle(e);
    })
    .on("click", function () {
      DefaultHandle();
    });
});

afterMap.on("load", function () {
  afterMap
    .on("click", "lot_events-bf43eb-right", function (e) {
      DemoClickHandle(e);
    })
    .on("click", "places-right", function (e) {
      CastelloClickHandle(e);
    })
    .on("click", "dutch_grants-5ehfqe-right", function (e) {
      DutchGrantsClickHandle(e);
    })
    .on("click", "native-groups-area-right", function (e) {
      NativeGroupsClickHandle(e);
    })
    .on("click", function () {
      DefaultHandle();
    });
});

beforeMap.on("error", function (e) {
  // Hide those annoying non-error errors
  if (e && e.error !== "Error") console.log(e);
});

afterMap.on("error", function (e) {
  // Hide those annoying non-error errors
  if (e && e.error !== "Error") console.log(e);
});

// #endregion

// #region Dynamic Filtering and Date Handling
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

      if (demo_layer_view_flag) buildPopUpInfo(demo_layer_feature_props);
    }
  }
}

//TIME LAYER FILTERING. NOT SURE HOW WORKS.

function changeDate(unixDate) {
  var date = parseInt(moment.unix(unixDate).format("YYYYMMDD"));
  var dateFilter = ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]];

  //LAYERS FOR FILTERING

  //NAHC
  beforeMap.setFilter("dutch_grants-5ehfqe-left", dateFilter);
  afterMap.setFilter("dutch_grants-5ehfqe-right", dateFilter);

  beforeMap.setFilter("dutch_grants-5ehfqe-left-highlighted", dateFilter);
  afterMap.setFilter("dutch_grants-5ehfqe-right-highlighted", dateFilter);

  beforeMap.setFilter("lot_events-bf43eb-left", dateFilter);
  afterMap.setFilter("lot_events-bf43eb-right", dateFilter);

  beforeMap.setFilter("grant-lots-left", dateFilter);
  afterMap.setFilter("grant-lots-right", dateFilter);

  beforeMap.setFilter("grant-lots-lines-left", dateFilter);
  afterMap.setFilter("grant-lots-lines-right", dateFilter);

  demoFilterRangeCalc();
} //end function changeDate

// #endregion

// #region Basemap Switching and Layer Addition
// Handle style loading events to add or switch basemaps and layers dynamically.

function addLayers(yr, date) {
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

beforeMap.on("style.load", () => {
  ++styleLoaded;
  if (styleLoaded === 2) {
    setTimeout(addLayers, 3_000);
  }
});

afterMap.on("style.load", () => {
  ++styleLoaded;
  if (styleLoaded === 2) {
    setTimeout(addLayers, 3_000);
  }
});

// #endregion
