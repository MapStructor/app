function addAfterLayers(_, date) {
  removeTaxPoints(afterMap, [
    {type: "layer", id: "lot_events-bf43eb-right"},
    {type: "source", id: "lot_events-bf43eb"},
    {type: "layer", id: "dutch_grants-5ehfqe-right"},
    {type: "source", id: "dutch_grants-5ehfqe"}
  ]) 

  addMapLayer(afterMap, getLayer("dutch_grants-5ehfqe-right-highlighted"), date);
  addMapLayer(afterMap, getLayer("dutch_grants-5ehfqe-right"), date);

    afterMap.on("mouseenter", "dutch_grants-5ehfqe-right", function (e) {
      afterMap.getCanvas().style.cursor = "pointer";
      afterMapDutchGrantPopUp.setLngLat(e.lngLat).addTo(afterMap);
    });

    afterMap.on("mousemove", "dutch_grants-5ehfqe-right", function (e) {
      if (e.features.length > 0) {
        if (hoveredDutchGrantIdRight) {
          afterMap.setFeatureState(
            {
              source: "dutch_grants-5ehfqe-right",
              sourceLayer: "dutch_grants-5ehfqe",
              id: hoveredDutchGrantIdRight,
            },
            { hover: false }
          );
        }
        hoveredDutchGrantIdRight = e.features[0].id;
        afterMap.setFeatureState(
          {
            source: "dutch_grants-5ehfqe-right",
            sourceLayer: "dutch_grants-5ehfqe",
            id: hoveredDutchGrantIdRight,
          },
          { hover: true }
        );

        var PopUpHTML = "";
        if (
          typeof dutch_grant_lots_info[e.features[0].properties.Lot] ==
          "undefined"
        ) {
          PopUpHTML =
            "<div class='infoLayerDutchGrantsPopUp'>" +
            e.features[0].properties.name +
            "<br>";
        } else {
          PopUpHTML =
            "<div class='infoLayerDutchGrantsPopUp'>" +
            (dutch_grant_lots_info[e.features[0].properties.Lot].name_txt
              .length > 0
              ? dutch_grant_lots_info[e.features[0].properties.Lot].name_txt
              : e.features[0].properties.name) +
            "<br>";
        }
        PopUpHTML +=
          "<b>Dutch Grant Lot: </b>" + e.features[0].properties.Lot + "</div>";

        var coordinates = e.features[0].geometry.coordinates.slice();
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        //AFTER MAP POP UP CONTENTS
        afterMapDutchGrantPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
      }
    });

    afterMap.on("mouseleave", "dutch_grants-5ehfqe-right", function () {
      afterMap.getCanvas().style.cursor = "";
      if (hoveredDutchGrantIdRight) {
        afterMap.setFeatureState(
          {
            source: "dutch_grants-5ehfqe-right",
            sourceLayer: "dutch_grants-5ehfqe",
            id: hoveredDutchGrantIdRight,
          },
          { hover: false }
        );
      }
      hoveredDutchGrantIdRight = null;
      if (afterMapDutchGrantPopUp.isOpen()) afterMapDutchGrantPopUp.remove();
    });

  addMapLayer(afterMap, getLayer("lot_events-bf43eb-right"), date)

    afterMap.on("mouseenter", "lot_events-bf43eb-right", function (e) {
      afterMap.getCanvas().style.cursor = "pointer";

      if (hoveredStateIdRightCircle) {
        afterMap.setFeatureState(
          {
            source: "lot_events-bf43eb-right",
            sourceLayer: "lot_events-bf43eb",
            id: hoveredStateIdRightCircle,
          },
          { hover: false }
        );
      }
      hoveredStateIdRightCircle = e.features[0].id;
      afterMap.setFeatureState(
        {
          source: "lot_events-bf43eb-right",
          sourceLayer: "lot_events-bf43eb",
          id: hoveredStateIdRightCircle,
        },
        { hover: true }
      );

      var coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      afterMapPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/" +
            e.features[0].properties.TAXLOT +
            "' target='_blank'>" +
            e.features[0].properties.TAXLOT +
            "</a></h2></b></div>"
        )
        .addTo(afterMap);
    });

    afterMap.on("mouseleave", "lot_events-bf43eb-right", function () {
      afterMap.getCanvas().style.cursor = "";
      if (hoveredStateIdRightCircle) {
        afterMap.setFeatureState(
          {
            source: "lot_events-bf43eb-right",
            sourceLayer: "lot_events-bf43eb",
            id: hoveredStateIdRightCircle,
          },
          { hover: false }
        );
      }
      hoveredStateIdRightCircle = null;
      if (afterMapPopUp.isOpen()) afterMapPopUp.remove();
    });
}

