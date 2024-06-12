map.on("draw.create", (e) => {
  handleDrawCreate(e);
});

map.on("draw.delete", (e) => {
  const feature = e.features[0];
  const id = feature.id;
  var mapLayers = map.getStyle().layers;

  // Optional: Display layer names on the map
  const layer = mapLayers.find(layer => {
    return layer.id.includes(id)
  })
  if(layer){
    map.removeLayer(layer.id)
  }
  const parentLayer = layers.find(layer => {
    return !!layer.features.find(feature => feature.id === id)
  })

  const index = parentLayer.features.findIndex(feature => feature.id === id);
  console.log("index", index)
  parentLayer.features = parentLayer.features.slice(0, index).concat(parentLayer.features.slice(index+1))
  saveProjectToFirebase()
})

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

function handleInfoInputChange(e){
  const info = e.target.value;
  const featureId = featuresSelected[0].id;
  const feature = layers.find(({id}) => id === currentLayerId).features.find(({id})=> id === featureId);
  feature.properties.info = info;
  drawControls.get(featureId).properties.info = info;
  // createOrUpdateLabel(feature)
  saveProjectToFirebase()
}

function handleInfoCharacterChange(e){
  const info = document.getElementById("feature-info-value").value
  console.log(info)
  document.getElementById("min-info-length").innerText = info.length
}

function createOrUpdateLabel(feature) {
  let coordinates;
  const label = feature.properties.label;
  const id = generateRandomString(10)+"+--+"+feature.id
  console.log(id);
  
  // Determine the coordinates based on the geometry type
  if (feature.geometry.type === "Point") {
    coordinates = feature.geometry.coordinates;
  } else if (feature.geometry.type === "LineString") {
    // Use the midpoint of the LineString for the label position
    const lineCoordinates = feature.geometry.coordinates;
    const midpointIndex = Math.floor(lineCoordinates.length / 2);
    coordinates = lineCoordinates[midpointIndex];
  } else {
    // Calculate the centroid of the polygon for the label position
    const polygonCoordinates = feature.geometry.coordinates[0];
    coordinates = calculatePolygonCentroid(polygonCoordinates);
  }

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

function calculatePolygonCentroid(coordinates) {
  let x = 0, y = 0, area = 0, factor;
  const numPoints = coordinates.length;

  for (let i = 0; i < numPoints - 1; i++) {
    const x1 = coordinates[i][0];
    const y1 = coordinates[i][1];
    const x2 = coordinates[i + 1][0];
    const y2 = coordinates[i + 1][1];

    factor = (x1 * y2 - x2 * y1);
    x += (x1 + x2) * factor;
    y += (y1 + y2) * factor;
    area += factor;
  }

  area /= 2;
  x /= (6 * area);
  y /= (6 * area);

  return [x, y];
}

/* document.getElementById("data-table-checkbox").addEventListener("change", e => {
  const dataTable = document.getElementById("data-table")
  if(e.target.checked){
    populateDataTable()
    dataTable.style.display = "block";
  } else {
    dataTable.style.display = "none";
  }
}) */