const title = document.getElementById("title");

function titleOnChange(e) {
  window.updateDoc(doc(window.db, "projects", projectId), {
    name: e.target.value,
  });
}

window.getDoc(doc(window.db, "projects", projectId)).then((snapshot) => {
  title.value = snapshot.data().name;
});

document.getElementById("project-id").value = projectId;

function validateProjectIdInput(e) {
  const input = e.target;
  const button = document.getElementById("load-project-button");
  button.disabled = input.value.trim() === "";
}

function loadProjectById() {
  const input = document.getElementById("project-id-input").value;
  if (input.trim() !== "") {
    getProjectById(input.trim());
    document.getElementById("modal").style.display = "none";
  }
}

function toggleFeatureEditor(isVisible, properties) {
  document.getElementById("feature-editor").style.display = isVisible
    ? "block"
    : "none";
  // update properties
  if (properties) {
    document.getElementById("feature-label-value").value =
      properties.label || "";
  }
}
const layerNameInput = document.getElementById("layer-name");
const layerTypeSelect = document.getElementById("layer-type");
const addLayerButton = document.getElementById("add-layer-button");

function updateButtonState() {
  const nameIsValid = layerNameInput.value.trim() !== "";
  const typeIsValid = layerTypeSelect.value !== "default";
  addLayerButton.disabled = !(nameIsValid && typeIsValid);
}

layerNameInput.addEventListener("input", updateButtonState);
layerTypeSelect.addEventListener("change", function () {
  updateButtonState();
  if (layerTypeSelect.value !== "default") {
    layerTypeSelect.querySelector("option[value='default']").disabled = true;
  }
});

addLayerButton.addEventListener("click", function (e) {
  const layerName = layerNameInput.value;
  const layerType = layerTypeSelect.value;
  const id= generateRandomString(10)
  addLayer({
    name: layerName,
    type: layerType,
    id
  })
  layers.push({
    id,
    name: layerName,
    type: layerType,
    features: []
  })
  selectedType = layerType
  setCurrentLayer(id, layerType)
});

updateButtonState()