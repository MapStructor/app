var grant_lots_view_id = null,
  dgrants_layer_view_id = null,
  grant_lots_view_flag = false,
  demo_layer_view_flag = false,
  castello_layer_view_flag = false,
  dgrants_layer_view_flag = false;

$("#infoLayerGrantLots").slideUp();
$("#infoLayerDutchGrants").slideUp();
$("#demoLayerInfo").slideUp();
$("#infoLayerCastello").slideUp();

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ";

const beforeMapConfig = {
  container: "before",
  style: "mapbox://styles/mapny/clm2yrx1y025401p93v26bhyl",
  center: [0, 0],
  zoom: 0,
  attributionControl: false,
};

const afterMapConfig = {
  container: "after",
  style: "mapbox://styles/mapny/clm2yu5fg022801phfh479c8x",
  center: [0, 0],
  zoom: 0,
  attributionControl: false,
};

var beforeMap = new mapboxgl.Map(beforeMapConfig);

var afterMap = new mapboxgl.Map(afterMapConfig);

var map = new mapboxgl.Compare(beforeMap, afterMap, {
  // Set this to enable comparing two maps by mouse movement:
  // mousemove: true
});

//Before map
var nav = new mapboxgl.NavigationControl();
beforeMap.addControl(nav, "top-right");

//After map
var nav = new mapboxgl.NavigationControl();
afterMap.addControl(nav, "top-right");

//BASEMAP MENU SWITCHING FUNCTIONALITY

var rightInputs = document.getElementsByName("rtoggle");

function switchRightLayer(layer) {
  var rightLayerClass = layer.target.className;
  afterMap.setStyle("mapbox://styles/mapny/" + rightLayerClass);
}

for (var i = 0; i < rightInputs.length; i++) {
  rightInputs[i].onclick = switchRightLayer;
}

var leftInputs = document.getElementsByName("ltoggle");

function switchLeftLayer(layer) {
  var leftLayerClass = layer.target.className;
  beforeMap.setStyle("mapbox://styles/mapny/" + leftLayerClass);
}

for (var i = 0; i < leftInputs.length; i++) {
  leftInputs[i].onclick = switchLeftLayer;
}

//NOT SURE WHAT THIS IS

urlHash = window.location.hash;
var castello_click_ev = false,
  grant_lots_click_ev = false,
  demo_taxlot_click_ev = false,
  dutch_grant_click_ev = false;

var afterMapPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  }),
  beforeMapPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });

var coordinates = [];
var places_popup_html = "";

var afterMapPlacesPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  }),
  beforeMapPlacesPopUp = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
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

var hoveredStateIdRight = null,
  hoveredStateIdLeft = null,
  hoveredStateIdRightCircle = null,
  hoveredStateIdLeftCircle = null,
  hoveredGrantStateIdRight = null,
  hoveredGrantStateIdLeft = null,
  hoveredGrantLotIdRight = null,
  hoveredGrantLotIdLeft = null,
  hoveredDutchGrantIdRight = null,
  hoveredDutchGrantIdLeft = null;

var clickedStateId = null;

beforeMap.on("load", function () {
  beforeMap
    .on("click", "lot_events-bf43eb-left", handleLayerClick("demoLayerInfo", demoLayerView))
    .on("click", "places-left", handleLayerClick("infoLayerCastello", castelloLayerView, buildCastelloPopupInfo))
    .on("click", "grant-lots-left", handleLayerClick("infoLayerGrantLots", grantLotsView, buildGrantLotsPopupInfo))
    .on("click", "dutch_grants-5ehfqe-left", handleLayerClick("infoLayerDutchGrants", dutchGrantsView, buildDutchGrantPopupInfo))
    .on("click", handleMapClick);
});

