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
    if (map === beforeMap) addMapLayer(map, getLayer(layer.id), date);
    else addMapLayer(map, getLayer(layer.id), date);
  });
}
