// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASiDfcU76eqOdCHHc2neHKlT1ol3XsXJA",
  authDomain: "clone-f2729.firebaseapp.com",
  projectId: "clone-f2729",
  storageBucket: "clone-f2729.firebasestorage.app",
  messagingSenderId: "242037201168",
  appId: "1:242037201168:web:a74b9a0762e79faf5aed95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth};