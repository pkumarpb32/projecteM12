
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