function handleLayerClick(popupId, flag, buildPopupInfo) {
  return function (e) {
    if (layerViewFlag()) {
      if (currentViewId === e.features[0].id) {
        togglePopup(flag, popupId);
      } else {
        buildPopupInfo(e.features[0].properties);
        togglePopup(flag, popupId);
      }
      currentViewId = e.features[0].id;
    } else {
      buildPopupInfo(e.features[0].properties);
      togglePopup(flag, popupId);
      toggleLayerPanel();
      currentViewId = null;
    }
    resetClickFlags();
  };
}

function handleMapClick() {
  if (!anyLayerClickEvent()) {
    if (windoWidth > 555) toggleLayerPanel();
  }
  resetClickFlags();
}

function resetClickFlags() {
  demoTaxlotClickEv = false;
  castelloClickEv = false;
  grantLotsClickEv = false;
  dutchGrantClickEv = false;
}

function layerViewFlag() {
  return layerViewFlag;
}

function anyLayerClickEvent() {
  return demoTaxlotClickEv || castelloClickEv || grantLotsClickEv || dutchGrantClickEv;
}

function togglePopup(flag, popupId) {
  if (flag) {
    $(`#${popupId}`).slideUp();
    flag = false;
  } else {
    $(`#${popupId}`).slideDown();
    flag = true;
  }
}

function toggleLayerPanel() {
  $("#view-hide-layer-panel").trigger("click");
}


afterMap.on("load", function () {
  afterMap
    .on("click", "lot_events-bf43eb-right", handleClickEvent("demoLayerInfo", demoLayerView, buildPopupInfo))
    .on("click", "places-right", handleClickEvent("infoLayerCastello", castelloLayerView, buildCastelloPopupInfo))
    .on("click", "grant-lots-right", handleClickEvent("infoLayerGrantLots", grantLotsView, buildGrantLotsPopupInfo))
    .on("click", "dutch_grants-5ehfqe-right", handleClickEvent("infoLayerDutchGrants", dutchGrantsView, buildDutchGrantPopupInfo))
    .on("click", handleMapClick);
});

function handleClickEvent(popupId, flag, buildPopupInfo) {
  return function (e) {
    if (layerViewFlag()) {
      if (currentViewId === e.features[0].id) {
        togglePopup(flag, popupId);
      } else {
        buildPopupInfo(e.features[0].properties);
        togglePopup(flag, popupId);
      }
      currentViewId = e.features[0].id;
    } else {
      buildPopupInfo(e.features[0].properties);
      togglePopup(flag, popupId);
      toggleLayerPanel();
      currentViewId = null;
    }
    resetClickFlags();
  };
}

function handleMapClick() {
  if (!anyLayerClickEvent()) {
    if (windoWidth > 555) toggleLayerPanel();
  }
  resetClickFlags();
}

function resetClickFlags() {
  demoTaxlotClickEv = false;
  castelloClickEv = false;
  grantLotsClickEv = false;
  dutchGrantClickEv = false;
}

function layerViewFlag() {
  return layerViewFlag;
}

function anyLayerClickEvent() {
  return demoTaxlotClickEv || castelloClickEv || grantLotsClickEv || dutchGrantClickEv;
}

function togglePopup(flag, popupId) {
  if (flag) {
    $(`#${popupId}`).slideUp();
    flag = false;
  } else {
    $(`#${popupId}`).slideDown();
    flag = true;
  }
}

function toggleLayerPanel() {
  $("#view-hide-layer-panel").trigger("click");
}


beforeMap.on("error", function (e) {
  // Hide those annoying non-error errors
  if (e && e.error !== "Error") console.log(e);
});

afterMap.on("error", function (e) {
  // Hide those annoying non-error errors
  if (e && e.error !== "Error") console.log(e);
});

//TIME LAYER FILTERING. NOT SURE HOW WORKS.

