//NEW BEFORELAYERS.JS


/*
function addBeforeFarmsLayer(date) {
function addBeforeLayers(_, date) {
function addCastelloBeforeLayers() {
function addCurrentLotsBeforeLayers() {
function addGrantLotsBeforeLayers(date) {
function addGrantLotsLinesBeforeLayers(date) {
function addIndianPathsBeforeLayers() {
function addInfoBeforeLayers(date) {
function addInfoLabelsBeforeLayers(date) {
function addLongIslandCoastlineBeforeLayers() {
function addLongIslandNativeGroupsBeforeLayers() {
function addManahattaBeforeLayers() {

//THESE ARE WHAT WE NEED:

//NO:
function addBeforeFarmsLayer(date) {
function addManahattaBeforeLayers() {
function addCurrentLotsBeforeLayers() {
function addIndianPathsBeforeLayers() {


//YES:

//Dutch Grants:
function addGrantLotsBeforeLayers(date) {
function addGrantLotsLinesBeforeLayers(date) {

//this should be lot events:
function addBeforeLayers(_, date) {

//Castello:
function addCastelloBeforeLayers() {

//Long Island Tribes:
//these may need the rest - there are 3 layers here
function addLongIslandNativeGroupsBeforeLayers() {
/* FROM AFTERLAYERS:
        addMapLayer(afterMap, getLayer("native-groups-lines-right"))
        addMapLayer(afterMap, getLayer("native-groups-area-right"))
        addMapLayer(afterMap, getLayer("native-groups-labels-right"))
*/




*/



//REPLACE THESE WITH THE ABOVE
const layerData = [
  { type: "layer", id: "lot_events-bf43eb-left", sourceId: "lot_events-bf43eb" },
  { type: "layer", id: "dutch_grants-5ehfqe-left", sourceId: "dutch_grants-5ehfqe" },
  // Add other layers similarly...
];

const eventLayerData = [
  { id: "dutch_grants-5ehfqe-left", popup: "DutchGrantPopUp", infoProperty: "Lot" },
  { id: "lot_events-bf43eb-left", popup: "StatePopUp", infoProperty: "TAXLOT" },
  // Add other event layers similarly...
];


function addMapLayers(map, layers, date) {
  layers.forEach(layer => {
    addMapLayer(map, getBeforeLayer(layer.id), date);
  });
}

function removeMapLayers(map, layers) {
  layers.forEach(layer => {
    removeTaxPoints(map, [{ type: layer.type, id: layer.id }]);
  });
}

function setupLayerEvents(map, layers) {
  layers.forEach(layer => {
    let hoveredId = null; // Variable to store the id of the hovered feature

    map.on("mouseenter", layer.id, (e) => {
      map.getCanvas().style.cursor = "pointer";

      // Optionally, you might want to show a popup when hovering
      // This depends on how you've structured your popups
      const popup = getPopupByName(layer.popup);
      if (popup) {
        popup.setLngLat(e.lngLat).addTo(map);
      }
    });

    map.on("mousemove", layer.id, (e) => {
      if (e.features.length > 0) {
        if (hoveredId) {
          // Reset the previous feature's state
          map.setFeatureState(
            { source: layer.id, id: hoveredId },
            { hover: false }
          );
        }

        hoveredId = e.features[0].id;

        // Set the new feature's state
        map.setFeatureState(
          { source: layer.id, id: hoveredId },
          { hover: true }
        );

        // Update popup content if needed
        const popup = getPopupByName(layer.popup);
        if (popup) {
          const content = generatePopupContent(e.features[0], layer.infoProperty);
          popup.setLngLat(e.lngLat).setHTML(content);
        }
      }
    });

    map.on("mouseleave", layer.id, () => {
      map.getCanvas().style.cursor = "";

      if (hoveredId) {
        // Reset the hovered feature's state when the mouse leaves
        map.setFeatureState(
          { source: layer.id, id: hoveredId },
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

// Helper function to get the popup object by its name
function getPopupByName(name) {
  // Implementation depends on how you're managing your popups
  // For example:
  return window[name];
}

// Helper function to generate popup content
function generatePopupContent(feature, infoProperty) {
  // Customize this function to generate the content based on the feature and property
  return "<div>" + feature.properties[infoProperty] + "</div>";
}


function addBeforeFarmsLayer(map, date) {
  removeMapLayers(map, beforeFarmsLayerData);
  addMapLayers(map, beforeFarmsLayerData, date);
  setupLayerEvents(map, beforeFarmsEventLayerData);
}

function addBeforeLayers(map, date) {
  removeMapLayers(map, beforeLayerData);
  addMapLayers(map, beforeLayerData, date);
  setupLayerEvents(map, beforeEventLayerData);
}

function addCastelloBeforeLayers(map) {
  removeMapLayers(map, castelloLayerData);
  addMapLayers(map, castelloLayerData);
  setupLayerEvents(map, castelloEventLayerData);
}

function addCurrentLotsBeforeLayers(map) {
  removeMapLayers(map, currentLotsLayerData);
  addMapLayers(map, currentLotsLayerData);
  setupLayerEvents(map, currentLotsEventLayerData);
}

function addGrantLotsBeforeLayers(map, date) {
  removeMapLayers(map, grantLotsLayerData);
  addMapLayers(map, grantLotsLayerData, date);
  setupLayerEvents(map, grantLotsEventLayerData);
}

function addGrantLotsLinesBeforeLayers(map, date) {
  removeMapLayers(map, grantLotsLinesLayerData);
  addMapLayers(map, grantLotsLinesLayerData, date);
  setupLayerEvents(map, grantLotsLinesEventLayerData);
}

function addIndianPathsBeforeLayers(map) {
  removeMapLayers(map, indianPathsLayerData);
  addMapLayers(map, indianPathsLayerData);
  setupLayerEvents(map, indianPathsEventLayerData);
}

function addInfoBeforeLayers(map, date) {
  removeMapLayers(map, infoLayerData);
  addMapLayers(map, infoLayerData, date);
  setupLayerEvents(map, infoEventLayerData);
}

function addInfoLabelsBeforeLayers(map, date) {
  removeMapLayers(map, infoLabelsLayerData);
  addMapLayers(map, infoLabelsLayerData, date);
  setupLayerEvents(map, infoLabelsEventLayerData);
}

function addLongIslandCoastlineBeforeLayers(map) {
  removeMapLayers(map, longIslandCoastlineLayerData);
  addMapLayers(map, longIslandCoastlineLayerData);
  setupLayerEvents(map, longIslandCoastlineEventLayerData);
}

function addLongIslandNativeGroupsBeforeLayers(map) {
  removeMapLayers(map, longIslandNativeGroupsLayerData);
  addMapLayers(map, longIslandNativeGroupsLayerData);
  setupLayerEvents(map, longIslandNativeGroupsEventLayerData);
}

function addManahattaBeforeLayers(map) {
  removeMapLayers(map, manahattaLayerData);
  addMapLayers(map, manahattaLayerData);
  setupLayerEvents(map, manahattaEventLayerData);
}
