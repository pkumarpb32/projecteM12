export default class Responsable{
    constructor(){
    this.codi = ""
    this.nom = ""
    this.email = ""
    }

// get-set codi
    set id(val){
        this.codi = val;
      }
      get id(){
         return this.codi;
      }
// get-set nom
      set Nom(val){
        this.nom = val;
      }
      get Nom(){
         return this.nom;
      }

// get-set descripcio
      set email(val){
        this.descripcio = val;
      }
      get email(){
         return this.descripcio;
      }


}