const projectId = localStorage.getItem("PROJECT_ID");
let features = [];
/**
 * @type {{
 *   id: string,
 *   name: string,
 *   type: string,
 *   features: any[]
 * }[]}
 */
const layers = [];
let currentLayerId = "";
let selectedType = "unset";

let layerIds = [];

if (projectId) {
  getProjectById(projectId);
}

function saveProjectToFirebase() {
  const data = drawControls.getAll();
  console.log(data);
  data.features = layers.reduce((prev, curr) => {
    return prev.concat(curr.features);
  }, []);
  const projectPatch = {
    features: JSON.stringify(data.features),
    layers: layers.map((layer) => {
      return {
        ...layer,
        features: JSON.stringify(layer.features),
      };
    }),
  };
  window.updateDoc(doc(window.db, "projects", projectId), projectPatch);
}

function getProjectById(id) {
  window.getDoc(doc(window.db, "projects", id)).then((snapshot) => {
    const data = snapshot.data();
    title.value = data.name;
    console.log(JSON.parse(data.features));
    features = JSON.parse(data.features); 
    const projectLayers = data.layers;
    if (projectLayers.length) {
      currentLayerId = projectLayers[projectLayers.length - 1].id;
      selectedType = projectLayers[projectLayers.length - 1].type;
      projectLayers.forEach((layer) => {
        addLayer(layer);
        layers.push({ ...layer, features: JSON.parse(layer.features) });
        populateDataTable()
      });

      drawControls.set({ features, type: "FeatureCollection" });
      features.forEach(createOrUpdateLabel);
    }
  });
}
