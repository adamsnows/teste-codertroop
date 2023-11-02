import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  remove,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAWY9WGDZX0KPehCLIGew38VeBK1jzhQM0",
  authDomain: "codertroop-9bafb.firebaseapp.com",
  projectId: "codertroop-9bafb",
  storageBucket: "codertroop-9bafb.appspot.com",
  messagingSenderId: "493132982037",
  appId: "1:493132982037:web:faf8bfce1dca6d1b1e2b1c",
  measurementId: "G-WTDG82ZBKT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Coleta de informações de interação
const interaction = {
  username: "Nome do Usuário",
  x: mouseX,
  y: mouseY,
  // outras informações relevantes
};

// Enviar a interação para o Firebase Realtime Database
const interactionsRef = ref(db, "interactions");
push(interactionsRef, interaction);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  db,
  ref,
  push,
  set,
  onValue,
  remove,
  app,
};
