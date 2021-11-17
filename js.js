// import Tasca from './tasca.js'
import Responsable from './responsable.js'

// const dropdown_r = document.getElementById("select_responsible")
const add_box = document.getElementById("add_responsable")

const remove_box = document.getElementById("remove_responsable")

const task_list = document.getElementById("resp_list")
// const btn_add = document.getElementById("add")
const btn_done = document.getElementById("btn_add")
const btn_done2 = document.getElementById("btn_add2")

const btn_done3 = document.getElementById("btn_add3")
const btn_remove = document.getElementById("btn_rem")

// var tasks = [] = JSON.parse(window.localStorage.getItem("nom") || "[]")
var responsibles =  [] = JSON.parse(window.localStorage.getItem("resp") || "[]")

load_tasks()
load_responsible()

remove_box.style.display = "none"


btn_done2.addEventListener("click", ()=>{
  
  
  add_box.style.display = "block"

})


btn_done3.addEventListener("click", ()=>{
  
  
  remove_box.style.display = "block"

})



btn_done.addEventListener("click", ()=>{
  
  let resp = new Responsable()
  
  resp.id = document.getElementById("id").value
  resp.nom = document.getElementById("name").value
  resp.email = document.getElementById("email").value
  responsibles.push(resp)
  localStorage.setItem("resp", JSON.stringify(responsibles))

  let li = document.createElement("li");
  li.appendChild(document.createTextNode(resp.nom))
  task_list.appendChild(li)
  add_box.style.display = "none"

})


btn_remove.addEventListener("click", ()=>{
  
let resp = responsibles.find(element => element.nom == document.getElementById('name2').value);
responsibles.splice(responsibles.indexOf(resp),1);
localStorage.setItem("resp", JSON.stringify(responsibles));

task_list.removeChild(resp);


})



// // botó per afegir una nova tasca
// btn_done.addEventListener("click", ()=>{
//     let resp = new Responsable()
    
//     resp.id = document.getElementById("id").value
//     resp.nom = document.getElementById("name").value
//     resp.email = document.getElementById("email").value
//     responsibles.push(resp)
//     localStorage.setItem("resp", JSON.stringify(responsibles))

//     let li = document.createElement("li");
//     li.appendChild(document.createTextNode(resp.nom))
//     task_list.appendChild(li)
//     add_box.style.display = "none"


// })


function load_tasks(){
    responsibles.forEach(element => {
        let li = document.createElement("li")
        li.appendChild(document.createTextNode(element.nom))
        task_list.appendChild(li)
    });
}


function load_responsible(){

  responsibles.forEach(element => {
    var el = document.createElement("option")
    el.textContent = element
    el.value = element
    // dropdown_r.appendChild(el)

  });
}