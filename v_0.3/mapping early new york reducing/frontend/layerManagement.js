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
    }else
    layers.find(({ id }) => id === currentLayerId).features.push(e.features[0]);
  } else if (selectedType === "unset") {
    if (!layers.some((layer) => layer.type === featureType)) {
      console.log("Inside if (!layers.some((layer) => layer.type === featureType)) {")
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
        features: [e.features[0]],
        id: currentLayerId,
      });
      addLayer({
        type: selectedType,
        name: layerName,
        id: currentLayerId,
      });
      setCurrentLayer(currentLayerId, featureType)
    }
  } else {
    console.log("!layers.some((layer) => layer.type === featureType) === ", !layers.some((layer) => layer.type === featureType))
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
        features: [e.features[0]],
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
  changeTypeBtn.className = "grid items-center p-2 rounded-tr-lg rounded-br-lg type-btn";
  changeTypeBtn.style.backgroundColor = "#12abac";
  changeTypeBtn.id = `change-type-btn-${id}`;
  
  const icon = document.createElement("i");
  icon.className = `fa-solid ${
    type === "Polygon" ? "fa-vector-square" :
    type === "Point" ? "fa-location-pin" :
    "fa-bezier-curve"
  }`;
  changeTypeBtn.appendChild(icon);

  // Append elements
  innerDiv.appendChild(nameInput);
  innerDiv.appendChild(changeTypeBtn);
  layerDiv.appendChild(checkbox);
  layerDiv.appendChild(innerDiv);
  layersContainer.appendChild(layerDiv);

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

    changeTypeBtn.addEventListener("click", (e) => {
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