export default class Responsable{
    constructor(){
    this.id = ""
    this.nom = ""
    this.email = ""
    }

// get-set codi
      set_id(val)
      {
        this.id = val;
      }
      get_id()
      {
         return this.id;
      }
// get-set nom
      set_Nom(val){
        this.nom = val;
      }
      get_Nom(){
         return this.nom;
      }

// get-set descripcio
      set_email(val){
        this.email = val;
      }
      get_email(){
         return this.email;
      }


}