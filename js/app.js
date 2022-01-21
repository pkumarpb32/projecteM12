import Tasca from './Tasca.js'
import {Db} from './db.js'

let dataBase = new Db();
const dropdown_r = document.getElementById("select_responsible");
const add_box = document.getElementById("add_task");
const btn_add = document.getElementById("add");
const btn_done = document.getElementById("btn_add");
const close_btn = document.getElementsByClassName("close");
const div_info = document.getElementById("info");
const btn_si = document.getElementById("btn_eliminar");
const btn_no = document.getElementById("btn_cancelar");
// Variable per guardar el codi de la tasca quan cliquem el boto dret
var codi;
var check_click = 0;
div_info.style.display = "none";
var tasks = [];
var resp_llista = [];
setMinDate();
// carregar les tasques
dataBase.getTasks().then((tasques)=>{
  tasks = tasques;
  if(tasks.length != 0){
   load_tasks();
  }
});

dataBase.getResp().then((responsables)=>{
  resp_llista = responsables;
  if(resp_llista.length != 0){
    load_responsible();
   }

});
///////////// Funcions drag and drop ////////////////////////////
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  div_info.style.display = "none";
  check_click = 0;
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    let t =  tasks.find(element => element.codi == data);
    if(t.estat != ev.currentTarget.id){
      // actualizar la tasca 
      dataBase.updateTask(t.codi, ev.currentTarget.id);
      ev.currentTarget.appendChild(document.getElementById(data));
      tasks.splice(tasks.indexOf(t),1);
      t.estat = ev.currentTarget.id ;
      tasks.push(t);
    }
    
}
////////////////////////////////////////////////////////////////////
// caregar els responsables
if(resp_llista.length != 0){
  load_responsible();
}
function setMinDate()
{
  // establir la data minima 
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  if(dd<10)
  {
    dd='0'+dd
  } 
  if(mm<10)
  {
    mm='0'+mm
  } 
  today = yyyy+'-'+mm+'-'+dd;
  document.getElementById("date_expected").setAttribute("min", today);
}
// Aquest botó mostra el quardat de dailog per afegir una nova tasca
btn_add.addEventListener("click", ()=>{
  add_box.style.display = "block";
  codi = 0;
});
// botó per afegir una nova tasca
btn_done.addEventListener("click", ()=>{
  console.log("clicked");
  
  guardarTasca();
});
document.getElementById("change_responsable").addEventListener("click", ()=>{
  document.location.href = "./responsables.html";
});
// funcio per tancar el quardat de dailog per afegir una nova tasca
close_btn[0].addEventListener("click", ()=>{
  clearValues();
  add_box.style.display = "none"
});
btn_si.addEventListener("click", ()=>{
  // eliminem la tasca seleccionada
  eliminar_tasca(codi);
  document.getElementById("delete_box").style.display = "none";
});
btn_no.addEventListener("click", ()=>{
  document.getElementById("delete_box").style.display = "none";
});
// funció per eliminar tasca del array tasca i de la llista div
function eliminar_tasca(id){
  let t =  tasks.find(element => element.codi == id);
  tasks.splice(tasks.indexOf(t),1);
  document.getElementById(id).remove();
  dataBase.deleteTask(id);
  // localStorage.setItem(nom_tasques_storage, JSON.stringify(tasks));
};
function guardarTasca(){
  // comprovar que el camp nom no sigui buit
  if(document.getElementById("name").value != "" && document.getElementById("description").value != "" 
  && dropdown_r.selectedOptions[0].value != "" && document.getElementById("date_expected").value != ""
  && document.getElementById("priority").value != "" && dropdown_r.selectedOptions[0].value != "Selecciona el responsable" )
  {
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

    if(!check_task(document.getElementById("name").value) || tasca.nom == document.getElementById("name").value)
    { 
      if(tasca.codi == codi)
      {
        console.log("entrat");
        eliminar_tasca(tasca.codi);
      }
      tasca.nom = document.getElementById("name").value;
      tasca.descripcio = document.getElementById("description").value;
      tasca.id_responsable = dropdown_r.selectedOptions[0].id; 
      tasca.data_previsio = document.getElementById("date_expected").value;  
      tasca.prioritat = document.getElementById("priority").value;
      tasks.push(tasca);
      ///////////// firebase/////////////////
      dataBase.addTask(tasca);
      ///////////////////////////////////////////
      var div = document.createElement("div");
      div.appendChild(document.createTextNode(tasca.nom));
      div.setAttribute('draggable', true);
      div.classList.add("task");
      div.classList.add(document.getElementById("priority").value);
      div.addEventListener('dragstart', drag);
      div.id = tasca.codi;
      div.addEventListener('click', info);
      document.getElementById(tasca.estat).appendChild(div);
      afegirButtons(tasca.codi);
      // task_list.appendChild(div);
      add_box.style.display = "none";

      if(div_info.style.display = "block"){
        div_info.style.display = "none";
      }
      clearValues();    
    }
    else
    {
      alert('El nom introduït ja existex');
    }
    }
  else
  {
    alert('Amplia tots els camps!');
  }
}
function check_task(task_name){
  let t =  tasks.find(element => element.nom == task_name);
  if(t != null)
  {
    return true;
  }
  else{
    return false;
  }
}
 // carregar totes les tasques
