// Dynamic Layers

function addBeforeLayers(_, date) {
  //NAHC POINTS MAP
  removeTaxPoints(beforeMap, [
    {
      type: "layer",
      id: "lot_events-bf43eb-left",
    },
    {
      type: "source",
      id: "lot_events-bf43eb",
    },
    {
      type: "layer",
      id: "dutch_grants-5ehfqe-left",
    },
    {
      type: "source",
      id: "dutch_grants-5ehfqe",
    },
  ]);

  addMapLayer(
    beforeMap,
    getBeforeLayer("dutch_grants-5ehfqe-left-highlighted"),
    date
  );
  addMapLayer(beforeMap, getBeforeLayer("dutch_grants-5ehfqe-left"), date);
  addMapLayer(beforeMap, getBeforeLayer("lot_events-bf43eb-left"), date)

    beforeMap.on("mouseenter", "dutch_grants-5ehfqe-left", function (e) {
      beforeMap.getCanvas().style.cursor = "pointer";
      beforeMapDutchGrantPopUp.setLngLat(e.lngLat).addTo(beforeMap);
    });

    beforeMap.on("mousemove", "dutch_grants-5ehfqe-left", function (e) {
      if (e.features.length > 0) {
        if (hoveredDutchGrantIdLeft) {
          beforeMap.setFeatureState(
            {
              source: "dutch_grants-5ehfqe-left",
              sourceLayer: "dutch_grants-5ehfqe",
              id: hoveredDutchGrantIdLeft,
            },
            { hover: false }
          );
        }
        hoveredDutchGrantIdLeft = e.features[0].id;
        beforeMap.setFeatureState(
          {
            source: "dutch_grants-5ehfqe-left",
            sourceLayer: "dutch_grants-5ehfqe",
            id: hoveredDutchGrantIdLeft,
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

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        //BEFORE MAP POP UP CONTENTS
        beforeMapDutchGrantPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
      }
    });

    beforeMap.on("mouseleave", "dutch_grants-5ehfqe-left", function () {
      beforeMap.getCanvas().style.cursor = "";
      if (hoveredDutchGrantIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "dutch_grants-5ehfqe-left",
            sourceLayer: "dutch_grants-5ehfqe",
            id: hoveredDutchGrantIdLeft,
          },
          { hover: false }
        );
      }
      hoveredDutchGrantIdLeft = null;
      if (beforeMapDutchGrantPopUp.isOpen()) beforeMapDutchGrantPopUp.remove();
    });

    beforeMap.on("mouseenter", "lot_events-bf43eb-left", function (e) {
      beforeMap.getCanvas().style.cursor = "pointer";

      if (hoveredStateIdLeftCircle) {
        beforeMap.setFeatureState(
          {
            source: "lot_events-bf43eb-left",
            sourceLayer: "lot_events-bf43eb",
            id: hoveredStateIdLeftCircle,
          },
          { hover: false }
        );
      }
      hoveredStateIdLeftCircle = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "lot_events-bf43eb-left",
          sourceLayer: "lot_events-bf43eb",
          id: hoveredStateIdLeftCircle,
        },
        { hover: true }
      );

      var coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      beforeMapPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/" +
            e.features[0].properties.TAXLOT +
            "' target='_blank'>" +
            e.features[0].properties.TAXLOT +
            "</a></h2></b></div>"
        )
        .addTo(beforeMap);
    });

    // CHANGE TO POINTER WHEN NOT HOVERING
    beforeMap.on("mouseleave", "lot_events-bf43eb-left", function () {
      beforeMap.getCanvas().style.cursor = "";
      if (hoveredStateIdLeftCircle) {
        beforeMap.setFeatureState(
          {
            source: "lot_events-bf43eb-left",
            sourceLayer: "lot_events-bf43eb",
            id: hoveredStateIdLeftCircle,
          },
          { hover: false }
        );
      }
      hoveredStateIdLeftCircle = null;
      if (beforeMapPopUp.isOpen()) beforeMapPopUp.remove();
    });
}

