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

// #endregion


// #region Click events flags

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

var places_popup_html = "";

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

