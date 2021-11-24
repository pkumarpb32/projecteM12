import Tasca from './Tasca.js'
const dropdown_r = document.getElementById("select_responsible");
const add_box = document.getElementById("add_task");
const task_list = document.getElementById("todo");
const btn_add = document.getElementById("add");
const btn_done = document.getElementById("btn_add");
const context_menu = document.getElementById("menu_tasques");
const btn_eliminar = document.getElementById("eliminar");
const btn_modificar = document.getElementById("modificar");
const close_btn = document.getElementsByClassName("close");
const div_info = document.getElementById("info");
const nom_tasques_storage = "tasques";
// Variable per guardar el codi de la tasca quan cliquem el boto dret

var codi;

var tasks = [] = JSON.parse(window.localStorage.getItem(nom_tasques_storage) || "[]")
var resp_llista = [] = JSON.parse(window.localStorage.getItem("responsables") || "[]")
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
  div_info.style.display = "none";
}
  

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    let t =  tasks.find(element => element.codi == data);
    if(t.estat != ev.currentTarget.id){
      ev.currentTarget.appendChild(document.getElementById(data));
      tasks.splice(tasks.indexOf(t),1);
      t.estat = ev.currentTarget.id;
      tasks.push(t);
      localStorage.setItem(nom_tasques_storage, JSON.stringify(tasks));
    }
    
}
////////////////////////////////////////////////////////////////////

load_responsible()
function setMinDate(){
// establir la data minima 
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

// funcio per tancar el quardat de dailog per afegir una nova tasca
close_btn[0].addEventListener("click", ()=>{
  clearValues();
  add_box.style.display = "none"
})

// funcio per mostar el context menu
function mostar_menu(event){
  event.preventDefault();
  const {clientX : mouseX, clientY : mouseY} = event;
  context_menu.style.top =  `${mouseY}px`;
  context_menu.style.left =  `${mouseX}px`;
  context_menu.style.display = "block";
  codi = event.target.id;
}

// boto per eliminar la tasca seleccionada
btn_eliminar.addEventListener("click",(e) =>{

  // eliminem la tasca seleccionada
  eliminar_tasca(codi);
  context_menu.style.display = "none";
});

// boto per modificar la tasca
btn_modificar.addEventListener("click", (e) =>{
  let t =  tasks.find(element => element.codi == codi);
  let r = resp_llista.find(element => element.codi = t.id_responsable);
  document.getElementById("name").value = t.nom;
  document.getElementById("description").value = t.descripcio;
  document.getElementById("select_responsible").value = r.nom;
  document.getElementById("date_expected").value = t.data_previsio;
  document.getElementById("priority").value = t.prioritat;
  add_box.style.display = "block"
  context_menu.style.display = "none";
});


// funció per eliminar tasca del array tasca i de la llista div
function eliminar_tasca(id){
  let t =  tasks.find(element => element.codi == id);
  tasks.splice(tasks.indexOf(t),1);
  document.getElementById(id).remove();
  localStorage.setItem(nom_tasques_storage, JSON.stringify(tasks));
};

document.querySelector("body").addEventListener("click", (e) =>{
if(e.target.offsetParent != context_menu){
  context_menu.style.display = "none";
}
});


// botó per afegir una nova tasca
btn_done.addEventListener("click", ()=>{
  guardarTasca();
})

function guardarTasca(){
  // comprovar que el camp nom no sigui buit
    if(document.getElementById("name").value != "" && document.getElementById("description").value != "" 
    && dropdown_r.selectedOptions[0].value != "" && document.getElementById("date_expected").value != ""
    && document.getElementById("priority").value != "" && dropdown_r.selectedOptions[0].value != "Selecciona el responsable" ){
// comprovar si existeix una tasca amb el mateix nom
  let tasca = tasks.find(element => element.codi == codi);
    // si no trobem la tasca, creem una de nova
    if(tasca == null)
    {
      tasca = new Tasca();
      tasca.codi = Date.now();
      tasca.estat = "todo";
      tasca.data_creacio = new Date().toJSON().slice(0,10);

    }
    // si ja existiex la tasca, la eliminarem
    else
    {
      eliminar_tasca(tasca.codi);
    }
    if(!check_task(document.getElementById("name").value))
    { 
      tasca.nom = document.getElementById("name").value;
      tasca.descripcio = document.getElementById("description").value;
      tasca.id_responsable = dropdown_r.selectedOptions[0].id;  //document.getElementById("responsible").value 
      tasca.data_previsio = document.getElementById("date_expected").value;  
      tasca.prioritat = document.getElementById("priority").value;
      tasks.push(tasca);
      localStorage.setItem(nom_tasques_storage, JSON.stringify(tasks));
      var div = document.createElement("div");
      div.appendChild(document.createTextNode(tasca.nom));
      div.setAttribute('draggable', true);
      div.classList.add("task");
      div.classList.add(document.getElementById("priority").value);
      div.addEventListener('dragstart', drag);
      div.addEventListener('contextmenu', mostar_menu);
      div.id = tasca.codi;
      div.addEventListener('click', info);
      document.getElementById(tasca.estat).appendChild(div);
      // task_list.appendChild(div);
      add_box.style.display = "none";
      clearValues();

    
  }
  else{
      alert('El nom introduït ja existex');
    }
  }
  else{
      alert('Amplia tots els camps!');
    }
  

}

function check_task(task_name){
  let t =  tasks.find(element => element.nom == task_name);
  if(t != null){
    return true;
  }
  else{
    return false;
  }
}

 // carregar totes les tasques
function load_tasks(){
   
    tasks.forEach(element => {
      var div = document.createElement("div");
      div.appendChild(document.createTextNode(element.nom));
      div.setAttribute('draggable', true);
      div.classList.add("task");
      div.classList.add(element.prioritat);
      div.id = element.codi;
      div.addEventListener('dragstart', drag);
      div.addEventListener('contextmenu', mostar_menu);
      div.addEventListener('click', info);
      document.getElementById(element.estat).appendChild(div);
    });

}

// Funció per mostar tota la informació d'una tasca
function info(event){

  let t =  tasks.find(element => element.codi == event.target.id);
  
  // document.getElementById("codi_tasca").innerHTML = codi;
  document.getElementById("nom_tasca").innerHTML = t.nom;
  document.getElementById("data_creacio").innerHTML = t.data_creacio;
  document.getElementById("data_previsio").innerHTML = t.data_previsio;
  document.getElementById("descripcio").innerHTML = t.descripcio;
  document.getElementById("estat").innerHTML = t.estat
  document.getElementById("id_responsable").innerHTML = t.id_responsable;
  document.getElementById("prioritat").innerHTML = t.prioritat;
  div_info.style.display = "block";
  event.target.parentNode.insertBefore(div_info, event.target.nextSibling);
}

 // carregar tots els responsables
function load_responsible(){

  resp_llista.forEach(element => {
    var el = document.createElement("option");
    el.textContent = element.nom;
    el.value = element.nom;
    el.id = element.codi;
    dropdown_r.appendChild(el);

  });
}

function clearValues(){
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("select_responsible").selectedIndex = "0";
  document.getElementById("date_expected").value = "";
  document.getElementById("priority").selectedIndex = "0";
}

window.ondrop = ondrop;
window.allowDrop = allowDrop;
window.drop = drop;
// onDrop="drop(event)" ondragover="allowDrop(event)"