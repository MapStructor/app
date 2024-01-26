////// zoomlabels.js



var LongIslandZoomLabel = {
  id: "label-long-island",
  type: "symbol",
  source: {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            title: "Long Island",
            icon: "circle",
          },
          geometry: {
            type: "Point",
            coordinates: [-72.94912, 40.85225],
          },
        },
      ],
    },
  },
  layout: {
    visibility: "visible",
    "text-font": ["Asap Medium"],
    "text-field": "{title}",
    "text-size": 18,
  },
  paint: {
    "text-color": "#000000",
    "text-halo-width": 3,
    "text-halo-blur": 2,
    "text-halo-color": "#ffffff",
    "text-opacity": {
      default: 1,
      stops: [
        [7.5, 0],
        [8, 1],
      ],
    },
  },
};

var BrooklynZoomLabel = {
  id: "label-brooklyn",
  type: "symbol",
  source: {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            title: "Brooklyn",
            icon: "circle",
          },
          geometry: {
            type: "Point",
            coordinates: [-73.93772792292754, 40.65432897355928],
          },
        },
      ],
    },
  },
  layout: {
    visibility: "visible",
    "text-font": ["Asap Medium"],
    "text-field": "{title}",
    "text-size": 18,
  },
  paint: {
    "text-color": "#000000",
    "text-halo-width": 3,
    "text-halo-blur": 2,
    "text-halo-color": "#ffffff",
    "text-opacity": {
      default: 1,
      stops: [
        [10.2, 0],
        [10.5, 1],
      ],
    },
  },
};

var NewAmsterdamZoomLabel = {
  id: "label-new-amsterdam",
  type: "symbol",
  source: {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            title: "New Amsterdam",
            icon: "circle",
          },
          geometry: {
            type: "Point",
            coordinates: [-74.01255, 40.704882],
          },
        },
      ],
    },
  },
  layout: {
    visibility: "visible",
    "text-font": ["Asap Medium"],
    "text-field": "{title}",
    "text-size": 18,
  },
  paint: {
    "text-color": "#000000",
    "text-halo-width": 3,
    "text-halo-blur": 2,
    "text-halo-color": "#ffffff",
    "text-opacity": {
      default: 1,
      stops: [
        [6, 0],
        [6.5, 1],
      ],
    },
  },
};

var ManhattanZoomLabel = {
  id: "label-manhattan",
  type: "symbol",
  source: {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            title: "Manhattan",
            icon: "circle",
          },
          geometry: {
            type: "Point",
            coordinates: [-73.97719031118277, 40.78097749612493],
          },
        },
      ],
    },
  },
  layout: {
    visibility: "visible",
    "text-font": ["Asap Medium"],
    "text-field": "{title}",
    "text-size": 18,
  },
  paint: {
    "text-color": "#000000",
    "text-halo-width": 3,
    "text-halo-blur": 2,
    "text-halo-color": "#ffffff",
    "text-opacity": {
      default: 1,
      stops: [
        [10.2, 0],
        [10.5, 1],
      ],
    },
  },
};

var NewNetherlandZoomLabel = {
  id: "label-new-netherland",
  type: "symbol",
  source: {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            title: "New Netherland",
            icon: "circle",
          },
          geometry: {
            type: "Point",
            coordinates: [-73.60361111111109, 41.09659166666665],
          },
        },
      ],
    },
  },
  layout: {
    visibility: "visible",
    "text-font": ["Asap Medium"],
    "text-field": "{title}",
    "text-size": 18,
  },
  paint: {
    "text-color": "#000000",
    "text-halo-width": 3,
    "text-halo-blur": 2,
    "text-halo-color": "#ffffff",
  },
};

var NewEnglandZoomLabel = {
  id: "label-new-england",
  type: "symbol",
  source: {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            title: "New England",
            icon: "circle",
          },
          geometry: {
            type: "Point",
            coordinates: [-71.67755127, 42.4971076267],
          },
        },
      ],
    },
  },
  //For some reason, New Netherland label disappears unless minzoom is created
  minzoom: 5.2,
  layout: {
    visibility: "visible",
    "text-font": ["Asap Medium"],
    "text-field": "{title}",
    "text-size": 18,
    //"text-anchor": "center"
  },
  paint: {
    "text-color": "#000000",
    "text-halo-width": 3,
    "text-halo-blur": 2,
    "text-halo-color": "#ffffff",

    "text-opacity": {
      default: 1,
      stops: [
        [5.2, 0],
        [5.6, 1],
      ],
    },
  },
};



////// afterlayers.js

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



///  zoomfunctions.js


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


//zoomfunctions.js #2

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




//// mapinit.js:


// world bounds
const WorldBounds = [
    [-179, -59], // [west, south]
    [135, 77], // [east, north]
  ];
  
  // area bounds
  var LongIslandBounds = [
      [-74.0419692, 40.5419011],
      [-71.8562705, 41.161155],
    ],
    ManhattanBounds = [
      [-74.04772962697074, 40.682916945445164],
      [-73.90665099539478, 40.879038046804695],
    ],
    NYCbounds = [
      [-74.25559136315213, 40.496133987611834],
      [-73.7000090638712, 40.91553277650267],
    ],
    BronxBounds = [
      [-73.93360592036706, 40.785356620508495],
      [-73.76533243995276, 40.91553277650267],
    ],
    BrooklynBounds = [
      [-74.04189660705046, 40.56952999398417],
      [-73.8335592388046, 40.73912795313439],
    ],
    QueensBounds = [
      [-73.96262015898652, 40.54183396045311],
      [-73.7000090638712, 40.80101146781903],
    ],
    StatenIslandBounds = [
      [-74.25559136315213, 40.496133987611834],
      [-74.04923629842045, 40.648925552276076],
    ],
    NewNLbounds = [
      [-75.5588888888889, 39.5483333333333],
      [-71.6483333333333, 42.64485],
    ],
    NewEnglandBounds = [
      [-73.6468505859375, 41.017210578228436],
      [-69.708251953125, 43.97700467496408],
    ];

    
//// mapinit.js #2:


//   ZOOM LABELS
var lbl_color = "#482525";
var lbl_color_hover = "#ff0000";