function addGrantLotsBeforeLayers(date) {
  removeTaxPoints(beforeMap, [
    {type: "layer", id: "grant-lots-left"},
    {type: "source", id: "demo_divisions_grant_c7-42w8pa"}
  ])

  addMapLayer(beforeMap, getBeforeLayer("grant-lots-left"), date)

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
          //"<br>" +
          "<b>Lot Division: </b>" +
          e.features[0].properties.dutchlot +
          "</div>";

        var coordinates = e.features[0].geometry.coordinates.slice();

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        //BEFORE MAP POP UP CONTENTS
        beforeMapGrantLotPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
      }
    });

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

function addGrantLotsLinesBeforeLayers(date) {
  //REMOVING TAX LOT POINTS IF EXIST
  removeTaxPoints(beforeMap, [{
    type: "layer",
    id: "grant-lots-lines-left"
  }, {
    type: "source",
    id: "dutch_grants_lines-0y4gkx"
  }])

  // Add a layer showing the places.
  addMapLayer(beforeMap, getBeforeLayer("grant-lots-lines-left"), date)
}

// Gravesend Dynamic Layers

function addGravesendBeforeLayers(date) {
  addMapLayer(beforeMap, getBeforeLayer("gravesend_boundaries-c6qrbw-left-highlighted"), date)
  addMapLayer(beforeMap, getBeforeLayer("gravesend_boundaries-c6qrbw-left"), date)

  //CURSOR ON HOVER
  //ON HOVER
  beforeMap.on("mouseenter", "gravesend_boundaries-c6qrbw-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    beforeMapGravesendTwoPopUp.setLngLat(e.lngLat).addTo(beforeMap);
  });

  beforeMap.on("mousemove", "gravesend_boundaries-c6qrbw-left", function (e) {
    if (e.features.length > 0) {
      if (hoveredGravesendIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "gravesend_boundaries-c6qrbw-left",
            sourceLayer: "brooklyn_grants-7qxrvu",
            id: hoveredGravesendIdLeft,
          },
          { hover: false }
        );
      }
      hoveredGravesendIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "gravesend_boundaries-c6qrbw-left",
          sourceLayer: "brooklyn_grants-7qxrvu",
          id: hoveredGravesendIdLeft,
        },
        { hover: true }
      );

      var PopUpHTML = "";
      PopUpHTML +=
        "<div class='infoLayerDutchGrantsPopUp'><b>Name : </b>" +
        e.features[0].properties.Name +
        "</div>";

      var coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //AFTER MAP POP UP CONTENTS
      beforeMapGravesendTwoPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "gravesend_boundaries-c6qrbw-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredGravesendIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "gravesend_boundaries-c6qrbw-left",
          sourceLayer: "brooklyn_grants-7qxrvu",
          id: hoveredGravesendIdLeft,
        },
        { hover: false }
      );
    }
    hoveredGravesendIdLeft = null;
    if (beforeMapGravesendTwoPopUp.isOpen())
      beforeMapGravesendTwoPopUp.remove();
  });
}

function addGravesendLinesBeforeLayers(date) {
  addMapLayer(beforeMap, getBeforeLayer("gravesend-lines-left"), date)
}

// Karl Long Island Dynamic Layers

function addKarlBeforeLayers(date) {
  addMapLayer(beforeMap, getBeforeLayer("karl_long_island-left-highlighted"), date)
  addMapLayer(beforeMap, getBeforeLayer("karl_long_island-left"), date)

  //CURSOR ON HOVER
  //ON HOVER
  beforeMap.on("mouseenter", "karl_long_island-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    beforeMapKarlTwoPopUp.setLngLat(e.lngLat).addTo(beforeMap);
  });

  beforeMap.on("mousemove", "karl_long_island-left", function (e) {
    if (e.features.length > 0) {
      if (hoveredKarlIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "karl_long_island-left",
            sourceLayer: "boundary_areas_long_island-8guvh4",
            id: hoveredKarlIdLeft,
          },
          { hover: false }
        );
      }

      hoveredKarlIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "karl_long_island-left",
          sourceLayer: "boundary_areas_long_island-8guvh4",
          id: hoveredKarlIdLeft,
        },
        { hover: true }
      );

      var PopUpHTML = "";
      PopUpHTML +=
        "<div class='infoLayerDutchGrantsPopUp'><b>Name : </b>" +
        e.features[0].properties.corr_label +
        "</div>";

      var coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //AFTER MAP POP UP CONTENTS
      beforeMapKarlTwoPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "karl_long_island-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredKarlIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "karl_long_island-left",
          sourceLayer: "boundary_areas_long_island-8guvh4",
          id: hoveredKarlIdLeft,
        },
        { hover: false }
      );
    }
    hoveredKarlIdLeft = null;
    if (beforeMapKarlTwoPopUp.isOpen()) beforeMapKarlTwoPopUp.remove();
  });
}