function changeDate(unixDate) {
  var year = parseInt(moment.unix(unixDate).format("YYYY"));
  var date = parseInt(moment.unix(unixDate).format("YYYYMMDD"));

  var sv = $("#year");
  if (year < 1700) {
    sv.removeClass("y1700")
      .removeClass("y1800")
      .removeClass("y1850")
      .removeClass("y1900")
      .removeClass("y1950")
      .removeClass("y2000")
      .addClass("y1600");
  }
  if (year >= 1700 && year < 1800) {
    sv.removeClass("y1600")
      .removeClass("y1800")
      .removeClass("y1850")
      .removeClass("y1900")
      .removeClass("y1950")
      .removeClass("y2000")
      .addClass("y1700");
  }
  if (year >= 1800 && year < 1850) {
    sv.removeClass("y1700")
      .removeClass("y1600")
      .removeClass("y1850")
      .removeClass("y1900")
      .removeClass("y1950")
      .removeClass("y2000")
      .addClass("y1800");
  }
  if (year >= 1850 && year < 1900) {
    sv.removeClass("y1700")
      .removeClass("y1800")
      .removeClass("y1600")
      .removeClass("y1900")
      .removeClass("y1950")
      .removeClass("y2000")
      .addClass("y1850");
  }
  if (year >= 1900 && year < 1950) {
    sv.removeClass("y1700")
      .removeClass("y1800")
      .removeClass("y1850")
      .removeClass("y1600")
      .removeClass("y1950")
      .removeClass("y2000")
      .addClass("y1900");
  }
  if (year >= 1950 && year < 2000) {
    sv.removeClass("y1700")
      .removeClass("y1800")
      .removeClass("y1850")
      .removeClass("y1900")
      .removeClass("y1600")
      .removeClass("y2000")
      .addClass("y1950");
  }
  if (year >= 2000) {
    sv.removeClass("y1700")
      .removeClass("y1800")
      .removeClass("y1850")
      .removeClass("y1900")
      .removeClass("y1950")
      .removeClass("y1600")
      .addClass("y2000");
  }

  var dateFilter = ["all", ["<=", "DayStart", date], [">=", "DayEnd", date]];

  //LAYERS FOR FILTERING

  //NAHC
  beforeMap.setFilter("dutch_grants-5ehfqe-left", dateFilter);
  afterMap.setFilter("dutch_grants-5ehfqe-right", dateFilter);

  beforeMap.setFilter("lot_events-bf43eb-left", dateFilter);
  afterMap.setFilter("lot_events-bf43eb-right", dateFilter);

  beforeMap.setFilter("grant-lots-left", dateFilter);
  afterMap.setFilter("grant-lots-right", dateFilter);

  var layer_features = afterMap.queryRenderedFeatures({
    layers: ["lot_events-bf43eb-right"],
  });
  if (demo_layer_view_flag) {
    buildPopUpInfo(layer_features[0].properties);
  }
} //end function changeDate

//LAYERS AND LEGEND

function addGrantLotsBeforeLayers(date) {
  //REMOVING TAX LOT POINTS IF EXIST
  removeTaxPoints(beforeMap, [{
    type: "layer",
    id: "grant-lots-left"
  }, {
    type: "source",
    id: "demo_divisions_grant_c7-42w8pa"
  }])
  // Add a layer showing the places.
  addMapLayer(beforeMap, getBeforeLayer("grant-lots-left"), date)

  //CURSOR ON HOVER
  //ON HOVER
  beforeMap.on("mouseenter", "grant-lots-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    beforeMapGrantLotPopUp.setLngLat(e.lngLat).addTo(beforeMap);
  });

  beforeMap.on("mousemove", "grant-lots-left", function (e) {
    if (e.features.length > 0) {
      if (hoveredGrantLotIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "grant-lots-left",
            sourceLayer: "demo_divisions_grant_c7-42w8pa",
            id: hoveredGrantLotIdLeft,
          },
          { hover: false }
        );
      }
      hoveredGrantLotIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "grant-lots-left",
          sourceLayer: "demo_divisions_grant_c7-42w8pa",
          id: hoveredGrantLotIdLeft,
        },
        { hover: true }
      );

      var PopUpHTML =
        "<div class='infoLayerGrantLotsPopUp'>" +
        e.features[0].properties.name +
        "<br>" +
        "<b>Start:</b> " +
        e.features[0].properties.day1 +
        ", " +
        e.features[0].properties.year1 +
        "<br>" +
        "<b>End:</b> " +
        e.features[0].properties.day2 +
        ", " +
        e.features[0].properties.year2 +
        "<br>" +
        "<b>Lot Division: </b>" +
        e.features[0].properties.dutchlot +
        "</div>";

      coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //BEFORE MAP POP UP CONTENTS
      beforeMapGrantLotPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "grant-lots-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredGrantLotIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "grant-lots-left",
          sourceLayer: "demo_divisions_grant_c7-42w8pa",
          id: hoveredGrantLotIdLeft,
        },
        { hover: false }
      );
    }
    hoveredGrantLotIdLeft = null;
    if (beforeMapGrantLotPopUp.isOpen()) beforeMapGrantLotPopUp.remove();
  });
}

