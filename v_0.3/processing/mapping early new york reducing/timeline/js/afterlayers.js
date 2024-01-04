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

// Gravesend Dynamic Layers

function addGravesendAfterLayers(date) {
  addMapLayer(afterMap, getLayer("gravesend_boundaries-c6qrbw-right-highlighted"), date)

  addMapLayer(afterMap, getLayer("gravesend_boundaries-c6qrbw-right"), date)
  
    afterMap.on(
      "mouseenter",
      "gravesend_boundaries-c6qrbw-right",
      function (e) {
        afterMap.getCanvas().style.cursor = "pointer";
        afterMapGravesendTwoPopUp.setLngLat(e.lngLat).addTo(afterMap);
      }
    );

    afterMap.on("mousemove", "gravesend_boundaries-c6qrbw-right", function (e) {
      console.warn(e.features[0].id);


      if (e.features.length > 0) {
        if (hoveredGravesendIdRight) {
          afterMap.setFeatureState(
            {
              source: "gravesend_boundaries-c6qrbw-right",
              sourceLayer: "brooklyn_grants-7qxrvu",
              id: hoveredGravesendIdRight,
            },
            { hover: false }
          );
        }
        hoveredGravesendIdRight = e.features[0].id;
        afterMap.setFeatureState(
          {
            source: "gravesend_boundaries-c6qrbw-right",
            sourceLayer: "brooklyn_grants-7qxrvu",
            id: hoveredGravesendIdRight,
          },
          { hover: true }
        );

        var PopUpHTML = "";
        PopUpHTML +=
          "<div class='infoLayerDutchGrantsPopUp'><b>Name : </b>" +
          e.features[0].properties.Name +
          "</div>";

        var coordinates = e.features[0].geometry.coordinates.slice();

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        //AFTER MAP POP UP CONTENTS
        afterMapGravesendTwoPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
      }
    });
  

    afterMap.on("mouseleave", "gravesend_boundaries-c6qrbw-right", function () {
      afterMap.getCanvas().style.cursor = "";
      if (hoveredGravesendIdRight) {
        afterMap.setFeatureState(
          {
            source: "gravesend_boundaries-c6qrbw-right",
            sourceLayer: "brooklyn_grants-7qxrvu",
            id: hoveredGravesendIdRight,
          },
          { hover: false }
        );
      }
      hoveredGravesendIdRight = null;
      if (afterMapGravesendTwoPopUp.isOpen())
        afterMapGravesendTwoPopUp.remove();
    });
  
}

function addGravesendLinesAfterLayers(date) {
  addMapLayer(afterMap, getLayer("gravesend-lines-right"), date)
}

// Karl Dynamic Layers

function addKarlAfterLayers(date) {
  addMapLayer(afterMap, getLayer("karl_long_island-right-highlighted"), date)
  addMapLayer(afterMap, getLayer("karl_long_island-right"), date)

  function addEventsOnHover() {
    afterMap.on("mouseenter", "karl_long_island-right", function (e) {
      afterMap.getCanvas().style.cursor = "pointer";
      afterMapKarlTwoPopUp.setLngLat(e.lngLat).addTo(afterMap);
    });

    afterMap.on("mousemove", "karl_long_island-right", function (e) {
      console.warn(e.features[0].id);

      if (e.features.length > 0) {
        if (hoveredKarlIdRight) {
          afterMap.setFeatureState(
            {
              source: "karl_long_island-right",
              sourceLayer: "boundary_areas_long_island-8guvh4",
              id: hoveredKarlIdRight,
            },
            { hover: false }
          );
        }
        hoveredKarlIdRight = e.features[0].id;
        afterMap.setFeatureState(
          {
            source: "karl_long_island-right",
            sourceLayer: "boundary_areas_long_island-8guvh4",
            id: hoveredKarlIdRight,
          },
          { hover: true }
        );

        var PopUpHTML = "";
        PopUpHTML +=
          "<div class='infoLayerDutchGrantsPopUp'><b>Name : </b>" +
          e.features[0].properties.corr_label +
          "</div>";

        var coordinates = e.features[0].geometry.coordinates.slice();

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        //AFTER MAP POP UP CONTENTS
        afterMapKarlTwoPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
      }
    });
  }
  addEventsOnHover();

  //OFF HOVER
  afterMap.on("mouseleave", "karl_long_island-right", function () {
    afterMap.getCanvas().style.cursor = "";
    if (hoveredKarlIdRight) {
      afterMap.setFeatureState(
        {
          source: "karl_long_island-right",
          sourceLayer: "boundary_areas_long_island-8guvh4",
          id: hoveredKarlIdRight,
        },
        { hover: false }
      );
    }
    hoveredKarlIdRight = null;
    if (afterMapKarlTwoPopUp.isOpen()) afterMapKarlTwoPopUp.remove();
  });
}