function addKarlLinesBeforeLayers(date) {
  addMapLayer(beforeMap, getBeforeLayer("karl-lines-left"), date)
}

//  Farms Dynamic Layer

function addBeforeFarmsLayer(date) {
  addMapLayer(beforeMap, getBeforeLayer("original_grants_and_farms-left-highlighted"), date)
  addMapLayer(beforeMap, getBeforeLayer("original_grants_and_farms-left"), date)
  addMapLayer(beforeMap, getBeforeLayer("farms-lines-left"), date)

  beforeMap.on("mouseenter", "original_grants_and_farms-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    beforeMapFarmPopUp.setLngLat(e.lngLat).addTo(beforeMap);
  });

  beforeMap.on("mousemove", "original_grants_and_farms-left", function (e) {
    if (e.features.length > 0) {
      if (hoveredFarmsIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "original_grants_and_farms-left",
            sourceLayer: "original_farms-6me5t0",
            id: hoveredFarmsIdLeft,
          },
          { hover: false }
        );
      }
      hoveredFarmsIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "original_grants_and_farms-left",
          sourceLayer: "original_farms-6me5t0",
          id: hoveredFarmsIdLeft,
        },
        { hover: true }
      );

      var coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //AFTER MAP POP UP CONTENTS
      beforeMapFarmPopUp
        .setLngLat(e.lngLat)
        .setHTML(
          "<div class='infoLayerFarmsPopUp'>" +
            e.features[0].properties.To +
            "</div>"
        );
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "original_grants_and_farms-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredFarmsIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "original_grants_and_farms-left",
          sourceLayer: "original_farms-6me5t0",
          id: hoveredFarmsIdLeft,
        },
        { hover: false }
      );
    }
    hoveredFarmsIdLeft = null;
    if (beforeMapFarmPopUp.isOpen()) beforeMapFarmPopUp.remove();
  });
}

// Info Static Layer

function addInfoBeforeLayers(date) {
  // Add a layer showing the info.
  addMapLayer(beforeMap, getBeforeLayer("info-points-left"), date)

  //ON HOVER
  beforeMap.on("mouseenter", "info-points-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    if (e.features.length > 0) {
      if (hoveredInfoIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "info-points-left",
            sourceLayer: "info_of_interest-17rpk9",
            id: hoveredInfoIdLeft,
          },
          { hover: false }
        );
      }
      hoveredInfoIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "info-points-left",
          sourceLayer: "info_of_interest-17rpk9",
          id: hoveredInfoIdLeft,
        },
        { hover: true }
      );

      var coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //BEFORE MAP POP UP CONTENTS
      beforeMapInfoPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='infoLayerInfoPointPopUp'><b>" +
            e.features[0].properties.Label +
            "</b><br>" +
            "</div>"
        )
        .addTo(beforeMap);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "info-points-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredInfoIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "info-points-left",
          sourceLayer: "info_of_interest-17rpk9",
          id: hoveredInfoIdLeft,
        },
        { hover: false }
      );
    }
    hoveredInfoIdLeft = null;
    if (beforeMapInfoPopUp.isOpen()) beforeMapInfoPopUp.remove();
  });
}

// Info Static Layer

function addInfoLabelsBeforeLayers(date) {
  // Add a layer showing the places.
  addMapLayer(beforeMap, getBeforeLayer("info-labels-left"), date)
}

