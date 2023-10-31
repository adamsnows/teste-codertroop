import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWY9WGDZX0KPehCLIGew38VeBK1jzhQM0",
  authDomain: "codertroop-9bafb.firebaseapp.com",
  projectId: "codertroop-9bafb",
  storageBucket: "codertroop-9bafb.appspot.com",
  messagingSenderId: "493132982037",
  appId: "1:493132982037:web:faf8bfce1dca6d1b1e2b1c",
  measurementId: "G-WTDG82ZBKT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth();

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db };
