/////////////////////////////
//   ZOOM LABELS TEMPLATE
/////////////////////////////

// Label Styles
var labelStyle = {
  font: "Asap Medium",
  size: 18,
  color: "#000000",
  haloWidth: 3,
  haloBlur: 2,
  haloColor: "#ffffff"
};

// Label Configuration
function createZoomLabel(id, title, coordinates, visibility, minzoom, opacityStops) {
  return {
    id: id,
    type: "symbol",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              title: title,
              icon: "circle"
            },
            geometry: {
              type: "Point",
              coordinates: coordinates
            }
          }
        ]
      }
    },
    minzoom: minzoom,
    layout: {
      visibility: visibility,
      "text-font": [labelStyle.font],
      "text-field": "{title}",
      "text-size": labelStyle.size
    },
    paint: {
      "text-color": labelStyle.color,
      "text-halo-width": labelStyle.haloWidth,
      "text-halo-blur": labelStyle.haloBlur,
      "text-halo-color": labelStyle.haloColor,
      "text-opacity": {
        default: 1,
        stops: opacityStops
      }
    }
  };
}