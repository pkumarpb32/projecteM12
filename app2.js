import Tasca from './Tasca.js'

const add_box = document.getElementById("add_task")
const task_list = document.getElementById("task_list")
const btn_add = document.getElementById("add")
const btn_done = document.getElementById("btn_add")
var tasques = [];


btn_add.addEventListener("click", ()=>{
  
    add_box.style.display = "block"
})

btn_done.addEventListener("click", ()=>{
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("Hola"))
    task_list.appendChild(li)
    add_box.style.display = "none"
    let tasca = new Tasca(1,2,3,4,5,6);
    tasques.push(tasca)
    localStorage.setItem('nom', JSON.stringify(tasques))
})