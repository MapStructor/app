function generatePopupContent(id, features, map) {
  const position = map === afterMap ? "right" : "left";
  var PopUpHTML = "";
  if (id === `dutch_grants-5ehfqe-${position}`) {
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
  } else if (id === `lot_events-bf43eb-${position}`) {
    return (
      "<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/" +
      features[0].properties.TAXLOT +
      "' target='_blank'>" +
      features[0].properties.TAXLOT +
      "</a></h2></b></div>"
    );
  } else if (id === `places-${position}`) {
    return (
      "<div class='infoLayerCastelloPopUp'><b>Taxlot (1660):</b><br>" +
      features[0].properties.LOT2 +
      "</div>"
    );
  } else if (id === `native-groups-area-${position}`) {
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
        (taxlot_event_entities_info[features[0].properties.nid].name.length > 0
          ? taxlot_event_entities_info[features[0].properties.nid].name
          : features[0].properties.name) +
        "</div>";
    }
    return PopUpHTML;
  }
}

function getPopupByName(name) {
  return window[name];
}

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

            getPopupByName(layer.popup)
              .setLngLat(coordinates)
              .setHTML(generatePopupContent(layer.id, e.features, map))
              .addTo(map);
          } else {
            // Update popup content if needed
            const popup = getPopupByName(layer.popup);
            if (popup) {
              const content = generatePopupContent(layer.id, e.features, map);
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

function addMapLayers(map, layers, date) {
  layers.forEach((layer) => {
    if (map === beforeMap) addMapLayer(map, getBeforeLayer(layer.id), date);
    else addMapLayer(map, getLayer(layer.id), date);
  });
}

function addAllLayers(yr, date) {
  ["left", "right"].forEach((position) => {
    const map = position === "left" ? beforeMap : afterMap;
    const popupMap = position === "left" ? "beforeMap" : "afterMap";
    const retrieveLayer = position === "left" ? getBeforeLayer : getLayer;

    //#region - Lot events and dutch grants
    removeTaxPoints(map, [
      { type: "layer", id: `lot_events-bf43eb-${position}` },
      { type: "source", id: "lot_events-bf43eb" },
      { type: "layer", id: `dutch_grants-5ehfqe-${position}` },
      { type: "source", id: "dutch_grants-5ehfqe" },
      { type: "layer", id: `grant-lots-lines-${position}` },
      { type: "source", id: "dutch_grants_lines-0y4gkx" },
    ]);
    addMapLayers(
      map,
      [
        { id: `dutch_grants-5ehfqe-${position}-highlighted` },
        { id: `dutch_grants-5ehfqe-${position}` },
        { id: `lot_events-bf43eb-${position}` },
        { id: `grant-lots-lines-${position}` },
        {id: `grant-lots-${position}`}
      ],
      date
    );
    setupLayerEvents(map, [
      {
        id: `dutch_grants-5ehfqe-${position}`,
        popup: `${popupMap}DutchGrantPopUp`,
        sourceId: "dutch_grants-5ehfqe",
      },
      {
        id: `lot_events-bf43eb-${position}`,
        popup: `${popupMap}PopUp`,
        sourceId: "lot_events-bf43eb",
      }
    ]);
    // #endregion

    // #region - Castello Tax Lots
    addMapLayer(map, retrieveLayer(`places-${position}`));

    setupLayerEvents(map, [
      {
        id: `places-${position}`,
        popup: `${popupMap}PlacesPopUp`,
        sourceId: "taxlots-cpwvol",
      },
    ]);
    //#endregion

    // #region - Long Island Tribes
    addMapLayer(map, retrieveLayer(`native-groups-lines-${position}`));
    addMapLayer(map, retrieveLayer(`native-groups-area-${position}`));
    addMapLayer(map, retrieveLayer(`native-groups-area-${position}-highlighted`));
    addMapLayer(map, retrieveLayer(`native-groups-labels-${position}`));

    setupLayerEvents(map, [
      {
        id: `native-groups-area-${position}`,
        popup: `${popupMap}NativeGroupsPopUp`,
        sourceId: "indian_areas_long_island-50h2dj",
      },
    ]);
    //#endregion
  });
}
