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
    return prev.concat(curr.features)
  }, [])
  const projectPatch = {
    features: JSON.stringify(data.features),
  };
  window.updateDoc(doc(window.db, "projects", projectId), projectPatch);
}

function getProjectById(id) {
  window.getDoc(doc(window.db, "projects", id)).then((snapshot) => {
    const data = snapshot.data();
    title.value = data.name;
    features = JSON.parse(data.features);
    const points = features.filter((feature) => feature.geometry.type === "Point");
    const polygons = features.filter((feature) => feature.geometry.type === "Polygon");
    const lines = features.filter((feature) => feature.geometry.type === "LineString");

    let polygonId = generateRandomString(10);
    let pointId = generateRandomString(10);
    let linesId = generateRandomString(10);
    if (polygons.length){
       currentLayerId = polygonId;
       selectedType = "Polygon"
      }
    if (lines.length) {
      currentLayerId = linesId;
      selectedType = "LineString"
    }
    if (points.length) {
      currentLayerId = pointId;
      selectedType = "Point"
    }

    if (polygons.length) {
        const newLayer = {
            id: polygonId,
            name: "Untitled Polygon Layer",
            type: "Polygon",
            features: polygons
          }
      addLayer(newLayer);
      layers.push(newLayer)
    }
    if (lines.length) {
        const newLayer = {
            id: linesId,
            name: "Untitled Line Layer",
            type: "LineString",
            features: lines
          }
      addLayer(newLayer);
      layers.push(newLayer)
    }

    if (points.length) {
        const newLayer = {
            id: pointId,
            name: "Untitled Points Layer",
            type: "Point",
            features: points
          }
      addLayer(newLayer);
      layers.push(newLayer)
    }

    drawControls.set({ features, type: "FeatureCollection" });
  });
}
