// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bloglet-68705.firebaseapp.com",
  projectId: "bloglet-68705",
  storageBucket: "bloglet-68705.appspot.com",
  messagingSenderId: "74199048353",
  appId: "1:74199048353:web:a66f3ed0db38ae513250e0",
  measurementId: "G-JSTF6XWKP6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