// Settlements Static Layer

function addSettlementsBeforeLayers(date) {
  // Add a layer showing the places.
  addMapLayer(beforeMap, getBeforeLayer("settlements-left"), date)

  //ON HOVER
  beforeMap.on("mouseenter", "settlements-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    if (e.features.length > 0) {
      if (hoveredSettlementsIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "settlements-left",
            sourceLayer: "settlements-5551dw",
            id: hoveredSettlementsIdLeft,
          },
          { hover: false }
        );
      }
      hoveredSettlementsIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "settlements-left",
          sourceLayer: "settlements-5551dw",
          id: hoveredSettlementsIdLeft,
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

      //BEFORE MAP POP UP CONTENTS
      beforeMapSettlementsPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='infoLayerSettlementsPopUp'><b>" +
            e.features[0].properties.Name +
            "</b><br>" +
            "</div>"
        )
        .addTo(beforeMap);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "settlements-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredSettlementsIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "settlements-left",
          sourceLayer: "settlements-5551dw",
          id: hoveredSettlementsIdLeft,
        },
        { hover: false }
      );
    }
    hoveredSettlementsIdLeft = null;
    if (beforeMapSettlementsPopUp.isOpen()) beforeMapSettlementsPopUp.remove();
  });
}

// Settlements Labels Static Layer

function addSettlementsLabelsBeforeLayers(date) {
  // Add a layer showing the places.
  addMapLayer(beforeMap, getBeforeLayer("settlements-labels-left"), date)
}

// Castello Static Layer

function addCastelloBeforeLayers() {
  // Add a layer showing the places.
  addMapLayer(beforeMap, getBeforeLayer("places-left"))
  //CURSOR ON HOVER

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

      var coordinates = e.features[0].geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      //BEFORE MAP POP UP CONTENTS
      beforeMapPlacesPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='infoLayerCastelloPopUp'><b>Taxlot (1660):</b><br>" +
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

// Current Static Layers

function addCurrentLotsBeforeLayers() {
  //REMOVING CURRENT LOTS IF EXIST
  removeTaxPoints(beforeMap, [{
    type: "layer",
    id: "curr-lots-left"
  }, {
    type: "source",
    id: "current_lots-94syr2"
  }])

  addMapLayer(beforeMap, getBeforeLayer("curr-lots-high-left"))
  addMapLayer(beforeMap, getBeforeLayer("curr-lots-left"))

  //CURSOR ON HOVER
  //ON HOVER
  beforeMap.on("mouseenter", "curr-lots-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    beforeMapCurrLotsPopUp.setLngLat(e.lngLat).addTo(beforeMap);
  });

  beforeMap.on("mousemove", "curr-lots-left", function (e) {
    if (e.features.length > 0) {
      if (hoveredCurrLotsIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "curr-lots-left",
            sourceLayer: "current_lots-94syr2",
            id: hoveredCurrLotsIdLeft,
          },
          { hover: false }
        );
      }
      hoveredCurrLotsIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "curr-lots-left",
          sourceLayer: "current_lots-94syr2",
          id: hoveredCurrLotsIdLeft,
        },
        { hover: true }
      );

      //Address
      //OwnerName
      var PopUpHTML =
        "<div class='infoLayerCurrLotsPopUp'>" +
        "<b>" +
        e.features[0].properties.OwnerName +
        "</b>" +
        "<br>" +
        e.features[0].properties.Address +
        "</div>";

      //BEFORE MAP POP UP CONTENTS
      beforeMapCurrLotsPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "curr-lots-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredCurrLotsIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "curr-lots-left",
          sourceLayer: "current_lots-94syr2",
          id: hoveredCurrLotsIdLeft,
        },
        { hover: false }
      );
    }
    hoveredCurrLotsIdLeft = null;
    if (beforeMapCurrLotsPopUp.isOpen()) beforeMapCurrLotsPopUp.remove();
  });
}

