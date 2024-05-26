map.on("draw.create", (e) => {
  handleDrawCreate(e);
});

map.on("draw.delete", () => {
  saveProjectToFirebase();
});

function toggleAddLayerLinkSection(e) {
  e.preventDefault();
  const section = document.getElementById("add-layer-link-section");
  section.style.display = section.style.display === "none" ? "block" : "none";
}

function hideModalOuterDiv(e) {
  const modal = document.getElementById("modal");
  if (e.target.id === "modal") {
    modal.style.display = "none";
  }
}

function hideModalInnerDiv(e) {
  e.stopPropagation(); // Prevent event bubbling to the outer div
}

function showLayerModal(e) {
  e.preventDefault();
  const modal = document.getElementById("modal");
  modal.style.display = "grid";
  document.getElementById("add-layer-modal").style.display = "block";
  document.getElementById("load-project-modal").style.display = "none";
}

function showLoadProjectModal(e) {
  e.preventDefault();
  const modal = document.getElementById("modal");
  modal.style.display = "grid";
  document.getElementById("load-project-modal").style.display = "block";
  document.getElementById("add-layer-modal").style.display = "none";
}

function handleLabelInputChange(e){
  const newLabel = e.target.value;
  const featureId = featuresSelected[0].id;
  const feature = layers.find(({id}) => id === currentLayerId).features.find(({id})=> id === featureId);
  feature.properties.label = newLabel;
  drawControls.get(featureId).properties.label = newLabel
  createOrUpdateLabel(feature)
  saveProjectToFirebase()
}

function createOrUpdateLabel(feature) {
  const coordinates =
    feature.geometry.type === "Point"
      ? feature.geometry.coordinates
      : feature.geometry.coordinates[0][0];
  const label = feature.properties.label;
  const id = generateRandomString(10)

  var labelLayerSource = {
    id,
    type: "symbol",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              title: label,
              icon: "circle",
            },
            geometry: {
              type: "Point",
              coordinates: coordinates,
            },
          },
        ],
      },
    },
    layout: {
      "text-font": ["Asap Medium"],
      "text-field": "{title}",
      "text-size": 18,
      "text-offset": [0, 1.5],
      visibility: "visible",
    },
    paint: {
      "text-color": "#8B0000",
      "text-halo-width": 3,
      "text-halo-blur": 2,
      "text-halo-color": "#ffffff",
    },
  };

  if (map.getLayer(label)) {
    map.getSource(label).setData(labelLayerSource.source.data);
  } else {
    map.addLayer(labelLayerSource);
  }
}