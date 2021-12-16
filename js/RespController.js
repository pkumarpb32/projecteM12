import Responsable from "./Responsable.js"

const div_add = document.getElementById("add_responsible");
const btn_show = document.getElementById("add_resp");
const btn_add = document.getElementById("btn_add_resp")
const context_menu = document.getElementById("menu_responsable");
const btn_eliminar = document.getElementById("eliminar");
const btn_modificar = document.getElementById("modificar");
const nom_storage = "responsables";
const info_resp = document.getElementById("info_resp");
const btn_si = document.getElementById("btn_si");
const btn_no = document.getElementById("btn_no");
var codi;
var check_click_info = 0;

var resp_llista = [] = JSON.parse(window.localStorage.getItem(nom_storage) || "[]")
//setMinDate()
if(resp_llista.length != 0){
 load_responsible()
}

btn_show.addEventListener("click", ()=>{
  
    div_add.style.display = "block";
  
  })
btn_add.addEventListener("click", newsda);

btn_si.addEventListener("click", ()=>{
  // eliminem la tasca seleccionada
  eliminar_responsable(codi);
  document.getElementById("delete_resp").style.display = "none";
});
btn_no.addEventListener("click", ()=>{
  document.getElementById("delete_resp").style.display = "none";
});

document.querySelector("body").addEventListener("click", (e) =>{
  if(e.target.offsetParent != context_menu){
    context_menu.style.display = "none";
  }
  });

// carregar tots els responsables
function load_responsible(){
    resp_llista.forEach(element => {
        let li = document.createElement("div")
        li.appendChild(document.createTextNode(element.nom))
        li.classList.add("responsable")
        li.addEventListener('contextmenu', mostar_menu);
        li.addEventListener('click', info);
        li.id = element.codi;
        document.getElementById("resp_list").appendChild(li);
    });
}

// mostrar el context menu
function mostar_menu(event){
    event.preventDefault();
    const {clientX : mouseX, clientY : mouseY} = event;
    context_menu.style.top =  `${mouseY}px`;
    context_menu.style.left =  `${mouseX}px`;
    context_menu.style.display = "block";
    codi = event.target.id;
  }

  btn_eliminar.addEventListener("click",(e) =>{

     document.getElementById("delete_resp").style.display = "block";
    context_menu.style.display = "none";
  });

  function eliminar_responsable(id){
    let r =  resp_llista.find(element => element.codi == id);
    resp_llista.splice(resp_llista.indexOf(r),1);
    document.getElementById(id).remove();
    localStorage.setItem(nom_storage, JSON.stringify(resp_llista));
  };

  btn_modificar.addEventListener("click", (e) =>{
    let r =  resp_llista.find(element => element.codi == codi);
    document.getElementById("name").value = r.nom;
    document.getElementById("email").value = r.email;
    div_add.style.display = "block"
    context_menu.style.display = "none";
  });


  function newsda(){

     // comprovar que el camp nom no sigui buit
     if(document.getElementById("name").value != "" && document.getElementById("email").value != ""){
 // comprovar si existeix una tasca amb el mateix nom
   let resp = resp_llista.find(element => element.codi == codi);
     // si no trobem la tasca, creem una de nova
     if(resp == null)
     {
       resp = new Responsable();
       resp.codi = Date.now();
 
     }
     else
     {
       eliminar_responsable(resp.codi);
     }
   if(!check_resp(document.getElementById("name").value))
     { 

      if(validateEmail(document.getElementById("email").value)){
        resp.nom = document.getElementById("name").value;
        resp.email = document.getElementById("email").value;
        resp_llista.push(resp);
        localStorage.setItem(nom_storage, JSON.stringify(resp_llista));
        let div = document.createElement("div");
        div.appendChild(document.createTextNode(resp.nom));
        div.classList.add("responsable");
        div.addEventListener('contextmenu', mostar_menu);
        div.addEventListener('click', info);
        div.id = resp.codi;
        document.getElementById("resp_list").appendChild(div);
        // task_list.appendChild(div);
        div_add.style.display = "none";
        clearValues();

      }
      else{
        alert('Email not valid');
      }
 
     
   }
   else{
       alert('El nom introduït ja existex');
     }
   }
   else{
       alert('Amplia tots els camps!');
     }
   
 
 }
  
 function check_resp(resp_name){
  let t =  resp_llista.find(element => element.nom == resp_name);
  if(t != null){
    return true;
  }
  else{
    return false;
  }
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function clearValues(){
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

function info(event){

  if(check_click_info != event.target.id){
  let t =  resp_llista.find(element => element.codi == event.target.id);
  document.getElementById("nom_resp").innerHTML = t.nom;
  document.getElementById("email_resp").innerHTML = t.email;
  event.target.parentNode.insertBefore(info_resp, event.target.nextSibling);
  info_resp.style.display = "block";
  check_click_info = event.target.id;
  }
  else{
    info_resp.style.display = "none";
    check_click_info = 0;
  }
}

document.getElementById("change_tasks").addEventListener("click", ()=>{
  document.location.href = "./index.html";

});