function addKarlLinesAfterLayers(date) {
  addMapLayer(afterMap, getLayer("karl-lines-right"), date)
}

// Farms Dynamic Layer

function addAfterFarmsLayer(date) {
  addMapLayer(afterMap, getLayer("original_grants_and_farms-right-highlighted"), date)
  addMapLayer(afterMap, getLayer("original_grants_and_farms-right"), date)
  addMapLayer(afterMap, getLayer("farms-lines-right"), date)

  function cursorOnHover() {
    afterMap.on("mouseenter", "original_grants_and_farms-right", function (e) {
      afterMap.getCanvas().style.cursor = "pointer";
      afterMapFarmPopUp.setLngLat(e.lngLat).addTo(afterMap);
    });

    afterMap.on("mousemove", "original_grants_and_farms-right", function (e) {
      if (e.features.length > 0) {
        if (hoveredFarmsIdRight) {
          afterMap.setFeatureState(
            {
              source: "original_grants_and_farms-right",
              sourceLayer: "original_farms-6me5t0",
              id: hoveredFarmsIdRight,
            },
            { hover: false }
          );
        }
        hoveredFarmsIdRight = e.features[0].id;
        afterMap.setFeatureState(
          {
            source: "original_grants_and_farms-right",
            sourceLayer: "original_farms-6me5t0",
            id: hoveredFarmsIdRight,
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
        afterMapFarmPopUp
          .setLngLat(e.lngLat)
          .setHTML(
            "<div class='infoLayerFarmsPopUp'>" +
              e.features[0].properties.To +
              "</div>"
          );
      }
    });
  }

  function offHover() {
    afterMap.on("mouseleave", "original_grants_and_farms-right", function () {
      afterMap.getCanvas().style.cursor = "";
      if (hoveredFarmsIdRight) {
        afterMap.setFeatureState(
          {
            source: "original_grants_and_farms-right",
            sourceLayer: "original_farms-6me5t0",
            id: hoveredFarmsIdRight,
          },
          { hover: false }
        );
      }
      hoveredFarmsIdRight = null;
      if (afterMapFarmPopUp.isOpen()) afterMapFarmPopUp.remove();
    });
  }

  cursorOnHover();
  offHover();
}

// Info Static Layer

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

// Settlements Static Layer

function addSettlementsAfterLayers(date) {
  // Add a layer showing the places.
  addMapLayer(afterMap, getLayer("settlements-right"), date)

  //ON HOVER
  afterMap.on("mouseenter", "settlements-right", function (e) {
    afterMap.getCanvas().style.cursor = "pointer";
    if (e.features.length > 0) {
      if (hoveredSettlementsIdRight) {
        afterMap.setFeatureState(
          {
            source: "settlements-right",
            sourceLayer: "settlements-5551dw",
            id: hoveredSettlementsIdRight,
          },
          { hover: false }
        );
      }
      hoveredSettlementsIdRight = e.features[0].id;
      afterMap.setFeatureState(
        {
          source: "settlements-right",
          sourceLayer: "settlements-5551dw",
          id: hoveredSettlementsIdRight,
        },
        { hover: true }
      );

      var coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //AFTER MAP POP UP CONTENTS
      afterMapSettlementsPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='infoLayerSettlementsPopUp'><b>" +
            e.features[0].properties.Name +
            "</b><br>" +
            "</div>"
        )
        .addTo(afterMap);
    }
  });

  //OFF HOVER
  afterMap.on("mouseleave", "settlements-right", function () {
    afterMap.getCanvas().style.cursor = "";
    if (hoveredSettlementsIdRight) {
      afterMap.setFeatureState(
        {
          source: "settlements-right",
          sourceLayer: "settlements-5551dw",
          id: hoveredSettlementsIdRight,
        },
        { hover: false }
      );
    }
    hoveredSettlementsIdRight = null;
    if (afterMapSettlementsPopUp.isOpen()) afterMapSettlementsPopUp.remove();
  });
}

// Settlements Labels Static Layer

function addSettlementsLabelsAfterLayers(date) {
  addMapLayer(afterMap, getLayer("settlements-labels-right"), date)
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

// Current Static Layers

function addCurrentLotsAfterLayers() {
  //REMOVING CURRENT LOTS IF EXIST
  removeTaxPoints(afterMap, [{
    type: "layer",
    id: "curr-lots-right"
  }, {
    type: "source",
    id: "current_lots-94syr2"
  }])
    addMapLayer(afterMap, getLayer("curr-lots-high-right"))
    addMapLayer(afterMap, getLayer("curr-lots-right"))

  //CURSOR ON HOVER
  //ON HOVER
  afterMap.on("mouseenter", "curr-lots-right", function (e) {
    afterMap.getCanvas().style.cursor = "pointer";
    afterMapCurrLotsPopUp.setLngLat(e.lngLat).addTo(afterMap);
  });

  afterMap.on("mousemove", "curr-lots-right", function (e) {
    if (e.features.length > 0) {
      if (hoveredCurrLotsIdRight) {
        afterMap.setFeatureState(
          {
            source: "curr-lots-right",
            sourceLayer: "current_lots-94syr2",
            id: hoveredCurrLotsIdRight,
          },
          { hover: false }
        );
      }
      hoveredCurrLotsIdRight = e.features[0].id;
      afterMap.setFeatureState(
        {
          source: "curr-lots-right",
          sourceLayer: "current_lots-94syr2",
          id: hoveredCurrLotsIdRight,
        },
        { hover: true }
      );

      var PopUpHTML =
        "<div class='infoLayerCurrLotsPopUp'>" +
        "<b>" +
        e.features[0].properties.OwnerName +
        "</b>" +
        "<br>" +
        e.features[0].properties.Address +
        "</div>";

      //AFTER MAP POP UP CONTENTS
      afterMapCurrLotsPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
    }
  });

  //OFF HOVER
  afterMap.on("mouseleave", "curr-lots-right", function () {
    afterMap.getCanvas().style.cursor = "";
    if (hoveredCurrLotsIdRight) {
      afterMap.setFeatureState(
        {
          source: "curr-lots-right",
          sourceLayer: "current_lots-94syr2",
          id: hoveredCurrLotsIdRight,
        },
        { hover: false }
      );
    }
    hoveredCurrLotsIdRight = null;
    if (afterMapCurrLotsPopUp.isOpen()) afterMapCurrLotsPopUp.remove();
  });
}

function addCurrentLotsLinesAfterLayers() {
  //REMOVING CURRENT LOTS IF EXIST
  removeTaxPoints(afterMap, [{
    type: "layer",
    id: "curr-lots-lines-right"
  }, {
    type: "source",
    id: "current_lots_lines-41dc4r"
  }])
  addMapLayer(afterMap, getLayer("curr-lots-lines-right"))
}

function addCurrentBuildingsLinesAfterLayers() {
  //REMOVING CURRENT LOTS IF EXIST
  addMapLayer(afterMap, [{
    type: "layer",
    id: "curr-builds-lines-right"
  }, {
    type: "source",
    id: "current_buildings_lines-3k97hu"
  }])

  addMapLayer(afterMap, getLayer("curr-builds-lines-right"))
}

function addCurrentBuildingsAfterLayers() {
  //REMOVING CURRENT LOTS IF EXIST
  removeTaxPoints(afterMap, [{
    type: "layer",
    id: "curr-builds-right"
  }, {
    type: "source",
    id: "current_buildings_1-cjgsm"
  }])

  addMapLayer(afterMap, getLayer( "curr-builds-right"))
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

function addIndianPathsAfterLayers() {
  addMapLayer(afterMap, getLayer("indian-paths-right"))
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
  afterMap.addLayer(LongIslandZoomLabel);

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

  afterMap.addLayer(BrooklynZoomLabel);

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

  afterMap.addLayer(NewAmsterdamZoomLabel);

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

  afterMap.addLayer(ManhattanZoomLabel);

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

  afterMap.addLayer(NewNetherlandZoomLabel);

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

  afterMap.addLayer(NewEnglandZoomLabel);

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
