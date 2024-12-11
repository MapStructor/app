//// index.js
//Just looked at a little, but significant.

//Chat:
//https://chat.openai.com/share/2640bc12-3db0-4777-b933-6c4168850a29





// (1) COMPARE THIS, REFACTORED:




// Define an array of layer names and their corresponding checkbox IDs
const nativeGroupsLayers = [
  { layerName: "native-groups-area-left", checkboxID: "native_groups_area" },
  { layerName: "native-groups-lines-left", checkboxID: "native_groups_lines" },
  { layerName: "native-groups-labels-left", checkboxID: "native_groups_labels" },
  // Add more layers and checkbox pairs as needed
];

// Create a function to handle layer visibility
function toggleLayerVisibility(layerName, map, visibility) {
  map.setLayoutProperty(layerName, "visibility", visibility);
}

// Attach event handlers to checkboxes using a loop for the Native Groups Layer
nativeGroupsLayers.forEach((layerInfo) => {
  $(`#${layerInfo.checkboxID}`).click(function () {
    if ($(this).prop("checked")) {
      toggleLayerVisibility(layerInfo.layerName, beforeMap, "visible");
      toggleLayerVisibility(layerInfo.layerName, afterMap, "visible");
    } else {
      toggleLayerVisibility(layerInfo.layerName, beforeMap, "none");
      toggleLayerVisibility(layerInfo.layerName, afterMap, "none");
    }
  });
});



// (2) TO THIS, WHAT IT IS CURRENTLY:

$("#native_groups_layer_items").change(function () {
  $(".native_groups_layer").prop("checked", this.checked);
  if ($(this).prop("checked")) {
    if (taxlot_entities_info_length == 0) {
      getTaxlotEventEntitiesDescrInfo();
    }
    beforeMap.setLayoutProperty(
      "native-groups-area-left",
      "visibility",
      "visible"
    );
    afterMap.setLayoutProperty(
      "native-groups-area-right",
      "visibility",
      "visible"
    );
    beforeMap.setLayoutProperty(
      "native-groups-area-left-highlighted",
      "visibility",
      "visible"
    );
    afterMap.setLayoutProperty(
      "native-groups-area-right-highlighted",
      "visibility",
      "visible"
    );

    beforeMap.setLayoutProperty(
      "native-groups-lines-left",
      "visibility",
      "visible"
    );
    afterMap.setLayoutProperty(
      "native-groups-lines-right",
      "visibility",
      "visible"
    );
    beforeMap.setLayoutProperty(
      "native-groups-labels-left",
      "visibility",
      "visible"
    );
    afterMap.setLayoutProperty(
      "native-groups-labels-right",
      "visibility",
      "visible"
    );
  } else {
    beforeMap.setLayoutProperty(
      "native-groups-area-left",
      "visibility",
      "none"
    );
    afterMap.setLayoutProperty(
      "native-groups-area-right",
      "visibility",
      "none"
    );
    beforeMap.setLayoutProperty(
      "native-groups-area-left-highlighted",
      "visibility",
      "visible"
    );
    afterMap.setLayoutProperty(
      "native-groups-area-right-highlighted",
      "visibility",
      "none"
    );

    beforeMap.setLayoutProperty(
      "native-groups-lines-left",
      "visibility",
      "none"
    );
    afterMap.setLayoutProperty(
      "native-groups-lines-right",
      "visibility",
      "none"
    );
    beforeMap.setLayoutProperty(
      "native-groups-labels-left",
      "visibility",
      "none"
    );
    afterMap.setLayoutProperty(
      "native-groups-labels-right",
      "visibility",
      "none"
    );

    if (native_group_layer_view_flag) {
      closeNativeGroupsInfo();
    }
  }
});

$(".native_groups_layer").change(function () {
  if (
    $(".native_groups_layer:checked").length ==
    $(".native_groups_layer").length
  ) {
    $("#native_groups_layer_items").prop("checked", "checked");
  } else {
    $("#native_groups_layer_items").prop("checked", false);
  }
});

$("#native_groups_area").click(function () {
  if ($(this).prop("checked")) {
    if (taxlot_entities_info_length == 0) {
      getTaxlotEventEntitiesDescrInfo();
    }
    beforeMap.setLayoutProperty(
      "native-groups-area-left",
      "visibility",
      "visible"
    );
    afterMap.setLayoutProperty(
      "native-groups-area-right",
      "visibility",
      "visible"
    );
    beforeMap.setLayoutProperty(
      "native-groups-area-left-highlighted",
      "visibility",
      "visible"
    );
    afterMap.setLayoutProperty(
      "native-groups-area-right-highlighted",
      "visibility",
      "visible"
    );
  } else {
    beforeMap.setLayoutProperty(
      "native-groups-area-left",
      "visibility",
      "none"
    );
    afterMap.setLayoutProperty(
      "native-groups-area-right",
      "visibility",
      "none"
    );
    beforeMap.setLayoutProperty(
      "native-groups-area-left-highlighted",
      "visibility",
      "none"
    );
    afterMap.setLayoutProperty(
      "native-groups-area-right-highlighted",
      "visibility",
      "none"
    );

    if (native_group_layer_view_flag) {
      closeNativeGroupsInfo();
    }
  }
});

$("#native_groups_labels").click(function () {
  if ($(this).prop("checked")) {
    beforeMap.setLayoutProperty(
      "native-groups-labels-left",
      "visibility",
      "visible"
    );
    afterMap.setLayoutProperty(
      "native-groups-labels-right",
      "visibility",
      "visible"
    );
  } else {
    beforeMap.setLayoutProperty(
      "native-groups-labels-left",
      "visibility",
      "none"
    );
    afterMap.setLayoutProperty(
      "native-groups-labels-right",
      "visibility",
      "none"
    );
  }
});

$("#native_groups_lines").click(function () {
  if ($(this).prop("checked")) {
    beforeMap.setLayoutProperty(
      "native-groups-lines-left",
      "visibility",
      "visible"
    );
    afterMap.setLayoutProperty(
      "native-groups-lines-right",
      "visibility",
      "visible"
    );
  } else {
    beforeMap.setLayoutProperty(
      "native-groups-lines-left",
      "visibility",
      "none"
    );
    afterMap.setLayoutProperty(
      "native-groups-lines-right",
      "visibility",
      "none"
    );
  }
});