function addGrantLotsAfterLayers(date) {
  removeTaxPoints(afterMap, [
    {type: "layer", id: "grant-lots-right"},
    {type: "source", id: "demo_divisions_grant_c7-42w8pa"}
  ])

  addMapLayer(afterMap, getLayer("grant-lots-right"), date)

    afterMap.on("mouseenter", "grant-lots-right", function (e) {
      afterMap.getCanvas().style.cursor = "pointer";
      afterMapGrantLotPopUp.setLngLat(e.lngLat).addTo(afterMap);
    });

    afterMap.on("mousemove", "grant-lots-right", function (e) {
      if (e.features.length > 0) {
        if (hoveredGrantLotIdRight) {
          afterMap.setFeatureState(
            {
              source: "grant-lots-right",
              sourceLayer: "demo_divisions_grant_c7-42w8pa",
              id: hoveredGrantLotIdRight,
            },
            { hover: false }
          );
        }
        hoveredGrantLotIdRight = e.features[0].id;
        afterMap.setFeatureState(
          {
            source: "grant-lots-right",
            sourceLayer: "demo_divisions_grant_c7-42w8pa",
            id: hoveredGrantLotIdRight,
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
          //"<br>" +
          "<b>Lot Division: </b>" +
          e.features[0].properties.dutchlot +
          "</div>";

        var coordinates = e.features[0].geometry.coordinates.slice();

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        //AFTER MAP POP UP CONTENTS
        afterMapGrantLotPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
      }
    });

    afterMap.on("mouseleave", "grant-lots-right", function () {
      afterMap.getCanvas().style.cursor = "";
      if (hoveredGrantLotIdRight) {
        afterMap.setFeatureState(
          {
            source: "grant-lots-right",
            sourceLayer: "demo_divisions_grant_c7-42w8pa",
            id: hoveredGrantLotIdRight,
          },
          { hover: false }
        );
      }
      hoveredGrantLotIdRight = null;
      if (afterMapGrantLotPopUp.isOpen()) afterMapGrantLotPopUp.remove();
    });
  

}

function addGrantLotsLinesAfterLayers(date) {
  removeTaxPoints(afterMap, [{
    type: "layer",
    id: "grant-lots-lines-right"
  },
  {
    type: "source",
    id: "dutch_grants_lines-0y4gkx"
  }
])
  addMapLayer(afterMap, getLayer("grant-lots-lines-right"), date)
}

function addInfoAfterLayers(date) {
  // Add a layer showing the info.
  addMapLayer(afterMap, getLayer("info-points-right"), date)

  //ON HOVER
  afterMap.on("mouseenter", "info-points-right", function (e) {
    afterMap.getCanvas().style.cursor = "pointer";
    if (e.features.length > 0) {
      if (hoveredInfoIdRight) {
        afterMap.setFeatureState(
          {
            source: "info-points-right",
            sourceLayer: "info_of_interest-17rpk9",
            id: hoveredInfoIdRight,
          },
          { hover: false }
        );
      }
      hoveredInfoIdRight = e.features[0].id;
      afterMap.setFeatureState(
        {
          source: "info-points-right",
          sourceLayer: "info_of_interest-17rpk9",
          id: hoveredInfoIdRight,
        },
        { hover: true }
      );

      var coordinates = e.features[0].geometry.coordinates.slice();

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //AFTER MAP POP UP CONTENTS
      afterMapInfoPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='infoLayerInfoPointPopUp'><b>" +
            e.features[0].properties.Label +
            "</b><br>" +
            "</div>"
        )
        .addTo(afterMap);
    }
  });

  //OFF HOVER
  afterMap.on("mouseleave", "info-points-right", function () {
    afterMap.getCanvas().style.cursor = "";
    if (hoveredInfoIdRight) {
      afterMap.setFeatureState(
        {
          source: "info-points-right",
          sourceLayer: "info_of_interest-17rpk9",
          id: hoveredInfoIdRight,
        },
        { hover: false }
      );
    }
    hoveredInfoIdRight = null;
    if (afterMapInfoPopUp.isOpen()) afterMapInfoPopUp.remove();
  });
}

// Info Static Layer

function addInfoLabelsAfterLayers(date) {
  // Add a layer showing the places.
  addMapLayer(afterMap, getLayer("info-labels-right"), date)
}

// Castello Static Layer

function addCastelloAfterLayers() {
  // Add a layer showing the places.
  addMapLayer(afterMap, getLayer("places-right"))

  //ON HOVER
  afterMap.on("mouseenter", "places-right", function (e) {
    afterMap.getCanvas().style.cursor = "pointer";
    if (e.features.length > 0) {
      if (hoveredStateIdRight) {
        afterMap.setFeatureState(
          {
            source: "places-right",
            sourceLayer: "taxlots-cpwvol",
            id: hoveredStateIdRight,
          },
          { hover: false }
        );
      }
      hoveredStateIdRight = e.features[0].id;
      afterMap.setFeatureState(
        {
          source: "places-right",
          sourceLayer: "taxlots-cpwvol",
          id: hoveredStateIdRight,
        },
        { hover: true }
      );

      var coordinates = e.features[0].geometry.coordinates.slice();
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //AFTER MAP POP UP CONTENTS
      afterMapPlacesPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='infoLayerCastelloPopUp'><b>Taxlot (1660):</b><br>" +
            e.features[0].properties.LOT2 +
            "</div>"
        )
        .addTo(afterMap);
    }
  });

  //OFF HOVER
  afterMap.on("mouseleave", "places-right", function () {
    afterMap.getCanvas().style.cursor = "";
    if (hoveredStateIdRight) {
      afterMap.setFeatureState(
        {
          source: "places-right",
          sourceLayer: "taxlots-cpwvol",
          id: hoveredStateIdRight,
        },
        { hover: false }
      );
    }
    hoveredStateIdRight = null;
    if (afterMapPlacesPopUp.isOpen()) afterMapPlacesPopUp.remove();
  });
}


