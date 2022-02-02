import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import {getFirestore, doc, setDoc, collection, getDocs, updateDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import Tasca from "./Tasca.js";
import Responsable from "./Responsable.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Aquesta Classe serveix per connectar a la base de dades de Firebase
export class Db{

// covertir un objecte d'una classe a un document de firebase
  taskConverter = 
  {
    toFirestore: (task) => {
     return {
      nom: task.nom,
      codi : task.codi,
      descripcio : task.descripcio,
      data_creacio : task.data_creacio,
      data_previsio : task.data_previsio,
      estat : task.estat,
      id_responsable : task.id_responsable,
      prioritat : task.prioritat
      };
      },
      fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new Tasca(data.codi, data.nom, data.data_creacio, data.data_previsio, data.id_responsable, data.descripcio, data.estat, data.prioritat);
      }
    };

    RespConverter = 
    {
      toFirestore: (resp) => {
       return {
        nom: resp.nom,
        codi : resp.codi,
        email: resp.email
        };
        },
        fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Responsable(data.codi, data.nom, data.email);
        }
      };
      
    constructor(){ 
        const firebaseConfig = {
            apiKey: "AIzaSyD-MI3A2SrU75rAkBwCqigCUaGD7LrV04o",
            authDomain: "projecte1-a941b.firebaseapp.com",
            projectId: "projecte1-a941b",
            storageBucket: "projecte1-a941b.appspot.com",
            messagingSenderId: "790613583662",
            appId: "1:790613583662:web:b828d2bc1b2e0e1f81bcbf"
          };
            // Initialize Firebase
            const app = initializeApp(firebaseConfig);
            this.db = getFirestore(app);
  
    }   

// Guardar tasca a dins de la base de dades FireBase
async addTask(task1)
{
// Firestore data converter
   try{
      const ref = doc(this.db, "tasques", task1.codi.toString()).withConverter(this.taskConverter);
      await setDoc(ref, task1);
      }catch(error)
      {
        console.log(error);
      }
    }
  // Recuperar tasques 
async getTasks()
{
  var tasques = [];
  const querySnapshot = await getDocs(collection(this.db, "tasques"))
  querySnapshot.forEach((doc1) => {
    let t = new Tasca();
    t.nom = doc1.data().nom;
    t.codi = doc1.data().codi;
    t.data_creacio = doc1.data().data_creacio;
    t.data_previsio = doc1.data().data_previsio;
    t.id_responsable = doc1.data().id_responsable;
    t.descripcio = doc1.data().descripcio;
    t.estat = doc1.data().estat;
    t.prioritat = doc1.data().prioritat;
    tasques.push(t);
});
  return tasques;
}

// actualitzar una tasca
async updateTask(task_id, status){
  try
  {
    const taskRef = doc(this.db, "tasques", task_id.toString());
    await updateDoc(taskRef,{
    estat: status
    });
  }
  catch(error)
      {
        console.log(error);
      }
}

// Eliminar una tasca
  async deleteTask(task_id){
    await deleteDoc(doc(this.db, "tasques", task_id.toString()));
  }

////////////////////// Responsables //////////////////////////////////////////
  async addResp(resp1)
  {
    try{
      const ref = doc(this.db, "responsables", resp1.codi.toString()).withConverter(this.RespConverter);
      await setDoc(ref, resp1);  
      console.log("done");   
    }catch(error)
    {
      console.log(error);
    }
  }

    
  async getResp()
  {
     var responsables = []; 
     const querySnapshot = await getDocs(collection(this.db, "responsables"))
     querySnapshot.forEach((doc1) => {
        let t = new Responsable();
        t.codi = doc1.data().codi;
        t.nom = doc1.data().nom;
        t.email = doc1.data().email;
        
        responsables.push(t);
    
    });
    return responsables;
  }
  async deleteResp(resp_id)
  {
    await deleteDoc(doc(this.db, "responsables", resp_id.toString()));
  }
}

