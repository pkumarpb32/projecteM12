let nom = document.getElementById("nom")
let cognom = document.getElementById("cognom")
let boto = document.getElementById("guardar")
let titol = document.getElementById("titol")

let nomAnterior = JSON.parse( window.localStorage.getItem('nom'))

if(nomAnterior != undefined){
    titol.innerHTML= "Hola " + nomAnterior.nom + " " + nomAnterior.cognom
}

boto.addEventListener("click", ()=>{
    titol.innerHTML= "Hola " + nom.value + " " + cognom.value
    let dada = {nom: nom.value, cognom: cognom.value}
    window.localStorage.setItem('nom', JSON.stringify(dada))


})