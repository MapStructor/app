
function DefaultHandle() {
    if (
      !demo_taxlot_click_ev &&
      !castello_click_ev &&
      !grant_lots_click_ev &&
      !dutch_grant_click_ev &&
      !farms_click_ev &&
      !curr_layer_click_ev &&
      !settlements_click_ev &&
      !info_click_ev &&
      !gravesend_click_ev &&
      !native_groups_click_ev &&
      !karl_click_ev &&
      !zoom_labels_click_ev
    ) {
      if (windoWidth > 637)
        if ($("#view-hide-layer-panel").length > 0)
          $("#view-hide-layer-panel").trigger("click");
    }
  
    demo_taxlot_click_ev = false;
    castello_click_ev = false;
    grant_lots_click_ev = false;
    dutch_grant_click_ev = false;
    native_groups_click_ev = false;
    zoom_labels_click_ev = false;
  }
  
  function closeCastelloInfo() {
    $("#infoLayerCastello").slideUp();
    castello_layer_view_flag = false;
    if (afterHighCastelloPopUp.isOpen()) afterHighCastelloPopUp.remove();
    if (beforeHighCastelloPopUp.isOpen()) beforeHighCastelloPopUp.remove();
  }
  
  function CastelloClickHandle(event) {
    if (castello_layer_view_flag && clickedStateId == event.features[0].id) {
      if ($("#view-hide-layer-panel").length > 0)
        if (!layer_view_flag) {
          $("#rightInfoBar").css("display", "block");
          setTimeout(function () {
            $("#rightInfoBar").slideUp();
          }, 500);
        }
  
      closeCastelloInfo();
    } else {
      clickedStateId = event.features[0].id;
  
      places_popup_html =
        "<h3>Castello Taxlot (1660)</h3><hr>" +
        "<br>" +
        "<b>" +
        "Taxlot: " +
        "</b>" +
        event.features[0].properties.LOT2 +
        "<br>" +
        "<b>" +
        "Property Type: " +
        "</b>" +
        event.features[0].properties.tax_lots_1 +
        "<br>" +
        "<br>" +
        "<b>" +
        "Encyclopedia Page: " +
        "</b>" +
        "<br>" +
        '<a href="https://encyclopedia.nahc-mapping.org/lots/taxlot' +
        event.features[0].properties.LOT2 +
        '" target="_blank">https://encyclopedia.nahc-mapping.org/lots/taxlot' +
        event.features[0].properties.LOT2 +
        "</a>";
  
      var coordinates = [];
      coordinates = event.features[0].geometry.coordinates.slice();
  
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
      }
  
      beforeHighCastelloPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='infoLayerCastelloPopUp'><b>Taxlot (1660):</b><br>" +
            event.features[0].properties.LOT2 +
            "</div>"
        );
      if (!beforeHighCastelloPopUp.isOpen())
        beforeHighCastelloPopUp.addTo(beforeMap);
  
      afterHighCastelloPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='infoLayerCastelloPopUp'><b>Taxlot (1660):</b><br>" +
            event.features[0].properties.LOT2 +
            "</div>"
        );
      if (!afterHighCastelloPopUp.isOpen())
        afterHighCastelloPopUp.addTo(afterMap);
      if ($(".infoLayerElem").first().attr("id") != "infoLayerCastello")
        $("#infoLayerCastello").insertBefore($(".infoLayerElem").first());
      $("#infoLayerCastello").html(places_popup_html).slideDown();
  
      if (!layer_view_flag)
        if ($("#view-hide-layer-panel").length > 0)
          $("#view-hide-layer-panel").trigger("click");
      //}
      castello_layer_view_flag = true;
    }
    castello_click_ev = true;
  }
  
  function closeDemoInfo() {
    $("#demoLayerInfo").slideUp();
    demo_layer_view_flag = false;
    if (afterHighDemoPopUp.isOpen()) afterHighDemoPopUp.remove();
    if (beforeHighDemoPopUp.isOpen()) beforeHighDemoPopUp.remove();
  }
  
  function DemoClickHandle(event) {
    if (demo_layer_view_flag) {
      if ($("#view-hide-layer-panel").length > 0)
        if (!layer_view_flag) {
          $("#rightInfoBar").css("display", "block");
          setTimeout(function () {
            $("#rightInfoBar").slideUp();
          }, 500);
        }
  
      closeDemoInfo();
    } else {
      demo_layer_taxlot = event.features[0].properties.TAXLOT;
  
      demoFilterRangeCalc();
  
      buildPopUpInfo(event.features[0].properties);
      if ($(".infoLayerElem").first().attr("id") != "demoLayerInfo")
        $("#demoLayerInfo").insertBefore($(".infoLayerElem").first());
      $("#demoLayerInfo").slideDown();
  
      if (!layer_view_flag)
        if ($("#view-hide-layer-panel").length > 0)
          $("#view-hide-layer-panel").trigger("click");
  
      demo_layer_view_flag = true;
  
      var coordinates = [];
      coordinates = event.features[0].geometry.coordinates.slice();
  
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
      }
  
      beforeHighDemoPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/" +
            demo_layer_taxlot +
            "' target='_blank'>" +
            demo_layer_taxlot +
            "</a></h2></b></div>"
        );
      if (!beforeHighDemoPopUp.isOpen()) beforeHighDemoPopUp.addTo(beforeMap);
  
      afterHighDemoPopUp
        .setLngLat(coordinates)
        .setHTML(
          "<div class='demoLayerInfoPopUp'><b><h2>Taxlot: <a href='https://encyclopedia.nahc-mapping.org/taxlot/" +
            demo_layer_taxlot +
            "' target='_blank'>" +
            demo_layer_taxlot +
            "</a></h2></b></div>"
        );
      if (!afterHighDemoPopUp.isOpen()) afterHighDemoPopUp.addTo(afterMap);
    }
    demo_taxlot_click_ev = true;
  }
  
  function DutchGrantsClickHandle(event) {
    var highPopUpHTML = "";
    if (
      typeof dutch_grant_lots_info[event.features[0].properties.Lot] ==
      "undefined"
    ) {
      highPopUpHTML =
        "<div class='infoLayerDutchGrantsPopUp'>" +
        event.features[0].properties.name +
        "<br>";
    } else {
      highPopUpHTML =
        "<div class='infoLayerDutchGrantsPopUp'>" +
        (dutch_grant_lots_info[event.features[0].properties.Lot].name_txt.length >
        0
          ? dutch_grant_lots_info[event.features[0].properties.Lot].name_txt
          : event.features[0].properties.name) +
        "<br>";
    }
    highPopUpHTML +=
      "<b>Dutch Grant Lot: </b>" + event.features[0].properties.Lot + "</div>";
  
    if (dgrants_layer_view_id == event.features[0].id) {
      if (dgrants_layer_view_flag) {
        if ($("#view-hide-layer-panel").length > 0)
          if (!layer_view_flag) {
            $("#rightInfoBar").css("display", "block");
            setTimeout(function () {
              $("#rightInfoBar").slideUp();
            }, 500);
          }
  
        closeDutchGrantsInfo();
      } else {
        buildDutchGrantPopUpInfo(event.features[0].properties);
        if ($(".infoLayerElem").first().attr("id") != "infoLayerDutchGrants")
          $("#infoLayerDutchGrants").insertBefore($(".infoLayerElem").first());
        $("#infoLayerDutchGrants").slideDown();
        if ($("#view-hide-layer-panel").length > 0)
          if (!layer_view_flag) $("#view-hide-layer-panel").trigger("click");
        dgrants_layer_view_flag = true;
        afterMap.setFeatureState(
          {
            source: "dutch_grants-5ehfqe-right-highlighted",
            sourceLayer: "dutch_grants-5ehfqe",
            id: dgrants_layer_view_id,
          },
          { hover: true }
        );
        beforeMap.setFeatureState(
          {
            source: "dutch_grants-5ehfqe-left-highlighted",
            sourceLayer: "dutch_grants-5ehfqe",
            id: dgrants_layer_view_id,
          },
          { hover: true }
        );
        afterHighMapGrantLotPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
        if (!afterHighMapGrantLotPopUp.isOpen())
          afterHighMapGrantLotPopUp.addTo(afterMap);
        beforeHighMapGrantLotPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
        if (!beforeHighMapGrantLotPopUp.isOpen())
          beforeHighMapGrantLotPopUp.addTo(beforeMap);
      }
    } else {
      buildDutchGrantPopUpInfo(event.features[0].properties);
      if ($(".infoLayerElem").first().attr("id") != "infoLayerDutchGrants")
        $("#infoLayerDutchGrants").insertBefore($(".infoLayerElem").first());
      $("#infoLayerDutchGrants").slideDown();
      if ($("#view-hide-layer-panel").length > 0)
        if (!layer_view_flag) $("#view-hide-layer-panel").trigger("click");
      dgrants_layer_view_flag = true;
      //*A#
      afterMap.setFeatureState(
        {
          source: "dutch_grants-5ehfqe-right-highlighted",
          sourceLayer: "dutch_grants-5ehfqe",
          id: dgrants_layer_view_id,
        },
        { hover: false }
      );
      afterMap.setFeatureState(
        {
          source: "dutch_grants-5ehfqe-right-highlighted",
          sourceLayer: "dutch_grants-5ehfqe",
          id: event.features[0].id,
        },
        { hover: true }
      );
      beforeMap.setFeatureState(
        {
          source: "dutch_grants-5ehfqe-left-highlighted",
          sourceLayer: "dutch_grants-5ehfqe",
          id: dgrants_layer_view_id,
        },
        { hover: false }
      );
      beforeMap.setFeatureState(
        {
          source: "dutch_grants-5ehfqe-left-highlighted",
          sourceLayer: "dutch_grants-5ehfqe",
          id: event.features[0].id,
        },
        { hover: true }
      );
      afterHighMapGrantLotPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
      if (!afterHighMapGrantLotPopUp.isOpen())
        afterHighMapGrantLotPopUp.addTo(afterMap);
      beforeHighMapGrantLotPopUp.setLngLat(event.lngLat).setHTML(highPopUpHTML);
      if (!beforeHighMapGrantLotPopUp.isOpen())
        beforeHighMapGrantLotPopUp.addTo(beforeMap);
    }
    dgrants_layer_view_id = event.features[0].id;
    dutch_grant_click_ev = true;
  }
  
  function NativeGroupsClickHandle(event) {
    var highPopUpHTML = "";
  
    if (
      typeof taxlot_event_entities_info[event.features[0].properties.nid] ==
        "undefined" ||
      event.features[0].properties.nid == ""
    ) {
      highPopUpHTML =
        "<div class='infoLayerCastelloPopUp'><b>Name : </b>" +
        event.features[0].properties.name +
        "</div>";
    } else {
      highPopUpHTML =
        "<div class='infoLayerCastelloPopUp'><b>Name : </b>" +
        (taxlot_event_entities_info[event.features[0].properties.nid].name
          .length > 0
          ? taxlot_event_entities_info[event.features[0].properties.nid].name
          : event.features[0].properties.name) +
        "</div>";
    }
  
    if (native_group_layer_view_id == event.features[0].id) {
      if (native_group_layer_view_flag) {
        if ($("#view-hide-layer-panel").length > 0)
          if (!layer_view_flag) {
            $("#rightInfoBar").css("display", "block");
            setTimeout(function () {
              $("#rightInfoBar").slideUp();
            }, 500);
          }
  
        closeNativeGroupsInfo();
      } else {
        buildNativeGroupPopUpInfo(event.features[0].properties);
        if ($(".infoLayerElem").first().attr("id") != "infoLayerNativeGroups")
          $("#infoLayerNativeGroups").insertBefore($(".infoLayerElem").first());
        $("#infoLayerNativeGroups").slideDown();
        if ($("#view-hide-layer-panel").length > 0)
          if (!layer_view_flag) $("#view-hide-layer-panel").trigger("click");
        native_group_layer_view_flag = true;
        afterMap.setFeatureState(
          {
            source: "native-groups-area-right-highlighted",
            sourceLayer: "indian_areas_long_island-50h2dj",
            id: native_group_layer_view_id,
          },
          { hover: true }
        );
        beforeMap.setFeatureState(
          {
            source: "native-groups-area-left-highlighted",
            sourceLayer: "indian_areas_long_island-50h2dj",
            id: native_group_layer_view_id,
          },
          { hover: true }
        );
        afterHighMapNativeGroupsPopUp
          .setLngLat(event.lngLat)
          .setHTML(highPopUpHTML);
        if (!afterHighMapNativeGroupsPopUp.isOpen())
          afterHighMapNativeGroupsPopUp.addTo(afterMap);
        beforeHighMapNativeGroupsPopUp
          .setLngLat(event.lngLat)
          .setHTML(highPopUpHTML);
        if (!beforeHighMapNativeGroupsPopUp.isOpen())
          beforeHighMapNativeGroupsPopUp.addTo(beforeMap);
      }
    } else {
      buildNativeGroupPopUpInfo(event.features[0].properties);
      if ($(".infoLayerElem").first().attr("id") != "infoLayerNativeGroups")
        $("#infoLayerNativeGroups").insertBefore($(".infoLayerElem").first());
      $("#infoLayerNativeGroups").slideDown();
      if ($("#view-hide-layer-panel").length > 0)
        if (!layer_view_flag) $("#view-hide-layer-panel").trigger("click");
      native_group_layer_view_flag = true;
      afterMap.setFeatureState(
        {
          source: "native-groups-area-right-highlighted",
          sourceLayer: "indian_areas_long_island-50h2dj",
          id: native_group_layer_view_id,
        },
        { hover: false }
      );
      afterMap.setFeatureState(
        {
          source: "native-groups-area-right-highlighted",
          sourceLayer: "indian_areas_long_island-50h2dj",
          id: event.features[0].id,
        },
        { hover: true }
      );
      beforeMap.setFeatureState(
        {
          source: "native-groups-area-left-highlighted",
          sourceLayer: "indian_areas_long_island-50h2dj",
          id: native_group_layer_view_id,
        },
        { hover: false }
      );
      beforeMap.setFeatureState(
        {
          source: "native-groups-area-left-highlighted",
          sourceLayer: "indian_areas_long_island-50h2dj",
          id: event.features[0].id,
        },
        { hover: true }
      );
      afterHighMapNativeGroupsPopUp
        .setLngLat(event.lngLat)
        .setHTML(highPopUpHTML);
      if (!afterHighMapNativeGroupsPopUp.isOpen())
        afterHighMapNativeGroupsPopUp.addTo(afterMap);
      beforeHighMapNativeGroupsPopUp
        .setLngLat(event.lngLat)
        .setHTML(highPopUpHTML);
      if (!beforeHighMapNativeGroupsPopUp.isOpen())
        beforeHighMapNativeGroupsPopUp.addTo(beforeMap);
    }
    native_group_layer_view_id = event.features[0].id;
    native_groups_click_ev = true;
  }
  
  function closeGrantLotsInfo() {
    $("#infoLayerGrantLots").slideUp();
    grant_lots_view_flag = false;
    if (afterHighGrantLotsPopUp.isOpen()) afterHighGrantLotsPopUp.remove();
    if (beforeHighGrantLotsPopUp.isOpen()) beforeHighGrantLotsPopUp.remove();
  }
  
  function closeDutchGrantsInfo() {
    $("#infoLayerDutchGrants").slideUp();
    dgrants_layer_view_flag = false;
    afterMap.setFeatureState(
      {
        source: "dutch_grants-5ehfqe-right-highlighted",
        sourceLayer: "dutch_grants-5ehfqe",
        id: dgrants_layer_view_id,
      },
      { hover: false }
    );
    beforeMap.setFeatureState(
      {
        source: "dutch_grants-5ehfqe-left-highlighted",
        sourceLayer: "dutch_grants-5ehfqe",
        id: dgrants_layer_view_id,
      },
      { hover: false }
    );
    if (afterHighMapGrantLotPopUp.isOpen()) afterHighMapGrantLotPopUp.remove();
    if (beforeHighMapGrantLotPopUp.isOpen()) beforeHighMapGrantLotPopUp.remove();
  }
  
  function closeNativeGroupsInfo() {
    $("#infoLayerNativeGroups").slideUp();
    native_group_layer_view_flag = false;
    afterMap.setFeatureState(
      {
        source: "native-groups-area-right-highlighted",
        sourceLayer: "indian_areas_long_island-50h2dj",
        id: native_group_layer_view_id,
      },
      { hover: false }
    );
    beforeMap.setFeatureState(
      {
        source: "native-groups-area-left-highlighted",
        sourceLayer: "indian_areas_long_island-50h2dj",
        id: native_group_layer_view_id,
      },
      { hover: false }
    );
    if (afterHighMapNativeGroupsPopUp.isOpen())
      afterHighMapNativeGroupsPopUp.remove();
    if (beforeHighMapNativeGroupsPopUp.isOpen())
      beforeHighMapNativeGroupsPopUp.remove();
  }
  