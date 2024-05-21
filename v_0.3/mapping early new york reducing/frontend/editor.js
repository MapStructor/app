/// <reference types="mapbox-gl" />
/// <reference types="mapbox__mapbox-gl-draw" />

const projectId = localStorage.getItem("PROJECT_ID");

if (projectId) {
    getProjectById(projectId)
}

let type = ""

function toggleAddLayerLinkSection(e) {
    e.preventDefault()
    const section = document.getElementById("add-layer-link-section")
    if (section.style.display === "none") {
        section.style.display = "block"
    } else {
        section.style.display = "none"
    }
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

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwbnkiLCJhIjoiY2xtMG93amk4MnBrZTNnczUzY2VvYjg0ciJ9.MDMHYBlVbG14TJD120t6NQ';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    projection: 'globe',
    zoom: 1,
    center: [30, 15]
});

map.addControl(new mapboxgl.NavigationControl());

const drawControls = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
        point: true,
        line_string: true,
        polygon: true,
        trash: true,
    }
});

// draw controls
document.getElementById('draw-controls').appendChild(drawControls.onAdd(map));

map.on('style.load', () => {
    map.setFog({

    });
});

let userInteracting = false;
const spinEnabled = true;

function spinGlobe() {
    if (spinEnabled && !userInteracting && map.getZoom() < 5) {
        map.easeTo({
            center: [map.getCenter().lng - (360 / 240), map.getCenter().lat],
            duration: 1000,
            easing: (n) => n
        });
    }
}

map.on('mousedown', () => {
    userInteracting = true;
});

map.on('dragstart', () => {
    userInteracting = true;
});

map.on('moveend', () => {
    spinGlobe();
});

const typeSelection = document.getElementById("type");

map.on("click", e => {
    saveProjectToFirebase();
    const features = drawControls.getAll().features;

    if (features.length === 1) {
        // Determine the type of the layers
        const points = features.filter(feature => feature.geometry.type === "Point");
        const polygons = features.filter(feature => feature.geometry.type === "Polygon");
        const lines = features.filter(feature => feature.geometry.type === "LineString");

        console.log("Points === ", points);
        console.log("Polygons === ", polygons);
        console.log("Lines === ", lines);

        type = features[0].geometry.type;
        typeSelection.value = type;
        typeSelection.disabled = true;

        if (points.length) {
            addFeaturesToLayer("point-layer", points);
        }
        if (polygons.length) {
            addFeaturesToLayer("polygon-layer", polygons);
        }
        if (lines.length) {
            addFeaturesToLayer("line-layer", lines);
        }
    }
});

spinGlobe();

function saveProjectToFirebase() {
    const data = drawControls.getAll();
    console.log(data);
    const projectPatch = {
        features: JSON.stringify(data.features)
    }
    window.updateDoc(doc(window.db, "projects", projectId), projectPatch)
}

const title = document.getElementById("title");

function titleOnChange(e) {
    window.updateDoc(doc(window.db, "projects", projectId), {
        name: e.target.value
    })
}

window.getDoc(doc(window.db, "projects", projectId)).then(snapshot => {
    title.value = snapshot.data().name
})

document.getElementById("project-id").value = projectId

function getProjectById(id) {
    window.getDoc(doc(window.db, "projects", id)).then(snapshot => {
        const data = snapshot.data();
        title.value = data.name;
        const features = JSON.parse(data.features);
        console.log(features);
        const points = features.filter(feature => feature.geometry.type === "Point");
        const polygons = features.filter(feature => feature.geometry.type === "Polygon");
        const lines = features.filter(feature => feature.geometry.type === "LineString");

        console.log("Points === ", points);
        console.log("Polygons === ", polygons);
        console.log("Lines === ", lines);

        // drawControls.set({ features, type: "FeatureCollection" });

        if (points.length) {
            addFeaturesToLayer("point-layer", points);
        }
        if (polygons.length) {
            addFeaturesToLayer("polygon-layer", polygons);
        }
        if (lines.length) {
            addFeaturesToLayer("line-layer", lines);
        }
    })
}

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

function addLayer({ type, name }) {
    const layersContainer = document.getElementById("layers-container");
    const layerId = name.split(" ").join("-");

    layersContainer.innerHTML += `
    <div class="flex mb-2">
            <input type="checkbox" id="${layerId}-checkbox" checked/>
            <div class="flex ml-2 border items-center rounded-lg">
              <input
                type="text"
                value="${name}"
                class="pl-2 py-1 rounded-tl-lg rounded-bl-lg"
              />
              <div
                class="grid items-center p-2 rounded-tr-lg rounded-br-lg"
                style="background-color: #12abac"
              >
              ${type === "Polygon" ? '<i class="fa-solid fa-vector-square"></i>' : (type === "Point" ? '<i class="fa-solid fa-location-pin"></i>' : '<i class="fa-solid fa-bezier-curve"></i>')}
              </div>
            </div>
    </div>
    `;
    console.log(document.getElementById(`${layerId}-checkbox`))

    setTimeout(()=>{
        document.getElementById(`${layerId}-checkbox`).addEventListener('change', (e) => {
            console.log("Change event listener called inside the checkbox handler")
            const visibility = e.target.checked ? 'visible' : 'none';
            map.setLayoutProperty(layerId, 'visibility', visibility);
        });
    }, 1_000)
}

function addFeaturesToLayer(layerId, features) {
    if (!map.getSource(layerId)) {
        map.addSource(layerId, {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: features
            }
        });

        let layerType = "circle";
        if (layerId.includes("polygon")) {
            layerType = "fill";
        } else if (layerId.includes("line")) {
            layerType = "line";
        }

        map.addLayer({
            id: layerId,
            type: layerType,
            source: layerId,
            layout: {
                'visibility': 'visible'
            },
            paint: {
                "circle-color": "#ff0000",
                "fill-color": "#00ff00",
                "line-color": "#0000ff"
            }
        });

        addLayer({
            type: layerType === "circle" ? "Point" : (layerType === "fill" ? "Polygon" : "Line"),
            name: layerId.replace("-", " ")
        });
    } else {
        const source = map.getSource(layerId);
        const currentData = source._data;
        currentData.features = currentData.features.concat(features);
        source.setData(currentData);
    }
}