import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import {getFirestore, doc, setDoc, collection, addDoc} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import Tasca from "./Tasca.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export class Db{
  firebaseApp;
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
         //   tascquesref = this.db.collection("tasques");
    }   

    async addTask(task1)
    {
    // Firestore data converter
        const taskConverter = {
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
              return new Tasca(data.nom, data.codi, data.descripcio, data.data_creacio, data.data_previsio, data.estat, data.id_responsable, data.prioritat);
          }
        };


        try{

          const ref = doc(this.db, "tasques", task1.codi.toString()).withConverter(taskConverter);
          await setDoc(ref, task1);
       //   const docRef = await addDoc(collection(this.db, "tasques"), task);
         // console.log("Document written with ID: ", ref.id);
         console.log("done");
        }catch(error){
            console.log(error);
        }
    }


    // writeUserData(userId, name, email, imageUrl) {
    //     const db = this.firestore;
    //     setDoc(doc(db, 'tasques/' + userId), {
    //       username: name,
    //       email: email,
    //       profile_picture : imageUrl
    //     });
    //   }

}
