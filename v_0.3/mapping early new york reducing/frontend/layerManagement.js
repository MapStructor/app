function handleDrawCreate(e) {
  const featureType = e.features[0].geometry.type;
  const featureId = e.features[0].id;
  if (featureType === selectedType) {
    if(!document.getElementById(`${currentLayerId}-checkbox`).checked){
      drawControls.delete(featureId);
      Swal.fire({
        title: "Current layer isn't visible",
        text: "Turn on current layer to add a new "+ (featureType === "Point"?"point":(featureType === "Polygon"? "polygon" : "line")+".")
      })
    }else{
    layers.find(({ id }) => id === currentLayerId).features.push({
      ...e.features[0],
      properties: {...e.features[0].properties, createdAt: new Date().getTime()}
    });
  console.log("createdAt field has been added ", layers)
  }
  } else if (selectedType === "unset") {
    if (!layers.some((layer) => layer.type === featureType)) {
      selectedType = featureType;
      currentLayerId = generateRandomString(10);
      const layerName = `Untitled ${
        featureType === "Point"
          ? "points"
          : featureType === "LineString"
          ? "lines"
          : "polygons"
      } layer`;
      layers.push({
        name: layerName,
        type: featureType,
        features: [{
          ...e.features[0],
          properties: {...e.features[0].properties, createdAt: new Date().getTime()}
        }],
        id: currentLayerId,
      });
      console.log("createdAt field has been added ", layers)
      addLayer({
        type: selectedType,
        name: layerName,
        id: currentLayerId,
      });
      setCurrentLayer(currentLayerId, featureType)
    }
  } else {
    if (!layers.some((layer) => layer.type === featureType)) {
      selectedType = featureType;
      currentLayerId = generateRandomString(10);
      const layerName = `Untitled ${
        featureType === "Point"
          ? "points"
          : featureType === "LineString"
          ? "lines"
          : "polygons"
      } layer`;
      layers.push({
        name: layerName,
        type: featureType,
        features: [{
          ...e.features[0],
          properties: {...e.features[0].properties, createdAt: new Date().getTime()}
        }],
        id: currentLayerId,
      });
      addLayer({
        type: selectedType,
        name: layerName,
        id: currentLayerId,
      });
      setCurrentLayer(currentLayerId, featureType)
    } else {
      drawControls.delete(featureId);
      const currentLayerName = layers.find(({ id }) => id === currentLayerId).name
      Swal.fire({
        title: "Wrong Layer!",
        text: `"${currentLayerName}" is the current selected layer, switch to a ${featureType === "Point"? "point's": (featureType === "Polygon")? "polygon's": "line's"} layer to add a ${featureType === "Point"? "point": (featureType === "Polygon")? "polygon": "line"}`,
        icon: "error"
      });
    }
  }
  saveProjectToFirebase();
  console.log(layers)
}

function addLayer({ type, name, id }) {
  const layersContainer = document.getElementById("layers-container");
  layerIds.push(id);

  // Create the new layer element
  const layerDiv = document.createElement("div");
  layerDiv.className = `flex mb-2 ${id === currentLayerId ? "selected" : ""}`;
  layerDiv.id = id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `${id}-checkbox`;
  checkbox.checked = true;

  const innerDiv = document.createElement("div");
  innerDiv.className = "flex ml-2 border items-center rounded-lg";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = name;
  nameInput.className = "pl-2 py-1 rounded-tl-lg rounded-bl-lg";
  nameInput.id = `${id}-name-input`;

  const changeTypeBtn = document.createElement("div");
  changeTypeBtn.className = "flex rounded-tr-lg rounded-br-lg";
  changeTypeBtn.style.backgroundColor = "#12abac";
  
  const iconContainer = document.createElement("div");
  iconContainer.className = "type-btn grid items-center"

  const icon = document.createElement("i");
  icon.className = `fa-solid p-2 ${
    type === "Polygon" ? "fa-vector-square" :
    type === "Point" ? "fa-location-pin" :
    "fa-bezier-curve"
  }`;
  icon.id = `change-type-btn-${id}`;
  const viewDataTableIconContainer = document.createElement("div");
  viewDataTableIconContainer.className = "viewDataTableIcon p-2"
  const viewDataTableIcon = document.createElement("i")
  viewDataTableIcon.className = "fa fa-table";
  
  viewDataTableIconContainer.appendChild(viewDataTableIcon);
  const featuresContainer = document.createElement("div")
  featuresContainer.className = "features-container";
  const features = document.createElement("table");
  features.id = id+"-features"
  features.className = "feature-tray w-full"
  featuresContainer.appendChild(features)
  iconContainer.appendChild(icon)
  changeTypeBtn.appendChild(iconContainer);
  changeTypeBtn.appendChild(viewDataTableIconContainer)

  // Append elements
  innerDiv.appendChild(nameInput);
  innerDiv.appendChild(changeTypeBtn);
  layerDiv.appendChild(checkbox);
  layerDiv.appendChild(innerDiv);
  layersContainer.appendChild(layerDiv);
  layersContainer.appendChild(featuresContainer);

  // Add event listeners
  setTimeout(() => {
    checkbox.addEventListener("change", (e) => {
      const isChecked = e.target.checked;
      if(!isChecked){
        layers.forEach(layer => {
          if(id === layer.id) {
            layer.features.forEach(feature => {
              drawControls.delete(feature.id);
            });
          }
        });
      } else {
        layers.forEach(layer => {
          if(id === layer.id) {
            layer.features.forEach(feature => {
              drawControls.add(feature);
            });
          }
        });
      }
    });

    viewDataTableIconContainer.addEventListener("click", () => {
      const clickedLayer = layers.find(layer => layer.id === id);
      if(selectedDataTableLayer === id){
        populateDataTable(clickedLayer, false)
        selectedDataTableLayer = ""
      }else {
        selectedDataTableLayer = id;
        populateDataTable(clickedLayer, true)
      }
    })

    icon.addEventListener("click", (e) => {
      setCurrentLayer(id, type);
    });

    nameInput.addEventListener("change", (e) => {
      const newName = e.target.value;
      if(newName){
        const layer = layers.find(layer => layer.id === id);
        layer.name = e.target.value;
        saveProjectToFirebase();
      }
    });
  }, 1_000);
}


function setCurrentLayer(value, type){
  selectedType = type;
  currentLayerId = value;
  layers.forEach(({id}) => {
    if(id !== value){
      document.getElementById(id).classList.remove("selected")
    } else {
      document.getElementById(id).classList.add("selected")
    }
  })
}