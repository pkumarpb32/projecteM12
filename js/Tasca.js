export default class Tasca{
    constructor(){
    this.codi = ""
    this.nom = ""
    this.data_creacio = ""
    this.data_previsio = ""
    this.id_responsable = ""
    this.descripcio = " "
    }

// get-set codi
    set Codi(val){
        this.codi = val;
      }
      get Codi(){
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
      set Descripcio(val){
        this.descripcio = val;
      }
      get Descripcio(){
         return this.descripcio;
      }
// get-set data creació
      set Data_creacio(val){
        this.data_creacio = val;
      }
      get Data_creacio(){
         return this.data_creacio;
      }

// get-set data de previsió de finalització
      set Data_previsio(val){
        this.data_previsio = val;
      }
      get Data_previsio(){
         return this.data_previsio;
      }

// get-set nom responsable

set Id_responsable(val){
    this.id_responsableValue = val;
  }
  get Id_responsable(){
     return this.id_responsable;
  }


}