let add_box = document.getElementById("add_task")
let btn_add = document.getElementById("add")
let btn_done = document.getElementById("btn_add")

const tasks = ['hey', 'summer', 'ukulele'];


btn_add.addEventListener("click", ()=>{
  
    add_box.style.display = "block"
})

btn_done.addEventListener("click", ()=>{

})



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