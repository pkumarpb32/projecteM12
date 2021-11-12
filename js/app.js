import Tasca from './Tasca.js'
const dropdown_r = document.getElementById("select_responsible")
const add_box = document.getElementById("add_task")
const task_list = document.getElementById("todo_list")
const btn_add = document.getElementById("add")
const btn_done = document.getElementById("btn_add")
var tasks = [] = JSON.parse(window.localStorage.getItem("nom") || "[]")
setMinDate()
if(tasks.length != 0){
  load_tasks()
}
/////////////


// function drop(ev) {
//   ev.preventDefault();
//   var data = ev.dataTransfer.getData("text");
//   ev.target.appendChild(document.getElementById(data));
// }

// // function allowDrop(ev) {
// //   ev.preventDefault();
// // }

// function drag(ev) {
//   ev.dataTransfer.setData("text", ev.target.id);
// }
/////////////////////// 

var responsibles =  ["Pritish", "Adrian", "Kumar"];
load_responsible()
function setMinDate(){
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
}


// Aquest botó mostra el quardat de dailog per afegir una nova tasca
btn_add.addEventListener("click", ()=>{
  
    add_box.style.display = "block"
})

// botó per afegir una nova tasca
btn_done.addEventListener("click", ()=>{
    let tasca = new Tasca()
    tasca.Codi = Date.now();
    tasca.Nom = document.getElementById("name").value
    tasca.Descripcio = document.getElementById("description").value
    tasca.Id_responsable = dropdown_r.selectedOptions[0].value  //document.getElementById("responsible").value 
    tasca.Data_previsio = document.getElementById("date_expected").value
    tasca.Data_creacio = new Date().toJSON().slice(0,10);
    tasks.push(tasca)
    localStorage.setItem("nom", JSON.stringify(tasks))

    var div = document.createElement("div")
    div.appendChild(document.createTextNode(tasca.nom))
    div.setAttribute('draggable', true)
    div.classList.add("task")
    div.addEventListener('dragstart', drag)
    div.id = tasca.codi
    task_list.appendChild(div)
    add_box.style.display = "none"


})

function load_tasks(){

    tasks.forEach(element => {
      var div = document.createElement("div")
      div.appendChild(document.createTextNode(element.nom))
      div.setAttribute('draggable', true)
      div.classList.add("task")
      div.id = element.codi;
      div.addEventListener('dragstart', drag);
      task_list.appendChild(div)
    });


}

function load_responsible(){

  responsibles.forEach(element => {
    var el = document.createElement("option")
    el.textContent = element
    el.value = element
    dropdown_r.appendChild(el)

  });
}

// function allowDrop(ev) {
//   ev.preventDefault();
// }

// function drag(ev) {
//   console.log(ev.target.id);
//   ev.dataTransfer.setData("text", ev.target.id);
// }
  
// function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("text");
//     console.log(data)
//     ev.currentTarget.appendChild(document.getElementById(data));
// }