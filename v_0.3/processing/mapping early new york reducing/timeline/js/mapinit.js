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

// world bounds
const WorldBounds = [
  [-179, -59], // [west, south]
  [135, 77], // [east, north]
];

// area bounds
var LongIslandBounds = [
    [-74.0419692, 40.5419011],
    [-71.8562705, 41.161155],
  ],
  ManhattanBounds = [
    [-74.04772962697074, 40.682916945445164],
    [-73.90665099539478, 40.879038046804695],
  ],
  NYCbounds = [
    [-74.25559136315213, 40.496133987611834],
    [-73.7000090638712, 40.91553277650267],
  ],
  BronxBounds = [
    [-73.93360592036706, 40.785356620508495],
    [-73.76533243995276, 40.91553277650267],
  ],
  BrooklynBounds = [
    [-74.04189660705046, 40.56952999398417],
    [-73.8335592388046, 40.73912795313439],
  ],
  QueensBounds = [
    [-73.96262015898652, 40.54183396045311],
    [-73.7000090638712, 40.80101146781903],
  ],
  StatenIslandBounds = [
    [-74.25559136315213, 40.496133987611834],
    [-74.04923629842045, 40.648925552276076],
  ],
  NewNLbounds = [
    [-75.5588888888889, 39.5483333333333],
    [-71.6483333333333, 42.64485],
  ],
  NewEnglandBounds = [
    [-73.6468505859375, 41.017210578228436],
    [-69.708251953125, 43.97700467496408],
  ];

//ACCESS TOKEN

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ";

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

var afterHighDemoPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  }),
  beforeHighDemoPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

var map = new mapboxgl.Compare(beforeMap, afterMap, {
  // Set this to enable comparing two maps by mouse movement:
  // mousemove: true
});

//Before map
var nav = new mapboxgl.NavigationControl();
beforeMap.addControl(nav, "bottom-right");

//After map
var nav = new mapboxgl.NavigationControl();
afterMap.addControl(nav, "bottom-right");

var init_bearing, init_center, init_zoom;

var na_bearing = -51.3,
  na_center = [-74.01255, 40.704882],
  na_zoom = 16.34;

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

var urlHash = window.location.hash;
var castello_click_ev = false,
  grant_lots_click_ev = false,
  demo_taxlot_click_ev = false,
  dutch_grant_click_ev = false,
  native_groups_click_ev = false,
  zoom_labels_click_ev = false;

var afterMapPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  }),
  beforeMapPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

var info_popup_html = "",
  places_popup_html = "",
  settlements_popup_html = "";

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

//   ZOOM LABELS
var lbl_color = "#482525";
var lbl_color_hover = "#ff0000";


//BASEMAP SWITCHING
beforeMap.on("style.load", function () {
  var sliderVal = moment($("#date").text()).unix();
  var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
  var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));

  addInfoBeforeLayers(date);
  addInfoLabelsBeforeLayers(date);

  setTimeout(function () {
    addGrantLotsBeforeLayers(date);
    addGrantLotsLinesBeforeLayers(date);
    addBeforeLayers(yr, date);
    addBeforeFarmsLayer(date);
  }, 1000);

  setTimeout(function () {
    addBeforeLabelsLayer();
    addCastelloBeforeLayers();
    addCurrentLotsBeforeLayers();
    addManahattaBeforeLayers();
    addLongIslandCoastlineBeforeLayers();
    addIndianPathsBeforeLayers();
    addLongIslandNativeGroupsBeforeLayers();
  }, 2000);
});

//BASEMAP SWITCHING
afterMap.on("style.load", function () {
  var sliderVal = moment($("#date").text()).unix();
  var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
  var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));

  setTimeout(function () {
    addInfoAfterLayers(date);
    addInfoLabelsAfterLayers(date);
  }, 500);

  setTimeout(function () {
    addGrantLotsAfterLayers(date);
    addGrantLotsLinesAfterLayers(date);
    addAfterLayers(yr, date);
  }, 1500);

  setTimeout(function () {
    addAfterLabelsLayer();
    addCastelloAfterLayers();
    addManahattaAfterLayers();
    addLongIslandCoastlineAfterLayers();
    addLongIslandNativeGroupsAfterLayers();
  }, 2500);
});
