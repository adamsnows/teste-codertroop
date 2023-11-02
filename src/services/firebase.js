import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
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