function load_tasks()
{
  tasks.forEach(element => {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(element.nom));
  div.setAttribute('draggable', true);
  div.classList.add("task");
  div.classList.add(element.prioritat);
  div.id = element.codi;
  // div.innerHTML += '<div id="menu_tasques"><button id="modificar"><span class="material-icons">edit</span></button><button id="eliminar"><span class="material-icons">delete</span></button></div>';
  div.addEventListener('dragstart', drag);
  div.addEventListener('click', info);
  document.getElementById(element.estat).appendChild(div);
  afegirButtons(element.codi);
  // document.getElementById(element.estat).appendChild(div);
  });
}
// Afegir buttons per eliminar i modificar tasques
function afegirButtons(code){
  var btn_modificar = document.createElement('button');
  btn_modificar.type = 'button';
  btn_modificar.id = "modificar";
  btn_modificar.innerHTML = '<span class="material-icons">edit</span>';
  btn_modificar.onclick = function() {
    let t =  tasks.find(e => e.codi == code);
    let r = resp_llista.find(element => element.codi = t.id_responsable);
    document.getElementById("name").value = t.nom;
    document.getElementById("description").value = t.descripcio;
    document.getElementById("select_responsible").value = r.nom;
    document.getElementById("date_expected").value = t.data_previsio;
    document.getElementById("priority").value = t.prioritat;
    add_box.style.display = "block";
    codi = code;
  };

    var btn_delete = document.createElement('button');
    btn_delete.type = 'button';
    btn_delete.id = "eliminar";
    btn_delete.innerHTML = '<span class="material-icons">delete</span>';
    btn_delete.onclick = function(e) {
      document.getElementById("delete_box").style.display = "block";
      codi = code;
    };

  var div_tasques = document.createElement("div");
  div_tasques.appendChild(btn_delete);
  div_tasques.appendChild(btn_modificar);
  document.getElementById(code).appendChild(div_tasques);
}

// Funció per mostar tota la informació d'una tasca
function info(event)
{
  if(check_click != event.target.id){
    let t =  tasks.find(e => e.codi == event.target.id);
    let r = resp_llista.find(el => el.codi == t.id_responsable);
    console.log(t.codi);
    // document.getElementById("codi_tasca").innerHTML = codi;
    document.getElementById("nom_tasca").innerHTML = t.nom;
    document.getElementById("data_creacio").innerHTML = t.data_creacio;
    document.getElementById("data_previsio").innerHTML = t.data_previsio;
    document.getElementById("descripcio").innerHTML = t.descripcio;
    document.getElementById("estat").innerHTML = t.estat
    document.getElementById("id_responsable").innerHTML = r.nom;
    document.getElementById("correu_responsable").innerHTML = r.email;
    document.getElementById("prioritat").innerHTML = t.prioritat;

    event.target.parentNode.insertBefore(div_info, event.target.nextSibling);
    div_info.style.display = "block";
    check_click = event.target.id;
  }
  else{
    div_info.style.display = "none";
    check_click = 0;
  }
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
// natejar els valors
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