import Tasca from './Tasca.js'
const dropdown_r = document.getElementById("select_responsible")
const add_box = document.getElementById("add_task")
const task_list = document.getElementById("todo")
const btn_add = document.getElementById("add")
const btn_done = document.getElementById("btn_add")
var columns = document.getElementsByClassName("column")
var tasks = [] = JSON.parse(window.localStorage.getItem("nom") || "[]")
setMinDate()
if(tasks.length != 0){
  load_tasks()
}
///////////// Funcions drag and drop ////////////////////////////

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
  

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.currentTarget.appendChild(document.getElementById(data));
    let t =  tasks.find(element => element.codi == data);
    tasks.splice(tasks.indexOf(t),1);
    t.estat = ev.currentTarget.id;
    tasks.push(t);
    localStorage.setItem("nom", JSON.stringify(tasks))
    console.log(ev.currentTarget.id);
    //console.log(t.Estat);
}
////////////////////////////////////////////////////////////////////

var responsibles =  ["Pritish", "Adrian", "Kumar"];
load_responsible()
function setMinDate(){
// set minimun
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
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
    tasca.codi = Date.now();
    tasca.nom = document.getElementById("name").value
    tasca.descripcio = document.getElementById("description").value
    tasca.id_responsable = dropdown_r.selectedOptions[0].value  //document.getElementById("responsible").value 
    tasca.data_previsio = document.getElementById("date_expected").value
    tasca.data_creacio = new Date().toJSON().slice(0,10);
    tasca.prioritat = document.getElementById("priority").value;
    tasca.estat = "todo";


    check_task(tasca.nom);
    tasks.push(tasca)
    localStorage.setItem("nom", JSON.stringify(tasks))

    var div = document.createElement("div")
    div.appendChild(document.createTextNode(tasca.nom))
    div.setAttribute('draggable', true)
    div.classList.add("task")
    div.classList.add(document.getElementById("priority").value);
    div.addEventListener('dragstart', drag)
    div.id = tasca.codi
    task_list.appendChild(div)
    add_box.style.display = "none"


})

function check_task(task_name){
  let t =  tasks.find(element => element.nom == task_name);

}

function load_tasks(){

  // afegir els events per fer drag and drop

    // columns[0].addEventListener('drop', drop);
    // columns[0].addEventListener('dragover', allowDrop);
    // columns[1].addEventListener('drop', drop);
    // columns[1].addEventListener('dragover', allowDrop);
    // columns[2].addEventListener('drop', drop);
    // columns[2].addEventListener('dragover', allowDrop);

    // carregar totes les tasques

    tasks.forEach(element => {
      var div = document.createElement("div");
      div.appendChild(document.createTextNode(element.nom));
      div.setAttribute('draggable', true);
      div.classList.add("task");
      div.classList.add(element.prioritat);
      div.id = element.codi;
      div.addEventListener('dragstart', drag);
      task_list.appendChild(div);
      if(element.estat == "todo"){
        task_list.appendChild(div);
      }
      else if(element.estat == "doing"){
        document.getElementById("doing").appendChild(div);
      }
      else if(element.estat == "done"){
        document.getElementById("done").appendChild(div);
      }
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
window.ondrop = ondrop;
window.allowDrop = allowDrop;
window.drop = drop;
// onDrop="drop(event)" ondragover="allowDrop(event)"