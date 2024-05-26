function func(){
    // TODO: Define the Project type
    window.addDoc(window.projects, {
        name: "Untitled New project",
        date: new Date().toISOString(),
        layers: [],
        features: "[]"
    }).then((docRef)=>{
        localStorage.setItem("PROJECT_ID", docRef.id)
        window.location.href = "editor.html"
    }).catch(console.log)
    
}