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