function addCastelloBeforeLayers() {
  // Add a layer showing the places.
  addMapLayer(beforeMap, getBeforeLayer("places-left"))

  //ON HOVER
  beforeMap.on("mouseenter", "places-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    if (e.features.length > 0) {
      if (hoveredStateIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "places-left",
            sourceLayer: "taxlots-cpwvol",
            id: hoveredStateIdLeft,
          },
          { hover: false }
        );
      }
      hoveredStateIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "places-left",
          sourceLayer: "taxlots-cpwvol",
          id: hoveredStateIdLeft,
        },
        { hover: true }
      );

      coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //BEFORE MAP POP UP CONTENTS
      beforeMapPlacesPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='infoLayerCastelloPopUp'>" +
            "<b>Taxlot (1660):</b> " +
            "<br>" +
            e.features[0].properties.LOT2 +
            "</div>"
        )
        .addTo(beforeMap);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "places-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredStateIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "places-left",
          sourceLayer: "taxlots-cpwvol",
          id: hoveredStateIdLeft,
        },
        { hover: false }
      );
    }
    hoveredStateIdLeft = null;
    if (beforeMapPlacesPopUp.isOpen()) beforeMapPlacesPopUp.remove();
  });
}

function addGrantLotsAfterLayers(date) {
  const layerId = "grant-lots-right";
  const sourceLayer = "demo_divisions_grant_c7-42w8pa";
  let hoveredGrantLotIdRight = null;

  // Remove tax lot points if they exist
  removeTaxPoints(afterMap, [
    { type: "layer", id: layerId },
    { type: "source", id: sourceLayer }
  ]);

  // Add a layer showing the grant lots
  addMapLayer(afterMap, getLayer(layerId), date);

  // Cursor on hover
  afterMap.on("mouseenter", layerId, handleMouseEnter);
  afterMap.on("mousemove", layerId, handleMouseMove);
  afterMap.on("mouseleave", layerId, handleMouseLeave);

  function handleMouseEnter(e) {
    afterMap.getCanvas().style.cursor = "pointer";
    clearHoveredGrantLot();
    hoveredGrantLotIdRight = e.features[0].id;
    setFeatureState({ hover: true });
    showGrantLotPopup(afterMap, e.features[0]);
  }

  function handleMouseMove(e) {
    if (e.features.length > 0) {
      clearHoveredGrantLot();
      hoveredGrantLotIdRight = e.features[0].id;
      setFeatureState({ hover: true });
      showGrantLotPopup(afterMap, e.features[0]);
    }
  }

  function handleMouseLeave() {
    afterMap.getCanvas().style.cursor = "";
    clearHoveredGrantLot();
    if (afterMapGrantLotPopUp.isOpen()) afterMapGrantLotPopUp.remove();
  }

  function setFeatureState(state) {
    afterMap.setFeatureState({ source: layerId, sourceLayer, id: hoveredGrantLotIdRight }, state);
  }

  function clearHoveredGrantLot() {
    if (hoveredGrantLotIdRight) {
      setFeatureState({ hover: false });
      hoveredGrantLotIdRight = null;
    }
  }

  function showGrantLotPopup(map, feature) {
    const { name, day1, year1, day2, year2, dutchlot } = feature.properties;
    const popUpHTML = `
      <div class='infoLayerGrantLotsPopUp'>
        ${name}<br>
        <b>Start:</b> ${day1}, ${year1}<br>
        <b>End:</b> ${day2}, ${year2}<br>
        <b>Lot Division: </b>${dutchlot}
      </div>
    `;

    const coordinates = feature.geometry.coordinates.slice();

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(afterMap.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += afterMap.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    afterMapGrantLotPopUp.setLngLat(afterMap.lngLat).setHTML(popUpHTML);
  }
}


function addCastelloAfterLayers() {
  const layerId = "places-right";
  const sourceLayer = "taxlots-cpwvol";

  // Add a layer showing the places.
  addMapLayer(afterMap, getLayer(layerId));

  // Hover handlers
  afterMap.on("mouseenter", layerId, handleMouseEnter);
  afterMap.on("mouseleave", layerId, handleMouseLeave);

  let hoveredStateId = null;

  function handleMouseEnter(e) {
    afterMap.getCanvas().style.cursor = "pointer";
    if (e.features.length > 0) {
      clearHoveredState();
      hoveredStateId = e.features[0].id;
      setFeatureState({ hover: true });
      showPopup(afterMap, e.features[0], afterMapPlacesPopUp);
    }
  }

  function handleMouseLeave() {
    afterMap.getCanvas().style.cursor = "";
    if (hoveredStateId) {
      setFeatureState({ hover: false });
      hoveredStateId = null;
      if (afterMapPlacesPopUp.isOpen()) afterMapPlacesPopUp.remove();
    }
  }

  function setFeatureState(state) {
    afterMap.setFeatureState({ source: layerId, sourceLayer, id: hoveredStateId }, state);
  }

  function clearHoveredState() {
    if (hoveredStateId) {
      setFeatureState({ hover: false });
    }
  }
}

//BASEMAP SWITCHING
beforeMap.on("style.load", function () {
  //on the 'style.load' event, switch "basemaps" and then re-add layers
  //this is necessary because basemaps aren't a concept in Mapbox, all layers are added via the same primitives
  var sliderVal = moment($("#date").text()).unix();
  var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
  var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));

  addBeforeLayers(yr, date);
  addCastelloBeforeLayers();
  addGrantLotsBeforeLayers(date);
});
afterMap.on("style.load", function () {
  //on the 'style.load' event, switch "basemaps" and then re-add layers
  //this is necessary because basemaps aren't a concept in Mapbox, all layers are added via the same primitives
  var sliderVal = moment($("#date").text()).unix();
  var yr = parseInt(moment.unix(sliderVal).format("YYYY"));
  var date = parseInt(moment.unix(sliderVal).format("YYYYMMDD"));


  addAfterLayers(yr, date);
  addCastelloAfterLayers();
  addGrantLotsAfterLayers(date);
});

