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
