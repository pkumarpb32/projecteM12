
// let boto = document.getElementById("add");
// //let add_task = document.getElementById("addtask")




// // let nomAnterior = JSON.parse( window.localStorage.getItem('nom'))

// // if(nomAnterior != undefined){
// //     titol.innerHTML= "Hola " + nomAnterior.nom + " " + nomAnterior.cognom
// // }



// boto.addEventListener("click", ()=>{

//     document.getElementById("addtask").style.display = "block";

   

//     // titol.innerHTML= "Hola " + nom.value + " " + cognom.value
//     // let dada = {nom: nom.value, cognom: cognom.value}
//     // window.localStorage.setItem('nom', JSON.stringify(dada))


// })


function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}


function createTask(){
    var x = document.getElementById("doing");
    var y = document.getElementById("done");
    var z = document.getElementById("create-new-task-block");
    if (x.style.display === "none") {
        x.style.display = "block";
        y.style.display = "block";
        z.style.display = "none";
    } else {
        x.style.display = "none";
        y.style.display = "none";
        z.style.display = "flex";
    }
}

function saveTask(){
    

    var todo = document.getElementById("todo");
    var taskName = document.getElementById("task-name").value;
    todo.innerHTML += `
    <div class="task" id="${taskName.toLowerCase().split(" ").join("")}" draggable="true" ondragstart="drag(event)">
        <span>${taskName}</span>
    </div>
    `
}


function editTask(){
    var saveButton = document.getElementById("save-button");
    var editButton = document.getElementById("edit-button");
    if (saveButton.style.display === "none") {
        saveButton.style.display = "block";
        editButton.style.display = "none";
    } else{
        saveButton.style.display = "none";
        editButton.style.display = "block";
    }
}