function addCurrentLotsLinesBeforeLayers() {
  removeTaxPoints(beforeMap, [{
    type: "layer",
    id: "curr-lots-lines-left"
  }, {
    type: "source",
    id: "current_lots_lines-41dc4r"
  }])

  addMapLayer(beforeMap, getBeforeLayer("curr-lots-lines-left"))
}

function addCurrentBuildingsLinesBeforeLayers() {
  removeTaxPoints(beforeMap, [{
    type: "layer",
    id: "curr-builds-lines-left"
  }, {
    type: "source",
    id: "current_buildings_lines-3k97hu"
  }])
  addMapLayer(beforeMap, getBeforeLayer("curr-builds-lines-left"))
}

function addCurrentBuildingsBeforeLayers() {
  //REMOVING CURRENT LOTS IF EXIST
  removeTaxPoints(beforeMap, [
    {
      type: "layer",
      id: "curr-builds-left"
    },
    {
      type: "source",
      id: "current_buildings_1-cjgsm"
    }
  ])
  

  addMapLayer(beforeMap, getBeforeLayer("curr-builds-left"))
}

function addLongIslandCoastlineBeforeLayers() {
  addMapLayer(beforeMap, getBeforeLayer("long-island-left"))
  addMapLayer(beforeMap, getBeforeLayer("long-island-area-left"))
}

function addManahattaBeforeLayers() {
  addMapLayer(beforeMap, getBeforeLayer("lenape-trails-left"))
  addMapLayer(beforeMap, getBeforeLayer("manahatta-shoreline-left"))
  addMapLayer(beforeMap, getBeforeLayer("streams-left"))
}

function addIndianPathsBeforeLayers() {
  addMapLayer(beforeMap, getBeforeLayer("indian-paths-left"))
}

