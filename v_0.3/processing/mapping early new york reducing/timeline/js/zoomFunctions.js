
function testZoom() {
    var current_bearing = beforeMap.getBearing();
    var TestBounds = [
      -74.01507471506183, 40.70239266372983, -74.00734180289922,
      40.709035402164524,
    ]; //dutch grants
    beforeMap.fitBounds(TestBounds, { bearing: current_bearing });
    afterMap.fitBounds(TestBounds, { bearing: current_bearing });
  }
  
  function zoomtobounds(boundsName) {
    switch (boundsName) {
      case "LongIsland":
        if (windoWidth <= 637) {
          beforeMap.fitBounds(LongIslandBounds, { bearing: 0 });
          afterMap.fitBounds(LongIslandBounds, { bearing: 0 });
        } else {
          beforeMap.fitBounds(LongIslandBounds, {
            bearing: 0,
            padding: { top: 5, bottom: 5, left: 350, right: 5 },
          });
          afterMap.fitBounds(LongIslandBounds, {
            bearing: 0,
            padding: { top: 5, bottom: 5, left: 350, right: 5 },
          });
        }
        break;
      case "Brooklyn":
        beforeMap.fitBounds(BrooklynBounds, { bearing: 0 });
        afterMap.fitBounds(BrooklynBounds, { bearing: 0 });
        break;
      case "NYC":
        beforeMap.fitBounds(NYCbounds, { bearing: 0 });
        afterMap.fitBounds(NYCbounds, { bearing: 0 });
        break;
      case "NewNL":
        beforeMap.fitBounds(NewNLbounds, { bearing: 0 });
        afterMap.fitBounds(NewNLbounds, { bearing: 0 });
        break;
      case "NewEngland":
        beforeMap.fitBounds(NewEnglandBounds, { bearing: 0 });
        afterMap.fitBounds(NewEnglandBounds, { bearing: 0 });
        break;
      case "Manhattan":
        beforeMap.fitBounds(ManhattanBounds, { bearing: na_bearing });
        afterMap.fitBounds(ManhattanBounds, { bearing: na_bearing });
        break;
      case "World":
        beforeMap.fitBounds(WorldBounds, { bearing: 0 });
        afterMap.fitBounds(WorldBounds, { bearing: 0 });
        break;
    }
  }
  
  function zoomtocenter(centerName) {
    switch (centerName) {
      case "NA":
        beforeMap.easeTo({
          center: na_center,
          zoom: na_zoom,
          bearing: na_bearing,
          pitch: 0,
        });
        afterMap.easeTo({
          center: na_center,
          zoom: na_zoom,
          bearing: na_bearing,
          pitch: 0,
        });
        break;
      case "Manatus Map":
        beforeMap.easeTo({
          center: [-73.9512, 40.4999],
          zoom: 9,
          bearing: -89.7,
          pitch: 0,
        });
        afterMap.easeTo({
          center: [-73.9512, 40.4999],
          zoom: 9,
          bearing: -89.7,
          pitch: 0,
        });
        break;
      case "Original Grants":
        beforeMap.easeTo({
          center: [-73.9759, 40.7628],
          zoom: 12,
          bearing: -51.3,
          pitch: 0,
        });
        afterMap.easeTo({
          center: [-73.9759, 40.7628],
          zoom: 12,
          bearing: -51.3,
          pitch: 0,
        });
        break;
      case "NYC plan":
        beforeMap.easeTo({
          center: [-74.01046, 40.70713],
          zoom: 15,
          bearing: -51.3,
          pitch: 0,
        });
        afterMap.easeTo({
          center: [-74.01046, 40.70713],
          zoom: 15,
          bearing: -51.3,
          pitch: 0,
        });
        break;
      case "Ratzer Map":
        beforeMap.easeTo({
          center: [-74.00282, 40.69929],
          zoom: 12,
          bearing: -6.5,
          pitch: 0,
        });
        afterMap.easeTo({
          center: [-74.00282, 40.69929],
          zoom: 12,
          bearing: -6.5,
          pitch: 0,
        });
        break;
      case "Long Island":
        beforeMap.easeTo({
          center: [-73.094, 41.1],
          zoom: 8,
          bearing: 0,
          pitch: 0,
        });
        afterMap.easeTo({
          center: [-73.094, 41.1],
          zoom: 8,
          bearing: 0,
          pitch: 0,
        });
        break;
      case "NY Bay":
        beforeMap.easeTo({
          center: [-73.9998, 40.6662],
          zoom: 11,
          bearing: 0,
          pitch: 0,
        });
        afterMap.easeTo({
          center: [-73.9998, 40.6662],
          zoom: 11,
          bearing: 0,
          pitch: 0,
        });
        break;
      case "Gravesend Map":
        beforeMap.easeTo({
          center: [-73.97629, 40.60105],
          zoom: 13,
          bearing: 0,
          pitch: 0,
        });
        afterMap.easeTo({
          center: [-73.97629, 40.60105],
          zoom: 13,
          bearing: 0,
          pitch: 0,
        });
        break;
      case "Long Island 1873":
        beforeMap.easeTo({
          center: [-73.2739, 40.876],
          zoom: 8.6,
          bearing: 0,
          pitch: 0,
        });
        afterMap.easeTo({
          center: [-73.2739, 40.876],
          zoom: 8.6,
          bearing: 0,
          pitch: 0,
        });
        break;
      case "Belgii Novi":
        beforeMap.easeTo({
          center: [-74.39, 40.911],
          zoom: 5.7,
          bearing: -7.2,
          pitch: 0,
        });
        afterMap.easeTo({
          center: [-74.39, 40.911],
          zoom: 5.7,
          bearing: -7.2,
          pitch: 0,
        });
        break;
      case "New England":
        beforeMap.easeTo({
          center: [-72.898, 42.015],
          zoom: 7,
          bearing: 0,
          pitch: 0,
        });
        afterMap.easeTo({
          center: [-72.898, 42.015],
          zoom: 7,
          bearing: 0,
          pitch: 0,
        });
        break;
    }
  }
  
  function zoomLabels(sel_opt) {
    if (sel_opt == "show") {
      beforeMap.setLayoutProperty("label-long-island", "visibility", "visible");
      afterMap.setLayoutProperty("label-long-island", "visibility", "visible");
      beforeMap.setLayoutProperty("label-brooklyn", "visibility", "visible");
      afterMap.setLayoutProperty("label-brooklyn", "visibility", "visible");
      beforeMap.setLayoutProperty("label-manhattan", "visibility", "visible");
      afterMap.setLayoutProperty("label-manhattan", "visibility", "visible");
      beforeMap.setLayoutProperty("label-new-amsterdam", "visibility", "visible");
      afterMap.setLayoutProperty("label-new-amsterdam", "visibility", "visible");
      beforeMap.setLayoutProperty(
        "label-new-netherland",
        "visibility",
        "visible"
      );
      afterMap.setLayoutProperty("label-new-netherland", "visibility", "visible");
      beforeMap.setLayoutProperty("label-new-england", "visibility", "visible");
      afterMap.setLayoutProperty("label-new-england", "visibility", "visible");
      document.getElementById("show-zoom-label").style.display = "inline-block";
      document.getElementById("hide-zoom-label").style.display = "none";
    } else {
      beforeMap.setLayoutProperty("label-long-island", "visibility", "none");
      afterMap.setLayoutProperty("label-long-island", "visibility", "none");
      beforeMap.setLayoutProperty("label-brooklyn", "visibility", "none");
      afterMap.setLayoutProperty("label-brooklyn", "visibility", "none");
      beforeMap.setLayoutProperty("label-manhattan", "visibility", "none");
      afterMap.setLayoutProperty("label-manhattan", "visibility", "none");
      beforeMap.setLayoutProperty("label-new-amsterdam", "visibility", "none");
      afterMap.setLayoutProperty("label-new-amsterdam", "visibility", "none");
      beforeMap.setLayoutProperty("label-new-netherland", "visibility", "none");
      afterMap.setLayoutProperty("label-new-netherland", "visibility", "none");
      beforeMap.setLayoutProperty("label-new-england", "visibility", "none");
      afterMap.setLayoutProperty("label-new-england", "visibility", "none");
      document.getElementById("hide-zoom-label").style.display = "inline-block";
      document.getElementById("show-zoom-label").style.display = "none";
    }
  }
  