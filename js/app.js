import Tasca from './Tasca.js'

const add_box = document.getElementById("add_task")
const task_list = document.getElementById("task_list")
const btn_add = document.getElementById("add")
const btn_done = document.getElementById("btn_add")
var tasks = [] = JSON.parse(window.localStorage.getItem("nom") || "[]")
load_tasks()

// set minimun
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
var yyyy = today.getFullYear();
if(dd<10){
  dd='0'+dd
} 
if(mm<10){
  mm='0'+mm
} 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("date_expected").setAttribute("min", today);




// Aquest botó mostra el quardat de dailog per afegir una nova tasca
btn_add.addEventListener("click", ()=>{
  
    add_box.style.display = "block"
})

// botó per afegir una nova tasca
btn_done.addEventListener("click", ()=>{
    let tasca = new Tasca()
    tasca.Codi = 1
    tasca.Nom = document.getElementById("name").value
    tasca.Descripcio = document.getElementById("description").value
    tasca.Id_responsable = document.getElementById("responsible").value 
    tasca.Data_previsio = document.getElementById("date_expected").value
    tasca.Data_creacio = new Date().toJSON().slice(0,10);
    tasks.push(tasca)
    localStorage.setItem("nom", JSON.stringify(tasks))

    let li = document.createElement("li");
    li.appendChild(document.createTextNode(tasca.nom))
    task_list.appendChild(li)
    add_box.style.display = "none"


})

function load_tasks(){
    tasks.forEach(element => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(element.nom))
        task_list.appendChild(li)
    });
}


// let nom = document.getElementById("nom")
// let cognom = document.getElementById("cognom")
// let boto = document.getElementById("guardar")
// let titol = document.getElementById("titol")

// let nomAnterior = JSON.parse( window.localStorage.getItem('nom'))
// if(nomAnterior != undefined){
//     titol.innerHTML= "Hola " + nomAnterior.nom + " " + nomAnterior.cognom
// }

// boto.addEventListener("click", ()=>{
//     titol.innerHTML= "Hola " + nom.value + " " + cognom.value
//     let dada = {nom: nom.value, cognom: cognom.value}
//     window.localStorage.setItem('nom', JSON.stringify(dada))


// })