/// <reference types="mapbox-gl" />
/// <reference types="mapbox__mapbox-gl-draw" />


const projectId = localStorage.getItem("PROJECT_ID");

function toggleAddLayerLinkSection(e){
    e.preventDefault()
    const section = document.getElementById("add-layer-link-section")
    if(section.style.display === "none"){
        section.style.display = "block"
    } else {
        section.style.display = "none"
    }
}

function hideModalOuterDiv(e){
    const modal = document.getElementById("modal");
    if (e.target.id === "modal") {
        modal.style.display = "none";
    }
}

function hideModalInnerDiv(e){
    e.stopPropagation(); // Prevent event bubbling to the outer div
}

function showLayerModal(e){
    e.preventDefault();
    const modal = document.getElementById("modal");
    modal.style.display = "grid";
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
    },
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

map.on("click", e => {
    saveProjectToFirebase()
})

spinGlobe();

function saveProjectToFirebase(){
    const data = drawControls.getAll()
    console.log(data)
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

window.getDoc(doc(window.db, "projects", projectId)).then(snapshot =>{
    title.value = snapshot.data().name
})