//MAP LAYERS

function addBeforeLayers(yr, date) {
  const grantLayerId = "dutch_grants-5ehfqe-left";
  const taxLotLayerId = "lot_events-bf43eb-left";

  removeTaxPoints(beforeMap, [
    { type: "layer", id: grantLayerId },
    { type: "source", id: grantLayerId.replace("-left", "") },
    { type: "layer", id: taxLotLayerId },
    { type: "source", id: taxLotLayerId.replace("-left", "") },
  ]);

  // ADD GRANTS POLYGONS
  addMapLayer(beforeMap, getBeforeLayer(grantLayerId), date);

  // CURSOR ON HOVER - DUTCH GRANTS
  setupHoverHandlers(beforeMap, grantLayerId, beforeMapDutchGrantPopUp, "Dutch Grant Lot");

  // ADD TAX LOT POINTS
  addMapLayer(beforeMap, getBeforeLayer(taxLotLayerId), date);

  // CHANGE TO CURSOR WHEN HOVERING - TAX LOT POINTS
  setupHoverHandlers(beforeMap, taxLotLayerId, beforeMapPopUp, "Taxlot", "C7");
}

function setupHoverHandlers(map, layerId, popup, popupContentKey, popupContentValue) {
  let hoveredStateId = null;

  map.on("mouseenter", layerId, function (e) {
    map.getCanvas().style.cursor = "pointer";

    if (hoveredStateId) {
      map.setFeatureState({ source: layerId, id: hoveredStateId }, { hover: false });
    }

    hoveredStateId = e.features[0].id;
    map.setFeatureState({ source: layerId, id: hoveredStateId }, { hover: true });

    showPopup(map, e.features[0], popup, popupContentKey, popupContentValue);
  });

  map.on("mouseleave", layerId, function () {
    map.getCanvas().style.cursor = "";

    if (hoveredStateId) {
      map.setFeatureState({ source: layerId, id: hoveredStateId }, { hover: false });
    }

    hoveredStateId = null;

    if (popup.isOpen()) popup.remove();
  });
}