function addLongIslandCoastlineAfterLayers() {
  addMapLayer(afterMap, getLayer( "long-island-right"))
  addMapLayer(afterMap, getLayer("long-island-area-right"))
}

function addManahattaAfterLayers() {
  addMapLayer(afterMap, getLayer("lenape-trails-right"))
  addMapLayer(afterMap, getLayer("manahatta-shoreline-right"))
  addMapLayer(afterMap, getLayer("streams-right"))
}



function addLongIslandNativeGroupsAfterLayers() {
  addMapLayer(afterMap, getLayer("native-groups-lines-right"))
  addMapLayer(afterMap, getLayer("native-groups-area-right"))
  addMapLayer(afterMap, getLayer("native-groups-area-right-highlighted"))
  addMapLayer(afterMap, getLayer("native-groups-labels-right"))

  //CURSOR ON HOVER
  //ON HOVER
  afterMap.on("mouseenter", "native-groups-area-right", function (e) {
    afterMap.getCanvas().style.cursor = "pointer";
    afterMapNativeGroupsPopUp.setLngLat(e.lngLat).addTo(afterMap);
  });

  afterMap.on("mousemove", "native-groups-area-right", function (e) {
    if (e.features.length > 0) {
      if (hoveredNativeGroupsIdRight) {
        afterMap.setFeatureState(
          {
            source: "native-groups-area-right",
            sourceLayer: "indian_areas_long_island-50h2dj",
            id: hoveredNativeGroupsIdRight,
          },
          { hover: false }
        );
      }
      hoveredNativeGroupsIdRight = e.features[0].id;
      afterMap.setFeatureState(
        {
          source: "native-groups-area-right",
          sourceLayer: "indian_areas_long_island-50h2dj",
          id: hoveredNativeGroupsIdRight,
        },
        { hover: true }
      );

      var PopUpHTML = "";
      if (
        typeof taxlot_event_entities_info[e.features[0].properties.nid] ==
          "undefined" ||
        e.features[0].properties.nid == ""
      ) {
        PopUpHTML =
          "<div class='infoLayerCastelloPopUp'><b>Name : </b>" +
          e.features[0].properties.name +
          "</div>";
      } else {
        PopUpHTML =
          "<div class='infoLayerCastelloPopUp'><b>Name : </b>" +
          (taxlot_event_entities_info[e.features[0].properties.nid].name
            .length > 0
            ? taxlot_event_entities_info[e.features[0].properties.nid].name
            : e.features[0].properties.name) +
          "</div>";
      }

      var coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //AFTER MAP POP UP CONTENTS
      afterMapNativeGroupsPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
    }
  });

  //OFF HOVER
  afterMap.on("mouseleave", "native-groups-area-right", function () {
    afterMap.getCanvas().style.cursor = "";
    if (hoveredNativeGroupsIdRight) {
      afterMap.setFeatureState(
        {
          source: "native-groups-area-right",
          sourceLayer: "indian_areas_long_island-50h2dj",
          id: hoveredNativeGroupsIdRight,
        },
        { hover: false }
      );
    }
    hoveredNativeGroupsIdRight = null;
    if (afterMapNativeGroupsPopUp.isOpen()) afterMapNativeGroupsPopUp.remove();
  });
}

