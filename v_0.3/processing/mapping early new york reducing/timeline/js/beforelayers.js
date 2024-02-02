function setupLayerEvents(map, layers) {
  layers.forEach((layer) => {
    let hoveredId = null; // Variable to store the id of the hovered feature

    if (layer.id !== "places-right")
      map.on("mouseenter", layer.id, (e) => {
        map.getCanvas().style.cursor = "pointer";

        // Optionally, you might want to show a popup when hovering
        // This depends on how you've structured your popups
        const popup = getPopupByName(layer.popup);
        if (popup) {
          popup.setLngLat(e.lngLat).addTo(map);
        }
      });

    map.on(
      layer.id === "places-right" ? "mouseenter" : "mousemove",
      layer.id,
      (e) => {
        if (e.features.length > 0) {
          if (hoveredId) {
            // Reset the previous feature's state
            map.setFeatureState(
              { source: layer.id, id: hoveredId, sourceLayer: layer.sourceId },
              { hover: false }
            );
          }

          hoveredId = e.features[0].id;

          // Set the new feature's state
          map.setFeatureState(
            { source: layer.id, id: hoveredId, sourceLayer: layer.sourceId },
            { hover: true }
          );
          if (layer.id === "places-right") {
            var coordinates = e.features[0].geometry.coordinates.slice();

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            //BEFORE MAP POP UP CONTENTS
            beforeMapPlacesPopUp
              .setLngLat(coordinates)
              .setHTML(generatePopupContent(layer.id, e.features))
              .addTo(beforeMap);
          } else {
            // Update popup content if needed
            const popup = getPopupByName(layer.popup);
            if (popup) {
              const content = generatePopupContent(layer.id, e.features);
              popup.setLngLat(e.lngLat).setHTML(content);
            }
          }
        }
      }
    );

    map.on("mouseleave", layer.id, () => {
      map.getCanvas().style.cursor = "";

      if (hoveredId) {
        // Reset the hovered feature's state when the mouse leaves
        map.setFeatureState(
          { source: layer.id, id: hoveredId, sourceLayer: layer.sourceId },
          { hover: false }
        );
        hoveredId = null;
      }

      // Close the popup when the mouse leaves
      const popup = getPopupByName(layer.popup);
      if (popup && popup.isOpen()) {
        popup.remove();
      }
    });
  });
}

function generatePopupContent(id, features) {
  var PopUpHTML = "";
  if (id === "dutch_grants-5ehfqe-left") {
    if (
      typeof dutch_grant_lots_info[features[0].properties.Lot] == "undefined"
    ) {
      PopUpHTML =
        "<div class='infoLayerDutchGrantsPopUp'>" +
        features[0].properties.name +
        "<br>";
    } else {
      PopUpHTML =
        "<div class='infoLayerDutchGrantsPopUp'>" +
        (dutch_grant_lots_info[features[0].properties.Lot].name_txt.length > 0
          ? dutch_grant_lots_info[features[0].properties.Lot].name_txt
          : features[0].properties.name) +
        "<br>";
    }
    PopUpHTML +=
      "<b>Dutch Grant Lot: </b>" + features[0].properties.Lot + "</div>";

    return PopUpHTML;
  } else if (id === "lot_events-bf43eb-left") {
    return (
      "<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/" +
      features[0].properties.TAXLOT +
      "' target='_blank'>" +
      features[0].properties.TAXLOT +
      "</a></h2></b></div>"
    );
  } else if (id === "places-left") {
    return (
      "<div class='infoLayerCastelloPopUp'><b>Taxlot (1660):</b><br>" +
      features[0].properties.LOT2 +
      "</div>"
    );
  } else if (id === "native-groups-area-left"){
      if (
        typeof taxlot_event_entities_info[features[0].properties.nid] ==
          "undefined" ||
        features[0].properties.nid == ""
      ) {
        PopUpHTML =
          "<div class='infoLayerCastelloPopUp'><b>Name : </b>" +
          features[0].properties.name +
          "</div>";
      } else {
        PopUpHTML =
          "<div class='infoLayerCastelloPopUp'><b>Name : </b>" +
          (taxlot_event_entities_info[features[0].properties.nid].name
            .length > 0
            ? taxlot_event_entities_info[features[0].properties.nid].name
            : features[0].properties.name) +
          "</div>";
      }
      return PopUpHTML
  }
}

function getPopupByName(name) {
  // Implementation depends on how you're managing your popups
  // For example:
  return window[name];
}

function addMapLayers(map, layers, date) {
  layers.forEach((layer) => {
    addMapLayer(map, getBeforeLayer(layer.id), date);
  });
}

function addBeforeLayers(_, date) {
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
  addMapLayers(
    beforeMap,
    [
      { id: "dutch_grants-5ehfqe-left-highlighted" },
      { id: "dutch_grants-5ehfqe-left" },
      { id: "lot_events-bf43eb-left" },
    ],
    date
  );
  setupLayerEvents(beforeMap, [
    {
      id: "dutch_grants-5ehfqe-left",
      popup: "beforeMapDutchGrantPopUp",
      sourceId: "dutch_grants-5ehfqe",
    },
    {
      id: "lot_events-bf43eb-left",
      popup: "beforeMapPopUp",
      sourceId: "lot_events-bf43eb",
    },
  ]);
}

function addGrantLotsLinesBeforeLayers(date) {
  //REMOVING TAX LOT POINTS IF EXIST
  removeTaxPoints(beforeMap, [
    {
      type: "layer",
      id: "grant-lots-lines-left",
    },
    {
      type: "source",
      id: "dutch_grants_lines-0y4gkx",
    },
  ]);

  // Add a layer showing the places.
  addMapLayer(beforeMap, getBeforeLayer("grant-lots-lines-left"), date);
}

function addInfoBeforeLayers(date) {
  // Add a layer showing the info.
  addMapLayer(beforeMap, getBeforeLayer("info-points-left"), date);

  setupLayerEvents(beforeMap, [
    {
      id: "info-points-left",
      popup: "beforeMapInfoPopUp",
      sourceId: "info_of_interest-17rpk9",
    },
  ]);
}

function addInfoLabelsBeforeLayers(date) {
  addMapLayer(beforeMap, getBeforeLayer("info-labels-left"), date);
}

function addCastelloBeforeLayers() {
  addMapLayer(beforeMap, getBeforeLayer("places-left"));

  setupLayerEvents(beforeMap, [
    {
      id: "places-left",
      popup: "beforeMapPlacesPopUp",
      sourceId: "taxlots-cpwvol",
    },
  ]);
}

function addLongIslandCoastlineBeforeLayers() {
  addMapLayer(beforeMap, getBeforeLayer("long-island-left"));
  addMapLayer(beforeMap, getBeforeLayer("long-island-area-left"));
}

function addLongIslandNativeGroupsBeforeLayers() {
  [
    "native-groups-lines-left",
    "native-groups-area-left",
    "native-groups-area-left-highlighted",
    "native-groups-labels-left",
  ].forEach((id) => addMapLayer(beforeMap, getBeforeLayer(id)));

  setupLayerEvents(beforeMap, [
    {
      id: "native-groups-area-left",
      popup: "beforeMapNativeGroupsPopUp",
      sourceId: "indian_areas_long_island-50h2dj",
    },
  ]); 
}