function addLongIslandNativeGroupsBeforeLayers() {
  addMapLayer(beforeMap, getBeforeLayer("native-groups-lines-left"))
  addMapLayer(beforeMap, getBeforeLayer("native-groups-area-left"))
  addMapLayer(beforeMap, getBeforeLayer("native-groups-area-left-highlighted"))
  addMapLayer(beforeMap, getBeforeLayer("native-groups-labels-left"))

  //CURSOR ON HOVER
  //ON HOVER
  beforeMap.on("mouseenter", "native-groups-area-left", function (e) {
    beforeMap.getCanvas().style.cursor = "pointer";
    beforeMapNativeGroupsPopUp.setLngLat(e.lngLat).addTo(beforeMap);
  });

  beforeMap.on("mousemove", "native-groups-area-left", function (e) {
    if (e.features.length > 0) {
      if (hoveredNativeGroupsIdLeft) {
        beforeMap.setFeatureState(
          {
            source: "native-groups-area-left",
            sourceLayer: "indian_areas_long_island-50h2dj",
            id: hoveredNativeGroupsIdLeft,
          },
          { hover: false }
        );
      }
      hoveredNativeGroupsIdLeft = e.features[0].id;
      beforeMap.setFeatureState(
        {
          source: "native-groups-area-left",
          sourceLayer: "indian_areas_long_island-50h2dj",
          id: hoveredNativeGroupsIdLeft,
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
      beforeMapNativeGroupsPopUp.setLngLat(e.lngLat).setHTML(PopUpHTML);
    }
  });

  //OFF HOVER
  beforeMap.on("mouseleave", "native-groups-area-left", function () {
    beforeMap.getCanvas().style.cursor = "";
    if (hoveredNativeGroupsIdLeft) {
      beforeMap.setFeatureState(
        {
          source: "native-groups-area-left",
          sourceLayer: "indian_areas_long_island-50h2dj",
          id: hoveredNativeGroupsIdLeft,
        },
        { hover: false }
      );
    }
    hoveredNativeGroupsIdLeft = null;
    if (beforeMapNativeGroupsPopUp.isOpen())
      beforeMapNativeGroupsPopUp.remove();
  });
}

////////////////////////////////
// Interactive Zoom Labels Layer
////////////////////////////////

function addBeforeLabelsLayer() {
  beforeMap.addLayer(LongIslandZoomLabel);

  beforeMap.on("mouseenter", "label-long-island", function (e) {
    beforeMap.setPaintProperty(
      "label-long-island",
      "text-color",
      lbl_color_hover
    );
    beforeMap.getCanvas().style.cursor = "pointer";
  });

  beforeMap.on("mouseleave", "label-long-island", function () {
    beforeMap.setPaintProperty("label-long-island", "text-color", lbl_color);
    beforeMap.getCanvas().style.cursor = "";
  });

  beforeMap.on("click", "label-long-island", function (e) {
    zoom_labels_click_ev = true;
    zoomtobounds("LongIsland");
  });

  beforeMap.addLayer(BrooklynZoomLabel);

  beforeMap.on("mouseenter", "label-brooklyn", function (e) {
    beforeMap.setPaintProperty("label-brooklyn", "text-color", lbl_color_hover);
    beforeMap.getCanvas().style.cursor = "pointer";
  });

  beforeMap.on("mouseleave", "label-brooklyn", function () {
    beforeMap.setPaintProperty("label-brooklyn", "text-color", lbl_color);
    beforeMap.getCanvas().style.cursor = "";
  });

  beforeMap.on("click", "label-brooklyn", function (e) {
    zoom_labels_click_ev = true;
    zoomtobounds("Brooklyn");
  });

  beforeMap.addLayer(NewAmsterdamZoomLabel);

  beforeMap.on("mouseenter", "label-new-amsterdam", function (e) {
    beforeMap.setPaintProperty(
      "label-new-amsterdam",
      "text-color",
      lbl_color_hover
    );
    beforeMap.getCanvas().style.cursor = "pointer";
  });

  beforeMap.on("mouseleave", "label-new-amsterdam", function () {
    beforeMap.setPaintProperty("label-new-amsterdam", "text-color", lbl_color);
    beforeMap.getCanvas().style.cursor = "";
  });

  beforeMap.on("click", "label-new-amsterdam", function (e) {
    zoom_labels_click_ev = true;
    zoomtocenter("NA");
  });

  beforeMap.addLayer(ManhattanZoomLabel);

  beforeMap.on("mouseenter", "label-manhattan", function (e) {
    beforeMap.setPaintProperty(
      "label-manhattan",
      "text-color",
      lbl_color_hover
    );
    beforeMap.getCanvas().style.cursor = "pointer";
  });

  beforeMap.on("mouseleave", "label-manhattan", function () {
    beforeMap.setPaintProperty("label-manhattan", "text-color", lbl_color);
    beforeMap.getCanvas().style.cursor = "";
  });

  beforeMap.on("click", "label-manhattan", function (e) {
    zoom_labels_click_ev = true;
    zoomtobounds("Manhattan");
  });

  beforeMap.addLayer(NewNetherlandZoomLabel);

  beforeMap.on("mouseenter", "label-new-netherland", function (e) {
    beforeMap.setPaintProperty(
      "label-new-netherland",
      "text-color",
      lbl_color_hover
    );
    beforeMap.getCanvas().style.cursor = "pointer";
  });

  beforeMap.on("mouseleave", "label-new-netherland", function () {
    beforeMap.setPaintProperty("label-new-netherland", "text-color", lbl_color);
    beforeMap.getCanvas().style.cursor = "";
  });

  beforeMap.on("click", "label-new-netherland", function (e) {
    zoom_labels_click_ev = true;
    zoomtobounds("NewNL");
  });

  beforeMap.addLayer(NewEnglandZoomLabel);

  beforeMap.on("mouseenter", "label-new-england", function (e) {
    beforeMap.setPaintProperty(
      "label-new-england",
      "text-color",
      lbl_color_hover
    );
    beforeMap.getCanvas().style.cursor = "pointer";
  });

  beforeMap.on("mouseleave", "label-new-england", function () {
    beforeMap.setPaintProperty("label-new-england", "text-color", lbl_color);
    beforeMap.getCanvas().style.cursor = "";
  });

  beforeMap.on("click", "label-new-england", function (e) {
    zoom_labels_click_ev = true;
    zoomtobounds("NewEngland");
  });
}