// Interactive Zoom Labels Layer

function addAfterLabelsLayer() {
  // afterMap.addLayer(LongIslandZoomLabel);

  afterMap.on("mouseenter", "label-long-island", function (e) {
    afterMap.setPaintProperty(
      "label-long-island",
      "text-color",
      lbl_color_hover
    );
    afterMap.getCanvas().style.cursor = "pointer";
  });

  afterMap.on("mouseleave", "label-long-island", function () {
    afterMap.setPaintProperty("label-long-island", "text-color", lbl_color);
    afterMap.getCanvas().style.cursor = "";
  });

  afterMap.on("click", "label-long-island", function (e) {
    zoom_labels_click_ev = true;
    zoomtobounds("LongIsland");
  });

  // afterMap.addLayer(BrooklynZoomLabel);

  afterMap.on("mouseenter", "label-brooklyn", function (e) {
    afterMap.setPaintProperty("label-brooklyn", "text-color", lbl_color_hover);
    afterMap.getCanvas().style.cursor = "pointer";
  });

  afterMap.on("mouseleave", "label-brooklyn", function () {
    afterMap.setPaintProperty("label-brooklyn", "text-color", lbl_color);
    afterMap.getCanvas().style.cursor = "";
  });

  afterMap.on("click", "label-brooklyn", function (e) {
    zoom_labels_click_ev = true;
    zoomtobounds("Brooklyn");
  });

  // afterMap.addLayer(NewAmsterdamZoomLabel);

  afterMap.on("mouseenter", "label-new-amsterdam", function (e) {
    afterMap.setPaintProperty(
      "label-new-amsterdam",
      "text-color",
      lbl_color_hover
    );
    afterMap.getCanvas().style.cursor = "pointer";
  });

  afterMap.on("mouseleave", "label-new-amsterdam", function () {
    afterMap.setPaintProperty("label-new-amsterdam", "text-color", lbl_color);
    afterMap.getCanvas().style.cursor = "";
  });

  afterMap.on("click", "label-new-amsterdam", function (e) {
    zoom_labels_click_ev = true;
    zoomtocenter("NA");
  });

  // afterMap.addLayer(ManhattanZoomLabel);

  afterMap.on("mouseenter", "label-manhattan", function (e) {
    afterMap.setPaintProperty("label-manhattan", "text-color", lbl_color_hover);
    afterMap.getCanvas().style.cursor = "pointer";
  });

  afterMap.on("mouseleave", "label-manhattan", function () {
    afterMap.setPaintProperty("label-manhattan", "text-color", lbl_color);
    afterMap.getCanvas().style.cursor = "";
  });

  afterMap.on("click", "label-manhattan", function (e) {
    zoom_labels_click_ev = true;
    zoomtobounds("Manhattan");
  });

  // afterMap.addLayer(NewNetherlandZoomLabel);

  afterMap.on("mouseenter", "label-new-netherland", function (e) {
    afterMap.setPaintProperty(
      "label-new-netherland",
      "text-color",
      lbl_color_hover
    );
    afterMap.getCanvas().style.cursor = "pointer";
  });

  afterMap.on("mouseleave", "label-new-netherland", function () {
    afterMap.setPaintProperty("label-new-netherland", "text-color", lbl_color);
    afterMap.getCanvas().style.cursor = "";
  });

  afterMap.on("click", "label-new-netherland", function (e) {
    zoom_labels_click_ev = true;
    zoomtobounds("NewNL");
  });

  // afterMap.addLayer(NewEnglandZoomLabel);

  afterMap.on("mouseenter", "label-new-england", function (e) {
    afterMap.setPaintProperty(
      "label-new-england",
      "text-color",
      lbl_color_hover
    );
    afterMap.getCanvas().style.cursor = "pointer";
  });

  afterMap.on("mouseleave", "label-new-england", function () {
    afterMap.setPaintProperty("label-new-england", "text-color", lbl_color);
    afterMap.getCanvas().style.cursor = "";
  });

  afterMap.on("click", "label-new-england", function (e) {
    zoom_labels_click_ev = true;
    zoomtobounds("NewEngland");
  });
}
