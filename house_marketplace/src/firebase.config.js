// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRdBNR4CMvbS2fSnjdu5eM6oCeByrbOAs",
  authDomain: "house-marketplace-c2180.firebaseapp.com",
  projectId: "house-marketplace-c2180",
  storageBucket: "house-marketplace-c2180.appspot.com",
  messagingSenderId: "899946711858",
  appId: "1:899946711858:web:0bca486886d987e205252b",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
