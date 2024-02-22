layersList:

When I want to add highlighting functionality, I want it to
 simply come from the corresponding fill layer.

GPT:
https://chat.openai.com/share/3669128e-126c-4650-82be-f7dfc89a6c4d


/* BLOCK 1:
To streamline the process of creating highlighted layers based on existing fill layers, 
you can use a JavaScript function that takes the base layer configuration and applies 
the necessary modifications for the highlighted version. This approach allows you to 
maintain the common properties while only specifying what changes for the highlighted layer.

Here's an example of how you might implement this:

Base Layer Configuration Function
First, create a function that generates the base layer configuration. 
This function will be used to create both the regular and highlighted layers.*/

//BLOCK 1:
function createBaseLayerConfig(id, elementId, sourceUrl, sourceLayer, fillColor, fillOpacity, outlineColor) {
    return {
      id: id,
      type: "fill",
      source: {
        type: "vector",
        url: sourceUrl,
      },
      layout: {
        visibility: document.getElementById(elementId).checked ? "visible" : "none",
      },
      "source-layer": sourceLayer,
      paint: {
        "fill-color": fillColor,
        "fill-opacity": fillOpacity,
        "fill-outline-color": outlineColor,
      },
    };
  }

//BLOCK 2:
/*Highlighted Layer Modification Function
Next, create a function that takes a base layer configuration and modifies it for the 
highlighted version. This function will adjust properties like fill-opacity based on your 
requirements for highlighted layers.
*/

//BLOCK 2:
function createHighlightedLayer(baseLayerConfig, highlightedOpacity) {
    // Clone the base config to avoid modifying the original
    let highlightedConfig = JSON.parse(JSON.stringify(baseLayerConfig));
  
    // Change the ID and modify the fill-opacity for the highlighted layer
    highlightedConfig.id += "-highlighted";
    highlightedConfig.paint["fill-opacity"] = [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      highlightedOpacity,
      0,
    ];
  
    return highlightedConfig;
  }


//BLOCK 3:

  /*
  Usage
  You can now use these functions to create your layers. For instance:
  */

//BLOCK 3:
// Create the base layer
let nativeGroupsAreaRight = createBaseLayerConfig(
    "native-groups-area-right",
    "native_groups_area",
    "mapbox://mapny.8in6hi37",
    "indian_areas_long_island-50h2dj",
    "#FF1493",
    [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      0.5,
      0.2,
    ],
    "#FFD700"
  );
  
  // Create the highlighted version of the layer
  let nativeGroupsAreaRightHighlighted = createHighlightedLayer(nativeGroupsAreaRight, 0.3);
  
  // Now you have both the base and highlighted layers
  console.log(nativeGroupsAreaRight);
  console.log(nativeGroupsAreaRightHighlighted);


/*
This method provides a flexible and efficient way to manage layers and their highlighted versions
 without duplicating code. You only need to define the unique properties of each layer, and the 
 functions handle the rest.
*/
  


/*
Layers List:

id: "dutch_grants-5ehfqe-left-highlighted",
id: "dutch_grants-5ehfqe-left",
id: "dutch_grants-5ehfqe-right-highlighted",
id: "dutch_grants-5ehfqe-right",
id: "grant-lots-lines-left",
id: "grant-lots-lines-right",
id: "lot_events-bf43eb-left",
id: "lot_events-bf43eb-right",
id: "lot_events-bf43eb-right",
id: "native-groups-area-left",
id: "native-groups-area-right-highlighted",
id: "native-groups-area-right",
id: "native-groups-labels-left",
id: "native-groups-labels-left",
id: "native-groups-labels-right",
id: "native-groups-lines-left",
id: "native-groups-lines-right",
id: "places-left",
id: "places-right",
*/