function showPopup(map, feature, popup, key, value) {
  const popupHTML = `<div class='infoLayerDutchGrantsPopUp'>${feature.properties[key]}<br><b>${key}:</b> ${value || feature.properties[value]}</div>`;
  const coordinates = feature.geometry.coordinates.slice();

  while (Math.abs(map.getCenter().lng - coordinates[0]) > 180) {
    coordinates[0] += map.getCenter().lng > coordinates[0] ? 360 : -360;
  }

  popup.setLngLat(coordinates).setHTML(popupHTML);
}


function addAfterLayers(yr, date) {
  const grantLayerId = "dutch_grants-5ehfqe-right";
  const taxLotLayerId = "lot_events-bf43eb-right";

  removeTaxPoints(afterMap, [
    { type: "layer", id: grantLayerId },
    { type: "source", id: grantLayerId.replace("-right", "") },
    { type: "layer", id: taxLotLayerId },
    { type: "source", id: taxLotLayerId.replace("-right", "") },
  ]);

  // ADD GRANTS POLYGONS
  addMapLayer(afterMap, getLayer(grantLayerId), date);

  // CURSOR ON HOVER - DUTCH GRANTS
  setupHoverHandlers(afterMap, grantLayerId, afterMapDutchGrantPopUp, "Dutch Grant Lot");

  // ADD TAX LOT POINTS
  addMapLayer(afterMap, getLayer(taxLotLayerId), date);

  // CHANGE TO CURSOR WHEN HOVERING - TAX LOT POINTS
  setupHoverHandlers(afterMap, taxLotLayerId, afterMapPopUp, "Taxlot", "C7");
}

function setupHoverHandlers(map, layerId, popup, popupContentKey, popupContentValue) {
  let hoveredStateId = null;

  map.on("mouseenter", layerId, function (e) {
    map.getCanvas().style.cursor = "pointer";

    if (hoveredStateId) {
      map.setFeatureState({ source: layerId, id: hoveredStateId }, { hover: false });
    }

    hoveredStateId = e.features[0].id;
    map.setFeatureState({ source: layerId, id: hoveredStateId }, { hover: true });

    showPopup(map, e.features[0], popup, popupContentKey, popupContentValue);
  });

  map.on("mouseleave", layerId, function () {
    map.getCanvas().style.cursor = "";

    if (hoveredStateId) {
      map.setFeatureState({ source: layerId, id: hoveredStateId }, { hover: false });
    }

    hoveredStateId = null;

    if (popup.isOpen()) popup.remove();
  });
}

function showPopup(map, feature, popup, key, value) {
  const popupHTML = `<div class='infoLayerDutchGrantsPopUp'>${feature.properties[key]}<br><b>${key}:</b> ${value || feature.properties[value]}</div>`;
  const coordinates = feature.geometry.coordinates.slice();

  while (Math.abs(map.getCenter().lng - coordinates[0]) > 180) {
    coordinates[0] += map.getCenter().lng > coordinates[0] ? 360 : -360;
  }

  popup.setLngLat(coordinates).setHTML(popupHTML);
}


function buildPopUpInfo(props) {
  const popup_html = `
    <b><h2>Demo Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/c7' target='_blank'>C7</a></h2></b>
    <b>Property Type: </b>House<hr>
    <b> FROM: </b>${props.DATE1}<br><b> TO: </b>${props.DATE2}${props.Unknown}<hr>
    ${props.Next}
    <a href=https://nahc-mapping.org/mappingNY${props.TO_PAR1}: <br><a href=https://nahc-mapping.org/mappingNY${props.TO_1} (<a href=https://nahc-mapping.org/mappingNY${props.TO_ENT1})<br><br>
    <a href=https://nahc-mapping.org/mappingNY${props.TO_PAR2}: <br><a href=https://nahc-mapping.org/mappingNY${props.TO_2} (<a href=https://nahc-mapping.org/mappingNY${props.TO_ENT2})<br><br>
    ${props.Tax_Event}<br>
    <a href=https://nahc-mapping.org/mappingNY${props.EVENT1}<hr>
    ${props.Previous}<br>
    <a href=https://nahc-mapping.org/mappingNY${props.FROM_PAR1}: <br><a href=https://nahc-mapping.org/mappingNY${props.FROM_1} (<a href=https://nahc-mapping.org/mappingNY${props.FROM_ENT1})<br><br>
    <a href=https://nahc-mapping.org/mappingNY${props.FROM_PAR2}: <br><a href=https://nahc-mapping.org/mappingNY${props.FROM_2} (<a href=https://nahc-mapping.org/mappingNY${props.FROM_ENT2})${props.Event}<a href=https://nahc-mapping.org/mappingNY${props.Prev_Event}<br><hr>
    <b> <h3><a href="https://encyclopedia.nahc-mapping.org/taxlot-events" target="_blank">SEE ALL TAXLOT EVENTS</a></h3></b>`;

  $("#demoLayerInfo").html(popup_html);
}


function buildGrantLotsPopUpInfo(props) {
  const popup_html = `
    <h3>Grant Lot Division</h3><hr><br>
    <b>Original Dutch Grant:</b> <a href='https://encyclopedia.nahc-mapping.org/grantlot/${props.Lot}' target='_blank'>${props.Lot}</a><br><br>
    <b>Lot Division: </b>${props.dutchlot}<br>
    <b>Castello Taxlot (1660): </b>${props.castello}<br><br>
    <b>Ownership:</b> ${props.name}<br>
    <b>From:</b> ${props.from}<br><br>
    <b>Start:</b> ${props.day1}, ${props.year1}<br>
    <b>End:</b> ${props.day2}, ${props.year2}<br><br>
    <b>Description:</b><br>${props.description}<br><br>`;

  $("#infoLayerGrantLots").html(popup_html);
}


function buildDutchGrantPopUpInfo(props) {
  const popup_html = `
    <h3>Dutch Grant</h3><hr>
    ${props.name}<br>
    <b>Dutch Grant Lot:</b> <a href='https://encyclopedia.nahc-mapping.org/grantlot/${props.Lot}' target='_blank'>${props.Lot}</a><br><br>
    <b>Start:</b> <i>${props.day1} ${props.year1}</i><br>
    <b>End:</b> <i>${props.day2} ${props.year2}</i><br><br>
    <b>Description (partial):</b><br>${props.description}<br><br>`;

  $("#infoLayerDutchGrants").html(popup_html);
}
